import type { Note } from "./types";


/**
 * Sources of every figure and attribution. Public: references [1] to [18]; the repository at commit
 * d885022144ba6bf4efa8315e14871a3736947527 (README.md, NOVELTY.md, FRONTIER.md, CITATION.cff, NOTES.md section 7, the
 * READMEs of its directories and of the orders named, verify/, the certificates and stored matrices).
 * Not public, records of 15 November 2026: the split of the 195 values of Table 4 into 120, 34 and 41, and the check
 * of the 77 stored matrices by a second program. The set arithmetic of "What it changes" uses the survey's Table 5,
 * the Explorer's list of unknown orders and FRONTIER.md.
 * When the repository, the survey or the Explorer changes, change this file with it and set `revised`.
 */
export const hadamard: Note = {
  slug: "hadamard-matrices",
  id: "KK-R-0001",
  kind: "paper",
  type: "Existence",
  title: "We construct Hadamard matrices of 34 orders for which Table 4 of Cati and Pasechnik lists no known matrix.",
  statement:
    "A Hadamard matrix of order `m` is an `m × m` matrix `H` with entries `±1` and `HH^{T} = mI`. Version 58 of the Hadamard Matrix Explorer [1] holds no construction for 85 orders up to 10000. Table 4 of Cati and Pasechnik [2] lists odd `n ≤ 2999` with no known matrix of order `4n`; our verification bundle gives matrices of 34 of these orders, 7 of them concurrently with other groups.",
  field: "Combinatorial designs",
  results: ["hadamard-open-orders"],
  published: "2026-11-15",
  evidence: "certified",
  header: {
    before:
      "Table 4 of Cati and Pasechnik [2] lists each of the 34 orders with no known matrix. The text of the survey of Egan, Kotsireas, London and Ó Catháin [3] lists 95 orders up to 10000 with no known matrix (both read 15 November 2026).",
    evidence:
      "verify.py rebuilds each matrix from its certificate and tests `HH^{T} = mI` exactly. Our C program check_h.c (Files), not check_matrix.c, shares no code with verify.py and on 15 November 2026 passed all 77 stored matrices, 10 among the 34. The survey's authors report computing `HH^{T}` exactly for 2148, 2284, 2636 and 3964 [3].",
    check:
      "All of it. At commit d885022 (Python 3 with NumPy) run python3 verify/verify.py with any of the 34 orders, for example 2148; the repository states that the orders below 12000 take a few minutes and names no machine.",
    notEstablished:
      "That no earlier construction exists; sources not checked include Miyamoto's 1991 paper, Seberry and Yamada's 2020 book (chapter 6), MathSciNet, zbMATH and the full texts of paywalled journals of 2025–2026.",
    method:
      "Public at commit d885022: constructions, certificates and verifiers for every order; search programs, which the search README says cover most matrices, except those of 2636, 3436, 4204, 6796 and others.",
  },
  sections: [
    {
      title: "What was known",
      blocks: [
        {
          p: "Table 4 of Cati and Pasechnik [2] lists 195 such `n` in 2025; we call `n` and `4n` unresolved, and settled once a matrix is known. In August 2026 Alpöge, Voinov and Reynolds-Haertle [4] settled the 12 unresolved orders below 2000 and Schneider [5] order 2060.",
        },
        {
          p: "The survey [3] cites our repository as commit 2d45dbb. In its Table 4 it credits the commit with orders 2148, 2284, 2636 and 3964 and lists ‘Paley and Miyamoto blocks’, credited to Seberry and Yamada [6] and the repository, as reaching 1662 orders up to 10000; its Table 3 credits it with T-matrices (four circulant `0`, `±1` matrices with disjoint supports and `ΣT_{k}T_{k}^{T} = tI`) of orders 97, 109 and 197 and Williamson-type matrices of order 111 (four `±1` matrices with `W_{k}W_{l}^{T} = W_{l}W_{k}^{T}` and `ΣW_{k}W_{k}^{T} = 444I`).",
        },
        {
          p: "We claim no priority for the 7 orders labelled Concurrent below. For 2092, 3732, 4492, 5020 and 5932 another group found a matrix of the same order: Cooley [7] committed 2092 and 3732 on 14 October 2026, after our commits on 11 and 13 October, and the survey's authors credit Cooley with 2092 and construct 3732, 4492, 5020 and 5932 from sequences invariant under multiplier groups (units `t` acting as `x ↦ tx`) of orders 31, 33, 50 and 39 [3], as in ours (NOVELTY.md). Orders 2284 and 9172 follow in one step from others' matrices: 2284 from the quaternary matrix of order 1142 on Zaitsev's page [8] by Turyn's doubling [9], and 9172 from Cooley's order 2292, as derived in [3].",
        },
        {
          p: "Brouwer's table [10] credits J. Y. Z. Ho with the graph SRG(117, 58, 28, 29), equivalent to a symmetric conference matrix of order 118 (zero diagonal, entries `±1` elsewhere, `CC^{T} = 117I`); the survey says that a matrix of that order communicated to Brouwer is not public [3]. We claim no priority for our matrix of that order, used for 11292, which was found independently. Đoković claimed 6108 and 10180 in 2010 [11] through Corollary 8.8(i) of Seberry and Yamada [9]; the survey says that this corollary and Corollary 2 of Miyamoto's paper [12] omit a symmetry hypothesis and that the claim for 6108 is wrong [3].",
        },
      ],
    },
    {
      title: "The result",
      blocks: [
        {
          table: {
            head: ["Construction", "Orders", "Label"],
            rows: [
              ["Goethals–Seidel array, no border", "2092, 2284, 3732, 4492, 5020, 5932", "Concurrent"],
              ["Bordered Goethals–Seidel array", "2148, 2636, 3356, 3964", "New"],
              [
                "Quaternary conference matrix, complex Yamada–Kiyasu template, Turyn's doubling [9]",
                "2572, 3436, 3820, 4204, 6796",
                "New",
              ],
              [
                "Paley's matrix in circulant blocks, times T-matrices",
                "3156, 5260, 6036, 6356, 6756, 7364, 7660, 8620, 10060, 10644, 10932, 11260, 11572, 11804",
                "New, but obtainable classically",
              ],
              ["Miyamoto's bordered blocks, near-Williamson matrices, times T-matrices", "7532", "New"],
              [
                "Miyamoto's bordered blocks, near-Williamson matrices, times T-matrices",
                "6108, 10180",
                "First explicit construction",
              ],
              [
                "Miyamoto's bordered blocks, symmetric Williamson-type matrices from our conference matrix of order 118, times T-matrices",
                "11292",
                "New",
              ],
              [
                "Miyamoto's theorem [12] on our order 2292, which is not among the 34: Cooley published one on 9 October",
                "9172",
                "Concurrent",
              ],
            ],
            caption: "The 34 orders `4n`, from 2092 to 11804 (8 of them above 10000), by construction and label.",
          },
        },
        {
          list: [
            "*New*: unresolved in its reference table; we found no later construction.",
            "*New, but obtainable classically*: as New, every ingredient published before 2026 and only their combination new.",
            "*First explicit construction*: recorded as known in a table or earlier claim, but no valid construction traced (6108, 10180: Đoković's claim above).",
            "*Concurrent*: another group independently constructed it, or posted an object giving it in a short explicit step, at about the same time.",
            "*Known*: an earlier construction exists.",
          ],
        },
        {
          p: "A Goethals–Seidel array [13] makes a Hadamard matrix of order `4v` from four `±1` sequences on an abelian group of order `v` whose periodic autocorrelations (`Σ_{h} x(h)x(h + g)` for a sequence `x`) sum to zero at every `g ≠ 0`. A bordered array, of the type of Theorem 7 of the survey [3], instead has constant sums on `K ∖ {0}` and off `K`, for a proper subgroup `K`, and `b` border rows and columns constant on the cosets of `K`; here `b` is 12 or 28.",
        },
        {
          p: "A quaternary conference matrix of order `m` has zero diagonal, entries `±1`, `±i` elsewhere and `QQ^{*} = (m − 1)I`; we obtain such matrices from Szöllősi's array [14] in our zero-diagonal forms, bordered for 3820 and 4204. The complex Yamada–Kiyasu template is not ours: Zaitsev's matrices QH470, QH566, QH806, QH1142 and QH1526 [8] have its form. For a prime `q ≡ 1 (mod 4)` it turns one of order `(q + 3)/2` into a quaternary Hadamard matrix of order `2(q + 2)`, and Turyn's doubling into a real one of order `4(q + 2)`; for 2572, `q = 641`.",
        },
        {
          p: "Paley's matrix of order `q + 1`, for a prime power `q ≡ 3 (mod 8)`, is equivalent to a `4 × 4` array of circulant blocks [15], and T-matrices multiply such arrays [6]; we found the two combined nowhere in the sources of NOVELTY.md. Miyamoto's matrix of order `4q` [12], for a prime `q ≡ 1 (mod 4)`, is a `4 × 4` array of bordered blocks [6] built from Paley's conference matrix of order `q + 1` and a Hadamard matrix of order `q − 1`. When the latter comes from a negaperiodic or periodic Golay pair (two `±1` sequences whose autocorrelations of that kind sum to zero off the identity), from symmetric Williamson-type matrices or from near-Williamson matrices [16] (circulant, three of the four symmetric), and Paley's points are listed along a primitive root, the 16 blocks commute and one permutation transposes each, so T-matrices multiply the array, which we found stated nowhere in those sources.",
        },
        {
          table: {
            head: [
              "Family",
              "Orders",
              "New",
              "New, but obtainable classically",
              "First explicit construction",
              "Concurrent",
              "Known",
            ],
            numeric: [1, 2, 3, 4, 5, 6],
            rows: [
              ["Hadamard, unresolved in Table 4", "34", "11", "14", "2", "7", "0"],
              ["Skew-Hadamard, 476 to 14384", "122", "49", "67", "3", "0", "3"],
              ["Symmetric Hadamard, 260 to 9892", "103", "36", "49", "0", "9", "9"],
            ],
            caption:
              "Repository orders by family and label; [companion paper](/research/skew-symmetric-hadamard) for the last two. Skew: `H + H^{T} = 2I`; symmetric: `H = H^{T}`. Reference tables: Table 4 [2]; for the others the 2025 census of Đoković and Seberry [17], with Table 5 [2] for skew.",
          },
        },
      ],
    },
    {
      title: "How to check it",
      blocks: [
        {
          p: "verify.py rebuilds each matrix from its certificate, checks its ingredients, tests `HH^{T} = mI` exactly (float32, every partial sum an integer below `2^{24}`) and compares the SHA-256 digest with the certificate's.",
        },
        {
          code: "# run inside the verification bundle for this note, available from the lab on request\npython3 verify/verify.py 2148\n# hadamard/2148     ok    H H^T = 2148 I   sha256 c52fc913053fb8f3ef9f9a7cec1b22500eccc00ed000957166724026d8b940f8\ngzip -dc hadamard/2148/H2148.csv.gz | sha256sum\n# the same digest (on macOS: shasum -a 256): the stored file is the matrix of the certificate",
        },
        {
          code: "cc -O2 verify/check_matrix.c -o check_matrix\ngzip -dc hadamard/2092/H2092.csv.gz | ./check_matrix\n# n = 2092, 2189278 row pairs, 0 violations: H H^T = nI\n# matrices are stored for 10 of the 34 orders: 2092, 2148, 2284, 2636, 3356, 3732, 3964, 4492, 5020, 5932;\n# their digests match the certificates. For the other 24, write the matrix first:\npython3 verify/verify.py --write 2572\n./check_matrix hadamard/2572/H2572.csv\n# check_matrix does not compare n with the order claimed, and on empty input it prints n = 0 and passes: read n",
        },
        {
          p: "These checks establish that each matrix is Hadamard, not who found it first; a failure of any program on an order would refute the claim for it. verify.py and check_matrix.c share no code and belong to one repository.",
        },
      ],
    },
    {
      title: "What it changes",
      blocks: [
        {
          p: "The 120 values `n ≤ 2999` of Table 4 [2] without a construction in FRONTIER.md, which counts Cooley's matrices of orders 2292 and 2588 as settled, give orders `4n` up to 11996, 83 of them below 10000. The Explorer's 85 [1] are those 83 and 4792 = 8 · 599 and 5752 = 8 · 719, which Table 4 also leaves open: its entries for 599 and 719 have `m ≥ 4` (`n(m)`: least `m` with a known matrix of order `2^{m}n`), so none of order `8n` is known. The 95 orders in the text of the survey [3] are the Explorer's 85 and ten more: 2572, 3356, 3436, 3820, 4204 and 6796 of the 34 and 5912 = 8 · 739, all constructed in the repository and none credited to commit 2d45dbb in the survey, and 6712, 8248 and 8696, which follow from Kamali and Kharaghani [18] and Seberry and Yamada [9] (FRONTIER.md).",
        },
        {
          figure: "hadamard-frontier",
          caption:
            "The 195 values of `n ≤ 2999` in Table 4 [2], each at its order `4n`, in three disjoint rows: settled here (34, of which 7 concurrently with other groups), settled by others (41) and still open (120), that is without a construction in FRONTIER.md.",
        },
      ],
    },
    {
      title: "Limits",
      blocks: [
        {
          list: [
            "No earlier construction is excluded. Our searches, 12 October to 2 November 2026, did not cover the sources that NOVELTY.md lists as not checked; reading them would close this. If Miyamoto's paper proves the Williamson-type case of Corollary 8.8(i), 6108 and 10180 were already known.",
            "The 41 values settled by others are taken as reported, and the 24 orders without a stored matrix were tested only by verify.py; rebuilding the former and checking the latter with a second program would close this.",
            "For 2572, 3436, 3820, 4204 and 6796 the template has the form of Zaitsev's undated matrices [8], whose page lists the quaternary orders 1286, 1718 and 1910 as unknown and stops below 2000; Miyamoto's Corollary 4, read only in transcription, reaches such orders from a symmetric quaternary conference matrix. Dates for the matrices or reading Miyamoto's paper would close this.",
            "For 11292, Ho's conference matrix of order 118, if it exists as reported, gives the order by Cooper–Wallis after a repeated-block step; we know of no such construction by Ho or anyone else, and New holds only if there is none.",
          ],
        },
      ],
    },
    {
      title: "How it was found",
      blocks: [
        {
          p: "The verification bundle's READMEs give no search for 6108, 7532, 10180 and the 14 Paley-block orders, which their ingredients determine; its search README states that no certificate depends on any program.",
        },
      ],
    },
  ],
  files: [
    {
      label: "check_h.c",
      href: "/files/hadamard-matrices/check_h.c",
      detail: "our second checker, not in the repository: every pair of rows; skewness or symmetry on request",
    },
    {
      label: "check_h.out",
      href: "/files/hadamard-matrices/check_h.out",
      detail: "its output on the 77 stored matrices, 15 November 2026",
    },
  ],
  refs: [
    {
      text: "Hadamard Matrix Explorer, version 58, October 2026: home page and list of unknown orders (https://www.math74.com/Hadamard/unknown.html), read on 15 November 2026.",
      href: "https://www.math74.com/Hadamard/",
    },
    {
      text: "M. Cati, D. V. Pasechnik, A database of constructions of Hadamard matrices, arXiv:2411.18897, version 2 of 30 August 2025, Table 4.",
      href: "https://arxiv.org/abs/2411.18897",
    },
    {
      text: "R. Egan, I. S. Kotsireas, S. London, P. Ó Catháin, Recent progress in the construction of Hadamard matrices, arXiv:2610.27175 (version 1 of 19 October 2026, version 2 of 3 November 2026).",
      href: "https://arxiv.org/abs/2610.27175",
    },
    {
      text: "L. Alpöge, P. Voinov, S. Reynolds-Haertle, Hadamard matrices of orders 668, 716, 892, 1132, 1244, 1388, 1436, 1676, 1772, 1916, 1948 and 1964, announcement of 12 August 2026, title and date as in the repository README and [3]. The Epoch AI page that [3] cites (https://epoch.ai/frontiermath/open-problems/hadamard), read on 15 November 2026, concerns order 668 and names none of these authors.",
    },
    {
      text: "Schneider (GitHub user schneiderlo), Hadamard matrix of order 2060, public gist, 23 August 2026.",
      href: "https://gist.github.com/schneiderlo/b866a2ff2fcd93934f0db54cfa4069d0",
    },
    {
      text: "J. Seberry, M. Yamada, On the products of Hadamard matrices, Williamson matrices and other orthogonal matrices using M-structures, J. Combin. Math. Combin. Comput. 7 (1990) 97–137: Theorem 4 (products with T-matrices), Theorem 34 and Corollary 35 (Miyamoto's matrix as an array of bordered blocks).",
    },
    {
      text: "T. Cooley, Middletownbooks/Hadamard (GitHub repository): order 2292 committed 9 October 2026; orders 2092, 2588 and 3732 committed 14 October 2026.",
      href: "https://github.com/Middletownbooks/Hadamard",
    },
    {
      text: "V. Zaitsev, Quaternary Hadamard matrices, web page, last updated 14 October 2026. The repository names Zaitsev as the page's only author; [3] lists Kharaghani, Mohammadian and Tayfeh-Rezaie as further authors, whom the page names as collaborators on its near-Williamson preprint. Read in the Internet Archive copy of 22 October 2026; the live page did not respond on 15 November 2026.",
      href: "https://www.cs.uleth.ca/~zaitsevv/quaternary.html",
    },
    {
      text: "J. Seberry, M. Yamada, Hadamard matrices, sequences, and block designs, in J. H. Dinitz, D. R. Stinson (eds.), Contemporary Design Theory, Wiley (1992) 431–560: Corollary 8.8(i) (Corollary 29(i) of [6]), Table A.1 with the order 8q construction from its Williamson-type matrices, and Lemma 11.3, which gives Turyn's doubling.",
    },
    {
      text: "A. E. Brouwer, Parameters of strongly regular graphs, online tables, row for 117 vertices (https://aeb.win.tue.nl/graphs/srg/srgtab101-150.html): read on 15 November 2026, when the comment reads ‘Jose Yip Zheng Ho; 2-graph’.",
      href: "https://aeb.win.tue.nl/graphs/srg/srgtab101-150.html",
    },
    {
      text: "D. Ž. Đoković, Small orders of Hadamard matrices and base sequences, arXiv:1008.2043 (12 August 2010), Propositions 3.2–3.4.",
      href: "https://arxiv.org/abs/1008.2043",
    },
    { text: "M. Miyamoto, A construction of Hadamard matrices, J. Combin. Theory Ser. A 57 (1991) 86–108." },
    {
      text: "J.-M. Goethals, J. J. Seidel, A skew Hadamard matrix of order 36, J. Austral. Math. Soc. 11 (1970) 343–344.",
    },
    {
      text: "F. Szöllősi, A complex Hadamard matrix of order 94, arXiv:2603.09572 (10 March 2026), Theorem 4.",
      href: "https://arxiv.org/abs/2603.09572",
    },
    {
      text: "B. Schmidt, Williamson matrices and a conjecture of Ito's, Des. Codes Cryptogr. 17 (1999) 61–68, Theorems 2.2 and 3.3 (the latter due to Ito, 1994); M. Yamada, Hadamard matrices of generalized quaternion type, Discrete Math. 87 (1991) 187–196.",
    },
    {
      text: "H. Kharaghani, A. Mohammadian, B. Tayfeh-Rezaie, V. Zaitsev, A search for Hadamard matrices of near-Williamson type, arXiv:2605.08661, version 2 of 6 September 2026: near-Williamson matrices are four circulant ±1 matrices A, B, C, D of order w with B, C, D symmetric and AA^T + BB^T + CC^T + DD^T = 4wI.",
      href: "https://arxiv.org/abs/2605.08661",
    },
    {
      text: "D. Ž. Đoković, J. Seberry, census of skew and symmetric Hadamard matrices of order 4v for odd v < 2500, 28 May 2025.",
    },
    {
      text: "Kamali and Kharaghani, Dihedral Golay sequences, Australas. J. Combin. 18 (1998) 139–145, Corollary 9 and Table 1, as cited in FRONTIER.md.",
    },
  ],
  cite: "KalKram, Hadamard matrices of 34 orders with no known matrix in Table 4 of Cati and Pasechnik, KK-R-0001, https://kalkram.com/research/hadamard-matrices, 2026. Witnesses: commit d885022 of 6 November 2026, available on request.",
  history: [
    {
      date: "2026-10-09",
      text: "Cooley commits a matrix of order 2292 to Middletownbooks/Hadamard [7]; orders 2092, 2588 and 3732 on 14 October.",
    },
    {
      date: "2026-10-11",
      text: "Matrices of orders 2092, 2284, 4492 and 5932 committed to the repository; orders 3732 and 5020 on 13 October.",
    },
    {
      date: "2026-10-19",
      text: "The survey [3] is posted as version 1 and lists 95 orders up to 10000 with no known matrix.",
    },
    {
      date: "2026-11-15",
      text: "This account published; it describes commit d885022 of 6 November 2026.",
    },
  ],
};
