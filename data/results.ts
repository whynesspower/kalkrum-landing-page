/**
 * Every result shown on the site, in one place.
 *
 * Inline markup used in `claim`, `context` and evidence text:
 *   `...`   a mathematical object, set in mono (e.g. `(465, 145, 45)`)
 *   _{..}   subscript, ^{..} superscript (inside or outside backticks)
 *
 * Evidence levels follow what the research log states, never more:
 *   certified  re-derived by independent code, or the object is its own certificate
 *   single     rests on one engine family; a second is pending
 *   internal   closed internally, not yet independently re-derived
 *   candidate  checked, but novelty not yet established
 */

export type EvidenceLevel = "certified" | "single" | "internal" | "candidate";

export type Evidence = { level: EvidenceLevel; text: string };
export type Ref = { label: string; href?: string };

export type Result = {
  id: string;
  topic?: string;
  claim: string;
  context?: string;
  evidence?: Evidence;
  refs?: Ref[];
  figure?: { value: string; caption: string };
};

export type Domain = {
  id: string;
  title: string;
  intro: string;
  results: Result[];
};

export const evidenceLabels: Record<EvidenceLevel, { label: string; meaning: string }> = {
  certified: {
    label: "Independently checked",
    meaning: "Re-derived by separately written code, or the object is its own certificate.",
  },
  single: {
    label: "One engine",
    meaning: "Rests on one engine family. Independent confirmation pending.",
  },
  internal: {
    label: "Internal",
    meaning: "Closed internally. Not yet independently re-derived.",
  },
  candidate: {
    label: "Candidate",
    meaning: "Values independently re-derived. Novelty not yet established.",
  },
};

const LA_JOLLA_DS = {
  label: "La Jolla Combinatorics Repository: difference sets",
  href: "https://dmgordon.org/difference-sets/",
};
const LA_JOLLA_RDS = {
  label: "La Jolla Combinatorics Repository: relative difference sets",
  href: "https://dmgordon.org/relative-difference-sets/",
};
const LA_JOLLA_CW = {
  label: "La Jolla Combinatorics Repository: circulant weighing matrices",
  href: "https://dmgordon.org/circulant-weighing-matrices/",
};
const HADAMARD_SURVEY = {
  label: "Egan, Kotsireas, London, Ó Catháin (2026), arXiv:2610.27175",
  href: "https://arxiv.org/abs/2610.27175",
};
const HADAMARD_REPO = { label: "K. Kumar, New Hadamard matrices", href: "https://github.com/vatskishan03/Hadamard" };
const LDPC_PAPER = {
  label: "Danilko, Mogilnykh, Tikhomolov (2026), arXiv:2607.04716",
  href: "https://arxiv.org/abs/2607.04716",
};

export const domains: Domain[] = [
  {
    id: "combinatorial-designs",
    title: "Combinatorial designs",
    intro:
      "Objects of perfect balance that sit under error-correcting codes, radar and experimental design. For most parameters, nobody knows whether they exist.",
    results: [
      {
        id: "flc-method",
        topic: "Method",
        claim: "The FLC method replaces the SAT step in the standard search for Williamson, good and best matrices.",
        context:
          "1,100× to 5,000× faster than the authors’ code on the same machine; up to 47,000× faster than published times.",
        figure: { value: "47,000×", caption: "faster than published run times" },
      },
      {
        id: "williamson-75",
        topic: "Hadamard family",
        claim: "Williamson matrices of order `75` are classified. There is exactly one set.",
        context: "No odd order above `69` had been classified in the literature we found.",
      },
      {
        id: "good-75",
        topic: "Hadamard family",
        claim: "Good matrices of order `75` do not exist.",
        context: "An exhaustive search over 4.9 million instances.",
        evidence: { level: "certified", text: "Cross-checked by separately written code." },
      },
      {
        id: "good-53-55",
        topic: "Hadamard family",
        claim: "Good matrices of orders `53` and `55` exist. We found one set of each.",
        context: "We found no published source for either.",
        evidence: {
          level: "certified",
          text: "Existence is checkable from the matrices. Uniqueness awaits independent confirmation.",
        },
      },
      {
        id: "good-59-65",
        topic: "Hadamard family",
        claim: "Complete searches at orders `59` and `65` found no good matrices.",
      },
      {
        id: "hadamard-open-orders",
        topic: "Hadamard family",
        claim:
          "More than 200 Hadamard, skew-Hadamard and symmetric Hadamard matrices, constructed at orders listed as open.",
        context: "The constructions are cited in the 2026 survey of Hadamard matrix constructions.",
        evidence: { level: "certified", text: "Each matrix is its own certificate: anyone can check `HH^{T} = nI`." },
        refs: [HADAMARD_SURVEY, HADAMARD_REPO],
        figure: { value: "200+", caption: "matrices at open orders" },
      },
      {
        id: "cyclic-difference-set-465",
        topic: "Difference sets",
        claim: "No cyclic `(465, 145, 45)` difference set exists.",
        context:
          "The smallest open case in the La Jolla repository (v1.3) and Gordon’s 2026 paper; a case of Ryser’s conjecture.",
        refs: [LA_JOLLA_DS],
      },
      {
        id: "cyclic-difference-sets-next-three",
        topic: "Difference sets",
        claim:
          "The other three of the four smallest open cyclic difference sets, `(1561, 105, 7)`, `(2185, 105, 5)` and `(1111, 111, 11)`, are closed.",
        evidence: { level: "internal", text: "Closed internally." },
      },
      {
        id: "relative-difference-sets",
        topic: "Difference sets",
        claim: "None of the four open Singer difference sets lifts to a cyclic relative difference set.",
        refs: [LA_JOLLA_RDS],
      },
      {
        id: "cw-120-36",
        topic: "Weighing matrices",
        claim: "`CW(120, 36)` exists.",
        context: "This contradicts Theorem 4.24 of Tan (2018) and the “No” entry in the La Jolla repository.",
        evidence: { level: "certified", text: "Shown by an explicit matrix that anyone can check." },
        refs: [LA_JOLLA_CW],
      },
      {
        id: "cw-la-jolla-no",
        topic: "Weighing matrices",
        claim: "209 entries marked “No” in the La Jolla repository are contradicted by explicit matrices.",
        evidence: { level: "certified", text: "Each contradiction is an explicit matrix." },
        refs: [LA_JOLLA_CW],
        figure: { value: "209", caption: "published “No” entries overturned" },
      },
      {
        id: "cw-180-36",
        topic: "Weighing matrices",
        claim:
          "`CW(180, 36)` is fully classified into 12 classes, and 12 further parameter sets are proven not to exist.",
      },
      {
        id: "cw-extended",
        topic: "Weighing matrices",
        claim: "2,338 of the 2,763 extended circulant weighing matrix cases in the La Jolla repository, solved.",
      },
    ],
  },
  {
    id: "integer-sequences",
    title: "Integer sequences",
    intro:
      "The OEIS records what mathematicians have managed to compute. A sequence stops where the next term was out of reach.",
    results: [
      {
        id: "oeis-a003111",
        topic: "Complete mappings",
        claim:
          "Three new terms of OEIS A003111, the number of complete mappings of the cyclic group `Z_{2n+1}`: a(13), a(14) and a(15), for `Z_{27}`, `Z_{29}` and `Z_{31}`.",
        context: "The sequence had stopped at a(12).",
        refs: [{ label: "OEIS A003111", href: "https://oeis.org/A003111" }],
        figure: { value: "2,427,915,096,775,283,929,115", caption: "a(15), complete mappings of Z_{31}" },
      },
      {
        id: "complete-mappings-groups",
        topic: "Complete mappings",
        claim:
          "Complete-mapping counts for 24 more groups: every group of order up to 28, plus `Z_{4} × Z_{2}^{3}` and `Z_{2}^{5}`.",
        context: "We could not find these counts in the literature.",
      },
      {
        id: "oeis-a003179",
        topic: "Self-dual codes",
        claim: "Self-dual binary codes up to equivalence: new totals for lengths 42 to 56.",
        context: "The data in OEIS A003179 stops at length 36.",
        refs: [{ label: "OEIS A003179", href: "https://oeis.org/A003179" }],
      },
      {
        id: "oeis-a094927",
        topic: "Stabilizer states",
        claim:
          "Eight new terms of OEIS A094927, the number of stabilizer states (self-dual quantum codes) on 13 to 20 qubits, with the matching terms of A090899.",
        context: "Both sequences had stopped at 12 qubits.",
        refs: [
          { label: "OEIS A094927", href: "https://oeis.org/A094927" },
          { label: "OEIS A090899", href: "https://oeis.org/A090899" },
        ],
      },
    ],
  },
  {
    id: "coding-theory",
    title: "Coding theory and telecom",
    intro:
      "Minimum distance decides how many errors a code survives. Computing it is NP-hard, so tables often carry bounds instead.",
    results: [
      {
        id: "5g-nr-ldpc-distances",
        topic: "5G NR",
        claim: "860 exact minimum distances for 5G NR LDPC codes.",
        context: "Both base graphs, many lifting sizes and punctured variants, lengths up to 11,904.",
        figure: { value: "860", caption: "exact distances for 5G NR LDPC codes" },
      },
      {
        id: "5g-nr-corrections",
        topic: "5G NR",
        claim:
          "Two table entries in a 2026 study of 5G LDPC codes are wrong: `C(E[4], 192)` has distance 10, not 8, and `C′(E[4], 48)` has distance 5, not 6.",
        refs: [LDPC_PAPER],
      },
      {
        id: "5g-nr-open-bracket",
        topic: "5G NR",
        claim: "An open bracket from the same study is settled: `C(E[4], 384)` has distance 11.",
        refs: [LDPC_PAPER],
      },
      {
        id: "record-binary-codes",
        topic: "Linear codes",
        claim:
          "Five candidate record binary linear codes: `[111, 37, 27]`, `[152, 38, 42]`, `[172, 43, 46]`, `[159, 53, 35]` and `[174, 58, 37]`.",
        context: "Each beats the lower bound listed at codetables.de. Together they raise 24 cells of the table.",
        evidence: {
          level: "candidate",
          text: "Every distance re-derived by multiple independent verifiers. Novelty not yet established.",
        },
        refs: [{ label: "codetables.de", href: "https://www.codetables.de" }],
      },
    ],
  },
  {
    id: "quantum-error-correction",
    title: "Quantum error correction",
    intro:
      "Circuit distance is the smallest number of faults that can corrupt a quantum memory, in the circuit that actually runs it. It decides whether the hardware works.",
    results: [
      {
        id: "ibm-two-gross-circuit-distance",
        topic: "Bivariate-bicycle codes",
        claim:
          "IBM’s two-gross `[[288, 12, 18]]` memory circuit has exact circuit distance 16, below the published 18.",
        context:
          "Crocker first posted witnesses for “at most 16”. Ours is the matching lower bound, and so the exact value.",
        evidence: { level: "certified", text: "Confirmed by multiple independent code bases." },
        figure: { value: "16", caption: "exact circuit distance, IBM two-gross" },
      },
      {
        id: "pan-period-11",
        topic: "Bivariate-bicycle codes",
        claim:
          "Pan’s period-11 schedule for the same code has circuit distance 18 in both bases, so it preserves the full code distance.",
      },
      {
        id: "schedules-c1-c2",
        topic: "Bivariate-bicycle codes",
        claim:
          "Two schedules we designed, C1 and C2, reach circuit distance 18 in both bases, equal to the full code distance.",
        evidence: {
          level: "certified",
          text: "Multiple independent engines, about 1.4 trillion nodes per case.",
        },
      },
      {
        id: "ibm-360-qubit",
        topic: "Bivariate-bicycle codes",
        claim: "IBM’s 360-qubit circuit has circuit distance at least 19. The published bracket was 12 to 23.",
        evidence: { level: "single", text: "Rests on one engine family." },
      },
      {
        id: "distance-engine",
        topic: "Method",
        claim:
          "Our distance engine’s effort grows 4.9× to 5.4× per extra unit of weight, against 10× to 11× for the best published tool.",
        context: "It certifies distance 16 in 85 seconds.",
      },
    ],
  },
  {
    id: "sat-and-optimisation",
    title: "SAT, optimisation and proof",
    intro: "Formulas the best solvers struggle to decide. A result counts only with a checkable certificate.",
    results: [
      {
        id: "sat-competition-unknown",
        topic: "SAT Competitions 2023 to 2025",
        claim: "11 instances previously listed as “unknown”, decided.",
        evidence: { level: "certified", text: "Each with a checkable certificate." },
      },
      {
        id: "sat-tseitin",
        topic: "SAT Competitions 2023 to 2025",
        claim: "22 Tseitin instances refuted at least 342× faster than Kissat or CaDiCaL.",
      },
      {
        id: "sat-cardinality",
        topic: "SAT Competitions 2023 to 2025",
        claim: "68 cardinality-type instances refuted at least 44× faster.",
      },
      {
        id: "metabolic-cut-sets",
        topic: "Metabolic networks",
        claim: "Metabolic minimal cut sets found 87× to 215× faster than a corrected integer programming baseline.",
      },
    ],
  },
  {
    id: "physics-and-materials",
    title: "Physics and materials",
    intro:
      "Ground states and densities of states are searches over configurations. Faster exact methods reach larger systems.",
    results: [
      {
        id: "cluster-expansion",
        topic: "Materials",
        claim:
          "Cluster-expansion ground states, 100× to 10,000× faster than the method of Huang et al. on compact cells, and on par on thin cells.",
      },
      {
        id: "ising-3d",
        topic: "Statistical physics",
        claim: "3D Ising density of states, 1.6× faster than the best published transfer-matrix method.",
      },
    ],
  },
  {
    id: "platform",
    title: "Platform",
    intro: "Not discoveries, but evidence that the system builds its own tools for problem types it has not seen before.",
    results: [
      {
        id: "solver-compiler",
        topic: "Compiler",
        claim: "A compiler that builds a solving engine automatically from a model file.",
        context:
          "Its engines beat Kissat and CP-SAT by more than 30,000× on Williamson and Legendre problems, matching the hand-built FLC engine.",
        figure: { value: "30,000×", caption: "faster than Kissat and CP-SAT" },
      },
      {
        id: "solver-factory",
        topic: "Solver factory",
        claim: "A checker first loop produced a verified solver for a problem type it had never seen, in 5 to 6 minutes.",
        context: "On blind tests it recognised the right structure in 5 of 8 models, with no false detections.",
      },
    ],
  },
];

export const allResults = domains.flatMap((d) => d.results.map((r) => ({ ...r, domain: d })));

export function getResult(id: string) {
  const r = allResults.find((x) => x.id === id);
  if (!r) throw new Error(`Unknown result id: ${id}`);
  return r;
}

/** Shown on the home page, in this order. */
export const featuredIds = [
  "cyclic-difference-set-465",
  "ibm-two-gross-circuit-distance",
  "cw-120-36",
  "oeis-a003111",
  "5g-nr-ldpc-distances",
  "sat-competition-unknown",
] as const;

/** Strip inline markup for plain-text outputs (llms.txt, JSON-LD, meta). */
export function plain(s: string) {
  return s
    .replace(/`/g, "")
    .replace(/_\{([^}]*)\}/g, "_$1")
    .replace(/\^\{([^}]*)\}/g, "^$1");
}
