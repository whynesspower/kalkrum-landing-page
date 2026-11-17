---
title: Perfect quasirandom alloy cells and certified diffusion brackets
slug: perfect-sqs-and-diffusion
kind: white-paper
field: Materials design
date: 2026-11-15
summary: Smallest supercells whose pair correlations equal those of a random equiatomic alloy, with complete catalogues for quaternary fcc and bcc, and certified two-sided bounds on the variational diffusion coefficient of an exclusion-process tracer and of an alloy vacancy.
---

A special quasirandom structure (SQS) [1] is perfect through $K$ shells if its pair correlations equal the random alloy's for the first $K$ neighbour shells. Equiatomic quinary alloys on fcc and bcc need 25 atoms for two shells and 50 for three; quaternary alloys need 32 for three shells on fcc and for three to five on bcc. Jiang and Uberuaga used 125 atoms for two quinary bcc shells [2], Shinohara et al. 16 for two quaternary fcc shells [3]; we add minimal sizes, catalogues and nonexistence results.

We certify two-sided bounds on the variational diffusion coefficient of an exclusion tracer and an alloy vacancy. Trial-function upper bounds [4, 5, 6] and a Thomson-type principle for the collective coefficient [7] are known; we add exactly divergence-free local currents in the walker frame, which give the lower side.

## The question

Calculations on a random alloy use a supercell whose pair correlations, the frequencies of species pairs at the first neighbour separations, imitate the random ones. Stochastic optimisation is used instead of exhaustive search [3], with single cells of 125 to 128 atoms for bcc alloys [2, 8]. We ask for the smallest cell whose pair correlations are exact, and for all such cells.

A tracer (a tagged particle) or a vacancy (an empty site that moves when an atom exchanges with it) walks through an environment that its jumps rearrange; its diffusion coefficient is an infimum over local functions of the environment, those that depend on finitely many sites [6, 9, 10], so any trial function bounds it above. We ask for a certified lower bound.

## What we found

> **Definition.** Let $\Sigma_k$ be the $k$-th neighbour shell, with $|\Sigma_k|=12,6,24,12,24,8$ (fcc) and $8,6,12,24,8,6$ (bcc) for $k\le6$. A colouring of $N$ sites by $q$ species, $N/q$ each, is perfect through $K$ shells if $C_k(a,b)=|\Sigma_k|N/q^2$ for all species $a,b$ and $k\le K$. Here $C_k(a,b)$ counts the pairs (site $i$, vector $v\in\Sigma_k$) with species $a$ at $i$ and $b$ at $i+v$, taken modulo the supercell.

Every vector of every site counts, so a site may pair with its own periodic image, as in [3] and icet [11]. Forbidding this changes no minimal size in the table, but it changes the counts in its last column.

> **Theorem 1 (Divisibility).** If a colouring is perfect through shell $k$, then $|\Sigma_k|N/q^2$ is an even integer. Hence $25\mid N$ for $q=5$, and $16\mid N$ for $q=4$ and $K\ge2$, on fcc and bcc.

| Species, lattice | Shells $K$ | Smallest $N$ | Structures at $N$ | Without self-image pairs |
|---|---|---|---|---|
| 5, fcc | 2 | 25 | 1 | 1 |
| 5, bcc | 2 | 25 | 51 | 51 |
| 5, fcc | 3 | 50 | at least 10 | 8 |
| 5, bcc | 3 | 50 | at least 65 | 54 |
| 5, fcc | 4 | 50 | at least 1 | 1 |
| 5, fcc | 5 | at least 75 | none at 50 | n/a |
| 4, fcc | 2 | 16 | 3 | 3 |
| 4, fcc | 3 | 32 | 553 | 507 |
| 4, fcc | 4 | at least 48 | none at 32 | n/a |
| 4, bcc | 2 | 16 | 26 | 26 |
| 4, bcc | 3 | 32 | 996 | 745 |
| 4, bcc | 4 | 32 | 391 | 330 |
| 4, bcc | 5 | 32 | 282 | 8 |
| 4, bcc | 6 | at least 48 | none at 32 | n/a |
Table: Minimal $N$ for equiatomic alloys; "at least $N$" means none exists below $N$. Structures are perfect through at least $K$ shells, counted up to symmetries of the parent lattice that fix the supercell, translation and relabelling; counts are complete except at $N=50$. Last column: no site paired with its own periodic image in shells 1 to $K$.

In the exclusion model, particles on the square or simple cubic lattice, at density $\rho$, jump to each empty neighbour at rate 1; the tracer is a tagged particle with displacement $X_t$, and $D_s=\lim_{t\to\infty}\mathbb E[(X_t\cdot e)^2]/(2t)$ along a lattice direction $e$ in lattice units. In the alloy model, one vacancy among independent atoms A and B (fractions $1-c_B$, $c_B$) on the fcc, bcc or simple cubic lattice exchanges with a neighbour of species $s$ at rate $w_s$, the atom taking its place. With $\xi_z$ the displacement along $e$ in a jump by the neighbour vector $z$ and $\bar r$ the mean jump rate, $1-\rho$ for exclusion and $(1-c_B)w_A+c_Bw_B$ for the alloy, $D^{\rm free}=\tfrac12\bar r\sum_z\xi_z^2$ is the coefficient of an uncorrelated walker, $f=D_s/D^{\rm free}=D_s/(1-\rho)$ and $f_v=D^{\rm var}/D^{\rm free}$.

Seen from the walker, the environment $\eta\in\{0,1\}^S$ lives on the sites $S$ other than the walker's and has a product law $\mu$ (each site occupied with probability $\rho$, or of species B with probability $c_B$), with expectation $\mathbb E_\mu$. A jump by $z$ at rate $r_z(\eta)$ relabels it by $T_z$: $(T_z\eta)(x)=\eta(x+z)$ for $x\ne-z$ and $(T_z\eta)(-z)=\eta(z)$. Here $r_z=1-\eta_z$ for exclusion ($\eta_z=1$ for an occupied site) and $r_z=w_A+(w_B-w_A)\eta_z$ for the alloy ($\eta_z=1$ for species B). In the exclusion model each unordered nearest-neighbour bond $b=\{x,y\}$ of $S$ also swaps $\eta_x$ and $\eta_y$ ($S_b$) at rate $\gamma_b=(\eta_x-\eta_y)^2$; the alloy has $\gamma_b=0$. For bounded local $F$ put

$$
Q(F)=\mathbb E_\mu\Big[\sum_z r_z\,(\xi_z+F\circ T_z-F)^2+\sum_b \gamma_b\,(F\circ S_b-F)^2\Big],\qquad D^{\rm var}=\tfrac12\inf_FQ(F).
$$

> **Theorem 2 (Dirichlet and Thomson bounds).** In both models $T_{-z}T_z=\mathrm{id}$, $S_b^2=\mathrm{id}$, $\mu$ is invariant under $T_z$ and $S_b$, $r_{-z}\circ T_z=r_z$ and $\gamma_b\circ S_b=\gamma_b$. Let bounded local $J_z$, $L_b$, with finitely many $L_b\ne0$, vanish where $r_z$, $\gamma_b$ do, satisfy $J_{-z}\circ T_z=-J_z$ and $L_b\circ S_b=-L_b$, and let $\sum_zJ_z+\sum_bL_b=0$ for every configuration. With $\Phi=\mathbb E_\mu\sum_zJ_z\xi_z$ and $\mathcal E=\mathbb E_\mu[\sum_zJ_z^2/r_z+\sum_bL_b^2/\gamma_b]>0$, where $0/0:=0$, $\Phi^2/(2\mathcal E)\le D^{\rm var}\le\tfrac12Q(F)$ for every bounded local $F$. Without locality, the supremum of $\Phi^2/(2\mathcal E)$ over finite-energy currents with the same antisymmetry that are divergence-free in $L^2(\mu)$ equals $D^{\rm var}$.

For the exclusion tracer $D^{\rm var}=D_s$, by the theorem of Spohn [10] after Kipnis and Varadhan [9]. For the alloy, $D^{\rm var}$ is the vacancy coefficient if the environment seen from the vacancy is ergodic, which is assumed.

| Quantity | Model | Certified bracket | Width | Monte Carlo |
|---|---|---|---|---|
| $f(\rho)$, $\rho=\tfrac12$ | exclusion, square | $[0.709894,\,0.711118]$ | 0.0012 | $0.7114\pm0.0002$ (short lags), $0.7111\pm0.0001$ (density-corrected) |
| $f(\rho)$, $\rho=\tfrac12$ | exclusion, simple cubic | $[0.844126,\,0.845164]$ | 0.0010 | not run |
| $f_v$, $c_B=\tfrac12$, $w_B/w_A=\tfrac12$ | alloy, bcc | $[0.96829,\,0.96921]$ | 0.0009 | $0.96873\pm0.00031$ |
| $f_v$, $c_B=\tfrac12$, $w_B/w_A=\tfrac1{10}$ | alloy, fcc | $[0.81184,\,0.83215]$ | 0.020 | $0.82734\pm0.00118$ |
| $f_v$, $c_B=\tfrac45$, $w_B/w_A=\tfrac1{1000}$ | alloy, fcc | $[0.01596,\,0.27241]$ | 0.26 | $0.04837\pm0.00035$ |
Table: Brackets of $f$ and $f_v$, with Monte Carlo values. All ten exclusion brackets (densities 0.1 to 0.9, both lattices) are narrower than 0.002; the 65 alloy brackets have widths from 0.0001 to 0.66, and the 21 at $w_B/w_A=\tfrac12$ (seven compositions per lattice) are below 0.001.

## Why it is true

Theorem 1. The map $(i,v)\mapsto(i+v,-v)$ is an involution without fixed points on the pairs counted by $C_k$, because $\Sigma_k=-\Sigma_k$ and $v\ne-v$. It preserves the pairs counted by $C_k(a,a)$, so $C_k(a,a)$ is even, and perfection fixes it at $|\Sigma_k|N/q^2$. For $q=5$ the first shell has 12 or 8 vectors, which 5 does not divide, so $25\mid N$. For $q=4$ and $K\ge2$, $|\Sigma_k|N/16$ must be an even integer for $k=1,2$, which gives $16\mid N$.

Minimal sizes. Perfection through $K+1$ shells implies it through $K$, so a witness at $N^*$ and nonexistence at each smaller point of the divisibility grid fix $N^*$.

Theorem 2. Summation by parts, with $r_{-z}\circ T_z=r_z$ and the antisymmetry, gives $\mathbb E_\mu[\sum_zJ_z(F\circ T_z-F)+\sum_bL_b(F\circ S_b-F)]=-2\,\mathbb E_\mu[F(\sum_zJ_z+\sum_bL_b)]=0$, so the pairing of the current with $\xi+\nabla F$ equals $\Phi$, and Cauchy–Schwarz gives $\Phi^2\le\mathcal E\,Q(F)$. The last statement is Hilbert-space duality: $2D^{\rm var}$ is the squared distance of the displacement field $\xi$ from the closure of the gradients $\nabla F$, and the antisymmetry costs nothing because an isometric involution fixes $\xi$ and every gradient. Closing the bracket needs density of local divergence-free currents, which we do not prove.

## How it was checked

Theorems 1 and 2 are proved by hand; Theorem 2 was re-derived step by step. The sizes and catalogues are exhaustive computations, the exclusion brackets computer-assisted proofs, the alloy brackets certified computations of $D^{\rm var}$.

Witnesses are recomputed from Cartesian coordinates; nonexistence results are exact-integer exhaustive searches by a standalone program. A separately written enumerator, with a second algorithm at 25 atoms, reproduced every complete count and nonexistence result up to 32 atoms and all 75 witnesses at 50 atoms; for fcc at 50 atoms and $K=5$ it re-ran 77 of the 280 classes, the other 203 resting on one code base. The enumerators share one elementary reduction, tested by brute force up to 16 sites; the searches are not machine-checked proofs. Controls reproduce counts printed in [3] and the published supercell counts [12], and agree with icet 4.0 [11] on all 1753 catalogue structures.

A certificate is a polynomial $F$, or a polynomial current, with rational coefficients. A standalone program evaluates $Q(F)$, $\Phi$ and $\mathcal E$ in exact rational arithmetic and requires every coefficient of the divergence to vanish; above $1.2\times10^{5}$ coefficients it uses a randomised identity test, with failure probability at most $3\times10^{-35}$ per certificate. A separately written evaluator recomputed all 190 stored certificates exactly, controls on one-dimensional chains included, and a deterministic exact test covered all 94 lower certificates. On a $3\times3$ torus, separately written code gave an infimum and a supremum that agreed with the tilted generator of the full chain to 8 digits for exclusion and $1.3\times10^{-7}$ for the alloy.

A Monte Carlo of the alloy vacancy, written separately from the certificate code, lies inside 10 of 11 brackets and 0.6 standard errors above the eleventh (fcc, $c_B=0.3$, $w_B/w_A=0.1$: $0.91629\pm0.00131$ against 0.91555); a second program agrees where they overlap. For the exclusion tracer the Monte Carlo value sits at the upper end of the bracket, 1.4 standard errors above it for short lags; its error is not below the bracket width, so it is a consistency check only. The proofs and certificates have not been peer reviewed.

## What it does not show

Perfection concerns pair correlations through the stated shells only, not triplets, longer range or any energy model; for the top-ranked cells the first unmatched shell deviates by 0.001 to 0.015 rms. The lists at 50 atoms are incomplete, the bounds 48 and 75 are not shown to be attained, and nothing is claimed for hcp or for six or more species. Whether the example input of [23] contradicts our 32-atom result is unresolved.

The brackets bound $D^{\rm var}$; for the alloy Monte Carlo is evidence for its identification with the physical coefficient, not proof. Brackets widen with the rate contrast: in the last row of the table the upper bound is 5.6 times the Monte Carlo value and the lower bound 0.33 times it. We read the abstracts of [9, 10] and the formula as restated in [6, 7]; no published Monte Carlo table is compared.

## Earlier and parallel work

Shinohara et al. searched fcc quaternary cells exhaustively to 20 sites and list a 16-atom cell matching two shells, and state that cells up to 16 sites match only through the second neighbours [3]; our fcc 16-atom rows reproduce this. Jiang and Uberuaga wrote that they found a 125-atom single cell necessary for two quinary bcc shells, by annealing, while a weighted set of three 5-atom cells matched the same correlations [2], as Sorkin et al. did for fcc [14]; the first statement reports what their procedure needed, and 25 atoms suffice. Yang et al. used 32-atom quaternary cells, matched shells not stated in the text [15]. Lian et al. report a search strategy with ternary and quaternary examples [13]; we could not read the full text. The 32-atom fcc quaternary example input of their public code [23] (`cell = 32`, `cuts = 3,1`, `npmc = 4`) requests, by our reading of its source (not run), four exactly matched pair shells; we find none at 32 atoms, and no output is shipped, so the discrepancy is unresolved. The literature review of 2026-10-29 and searches of arXiv, Zenodo and the web to 2026-11-09, repeated on 2026-11-15, found no earlier minimal size, complete catalogue or nonexistence result beyond integer limits on short-range order in given cells [16] and the 16-atom rows. We add sizes, catalogues and nonexistence results.

Kipnis and Varadhan [9] and Spohn [10] gave the variational formula for the tracer. Arita et al. computed trial-function upper bounds for the collective diffusivity of one-dimensional generalised exclusion processes and name self-diffusion as a next step [4]; Trinkle recast transport coefficients as minima over local functions and used site-occupation functions for one vacancy in a random binary alloy on the square lattice [5]. Ertul and Shapira matched upper and lower bounds to leading order for a tagged particle in the Kob-Andersen gas [6], after Toninelli and Biroli's bounds [17]. Thomson's principle is classical for networks [18], and Biskup remarks that a flow characterisation would bound static random conductances from both sides [19]; Shapira proved it for the collective coefficient and raises tracers only as a question [7]. The abstract dual principle is not ours. We add exactly divergence-free local currents in the walker frame and certified brackets with a standalone checker.

Nakazato and Kitahara gave a first-order approximation for the exclusion tracer [25], which Pigeon et al. extended to fcc and bcc and found in simulation to overestimate the factor [24]; it lies above our upper bound at all ten points. Monte Carlo gave the earlier numbers for random-alloy correlation factors [20]; Belova and Murch found Manning's formalism [21] only a fairly rough approximation for tracer factors unless the exchange-frequency ratio is near unity [22]. In arXiv, Zenodo, GitHub, Crossref and web searches to 2026-11-09 we found no earlier certified bracket for these quantities.

## References

1. A. Zunger, S.-H. Wei, L. G. Ferreira and J. E. Bernard, "Special quasirandom structures", Phys. Rev. Lett. 65, 353 (1990). https://doi.org/10.1103/PhysRevLett.65.353
2. C. Jiang and B. P. Uberuaga, "Efficient ab initio modeling of random multicomponent alloys", Phys. Rev. Lett. 116, 105501 (2016). https://doi.org/10.1103/PhysRevLett.116.105501
3. K. Shinohara, A. Seko, T. Horiyama and I. Tanaka, "Finding well-optimized special quasirandom structures with decision diagram", Phys. Rev. Mater. 5, 113803 (2021), arXiv:2107.07683. https://doi.org/10.1103/PhysRevMaterials.5.113803
4. C. Arita, P. L. Krapivsky and K. Mallick, "Variational calculation of transport coefficients in diffusive lattice gases", Phys. Rev. E 95, 032121 (2017), arXiv:1611.07719. https://doi.org/10.1103/PhysRevE.95.032121
5. D. R. Trinkle, "Variational principle for mass transport", Phys. Rev. Lett. 121, 235901 (2018), arXiv:1805.11618. https://arxiv.org/abs/1805.11618
6. A. Ertul and A. Shapira, "Self-diffusion coefficient in the Kob-Andersen model", arXiv:2003.02531 (2020). https://arxiv.org/abs/2003.02531
7. A. Shapira, "A Thomson-type variational principle for diffusion coefficients", arXiv:2606.04636 (2026). https://arxiv.org/abs/2606.04636
8. A. I. Bhatti, D. Tingaud, M. Seydou and S. Queyreau, "Ab-initio study of the structural, elastic and dislocation properties of body-centered cubic refractory HfNbTaTiZr high entropy alloy", arXiv:2405.02691 (2024). https://arxiv.org/abs/2405.02691
9. C. Kipnis and S. R. S. Varadhan, "Central limit theorem for additive functionals of reversible Markov processes and applications to simple exclusions", Commun. Math. Phys. 104, 1 (1986). https://doi.org/10.1007/BF01210789
10. H. Spohn, "Tracer diffusion in lattice gases", J. Stat. Phys. 59, 1227 (1990). https://doi.org/10.1007/BF01334748
11. M. Ångqvist, W. A. Muñoz, J. M. Rahm, E. Fransson, C. Durniak, P. Rozyczko, T. H. Rod and P. Erhart, "ICET: A Python library for constructing and sampling alloy cluster expansions", Adv. Theory Simul. 2, 1900015 (2019). https://doi.org/10.1002/adts.201900015
12. OEIS A159842, number of symmetrically-distinct supercells (sublattices) of the fcc and bcc lattices. https://oeis.org/A159842
13. J.-C. Lian, L. Li, G.-F. Huang, W. Hu and W.-Q. Huang, "Highly efficient search strategy for special quasirandom structures", Phys. Rev. B 111, 224207 (2025). https://doi.org/10.1103/vphm-rcgr
14. V. Sorkin, T. L. Tan, Z. G. Yu and Y. W. Zhang, "Generalized small set of ordered structures method for the solid-solution phase of high-entropy alloys", Phys. Rev. B 102, 174209 (2020). https://doi.org/10.1103/PhysRevB.102.174209
15. S. Yang, G. Liu and Y. Zhong, "Revisit the VEC criterion in high entropy alloys (HEAs) with high-throughput ab initio calculations: A case study with Al-Co-Cr-Fe-Ni system", J. Alloys Compd. 916, 165477 (2022). https://www.osti.gov/pages/servlets/purl/1878472
16. R. Singh, A. Sharma, P. Singh, G. Balasubramanian and D. D. Johnson, "Accelerating computational modeling and design of high-entropy alloys", Nat. Comput. Sci. 1, 54 (2021), arXiv:2010.12107. https://doi.org/10.1038/s43588-020-00006-7
17. C. Toninelli and G. Biroli, "Dynamical arrest, tracer diffusion and kinetically constrained lattice gases", J. Stat. Phys. 117, 27 (2004), arXiv:cond-mat/0402314. https://doi.org/10.1023/B:JOSS.0000044063.86539.19
18. P. G. Doyle and J. L. Snell, "Random Walks and Electric Networks", Carus Mathematical Monographs 22 (1984), arXiv:math/0001057. https://arxiv.org/abs/math/0001057
19. M. Biskup, "Recent progress on the random conductance model", Probab. Surveys 8, 294 (2011), arXiv:1112.0104. https://arxiv.org/abs/1112.0104
20. P. Franke and R. Dieckmann, "Correlation factors for diffusion in binary random alloys with fcc structure", J. Appl. Phys. 70, 787 (1991). https://doi.org/10.1063/1.349635
21. J. R. Manning, "Correlation factors for diffusion in nondilute alloys", Phys. Rev. B 4, 1111 (1971). https://doi.org/10.1103/PhysRevB.4.1111
22. I. V. Belova and G. E. Murch, "Tracer correlation factors in the random alloy", Phil. Mag. A 80, 1469 (2000). https://doi.org/10.1080/01418610008212131
23. J.-C. Lian et al., findsqs, public code repository, example input examples/2-fcc-quaternary/INSQS (read 2026-11-15). https://github.com/lianjichun/findsqs
24. S. Pigeon, K. Fogelmark, B. Söderberg, G. Mukhopadhyay and T. Ambjörnsson, "Tracer particle diffusion in a system with hardcore interacting particles", J. Stat. Mech. 2017, 123209, arXiv:1712.03996. https://arxiv.org/abs/1712.03996
25. K. Nakazato and K. Kitahara, "Site blocking effect in tracer diffusion on a lattice", Prog. Theor. Phys. 64, 2261 (1980). https://doi.org/10.1143/PTP.64.2261
