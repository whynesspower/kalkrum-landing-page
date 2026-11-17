---
title: Log-concave turnover frequency and a dynamic cap for oxygen evolution
slug: catalysis-limits
kind: white-paper
field: Catalysis
date: 2026-11-15
summary: For a catalytic cycle of Eyring steps the turnover frequency is log-concave in the state free energies, so with convex barrier laws a volcano top is a certified maximum. For oxygen evolution at 1.5 V with floor barriers and OOH fixed 3.2 eV above OH, open-loop forcing gains at most 2.6945 decades.
---

For one catalytic cycle of pseudo-first-order Eyring steps, the logarithm of the turnover frequency (TOF) is concave in the free energies of the states and transition states, so for convex barrier laws a volcano top is a certified maximum with dual prices. This follows from the energetic-span formula [1, 2, 3]; Kaneko posted the Hessian for steps in series and for Volmer–Tafel kinetics on 2026-10-15 [4]. The 0.37 V overpotential limit of oxygen evolution, $(3.2-2.46)/2$ V, is in Man et al. [5], who credit Koper [8]. For oxygen evolution at 1.5 V with zero-barrier floor rate laws, open-loop forcing and independent sites, no protocol gains more than 2.6945 decades over the best static catalyst with $\mathrm{OOH}^*$ fixed 3.2 eV above $\mathrm{OH}^*$. That forcing can beat Sabatier limits is known [6, 7].

## The question

A volcano plot says the best catalyst binds its intermediates neither too strongly nor too weakly, and scaling relations tie them to one descriptor. For oxygen evolution $\mathrm{OOH}^*$ sits about 3.2 eV above $\mathrm{OH}^*$, against 2.46 eV ideally, so the lowest overpotential is 0.37 V [5, 8]. We ask whether volcano tops can be certified and how far driving in time can lift them.

## What we found

Step $i$ takes state $i$ to $i+1$ of a ring of $n$ states through a transition state of free energy $T_i$. State $j$ has free energy $I_j$, a step has $\Delta G_i=I_{i+1}-I_i$, one turnover has $\Delta G_r<0$, and $I_n=I_0+\Delta G_r$. Activities are fixed; free energies may depend affinely on the electrode potential $U$. Eyring rate constants are $\nu e^{-(T_i-I_i)/kT}$ forward and $\nu e^{-(T_i-I_{i+1})/kT}$ back, with $\nu=kT/h=6.2124\times10^{12}\ \mathrm{s^{-1}}$ ($h$ Planck's constant, $kT=0.025692579$ eV at 298.15 K). With $\mathbf 1[\cdot]$ the indicator, the TOF per site is exactly [1, 2, 3]

$$
\mathrm{TOF}=\nu\,\frac{1-e^{\Delta G_r/kT}}{\sum_{i,j=0}^{n-1}e^{a_{ij}}},\qquad a_{ij}=\frac{T_i-I_j+\Delta G_r\,\mathbf 1[j>i]}{kT}.
$$

> **Theorem 1 (Log-concavity).** At fixed $\Delta G_r<0$, $\ln\mathrm{TOF}$ is concave in $(T,I)$ and non-increasing in each $T_i$, with Hessian $-\mathrm{Cov}_w(u)/(kT)^2$ for $w_{ij}\propto e^{a_{ij}}$, $u_{ij}\in\mathbb R^{2n}$ equal to $1$ at $T_i$, $-1$ at $I_j$ and $0$ elsewhere, and a two-dimensional kernel (common shifts of all $T_i$, of all $I_j$). Concavity survives reversible dead-end blocks without a driven cycle (one with non-zero net free-energy change), in the energies of the cycle and of the block states.

> **Theorem 2 (Volcanoes).** Let each $T_i$ be convex in $(I_0,\dots,I_n)$, as for Brønsted–Evans–Polanyi lines of any slope, Marcus laws $(\lambda+s)^2/4\lambda$ of reorganisation energy $\lambda$ and step free energy $s$, and their maxima, and let $I_j$ and $\Delta G_r$ be affine in descriptors $x$, which may include $U$. Then $\ln\mathrm{TOF}$ is concave in $x$ where $\Delta G_r<0$, so local maxima are global and superlevel sets convex.

The floor law $T_i=\max(I_i,I_{i+1})$ is barrierless: every rate is at most $\nu$, and any law with $T_i\ge\max(I_i,I_{i+1})$ has TOF below $\nu/n$, or $\nu/4=10^{12.1912}\ \mathrm{s^{-1}}$ for four steps. For oxygen evolution, with $U$ in volts against the reversible hydrogen electrode and $G_{\rm OH}$, $G_{\rm O}$, $G_{\rm OOH}$ the free energies of $\mathrm{OH}^*$, $\mathrm{O}^*$ and $\mathrm{OOH}^*$ relative to water, the steps in eV are

$$
\begin{aligned}
\Delta G_1&=G_{\rm OH}-U, & \Delta G_2&=G_{\rm O}-G_{\rm OH}-U,\\
\Delta G_3&=G_{\rm OOH}-G_{\rm O}-U, & \Delta G_4&=4.92-G_{\rm OOH}-U,
\end{aligned}
$$

so $\Delta G_r=4.92-4U$ and $U_{\rm eq}=1.23$ V. The scaling relation of [5, 10] is $G_{\rm OOH}=G_{\rm OH}+3.2\ \mathrm{eV}+\varepsilon$ with $|\varepsilon|\le\delta$. Limits below use the box $G_{\rm OH}\in[-1,3]$ eV, $G_{\rm O}\in[0,5]$ eV.

> **Proposition (Certificate and prices).** Over a descriptor polytope, for barrier laws that are maxima of lines (tangents if smooth) a probability vector $w$ on the $n^2$ terms and multipliers $\mu\ge0$ certify an upper bound on $\ln\mathrm{TOF}$; at the optimum a certificate with no gap exists, and the marginals of $w$ are the degrees of TOF control. Divided by $\ln10$, the multipliers are prices in decades per eV, at most $S/(kT\ln10)$ with $S$ the largest shift of any $kT\,a_{ij}$ per eV of the constraint: 16.90 when every slope $\partial T_i/\partial I_j$ lies in $[0,1]$ and a constraint moves one intermediate by 1 eV. With Marcus barriers of reorganisation energy 0.1 eV at 1.5 V, the price of the exact $\mathrm{OOH}^*/\mathrm{OH}^*$ offset is 31.7.

> **Proposition (Scaling-limited overpotential).** Over all catalysts obeying the relation above, the least overpotential at which all four steps can be downhill ($U-U_{\rm eq}$ for oxygen evolution, $U_{\rm eq}-U$ for reduction) is $0.37-\delta/2$ V, with dual price exactly $\tfrac12$ V per eV. Here $\delta=0.2$ eV is one standard deviation of the scatter in [5] (68 % of points); $\delta=0.4$ eV (95 %) gives 0.17 V.

The offset, its lower limit and the factor $\tfrac12$ are in Man et al. [5], who credit Koper [8] and cite Rossmeisl et al. [28] for the offset on metals.

| Barrier law | $c=3.0$ | $c=3.2$ | $c=3.4$ | Span, decades |
|---|---|---|---|---|
| Thermodynamic floor | 11.9482 | 9.0990 | 5.7306 | 6.2 |
| Linear, $E_0=0.3$ eV, $\beta=\tfrac12$ | 7.2707 | 5.7263 | 4.0317 | 3.2 |
| Marcus, $\lambda=1$ eV | 8.1143 | 6.4108 | 4.2333 | 3.9 |
Table: Certified maximum $\log_{10}$TOF (s⁻¹) per site at 1.5 V, with $G_{\rm OOH}=G_{\rm OH}+c$ eV exactly and linear law $\max(0,s,E_0+\beta s)$. Span is the $c=3.0$ value minus the $c=3.4$ value; $c=3.0$ also bounds catalysts within $\pm0.2$ eV of 3.2.

> **Theorem 3 (Dynamic ceiling).** Let a ring of $n$ states have positive rate constants in a compact set $K$ chosen by a protocol, any measurable function of time, and let TOF be the limsup of the mean turnover rate per site. (i) If the forward rate of step $j$ never exceeds $\bar k_j$, then $\mathrm{TOF}\le(\sum_j1/\bar k_j)^{-1}$, also if each site's rates depend on its own state; for Eyring rates with barriers $\ge0$ at every instant this is $\nu/n$, approached as reverse rates vanish. (ii) For $n=2$ and one protocol for all sites, $\mathrm{TOF}\le F^*=\max_{\bar k\in\mathrm{conv}K}\mathrm{TOF}_{\rm static}(\bar k)$, which fast chattering approaches.

> **Result (Oxygen-evolution cap).** Take the four-step cycle at 1.5 V with $G_{\rm OOH}=G_{\rm OH}+3.2$ eV exactly, floor barriers, independent sites, and open-loop protocols choosing $G_{\rm OH}$ and $G_{\rm O}$ in the box as any function of time. Then $0.09999\,\nu\le\sup\mathrm{TOF}\le0.10005\,\nu$, against a static optimum of $2.0218\times10^{-4}\,\nu=10^{9.099}\ \mathrm{s^{-1}}$ in the box. No protocol gains more than 2.6945 decades (a factor 494.9). The lower bound is an explicit two-phase chattering protocol of period $10^{-4}/\nu$, which has TOF $0.0999999999943\,\nu$.

Kaneko gave the Hessian of the Volmer–Tafel log rate in the log maximum step rates [4]. We show that $\ln\mathrm{TOF}$ is concave in the binding free energy $\Delta G_{\rm H}$ for the full mean-field Volmer–Tafel steady state with one adsorbate, reversible steps and convex laws (proved), and for a two-state cycle with repulsive Frumkin interaction $\omega\theta$ ($\omega\ge0$, $\theta$ the coverage) and convex laws of slope in $[0,1]$ (computer-assisted proof). It fails for two parallel pathways (proved) and, in small networks, for a second driven cycle (computed).

## Why it is true

Closed form. Unrolling $p_i=(J+k^-_ip_{i+1})/k^+_i$ ($p_i$ the population of state $i$, $J$ the net flux, $k^\pm_i$ the rate constants of step $i$) writes each population as $J$ times a tree sum, and normalisation fixes $J$. So $\ln\mathrm{TOF}$ is a constant minus a log-sum-exp of functions affine in $(T,I)$, the cumulant generating function of a Gibbs distribution, whose Hessian is a covariance; concave and non-increasing in $T$, composed with convex $T(x)$ and affine $I(x)$, it stays concave, as does the prefactor $\ln(1-e^{\Delta G_r/kT})$ in $\Delta G_r$.

Certificate. The Gibbs inequality $\ln\sum_{ij}e^{a_{ij}}\ge w\cdot a+H(w)$, with $H$ the entropy, bounds $\ln\mathrm{TOF}$ for every probability vector $w$; $\mu$ are the dual variables of the linear program $\min w\cdot a$ over the polytope, and $w_{ij}\propto e^{a_{ij}}$ closes the gap at the optimum. The two middle steps sum to $3.2+\varepsilon-2U$ eV, so all four are downhill only if $U\ge(3.2+\varepsilon)/2$ V, attained with $\Delta G_2=\Delta G_3=0$; for reduction the outer steps sum to $1.72-\varepsilon-2U$ eV, which must be non-negative, so $U\le2.46-(3.2+\varepsilon)/2$ V.

Theorem 3. For (i), with $g=(\sum_j1/\bar k_j)^{-1}$ and $\phi_{j+1}-\phi_j=g/\bar k_j-1/n$ on the ring, Dynkin's formula bounds the expected gain of $N_t/n+\phi(X_t)$ by $g$ per unit time, with $N_t$ the net forward steps of a site in state $X_t$. For the cap, a quadratic $V$ of the populations satisfies $J_0+\nabla V\cdot\dot p\le0.10005\,\nu$ on the box, ($J_0$ the flux through step 0, $\dot p$ the time derivative of the populations), proved by a degree-2 Bernstein expansion on the simplex of populations in ball arithmetic.

## How it was checked

The closed form matches exact rational solutions of the master equation on 1,400 random cycles and separately written code on 266. Concavity held on 1.4 million random convex instances and fails for non-convex laws. A standalone program checks 208 certificates in exact rationals with interval arithmetic and a direct master-equation solve for the lower bound; 64 are for hydrogen, carbon dioxide and nitrogen families not reported here, and gaps are at most $6\times10^{-5}$ decades. A separately written checker accepted all 208, though both implement the same weak-duality inequality; mutations of 8 certificates were rejected 144 of 144 and 104 of 104 times. The theorems were re-derived by hand in a separate review, except the price bound by $S$; a separately written program proved $0.10005\,\nu$ in ball arithmetic. The proofs have not been peer reviewed.

## What it does not show

The models are one cycle of pseudo-first-order steps at fixed activities, without solvation, field or entropy corrections. Barrier laws are generic forms with our parameters, not fitted. The 3.2 eV offset is a DFT value from one functional (RPBE); a functional-independent relation differs by 0.1 eV [10].

The cap is for the floor law, the stated box and independent sites. With linear barriers $\max(0,s,0.3+s/2)$ eV in the same box the static optimum is $10^{5.7263}\ \mathrm{s^{-1}}$ and chattering again reaches $0.1\,\nu$, a gain of at least 6.06 decades, so 2.6945 is the floor law's, not a general bound. A modulation of $\pm0.1$ eV on two binding energies already reaches 2.689 decades (a lower bound from a search), at periods of $1/\nu$ or shorter, about 0.16 ps. The exact-relation static optimum is 3.09 decades below $\nu/4$; the 68 % band already gains 2.85 of them. The cap concerns the model (Eyring rates at the instantaneous free energies), not an experiment. Part (ii) of Theorem 3 fails for state feedback and for $n=3$, where rotating through three steps, one open at a time, beats $F^*$ by 9.3 %.

## Earlier and parallel work

The closed form is the energetic-span model of Kozuch and Shaik [1, 2], after Christiansen [12], as printed by Cohen and Vlachos [3]. Kaneko gave the Hessian of the log rate in the log step rates for steps in series (minus a covariance), parallel channels (positive semidefinite) and the Volmer–Tafel scheme [4]. Theorem 1 is a one-line corollary of the closed form; we add the concavity of the exact span form in the energies, the kernel, descriptors and potential, and reversible Volmer–Tafel steps. Wodrich et al. build TOF volcanoes from scaling relations and the span model [13], Chen et al. and Razzaq and Exner use the span as a descriptor [14, 15], and for the rate laws of Liebermeister and Noor enzyme demand and its logarithm are convex in log kinetic constants and concentrations [16]. Man et al. credit Koper [8] for the offset and its lower limit and give $(3.2-2.46)/2$ V less 0.2 V at two standard deviations [5]; Govindarajan et al. reach 0.17 V likewise [11], and Christensen et al. give $0.4\pm0.1$ V [10]. We add the linear program with its exact dual and the kinetic limits. Oo posted the 0.37 V floor with a log-sum-exp smoothing and no closed form or concavity statement for the TOF on 2026-11-03 [17].

Ardagh et al. formulated catalytic resonance, forced oscillation of binding energies [6, 9]. Gathmann et al. [18] and Canavan et al. [19] read the maximum TOF from the sides of a Sabatier volcano. Foley and Razdan showed that quasi-static operation can subvert Sabatier limits [7] and that the irreversible two-step sequence has no finite optimal frequency [20]; Baz et al. found no gain over the maximum steady-state rate for faradaic reactions in series [21]. Zhang and Lu showed that rapid oscillation reaches any rate matrix in the convex hull of the stationary locus [22], Zhang, Du and Lu treated fast temperature oscillation [23], and Bogod and Rahav found that optimal driving of a two-site stochastic pump switches infinitely fast [24]. Horn and Lin [25] studied periodic against steady operation, and Angeli, Amrit and Rawlings [26] and Dong and Angeli [27] gave storage-function bounds. Theorem 3 (i) is elementary and the rest are instances of these tools; we add the $n=2$ theorem for arbitrary descriptor dependence, the contrast with feedback and $n=3$, and the certified bracket. Searches of Zenodo, arXiv, Crossref and the web to 2026-11-15 found no earlier concavity statement for the span form in the energies, for reversible Volmer–Tafel steps with descriptor dependence or for the Frumkin cycle, and no earlier proof of a protocol-independent TOF bound for a catalytic cycle.

## References
1. S. Kozuch and S. Shaik, "A Combined Kinetic-Quantum Mechanical Model for Assessment of Catalytic Cycles: Application to Cross-Coupling and Heck Reactions", J. Am. Chem. Soc. 128, 3355 (2006). https://doi.org/10.1021/ja0559146
2. S. Kozuch and S. Shaik, "How to Conceptualize Catalytic Cycles? The Energetic Span Model", Acc. Chem. Res. 44, 101 (2011). https://doi.org/10.1021/ar1000956
3. M. Cohen and D. G. Vlachos, "Modified Energy Span Analysis Reveals Heterogeneous Catalytic Kinetics", Ind. Eng. Chem. Res. 61, 5117 (2022). https://doi.org/10.1021/acs.iecr.2c00390
4. S. Kaneko, "What does Tafel curvature measure? A signed composition law for electrochemical kinetics", Zenodo, posted 2026-10-15. https://doi.org/10.5281/zenodo.23357831
5. I. C. Man, H.-Y. Su, F. Calle-Vallejo, H. A. Hansen, J. I. Martínez, N. G. Inoglu, J. Kitchin, T. F. Jaramillo, J. K. Nørskov and J. Rossmeisl, "Universality in Oxygen Evolution Electrocatalysis on Oxide Surfaces", ChemCatChem 3, 1159 (2011). https://doi.org/10.1002/cctc.201000397
6. M. A. Ardagh, T. Birol, Q. Zhang, O. A. Abdelrahman and P. J. Dauenhauer, "Catalytic resonance theory: superVolcanoes, catalytic molecular pumps, and oscillatory steady state", Catal. Sci. Technol. 9, 5058 (2019). https://doi.org/10.1039/c9cy01543d
7. B. L. Foley and N. K. Razdan, "Dynamic Catalysis Fundamentals: II. Consequences of scaling relationships on mechanisms and kinetics", ChemRxiv (2022). https://doi.org/10.26434/chemrxiv-2022-sgc5w
8. M. T. M. Koper, "Thermodynamic theory of multi-electron transfer reactions: Implications for electrocatalysis", J. Electroanal. Chem. 660, 254 (2011). https://doi.org/10.1016/j.jelechem.2010.10.004
9. M. A. Ardagh, O. A. Abdelrahman and P. J. Dauenhauer, "Principles of Dynamic Heterogeneous Catalysis: Surface Resonance and Turnover Frequency Response", ACS Catal. 9, 6929 (2019). https://doi.org/10.1021/acscatal.9b01606
10. R. Christensen, H. A. Hansen, C. F. Dickens, J. K. Nørskov and T. Vegge, "Functional Independent Scaling Relation for ORR/OER Catalysts", J. Phys. Chem. C 120, 24910 (2016). https://doi.org/10.1021/acs.jpcc.6b09141
11. N. Govindarajan, M. T. M. Koper, E. J. Meijer and F. Calle-Vallejo, "Outlining the Scaling-Based and Scaling-Free Optimization of Electrocatalysts", ACS Catal. 9, 4218 (2019). https://doi.org/10.1021/acscatal.9b00532
12. J. A. Christiansen, "The Elucidation of Reaction Mechanisms by the Method of Intermediates in Quasi-Stationary Concentrations", Adv. Catal. 5, 311 (1953). https://doi.org/10.1016/s0360-0564(08)60644-6
13. M. D. Wodrich, B. Sawatlon, E. Solel, S. Kozuch and C. Corminboeuf, "Activity-Based Screening of Homogeneous Catalysts through the Rapid Assessment of Theoretically Derived Turnover Frequencies", ACS Catal. 9, 5716 (2019). https://doi.org/10.1021/acscatal.9b00717
14. J. Chen, Y. Chen, P. Li, Z. Wen and S. Chen, "Energetic Span as a Rate-Determining Term for Electrocatalytic Volcanos", ACS Catal. 8, 10590 (2018). https://doi.org/10.1021/acscatal.8b03008
15. S. Razzaq and K. S. Exner, "Materials Screening by the Descriptor Gmax(η): The Free-Energy Span Model in Electrocatalysis", ACS Catal. 13, 1740 (2023). https://doi.org/10.1021/acscatal.2c03997
16. W. Liebermeister and E. Noor, "Model Balancing: A Search for In-Vivo Kinetic Constants and Consistent Metabolic States", Metabolites 11, 749 (2021). https://doi.org/10.3390/metabo11110749
17. M. Oo, "Breaking the Sabatier Scaling Wall: Autonomous Synthesis of Acid-Stable Cooperative Oxygen Evolution Catalysts via Secondary-Sphere Dimensional Lifts", Zenodo, posted 2026-11-03. https://doi.org/10.5281/zenodo.23921760
18. S. R. Gathmann, M. A. Ardagh and P. J. Dauenhauer, "Catalytic resonance theory: Negative dynamic surfaces for programmable catalysts", Chem Catalysis 2, 140 (2022). https://doi.org/10.1016/j.checat.2021.12.006
19. J. R. Canavan, O. A. Abdelrahman, B. L. Foley and P. J. Dauenhauer, "Catalytic Resonance Theory: Experimental and Kinetic Interpretation of Programmable Catalysis", ACS Catal. 15, 17024 (2025). https://doi.org/10.1021/acscatal.5c03878
20. B. L. Foley and N. K. Razdan, "Clarifying mechanisms and kinetics of programmable catalysis", iScience 27, 109543 (2024). https://doi.org/10.1016/j.isci.2024.109543
21. A. Baz, M. P. Lyons and A. Holewinski, "Dynamic electrocatalysis: Examining resonant catalytic rate enhancement under oscillating electrochemical potential", Chem Catalysis 2, 3497 (2022). https://doi.org/10.1016/j.checat.2022.09.002
22. Z. Zhang and Z. Lu, "Nonequilibrium Theoretical Framework and Universal Design Principles of Oscillation-Driven Catalysis", J. Phys. Chem. Lett. 14, 7541 (2023). https://doi.org/10.1021/acs.jpclett.3c01677
23. Z. Zhang, V. Du and Z. Lu, "Energy landscape design principle for optimal energy harnessing by catalytic molecular machines", Phys. Rev. E 107, L012102 (2023), arXiv:2205.11647. https://arxiv.org/abs/2205.11647
24. I. Bogod and S. Rahav, "Singular optimal driving cycles of stochastic pumps", arXiv:2205.14610 (2022). https://arxiv.org/abs/2205.14610
25. F. J. M. Horn and R. C. Lin, "Periodic Processes: A Variational Approach", Ind. Eng. Chem. Process Des. Dev. 6, 21 (1967). https://doi.org/10.1021/i260021a005
26. D. Angeli, R. Amrit and J. B. Rawlings, "On Average Performance and Stability of Economic Model Predictive Control", IEEE Trans. Automat. Control 57, 1615 (2012). https://doi.org/10.1109/TAC.2011.2179349
27. Z. Dong and D. Angeli, "Analysis of economic model predictive control with terminal penalty functions on generalized optimal regimes of operation", Int. J. Robust Nonlinear Control 28, 4790 (2018). https://doi.org/10.1002/rnc.4283
28. J. Rossmeisl, A. Logadottir and J. K. Nørskov, "Electrolysis of water on (oxidized) metal surfaces", Chem. Phys. 319, 178 (2005), as cited in [5]. https://doi.org/10.1016/j.chemphys.2005.05.038
