import { bbCircuits } from "./bbCircuits";
import { clusterExpansion } from "./clusterExpansion";
import { completeMappings } from "./completeMappings";
import { differenceSet465 } from "./differenceSet465";
import { goodMatrices } from "./goodMatrices";
import { hadamard } from "./hadamard";
import { ising3d } from "./ising3d";
import { ldpc5g } from "./ldpc5g";
import { metabolicCutSets } from "./metabolicCutSets";
import { recordCodes } from "./recordCodes";
import { relativeDifferenceSets } from "./relativeDifferenceSets";
import { satCompetition } from "./satCompetition";
import { selfDualCounts } from "./selfDualCounts";
import { skewSymmetric } from "./skewSymmetric";
import { systemNotes } from "./systemNotes";
import { twoGross } from "./twoGross";
import { weighingMatrices } from "./weighingMatrices";
import { williamson75 } from "./williamson75";
import { plain } from "@/content/results";
import type { Note } from "./types";

export type { Block, Note, NoteFile, NoteRef, ResultType, Section } from "./types";
export { SECTION_TITLES } from "./types";

/** Every note and paper, in the order of their numbers. */
export const notes: Note[] = [
  hadamard,
  skewSymmetric,
  twoGross,
  differenceSet465,
  weighingMatrices,
  goodMatrices,
  williamson75,
  completeMappings,
  selfDualCounts,
  ldpc5g,
  bbCircuits,
  relativeDifferenceSets,
  satCompetition,
  metabolicCutSets,
  clusterExpansion,
  ising3d,
  recordCodes,
  systemNotes,
];

export function getNote(slug: string) {
  return notes.find((n) => n.slug === slug);
}

const byResult = new Map(notes.flatMap((n) => n.results.map((id) => [id, n] as const)));

/** The note that accounts for a result on the research page, if one has been written. */
export function noteForResult(id: string) {
  return byResult.get(id);
}

/** "KK-R-0001 · Paper · Existence" */
export function noteLabel(note: Note) {
  return `${note.id} · ${note.kind === "paper" ? "Paper" : "Note"} · ${note.type}`;
}

/** A note's title as plain text, without inline markup or its closing full stop: for page titles, cards and lists. */
export function plainTitle(note: Note) {
  return plain(note.title)
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\.$/, "");
}

/** The short title a note is cited by ("Good matrices of orders 53 and 55"): for social cards, where the claim is too long. */
export function shortTitle(note: Note) {
  return note.cite.match(/^[^,]+, (.+?), KK-R-\d{4},/)?.[1] ?? plainTitle(note);
}

/** A section title as an anchor: "What is new, and what is not" becomes "what-is-new-and-what-is-not". */
export function anchor(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
