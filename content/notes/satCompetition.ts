import type { Note } from "./types";

const FILES = "/files/sat-competition-refutations";

/**
 * Sources: the public references [1] to [11], the public instances and the programs published with this note.
 * Private records of the lab are not cited.
 */
export const satCompetition: Note = {
  slug: "sat-competition-refutations",
  id: "KK-R-0013",
  kind: "note",
  type: "Decision",
  title:
    "Eleven SAT Competition 2025 main-track formulas listed as ‘unknown’ in the Global Benchmark Database have checkable refutation certificates.",
  statement:
    "Each of 11 formulas listed as ‘unknown’ in the Global Benchmark Database on 15 November 2026 is unsatisfiable, with a certificate checkable against its instance: for 4 Tseitin formulas, parity equations (sums of variables modulo 2) in the clauses sum to `0 = 1`; for 7 round-robin formulas, clauses and sets of pairwise exclusive literals sum to `0 ≥ 1`.",
  field: "SAT solving",
  results: ["sat-competition-unknown", "sat-tseitin", "sat-cardinality"],
  published: "2026-11-15",
  evidence: "single",
  header: {
    before:
      "The Global Benchmark Database (GBD) lists all 11 with result ‘unknown’ and track main_2025 [1], queried 15 November 2026; ‘unknown’ is the default value of the result feature [2]. The submitters of 10 of the 11 state that their formulas are unsatisfiable [3][4].",
    evidence:
      "A first program of ours refuted all 11; a second, written separately after the first program’s report, re-derived 7 of them with its own checker, which shares no code with the first program. The published certificates and checkers were written for this note. No one outside the lab has reviewed any of it.",
    check:
      "One half: the unsatisfiability of all 11 formulas is checkable per instance with one command below in under 20 seconds on a laptop. The ‘unknown’ listing can change (query hash=<hash> at benchmark-database.de); the timings cannot be reproduced from this page.",
    notEstablished:
      "That any of the 11 was undecided or beyond existing solvers: ‘unknown’ is GBD’s default, submitters state 10 are unsatisfiable, other solvers decided 4, and we sought no earlier certificates.",
    method: "Not published.",
  },
  sections: [
    {
      title: "What was known",
      blocks: [
        {
          p: "A Tseitin formula has a variable per edge of a graph and, at each vertex, clauses fixing the sum of the incident variables modulo 2 to a given bit; it is unsatisfiable when the bits have an odd sum. Round-robin formulas encode a schedule in which every pair of `n` teams meets once and no team plays twice a day, within `D < n − 1` days; multi-venue formulas add `V` one-match venues a day.",
        },
        {
          p: "The submitters of the tseitin_grid and tseitin_d3 files state that Gaussian elimination refutes Tseitin formulas [3]. The submitters of the round-robin files state that all 20 of their instances are unsatisfiable because `D < n − 1` and that the instances examine exactly-one cardinality reasoning [4].",
        },
        {
          p: "Gauss–Jordan elimination on parity constraints in clause-learning solvers is published [5][6]. Cardinality constraints can be recovered from CNF [7]; with recovery a cutting-planes pseudo-Boolean solver decides all 14 binomial pigeonhole instances where CaDiCaL decides 3 [8].",
        },
      ],
    },
    {
      title: "The result",
      blocks: [
        {
          table: {
            head: [
              "GBD hash",
              "GBD family",
              "GBD file",
              "Variables",
              "Clauses",
              "Refutation",
              "Re-derived",
              "Other solvers",
            ],
            rows: [
              [
                "42f1311ce504db8cc0cb590a568da20a",
                "tseitin-formulas",
                "tseitin_n188_d3",
                "282",
                "752",
                "all 188 parity constraints",
                "yes",
                "CryptoMiniSat 0.9 s",
              ],
              [
                "981c4e83c5dd3694af4c367958e0ee5f",
                "tseitin-formulas",
                "tseitin_grid_n250_m250",
                "124,500",
                "496,008",
                "all 62,500 parity constraints",
                "yes",
                "CryptoMiniSat 45.8 s",
              ],
              [
                "f3abc375afaf48c7eae21500b773bd21",
                "tseitin-formulas",
                "tseitin_grid_n400_m400",
                "319,200",
                "1,273,608",
                "all 160,000 parity constraints",
                "no",
                "none: CryptoMiniSat, CP-SAT at limit",
              ],
              [
                "41d14756a06872844577fc0abddb58aa",
                "tseitin-formulas",
                "tseitin_d3_n100000",
                "150,000",
                "400,000",
                "all 100,000 parity constraints",
                "yes",
                "CryptoMiniSat 71.5 s",
              ],
              [
                "6cb995b1c550beb579c53e27f6ca881a",
                "scheduling",
                "RoundRobin_n16_d13",
                "1,560",
                "31,320",
                "14 clauses, 13 cliques",
                "yes",
                "none: HiGHS, Exact, CP-SAT at limit",
              ],
              [
                "6f6a20cd654701b5e7fe9e9e0e5e7787",
                "scheduling",
                "RoundRobin_n18_d15",
                "2,295",
                "52,938",
                "16 clauses, 15 cliques",
                "yes",
                "none: HiGHS, Exact, CP-SAT at limit",
              ],
              [
                "78e8f5b0d59512cc4910fd63b4acb7fa",
                "scheduling",
                "RoundRobin_n17_d14",
                "1,904",
                "41,072",
                "15 clauses, 14 cliques",
                "yes",
                "none: HiGHS, Exact, CP-SAT at limit",
              ],
              [
                "cb66276897e4d1ff1368a4430598e11c",
                "scheduling",
                "RoundRobin_n17_d13",
                "1,768",
                "37,264",
                "14 clauses, 13 cliques",
                "yes",
                "HiGHS 77.7 s; Exact, CP-SAT at limit",
              ],
              [
                "35ec95b9b2398fb522db178855016ae0",
                "scheduling",
                "MVRoundRobin_n14_d10_v2",
                "3,640",
                "127,491",
                "21 clauses, 20 cliques",
                "no",
                "none: CryptoMiniSat, CP-SAT at limit",
              ],
              [
                "3a1f1b4b9a521737cc760017fe9d8b43",
                "scheduling",
                "MVRoundRobin_n16_d10_v3",
                "7,200",
                "372,720",
                "11 clauses, 10 cliques",
                "no",
                "none: CryptoMiniSat, CP-SAT at limit",
              ],
              [
                "c05d4d3ecd06a2e3942fea09159dd27b",
                "scheduling",
                "MVRoundRobin_n16_d10_v2",
                "4,800",
                "212,520",
                "21 clauses, 20 cliques",
                "no",
                "none: CryptoMiniSat, CP-SAT at limit",
              ],
            ],
            numeric: [3, 4],
            nowrap: [0, 1, 2, 5],
            caption:
              "Other solvers: CPU seconds, one thread, wall-clock limit 120 s, on the given clauses: CryptoMiniSat 5.17.0 with Gauss–Jordan elimination on, Exact 2.2.1 [9], HiGHS 1.15.1, CP-SAT 9.15, otherwise default options. Kissat and, on parity formulas, HiGHS timed out at 60 s wherever they ran.",
          },
        },
        {
          p: "A parity certificate is a set of parity constraints, each implied by the clauses that forbid its wrong-parity assignments, covering every variable an even number of times with right-hand sides summing to 1. A scheduling certificate is `m` clauses on disjoint variables whose literals the file’s binary clauses partition into `m − 1` cliques of pairwise exclusive literals, so a model would make at least `m` of these literals true where at most `m − 1` can be.",
        },
        {
          label: "Timing, parity formulas",
          statement:
            "On 20 XOR-structured instances that our program refuted within 200 s, the better of Kissat’s and CaDiCaL’s wall time over our program’s wall time has geometric mean at least 341.6.",
        },
        {
          label: "Timing, at-most-one formulas",
          statement:
            "On 19 instances that our program refuted within 60 s, the same ratio has geometric mean at least 44.5.",
        },
        {
          table: {
            head: ["Measure", "Parity formulas", "At-most-one formulas"],
            rows: [
              [
                "Instances",
                "20 of the 2023–25 main tracks: 19 in GBD family tseitin-formulas, 1 in long-learned-clauses",
                "19 of the same tracks: 4 each of mutilated-chessboard, register-allocation, interval-matching and scheduling; 2 pigeon-hole; 1 fpga-routing",
              ],
              [
                "Comparators",
                "Kissat 4.0.4 and CaDiCaL 3.0.1, default options, one thread, wall-clock limit 200 s",
                "the same, wall-clock limit 60 s",
              ],
              [
                "Comparator runs",
                "both timed out on 18 of 20; Kissat decided 2, CaDiCaL 1",
                "both timed out on 14 of 19; Kissat decided 4, CaDiCaL 2",
              ],
              [
                "Geometric mean of the ratio",
                "341.6, a lower bound: 18 of 20 comparator times are the limit",
                "44.5, a lower bound: 14 of 19 comparator times are the limit",
              ],
              ["Minimum of the ratio", "5.56", "3.69"],
              ["Runs", "one per instance, six at a time", "one per instance, one at a time"],
              [
                "Machine, load average",
                "our shared 32-vCPU virtual machine, 24.2 to 27.9",
                "the same machine, 35.8 to 39.3",
              ],
            ],
            caption:
              "Ratio per instance: the better comparator wall time (the limit, if both timed out) over our program’s wall time. The times of our program are not released.",
          },
        },
      ],
    },
    {
      title: "How to check it",
      blocks: [
        {
          code: "h=42f1311ce504db8cc0cb590a568da20a\ncurl -sSL -o $h.cnf.xz https://benchmark-database.de/file/$h\ncurl -sSO https://kalkram.com/files/sat-competition-refutations/parity_refute.py\npython3 -I parity_refute.py find $h.cnf.xz cert.json\nshasum -a 256 cert.json",
          caption:
            "Parity formulas: derive the certificate from the file and verify it. The SHA-256 of cert.json can be compared with the line for that hash in parity_certificates.sha256.",
        },
        {
          code: "GBD hash 42f1311ce504db8cc0cb590a568da20a (matches file name)\ncertificate: 188 of 188 parity constraints\nUNSATISFIABLE, verified: 188 parity constraints over 282 variables sum to 0 = 1",
          caption:
            "Output of find, under 0.1 s. The first line is the GBD hash computed from the file; it equals the file name for all 11.",
        },
        {
          code: "curl -sSO https://kalkram.com/files/sat-competition-refutations/parity_$h.json\npython3 -I parity_refute.py check $h.cnf.xz parity_$h.json",
          caption: "For this hash the published 11 KB certificate equals cert.json; check verifies it alone.",
        },
        {
          code: "h=6cb995b1c550beb579c53e27f6ca881a\ncurl -sSL -o $h.cnf.xz https://benchmark-database.de/file/$h\ncurl -sSO https://kalkram.com/files/sat-competition-refutations/farkas_check.py\ncurl -sSO https://kalkram.com/files/sat-competition-refutations/farkas_$h.json\npython3 -I farkas_check.py $h.cnf.xz farkas_$h.json",
          caption: "Scheduling formulas: verify the published certificate of that hash.",
        },
        {
          code: "GBD hash 6cb995b1c550beb579c53e27f6ca881a (matches file name)\nUNSATISFIABLE, verified: 14 clause rows and 13 at-most-one rows sum to 0 >= 1",
          caption: "Output, under 0.1 s.",
        },
        {
          code: "981c4e83…  UNSATISFIABLE, verified: 62500 parity constraints over 124500 variables sum to 0 = 1\nf3abc375…  UNSATISFIABLE, verified: 160000 parity constraints over 319200 variables sum to 0 = 1\n41d14756…  UNSATISFIABLE, verified: 100000 parity constraints over 150000 variables sum to 0 = 1\n6f6a20cd…  UNSATISFIABLE, verified: 16 clause rows and 15 at-most-one rows sum to 0 >= 1\n78e8f5b0…  UNSATISFIABLE, verified: 15 clause rows and 14 at-most-one rows sum to 0 >= 1\ncb662768…  UNSATISFIABLE, verified: 14 clause rows and 13 at-most-one rows sum to 0 >= 1\n35ec95b9…  UNSATISFIABLE, verified: 21 clause rows and 20 at-most-one rows sum to 0 >= 1\n3a1f1b4b…  UNSATISFIABLE, verified: 11 clause rows and 10 at-most-one rows sum to 0 >= 1\nc05d4d3e…  UNSATISFIABLE, verified: 21 clause rows and 20 at-most-one rows sum to 0 >= 1",
          caption:
            "Final line of the same commands for the other 9 instances (Apple M4, Python 3.15.0): the three large parity formulas take 2 to 6 s, up to 15 s when the machine is busy; the rest under 1 s.",
        },
        {
          p: "Against brute force, no certificate of a satisfiable formula was accepted by the parity checker in 400 random systems on 9 variables, or by the at-most-one checker in 7,000 mutated or random certificates on formulas of at most 12 variables. A model of any of the 11 formulas, or a flaw in either program, would refute the result.",
        },
      ],
    },
    {
      title: "What it changes",
      blocks: [
        {
          p: "Each scheduling certificate is one of the two counting arguments in [4]: `D + 1` matches of one team against `D` days (5 formulas), or `DV + 1` matches against `DV` day-and-venue slots (2 formulas).",
        },
      ],
    },
    {
      title: "Limits",
      blocks: [
        {
          list: [
            "Status. ‘unknown’ is GBD’s default [2]; the submitters of 10 of the 11 formulas state that they are unsatisfiable [3][4]; other solvers decided 4 of the 11 within 120 s. We found no description of tseitin_n188_d3 and did not search for earlier certificates; a dated one would close this.",
            "Proof format. The certificates are parity and linear-programming objects checked by programs of ours; none is a clausal (DRAT, LRAT) or pseudo-Boolean (VeriPB) proof. Gauss–Jordan elimination can be proof-logged [10][11]; such a proof for each formula would close this.",
            "Timings. One run per instance on loaded shared machines, against Kissat and CaDiCaL only, on instances our program refuted (the 19 are a family-stratified sample; the selection rule is not recorded). CryptoMiniSat with Gauss–Jordan elimination and a cutting-planes solver on both timing sets would close this.",
          ],
        },
      ],
    },
  ],
  files: [
    {
      label: "parity_refute.py",
      href: `${FILES}/parity_refute.py`,
      detail:
        "finds and verifies a parity certificate from a CNF file, or checks a given one; standard library only, 154 lines",
    },
    {
      label: "farkas_check.py",
      href: `${FILES}/farkas_check.py`,
      detail: "verifies a clause and at-most-one certificate against a CNF file in exact arithmetic; 90 lines",
    },
    {
      label: "farkas_6cb995b1c550beb579c53e27f6ca881a.json",
      href: `${FILES}/farkas_6cb995b1c550beb579c53e27f6ca881a.json`,
      detail: "certificate for RoundRobin_n16_d13, 1.3 KB",
    },
    {
      label: "farkas_6f6a20cd654701b5e7fe9e9e0e5e7787.json",
      href: `${FILES}/farkas_6f6a20cd654701b5e7fe9e9e0e5e7787.json`,
      detail: "certificate for RoundRobin_n18_d15, 1.7 KB",
    },
    {
      label: "farkas_78e8f5b0d59512cc4910fd63b4acb7fa.json",
      href: `${FILES}/farkas_78e8f5b0d59512cc4910fd63b4acb7fa.json`,
      detail: "certificate for RoundRobin_n17_d14, 1.4 KB",
    },
    {
      label: "farkas_cb66276897e4d1ff1368a4430598e11c.json",
      href: `${FILES}/farkas_cb66276897e4d1ff1368a4430598e11c.json`,
      detail: "certificate for RoundRobin_n17_d13, 1.3 KB",
    },
    {
      label: "farkas_35ec95b9b2398fb522db178855016ae0.json",
      href: `${FILES}/farkas_35ec95b9b2398fb522db178855016ae0.json`,
      detail: "certificate for MVRoundRobin_n14_d10_v2, 2.5 KB",
    },
    {
      label: "farkas_3a1f1b4b9a521737cc760017fe9d8b43.json",
      href: `${FILES}/farkas_3a1f1b4b9a521737cc760017fe9d8b43.json`,
      detail: "certificate for MVRoundRobin_n16_d10_v3, 1.8 KB",
    },
    {
      label: "farkas_c05d4d3ecd06a2e3942fea09159dd27b.json",
      href: `${FILES}/farkas_c05d4d3ecd06a2e3942fea09159dd27b.json`,
      detail: "certificate for MVRoundRobin_n16_d10_v2, 2.5 KB",
    },
    {
      label: "parity_42f1311ce504db8cc0cb590a568da20a.json",
      href: `${FILES}/parity_42f1311ce504db8cc0cb590a568da20a.json`,
      detail: "certificate for tseitin_n188_d3, 11 KB",
    },
    {
      label: "parity_certificates.sha256",
      href: `${FILES}/parity_certificates.sha256`,
      detail: "SHA-256 of the 4 parity certificates as regenerated by find, the other three being 6.8 to 18.3 MB",
    },
    {
      label: "comparators.tsv",
      href: `${FILES}/comparators.tsv`,
      detail: "Kissat and CaDiCaL results on the 39 timed instances; the times of our program are not included",
    },
  ],
  refs: [
    {
      text: "Global Benchmark Database, features hash, family, result and track, query hash=<hash>, read 15 November 2026.",
      href: "https://benchmark-database.de/",
    },
    {
      text: "A. Iser, C. Jabs, Global Benchmark Database, SAT 2024, doi:10.4230/LIPIcs.SAT.2024.18, arXiv:2405.10045v3 (14 January 2026), Example 1.",
      href: "https://arxiv.org/abs/2405.10045",
    },
    {
      text: "B. Bogaerts, J. Nordström, A. Oertel, Ç. U. Yıldırımoğlu, Crafted benchmark formulas requiring symmetry breaking and/or parity reasoning, Proceedings of SAT Competition 2023, University of Helsinki, B-2023-1, 67–69.",
      href: "http://hdl.handle.net/10138/563824",
    },
    {
      text: "J. E. Reeves, A. Sheng, Round-robin tournament scheduling benchmarks, Proceedings of SAT Competition 2025, Vienna, 49.",
      href: "https://repositum.tuwien.at/handle/20.500.12708/218424",
    },
    {
      text: "M. Soos, K. Nohl, C. Castelluccia, Extending SAT solvers to cryptographic problems, SAT 2009, LNCS 5584, 244–257.",
      href: "https://doi.org/10.1007/978-3-642-02777-2_24",
    },
    {
      text: "C.-S. Han, J.-H. R. Jiang, When Boolean satisfiability meets Gaussian elimination in a simplex way, CAV 2012, LNCS 7358.",
      href: "https://doi.org/10.1007/978-3-642-31424-7_31",
    },
    {
      text: "A. Biere, D. Le Berre, E. Lonca, N. Manthey, Detecting cardinality constraints in CNF, SAT 2014, LNCS 8561, 285–301.",
      href: "https://doi.org/10.1007/978-3-319-09284-3_22",
    },
    {
      text: "J. Elffers, J. Nordström, A cardinal improvement to pseudo-Boolean solving, AAAI 2020, 1495–1503, Figure 5.",
      href: "https://cdn.aaai.org/ojs/5508/5508-13-8733-1-10-20200512.pdf",
    },
    {
      text: "J. Devriendt, Exact, a fork of the cutting-planes pseudo-Boolean solver RoundingSat (Python package), version 2.2.1, 10 July 2025.",
      href: "https://pypi.org/project/Exact/",
    },
    {
      text: "M. Soos, R. E. Bryant, Proof generation for CDCL solvers using Gauss–Jordan elimination, arXiv:2304.04292 (April 2023).",
      href: "https://arxiv.org/abs/2304.04292",
    },
    {
      text: "S. Gocht, J. Nordström, Certifying parity reasoning efficiently using pseudo-Boolean proofs, AAAI 2021, 35(5), 3768–3777.",
      href: "https://ojs.aaai.org/index.php/AAAI/article/view/16494",
    },
  ],
  cite: "KalKram, Refutation certificates for eleven SAT Competition formulas, KK-R-0013, https://kalkram.com/research/sat-competition-refutations, 2026.",
  history: [{ date: "2026-11-15", text: "This account published." }],
};
