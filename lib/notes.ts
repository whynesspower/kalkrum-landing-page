import { noteSources } from "./generated/notes";
import { type Block, type Note, parseNote, plainInline } from "./note-parse";

/** The order notes appear in on the research page. A note not listed here follows, by title. */
const ORDER = [
  "superconducting-tc-ceiling",
  "tc-ceilings-published-data",
  "jellium-lower-bounds",
  "dipolar-magnet-ground-states",
  "lattice-gas-ground-states",
  "certified-crystal-structure-prediction",
  "perfect-sqs-and-diffusion",
  "catalysis-limits",
  "syndrome-cycles-bivariate-bicycle-codes",
  "euv-stochastic-failure-certificates",
  "steep-switch-limits",
  "placement-lower-bounds",
  "moore-bound-defect-two",
  "certificates",
];

let cache: Note[] | null = null;

/**
 * Every research note, parsed from content/notes/*.md. A malformed note fails the build.
 *
 * The sources come from a module that scripts/embed-assets.mjs writes, not from the disk, so a host that serves the
 * build without the project folder still finds them.
 */
export function allNotes(): Note[] {
  if (cache) return cache;
  const notes = Object.entries(noteSources).map(([slug, source]) => {
    const note = parseNote(source);
    if (note.meta.slug !== slug) note.errors.push(`slug "${note.meta.slug}" does not match the file name`);
    if (note.errors.length) throw new Error(`content/notes/${slug}.md:\n  ${note.errors.join("\n  ")}`);
    return note;
  });
  const rank = (n: Note) => {
    const k = ORDER.indexOf(n.meta.slug);
    return k < 0 ? ORDER.length : k;
  };
  cache = notes.sort((a, b) => rank(a) - rank(b) || a.meta.title.localeCompare(b.meta.title));
  return cache;
}

export function getNote(slug: string) {
  return allNotes().find((n) => n.meta.slug === slug);
}

export const kindLabel = (kind: Note["meta"]["kind"]) => (kind === "white-paper" ? "White paper" : "Research note");

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${d} ${months[m - 1]} ${y}`;
}

function blockText(b: Block): string {
  switch (b.t) {
    case "h2":
      return `#### ${b.text}`;
    case "h3":
      return `##### ${b.text}`;
    case "p":
      return plainInline(b.c);
    case "math":
      return b.v;
    case "statement":
      return b.c.map(plainInline).join("\n");
    case "ul":
    case "ol":
      return b.items.map((x) => `- ${plainInline(x)}`).join("\n");
    case "table":
      return [
        b.head.map(plainInline).join(" | "),
        ...b.rows.map((r) => r.map(plainInline).join(" | ")),
        ...(b.caption ? [plainInline(b.caption)] : []),
      ].join("\n");
  }
}

/** A note as plain text, with mathematics left in TeX, for llms-full.txt. */
export function noteText(note: Note): string {
  return [
    ...note.blocks.map(blockText),
    ...(note.refs.length
      ? ["#### References", note.refs.map((r) => `${r.n}. ${plainInline(r.c)}${r.url ? ` ${r.url}` : ""}`).join("\n")]
      : []),
  ].join("\n\n");
}
