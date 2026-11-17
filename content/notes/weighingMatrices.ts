import type { Note } from "./types";

const FILES = "/files/circulant-weighing-matrices";

/**
 * Public sources: references [1] to [10], read as each entry states, on 15 November 2026.
 * The lab's own counts and runs come from its private records, which are not cited as public sources.
 */
export const weighingMatrices: Note = {
  slug: "circulant-weighing-matrices",
  id: "KK-R-0005",
  kind: "paper",
  type: "Existence",
  title:
    "Proper circulant weighing matrices exist for `CW(120, 36)`, which Tan (2018) excludes; `CW(180, 36)`, listed “Open”; and 209 pairs listed “No” in La Jolla version 1.3.",
  statement:
    "A circulant weighing matrix `CW(n, k)` is an `n × n` circulant `W` with entries 0, ±1, `k` nonzero per row (the weight) and `WW^{T} = kI`; it is proper if its first row’s support lies in no coset of a proper subgroup of `ℤ_{n}`. We give 6 proper `CW(120, 36)` and 12 proper `CW(180, 36)`, inequivalent under shifts, negation and multipliers (units of `ℤ_{n}`), and proper matrices for 209 pairs `(n, k)` listed “No” in La Jolla version 1.3.",
  field: "Combinatorial designs",
  results: ["cw-120-36", "cw-la-jolla-no", "cw-180-36", "cw-extended"],
  published: "2026-11-15",
  evidence: "certified",
  header: {
    before:
      "Tan [1], Theorem 4.24: “There is no `CW(120, 36)`”. La Jolla version 1.3 [2] lists it “No” (comment “Tan (2018)”), `CW(180, 36)` “Open” (also open in Table 10 of [3]) and 209 pairs “No”; version 2.0 lists the 209 as existing (read 15 November 2026).",
    evidence:
      "The label covers existence; each matrix is its own certificate. Programs written separately by our own system verified them from the definition, and a Lean 4 kernel check covers weight and autocorrelation of one matrix of each order. All share the first-row files, and no person outside the lab has reviewed our files.",
    check:
      "One half: the existence of the matrices. Run the short check below on one matrix, or check_objects.py (Python 3, under a second) on all 6 + 12 + 209; nothing published tests completeness, the 12 non-existence results or the count.",
    notEstablished:
      "Completeness of the 6 and 12 classes, non-existence at the 12 parameter pairs, and the count of decided open entries. They rest on unpublished exhaustive computations, most by floating-point enumeration.",
    method: "Not published.",
  },
  sections: [
    {
      title: "What was known",
      blocks: [
        {
          p: "Theorem 4.24 of [1] (arXiv version 4) has no proof of its own: Tan sketches an argument from computer classifications that are not printed and defers the details to his 2014 thesis [4].",
        },
        {
          p: "La Jolla keys its entries by `n` and `s = √k`, and its statuses refer to proper matrices (version 2.0 notebook): `CW(120, 36)` is its entry `CW(120, 6)`, the weight-4 entries are `CW(n, 2)` and the weight-16 entries `CW(n, 4)`. To our knowledge no earlier public matrix of weight 36 at order 120 or 180 exists (searched: web, 24 October and 15 November; arXiv, Zenodo and GitHub, 1–2 November 2026). The latest table of known proper `CW(n, 36)` that we read, Table 7 of Gordon (2026) [5], lists `n = 26m`, `48m`, 91, 168 and 182.",
        },
        {
          p: "Arasu, Gordon and Zhang (2021) [3] credit the classification of weight 4 to Eades and Hain (1976) [6] and give the weight-16 family as their Theorem 6.2. Version 1.3 cites “Arasu, Leung, Ma, Nabavi and Ray-Chaudhuri (2006)” [7] for the 10 weight-16 entries without naming the paper. The explicit matrices below show the 209 entries to be errors in version 1.3. Version 2.0 lists the 199 of weight 4 with the comment “Eades and Hain; unique equivalence class” and the 10 of weight 16 with comments citing constructions or verifications of September 2026, 2 credited to “ChatGPT Sep 2026”.",
        },
        {
          p: "On 19 October 2026 D. M. Gordon, who maintains the La Jolla repository, wrote publicly [8] that no `CW(112, 36)`, `CW(117, 36)`, `CW(195, 36)` or `CW(156, 81)` exists, that he had one existence result and that a paper was in preparation; the comment names no case for that result. We cede priority on those 4 non-existence results.",
        },
      ],
    },
    {
      title: "The result",
      blocks: [
        {
          label: "Certified: explicit matrices",
          statement:
            "`CW(120, 36)`, `CW(180, 36)` and the 209 pairs in the last two rows below have proper matrices, each given as a first row in the published files and verified from the definition.",
        },
        {
          code: "from math import gcd\nn = 120\nP = [17, 26, 30, 37, 42, 54, 57, 58, 60, 62, 68, 70, 77, 84, 94, 97, 98, 106, 112, 116, 117]\nN = [0, 2, 6, 8, 14, 18, 24, 50, 52, 56, 66, 74, 78, 102, 110]\na = [0] * n\nfor i in P: a[i] = 1\nfor i in N: a[i] = -1\nassert sum(x * x for x in a) == 36\nassert all(sum(a[i] * a[(i + s) % n] for i in range(n)) == 0 for s in range(1, n))\nassert gcd(n, *[i - P[0] for i in P + N]) == 1\nprint('CW(120, 36): weight 36, autocorrelation 0 at all 119 shifts, proper')",
          caption:
            "CW(120, 36) first row: +1 on P, −1 on N. The first two assertions state a(x)a(x⁻¹) = 36 in ℤ[x]/(x¹²⁰ − 1), since the coefficient of xˢ is the autocorrelation at shift s; the third states gcd 1 of 120 and the support’s differences (proper).",
        },
        {
          table: {
            head: ["Parameters", "Our matrices", "Version 1.3", "Version 2.0"],
            rows: [
              ["`CW(120, 36)`", "6 classes", "“No”", "unchanged"],
              ["`CW(180, 36)`", "12 classes", "“Open”", "unchanged"],
              ["weight 4, 199 even `n` from 404 to 996", "199", "“No”", "“All”"],
              ["weight 16, `n = 98j`, `j` = 1 to 10", "10", "“No”", "“Yes”"],
            ],
            caption:
              "Orbit: the first rows equivalent to a given one. The orbits of the classes contain 19,200 and 57,600 distinct first rows (check_orbits.py below); disjoint orbits show the classes inequivalent. “All”: all inequivalent matrices of those parameters are listed; “Yes”: existence only.",
          },
        },
        {
          p: "Weight 4: for `n = 2m` put `y = x^{m}`, so `y^{2} = 1` and `a = −1 + x + x^{m} + x^{m+1} = (x − 1) + y(x + 1)`. Then `a(x)a(x^{-1}) = [(x − 1)(x^{-1} − 1) + (x + 1)(x^{-1} + 1)] + y[(x − 1)(x^{-1} + 1) + (x + 1)(x^{-1} − 1)] = 4 + 0`. Weight 16: the 10 rows equal `A = (1 − X^{7m}) C(X^{2m}) + (1 + X^{7m}) X C(X^{m})`, `C = −1 + X + X^{2} + X^{4}`, `n = 14m`, the construction in the proof of Theorem 6.2 of [3], rebuilt in check_objects.py.",
        },
        {
          label: "Not certified: classes and non-existence",
          statement:
            "An exhaustive computation of ours finds no further class of `CW(120, 36)` or `CW(180, 36)`, and no circulant weighing matrix of any kind, proper or not, at the 12 parameter pairs below.",
        },
        {
          p: "At order 180, 2 separately written programs return the same 12 classes; at order 120, 2 programs return the same 6, one in exact arithmetic.",
        },
        {
          table: {
            head: ["Parameters", "Announced 19 October", "Exact re-derivation", "Version 2.0"],
            rows: [
              ["`CW(112, 36)`", "yes", "yes", "“Open”"],
              ["`CW(117, 36)`", "yes", "no", "“No”"],
              ["`CW(195, 36)`", "yes", "no", "“No”"],
              ["`CW(156, 81)`", "yes", "yes", "“Open”"],
              ["`CW(195, 81)`", "no", "no", "“Open”"],
              ["`CW(198, 81)`", "no", "yes + verifier", "“Open”"],
              ["`CW(112, 100)`", "no", "yes", "“Open”"],
              ["`CW(120, 100)`", "no", "yes", "“Open”"],
              ["`CW(156, 100)`", "no", "yes", "“Open”"],
              ["`CW(165, 100)`", "no", "no", "“Open”"],
              ["`CW(182, 100)`", "no", "no", "“Open”"],
              ["`CW(195, 100)`", "no", "yes + verifier", "“Open”"],
            ],
            caption:
              "“Announced”: in [8]. “Exact re-derivation”: a separately written program in exact arithmetic; “+ verifier”: also a program in exact integer arithmetic, written without reading the others’ code. The 2 “No” entries carry the comment “Gordon (2026)”.",
          },
        },
        {
          p: "Two other programs, written separately, reproduce all 12 non-existence results. A third, reusing modules of one of them, reproduces 9 of the 12; for `CW(117, 36)`, `CW(195, 36)` and `CW(165, 100)` the two others are the only second checks. All 12 were open in Table 10 of [3] and in version 1.3, and none is settled in Tan’s 2026 preprint [9].",
        },
        {
          label: "Not certified: non-existence among open entries",
          statement:
            "Of the 2,763 pairs `(n, k)` that version 1.3 lists “Open” and that our computation covered, 2,397 were recorded as decided by 26 October 2026: 2,342 with no matrix of any kind, 25 with a proper matrix and 30 with improper matrices only. The 25 proper matrices are explicit and verified from the definition; they are not published here.",
        },
        {
          p: "Of the 2,342 non-existence results, a second program covers 899 (the 12 above among them), 561 more have an agreeing certificate file of the first program (2 a check of another kind), and 882 rest on one program or carry a recorded caveat. The 30 improper-only results rest on the first program; 13 have an agreeing certificate file and `CW(155, 25)` a second program. The 2,342 include `CW(182, 144)`, whose non-existence conflicts with Table 11 of [3] read at `m = 1`, and `CW(155, 100)`, which we do not claim; we treat both as unresolved, so without them 2,395 are decided and 2,340 have no matrix.",
        },
        {
          p: "In version 2.0, 115 of the 2,342 non-existence results are listed “No” (113 credited to ChatGPT, August or September 2026, 2 to “Gordon (2026)”) and 15 of the 25 proper matrices “Yes”, citing published constructions or others’ work; the other 10, `CW(180, 36)` among them, remain “Open”. We made no per-case literature search and claim no priority for these decisions.",
        },
      ],
    },
    {
      title: "How to check it",
      blocks: [
        {
          list: [
            "Run the 11 lines above (Python 3.9 or newer); one line prints, in about 0.02 seconds. Moving one position of `P` (17 to 19) fails the second assertion.",
            "Download the files below into one folder and run the next block (Python 3, standard library, about 0.5 seconds; Lean 4.35.0, under 20 seconds). Lean accepts one `CW(120, 36)` and one `CW(180, 36)` (support size 36, zero autocorrelation) and proves that a copy of the first with one position moved is not a `CW`.",
            "In a clone of [2] at commit a0b0e52, apply its is_cwm (which does not test properness) to get_cwm(n, 2, 0) for the 199 values of n in lj_weight4.json and to get_cwm(n, 4, 0) for the 10 in lj_weight16.json; is_cwm accepts 199 of 199 and 10 of 10.",
          ],
        },
        {
          code: "$ python3 -I check_objects.py .\nPASS  CW(120,36): 6 classes, weight 36 and zero autocorrelation at all 119 shifts: True; proper: True; pairwise inequivalent: True\nPASS  CW(180,36): 12 classes, weight 36 and zero autocorrelation at all 179 shifts: True; proper: True; pairwise inequivalent: True\nPASS  weight 4: 199 values of n (404 to 996), each -1 + x + x^m + x^(m+1) with n = 2m, valid and proper; failures: 0\nALL CHECKS PASSED\n\n$ python3 -I check_orbits.py .\nCW(120,36): orbit sizes (both signs) [1920, 1920, 3840, 3840, 3840, 3840] total first rows 19200 with row sum +6 9600\nCW(180,36): orbit sizes (both signs) [2880, 2880, 2880, 2880, 5760, 5760, 5760, 5760, 5760, 5760, 5760, 5760] total first rows 57600 with row sum +6 28800\n\n$ lean CW120_180.lean\n(no output, exit status 0)",
          caption:
            "Decisive lines; the full output of check_objects.py, with the weight-16 line and the controls, is in check_objects.log.",
        },
        {
          p: "Passing these checks shows that each listed row is a proper `CW` of its parameters, that the 6 and the 12 rows are pairwise inequivalent, and that the 209 entries are contradicted. The first two checks use our rows; the third uses the maintainer’s rows and checker. A matrix of any kind at one of the 12 parameter pairs would refute the non-existence results; a further class of `CW(120, 36)` or `CW(180, 36)` would refute the lists.",
        },
      ],
    },
    {
      title: "What it changes",
      blocks: [
        {
          p: "Theorem 4.24 as printed in arXiv version 4 is false for proper matrices, and the La Jolla entry for `CW(120, 36)` cites Tan (2018) alone.",
        },
      ],
    },
    {
      title: "Limits",
      blocks: [
        {
          list: [
            "Completeness and non-existence. The lists of 6 and 12 classes, the 12 non-existence results and the count of 2,397 rest on unpublished exhaustive computations, most by floating-point enumeration without an exact certificate of completeness; 5 of the 12 have no exact re-derivation. Publication or exact re-derivation would close it.",
            "Priority. Gordon’s existence result of 19 October 2026 is unnamed and its paper unpublished, so a matrix of order 120 or 180 may be his; the paper would close this.",
            "Weight 25. Gordon [8] says an unpublished paper of Leung and Ma settles all `CW(v, 25)` in theory; version 2.0 lists `CW(155, 25)`, `CW(165, 25)` and `CW(186, 25)`, 3 of our 30 improper-only decisions, as “No”, citing Leung and Ma; [3] attributes `n ≡ 0 (mod 5)` to their published paper [10] and the other `n` to a 2011 preprint.",
            "Tan’s argument. We do not know where the sketch for Theorem 4.24 fails; the thesis [4] would close it.",
            "The table audit. The 209 are the version 1.3 “No” entries of weight 4 at even `n` and weight 16 at `n` divisible by 14, with `n < 1000`. We audited part of the “No” entries by computation and none of the rest, so other errors may remain. A full audit would close it.",
          ],
        },
      ],
    },
  ],
  files: [
    {
      label: "cw120_36_classes.json",
      href: `${FILES}/cw120_36_classes.json`,
      detail: "first rows of the 6 classes of CW(120, 36), as sets P (+1) and N (−1)",
    },
    {
      label: "cw180_36_classes.json",
      href: `${FILES}/cw180_36_classes.json`,
      detail: "first rows of the 12 listed classes of CW(180, 36); the list is not claimed complete",
    },
    {
      label: "lj_weight4.json",
      href: `${FILES}/lj_weight4.json`,
      detail: "the 199 values of n and, for each, the first row −1 + x + x^m + x^(m+1)",
    },
    {
      label: "lj_weight16.json",
      href: `${FILES}/lj_weight16.json`,
      detail: "the 10 values n = 98j and a first row of CW(n, 16) for each",
    },
    {
      label: "check_objects.py",
      href: `${FILES}/check_objects.py`,
      detail: "weight, autocorrelation, properness and inequivalence of all of the above; Python 3, standard library",
    },
    {
      label: "check_objects.log",
      href: `${FILES}/check_objects.log`,
      detail: "full output of check_objects.py",
    },
    {
      label: "check_orbits.py",
      href: `${FILES}/check_orbits.py`,
      detail: "orbit sizes and first-row counts of the 6 and 12 classes; Python 3, standard library",
    },
    {
      label: "CW120_180.lean",
      href: `${FILES}/CW120_180.lean`,
      detail:
        "Lean 4 check of weight and autocorrelation of one CW(120, 36) and one CW(180, 36), and of a mutant that must fail",
    },
  ],
  refs: [
    {
      text: "M. M. Tan, Group invariant weighing matrices, arXiv:1610.01914v4 (2 March 2018); Des. Codes Cryptogr. 86 (2018) 2677–2702 (journal version not read).",
      href: "https://arxiv.org/abs/1610.01914",
    },
    {
      text: "D. M. Gordon, La Jolla Circulant Weighing Matrices Repository, Zenodo: version 1.3, doi:10.5281/zenodo.19741187 (24 April 2026); version 2.0, doi:10.5281/zenodo.24170503 (12 November 2026; GitHub dmgordo/circulant-weighing-matrices, tag v2.0, commit a0b0e52).",
      href: "https://github.com/dmgordo/circulant-weighing-matrices",
    },
    {
      text: "K. T. Arasu, D. M. Gordon, Y. Zhang, New nonexistence results on circulant weighing matrices, arXiv:1908.08447v3 (11 May 2021): Tables 10 and 11, Theorem 6.2 (the arXiv text was read, not the journal version, Cryptogr. Commun. 13 (2021) 775–789).",
      href: "https://arxiv.org/abs/1908.08447",
    },
    {
      text: "M. M. Tan, Relative difference sets and circulant weighing matrices, PhD thesis, Nanyang Technological University, 2014 (cited in [1]; not obtained).",
    },
    {
      text: "D. M. Gordon, Cyclic relative difference sets and circulant weighing matrices, arXiv:2501.14924v2 (8 April 2026): Table 7 (arXiv text read).",
      href: "https://arxiv.org/abs/2501.14924",
    },
    { text: "P. Eades, R. M. Hain, On circulant weighing matrices, Ars Combin. 2 (1976) 265–284 (not read)." },
    {
      text: "K. T. Arasu, K. H. Leung, S. L. Ma, A. Nabavi, D. K. Ray-Chaudhuri, Circulant weighing matrices of weight 2^(2t), Des. Codes Cryptogr. 41 (2006) 111–123, cited in [3] for the weight-16 orders (not read); the same authors also published Determination of all possible orders of weight 16 circulant weighing matrices, Finite Fields Appl. 12 (2006) 498–538 (not read), which is also a candidate for the La Jolla citation.",
    },
    {
      text: "D. M. Gordon, comment of 19 October 2026 on pull request 2 of dmgordo/circulant-weighing-matrices (read 15 November 2026).",
      href: "https://github.com/dmgordo/circulant-weighing-matrices/pull/2",
    },
    {
      text: "M. M. Tan, Character and multiplier obstructions for circulant weighing matrices, arXiv:2608.18468v2 (1 September 2026; not refereed); we searched its full text for CW(120, 36), CW(180, 36), Theorem 4.24 and the 12 parameter pairs.",
      href: "https://arxiv.org/abs/2608.18468",
    },
    {
      text: "K. H. Leung, S. L. Ma, Proper circulant weighing matrices of weight p², Des. Codes Cryptogr. 72 (2014) 539–550 (cited in [3]; not read).",
      href: "https://doi.org/10.1007/s10623-012-9786-z",
    },
  ],
  cite: "KalKram, Circulant weighing matrices against the La Jolla tables, KK-R-0005, https://kalkram.com/research/circulant-weighing-matrices, 2026.",
  history: [
    {
      date: "2026-10-19",
      text: "D. M. Gordon announces on pull request 2 non-existence of 4 of the 12 parameter pairs and one unnamed existence result [8].",
    },
    {
      date: "2026-11-12",
      text: "La Jolla version 2.0 lists the 209 as existing and keeps `CW(120, 36)` “No” and `CW(180, 36)` “Open” [2].",
    },
    { date: "2026-11-15", text: "This account published." },
  ],
};
