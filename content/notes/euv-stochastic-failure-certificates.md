---
title: Certified pointwise EUV failure probabilities and a photon dose floor
slug: euv-stochastic-failure-certificates
kind: white-paper
field: Chip design
date: 2026-11-15
summary: In a stated Poisson shot-noise model of EUV contact printing, two pointwise failure probabilities are bracketed within a factor 1.07 to 1.24 from 10⁻¹² to 10⁻⁹, and a Neyman–Pearson dose floor for local resists is evaluated. The model is not calibrated to any process.
---

In a stated Poisson shot-noise model of EUV contact printing, we bracket two pointwise failure probabilities: the centre of a contact does not clear (MISS), or the saddle between two contacts does (MERGE). At 0.33 numerical aperture (NA), 36 nm pitch, 15 % absorption and 3 nm blur, MISS reaches $10^{-9}$ between 64.6 and 65.4 mJ/cm², and the bounds' ratio is 1.07 to 1.24 from $10^{-12}$ to $10^{-9}$. No translation-covariant local resist of range $r$ can hold both the centre and the saddle error at $10^{-9}$ below 201.3 mJ/cm² at $r=3$ nm, or 11.4 at 20 nm: this is the Neyman–Pearson bound [1, 2], which we evaluate. Earlier EUV work uses simulation, sampling and fits [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; rounding brackets compound sums in actuarial work [14]. The model is not calibrated to any process.

## The question

EUV lithography prints contact holes with 13.5 nm photons. Absorbed photons are random, so a contact can fail to open or two contacts can join. The most advanced chips carry tens to hundreds of billions of contacts, and in many designs one missing contact causes device failure [11]: at $10^{-9}$ per contact, $10^{10}$ contacts fail ten times on average. Direct sampling needs about $100/p$ trials for 10 % precision at probability $p$, so rare probabilities have been estimated by importance sampling [4], compact full-chip models [12], algebraic Poisson models scaled to $10^{-13}$ [7, 15] and extrapolated size distributions [11, 16]. None of the abstracts we read states a certified bound.

## What we found

Absorbed photons form a Poisson process of intensity $\lambda=D\,n_0\,a\,I$: $D$ is the clear-field dose in mJ/cm², $n_0=0.679606$ photons nm⁻² per mJ/cm² at 13.5 nm, $a$ the absorbed fraction, and $I\ge0$ the scalar Abbe image (the sum over source points of the coherent images, 1 in a clear field) of square openings of width 0.55 pitch, on a square array, in a binary dark-field mask. The source is a disc of radius 0.9 NA/λ, sampled by 1313 equal-weight points of a 41×41 grid. A photon at $X_i$ adds $k(|x-X_i|)$ to the latent exposure $Z(x)$, where $k$ is a Gaussian of standard deviation $\sigma_{\rm b}$, shifted to vanish at $4\sigma_{\rm b}$, and zero beyond. The resist dissolves where $Z\ge T$, with $T=Dz_e$ (dose-to-size) and $z_e$ the mean of $Z$ per unit dose at the nominal edge, the point on an axis at the nominal contact radius, 10 nm or 7 nm; the scale of $k$ cancels. MISS is $Z<T$ at a contact centre. MERGE is $Z\ge T$ at a saddle, the point midway between two nearest contacts. We take $a=0.15$, about that of 35 nm of a typical organic resist [17], and $a=0.26$, that of 20 nm of a resist absorbing 15 μm⁻¹; blurs and edge radii are model values.

> **Result 1 (Two-sided bounds).** For MISS and MERGE in this model, $P_{\rm lo}\le P\le P_{\rm hi}$, where $P_{\rm lo}$ and $P_{\rm hi}$ are tails of two lattice compound Poisson sums, computed with a proved relative rounding bound. In 24 evaluations in five parameter sets with $\sqrt{P_{\rm lo}P_{\rm hi}}$ between $10^{-12}$ and $10^{-9}$, $P_{\rm hi}/P_{\rm lo}$ is 1.07 to 1.24. The sets are the two of Table 1 and three variations at 0.33 NA: blur 2 nm or 4 nm with $a=0.15$, blur 2 nm with $a=0.26$. The ratio falls as the lattice is refined.

| Case | Event | $P_{\rm lo}>10^{-9}$ at | $P_{\rm hi}\le10^{-9}$ at | $P_{\rm lo}>10^{-12}$ at | $P_{\rm hi}\le10^{-12}$ at |
|---|---|---|---|---|---|
| 0.33 NA, pitch 36 nm, edge 10 nm, $a=0.15$, $\sigma_{\rm b}=3$ nm | MISS | 64.61 | 65.40 | 88.73 | 89.81 |
| 0.33 NA, pitch 36 nm, edge 10 nm, $a=0.15$, $\sigma_{\rm b}=3$ nm | MERGE | 66.80 | 67.61 | 92.04 | 93.16 |
| 0.55 NA, pitch 28 nm, edge 7 nm, $a=0.26$, $\sigma_{\rm b}=2$ nm | MISS | 34.78 | 35.21 | 47.73 | 48.32 |
| 0.55 NA, pitch 28 nm, edge 7 nm, $a=0.26$, $\sigma_{\rm b}=2$ nm | MERGE | 11.73 | 11.89 | 16.20 | 16.41 |
Table: Doses in mJ/cm² at which $P_{\rm lo}$ exceeds, or $P_{\rm hi}$ is at most, the level, rounded outward to 0.01 from the evaluated doses, in the dose-to-size convention.

Each crossing lies between the two doses if the probability falls with dose there, which we checked on bracket middles at 36 doses at 0.33 NA, not at 0.55 NA, and did not prove. For a 1201×1201 grid instead of the 1313-point source, the doses at which the geometric mean of the MISS bracket crosses $10^{-9}$ and $10^{-12}$ move by +0.73 % at 0.33 NA, to 65.48 and 89.91, and by −1.22 % at 0.55 NA, to 34.56 and 47.44 mJ/cm², outside the bracketing doses of Table 1. This is a measurement; we did not recompute the bounds, or MERGE, for the finer grid.

> **Proposition 2 (Photon dose floor).** Let $x_1$ be a point that must dissolve and $x_0$ one that must not, and $P_i$ the photon process within $r$ of $x_i$, translated to the origin, of intensity $\lambda_i(u)=D\,n_0\,a\,I(x_i+u)$, for an image independent of depth with one absorption profile at both points. A local resist of range $r$ decides each point from the photons within $r$ of it by one possibly randomised rule, the same at every point. Let $\alpha$ be the probability that $x_0$ dissolves and $\beta$ that $x_1$ does not. Then $\alpha+\beta\ge B(D):=\int\min(dP_0,dP_1)$, and $B$ does not increase with $D$. A threshold on $\sum_i\ln(\lambda_1/\lambda_0)(U_i)$ over the photons $U_i$, randomised at ties, attains $\alpha+\beta=B(D)$.

$B(D)$ is the least $\alpha+\beta$ over all tests, twice the equal-prior Bayes error. For a target $\epsilon$ on both errors, $D_{\rm floor}$ is a dose at which a computed lower bound on $B$ is at least $2\epsilon$, and $D_{\rm ach}$ one at which a computed upper bound is at most $2\epsilon$. As $B$ does not increase with $D$, no local resist of range at most $r$ has $\max(\alpha,\beta)\le\epsilon$ at any dose up to $D_{\rm floor}$. The likelihood-ratio resist, a threshold resist with the signed kernel $\ln(\lambda_1/\lambda_0)$, has $\alpha+\beta\le2\epsilon$ at $D_{\rm ach}$ for range at most $1.003\,r$, and with a threshold that balances the errors $\max(\alpha,\beta)=1.004\,\epsilon$ at the dose where $B=2\epsilon$ ($r$ = 5, 8, 12 nm). In Table 2, $D_{\rm ach}$ exceeds $D_{\rm floor}$ by 1 to 5 %.

| $r$ (nm) | $D_{\rm floor}$, $\epsilon=10^{-9}$ | $D_{\rm ach}$, $\epsilon=10^{-9}$ | $D_{\rm floor}$, $\epsilon=10^{-12}$ | $D_{\rm ach}$, $\epsilon=10^{-12}$ |
|---|---|---|---|---|
| 3 | 201.3 | 203.2 | 276.9 | 279.4 |
| 5 | 83.5 | 84.5 | 114.9 | 116.3 |
| 8 | 44.3 | 45.2 | 60.9 | 62.1 |
| 12 | 29.9 | 31.0 | 41.1 | 42.7 |
| 16 | 19.3 | 20.2 | 26.5 | 27.8 |
| 20 | 11.4 | 11.9 | 15.6 | 16.4 |
Table: Doses in mJ/cm² with $x_1$ a contact centre and $x_0$ the saddle 18 nm away, 0.33 NA, 36 nm pitch, $a=0.15$, $D$ the incident clear-field dose; floors rounded down, achievable doses up.

> **Proposition 3 (Chip level).** For such resists, in the 36 nm array at 0.33 NA, $N_c$ contacts with their nearest saddles on the axes have at least $N_c\,B(D)$ misdecided points on average, centres that do not dissolve plus saddles that do. For range at most 8 nm, doses up to 44.3 mJ/cm² and $a=0.15$, $B\ge2.1\times10^{-9}$, so $10^9$ contacts have at least 2.1 misdecided points on average.

## Why it is true

The photons absorbed in a region form a Poisson process, so by the mapping theorem a sum of jumps rounded to a lattice is a lattice compound Poisson variable. Rounding each jump $k(|x-X_i|)$ down or up to a multiple of a step $\delta$ brackets $Z$ for every photon configuration, so event probabilities are bracketed by those of the two rounded sums. For a decreasing kernel the level sets are discs; because the image is a Fourier series, the mean photon number in a disc is a finite sum of Bessel terms, enclosed in ball arithmetic. Panjer's recursion [18], on an exponentially tilted law for upper tails, gives the lattice law. The floor is the Neyman–Pearson lemma [1] with the explicit Poisson likelihood ratio [2]; thinning gives monotonicity in $D$, and the chip count is linearity of expectation. $B$ is evaluated on a lattice of signed log-likelihood-ratio jumps over cells of side $h=0.002\,r$ covering the disc. The cells hold more information than the disc, so $D_{\rm floor}$ holds for range exactly $r$; $D_{\rm ach}$ belongs to the cells, of radius at most $r+h\sqrt2$.

## How it was checked

The sandwich, the level-set reduction and the floor argument were re-derived in a separate check. The rounding-error bound of the recursion, the truncation of the tilted tails and the Taylor enclosures of the cells were not; they were checked by recomputing the numbers with other algorithms. A tilted FFT instead of Panjer's recursion reproduced all 24 bracket evaluations behind the doses, those of Table 1 among them, to $9\times10^{-8}$ relative. Fourier inversion without a lattice put all 48 floors, in two cases, inside their intervals. Importance sampling put MISS and MERGE at 60 and 90 mJ/cm², 0.33 NA, inside their brackets and agreed with the inversion for $B$ at $r=8$ nm within its 0.5 % error; it and closed-form controls, unlike the reproductions, could have falsified the mathematics.

The brackets are a certified computation in floating point with a proved relative rounding bound, not interval arithmetic; the floors use floating-point enclosures on cells, with fixed safety margins. As a stress test of the numerics, the MERGE bracket at 0.55 NA and 80 mJ/cm², 4.9 times the dose for $10^{-12}$ there, is $[1.3168,1.4826]\times10^{-54}$, ratio 1.13, reproduced to four digits; it has no process meaning. The proofs have not been peer reviewed.

## What it does not show

The model is not calibrated to any process. It has a scalar image of a thin mask, no aberration, defocus, random acid displacement or development connectivity, and a two-dimensional photon window. The dose scales as $1/a$ at every level. A Poisson number of acids per photon with mean 3, all at the photon (our choice, no source), raises the MISS dose for $10^{-9}$ at 0.33 NA from 65.0 to 83.5 mJ/cm², by 28.5 % (measured). Such choices move a dose far more than the 1.2 % bracket width.

The dose-to-size convention rescales the threshold with the dose. A real threshold is fixed, and at a fixed threshold MISS falls and MERGE rises with dose; we do not treat that window. MISS and MERGE are events at single points. MISS is part of the missing-contact event, so a dose that bounds MISS by $10^{-9}$ is necessary, not sufficient, for a missing-contact rate of $10^{-9}$. We prove no relation between MERGE and bridging.

The floor bounds misdecisions at two points, not critical dimension. It needs translation covariance, since a resist that knows the pattern can have $\alpha=\beta=0$, and an image independent of depth. It depends on the range, which we do not determine for any real resist, and on the image; we do not compare it with published doses. Like the brackets, it is for the 1313-point image; a finer grid was not tried.

## Earlier and parallel work

Lee et al. [19] modelled shot noise in contact printing in 2003 as a fluctuation of absorbed photon number. Failure probabilities have since been predicted with Gaussian random fields [3, 4, 20], simulation and compact models [5, 6, 12, 13, 21, 22], counting statistics [23], measured size distributions [11, 16], and algebraic, voxel and network models [7, 8, 9, 10, 15]. Melvin et al. [24] simulated 22 nm-pitch lines and spaces at 0.55 NA with an emulated resist at about 250 mJ/cm² and conclude that shot noise sets a minimum defectivity. We read the abstracts of these papers, those of 2023 to 2026 on 2026-11-15, and the conclusions of [24]; none states a certified bracket or a proved floor.

Gerber [25], known to us through [26], bounded stop-loss premiums by a suitably discretised compound Poisson law. Goovaerts and De Vylder [26] and Dufresne and Gerber [14] bound ruin probabilities from below and above; [14] rounds the summands of the maximal aggregate loss down and up, and its equations (8) to (11) state the sandwich. Shevchenko [27] reviews two-sided severity discretisations for Panjer's recursion. The floor inequality is the Neyman–Pearson lemma, and the likelihood ratio of Poisson processes is classical [1, 2].

We add Bessel-mass lattices, tails down to $10^{-54}$, bounds and doses for EUV events, the floor's lattice evaluation for one 0.33 NA case and the chip count. Searches of arXiv, Zenodo, Crossref and the web, 2026-11-03 to 2026-11-09, and of GitHub, 2026-11-03, found no earlier certified bracket for an EUV failure probability and no earlier proved dose floor for local resists. SPIE proceedings of 2024 to 2026 were not searched in full text.

## References

1. J. Neyman and E. S. Pearson, "On the problem of the most efficient tests of statistical hypotheses", Phil. Trans. R. Soc. Lond. A 231, 289 (1933). https://doi.org/10.1098/rsta.1933.0009
2. L. Leskelä, "Information divergences and likelihood ratios of Poisson processes and point patterns", IEEE Trans. Inf. Theory 70, 9084 (2024), arXiv:2404.00294. https://doi.org/10.1109/TIT.2024.3472448
3. A. Latypov, G. Khaira, G. L. Fenger, J. L. Sturtevant, C.-I. Wei and P. De Bisschop, "Probability prediction of EUV process failure due to resist-exposure stochastic: applications of Gaussian random fields excursions and Rice's formula", Proc. SPIE 11323, Extreme Ultraviolet (EUV) Lithography XI, 113230L (2020). https://doi.org/10.1117/12.2551965
4. Z. Pan, A. Latypov, C.-I. Wei, P. De Bisschop, G. L. Fenger and J. L. Sturtevant, "Importance sampling in Gaussian random field EUV stochastic model for quantification of stochastic variability of EUV vias", Proc. SPIE 12494, Optical and EUV Nanolithography XXXVI (2023). https://doi.org/10.1117/12.2658651
5. E. Kim, W. Kim, J. Lee et al., "Rigorous 3D probabilistic computational lithography and chip-level inspection for EUV stochastic failure detection", Proc. SPIE 12750, International Conference on Extreme Ultraviolet Lithography 2023 (2023). https://doi.org/10.1117/12.2687373
6. S. Wang, A. Latypov, S. D. Shang, G. L. Fenger, C.-I. Wei and X. Zhang, "Towards efficient and accurate cost functions for EUVL stochastic-aware OPC correction and verification: via failure probability versus image and process variation band metrics", Proc. SPIE 12953, Optical and EUV Nanolithography XXXVII (2024). https://doi.org/10.1117/12.3010912
7. A. R. Neureuther, L. T. Long, G. M. Wallraff and P. Naulleau, "Diagnosing phenomena that influence missing contacts and pillars", Proc. SPIE 12292, International Conference on Extreme Ultraviolet Lithography 2022, 122920H (2022). https://doi.org/10.1117/12.2643289
8. M. O. Neisser, "Algebraic modeling of dose to size stochastic defects", Proc. SPIE 13424, Optical and EUV Nanolithography XXXVIII (2025). https://doi.org/10.1117/12.3051447
9. H. Fukuda, "Holistic statistical models for stochastic behaviors in lithography processes", Proc. SPIE 13424, Optical and EUV Nanolithography XXXVIII (2025). https://doi.org/10.1117/12.3050370
10. H. Fukuda, "Directional graph network models for resist processes: how does randomness in EUV photon develop into pattern anomalies or is it smoothed out in resist films?", Proc. SPIE 13686, International Conference on Extreme Ultraviolet Lithography 2025 (2025). https://doi.org/10.1117/12.3071299
11. E. Novelli, C. A. Mack, G. A. Kane, K. Gu, A. Lin, D. L. Goldfarb, J. N. Ngunjiri and K. Oyekan, "Measuring contact hole distributions for use in predicting missing contact hole rates", Proc. SPIE 13981, Metrology, Inspection, and Process Control XL (2026). https://doi.org/10.1117/12.3091925
12. P. Ghosh, W. Y. Kwok, U. Welling, A. M. C. Dawes, Z. A. Levinson, E. Grubbs and K. D. Lucas, "Full-chip high sigma probabilistic modeling, defect detection and repair in advanced EUV nodes", Proc. SPIE 13980, DTCO and Computational Patterning V (2026). https://doi.org/10.1117/12.3093415
13. A. Latypov, X. Zhang, F. Shahidi, I. Bork, F. Jiang, N. Besset, L. Martin, N. Halli, S. Buisson, P. De Bisschop, W. Gillijns, R. Meng, X. Shi, J. P. Bekaert and R.-H. Kim, "Stochastic OPC reducing EUVL failure probabilities by orders of magnitude in computational and in-the-fab experimental validation: learning from the experience", Proc. SPIE 14272, International Conference on Extreme Ultraviolet Lithography 2026 (2026). https://doi.org/10.1117/12.3118311
14. F. Dufresne and H. U. Gerber, "Three methods to calculate the probability of ruin", ASTIN Bulletin 19, 71 (1989). https://doi.org/10.2143/AST.19.1.2014916
15. A. R. Neureuther, L. Long and P. Naulleau, "Modeling stochastic effects of exposure/diffusion and dissolution on missing contacts", Proc. SPIE 11609, Extreme Ultraviolet (EUV) Lithography XII, 1160914 (2021). https://doi.org/10.1117/12.2583860
16. H. Fukuda, Y. Momonoi and K. Sakai, "Estimating extremely low probability of stochastic defect in extreme ultraviolet lithography from critical dimension distribution measurement", J. Micro/Nanolith. MEMS MOEMS 18, 024002 (2019). https://doi.org/10.1117/1.JMM.18.2.024002
17. R. Fallica, J. Haitjema, L. Wu, S. Castellanos Ortega, A. M. Brouwer and Y. Ekinci, "Absorption coefficient of metal-containing photoresists in the extreme ultraviolet", J. Micro/Nanolith. MEMS MOEMS 17, 023505 (2018). https://doi.org/10.1117/1.JMM.17.2.023505
18. H. H. Panjer, "Recursive evaluation of a family of compound distributions", ASTIN Bulletin 12, 22 (1981). https://doi.org/10.1017/S0515036100006796
19. S. H. Lee, R. L. Bristol and J. E. Bjorkholm, "Shot noise and process window study for printing small contact holes using EUV lithography", Proc. SPIE 5037, Emerging Lithographic Technologies VII, 890 (2003). https://doi.org/10.1117/12.484982
20. C.-I. Wei, A. Latypov, P. De Bisschop, G. Khaira and G. Fenger, "Calibration and application of Gaussian random field models for exposure and resist stochastic in EUV lithography", Jpn. J. Appl. Phys. 61, SD0806 (2022). https://doi.org/10.35848/1347-4065/ac54f5
21. E. A. Verduijn, U. Welling, J. Tang, H.-J. Stock, U. Klostermann, W. Demmerle and P. De Bisschop, "Prediction of EUV stochastic microbridge probabilities by lithography simulations", Proc. SPIE 11323, Extreme Ultraviolet (EUV) Lithography XI, 113230K (2020). https://doi.org/10.1117/12.2552236
22. Z. A. Levinson, Y. Kandel, M. Miyagi and K. Lucas, "Predicting very rare stochastic defects in EUVL processes for full-chip correction and verification", Proc. SPIE 11609, Extreme Ultraviolet (EUV) Lithography XII, 1160915 (2021). https://doi.org/10.1117/12.2585068
23. W. D. Hinsberg, G. M. Wallraff, M. I. Sanchez, N. Megiddo and O. Kostko, "Contribution of EUV resist counting statistics to stochastic printing failures", J. Micro/Nanopattern. Mater. Metrol. 20, 014603 (2021). https://doi.org/10.1117/1.JMM.20.1.014603
24. L. S. Melvin III, U. Welling, Y. Kandel, Z. A. Levinson, H. Taoka, H.-J. Stock and W. Demmerle, "Applying stochastic simulation to study defect formation in EUV photoresists", Jpn. J. Appl. Phys. 61, SD1030 (2022). https://doi.org/10.35848/1347-4065/ac5b22
25. H. U. Gerber, "On the numerical evaluation of the distribution of aggregate claims and its stop-loss premiums", Insurance: Mathematics and Economics 1, 13 (1982). https://doi.org/10.1016/0167-6687(82)90016-6
26. M. J. Goovaerts and F. De Vylder, "A stable recursive algorithm for evaluation of ultimate ruin probabilities", ASTIN Bulletin 14, 53 (1984). https://doi.org/10.1017/S0515036100004803
27. P. V. Shevchenko, "Calculation of aggregate loss distributions", J. Operational Risk 5(2), 3 (2010), arXiv:1008.1108. https://arxiv.org/abs/1008.1108
