---
title: Lower bounds for jellium, and the limit of smearing bounds
slug: jellium-lower-bounds
kind: white-paper
field: The electron gas
date: 2026-11-15
summary: A computer-assisted proof that classical three-dimensional jellium has energy per particle at least −1.448178733, a proved ceiling of −1.44800699488 for smearing bounds, a two-dimensional bound within 6.4×10⁻²⁹ of the triangular lattice, and a Lieb–Oxford certificate, which Ye Li's improve on.
---

We prove, with computer assistance, that classical jellium (point charges in a uniform neutralising background) has energy per particle $e_{\rm Jel}\ge-1.448178733$ in three dimensions (density 1, kernel $1/|x|$). Lieb and Narnhofer proved $-\tfrac35(9\pi/2)^{1/3}\approx-1.4507927586$ in 1975 [1]. We found no published improvement, but read only the abstract of Caillol's finite-coupling bound, and not Rosenfeld's or Totsuji's, so ours may not be the first. No smearing bound of the Lieb–Narnhofer kind, a radial charge profile with non-negative Fourier transform and non-negative potential deficit, exceeds $-1.44800699488$; the body-centred cubic (bcc) crystal has $-1.4442307515$. In two dimensions such a bound comes within $6.4\times10^{-29}$ of the triangular-lattice energy, an upper bound for $e_{\rm Jel}$, after Marzo's improvement of $3.6\times10^{-6}$ [2] and unrefereed claims of the exact value [3, 4, 5]. For the Lieb–Oxford constant, Li reported lower constants first [6].

## The question

What is the lowest energy per electron of a classical electron gas at zero temperature, held by a uniform positive background? In three dimensions it equals the energy of the classical uniform electron gas [7, 8], the low-density limit against which the quantum gas is compared [9].

Jellium is $N$ point charges at $x_1,\dots,x_N$ and a uniform neutralising background of density 1 on a bounded set $\Omega$ with $|\Omega|=N$. With $v(x)=1/|x|$ in $\mathbb R^3$ and $v(x)=-\log|x|$ in $\mathbb R^2$ the energy is

$$
E_\Omega(x)=\sum_{i<j}v(x_i-x_j)-\sum_i\int_\Omega v(x_i-y)\,dy+\frac12\iint_{\Omega\times\Omega}v(x-y)\,dx\,dy .
$$

The ground-state energy per particle is $e_{\rm Jel}=\lim_{N\to\infty}\min E_{\Omega_N}/N$, with $\Omega_N=N^{1/d}\Omega_1$ and $\Omega_1$ convex of volume 1. Dividing a three-dimensional energy at density 1 by $(4\pi/3)^{1/3}=1.6119919540$ gives units of $e^2/a$, $a=(3/(4\pi\rho))^{1/3}$.

The bcc crystal gives $e_{\rm Jel}\le\zeta_{\rm BCC}(1)=-1.44423075152697\ldots$ [7, 10], where $\zeta_{\rm BCC}(s)=\sum_{x\ne0}|x|^{-s}$ runs over the bcc lattice of density 1, continued to $s=1$. Equality is conjectured. Muratov and Novaga report an unrefereed computer-assisted proof that bcc is optimal among Bravais lattices [11]. Recent work [10, 12, 13] states Lieb and Narnhofer's lower bound for jellium [1], $-\tfrac35(9\pi/2)^{1/3}\approx-1.4508$ at density 1, that is $-0.9\,e^2/a$. Their argument smears each charge into a uniform ball of volume 1, the optimal positive smearing [12].

In two dimensions the same argument gives $-(3/8+\tfrac14\log\pi)=-0.6611824715$ [12, 14, 15]. Marzo improved it by about $3.6\times10^{-6}$ (arXiv, 2025) [2], through the constant $C_{\log}=2e_{\rm Jel}+\tfrac12\log4\pi$ of the logarithmic energy on the sphere [15]. The triangular lattice of density 1 has energy per particle $e_{\rm tri}=-0.6605587142$.

## What we found

> **Theorem 1 (Smearing bound).** Let $h_1,\dots,h_p$ be real radial finite combinations of uniform shell (circle) measures with $\sum_k(\int dh_k)^2=1$. Put $u=\sum_kh_k*h_k$, $f=v*u$, $w=v-f$, and assume $w\ge0$ on $\mathbb R^d\setminus\{0\}$. Then for all $N$, all bounded $\Omega$ with $|\Omega|=N$ and all $x\in(\mathbb R^d)^N$,
> $E_\Omega(x)\ge-\tfrac N2f(0)-NW+\tfrac W2|\Omega_{-r}|$,
> where $W=\int w=c_d\langle|y|^2\rangle_u$, $c_3=2\pi/3$, $c_2=\pi/2$, $\langle g\rangle_u=\int g\,du$, $r$ is the radius of the support of $u$ and $\Omega_{-r}=\{y:B(y,r)\subset\Omega\}$. Hence $e_{\rm Jel}\ge-J(u)$ with $J(u)=\tfrac12\langle v\rangle_u+\tfrac{c_d}2\langle|y|^2\rangle_u$. For $d=2$ the conclusion $e_{\rm Jel}\ge-J(u)$ also holds for a radial Schwartz function $u$ with $\int u=1$, $\hat u\ge0$ (where $\hat u(k)=\int u(x)e^{-ik\cdot x}dx$) and $w\ge0$.

> **Result 2 (Three dimensions).** $e_{\rm Jel}\ge-1.448178733$. The certificate is $u=\sum_{1\le a,b\le100}Q_{ab}\,s_{a\delta}*s_{b\delta}/\sum_{a,b}Q_{ab}$ with $\delta=3/250$, $s_R$ the uniform probability measure on the sphere of radius $R$, and $Q=LL^{T}/q^2$ for an integer matrix $L$ and an integer $q$. It satisfies $w\ge0$ and has $J(u)=1.44817873288$, rounded outward.

The bound exceeds Lieb–Narnhofer's by $0.0026140256$, $39.8\,\%$ of the distance $0.0065620071$ to bcc, and reads $e_{\rm Jel}\ge-0.8983784\,e^2/a$.

> **Result 3 (Two dimensions).** Let $\kappa$ be a rational within $3\times10^{-31}$ of $1/(4\pi)$, $t=r^2/(4\kappa)$ and $u(r)=\frac1{4\pi\kappa}\sum_{p=0}^{64}c_p\,e^{-t}t^p/p!$ with rational $c_p$, $\sum_pc_p=1$. For a certified choice of the $c_p$, $\hat u\ge0$, $w\ge0$ and $J(u)-J_{\rm tri}<6.4\times10^{-29}$, where $J_{\rm tri}=-e_{\rm tri}=0.6605587142140189574949345979\ldots$ Hence $e_{\rm tri}-6.4\times10^{-29}\le e_{\rm Jel}\le e_{\rm tri}$.

The upper bound is the triangular-lattice competitor [15].

> **Theorem 4 (Ceiling).** Let $d=3$. Let $u$ be a radial finite signed measure with $\int u=1$ and finite second moment, $f=v*u$ with $f(0)$ finite, $\hat u\ge0$ and $w=v-f\ge0$. Let $g=1+\gamma\ge0$ with $\gamma$ bounded, radial and of compact support, and suppose its structure factor $S(k)=1+\hat\gamma(k)\ge0$ for all $k$. Then
> $E(g)+J(u)=\tfrac12\int w\,g\,d^3x+\tfrac12(2\pi)^{-3}\int S(k)\hat f(k)\,d^3k\ge0$, with $E(g)=\tfrac12\int\gamma(y)/|y|\,d^3y$.
> In particular $-J(u)\le E(g)$.

> **Result 5 (Ceiling in three dimensions).** There is such a $g$, piecewise constant on 770 cells out to radius 64 and equal to 1 beyond, with $E(g)=-1.44800699488215\ldots$. Every bound $e_{\rm Jel}\ge-J(u)$ of the family of Theorem 4 therefore has $-J(u)\le-1.44800699488$.

With Result 2, the best bound of this family lies in $[-1.448178733,\,-1.44800699488]$. The bcc value is $3.8\times10^{-3}$ above its upper end, so the family closes at most $42.5\,\%$ of the Lieb–Narnhofer-to-bcc distance.

### The Lieb–Oxford constant

The Lieb–Oxford constant $c_{\rm LO}$ is the best constant in $E_{\rm ind}[\rho]\ge-c\int\rho^{4/3}$ for all $N$ and all $\rho$ with $\int\rho=N$. Here $E_{\rm ind}[\rho]$ is the least expected Coulomb repulsion of $N$-particle states of density $\rho$, minus $D(\rho,\rho)=\tfrac12\iint\rho(x)\rho(y)/|x-y|$. Lewin, Lieb and Seiringer report $c_{\rm LO}\le1.5765$ from a floating-point evaluation of their inequality [16]. Li's repository reports exact-rational certificates, committed on 2026-10-18 (UTC), from $1.544701310$ with one covariance channel to $1.534173360$ with five [6]. Li has priority; our certificate, from his one-channel family with a signed pair, is higher.

The method of [16] gives $c_{\rm LO}\le\tfrac32(2ID^2)^{1/3}$ for a probability measure $\mu$, a signed measure $\nu$ of mass 1, both finite sums of uniform shells of radii $r_i$ with weight vectors $\mathbf p$ and $\boldsymbol\nu$ (radius 0 allowed), and any $f$ with $\Psi(a,b)\le f(a)+f(b)$ for all $a,b>0$. Here $D=D(\mu,\mu)$, $I=4\pi\int_0^\infty f(r)r^{-5}dr$, $\Psi(a,b)=a^3b^3\sum_{ij}W_{ij}\,\omega(a/r_i,b/r_j)$, $W=\mathbf p\boldsymbol\nu^T+\boldsymbol\nu\mathbf p^T-\boldsymbol\nu\boldsymbol\nu^T$, and $\omega(a/r,b/s)$ is 1 minus the mean of $1/|x-y|$ over uniform spheres of radii $r/a$ and $s/b$ with centres a unit distance apart.

> **Result 6 (Certificate).** Let $\mu$ be the radial probability measure on 12 shells with radii in $[0.121,0.443]$, and $\nu$ the radial signed measure of total mass 1 with a Dirac mass $0.394$ at the origin and nine shells of radii up to $1.0$, with weights from $-0.7229$ to $1.8212$, four of them negative (radii in units of $\rho^{-1/3}$). Then $D(\mu,\mu)=1.4407261477$, $I=0.2693539685$ and $c_{\rm LO}\le\tfrac32(2ID^2)^{1/3}=1.5569094067$.

> **Proposition 7 (Floor).** In this setting let $\zeta_1,\dots,\zeta_m$ be signed shell measures of total mass 0 with weight vectors $\boldsymbol\zeta_\ell$, put $W=\mathbf p\boldsymbol\nu^T+\boldsymbol\nu\mathbf p^T-\boldsymbol\nu\boldsymbol\nu^T-\sum_\ell\boldsymbol\zeta_\ell\boldsymbol\zeta_\ell^T$, and let $f$ be a majorant of the resulting $\Psi$. Li counts $m+1$ channels ($m=0$ is Result 6). Then $\tfrac32(2ID^2)^{1/3}\ge\tfrac35(9\pi/2)^{1/3}=1.4507927586$.

## Why it is true

Write $\theta=\sum_i\delta_{x_i}-\mathbf 1_\Omega$, a neutral measure. For radial real $h_k$, $h_k*\theta$ is neutral with finite energy, and the Coulomb (logarithmic) energy of a neutral measure is non-negative because the Fourier transform of the kernel is. Summing over $k$, the energy with $v$ replaced by $f$ is at least $-\tfrac N2f(0)$. By Newton's theorem $v*u=v$ outside the support of $u$, so $w$ has compact support.

Result 3 has infinitely supported profiles, covered by the last sentence of Theorem 1. There $-\log|z|=\tfrac12\int_0^\infty(e^{-t|z|^2}-e^{-t})\,dt/t$ writes $f$ as a mixture of Gaussians convolved with $u$, whose Fourier transforms are non-negative, and a perimeter estimate for convex $\Omega_N$ makes the boundary term $o(N)$.

The bound is a linear programme of Cohn–Elkies and Cohn–Kumar type [17, 18] in sum-of-squares form, and Theorem 4 is its weak duality, the jellium analogue of Proposition 9.3 of [18]. For a lattice $\Lambda$ of covolume 1 with dual lattice $\Lambda^*$, Poisson summation gives its energy per particle in its background, $e_\Lambda=-J(u)+\tfrac12\sum_{\ell\in\Lambda\setminus\{0\}}w(\ell)+\tfrac12\sum_{G\in\Lambda^*\setminus\{0\}}\hat f(G)$, with both sums non-negative. Sharpness at $\Lambda$ needs double zeros of $w$ and $\hat u$ at the norms of $\Lambda$ and $\Lambda^*$, which the 2D certificate has to within $10^{-40}$ at the first 16 norms.

The Lieb–Oxford method applies Onsager's inequality $D(F-\eta,F-\eta)\ge0$ to the smeared charge $F$; it holds for every finite-energy $\eta$ (inequality (16) of [16]), so $\nu$ may be signed. For Proposition 7, $I=\int_{\mathbb R^3}f(|z|)|z|^{-7}d^3z$, and the diagonal $a=b$ of $\Psi\le f(a)+f(b)$ gives $f(a)\ge\tfrac12\Psi(a,a)$. Half the integral of $\Psi(|z|,|z|)|z|^{-7}d^3z$ is $\tfrac{2\pi}3\int r^2d\mu$ whatever the neutral channels, so $I\ge\tfrac{2\pi}3\int r^2d\mu$. As $\tfrac32(2ID^2)^{1/3}=\min_{t>0}[tD+t^{-2}I]$, the constant is at least $\min[D(\mu',\mu')+\tfrac{2\pi}3\int r^2d\mu']$ over all radial probability measures $\mu'$, and the uniform ball attains $1.4507927586$.

## How it was checked

Results 2, 3, 5 and 6 are computer-assisted proofs; Theorems 1 and 4 and Proposition 7 are proved, and their proofs were re-derived step by step in a separate check, with the constants recomputed in separately written code. The 3D certificate is checked by an exact rational test that $r\,w(r)$ is non-negative on 200 intervals where it is quadratic, with a ball enclosure of $\pi$; a separately written checker reproduced $J=1.4481787328783099509$. The 2D and dual certificates are checked in ball arithmetic, and separately written checkers accept all 15 2D certificates and all eight dual certificates (truncation radii 6 to 64, Result 5 the last) with the same values. Controls: 400 random Bravais lattices, minimised cells and clusters of up to 150 particles stay above Result 2, and discs of up to 31453 particles confirm the normalisation of $e_{\rm tri}$.

For Result 6, a ball-arithmetic branch and bound proves the majorant inequality on a compact region, with analytic bounds near the axes and $\infty$. A separately written float64 branch and bound, without outward rounding, closed the whole domain too (evidence, not proof); $D$, $I$ and the constant were recomputed to 19 digits with separately written code. For Li's certificates we recomputed the constants from his integers, each at or below his value, and ran the float64 code on the whole node domain, not his exact verifier. The proofs have not been peer reviewed, and the existence of $e_{\rm Jel}$ is quoted.

## What it does not show

- This is classical jellium at zero temperature. We state no consequence for quantum jellium or a real material. Neither bcc nor the triangular lattice is shown optimal.
- Result 5 concerns the family of Theorem 4, not every two-point method, and is loose at its upper end: all eight dual certificates respect a bound on the radius-weighted total variation of $g$, and without it the certificates of radii 6 and 12 lie $8.4\times10^{-5}$ and $8.6\times10^{-5}$ lower. Its cost at radius 64 was not measured.
- The $g$ of Result 5 is not a pair correlation. It vanishes below $r=1.131$ yet has $13.39$ neighbours on average within $r<1.175$. Neighbours that close and $1.131$ apart subtend at least $57.5^\circ$, which 13 points on a sphere cannot reach (their best separation is $57.14^\circ$ [19]), so at most 12 fit. Its hard core is not a proved property of minimisers.
- Lieb's hard core $(3/4\pi)^{1/3}=0.6204$ and the radial inequalities of isotropic averaging hold for minimisers away from the boundary. The eight certified $g$ satisfy both, so imposing them can raise the bound of Result 2 by at most $1.72\times10^{-4}$. A discretised jellium version of the three-point inequality of [20] returned no gain, as its construction forces at the resolutions we could run, so whether three-point bounds beat two-point ones is open.

## Earlier and parallel work

We searched arXiv, Zenodo, GitHub web pages and the web, 2026-11-05 to 2026-11-15.

**Three dimensions.** We found no published improvement and no earlier ceiling for smearing bounds. We read only the abstract of Caillol's finite-coupling bound for the one-component plasma [21], which places it above Mermin's (1968), Lieb–Narnhofer's and Totsuji's [22], and a search snippet of Rosenfeld's [23]. We do not know their large-coupling limits and do not claim that $-1.448178733$ is the first improvement.

**Method.** Petrache and Serfaty [24] showed that the Cohn–Kumar conjecture implies minimality of the same lattices for jellium energies. We found no earlier statement of Theorem 1 in sum-of-squares form as a Cohn–Kumar-type linear programme for jellium with its background. Lieb's hard core is an unpublished result of Lieb, proved in [12] (Lemma 25); isotropic averaging is due to Leblé and Thoma [25, 26].

**Two dimensions.** The OpenAI Math release [3] (unrefereed, by an unnamed model) holds manuscripts, dated 2026-09-23 to 2026-09-26, that claim triangular minimality for completely monotone functions of squared distance and, by heat-kernel comparison, for the Coulomb energy and the jellium minimum; sharp Gaussian Fourier minorants; and, by Voronoi cells with a finite computation, the Coulomb energy. By [24] the Gaussian result implies $e_{\rm Jel}=e_{\rm tri}$. Callens (2026-10-26) re-ran a finite certificate of the Coulomb manuscript in an AI-produced, unaudited record that "does not prove, verify or refute" the claim [27]. Cynamon (2026-10-30) builds a sharp Fourier pair for completely monotone potentials of squared distance with finite triangular reference energy [28]. Lei [4] (Lean proof unfinished) claims the same value and Kitamura [5] (two README sections labelled AI generated) a sphere conjecture equivalent to it through $C_{\log}$, both in October 2026. None that we read contains an auxiliary-function certificate for the Coulomb kernel with its background. Result 3 depends on none of them and is not a priority result for the value; its gap to $e_{\rm tri}$ is $6.4\times10^{-29}$, where Marzo's bound leaves $6.2\times10^{-4}$.

**Lieb–Oxford.** The floor is the Lieb–Narnhofer constant, quoted in [16] after inequality (31) for general states. We found no earlier statement of Proposition 7; Li's manuscript was not available and may contain it.

## References

1. E. H. Lieb and H. Narnhofer, "The thermodynamic limit for jellium", J. Stat. Phys. 12, 291–310 (1975). https://doi.org/10.1007/BF01012066
2. J. Marzo, "An improved lower bound for the logarithmic energy on S²", arXiv:2506.01660 (2025; no journal reference on the arXiv page). https://arxiv.org/abs/2506.01660
3. OpenAI Math release, github.com/openai/math (first commit 2026-10-06; manuscripts "produced by an unnamed internal OpenAI model", not refereed). https://github.com/openai/math
4. Y. Lei, "Lean 4 formalization: the triangular lattice minimizes the 2D Coulomb renormalized energy", GitHub repository yuhaolei-ctrl/Triangular-Lattice-Coulomb-Lean (work in progress, the proof is unfinished). https://github.com/yuhaolei-ctrl/Triangular-Lattice-Coulomb-Lean
5. K. Kitamura, GitHub repository KitaKen1/riesz-energy-spheres (Lean sources, a proof note and a README with two sections labelled AI generated, October 2026). https://github.com/KitaKen1/riesz-energy-spheres
6. Y. Li, "Data and code for An Improvement on the Lieb-Oxford Bound (2026)", GitHub repository pkupkupku123/improvement-lieb-oxford-bound, two commits of 2026-10-18 (UTC); the manuscript, submitted to Phys. Rev. A, is not in the repository. https://github.com/pkupkupku123/improvement-lieb-oxford-bound
7. M. Lewin, E. H. Lieb and R. Seiringer, "Floating Wigner crystal with no boundary charge fluctuations", Phys. Rev. B 100, 035127 (2019). https://doi.org/10.1103/PhysRevB.100.035127
8. C. Cotar and M. Petrache, "Equality of the jellium and uniform electron gas next-order asymptotic terms for Coulomb and Riesz potentials", arXiv:1707.07664 (2017). https://arxiv.org/abs/1707.07664
9. M. Lewin, E. H. Lieb and R. Seiringer, "Statistical mechanics of the uniform electron gas", J. Éc. polytech. Math. 5, 79–116 (2018). https://doi.org/10.5802/jep.64
10. R. L. Frank, M. Lewin and R. Seiringer, "Liquid drop model for nuclear matter in the low density limit", arXiv:2507.14012v2 (2026; to appear in Comm. Pure Appl. Math.). https://arxiv.org/abs/2507.14012
11. C. B. Muratov and M. Novaga, "BCC optimality for the three-dimensional Coulomb lattice energy", arXiv:2610.29732 (v1, 2026-10-21; no journal reference on the arXiv page). https://arxiv.org/abs/2610.29732
12. M. Lewin, "Coulomb and Riesz gases: the known and the unknown", J. Math. Phys. 63, 061101 (2022). https://doi.org/10.1063/5.0086835
13. M. A. Csirik, "Equality of the jellium and the uniform electron gas energies", arXiv:2610.20910 (2026). https://arxiv.org/abs/2610.20910
14. R. R. Sari and D. Merlini, "On the ν-dimensional one-component classical plasma: the thermodynamic limit problem revisited", J. Stat. Phys. 14, 91–100 (1976). https://doi.org/10.1007/BF01011761
15. A. B. Lauritsen, "Floating Wigner crystal and periodic jellium configurations", J. Math. Phys. 62, 083305 (2021). https://doi.org/10.1063/5.0053494
16. M. Lewin, E. H. Lieb and R. Seiringer, "Improved Lieb–Oxford bound on the indirect and exchange energies", Lett. Math. Phys. 112, 92 (2022). https://doi.org/10.1007/s11005-022-01584-5
17. H. Cohn and N. Elkies, "New upper bounds on sphere packings I", Ann. of Math. 157, 689–714 (2003). https://doi.org/10.4007/annals.2003.157.689
18. H. Cohn and A. Kumar, "Universally optimal distribution of points on spheres", J. Amer. Math. Soc. 20, 99–148 (2007). https://doi.org/10.1090/S0894-0347-06-00546-7
19. O. R. Musin and A. S. Tarasov, "The strong thirteen spheres problem", Discrete Comput. Geom. 48, 128–141 (2012). https://doi.org/10.1007/s00454-011-9392-2
20. H. Cohn, D. de Laat and A. Salmon, "Three-point bounds for sphere packing", arXiv:2206.15373 (2022). https://arxiv.org/abs/2206.15373
21. J. M. Caillol, "A new (and better) lower bound for the excess internal energy of the one-component plasma", J. Chem. Phys. 111, 9695–9699 (1999), with erratum J. Chem. Phys. 112, 6940 (2000). https://doi.org/10.1063/1.480302
22. H. Totsuji, "Lower bounds for thermodynamic quantities of two- and three-dimensional one-component plasmas", Phys. Rev. A 19, 1712–1716 (1979). https://doi.org/10.1103/PhysRevA.19.1712
23. Y. Rosenfeld, "Mean spherical model for the D-dimensional ν-component classical plasma", Phys. Rev. A 25, 1206–1208 (1982). https://doi.org/10.1103/PhysRevA.25.1206
24. M. Petrache and S. Serfaty, "Crystallization for Coulomb and Riesz interactions as a consequence of the Cohn–Kumar conjecture", arXiv:1908.09714 (2019). https://arxiv.org/abs/1908.09714
25. E. Thoma, "Overcrowding and separation estimates for the Coulomb gas", arXiv:2210.05902 (2022). https://arxiv.org/abs/2210.05902
26. S. Serfaty, "Lectures on Coulomb and Riesz gases", arXiv:2407.21194 (2024). https://arxiv.org/abs/2407.21194
27. X. Callens, "The Sandier–Serfaty triangular-lattice conjecture: an independent reproduction of a claimed finite certificate, an adversarial audit of the claimed reduction, and a Lean statement (no proof of the conjecture is claimed)", Zenodo (2026-10-26). https://doi.org/10.5281/zenodo.23653827
28. B. Z. Cynamon, "Sharp mixed-potential Fourier pairs and planar universal optimality", Zenodo (2026-10-30; read as version v993 on 2026-11-15). https://doi.org/10.5281/zenodo.23827153
