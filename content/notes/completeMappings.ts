import type { Note } from "./types";

const FILES = "/files/complete-mappings-cyclic-groups";

/**
 * Public sources: references [1] to [9], opened on 15 November 2026; of these [5] only as a bibliographic record,
 * [7] and [9] as abstracts and [8] as a journal page.
 * Counts and program agreement rest on private records of the lab, not cited and not linked.
 */
export const completeMappings: Note = {
  slug: "complete-mappings-cyclic-groups",
  id: "KK-R-0008",
  kind: "note",
  type: "Count",
  title:
    "We computed that `ℤ_{27}`, `ℤ_{29}` and `ℤ_{31}` have 164,135,223,171,169,785; 18,674,231,142,723,249,003; and 2,427,915,096,775,283,929,115 complete mappings that fix 0, values that would extend OEIS A003111 to `a(15)`.",
  statement:
    "A complete mapping of a group `G` is a permutation `f` with `x ↦ x·f(x)` also a permutation, normalised if `f` fixes the identity. A003111 lists normalised counts `a(k)` of `ℤ_{n}`, `n = 2k + 1`; A006717, full counts `n·a(k)`. We give both for `ℤ_{27}`, `ℤ_{29}`, `ℤ_{31}` and full counts for 23 groups of orders 24 to 28 and 32.",
  field: "Integer sequences",
  results: ["oeis-a003111", "complete-mappings-groups"],
  published: "2026-11-15",
  evidence: "single",
  header: {
    before:
      "OEIS A003111 [1] and A006717 [2], read on 15 November 2026, list `a(0)` to `a(12)`; [1] credits the last (`ℤ_{25}`) to Yuh-Pyng Shieh, 10 January 2006. Wanless’s survey [3] gives the counts of all groups of order 3 to 23 and of `ℤ_{25}`.",
    evidence:
      "All counts come from programs written by our own system: 2 agree on `a(15)`, at least 3 on `a(13)` and `a(14)`, one written without reading the others’ code, after their values were known. All share counting identities [4], [5], properties of the problem and our cloud machines. No review by a person is on record.",
    check:
      "Counts only. The 3 programs below, each under a second in CPython 3.15, test the definition for `n ≤ 11`, necessary conditions on the values, and that the 23 files are group tables. They cannot recompute or confirm a count.",
    notEstablished: "That `a(15)` is correct: 2 programs of ours agree, and no third has run at `n = 31`.",
    method: "Not published.",
  },
  sections: [
    {
      title: "What was known",
      blocks: [
        {
          p: "Shieh and co-authors computed the counts of the groups of order 3 to 23 [3], [6]; [3] reports that McKay, McLeod and Wanless [7] confirmed all but the cyclic groups of order 21 and above, and gives the cyclic counts to `n` = 25 as known from Shieh’s thesis and a private communication of 2006. Priority for these values, `ℤ_{25}` included, is theirs. Our counts for orders 3 to 23 equal Table 4 of [3] as multisets for each of the 16 orders.",
        },
        {
          p: "To our knowledge no source lists the counts below (OEIS and web searches of 15 November 2026).",
        },
      ],
    },
    {
      title: "The result",
      blocks: [
        {
          table: {
            head: ["n", "Term", "Normalised count `a(k)` (A003111)", "All complete mappings `n·a(k)` (A006717)"],
            rows: [
              ["27", "`a(13)`", "164135223171169785", "4431651025621584195"],
              ["29", "`a(14)`", "18674231142723249003", "541552703138974221087"],
              ["31", "`a(15)`", "2427915096775283929115", "75265368000033801802565"],
            ],
            caption:
              "The full count equals the number of transversals of the Cayley (addition) table of `ℤ_{n}` [3]: sets of `n` cells, one in each row and column, with distinct entries.",
            numeric: [0, 2, 3],
            nowrap: [1, 2, 3],
          },
        },
        {
          p: "The 23 groups are the 21 of order 24 to 28 with complete mappings, other than `ℤ_{25}`, and 2 of the 51 of order 32. By Hall and Paige [8] the other 6 of order 24 to 28, with cyclic nontrivial Sylow 2-subgroups, have none: `ℤ_{3}⋊ℤ_{8}`, `ℤ_{24}`, `D_{26}`, `ℤ_{26}`, `ℤ_{7}⋊ℤ_{4}` and `ℤ_{28}`.",
        },
        {
          table: {
            head: ["SmallGroup", "Group", "All complete mappings"],
            rows: [
              ["(24,3)", "SL(2,3)", "532708548673536"],
              ["(24,4)", "`ℤ_{3}⋊Q_{8}`", "711496367603712"],
              ["(24,5)", "`ℤ_{4}×S_{3}`", "1424254213029888"],
              ["(24,6)", "`D_{24}`", "715293909319680"],
              ["(24,7)", "`ℤ_{2}×(ℤ_{3}⋊ℤ_{4})`", "1421775848079360"],
              ["(24,8)", "`(ℤ_{6}×ℤ_{2})⋊ℤ_{2}`", "714149386518528"],
              ["(24,9)", "`ℤ_{12}×ℤ_{2}`", "4263330069872640"],
              ["(24,10)", "`ℤ_{3}×D_{8}`", "2137306357039104"],
              ["(24,11)", "`ℤ_{3}×Q_{8}`", "2133607509393408"],
              ["(24,12)", "`S_{4}`", "356469972664320"],
              ["(24,13)", "`ℤ_{2}×A_{4}`", "1067993165463552"],
              ["(24,14)", "`ℤ_{2}^{2}×S_{3}`", "1429082153680896"],
              ["(24,15)", "`ℤ_{6}×ℤ_{2}^{2}`", "4270246393282560"],
              ["(25,2)", "`ℤ_{5}^{2}`", "41611960482858625"],
              ["(27,1)", "`ℤ_{27}`", "4431651025621584195"],
              ["(27,2)", "`ℤ_{9}×ℤ_{3}`", "4431730326458552091"],
              ["(27,3)", "`ℤ_{3}^{2}⋊ℤ_{3}`", "1477670782269469248"],
              ["(27,4)", "`ℤ_{9}⋊ℤ_{3}`", "1477532807935799904"],
              ["(27,5)", "`ℤ_{3}^{3}`", "4431953778920809155"],
              ["(28,3)", "`D_{28}`", "6916031483664400384"],
              ["(28,4)", "`ℤ_{14}×ℤ_{2}`", "48224355681195524096"],
              ["(32,45)", "`ℤ_{4}×ℤ_{2}^{3}`", "932009054420727968563200"],
              ["(32,51)", "`ℤ_{2}^{5}`", "935373426152330923868160"],
            ],
            caption:
              "Not normalised. SmallGroup is the GAP identifier (order, index); `D_{n}` has order `n`. The `ℤ_{27}` row is 27 × `a(13)`.",
            numeric: [2],
            nowrap: [0, 2],
          },
        },
      ],
    },
    {
      title: "How to check it",
      blocks: [
        {
          p: "A first program reproduces A003111 and A006717 [1], [2] for `n` = 3 to 11. The map `g(x) = f(−x)` turns the condition on `x + f(x)` into A003111’s condition on `g(x) − x` and keeps `f(0) = 0`.",
        },
        {
          code: "def a(n):  # complete mappings f of Z_n with f(0) = 0: f and x -> x + f(x) are both permutations\n    def go(x, used, sums):\n        if x == n:\n            return 1\n        return sum(go(x + 1, used | 1 << y, sums | 1 << (x + y) % n) for y in range(n)\n                   if not used >> y & 1 and not sums >> (x + y) % n & 1)\n    return go(1, 1, 1)  # f(0) = 0 uses the value 0 and the sum 0\nfor n in (3, 5, 7, 9, 11):\n    print(n, a(n), n * a(n))",
        },
        {
          code: "3 1 3\n5 3 15\n7 19 133\n9 225 2025\n11 3441 37851",
          caption: "Output, 0.1 s: `n`, the normalised count, the full count.",
        },
        {
          p: "A second program tests, on the 3 new values and the last 3 listed terms, necessary conditions from Wanless’s line in A003111 [1]: for odd `n` the count `a` is odd, divisible by 3 if `n > 3` and `n ≢ 1 (mod 3)`, `≡ −2 (mod n)` if `n` is prime, and divisible by `n` if `n` is composite. It prints the ratio of the full count to `e^{−1/2} n!^{2}/n^{n−1}` (Eberhard, Manners and Mrazović [9], as listed in A006717 [2]).",
        },
        {
          code: "from math import exp, lgamma, log\nOLD = {21: 275148653115, 23: 19686730313955, 25: 1664382756757625}  # a(10), a(11), a(12) of A003111\nNEW = {27: 164135223171169785, 29: 18674231142723249003, 31: 2427915096775283929115}\nfor n, a in {**OLD, **NEW}.items():\n    prime = all(n % p for p in range(2, n))\n    tests = [a % 2 == 1,                                 # a is odd\n             n % 3 == 1 or a % 3 == 0,                   # 3 | a unless n = 1 (mod 3), for n > 3\n             (a + 2) % n == 0 if prime else a % n == 0]  # a = -2 (mod n) for prime n, n | a otherwise\n    ratio = n * a / exp(-0.5 + 2 * lgamma(n + 1) - (n - 1) * log(n))  # to e^{-1/2} n!^2 / n^{n-1}\n    print(n, n * a, all(tests), a % 8, round(ratio, 4))",
        },
        {
          code: "21 5778121715415 True 3 1.0154\n23 452794797220965 True 3 1.0141\n25 41609568918940625 True 1 1.013\n27 4431651025621584195 True 1 1.0121\n29 541552703138974221087 True 3 1.0112\n31 75265368000033801802565 True 3 1.0105",
          caption:
            "Output, under 0.1 s: `n`, the full count, whether all 3 tests pass, `a mod 8`, the ratio to the asymptotic.",
        },
        {
          p: "A third program checks that the 23 files are group tables: 9 abelian, 14 non-abelian.",
        },
        {
          code: 'import sys\nfor f in sys.argv[1:]:\n    rows = [list(map(int, l.split())) for l in open(f)]\n    n, t = rows[0][0], rows[1:]\n    assert len(t) == n and all(sorted(r) == list(range(n)) for r in t + [list(c) for c in zip(*t)])  # Latin square\n    assert all(t[0][j] == j and t[j][0] == j for j in range(n))  # element 0 is the identity\n    assert all(t[t[x][y]][z] == t[x][t[y][z]] for x in range(n) for y in range(n) for z in range(n))  # associative\n    print(f, n, "abelian" if all(t[x][y] == t[y][x] for x in range(n) for y in range(n)) else "non-abelian")',
          caption: "Save as tables.py and run python3 tables.py G*.tab in the folder of the files: 23 lines, 0.03 s.",
        },
        {
          p: "A wrong integer passes the congruences with probability about 1/54, 1/174 and 1/62 for `n` = 27, 29, 31; the ratio tests leading digits only. The residues `a ≡ 1, 3, 3 (mod 8)` continue the pattern 1, 1, 3, 3 that [3] observed to `n` = 25 and calls an open question. A different value from another program would refute it.",
        },
      ],
    },
    {
      title: "What it changes",
      blocks: [
        {
          p: "Our counts extend A003111 and A006717 from `n` = 25 to 31, and Table 4 of [3] from order 23 to orders 24 to 28 and 32.",
        },
      ],
    },
    {
      title: "Limits",
      blocks: [
        {
          list: [
            "`a(15)` is not confirmed: 2 programs of ours agree, and no third has run at `n = 31`. A program written without reading their code, or a recount by others, would close this.",
            "No value has a proof object or a recorded review by a person; no counter is published, so no count can be recomputed here.",
            "The 23 group counts come from one family of programs; for 15 of them (the 14 non-abelian groups and `ℤ_{4}×ℤ_{2}^{3}`) the 2 programs implement the same method. Only `ℤ_{27}` has a check by a program written without reading the others’ code.",
            "Evans’s books, Cavenagh and Wanless (2010), Shieh’s thesis, Shieh, Hsiang and Hsu (2000), Novaković (2000) and [7] beyond its abstract were not read, and the page of Shieh linked from A003111 did not resolve. Any may list some of these values; reading them would close this.",
          ],
        },
      ],
    },
  ],
  files: [
    {
      label: "dump.g",
      href: `${FILES}/dump.g`,
      detail:
        "GAP script (needs the SmallGroup library) that writes the Cayley tables of all groups of order 2 to 32 (order 32: abelian groups only) and index.tsv, a table of their invariants; the 23 tables below are among them",
    },
    {
      label: "G24_3.tab",
      href: `${FILES}/G24_3.tab`,
      detail:
        "SmallGroup(24,3), SL(2,3); line 1 is the order, then one row per element, entry (x, y) the index of x·y, element 0 the identity",
    },
    { label: "G24_4.tab", href: `${FILES}/G24_4.tab`, detail: "SmallGroup(24,4)" },
    { label: "G24_5.tab", href: `${FILES}/G24_5.tab`, detail: "SmallGroup(24,5)" },
    { label: "G24_6.tab", href: `${FILES}/G24_6.tab`, detail: "SmallGroup(24,6)" },
    { label: "G24_7.tab", href: `${FILES}/G24_7.tab`, detail: "SmallGroup(24,7)" },
    { label: "G24_8.tab", href: `${FILES}/G24_8.tab`, detail: "SmallGroup(24,8)" },
    { label: "G24_9.tab", href: `${FILES}/G24_9.tab`, detail: "SmallGroup(24,9)" },
    { label: "G24_10.tab", href: `${FILES}/G24_10.tab`, detail: "SmallGroup(24,10)" },
    { label: "G24_11.tab", href: `${FILES}/G24_11.tab`, detail: "SmallGroup(24,11)" },
    { label: "G24_12.tab", href: `${FILES}/G24_12.tab`, detail: "SmallGroup(24,12)" },
    { label: "G24_13.tab", href: `${FILES}/G24_13.tab`, detail: "SmallGroup(24,13)" },
    { label: "G24_14.tab", href: `${FILES}/G24_14.tab`, detail: "SmallGroup(24,14)" },
    { label: "G24_15.tab", href: `${FILES}/G24_15.tab`, detail: "SmallGroup(24,15)" },
    { label: "G25_2.tab", href: `${FILES}/G25_2.tab`, detail: "SmallGroup(25,2)" },
    { label: "G27_1.tab", href: `${FILES}/G27_1.tab`, detail: "SmallGroup(27,1), the cyclic group of order 27" },
    { label: "G27_2.tab", href: `${FILES}/G27_2.tab`, detail: "SmallGroup(27,2)" },
    { label: "G27_3.tab", href: `${FILES}/G27_3.tab`, detail: "SmallGroup(27,3), the Heisenberg group" },
    { label: "G27_4.tab", href: `${FILES}/G27_4.tab`, detail: "SmallGroup(27,4)" },
    { label: "G27_5.tab", href: `${FILES}/G27_5.tab`, detail: "SmallGroup(27,5)" },
    { label: "G28_3.tab", href: `${FILES}/G28_3.tab`, detail: "SmallGroup(28,3)" },
    { label: "G28_4.tab", href: `${FILES}/G28_4.tab`, detail: "SmallGroup(28,4)" },
    { label: "G32_45.tab", href: `${FILES}/G32_45.tab`, detail: "SmallGroup(32,45)" },
    { label: "G32_51.tab", href: `${FILES}/G32_51.tab`, detail: "SmallGroup(32,51)" },
  ],
  refs: [
    {
      text: "OEIS A003111, Number of complete mappings of the cyclic group Z_{2n+1}, read 15 November 2026: author N. J. A. Sloane; extensions by J. Hsiang, D. F. Hsu and Y. P. Shieh (3 June 2002) and a(12) from Yuh-Pyng Shieh (10 January 2006); formula line of Ian Wanless (30 July 2010), citing Cavenagh and Wanless, McKay, McLeod and Wanless, and Stones and Wanless.",
      href: "https://oeis.org/A003111",
    },
    {
      text: "OEIS A006717, Number of ways of arranging 2n+1 nonattacking semi-queens on a (2n+1) X (2n+1) toroidal board, read 15 November 2026: formula lines of Sam Spiro (16 April 2019, corrected by Sean Eberhard, 21 July 2023) and Andrew Howroyd (28 September 2020), who gives a(n) = (2n+1)·A003111(n).",
      href: "https://oeis.org/A006717",
    },
    {
      text: "I. M. Wanless, Transversals in Latin squares, Quasigroups and Related Systems 15 (2007) 169–190, arXiv:0903.5142v1 (30 March 2009): Theorems 6 and 8, Table 4 and the values of the normalised cyclic counts to n = 25.",
      href: "https://arxiv.org/abs/0903.5142",
    },
    {
      text: "D. Best, I. M. Wanless, Parity of transversals of Latin squares, Algebraic Combinatorics 3 (2020) 539–557, arXiv:1912.11230 (24 December 2019), Section 2.",
      href: "https://arxiv.org/abs/1912.11230",
    },
    {
      text: "D. G. Glynn, The permanent of a square matrix, European Journal of Combinatorics 31 (2010) 1887–1891.",
      href: "https://doi.org/10.1016/j.ejc.2010.01.010",
    },
    {
      text: "J. Hsiang, D. F. Hsu, Y.-P. Shieh, On the hardness of counting problems of complete mappings, Discrete Mathematics 277 (2004) 87–100 (received 2 May 2002): states that Shieh computed the counts of all groups of order up to 23 and lists the cyclic counts to ℤ_{23}.",
      href: "https://doi.org/10.1016/S0012-365X(03)00176-6",
    },
    {
      text: "B. D. McKay, J. C. McLeod, I. M. Wanless, The number of transversals in a Latin square, Designs, Codes and Cryptography 40 (2006) 269–284.",
      href: "https://doi.org/10.1007/s10623-006-0012-8",
    },
    {
      text: "M. Hall, L. J. Paige, Complete mappings of finite groups, Pacific Journal of Mathematics 5 (1955) 541–549; the necessary condition on the Sylow 2-subgroup, as stated in Theorem 8 of Wanless’s survey [3].",
      href: "https://doi.org/10.2140/pjm.1955.5.541",
    },
    {
      text: "S. Eberhard, F. Manners, R. Mrazović, Additive triples of bijections, or the toroidal semiqueens problem, arXiv:1510.05987 (v1 20 October 2015, v3 22 March 2016); the asymptotic is as listed in A006717 [2], and we did not read its statement in the paper.",
      href: "https://arxiv.org/abs/1510.05987",
    },
  ],
  cite: "KalKram, Complete mappings of the cyclic groups of order 27, 29 and 31 and of 23 groups of orders 24 to 28 and 32, KK-R-0008, https://kalkram.com/research/complete-mappings-cyclic-groups, 2026.",
  history: [{ date: "2026-11-15", text: "Published." }],
};
