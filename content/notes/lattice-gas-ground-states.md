---
title: Certified ground states of long-range lattice gases
slug: lattice-gas-ground-states
kind: white-paper
field: Long-range order
date: 2026-11-15
summary: On the triangular lattice, five crystals are ground states of long-range lattice gases among all configurations, at 82 potentials. The method also gives certified windows on three other lattices and, among periodic configurations, Na/vacancy orderings of an in-plane sodium cobaltate model.
---

The stripe, 2×2, anti-2×2, √3×√3 and honeycomb crystals, at fillings 1/2, 1/4, 3/4, 1/3 and 2/3, are ground states of long-range lattice gases on the triangular lattice among all configurations of the infinite lattice, for 56 power laws and 26 gate-screened Coulomb potentials. Earlier work searched unit cells of bounded size [1], enumerated small tori [2] or ran Monte Carlo [3]. The same method gives certified windows on three other lattices and, for periodic configurations, Na/vacancy orderings of an in-plane sodium cobaltate model. Numerical and diffraction work had found several of those states [4, 5, 6, 7]. For two of the crystals the Fourier criterion is classical [8, 9].

## The question

A lattice gas puts at most one particle on each lattice site and gives each pair an energy $V(r)$ that depends on the distance $r$. The filling $\nu$ is the fraction of occupied sites. The ground state at filling $\nu$ minimises the energy per site over all arrangements on the infinite lattice, not only those with a bounded repeat unit. Slowly decaying energies matter, such as gate-screened Coulomb repulsion in moiré bilayers, where ordered states are generalised Wigner crystals [2, 3], or van der Waals repulsion $r^{-6}$ between Rydberg atoms [4, 5]. The best earlier statements were minima over bounded cells [1], enumeration of a $6\times6$ torus [2] and Monte Carlo [3].

## What we found

A translation-invariant state is a probability measure on configurations invariant under lattice translations; a periodic configuration gives one by averaging over its translates. Its energy per site is $e=\tfrac12\sum_{r\neq0}V(r)\langle n_0n_r\rangle$, with $n_i\in\{0,1\}$ the occupation of site $i$ and $\langle n_0n_r\rangle$ the probability that sites $0$ and $r$ are both occupied. Let $e_0(\nu)$ be the least $e$ at filling $\nu$.

> **Proposition (Reduction).** Let $V$ be radial and absolutely summable, $n$ any configuration and $B_m$ boxes of $L_m\times L_m$ cells with $L_m\to\infty$ and filling tending to $\nu$. Then the energy of the pairs inside $B_m$, per site, has $\liminf\ge e_0(\nu)$. Periodic configurations of filling $\nu$ have energy per site at least $e_0(\nu)$.

> **Theorem 1 (Five crystals).** Let $V(r)=r^{-\alpha}$ with $\alpha\in\{2.5,2.6,\dots,8.0\}$, or $V(r)=\sum_{n\in\mathbb Z}(-1)^n(r^2+n^2d^2)^{-1/2}$ in units of $e^2/(4\pi\varepsilon\varepsilon_0a)$, with lattice constant $a$, electron charge $e$, vacuum permittivity $\varepsilon_0$ and relative permittivity $\varepsilon$, the energy of two charges midway between two gates a distance $d$ apart [2], with $r$ and $d$ in units of $a$, at $d$ equal to 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18 or 20. For each such $V$ the stripe ($\nu=1/2$), $2\times2$ ($1/4$), anti-$2\times2$ ($3/4$), $\sqrt3\times\sqrt3$ ($1/3$) and honeycomb ($2/3$) crystals have energy $e_0(\nu)$. Every translation-invariant state of that energy is a mixture of the symmetry images of the crystal: six stripe states, four each of $2\times2$ and anti-$2\times2$, three each of $\sqrt3\times\sqrt3$ and honeycomb.

The stripe occupies two of the four sublattices of a $2\times2$ cell, the $2\times2$ crystal one, the anti-$2\times2$ crystal three; the $\sqrt3\times\sqrt3$ crystal one of three sublattices, the honeycomb crystal two.

> **Theorem 2 (Antiferromagnetic Ising stripe).** For the triangular lattice, $H=J\sum_{i<j}V(r_{ij})\sigma_i\sigma_j$ with $J>0$, $\sigma_i=\pm1$, no field and $V=r^{-\alpha}$ at $\alpha=2.1,2.25,2.5,2.6,\dots,8.0,10,12$, the energy per site over translation-invariant states is least exactly at zero magnetisation, attained by the mixtures of the six stripe states.

On the other lattices lengths are in units of the nearest-neighbour distance, so $V(1)$ is the nearest-neighbour pair energy, and energies are per lattice site.

> **Result 3 (Windows).** For each row of the table, every configuration of the infinite lattice with filling $\nu$ has energy per site at least $\mathrm{LB}$, and the named state has energy at most $\mathrm{UB}$, in units of $V(1)$. The ten closed windows have width at most $3.5\times10^{-11}$.

| Lattice | $V$ | $\nu$ | State | $\mathrm{LB}$ | $\mathrm{UB}$ |
|---|---|---|---|---|---|
| square | $r^{-6}$ | 1/2 | checkerboard | 0.14559105046262 | 0.14559105048763 |
| square | $r^{-6}$ | 1/3 | 3-site cell | 0.049050428826433 | 0.049050428855972 |
| square | $r^{-6}$ | 1/4 | star | 0.0083966983103565 | 0.0083966983393147 |
| square | $r^{-6}$ | 1/5 | 5-site cell | 0.0037271308691687 | 0.0037271308924832 |
| honeycomb | $r^{-6}$ | 1/2 | one sublattice | 0.059035940271153 | 0.059035940303981 |
| kagome | $r^{-6}$ | 1/3 | nematic | 0.016603858183565 | 0.016603858210495 |
| square | $r^{-3}$ | 1/3 | 3-site cell | 0.31391384445262 | 0.31391384448512 |
| square | $r^{-3}$ | 1/4 | star | 0.13959995895506 | 0.13959995898022 |
| kagome | $r^{-3}$ | 1/3 | nematic | 0.22987866111795 | 0.22987866114407 |
| triangular | $r^{-6}$ | 2/7 | mixture | 0.023983350714286 | 0.023983350748493 |
| square | $r^{-6}$ | 1/8 | 8-site cell | 0.00052429586633809 | 0.00052479364620717 |
| square | $r^{-6}$ | 1/6 | 6-site cell | 0.0019947876878349 | 0.0019961237067555 |
Table: Window for the energy per site at filling $\nu$, rounded outward. UB is the energy of the named state, except in the triangular row, where it is that of a mixture of the 1/4 and 1/3 crystals with weights 4/7 and 3/7, which no periodic cell we searched (up to 42 sites) attains. The last two windows do not close, with widths $4.98\times10^{-7}$ and $1.34\times10^{-6}$.

State names follow the Rydberg-array literature, assigned by cell and density only. The seven-site state at $\nu=2/7$, the best single periodic state found, lies $1.38\times10^{-3}$ above the upper end and is not a ground state.

> **Result 4 (Na/vacancy ordering).** Na⁺ ions in one layer of Na$_x$CoO$_2$ sit on Na1 sites above Co ions and Na2 sites above the centres of Co triangles [6, 7], which together form a honeycomb with bond $a/\sqrt3$, $a$ the Co–Co distance. Nearest-neighbour Na1 and Na2 sites exclude each other, the ions repel by Coulomb energy with a neutralising uniform background, and each Na1 ion costs an extra energy $\Delta$. Among all periodic configurations at filling $x$ (Na per Co) and $\Delta=0$ the least energy lies in the window of the table, the named state has energy at most its upper end, and for $|\Delta|\le\Delta_{\max}$ it exceeds the least energy by at most the last column.

| $x$ | State | Window at $\Delta=0$ | $\Delta_{\max}$ | Distance from the least energy |
|---|---|---|---|---|
| 1/2 | stripe, one Na1 and one Na2 per four Co | $[-0.7321888917,\ -0.7321888897]$ | 0.04 | $\le1.88\times10^{-6}$ |
| 2/3 | six-cell state, two Na1 and two Na2 per six Co | $[-1.1227594559,\ -1.1227594535]$ | 0.026 | $\le2.23\times10^{-6}$ |
Table: Energy per Co, with $\Delta$ and the window in units of $e^2/(4\pi\varepsilon\varepsilon_0a)$; the window is rounded outward.

The last column comes from a safety margin of $10^{-5}$; at $\Delta=0$ the windows are about $2\times10^{-9}$ wide. In the intra-plane part of the model of Zhang et al. [7], bare Coulomb energies and $a=2.82$ Å give $\Delta=0.0255$ at the fitted value, inside both ranges and just inside the one for $x=2/3$.

### Further certificates

Four further sets of certificates use the same cluster dual and Fourier bound: [the charge gap of the $\sqrt3\times\sqrt3$ crystal](/research#sqrt3-charge-gap), [the $\sqrt7\times\sqrt7$ crystal](/research#sqrt7-crystal), [the fillings 2/5 and 2/7 with windows at 3/8, 3/7 and 1/5](/research#triangular-intermediate-fillings) and [single points of the fcc alloy gas with four neighbour shells](/research#fcc-v1-v4-certificates). Exact cluster duals without a Fourier bound [reproduce the ground-state diagram of the triangular gas with two neighbour shells and cover 82% to 100% of five slices with a third shell](/research#triangular-gas-phase-diagrams). Kaburagi and Kanamori and Dublenych solved those diagrams earlier [19, 20, 21, 22], and Garbulsky, Tepesch and Ceder partially solved the fcc problem [28]; ours are machine-checkable forms.

## Why it is true

Split $V=V_A+V_B$, with $V_A$ a finite sum over neighbour shells, $V_B$ absolutely summable and $\hat V_B$ its Fourier transform. The covariance $\langle n_0n_r\rangle-\nu^2$ of a translation-invariant state is positive definite, so it is the Fourier transform of a positive measure of mass $\nu(1-\nu)$, and $e\ge e_A+\tfrac12[\nu^2\hat V_B(0)+\nu(1-\nu)\min\hat V_B]$, $e_A$ being the energy of $V_A$. A dual-feasible vector on a finite cluster, checked on all $2^n$ patterns, bounds $e_A$; for the stripe, $2\times2$ and anti-$2\times2$ crystals, with $V_A=s\ge0$ times the nearest-neighbour term, it gives $e_A\ge s\max(0,3\nu-1,6\nu-3)$. A crystal attains both bounds when $\hat V_B$ is least on its Bragg points; if it is least only there, equality forces the measure onto them, which gives uniqueness.

With several sublattices the transform of $V_B$ is a matrix $\hat W_B(k)$. If $\hat W_B(k)-D$ is positive semidefinite for all $k$, with $D$ real symmetric, then the energy $e_B$ of $V_B$ obeys $e_B\ge\tfrac12[\sum_{s,t}\nu_s(\hat W_B(0)-D)_{st}\nu_t+\sum_{s,t}D_{st}\langle n_sn_t\rangle]$ for sublattice densities $\nu_s$ and cell correlations $\langle n_sn_t\rangle$; the last sum is local and enters the cluster bound.

For Result 4 the hard core removes the excluded patterns from the cluster dual, and the rank-one Coulomb pole at $k=0$ is absorbed by the neutralising background for periodic configurations only. The ranges of $\Delta$ follow from concavity of the least energy in $\Delta$ and from the exchange of the two sublattices, which maps $\Delta$ to $-\Delta$ for states with equal Na1 and Na2 densities: windows at $\Delta=0$ and $\Delta_{\max}$ for one state, with the dual interpolated, cover $[-\Delta_{\max},\Delta_{\max}]$. Certificates are linear in the couplings, so those at the extreme rays of a cone cover the cone.

## How it was checked

A short standalone program for each family checks every certificate behind the theorems and results above: the cluster dual in exact rational arithmetic on all patterns of the cluster (for Result 4, all patterns that respect the hard core) and the Fourier remainder over the whole Brillouin zone in ball arithmetic, an interval arithmetic.

Separately written code re-derived the lattice sums and energies of every certificate of Theorem 1 and re-proved the Fourier inequality, in double precision with an explicit error budget, for 66 of its 410 certificates. It re-proved the eight non-triangular $r^{-6}$ windows of the table and the triangular window with its own interval cover. For the three $r^{-3}$ windows it evaluated the upper ends and scanned the Fourier remainder in floating point, which is evidence, not proof, so those three rest on one checker. For Result 4 a double-precision cover with explicit allowances reproduced the windows.

Exhaustive searches of periodic cells found nothing below the certified energies: up to 14 sites at $\alpha=3$, 6 and $d=10$ for Theorem 1, and up to 22 Co at $x=1/2$ and 18 at $x=2/3$ for Result 4. The proofs have not been peer reviewed.

## What it does not show

All results are classical, at zero temperature and at fixed filling. Stability against finite perturbations at fixed particle number is not claimed, nor is anything between the listed potentials or for unscreened $1/r$. Closed windows have width of order $10^{-11}$, set by a safety margin and the rounding of the rational data; uniqueness is claimed only in Theorems 1 and 2. A crystal appears at a given chemical potential only if its filling lies on the lower convex hull of $e_0$, which windows do not decide.

Result 4 covers periodic configurations only, because the Coulomb pole at zero wavevector is not controlled for general translation-invariant states. It is neither the three-dimensional model of Roger et al. [6] nor the two-plane model of Zhang et al. [7], and it has no certificate at $x=5/7$, 3/5 or 2/5.

## Earlier and parallel work

Koziol et al. [1], who searched all unit cells up to a given extent, wrote that cylinder studies made the Ising stripe plausible but a rigorous numerical proof on the full lattice was pending; for hard-core bosons at half filling they confirm the stripe "rigorously with our approach, as we intrinsically check the unit cells of all other candidates". Our bound holds for states of any period. Kumar et al. [2] enumerated $6\times6$ tori for a truncated model and compared named competitors on a $72\times72$ torus. Matty and Kim [3] ran Monte Carlo and left the zero-temperature classical ground state of their intermediate states to future work.

For the $\sqrt3\times\sqrt3$ and honeycomb crystals the criterion is the classical concentration-wave criterion [8, 9]. The nearest-neighbour split for the stripe and $2\times2$ crystals, the covariance measure that extends the bound to every state of any period, and the certificates are ours. Fourier positivity gives ground states of continuum particles [10] and sphere-packing bounds [11]. Paul and Refael [12] give a semidefinite hierarchy containing the Luttinger–Tisza bound on Bravais lattices, solved with a numerical solver; they claim rigorous two-sided bounds, and we did not examine how round-off is controlled. Shah et al. [13] applied the matrix form with an $r^{-6}$ tail to one pyrochlore phase without a certificate. Sarnak and Strömbergsson [14] proved that the fcc lattice minimises the height of flat 3-tori, Bétermin [15] that the triangular lattice minimises Lennard-Jones type energies, and Muratov and Novaga [16] that the bcc lattice minimises the Coulomb energy among Bravais lattices, the last two by computer-assisted proofs and the last with an Ewald representation, a certified Hessian and an interval cover. These are not lattice-gas results; we add a lattice-gas bound with an exact rational cluster dual and an interval proof on the whole Brillouin zone. Rigorous results exist for one-dimensional long-range gases [17, 18], finite-range triangular lattice gases [19, 20, 21, 22] and Ising models with competing interactions [23].

Several states of Result 3 were found numerically and experimentally: Samajdar et al. [4, 5], Ebadi et al. [24], O'Rourke and Chan [25] and, for a long-range square-lattice gas, Rademaker et al. [26]. None gives a lower bound; the windows add one. The orderings of Result 4 are known from diffraction and numerical work [6, 7, 27]: Roger et al. found Na on Na2 sites only at $x=1/3$ and on both kinds equally at $x=1/2$, and Zhang et al. found the $x=1/2$ ordering and a $3\times1$ supercell as the lowest-energy structure at $x=2/3$, which we identify with our 2/3 state by cell and Na1:Na2 count. We add proofs for the in-plane model.

In the sources we searched (arXiv, Zenodo and web search, 9 to 15 November 2026) we found no earlier proof or certified bound for Theorems 1 and 2 and Results 3 and 4.

## References

1. J. A. Koziol, A. Duft, G. Morigi and K. P. Schmidt, "Systematic analysis of crystalline phases in bosonic lattice models with algebraically decaying density-density interactions", SciPost Phys. 14, 136 (2023). https://doi.org/10.21468/SciPostPhys.14.5.136
2. A. Kumar, C. Lewandowski and H. J. Changlani, "Origin and stability of generalized Wigner crystallinity in triangular moiré systems", npj Quantum Mater. 10, 95 (2025). https://doi.org/10.1038/s41535-025-00792-1
3. M. Matty and E.-A. Kim, "Melting of generalized Wigner crystals in transition metal dichalcogenide heterobilayer Moiré systems", Nat. Commun. 13, 7098 (2022). https://doi.org/10.1038/s41467-022-34683-x
4. R. Samajdar, W. W. Ho, H. Pichler, M. D. Lukin and S. Sachdev, "Complex density wave orders and quantum phase transitions in a model of square-lattice Rydberg atom arrays", Phys. Rev. Lett. 124, 103601 (2020). https://doi.org/10.1103/PhysRevLett.124.103601
5. R. Samajdar, W. W. Ho, H. Pichler, M. D. Lukin and S. Sachdev, "Quantum phases of Rydberg atoms on a kagome lattice", Proc. Natl. Acad. Sci. U.S.A. 118, e2015785118 (2021). https://doi.org/10.1073/pnas.2015785118
6. M. Roger et al., "Patterning of sodium ions and the control of electrons in sodium cobaltate", Nature 445, 631 (2007). https://doi.org/10.1038/nature05531
7. P. Zhang, R. B. Capaz, M. L. Cohen and S. G. Louie, "Theory of sodium ordering in NaxCoO2", Phys. Rev. B 71, 153102 (2005). https://doi.org/10.1103/PhysRevB.71.153102
8. J. M. Luttinger and L. Tisza, "Theory of dipole interaction in crystals", Phys. Rev. 70, 954 (1946). https://doi.org/10.1103/PhysRev.70.954
9. A. G. Khachaturyan, "Ordering in substitutional and interstitial solid solutions", Prog. Mater. Sci. 22, 1 (1978). https://doi.org/10.1016/0079-6425(78)90003-8
10. A. Sütő, "Crystalline ground states for classical particles", Phys. Rev. Lett. 95, 265501 (2005). https://doi.org/10.1103/PhysRevLett.95.265501
11. H. Cohn and N. Elkies, "New upper bounds on sphere packings I", Ann. Math. 157, 689 (2003). https://doi.org/10.4007/annals.2003.157.689
12. N. Paul and G. Refael, "Bootstrapping ground state properties of classical frustrated magnets", arXiv:2605.06784 (2026). https://arxiv.org/abs/2605.06784
13. J. Shah, G. Nambiar, A. V. Gorshkov and V. Galitski, "Quantum spin ice in three-dimensional Rydberg atom arrays", Phys. Rev. X 15, 011025 (2025). https://doi.org/10.1103/PhysRevX.15.011025
14. P. Sarnak and A. Strömbergsson, "Minima of Epstein's zeta function and heights of flat tori", Invent. Math. 165, 115 (2006). https://doi.org/10.1007/s00222-005-0488-2
15. L. Bétermin, "Optimality of the triangular lattice for Lennard-Jones type lattice energies: a computer-assisted method", J. Phys. A 56, 145204 (2023). https://doi.org/10.1088/1751-8121/acc21d
16. C. B. Muratov and M. Novaga, "BCC optimality for the three-dimensional Coulomb lattice energy", arXiv:2610.29732 (2026). https://arxiv.org/abs/2610.29732
17. J. Hubbard, "Generalized Wigner lattices in one dimension and some applications to tetracyanoquinodimethane (TCNQ) salts", Phys. Rev. B 17, 494 (1978). https://doi.org/10.1103/PhysRevB.17.494
18. J. Jędrzejewski and J. Miękisz, "Ground states of lattice gases with 'almost' convex repulsive interactions", J. Stat. Phys. 98, 589 (2000). https://doi.org/10.1023/A:1018663106236
19. M. Kaburagi and J. Kanamori, "Ground state structure of triangular lattice gas model with up to 3rd neighbor interactions", J. Phys. Soc. Jpn. 44, 718 (1978). https://doi.org/10.1143/JPSJ.44.718
20. Yu. I. Dublenych, "Ground states of lattice-gas models on the triangular and honeycomb lattices: Devil's step and quasicrystals", Phys. Rev. E 80, 011123 (2009). https://doi.org/10.1103/PhysRevE.80.011123
21. Yu. I. Dublenych, "Ground states of the lattice-gas model on the triangular lattice with nearest- and next-nearest-neighbor pairwise interactions and with three-particle interaction: Full-dimensional ground states", Phys. Rev. E 84, 011106 (2011). https://doi.org/10.1103/PhysRevE.84.011106
22. Yu. I. Dublenych, "Ground states of the lattice-gas model on the triangular lattice with nearest- and next-nearest-neighbor pairwise interactions and with three-particle interaction: Ground states at boundaries of full-dimensional regions", Phys. Rev. E 84, 061102 (2011). https://doi.org/10.1103/PhysRevE.84.061102
23. A. Giuliani and R. Seiringer, "Periodic striped ground states in Ising models with competing interactions", Commun. Math. Phys. 347, 983 (2016). https://doi.org/10.1007/s00220-016-2665-0
24. S. Ebadi et al., "Quantum phases of matter on a 256-atom programmable quantum simulator", Nature 595, 227 (2021). https://doi.org/10.1038/s41586-021-03582-4
25. M. J. O'Rourke and G. K.-L. Chan, "Entanglement in the quantum phases of an unfrustrated Rydberg atom array", Nat. Commun. 14, 5397 (2023). https://doi.org/10.1038/s41467-023-41166-0
26. L. Rademaker, Y. Pramudya, J. Zaanen and V. Dobrosavljević, "Influence of long-range interactions on charge ordering phenomena on a square lattice", Phys. Rev. E 88, 032121 (2013). https://doi.org/10.1103/PhysRevE.88.032121
27. Y. S. Meng, Y. Hinuma and G. Ceder, "An investigation of the sodium patterning in NaxCoO2 (0.5 ≤ x ≤ 1) by density functional theory methods", J. Chem. Phys. 128, 104708 (2008). https://doi.org/10.1063/1.2839292
28. G. D. Garbulsky, P. D. Tepesch and G. Ceder, "Ground state analysis on the fcc lattice with four pair interactions", MRS Symp. Proc. 291, 259 (1992). https://doi.org/10.1557/PROC-291-259
