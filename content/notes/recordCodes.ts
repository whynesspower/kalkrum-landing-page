import type { Note } from "./types";

const FILES = "/files/candidate-binary-codes";

// Public sources: references [1] to [8], each cited where used.
// Private records of the lab are not cited.
export const recordCodes: Note = {
  slug: "candidate-binary-codes",
  id: "KK-R-0017",
  kind: "note",
  type: "Existence",
  title:
    "Five explicit binary linear codes of length 111 to 174 have minimum distance above the lower bounds listed at codetables.de on 16 November 2026.",
  statement:
    "A binary linear `[n, k, d]` code is a `k`-dimensional subspace of `F_{2}^{n}` whose nonzero vectors have Hamming weight (number of nonzero coordinates) at least `d`, with equality attained. For five pairs `(n, k)` we give a candidate code whose `d` exceeds, by 1, 2, 1, 1 and 1, the largest `d` for which codetables.de [1] lists a code.",
  field: "Coding theory",
  results: ["record-binary-codes"],
  published: "2026-11-15",
  revised: "2026-11-16",
  evidence: "candidate",
  header: {
    before:
      "codetables.de [1] lists lower bounds 26, 40, 45, 34 and 36 and upper bounds 34, 53, 61, 49 and 54 for `[111, 37]`, `[152, 38]`, `[172, 43]`, `[159, 53]` and `[174, 58]`, as read on 16 November 2026.",
    evidence:
      "Each distance was recomputed from the published matrix by programs of ours, written separately from one another and from the program that found the codes. The checks share the matrices; no one outside the lab has reviewed the result.",
    check:
      "All of it. A script confirms codewords of the stated weights in under a second. Published programs show no lighter word exists: under 2 minutes on a laptop for 4 codes, 344 s on a server for `[174, 58]`.",
    notEstablished:
      "That any of the five is new. Unread: MinT, Magma’s database, the codetables.de queue of unlisted codes. Chen’s database entry `[112, 37, 32]`, if genuine, punctures to `[111, 37, 31]`.",
    method: "Not published.",
  },
  sections: [
    {
      title: "What was known",
      blocks: [
        {
          p: "The codetables.de table has one cell for each `(n, k)`, giving lower and upper bounds on `d`. Sources read for the five parameter sets and the 24 cells below:",
        },
        {
          table: {
            head: ["Source", "Covers", "Codes in the 24 cells"],
            rows: [
              [
                "Chen, quasi-twisted codes [2]",
                "binary quasi-cyclic and quasi-twisted codes",
                "`[111, 36, 26]`, `[111, 37, 26]`, `[172, 43, 45]`, `[112, 37, 32]` (see Limits)",
              ],
              ["Yu et al. [3]", "group codes, lengths up to 120", "none; at lengths 110 to 113 only dimension 21"],
              [
                "Akre et al. [4]",
                "binary quasi-cyclic codes",
                "none reaches a new value by puncturing, shortening or extension",
              ],
              ["Seddas et al. [5]", "seven codes of dimension 20 to 22", "none"],
              ["Bayreuth list [6]", "one binary entry, `[177, 10, 84]`", "none"],
            ],
            caption: "Chen’s database was queried by `(n, k)` for each of the 24 cells.",
          },
        },
        {
          p: "Web searches on these parameters, the last on 16 November 2026, found nothing.",
        },
      ],
    },
    {
      title: "The result",
      blocks: [
        {
          p: "Each code is one-generator quasi-cyclic: its `k = m` generator rows are `x^{i}(1, a_{2}, …, a_{l})` for `0 ≤ i < m`, with `l = n/m` blocks, and each `a_{t}` is invertible in `F_{2}[x]/(x^{m} − 1)` and fixed by `x ↦ x^{u}`, where `u` is a unit mod `m`. The code is invariant under the simultaneous cyclic shift of the blocks and the permutation `j ↦ uj (mod m)` of the coordinates of every block, which generate `ℤ_{m} ⋊ ⟨u⟩`, of order `m · ord_{m}(u)`. Codes with a prescribed automorphism group are a known class [7].",
        },
        {
          table: {
            head: ["Code", "Listed bounds", "`m`, `l`, `u`", "Group order", "Distance computed by", "`A_{d}`"],
            rows: [
              [
                "`[111, 37, 27]`",
                "26–34",
                "37, 3, 10",
                "111",
                "all `2^{37}` codewords, 2 programs; Brouwer–Zimmermann",
                "4,292",
              ],
              [
                "`[152, 38, 42]`",
                "40–53",
                "38, 4, 7",
                "114",
                "all `2^{38}` codewords, 2 programs; Brouwer–Zimmermann",
                "6,460",
              ],
              [
                "`[172, 43, 46]`",
                "45–61",
                "43, 4, 6",
                "129",
                "all `2^{43}` codewords, 2 programs; Brouwer–Zimmermann",
                "6,536",
              ],
              ["`[159, 53, 35]`", "34–49", "53, 3, 10", "689", "Brouwer–Zimmermann; pigeon (below)", "not computed"],
              ["`[174, 58, 37]`", "36–54", "58, 3, 7", "406", "Brouwer–Zimmermann; pigeon (below)", "not computed"],
            ],
            caption:
              "Listed bounds: lower and upper bounds in the header of the codetables.de cell page, read 16 November 2026. `A_{d}` is the number of codewords of weight `d`; both enumerations agree. The enumeration (`2^{53}`, `2^{58}` words) was not run for the other two codes.",
            numeric: [3, 5],
            nowrap: [0, 1, 2],
          },
        },
        {
          code: 'CODES = [\n    (37, "1 852e20159 19ff6e6c3b", "604003"),\n    (38, "1 1d03c75fa6 2798684cde 28eed6fba7", "ccc2a6043"),\n    (43, "1 47821c7bedf 5f873abbff7 7b0f26c51ef", "2005c814944"),\n    (53, "1 2d4101101a402 ff69fddfdf52e", "88254006c2309"),\n    (58, "1 32f7d4f96ee7fff 3aab6ee1ec4b7f2", "d8420c9c004a9"),\n]',
          caption:
            "Per code: m, the blocks 1, a_2, …, a_l of the generator row as hexadecimal integers (bit j is the coefficient of x^j), and the message polynomial of a codeword of weight d in the same encoding. The full matrices are the files below.",
        },
      ],
    },
    {
      title: "How to check it",
      blocks: [
        {
          p: "1. Append this script to the data above: each output line is a nonzero codeword, so `d` is at most its weight.",
        },
        {
          code: 'def mul(a, b, m):  # product in F_2[x]/(x^m - 1); bit j is the coefficient of x^j\n    r = 0\n    for j in range(m):\n        if b >> j & 1:\n            r ^= ((a << j) | (a >> (m - j))) & ((1 << m) - 1)\n    return r\n\nfor m, blocks, msg in CODES:\n    word = [mul(int(msg, 16), int(b, 16), m) for b in blocks.split()]\n    print(f"n = {m * len(word)}, k = {m}: codeword of weight", sum(bin(w).count("1") for w in word))',
          caption:
            "Output, in order: n = 111, k = 37: codeword of weight 27; then weights 42, 46, 35 and 37 for the other four codes.",
        },
        {
          p: "2. Run the programs on the files below (shown for two codes; change the file names and, in mdcheck, the claimed `d` and `m`):",
        },
        {
          code: "cc -O3 -fopenmp -o mdfull mdfull.c\ncc -O3 -fopenmp -o pigeon pigeon.c\nc++ -O3 -std=c++17 -pthread -o mdcheck mdcheck.cpp\npython3 -I certcheck.py cert_111_37_u10.json 10\npython3 -I certcheck.py cert_159_53_u10.json 10\n./mdfull 28 10 < cert_111_37_u10.json.rows\n./pigeon < cert_159_53_u10.json.blk\npython3 -c \"import json,sys; d=json.load(open(sys.argv[1])); print(d['n'], d['k'], d['claim_d']); print(*d['rows'], sep='\\n')\" cert_159_53_u10.json > c159.txt\n./mdcheck bz c159.txt 10 35 blocks:53",
          caption:
            "On macOS with Apple clang 21 and Homebrew libomp, replace -fopenmp by -Xpreprocessor -fopenmp -I/opt/homebrew/opt/libomp/include -L/opt/homebrew/opt/libomp/lib -lomp. certcheck.py writes the .rows and .blk files into the current folder. mdfull takes the largest weight to count and the number of prefix bits.",
        },
        {
          code: "$ ./mdfull 28 10 < cert_111_37_u10.json.rows\ndmin=27 witness_weight=27\nA_27=4292\nA_28=17612\n$ ./mdfull 44 10 < cert_152_38_u7.json.rows\ndmin=42 witness_weight=42\nA_42=6460\nA_44=39387\n$ ./pigeon < cert_159_53_u10.json.blk\nACCEPT_LOWER: d >= 35 (no word of weight <= D-1 in the covering set)\n$ ./mdcheck bz c159.txt 10 35 blocks:53\nVERDICT ACCEPT d=35 leaves=2.274e+11",
          caption:
            "Verdict lines of 4 of the runs timed below; the omitted lines give the parameters, search counts and a witness word. The covering set of pigeon is the set of words it tests.",
        },
        {
          table: {
            head: ["Program", "`[111, 37]`", "`[152, 38]`", "`[172, 43]`", "`[159, 53]`", "`[174, 58]`"],
            rows: [
              ["mdfull, enumeration", "21 s", "45 s", "411 s †", "–", "–"],
              ["mdcheck brute, enumeration", "23 s", "68 s", "862 s †", "–", "–"],
              ["mdcheck bz, Brouwer–Zimmermann", "< 1 s", "< 1 s", "8 s", "75 s", "344 s †"],
              ["pigeon", "–", "–", "8 s", "58 s", "3 min †"],
            ],
            caption:
              "Wall time on an Apple M4 laptop with 10 cores, best of the runs; others took up to twice as long. † Recorded on a server, not re-run for this note: mdfull and pigeon on 32 threads, mdcheck on 12 threads.",
            numeric: [1, 2, 3, 4, 5],
            nowrap: [0],
          },
        },
        {
          p: "Brouwer–Zimmermann [8]: the `l` blocks are `l` disjoint information sets (`k` coordinates that determine a codeword). For increasing `w`, all combinations of at most `w` rows of each set’s systematic generator matrix are listed; any other nonzero word has weight at least `l(w + 1)`, and `d` is established when that bound, refined set by set, reaches the lightest weight found. pigeon: a nonzero word of weight below `d` has a block of weight at most `⌊(d − 1)/l⌋`; that block is invertible, so it determines the word, and a cyclic shift puts a 1 in its first coordinate. pigeon tests every word so determined.",
        },
        {
          table: {
            head: ["Program", "Control", "Outcome"],
            rows: [
              ["mdcheck bz", "its enumeration mode, 462 random cases", "same `d` in every case"],
              ["mdcheck", "weight counts of Golay, quadratic-residue, Reed–Muller and Hamming codes", "reproduced"],
              ["mdfull", "weight counts of Golay and quadratic-residue codes", "reproduced"],
              [
                "mdcheck",
                "30 altered inputs: for each code, claimed `d ± 1`, three single-bit flips, a repeated row",
                "all rejected",
              ],
              ["pigeon", "enumeration, 150 random quasi-cyclic codes", "same verdict in every case"],
            ],
            caption: "Controls on the programs, run by their authors; the inputs are not published.",
          },
        },
        {
          p: "A pass gives `d` for each published matrix if the programs are correct; pigeon also uses the shift invariance that certcheck.py confirms. A nonzero combination of rows of weight below `d` would refute a code.",
        },
      ],
    },
    {
      title: "What it changes",
      blocks: [
        {
          p: "Puncturing, shortening, taking subcodes, appending a zero coordinate and parity extension (giving `[112, 37, 28]`, `[160, 53, 36]` and `[175, 58, 38]`) raise the lower bound in 24 cells of the table of 16 November 2026, the five included: by 1 in 18 and by 2 in 6, none above a listed upper bound.",
        },
        {
          table: {
            head: ["From", "Cells: listed lower bound → implied lower bound"],
            rows: [
              [
                "`[111, 37, 27]`, `[112, 37, 28]`",
                "`[110, 36]` 26 → 27; `[111, 36]` 26 → 28; `[111, 37]` 26 → 27; `[112, 36]` 27 → 28; `[112, 37]` 26 → 28; `[113, 37]` 27 → 28",
              ],
              ["`[152, 38, 42]`", "`[151, 38]` 40 → 41; `[152, 38]` 40 → 42; `[153, 38]` 40 → 42; `[154, 38]` 41 → 42"],
              ["`[172, 43, 46]`", "`[171, 43]` 44 → 45; `[172, 43]` 45 → 46"],
              [
                "`[159, 53, 35]`, `[160, 53, 36]`",
                "`[157, 51]` 34 → 35; `[158, 51]` 35 → 36; `[158, 52]` 34 → 35; `[159, 52]` 35 → 36; `[159, 53]` 34 → 35; `[160, 53]` 34 → 36; `[161, 53]` 35 → 36",
              ],
              [
                "`[174, 58, 37]`, `[175, 58, 38]`",
                "`[173, 57]` 36 → 37; `[174, 57]` 37 → 38; `[174, 58]` 36 → 37; `[175, 58]` 36 → 38; `[176, 58]` 37 → 38",
              ],
            ],
            caption: "Listed values are those of the codetables.de table of 16 November 2026.",
          },
        },
      ],
    },
    {
      title: "Limits",
      blocks: [
        {
          list: [
            "Novelty. MinT, Magma’s database and the codetables.de queue of unlisted codes were not read; reading them, or the maintainer’s response to a submission of the five codes, would narrow this, not close it. Seddas et al. [5] (29 September 2026) report seven codes accepted by the maintainer but not yet in the live tables. The 24 cells share this limit.",
            "Chen’s database [2] lists a `[112, 37, 32]` code (N. Aydin, 2021). If genuine, it punctures to `[111, 37, 31]`, exceeding the new values in 6 cells. As printed, its generator’s 56 cyclic shifts span dimension 56, not 37; the first 37 give a `[112, 37]` code with `d = 22`. A query to the database maintainer would resolve it.",
          ],
        },
      ],
    },
  ],
  files: [
    {
      label: "cert_111_37_u10.json",
      href: `${FILES}/cert_111_37_u10.json`,
      detail:
        "generator matrix of [111, 37, 27]: n, k, k rows as hexadecimal integers (bit i is coordinate i), claimed d",
    },
    {
      label: "cert_152_38_u7.json",
      href: `${FILES}/cert_152_38_u7.json`,
      detail: "generator matrix of [152, 38, 42]",
    },
    {
      label: "cert_172_43_u6.json",
      href: `${FILES}/cert_172_43_u6.json`,
      detail: "generator matrix of [172, 43, 46]",
    },
    {
      label: "cert_159_53_u10.json",
      href: `${FILES}/cert_159_53_u10.json`,
      detail: "generator matrix of [159, 53, 35]",
    },
    {
      label: "cert_174_58_u7.json",
      href: `${FILES}/cert_174_58_u7.json`,
      detail: "generator matrix of [174, 58, 37]",
    },
    {
      label: "certcheck.py",
      href: `${FILES}/certcheck.py`,
      detail:
        "Python 3: checks shift structure, invertible blocks and invariance under x ↦ x^u; writes the input files of mdfull and pigeon",
    },
    {
      label: "mdfull.c",
      href: `${FILES}/mdfull.c`,
      detail: "C with OpenMP: minimum distance by Gray-code enumeration of all 2^k codewords, with weight counts",
    },
    {
      label: "mdcheck.cpp",
      href: `${FILES}/mdcheck.cpp`,
      detail:
        "C++: enumeration with the full weight distribution (brute) and Brouwer–Zimmermann (bz); prints a witness word",
    },
    {
      label: "pigeon.c",
      href: `${FILES}/pigeon.c`,
      detail: "C with OpenMP: lower bound d ≥ D for a one-generator quasi-cyclic code by the pigeonhole argument above",
    },
  ],
  refs: [
    {
      text: "M. Grassl, Bounds on the minimum distance of linear codes and quantum codes, codetables.de; cell pages, table and update log for binary codes, read 16 November 2026.",
      href: "https://www.codetables.de",
    },
    {
      text: "E. Z. Chen, Online database of quasi-twisted codes, read 16 November 2026 (5,070 codes, last modified 11 November 2026).",
      href: "http://databases.cs.hkr.se/qtcodes/searchqc2.php",
    },
    {
      text: "C. Yu, S. Zhu, H. Chen, Y. Li, X. Zhang, New record-breaking binary linear codes constructed from group codes, arXiv:2412.15551 (20 December 2024).",
      href: "https://arxiv.org/abs/2412.15551",
    },
    {
      text: "D. Akre, N. Aydin, M. J. Harrington, S. R. Pandey, New binary and ternary quasi-cyclic codes with good properties, arXiv:2108.06752 (v1 15 August 2021).",
      href: "https://arxiv.org/abs/2108.06752",
    },
    {
      text: "A. Seddas, V. Shashkov, M. Viazovska, E. Abbe, Evolving towards better codes: LLM-guided search for high-distance binary linear codes, arXiv:2609.37056 (29 September 2026).",
      href: "https://arxiv.org/abs/2609.37056",
    },
    {
      text: "List of new linear codes, University of Bayreuth (Braun, Kohnert, Wassermann; last update 10 October 2005), read 1 November 2026.",
      href: "https://mathe2.uni-bayreuth.de/axel/new_linear_codes.html",
    },
    {
      text: "M. Braun, A. Kohnert, A. Wassermann, Optimal linear codes from matrix groups, IEEE Trans. Inf. Theory 51(12), 4247–4251 (2005), doi:10.1109/TIT.2005.859291.",
      href: "https://doi.org/10.1109/TIT.2005.859291",
    },
    {
      text: "F. Hernando, F. D. Igual, G. Quintana-Ortí, Algorithm 994: Fast implementations of the Brouwer–Zimmermann algorithm for the computation of the minimum distance of a random linear code, ACM Trans. Math. Softw. 45(2), article 23 (2019), doi:10.1145/3302389; preprint arXiv:1603.06757, which outlines the algorithm.",
      href: "https://arxiv.org/abs/1603.06757",
    },
  ],
  cite: "KalKram, Candidate binary linear codes, KK-R-0017, https://kalkram.com/research/candidate-binary-codes, 2026.",
  history: [
    { date: "2026-11-15", text: "This account is published." },
    { date: "2026-11-16", text: "The 24 values are recomputed from the full codetables.de table." },
  ],
};
