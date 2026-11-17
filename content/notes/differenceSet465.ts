import type { Note } from "./types";

/**
 * Public sources: references [1] to [10] and the files listed below.
 * Private records of the lab are not cited.
 */
const FILES = "/files/cyclic-difference-set-465";

export const differenceSet465: Note = {
  slug: "cyclic-difference-set-465",
  id: "KK-R-0004",
  kind: "paper",
  type: "Non-existence",
  title: "No cyclic `(465, 145, 45)` difference set exists, and so none exists in any abelian group of order 465.",
  statement:
    "A `(v, k, λ)` difference set in a group `G` of order `v` is a `k`-subset `D` of `G` in which every non-identity element is a quotient `d_{1}d_{2}^{−1}` with `d_{1}, d_{2} ∈ D` in exactly `λ` ways; `n = k − λ` is its order. The cyclic group `ℤ_{465}` contains no `(465, 145, 45)` difference set (`n = 100`). As 465 = 3 · 5 · 31 is squarefree, `ℤ_{465}` is the only abelian group of order 465.",
  field: "Combinatorial designs",
  results: ["cyclic-difference-set-465", "cyclic-difference-sets-next-three"],
  published: "2026-11-15",
  evidence: "certified",
  header: {
    before:
      "Listed as open in Baumert and Gordon [1] (2003), the La Jolla repository [2] (version 1.3 of 24 April 2026; update of 12 November 2026) and Gordon [3] (2026); looked up 15 November 2026. Franklin and Sam claimed it in a 2006 undergraduate report [4].",
    evidence:
      "Separately written programs of ours and a standard-library checker that we publish reproduce the counts exactly; they share the written reduction to the finite check. No one outside the lab has reviewed the result.",
    check:
      "One half: the finite computation and the completeness certificate. Regenerate one data file (script below), run python3 check.py (3.5 seconds in our run); expect ALL CHECKS PASSED. Not re-proved: the structure step, Theorem B and Lemma 3.5 of [5].",
    notEstablished:
      "That an outside expert would find the argument correct: no one outside the lab has reviewed it, and no machine-checked proof of the full result exists.",
    method: "Not published.",
  },
  sections: [
    {
      title: "What was known",
      blocks: [
        {
          p: "Baumert and Gordon [1] record that surveys by Baumert and by Vera López and García Sánchez [6] resolved the cyclic cases with `k ≤ 150` except 6, listed in their Table 1; they show non-existence for 4, and `(419, 133, 42)` and `(465, 145, 45)` remain open.",
        },
        {
          p: "A difference set `D` in `ℤ_{465}` has a contraction `D_{155}` counting its elements in each class modulo 155, with entries from 0 to 3. Theorem 4.1 of the field descent method of Leung and Schmidt [5], which rests on a multiplier lemma of Arasu and Ma [7], would describe `D` directly. A hypothesis fails for each of `p = 3, 5, 31`; for `p = 5` it is `gcd(ord_{93}(2), 4) = 1`, since `ord_{93}(2) = 10`.",
        },
        {
          p: "Franklin and Sam [4] claimed this case in a 2006 report. In its archived copy of 26 February 2007, Section 4.2 takes the part above 2 of the ideal of every order-31 character value to be (2), because that part alone would have to be principal, whereas only its product with the part above 5 must be. That leaves `±10ζ_{31}^{j}`, with `ζ_{31}` a primitive 31st root of unity, which none of the candidate contractions to `ℤ_{31}` (The result) comes from. We read the argument as treating no case that remains.",
        },
        {
          table: {
            head: ["Source", "Date", "Listed as"],
            nowrap: [1],
            rows: [
              ["López and García Sánchez [6], Table 1, p. 110", "1997", "? (existence unknown)"],
              ["Baumert and Gordon [1], Table 1", "30 April 2003", "Open"],
              ["La Jolla site, capture [8]", "25 May 2010", "OPEN"],
              ["La Jolla site, capture [8]", "20 December 2010", "NO, Franklin and Sam"],
              [
                "La Jolla repository [2], releases 1.0.0 to 1.3",
                "4 March 2024 to 24 April 2026",
                "Open, no comment; `(645, 161, 40)` and `(817, 289, 102)` listed as No, Franklin and Sam",
              ],
              ["Gordon [3]", "8 April 2026", "among the 4 smallest open cases; cites neither [4] nor [6]"],
              ["La Jolla repository [2], update", "12 November 2026", "Open, no comment"],
            ],
          },
        },
      ],
    },
    {
      title: "The result",
      blocks: [
        {
          list: [
            "Structure. Every non-trivial character `χ` of `ℤ_{465}` has `|χ(D)|^{2} = 100` [5] (Lemma 2.11). Write `ℤ_{155} = ⟨a⟩ × H` with `a` of order 5 and `H = ℤ_{31}`. Theorem B of [5] applies to `D_{155}` with `p = 5`: `25 ∤ F(155, 100) = 155` (`F`: [5], Definition 2.6), `ord_{5}(2) = 4 = p − 1` and `gcd(ord_{31}(2), 4) = 1`. Its branch `ℓ = 1` of (12), the Gauss-sum branch, would require 20 to be a square. With Lemma 3.5 it shows that, after a translation, `D_{155}` is determined by `b = D_{31} ∈ {0, …, 15}^{31}`, the contraction of `D` to `ℤ_{31}`, and that the vector `v = b − 5⌊b/4⌋` (not the group order) has `Σv = ±10` and `A_{0}(v) − A_{s}(v) = 100` for `s = 1, …, 30`, where `A_{s}(v) = Σ_{j} v_{j}v_{j+s}` (indices mod 31).",
            "The list. Let `L = {x ∈ ℤ[ζ_{31}] : x·conj(x) = 100}`, which has 45,198 elements in 729 orbits of 62 under multiplication by `±ζ_{31}^{j}`. A character of order 31 takes a value `x ∈ L` on `D`, and Fourier inversion gives `b_{j} = (145 + trace(xζ_{31}^{−j}))/31`. Integrality and `0 ≤ b_{j} ≤ 15` leave 21,328 vectors `b`, in 40 orbits under `j ↦ tj + s`.",
            "Completeness. In `ℚ(ζ_{31})` the prime 2 has 6 prime divisors and 5 has 10, each moved by complex conjugation, so `3^{8} = 6,561` ideals `I` satisfy `I·conj(I) = (100)`; solutions generating the same ideal differ by a root of unity (Kronecker). The list is complete if exactly 729 of the ideals are principal. A certificate with cubic residue symbols at 60 primes shows this, given that 3 does not divide the class number `h^{+}` of the real subfield of `ℚ(ζ_{31})`; `h^{+} = 1` (Masley [9]; [10], Theorem 1.1). An exhaustive exact enumeration of the nonzero `y` in each ideal with `trace(y·conj(y)) ≤ 3000`, which by the AM–GM inequality are the generators with `y·conj(y) = 100`, finds 62 in each of 729 ideals and none in 5,832; the published files do not reproduce it.",
            "The test. `Σb = 145` and `Σv = ±10` give `Σ⌊b/4⌋ ∈ {27, 31}`; 31 does not occur and 27 occurs for 2,170 vectors. None satisfies `A_{0}(v) − A_{s}(v) = 100` for all `s ≠ 0`: every `b` has a shift with `|A_{0}(v) − A_{s}(v) − 100| ≥ 20`, and the 2,170 have one with at least 45.",
          ],
        },
        {
          statement:
            "Vera López and García Sánchez state in 1997 [6] (Table 1, pp. 102 and 103), with the multiplier used, that no cyclic `(1561, 105, 7)`, `(2185, 105, 5)` or `(1111, 111, 11)` difference set exists. The La Jolla repository [2] (version 1.3 and the update of 12 November 2026) and Gordon [3] list all three as open.",
          label: "Table correction, not a new result",
        },
        {
          p: "None of the 3 is among the 6 cases left open by the surveys in [1]. A capture of the earlier La Jolla site of 24 May 2010 lists `(2185, 105, 5)` as NO (Lander, Theorem 4.19) and `(1111, 111, 11)` as NO (contracted multiplier test), and has no row for `(1561, 105, 7)` [8]. Separately written programs of ours re-derive each case (table).",
        },
        {
          table: {
            head: ["Parameters", "Entry in [6] (− : no difference set)", "Re-derivation (files below)"],
            rows: [
              [
                "`(1561, 105, 7)`",
                "−, w-multiplier `t = 2`",
                "Contraction to `ℤ_{223}`, entries in `[0, 7]`. Here 2 is a 223-multiplier ([1], Theorem 3.2: `n = 98 = 2·7^{2}`, and 2 lies in the subgroup generated by 7 modulo 223), so a translate is constant on the orbits of `x ↦ 2x`: the fixed point 0 and 6 orbits of size 37. So `b_{0} + 37S = 105`, with `S` the sum of the 6 orbit values and `0 ≤ b_{0} ≤ 7`, but `105 ≡ 31 (mod 37)`.",
              ],
              [
                "`(2185, 105, 5)`",
                "−, w-multiplier `t = 4`",
                "Contraction to `ℤ_{23}`. The prime 5 is inert in `ℚ(ζ_{23})`, as `ord_{23}(5) = 22`, so the order-23 character values are `5y` with `y·conj(y) = 4`, whose only solutions are `y = ±2ζ_{23}^{j}`. The contraction is then non-integral or has the entry `−5`. No multiplier is used.",
              ],
              [
                "`(1111, 111, 11)`",
                "−, multiplier `t = 5`, computer search",
                "The integer 5 is a multiplier (Second Multiplier Theorem, [1] Theorem 3.2 with `w = v`: `n = 100 > λ`, `gcd(n, v) = 1` and `5 ≡ 2^{24} (mod 1111)`) and `gcd(5 − 1, v) = 1`, so a translate of `D` is a union of orbits of `x ↦ 5x`: `{0}`, 2 orbits of size 5 and 44 of size 25. Since `111 = 1 + 5 + 5 + 4·25`, there are `C(44, 4) = 135,751` unions; none is a difference set.",
              ],
            ],
          },
        },
      ],
    },
    {
      title: "How to check it",
      blocks: [
        {
          p: "The checker reads data/S31.txt, the 21,328 candidates (1.3 MB, not published). This script rebuilds it from the 729 representatives.",
        },
        {
          code: "python3 - <<'EOF'\nimport hashlib\nreps = [tuple(map(int, l.split())) for l in open('data/L31_orbit_reps.txt')]\nfull = set()\nfor c in reps:\n    for k in range(31):\n        s = c[k:] + c[:k]\n        full.add(s)\n        full.add(tuple(-x for x in s))\nS = sorted(tuple(5 + y for y in c) for c in full if sum(c) == -10)\nS = [b for b in S if min(b) >= 0 and max(b) <= 15]\nwith open('data/S31.txt', 'w') as f:\n    f.write(''.join(' '.join(map(str, b)) + '\\n' for b in S))\nprint(len(reps), len(full), len(S), hashlib.sha256(open('data/S31.txt', 'rb').read()).hexdigest())\nEOF",
          caption:
            "Run in the folder that holds check.py. Prints the numbers of representatives, list elements and candidates, then the SHA-256 digest of data/S31.txt.",
        },
        {
          code: "729 45198 21328 d8847554f4c93355b00b3d6f23510e283f243a2a02d9ceb1bd2d5e7d021f37d7",
          caption: "Expected output of the script.",
        },
        { code: "python3 check.py" },
        {
          code: "Checker: no cyclic (465,145,45) difference set.  Python 3.15.0\n[1] arithmetic facts (Leung-Schmidt hypotheses, splitting of 2 and 5)\n  ord_5(2) = 4, ord_31(2) = 5, ord_31(5) = 3, ord_93(2) = 10, F(155,100) = 155, F(465,100) = 465\n[4] completeness of L_31(100), proof 1: Kummer certificate (needs only 3 does not divide h+(Q(zeta_31)))\n  => H = H', exactly 729 of the 6561 ideals with I conj(I) = (100) are principal; each is generated by a list element,\n     and any x with x conj(x) = 100 differs from that generator by a root of unity (Kronecker): the list is complete.\n[5] S_31 by Fourier inversion from L_31(100), compared with data/S31.txt\n  22599 integral lifts, 21328 in [0,15]^31\n[6] finite check: v = b - 5 floor(b/4) must satisfy A_0(v) - A_s(v) = 100 (s = 1..30)\n  survivors: 0 of 21328\n  min over b of max_s |A_0 - A_s - 100|: overall 20, on sum floor(b/4) = 27: 45\n  planted controls: 7812 perfect v in [-3,3]^31 (sum +-10); the test accepts 7812 of them\n[7] conclusion: L_31(100) complete; S_31 complete; no b in S_31 lifts; hence no contraction D_155 and no cyclic (465,145,45) difference set\ntotal 3.5 s, ALL CHECKS PASSED",
          caption:
            "Decisive lines of the output of check.py on one macOS machine; the full output is check.out. The exit status is 0 only if every check passes.",
        },
        {
          code: "python3 - <<'EOF'\nrows = lambda f: [tuple(map(int, l.split())) for l in open(f)]\nreps, S = rows('data/L31_orbit_reps.txt'), rows('data/S31.txt')\nconst = lambda c, m: len({x % m for x in c}) == 1\nprint(sum(const(c, 2) for c in reps), len(reps))\nprint(sum(const([x - 5 for x in b], 2) for b in S), sum(const([x - 5 for x in b], 10) for b in S), len(S))\nEOF",
          caption:
            "Counts for Franklin and Sam. An element x of ℤ[ζ₃₁] lies in m·ℤ[ζ₃₁] exactly when its coefficient vector is constant modulo m. The first line counts representatives with x in 2·ℤ[ζ₃₁]; the second counts candidates with x in 2·ℤ[ζ₃₁] and with x in 10·ℤ[ζ₃₁].",
        },
        {
          code: "81 729\n2480 0 21328",
          caption:
            "Output of the script. So 81 of the 729 ideals have the part above 2 equal to (2), and no candidate has x = ±10ζ₃₁ʲ.",
        },
        {
          code: "$ python3 ds3/ds1561.py\nsolutions of b0 + 37 S = 105 with 0 <= b0 <= 7: []  (105 mod 37 = 31 )\n$ python3 ds3/ds2185.py\ne = +1: a = 4.130434782608695 -> non-integral\ne = -1: a = 5.0 -> entry a+10e = -5 < 0\n$ python3 ds3/ds1111.py\ncandidates 135751 (C(44,4) = 135751 )  exact passes: 0  min max-deviation: 3.0",
          caption:
            "Last result lines of the three scripts for the table correction (0.02, 0.7 and 3.8 seconds); the full output is ds3/ds3.out. ds1111.py needs NumPy (1.26.4 with Python 3.11.14 here); the other two use the standard library.",
        },
        {
          p: "A pass verifies the finite statements for the data in the files. Non-existence then follows from Theorem B and Lemma 3.5 of [5] (hypotheses verified by the program, theorems not re-proved), Fourier inversion as in The list (not checked by the program), Kronecker’s theorem and `h^{+}(ℚ(ζ_{31})) = 1`.",
        },
        {
          p: "A `(465, 145, 45)` difference set in `ℤ_{465}` would refute the result. An `x ∈ ℤ[ζ_{31}]` with `x·conj(x) = 100` outside the 45,198 listed, a vector among the 21,328 that passes the test, or an error in Theorem B or Lemma 3.5 of [5] would invalidate the proof and leave the statement undecided.",
        },
      ],
    },
    {
      title: "What it changes",
      blocks: [
        {
          p: "Ryser’s conjecture [1] says that a non-trivial cyclic difference set has `gcd(v, n) = 1`; Lander’s conjecture ([5], Conjecture 1.1) says that a non-trivial difference set in an abelian group with a non-trivial cyclic Sylow `p`-subgroup has `p ∤ n`. Here `gcd(v, n) = 5` and the Sylow 5-subgroup is cyclic, so the result agrees with both and proves neither. In version 1.3 of the La Jolla repository this is the only open cyclic parameter set with `v ≤ 465`, `2 < k ≤ v/2` and `n > 1` (aux/lajolla_smallest.py). With [6], all 4 parameter sets that Gordon [3] calls the smallest open cases, this one and the 3 above, are decided.",
        },
      ],
    },
    {
      title: "Limits",
      blocks: [
        {
          list: [
            "Review and formalisation. No one outside the lab has reviewed the result and no machine-checked proof of the full result exists. A referee’s report or a formal proof would close it.",
            "The structure step. It rests on Theorem B and Lemma 3.5 of [5], read in the authors’ copy, and on Lemma 1 of [7], read only through [5]. Reading the journal text of [5] and [7] would close it.",
            "The enumeration. For a reader, completeness rests on the certificate and on `h^{+}(ℚ(ζ_{31})) = 1`, for which we cite Masley [9] (not opened by us) and Miller [10]. Publishing the enumeration’s data would close it.",
            "Priority. To our knowledge this is the first complete proof (literature search of 2 November 2026; [2] and the arXiv listing of [3] rechecked on 15 November 2026). We know of no journal publication of [4]. Not read: Tan’s 2008 project at Nanyang Technological University (full text restricted) and the abstract of the 2007 talk of Franklin and Sam.",
            "The gap in [4]. Our account rests on text extracted from one archived copy, in which ideal bars and formulas are partly lost; a later version of the report, if one exists, was not seen. The report also gives a route that assumes the multiplier conjecture (p. 20), which we do not assess.",
            "The 3 parameter sets. The 1997 paper prints the result and the multiplier used, not the argument. Our derivations for `(1561, 105, 7)` and `(1111, 111, 11)` rest on a multiplier theorem; the one for `(2185, 105, 5)` uses none. All lack review outside the lab. A multiplier-free derivation for `(1111, 111, 11)` and a review would close it.",
          ],
        },
      ],
    },
  ],
  files: [
    {
      label: "check.py",
      href: `${FILES}/check.py`,
      detail:
        "the checker: hypotheses of Theorem B, the solutions of x·conj(x) = 100 in ℤ[ζ₅] and ℤ[ζ₃₁], the completeness certificate, the candidates and the test, with controls",
    },
    {
      label: "check.out",
      href: `${FILES}/check.out`,
      detail: "the full output of check.py",
    },
    {
      label: "data/L31_orbit_reps.txt",
      href: `${FILES}/data/L31_orbit_reps.txt`,
      detail:
        "the 729 orbit representatives of the solutions of x·conj(x) = 100 in ℤ[ζ₃₁], one vector of 31 integers per line",
    },
    {
      label: "SHA256SUMS",
      href: `${FILES}/SHA256SUMS`,
      detail:
        "SHA-256 digests of check.py, data/L31_orbit_reps.txt, the two files in aux and the regenerated data/S31.txt; the checker reads it",
    },
    {
      label: "aux/lajolla_smallest.py",
      href: `${FILES}/aux/lajolla_smallest.py`,
      detail:
        "reads the version 1.3 archive of the La Jolla repository (Zenodo, reference 2) and lists the open cyclic parameter sets with v up to 465",
    },
    {
      label: "aux/lajolla_smallest.out",
      href: `${FILES}/aux/lajolla_smallest.out`,
      detail: "the recorded output of that script on version 1.3",
    },
    {
      label: "ds3/ds1561.py",
      href: `${FILES}/ds3/ds1561.py`,
      detail: "(1561, 105, 7): the level-223 argument",
    },
    {
      label: "ds3/ds2185.py",
      href: `${FILES}/ds3/ds2185.py`,
      detail: "(2185, 105, 5): the level-23 argument",
    },
    {
      label: "ds3/ds1111.py",
      href: `${FILES}/ds3/ds1111.py`,
      detail: "(1111, 111, 11): unions of orbits of the multiplier 5 (needs NumPy)",
    },
    {
      label: "ds3/ds3.out",
      href: `${FILES}/ds3/ds3.out`,
      detail: "the full output of the three scripts",
    },
  ],
  refs: [
    {
      text: "L. D. Baumert, D. M. Gordon, On the existence of cyclic difference sets with small parameters, Fields Inst. Commun. 41 (2004), arXiv:math/0304502v1 (30 April 2003).",
      href: "https://arxiv.org/abs/math/0304502",
    },
    {
      text: "D. M. Gordon, La Jolla Difference Sets Repository, version 1.3 (24 April 2026), doi:10.5281/zenodo.19740740; repository dmgordo/difference-sets on GitHub, state of 12 November 2026 (commit e936aab).",
      href: "https://doi.org/10.5281/zenodo.19740740",
    },
    {
      text: "D. M. Gordon, Cyclic relative difference sets and circulant weighing matrices, arXiv:2501.14924v2 (8 April 2026), Section 3.",
      href: "https://arxiv.org/abs/2501.14924",
    },
    {
      text: "B. Franklin, S. Sam, Nonexistence of some cyclic difference sets, NSF-REU report, Central Michigan University, 27 July 2006, 26 pages, advisor K. W. Smith. Wayback Machine captures of 19 September 2006 and 26 February 2007 of www.cst.cmich.edu/users/smith1kw/REU2006/FranklinSam.pdf; Section 4.2 was read as extracted from the copy of 26 February 2007.",
    },
    {
      text: "K. H. Leung, B. Schmidt, The field descent method, Des. Codes Cryptogr. 36 (2005) 171–188. Result, lemma and theorem numbers on this page are those of the authors’ copy, an earlier version than the journal text.",
      href: "https://personal.ntu.edu.sg/bernhard/Publications/pub/field.pdf",
    },
    {
      text: "A. Vera López, M. A. García Sánchez, On the existence of abelian difference sets with 100 < k ≤ 150, J. Combin. Math. Combin. Comput. 23 (1997) 97–112.",
      href: "https://combinatorialpress.com/article/jcmcc/Volume%20023/vol-23-paper%208.pdf",
    },
    {
      text: "K. T. Arasu, S. L. Ma, Abelian difference sets without self-conjugacy, Des. Codes Cryptogr. 15 (1998) 223–230, Lemma 1.",
    },
    {
      text: "Wayback Machine captures of the earlier La Jolla site, www.ccrwest.org/diffsets/diff_sets/: open.html of 25 May 2010 (timestamp 20100525194306) and 20 December 2010 (20101220081725), and lopez_and_sanchez.html of 24 May 2010 (20100524105836).",
      href: "https://web.archive.org/web/20101220081725/http://www.ccrwest.org/diffsets/diff_sets/open.html",
    },
    {
      text: "J. M. Masley, Class numbers of real cyclic number fields with small conductor, Compositio Math. 37 (1978) 297–319.",
    },
    {
      text: "J. C. Miller, Real cyclotomic fields of prime conductor and their class numbers, Math. Comp. 84 (2015) 2459–2469, arXiv:1407.2373.",
      href: "https://arxiv.org/abs/1407.2373",
    },
  ],
  cite: "KalKram, Non-existence of a cyclic (465, 145, 45) difference set, KK-R-0004, https://kalkram.com/research/cyclic-difference-set-465, 2026.",
  history: [
    {
      date: "2006-07-27",
      text: "Franklin and Sam date a report that claims non-existence of 6 parameter sets, this one among them [4].",
    },
    { date: "2026-11-15", text: "This account published." },
  ],
};
