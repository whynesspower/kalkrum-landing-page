---
title: Certified global optima for periodic ion allocation
slug: certified-crystal-structure-prediction
kind: white-paper
field: Materials design
date: 2026-11-15
summary: Exact certificates prove the global minimum of a classical ion-allocation energy for 41 periodic instances and for bixbyite Y2O3, with no symmetry restriction. Spinel, pyrochlore, garnet and a 135-ion perovskite on 512 sites stay open, with bounds 5.6 to 90.3 eV below the best allocation we hold.
---

We prove the global minimum of a classical ion-allocation energy (Ewald plus short-range pair terms), with no symmetry restriction, for 41 instances and, with cluster cuts, for bixbyite Y2O3. SrTiO3 with 40 ions on 512 sites has minimum $-1267.413235$ eV, and Y2O3 on 512 sites $-2111.537901$ eV. Gusev et al. [1] formulated the problem and proved optima inside space groups; their symmetric allocation for the 40-ion cell already has that energy, and Gerolymatos et al. [2] printed $-2111.54$ eV for Y2O3 without a bound. The pair relaxation extends Brosch and de Klerk's [3], the cluster bound Huang et al.'s [4]. Spinel, pyrochlore, garnet and a 135-ion perovskite on 512 sites stay open: the best allocation we hold lies $5.6$ to $90.3$ eV above the bound.

## The question

The aim is the lowest-energy arrangement of ions in a periodic cell; searches return arrangements, not proofs. On a grid of $N=g^3$ sites [1], an allocation $X$ puts one ion species, or none, on each site; $c_s$ counts the ions of species $s$, and the $c_{\rm void}=N-\sum_sc_s$ empty sites count as a further state. The energy is

$$
E(X)=\sum_{p,q}W(q-p)\,[X(p),X(q)],
$$

summed over all pairs of sites including $p=q$. $W(d)[s,t]$ is half the energy of states $s,t$ at displacement $d$ over periodic images, except that the short-range term between an ion and its own images has weight 1; it is zero for the void. Coulomb is the Ewald sum of the code of [1], with no $k=0$ term and no neutralising background (it cancels for neutral allocations). Short range is Buckingham from the code of [1] (Morse plus $A/r^{12}$ for the garnet) up to 10 Å inclusive (12 Å for ZnS and for the O-O term of ZrO2, 15 Å for the garnet), absent between cations; a listed pair with an image closer than 0.75 of its ionic radii sum has it replaced by 300 eV (5000 eV for the garnet).

A branch-and-cut solver returns guaranteed optima of this integer program [1], but the proofs in Table 1 of its [accepted manuscript](https://livrepository.liverpool.ac.uk/3170275/1/IPSCP.pdf) are inside space groups (imposed symmetries), except for SrTiO3 with five ions on a $4\times4\times4$ grid, solved in P1 (no symmetry). Gerolymatos et al. [2] report $-1179.67$ eV for a 24 hour P1 Gurobi run on the 40-ion instance (hardware not stated), compared with their neural-network sampler GNT-CSP. Huang et al. [4] proved exact ground states of cluster-expansion lattice models over all periodicities.

## What we found

> **Result 1 (Certified optima).** For each of 41 instances there is an allocation $X^*$ and a pair certificate (Theorem 1) with lower bound $\mathrm{LB}=E(X^*)$ as rational numbers. So $X^*$ minimises $E$ over all allocations of the composition, without space-group restriction. The instances are three benchmark rows of [2], five more from [1], 16 supercells and 17 variants with other lattice parameters or model charges, with 36 distinct minima.

| Instance | Composition | Cell side (Å) | Sites | Minimum (eV) |
|---|---|---|---|---|
| SrTiO3, $Z=1$ | O3 Sr Ti | 3.9 | 64 | $-158.757846$ |
| SrTiO3, $Z=8$ | O24 Sr8 Ti8 | 7.8 | 512 | $-1267.413235$ |
| SrTiO3, $Z=27$ | O81 Sr27 Ti27 | 11.7 | 216 | $-4277.330988$ |
| SrTiO3, $Z=512$ | O1536 Sr512 Ti512 | 31.2 | 4096 | $-81110.8691$ |
| SrO, $Z=864$ | O864 Sr864 | 31.2 | 1728 | $-29428.1147$ |
Table: Five of the 41 minima in eV, the two largest to four decimals; $Z$ counts formula units.

Thirteen of the 41 are rock-salt cells, twelve of them with every site occupied. Bétermin and Knüpfer [5] proved the alternating charge distribution optimal in an infinite cubic crystal for completely monotone potentials, Coulomb-type ones included; ours adds Buckingham terms.

> **Result 2 (Bixbyite).** Bixbyite Y2O3, with 48 O and 32 Y on the 512 sites of the $8\times8\times8$ grid (cell side 10.7 Å), has minimum energy $-2111.537901$ eV over all allocations. The pair certificate leaves a gap of 44.339 eV. Two cluster cuts (Proposition 2) close it.

> **Result 3 (Lower bounds for four oxides).** For spinel MgAl2O4, pyrochlore Y2Ti2O7, SrTiO3 with $Z=27$ and garnet Ca3Al2Si3O12 on the $8\times8\times8$ grid, every allocation has energy at least the certified bound below. No optimum is certified.

| Instance | Pair bound (Theorem 1) | Certified bound | Best allocation | Gap | Lowest method in [2] |
|---|---|---|---|---|---|
| MgAl2O4, O32 Mg8 Al16, 8.2 Å | $-1613.9225$ | $-1607.0255$ | $-1601.4043$ | 5.621 | $-1546.48$ |
| Y2Ti2O7, O56 Y16 Ti16, 10.2 Å | $-3065.1436$ | $-3000.8043$ | $-2975.2344$ | 25.570 | $-2949.29$ |
| SrTiO3, $Z=27$, O81 Sr27 Ti27, 11.7 Å | $-4133.3076$ | $-3992.3273$ | $-3902.0426$ | 90.285 | $-3745.89$ |
| Ca3Al2Si3O12, Ca24 Al16 Si24 O96, 11.9 Å | $-2159.9099$ | $-2130.4356$ | $-2093.8296$ | 36.606 | $-1986.79$ |
Table: Energies in eV on 512 sites, bounds rounded down; cell side after each composition. Gap: best allocation minus certified bound, an upper bound on the true gap.

If the energies printed in [2] are energies of allocations of this model, our best allocations lie $54.92$, $25.94$, $156.15$ and $107.04$ eV below the lowest of them. [2] used 24 hours of Gurobi and five GNT-CSP trainings on one A100 GPU, and does not claim these values as optima; its allocations are not public, so we could not re-evaluate them. Our SrTiO3 and garnet allocations were found in 597 s (from a stored allocation) and 899 s (random start) on a shared four-core Xeon, those for spinel and pyrochlore in earlier runs of 2.1 s and 10.6 s that started from allocations with the space-group symmetry of the known structures. The ground-truth column of [2] holds reference energies from [1] that [2] says can lie strictly below every feasible allocation; here it lies below our bounds. The $-1268.67$ eV printed for GNT-CSP on the 40-ion instance equals that ground truth and lies $1.257$ eV below the certified minimum, so no allocation has that energy under the potential of the programs published with [2]. The cell may repeat the reference value.

## Why it is true

Write $\Pi_X(d)[s,t]$ for the number of sites $p$ with $X(p)=s$ and $X(p+d)=t$, the void counted as a state, and $c$ for the counts of all states. Then $E(X)=\sum_d\langle W(d),\Pi_X(d)\rangle$ is linear in $\Pi_X$, with $\langle A,B\rangle=\sum_{s,t}A_{st}B_{st}$. Counting gives $\Pi_X\ge0$, $\Pi_X(0)=\mathrm{diag}(c)$, row and column sums $c$, and $\sum_d\Pi_X(d)=cc^{T}$. The pair relaxation minimises $\sum_d\langle W(d),\Pi(d)\rangle$ over arrays $\Pi$ with these properties, $\Pi(-d)=\Pi(d)^{T}$ and $\sum_d\Pi(d)e^{-ik\cdot d}$ positive semidefinite at every wavevector $k$; a certificate is a feasible dual point. For an integer vector $\phi$ and a vector $w$,

$$
\sum_d(\phi\star\phi)(d)\,\langle ww^{T},\Pi_X(d)\rangle=\sum_p\Big(\sum_x\phi(x)\,w[X(p+x)]\Big)^2\ge0,
$$

with $(\phi\star\phi)(d)=\sum_x\phi(x)\phi(x+d)$. A certificate has arbitrary integer vectors $\phi_o$, one per orbit $o$ of nonzero wavevectors under the 48 signed coordinate permutations $h$, weights $\lambda_{o,i}\ge0$, vectors $w_{o,i}$, and multipliers $\alpha(d)$, $\beta(d)$, $\gamma$. Put

$$
\begin{aligned}
P(d)&=\sum_o\rho_o(d)\sum_i\lambda_{o,i}\,w_{o,i}w_{o,i}^{T},\qquad \rho_o(d)=\sum_h\sum_x\phi_o(x)\phi_o(x+hd),\\
\sigma(d)&=W(d)-P(d)-\alpha(d)\mathbf 1^{T}-\mathbf 1\beta(d)^{T}-\gamma\quad(d\neq0),\\
\mathrm{LB}&=\sum_s\big(W(0)[s,s]-P(0)[s,s]\big)c_s+\sum_{d\neq0}\sum_s\big(\alpha(d)[s]+\beta(d)[s]\big)c_s+\sum_{s,t}\gamma[s,t]\big(c_sc_t-\delta_{st}c_s\big),
\end{aligned}
$$

with $\mathbf 1$ the all-ones vector.

> **Theorem 1 (Pair certificate).** If $\lambda_{o,i}\ge0$ and $\sigma(d)[s,t]\ge0$ for all $d\neq0$ and all $s,t$, then every allocation $X$ with counts $c$ satisfies $E(X)\ge\mathrm{LB}$, and $E(X)-\mathrm{LB}=\sum_{o,h,i}\lambda_{o,i}\sum_p\big(\sum_x\phi_o(hx)\,w_{o,i}[X(p+x)]\big)^2+\sum_{d\neq0}\langle\sigma(d),\Pi_X(d)\rangle$. If $E(X^*)=\mathrm{LB}$, then $X^*$ minimises $E$ over all allocations with these counts.

The proof is the substitution $W=\sigma+P+\alpha\mathbf 1^{T}+\mathbf 1\beta^{T}+\gamma$, so no matrix inequality is checked.

Take distinct sites $u_1,\dots,u_n$ and rationals $\varphi_i(a)$, $\psi_{ij}(a,b)$ for species $a,b$, zero for the void. Put $F(w)=\sum_i\varphi_i(w_i)+\sum_{i<j}\psi_{ij}(w_i,w_j)$ on patterns $w$ of species and void, and $m=\min_wF(w)$.

> **Proposition 2 (Cluster cut).** Let $\bar y_{ab}(O)$ be the mean of $\Pi_X(d)[a,b]$ over an orbit $O$ of displacements under the 48 operations, and $O_{ij}$ the orbit of $u_j-u_i$. Every allocation satisfies $\sum_{i<j}\sum_{a,b}\psi_{ij}(a,b)\,\bar y_{ab}(O_{ij})\ge Nm-\sum_i\sum_a\varphi_i(a)c_a$.

Every translate of $X$ and its image under each operation shows the $n$ sites in some pattern, so $F\ge m$ on all of them; averaging makes $F$ linear in pair counts. Spreading $\psi_{ij}$ equally over $O_{ij}$ gives a tensor $\Theta$, and if $\sigma\ge0$ for $W-\Theta$ then $E(X)\ge\mathrm{LB}(W-\Theta)+Nm-\sum_i\sum_a\varphi_i(a)c_a$. For Y2O3 the clusters are the origin with the orbits of $(1,0,0)$, $(1,1,1)$, $(2,0,0)$ (21 sites) and of $(1,0,0)$, $(1,1,0)$, $(1,1,1)$ (27 sites).

## How it was checked

The certificates are computer-assisted proofs. A standalone program reads $W$ exactly, recomputes the autocorrelations in integers, tests $\sigma\ge0$ at every displacement without symmetry reduction, and compares LB with $E(X^*)$ as rationals. A second checker, written from the statement of Theorem 1 with no shared code, accepted all 56 certificates with the same status and bound. The proofs were re-derived and read line by line.

$W$ is computed in double precision and read as exact. The energy function was re-implemented from the code of [1] ([ipcsp](https://github.com/lrcfmd/ipcsp), commit 21b5e45, MIT licence) and matches every tensor entry the certificates use to $4.83\times10^{-13}$ eV, so the stored minima differ from those of the potential by at most $3\times10^{-6}$ eV at 2560 ions and $2\times10^{-9}$ eV for the oxides. It matches the eight programs published with [2] ([CSP-with-GNNs](https://github.com/StavGer/CSP-with-GNNs), commit 433615c) to $9.1\times10^{-13}$ eV.

Both checkers rejected corrupted certificates. For cluster cuts a separately written checker gave the same bound on every certificate, found no bound above any of 31 stored allocation energies, and re-proved the cluster minima by exact branch and bound without symmetry reduction for bixbyite, spinel and garnet; for pyrochlore and the 135-ion perovskite two symmetry-reduced searches agree and the search without symmetry was not completed. The proofs have not been peer reviewed.

## What it does not show

- The model is discrete and classical: optimal means optimal on the stated grid under the stated potential, not for relaxed structures. None of the 54 stored allocations, nor the bixbyite allocation, has a pair inside the soft-penalty radius, so each optimum minimises under hard exclusion too.
- The certificate is tight on 36 of 38 instances whose grid is exactly the lattice of a perovskite, rock-salt, fluorite or zinc-blende structure (not SrTiO3 at 4.6 Å) and on 5 of 10 finer grids, not on the oxides of Result 3.
- Further certified bounds close little: a split on the oxygen structure factor at $(4,4,4)$ raises the spinel bound by $0.0111$ eV (0.20 % of the gap), other multipliers the pyrochlore bound by $0.1329$ eV (0.52 %).

> **Proposition 3 (No gain from sublattice resolution).** For a subgroup $H$ of the translation group, the pair relaxation that counts pairs separately for each coset of $H$, with positive semidefinite coset-resolved Fourier blocks, has the value of the scalar pair relaxation. So does the relaxation with convex constraints closed under translation of the cosets, such as cluster cuts for every coset, if the scalar one carries the constraints summed over cosets.

The proof averages a resolved optimum over translations. Breaking the translation symmetry can tighten a relaxation, but we have no exact certificate from one.

## Earlier and parallel work

Gusev et al. [1] formulated lattice atom allocation as an integer program and proved optima inside space groups. We add proofs without that restriction, and show that their symmetric allocations for $Z=8$ and $Z=27$ are global. Gerolymatos et al. [2], posted on 27 April 2026, print energies, not bounds, among them $-2111.54$ eV for bixbyite; we prove it is the minimum.

The pair relaxation is no stronger than the semidefinite relaxation of the quadratic assignment problem [6, 7], whose group symmetry de Klerk and Sotirov treat [8]. Barthel and Hübener [14] bound ground-state energies of quantum lattice models below by semidefinite relaxations. Fourier-space lower bounds for lattice energies are older (Luttinger and Tisza [10]). Brosch and de Klerk [3] apply the relaxation to repelling particles on a torus, complementing Bouman et al. [9], and prove optimal configurations. For one ion species and empty sites on a two-dimensional torus ours is, up to notation and the symmetry group, the program of their Theorem 4.11, with a general pair energy in place of 1/Lee distance. We add several species with the void, three dimensions, Ewald and Buckingham energies, and an exact rational certificate.

Huang et al. [4, 11] bound the ground-state energy below by the minimum energy of a block of sites without periodicity constraints; we found no Ewald term in their text. Proposition 2 is a bound of that kind, for a long-range kernel with several species and the void. Larsen et al. [12] solved a cluster-expansion model of Ag–Au nanoparticles by mixed-integer programming. Proposition 3 is the invariant-point argument for symmetric semidefinite programs [13]. We found no earlier statement of Proposition 3 for ion allocation in arXiv, Zenodo, GitHub and the web (last search 3 November 2026). For these instances we found no earlier exact certificate of global optimality without symmetry restriction, apart from the five-ion SrTiO3 case of [1], and no certified lower bound for the four oxides, in arXiv, Zenodo, Crossref and the web (last full search 9 November 2026; arXiv and Zenodo again on 15 November 2026).

## References

1. V. V. Gusev, D. Adamson, A. Deligkas, D. Antypov, C. M. Collins, P. Krysta, I. Potapov, G. R. Darling, M. S. Dyer, P. Spirakis and M. J. Rosseinsky, "Optimality guarantees for crystal structure prediction", Nature 619, 68 (2023). https://doi.org/10.1038/s41586-023-06071-y
2. S. Gerolymatos, J. K. Brubaker, M. J. A. Schuetz and V. V. Gusev, "Crystal structure prediction using graph neural combinatorial optimization", arXiv:2604.23921 (2026). https://arxiv.org/abs/2604.23921
3. D. Brosch and E. de Klerk, "Minimum energy configurations on a toric lattice as a quadratic assignment problem", Discrete Optimization 44, 100612 (2022). https://doi.org/10.1016/j.disopt.2020.100612
4. W. Huang, D. A. Kitchaev, S. T. Dacek, Z. Rong, A. Urban, S. Cao, C. Luo and G. Ceder, "Finding and proving the exact ground state of a generalized Ising model by convex optimization and MAX-SAT", Phys. Rev. B 94, 134424 (2016). https://doi.org/10.1103/PhysRevB.94.134424
5. L. Bétermin and H. Knüpfer, "On Born's conjecture about optimal distribution of charges for an infinite ionic crystal", J. Nonlinear Sci. 28, 1629 (2018). https://doi.org/10.1007/s00332-018-9460-3
6. Q. Zhao, S. E. Karisch, F. Rendl and H. Wolkowicz, "Semidefinite programming relaxations for the quadratic assignment problem", J. Comb. Optim. 2, 71 (1998). https://doi.org/10.1023/A:1009795911987
7. J. Povh and F. Rendl, "Copositive and semidefinite relaxations of the quadratic assignment problem", Discrete Optimization 6, 231 (2009). https://doi.org/10.1016/j.disopt.2009.01.002
8. E. de Klerk and R. Sotirov, "Exploiting group symmetry in semidefinite programming relaxations of the quadratic assignment problem", Math. Program. 122, 225 (2010). https://doi.org/10.1007/s10107-008-0246-5
9. N. Bouman, J. Draisma and J. S. H. van Leeuwaarden, "Energy minimization of repelling particles on a toric grid", SIAM J. Discrete Math. 27, 1295 (2013). https://doi.org/10.1137/120869067
10. J. M. Luttinger and L. Tisza, "Theory of dipole interaction in crystals", Phys. Rev. 70, 954 (1946). https://doi.org/10.1103/PhysRev.70.954
11. W. Huang, D. Kitchaev, S. Dacek, Z. Rong, Z. Ding and G. Ceder, "Constructing and proving the ground state of a generalized Ising model by the cluster tree optimization algorithm", arXiv:1606.07429 (2016). https://arxiv.org/abs/1606.07429
12. P. M. Larsen, K. W. Jacobsen and J. Schiøtz, "Rich ground-state chemical ordering in nanoparticles: exact solution of a model for Ag-Au clusters", Phys. Rev. Lett. 120, 256101 (2018). https://doi.org/10.1103/PhysRevLett.120.256101
13. K. Gatermann and P. A. Parrilo, "Symmetry groups, semidefinite programs, and sums of squares", J. Pure Appl. Algebra 192, 95 (2004). https://doi.org/10.1016/j.jpaa.2003.12.011
14. T. Barthel and R. Hübener, "Solving condensed-matter ground-state problems by semidefinite relaxations", Phys. Rev. Lett. 108, 200404 (2012). https://arxiv.org/abs/1106.4966
