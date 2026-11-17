import type { Note } from "./types";


/**
 * Public sources (references [1] to [12]), opened on 15 November 2026. Locators for facts the page states without them:
 *
 * The verification bundle, single commit 0e2456e (28 October 2026): README.md, VERIFICATION.md,
 *   SHA256SUMS, NOTICE, verify.py, verify_stim.py, verify_transcription.py, gen_bb_memory.py and the four witness files.
 * verify.py run on 15 November 2026 from a fresh clone at the pinned commit: Python 3.15.0, NumPy 2.5.4, Stim 1.16.0,
 *   Apple M4, 31 seconds.
 * Bravyi et al., arXiv:2308.07915v2 (21 February 2024), Tables 1 and 3 and Sections 3 and 6. Table 1 gives circuit-noise
 *   results for the five smaller codes; the [[360, 12, <= 24]] code appears in Table 3 as a code only.
 * Bravyi et al., BivariateBicycleCodes, decoder_setup.py at fa77e33 (read through WebFetch, a summarised reading).
 * Yoder et al., arXiv:2506.03094v1 (3 June 2025), Table 4 and Section 2.7.
 * Beverland et al., arXiv:2511.15177v1 (19 November 2025), Tables 1 and 2 and Sections 2.4 and 4.
 * Crocker, Zenodo record 23535390 (version 1.0, 2026-10-21; no lower bound claimed) and the later versions through the
 *   Zenodo API metadata. The witness archives were not read.
 * Cheng, Guo, Pan, arXiv:2611.08247v1 (5 November 2026): Table 3 (BB [[288, 12, 18]], 18 rounds, d = 16), Supplementary
 *   Tables 8 and 11, Sections 6.1 and 9.1 to 9.3; dist-m4ri 0.14.7 and the value 24 are from its Supplementary Table 8.
 * Strikis, Browne, Beverland, arXiv:2603.05481v2: Definitions 2 and 3, Theorem 1, Proposition 3, Corollary 1.
 * Gidney et al., arXiv:2108.10457: definitions of SD6 and SI1000.
 * dist-m4ri: the benchmark file was not opened on 15 November 2026; its values are from the reading of October 2026.
 *
 * Private records of the lab are not cited.
 */
export const twoGross: Note = {
  slug: "two-gross-circuit-distance",
  id: "KK-R-0003",
  kind: "paper",
  type: "Exact value",
  title:
    "IBM’s two-gross `[[288, 12, 18]]` memory circuit has circuit distance exactly 16, below the published upper bound of 18.",
  statement:
    "The Bravyi et al. [1] memory circuit for the bivariate bicycle code `[[288, 12, 18]]` in its original schedule, rebuilt in Stim [2] with 18 noisy cycles and 1 noise-free cycle, has circuit distance 16 in both memory bases. The circuit distance is the fewest faults (errors of the noise model) that fire no detector (a check outcome compared with the previous one) and flip a logical observable (a parity of final data measurements reading out a logical operator).",
  field: "Quantum error correction",
  results: ["ibm-two-gross-circuit-distance"],
  published: "2026-11-15",
  evidence: "certified",
  header: {
    before:
      "Upper bound `d_{circ} ≤ 18` in [1], [3], [4]; no lower bound found there (read 15 November 2026). dist-m4ri [5] listed lower bound 12 for the X-basis circuit (read October 2026). Crocker [6] posted 16-fault sets; Cheng, Guo and Pan [7] report certified distance 16.",
    evidence:
      "Upper bound: each witness is its own certificate; a Stim checker replays all 4, a NumPy checker the 2 original-schedule ones; both share the circuit specification of decoder_setup.py [8]. Lower bound: 2 programs of ours, written separately, share one exhaustive method, its machine-unchecked correctness argument and Stim’s detector error model. No review outside the lab.",
    check:
      "One half: the upper bound. Run python verify.py at the pinned commit of the public repository [2] (Python 3.12 or newer, NumPy, Stim; about 30 seconds); it ends with a line beginning VERIFIED. The lower bound is not released.",
    notEstablished:
      "The lower bound, circuit distance at least 16, rests on an unreleased exhaustive computation run by 2 programs of ours that share a method.",
    method: "Not published.",
  },
  sections: [
    {
      title: "What was known",
      blocks: [
        {
          p: "Table 1 of Bravyi et al. [1] lists `d_{circ} ≤ 18` for the `[[288, 12, 18]]` code (288 data qubits, 12 logical qubits, distance 18), and Section 3 calls the bound unlikely to be tight. Yoder et al. [3] (Table 4) and Beverland et al. [4] (Table 2) list the same bound, [3] for the idle instruction of its architecture and [4] under Z-type noise; [3] writes that it is not known to be below 18 (Section 2.7).",
        },
        {
          p: "The dist-m4ri benchmark [5], version 0.14.1 as read in October 2026, lists the interval 12 to 18 for the X-basis circuit: 12 from a model of the circuit, 18 from a random-search codeword.",
        },
        {
          p: "Carson Crocker deposited explicit 16-fault sets on Zenodo on 21 October 2026 (version 1.0) [6] and claims no lower bound. We committed our repository on 28 October 2026 [2] and claim no priority for the upper bound. Cheng, Guo and Pan [7] (preprint, 5 November 2026) report circuit distance 16 in both bases, with a lower bound they call certified; we cite [7] as the earliest dated public report of the exact value that we found.",
        },
      ],
    },
    {
      title: "The result",
      blocks: [
        {
          label: "Upper bound",
          statement:
            "The circuit distance is at most 16 for the original schedule and for a variant of it. The witnesses are 4 sets of 16 faults, each fault a Pauli error inserted immediately after a CNOT: Z-type faults in X-basis memory and X-type faults in Z-basis memory, for each schedule. The variant exchanges the roles of the terms `A_{2} = y^{2}` and `A_{3} = y^{7}` in the schedule. Each set fires none of the 2,736 detectors and changes a logical observable.",
        },
        {
          label: "Lower bound",
          statement:
            "For the original schedule the circuit distance is at least 16 in each memory basis: no set of fewer than 16 faults fires no detector and changes a logical observable.",
        },
        {
          p: "The circuit is the depth-8 memory circuit of decoder_setup.py at commit fa77e33 [8] with 18 noisy cycles and 1 noise-free closing cycle; decoder_setup.py itself appends 2. The two conventions have the same undetected logical errors: in Z-type noise (X-basis memory) the fault signatures are identical, and in X-type noise (Z-basis memory) the second closing cycle adds 144 signatures, each firing a detector that no other fault fires, so none occurs in an undetected logical error. Noise acts on check preparation and measurement, idle data qubits and every CNOT, as in decoder_setup.py and [4]. Initial data preparation, final data measurement, the closing cycle and the Z-check reset ending the last noisy cycle are noise-free; with that reset noisy and 1 closing cycle, Z-basis memory has undetected logical errors of 4 faults.",
        },
        {
          code: "ell = m = 12\n(A1, A2, A3) = (x^3, y^2, y^7)\n(B1, B2, B3) = (y^3, x, x^2)\nsX = [idle, 1, 4, 3, 5, 0, 2]\nsZ = [3, 5, 0, 1, 2, 4, idle]",
          caption:
            "Original schedule. x and y are commuting cyclic shifts of order 12; A and B are the sums of their terms. sX and sZ list, per round, the neighbour each check couples to, numbered as in decoder_setup.py [8]; idle is a round without a CNOT.",
        },
        {
          p: "Each fault has a signature: the detectors it fires and the logical observables it flips. In each basis there are 26,208 distinct nonzero signatures over 2,736 detectors and 12 observables, a binary matrix with 2,748 rows and 26,208 columns. Exhaustive search shows that no set of at most 15 columns sums to zero on the detector rows and to nonzero on the observable rows. Two programs of ours, written separately, completed it in both bases; they share no code beyond boilerplate. The first ran on the public Stim files of tesseract-decoder [9], isomorphic by checks of ours to the models of gen_bb_memory.py in [2]; the second ran on the latter.",
        },
        {
          p: "The second program was checked further: about 1% of its work was re-run with identical results, a Stim-free fault simulator reproduced both matrices, and tests against brute force on about 11,000 small instances found no disagreement. Weight 15 was not rerun. Beyond weight 12 we have run no algorithm of a different kind. Cheng, Guo and Pan [7] certified 16 by a different method on the same files [9] and on circuits they rebuilt from [8] at 18 cycles.",
        },
        {
          table: {
            head: ["Result", "Evidence level", "Basis"],
            rows: [
              [
                "Circuit distance 18 in both bases for the period-11 schedule (11 timesteps per cycle) of the gross-code repository of G. Pan [10], release 2.0, applied to this code by our circuit builder, for up to 40 noisy cycles. The builder’s model: two-qubit depolarising faults after every CNOT, single-qubit faults on every idling data or check qubit and after resets, flipped measurements, noise-free data preparation and readout, final detectors comparing the last check outcomes with the data readout. The repository states no two-gross result.",
                "One engine",
                "Re-checked with a separate driver around our first program’s search code up to 40 cycles, and with our second program up to 20 cycles. The driver’s inputs were reproduced mainly by further runs of the first program. Cycles 41 to 45 use a time-shift identity that we verified; beyond 45 the value rests on a periodicity assumption. The upper bound 18 was injected at cycle counts 1, 2, 5, 17 and 30 and is inferred for the others.",
              ],
              [
                "C1 and C2, two schedules we designed, are non-interleaved single-ancilla CNOT schedules in the sense of [11] and have extended-code distance (Definition 3 of [11]) at least 18 in both bases; with code distance 18, Proposition 3 and Corollary 1 of [11] give circuit distance 18 in its noise model. A direct circuit-level search of C1 (2 cycles, X-type) excludes sets of up to 12 faults.",
                "One engine; Independently checked for C1 alone",
                "C1: 2 programs of ours with the same method, both on extended-code matrices from our builder, the second on C1 only. C2: the first program only. No public date; no review outside the lab.",
              ],
              [
                "X-basis memory circuit of the bivariate bicycle code `[[360, 12, 24]]` (listed as `[[360, 12, ≤ 24]]` in Table 3 of [1]; distance 24 certified in [7]), 24 noisy cycles, SI1000 noise [12], from the Stim files of tesseract-decoder [9]: circuit distance at least 19. Z basis: at least 16. Not a circuit we know IBM to have published.",
                "One engine",
                "Weights up to 18 were excluded by one program of ours and up to 16 also by a further program of ours that shares its method. dist-m4ri [5] lists the X-basis interval 12 to 23 for this circuit, 12 from a model of the circuit and 23 from a found codeword (version 0.14.1, read October 2026).",
              ],
            ],
            caption:
              "Related results of ours: unreleased, not established here. Cheng, Guo and Pan [7] certify distance 18 in both bases for schedules of 9 timesteps per cycle at 1 noisy cycle. Theirs is the earlier public report; we claim no priority for C1 or C2.",
          },
        },
      ],
    },
    {
      title: "How to check it",
      blocks: [
        {
          code: "# run inside the verification bundle for this note, available from the lab on request\npython3 -m venv .venv\nsource .venv/bin/activate\npython -m pip install -r requirements.txt\npython verify.py",
        },
        {
          p: "The script checks the SHA-256 hashes of 7 files, runs both checkers and exits nonzero if any check fails. On 15 November 2026 it passed in 31 seconds on an Apple M4 laptop (Python 3.15.0, NumPy 2.5.4, Stim 1.16.0).",
        },
        {
          code: "2. Z-type faults (X-basis memory, 18 noisy cycles + 1 noise-free): 16 single CNOT faults, detectors fired: 0 of 2736, logical observables flipped: [0, 3, 4, 6, 7, 8, 10], no proper subset undetected: True  PASS\n2. X-type faults (Z-basis memory, 18 noisy cycles + 1 noise-free): 16 single CNOT faults, detectors fired: 0 of 2736, logical observables flipped: [1, 3, 4, 5, 6, 8, 9], no proper subset undetected: True  PASS\n3. Term-order variant: the same code with the roles of A2 = y^2 and A3 = y^7 exchanged in the schedule\n   Z-type faults (X-basis memory, 18 noisy cycles + 1 noise-free): 16 single CNOT faults, detectors fired: 0 of 2736, logical observables flipped: [1, 2, 3, 4, 5, 6, 7, 9, 11], no proper subset undetected: True  PASS\n   X-type faults (Z-basis memory, 18 noisy cycles + 1 noise-free): 16 single CNOT faults, detectors fired: 0 of 2736, logical observables flipped: [0, 1, 3, 4, 8, 9, 11], no proper subset undetected: True  PASS\nALL CHECKS PASS\n…\nVERIFIED: all four 16-fault witnesses pass (circuit distance <= 16).",
          caption:
            "Output of verify.py, abridged: the Stim witness checks, the first 2 for the original schedule and the last 2 for the variant, then the final line. Omitted lines report file hashes, sizes compared with Beverland et al. and the NumPy checks.",
        },
        {
          p: "The Stim checker replays each witness, confirms that it fires none of the 2,736 detectors yet changes a logical observable, and enumerates all `2^{16}` subsets to confirm that every nonempty proper subset fires a detector. The NumPy checker replays the 2 original-schedule witnesses in a transcription of the upstream circuit, with 1 and 2 noise-free closing cycles.",
        },
        {
          p: "A pass establishes a circuit distance of at most 16 for each of the 4 circuits that gen_bb_memory.py builds, and nothing about the lower bound. A failed replay would withdraw the upper bound for that witness’s schedule and basis. A set of at most 15 faults that fires no detector and changes a logical observable in the original-schedule circuit would refute the lower bound.",
        },
      ],
    },
    {
      title: "What it changes",
      blocks: [
        {
          p: "A 16-fault set that fires no detector and changes a logical observable splits into 2 sets of 8 faults with the same detector response and different logical action, so no decoder corrects every 8-fault set of this circuit. Given the lower bound, minimum-weight decoding corrects every set of at most 7 faults: two such sets with the same detector response differ by an undetected set of at most 14 faults, which acts trivially. So 8 is the least number of faults for which no decoder corrects every set; whether a given practical decoder fails at 8 is not implied.",
        },
      ],
    },
    {
      title: "Limits",
      blocks: [
        {
          list: [
            "The lower bound. Circuit distance at least 16 rests on an unreleased exhaustive computation run by 2 programs of ours that share a method; our public evidence is `d_{circ} ≤ 16`. Release of the computation, a certificate that a third party can check, or a rerun by others would close it.",
            "Model equality. The circuit is our Stim rebuild from public code [8]; the bound in [1] is for the authors’ circuit. The rebuild matches [4] by sizes and a fingerprint without logical-observable labels; [7] matched its rebuilds to the upstream decoding matrices at 2 cycles. Comparing at 18 cycles with the upstream single-fault list, keeping logical actions, would close it.",
            "Scope. The lower bound is for the original term order, 18 noisy cycles, the boundary convention above and both bases. We claim nothing for other cycle counts or the noisy-reset convention; a computation for each would close it.",
            "Priority. We have not compared our witnesses with Crocker’s [6]. We hold no public timestamp for the lower bound. The repository [2] calls the lower-bound search separately reported; that report was private. Web searches on 28 October and 15 November 2026 can have missed postings; a dated earlier public record would change this.",
          ],
        },
      ],
    },
  ],
  files: [
  ],
  refs: [
    {
      text: "S. Bravyi, A. W. Cross, J. M. Gambetta, D. Maslov, P. Rall, T. J. Yoder, High-threshold and low-overhead fault-tolerant quantum memory, Nature 627, 778–782 (2024), arXiv:2308.07915v2 (21 February 2024).",
      href: "https://arxiv.org/abs/2308.07915",
    },
    {
      text: "KalKram, Two-gross circuit-distance witnesses, verification bundle, single commit 0e2456e (28 October 2026): README.md and VERIFICATION.md.",
    },
    {
      text: "T. J. Yoder, E. Schoute, P. Rall, E. Pritchett, J. M. Gambetta, A. W. Cross, M. Carroll, M. E. Beverland, Tour de gross: A modular quantum computer based on bivariate bicycle codes, arXiv:2506.03094v1 (3 June 2025).",
      href: "https://arxiv.org/abs/2506.03094",
    },
    {
      text: "M. E. Beverland, M. Carroll, A. W. Cross, T. J. Yoder, Fail fast: techniques to probe rare events in quantum error correction, arXiv:2511.15177v1 (19 November 2025).",
      href: "https://arxiv.org/abs/2511.15177",
    },
    {
      text: "dist-m4ri (GitHub repository QEC-pages/dist-m4ri), benchmark file, version 0.14.1 as read by us in October 2026.",
      href: "https://github.com/QEC-pages/dist-m4ri",
    },
    {
      text: "C. Crocker, A 16-fault undetectable logical error in the depth-8 syndrome cycle of the two-gross code [[288,12,18]], Zenodo, version 1.0, 21 October 2026, doi:10.5281/zenodo.23535390; later versions to 3.2 (2 November 2026) are under the concept doi:10.5281/zenodo.23535389.",
      href: "https://doi.org/10.5281/zenodo.23535390",
    },
    {
      text: "B. Cheng, N. Guo, F. Pan, Certifying quantum code and circuit distances at scale, arXiv:2611.08247v1 (5 November 2026).",
      href: "https://arxiv.org/abs/2611.08247",
    },
    {
      text: "S. Bravyi et al., BivariateBicycleCodes (GitHub repository), commit fa77e3333d3ec44c79d8f914dd24c040d1da471b, file decoder_setup.py.",
      href: "https://github.com/sbravyi/BivariateBicycleCodes/tree/fa77e3333d3ec44c79d8f914dd24c040d1da471b",
    },
    {
      text: "quantumlib/tesseract-decoder (GitHub repository), directory testdata/bivariatebicyclecodes: Stim circuits of bivariate bicycle codes with noise=si1000, including nkd=[[288,12,18]] with r=18 and nkd=[[360,12,24]] with r=24 (listing read 15 November 2026).",
      href: "https://github.com/quantumlib/tesseract-decoder/tree/main/testdata/bivariatebicyclecodes",
    },
    {
      text: "G. Pan (GitHub account GavinNull; the repository page names Guancheng Pan as author), gross-code-distance-12 (GitHub repository): release 2.0 has period-11 circuits and is marked superseded by release 3.0, which gives period 10 for the gross code; the page does not mention [[288,12,18]] (read 15 November 2026).",
      href: "https://github.com/GavinNull/gross-code-distance-12",
    },
    {
      text: "A. Strikis, D. E. Browne, M. E. Beverland, High-performance syndrome extraction circuits for quantum codes, arXiv:2603.05481v2 (v1 5 March 2026, v2 14 September 2026): Definition 3, Proposition 3 and Corollary 1.",
      href: "https://arxiv.org/abs/2603.05481",
    },
    {
      text: "C. Gidney, M. Newman, A. Fowler, M. Broughton, A fault-tolerant honeycomb memory, Quantum 5, 605 (2021), arXiv:2108.10457: definitions of the SD6 and SI1000 noise models.",
      href: "https://arxiv.org/abs/2108.10457",
    },
  ],
  cite: "KalKram, The circuit distance of IBM’s two-gross memory circuit, KK-R-0003, https://kalkram.com/research/two-gross-circuit-distance, 2026. Witnesses: commit 0e2456e, available on request.",
  history: [
    {
      date: "2026-10-21",
      text: "Crocker deposits version 1.0 with explicit 16-fault sets, an upper bound only [6].",
    },
    { date: "2026-10-28", text: "We commit our repository: 4 sets of 16 faults and their checkers [2]." },
    {
      date: "2026-11-05",
      text: "Cheng, Guo and Pan post a preprint reporting certified circuit distance 16, both bases, for the two-gross circuit at 18 cycles [7].",
    },
    { date: "2026-11-15", text: "This account published." },
  ],
};
