---
title: Ground states of the 2D dipolar Ising model and of dipolar spin ice
slug: dipolar-magnet-ground-states
kind: white-paper
field: Long-range order
date: 2026-11-15
summary: We prove which phase is a ground state of the 2D dipolar Ising model for every coupling in [0, 3.95] except a window of width 2.8×10^-6, and that the MHG state is the unique translation-invariant ground state of tin-foil Ewald dipolar spin ice with nearest-neighbour exchange only for J1/D ≤ 9/2.
---

We prove which phase is a ground state of the Ising model on $\mathbb Z^2$ with nearest-neighbour ferromagnetic coupling $J$ and an antiferromagnetic $1/r^3$ tail, among all configurations, for every $J\in[0,3.95]$ except one window of width $2.8\times10^{-6}$; inside each interval it is the only translation-invariant one. The phases are the Néel state, checkerboards and stripes; ten couplings where two phases tie are certified to at least 17 decimals. We prove that the Melko–den Hertog–Gingras (MHG) state is the unique translation-invariant ground state of tin-foil Ewald-summed dipolar spin ice with nearest-neighbour exchange only, for $J_1/D\le9/2$. Numerical studies had located these phases [1, 3, 8, 10, 12, 18]; we know of no earlier proof, apart from the Néel state at $J=0$.

## The question

The 2D model has spins $s_x=\pm1$ on $\mathbb Z^2$, a ferromagnetic nearest-neighbour coupling and an antiferromagnetic tail $|r|^{-p}$. For $p=3$, the dipolar case, it describes an ultrathin magnetic film with out-of-plane anisotropy [18]. The energy is

$$
H=\sum_{x<y}W(x-y)\,s_xs_y,\qquad W(r)=|r|^{-3}-J\,[\,|r|=1\,],
$$

where $J\ge0$ is the ratio $\delta$ of Fonseca et al. [2], whose dipolar unit sums over all distinct pairs. Giuliani and Seiringer proved stripes just below the ferromagnetic transition for $p>4$ and wrote in 2015 that the dipolar case had "eluded any rigorous treatment so far" [4]. Fermi and Giuliani proved the stripe conjecture for $J\ge J_0$, with $J_0$ unspecified, among periodic states with straight domain walls [5].

Dipolar spin ice, the model used for Dy$_2$Ti$_2$O$_7$ and Ho$_2$Ti$_2$O$_7$ [3, 19], has Ising spins $\sigma_i=\pm1$ on the pyrochlore lattice along local $\langle111\rangle$ axes. With $\mathbf S_i=\sigma_i\hat z_i$, $\hat z_i$ the axis, and $r_{nn}$ the nearest-neighbour distance, the energy is

$$
H=D\,r_{nn}^3\sum_{i<j}\Big[\frac{\mathbf S_i\!\cdot\!\mathbf S_j}{r_{ij}^3}-\frac{3(\mathbf S_i\!\cdot\!\mathbf r_{ij})(\mathbf S_j\!\cdot\!\mathbf r_{ij})}{r_{ij}^5}\Big]+\sum_{i<j}J_{ij}\,\mathbf S_i\!\cdot\!\mathbf S_j .
$$

Here $D$ is the dipolar strength, $J_{ij}$ is $J_1$ or $J_2$ for first or second neighbours, and for third neighbours $J_{3t}$ if the midpoint of the pair is a lattice site and $J_{3h}$ if not. $J_1>0$ favours all-in-all-out (AIAO). The nearest-neighbour couplings $J_{nn}$ and $D_{nn}$ of [3] obey $D_{nn}=5D/3$ and $J_{nn}/D_{nn}=-J_1/(5D)$; for Dy$_2$Ti$_2$O$_7$, $J_{nn}=-1.24$ K and $D_{nn}=2.35$ K give $D=1.41$ K and $J_1/D=2.638\approx66/25$. Energies are per spin, the dipolar sum being taken by Ewald's method with metallic (tin-foil) boundary. Monte Carlo found the MHG state, a zero-moment state with ordering vector $(0,0,2\pi/a)$ [3]; that it is the ground state had rested on numerics [10, 12].

## What we found

A periodic state is a ground state if no configuration of $\mathbb Z^2$ has lower energy per site $e$ along any sequence of boxes. Images are translates, lattice rotations and reflections, and spin flips. The checkerboard $(k\times1)$ is $s(x,y)=\mathrm{sq}_k(x)(-1)^y$, $\mathrm{sq}_k$ the square wave of period $2k$, so $(1\times1)$ is the Néel state; stripe $h$ is $\mathrm{sq}_h(y)$.

| Name | Phases | $J^*$ | Images |
|---|---|---|---|
| $c_1$ | Néel and $(2\times1)$ | 0.4152030558751828190 | 10 |
| $c_2$ | $(2\times1)$ and $(3\times1)$ | 0.43941990286594504453 | 20 |
| $c_3$ | $(3\times1)$ and $(4\times1)$ | 0.44027907033310511597 | 28 |
| $c_4$ | $(4\times1)$ and $(5\times1)$ | 0.44031096003405425963 | 36 |
| $c_5$ | $(5\times1)$ and $(6\times1)$ | 0.44031218581380430686 | 44, SAT |
| $s_1$ | stripes 1 and 2 | 1.2585385182612923583 | 12 |
| $s_2$ | stripes 2 and 3 | 2.172454495378555558 | 20 |
| $s_3$ | stripes 3 and 4 | 2.81449513817075321 | 28 |
| $s_4$ | stripes 4 and 5 | 3.3042419453427474952 | 36 |
| $s_5$ | stripes 5 and 6 | 3.69902470137631926895 | 44, SAT |
Table: Couplings where two phases tie, with the images of both (SAT: exhaustive SAT enumeration without proof log); every digit is certified.

> **Theorem 1 (Ground states of the 2D model).** Let $c_0=0$ and $s_6=3.95$. (a) For $k=1,\dots,5$ the checkerboard $(k\times1)$ is a ground state for $c_{k-1}\le J\le c_k$, and $(6\times1)$ is one at $J=c_5$. (b) Stripe 1 is a ground state for $0.440315\le J\le s_1$, and stripe $h$ for $s_{h-1}\le J\le s_h$, $h=2,\dots,6$. (c) In the interior of each interval of (a) and (b), the translation-invariant ground states are exactly the mixtures of the images of that phase. (d) At $c_1,\dots,c_5$ and $s_1,\dots,s_5$ both neighbouring phases are ground states, $J$ is the crossing of their energy lines, and the translation-invariant ground states are the mixtures of their images; for $c_5$ and $s_5$ the last assertion rests on the SAT enumeration.


> **Theorem 2 (MHG ground state).** For $J_2=J_3=0$ and every $J_1/D\le9/2$, the MHG state is the unique translation-invariant ground state, up to its 12 images. The same holds for $J_1/D\le9/2$ with $-1/25\le J_2/D\le1/125$, $|J_{3t}-J_{3h}|\le0.002D$ and $0\le J_{3t}+J_{3h}\le0.06D$. At $J_2=J_3=0$ the energy is $e_0=\tfrac12(a_X+\tfrac23J_1)$ with $a_X=-3.89513176378013880505\,D$, enclosed to $10^{-26}$, the dipolar part of the eigenvalue $\lambda_X=a_X+\tfrac23J_1$ defined below. At $J_1/D=66/25$, the rounded Dy$_2$Ti$_2$O$_7$ ratio of the nearest-neighbour model, $e_0=-1.0675658818900694025\,D=-1.5053$ K.

> **Proposition 3 (AIAO crossing).** For $J_2=J_3=0$, $e_{\rm MHG}-e_{\rm AIAO}=\tfrac43(J_1-J_1^*)$ with $J_1^*=4.52708544914207102\,D$, that is $J_{nn}/D_{nn}=-0.905417089828$. For $J_1>J_1^*$ the AIAO state is lower than every MHG state.


> **Proposition 4 (Double-chain comparison state).** Let S be one fixed ice-rule configuration of 64 spins on a $2\times2\times1$ block of cubic cells, with Fourier amplitudes at $2\pi(\tfrac12,\tfrac12,0)/a$ and its images; it is not published. Then $e_S-e_{\rm MHG}=c+\tfrac23J_2+2J_{3t}$ in units of $D$, with $c=0.0413995194175\pm9\times10^{-14}$, independent of $J_1$ and $J_{3h}$. Where $J_{3t}+J_2/3+0.0207D<0$, S is below MHG, so MHG is not a ground state there.


> **Result 5 (Energy window).** At $(J_1,J_2,J_{3t},J_{3h})/D=(2.579,-0.106,0.0189,0.0189)$, rounded from Yavors'kii et al. with $D=1.3224$ K [14] (not 1.41 K), the lowest energy per spin $e_{\min}$ of a translation-invariant state obeys $-1.0617825485567\,D\le e_{\min}\le-1.0550325485567\,D$ to $10^{-13}$. The width is $0.00675\,D$, or 8.9 mK per spin; the upper end is the MHG energy. The ground state there is undecided: S is 11.3 mK per spin above MHG, and no ice-rule state in a cell of up to 32 spins is lower by more than $10^{-9}D$ (Exhaustive computation).

## Why it is true

**Dual.** Translation-invariant (TI) states suffice, since $\sum_r|W(r)|<\infty$. A TI state has correlations $C(r)=\int e^{ik\cdot r}d\sigma(k)$ with $\sigma\ge0$ of mass 1 on the torus. For real $a_o$, one per class $o$ of displacements under the lattice symmetries, set $f=\hat W-\sum_oa_oS_o$, with $\hat W$ and $S_o$ the cosine sums of $W$ and of $o$. Then $e=\tfrac12\int f\,d\sigma+\tfrac12\sum_oN_oa_oC_o$, with $N_o=|o|$ and $C_o$ the correlation on $o$. A slack $\Lambda\ge0$ on all sign patterns of a small window gives $\sum_oN_oa_oC_o\ge y_0$. If $f\ge\lambda$ then $e\ge(\lambda+y_0)/2$ for every TI state, with equality for a periodic state when $\Lambda=0$ on the windows of its images and $f=\lambda$ at its stars, the atoms of its spectrum.

**Crossing and uniqueness.** Two phases share one dual when $f=\lambda$ with zero gradient at all their stars: a square linear system in the dual parameters and $J$. Both energies then equal $(\lambda+y_0)/2$ at the solved $J$, the crossing of their energy lines. The cover proves $f>\lambda$ off the stars, so equality forces $\sigma$ onto the stars and $\Lambda=0$ on all windows of the images, and a finite enumeration returns the images. Energies are affine in $J$, so a ground state at two couplings is one between them, and the only TI one inside if the enumeration holds at one end.

**Spin ice.** The energy per spin is $\tfrac18\int\operatorname{tr}[M(k)\tilde\Sigma(dk)]$ with $\tilde\Sigma\succeq0$ of trace 4 and $M$ a real symmetric $4\times4$ Bloch matrix. Hence the Luttinger–Tisza (LT) bound [11]: if $M(k)-\lambda\succeq0$ for all $k$ then $e\ge\lambda/2$, with equality only on the kernels. Let $\lambda_X$ be the eigenvalue at $X=(2\pi,0,0)$ on $E=\mathrm{span}\{e_0-e_1,e_2-e_3\}$. Of the $2^{16}$ Ising states of the 16-site cubic cell, 12 have Fourier amplitudes in the kernels at $X$ and its images and zero at the origin; they obey the ice rule (two spins in, two out of every tetrahedron) and attain $\lambda_X/2$. So the bound is tight, as [10] observed numerically, and an atomic spectrum forces periodicity and uniqueness. The computer-assisted step is $M(k)-\lambda_XI\succeq0$ on the whole Brillouin zone: Ewald sums in ball arithmetic with explicit tails, a cover by boxes closed by a second-order matrix lemma (the box lemma), and a separate lemma at $X$, where the minimum is degenerate. Lowering $J_1$ raises $M-\lambda_XI$, since $\tfrac23I-S_1(k)\succeq0$ for the exchange matrix $S_1$, with equality on $E$ at $X$; so $J_1=9/2$ covers all smaller $J_1$, and affinity makes the prism cost its eight vertices.

## How it was checked

Theorems 1 and 2 and the lower end of Result 5 are computer-assisted proofs, Propositions 3 and 4 certified computations, the enumerations exhaustive computations. The 2D checker evaluates the dual slack on all sign patterns of the small window, exactly on the windows of the two phases and in ball arithmetic elsewhere (for the larger windows after a floating-point screen with a rigorous error bound), and the star system and the cover of $f-\lambda$ in ball arithmetic. A second program, written from the proof without the checker's code, checked the slack, the star system and positivity with its own cover, which for the four staircase couplings uses floating point with an explicit margin on one region. Bessel and Hurwitz-zeta sums for the energy lines reproduced all ten couplings. A second reader re-derived the lemmas without finding a gap; the second program shares the statement of the method. Tampered certificates, and certificates re-used past a crossing, were rejected, except modifications that are valid alternative duals. The enumerations were repeated with CP-SAT and, at $c_2$ to $c_5$ and $s_5$, a second SAT solver. Shared trust is python-flint, mpmath and the solvers.

For spin ice the cover was re-run in full for $J_2=J_3=0$, the prism and the window, with code written from the proof. A 45-digit Ewald evaluation reproduced $a_X$ and $J_1^*$ to every printed digit, and a damped direct sum without Ewald splitting reproduced $a_X$ to $6\times10^{-7}$. Separately written floating-point code reproduced $c$ to 13 digits. Both covers follow the proof's route, so a flaw in the box lemma would be shared. The proofs have not been peer reviewed.

## What it does not show

The 2D results are for classical Ising spins at zero temperature and field, not for films. Uniqueness is among TI states only. Open are the window $c_5<J<0.440315$ and $J>3.95$, except that stripe 7 is certified as a ground state on $[4.15,4.2]$ and stripe 8 at $J=4.45$.

For spin ice the energy is the tin-foil Ewald energy of TI states; samples of definite shape are not treated for states with net moment, which MHG and AIAO lack. Temperature, quantum effects and real materials are not addressed. The interval $9/2<J_1/D\le J_1^*$ has no certificate. The curvature of the lowest LT band at $X$ vanishes at $J_2/D\approx-0.0563$ and $+0.0226$ for $J_1/D=66/25$ and $J_{3t}=J_{3h}$ (numerical); the proof stops near $-0.055$ on the negative side. S is one configuration, identified with the double-chain state of [13] by propagation vector only, and not shown to be a ground state anywhere; identifying $J_{3t}$ with $J_{3a}$ of [13] is an inference.

## Earlier and parallel work

**2D model.** At $J=0$ the Néel state is known from reflection positivity [6, 7]. Giuliani, Lebowitz and Lieb [6] proved matching large-$J$ energy asymptotics for $2<p\le3$, without the ground state. MacIsaac et al. [8] found stripe ground states numerically; Cannas et al. [9] quote the transitions between stripes 1 and 2, 2 and 3, 3 and 4 near 1.26, 2.2 and 2.8, in the convention of [2], and a Néel-to-stripe threshold near 0.425, inside our $(2\times1)$ interval; Pighin and Cannas [18] repeat it and mark the stripe crossings in a figure without printed values. Rastelli, Regina and Tassi [1] reported the checkerboards $\langle1,n\rangle$, our $(n\times1)$. Fonseca, Rizzi and Alves [2] give the ranges $0<\delta<0.4152$ (Néel), $0.4152<\delta<0.4403$, $0.4403<\delta<1.2585$ (stripe 1) and $1.2585<\delta<2.1724$ (stripe 2) with data from [1]; 0.4403 appears earlier in [20]. Our $c_1$, $s_1$ and $s_2$ agree with the digits printed in [2]. We found no printed value for $c_2,\dots,c_5$, $s_4$ or $s_5$, but read only the abstract of [1] and could not read [8], [17], the 1995 Booth et al. letter cited in [9] or the 2006 Rastelli et al. paper cited in [2]; they may have some. We add the proof that each phase is a ground state among all configurations, the intervals of Theorem 1 and the certified digits.

**Spin ice.** Den Hertog and Gingras [19] put the boundary to AIAO at about $J_{nn}/D_{nn}=-0.91$ by Monte Carlo, and Melko et al. [12] at $-0.905$ by mean-field theory and Ewald energies. Gingras and den Hertog [21] had located a weak maximum of the mean-field spectrum at $(2\pi/a)(1,0,0)$ numerically; [12] also has the soft mode with its two-in two-out eigenvectors and the mean-field order at that vector for $J_1/D<J_1^*$. McClarty et al. [10] showed numerically, for $J_1=J_3=0$ and $J_2<0$, that the lowest LT eigenvectors at $(0,0,2\pi/a)$ are Ising-realisable, so MHG is a ground state for $J_2/D>-0.057(1)$. They also have the MHG and double-chain energies, the boundary $J_2/D=-0.0621$ and $-0.0622$ on 128 and 1024 sites, and Dy$_2$Ti$_2$O$_7$ with the parameters of [14] in the MHG phase. Henelius et al. [13] gave the approximate boundary $J_{3a}+J_2/3+0.02D=0$. We add the proof, for $J_1/D\le9/2$ and on the prism including positive $J_2$, the energy and crossing to 17 or more digits, the 13-digit coefficients of Proposition 4 with $J_{3t}$ separated from $J_{3h}$, and the window. Paul and Refael [16] give a numerically solved semidefinite hierarchy of bounds that contains the LT bound; Shah et al. [15] used the LT bound with an Ising-realisable minimiser for a pyrochlore Rydberg-array model with a $1/r^6$ tail, without interval arithmetic.

Searches of arXiv, Zenodo, Crossref and the web on 9 and 15 November 2026 found no earlier proof or certified bound.

## References

1. E. Rastelli, S. Regina and A. Tassi, "Phase diagram of a square Ising model with exchange and dipole interactions: Monte Carlo simulations", Phys. Rev. B 76, 054438 (2007). https://doi.org/10.1103/PhysRevB.76.054438
2. J. S. M. Fonseca, L. G. Rizzi and N. A. Alves, "Stripe-tetragonal phase transition in the two-dimensional Ising model with dipole interactions: Partition function zeros approach", Phys. Rev. E 86, 011103 (2012), arXiv:1206.4501. https://arxiv.org/abs/1206.4501
3. R. G. Melko, B. C. den Hertog and M. J. P. Gingras, "Long-range order at low temperatures in dipolar spin ice", Phys. Rev. Lett. 87, 067203 (2001), arXiv:cond-mat/0009225. https://arxiv.org/abs/cond-mat/0009225
4. A. Giuliani and R. Seiringer, "Periodic striped ground states in Ising models with competing interactions", Commun. Math. Phys. 347, 983 (2016), arXiv:1509.00057. https://arxiv.org/abs/1509.00057
5. D. Fermi and A. Giuliani, "Periodic striped states in Ising models with dipolar interactions", in The Physics and Mathematics of Elliott Lieb, EMS Press (2022), pp. 269–293, arXiv:2203.01249. https://arxiv.org/abs/2203.01249
6. A. Giuliani, J. L. Lebowitz and E. H. Lieb, "Ising models with long-range antiferromagnetic and short-range ferromagnetic interactions", Phys. Rev. B 74, 064420 (2006), arXiv:cond-mat/0604668. https://arxiv.org/abs/cond-mat/0604668
7. A. Giuliani, J. L. Lebowitz and E. H. Lieb, "Checkerboards, stripes, and corner energies in spin models with competing interactions", Phys. Rev. B 84, 064205 (2011), arXiv:1106.0922. https://arxiv.org/abs/1106.0922
8. A. B. MacIsaac, J. P. Whitehead, M. C. Robinson and K. De'Bell, "Striped phases in two-dimensional dipolar ferromagnets", Phys. Rev. B 51, 16033 (1995). https://doi.org/10.1103/PhysRevB.51.16033
9. S. A. Cannas, P. M. Gleiser and F. A. Tamarit, "Two dimensional Ising model with long-range competing interactions", Recent Research Developments in Physics 5, 751 (2004), arXiv:cond-mat/0502403. https://arxiv.org/abs/cond-mat/0502403
10. P. A. McClarty, O. Sikora, R. Moessner, K. Penc, F. Pollmann and N. Shannon, "Chain-based order and quantum spin liquids in dipolar spin ice", Phys. Rev. B 92, 094418 (2015), arXiv:1410.0451. https://arxiv.org/abs/1410.0451
11. J. M. Luttinger and L. Tisza, "Theory of dipole interaction in crystals", Phys. Rev. 70, 954 (1946). https://doi.org/10.1103/PhysRev.70.954
12. R. G. Melko, M. Enjalran, B. C. den Hertog and M. J. P. Gingras, "Thermodynamic properties of the dipolar spin ice model", arXiv:cond-mat/0308282 (2003). The arXiv listing gives J. Phys.: Condens. Matter 16, R1277 (2004), whose Crossref record is R. G. Melko and M. J. P. Gingras, "Monte Carlo studies of the dipolar spin ice model"; we read the arXiv version only. https://arxiv.org/abs/cond-mat/0308282
13. P. Henelius, T. Lin, M. Enjalran, Z. Hao, J. G. Rau, J. Altosaar, F. Flicker, T. Yavors'kii and M. J. P. Gingras, "Refrustration and competing orders in the prototypical Dy2Ti2O7 spin ice material", Phys. Rev. B 93, 024402 (2016), arXiv:1512.05361. https://arxiv.org/abs/1512.05361
14. T. Yavors'kii, T. Fennell, M. J. P. Gingras and S. T. Bramwell, "Dy2Ti2O7 spin ice: a test case for emergent clusters in a frustrated magnet", Phys. Rev. Lett. 101, 037204 (2008), arXiv:0707.3477. https://arxiv.org/abs/0707.3477
15. J. Shah, G. Nambiar, A. V. Gorshkov and V. Galitski, "Quantum spin ice in three-dimensional Rydberg atom arrays", Phys. Rev. X 15, 011025 (2025), arXiv:2301.04657. https://arxiv.org/abs/2301.04657
16. N. Paul and G. Refael, "Bootstrapping ground state properties of classical frustrated magnets", arXiv:2605.06784 (2026). https://arxiv.org/abs/2605.06784
17. K. De'Bell, A. B. MacIsaac and J. P. Whitehead, "Dipolar effects in magnetic thin films and quasi-two-dimensional systems", Rev. Mod. Phys. 72, 225 (2000). https://doi.org/10.1103/RevModPhys.72.225
18. S. A. Pighín and S. A. Cannas, "Phase diagram of an Ising model for ultrathin magnetic films: comparing mean field and Monte Carlo predictions", Phys. Rev. B 75, 224433 (2007), arXiv:cond-mat/0611260. https://arxiv.org/abs/cond-mat/0611260
19. B. C. den Hertog and M. J. P. Gingras, "Dipolar interactions and origin of spin ice in Ising pyrochlore magnets", Phys. Rev. Lett. 84, 3430 (2000), arXiv:cond-mat/0001369. https://arxiv.org/abs/cond-mat/0001369
20. L. G. Rizzi and N. A. Alves, "Phase transitions and autocorrelation times in two-dimensional Ising model with dipole interactions", arXiv:0903.4084 (2009). https://arxiv.org/abs/0903.4084
21. M. J. P. Gingras and B. C. den Hertog, "Origin of spin-ice behavior in Ising pyrochlore magnets with long-range dipole interactions: an insight from mean-field theory", Can. J. Phys. 79, 1339 (2001), arXiv:cond-mat/0012275. https://arxiv.org/abs/cond-mat/0012275
