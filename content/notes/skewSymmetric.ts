import type { Note } from "./types";


/**
 * Sources: references [1] to [26], the manuscript cited under cite.
 * The re-test by a separate program (header.evidence): check_h.c and its output, published in public/files/hadamard-matrices.
 * The links of [9], [17] and [22] were not opened (built from what the manuscript prints); [1] has no link.
 */
export const skewSymmetric: Note = {
  slug: "skew-symmetric-hadamard",
  id: "KK-R-0002",
  kind: "paper",
  type: "Existence",
  title:
    "We construct skew-Hadamard matrices of order `4v` for 106 odd `v < 2500`, and symmetric ones for 85, each listed as undecided in the 2025 census.",
  statement:
    "A Hadamard matrix of order `n` is a `±1` matrix `H` with `HH^{T} = nI`, skew if `H + H^{T} = 2I`, symmetric if `H = H^{T}`. The census of Đoković and Seberry [1] lists 737 odd `v < 2500` as undecided for skew and 595 for symmetric matrices of order `4v`. We give skew matrices for 106 of the 737 and symmetric ones for 85 of the 595, by four theorems, an extension of Đoković's construction, and computer search.",
  field: "Combinatorial designs",
  results: ["skew-symmetric-hadamard"],
  published: "2026-11-15",
  evidence: "certified",
  header: {
    before:
      "The census of Đoković and Seberry [1] (May 2025) lists 737 odd `v < 2500` as undecided (‘open’) for skew and 595 for symmetric matrices of order `4v`. Later, Đoković [2] settled 3 symmetric and Schumer [3] 1 skew value; no other update is counted.",
    evidence:
      "The repository verifier rebuilds matrices from certificates and tests them exactly. Our separate program check_h.c (Files) re-tested 77 stored matrices, and skewness or symmetry of 58 skew and 6 symmetric ones, all passing. For the other 64 skew and 97 symmetric orders the verifier alone tests that. No outside review has taken place.",
    check:
      "One half: the matrices. The [repository](#files) verifier tests each in a few minutes for orders below 12000; the README gives no time for the 3 above (13072, 14352, 14384). Census status and novelty can be checked only against the sources.",
    notEstablished:
      "That the 45 skew and 36 symmetric values classed as new (see The result) have no earlier construction, published or posted: the literature search did not cover MathSciNet or zbMATH.",
    method:
      "Public: certificates, search programs and proofs of Theorems A to D in the repository (files below); the manuscript, submitted to arXiv on 7 November 2026, is not yet announced.",
  },
  sections: [
    {
      title: "What was known",
      blocks: [
        {
          p: "Theorems A and B below are symmetric versions of Yamada's Theorems 3 and 4 [4], the second due to Kiyasu [5], with the same hypotheses. The matrices of Seberry and Yamada [6] in the propus array of Seberry and Balonin [7], introduced by Balonin, give symmetric Hadamard matrices of order `4(q + 2)` for prime powers `q ≡ 5 (mod 8)` with `(q + 1)/2` a prime power, and of order `4q` for prime powers `q ≡ 1 (mod 8)` from a symmetric Hadamard matrix of order `(q − 1)/2`, a case we found stated in neither source. The propus array turns commuting symmetric `±1` matrices `A`, `B`, `D` of order `v` with `A^{2} + 2B^{2} + D^{2} = 4vI` into a symmetric Hadamard matrix of order `4v`. Miyamoto [8] asserted, for a prime power `q ≡ 1 (mod 4)`, a Hadamard matrix of order `4q` with two symmetric blocks, from symmetric Hadamard and conference matrices of orders `q − 1` and `q + 1`; Đoković and Seberry note that his proof does not establish the symmetry [1]. To our knowledge no general skew construction of order `3(q + 1)` appears in the census, Cati and Pasechnik [9], Seberry and Yamada [10] or Koukouvinos and Stylianou [11].",
        },
        {
          p: "We claim no priority for 18 symmetric values: 7 follow from Spence's Corollary 3 [12], 2 from Corollary 1 of [7] corrected by Balonin and Đoković [13], 1 (235) from that corollary with a symmetric conference matrix of order 118 due to J. Y. Z. Ho (personal communication, cited in Brouwer's table [14]), and 8 are values for which Zaitsev [15] had posted quaternary Hadamard matrices of order `2v`, not shown equivalent to ours.",
        },
      ],
    },
    {
      title: "The result",
      blocks: [
        {
          p: "A value is ‘new’ if, to our knowledge, no earlier construction, published or posted, and no combination of published results gives a matrix of order `4v` with the property; ‘from published results’ if published ingredients give it with at most a short verification of ours; ‘recorded as known’ if Table 5 of [9], which by its convention records an order as known without a construction, has no entry for it.",
        },
        {
          table: {
            head: ["Construction", "Values", "New", "From published results", "Recorded as known"],
            numeric: [1, 2, 3, 4],
            rows: [
              ["Symmetric, Theorem A", "58", "11", "47", "0"],
              ["Symmetric, Theorem B", "18", "18", "0", "0"],
              ["Symmetric, Theorem C", "3", "3", "0", "0"],
              ["Symmetric, `m(m − 1)` and `m(m + 3)`, after Đoković [2]", "2", "0", "2", "0"],
              ["Symmetric, propus arrays", "4", "4", "0", "0"],
              ["Symmetric, total", "85", "36", "49", "0"],
              ["Skew, Theorem D", "59", "0", "57", "2"],
              ["Skew, difference families", "42", "41", "0", "1"],
              ["Skew, orthogonal designs (Seberry [16])", "5", "4", "1", "0"],
              ["Skew, total", "106", "45", "58", "3"],
            ],
            caption:
              "Each value is listed once. A skew difference family is four `±1` sequences on an abelian group, the first with `a(0) = 1` and `a(−g) = −a(g)` for `g ≠ 0`, whose periodic autocorrelations sum to zero at every non-zero shift.",
          },
        },
        {
          statement:
            "Let `q ≡ 1 (mod 8)` be a prime power. If there is a Hadamard matrix of order `(q − 1)/2`, then there is a symmetric Hadamard matrix of order `4q`.",
          label: "Theorem A, Section 3 of the manuscript",
        },
        {
          p: "Of the 11 new values, 10 use an ordinary Hadamard matrix (known at all orders `4k ≤ 2000` [17], [18]), among them the matrix of order 716 announced by Alpöge, Voinov and Reynolds-Haertle on 12 August 2026 [17] for `q = 1433`; `q = 1753` uses the symmetric matrix of order 876 found here.",
        },
        {
          statement:
            "Let `q ≡ 5 (mod 8)` be a prime power. If there is a skew-Hadamard matrix of order `(q + 3)/2`, then there is a symmetric Hadamard matrix of order `4(q + 2)`.",
          label: "Theorem B, Section 4 of the manuscript",
        },
        {
          p: "Yamada's circulants [4] and the skew-Hadamard input assemble a symmetric quaternary Hadamard matrix `L` of order `2(q + 2)` over `{±1, ±i}`, which Turyn's map [19] turns into a symmetric real one of order `4(q + 2)`. Theorem B applies to 28 open `v = q + 2`, for none of which `(q + 1)/2` is a prime power; 10 carry no priority claim (8 for Zaitsev [15], 703 and 1183 for Spence [12]), leaving 18 new. It also applies to 183, listed under propus arrays.",
        },
        {
          statement:
            "Let `q ≡ 1 (mod 4)` be a prime power. If there is a Hadamard matrix of order `q − 1` with block rows `(P Q)` and `(Q P)`, in particular if there is a periodic Golay pair of length `(q − 1)/2` over an abelian group, then there is a symmetric Hadamard matrix of order `4q`.",
          label: "Theorem C, Section 5 of the manuscript",
        },
        {
          p: "It settles 101, 149 and 389 with periodic Golay pairs (`±1` sequences on an abelian group whose periodic autocorrelations sum to zero at every non-zero shift) of lengths 50, 74 and 194. Pairs of length 50 were known (Đoković [20]; Kotsireas and Koukouvinos [21]); Đoković and Kotsireas [22] found the pair of length 74. Ordinary Hadamard matrices of orders 404, 596 and 1556 were known [8]; symmetric ones of order `q − 1` also exist, so the values lie within Miyamoto's assertion, which Theorem C does not use.",
        },
        {
          statement: "For every prime power `q ≡ 3 (mod 4)` there is a skew-Hadamard matrix of order `3(q + 1)`.",
          label: "Theorem D, Section 8 of the manuscript",
        },
        {
          p: "Paley's skew matrix of order `q + 1` is, up to simultaneous row and column permutation and a `±1` diagonal similarity, a 4 × 4 array of negacyclic blocks `N_{kj}` with `N_{30} = N_{10}^{T}`; Yamada [23] gave this for `q ≡ 3 (mod 8)`, and we prove it for `q ≡ 7 (mod 8)`. Seberry, Yamada and Turyn [6] form `A_{j} = ΣT_{k} ⊗ N_{kj}` from T-matrices `T_{k}` of order `t` (Cooper and Wallis [24]). For `T = (I, Z, 0, −Z^{2})` of order 3, `Z` the cyclic shift, `A_{0} + A_{0}^{T} = 2I`, so the Goethals–Seidel array of the `A_{j}` is skew-Hadamard; that is the new observation. All 59 open `v = 3(q + 1)/4`, `q ≡ 3 (mod 8)`, are settled; 663 and 879 are recorded as known. Ordinary Hadamard matrices of these orders were known.",
        },
        {
          p: "The smallest open symmetric value, `v = 65`, comes from Verma's quaternary Legendre pair `(A, B)` of length 64 [25], in which `A` is real and `B` symmetric, a symmetry Verma does not use. A bordered propus array, the analogue of the bordered construction of Kotsireas and Winterhof [26], gives a symmetric Hadamard matrix of order 260.",
        },
        {
          p: "For 12 odd `v < 1000` (191, 225, 277, 299, 543, 579, 589, 611, 817, 897, 899, 909) we construct skew-Hadamard matrices of order `2^{t}v`, `t` = 3 or 4; Table 5 of [9] records the least `t` known as 226 for 191 and 4 to 6 for the other 11. They remain open.",
        },
      ],
    },
    {
      title: "How to check it",
      blocks: [
        {
          code: "# run inside the verification bundle for this note, available from the lab on request\n# 260; Theorems A, B, C, D (3236, 4924, 404, 996); a search (1004)\npython3 verify/verify.py symmetric/260 symmetric/3236 symmetric/4924 symmetric/404 skew/996 skew/1004\ncc -O2 verify/check_matrix.c -o check_matrix\ngzip -dc symmetric/260/H260.csv.gz | ./check_matrix",
          caption: "For order 260 the C program prints ‘n = 260, 33930 row pairs, 0 violations: H H^T = nI’.",
        },
        {
          code: "symmetric/260     ok    H H^T = 260 I   sha256 948586d6b68bc9a3c52ce2259903ad13f46ec54a800ee5cb8511b5a69d83eabe  (symmetric: H = H^T)",
          caption:
            "Verifier output line for order 260, as its source formats it, with the certificate's digest. The six matrices above take about a second. Without arguments it checks every matrix, up to order 51580 (about 40 minutes and 3.5 GB for that order, by the README).",
        },
        {
          p: "A pass shows a Hadamard matrix of the stated order and symmetry. An earlier construction at a value called new refutes only the label.",
        },
      ],
    },
    {
      title: "What it changes",
      blocks: [
        {
          p: "Of the 737 open skew values, 107 are settled (919 by Schumer [3], the 106 in the table), leaving 630, and of the 595 open symmetric values, 106 are settled (189, 473, 1139 by Đoković [2], the 85 in the table, the 18 without a priority claim), leaving 489.",
        },
      ],
    },
    {
      title: "Limits",
      blocks: [
        {
          list: [
            "Not established: that the 45 skew and 36 symmetric values classed as new have no earlier construction. The searches, 12 October to 6 November 2026 (575, 1657 and 1801 only 3 to 6 November, without broader web searches), omitted MathSciNet and zbMATH and read Miyamoto's paper [8] only through its abstract and a zbMATH review.",
            "For the symmetric values 133, 183 and 857, classed as new, Zaitsev [15] lists quaternary Hadamard matrices of orders 266, 366 and 1714, with no non-equivalence claim in the manuscript; a nauty check (programs not in the repository) found none of the three monomially equivalent to its transpose, hence none to a symmetric matrix.",
            "Theorem B needs a skew-Hadamard matrix of order `(v + 1)/2`, and we know of none for the 6 open `v = q + 2` (1711, 1879, 2215, 2359, 2383, 2391).",
            "For the 57 open `v = q` with `q ≡ 5 (mod 8)`, Theorem C needs `(q − 1)/4` to be a sum of two squares, which fails for 44; for 10 of the other 13 (`q` = 773, 821, 1109, 1493, 1621, 1733, 1973, 2197, 2309, 2341) we know of no input.",
          ],
        },
      ],
    },
    {
      title: "How it was found",
      blocks: [
        {
          p: "KalKram takes responsibility for the mathematical arguments, computational results, attribution and references of the manuscript.",
        },
      ],
    },
  ],
  files: [
    {
      label: "check_h.c",
      href: "/files/hadamard-matrices/check_h.c",
      detail:
        "our second checker, not in the repository; its output on the 77 stored matrices is check_h.out beside it",
    },
  ],
  refs: [
    {
      text: "D. Ž. Đoković, J. Seberry, Census of symmetric and skew Hadamard matrices of order 4v for odd v < 2500, manuscript, 8th Workshop on Design Theory, Hadamard Matrices and Applications (HADAMARD 2025), Seville, May 2025.",
    },
    {
      text: "D. Ž. Đoković, Orthogonal designs and symmetric Hadamard matrices, arXiv:2508.17141 (23 August 2025).",
      href: "https://arxiv.org/abs/2508.17141",
    },
    {
      text: "A. Schumer, Periodic T-matrices of order 151 and a skew spin Goethals–Seidel family over Z/919Z: certificates and Hadamard constructions of orders 3676, 5436, 6644, and 7852, Zenodo, 17 September 2026.",
      href: "https://doi.org/10.5281/zenodo.22820997",
    },
    {
      text: "M. Yamada, Some new series of Hadamard matrices, J. Austral. Math. Soc. Ser. A 46 (1989) 371–383.",
    },
    {
      text: "Z. Kiyasu, Hadamard Matrices and their Applications (in Japanese), Denshi Tsushin Gakkai, Tokyo, 1980.",
    },
    {
      text: "J. Seberry, M. Yamada, On the products of Hadamard matrices, Williamson matrices and other orthogonal matrices using M-structures, J. Combin. Math. Combin. Comput. 7 (1990) 97–137.",
    },
    {
      text: "J. Seberry, N. A. Balonin, Two infinite families of symmetric Hadamard matrices, Australas. J. Combin. 69 (2017) 349–357.",
    },
    { text: "M. Miyamoto, A construction of Hadamard matrices, J. Combin. Theory Ser. A 57 (1991) 86–108." },
    {
      text: "M. Cati, D. V. Pasechnik, A database of constructions of Hadamard matrices, arXiv:2411.18897 (v2, 30 August 2025).",
      href: "https://arxiv.org/abs/2411.18897",
    },
    {
      text: "J. Seberry, M. Yamada, Hadamard matrices, sequences, and block designs, in: J. H. Dinitz, D. R. Stinson (eds.), Contemporary Design Theory: A Collection of Surveys, Wiley, New York, 1992, 431–560.",
    },
    { text: "C. Koukouvinos, S. Stylianou, On skew-Hadamard matrices, Discrete Math. 308 (2008) 2723–2731." },
    { text: "E. Spence, An infinite family of Williamson matrices, J. Austral. Math. Soc. Ser. A 24 (1977) 252–256." },
    {
      text: "N. A. Balonin, D. Ž. Đoković, Symmetric Hadamard matrices of orders 268, 412, 436 and 604, Inform. Upravl. Sist. 2018, no. 4, 2–8; arXiv:1803.08787.",
      href: "https://arxiv.org/abs/1803.08787",
    },
    {
      text: "A. E. Brouwer, Parameters of strongly regular graphs, online tables, accessed 6 November 2026.",
      href: "https://aeb.win.tue.nl/graphs/srg/srgtab101-150.html",
    },
    {
      text: "V. Zaitsev, Quaternary Hadamard matrices, web page, University of Lethbridge, accessed 6 November 2026.",
      href: "https://www.cs.uleth.ca/~zaitsevv/quaternary.html",
    },
    { text: "J. Seberry, On skew Hadamard matrices, Ars Combin. 6 (1978) 255–275." },
    {
      text: "L. Alpöge, P. Voinov, S. Reynolds-Haertle, Hadamard matrices of orders 668, 716, 892, 1132, 1244, 1388, 1436, 1676, 1772, 1916, 1948 and 1964, announcement, 12 August 2026; verified and analysed in [18].",
      href: "https://x.com/__alpoge__/status/2087504785952182273",
    },
    {
      text: "R. Egan, I. S. Kotsireas, S. London, P. Ó Catháin, Recent progress in the construction of Hadamard matrices, arXiv:2610.27175 (v2, 3 November 2026).",
      href: "https://arxiv.org/abs/2610.27175",
    },
    {
      text: "R. J. Turyn, Complex Hadamard matrices, in: Combinatorial Structures and their Applications, Gordon and Breach, New York, 1970, 435–437.",
    },
    {
      text: "D. Ž. Đoković, Cyclic (v; r, s; λ) difference families with two base blocks and v ≤ 50, Ann. Comb. 15 (2011) 233–254.",
    },
    {
      text: "I. S. Kotsireas, C. Koukouvinos, Periodic complementary binary sequences of length 50, Int. J. Appl. Math. 21 (2008) 509–514.",
    },
    {
      text: "D. Ž. Đoković, I. S. Kotsireas, Some new periodic Golay pairs, Numer. Algorithms 69 (2015) 523–530.",
      href: "https://arxiv.org/abs/1310.5773",
    },
    { text: "M. Yamada, Hadamard matrices of generalized quaternion type, Discrete Math. 87 (1991) 187–196." },
    { text: "J. Cooper, J. Wallis, A construction for Hadamard arrays, Bull. Austral. Math. Soc. 7 (1972) 269–277." },
    {
      text: "H. Verma, A quaternary Legendre pair of length 64, arXiv:2609.25573 (v2, 30 October 2026).",
      href: "https://arxiv.org/abs/2609.25573",
    },
    {
      text: "I. S. Kotsireas, A. Winterhof, Quaternary Legendre pairs, in: C. J. Colbourn, J. H. Dinitz (eds.), New Advances in Designs, Codes and Cryptography, Fields Inst. Commun. 86, Springer, Cham, 2024, 289–304.",
      href: "https://doi.org/10.1007/978-3-031-48679-1_15",
    },
  ],
  cite: "KalKram, New families and orders of skew-Hadamard and symmetric Hadamard matrices, KK-R-0002, https://kalkram.com/research/skew-symmetric-hadamard, 2026. Manuscript: 43 pages, submitted to arXiv on 7 November 2026 (submission identifier submit/8343375; not yet announced). Witnesses: commit d885022 of 6 November 2026, available on request.",
  history: [
    { date: "2026-11-06", text: "Version of the repository that the manuscript cites: commit d885022." },
    { date: "2026-11-07", text: "Manuscript submitted to arXiv, identifier submit/8343375. Not yet announced." },
    { date: "2026-11-15", text: "This paper is published on this site." },
  ],
};
