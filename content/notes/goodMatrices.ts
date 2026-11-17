import type { Note } from "./types";

const FILES = "/files/good-matrices-53-55";

/**
 * Sources used, all opened on 15 November 2026 unless a date says otherwise.
 *
 * Public:
 * Đoković, Kotsireas, arXiv:1802.00556v1 (2 February 2018, the only version): abstract, Introduction (display (1), the
 *   known orders, the exhaustive searches), PDF text. The arXiv page gives Math. Comput. Sci. 12 (2018) 373-388.
 * Bright, Đoković, Kotsireas, Ganesh, arXiv:1811.05094v1 (13 November 2018, the only version): abstract, Introduction,
 *   Definition 1, Theorem 1, Section 2 (equivalence operations, search-space size), PDF text. The arXiv page gives the
 *   AAAI proceedings DOI 10.1609/aaai.v33i01.33011435.
 * Kharaghani, Mohammadian, Tayfeh-Rezaie, arXiv:2605.08661: the v1 PDF (9 May 2026, three authors, title "A search for
 *   Hadamard matrices of Williamson type", the order-53 example with A almost symmetric) and the v2 PDF (6 September
 *   2026, Zaitsev as fourth author, title "... near-Williamson type"): Sections 1, 2.2, 2.3, Tables 3 and 4. The arXiv
 *   abstract page, fetched on 15 November 2026, still shows the v1 title and three authors.
 * Abuzin, Balonin, Đoković, Kotsireas (2019): the English PDF of the journal page (i-us.ru): abstract, Introduction and
 *   the section on v = 53. The six printed order-53 families were parsed and tested for symmetric and skew blocks.
 * Đoković, arXiv:2404.14375v3 (16 November 2024): Introduction, Sections 2 and 3 (PDF text), including the sentence on
 *   the orders of the known good matrices.
 * Egan, Kotsireas, London, Ó Catháin, arXiv:2610.27175v2 (3 November 2026): PDF text searched for "good matri"; its
 *   only mention is order 127.
 * Cati, Pasechnik, arXiv:2411.18897v2 (30 August 2025): Section 2.3, Table 1 and Table 3 (PDF text); Table 3 is the
 *   skew table (the caption stands above its table).
 *
 * Private records of the lab are not cited.
 *
 * The five files in public/files/good-matrices-53-55/ were read in full: ck_good.py, ck_good2.c, vgood.py, mutants.py,
 * Good5355.lean. The checkers were run on 15 November 2026 from a copy (Lean 4.35.0); the outputs printed on the page
 * are those runs. The ten-line script printed on the page shares no code with the files.
 */
export const goodMatrices: Note = {
  slug: "good-matrices-53-55",
  id: "KK-R-0006",
  kind: "note",
  type: "Existence",
  title: "Circulant good matrices of orders 53 and 55 exist; one explicit set of each is given.",
  statement:
    "Circulant good matrices of odd order `n` are circulant ±1 matrices `A, B, C, D` with `A + A^{T} = 2I`, `B, C, D` symmetric, and `AA^{T} + BB^{T} + CC^{T} + DD^{T} = 4nI`. We give one set for each `n ∈ {53, 55}`; each yields a skew-Hadamard matrix of order `4n` (212, 220) by the Goethals–Seidel array [1].",
  field: "Combinatorial designs",
  results: ["good-53-55"],
  published: "2026-11-15",
  evidence: "certified",
  header: {
    before:
      "Đoković and Kotsireas [1] list good matrices at odd orders ≤ 39 and at 43, 45 and 127, none at 41, 47 and 49; Bright et al. [2] add 57, none at 51, 63 and 69. Neither lists 53 or 55 (read 15 November 2026).",
    evidence:
      "Each printed set is its own certificate, and 3 programs of ours and a Lean file, written without the search code, also accept it. They share the definition and the sequence encoding; no review outside the lab is recorded.",
    check:
      "All of it. Paste the sequences and the 10-line script below into Python 3 (under a second), then run the published checkers on the same sets (each under 2 seconds; Lean under 15 seconds).",
    notEstablished:
      "That each order has exactly one inequivalent set (equivalence as in [2]). Our 3 complete computer searches at each order returned only the printed set, none with a public certificate.",
    method: "Not published.",
  },
  sections: [
    {
      title: "What was known",
      blocks: [
        {
          p: "With the first entries fixed to +1, the four defining rows have `4^{n−1}` possible values at order `n` [2]. Exhaustive searches had reached order 49 [1]; Bright et al. [2] added the odd multiples of 3 up to 69.",
        },
        {
          p: "The order-53 near-Williamson matrices of Kharaghani et al. [3] (the same identity with `A` unrestricted) have `a_{k} = a_{n−k}` for `2 ≤ k ≤ n−2`, so `A` is not skew. The order-53 difference families of Abuzin et al. [4] have 2 equal blocks, neither symmetric nor skew. Neither gives a good set.",
        },
        {
          p: "Đoković [5] (16 November 2024) writes that the known good matrices have orders at most 127. We found no good matrices of order 53 or 55 in any reference below (the survey [6] was searched for the term only); to our knowledge these are the first.",
        },
        {
          p: "Skew-Hadamard matrices of orders 212 and 220 were already known: Table 3 of [7] lists `n = 53` under Paley’s first construction and `n = 55` under complementary difference sets. New here is the good-matrix structure.",
        },
      ],
    },
    {
      title: "The result",
      blocks: [
        {
          p: "Each sequence is a first row `x_{0}, …, x_{n−1}`, with + for 1 and - for −1; `a_{0} = 1`, `a_{n−i} = −a_{i}`, and `x_{n−i} = x_{i}` for `x = b, c, d`. The matrix identity is equivalent to `Σ_{x} Σ_{i} x_{i}x_{i+s} = 0` for `s ≠ 0` and `4n` for `s = 0`, over `x = a, b, c, d` with indices mod `n`.",
        },
        {
          code: 'A53 = "++-+--+--++-+-----++-+-++++----+-+--+++++-+--++-++-+-"\nB53 = "+++++-+++-++--++----+--+-++++-+--+----++--++-+++-++++"\nC53 = "+---++++-++++-+++---+-+++----+++-+---+++-++++-++++---"\nD53 = "+-++----+++-++--+---+-+-+----+-+-+---+--++-+++----++-"\nA55 = "+-+---+++-+-+----+++-++-++++----+--+---++++-+-+---+++-+"\nB55 = "++---+--+--+++---+-+++++-++++++-+++++-+---+++--+--+---+"\nC55 = "+-++-+--++--------++-+-+---++---+-+-++--------++--+-++-"\nD55 = "+---++-++-+-+---+--+--+++++--+++++--+--+---+-+-++-++---"',
          caption: "A, B, C, D at order 53, then at order 55. The squares of the row sums add to 4n: 212 and 220.",
        },
        {
          p: "Theorem 1 of [2] (Wallis, 1970) is stated for pairwise amicable matrices (`XY^{T}` symmetric); Bright et al. reach them from good matrices by reversing the rows of `B, C, D`. With `R` the reversal matrix, `H` below is the Goethals–Seidel array [1]; it is skew-Hadamard if its entries are ±1, `HH^{T} = 4nI` and `H + H^{T} = 2I`.",
        },
        {
          code: "H = [  A    BR    CR    DR ]\n    [ -BR    A    DR   -CR ]\n    [ -CR  -DR     A    BR ]\n    [ -DR   CR   -BR     A ]",
          caption:
            "Transposes of the symmetric blocks are dropped. The array printed in [1] has the opposite signs on the 6 off-diagonal blocks of the lower right 3 × 3 block and also gives skew-Hadamard matrices here.",
        },
      ],
    },
    {
      title: "How to check it",
      blocks: [
        { p: "1. Append this script to the sequences above." },
        {
          code: 'def paf(x, s): return sum(x[i] * x[(i + s) % len(x)] for i in range(len(x)))\ndef word(x): return sum(1 << (i - 1) for i in range(1, len(x) // 2 + 1) if x[i] == -1)\nfor n, rows in ((53, (A53, B53, C53, D53)), (55, (A55, B55, C55, D55))):\n    A, B, C, D = [[1 if c == "+" else -1 for c in r] for r in rows]\n    assert all(len(X) == n for X in (A, B, C, D)) and A[0] == 1 and all(A[n - i] == -A[i] for i in range(1, n))\n    assert all(X[n - i] == X[i] for X in (B, C, D) for i in range(1, n))\n    sums = [sum(paf(X, s) for X in (A, B, C, D)) for s in range(n)]\n    assert sums[0] == 4 * n and not any(sums[1:])\n    print(n, "row sums", [sum(X) for X in (A, B, C, D)], "autocorrelation total", sums[0])\n    print("hex", *[format(word(X), "x") for X in (A, B, C, D)])',
          caption:
            "Output: 53 row sums [1, 9, 9, -7] autocorrelation total 212, hex 29f4da b79910 3171087 3576479; then 55 row sums [1, 7, -13, -1] autocorrelation total 220, hex 48f51d 82e36e 3a9fe69 41b7527. The hex words are the checkers’ inputs. A failed condition raises AssertionError.",
        },
        {
          p: "2. From one folder holding the 5 files listed below (ck_good.py, vgood.py and mutants.py need NumPy, ck_good2.c a C compiler):",
        },
        {
          code: "python3 ck_good.py 53 29f4da b79910 3171087 3576479\npython3 ck_good.py 55 48f51d 82e36e 3a9fe69 41b7527\ncc -O2 -o ck_good2 ck_good2.c\n./ck_good2 53 29f4da b79910 3171087 3576479\n./ck_good2 55 48f51d 82e36e 3a9fe69 41b7527\npython3 vgood.py\npython3 mutants.py\nlean Good5355.lean",
          caption:
            "Each hex word encodes one sequence: bit i−1 is set iff entry i is −1, for 1 ≤ i ≤ (n−1)/2; entry 0 is +1 and symmetry or skewness gives the rest.",
        },
        {
          code: "{'n': 53, 'paf_ok': True, 'paf0': 212, 'pm1': True, 'hadamard': True, 'skew': True, 'rowsums': [1, 9, 9, -7], 'PASS': True}\n{'n': 55, 'paf_ok': True, 'paf0': 220, 'pm1': True, 'hadamard': True, 'skew': True, 'rowsums': [1, 7, -13, -1], 'PASS': True}\nn=53 poly_identity=1 hadamard=1 skew=1\nn=55 poly_identity=1 hadamard=1 skew=1\nwitness n=53 ok=True [] rowsums=[1, 9, 9, -7]\nwitness n=55 ok=True [] rowsums=[1, 7, -13, -1]\n53 single-bit mutants 104 accepted 0 | junk high bit rejected | A<->B swap accepted False\n55 single-bit mutants 108 accepted 0 | junk high bit rejected | A<->B swap accepted False",
          caption:
            "Verdict lines. Mutants are all one-bit changes of the hex words (104 and 108, each altering an entry and its mirror); all are rejected. Lean 4.35.0 prints nothing and exits with status 0.",
        },
        {
          p: "A pass establishes that the printed sequences meet the defining conditions and that `H` is skew-Hadamard at both orders. The Lean proof covers the defining conditions in autocorrelation form only, not `H` or the Goethals–Seidel theorem. The script shares no code with the files. A failed condition would refute the claim.",
        },
      ],
    },
    {
      title: "What it changes",
      blocks: [
        {
          p: "Of the 6 odd orders up to 69 without a listed status in [1] and [2] (53, 55, 59, 61, 65, 67), we give an explicit set at 53 and at 55.",
        },
      ],
    },
    {
      title: "Limits",
      blocks: [
        {
          list: [
            "Uniqueness. We do not claim that each order has exactly one inequivalent set (equivalence as in [2]). At each order, 3 complete computer searches run in the lab returned only the printed set, none with a public certificate. A public certificate or a search outside the lab would close it.",
            "Priority. That these are the first sets of orders 53 and 55 holds only against [1]–[7] as read on 15 November 2026; an earlier publication or an unpublished computation would change it.",
          ],
        },
      ],
    },
  ],
  files: [
    {
      label: "ck_good.py",
      href: `${FILES}/ck_good.py`,
      detail: "Python checker (NumPy): autocorrelations, structure, order-4n array; input n and four hex words",
    },
    {
      label: "ck_good2.c",
      href: `${FILES}/ck_good2.c`,
      detail:
        "C checker: polynomial identity and the array built entry by entry, with the reversal that fixes index 0 in place of R",
    },
    {
      label: "vgood.py",
      href: `${FILES}/vgood.py`,
      detail: "Third checker (NumPy); checks both sets with no arguments",
    },
    {
      label: "mutants.py",
      href: `${FILES}/mutants.py`,
      detail: "All one-bit changes of the hex words, all rejected; needs ck_good.py in the same folder",
    },
    {
      label: "Good5355.lean",
      href: `${FILES}/Good5355.lean`,
      detail: "Lean 4: the defining conditions for both sets by decide +kernel, and one changed set proved not good",
    },
  ],
  refs: [
    {
      text: "D. Ž. Đoković, I. S. Kotsireas, Goethals–Seidel difference families with symmetric or skew base blocks, Math. Comput. Sci. 12 (2018) 373–388, arXiv:1802.00556v1 (2 February 2018): display (1) and the Introduction.",
      href: "https://arxiv.org/abs/1802.00556",
    },
    {
      text: "C. Bright, D. Ž. Đoković, I. Kotsireas, V. Ganesh, A SAT+CAS approach to finding good matrices: new examples and counterexamples, AAAI 2019, doi:10.1609/aaai.v33i01.33011435, arXiv:1811.05094v1 (13 November 2018): Definition 1, Theorem 1 and Section 2.",
      href: "https://arxiv.org/abs/1811.05094",
    },
    {
      text: "H. Kharaghani, A. Mohammadian, B. Tayfeh-Rezaie, V. Zaitsev, A search for Hadamard matrices of near-Williamson type, arXiv:2605.08661v2 (6 September 2026), Sections 2.2 and 2.3 and Table 4. Version 1 (9 May 2026) has 3 authors, without Zaitsev, and the title A search for Hadamard matrices of Williamson type.",
      href: "https://arxiv.org/abs/2605.08661",
    },
    {
      text: "L. V. Abuzin, N. A. Balonin, D. Ž. Đoković, I. S. Kotsireas, Hadamard matrices from Goethals–Seidel difference families with a repeated block, Informatsionno-upravliaiushchie sistemy [Information and Control Systems] 2019, no. 5, 2–9, doi:10.31799/1684-8853-2019-5-2-9: the section on v = 53.",
      href: "https://doi.org/10.31799/1684-8853-2019-5-2-9",
    },
    {
      text: "D. Ž. Đoković, Two classes of Hadamard matrices of Goethals–Seidel type, arXiv:2404.14375v3 (16 November 2024): Section 3.",
      href: "https://arxiv.org/abs/2404.14375",
    },
    {
      text: "R. Egan, I. S. Kotsireas, S. London, P. Ó Catháin, Recent progress in the construction of Hadamard matrices, arXiv:2610.27175v2 (3 November 2026).",
      href: "https://arxiv.org/abs/2610.27175",
    },
    {
      text: "M. Cati, D. V. Pasechnik, A database of constructions of Hadamard matrices, arXiv:2411.18897v2 (30 August 2025): Table 3.",
      href: "https://arxiv.org/abs/2411.18897",
    },
  ],
  cite: "KalKram, Good matrices of orders 53 and 55, KK-R-0006, https://kalkram.com/research/good-matrices-53-55, 2026.",
  history: [{ date: "2026-11-15", text: "Published." }],
};
