import type { EvidenceLevel } from "@/content/results";

/**
 * A research note or paper: the full account of one result, or of several results of one kind, on the research page.
 *
 * Every note has the same shape, so a reader learns it once:
 *   the claim as the title, the exact statement, five header rows, then sections in a fixed order.
 * The rule behind all of it: publish properties of the problem, withhold properties of the search.
 * A number belongs in a note if a competent independent searcher would obtain it from the problem alone.
 *
 * Text fields use the inline markup of components/Rich.tsx:
 *   `math`, _{sub}, ^{sup}, [label](href), *emphasis*, and [3] for the third reference.
 */

/** What kind of thing the reader holds at the end. */
export type ResultType =
  | "Existence"
  | "Non-existence"
  | "Exact value"
  | "Count"
  | "Classification"
  | "Correction"
  | "Decision"
  | "Measurement"
  | "Speed";

/** The sections a note may have, in this order. Leave out any that would be empty. */
export const SECTION_TITLES = [
  "What was known",
  "The result",
  "How to check it",
  "What it changes",
  "Limits",
  "How it was found",
] as const;

export type Block =
  /** A paragraph. */
  | { p: string }
  /** The statement of a result, set apart from the text. */
  | { statement: string; label?: string }
  | { list: string[] }
  /** `numeric` lists the columns (from 0) set flush right; `nowrap` lists the columns that must not break. */
  | { table: { head: string[]; rows: string[][]; caption?: string; numeric?: number[]; nowrap?: number[] } }
  /** Commands or data to be copied exactly. */
  | { code: string; caption?: string }
  /** A remark in small type. */
  | { small: string }
  /** A figure from components/NoteFigures.tsx, by name. Figures are drawn from data, never decoration. */
  | { figure: string; caption: string };

export type Section = { title: (typeof SECTION_TITLES)[number]; blocks: Block[] };

export type NoteFile = { label: string; href: string; detail?: string };
export type NoteRef = { text: string; href?: string };

export type Note = {
  /** The page is /research/<slug>. */
  slug: string;
  /** A stored number, never derived from position: "KK-R-0001". */
  id: string;
  /**
   * A paper is the longer form: at most about 1,300 words. A note has at most about 550. These limits are for the
   * numbered documents of this directory; the notes and white papers written in Markdown (*.md) follow lib/note-parse.ts.
   */
  kind: "note" | "paper";
  type: ResultType;
  /** The claim, as one sentence. */
  title: string;
  /**
   * The exact statement, in one to three sentences. It defines each term it uses and scopes the claim
   * (object, parameters, equivalence). No motivation and no lay explanation.
   */
  statement: string;
  field: string;
  /** Ids in content/results.ts that this note accounts for. */
  results: string[];
  /** ISO dates. */
  published: string;
  revised?: string;
  evidence: EvidenceLevel;
  /** The five rows under the statement. Each is one or two sentences. */
  header: {
    /** The prior value or status, with its source and the date it was looked up. */
    before: string;
    /** The basis of the evidence label: who or what checked it, and what they share. */
    evidence: string;
    /** Begins with exactly one of: "All of it." / "One half: …" / "Counts only." / "Not yet." */
    check: string;
    /** The largest thing the note does not establish. The first item of Limits says the same. */
    notEstablished: string;
    /** "Not published." unless the method is public, in which case where. */
    method: string;
  };
  sections: Section[];
  files?: NoteFile[];
  refs: NoteRef[];
  /** How to cite the result. */
  cite: string;
  /** Dated changes of status: first posting, corrections, prior art found later, independent confirmation. */
  history?: { date: string; text: string }[];
};
