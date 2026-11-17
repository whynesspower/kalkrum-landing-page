/**
 * The ledger: every result shown on the site. The rows of the first fields are in this file; the rows of the
 * limits-and-certificates line are in results-frontiers.ts and are merged in at the foot of this file.
 *
 * Inline markup used in `claim`, `context` and evidence text:
 *   `...`   a mathematical object, set in mono (e.g. `(465, 145, 45)`)
 *   _{..}   subscript, ^{..} superscript (inside or outside backticks)
 *
 * Evidence levels follow what the research log states, never more:
 *   certified  re-derived by separately written code, or the object is its own certificate
 *   single     rests on one engine family; a second is pending
 *   internal   closed internally, not yet independently re-derived
 *   candidate  checked, but novelty not yet established
 */

import { frontierAdditions, frontierDomains } from "./results-frontiers";

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
  /** Slug of the research note (content/notes) that sets this result out in full. */
  note?: string;
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
    meaning: "The result was re-derived by separately written code, or the object is its own certificate.",
  },
  single: {
    label: "One engine",
    meaning: "The result rests on one family of engines. An independent confirmation is still to come.",
  },
  internal: {
    label: "Internal",
    meaning: "We closed the case internally. It has not yet been re-derived independently.",
  },
  candidate: {
    label: "Candidate",
    meaning: "The values were re-derived independently. We have not yet established that the result is new.",
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
const LDPC_PAPER = {
  label: "Danilko, Mogilnykh, Tikhomolov (2026), arXiv:2607.04716",
  href: "https://arxiv.org/abs/2607.04716",
};

const baseDomains: Domain[] = [
  {
    id: "combinatorial-designs",
    title: "Combinatorial designs",
    intro:
      "Hadamard matrices, difference sets and weighing matrices are perfectly balanced arrangements. They sit underneath error-correcting codes, radar and the design of experiments, and for most sizes nobody knows whether one exists.",
    results: [
      {
        id: "cyclic-difference-set-465",
        topic: "Difference sets",
        claim: "No cyclic `(465, 145, 45)` difference set exists, so none exists in any abelian group of order 465.",
        context:
          "Listed as open in La Jolla version 1.3, where it is the smallest nontrivial open cyclic case by group order, and in Gordon (2026). Franklin and Sam’s 2006 report claimed non-existence; to our knowledge this is the first complete proof.",
        evidence: {
          level: "certified",
          text: "Separately written programs of ours and a checker we publish reproduce the counts, sharing one written reduction; no one outside the lab has reviewed it.",
        },
        refs: [LA_JOLLA_DS],
      },
      {
        id: "cyclic-difference-sets-next-three",
        topic: "Difference sets",
        claim:
          "No cyclic `(1561, 105, 7)`, `(2185, 105, 5)` or `(1111, 111, 11)` difference set exists, as Vera López and García Sánchez stated in 1997.",
        context:
          "La Jolla version 1.3 and Gordon (2026) list all 3 as open. This is a table correction, not a new result.",
        evidence: {
          level: "certified",
          text: "Separately written programs of ours re-derive each case and the scripts are published; no one outside the lab has reviewed them.",
        },
        refs: [LA_JOLLA_DS],
      },
      {
        id: "relative-difference-sets",
        topic: "Difference sets",
        claim:
          "No cyclic relative difference set with kernel order above 1 lifts a difference set with parameters `(364, 121, 40)`, `(255, 127, 63)`, `(1464, 133, 12)` or `(2380, 183, 14)`.",
        context:
          "Gordon (arXiv v2, 2026) lists the 4 as open, except kernel order 2 for `(364, 121, 40)`, settled by search. His Theorem 5 excludes kernel order 7 for `(2380, 183, 14)` as printed, yet it is listed open.",
        evidence: {
          level: "single",
          text: "Separately written programs of ours reproduce all 8 prime-kernel cases, a verifier of ours re-derived 2, and just 1 can be checked from published files.",
        },
        refs: [LA_JOLLA_RDS],
      },
      {
        id: "cw-120-36",
        topic: "Weighing matrices",
        claim: "A proper circulant weighing matrix `CW(120, 36)` exists.",
        context:
          "Tan (2018), Theorem 4.24, excludes it, and La Jolla versions 1.3 and 2.0 list it “No”. To our knowledge no earlier public matrix exists; Gordon’s unnamed existence result of 19 October 2026 may be this one.",
        evidence: {
          level: "certified",
          text: "Each matrix is its own certificate: anyone can check properness, weight 36 and zero autocorrelation at all 119 nonzero shifts.",
        },
        refs: [LA_JOLLA_CW],
      },
      {
        id: "cw-la-jolla-no",
        topic: "Weighing matrices",
        claim:
          "209 pairs listed “No” in La Jolla version 1.3, 199 of weight 4 and 10 of weight 16, have explicit proper circulant weighing matrices.",
        context:
          "Arasu, Gordon and Zhang (2021) credit the weight-4 classification to Eades and Hain (1976) and give the weight-16 family as their Theorem 6.2. Version 2.0 lists all 209 as existing.",
        evidence: {
          level: "certified",
          text: "Each matrix is its own certificate, checkable from the definition.",
        },
        refs: [LA_JOLLA_CW],
        figure: { value: "209", caption: "“No” entries in version 1.3 with explicit matrices" },
      },
      {
        id: "cw-180-36",
        topic: "Weighing matrices",
        claim:
          "`CW(180, 36)` has 12 inequivalent proper matrices, and an exhaustive computation of ours finds no further one and no circulant weighing matrix at 12 other parameter pairs.",
        context:
          "`CW(180, 36)` and the 12 pairs were listed “Open” in La Jolla version 1.3. Gordon announced 4 of the 12 non-existence results, which we cede, and an unnamed existence result, which may be this one, on 19 October 2026.",
        evidence: {
          level: "single",
          text: "The 12 matrices are explicit and checkable; completeness and non-existence rest on exhaustive computations by separately written programs of ours, mostly in floating point.",
        },
        refs: [LA_JOLLA_CW],
      },
      {
        id: "cw-extended",
        topic: "Weighing matrices",
        claim:
          "Of 2,763 covered pairs listed “Open” in La Jolla version 1.3, we recorded 2,397 as decided: 2,342 with no matrix, 25 with a proper matrix, 30 with improper matrices only.",
        context:
          "Counts are as of 26 October 2026. We treat `CW(182, 144)` and `CW(155, 100)` as unresolved, leaving 2,395 decided. Version 2.0 lists 115 of the non-existence results as “No”; we made no per-case literature search and claim no priority.",
        evidence: {
          level: "internal",
          text: "A second program of ours covers 899 of the 2,342 non-existence results; most lack an exact certificate, and the 25 matrices are not published.",
        },
        refs: [LA_JOLLA_CW],
      },
      {
        id: "hadamard-open-orders",
        topic: "Hadamard family",
        claim:
          "We constructed more than 200 Hadamard, skew-Hadamard and symmetric Hadamard matrices at orders that were listed as open.",
        context: "The constructions are cited in the 2026 survey of Hadamard matrix constructions.",
        evidence: { level: "certified", text: "Each matrix is its own certificate: anyone can check `HH^{T} = nI`." },
        refs: [HADAMARD_SURVEY],
        figure: { value: "200", caption: "and more, at open orders" },
      },
      {
        id: "skew-symmetric-hadamard",
        topic: "Hadamard family",
        claim:
          "For every prime power `q ≡ 3 (mod 4)` there is a skew-Hadamard matrix of order `3(q + 1)`, and three further constructions give symmetric Hadamard matrices.",
        context:
          "With the accompanying searches, these settle 106 skew and 85 symmetric values that the 2025 census of Đoković and Seberry lists as undecided.",
        evidence: {
          level: "certified",
          text: "Every matrix can be rebuilt from its certificate and checked by anyone: `HH^{T} = nI`, with `H + H^{T} = 2I` or `H = H^{T}`.",
        },
      },
      {
        id: "williamson-75",
        topic: "Hadamard family",
        claim:
          "An exhaustive computer search finds exactly one inequivalent set of circulant Williamson matrices of order `75`, of Turyn type.",
        context:
          "Turyn (1972) constructed order-`75` Williamson matrices; Lang and Schneider (2011) reportedly print a Turyn-type set; if they list all such sets, the search adds only that no other type exists. We found no classification of any odd order above `69`.",
        evidence: {
          level: "single",
          text: "One program of ours completed the search; the set is checkable, but completeness has no certificate and no complete run by separately written code.",
        },
      },
      {
        id: "good-75",
        topic: "Hadamard family",
        claim: "An exhaustive computer search finds no circulant good matrices of order `75`.",
        context:
          "The search covers the 4,898,576 instances, in the sense of Bright et al. (2019); we found no published instance count at order `75`.",
        evidence: {
          level: "single",
          text: "One program of ours completed the search, with no certificate; separately written code re-derived the instance list and re-ran a minority of completions.",
        },
      },
      {
        id: "good-53-55",
        topic: "Hadamard family",
        claim: "Circulant good matrices of orders `53` and `55` exist; we give one explicit set of each.",
        context:
          "To our knowledge no earlier good matrices of order `53` or `55` are published. The skew-Hadamard matrices of orders `212` and `220` they give were already known.",
        evidence: {
          level: "certified",
          text: "Each set is its own certificate; 3 programs of ours and a Lean file accept it; no review outside the lab; uniqueness is not claimed.",
        },
      },
      {
        id: "good-59-65",
        topic: "Hadamard family",
        claim: "Our complete searches at orders `59` and `65` find no circulant good matrices.",
        context: "Published classifications of good matrices reach order `49` and, at multiples of 3, order `69`.",
        evidence: {
          level: "internal",
          text: "Two programs of one method completed each order; there is no certificate and no review outside the lab.",
        },
      },
      {
        id: "flc-method",
        topic: "Method",
        claim:
          "We reproduce all 44 published Williamson and good-matrix counts at odd multiples of 3, `9` to `69`, and complete instances 1,100 to 5,000 times faster than the authors’ SAT step.",
        context:
          "One core, the same 300 sampled instances at Williamson orders `45` to `63`, the authors’ code ported to Python 3. Whole Williamson and good runs took 3,100 to 47,000 times less CPU time than their printed hours, from older hardware.",
        evidence: {
          level: "internal",
          text: "Counts equal the published tables. Timings are ours, not repeated outside the lab, and vary between repeats; the per-instance ratio is of an earlier build.",
        },
      },
    ],
  },
  {
    id: "integer-sequences",
    title: "Integer sequences",
    intro:
      "The OEIS records the numbers mathematicians have managed to compute. A sequence usually stops at the point where the next term was out of reach.",
    results: [
      {
        id: "oeis-a003111",
        topic: "Complete mappings",
        claim:
          "We computed a(13), a(14) and a(15) of OEIS A003111, the numbers of complete mappings of `Z_{27}`, `Z_{29}` and `Z_{31}` that fix 0; a(15) is 2,427,915,096,775,283,929,115.",
        context:
          "As read on 15 November 2026, A003111 lists terms to a(12), the order-25 term credited to Yuh-Pyng Shieh (2006). To our knowledge no source lists these 3 values.",
        evidence: {
          level: "single",
          text: "Two programs of ours agree on a(15) and at least 3 on a(13) and a(14); we know of no recount by others.",
        },
        refs: [{ label: "OEIS A003111", href: "https://oeis.org/A003111" }],
        figure: { value: "2,427,915,096,775,283,929,115", caption: "a(15): complete mappings of Z_{31} fixing 0" },
      },
      {
        id: "complete-mappings-groups",
        topic: "Complete mappings",
        claim: "We counted the complete mappings of 23 groups: 21 of orders 24 to 28 and 2 of order 32.",
        context:
          "Wanless (2007) gives counts for orders 3 to 23 and `Z_{25}`, and ours agree for orders 3 to 23. The other 6 of orders 24 to 28 have none (Hall and Paige). To our knowledge no source lists these counts.",
        evidence: {
          level: "single",
          text: "The counts come from one family of programs of ours; only `Z_{27}` has a check by a program written without reading theirs.",
        },
      },
      {
        id: "oeis-a003179",
        topic: "Self-dual codes",
        claim:
          "We computed the number of binary self-dual codes of each even length from 42 to 56, up to coordinate permutation.",
        context:
          "As read on 15 November 2026, OEIS A003179 lists lengths up to 36. Totals are published for lengths 38 and 40; to our knowledge none is published for length 42 or above.",
        evidence: {
          level: "single",
          text: "Two programs of ours agree on every intermediate value; a third recomputed 22.6% to 30.0% of them at lengths 52 to 56 without mismatch.",
        },
        refs: [{ label: "OEIS A003179", href: "https://oeis.org/A003179" }],
      },
      {
        id: "oeis-a094927",
        topic: "Stabilizer states",
        claim:
          "We computed 8 terms of OEIS A094927, the number of stabilizer states on 13 to 20 qubits up to equivalence, and derived the matching terms of A090899.",
        context:
          "Both sequences list terms to 12 qubits, as read on 15 November 2026. Danielsen and Parker (2006) gave a lower bound of 72,573,549 for 13 qubits; we find 99,941,357.",
        evidence: {
          level: "single",
          text: "Two programs of ours agree on every intermediate value; further programs of ours reproduce the 13 to 16 qubit counts; no outside recount is known.",
        },
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
      "A code’s minimum distance decides how many errors it can survive. Computing it exactly is NP-hard, so standards and tables often list a bound where the true value is unknown.",
    results: [
      {
        id: "5g-nr-ldpc-distances",
        topic: "5G NR",
        claim:
          "We computed the minimum distance of 860 sub-codes of the 5G NR base graphs, each with an explicit codeword of that weight.",
        context:
          "Each takes the first rows of base graph 1 or 2 at one lifting size, some punctured; lengths reach 11,904. These are sub-codes, not the standard’s full codes. We claim no priority over the KAIST CoCoA Lab database of codewords.",
        evidence: {
          level: "single",
          text: "A published script checks every codeword; the lower bounds come from one program of ours, without a certificate.",
        },
        figure: { value: "860", caption: "sub-codes of the 5G NR base graphs with a computed minimum distance" },
      },
      {
        id: "5g-nr-corrections",
        topic: "5G NR",
        claim:
          "In Table 4 of arXiv:2607.04716v1, `d(C′(E[4], 48))` is 5, not 6, and we compute `d(C(E[4], 192)) = 10`, not 8.",
        context:
          "`C(E[4], q)` is the code of the first 4 rows of base graph 1 of 3GPP TS 38.212 at lifting size `q`; `C′` punctures its first `2q` positions.",
        evidence: {
          level: "single",
          text: "A published script checks the value 5; the lower bound 10 is an exhaustive computation by 2 programs of ours that share inputs.",
        },
        refs: [LDPC_PAPER],
      },
      {
        id: "5g-nr-open-bracket",
        topic: "5G NR",
        claim: "Table 4 of arXiv:2607.04716v1 lists `d(C(E[4], 384))` as 8 to 14; we compute 11.",
        context:
          "The codes use the first 4 rows of base graph 1 of 3GPP TS 38.212. The study’s headline code `C′(E[6], 384)`, with 6 rows, is not settled: we have 11 to 13 against its 8 to 14.",
        evidence: {
          level: "single",
          text: "A published script checks a word of weight 11; the lower bound 11 is an exhaustive computation by 2 programs of ours, without a certificate.",
        },
        refs: [LDPC_PAPER],
      },
      {
        id: "record-binary-codes",
        topic: "Linear codes",
        claim:
          "Five binary linear codes, `[111, 37, 27]`, `[152, 38, 42]`, `[172, 43, 46]`, `[159, 53, 35]` and `[174, 58, 37]`, have minimum distance above the lower bounds listed at codetables.de.",
        context:
          "Each exceeds the lower bound listed on 16 November 2026, by 1 for 4 codes and by 2 for `[152, 38, 42]`. Puncturing, shortening, subcodes and extension raise the lower bound in 24 cells of that table, the five included.",
        evidence: {
          level: "candidate",
          text: "Separately written programs of ours recomputed every distance from the published matrices; no outside review, and novelty is not established.",
        },
        refs: [{ label: "codetables.de", href: "https://www.codetables.de" }],
      },
    ],
  },
  {
    id: "quantum-error-correction",
    title: "Quantum error correction",
    intro:
      "A quantum memory survives only if no small set of faults can corrupt it. Circuit distance is the size of the smallest such set in the circuit that actually runs the code.",
    results: [
      {
        id: "ibm-two-gross-circuit-distance",
        topic: "Bivariate-bicycle codes",
        claim:
          "Our rebuild of the Bravyi et al. two-gross `[[288, 12, 18]]` memory circuit, 18 noisy cycles, has circuit distance exactly 16 in both bases, below the published upper bound 18.",
        context:
          "Crocker posted 16-fault sets on 21 October 2026. Cheng, Guo and Pan, on 5 November 2026, are the earliest public report we found of the exact value, certified 16. We claim no priority for the upper bound.",
        evidence: {
          level: "certified",
          text: "Witnesses for 16 are checkable; the unreleased lower bound comes from 2 programs of ours sharing a method; Cheng, Guo and Pan report certifying it.",
        },
        figure: { value: "16", caption: "circuit distance, two-gross memory circuit" },
      },
      {
        id: "pan-period-11",
        topic: "Bivariate-bicycle codes",
        claim:
          "G. Pan’s period-11 gross-code schedule, applied to the `[[288, 12, 18]]` code, has circuit distance 18 in both bases for 1 to 40 noisy cycles.",
        context:
          "Noise model: that of our circuit builder, unreleased. Pan’s repository gives no result for this code; release 3.0 supersedes the schedule. For 41 to 45 cycles the value follows from a time-shift identity; beyond 45 it is assumed.",
        evidence: {
          level: "single",
          text: "One program of ours ran an unreleased exhaustive computation to 40 cycles; a second program reproduces it to 20 cycles, on inputs from the first.",
        },
      },
      {
        id: "schedules-c1-c2",
        topic: "Bivariate-bicycle codes",
        claim:
          "Two non-interleaved schedules of ours, C1 and C2, have extended-code distance 18 for `[[288, 12, 18]]`, so by Strikis, Browne and Beverland their circuit distance is 18 in both bases.",
        context:
          "Cheng, Guo and Pan (5 November 2026) are the earliest public report we found of schedules reaching 18 for this code; we claim no priority. The reduction is not re-proved here, and holds in its own noise model.",
        evidence: {
          level: "single",
          text: "Unreleased exhaustive computations by programs of ours; a second program reproduces C1 and nothing of C2; no outside review.",
        },
      },
      {
        id: "ibm-360-qubit",
        topic: "Bivariate-bicycle codes",
        claim:
          "The X-basis memory circuit of the `[[360, 12, 24]]` code in tesseract-decoder’s test data, 24 rounds, SI1000 noise, has circuit distance at least 19.",
        context:
          "dist-m4ri’s benchmark file (commit e9cac19, 5 November 2026) lists 12 to 23 for this circuit. We know of no circuit-level result for this code published by IBM.",
        evidence: {
          level: "single",
          text: "One program of ours excludes weights up to 18 in an unreleased exhaustive computation; a further program sharing its method confirms up to 16.",
        },
      },
      {
        id: "distance-engine",
        topic: "Method",
        claim:
          "On the two-gross memory circuit our distance programs’ search grew 4.9 to 5.0 times per unit of weight, against 10 to 11 times for G. Pan’s release 2.0 search code.",
        context:
          "Ours: search nodes, weights 14 to 15. Pan’s: single-thread CPU time, weights 7 to 10. One program decided distance 16 in 85 s (Z), 79 s (X), excluding preparation, on 16 threads. Not compared with Cheng, Guo and F. Pan.",
        evidence: {
          level: "internal",
          text: "Measured by us on a loaded shared machine; the programs are unreleased and no one outside the lab has repeated the runs.",
        },
      },
    ],
  },
  {
    id: "sat-and-optimisation",
    title: "SAT, optimisation and proof",
    intro:
      "The SAT Competition collects formulas that the best solvers struggle to decide. A refutation can be checked by anyone when it carries a certificate; the speed entries below are our own measurements.",
    results: [
      {
        id: "sat-competition-unknown",
        topic: "SAT Competition 2025",
        claim:
          "Eleven SAT Competition 2025 main-track formulas listed as “unknown” in the Global Benchmark Database on 15 November 2026 have checkable refutation certificates.",
        context:
          "“Unknown” is the database’s default value. The submitters of 10 of the 11 state that their formulas are unsatisfiable, and other solvers decided 4 within 120 s. They are 4 Tseitin formulas and 7 round-robin schedules.",
        evidence: {
          level: "single",
          text: "Published checkers of ours verify each certificate; a second program re-derived 7 of the 11; none is a DRAT or LRAT proof.",
        },
      },
      {
        id: "sat-tseitin",
        topic: "SAT Competition 2023–25",
        claim:
          "On 20 XOR-structured instances our program refuted within 200 s, the better of Kissat and CaDiCaL took a geometric mean of at least 341.6 times as long as our program.",
        context:
          "Instances are from the 2023–25 main tracks. Kissat 4.0.4 and CaDiCaL 3.0.1 ran with default options on one thread and a 200 s limit; both timed out on 18 of 20, so the mean is a lower bound.",
        evidence: {
          level: "internal",
          text: "Measured by us in one run per instance on a shared, loaded machine; the times of our program are unreleased.",
        },
      },
      {
        id: "sat-cardinality",
        topic: "SAT Competition 2023–25",
        claim:
          "On 19 at-most-one instances our program refuted within 60 s, the better of Kissat and CaDiCaL took a geometric mean of at least 44.5 times as long as our program.",
        context:
          "A family-stratified sample from the 2023–25 main tracks; the selection rule is not recorded. Kissat 4.0.4 and CaDiCaL 3.0.1: default options, one thread, 60 s limit; both timed out on 14 of 19, so the mean is a lower bound.",
        evidence: {
          level: "internal",
          text: "Measured by us in one run per instance on a shared, loaded machine; the times of our program are unreleased.",
        },
      },
      {
        id: "metabolic-cut-sets",
        topic: "Metabolic networks",
        claim:
          "On the E. coli core network, we list 747 minimal cut sets of size at most 4 in single runs 87 to 215 times faster than our own mixed-integer baseline.",
        context:
          "The baseline restarts a mixed-integer program per cut set; no published tool was run on the same machine, so the ratios do not estimate the gain over published tools. We claim no priority for the method.",
        evidence: {
          level: "internal",
          text: "Our method and baseline agree on every set; a third program of ours reproduces sizes 1 to 3; sizes 2 to 4 equal published counts.",
        },
      },
    ],
  },
  {
    id: "physics-and-materials",
    title: "Physics and materials",
    intro:
      "Finding a material’s ground state, or the density of states of a spin model, means searching over configurations. Faster exact methods bring larger systems within reach.",
    results: [
      {
        id: "cluster-expansion",
        topic: "Materials",
        claim:
          "Our solver finds exact ground states of 24 compact Ag–Pd pair-model cells with 8.5 to over 7,000 times less CPU time than the cell solver of Huang et al.",
        context:
          "Huang’s solver ran on our encoding and cells we chose. Ours was slower on 7 of 17 nearer-image and all 4 triangular cells. With symmetry-breaking clauses the margin falls 4 to 5 times. We claim no priority for the method.",
        evidence: {
          level: "internal",
          text: "Solvers written by others returned our minimum on 20 of the 24 cells, and the energies are checkable as upper bounds; timings are ours.",
        },
      },
      {
        id: "ising-3d",
        topic: "Statistical physics",
        claim:
          "In single runs, our symmetry-reduced transfer-matrix program took 72.8 s wall-clock for the periodic 4 × 4 × 4 Ising density of states, 1.6 times our engine’s user CPU time.",
        context:
          "The baseline is our own implementation of the published method and reuses part of the engine’s source; each program ran once, under load, with a different timer. That the engine is faster than the published method is not established.",
        evidence: {
          level: "internal",
          text: "Two programs of ours sharing no code agree on the density-of-states table, which passes moment checks and matches OEIS A008551 for levels 0 to 50.",
        },
      },
    ],
  },
  {
    id: "platform",
    title: "The system",
    intro:
      "These entries are about the system itself: how it recognises the class of a model, and what it did with two problems the lab had not attempted.",
    results: [
      {
        id: "solver-compiler",
        topic: "Class recognition",
        claim:
          "From a model file, the system tests whether it lies in one of 5 classes declared in advance, configures a prebuilt solver and checks the answer on the original model.",
        context:
          "In a blind test, 5 of 8 in-class models received the right class and none of 3 negatives fired. Automatic generation of solvers is not shown. Algorithm selection by instance form is established; we claim no priority.",
        evidence: {
          level: "internal",
          text: "One program of ours made the models and key, another the detector; the models’ author had read notes on earlier detection failures; no outside review.",
        },
      },
      {
        id: "solver-factory",
        topic: "Checker first",
        claim:
          "For two problems the lab had not attempted before, a solver agreed with a checker written first, 4 min 46 s and 5 min 55 s after the clock started.",
        context:
          "The problems are minimum-distance bounds for quasi-cyclic codes and sums of three cubes. Both solvers re-implement published methods, and the lab chose both problems; the first lies in a domain it had worked.",
        evidence: {
          level: "internal",
          text: "One program of ours wrote each checker and solver from one specification; they agree on 300 of 300 codes and 101 of 101 search boxes.",
        },
      },
    ],
  },
];

/**
 * The limits-and-certificates line of results lives in results-frontiers.ts. Its fields come before "The system",
 * and its entries for a field that already exists here are added to that field, before the field's closing
 * "Method" row if it has one.
 */
const LAST = "platform";
const withAdditions = (d: Domain): Domain => {
  const extra = frontierAdditions[d.id];
  if (!extra) return d;
  const method = d.results.at(-1)?.topic === "Method" ? d.results.slice(-1) : [];
  return { ...d, results: [...d.results.slice(0, d.results.length - method.length), ...extra, ...method] };
};
export const domains: Domain[] = [
  ...baseDomains.filter((d) => d.id !== LAST).map(withAdditions),
  ...frontierDomains,
  ...baseDomains.filter((d) => d.id === LAST),
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
