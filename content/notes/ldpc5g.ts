import type { Note } from "./types";

const FILES = "/files/5g-nr-ldpc-minimum-distances";

/**
 * Public sources: references [1] to [4], read on 15 November 2026.
 * Private records of the lab are not cited.
 */
export const ldpc5g: Note = {
  slug: "5g-nr-ldpc-minimum-distances",
  id: "KK-R-0010",
  kind: "note",
  type: "Correction",
  title:
    "In Table 4 of arXiv:2607.04716v1 on 5G NR LDPC sub-codes, `d(C′(E[4], 48))` is 5, not 6, and we compute `d(C(E[4], 192)) = 10`, not 8.",
  statement:
    "`C(E[4], q)` is the binary length-26q code whose checks are the first 4 rows of base graph 1 of TS 38.212 [1], lifted at lifting size q by circulants shifted right by q's lifting-set values. `C′(E[4], q)` is its puncturing in the first 2q positions. Minimum distances: `d(C′(E[4], 48)) = 5`, `d(C(E[4], 192)) = 10`, `d(C(E[4], 384)) = 11`.",
  field: "Coding theory",
  results: ["5g-nr-corrections", "5g-nr-open-bracket", "5g-nr-ldpc-distances"],
  published: "2026-11-15",
  evidence: "single",
  header: {
    before:
      "Table 4 of Danilko, Mogilnykh and Tikhomolov [2] (arXiv:2607.04716v1, 6 July 2026; no later version was listed on 15 November 2026) gives `d(C′(E[4], 48)) = 6` and `d(C(E[4], 192)) = 8`, and for `C(E[4], 384)` a lower bound 8 and an upper bound 14.",
    evidence:
      "Upper bounds, and `d(C′(E[4], 48)) ≥ 5`, are checked by 2 scripts. One program of ours gives the other lower bounds, and a second, written separately, also those for `C(E[4], 192)`, `C′(E[4], 192)` and `C(E[4], 384)`; both use the same prepared inputs and matrix builder. No one outside the lab has reviewed the lower bounds.",
    check:
      "One half: every upper bound, and the lower bound for `C′(E[4], 48)`. Run check.py and check_table.py on the files listed below (Python 3, no packages, under a second each); no other lower bound can be checked this way.",
    notEstablished:
      "The lower bounds `d(C(E[4], 192)) ≥ 10`, `d(C′(E[4], 192)) ≥ 9`, `d(C(E[4], 384)) ≥ 11` and those of the 860 values. They rest on exhaustive computations without a certificate.",
    method: "Not published.",
  },
  sections: [
    {
      title: "What was known",
      blocks: [
        {
          p: "Danilko, Mogilnykh and Tikhomolov [2] write `C(ℰ_{[4]}, q)` for `C(E[4], q)`. Their headline code `C′(E[6], 384)`, of length 9984 and dimension 8448, has minimum distance `d` listed as 8 to 14 (p. 3). The KAIST CoCoA Lab database [3] lists minimum-distance codewords of 5G NR LDPC codes; we claim no priority over any code it lists.",
        },
      ],
    },
    {
      title: "The result",
      blocks: [
        {
          statement:
            "`C(E[4], 48)`, `C(E[4], 192)` and `C(E[4], 384)` have words of weight 6, 10 and 11 (in the script below), each with 1 position among the first 2q; hence `d(C′(E[4], 48)) ≤ 5`, `d(C(E[4], 192)) ≤ 10`, `d(C′(E[4], 192)) ≤ 9` and `d(C(E[4], 384)) ≤ 11`.",
          label: "Upper bounds",
        },
        {
          statement:
            "`d(C′(E[4], 48)) ≥ 5` follows from Table 3 and Theorem 3 of [2] (`d(C′(E[4], 24)) = 5` and `d(C′(E[4], 24)) ≤ d(C′(E[4], 48))`); the script below computes it. `d(C(E[4], 192)) ≥ 10`, `d(C′(E[4], 192)) ≥ 9` and `d(C(E[4], 384)) ≥ 11` are exhaustive computations by programs of ours.",
          label: "Lower bounds",
        },
        {
          table: {
            head: ["Code", "Study [2]", "Ours"],
            rows: [
              ["`C′(E[4], 48)`", "6", "5"],
              ["`C(E[4], 192)`", "8", "10"],
              ["`C′(E[4], 192)`", "7 to 8", "9"],
              ["`C(E[4], 384)`", "8 to 14", "11"],
              ["`C′(E[6], 384)`", "8 to 14", "11 to 13"],
            ],
            caption: "Values in Table 4 of [2], and in its abstract for `C′(E[6], 384)`, against ours.",
            nowrap: [0],
          },
        },
        {
          p: "For the headline code `C′(E[6], 384)`, `11 ≤ d ≤ 13`: the upper bound is a word of `C(E[6], 384)` of weight 13 with no position among the first 768 (file and last output line below); the lower bound is `d(C′(E[5], 384)) = 11`, from one program of ours, with eq. (7) of [2].",
        },
        {
          p: "We computed `d` for 860 sub-codes of the NR base graphs, each with an explicit word of that weight (file below); our values for `C(E[4], q)` equal those of [2] at `q = 3, 6, 12, 24, 48, 96`.",
        },
        {
          table: {
            head: ["Sub-code", "Rows L", "Lifting sizes q", "Codes", "Length", "Largest d"],
            rows: [
              ["Base graph 1", "4 to 9", "all 51", "306", "`(22 + L)q` ≤ 11,904", "18 (L = 9; q = 288, 352, 384)"],
              ["Base graph 1, first 2q positions deleted", "4", "45 of 51", "45", "`24q` ≤ 9,216", "11 (q = 320, 352)"],
              [
                "Base graph 2",
                "4 to 12",
                "all 51",
                "459",
                "`(10 + L)q` ≤ 8,448",
                "29 (L = 12; q = 208, 240, 256, 320, 352)",
              ],
              [
                "Base graph 2, first 2q positions deleted",
                "4",
                "50 of 51",
                "50",
                "`12q` ≤ 4,608",
                "8 (q = 104, 160, 208, 240, 288, 320, 352)",
              ],
            ],
            caption:
              "L is the number of base-graph rows, taken with the first 22 + L (base graph 1) or 10 + L (base graph 2) block columns. Lengths are after deletion.",
          },
        },
      ],
    },
    {
      title: "How to check it",
      blocks: [
        {
          code: "import json\n\n# Rows 0 to 3 of base graph 1 (TS 38.212, Table 5.3.2-2): (row i, column j, shifts V for lifting sets 0 to 7).\nbg = [(i, j, v) for i, j, v in json.load(open('nr_bg.json'))['BG1'] if i < 4]\n\ndef columns(q):\n    # Position j*q + t of C(E[4], q) as a bitmask over its 4q checks. Shifts are to the right, as in TS 38.212:\n    # check i*q + r contains position j*q + (r + V) mod q. The other direction gives an equivalent code.\n    a = q\n    while a % 2 == 0:\n        a //= 2\n    s = [1, 3, 5, 7, 9, 11, 13, 15].index(a)          # lifting set of q (Table 5.3.2-1)\n    col = [0] * (26 * q)\n    for i, j, v in bg:\n        for r in range(q):\n            col[j * q + (r + v[s]) % q] |= 1 << (i * q + r)\n    return col\n\ndef in_code(q, word):\n    col, syn = columns(q), 0\n    for p in word:\n        syn ^= col[p]\n    return syn == 0\n\ndef least_weight_up_to_4(q):\n    # Least weight, if at most 4, of a nonzero word of C'(E[4], q) (first 2q positions deleted); else None.\n    # A word of C' is a set of kept positions whose columns sum into the span of the 2q deleted columns.\n    # Reduce the kept columns modulo that span. Two different sets of at most 2 kept positions with the\n    # same reduced sum differ in a word of weight at most 4, and every such word arises this way.\n    col, basis = columns(q), {}\n    for x in col[:2 * q]:                              # reduced echelon basis of the deleted columns\n        for p, y in basis.items():\n            if x >> p & 1:\n                x ^= y\n        if x:\n            p = x.bit_length() - 1\n            for u in basis:\n                if basis[u] >> p & 1:\n                    basis[u] ^= x\n            basis[p] = x\n    def red(x):\n        for p, y in basis.items():\n            if x >> p & 1:\n                x ^= y\n        return x\n    r = [red(x) for x in col[2 * q:]]\n    seen, best = {}, None\n    for t in [()] + [(a,) for a in range(len(r))] + [(a, b) for a in range(len(r)) for b in range(a)]:\n        s = 0\n        for k in t:\n            s ^= r[k]\n        for u in seen.get(s, ()):\n            w = len(set(t) ^ set(u))\n            best = w if best is None else min(best, w)\n        seen.setdefault(s, []).append(t)\n    return best\n\n# Words of C(E[4], q), positions counted from 0 (position j*q + t is entry t of block j).\nwords = {48: [17, 96, 140, 208, 455, 1172],\n         192: [192, 1425, 3984, 4125, 4422, 4547, 4589, 4614, 4739, 4742],\n         384: [384, 1781, 3653, 4597, 4644, 4907, 7908, 8391, 8851, 9431, 9897]}\nfor q, w in words.items():\n    print('q =', q, ' weight', len(w), ' codeword:', in_code(q, w), ' positions among the first 2q:',\n          sum(p < 2 * q for p in w))\nfor q in (3, 6, 12, 24, 48):\n    print('q =', q, \" least weight <= 4 in C'(E[4], q):\", least_weight_up_to_4(q))",
          caption: "check.py.",
        },
        {
          code: "python3 check.py\nq = 48  weight 6  codeword: True  positions among the first 2q: 1\nq = 192  weight 10  codeword: True  positions among the first 2q: 1\nq = 384  weight 11  codeword: True  positions among the first 2q: 1\nq = 3  least weight <= 4 in C'(E[4], q): 2\nq = 6  least weight <= 4 in C'(E[4], q): 2\nq = 12  least weight <= 4 in C'(E[4], q): 3\nq = 24  least weight <= 4 in C'(E[4], q): None\nq = 48  least weight <= 4 in C'(E[4], q): None",
          caption: "Run beside nr_bg.json; about 0.3 s.",
        },
        {
          p: "Lines 1 to 3 test the 3 words. Lines 4 to 7 agree with Table 3 of [2] at `q = 3, 6, 12, 24`. Line 8 (None) means `C′(E[4], 48)` has no word of weight ≤ 4, so `d(C′(E[4], 48)) ≥ 5`.",
        },
        {
          code: "python3 check_table.py\nbase graph 1: 306 records, 306 pass, largest length 11904, largest d 18\nbase graph 1, first 2q deleted: 45 records, 45 pass, largest length 9216, largest d 11\nbase graph 2: 459 records, 459 pass, largest length 8448, largest d 29\nbase graph 2, first 2q deleted: 50 records, 50 pass, largest length 4608, largest d 8\n860 of 860 records pass\n722 of 722 pairs q, 2q satisfy d(q) <= d(2q) <= 2 d(q)\nbase graph 1, 6 rows, q = 384: word of weight 13, least position 1920 (the first 2q = 768 are deleted in the punctured code)",
          caption: "Run beside nr_bg.json and subcode_distances.jsonl; under a second.",
        },
        {
          p: "check_table.py rebuilds each code from nr_bg.json, tests its word, and tests `d(q) ≤ d(2q) ≤ 2d(q)` (Theorems 2 and 3 of [2]) for consecutive lifting sizes of one lifting set.",
        },
        {
          p: "nr_bg.json equals the Sionna files [4]; its base graph 1 equals Table 5.3.2-2 of TS 38.212 [1] in V17.3.0 and V18.6.0, and rows 0 to 11 of its base graph 2 equal Table 5.3.2-3 in V17.3.0.",
        },
      ],
    },
    {
      title: "What it changes",
      blocks: [
        {
          p: "Table 4 of [2] fails at `C′(E[4], 48)`. If the lower bounds hold, the upper bound 8 at `q = 192` fails for `C(E[4], 192)` and `C′(E[4], 192)`, and the bracket for `C(E[4], 384)` closes at 11.",
        },
      ],
    },
    {
      title: "Limits",
      blocks: [
        {
          list: [
            "Lower bounds `d(C(E[4], 192)) ≥ 10`, `d(C′(E[4], 192)) ≥ 9`, `d(C(E[4], 384)) ≥ 11` and those of the 860 values rest on exhaustive computations without a certificate. A word of weight ≤ 9 in `C(E[4], 192)` or ≤ 10 in `C(E[4], 384)` refutes the first or third; a certificate, or a rerun outside the lab on other inputs, closes them.",
            "`C′(E[6], 384)`: a word of weight 11 or 12 would lower the upper bound 13; a certificate that none of weight ≤ 12 exists would raise the lower bound to 13.",
            "Scope: the first L rows of the base graphs, not the full codes of the standard; no value for base graph 1 punctured at `q = 10, 12, 13, 15, 20, 256` or base graph 2 punctured at `q = 2`.",
          ],
        },
      ],
    },
  ],
  files: [
    {
      label: "nr_bg.json",
      href: `${FILES}/nr_bg.json`,
      detail: "base graphs 1 and 2 as in the Sionna files [4]: entries [row, column, shifts for lifting sets 0 to 7]",
    },
    {
      label: "subcode_distances.jsonl",
      href: `${FILES}/subcode_distances.jsonl`,
      detail:
        "the 860 values, one line each: base graph, rows L, lifting size q, punctured or not, length, d, and a word of weight d (positions counted from 0; in a punctured code, from the first position kept)",
    },
    {
      label: "check.py",
      href: `${FILES}/check.py`,
      detail: "the script printed under How to check it",
    },
    {
      label: "check_table.py",
      href: `${FILES}/check_table.py`,
      detail:
        "tests every word of subcode_distances.jsonl against nr_bg.json, and d(q) ≤ d(2q) ≤ 2d(q) for consecutive lifting sizes",
    },
  ],
  refs: [
    {
      text: "3GPP TS 38.212, NR; Multiplexing and channel coding, Section 5.3.2 and Tables 5.3.2-1 to 5.3.2-3, read as ETSI TS 138 212 V17.3.0 (September 2022), the version [2] cites, and V18.6.0 (April 2025).",
      href: "https://www.etsi.org/deliver/etsi_ts/138200_138299/138212/17.03.00_60/ts_138212v170300p.pdf",
    },
    {
      text: "V. R. Danilko, I. Yu. Mogilnykh, Ya. A. Tikhomolov, Minimum distances of LDPC codes in 5G standard, arXiv:2607.04716v1 (6 July 2026).",
      href: "https://arxiv.org/abs/2607.04716",
    },
    {
      text: "KAIST CoCoA Lab, Database of minimum-distance codewords in quasi-cyclic LDPC codes (J. Park, E. Ha, J. Ha), web page read 15 November 2026.",
      href: "http://ccit.kaist.ac.kr/dmincodewords/",
    },
    {
      text: "NVIDIA, Sionna, files 5G_bg1.csv and 5G_bg2.csv (base graphs 1 and 2 of TS 38.212), read 15 November 2026 at the head of the main branch; SHA-256 4ae766634def05dc45e4903c775a5ad7e1feb067747a644504b6d8c90d33b1ed and 4f4db6f7607446984c0b1dc6243bff4286f6fbad3a477f29d84a5e0edab523fb.",
      href: "https://github.com/NVlabs/sionna/blob/main/src/sionna/phy/fec/ldpc/codes/5G_bg1.csv",
    },
  ],
  cite: "KalKram, Minimum distances of 5G NR LDPC sub-codes, KK-R-0010, https://kalkram.com/research/5g-nr-ldpc-minimum-distances, 2026.",
  history: [
    {
      date: "2026-07-06",
      text: "Danilko, Mogilnykh and Tikhomolov post version 1 of [2].",
    },
    {
      date: "2026-11-15",
      text: "This account published.",
    },
  ],
};
