import type { Note } from "./types";

const FILES = "/files/metabolic-minimal-cut-sets";

/**
 * Public sources: references [1] to [9], opened on 15 or 16 November 2026. Depth of reading:
 *   [1] the BiGG model page and the JSON file served by BiGG (not hashed).
 *   [2] a summarised reading (WebFetch); the text does not say whether the biomass reaction was among the candidate
 *       deletions.
 *   [3] and [8] the first 100,000 characters, summarised (WebFetch). [7] abstract and results, summarised.
 *   [6] bibliographic details and abstract from the Imperial College repository record.
 *   [4] and [5] bibliographic details and abstracts from search results only.
 *   [9] bibliographic details from search results.
 * Private records of the lab are not cited.
 */
export const metabolicCutSets: Note = {
  slug: "metabolic-minimal-cut-sets",
  id: "KK-R-0014",
  kind: "note",
  type: "Measurement",
  title:
    "We enumerate minimal cut sets of the 95-reaction E. coli core network up to size 4, 87–215 times faster than our mixed-integer baseline in single runs.",
  statement:
    "A minimal cut set of e_coli_core [1] is an inclusion-minimal set of non-biomass reactions whose deletion leaves no flux `v` with `Sv=0` (stoichiometric matrix `S`), directions respected, biomass flux positive. The model has 17, 128, 351 and 747 of size at most 1, 2, 3 and 4; we list them 98, 215, 133 and 87 times faster than our baseline.",
  field: "Metabolic networks",
  results: ["metabolic-cut-sets"],
  published: "2026-11-15",
  evidence: "internal",
  header: {
    before:
      "Tobalina et al. (2016) [2], with the code of [3], enumerated this network's minimal cut sets for biomass, without medium or ATP-maintenance constraints: 18, 111, 223 and 396 of size 1 to 4 (read 16 November 2026). Ours: 17 at size 1, 18 with biomass.",
    evidence:
      "Our method and baseline returned the same sets at every size; they share the model-construction code, the HiGHS solver and the set-verifying routine. A third program of ours, written separately, reproduced sizes 1 to 3 with the same definition and solver. Sizes 2 to 4 also equal published counts [2]. No review outside the lab.",
    check:
      "Counts only. Run mcs_count.py with K = 3 on e_coli_core.json from BiGG: 52 to 122 s on an Apple M4; size 4 was not run. Times and ratios cannot be checked: neither our method nor the baseline code is released.",
    notEstablished:
      "That the ratios say anything about published tools or other networks: one network, one run per size, our own baseline, no published tool run on the same machine.",
    method: "Not published.",
  },
  sections: [
    {
      title: "What was known",
      blocks: [
        {
          p: "Klamt and Gilles (2004) [4] introduced minimal cut sets; Ballerstein et al. (2012) [5] showed that they are elementary modes (support-minimal steady-state fluxes) of a dual network derived with the Farkas lemma. MCSEnumerator (von Kamp and Klamt, 2014) [3] solves a mixed-integer linear programme (MILP) on that dual and listed all 2,486 cut sets of size 1 to 5 of the genome-scale model iAF1260 in about 430 hours on 12 threads. On this network, [2] listed 240,186 cut sets up to size 10 in 270 s with it. MCS2 (Miraskarshahi et al., 2019) [6] uses a nullspace-based dual; a MILP on it was on average 2.5 times faster than on the Farkas-based dual (Klamt, Mahadevan and von Kamp, 2020) [7]. The review [8] adds lazy-constraint MILPs excluding the supersets of each cut set found. We claim no priority for the method.",
        },
      ],
    },
    {
      title: "The result",
      blocks: [
        {
          table: {
            head: ["`K`", "Sets of size `K`", "Sets up to `K`", "Baseline (s)", "Ratio", "Load, method / baseline"],
            rows: [
              ["1", "17", "17", "2.13", "98", "21.3 / 21.8"],
              ["2", "111", "128", "96.3", "215", "21.6 / 30.4"],
              ["3", "223", "351", "608", "133", "21.7 / 30.1"],
              ["4", "396", "747", "2,848", "87", "21.9 / 29.1"],
            ],
            numeric: [0, 1, 2, 3, 4],
            nowrap: [5],
            caption:
              "Wall-clock seconds of single runs, 1 thread each, on a shared 32-vCPU Xeon 8375C virtual machine; Python 3.12.3. Load is the 1-minute load average. Ratio is baseline over method. The size 1 baseline run is of version 2 below and returned the same 17 sets.",
          },
        },
        {
          p: "Only each reaction’s direction is kept: the model’s flux bounds, including glucose uptake 10 and the ATP-maintenance lower bound 8.39, become 0 or ±`10^{4}`, with biomass flux at least 1 as normalisation. The directions fix the medium: only glucose, O₂, NH₄⁺, phosphate, CO₂, H₂O and H⁺ can be taken up.",
        },
        {
          p: "The baseline, written by us after [3], is a Farkas-dual MILP: one dual variable per metabolite, bounded by `10^{3}`; one binary per deletable reaction `j`, with big-M constant `M_{j} = 10^{3}Σ_{i}|S_{ij}| + 1`; the number of deletions is minimised. Each cut set is one solve, followed by a constraint excluding it and its supersets, until the optimum exceeds `K` or the programme is infeasible. The solver is HiGHS 1.15.1 [9].",
        },
        {
          p: "Baseline version 1 (dual bound `10^{2}`) returned 343 of the 351 sets of size at most 3. Version 2 (bound `10^{3}`, looser feasibility tolerances) returned a set failing an LP test at each `K` = 2, 3, 4. Version 3 (bound `10^{3}`, tolerances `10^{-9}`) returned our method’s sets at every size and is the baseline of the table.",
        },
      ],
    },
    {
      title: "How to check it",
      blocks: [
        {
          code: '"""Minimal cut sets of the BiGG model e_coli_core as a flux cone, by exhaustive level-wise enumeration.\nUsage: python3 mcs_count.py e_coli_core.json K     (needs numpy and scipy)"""\nimport hashlib, json, sys\nimport numpy as np\nfrom scipy.optimize import linprog\n\npath, K = sys.argv[1], int(sys.argv[2])\nmodel = json.load(open(path))\nrow = {m["id"]: i for i, m in enumerate(model["metabolites"])}\nR = model["reactions"]\nS = np.zeros((len(row), len(R)))\nfor j, r in enumerate(R):\n    for met, coef in r["metabolites"].items():\n        S[row[met], j] = coef\nbio = [j for j, r in enumerate(R) if r["id"].startswith("BIOMASS")][0]\nlo = [0 if r["lower_bound"] >= 0 else -1e4 for r in R]   # directions only: the model\'s own bounds become 0 or +-1e4\nhi = [0 if r["upper_bound"] <= 0 else 1e4 for r in R]\nlo[bio] = 1                                              # target: biomass flux positive, normalised to >= 1\nknock = [j for j in range(len(R)) if j != bio]           # the 94 reactions that may be deleted\n\ndef growth_survives(C):                                  # LP: steady-state flux with biomass >= 1 and C deleted\n    b = [(lo[j], hi[j]) for j in range(len(R))]\n    for i in C:\n        b[knock[i]] = (0, 0)\n    res = linprog(np.zeros(len(R)), A_eq=S, b_eq=np.zeros(len(S)), bounds=b, method="highs")\n    assert res.status in (0, 2)                          # 0 feasible, 2 infeasible\n    return res.status == 0\n\nlive, mcs = {()}, []            # live: sets of the previous size that contain no cut set\nfor k in range(1, K + 1):\n    nxt, tested = set(), 0\n    for N in live:\n        for i in range(N[-1] + 1 if N else 0, len(knock)):\n            C = N + (i,)\n            if all(C[:t] + C[t + 1:] in live for t in range(k)):   # all (k-1)-subsets keep growth\n                tested += 1\n                if growth_survives(C):\n                    nxt.add(C)\n                else:\n                    mcs.append(C)                        # blocks, and no proper subset does: minimal\n    live = nxt\n    masks = sorted(sum(1 << i for i in C) for C in mcs)       # fingerprint: bit i is the i-th deletable reaction\n    digest = hashlib.sha1(",".join(map(str, masks)).encode()).hexdigest()[:12]\n    print(f"size {k}: {sum(len(C) == k for C in mcs)} minimal cut sets, {len(mcs)} up to size {k}, "\n          f"{tested} LPs, fingerprint {digest}", flush=True)\n',
          caption:
            "mcs_count.py. Input: https://bigg.ucsd.edu/static/models/e_coli_core.json [1]; our copy has 173,441 bytes and SHA-256 7bedec10576cfe935b19218dc881f3fb14f890a1871448fc19a9b4ee15b448d8. If your file hashes differently, compare counts only: fingerprints depend on the order of reactions in the file.",
        },
        {
          code: "python3 mcs_count.py e_coli_core.json 3\nsize 1: 17 minimal cut sets, 17 up to size 1, 94 LPs, fingerprint 33c5bdbd0d36\nsize 2: 111 minimal cut sets, 128 up to size 2, 2926 LPs, fingerprint aaa0dc16c582\nsize 3: 223 minimal cut sets, 351 up to size 3, 65692 LPs, fingerprint fbd3cb101a52",
          caption:
            "Output on an Apple M4 with Python 3.15.0, NumPy 2.5.4 and SciPy 1.18.1: 52 s, 117 s and 122 s in three runs, the last two with other jobs running.",
        },
        {
          p: "Baseline version 3 (baseline_runs.tsv) and our method give these fingerprints at sizes 1 to 3 and 0f5a148e1537 at size 4, for which the script was not run: it should print 396 sets of size 4, 747 in all. With the same input file, a different count or fingerprint refutes the counts in the table.",
        },
      ],
    },
    {
      title: "Limits",
      blocks: [
        {
          list: [
            "Scope of the ratios. One network, one run per size, our own baseline, no published tool, CPLEX or Gurobi run on this machine. The baseline restarts a MILP per cut set, which the lazy-constraint MILPs of [8] avoid, so the ratios do not estimate the gain over published tools. A same-machine run of the code of [3] would close it.",
            "Load. The machine was shared at load average 21 to 30, the baseline at the higher load for sizes 2 to 4. A repeat of the baseline at sizes 1 to 3, at load 38, took 3.18, 95.4 and 584 s against 2.13, 96.3 and 608 s. Repeats on an idle machine would close it.",
            "Definition and arithmetic. The bound `10^{4}` was not varied. Each decision is a floating-point LP, and tolerance changed the sets of baseline version 2. Exact-arithmetic certificates for every decision would close it.",
          ],
        },
      ],
    },
  ],
  files: [
    {
      label: "mcs_count.py",
      href: `${FILES}/mcs_count.py`,
      detail: "the script printed under How to check it; needs Python 3, NumPy and SciPy",
    },
    {
      label: "baseline_runs.tsv",
      href: `${FILES}/baseline_runs.tsv`,
      detail:
        "the 13 recorded baseline runs: version, size, sets found, set fingerprint as in mcs_count.py, seconds, 1-minute load average, LP test of the returned sets, start time; includes the repeat at load 38",
    },
  ],
  refs: [
    {
      text: "BiGG Models, model e_coli_core: 95 reactions, 72 metabolites, 137 genes. J. D. Orth, R. M. T. Fleming, B. Ø. Palsson, Reconstruction and use of microbial metabolic networks: the core Escherichia coli metabolic model as an educational guide, EcoSal Plus 4(1) (2010), doi:10.1128/ecosalplus.10.2.1; Z. A. King et al., BiGG Models: a platform for integrating, standardizing and sharing genome-scale models, Nucleic Acids Research 44, D515–D522 (2016). Page read 15 November 2026.",
      href: "https://bigg.ucsd.edu/models/e_coli_core",
    },
    {
      text: "L. Tobalina, J. Pey, F. J. Planes, Direct calculation of minimal cut sets involving a specific reaction knock-out, Bioinformatics 32(13), 2001–2007 (2016).",
      href: "https://doi.org/10.1093/bioinformatics/btw072",
    },
    {
      text: "A. von Kamp, S. Klamt, Enumeration of smallest intervention strategies in genome-scale metabolic networks, PLoS Computational Biology 10(1), e1003378 (2014).",
      href: "https://doi.org/10.1371/journal.pcbi.1003378",
    },
    {
      text: "S. Klamt, E. D. Gilles, Minimal cut sets in biochemical reaction networks, Bioinformatics 20(2), 226–234 (2004).",
      href: "https://doi.org/10.1093/bioinformatics/btg395",
    },
    {
      text: "K. Ballerstein, A. von Kamp, S. Klamt, U.-U. Haus, Minimal cut sets in a metabolic network are elementary modes in a dual network, Bioinformatics 28(3), 381–387 (2012).",
      href: "https://doi.org/10.1093/bioinformatics/btr674",
    },
    {
      text: "R. Miraskarshahi, H. Zabeti, T. Stephen, L. Chindelevitch, MCS2: minimal coordinated supports for fast enumeration of minimal cut sets in metabolic networks, Bioinformatics 35(14), i615–i623 (2019).",
      href: "https://doi.org/10.1093/bioinformatics/btz393",
    },
    {
      text: "S. Klamt, R. Mahadevan, A. von Kamp, Speeding up the core algorithm for the dual calculation of minimal cut sets in large metabolic networks, BMC Bioinformatics 21, 510 (2020).",
      href: "https://doi.org/10.1186/s12859-020-03837-3",
    },
    {
      text: "S. Klamt, J. Zanghellini, A. von Kamp, Minimal cut sets in metabolic networks: from conceptual foundations to applications in metabolic engineering and biomedicine, Briefings in Bioinformatics 26(2), bbaf188 (2025).",
      href: "https://doi.org/10.1093/bib/bbaf188",
    },
    {
      text: "Q. Huangfu, J. A. J. Hall, Parallelizing the dual revised simplex method, Mathematical Programming Computation 10(1), 119–142 (2018): the reference of the HiGHS solver.",
      href: "https://doi.org/10.1007/s12532-017-0130-5",
    },
  ],
  cite: "KalKram, Minimal cut sets of the E. coli core network against a MILP baseline, KK-R-0014, https://kalkram.com/research/metabolic-minimal-cut-sets, 2026.",
  history: [{ date: "2026-11-15", text: "This account published." }],
};
