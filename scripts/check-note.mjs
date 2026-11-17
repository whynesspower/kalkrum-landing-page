#!/usr/bin/env node
/**
 * Checks a research note, and optionally the ledger entries that go with it.
 *
 *   node scripts/check-note.mjs content/notes/<slug>.md [ledger.json]
 *
 * Errors make the note unpublishable (exit 1). Warnings are for the author to read.
 * Needs Node 22.18 or later, which loads the TypeScript parser directly.
 */
import { readFileSync } from "node:fs";
import { basename } from "node:path";
import katex from "katex";
import { allInlines, parseNote, plainInline, walkInline } from "../lib/note-parse.ts";

const [notePath, ledgerPath] = process.argv.slice(2);
if (!notePath) {
  console.error("usage: node scripts/check-note.mjs NOTE.md [LEDGER.json]");
  process.exit(2);
}

const errors = [];
const warnings = [];

const DOMAINS = [
  "superconductivity",
  "electron-gas",
  "long-range-order",
  "materials-design",
  "catalysis",
  "chip-design",
  "quantum-error-correction",
];
const LEVELS = ["certified", "single", "internal", "candidate"];

/** Words the site does not use: praise, filler. */
const BANNED = [
  "novel",
  "groundbreaking",
  "breakthrough",
  "powerful",
  "remarkable",
  "remarkably",
  "elegant",
  "state of the art",
  "state-of-the-art",
  "cutting edge",
  "cutting-edge",
  "seminal",
  "striking",
  "strikingly",
  "surprisingly",
  "it is worth noting",
  "worth noting",
  "importantly",
  "in this note",
  "delve",
  "leverage",
  "landscape of",
  "paves the way",
  "sheds light",
  "crucially",
  "notably",
  "game-changing",
  "unprecedented",
  "world-class",
  "revolutionary",
];

/** Internal names and process words that must not appear in public text. */
const INTERNAL = [
  /\brows? \d+\b/i,
  /\bround \d+[a-z]?\b/i,
  /\bcampaign\b/i,
  /\b(sub)?agents?\b/i,
  /\bcorrections pass\b/i,
  /\bfrontiers\//,
  /\b[a-z]+_[a-z0-9_]+\b/,
  /\.(py|md|json|tsv|sh)\b/,
  /\bcertlib\b/i,
];

function checkText(where, text) {
  if (text.includes("—")) errors.push(`${where}: em dash in "${text.slice(0, 70)}"`);
  if (/\s–\s/.test(text)) errors.push(`${where}: en dash used as punctuation in "${text.slice(0, 70)}"`);
  if (/<\/?[a-z][^>]*>/i.test(text)) errors.push(`${where}: HTML is not part of the format: "${text.slice(0, 70)}"`);
  const low = text.toLowerCase();
  for (const w of BANNED) {
    const re = new RegExp(`(^|[^a-z])${w.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}([^a-z]|$)`);
    if (re.test(low)) warnings.push(`${where}: "${w}" is not in the site's voice`);
  }
  for (const re of INTERNAL) {
    const m = re.exec(text);
    if (m) warnings.push(`${where}: "${m[0]}" looks like an internal name or process word`);
  }
}

function tex(where, v, displayMode) {
  try {
    katex.renderToString(v, {
      displayMode,
      throwOnError: true,
      strict: (code) => (code === "unicodeTextInMathMode" ? "ignore" : "error"),
    });
  } catch (e) {
    errors.push(`${where}: mathematics does not render: ${String(e.message).replace(/\n/g, " ")}  [${v.slice(0, 80)}]`);
  }
  if (/\\(label|eqref|ref|tag|newcommand|def)\b/.test(v)) errors.push(`${where}: \\label, \\eqref, \\tag and macros are not allowed`);
  if (/\\begin\{(align\*?|equation\*?|eqnarray)\}/.test(v)) errors.push(`${where}: use \\begin{aligned} inside $$`);
}

// ───────────── the note ─────────────

const source = readFileSync(notePath, "utf8");
const note = parseNote(source);
errors.push(...note.errors.map((e) => `note: ${e}`));

const { meta } = note;
const fileSlug = basename(notePath).replace(/\.md$/, "");
if (meta.slug && meta.slug !== fileSlug) errors.push(`note: slug "${meta.slug}" does not match the file name "${fileSlug}"`);
if (meta.title.length > 70) errors.push(`note: the title has ${meta.title.length} characters, the limit is 70`);
if (meta.summary.length > 300) errors.push(`note: the summary has ${meta.summary.length} characters, the limit is 300`);
if (/[$`*]/.test(meta.title + meta.summary)) errors.push("note: title and summary are plain text, without markup");
checkText("title", meta.title);
checkText("summary", meta.summary);
if (/!\[/.test(source)) errors.push("note: images are not part of the format");

note.blocks.forEach((b, k) => {
  if (b.t === "math") tex(`block ${k + 1} (display)`, b.v, true);
});
const cited = new Set();
for (const run of allInlines(note)) {
  const text = plainInline(run.filter((x) => x.t !== "math"));
  walkInline(run, (x) => {
    if (x.t === "math") tex(`"${text.slice(0, 40)}…"`, x.v, false);
    if (x.t === "cite") x.n.forEach((n) => cited.add(n));
    if (x.t === "link" && !/^(https:\/\/|\/research)/.test(x.href))
      errors.push(`note: a link must be https or start with /research: ${x.href}`);
  });
  walkInline(run, (x) => {
    if (x.t === "text") checkText(`"${text.slice(0, 40)}…"`, x.v);
  });
}

if (!note.refs.length) errors.push("note: there is no reference list (## References, then a numbered list)");
for (const r of note.refs) {
  if (!r.url) errors.push(`note: reference ${r.n} does not end with a URL`);
  if (!cited.has(r.n)) errors.push(`note: reference ${r.n} is never cited`);
}
for (const n of cited) if (n < 1 || n > note.refs.length) errors.push(`note: citation [${n}] has no reference`);

const h2 = note.blocks.filter((b) => b.t === "h2").map((b) => b.text.toLowerCase());
if (note.blocks[0]?.t !== "p") errors.push("note: the note opens with a paragraph, before the first heading");
if (h2.length < 5) warnings.push(`note: only ${h2.length} sections; the guide lists six before the references`);
for (const need of ["checked", "not show", "earlier"]) {
  if (!h2.some((t) => t.includes(need))) warnings.push(`note: no section heading containing "${need}"`);
}
const [lo, hi] = meta.kind === "white-paper" ? [1100, 1700] : [500, 900];
if (note.words < lo || note.words > hi)
  warnings.push(`note: ${note.words} words of running text; a ${meta.kind} is ${lo} to ${hi}`);

// ───────────── the ledger ─────────────

let entries = 0;
if (ledgerPath) {
  let ledger;
  try {
    ledger = JSON.parse(readFileSync(ledgerPath, "utf8"));
  } catch (e) {
    errors.push(`ledger: not valid JSON: ${e.message}`);
  }
  if (ledger && !Array.isArray(ledger)) errors.push("ledger: the file is one JSON array");
  else if (ledger) {
    const seen = new Set();
    entries = ledger.length;
    ledger.forEach((r, k) => {
      const at = `ledger[${k}]${r && r.id ? ` ${r.id}` : ""}`;
      if (!r || typeof r !== "object") return errors.push(`${at}: not an object`);
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(r.id ?? "")) errors.push(`${at}: id must be kebab-case`);
      if (seen.has(r.id)) errors.push(`${at}: duplicate id`);
      seen.add(r.id);
      if (!DOMAINS.includes(r.domain)) errors.push(`${at}: domain must be one of ${DOMAINS.join(", ")}`);
      if (typeof r.topic !== "string" || !r.topic || r.topic.length > 40) errors.push(`${at}: topic is a short label`);
      if (typeof r.claim !== "string" || !r.claim) errors.push(`${at}: claim is missing`);
      if (r.context !== undefined && typeof r.context !== "string") errors.push(`${at}: context is a string`);
      if (!r.evidence || !LEVELS.includes(r.evidence.level) || typeof r.evidence.text !== "string")
        errors.push(`${at}: evidence needs a level (${LEVELS.join(", ")}) and a text`);
      else if (!/^(Proved|Computer-assisted proof|Certified computation|Exhaustive computation|Measurement)\./.test(r.evidence.text))
        warnings.push(`${at}: the evidence sentence begins with the kind of result (guide, section 3)`);
      if (r.refs !== undefined) {
        if (!Array.isArray(r.refs)) errors.push(`${at}: refs is an array`);
        else
          r.refs.forEach((x) => {
            if (!x || typeof x.label !== "string" || !x.label) errors.push(`${at}: a ref needs a label`);
            if (x && x.href !== undefined && !/^https:\/\//.test(x.href)) errors.push(`${at}: href must be https: ${x.href}`);
          });
      }
      if (r.figure !== undefined && (typeof r.figure.value !== "string" || typeof r.figure.caption !== "string"))
        errors.push(`${at}: figure needs a value and a caption, both strings`);
      const known = ["id", "domain", "topic", "claim", "context", "evidence", "refs", "figure"];
      for (const key of Object.keys(r)) if (!known.includes(key)) errors.push(`${at}: unknown field "${key}"`);
      for (const [name, s] of [
        ["claim", r.claim],
        ["context", r.context],
        ["evidence", r.evidence?.text],
        ["figure caption", r.figure?.caption],
      ]) {
        if (typeof s !== "string") continue;
        if (/\$|\\[a-zA-Z]+/.test(s)) errors.push(`${at}: ${name} uses TeX; the ledger uses backticks, _{..}, ^{..} and Unicode`);
        if ((s.match(/`/g) ?? []).length % 2) errors.push(`${at}: ${name} has an unclosed backtick`);
        if (/[_^]\{[^}]*$/.test(s)) errors.push(`${at}: ${name} has an unclosed _{ or ^{`);
        checkText(`${at} ${name}`, s.replace(/`[^`]*`/g, " "));
      }
      if (typeof r.claim === "string" && r.claim.length > 420) warnings.push(`${at}: the claim has ${r.claim.length} characters; one sentence is the aim`);
    });
    if (ledger.filter((r) => r && r.figure).length > 1) errors.push("ledger: at most one entry carries a figure");
  }
}

for (const w of warnings) console.log(`warning  ${w}`);
for (const e of errors) console.log(`ERROR    ${e}`);
console.log(
  `${errors.length ? "FAILED" : "OK"}: ${meta.slug || fileSlug} · ${meta.kind} · ${note.words} words · ${note.refs.length} references` +
    (ledgerPath ? ` · ${entries} ledger entries` : "") +
    ` · ${errors.length} errors, ${warnings.length} warnings`,
);
process.exit(errors.length ? 1 : 0);
