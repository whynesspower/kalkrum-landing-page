---
title: Published electron-phonon data against the Eliashberg ceiling
slug: tc-ceilings-published-data
kind: note
field: Superconductivity
date: 2026-11-15
summary: None of 23,608 computed Tc values in a zero-pressure database, or of 201 reported Tc values, is shown to exceed the Eliashberg ceiling ω₂f(λ). In that database no ceiling from reported moments reaches 300 K. The ceiling alone does not exclude 300 K.
---

The ceiling $T_c\le\omega_2f(\lambda)$ bounds the Eliashberg transition temperature by the coupling $\lambda$ and the rms phonon frequency $\omega_2$, where $\Omega f(\lambda)$ is the $T_c$ of a single mode of frequency $\Omega$ ([the ceiling note](/research/superconducting-tc-ceiling)). In the Alexandria deposit of zero-pressure DFT calculations, none of 23,608 isotropic-Eliashberg $T_c(\mu^*=0)$ exceeds the certified upper bound of its ceiling from reported moments (largest ratio 0.970), and no such ceiling reaches 300 K; ceilings of the selected stored spectrum do for three entries, but vary with the broadening. None of 201 reported $T_c$ values is shown to exceed its ceiling, but at most 75 test the theorem. Moussa and Cohen (citing Allen and Dynes), Kondratev and Siraj stated the ceiling earlier [1, 2, 3, 4], and a public repository [5] posted the 300 K thresholds on $\omega_2$ at $\lambda=1,2,3$ (Result 2). We add enclosures of $f$, these tests and a three-moment supremum.

## The question

Electron–phonon theory gives a superconductor's transition temperature $T_c$ from its spectrum $\alpha^2F(\omega)\ge0$, the phonon density weighted by electron coupling. The question is whether reported values, from a database of computed spectra and from claims of near-room-temperature superconductivity, respect a cap set by two of its moments. Units are kelvin, $k_B=\hbar=1$; $\omega_{\max}$ is the highest frequency and

$$
\lambda=2\int\frac{\alpha^2F}{\omega}\,d\omega,\qquad \omega_2^2=\langle\omega^2\rangle=\frac{2}{\lambda}\int\alpha^2F\,\omega\,d\omega,\qquad \omega_{\log}=\exp\Big[\frac{2}{\lambda}\int\alpha^2F\ln\omega\,\frac{d\omega}{\omega}\Big].
$$

An Einstein mode is one phonon frequency $\Omega$; $f(\lambda)=T_c/\Omega$ for it. The theory is isotropic and one-band, with $T_c$ the temperature where the normal state turns linearly unstable. The Coulomb pseudopotential $\mu^*$ acts on Matsubara frequencies up to a cutoff, on both indices of the pairing kernel (symmetric convention) or the summed index only (standard). At $\mu^*=0$, $T_c\le\omega_2f(\lambda)$, with equality only for one Einstein mode [2, 3]. The ceiling holds for a constant $\mu^*\ge0$; with only $\omega_{\max}$ reported it is $\omega_{\max}f(\lambda)$, since $\omega_2\le\omega_{\max}$.

## What we found

Data: the Alexandria 3D deposit (zero pressure, PBEsol, snapshot 2025.08.11, 27,180 materials; [CC BY 4.0](https://alexandria.icams.rub.de/about.html); [6, 7]; derived statistics) and the 806 spectra in the BETE-NET file (repository licence Apache-2.0; the paper reports 818 materials) [8]. Each Alexandria entry stores ten spectra, one per broadening; we use the positive part of the one with signed $\lambda$ closest to the reported $\lambda$.

> **Result 1 (Screen, certified computation).** None of the 23,608 Alexandria entries reporting an isotropic-Eliashberg $T_c(\mu^*=0)$ exceeds the certified upper bound of $\omega_2f(\lambda)$ from its reported $\lambda$ and $\omega_2$. The largest ratio to that bound is 0.970.

> **Result 2 (Thresholds, computer-assisted proof).** If an isotropic Eliashberg superconductor has $T_c(\mu^*=0)\ge300$ K, then $\omega_2\ge2617.3$ K at $\lambda=1$, $\omega_2\ge1416.8$ K at $\lambda=2$ and $\omega_2\ge1075.3$ K at $\lambda=3$, rounded down.

| Quantity | Value | Kind |
|---|---|---|
| Largest ceiling from reported moments, 27,175 entries (five report zero or no coupling) | 292.4 K (B2Be4N2); 290.3 K (H6KPt) without ten entries whose ten stored spectra have no positive $\lambda$ | Certified computation |
| Entries with ceiling above 300 / 150 / 77 K from reported moments, at most | 0 / 55 / 1,904 | Certified computation |
| Largest ceiling, BETE-NET | 69.5 K (HPd) | Certified computation |
| Entries whose certified lower bound of the ceiling is below the reported $T_c$ | 9, all with $\lambda$ from 0.24 to 0.26, by up to 2.6 %; 22 more, with $\lambda$ below 0.2, have no lower bound | Certified computation |
| Reported $T_c$ above the ceiling of the selected spectrum | 3 (B2Be4N2, C2Be4, H8Al2Pt2: ten stored spectra with non-positive $\lambda$, 10 to 54 % negative weight); under a second selection rule 3 others (H24Ho8, H24Er8, H24Tm8: 30 to 33 % negative weight). None is above the ceiling from its reported moments, and the theorem needs a positive spectrum | Exhaustive computation |
| Largest ceiling of the selected spectra, one broadening each | 331.7 K (H6PtRb); above 300 K: H6PtRb, H6CsPt and H6KPt, with 5.2 to 7.7 % negative weight, each failing a 2 % test against its own reported moments | Certified computation |
| H6PtRb, H6CsPt, H6KPt: from reported moments | 286.4, 277.6, 290.3 K | Certified computation |
| The same, over the ten stored spectra, smallest to largest broadening | 558 to 226, 603 to 217, 492 to 231 K (factor 2.1 to 2.8) | Certified computation |
| Selected spectra with $\lambda$ and $\omega_2$ raised by 10 % / 30 % (not a DFT error bar) | largest ceiling 388 / 510 K; entries above 300 K: 5 / 10 | Certified computation |
| Float $T_c/\omega_2f(\lambda)$ of 10,132 selected spectra from a ceiling-selected sample (8,520 with ceiling at least 20 K, 1,612 random from 3 to 20 K), solved in float64 by a separately written solver (truncated operator, so each $T_c$ is a lower bound) | median 0.64, 99th percentile 0.93, maximum 0.9875 (K4O2), none above 1 | Measurement |
| Interval brackets of $T_c$, 257 spectra (Pareto front of $(\lambda,\omega_2)$, largest ceilings, random), B2Be4N2 excluded | relative width about $4.0\times10^{-4}$; ratio to ceiling 0.174 to 0.988 | Certified computation |
| $\omega_2$ needed for 300 K at $\mu^*=0$, $\lambda=3.6915$, the Einstein-phonon stability limit derived in [10], not examined here and since questioned [11] | 944.9 K | Certified computation |
Table: Ceilings are certified upper bounds interpolated between enclosures of $f$, up to 0.92 % too high for $\lambda\ge1$, 2.6 % for $0.5\le\lambda<1$ and 9.4 % for $0.2\le\lambda<0.5$. Below $\lambda=0.2$ the bound is one-sided and can exceed the exact ceiling by one to two orders of magnitude.

> **Proposition (Three moments, proved).** Let $\lambda>0$ and $0<\omega_{\log}<\omega_2$. Over spectra with no frequency floor and exactly these three moments, the supremum of $T_c(\mu^*=0)$ is $\omega_2f(\lambda)$, and it is not attained. Reporting $\omega_{\log}$ alone does not lower the ceiling.

> **Result 3 (Claims, certified computation).** None of 201 reported $T_c$ values is shown to exceed its ceiling. Of the 121 that report $\omega_2$ or $\omega_{\max}$, none reaches 0.8 of $\omega_2f(\lambda)$ or $\omega_{\max}f(\lambda)$; the largest ratio is 0.78: 287.5 K for ScLuH12 at 190 GPa (Eliashberg, $\mu^*=0.10$, Fan et al. [9]; ceiling 367.6 to 369.1 K).

| Kind of reported value | Rows (141 material-pressure pairs, 16 sources) | Below 0.8 of ceiling | Log level | Needs $\omega_2$ |
|---|---|---|---|---|
| Eliashberg, taken as isotropic (theorem) | 43 | 13 | 12 | 18: three hold for every spectrum, nine need $\omega_2/\omega_{\log}$ of 1.016 to 1.175 (it is 1.175 to 1.841 in [9]), six report no $\omega_{\log}$ |
| Eliashberg, ab initio Coulomb kernel (theorem if the kernel's window matrix is positive semidefinite, unchecked) | 10 | 0 | 10 | 0 |
| Calculation, method left to the primary source (theorem if Eliashberg) | 6 | 6 | 0 | 0 |
| Measured $T_c$, calculated or tabulated moments (theorem) | 16 | 16 | 0 | 0 |
| Allen–Dynes, McMillan or mean-field formula (consistency only; includes two non-refereed postings, a Zenodo record and an arXiv version since withdrawn, both passing) | 115 | 85 | 28 | 2 |
| Anisotropic Eliashberg (outside the theory) | 10 | 0 | 0 | 10 |
| MgB₂ measured, two bands (outside the theory) | 1 | 1 | 0 | 0 |
| All | 201 | 121 | 50 | 30 |
Table: A claim is one reported $T_c$ with its inputs. Log level: $T_c\le\omega_{\log}f(\lambda)\le\omega_2f(\lambda)$ by Jensen's inequality for $\ln$, so the claim holds for every spectrum of the reported $(\lambda,\omega_{\log})$. Needs: the claim holds only if an unreported $\omega_2\ge T_c/f(\lambda)$.

## Why it is true

Let $p(d\omega)=2\alpha^2F\,d\omega/(\lambda\omega)$, a probability measure with second moment $\omega_2^2$. At $\mu^*=0$ the largest eigenvalue of the stability operator depends on $\alpha^2F$ through $\kappa_T(k)=\lambda\int\omega^2/(\omega^2+\nu_k^2)\,p(d\omega)$, $\nu_k=2\pi Tk$, and by Theorem 1 of the ceiling note and its proof it increases strictly with $\kappa$ on non-increasing kernels. Jensen's inequality for the concave map $x\mapsto x/(x+\nu^2)$ bounds $\kappa_T(k)$ by the Einstein kernel with the same $\lambda$ and $\omega_2$, with equality only for a point mass, as in [3] (section 12).

For $\mu^*\ge0$ Theorem 10 of the ceiling note covers the symmetric convention; in the standard one an instability needs a zero of $1+2\mu^*u^{\rm T}(I-H)^{-1}\rho$, where $I-H$ is the phonon-only operator at $T$ and $u,\rho\ge0$ are fixed vectors. Above the phonon-only $T_c$, $I-H$ is a positive definite Z-matrix with entrywise non-negative inverse, so the function stays positive and $T_c<T_c(\mu^*=0)$. This holds on finite truncations of the Matsubara sums, the infinite problem being their limit; Siraj [4] states it for the half-line convention, unchecked by us.

For the proposition, put weight $(1-\epsilon)\lambda$ at $\Omega_h$ and $\epsilon\lambda$ at $\omega_s$. By the intermediate value theorem some $\omega_s(\epsilon)$ fixes $\omega_{\log}$, with $\epsilon\ln(\omega_2/\omega_s)\to\ln(\omega_2/\omega_{\log})$, so $\omega_s\to0$ and $\Omega_h\to\omega_2$. The kernel dominates that of the hard atom alone, so $T_c\ge\Omega_hf((1-\epsilon)\lambda)\to\omega_2f(\lambda)$. Equality needs one atom, excluded by $\omega_{\log}<\omega_2$.

## How it was checked

$f$ rests on 321 enclosures (643 certificates, one for $C_\infty=\lim f/\sqrt\lambda$). A certificate puts the largest eigenvalue of the linearised gap operator above 1 at $T_{\rm lo}$ or below 1 at $T_{\rm hi}$, bracketing $T_c$, and a standalone program checks it in interval arithmetic. Separately written code re-ran the checker on all 643, put $f$ inside every enclosure (float solver) and rebuilt the table from re-downloaded sources, reproducing all 201 classifications.

Controls: one Einstein mode ($\lambda=2$, $\Omega=1000$ K) gives $\omega_2f(\lambda)$ to $5\times10^{-8}$, and float64 searches over 3- and 5-atom spectra reach it within rounding ($1+3\times10^{-13}$). The enclosures rest on one interval method with no second interval-arithmetic implementation. The proofs have not been peer reviewed.

## What it does not show

- Scope: the isotropic one-band model above, a constant $\mu^*\ge0$ and a positive spectrum. Nothing follows for vertex corrections, the signed $\alpha^2F$ that DFT integrated, anisotropic or multiband gaps, or odd-frequency or time-reversal-breaking transitions.
- Fan et al. [9] print a column headed $\omega^2$ in kelvin, captioned mean square frequency. We read it as the rms frequency, which reproduces all 13 printed Allen–Dynes–McMillan values to 0.13 % with their equations (arXiv version 1).
- A consistent claim is not a correct one, and Result 2 is necessary only. With a frequency floor the supremum of the proposition may be lower and is not determined here.

## Earlier and parallel work

| Who | Date | What they state |
|---|---|---|
| Moussa and Cohen [2], citing Allen and Dynes [1] | 2006; 1975 | The Einstein spectrum maximises $T_c$ at fixed $\lambda$ and $\langle\omega^2\rangle$ ([1] not read by us); $T_c\le0.183\sqrt{\lambda\langle\omega^2\rangle}$ |
| Leavens [12], as described in [4] | 1977 | A reduction to Einstein spectra at fixed first moment, and $T_c\le0.258(\int\alpha^2F\,\omega\,d\omega)^{1/2}$ at $\mu^*=0$ (not read by us) |
| Kiessling, Altshuler and Yuzbashyan [13, 14] | 2024, revised 2025 | For $\lambda>0.77$ an Einstein mode has $T_c=\Omega f(\lambda)$, with lower bounds on $f$ that converge to it and a loose upper bound; Jensen's inequality for the first lag only (II, Corollary 2, as described in [4]) |
| Kondratev [3], not refereed; its disclosure states that AI systems produced the proof | 19 September 2026 | Scalar $\mu^*=0$ model: a unique onset temperature, $k_BT<C_*\sqrt{\lambda\langle\omega^2\rangle}$ with $C_*<0.182727$, the same extremality, and a 300 K threshold $\sqrt{\lambda\langle\omega^2\rangle}>0.141478$ eV, with no value of $f$ |
| Siraj [4], not refereed; its record states it is AI-generated; partly machine-checked in Lean 4, not checked by us | 13 and 14 November 2026 | $T_c\le\omega_2f(\lambda)$ for every $\mu^*\ge0$, and $f(3)/\sqrt3\le0.16112$, $f(10)/\sqrt{10}\le0.176438$; no database, claims or $\omega_{\log}$ |
| Public repository [5], one commit, not refereed, certificates unchecked by us | 1 November 2026 | Result 2 as $\lambda\omega_2^2\ge g(\lambda)$, $g=\lambda\Omega_E^2$ with $\Omega_E$ the Einstein frequency giving 300 K, certified on 31 couplings from 0.8 to 100 and infinity; at $\lambda=1,2,3$ it gives our 2617.3, 1416.8 and 1075.3 K |
| Semenok et al. [10] | 2024, 2025 | $T_c<0.18\sqrt{\lambda\langle\omega^2\rangle}$; from a stability limit $\lambda\le3.69$, $T_c<0.32\,\omega_{\max}$ by the Einstein mode at $\omega_{\max}$; 23 materials in Table S1 and 44 rows of $\lambda$ and $\omega_{\log}$ in Table S3 |
| Gao et al. [15] | 2025 | Over 20,000 calculations from the same database: room-temperature conventional superconductivity at ambient pressure is extremely unlikely; no proved ceiling in either version |
| Sadovskii [16] | 2021 | Five LaH10 and YH10 calculations against a lower bound derived from the linearised gap equation and the Allen–Dynes asymptote $0.18\sqrt\lambda\,\Omega$, with $\omega_{\log}=\omega_2$ |
| Sharma [17], not refereed | 30 August 2026 | The spread of $T_c$ among spectra sharing $(\lambda,\omega_{\log},\omega_2)$, from 806 spectra; no statement of the three-moment supremum |
| This note | 15 November 2026 | Two-sided enclosures of $f$ at 321 couplings, 0.2 to $10^4$; the tests of Results 1 and 3; the three-moment supremum |

We found no earlier application of a proof-backed ceiling to a database or to reported values, or earlier statement of the three-moment supremum, in the sources we searched (arXiv, Zenodo, web search, public GitHub pages; last searched 15 November 2026).

## References

1. P. B. Allen and R. C. Dynes, "Transition temperature of strong-coupled superconductors reanalyzed", Phys. Rev. B 12, 905 (1975). https://doi.org/10.1103/PhysRevB.12.905
2. J. E. Moussa and M. L. Cohen, "Two bounds on the maximum phonon-mediated superconducting transition temperature", Phys. Rev. B 74, 094520 (2006). https://doi.org/10.1103/PhysRevB.74.094520
3. O. Kondratev, "A proof of Conjecture 2 of Kiessling, Altshuler and Yuzbashyan: the sharp spectral-moment bound on the linear-stability onset temperature in Eliashberg theory", Zenodo preprint, v3 (2026). https://doi.org/10.5281/zenodo.22848039
4. A. Siraj, "Sharp T_c bounds and uniqueness of the superconducting state in isotropic Migdal-Eliashberg theory: papers and Lean 4 formalisation (MELean)", Zenodo, v1.0.2 (2026). https://doi.org/10.5281/zenodo.24234156
5. PoplerAdmin, "rtsc-inverse-design", GitHub repository, commit 5facda5 (2026), read 15 November 2026. https://github.com/PoplerAdmin/rtsc-inverse-design
6. Th. Cavignac et al., "AI-driven expansion and application of the Alexandria database", J. Phys. Mater. 9, 025014 (2026). https://doi.org/10.1088/2515-7639/ae6620
7. T. F. T. Cerqueira, Y.-W. Fang, I. Errea, A. Sanna and M. A. L. Marques, "Searching materials space for hydride superconductors at ambient pressure", Adv. Funct. Mater. 34, 2404043 (2024). https://doi.org/10.1002/adfm.202404043
8. J. B. Gibson, A. C. Hire, P. M. Dee, O. Barrera, B. Geisler, P. J. Hirschfeld and R. G. Hennig, "Accelerating superconductor discovery through tempered deep learning of the electron-phonon spectral function", npj Comput. Mater. 11, 7 (2025). https://doi.org/10.1038/s41524-024-01475-4
9. Y. Fan, B. Li, C. Zhu, J. Cheng, S. Liu and Z. Shi, "Superconductive sodalite-like clathrate hydrides MXH12 with critical temperatures of near 300 K under pressures", arXiv:2408.00234v1 (2024); Phys. Status Solidi B 262, 2400240. https://arxiv.org/abs/2408.00234
10. D. V. Semenok, B. L. Altshuler and E. A. Yuzbashyan, "Fundamental limits on the electron-phonon coupling and superconducting T_c", arXiv:2407.12922 (2024); Adv. Mater. 37, 2507013 (2025). https://arxiv.org/abs/2407.12922
11. N. Bashan and E. Berg, "Stability and relaxation of electron-phonon systems at strong coupling", arXiv:2611.07014 (2026). https://arxiv.org/abs/2611.07014
12. C. R. Leavens, "Important parameters in strong-coupling superconductivity", J. Phys. F 7, 1911 (1977). https://doi.org/10.1088/0305-4608/7/9/034
13. M. K.-H. Kiessling, B. L. Altshuler and E. A. Yuzbashyan, "Bounds on T_c in the Eliashberg theory of superconductivity. II: Dispersive phonons", J. Stat. Phys. 192, 94 (2025). https://arxiv.org/abs/2409.00532
14. M. K.-H. Kiessling, B. L. Altshuler and E. A. Yuzbashyan, "Bounds on T_c in the Eliashberg theory of superconductivity. III: Einstein phonons", J. Stat. Phys. 192, 93 (2025). https://arxiv.org/abs/2409.02121
15. K. Gao, T. F. T. Cerqueira, A. Sanna, Y.-W. Fang, Đ. Dangić, I. Errea, H.-C. Wang, S. Botti and M. A. L. Marques, "The maximum T_c of conventional superconductors at ambient pressure", Nat. Commun. 16, 8253 (2025). https://doi.org/10.1038/s41467-025-63702-w
16. M. V. Sadovskii, "Limits of Eliashberg theory and bounds for superconducting transition temperature", arXiv:2106.09948 (2021); Phys. Usp. 65, 724 (2022). https://arxiv.org/abs/2106.09948
17. A. Sharma, "Decomposing Allen–Dynes error into learnable and irreducible components", Zenodo preprint (2026). https://doi.org/10.5281/zenodo.22177654
