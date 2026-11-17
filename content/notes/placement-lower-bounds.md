---
title: Certified wirelength lower bounds for the ISPD 2005 benchmarks
slug: placement-lower-bounds
kind: white-paper
field: Chip design
date: 2026-11-15
summary: In orientation N and without overlaps, every placement of the eight ISPD 2005 netlists has half-perimeter wirelength at least 0.338 to 0.604 of the lowest value printed in one 2025 preprint. A spreading term gives 0.556 and 0.448 on two designs. The optimum's distance from the bounds is unknown.
---

Every placement of the eight ISPD 2005 netlists with cells in orientation N and no overlaps has half-perimeter wirelength (HPWL) at least 0.338 to 0.604 of the lowest HPWL printed in [1]; if those values are HPWL of legal placements, they are at most 1.66 to 2.96 times the optimum. A spreading term gives 0.556 and 0.448 on adaptec1 and bigblue1. Flow and LP bounds that ignore overlap are classical [2, 3, 4]. Wang, Jariwala and Lillis [5] tightened LP bounds against overlap (abstract only), Reda and Chowdhary [6] bound net length by cell area, and Gupta and Sidiropoulos [7] give a spreading-metric LP with fixed points. We found no earlier certified bound on these netlists in the sources listed under Earlier and parallel work. The optimum's distance from our bounds is unknown.

## The question

A chip design is a netlist: cells joined by nets, each net listing its pins. A placement positions the cells, and shorter wire length reduces routing demand, delay and power. The usual proxy is HPWL, the sum over nets of the half-perimeter of the bounding box of the net's pins. In the ISPD 2005 contest [8, 9] a pin sits at its cell's lower-left corner plus half the cell size plus the offset in the netlist file, cells may not overlap, and rotation and mirroring were not allowed, so every cell is in orientation N [9]. On synthetic circuits with a planted optimum, placers were found 1.66 to 2.53 times optimal in the worst cases [10], later about 12 to 40 % above optimal [11]. For real netlists we know of no certified gap between a placer's result and the optimum; Kahng and Reda called placement lower bounds one of the least tackled issues in the field [12]. We ask for certified lower bounds on the HPWL of legal placements of the real netlists.

## What we found

Lengths are in site widths, the coordinate unit of the contest files. The model is orientation N, unit net weights and fixed pins at their file positions; movable objects, including the movable macros of bigblue3, are cells with pairwise disjoint interiors. Rows and fixed objects impose no constraint. A window is an interval of one axis, and Table 1 lists the number of equal windows per axis.

> **Theorem 1 (Window bound).** For each design of Table 1, every placement of the movable cells with pairwise disjoint interiors and orientation N has HPWL at least the bound listed. The part of the bound from cut windows holds for any real cell positions.

| Design | Windows | Bound ($10^6$ units) | Lowest HPWL in [1] | Table of [1] | Ratio |
|---|---|---|---|---|---|
| adaptec1 | 32 | 37.272 | 72,435,390 | VI | 0.514 |
| adaptec2 | 32 | 42.749 | 80,899,950 | VIII | 0.528 |
| adaptec3 | 16 | 96.521 | 190,019,200 | VIII | 0.507 |
| adaptec4 | 16 | 103.759 | 171,720,100 | VIII | 0.604 |
| bigblue1 | 32 | 30.125 | 89,046,700 | V | 0.338 |
| bigblue2 | 16 | 76.056 | 136,569,700 | V | 0.556 |
| bigblue3 | 12 | 138.454 | 297,296,900 | VIII | 0.465 |
| bigblue4 | 12 | 364.078 | 739,085,600 | VIII | 0.492 |
Table: Bounds and ratios are rounded down and factors up; the reference is the smallest HPWL printed for the design in Tables V to VIII of [1], after detailed placement, and Table VIII values are the best of 50 seeds.

The references are for the suite with fixed macros (Table III of [1]; its values are close to the fixed-macro values of RePlAce [13], not to its lower mixed-size ones). The smaller of the main columns of [1] and [13] would move each reference by at most 0.23 %. The bigblue1 value is printed with a change of −0.2 % although it is 0.26 % below its neighbour; [13] prints 89.05 × $10^6$, and the next lowest value in [1], 89,138,300, gives the ratio 0.337 and the same factor 2.96. [1] names neither an evaluator nor a legaliser.

Mirrored cells with file offsets break the orientation-N bound. The contest forbade mirroring and its script ignores orientation [9], so the orientation-N factors apply there. With all eight orientations the bounds are 0.306 to 0.581 of the same values, and the printed values at most 1.72 to 3.27 times the optimum.

> **Theorem 2 (Bound with spreading).** In orientation N, every placement with pairwise disjoint cell interiors has HPWL at least 40,290,483 on adaptec1 and 39,949,668 on bigblue1.

| Design | Windows and local bounds | With spreading | Placement with overlaps allowed |
|---|---|---|---|
| adaptec1 | 37,272,470 | 40,290,483 | 40,730,834.4 |
| bigblue1 | 30,125,295 | 39,949,668 | 31,838,691.5 |
Table: Bounds are rounded down; the last column is the HPWL, with true pin offsets, of one placement with overlaps allowed.

These are 0.556 and 0.448 of the references of Table 1, so under the same proviso the printed values are at most 1.80 and 2.23 times the optimum. On bigblue1 the bound is 25.5 % above the overlap-allowed value; on adaptec1 it is below, so we do not show that it sees legality. Neither overlap-allowed placement is converged.

> **Theorem 3 (Ceiling of the family).** The family is the certificates of Theorem 2. On four synthetic designs of 64 to 144 unit cells with zero pin offsets, 4 equal windows per axis and known legal placements of HPWL 341, 365, 813 and 3574, no certificate of the family exceeds 0.648 to 0.724 of that HPWL, itself an upper bound on the optimum.

The certificates we checked reach 0.960 to 0.992 of these ceilings, and 0.9999 on a fifth design that has no known legal placement.

## Why it is true

For reals, $\max-\min=\int\mathbf 1[\min<t<\max]\,dt$, so the horizontal extents of the nets sum to $\int N_x(t)\,dt$, with $N_x(t)$ the number of nets with pins on both sides of $x=t$. In a window, give each net $e$ an arc $\mathrm{IN}_e\to\mathrm{OUT}_e$ of capacity one, merge the pins of a cell, join a source to $\mathrm{IN}_e$ if $e$ has a fixed pin left of the window and $\mathrm{OUT}_e$ to a sink if it has one right of it. A flow of value $F$ gives $N^c_x(t)\ge F$ for every placement, overlapping or not, where $N^c_x$ counts nets with a cell centre or fixed pin on each side of $x=t$. Integrating over disjoint windows bounds the extent of the centres; the extent of the pins is smaller by at most the two largest per-cell offsets of the net.

Each net has weight one on its horizontal and on its vertical extent, shared by the window flows, its spreading load $\lambda_e$ (below) and per-net bounds on the rest (the fixed-pin box, the distance disjoint cells force, the area of the net's cells); the family of Theorem 3 is all such certificates.

For the spreading term let $p_v$ and $a_v$ be the centre and area of cell $v$. A tree record is a source cell $s$, a set $C$ of cells of area $A$ with a spanning tree through the nets, and a weight $\beta$. Positions telescope along tree paths, so $\sum_{v\in C}a_v|p_v-p_s|_1\le\sum_e\mathrm{sub}(e)\,\mathrm{HPWL}_e+\mathrm{loss}$, with $\mathrm{sub}(e)$ the area below net $e$ and $\mathrm{loss}$ the pin offsets. Disjoint interiors cap the density at one. For $0\le f\le1$ with $\int f=A$ and any point $q$, the bathtub principle (Theorem 1.14 of [14]) gives

$$
\int f(y)\,|y-q|_1\,dy\;\ge\;\Phi(A)=\frac{\sqrt2}{3}A^{3/2},
$$

with equality for the $\ell_1$ ball. So the record bounds $\beta\sum_e\mathrm{sub}(e)\,\mathrm{HPWL}_e$ below by $\beta(\Phi(A)-\mathrm{corr}-\mathrm{loss})$, with $\mathrm{corr}$ a correction for the size of the cells, and it loads net $e$ by $\beta\,\mathrm{sub}(e)$; $\lambda_e$ is the total load. The checker recomputes shortest-path trees from integer net lengths and tests capacities in exact integers.

The ceiling is weak duality. Take window prices $\mu$ on the nets and net lengths $\sigma$ such that every source-to-sink path of each window costs at least the window's width, and for every source cell and area $A$ the cheapest fractional set of cells of area $A$, charged its $\sigma$-distance from the source plus the size correction, costs at least $\Phi(A)$. Every certificate of the family then has value at most

$$
K_0+\sum_e\max(a_e+b_e,\;\ell_e,\;\sigma_e),
$$

where $K_0$ is the HPWL of nets without movable pins, $\ell_e$ the local bound of net $e$, and $a_e$, $b_e$ the larger of the fixed-pin extent of net $e$ in x, respectively y, and its window prices in that axis after the offset loss. The ceiling omits the offset loss of the spreading term.

## How it was checked

Theorems 1 to 3 are computer-assisted proofs. For Table 1, a second checker, written after reading the first, reproduced all 24 totals (8 designs, 3 orientation conventions) to a relative $10^{-9}$ from the raw files; its own pipeline met no violation against exhaustive search over 200 small instances. For Theorem 2, a checker written from the proofs, importing nothing from the code that produced the certificates, reproduced both totals and each of their five parts (horizontal and vertical windows, spreading, per-net residual, all-fixed nets). The standalone checker shipped with the certificates and a second independent checker written for an earlier bound, run by the authors, agree to seven digits. A separate pipeline met no violation against 58 random small designs, 40 with a proven optimum and 18 compared with the best placement found. Random small instances do not exercise the offset loss or the spreading term; these are tested on chains and unit meshes with known optimum, where removing the loss or doubling the spreading term gives a violation. For Theorem 3, an exact-arithmetic checker accepted the ceilings and rejected scaled-down ones, a brute force over all triples of source, cell set and spanning tree of 2,500 small designs found the spreading condition of the ceiling to hold for every tree (a weakened condition failed in 295 of 300 trials), and annealing over legal placements of two designs found nothing below 341 and 365. The benchmark files are byte-identical (SHA-256) to the contest archives [9]. The proofs have not been peer reviewed.

## What it does not show

The optimum's distance from the bounds is unknown. The cut-window part of Table 1, 91 to 97 % of each bound, does not use legality: the placements of Table 2 show that no bound that ignores legality exceeds 0.358 and 0.563 of the references on bigblue1 and adaptec1. Convergence in the number of windows is not shown, and the five designs with fewer than 32 windows gain much from more: from 8 windows per axis to the number in Table 1 the cut-window part grew by 1.19 to 1.77 times. Windows that reached the time limit carry a flow that is not maximum, which weakens the bound and never invalidates it; there are up to 8 per axis, for example 8 of 12 on one axis of bigblue4. Theorem 2 covers two designs, orientation N and unit weights; mixed-size variants of the contest are not covered. Theorem 3 limits only the family, on four small designs; that the family is nearly exhausted on adaptec1 and bigblue1 is not shown.

## Earlier and parallel work

Hur and Lillis [2] gave a max-flow algorithm for the HPWL optimum without legality of a hypergraph with fixed terminals, as Kennings and Markov [3] describe; we did not read [2]. The cut-integral identity is the level-set form of the Lovász extension of the hypergraph cut, whose value on pin coordinates is the HPWL form, the total variation of Hein et al. [4]. Wang, Jariwala and Lillis [5] observed that LP placement has excessive cell overlap, so that its HPWL is a valid but loose lower bound, and tested tightened formulations on PEKO and MCNC FPGA benchmarks; we read only the abstract, and cannot exclude overlap with the spreading term or Theorem 3.

Reda and Chowdhary [6] bound a net's length below by the area of the cells connected to it and use the bound to spread cells in an LP placer (we read their slides); our per-net area bound is of that kind, here in a shared budget with the other terms and checked in exact arithmetic. The spreading term follows the spreading-metric LPs of Even et al. [15], restricted to balls around single cells with the bathtub value as size function; Gupta and Sidiropoulos [7] study a strengthened such LP for placement with fixed points, with worst-case approximation and hardness results and no benchmark bound (we read the abstract). Charging each hop of a path to a net is the embedding technique of layout lower bounds [16] (we read the abstract), which we apply with pin offsets and hyperedges.

Planted-optimum circuits [10, 11] and zero-change netlist transformations [12] estimate placer suboptimality on constructed or transformed netlists; [11] is a 2007 book chapter posted in 2023. SimPL [17] reports lower-bound placements that are placer iterates, not bounds. We add certificates for the real netlists, checked from the raw files; the shared budget; and the ceiling. We found no earlier certified lower bound on the HPWL of an ISPD 2005 netlist in the sources we searched: arXiv, Zenodo, Crossref and web search to 2026-11-09, GitHub repository and code search on 2026-11-03, and web and GitHub repository searches repeated on 2026-11-15.

## References

1. Y. Ren, Y. Liu, Y. Zhou, Z. Zheng, L. Shang, F. Yang and Z. Wang, "Bridging the Initialization Gap: A Co-Optimization Framework for Mixed-Size Global Placement", arXiv:2511.10073 (2025). https://arxiv.org/abs/2511.10073
2. S.-W. Hur and J. Lillis, "Relaxation and clustering in a local search framework: application to linear placement", Proc. 36th Design Automation Conference, 360 (1999). https://doi.org/10.1145/309847.309958
3. A. Kennings and I. L. Markov, "Analytical minimization of half-perimeter wirelength", Proc. ASP-DAC 2000, 179 (2000). https://doi.org/10.1145/368434.368600
4. M. Hein, S. Setzer, L. Jost and S. S. Rangapuram, "The Total Variation on Hypergraphs - Learning on Hypergraphs Revisited", Advances in Neural Information Processing Systems 26 (2013), arXiv:1312.5179. https://arxiv.org/abs/1312.5179
5. Q. Wang, D. Jariwala and J. Lillis, "A study of tighter lower bounds in LP relaxation based placement", Proc. 15th ACM Great Lakes Symposium on VLSI, 498 (2005). https://doi.org/10.1145/1057661.1057780
6. S. Reda and A. Chowdhary, "Effective linear programming based placement methods", Proc. ISPD 2006, 186 (2006). https://doi.org/10.1145/1123008.1123049
7. A. Gupta and A. Sidiropoulos, "Minimum d-dimensional arrangement with fixed points", arXiv:1307.6627 (2013). https://arxiv.org/abs/1307.6627
8. G.-J. Nam, C. J. Alpert, P. Villarrubia, B. Winter and M. Yildiz, "The ISPD2005 placement contest and benchmark suite", Proc. ISPD 2005, 216 (2005). https://doi.org/10.1145/1055137.1055182
9. ISPD 2005 placement contest: benchmark archives, the evaluation script hpwl.pl and the organiser's announcements of 12 and 21 January 2005. https://www.ispd.cc/contests/05/contest.htm
10. C.-C. Chang, J. Cong and M. Xie, "Optimality and scalability study of existing placement algorithms", Proc. ASP-DAC 2003, 621 (2003); journal version with M. Romesis, IEEE Trans. Comput.-Aided Des. Integr. Circuits Syst. 23, 537 (2004). https://doi.org/10.1145/1119772.1119914
11. J. Cong, M. Romesis, J. R. Shinnerl, K. Sze and M. Xie, "Locality and Utilization in Placement Suboptimality", chapter 2 of G.-J. Nam and J. Cong (eds.), Modern Circuit Placement, Springer (2007); posted as arXiv:2305.16413 (2023). https://arxiv.org/abs/2305.16413
12. A. B. Kahng and S. Reda, "Zero-change netlist transformations: a new technique for placement benchmarking", IEEE Trans. Comput.-Aided Des. Integr. Circuits Syst. 25, 2806 (2006). https://doi.org/10.1109/TCAD.2006.882473
13. C.-K. Cheng, A. B. Kahng, I. Kang and L. Wang, "RePlAce: Advancing solution quality and routability validation in global placement", IEEE Trans. Comput.-Aided Des. Integr. Circuits Syst. 38, 1717 (2019). https://doi.org/10.1109/TCAD.2018.2859220
14. E. H. Lieb and M. Loss, "Analysis", 2nd ed., Graduate Studies in Mathematics 14, American Mathematical Society (2001). https://doi.org/10.1090/gsm/014
15. G. Even, J. Naor, S. Rao and B. Schieber, "Divide-and-conquer approximation algorithms via spreading metrics", J. ACM 47, 585 (2000). https://doi.org/10.1145/347476.347478
16. S. N. Bhatt and F. T. Leighton, "A framework for solving VLSI graph layout problems", J. Comput. Syst. Sci. 28, 300 (1984). https://doi.org/10.1016/0022-0000(84)90071-0
17. M.-C. Kim, D. Lee and I. L. Markov, "SimPL: An Effective Placement Algorithm", IEEE Trans. Comput.-Aided Des. Integr. Circuits Syst. 31, 50 (2012). https://doi.org/10.1109/TCAD.2011.2170567
