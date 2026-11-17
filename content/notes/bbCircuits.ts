import type { Note } from "./types";

const FILES = "/files/bivariate-bicycle-circuit-distances";
const TESS =
  "https://github.com/quantumlib/tesseract-decoder/blob/98c663db388ab095939647a165c87b4d31cdd6b1/testdata/bivariatebicyclecodes";
const PAN = "https://github.com/GavinNull/gross-code-distance-12";

/**
 * Public sources: references [1] to [7] and the files listed on the page.
 * Private records of the lab are not cited.
 */
export const bbCircuits: Note = {
  slug: "bivariate-bicycle-circuit-distances",
  id: "KK-R-0011",
  kind: "note",
  type: "Exact value",
  title:
    "Two non-interleaved schedules and the period-11 schedule of G. Pan (to 40 cycles) give `[[288, 12, 18]]` memory circuits of circuit distance 18.",
  statement:
    "Circuit distance is the fewest faults that flip a logical observable undetected. Two non-interleaved schedules of ours, C1 and C2, and G. Pan’s period-11 gross-code schedule (up to 40 noisy cycles) give `[[288, 12, 18]]` memory circuits of distance 18 in both bases. A tesseract-decoder `[[360, 12, 24]]` memory circuit (24 rounds, SI1000 noise) has X-basis distance at least 19.",
  field: "Quantum error correction",
  results: ["schedules-c1-c2", "pan-period-11", "ibm-360-qubit", "distance-engine"],
  published: "2026-11-15",
  evidence: "single",
  header: {
    before:
      "Bravyi et al. [1] print `d_{circ} ≤ 18` for `[[288, 12, 18]]` and list `[[360, 12, ≤ 24]]`. Cheng, Guo and F. Pan [2] report schedules reaching 18; dist-m4ri [3] lists `[12, 23]` for the 360-qubit X-basis circuit, nothing for Z (read 15 November 2026).",
    evidence:
      "Exhaustive computations by programs of ours. A second program, written separately, reproduces C1 in full and part of the period-11 result, and nothing of C2 or the 360-qubit circuit. The two share a method family and its machine-unchecked correctness argument, our circuit builders and Stim. No review outside the lab has taken place.",
    check:
      "One half: C1 and C2. Their extended codes build in under a second with extended_code.py; an exact solver of your own must show that no 17 or fewer of the 720 columns sum to zero syndrome and nonzero observable action.",
    notEstablished:
      "That every undetected logical fault set has at least 18 faults (19 for the 360-qubit circuit): the exclusions are unreleased exhaustive computations of ours, not certificates others can check.",
    method: "Not published.",
  },
  sections: [
    {
      title: "What was known",
      blocks: [
        {
          p: "Strikis, Browne and Beverland [4] prove that a non-interleaved single-ancilla CNOT circuit has circuit distance equal to that of its extended code: the code’s check and observable matrices with one column added per hook fault, a single fault on a check’s ancilla that spreads to the data qubits of the check’s later CNOTs. For the gross code `[[144, 12, 12]]` they bound all non-interleaved circuits by 11 (Proposition 4).",
        },
        {
          table: {
            head: ["Source", "Prior result", "Timesteps per cycle"],
            rows: [
              [
                "Bravyi et al. [1]",
                "Standard schedule of `[[288, 12, 18]]`: `d_{circ} ≤ 18`. Distance 16 is certified in [2] and in [the two-gross note](/research/two-gross-circuit-distance).",
                "8",
              ],
              [
                "Cheng, Guo and F. Pan [2], 5 November 2026",
                "Of 8,496 uniform schedules of seven CNOT layers per cycle (one gate order for all checks of a type), 84 have distance 18 at one noisy cycle; for one of them 17 or fewer faults are excluded at two cycles and 16 or fewer at three.",
                "9",
              ],
              [
                "G. Pan [5], release 2.0, 24 October 2026",
                "Period-11 circuits of circuit distance 12 for the gross code and 10 for `[[90, 8, 10]]`, their code distances; no result for `[[288, 12, 18]]`.",
                "11",
              ],
            ],
            caption:
              "Timesteps per cycle count reset and measurement; the eight of the standard schedule and the nine of [2] are from [2].",
            numeric: [2],
          },
        },
        {
          p: "To our knowledge (searched 15 November 2026), [2] is the earliest dated public report of schedules reaching 18 for this code.",
        },
      ],
    },
    {
      title: "The result",
      blocks: [
        {
          label: "C1 and C2",
          statement:
            "For both error types the extended code of C1 and of C2 has distance 18: no set of 17 or fewer of its 720 columns has zero syndrome and nonzero observable action. By Theorem 1 of [4], in its noise model, their non-interleaved memory circuits have circuit distance 18 in both bases for every number of cycles.",
        },
        {
          code: "terms (ell = m = 12):   A1 = x^3   A2 = y^2   A3 = y^7   B1 = y^3   B2 = x   B3 = x^2\nP  = A1 A3 A2 B2 B1 B3\nP' = A1 A3 A2 B3 B1 B2\nQ  = A1 A2 A3 B1 B2 B3\nC1: X check (a, b) and Z check (a, b) use order P if a + b is even, else Q\nC2: X check (a, b) and Z check (a, b) use order P' if a is even, else Q\ne(x^i y^j) = (i, j)\nX check (a, b): left qubit (a, b) + e(A_k), right qubit (a, b) + e(B_k)\nZ check (a, b): left qubit (a, b) − e(B_k), right qubit (a, b) − e(A_k)",
          caption:
            "Orders run first CNOT to last. Single-ancilla: one ancilla per check. Non-interleaved: in every cycle all X-check CNOTs precede all Z-check CNOTs. Interleaved layerings of these orders have circuit distance at least 18 by inequality (12) of [4], at most 18 by the code distance.",
        },
        {
          label: "Period-11 schedule",
          statement:
            "The period-11 gross-code schedule of G. Pan [5], applied by term name to `[[288, 12, 18]]`, has circuit distance 18 in both bases for 1 to 40 noisy cycles, and for 41 to 45 given the time identity that the detector error model of `R + 1` cycles is that of `R` cycles with one cycle repeated (checked for `R ≤ 44`).",
        },
        {
          code: '{"P": 11,\n "X": {"reset": 0,  "order": "A2A1A3B3B2B1", "steps": [1, 2, 3, 4, 5, 9], "meas": 10},\n "Z": {"reset": 10, "order": "B1B2B3A3A1A2", "steps": [0, 4, 5, 6, 7, 8], "meas": 9}}',
          caption:
            "Transcription of u11_spec.json of [5]. Per check type: step modulo 11 of the reset, the six CNOTs in the order given, the measurement; a step below the reset step falls in the next period. Z round `j` starts one step before X round `j`.",
        },
        {
          p: "Period-11 noise: two-qubit depolarising faults after every CNOT, single-qubit faults on every idle qubit, flipped resets and measurements, noise-free data preparation and readout. Our builder is not released; on the gross code it gives the circuit distance 12 listed in [5].",
        },
        {
          label: "360-qubit circuit",
          statement:
            "The X-basis memory circuit of `[[360, 12, 24]]` in the test data of tesseract-decoder [6] (24 rounds, SI1000 noise [7]) has circuit distance at least 19, so with `[12, 23]` listed for it in [3] it lies in 19 to 23. Z basis: at least 16. We know of no circuit-level result for this code published by IBM.",
        },
        {
          code: "r=24,d=24,p=0.001,noise=si1000,c=bivariate_bicycle_X,nkd=[[360,12,24]],q=720,iscolored=True,A_poly=x^9+y+y^2,B_poly=y^3+x^25+x^26.stim",
          caption:
            "File name in testdata/bivariatebicyclecodes. The benchmark [3] circuit is this file at `p = 0.0001`, differing in noise strengths only; circuit distance does not depend on `p`. The Z-basis file has c=bivariate_bicycle_Z. Code distance: at most 24 in [1], certified 24 in [2].",
        },
        {
          table: {
            head: ["Result", "Checked by"],
            rows: [
              [
                "C1, C2: no 17 or fewer columns, both error types",
                "First program: all four extended codes. Second program: C1 only.",
              ],
              [
                "Period-11: distance 18 to 40 cycles, to 45 given the time identity",
                "First program: to 40 cycles. Second program: to 20 cycles. A third solver: to 17 cycles. Both on the first program’s inputs. Upper bound replayed at 1, 2, 5, 17 and 30 cycles.",
              ],
              [
                "360-qubit: X at least 19, Z at least 16",
                "X: first program, weights to 18. Z: a reduced problem only.",
              ],
            ],
            caption:
              "Evidence by result. Period-11 upper bound 18: a weight-18 data logical operator fires no detector at any cycle count.",
          },
        },
        {
          table: {
            head: ["Program", "Growth per unit of weight", "Measured as"],
            rows: [
              ["Ours, 2 programs sharing a method", "4.9 to 5.0", "search nodes, weights 14 to 15, both bases"],
              [
                "Search code of [5], release 2.0, run by us",
                "10 to 11",
                "CPU time on one thread, Z basis, weights 7 to 10, at machine load 60 to 82",
              ],
            ],
            caption:
              "Two-gross memory circuit of [KK-R-0003](/research/two-gross-circuit-distance), measured by us (Internal level). One program of ours decided distance 16 in 85.0 s (Z; 108 s on repeat) and 78.7 s (X), excluding 5.6 s preparation, on 16 threads of a loaded shared machine. Not compared with [2].",
          },
        },
      ],
    },
    {
      title: "How to check it",
      blocks: [
        {
          code: "python3 extended_code.py C1.design\nX-type errors: 144 detector rows, 12 observables, 720 columns (288 data, 432 residual)\nZ-type errors: 144 detector rows, 12 observables, 720 columns (288 data, 432 residual)",
          caption:
            "C2.design: same sizes. Residual: per check, hook errors on 2, 3 and 4 data qubits; those on 1 and 5 equal data-qubit columns modulo the check. A second argument writes the columns, which our programs’ extended codes match up to renumbering of detectors and observables.",
        },
        {
          p: "An exact solver of your own must find no set of 17 or fewer columns with zero syndrome and nonzero observable action in either extended code; one such set refutes the schedule. The other two results need circuits rebuilt in Stim from the files below.",
        },
      ],
    },
    {
      title: "What it changes",
      blocks: [
        {
          p: "Non-interleaved circuits reach the code distance of `[[288, 12, 18]]`; for the gross code they cannot [4].",
        },
      ],
    },
    {
      title: "Limits",
      blocks: [
        {
          list: [
            "The exclusions. Unreleased exhaustive computations by our own programs. A certificate or a rerun by others would close it.",
            "Period-11. Beyond 45 cycles the result is assumed; a machine-checked time identity would close that. The value is for the round pairing above, as in schedule.py of [5]; the unshifted pairing has undetected logical sets of 16 faults at the ends.",
            "Z basis, 360-qubit circuit. The bound 16 comes from a reduced problem whose own distance is 16; a direct search shows at least 14. A direct exclusion of 15 faults would close it.",
            "Cost. As non-interleaved circuits C1 and C2 need at least 12 CNOT layers per cycle (7 in [1]); the depth of interleaved layerings is not recorded.",
            "Reduction. Theorem 1 of [4] is not re-proved; a direct search of C1 at 2 cycles excludes 12 or fewer X-type faults. A direct search at 17 faults would close it.",
          ],
        },
      ],
    },
  ],
  files: [
    { label: "C1.design", href: `${FILES}/C1.design`, detail: "CNOT order of each of the 288 checks of C1" },
    { label: "C2.design", href: `${FILES}/C2.design`, detail: "CNOT order of each of the 288 checks of C2" },
    {
      label: "extended_code.py",
      href: `${FILES}/extended_code.py`,
      detail: "builds the 720-column extended code of each error type from a design file; Python 3, no packages",
    },
    {
      label: "u11_spec.json",
      href: `${PAN}/blob/v2.0/search/experiments/e032/u11_spec.json`,
      detail: "period-11 gross-code schedule of [5], transcribed above; public file of another author",
    },
    {
      label: "360-qubit X-basis circuit",
      href: `${TESS}/r=24,d=24,p=0.001,noise=si1000,c=bivariate_bicycle_X,nkd=%5B%5B360,12,24%5D%5D,q=720,iscolored=True,A_poly=x%5E9%2By%2By%5E2,B_poly=y%5E3%2Bx%5E25%2Bx%5E26.stim`,
      detail: "Stim circuit of the third result; public data of another group",
    },
  ],
  refs: [
    {
      text: "S. Bravyi, A. W. Cross, J. M. Gambetta, D. Maslov, P. Rall, T. J. Yoder, High-threshold and low-overhead fault-tolerant quantum memory, Nature 627, 778–782 (2024), arXiv:2308.07915v2: Tables 1 and 3.",
      href: "https://arxiv.org/abs/2308.07915",
    },
    {
      text: "B. Cheng, N. Guo, F. Pan, Certifying quantum code and circuit distances at scale, arXiv:2611.08247v1 (5 November 2026): main text, Supplementary Tables 13 and 14.",
      href: "https://arxiv.org/abs/2611.08247",
    },
    {
      text: "dist-m4ri (GitHub repository QEC-pages/dist-m4ri), benchmark/BENCHMARK.md at commit e9cac19 (5 November 2026, the last change to the file; read 15 November 2026).",
      href: "https://github.com/QEC-pages/dist-m4ri/blob/e9cac19a2dc19d4845fefa0fe4b21bcc9ad3058d/benchmark/BENCHMARK.md",
    },
    {
      text: "A. Strikis, D. E. Browne, M. E. Beverland, High-performance syndrome extraction circuits for quantum codes, arXiv:2603.05481v2 (14 September 2026): Definitions 2 and 3, Theorem 1, Proposition 4.",
      href: "https://arxiv.org/abs/2603.05481",
    },
    {
      text: "G. Pan (GitHub account GavinNull; the repository page names Guancheng Pan as author), gross-code-distance-12 (GitHub repository): release 2.0 (24 October 2026) has period-11 circuits; release 3.0 (8 November 2026) supersedes it and gives period 10 for the gross code; the README and release notes do not mention `[[288, 12, 18]]` (read 15 November 2026).",
      href: PAN,
    },
    {
      text: "quantumlib/tesseract-decoder (GitHub repository), directory testdata/bivariatebicyclecodes, unchanged since commit 98c663d (1 March 2025): Stim circuits of bivariate bicycle codes with noise=si1000, including nkd=[[360,12,24]] with r=24 (listing read 15 November 2026).",
      href: "https://github.com/quantumlib/tesseract-decoder/tree/98c663db388ab095939647a165c87b4d31cdd6b1/testdata/bivariatebicyclecodes",
    },
    {
      text: "C. Gidney, M. Newman, A. Fowler, M. Broughton, A fault-tolerant honeycomb memory, Quantum 5, 605 (2021), arXiv:2108.10457: definition of the SI1000 noise model.",
      href: "https://arxiv.org/abs/2108.10457",
    },
  ],
  cite: "KalKram, Circuit distances of bivariate bicycle syndrome schedules, KK-R-0011, https://kalkram.com/research/bivariate-bicycle-circuit-distances, 2026.",
  history: [
    {
      date: "2026-10-24",
      text: "G. Pan publishes release 2.0 of the gross-code repository with period-11 circuits [5].",
    },
    {
      date: "2026-11-05",
      text: "Cheng, Guo and F. Pan post a preprint with schedules of distance 18 at one noisy cycle for the two-gross code [2].",
    },
    {
      date: "2026-11-08",
      text: "G. Pan publishes release 3.0, which supersedes release 2.0 and gives period 10 for the gross code [5].",
    },
    { date: "2026-11-15", text: "This account published." },
  ],
};
