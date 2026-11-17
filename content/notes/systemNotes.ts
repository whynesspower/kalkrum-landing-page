import type { Note } from "./types";

/**
 * Sources used, all opened on 15 November 2026.
 *
 * Public:
 * Rice, The algorithm selection problem (Advances in Computers 15, 1976): Crossref record.
 * Xu, Hutter, Hoos, Leyton-Brown, SATzilla (JAIR 32, 2008): Crossref record.
 * McConnell, Mehlhorn, Näher, Schweitzer, Certifying algorithms (Computer Science Review 5, 2011): Crossref record.
 * Bright, Kotsireas, Ganesh, arXiv:1804.01172 (3 April 2018; version 2, 14 May 2019): abstract page; Crossref record.
 * Lisoněk, Trummer, An extension of the Brouwer-Zimmermann minimum weight algorithm (Springer, 2015): author page, Crossref.
 * Booker, arXiv:1903.04284 (11 March 2019): full text (search bound, 23 core-years).
 * Booker, Sutherland, arXiv:2007.01209 (PNAS 118(11), 2021): full text, Section 5.2 (3,145 core-days; 25 times faster).
 * Kissat release 4.0.4 and OR-Tools release v9.15: GitHub release records (16 October 2025; 12 January 2026).
 *
 * Private: the lab's design, audit, benchmark, acceptance, prevalence, timing and pilot records, read on 15 November 2026;
 * nothing from them is cited as a public source.
 */
export const systemNotes: Note = {
  slug: "solver-compiler-and-factory",
  id: "KK-R-0018",
  kind: "note",
  type: "Measurement",
  title:
    "The lab’s solver system gave the right class for 5 of 8 blind in-class models and fired on none of 3 negatives.",
  statement:
    "From a model file (pseudo-Boolean, CP-SAT or MPS) the system tests whether the model lies in one of five classes declared in advance, configures a prebuilt solver (heuristic for one class) and checks the answer on the original model. For each of two problems the lab had not attempted before, a solver agreed with a checker written first.",
  field: "The system",
  results: ["solver-compiler", "solver-factory"],
  published: "2026-11-15",
  evidence: "internal",
  header: {
    before:
      "Algorithm selection by instance form [1], [2] and checkable witnesses with each answer [3] are established. Williamson matrices of every order divisible by 3 below 70 were enumerated with a SAT solver and computer algebra [4]. We claim no priority (sources read 15 November 2026).",
    evidence:
      "One program of ours made the blind models and key, another the detector; both used the lab’s benchmark format. The models’ author had read design notes on earlier detection failures, not the detector. One program of ours wrote each checker-first problem’s checker, solver and comparison program from one specification. No review outside the lab.",
    check:
      "Not yet. Detector, solvers, encoders and raw timings are unreleased. Run Kissat 4.0.4 and CP-SAT 9.15 (1 to 4 threads, caps of 300 to 900 s) on your encodings of the specifications under The result; rows will not reproduce exactly.",
    notEstablished:
      "Generality. Class recognition is tested on 8 in-class models written for the declared classes, the checker-first routine on two problems one step from published methods; neither extends beyond them.",
    method: "Not published.",
  },
  sections: [
    {
      title: "The result",
      blocks: [
        {
          label: "System",
          statement:
            "In a blind test, 5 of 8 in-class models received the right class and none of 3 negatives fired. On the lab’s encodings Kissat [5] and CP-SAT [6] found Williamson matrices of order 21 in 11 of 12 runs and of order 27 in none of 9 (caps of 600 to 900 s); Kissat found a Legendre pair of length 27 in 6 of 7 runs.",
        },
        {
          p: "Williamson matrices of order `n` are 4 symmetric circulant ±1 matrices `A, B, C, D` with `A^{2} + B^{2} + C^{2} + D^{2} = 4nI`; a Legendre pair of length `l` is 2 ±1 sequences of length `l` whose periodic autocorrelations sum to −2 at every nonzero shift.",
        },
        {
          table: {
            head: ["Run", "Right class (of 8)", "Wrong class", "False fires (of 3)"],
            rows: [
              ["1. Registered: key committed by hash and detector frozen before scoring", "5", "1", "0"],
              ["2. Looser rule, frozen detector, not registered", "6", "1", "1"],
              ["3. Same models, after changes made once run 1 was scored", "6", "0", "0"],
              ["4. Looser rule, after the changes, not registered", "8", "0", "1"],
            ],
            numeric: [1, 2, 3],
            caption:
              "Twelve models: 8 in class, 3 negatives (outside every class), 1 special case that is not scored. Pseudo-Boolean renderings. For 5 of 8 the 95% Wilson interval is 31 to 86%; for 0 of 3 the one-sided 95% upper limit is 63%.",
          },
        },
        {
          code: "Williamson, order n (odd): x_0..x_3 in {+1, -1}^n, each symmetric (x[i] = x[n-i]), x[0] = +1.\n  For s = 1..(n-1)/2:  sum over X and i of x_X[i] * x_X[(i+s) mod n] = 0.\nLegendre pair, length l (odd): a, b in {+1, -1}^l.\n  For s = 1..(l-1)/2:  sum_i a[i]*a[(i+s) mod l] + sum_i b[i]*b[(i+s) mod l] = -2.\n  Raw arm: a[0] = b[0] = +1.  Row-sum arm: sum_i a[i] = sum_i b[i] = +1 instead.",
          caption:
            "Baseline specifications (x[0] = +1 fixes each matrix’s sign). Each shift condition is a cardinality constraint over XORs of pairs of variables: a totalizer (Williamson encoding 1) or binary adder (Williamson encoding 2, Legendre) for Kissat, a linear equality for CP-SAT.",
        },
        {
          table: {
            head: ["Instance", "Kissat 4.0.4", "CP-SAT 9.15, 1 worker", "CP-SAT 9.15, 4 workers"],
            rows: [
              ["Williamson order 21, encoding 1", "81, 126, 152", "49, 416, none in 600", "25"],
              [
                "Williamson order 27, encoding 1",
                "none in 600 (3 runs)",
                "none in 600 (3 runs)",
                "none in 600 (1 run)",
              ],
              ["Williamson order 21, encoding 2", "12, 25, 45", "119, 256", "–"],
              ["Williamson order 27, encoding 2", "none in 900 (1 run)", "none in 600 (1 run)", "–"],
              ["Legendre pair length 27, raw arm", "1, 184, 193, 435", "not run", "–"],
              ["Legendre pair length 27, row-sum arm", "44, 127, none in 300", "not run", "–"],
            ],
            caption:
              "Seconds to first solution checked against the specification; none = no solution within the cap. On a shared 32-vCPU virtual machine (Xeon 8375C), load 22 to 34; 1 thread unless stated. CP-SAT, Legendre length 25: none in 3 of 3 runs per arm (300 s).",
          },
        },
        {
          p: "On exhaustive Williamson enumeration at orders 33 to 57 the prebuilt solver took 0.47 to 1.10 times as long as the lab’s hand-built program, as reported.",
        },
        {
          table: {
            head: ["Order", "Solver time / hand-built time, as reported", "Recomputed from retained raw timings"],
            rows: [
              ["33", "0.55", "0.55 (0.64 for the other repeat)"],
              ["45", "0.47", "0.60 (0.69 for the other repeat)"],
              ["51", "1.10", "not retained"],
              ["57", "1.01", "not retained"],
            ],
            numeric: [0, 1, 2],
            caption:
              "Solver time over hand-built program time: exhaustive enumeration, 1 thread, minimum over repeats. Recomputed: retained solver timings over reported hand-built times; may mix machines. Hand-built times at orders 45, 51 and 57 are 1.5 to 1.7 times larger in a second run.",
          },
        },
        {
          label: "Checker first",
          statement:
            "Each solver was written after its checker and agreed with it 4 min 46 s (binary linear code bounds) and 5 min 55 s (sums of three cubes) after its clock started. Both re-implement published methods (Brouwer–Zimmermann [7]; Booker [8]).",
        },
        {
          table: {
            head: [
              "Problem",
              "Agreement after clock start",
              "After start of work on both",
              "Checker controls",
              "Solver agrees with checker on",
            ],
            rows: [
              [
                "Binary linear code bounds: minimum distance of quasi-cyclic codes",
                "4 min 46 s",
                "9 min 55 s",
                "7 known codes accepted; 6 planted errors rejected",
                "300 of 300 random binary quasi-cyclic codes (checker scope `min(k, n − k) ≤ 34`)",
              ],
              [
                "Sums of three cubes: all solutions in a box",
                "5 min 55 s",
                "21 min 38 s",
                "4 known representations accepted; planted errors rejected",
                "101 of 101 boxes (`k ≤ 130`; 407 solutions)",
              ],
            ],
            nowrap: [1, 2],
            caption:
              "Clock readings were written by the program as events happened. Clocks start at ‘selection done’ and ‘start’; the log has no selection entry for the second problem. A box is all solutions for one `k` with `min(|x|, |y|, |z|) ≤ Z`, for a stated `Z`.",
          },
        },
      ],
    },
    {
      title: "Limits",
      blocks: [
        {
          list: [
            "Generality. Class recognition is tested on 8 in-class models written for the declared classes, the checker-first routine on two problems one step from published methods; neither extends beyond them. A fresh set from several authors would close the first.",
            "Public collections. A scan for structure a prebuilt solver can use found none in the main view of 1,059 MIPLIB 2017 instances; a slack-reduced view found it in 2 (5 under a looser rule), all the scan’s own market-split positive controls; none in 1,560 MiniZinc Challenge instances.",
            "Formats. On the lab’s Legendre and Williamson models the scan was right on 10 of 10 pseudo-Boolean, 10 of 10 CP-SAT and 0 of 10 MPS renderings, and fired on one negative’s CP-SAT rendering in the second run.",
            "Orders. Every baseline and ratio row is at an order or length divisible by 3; other orders would close it.",
            "Evaluation. No result is reported for the pre-registered comparison against hardened general solvers on 4 sealed problem families.",
            "Baselines. Williamson encodings at orders 21 and 27 omit the implied row-sum equation; at order 19, adding it with a block ordering took CP-SAT from no solution in 3 configurations to 28, 31 and 50 s and Kissat from 2.7 to 15 s (1 run each, 60 s cap). No ratio to general solvers is claimed; strengthening would close it.",
            "Hand-built comparison. The ratios at orders 51 and 57 cannot be recomputed; a same-machine rerun would close it. Automatic solver generation is not shown.",
            "Selection. The lab chose both problems; the first lies in a domain it had worked (exact minimum distances of 5G NR LDPC codes).",
            "Competitiveness. Extrapolating a measured growth of about ×11 per decade from `10^{9}` to `10^{16}`, beyond its arithmetic limit near `5.5 × 10^{12}`, the cubes solver is estimated 12 to 24 times slower than Booker’s search for `k = 33` [8], which [9] reports as 3,145 core-days and its newer method as about 25 times faster to the first solution.",
            "Comparability. The comparison is not hardware-normalised; a same-machine run would close it.",
          ],
        },
      ],
    },
  ],
  refs: [
    {
      text: "J. R. Rice, The algorithm selection problem, Advances in Computers 15, 65–118 (1976).",
      href: "https://doi.org/10.1016/S0065-2458(08)60520-3",
    },
    {
      text: "L. Xu, F. Hutter, H. H. Hoos, K. Leyton-Brown, SATzilla: portfolio-based algorithm selection for SAT, Journal of Artificial Intelligence Research 32, 565–606 (2008).",
      href: "https://doi.org/10.1613/jair.2490",
    },
    {
      text: "R. M. McConnell, K. Mehlhorn, S. Näher, P. Schweitzer, Certifying algorithms, Computer Science Review 5, 119–161 (2011).",
      href: "https://doi.org/10.1016/j.cosrev.2010.09.009",
    },
    {
      text: "C. Bright, I. Kotsireas, V. Ganesh, Applying computer algebra systems with SAT solvers to the Williamson conjecture, Journal of Symbolic Computation 100, 187–209 (2020), arXiv:1804.01172 (3 April 2018; version 2, 14 May 2019).",
      href: "https://arxiv.org/abs/1804.01172",
    },
    {
      text: "A. Biere, Kissat SAT solver, release 4.0.4 (16 October 2025).",
      href: "https://github.com/arminbiere/kissat/releases/tag/rel-4.0.4",
    },
    {
      text: "Google OR-Tools (CP-SAT solver), release v9.15 (12 January 2026).",
      href: "https://github.com/google/or-tools/releases/tag/v9.15",
    },
    {
      text: "P. Lisoněk, L. Trummer, An extension of the Brouwer–Zimmermann minimum weight algorithm, in R. Pinto et al. (eds), Coding Theory and Applications, Springer, 2015, 255–262; the algorithm was invented by Brouwer and later extended by Zimmermann.",
      href: "https://www.cecm.sfu.ca/~plisonek/A40.html",
    },
    {
      text: "A. R. Booker, Cracking the problem with 33, arXiv:1903.04284 (11 March 2019).",
      href: "https://arxiv.org/abs/1903.04284",
    },
    {
      text: "A. R. Booker, A. V. Sutherland, On a question of Mordell, Proceedings of the National Academy of Sciences 118(11), e2022377118 (2021), arXiv:2007.01209.",
      href: "https://arxiv.org/abs/2007.01209",
    },
  ],
  cite: "KalKram, The solver system: class recognition, baselines and checker-first solvers, KK-R-0018, https://kalkram.com/research/solver-compiler-and-factory, 2026.",
  history: [{ date: "2026-11-15", text: "This account published." }],
};
