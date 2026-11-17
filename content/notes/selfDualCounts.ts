import type { Note } from "./types";

/**
 * Public sources: references 1 to 8, listed below.
 * Private records of the lab are not cited.
 */
export const selfDualCounts: Note = {
  slug: "self-dual-codes-stabilizer-states",
  id: "KK-R-0009",
  kind: "note",
  type: "Count",
  title:
    "We computed the numbers of inequivalent binary self-dual codes of even length from 42 to 56 and of inequivalent stabilizer states on 13 to 20 qubits.",
  statement:
    "We computed the numbers `b_{n}` of binary self-dual codes of length `n` (subspaces `C = C^{⊥}` of `GF(2)^{n}`) up to coordinate permutation, for even `n` from 42 to 56, and `t_{n}` of `n`-qubit stabilizer states (self-dual additive codes over GF(4)) up to single-qubit Clifford operations and qubit permutations, for `n` from 13 to 20. No code or state was listed.",
  field: "Coding theory",
  results: ["oeis-a003179", "oeis-a094927"],
  published: "2026-11-15",
  evidence: "single",
  header: {
    before:
      "OEIS A003179 [1] lists `b_{n}` up to length 36, and A094927 [2] and A090899 [3] list `t_{n}` and `i_{n}` up to `n = 12` (read 15 November 2026). Published: counts at lengths 38 [4] and 40 [5]; `t_{13} ≥ 72,573,549` (Danielsen and Parker, 2006 [6]).",
    evidence:
      "Two programs of ours, written separately, agree on every intermediate value; they share a counting framework and small-size test data. A third, written without reading either’s code, recomputed the cases it could finish, 22.6% to 30.0% of intermediate values at lengths 52 to 56, with no mismatch. No review outside the lab has taken place.",
    check:
      "Counts only. A Python script (under a second) asserts that `i_{n}` follows from `t_{n}` by the Euler transform of [6] and that the ratios of counts to mass-formula lower bounds exceed 1 and decrease with `n`. It recomputes no count.",
    notEstablished:
      "That the 16 counts are correct: they rest on two programs of one lab that share a counting framework, and no review outside the lab has taken place.",
    method: "Not published.",
  },
  sections: [
    {
      title: "What was known",
      blocks: [
        {
          p: "Bouyuklieva and Bouyukliev [4] counted 38,682,183 inequivalent self-dual codes of length 38 (Theorem 1). At length 40, Bouyukliev et al. [5] list 94,343 doubly even codes, the count of Betsumiya, Harada and Munemasa [7] (Theorem 1), and 8,249,963,738 singly even codes (Table 1; they attribute the completed classification to [8]). At length 42 they report 28,376,939 codes as a partial result (Section 7), a lower bound for `b_{42}`.",
        },
        {
          p: "Danielsen and Parker [6] classified stabilizer states up to length 12. They wrote that length 13 was not feasible with their method and the computational resources available to them, and gave `t_{13} ≥ 72,573,549`, the quotient in their Eq. (7) rounded up.",
        },
      ],
    },
    {
      title: "The result",
      blocks: [
        {
          p: "We find `t_{13} = 99,941,357`; the lower bound of [6] is 72,573,549.",
        },
        {
          table: {
            head: ["`n`", "`b_{n}`", "`r_{n}`"],
            rows: [
              ["42", "3,934,676,259,154", "1.4091"],
              ["44", "3,790,315,996,196,030", "1.2246"],
              ["46", "7,070,315,085,481,125,613", "1.1274"],
              ["48", "25,030,154,105,275,764,972,367", "1.0734"],
              ["50", "166,477,921,531,760,133,020,482,546", "1.0425"],
              ["52", "2,070,320,728,008,136,175,486,544,187,343", "1.0247"],
              ["54", "48,053,939,802,408,011,950,341,021,178,783,945", "1.0143"],
              ["56", "2,081,592,146,371,900,329,408,119,219,024,584,572,060", "1.0083"],
            ],
            caption:
              "Table 1. Binary self-dual codes of length `n`; OEIS A003179 indexes by half-length (a(21) to a(28)). `r_{n} = n! b_{n} / N(n)` is the ratio to the mass-formula lower bound `N(n)/n!` of [4], with `N(n) = ∏_{i=1}^{n/2−1}(2^{i}+1)` the number of self-dual subspaces of `GF(2)^{n}`.",
            numeric: [0, 1, 2],
            nowrap: [1],
          },
        },
        {
          table: {
            head: ["`n`", "`t_{n}`", "`i_{n}`", "`r_{n}`"],
            rows: [
              ["13", "99,941,357", "98,572,066", "1.3771"],
              ["14", "16,754,750,239", "16,653,480,463", "1.1836"],
              ["15", "5,654,176,880,374", "5,637,322,136,143", "1.0970"],
              ["16", "3,705,084,048,798,379", "3,699,413,115,770,518", "1.0530"],
              ["17", "4,654,021,830,321,003,627", "4,650,311,091,993,729,907", "1.0293"],
              ["18", "11,153,427,803,766,906,353,415", "11,148,770,076,835,673,172,116", "1.0162"],
              ["19", "50,929,537,738,536,576,682,934,734", "50,918,379,656,705,307,906,016,480", "1.0090"],
              ["20", "443,254,456,383,906,740,560,646,355,926", "443,203,515,692,736,689,377,101,042,816", "1.0050"],
            ],
            caption:
              "Table 2. Terms beyond OEIS A094927 (`t_{n}`) and A090899 (`i_{n}`), the latter counting states that are not a tensor product of states on fewer qubits. `r_{n} = 6^{n} n! t_{n} / ∏_{i=1}^{n}(2^{i}+1)` is the ratio to the mass-formula lower bound of [6] before rounding up.",
            numeric: [0, 1, 2, 3],
            nowrap: [1, 2],
          },
        },
        {
          p: "Of the two programs, one was written with read access to the other’s tables and totals, not its code, at lengths 42 to 46 and for `13 ≤ n ≤ 17`. Both reproduce every published value (`b_{n}`, lengths 2 to 40; `t_{n}`, `n ≤ 12`). Further programs of ours, using other formulations of the count, reproduce `t_{n}` for `13 ≤ n ≤ 16` and, separately, `t_{13}`.",
        },
      ],
    },
    {
      title: "How to check it",
      blocks: [
        {
          code: 'from fractions import Fraction\nfrom math import factorial, prod\nA = [  # t_1..t_20: A094927 for n <= 12, then the counts above\n    1, 2, 3, 6, 11, 26, 59, 182, 675, 3990, 45144, 1323363, 99941357, 16754750239, 5654176880374,\n    3705084048798379, 4654021830321003627, 11153427803766906353415, 50929537738536576682934734,\n    443254456383906740560646355926,\n]\nC = [  # i_1..i_20: A090899 for n <= 12, then the values above\n    1, 1, 1, 2, 4, 11, 26, 101, 440, 3132, 40457, 1274068, 98572066, 16653480463, 5637322136143,\n    3699413115770518, 4650311091993729907, 11148770076835673172116, 50918379656705307906016480,\n    443203515692736689377101042816,\n]\nB = [  # b_42, b_44, ..., b_56\n    3934676259154, 3790315996196030, 7070315085481125613, 25030154105275764972367,\n    166477921531760133020482546, 2070320728008136175486544187343, 48053939802408011950341021178783945,\n    2081592146371900329408119219024584572060,\n]\nt = [1]  # Euler transform [6]: n t_n = sum_{k=1..n} c_k t_(n-k), where c_k = sum_{d|k} d i_d\nfor n in range(1, 21):\n    s = sum(sum(d * C[d - 1] for d in range(1, k + 1) if k % d == 0) * t[n - k] for k in range(1, n + 1))\n    assert s % n == 0 and s // n == A[n - 1], n\n    t.append(s // n)\nprint("Euler transform of i_n reproduces t_n for n = 1..20")\nmass = lambda m: prod(2**i + 1 for i in range(1, m + 1))\nprint("bound on t_13 of [6]:", -(-mass(13) // (6**13 * factorial(13))))\nrt = [Fraction(A[n - 1] * 6**n * factorial(n), mass(n)) for n in range(13, 21)]\nrb = [Fraction(b * factorial(n), mass(n // 2 - 1)) for n, b in zip(range(42, 58, 2), B)]\nassert all(x > 1 for x in rt + rb) and rt == sorted(rt, reverse=True) and rb == sorted(rb, reverse=True)\nr = lambda x: format(float(x), ".4f")\nprint("t_n / bound, n = 13..20:", *map(r, rt))\nprint("b_n / bound, n = 42..56:", *map(r, rb))\nprint("all ratios exceed 1 and decrease with n")\n',
          caption: "check.py",
        },
        {
          code: "python3 check.py",
        },
        {
          code: "Euler transform of i_n reproduces t_n for n = 1..20\nbound on t_13 of [6]: 72573549\nt_n / bound, n = 13..20: 1.3771 1.1836 1.0970 1.0530 1.0293 1.0162 1.0090 1.0050\nb_n / bound, n = 42..56: 1.4091 1.2246 1.1274 1.0734 1.0425 1.0247 1.0143 1.0083\nall ratios exceed 1 and decrease with n",
          caption: "Output (Python 3.15.0, 0.04 s).",
        },
        {
          p: "For `n ≥ 13`, `i_{n}` was obtained from `t_{n}`, so the Euler transform test checks the inversion, not `t_{n}`. Bouyuklieva and Bouyukliev [4] conjecture that `r_{n}` decreases for binary codes of length 20 and above. `r_{n} > 1` is necessary for a correct count and says nothing about an overcount, or an undercount that stays above the mass-formula lower bound. A count by any correct method that differs from an entry refutes that entry.",
        },
      ],
    },
    {
      title: "What it changes",
      blocks: [
        {
          p: "The values `1/|Aut|` over the equivalence classes sum to the mass-formula lower bound [4], [6] (`|Aut|`: the stabiliser in the equivalence group, of order `n!` for codes and `6^{n} n!` for states), and a class with `|Aut| ≥ 2` adds at least 1/2 to the excess of the count over it. If the counts are correct, at most `2(1 − 1/r_{n})` of the classes therefore have a non-trivial automorphism group: 1.6% at length 56, 1.0% at 20 qubits.",
        },
      ],
    },
    {
      title: "Limits",
      blocks: [
        {
          list: [
            "Correctness. The 16 counts rest on two programs of one lab that share a counting framework, with no review outside the lab. No further program has recomputed lengths 42 to 50, `17 ≤ n ≤ 20` or 70% to 77% of intermediate values at lengths 52 to 56. An independent count at one size would close it for that size.",
            "Priority. To our knowledge no total is published for length 42 or above or for `n ≥ 13` (searched in OEIS, arXiv, the authors’ databases and the web on 26 October and, briefly, 15 November 2026). A dated earlier record would change this.",
          ],
        },
      ],
    },
  ],
  refs: [
    {
      text: "OEIS A003179, Number of self-dual binary codes of length 2n (up to column permutation equivalence), read 15 November 2026 (record last edited 30 May 2026).",
      href: "https://oeis.org/A003179",
    },
    {
      text: "OEIS A094927, Number of nonisomorphic (possibly decomposable) self-dual quantum codes on n qubits, read 15 November 2026 (record last edited 5 November 2025).",
      href: "https://oeis.org/A094927",
    },
    {
      text: "OEIS A090899, Number of nonisomorphic indecomposable self-dual quantum codes on n qubits, read 15 November 2026 (record last edited 29 June 2026).",
      href: "https://oeis.org/A090899",
    },
    {
      text: "S. Bouyuklieva, I. Bouyukliev, An algorithm for classification of binary self-dual codes, IEEE Trans. Inform. Theory 58(6), 3933–3940 (2012), doi:10.1109/TIT.2012.2190134. The version read is arXiv:1106.5930v1 (29 June 2011), titled On the Classification of Binary Self-Dual Codes: mass formula, Theorem 1, Conjecture 1.",
      href: "https://arxiv.org/abs/1106.5930",
    },
    {
      text: "I. Bouyukliev, S. Bouyuklieva, M. Dzhumalieva-Stoeva, V. Monev, What is GenSelfDual?, Serdica J. Comput. 10(3–4), 231–244, doi:10.55630/sjc.2016.10.231-244. The version read, the authors’ preprint of 30 November 2014, has Table 1 and Section 7; the Serdica text was not compared.",
      href: "https://www.moi.math.bas.bg/~iliya/GenSelfDual.pdf",
    },
    {
      text: "L. E. Danielsen, M. G. Parker, On the classification of all self-dual additive codes over GF(4) of length up to 12, J. Combin. Theory Ser. A 113(7), 1351–1367 (2006), doi:10.1016/j.jcta.2005.12.004; the version read is arXiv:math/0504522v4 (17 February 2006): Eqs. (5) and (7), the Euler transform, Tables 1 and 2, Section 6.",
      href: "https://arxiv.org/abs/math/0504522",
    },
    {
      text: "K. Betsumiya, M. Harada, A. Munemasa, A complete classification of doubly even self-dual codes of length 40, Electron. J. Combin. 19(3), #P18 (2012), arXiv:1104.3727; Theorem 1 (94,343 codes), read in the journal text.",
      href: "https://arxiv.org/abs/1104.3727",
    },
    {
      text: "I. Bouyukliev, M. Dzhumalieva-Stoeva, V. Monev, Classification of binary self-dual codes of length 40, IEEE Trans. Inform. Theory 61(8), 4253–4258 (2015), doi:10.1109/TIT.2015.2440266 (bibliographic record only; not read).",
      href: "https://doi.org/10.1109/TIT.2015.2440266",
    },
  ],
  cite: "KalKram, Counts of self-dual binary codes and stabilizer states, KK-R-0009, https://kalkram.com/research/self-dual-codes-stabilizer-states, 2026.",
  history: [{ date: "2026-11-15", text: "Published." }],
};
