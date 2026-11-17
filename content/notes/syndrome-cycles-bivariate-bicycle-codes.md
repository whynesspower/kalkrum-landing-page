---
title: What circuit distance buys in bivariate-bicycle syndrome cycles
slug: syndrome-cycles-bivariate-bicycle-codes
kind: white-paper
field: Quantum error correction
date: 2026-11-15
summary: A depth-8 cycle for the 108-qubit bivariate-bicycle code keeps circuit distance 10 and lowers the logical error rate to 0.76 of IBM's at p = 0.0025 (SD6, BP-OSD). For the gross code, distance 11 at IBM's fault count gives no detectable gain at p = 0.004 and 0.005; the 756-qubit code has distance 34.
---

IBM's depth-8 syndrome cycle for the $[[108,8,10]]$ bivariate-bicycle code has circuit distance 8 [2]. We found period-8 translation-invariant cycles with distance 10; G. Pan [3] and Cheng, Guo and Pan [5] posted distance-10 cycles for this code earlier or in parallel. One of ours has 0.76 [0.68, 0.86] times IBM's per-round logical error rate at $p=2.5\times10^{-3}$ under SD6 noise and BP-OSD decoding; direct sampling resolves no benefit at $p\ge3\times10^{-3}$. For the gross code no cycle in the classes we searched has distance 12; [3] has a distance-12 cycle at 1.4 times IBM's fault count. Distance 11 at IBM's count gives no detectable gain at $4\times10^{-3}$ and $5\times10^{-3}$; [3, 5, 6] came earlier or in parallel. The $[[756,16]]$ code has distance 34, which [5] and [10] also report.

## The question

A bivariate-bicycle code has $n=2lm$ qubits and checks $H_X=(A\,|\,B)$, $H_Z=(B^T\,|\,A^T)$, with $A$, $B$ sums of three terms in the cyclic shifts $x$, $y$ of $\mathbb Z_l\times\mathbb Z_m$ [1]; the gross code $[[144,12,12]]$ has $l=12$, $m=6$, $A=x^3+y+y^2$, $B=y^3+x+x^2$. A syndrome cycle measures every check once per period of $P$ steps with one ancilla and six CNOTs per check. SD6 noise [11] puts depolarising noise of probability $p$ after each CNOT and on each idle live qubit, and a flip of probability $p$ after each reset and measurement.

The circuit distance $d_{\rm circ}$ is the least number of faults that flip no detector but flip a logical observable. For a minimum-weight decoder the logical error rate starts at order $p^{\lceil d_{\rm circ}/2\rceil}$. IBM's depth-8 cycle has $d_{\rm circ}=8$ for $[[108,8,10]]$ and 10 for the gross code [2]. Strikis, Browne and Beverland [6] proved $d_{\rm circ}\ge d_{\rm ext}$, the distance of the extended code whose columns are the data footprints of single faults, for single-ancilla CNOT cycles, and $d_{\rm circ}\le11$ for non-interleaved gross-code cycles. Interleaved cycles were open.

## What we found

> **Result 1 (Period-8 cycles that keep the distance).** Let $l=9$, $m=6$, $A=x^3+y+y^2$, $B=y^3+x+x^2$, with $A_1,A_2,A_3$ and $B_1,B_2,B_3$ their terms in the order written. With period 8, one ancilla per check, CNOT times $(3,4,5,6,1,2)$ for $A_1,A_2,A_3,B_1,B_2,B_3$ in every X check (reset at step 0, measurement at step 7) and $(5,4,3,2,7,6)$ in every Z check (reset at step 1, measurement at step 8), the circuit distance is 10 in the memory experiment of each basis, started at its cut: step 1 when the Z checks are the detectors, step 0 when the X checks are, modulo 8. Checked at 4 noisy rounds for 196 such cycles, this one included, and 13 for 153. Of the 22,608 legal uniform cycles of period 8 (no qubit in two operations in a step, each ancilla's operations within one period) with deterministic noiseless detectors, 664 have a cut in each basis and extended distance at least 8; 196 keep distance 10 and 468 have an undetected logical fault set of at most 9 faults.

Uniform, or translation-invariant, means one time vector per check type. A cut is a step from which each consecutive block of eight steps holds the whole reset-to-measurement span of one detecting-check instance and all six CNOTs of one instance of the other type. As for IBM's cycle the two cuts differ and the cycles are not segmentable (not cuttable in time, after inserting error-free idle steps, into alternating X-only and Z-only CNOT segments), unlike the circuits for which G. Pan [3] states a bound of 9 (item 1). A further 1,208 cycles with a cut in each basis have extended distance at most 7 on one side, 1,046 not examined: 196 does not count the class.

> **Result 2 (Logical error rate).** With 10 noisy rounds, perfect preparation and readout and both memory bases added, the per-round rate is $L=L_Z+L_X$, $L_b=1-(1-P_b)^{1/10}$, $P_b$ the failure probability in basis $b$. Under SD6 noise and BP-OSD decoding the cycle of Result 1 has $L$ equal to 0.76 [0.68, 0.86] times IBM's at $p=2.5\times10^{-3}$ (95% interval, two pipelines pooled, $4.4\sigma$). Direct sampling resolves no benefit from $3\times10^{-3}$ to $5\times10^{-3}$; fault-count stratified estimates (Table 1) do not exclude one at $3\times10^{-3}$, and the break-even is not located.

BP-OSD is ldpc 2.4.1: min-sum with adaptive scaling and 1000 iterations (IBM's published runs use $10^4$; no measurable change at $5\times10^{-3}$), then combination-sweep OSD of order 7, with priors at the physical $p$ (stratified rows: at $3\times10^{-3}$ for every $p$). The first pipeline samples the detector error model with independent mechanisms, the second samples the circuit exactly. Our IBM baseline is 1.03 [0.92, 1.15] times the fit printed in [1] at $p=2.5\times10^{-3}$ (first pipeline); at $4\times10^{-3}$ and $5\times10^{-3}$ it is 1.1 to 1.2 times for $[[108,8,10]]$ and 1.1 to 1.4 times for the gross code.

| Code and cycle, rounds | Noise, decoder | $p$ | Ratio of per-round rates to IBM's cycle, 95% interval | Samples |
|---|---|---|---|---|
| $[[108,8,10]]$, $d_{\rm circ}=10$, 10 | SD6, BP-OSD | $2.5\times10^{-3}$ | 0.76 [0.68, 0.86] | pooled; first 0.80 [0.68, 0.94], second 0.72 [0.60, 0.86] |
| $[[108,8,10]]$, $d_{\rm circ}=10$, 10 | SD6, BP-OSD | $3\times10^{-3}$ | 0.90 [0.70, 1.16] | first |
| $[[108,8,10]]$, $d_{\rm circ}=10$, 10 | SD6, BP-OSD | $4\times10^{-3}$ | 1.04 [0.91, 1.20] | pooled |
| $[[108,8,10]]$, $d_{\rm circ}=10$, 10 | SD6, BP-OSD | $5\times10^{-3}$ | 1.08 [0.89, 1.30] | first |
| $[[108,8,10]]$, $d_{\rm circ}=10$, 10, fault-count stratified | SD6, BP-OSD | $3\times10^{-3}$, $4\times10^{-3}$ | 0.77 [0.68, 0.88], 0.90 [0.80, 1.03] | first |
| $[[108,8,10]]$, second cycle, $d_{\rm circ}=10$, 10 | SD6, BP-OSD | $4\times10^{-3}$, $5\times10^{-3}$ | 1.01 [0.83, 1.23], 1.08 [0.90, 1.31] | first |
| $[[108,8,10]]$, $d_{\rm circ}=10$, 10 | SD6, Relay-BP-1 [13] (300 legs, first solution) | $4\times10^{-3}$, $5\times10^{-3}$ | 0.84 [0.67, 1.04], 0.94 [0.77, 1.15] | first |
| $[[108,8,10]]$, $d_{\rm circ}=10$, 10 | SI1000-style [11], resonator idle also on CNOT qubits | $2.5\times10^{-3}$ | 0.94 [0.75, 1.16] | first |
| Gross, uniform period 8, $d_{\rm circ}=11$, 12 | SD6, BP-OSD | $4\times10^{-3}$, $5\times10^{-3}$ | 1.04 [0.90, 1.20], 1.05 [0.93, 1.18] | pooled |
| Gross, period 10, $d_{\rm circ}=12$, 12 | SD6, BP-OSD | $4\times10^{-3}$ | 7.1 [5.5, 9.2] | first; second 6.3 [4.8, 8.3] |
| Gross, period 10, $d_{\rm circ}=12$, 12 | SD6, BP-OSD | $5\times10^{-3}$ | 8.5 [6.6, 10.8] | first; second 7.0 [5.2, 9.6] |
| Gross, period 10, $d_{\rm circ}=12$, 12 | SI1000-style [11], resonator idle also on CNOT qubits | $2.5\times10^{-3}$ | 0.90 [0.68, 1.19] | first |
| Gross, period 10, $d_{\rm circ}=12$, 12 | SI1000-style [11], resonator idle on non-operating qubits only | $2.5\times10^{-3}$ | 1.37 [0.96, 1.97] | second |
Table: Table 1. Per-round logical error rates relative to IBM's cycle.

> **Proposition 3 (Fault-location count).** Let every data qubit of an $[[n,k]]$ bivariate-bicycle code lie in three X and three Z checks. A cycle with separate reset and measurement, each ancilla reset one step before its first CNOT and measured one step after its last, has $n(P+2)+I$ SD6 fault locations per period of $P$ steps, with data qubits live in every step and ancillas live strictly between reset and measurement. Here $I=\sum_c(\mathrm{span}_c-5)\ge0$ over all $n$ checks, $\mathrm{span}_c$ being the last minus the first CNOT time of $c$. A legal cycle has $P\ge8$ and $\mathrm{span}_c\le P-3$, so at $P=8$ $I=0$: every legal period-8 cycle has $10n$ locations, 1440 for the gross code, IBM's count.

> **Result 4 (Obstructions to distance 12).** For the gross code $[[144,12,12]]$, every cycle evaluated in the classes of Table 2 has an explicit undetected logical fault set of at most 11 faults in the periodic bulk, contained in every memory experiment long enough to hold it. None has $d_{\rm circ}=12$.

| Class | Cycles | Fault locations, IBM's = 1 |
|---|---|---|
| (a) uniform, period 8, all hook orders | 22,608 | 1.00 |
| (b) uniform, periods 9, 10, 11, 12, compact (no idle step in an ancilla's window), hook orders (CNOT order within a check) of maximal extended distance | 4,160; 5,728; 7,296; at period 12, 8,864 of 10,432, one per class of equal fault sets (the rest assumed equal) | 1.10, 1.20, 1.30, 1.40 |
| (c) two-coloured (two translation classes of checks with different time vectors, one colouring for X and Z checks), period 8, seven top hook-order classes | 416,496 up to colour exchange | 1.00 |
| (d) uniform, period 7, reset and measurement fused (one step, two fault locations; outside Proposition 3) | 8,784 | 0.90 |
Table: Table 2. Classes of gross-code cycles searched.

> **Result 5 (Distance 11 at IBM's fault count).** The uniform period-8 gross-code cycle with $d_{\rm circ}=11$ (G. Pan's [3], item 27; ours is the same with all times shifted by one step) has 1.04 [0.90, 1.20] and 1.05 [0.93, 1.18] times IBM's per-round rate at $p=4\times10^{-3}$ and $5\times10^{-3}$ (12 rounds, SD6 noise, BP-OSD, two pipelines pooled).

> **Result 6 (Distance of the $[[756,16]]$ code).** Let $l=21$, $m=18$, $A=x^3+y^{10}+y^{17}$, $B=y^5+x^3+x^{19}$, $H_X=(A\,|\,B)$, $H_Z=(B^T\,|\,A^T)$, so $n=756$ and $k=16$. The code distance $d=\min(d_X,d_Z)$, with perfect measurements, is 34.

## Why it is true

**Result 1.** A single fault leaves on the data a frame that is zero, one qubit, or a suffix of one check's CNOT order, so per fault type its footprint is one of $5n/2$ columns and $d_{\rm circ}\ge d_{\rm ext}$ [6]; here $d_{\rm ext}=8$. A logical fault set of at most 9 faults has at most one fault per column (two would give at least $8+2>9$); its odd columns form an extended logical $v$, completed by at most $9-|v|$ zero-footprint faults so that every detector is even. All 586 extended logicals of weight at most 9 per fault type, up to translation, fail this test, so $d_{\rm circ}\ge10$; a weight-10 logical on the data gives $d_{\rm circ}\le10$.

**Proposition 3.** A period holds $6n$ CNOTs, $n$ resets, $n$ measurements, $n(P-6)$ data idle and $I$ ancilla idle locations:

$$
6n+n+n+n(P-6)+I \;=\; n(P+2)+I .
$$

**Result 6.** Every qubit lies in three X checks, so $\ker H_X$ has even weights only, and a weight-preserving map exchanges X and Z. A minimum-weight logical has no proper non-empty subset with empty syndrome, so an exhaustive search over connected sets of qubits [7, 8] finds it: no Z-logical has weight at most 32, so $d\ge34$ by parity, and three of weight 34 give $d\le34$.

## How it was checked

Proposition 3 is proved; Results 1, 4 and 6 are exhaustive computations; Results 2 and 5 are measurements. For Result 1 a separately written pipeline re-derived all 196 passes at 4 rounds, 153 of them at 13 rounds, and 49 of the 468 failures; the other 419 rest on our solver. For other numbers of rounds the distance rests on an embedding lemma not proved in full. Both pipelines of Result 2 use one decoder library. The fault sets of Result 4 (a) and (d) were all replayed in separately written circuits, those of (b) and (c) in part; the value 11 in Result 5 rests on [3] and our enumerators. For Result 6 separately written code re-executed all tasks of the weight-30 search and 22.99% of the nodes of the weight-32 search; the other 77.01% rests on the solver's output and a soundness proof. The proofs and computations have not been peer reviewed and give no machine-checkable proof object.

## What it does not show

The distance 10 of Result 1 is the cut-aligned per-basis value; other starting phases can give less and were not tested. Result 2 concerns one cycle and $p\ge2.5\times10^{-3}$, and Table 1 shows no detectable gain under Relay-BP-1 or SI1000-style noise. The period-10 loss, also found by [3] (item 32), is significant only under SD6 with idle noise; the SI1000-style runs are inconclusive. Result 4 is an obstruction in classes, not a proof for the problem: other classes, flags, reset-free ancillas and other noise are not covered.

## Earlier and parallel work

**IBM's cycle.** [1] prints $d_{\rm circ}\le6,8,8,10$. Kornstein [2] posted the lower bounds on 2026-10-15, Crocker [12] those for the gross and 108-qubit codes on 2026-10-18, and G. Pan [3] on 2026-10-26 (item 23). [6] gives $d_{\rm circ}\ge d_{\rm ext}$, $P\ge8$ and the idle counts; Proposition 3 gives the closed count.

**108-qubit code.** G. Pan [3] posted a depth-8 circuit with distance 10 and row-parity-dependent CNOT order (item 2, 2026-10-05) and a translation-invariant period-11 circuit with distance 10 (item 26, 2026-10-29). Cheng, Guo and Pan [5] (2026-11-05) found distance 10 for 1,424 of 8,496 uniform depth-seven schedules at six cycles in both bases; we have not compared their list with ours. Result 1 adds period-8 cycles with one CNOT order per check type, and the census of that class.

**Gross code.** [6] conjectured $d_{\rm circ}=11$ for a three-coloured depth-8 cycle; Result 4 is not restricted to non-interleaved cycles. G. Pan [3] posted $d_{\rm circ}=11$ for that cycle (item 3, 2026-10-05), $d_{\rm circ}\le10$ for two-colour left-right circuits (item 5, 2026-10-05), the fused model with a period-7 impossibility result for $[[18,4,4]]$ (item 25, 2026-10-27), a period-10 circuit with $d_{\rm circ}=12$ and two idle steps per ancilla window and the uniform period-8 cycle with $d_{\rm circ}=11$ of Result 5, and bounds of 11 at periods 8 and 9 for uniform cycles (items 27 and 28, 2026-10-30). [5] found no uniform depth-seven schedule at 12 and 428 at 11, 100 in eight timesteps, against four uniform period-8 cycles with $d_{\rm circ}=11$ in our census (two classes of equal fault sets); classes and counting differ. Crocker [4] enumerated the uniform depth-8 class of the two-gross code, 22,608 cycles, on 2026-10-22.

**Error rates.** [3] reports little or no gain from larger circuit distance with practical decoders for a non-uniform two-colour 108-qubit circuit at $p\ge10^{-3}$ (item E-016, unreviewed) and for $[[54]]$ morphing circuits at $5\times10^{-4}$ to $10^{-3}$ (item 12, 2026-10-11). It reports period-10 and period-11 gross circuits worse than IBM's at $p\ge1.5\times10^{-3}$ under SD6 and BP-OSD (item 32, 2026-11-01) and, in audits E-003 and E-026, for the cycle of [6] against IBM's, 1.37 [1.04, 1.78] at $5\times10^{-3}$ (X and Z; 1.12 [0.87, 1.45] with equal boundaries; verdict inconclusive) and 2.2 [1.4, 3.7] at $2\times10^{-3}$ (Z memory). [5, Section 9.7] reports an eight-timestep distance-11 schedule "within statistical error" of IBM's standard schedule at every $p$ from $2.5\times10^{-3}$ to $8\times10^{-3}$ under BP-OSD (largest difference 13%); whether it is ours is not established. We found no earlier measurement for the cycle of Result 1 in Zenodo, arXiv and web searches to 2026-11-09.

**Code distances.** Falcone [9] posted $d\ge14$ for $[[756,16]]$ on 2026-08-29. The DistQLDPC log [10] gave $d\ge30$ on 2026-10-22, a weight-34 witness on 2026-10-23, $d\ge32$ on 2026-10-31 and $d=34$ on 2026-11-07, from one engine and without a proof object; [5] reports $d=34$ on 2026-11-05. Our record, also without a proof object, is dated 2026-10-30.

## References

1. S. Bravyi, A. W. Cross, J. M. Gambetta, D. Maslov, P. Rall and T. J. Yoder, "High-threshold and low-overhead fault-tolerant quantum memory", Nature 627, 778-782 (2024), arXiv:2308.07915. https://doi.org/10.1038/s41586-024-07107-7
2. M. Kornstein, "Data and code for 'The gross code's depth-8 syndrome cycle has circuit distance 10'", Zenodo dataset v1 (2026-10-15), doi:10.5281/zenodo.23394575. https://zenodo.org/doi/10.5281/zenodo.23394575
3. Guancheng Pan, "Minimum period of distance-preserving syndrome extraction for bivariate-bicycle codes" and research log (STATE file of the research directory), GitHub repository GavinNull/gross-code-distance-12, branch main as read on 2026-11-15, release v3.0 (2026). https://github.com/GavinNull/gross-code-distance-12
4. C. Crocker, "A 16-fault undetectable logical error in the depth-8 syndrome cycle of the two-gross code $[[288,12,18]]$, and every uniform depth-8 cycle", Zenodo, versions 1.0 (2026-10-21) to 3.2 (2026-11-02), doi:10.5281/zenodo.23875528. https://zenodo.org/doi/10.5281/zenodo.23875528
5. B. Cheng, N. Guo and F. Pan, "Certifying quantum code and circuit distances at scale", arXiv:2611.08247 v1 (2026-11-05). https://arxiv.org/abs/2611.08247
6. A. Strikis, D. E. Browne and M. E. Beverland, "High-performance syndrome extraction circuits for quantum codes", arXiv:2603.05481 v2 (2026). https://arxiv.org/abs/2603.05481
7. M. Rowshan and S. Devitt, "Logical operator decomposition for distance analysis of bivariate bicycle codes", arXiv:2609.39395 (2026). https://arxiv.org/abs/2609.39395
8. I. Dumer, A. A. Kovalev and L. P. Pryadko, "Distance verification for classical and quantum LDPC codes", IEEE Trans. Inf. Theory 63, 4675-4686 (2017), arXiv:1611.07164. https://doi.org/10.1109/TIT.2017.2690381
9. J. Falcone, "Orbit reduction for quantum code distance: a counterexample, certified bounds for bivariate bicycle codes, and two published bounds tightened", Zenodo, version 1.0.1 (2026-08-29), doi:10.5281/zenodo.22161592. https://zenodo.org/doi/10.5281/zenodo.22161592
10. Yu-Fang Chen and Ching-Yi Lai, DistQLDPC benchmark matrix status log (README of the data/matrices directory), GitHub repository guluchen/DistQLDPC, as read on 2026-11-15. https://github.com/guluchen/DistQLDPC/blob/main/data/matrices/README.md
11. C. Gidney, M. Newman, A. Fowler and M. Broughton, "A fault-tolerant honeycomb memory", Quantum 5, 605 (2021), arXiv:2108.10457. https://arxiv.org/abs/2108.10457
12. C. Crocker, "The gross code's syndrome circuit has circuit-level distance 10: an exhaustive lower bound", Zenodo (2026-10-18), doi:10.5281/zenodo.23452754. https://zenodo.org/records/23452754
13. T. Müller, T. Alexander, M. E. Beverland, M. Bühler, B. R. Johnson, T. Maurer and D. Vandeth, "Improved belief propagation is sufficient for real-time decoding of quantum memory", arXiv:2506.01779 (2025). https://arxiv.org/abs/2506.01779
