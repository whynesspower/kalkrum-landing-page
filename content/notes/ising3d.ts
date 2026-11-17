import type { Note } from "./types";

const FILES = "/files/ising-3d-density-of-states";

/**
 * Public sources: references [1] to [8] below, opened on 15 and 16 November 2026.
 *   Valani [3] (City Research Online, eprint 7793; PDF text): Section 1.2.5, Table 3.1, Section 3.1, Appendix B,
 *   Appendix E (Table E.1), closing remarks of Chapter 4. The thesis gives an address for its code; not opened.
 *   Kim [6] (arXiv:cond-mat/0205451v1; PDF text): Section II, equations 8 to 11, author line, reference list; arXiv
 *   abstract page for the journal reference.
 *   Bhanot [1], Creswick [2], Pearson [4], Bhanot and Sastry [7], Bhanot et al. [8]: OpenAlex records only (titles,
 *   authors, volumes, pages, abstracts where listed), not the papers; for [8] also the abstract on the Rutgers
 *   University Libraries record.
 *   OEIS A008551 [5]: JSON record (last revision shown 30 May 2026; page last modified 15 November 2026), the 26 listed
 *   terms.
 * Private records of the lab are not cited.
 */
export const ising3d: Note = {
  slug: "ising-3d-density-of-states",
  id: "KK-R-0016",
  kind: "note",
  type: "Measurement",
  title:
    "Our symmetry-reduced transfer-matrix program took 1.6 times as long as our engine to compute the periodic 4 × 4 × 4 Ising density of states exactly.",
  statement:
    "`Ω(b)`, the zero-field Ising density of states, counts ±1 assignments to 64 spins of the periodic 4 × 4 × 4 simple-cubic lattice with `b` bonds joining unequal spins. Our engine and our symmetry-reduced transfer-matrix program [1], [2], [3] agree on `Ω`; in one single-thread run each, the program took 72.8 s wall-clock, 1.6 times the engine’s user CPU time.",
  field: "Statistical physics",
  results: ["ising-3d"],
  published: "2026-11-15",
  evidence: "internal",
  header: {
    before:
      "Pearson [4] published the partition function of this lattice in 1982, and OEIS A008551 [5] lists `Ω(b)` for even `b ≤ 50` (read 15 November 2026). We compare with our own implementation of the method of [1] and [2], the baseline below.",
    evidence:
      "The engine and a plain transfer matrix, written in the same project and sharing no code, each computed the 4 × 4 × 4 table; the engine alone computed the 5 × 5 × 4 table. No one outside the lab has reviewed any of it.",
    check:
      "One half: the table. Run the script in [How to check it](#how-to-check-it) on the two files below (Python 3, no packages, under a second). The timings cannot be rerun, because neither the engine nor the baseline is released.",
    notEstablished:
      "That the engine is faster than the published method. The baseline, our own, reuses part of the engine’s source; each ran once, on one lattice, with different timers, under load.",
    method: "Not published.",
  },
  sections: [
    {
      title: "What was known",
      blocks: [
        {
          p: "The microcanonical transfer matrix [1], [2] counts configurations by energy one layer at a time; Kim [6] gives it for periodic layers with free ends and Valani [3] reduces layer states to symmetry classes. Valani’s Table 3.1 of maximal figure sizes lists the periodic 4 × 4 × 4 and 4 × 4 × 10, the 4 × 5 × 5 of Bhanot and Sastry [7] with one open direction, and no fully periodic lattice with a side of 5. Bhanot et al. [8] approximated the partition function of the 5 × 5 × 5 lattice in 1987 (abstract read 16 November 2026).",
        },
      ],
    },
    {
      title: "The result",
      blocks: [
        {
          p: "The baseline, our symmetry-reduced program, implements [1], [2] in the form of [6], closed periodically by summing over the starting layer, cache-blocked, with one starting layer per class of layer configurations under translations, square symmetries and global spin flip, weighted by class size [3].",
        },
        {
          table: {
            head: ["Program", "Timer", "Time (s)"],
            rows: [
              [
                "Plain transfer matrix [1], [2], [6]: all 32,768 starting layers (the `2^{16}` layer states with the global flip fixed), 12 threads",
                "user CPU",
                "18,120",
              ],
              ["Plain, 4 starting layers, 1 thread, scaled to 32,768", "wall-clock", "9,511"],
              ["Cache-blocked, the same 4 layers, scaled", "wall-clock", "5,622"],
              ["Cache-blocked, one starting layer per class, 1 thread", "wall-clock", "72.8"],
            ],
            caption:
              "Single runs; rows 2 and 3 are projections from 4 of 32,768 starting layers. The engine’s time is not published.",
            numeric: [2],
          },
        },
        {
          p: "Conditions: one x86-64 virtual machine with AVX-512 (model and core count not recorded). The 1-minute load average before and after each block of runs was 29.6 and 25.2 for the baseline, 31.4 and 40.0 for the engine; the 12-thread run has no record. The baseline’s timer covers its transfer loop, excluding set-up; the engine’s covers its process, excluding an untimed post-processing step.",
        },
        {
          code: "  b  Ω(b)\n  0  2\n  6  128\n 10  384\n 12  3648\n 14  1920\n 16  20448\n...\n 96  2158800489098126488\n...\n186  128\n192  2",
          caption:
            "Levels of omega_4x4x4_periodic.txt: 91 levels with Ω > 0, b even from 0 to 192, maximum at b = 96. Levels with Ω = 0 are not listed.",
        },
        {
          p: "The engine also computed the density of states of the fully periodic 5 × 5 × 4 lattice (100 spins); it passes the five checks below that apply.",
        },
      ],
    },
    {
      title: "How to check it",
      blocks: [
        {
          p: "Put both files and check.py in one folder and run python3 check.py.",
        },
        {
          code: 'OEIS = [2, 0, 0, 128, 0, 384, 3648, 1920, 20448, 71680, 125952, 537600, 1445440, 3756288, 11173440, 29955072,\n        79741908, 214759680, 564284736, 1466972160, 3794966880, 9719376896, 24675685440, 62292331392,\n        156254486400, 389861188608]  # OEIS A008551: entry n is the number of configurations with b = 2n\n\ndef check(path, N, B, F4, bipartite):\n    om = {int(a): int(c) for a, c in (line.split() for line in open(path))}\n    m = lambda k: sum(w * (B - 2 * b) ** k for b, w in om.items())  # sum of E^k over all configurations, E = B - 2b\n    ok = {"sum": sum(om.values()) == 2**N, "m1": m(1) == 0, "m2": m(2) == 2**N * B,\n          "m4": m(4) == 2**N * (3 * B * B - 2 * B + 24 * F4),\n          "levels": [om[b] for b in (0, 6, 10, 12, 14)] == [2, 2 * N, 6 * N, N * (N - 7), 30 * N]}\n    if bipartite:\n        ok["symmetry"] = all(om.get(B - b) == w for b, w in om.items())\n        ok["A008551"] = all(om.get(2 * n, 0) == v for n, v in enumerate(OEIS))\n    print(f"{path}: {len(om)} levels, {sum(ok.values())} of {len(ok)} checks pass", *[k for k in ok if not ok[k]])\n\ncheck("omega_4x4x4_periodic.txt", N=64, B=192, F4=240, bipartite=True)\ncheck("omega_5x5x4_periodic.txt", N=100, B=300, F4=325, bipartite=False)',
          caption:
            "check.py. N spins, B bonds, F4, the number of 4-cycles. Levels 0, 6, 10, 12, 14: ground state, one flipped spin, two adjacent, two non-adjacent, three in a path, each with global flip. Symmetry: the 4 × 4 × 4 lattice is bipartite.",
        },
        {
          code: "omega_4x4x4_periodic.txt: 91 levels, 7 of 7 checks pass\nomega_5x5x4_periodic.txt: 128 levels, 5 of 5 checks pass",
          caption: "Output with Python 3.15.0 on an Apple M4, 0.02 s.",
        },
        {
          p: "The checks cover the sum, three moments and the lowest levels, not individual bulk entries. Levels 0 to 50 are also in [5] and 142 to 192 follow by symmetry. A failed check, or a computation that contradicts an entry, would refute the table.",
        },
      ],
    },
    {
      title: "Limits",
      blocks: [
        {
          list: [
            "The comparison. The baseline, our own program, reuses part of the engine’s source; each program ran once, on one lattice, under load. Repeated runs on a named CPU, a second lattice and an implementation by others would close it. Valani [3] offers code, which we did not run.",
            "The timers differ. In the 12-thread plain run, 18,120 s of user time corresponded to 24,088 thread-seconds of wall-clock; the same factor on the baseline would give a ratio near 1.2, but for one thread it is unknown. User CPU time for both programs would close it.",
            "Levels 52 to 140 of the 4 × 4 × 4 table rest on the moment checks and on our plain transfer matrix, which gave a table identical to the engine’s; we have not compared them with [4]. A comparison with [4] or a computation by others would close it.",
            "The 5 × 5 × 4 table rests on the engine and the checks alone. On a different lattice, 5 × 5 × 10 with open ends, the engine’s polynomial equals the 621 coefficients of Table E.1 in [3]. A computation by others would close it.",
          ],
        },
      ],
    },
  ],
  files: [
    {
      label: "omega_4x4x4_periodic.txt",
      href: `${FILES}/omega_4x4x4_periodic.txt`,
      detail: "b and Ω(b), periodic 4 × 4 × 4 lattice, one level per line, 91 levels",
    },
    {
      label: "omega_5x5x4_periodic.txt",
      href: `${FILES}/omega_5x5x4_periodic.txt`,
      detail: "b and Ω(b), periodic 5 × 5 × 4 lattice, 128 levels",
    },
  ],
  refs: [
    {
      text: "G. Bhanot, A numerical method to compute exactly the partition function with application to Z(n) theories in two dimensions, J. Stat. Phys. 60, 55–75 (1990).",
      href: "https://doi.org/10.1007/BF01013669",
    },
    {
      text: "R. J. Creswick, Transfer matrix for the restricted canonical and microcanonical ensembles, Phys. Rev. E 52, R5735–R5738 (1995).",
      href: "https://doi.org/10.1103/PhysRevE.52.R5735",
    },
    {
      text: "Y. P. Valani, On the partition function for the three-dimensional Ising model, PhD thesis, City University London, August 2011 (unpublished; City Research Online).",
      href: "https://openaccess.city.ac.uk/id/eprint/7793/",
    },
    {
      text: "R. B. Pearson, Partition function of the Ising model on the periodic 4×4×4 lattice, Phys. Rev. B 26, 6285–6290 (1982).",
      href: "https://doi.org/10.1103/PhysRevB.26.6285",
    },
    {
      text: "OEIS A008551 (M. Karliner, 1996): number of times the n-th energy state appears in the statistical sum of the Ising model on a 4 × 4 × 4 cube; read 15 November 2026.",
      href: "https://oeis.org/A008551",
    },
    {
      text: "S.-Y. Kim, Partition function zeros of the Q-state Potts model on the simple-cubic lattice, Nucl. Phys. B 637, 409–426 (2002), arXiv:cond-mat/0205451.",
      href: "https://arxiv.org/abs/cond-mat/0205451",
    },
    {
      text: "G. Bhanot, S. Sastry, Solving the Ising model exactly on a 5×5×4 lattice using the Connection Machine, J. Stat. Phys. 60, 333–346 (1990).",
      href: "https://doi.org/10.1007/BF01314924",
    },
    {
      text: "G. Bhanot, S. Black, P. Carter, R. Salvador, A new method for the partition function of discrete systems with application to the 3D Ising model, Phys. Lett. B 183, 331–336 (1987).",
      href: "https://doi.org/10.1016/0370-2693(87)90973-7",
    },
  ],
  cite: "KalKram, The 4 × 4 × 4 Ising density of states: a timing record, KK-R-0016, https://kalkram.com/research/ising-3d-density-of-states, 2026.",
  history: [{ date: "2026-11-15", text: "This account published." }],
};
