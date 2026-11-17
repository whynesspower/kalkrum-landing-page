import type { Note } from "./types";

const FILES = "/files/singer-relative-difference-sets";

/**
 * Public sources: references [1] to [5].
 * Private records of the lab were used for checking and are not cited.
 */
export const relativeDifferenceSets: Note = {
  slug: "singer-relative-difference-sets",
  id: "KK-R-0012",
  kind: "note",
  type: "Non-existence",
  title:
    "No cyclic relative difference set with nontrivial kernel lifts a cyclic `(364, 121, 40)`, `(255, 127, 63)`, `(1464, 133, 12)` or `(2380, 183, 14)` difference set.",
  statement:
    "A cyclic `(m, n, k, λ)` relative difference set (RDS) is a `k`-subset `R` of `ℤ_{mn}` whose nonzero differences cover each element outside the kernel `N` (order `n`) exactly `λ` times and no element of `N`. `R` lifts its reduction mod `m`, an `(m, k, nλ)` difference set. No RDS with `n > 1` lifts one with the title’s parameters.",
  field: "Combinatorial designs",
  results: ["relative-difference-sets"],
  published: "2026-11-15",
  evidence: "single",
  header: {
    before:
      "Gordon [1] (v2, 8 April 2026) lists the four as OPEN, except `n = 2` for `(364, 121, 40)`, as settled by search. His La Jolla table [2] (12 November 2026) lists 12 Open entries for the first two sets, none for the last two.",
    evidence:
      "Programs of ours, written separately, reproduce all 8 cases. A verifier of ours that read none of their code re-derived 2 of the 7 that are not Gordon’s, one by its own program and one by its own argument. All share the reduction to norm equations. No review outside the lab has taken place.",
    check:
      "One half: `(2380, 183, 14)` with `n = 7`, 1 of the 8. Run step 1 and follow the argument by hand (instant); step 2 is a control, not evidence. The other 7 cannot be checked from the published files.",
    notEstablished:
      "The 6 cases closed by new computations rest on our own programs; 5 were not re-derived by the verifier, and none can be checked from the published files.",
    method: "Not published.",
  },
  sections: [
    {
      title: "What was known",
      blocks: [
        {
          p: "Gordon [1] searched the lifts of the known cyclic difference sets with `k ≤ 256` and reports that for these four none of his theorems applied and exhaustive search was impractical. His Theorem 5 (Lam 1977), as printed, excludes `(2380, 183, 14)` with `n = 7`.",
        },
      ],
    },
    {
      title: "The result",
      blocks: [
        {
          p: "By Theorem 1 of [1] (Elliott and Butson 1966), a cyclic RDS with kernel order `n > 1` gives one with kernel order `p` for each prime `p | n`, and `p` divides the index 40, 63, 12 or 14 of the lifted difference set: 8 cases.",
        },
        {
          table: {
            head: ["`(m, k, nλ)`, kernel order", "Listed before", "Closed by", "Re-derived by verifier"],
            rows: [
              [
                "`(364, 121, 40)`, 2",
                "“n = 2: search” [1]; Open [2]",
                "Gordon’s search over known difference sets [1]; our computation, over every cyclic difference set",
                "No",
              ],
              ["`(364, 121, 40)`, 5", "OPEN [1]; Open [2]", "Our computation", "No"],
              ["`(255, 127, 63)`, 3", "OPEN [1]; Open [2]", "Our computation", "No"],
              ["`(255, 127, 63)`, 7", "OPEN [1]; Open [2]", "Our computation", "No"],
              ["`(1464, 133, 12)`, 2", "OPEN [1]; no entry [2]", "Our computation", "No"],
              ["`(1464, 133, 12)`, 3", "OPEN [1]; no entry [2]", "Our computation", "Yes"],
              ["`(2380, 183, 14)`, 2", "OPEN [1]; no entry [2]", "Our computation", "No"],
              [
                "`(2380, 183, 14)`, 7",
                "OPEN [1], though Theorem 5 of [1] as printed excludes it (`q = 7`, `e = 2`, 3 and 61 have even order mod 7, `4k = 732 = x² + 7y²` has no integer solution); no entry [2]",
                "Theorem 5 of [1] as printed; our hand argument from Turyn’s lemma [3]",
                "Yes",
              ],
            ],
            caption:
              "Listed before: Gordon’s arXiv v2 [1] and La Jolla table [2]. A case is closed when no such RDS exists. The four parameter sets are those of the point-hyperplane (Singer) difference sets of `PG(5, 3)`, `PG(7, 2)`, `PG(3, 11)` and `PG(3, 13)`.",
            nowrap: [0, 3],
          },
        },
        {
          p: "The 7 computer closures are exhaustive computations. A character of order `d > 1` of `ℤ_{mn}` takes on `R` a value `x ∈ ℤ[ζ_{d}]` with `|x|^{2} = k − nλ` if `d` divides `m` and `|x|^{2} = k` otherwise (from `RR^{−1} = k + λ(ℤ_{mn} − N)`). From complete lists of solutions of these equations, each closure shows that such values cannot all occur for any `R` lifting a cyclic difference set with these parameters.",
        },
        {
          p: "For `(2380, 183, 14)` with `n = 7`, 49 divides `mn = 16660` but not `m = 2380`, so a character `χ` of order 49 is nontrivial on `N`, and `x = χ(R) ∈ ℤ[ζ_{49}]` has `|x|^{2} = 183 = 3·61`. By Turyn’s lemma [3] (Corollary 3.10 of [4]), if `a = |x|^{2}` is an integer, `x ∈ ℤ[ζ_{u}]`, and a prime `p | a` has `p^{c} ≡ −1 (mod u)` for some `c`, `p` divides `a` to an even power. But `3^{21} ≡ −1 (mod 49)` and 3 divides 183 once.",
        },
      ],
    },
    {
      title: "How to check it",
      blocks: [
        {
          p: "Step 1: run this script (Python 3, under a second).",
        },
        {
          code: 'for q, d in [(3, 6), (2, 8), (11, 4), (13, 4)]:\n    m, k, lam = [(q ** (d - i) - 1) // (q - 1) for i in (0, 1, 2)]\n    assert k * (k - 1) == lam * (m - 1)\n    primes = [p for p in range(2, lam + 1) if lam % p == 0 and all(p % r for r in range(2, p))]\n    print((m, k, lam), "Singer, PG(%d,%d); primes dividing %d:" % (d - 1, q, lam), primes)\nm, n, k = 2380, 7, 183\nprint("49 | mn:", m * n % 49 == 0, "; 49 | m:", m % 49 == 0, "; 3^21 mod 49 =", pow(3, 21, 49), "; 3 | 183:", k % 3 == 0, "; 9 | 183:", k % 9 == 0)\norder = lambda a, q: next(t for t in range(1, q) if pow(a, t, q) == 1)\nprint("Theorem 5, q = 7: 7 mod 4 =", 7 % 4, "; 183 = 3 * 61:", k == 3 * 61, "; orders mod 7 of 3 and 61:", order(3, 7), order(61, 7), "; solutions of x^2 + 7y^2 = 732:", [(x, y) for x in range(28) for y in range(11) if x * x + 7 * y * y == 732])',
        },
        {
          code: "(364, 121, 40) Singer, PG(5,3); primes dividing 40: [2, 5]\n(255, 127, 63) Singer, PG(7,2); primes dividing 63: [3, 7]\n(1464, 133, 12) Singer, PG(3,11); primes dividing 12: [2, 3]\n(2380, 183, 14) Singer, PG(3,13); primes dividing 14: [2, 7]\n49 | mn: True ; 49 | m: False ; 3^21 mod 49 = 48 ; 3 | 183: True ; 9 | 183: False\nTheorem 5, q = 7: 7 mod 4 = 3 ; 183 = 3 * 61: True ; orders mod 7 of 3 and 61: 6 6 ; solutions of x^2 + 7y^2 = 732: []",
          caption: "Output with Python 3.15.0.",
        },
        {
          p: "Step 2: with verify_objects.py and, in a subfolder objects, the JSON file (NumPy needed):",
        },
        {
          code: "python3 verify_objects.py",
        },
        {
          code: "rds_364_2_243_81: (364,2,243,81)-RDS in Z_728: violations 0; projection is a (364,243,162) difference set: violations 0",
          caption:
            "Output with Python 3.11.14 and NumPy 1.26.4, under a second. The object is a control (a lift of a (364, 243, 162) difference set), not one of the 8 cases.",
        },
        {
          p: "The case `(2380, 183, 14)` with `n = 7` follows from step 1 and Turyn’s lemma [3]. A file in this format, with `(m, k, nλ)` one of the four sets and `n > 1`, that the script accepts would refute the result.",
        },
      ],
    },
    {
      title: "What it changes",
      blocks: [
        {
          p: "Every kernel order of the 12 entries listed as Open in [2] divides 40 or 63, so has a prime divisor among the 8 cases: on our results all 12 are non-existent and no row of [1] remains OPEN.",
        },
      ],
    },
    {
      title: "Limits",
      blocks: [
        {
          list: [
            "The 6 cases closed by new computations rest on our own programs; 5 were not re-derived by the verifier and none can be checked from the published files. A re-derivation by others would close this.",
            "Test coverage. `(364, 121, 40)` with `n = 5` has no human-readable proof; some of the norm equations used had no relative difference set to test against; Python, NumPy and sympy arithmetic is trusted. A proof or an outside re-derivation would close this.",
            "Non-cyclic abelian groups of order `mn` are not treated.",
            "To our knowledge the 6 new closures have no earlier treatment: we searched arXiv on 15 November 2026 and did not read Lam (1977), Pott (1995, 1996), Arasu et al. (1995) or the journal version of [1]. Gordon [5] says he is preparing a paper with new nonexistence results; his comment concerns circulant weighing matrices and does not mention RDS.",
          ],
        },
      ],
    },
  ],
  files: [
    {
      label: "verify_objects.py",
      href: `${FILES}/verify_objects.py`,
      detail:
        "tests that a subset of the cyclic group of order mn is an RDS and that its image in the group of order m is a difference set; reads every JSON file in a subfolder named objects, with keys id, group (labels), v (= m), n, k, mu_RDS (= λ), lam_DS (= nλ) and R",
    },
    {
      label: "objects/rds_364_2_243_81.json",
      href: `${FILES}/objects/rds_364_2_243_81.json`,
      detail:
        "a (364, 2, 243, 81) relative difference set in the cyclic group of order 728, a lift of a (364, 243, 162) difference set, which has the parameters (v, v − k, v − 2k + λ) of the complement of a (364, 121, 40) set; constructed by us as a control",
    },
  ],
  refs: [
    {
      text: "D. M. Gordon, Cyclic relative difference sets and circulant weighing matrices, arXiv:2501.14924 (v1 24 January 2025, v2 8 April 2026, the latest on 15 November 2026), J. Algebr. Comb. 63, art. 24 (2026): Theorems 1 and 5, Section 3 and Tables 3 and 4 of v2; Table 3 of v1.",
      href: "https://arxiv.org/abs/2501.14924",
    },
    {
      text: "La Jolla Combinatorics Repository, relative difference sets (D. M. Gordon): version 1.00 (24 January 2025, Zenodo record 14735634) and the archive of 12 November 2026, commit ed71b70.",
      href: "https://github.com/dmgordo/relative-difference-sets",
    },
    {
      text: "R. J. Turyn, Character sums and difference sets, Pacific J. Math. 15 (1965) 319–346: the definition of semiprimitive and Lemma 3.",
      href: "https://msp.org/pjm/1965/15-1/pjm-v15-n1-p32-p.pdf",
    },
    {
      text: "K. H. Leung, B. Schmidt, T. Zhang, On the nonexistence of semi-regular relative difference sets, J. Combin. Theory Ser. A 193 (2023) 105674: Corollary 3.10 (numbering of the authors’ preprint).",
      href: "https://doi.org/10.1016/j.jcta.2022.105674",
    },
    {
      text: "D. M. Gordon, comment of 19 October 2026 on pull request 2, github.com/dmgordo/circulant-weighing-matrices.",
      href: "https://github.com/dmgordo/circulant-weighing-matrices/pull/2",
    },
  ],
  cite: "KalKram, Non-existence of cyclic relative difference sets lifting four Singer difference sets, KK-R-0012, https://kalkram.com/research/singer-relative-difference-sets, 2026.",
  history: [
    {
      date: "2025-01-24",
      text: "Gordon posts arXiv v1 and version 1.00 of the La Jolla table: `(364, 121, 40)` and `(255, 127, 63)` undecided [1], [2].",
    },
    {
      date: "2026-04-08",
      text: "Gordon posts v2: four sets listed as OPEN, kernel order 2 for `(364, 121, 40)` as settled by search [1].",
    },
    {
      date: "2026-11-12",
      text: "La Jolla archive of this date: the same 12 Singer entries listed as Open [2].",
    },
    { date: "2026-11-15", text: "This account was published." },
  ],
};
