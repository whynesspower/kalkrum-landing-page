import { noteForResult, noteLabel, notes as numberedNotes, plainTitle, type Block, type Note } from "@/content/notes";
import { domains, evidenceLabels, plain } from "@/content/results";
import { founders, nav, site } from "@/content/site";
import { allNotes, kindLabel, noteText } from "./notes";

/** Inline markup of a numbered note as plain text: links keep their label, emphasis its words. */
const flat = (s: string) =>
  plain(s)
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/(?<![A-Za-z0-9])\*([^*\n]+)\*(?![A-Za-z0-9])/g, "$1");

function blockText(b: Block): string {
  if ("p" in b) return flat(b.p);
  if ("statement" in b) return `${b.label ? `${flat(b.label)}. ` : ""}${flat(b.statement)}`;
  if ("list" in b) return b.list.map((x) => `- ${flat(x)}`).join("\n");
  if ("table" in b)
    return [
      b.table.head.map(flat).join(" | "),
      ...b.table.rows.map((r) => r.map(flat).join(" | ")),
      ...(b.table.caption ? [flat(b.table.caption)] : []),
    ].join("\n");
  if ("code" in b) return [b.code, ...(b.caption ? [flat(b.caption)] : [])].join("\n");
  if ("figure" in b) return flat(b.caption);
  return flat(b.small);
}

/** A numbered note or paper (content/notes/*.ts) as plain text, for llms-full.txt. */
function numberedNoteText(note: Note): string {
  return [
    flat(note.statement),
    `Before this work: ${flat(note.header.before)}`,
    `Evidence (${evidenceLabels[note.evidence].label}): ${flat(note.header.evidence)}`,
    `What you can check: ${flat(note.header.check)}`,
    `Not established: ${flat(note.header.notEstablished)}`,
    `Method: ${flat(note.header.method)}`,
    ...note.sections.flatMap((sec) => [`#### ${sec.title}`, ...sec.blocks.map(blockText)]),
    "#### References",
    note.refs.map((r, i) => `${i + 1}. ${flat(r.text)}${r.href ? ` ${r.href}` : ""}`).join("\n"),
  ].join("\n\n");
}

/** llms.txt: a short, link-rich summary for language models (https://llmstxt.org). */
export function llmsTxt() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} (${site.shortName}) was founded in ${site.founded} by ${founders.map((f) => `${f.name} (${f.role.replace("Co-founder, ", "")})`).join(" and ")}. It works from ${site.locations.join(" and ")}. Its research log labels each result by how it was checked, including results that rest on one engine or whose novelty is not yet established. Its results so far ran on two small cloud machines: one with an 8 GB GPU, one with four CPU cores and no GPU.`,
    "",
    "## Pages",
    "",
    ...nav.map((n) => `- [${n.label}](${site.url}${n.href})`),
    `- [Full text for language models](${site.url}/llms-full.txt)`,
    "",
    "## Selected results",
    "",
    "- No cyclic (465, 145, 45) difference set exists; it was the smallest open case in the La Jolla repository and a case of Ryser’s conjecture.",
    "- IBM’s two-gross [[288, 12, 18]] memory circuit has exact circuit distance 16 (published: 18); the matching lower bound is KalKram’s, confirmed by multiple independent code bases.",
    "- CW(120, 36) exists, contradicting Theorem 4.24 of Tan (2018).",
    "- More than 200 Hadamard, skew-Hadamard and symmetric Hadamard matrices at orders listed as open.",
    "- Three new terms of OEIS A003111 (complete mappings of Z_27, Z_29, Z_31).",
    "- 860 exact minimum distances for 5G NR LDPC codes.",
    `- [All results with evidence](${site.url}/research)`,
    "",
    "## Papers and notes",
    "",
    ...numberedNotes.map((n) => `- [${n.id}: ${plainTitle(n)}](${site.url}/research/${n.slug})`),
    ...allNotes().map((n) => `- [${n.meta.title}](${site.url}/research/${n.meta.slug}): ${n.meta.summary}`),
    "",
    "## Contact",
    "",
    ...founders.map((f) => `- ${f.name}, ${f.role}: ${f.linkedin}`),
    "",
  ];
  return lines.join("\n");
}

/** llms-full.txt: the site's substance as plain text, generated from the same data as the pages. */
export function llmsFullTxt() {
  const out: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `Website: ${site.url}`,
    `Founded: ${site.founded}. Locations: ${site.locations.join(", ")}.`,
    "",
    "## Founder",
    "",
    ...founders.map((f) => `- ${f.name}, ${f.role}. ${f.line} LinkedIn: ${f.linkedin}`),
    "",
    "## Thesis",
    "",
    "The cost of a discovery is the cost of the search behind it. Hard problems have structure: symmetries, algebra, ways of splitting into parts. KalKram's system finds that structure first, compiles a solver specific to it, runs an optimise–simulate–experiment–verify loop, and accepts a result only when multiple separately written verifiers re-derive it. Every verified result leaves behind detectors, checkers and solvers that later problems reuse, so each discovery makes the next cheaper.",
    "",
    "## How evidence is labelled",
    "",
    ...Object.values(evidenceLabels).map((e) => `- ${e.label}: ${e.meaning}`),
    "",
    "## Results",
    "",
  ];
  for (const d of domains) {
    out.push(`### ${d.title}`, "", d.intro, "");
    for (const r of d.results) {
      const parts = [plain(r.claim)];
      if (r.context) parts.push(plain(r.context));
      if (r.evidence) parts.push(`Evidence (${evidenceLabels[r.evidence.level].label}): ${plain(r.evidence.text)}`);
      if (r.refs?.length)
        parts.push(`References: ${r.refs.map((x) => (x.href ? `${x.label} <${x.href}>` : x.label)).join("; ")}`);
      const numbered = noteForResult(r.id);
      if (numbered) parts.push(`Note: ${site.url}/research/${numbered.slug}`);
      else if (r.note) parts.push(`Note: ${site.url}/research/${r.note}`);
      out.push(`- ${parts.join(" ")} [${site.url}/research#${r.id}]`);
    }
    out.push("");
  }
  out.push("## Papers and notes", "");
  for (const n of numberedNotes) {
    out.push(
      `### ${plainTitle(n)}`,
      "",
      `${noteLabel(n)} · ${n.field} · ${n.published} · ${site.url}/research/${n.slug}`,
      "",
      numberedNoteText(n),
      "",
    );
  }
  const notes = allNotes();
  if (notes.length) {
    for (const n of notes) {
      out.push(
        `### ${n.meta.title}`,
        "",
        `${kindLabel(n.meta.kind)} · ${n.meta.field} · ${n.meta.date} · ${site.url}/research/${n.meta.slug}`,
        "",
        noteText(n),
        "",
      );
    }
  }
  return out.join("\n");
}
