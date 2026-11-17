---
title: Steep-switch limits and minimum energy per switching event
slug: steep-switch-limits
kind: note
field: Chip design
date: 2026-11-15
summary: For a ballistic source whose mode density falls no faster than an Urbach tail, we prove a closed-form bound on the on/off ratio and find its exact extremiser. The minimum supply energy per switching event reduces to the class's exact on/off frontier; the cold-source gain depends on two floors.
---

For a ballistic switch whose source mode density falls no faster than an Urbach tail of energy $E_U$ and spans a range $R$, the on/off ratio at supply $V_{DD}$ is at most $\min(e^{sw},Re^{w/kT})$, with $s=1/E_U+1/kT$, $w=qV_{DD}/m$ and body factor $m$. One clipped Urbach ramp attains the supremum. The minimum supply energy per switching event reduces to the exact frontier of the class. Earlier work gave swings for band tails, transmission shapes and Dirac sources [1, 2, 3, 4, 5, 6] and the thermionic minimum-energy supply [7, 8]; Han et al. [9] posted related work on 2026-10-07. In arXiv, Zenodo and web searches to 2026-11-15 we found no earlier bound over the whole class, no exact extremiser and no minimum-energy analysis of circuits built from devices of such a class, beyond the constant-swing theory of [8].

## The question

Thermionic injection over a barrier with a Boltzmann tail limits the swing, the gate voltage per decade of current, to at least $(kT/q)\ln 10=59.5$ mV at 300 K; the supply follows the swing, and the switching energy the square of the supply. A cold source filters the tail: its mode density falls above the barrier [10]. Beyond the swing minima of [1] to [6], we ask how far that lowers the swing, what it costs in range $R$ and what it gains in energy.

## What we found

Let $g(E)$ be the number of ballistic modes at energy $E$ and $f$ the Fermi function at $\theta=kT$. A gate lowers the barrier top by $q/m$ of energy per volt, from $\varepsilon_{\rm off}$ to $\varepsilon_{\rm on}=\varepsilon_{\rm off}-w$. For step transmission and a drain that refills nothing, the current is proportional to $I(\varepsilon)=\int_\varepsilon^\infty gf\,dE$.

> **Theorem 1 (Steep-switch Pareto bound).** Let $g\in[g_{\rm fl},g_{\max}]$, $R=g_{\max}/g_{\rm fl}$, and $g(E')\ge g(E)e^{-(E'-E)/E_U}$ for $E<E'$.
> (a) $I(\varepsilon_{\rm on})/I(\varepsilon_{\rm off})\le U:=\min(e^{sw},Re^{w/\theta})$.
> (b) The supremum is attained by a clipped Urbach ramp: $g_{\max}$ up to $\xi\in[\varepsilon_{\rm off}-L,\varepsilon_{\rm off}]$, then falling as $e^{-(E-\xi)/E_U}$ to $g_{\max}/R$, then constant, with $L=E_U\ln R$. For Boltzmann statistics, $f\propto e^{-E/\theta}$, it lies between $\frac{u}{1+u}U$ and $U$, with $u=E_U/\theta$.

For Boltzmann statistics, once $w$ exceeds $L$ by several $kT$, each decade of $R$ lowers the supply for a fixed on/off ratio by $59.5\,m$ mV at 300 K, whatever $E_U$.

A circuit has gates of switched capacitance $C$, equal for all device classes, logic depth $L_d$, activity $\alpha$ (probability of a 0-to-1 transition per cycle) and clock period $\kappa L_dKCV_{DD}/I_{\rm on}$ (slack $\kappa\ge1$, delay factor $K$). With $S=I_{\rm on}/I_{\rm off}$ and $v=qV_{DD}/kT$, the supply energy per switching event of a node (one 0-to-1 transition, a full charge and discharge), in units of $kT$, is

$$
\mathcal E(v)=c\,v^2\Big(1+\frac{b}{S(v)}\Big),\qquad c=\frac{C\,kT}{q^2},\quad b=\frac{\kappa K L_d}{\alpha},
$$

with $c=C/(6.2\ {\rm aF})$ at 300 K. A supply floor $v_0$ is an input; without one $\mathcal E\to0$.

> **Proposition 2 (Reduction to the frontier).** Let a device class have frontier $S^*(v)=\sup S(v)$, attained and continuous. Since the energy decreases in $S$, the least energy over devices and supplies $v\ge v_0$ with $S^*(v)\ge S_f$, a required on/off level, is $\min c\,v^2(1+b/S^*(v))$, attained by the extremal device tuned to the optimal supply.

> **Result 3 (Cold-source gain).** At 300 K, for $E_U=25$ meV, $R=10^3$, $m=1$ and equal $C$, replacing $S^*$ by $U$ gives a cold-source minimum energy of at least $(u/(1+u))^2=0.24$ of the thermionic minimum for $b=200$, $10^3$ and 2500, whenever the supply floor is below the cold-source optimum. The exact frontier is within 0.3 % of this bound.

| Supply floor | $b=200$ | $b=10^3$ | $b=2500$ |
|---|---|---|---|
| Gain-of-one supply $2\ln(1+\mu)\,kT/q$ (an inverter's small-signal gain is one), 36 mV at $\mu=1$, or any floor below 76, 102, 116 mV | 0.24 | 0.24 | 0.24 |
| $8kT/q=207$ mV, an illustrative floor for every device | 0.94 | 0.75 | 0.60 |
Table: Cold-source over thermionic minimum energy; $\mu$ is the branch slope in $kT/q$, $S=e^{v/\mu}$. Ho et al. [11] quote the 36 mV as the Swanson–Meindl bound.

With single-node $kT/C$ noise at error probability $10^{-9}$ and $b=10^3$, the 0.24 needs $C$ above about 58 aF; the ratio is 0.93 at 10 aF.

## Why it is true

The Urbach condition gives $I(\varepsilon)\ge\Phi\,g(\varepsilon)f(\varepsilon)$ with $\Phi=\int_0^\infty e^{-x/E_U}\frac{f(\varepsilon+x)}{f(\varepsilon)}dx\ge\frac{E_U\theta}{E_U+\theta}=\frac1s$, because $f(E+x)/f(E)\ge e^{-x/\theta}$. Integrating $-d\ln I/d\varepsilon\le s$ gives $e^{sw}$; $g_{\rm fl}\le g\le g_{\max}$ gives the range bound. For the extremiser, the Urbach condition bounds $g$ above for $E<\varepsilon_{\rm off}$ and below for $E>\varepsilon_{\rm off}$ by exponentials through $(\varepsilon_{\rm off},g(\varepsilon_{\rm off}))$, clipped to the range. These form a clipped ramp, admissible because clipping preserves the Urbach condition. For Boltzmann statistics the ramp with $\xi=\varepsilon_{\rm off}-\min(w,L)$ gives at least $\frac{u}{1+u}U$; for the Fermi function this is numerical. For $S=e^{v/\mu}$ the minimum energy scales as $\mu^2$, and $e^{sw}$ has $\mu=m\,u/(1+u)$, against $\mu=m$ for thermionic injection.

## How it was checked

Theorem 1 and Proposition 2 are proved; a separate check re-derived them, Theorem 1 step by step. A separately written program computed the supremum of Theorem 1 in 240 cases, and an outer linear program that does not use the ramp reduction gave upper bounds within a relative $5.3\times10^{-4}$. A separately written library recomputed 120 exact-frontier energies to $1.1\times10^{-8}$ relative. Result 3 is a certified computation: interval arithmetic encloses its four ratios; the 0.3 % and the noise numbers are double precision. The standalone checkers of the two sets of results caught all 24 and all 57 deliberate corruptions of the data and formulas. The circuit model is not validated against measurements. The proofs have not been peer reviewed.

## What it does not show

The models are ballistic and quasi-static, with a rigid barrier shift, step transmission and no leakage beyond the floor $g_{\rm fl}$; they omit rethermalisation, variability, wire delay and reliability margins, and the optimum runs at whatever speed the device then gives. The values $b=200$ to 2500 are depth 20 to 50 and activity 0.1 to 0.02 with $K=\kappa=1$. A channel band edge or barrier-top tunnelling caps the swing further: a 5 nm parabolic barrier with $m^*=0.2m_0$, $V_0=0.2$ eV and fixed curvature limits it to no less than 57 mV per decade at $m=1$ for any source. The class is a one-sided condition on the mode count: an ideal Dirac cone lies in it only for small $E_U$, localised tail states that do not conduct are outside it, and we know of no measured $E_U$ and $R$ for a cold source. The exact-frontier values are for a Boltzmann on-state; a degenerate one raises the energy.

## Earlier and parallel work

Beckers et al. [1] (arXiv 2018) and Bohuslavskyi et al. [2] derived the low-temperature saturation of the swing, set by the width of an exponential channel band tail; Ghosh [3] gave swings for single transmission shapes. Baccichetti et al. [4] gave the closed forms and the minima for ideal Dirac cones, 37 and 30 mV per decade at 300 K; they note a similar expression in a 2020 conference paper of Liu et al. that we could not read. Liu et al. [5] gave 37 mV per decade for a linear Dirac source in 2018, and Wu and Appenzeller [6] reproduced it in simulation. Han et al. [9] relate the voltage window for four decades of current to the Urbach energy of a channel band tail, with no class bound or extremiser. Several full texts could not be read.

Calhoun and Chandrakasan [7] presented the Lambert-W minimum-energy supply of a thermionic circuit in 2004, and Truesdell et al. [8] show that at fixed battery voltage the optimum supply and minimum energy scale with the swing; with the supply equal to $V_{DD}$, as here, the energy scales as its square. We add the reduction over devices and the cold-source gain with its floors; the accepted manuscript of [8] has no Urbach or range class and no reduction over devices.

## References

1. A. Beckers, F. Jazaeri and C. Enz, "Theoretical Limit of Low Temperature Subthreshold Swing in Field-Effect Transistors", IEEE Electron Device Lett. 41, 276 (2020), arXiv:1811.09146. https://doi.org/10.1109/LED.2019.2963379
2. H. Bohuslavskyi et al., "Cryogenic Subthreshold Swing Saturation in FD-SOI MOSFETs Described With Band Broadening", IEEE Electron Device Lett. 40, 784 (2019), arXiv:1903.05409. https://doi.org/10.1109/LED.2019.2903111
3. A. W. Ghosh, "Transmission Engineering as a Route to Subthermal Switching", IEEE J. Electron Devices Soc. 3, 135 (2015), arXiv:1510.00824. https://doi.org/10.1109/JEDS.2015.2411622
4. E. Baccichetti, R. Marcon and D. Esseni, "Minimum Subthreshold Swing in DS-FETs Based on Graphene and 3D Dirac Metals", IEEE Electron Device Lett. 46, 2204 (2025). https://doi.org/10.1109/LED.2025.3612489
5. F. Liu, C. Qiu, Z. Zhang, L.-M. Peng, J. Wang and H. Guo, "Dirac Electrons at the Source: Breaking the 60-mV/Decade Switching Limit", IEEE Trans. Electron Devices 65, 2736 (2018). https://doi.org/10.1109/TED.2018.2836387
6. P. Wu and J. Appenzeller, "Design Considerations for 2D Dirac-Source FETs: Device Parameters, Non-Idealities and Benchmarking", arXiv:2203.11248 (2022). https://arxiv.org/abs/2203.11248
7. B. H. Calhoun and A. Chandrakasan, "Characterizing and modeling minimum energy operation for subthreshold circuits", Proc. ISLPED 2004, 90 (2004). https://doi.org/10.1145/1013235.1013265
8. D. S. Truesdell, S. Z. Ahmed, A. W. Ghosh and B. H. Calhoun, "Minimum-Energy Digital Computing With Steep Subthreshold Swing Tunnel FETs", IEEE J. Explor. Solid-State Comput. Devices Circuits 6, 138 (2020). https://doi.org/10.1109/JXCDC.2020.3024798
9. Z. Han et al., "Band Tail States: Speed Bump or End of the Road for Two-Dimensional Semiconductors?", arXiv:2610.10953 (2026). https://arxiv.org/abs/2610.10953
10. C. Qiu et al., "Dirac-source field-effect transistors as energy-efficient, high-performance electronic switches", Science 361, 387 (2018). https://doi.org/10.1126/science.aap9195
11. A. Ho, E. Erdil and T. Besiroglu, "Limits to the Energy Efficiency of CMOS Microprocessors", arXiv:2312.08595 (2023). https://arxiv.org/abs/2312.08595
