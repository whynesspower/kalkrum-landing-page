import type { Note } from "./types";

const FILES = "/files/cluster-expansion-ground-states";

/**
 * Public sources: references [1] to [4].
 * Private records of the lab are not cited.
 */
export const clusterExpansion: Note = {
  slug: "cluster-expansion-ground-states",
  id: "KK-R-0015",
  kind: "note",
  type: "Measurement",
  title:
    "We find exact ground states of 24 compact Ag–Pd pair-model cells with 8.5 to over 7,000 times less CPU time than Huang et al.’s cell solver.",
  statement:
    "The ground state of a periodic fcc supercell of `N` sites in the pair part of the icet Ag–Pd expansion [1] minimises `E(s) = Σ_{i<j} J_{ij} s_{i} s_{j} + a Σ_{i} s_{i}` over `s ∈ {0, 1}^{N}` (1 = Pd); `J_{ij}` sums the pair interaction over periodic images and `a` is the energy of one Pd in the all-Ag cell.",
  field: "Materials",
  results: ["cluster-expansion"],
  published: "2026-11-15",
  evidence: "internal",
  header: {
    before:
      "Huang et al. [2] (arXiv v1, read 15 November 2026) report one-core times for random pair models on binary 1D, 2D square and 3D cubic lattices, up to 50 sites (Figure 2), and “minutes to hours” for a 72-cluster sodium-vacancy expansion; none for this model.",
    evidence:
      "The solvers of [3], written by others, returned our minimum on 20 of the 24 cells, from our pair tables through our MAX-SAT encoding; on the other 4 they did not finish. Energies and timings are ours, and no one outside the lab has reviewed them.",
    check:
      "One half: the energies, as upper bounds. check.py (Python 3, no packages, under a second) evaluates our 24 ground-state configurations exactly; the ratios cannot be reproduced, since our solver is not released.",
    notEstablished:
      "That the ratios hold for cells and models we did not choose: the 41 named cells are our selection, and the model keeps pair terms only.",
    method: "Not published.",
  },
  sections: [
    {
      title: "What was known",
      blocks: [
        {
          p: "Huang et al. [2] describe their method as the first general algorithm to find the exact ground states of complex lattice models and guarantee their global optimality: MAX-SAT over periodic cells gives the upper bound, a convex programme the lower. We time their upper-bound stage and claim no priority. Their cell solver, CCLS2014 (C. Luo) then akmaxsat (A. Kuegel), is released in [3]. icet’s ground-state finder [4] solves fixed structures of such models by mixed-integer programming; we did not time it.",
        },
      ],
    },
    {
      title: "The result",
      blocks: [
        {
          p: "Model: the 25 pair orbits (symmetry classes of site pairs, up to 13.25 Å) of the icet Ag–Pd expansion [1]. Huang’s pipeline is the cell solver of [3] on our weighted partial MAX-SAT encoding of the cell, CCLS2014 time included. The ratio is its CPU time over that of our solver from the pair table to the exact minimum; generating the MAX-SAT file is not counted.",
        },
        {
          table: {
            head: ["Cells we chose", "Cells", "N", "Huang ÷ ours", "Median", "Note"],
            rows: [
              [
                "Compact (shortest periodic image at least 2 nearest-neighbour distances)",
                "24",
                "36–60",
                "8.5 to ≥ 7,028",
                "≈ 530",
                "19 of 24 at least 100; 4 lower bounds, Huang’s run stopped at its CPU cap of 3,600 or 5,400 s",
              ],
              [
                "Nearer image (shortest image 1 or √3)",
                "17",
                "40–60",
                "0.0038 to 37",
                "3.3",
                "ours slower on 7; on one (60 sites) our run did not finish, ratio ≤ 0.26",
              ],
              [
                "Example 2 of [3], triangular lattice: 6×6, 6×8, 7×7, 7×8",
                "4",
                "36–56",
                "0.23, 0.62, 0.063, ≤ 0.0072",
                "",
                "Huang’s pipeline faster in all four; on 7×8 our run did not finish",
              ],
            ],
            caption:
              "CPU-second ratios, single thread, one 64-vCPU virtual machine shared with other jobs; below 1, Huang’s pipeline is faster. Cells of rows 1 and 2 are index-N sublattices of the fcc lattice; the compact cells are inequivalent under the 48 operations of the cubic point group.",
            numeric: [1, 2, 3, 4],
            nowrap: [2, 3],
          },
        },
        {
          p: "The second table is a stratified random sample of inequivalent cells, six per shortest-image stratum, two strata compact. Huang + SB is Huang’s pipeline with symmetry-breaking clauses we added; where two solvers finished, minima agreed.",
        },
        {
          table: {
            head: [
              "N",
              "Sampled of inequivalent",
              "All cells: Huang ÷ ours",
              "All cells: Huang + SB ÷ ours",
              "Compact: Huang + SB ÷ ours",
              "Nearer image: Huang + SB ÷ ours",
            ],
            rows: [
              ["36", "24 of 268", "39 [18, 66]", "7.4 [4.3, 12]", "7.4 (2.8–49)", "2.6 (0.94–29); 1 of 12 below 1"],
              [
                "40",
                "24 of 286",
                "29 [18, 42] (Huang finished 17 of 24)",
                "27 [14, 40]",
                "17 (4.4–117)",
                "4.5 (0.28–31); 1 of 12 below 1",
              ],
              ["45", "24 of 218", "", "16 [8.5, 35]", "38 (5.2–198)", "4.0 (0.023–458); 5 of 12 below 1"],
              ["48", "24 of 496", "", "≥ 26 [11, 188]", "≥ 108 (7.9–1,470)", "9.3 (0.30–69); 1 of 12 below 1"],
              [
                "50",
                "24 of 280 (ours run on 18)",
                "",
                "≥ 6.7 [4.0, 11]",
                "≥ 130 (22–251)",
                "1.3 (0.064–16); 2 of 8 below 1",
              ],
            ],
            caption:
              "All cells: ratio of stratum-weighted estimates of total time over every inequivalent cell of that size, 95% bootstrap interval in brackets. Compact and nearer image: geometric mean of cell ratios, range in parentheses. Huang + SB capped at 900 s; ≥ marks lower bounds.",
            numeric: [0, 1],
          },
        },
      ],
    },
    {
      title: "How to check it",
      blocks: [
        {
          code: 'from itertools import combinations, product\n\ng = (3, 3, 4)\nJ = [0, 18864, -2180, 18864, 17150, 12375, 4210, 15263, 17150, 15263, 4210, 12375, 17150, 12375, 4210, 15263,\n     16889, 16501, 5270, 16951, 16589, 16482, -58, 16482, 17150, 15263, 4210, 12375, 16589, 16482, -58, 16482,\n     16889, 16951, 5270, 16501]\na = -150191\ns = "010101010101010101010101010100000101"\nidx = lambda c: (c[0] % 3 * 3 + c[1] % 3) * 4 + c[2] % 4\nocc = [c for c, b in zip(product(*map(range, g)), s) if b == "1"]\nprint(a * len(occ) + sum(J[idx((y[0] - x[0], y[1] - x[1], y[2] - x[2]))] for x, y in combinations(occ, 2)))',
          caption:
            "The 36-site cell, group Z3 × Z3 × Z4. J[d]: coupling, summed over periodic images, of sites whose difference has flat index d; a: point term; s marks 16 Pd sites. Output −1280756, the energy of s and the exact minimum, in 10^{−6} eV.",
        },
        {
          code: "3x3x4          N=36 Pd=16 E= -1280756  ok\n2x4x5          N=40 Pd=16 E= -1442902  ok\n...\n3x4x5          N=60 Pd=26 E= -2148122  ok\n24 of 24 energies reproduced",
          caption:
            "Output of python3 -I check.py on instances.json and ground_states.json, Python 3.15.0, Apple M4, under 0.1 s.",
        },
        {
          p: "A pass shows each energy is attained, an upper bound on the minimum. An exact solver for minimising `E` gives the lower bound by exhaustive computation. A lower configuration would refute an energy as the minimum; a higher exact minimum would show a fault in that solver or its encoding.",
        },
      ],
    },
    {
      title: "What it changes",
      blocks: [
        {
          p: "This is no frontier result: with symmetry-breaking clauses added to Huang’s pipeline the margin falls 4 to 5 times.",
        },
      ],
    },
    {
      title: "Limits",
      blocks: [
        {
          list: [
            "Selection. The 41 named cells are our choice, and 10 compact cells of 54 to 96 sites without a completed Huang run are omitted. Other sizes, lattices and expansions would close it.",
            "Pair truncation. At 20 to 36 sites the exact full-expansion minimum (Huang’s pipeline) lies 1.5 to 6.9 meV per atom below the full-expansion energy of a pair-model minimiser.",
            "Lower bounds. For 3 cells of 45 sites and 1 of 48 only our unreleased solver finished; a second exact solver would close it.",
            "Baseline. Our symmetry-breaking clauses were not tuned at 48 sites: another set ran two 48-site cells 25% and 40% faster in single runs, so ratios against Huang + SB are upper bounds for a tuned baseline.",
            "Solver configuration. At 50 sites a second configuration of our solver, run on all 24 sampled cells, gives 3.4 [1.7, 15] for Huang + SB ÷ ours over all cells, with Huang + SB at the cap on 4 cells and ours on 2.",
            "Timings. CCLS2014 ran 1 or 10 restarts (10 in [3]); 13 compact cells re-timed at 10 restarts changed by factors 0.87 to 1.27. Huang’s 3×4×4 time is from an earlier machine, within 1% of a rerun on ours; on the triangular cells Huang’s two timings are up to 1.7 times apart. Repeats on a named CPU would close these.",
            "Instances. Each pair table is icet’s energy of the supercell with parameters above order 2 zeroed, rounded to 10^{−6} eV, and was checked against icet on 8 random configurations; icet agreed within rounding on the lowest configurations of 69 other cells, not these 24.",
          ],
        },
      ],
    },
  ],
  files: [
    {
      label: "check.py",
      href: `${FILES}/check.py`,
      detail: "evaluates the 24 configurations in the exact integer model; Python 3, no packages",
    },
    {
      label: "instances.json",
      href: `${FILES}/instances.json`,
      detail:
        "the 24 compact-cell instances: pair table by difference index, point term, and the supercell matrix H (rows in primitive fcc vectors) where the cell is not a repeat of the primitive cell; cells named AxBxC repeat the primitive cell A, B and C times along its three vectors",
    },
    {
      label: "ground_states.json",
      href: `${FILES}/ground_states.json`,
      detail:
        "one ground-state configuration per cell with its energy and whether Huang’s pipeline returned the same minimum",
    },
  ],
  refs: [
    {
      text: "M. Ångqvist, W. A. Muñoz, J. M. Rahm, E. Fransson, C. Durniak, P. Rozyczko, T. H. Rod, P. Erhart, ICET – A Python library for constructing and sampling alloy cluster expansions, Adv. Theory Simul. 2, 1900015 (2019), doi:10.1002/adts.201900015. The expansion is mixing_energy.ce of the icet 4.0 examples; its cluster space (pair cutoff 13.5 Å, 25 pair parameters) is described in the tutorial “Constructing a cluster expansion”, https://icet.materialsmodeling.org/get_started/construct_cluster_expansion.html.",
      href: "https://doi.org/10.1002/adts.201900015",
    },
    {
      text: "W. Huang, D. A. Kitchaev, S. T. Dacek, Z. Rong, A. Urban, S. Cao, C. Luo, G. Ceder, Finding and proving the exact ground state of a generalized Ising model by convex optimization and MAX-SAT, Phys. Rev. B 94, 134424 (2016), arXiv:1604.06722v1 (22 April 2016).",
      href: "https://arxiv.org/abs/1604.06722",
    },
    {
      text: "maxsat-ising (GitHub dkitch/maxsat-ising), commit ef6fe68f73e23b6d5729786a77aa468c4250f9b8, MIT licence: CCLS2014, akmaxsat and example 2 (triangular lattice, pair terms).",
      href: "https://github.com/dkitch/maxsat-ising",
    },
    {
      text: "P. M. Larsen, K. W. Jacobsen, J. Schiøtz, Rich ground-state chemical ordering in nanoparticles: exact solution of a model for Ag–Au clusters, Phys. Rev. Lett. 120, 256101 (2018), arXiv:1712.07427; implemented in the GroundStateFinder of icet.",
      href: "https://arxiv.org/abs/1712.07427",
    },
  ],
  cite: "KalKram, Cluster-expansion ground states against the cell solver of Huang et al., KK-R-0015, https://kalkram.com/research/cluster-expansion-ground-states, 2026.",
  history: [{ date: "2026-11-15", text: "First published." }],
};
