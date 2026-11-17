---
title: A sharp ceiling on T_c in linearised Eliashberg theory
slug: superconducting-tc-ceiling
kind: white-paper
field: Superconductivity
date: 2026-11-15
summary: In linearised Eliashberg theory without Coulomb terms, T_c < 0.18273 √(λ⟨ω²⟩) for all spectra, with a sharp constant. Kondratev posted a proof on 19 September 2026. We add sharp versions for several bands, anisotropy and a static Coulomb term in stated cases. Some Coulomb kernels break the bound.
---

In linearised Migdal–Eliashberg theory without Coulomb repulsion, the instability temperature obeys $T_c<C_\infty\sqrt{\lambda\langle\omega^2\rangle}$ for every electron-phonon spectrum, with coupling $\lambda$, mean square phonon frequency $\langle\omega^2\rangle$ and $C_\infty=0.182726247772\ldots$, and no spectrum attains it. Allen and Dynes [6], Leavens [9] and Moussa and Cohen [7] stated the bound or its asymptote, and Kiessling, Altshuler and Yuzbashyan (KAY) conjectured it sharp [3]. Kondratev posted the first complete proof we know of on 19 September 2026 [1]. Beyond [1] we prove a continuity theorem, the exclusion of complex gaps, and sharp versions for several bands, anisotropy and, in the symmetric convention at stated parameters, a static Coulomb term; much of it overlaps Siraj's postings of 13 and 14 November 2026 [2]. None of it says that room-temperature superconductivity is impossible.

## The question

Eliashberg theory describes phonon-mediated superconductivity. Does the temperature $T_c$ at which the normal state becomes unstable to pairing have a ceiling in terms of $M=\lambda\langle\omega^2\rangle=2\int\alpha^2F\,\omega\,d\omega$, where $\alpha^2F\ge0$ is the electron-phonon spectral function and $\lambda=2\int\alpha^2F\,d\omega/\omega$.

In units $k_B=\hbar=1$ the model is isotropic, with constant density of states, infinite bandwidth, particle-hole symmetry and the kernel $\kappa_T(k)=\int2\omega\alpha^2F\,d\omega/(\omega^2+(2\pi Tk)^2)$ between Matsubara frequencies $k$ steps apart, without vertex corrections. The normal state is stable at $T$ if the quadratic form $E_T$ of the linearised gap equation is non-negative, and $T_c$ is the supremum of the temperatures where it is not [3, 4]. A Coulomb term of dimensionless strength $\mu^*$ [5] acts on $N_c$ Matsubara indices, on both indices of the pairing kernel (symmetric convention) or on the summed index only (standard convention).

Leavens [9], as reported in [2], and Moussa and Cohen [7] stated the bound. KAY [3] proved a bound about 2.034 times larger at large coupling, conjectured the sharp bound, and left the nonlinear transition as a conjecture.

## What we found

Here $\mu^*=0$ unless stated.

> **Theorem 1 (Sharp bound).** Let $\alpha^2F\ge0$ be nonzero with $M<\infty$. Every $T\ge C_\infty\sqrt M$ is stable, so $T_c<C_\infty\sqrt M$, where $C_\infty=\sqrt g/(2\pi)\in[0.18272624777228,\,0.18272624777235]$ and $g\in[1.318140212131829,\,1.318140212132618]$ is the top eigenvalue of the stability operator of the kernel $\kappa(k)=1/k^2$. The unstable set is exactly $(0,T_c)$, and $T_c$ increases with $\alpha^2F$. The constant is sharp: Einstein spectra with $\Omega\to0$ at fixed $M$ approach it from below.

> **Theorem 2 (Einstein ceiling).** For one Einstein mode of frequency $\Omega$ and any $\lambda>0$, $T_c=\Omega f(\lambda)$ exists and is unique; $f$ increases strictly and $f(\lambda)/\sqrt\lambda$ increases to $C_\infty$. For every spectrum with coupling $\lambda$ and $\omega_2=\sqrt{\langle\omega^2\rangle}$, $T_c\le\omega_2f(\lambda)$, with equality only for one Einstein mode. For spectra supported in a fixed interval $[a,b]$, $0<a<b<\infty$, under $k$ constraints $\int g_i\,d\nu=c_i$ with continuous $g_i$, one of them fixing the coupling $\lambda=\nu([a,b])$, where $\nu=2\alpha^2F\,d\omega/\omega$, $\sup T_c$ is attained by a spectrum of at most $k$ atoms.

Moussa and Cohen [7] state $T_c\le\omega_2f(\lambda)$ as known from [6]; Kondratev [1], Section 12, proves it.

| $\lambda$ | $f(\lambda)=T_c/\Omega$ | $f(\lambda)/(C_\infty\sqrt\lambda)$ |
|---|---|---|
| 1 | $[0.1146191,\ 0.1146199]$ | $[0.627272,\ 0.627277]$ |
| 2 | $[0.2117405,\ 0.2117419]$ | $[0.819385,\ 0.819391]$ |
| 4 | $[0.3332426,\ 0.3332448]$ | $[0.911863,\ 0.911869]$ |
| 10 | $[0.5577761,\ 0.5577797]$ | $[0.965292,\ 0.965299]$ |
| 100 | $[1.82097,\ 1.82099]$ | $[0.996559,\ 0.996567]$ |
| 1000 | $[5.77629,\ 5.77637]$ | $[0.999651,\ 0.999663]$ |
Table: Enclosures of $T_c/\Omega$ and of its ratio to $C_\infty\sqrt\lambda$.

> **Theorem 3 (Continuous transition).** In the nonlinear equations for gap and mass renormalisation with the positive root $\sqrt{\omega_n^2+\Delta_n^2}$ (no spin flips), take a real gap even in Matsubara frequency. No nonzero solution exists at $T\ge T_c$; the same holds with a symmetric-convention Coulomb term or any real symmetric pairing-channel matrix, $T_c$ then being the instability temperature of the form that includes it. For $T<T_c$ exactly one solution has all gap values positive; it is the global minimiser of the condensation energy up to sign and vanishes as $T\uparrow T_c$, so the transition is continuous in this sector.

> **Theorem 4 (No complex gap).** Let $\Delta\ne0$ solve the equations at $T$ without spin flips, complex and even in frequency, with arbitrary phases between frequencies and bands and a Coulomb term as in Theorem 3. With $\Psi_n=\Delta_n/\sqrt{\omega_n^2+|\Delta_n|^2}$, $E(\operatorname{Re}\Psi)+E(\operatorname{Im}\Psi)<0$ for the linear stability form $E$ at $T$, Coulomb term included. So no such solution exists wherever $E\ge0$, in particular at and above the instability temperature of that form. An imaginary part odd in frequency is stable at every temperature.

Theorems 3 and 4 need $\kappa_T(k)$ non-increasing and at most $m/k^2$, $m=M/(2\pi T)^2$, true for every spectrum of finite $M$, and for several bands the coupling of Theorem 7. A certified unphysical signed kernel breaks them.

> **Theorem 5 (Coulomb pseudopotential).** In the symmetric convention, for the eight pairs $(\mu^*,N_c)$ below, $\sup T_c/\sqrt M$ over all $\alpha^2F\ge0$ is the soft-phonon limit, that of single Einstein modes with $\Omega\to0$ at fixed $M$; it is enclosed in the symmetric column, no spectrum attains it, and every spectrum is stable above it. The same holds for every $\mu^*\in[0,0.31]$ at $N_c=5$ and $[0,0.40]$ at $N_c=10,20,40$, and, at $\mu^*=0.10$ and $0.13$, for the absolute cutoffs $\omega_c=5,10,20\sqrt M$ with the constants of $N_c=5,10,20$.

| $\mu^*$ | $N_c$ | Symmetric convention | Standard convention, truncated to 200 sites |
|---|---|---|---|
| 0.10 | 5 | $[0.1610043065467,\ 0.1610043065500]$ | $[0.160681795345,\ 0.160681795346]$ |
| 0.10 | 10 | $[0.1616114256419,\ 0.1616114256452]$ | $[0.161550067084,\ 0.161550067085]$ |
| 0.10 | 20 | $[0.1625503010873,\ 0.1625503010907]$ | $[0.162538575689,\ 0.162538575690]$ |
| 0.10 | 40 | $[0.1634780080582,\ 0.1634780080616]$ | $[0.163475822831,\ 0.163475822832]$ |
| 0.13 | 5 | $[0.1561352645273,\ 0.1561352645306]$ | $[0.155753941338,\ 0.155753941339]$ |
| 0.13 | 10 | $[0.1571805517741,\ 0.1571805517773]$ | $[0.157113564154,\ 0.157113564155]$ |
| 0.13 | 20 | $[0.1585747711796,\ 0.1585747711829]$ | $[0.158563064431,\ 0.158563064432]$ |
| 0.13 | 40 | $[0.1599009958708,\ 0.1599009958741]$ | $[0.159899042672,\ 0.159899042673]$ |
Table: Enclosures of $\sup T_c/\sqrt M$ at each $\mu^*$ and $N_c$.

> **Proposition 6 (Standard convention, truncated).** Truncate the standard-convention problem to $N$ Matsubara sites, keeping the principal $N\times N$ block of the stability matrix with the normal self-energy summed over all frequencies. In 58 cases, namely $\mu^*\in\{0.05,0.10,0.13,0.20,0.30,0.50,1.00\}$ with $N_c\in\{1,2,3,5,10,20,40\}$ at $N=100$, the eight pairs of the table at $N=200$, and $(0.10,5)$ at $N=400$, every spectrum is stable above the soft-phonon threshold, and $\sup T_c/\sqrt M$ is bracketed to a relative width of about $1.5\times10^{-29}$.

> **Theorem 7 (Several bands).** Take bands of weights $N_i>0$ and pair masses $M_{ij}=\lambda_{ij}\langle\omega^2\rangle_{ij}\ge0$ with $N_iM_{ij}=N_jM_{ji}$, finite $\lambda_{ij}$ for $i\ne j$ and an arbitrary spectral shape for each pair. Let $\rho(M)$ be the largest eigenvalue of $(\sqrt{N_i/N_j}\,M_{ij})$. Every $T\ge C_\infty\sqrt{\rho(M)}$ is stable, so $T_c<C_\infty\sqrt{\rho(M)}$, sharp when all row sums $\sum_jM_{ij}$ are equal.

> **Theorem 8 (Exact multiband supremum).** Let $R^*=\max_S\sum_{i,j\in S}N_iM_{ij}/\sum_{i\in S}N_i$ over nonempty sets $S$ of bands. At fixed $N_i$ and $M_{ij}$, over all spectral shapes, $C_\infty\sqrt{R^*}\le\sup T_c\le C_\infty\sqrt{R^*/(1-\varepsilon^*)}$ with $\varepsilon^*=3.6\times10^{-5}$, so $\sup T_c=C_\infty\sqrt{R^*}\,(1+\delta)$ with $0\le\delta\le1.8001\times10^{-5}$. Also $R^*\le\rho(M)$. For two bands with pure interband coupling and $N_2/N_1=10^8$, $\delta\ge1.65\times10^{-5}$.

> **Theorem 9 (Anisotropy).** Let $(X,\mu)$ be a Fermi surface with its density of states, atoms allowed, and positive spectral measures $\sigma_{xy}=\sigma_{yx}$ (detailed balance). Let $M(x,y)=\lambda\langle\omega^2\rangle(x,y)$ and the static coupling have bounded row integrals, and $\rho(M)$ be the norm of $M$ on $L^2(\mu)$. Then $T_c\le C_\infty\sqrt{\rho(M)}$, strictly for finitely many patches. At fixed $M$, $\sup T_c$ lies between $C_\infty\sqrt{R^*(M)}$ and $C_\infty\sqrt{R^*(M)/(1-\varepsilon^*)}$, $R^*(M)=\sup_S\langle1_S,M1_S\rangle/\mu(S)$, and can exceed the ceiling of the Fermi-surface average by any factor.

> **Theorem 10 (Screening).** Let a dimensionless Coulomb kernel $\mu(k)$ act in the gap equation, with window matrix $\mu(|n-m|)+\mu(n+m+1)$ on the $N_c$ Coulomb indices. If it is positive semidefinite at every temperature above the phonon-only $T_c$, it cannot raise $T_c$; this covers the symmetric $\mu^*$ term and positive-definite kernels. For several bands or anisotropy the same holds for a static positive semidefinite matrix, with Theorems 7 and 9. For an indefinite static pairing-channel matrix $U$ on the bands or patches, $T_c\le C_\infty\sqrt{\rho(M)/(1-v_-)}$ if $v_-<1$, with $v_-=2\lambda_-(U)\sum_{n<N_c}1/(2n+1)$ and $\lambda_-(U)\ge0$ the smallest number with $\langle s,Us\rangle\ge-\lambda_-\|s\|^2$ for every $s$ in $L^2(\mu)$; for bands of weights $N_i$ summing to one it is the larger of $0$ and minus the lowest eigenvalue of $(\sqrt{N_aN_b}\,U_{ab})$.

Weaker conditions fail (certified examples). The non-negative non-increasing kernel $\mu(k)=2$ for $|k|\le14$ in a window of 20, far above physical strengths, destabilises the soft phonon kernel $\kappa(k)=x/k^2$, $x=M/(2\pi T)^2=7/10$, at $T=1.041\,C_\infty\sqrt M$, where phonons alone are stable. An idealised two-band model, with equal weights, soft Einstein intraband spectra, no interband phonon coupling and a sign-changing gap under interband repulsion of strength 0.05 to 0.2, gives in five certificates with $N_c=3$ to $10$ that $T_c\ge1.0363$ to $1.2058$ times $C_\infty\sqrt{\rho(M)}$.

## Why it is true

The form is $E(y)=P(y)-\sum_k\kappa(k)p_k(y)$ in $y_n=\Delta_n/\omega_n$, with $P(y)=\sum_n(2n+1)y_n^2$ and lag forms $p_k$. Each $p_k$ is non-negative on non-negative non-increasing sequences, and the critical mode of a non-increasing kernel is such a sequence. So the top eigenvalue increases strictly with $\kappa$, and every $\kappa_T(k)\le M/(2\pi Tk)^2$, the $\gamma=2$ kernel: Theorem 1. Jensen's inequality gives $T_c\le\omega_2f(\lambda)$, and convexity of the stable set the atoms.

For Theorem 3, $\theta_n=\arctan(\Delta_n/\omega_n)$ turns the equations into critical points of a spin-chain energy $F$, with the exact identity $E(\sin\theta)+D(\theta)=\sum_n\tan\theta_n\,\partial F/\partial\theta_n$ and $D\ge0$ an explicit sum of non-negative terms, so a nonzero solution has $E(\sin\theta)<0$. Existence comes from minimising $F$, uniqueness from comparing positive solutions, Theorem 4 from the identity for $\operatorname{Re}\Psi$ and $\operatorname{Im}\Psi$. Theorem 5 reduces to Einstein atoms and covers $s=(\Omega/2\pi T)^2$ by boxes; Theorems 7 and 8 split the form into pair forms, one certified by a Z-matrix supersolution; Theorem 9 compresses the Fermi surface to finite partitions.

## How it was checked

Certificates are checked by short standalone programs in interval or exact arithmetic. A second party re-derived each result and recomputed it with separately written code that imported none of ours. It reproduced the exact identities, re-certified key lemmas, and found no violation in adversarial searches. The estimates behind Theorem 3 were re-derived, not formalised, and the checker for Theorem 4 was run, not audited. A separately designed certifier re-certified all 58 cases of Proposition 6, but for Theorem 5 only eight brackets and two of 151 sweep intervals were re-certified. For Theorem 8 the separate code certifies $\varepsilon^*=3.6\times10^{-5}$ and $\delta\ge1.65\times10^{-5}$, our checker $1.70\times10^{-5}$.

The separately written code's own interval enclosure of $g$ reached only $10^{-6}$, so the 13 digits of $g$ and the enclosures of $f$ rest on one method, implemented twice. Theorems 1 to 4 and the first statement of Theorem 10 are proofs, the Einstein table is a certified computation, and Theorem 5, Proposition 6 and Theorems 7 to 9 are computer-assisted proofs. Theorems 5 and 7 to 10 take Theorem 1 and the enclosure of $g$ as input. The proofs have not been peer reviewed.

## What it does not show

- Scope. The spin-flip solutions of Yuzbashyan and Altshuler [11] and a first-order transition into a state outside Theorems 3 and 4 are not excluded, apart from the global minimiser at $\mu^*=0$ treated in [2].
- Regime. The ceiling is approached only by soft phonons at very large $\lambda$, where Migdal–Eliashberg theory is not expected to hold [17]. For published data, see [the companion note](/research/tc-ceilings-published-data).
- Coulomb term. Proposition 6 is for truncations: its constants fall by $1.6\times10^{-7}$ between 200 and 400 sites at $(0.10,5)$, and a code that sums the self-energy over the retained frequencies only is a different matrix, with soft threshold $M/(2\pi T)^2$ of 0.9810024 against 0.9810778 at $(0.10,5,100)$. At $N_c=1$ the truncated soft limit stops being the supremum near $\mu^*=12$. At $\mu^*=2$, $N_c=10$, outside the physical range, a hard phonon atom stabilises a certified unstable temperature: the form is not monotone. No multiband bound with $\mu^*$ is proved.
- Hypotheses. Three bands with repulsive interband Coulomb coupling have a certified time-reversal-breaking solution of a truncated functional, as in BCS models [8], not excluded by Theorem 4 where $E<0$. Theorem 8's pure-interband extreme is not tied to physical matrix elements.
- Dynamic screening. In the gap equation alone, the kernel $\mu(\nu)=\nu^2/(\nu^2+\omega_q^2)$ of bare strength 1 with $\omega_q=3\sqrt M$ and a sharp symmetric cutoff at $20\sqrt M$ gives a soft-phonon $T_c$ certified in $[1.83367,\,1.83369]\,C_\infty\sqrt M$, where the sharp window admits one more Matsubara frequency. A smooth 1 to 10 per cent edge gives 1.80 to 1.71, and the kernel also in the mass renormalisation $0.955\,C_\infty\sqrt M$ (both measured).

## Earlier and parallel work

Kondratev [1] proves the bound in the scalar linearised model at $\mu^*=0$ by comparing kernels coefficientwise, as we do. It is unrefereed, not formalised, and says that AI systems produced it. We found [1] after our proof was written.

Siraj [2] posts two papers and a Lean 4 formalisation, under review, AI-generated by its own record and Lean-checked only in the clauses so tagged. We read the two main papers and the Liouville statements of Supplement A, and checked no proof. It overlaps Theorems 1 to 5, 7 and 9 and the static part of Theorem 10, and we claim no priority over [2] there. We add a tighter enclosure of $C_\infty$, the Einstein table, Theorem 8, the norm $\rho(M)$ for anisotropic kernels, constants enclosed to $3.4\times10^{-12}$ with the supremum shown equal to the soft limit, Proposition 6, complex gaps with Coulomb terms and several bands, and the counterexamples of Theorem 10.

| Source | Year | What it states |
|---|---|---|
| Allen and Dynes [6] | 1975 | The strong-coupling asymptote $T_c\to0.182\sqrt M$, as reported in [4]; KAY note that it is presumably an upper bound at every coupling [3]. |
| Leavens [9] | 1977 | According to [2], $T_c\le0.258\,(\int\alpha^2F\,\omega\,d\omega)^{1/2}$, which is the bound of Theorem 1 in non-strict form to the three digits printed ($\sqrt2\,C_\infty=0.25841$), by a functional-derivative argument. We read only the abstract, which claims rigorous upper bounds. |
| Moussa and Cohen [7] | 2006 | $T_c\le0.183\sqrt M$, citing [6] and [9]; the multiband version with the largest eigenvalue of $\lambda\langle\omega^2\rangle_{ij}$, without derivation; and that an Einstein spectrum maximises $T_c$ at fixed $\lambda$ and $\langle\omega^2\rangle$, as already known from [6], without proof. They say the upper bound corresponds to $\omega_E\to0$ of an Einstein model; by Theorem 1 it is approached there and never attained. |
| Hainzl and others [13] | 2008 | The BCS analogue of the nonexistence in Theorem 3, without frequency-dependent mass renormalisation. |
| Yuzbashyan and Altshuler [11] | 2022 | The spin-chain form of the equations, its spin-flip solutions, and the argument that the free-energy minimiser has a non-negative gap. |
| Langmann and others [12] | 2022 | No pure odd-frequency gap in one band. |
| Pimenov and Chubukov [14] | 2022 | The zero-temperature quantum phase transition under repulsive dynamical interaction; sign-changing gaps under dynamically screened repulsion were known before, see its introduction. |
| Semenok and others [15] | 2024 | $T_c<0.18\sqrt M$ as an upper bound, without proof. |
| KAY [3, 4, 10] | 2025 | The sharp bound as Conjecture 2 of [3], and as Conjecture 1 of [3] the thermodynamic picture that Theorem 3 proves for real gaps without spin flips; Jensen's inequality for one lag; part I [10] defers the nonlinear equations. |
| Sadovskii [16] | 2025 | A review of the strong-coupling limit with coefficient 0.182. |
| Kondratev [1] | 2026 | The unique onset at every coupling, the bound and its optimality (Theorem 1); his Propositions 1 and 2 and Section 10 imply the strict monotonicity of $T_c$ in the spectrum and of $f(\lambda)/\sqrt\lambda$, with its limit; the proof of $T_c\le\omega_2f(\lambda)$, with equality only for one Einstein mode, by Jensen's inequality (Section 12, not claimed as new there); the constant to six digits; the nonlinear transition left open. |
| Siraj [2] | 2026 | The bound for every $\mu^*\ge0$ in both conventions with a Lean-checked $C_\infty\in[0.182726247772231,0.182726247772398]$; Einstein maximality with certified ceilings $0.16112$ at $\lambda\le3$ and $0.176438$ at $\lambda\le10$ on $T_c/\sqrt M$; constants for $(2\pi T)^2/M$ within 0.051 per cent above the soft limit for the symmetric cutoff at $\mu^*=0.05,0.10,0.15,0.20,0.30$ and $N_c\le40$, and for other $\mu^*\ge0.05$ the constant of the largest of these values not above $\mu^*$ (proof sketch); the spectral-radius multiband bound, Lean-checked for a common spectrum in the even sector and sketched otherwise; an anisotropic bound; at $\mu^*=0$ global uniqueness without time-reversal symmetry and Liouville-type exclusion of other no-flip and of half-plane complex solutions. |
| Das Sarma and others [18] | 2026 | Doubts about Eliashberg results with a screened Coulomb coupling in simple metals. |

Apart from these overlaps we found no earlier statement of Theorems 5, 8 and 10, of Proposition 6, of Theorem 4 with a Coulomb term or several bands, or of a bound with a frequency-dependent Coulomb kernel in the sources searched (arXiv, Zenodo, Crossref and web search, 5 to 15 November 2026; GitHub through web search only). This is absence of evidence, not a priority claim.

## References

1. O. Kondratev, "A proof of Conjecture 2 of Kiessling, Altshuler and Yuzbashyan: the sharp spectral-moment bound on the linear-stability onset temperature in Eliashberg theory", Zenodo preprint, v3 (2026). https://doi.org/10.5281/zenodo.22848039
2. A. Siraj, "Sharp T_c bounds and uniqueness of the superconducting state in isotropic Migdal-Eliashberg theory: papers and Lean 4 formalisation (MELean)", Zenodo, v1.0.2 (2026). https://doi.org/10.5281/zenodo.24234156
3. M. K.-H. Kiessling, B. L. Altshuler and E. A. Yuzbashyan, "Bounds on T_c in the Eliashberg theory of superconductivity. II: Dispersive phonons", J. Stat. Phys. 192, 94 (2025). https://arxiv.org/abs/2409.00532
4. M. K.-H. Kiessling, B. L. Altshuler and E. A. Yuzbashyan, "Bounds on T_c in the Eliashberg theory of superconductivity. III: Einstein phonons", J. Stat. Phys. 192, 93 (2025). https://arxiv.org/abs/2409.02121
5. P. Morel and P. W. Anderson, "Calculation of the superconducting state parameters with retarded electron-phonon interaction", Phys. Rev. 125, 1263 (1962). https://doi.org/10.1103/PhysRev.125.1263
6. P. B. Allen and R. C. Dynes, "Transition temperature of strong-coupled superconductors reanalyzed", Phys. Rev. B 12, 905 (1975). https://doi.org/10.1103/PhysRevB.12.905
7. J. E. Moussa and M. L. Cohen, "Two bounds on the maximum phonon-mediated superconducting transition temperature", Phys. Rev. B 74, 094520 (2006). https://arxiv.org/abs/cond-mat/0607832
8. V. Stanev and Z. Tešanović, "Three-band superconductivity and the order parameter that breaks time-reversal symmetry", Phys. Rev. B 81, 134522 (2010). https://arxiv.org/abs/0912.5214
9. C. R. Leavens, "Important parameters in strong-coupling superconductivity", J. Phys. F 7, 1911 (1977). https://doi.org/10.1088/0305-4608/7/9/034
10. M. K.-H. Kiessling, B. L. Altshuler and E. A. Yuzbashyan, "Bounds on T_c in the Eliashberg theory of superconductivity. I: The gamma-model", J. Stat. Phys. 192, 69 (2025). https://arxiv.org/abs/2409.00533
11. E. A. Yuzbashyan and B. L. Altshuler, "Migdal-Eliashberg theory as a classical spin chain", Phys. Rev. B 106, 014512 (2022). https://arxiv.org/abs/2205.06442
12. E. Langmann, C. Hainzl, R. Seiringer and A. V. Balatsky, "Obstructions to odd-frequency superconductivity in Eliashberg theory", arXiv:2207.01825 (2022). https://arxiv.org/abs/2207.01825
13. C. Hainzl, E. Hamza, R. Seiringer and J. P. Solovej, "The BCS functional for general pair interactions", Commun. Math. Phys. 281, 349 (2008). https://doi.org/10.1007/s00220-008-0489-2
14. D. Pimenov and A. V. Chubukov, "Quantum phase transition in a clean superconductor with repulsive dynamical interaction", npj Quantum Mater. 7, 45 (2022). https://arxiv.org/abs/2112.06273
15. D. V. Semenok, B. L. Altshuler and E. A. Yuzbashyan, "Fundamental limits on the electron-phonon coupling and superconducting T_c", arXiv:2407.12922 (2024). https://arxiv.org/abs/2407.12922
16. M. V. Sadovskii, "Upper limit for superconducting transition temperature in electron-phonon superconductors: very strong coupling", J. Supercond. Nov. Magn. 38, 234 (2025). https://arxiv.org/abs/2506.19326
17. A. Chubukov, I. Esterlis, A. Abanov and N. Prokof'ev, "Breakdown of the Migdal-Eliashberg theory for electron-phonon systems. Role of polarons/bi-polarons", Phys. Rev. B 114, 185127 (2026). https://arxiv.org/abs/2604.14294
18. S. Das Sarma, J. D. Sau, Y.-T. Tu and S. Wang, "Conventional and practical metallic superconductivity arising from repulsive Coulomb coupling", Phys. Rev. B 114, 055202 (2026). https://arxiv.org/abs/2511.00625
