/**
 * Results of the limits-and-certificates line: exact bounds, proofs and certified optima in physics, materials and
 * chip design. Same shape and markup as content/results.ts, which merges these in. Each entry names the research
 * note (content/notes/<slug>.md) that sets it out in full.
 */
import type { Domain, Result } from "./results";

/** New fields, in page order. */
export const frontierDomains: Domain[] = [
  {
    id: "superconductivity",
    title: "Superconductivity",
    intro:
      "Eliashberg theory gives the transition temperature of a phonon-mediated superconductor from its spectrum. A ceiling in terms of the coupling and the mean square phonon frequency was stated in the 1970s and conjectured sharp in 2025; Kondratev posted the first complete proof we know of in September 2026. These entries give our proof, its extensions to several bands, anisotropy and Coulomb terms, and tests against published data.",
    results: [
      {
        id: "eliashberg-sharp-bound",
        topic: "Eliashberg theory",
        claim:
          "In linearised Eliashberg theory with `μ^{*} = 0`, `T_{c} < C_{∞} √(λ⟨ω²⟩)` for every spectrum, with `C_{∞} ∈ [0.18272624777228, 0.18272624777235]`, and no spectrum attains it.",
        context:
          "`T_{c}` is the linear-instability temperature of isotropic Migdal–Eliashberg theory; Leavens (1977) and Moussa and Cohen (2006) stated the bound, Kiessling, Altshuler and Yuzbashyan conjectured it sharp and Kondratev posted the first complete proof we know of on 19 September 2026. Siraj posted a parallel proof with a Lean-checked enclosure of `C_{∞}` on 13 and 14 November 2026, and we add a tighter enclosure and certified values of the Einstein function `f(λ)` at 49 couplings.",
        evidence: {
          level: "certified",
          text: "Proved. The proof was re-derived and the constant recomputed by separately written code, whose own interval enclosure is `10^{-6}` wide, so the 13 digits rest on one interval method. Not peer reviewed.",
        },
        refs: [
          { label: "Kondratev (2026), Zenodo preprint", href: "https://doi.org/10.5281/zenodo.22848039" },
          { label: "Kiessling, Altshuler and Yuzbashyan II (2025), J. Stat. Phys. 192, 94", href: "https://arxiv.org/abs/2409.00532" },
          { label: "Moussa and Cohen (2006), Phys. Rev. B 74, 094520", href: "https://arxiv.org/abs/cond-mat/0607832" },
        ],
        figure: { value: "0.1827", caption: "the sharp constant `C_{∞}` in `T_{c} < C_{∞} √(λ⟨ω²⟩)`" },
        note: "superconducting-tc-ceiling",
      },
      {
        id: "eliashberg-transition-continuous",
        topic: "Nonlinear transition",
        claim:
          "In the nonlinear isotropic Eliashberg equations without spin flips, for a real gap even in Matsubara frequency, no nonzero solution exists at or above the linear-instability temperature `T_{c}`, and at `μ^{*} = 0` exactly one positive solution exists below it, vanishing at `T_{c}`; no complex even-frequency gap exists wherever the linear stability form is non-negative.",
        context:
          "Kiessling, Altshuler and Yuzbashyan conjectured the thermodynamic picture (Conjecture 1 of part II) and left the nonlinear equations for later; Siraj posted overlapping results at `μ^{*} = 0` on 13 and 14 November 2026, including uniqueness of the global minimiser without time-reversal symmetry. The kernel must be non-increasing, a certified unphysical signed kernel breaks the statements, and the spin-flip solutions of Yuzbashyan and Altshuler are not covered.",
        evidence: {
          level: "certified",
          text: "Proved. Re-derived by a second party and by separately written code, with the exact identities checked in interval arithmetic on finite instances. Not peer reviewed.",
        },
        refs: [
          { label: "Kiessling, Altshuler and Yuzbashyan II (2025), J. Stat. Phys. 192, 94", href: "https://arxiv.org/abs/2409.00532" },
          { label: "Siraj (2026), Zenodo", href: "https://doi.org/10.5281/zenodo.24234156" },
          { label: "Yuzbashyan and Altshuler (2022), Phys. Rev. B 106, 014512", href: "https://arxiv.org/abs/2205.06442" },
        ],
        note: "superconducting-tc-ceiling",
      },
      {
        id: "eliashberg-coulomb-soft-limit",
        topic: "Coulomb term",
        claim:
          "In linearised isotropic Migdal–Eliashberg theory (`T_{c}` the linear-instability temperature), with a symmetric-convention Coulomb pseudopotential, the supremum of `T_{c}/√(λ⟨ω²⟩)` over all spectra is the soft-phonon limit, never attained, for `μ^{*} = 0.10, 0.13` and `N_{c} = 5, 10, 20, 40` Matsubara indices carrying the Coulomb term; at `μ^{*} = 0.10`, `N_{c} = 5` it lies in `[0.1610043065467, 0.1610043065500]`.",
        context:
          "Siraj states the ceiling for every `μ^{*} ≥ 0` and constants for `(2πT)²/(λ⟨ω²⟩)` within 0.051% above the soft limit at `μ^{*} = 0.05, 0.10, 0.15, 0.20, 0.30` and `N_{c} ≤ 40` (symmetric cutoff, proof sketch), and for other `μ^{*} ≥ 0.05` the constant of the grid value below; we prove that the supremum is the soft limit, enclose it to `3.4 × 10^{-12}` and cover continuous ranges of `μ^{*}`. At `μ^{*} = 0` the value is the constant of Kiessling, Altshuler and Yuzbashyan, which Kondratev proved sharp.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. A certified cover of the Einstein parameter in ball arithmetic; the eight brackets were re-certified with separately written code, the sweep of `μ^{*}` up to 0.31 (`N_{c} = 5`) and 0.40 (`N_{c} = 10, 20, 40`) by one checker, apart from two of its 151 intervals. Not peer reviewed.",
        },
        refs: [
          { label: "Kondratev (2026), Zenodo preprint", href: "https://doi.org/10.5281/zenodo.22848039" },
          { label: "Siraj (2026), Zenodo", href: "https://doi.org/10.5281/zenodo.24234156" },
        ],
        note: "superconducting-tc-ceiling",
      },
      {
        id: "eliashberg-standard-convention",
        topic: "Standard convention",
        claim:
          "In linearised isotropic Migdal–Eliashberg theory, with the Coulomb term on `N_{c}` Matsubara indices in the standard Morel–Anderson convention and the problem truncated to 100, 200 or 400 Matsubara sites, the supremum of `T_{c}/√(λ⟨ω²⟩)` over all spectra is the soft-phonon limit in 58 certified cases with `μ^{*}` up to 1.00; for `μ^{*} = 0.10`, `N_{c} = 5` and 200 sites it lies in `[0.160681795345, 0.160681795346]`.",
        context:
          "The constants belong to the truncated problem and fall by `1.6 × 10^{-7}` between 200 and 400 sites, so they are not bounds for the infinite one, and the statement fails for `N_{c} = 1` from about `μ^{*} = 12`. Siraj states the ceiling for `μ^{*} ≥ 0` in both conventions; we found no earlier statement of this supremum in the sources searched (arXiv, Zenodo, Crossref, web search), last on 15 November 2026.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. A separately written certifier of different design certifies all 58 cases. Not peer reviewed.",
        },
        refs: [
          { label: "Siraj (2026), Zenodo", href: "https://doi.org/10.5281/zenodo.24234156" },
          { label: "Kondratev (2026), Zenodo preprint", href: "https://doi.org/10.5281/zenodo.22848039" },
        ],
        note: "superconducting-tc-ceiling",
      },
      {
        id: "eliashberg-multiband-bound",
        topic: "Several bands",
        claim:
          "In linearised multiband Migdal–Eliashberg theory at `μ^{*} = 0`, with `T_{c}` the linear-instability temperature, for any number of bands with band weights `N_{i}`, symmetric non-negative pair couplings `N_{i}M_{ij} = N_{j}M_{ji}`, finite `λ_{ij}` for `i ≠ j` and unequal spectral shapes, `T_{c} < C_{∞} √ρ(M)`, where `ρ(M)` is the largest eigenvalue of `(√(N_{i}/N_{j}) M_{ij})` and `M_{ij} = λ_{ij}⟨ω²⟩_{ij}`.",
        context:
          "Moussa and Cohen stated this bound in 2006 without derivation; Siraj states it on 13 and 14 November 2026 for a common spectrum, Lean-checked in the even sector, and for pair-dependent spectra with a proof sketch. The bound is sharp when all row sums of `M` are equal.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. The proof reduces to one two-band lemma, certified in ball arithmetic and re-certified with separately written code, and takes the single-band theorem and the enclosure of its constant as input. Not peer reviewed.",
        },
        refs: [
          { label: "Moussa and Cohen (2006), Phys. Rev. B 74, 094520", href: "https://arxiv.org/abs/cond-mat/0607832" },
          { label: "Siraj (2026), Zenodo", href: "https://doi.org/10.5281/zenodo.24234156" },
        ],
        note: "superconducting-tc-ceiling",
      },
      {
        id: "eliashberg-multiband-supremum",
        topic: "Multiband supremum",
        claim:
          "In linearised multiband Migdal–Eliashberg theory at `μ^{*} = 0`, at fixed pair masses `M_{ij}` and band weights `N_{i}`, with finite `λ_{ij}` for `i ≠ j`, the supremum of the linear-instability temperature `T_{c}` over all spectral shapes lies in `[C_{∞}√R^{*}, C_{∞}√R^{*} (1 + 1.8001 × 10^{-5})]`, where `R^{*} = max_{S} Σ_{i,j∈S} N_{i}M_{ij} / Σ_{i∈S} N_{i}` over sets `S` of bands, and the excess is at least `1.65 × 10^{-5}` for a two-band model.",
        context:
          "`R^{*} ≤ ρ(M)`, with equality for equal row sums, and the excess comes from one dip of a Schur-complement operator that only a very unequal band weight, `10^{8}` here, makes visible. We found no earlier statement of this supremum in the sources searched (arXiv, Zenodo, Crossref, web search), last on 15 November 2026.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. The key lemma was re-certified with separately written code at the stated constant, which also certifies the excess `1.65 × 10^{-5}`, while our own checker certifies `1.70 × 10^{-5}`. Not peer reviewed.",
        },
        refs: [
          { label: "Moussa and Cohen (2006), Phys. Rev. B 74, 094520", href: "https://arxiv.org/abs/cond-mat/0607832" },
          { label: "Siraj (2026), Zenodo", href: "https://doi.org/10.5281/zenodo.24234156" },
        ],
        note: "superconducting-tc-ceiling",
      },
      {
        id: "eliashberg-anisotropic-ceiling",
        topic: "Anisotropy",
        claim:
          "For a Fermi surface with symmetric positive spectral kernels, second-moment kernel `M(x, y) = λ⟨ω²⟩(x, y)` and bounded row integrals, `T_{c} ≤ C_{∞} √ρ(M)` with `ρ(M)` the norm of `M` on `L²`; at fixed `M` the supremum over spectral shapes lies in `[C_{∞}√R^{*}, C_{∞}√R^{*} (1 + 1.8001 × 10^{-5})]`, with `R^{*} = sup_{S} ∫_{S}∫_{S} M dμ dμ / μ(S)` over regions `S` of the Fermi surface.",
        context:
          "This is linearised Migdal–Eliashberg theory on an anisotropic Fermi surface at `μ^{*} = 0`, with `T_{c}` the linear-instability temperature. Siraj states an anisotropic bound with the essential supremum of the row integral, which is at least `ρ(M)`; strictness is proved only for finitely many patches, and the ceiling can exceed the one built from the Fermi-surface average by any factor.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. An exact compression onto finite partitions, checked in rational arithmetic, carries the multiband theorems over, and 16 certificates were re-evaluated with separately written code. Not peer reviewed.",
        },
        refs: [
          { label: "Moussa and Cohen (2006), Phys. Rev. B 74, 094520", href: "https://arxiv.org/abs/cond-mat/0607832" },
          { label: "Siraj (2026), Zenodo", href: "https://doi.org/10.5281/zenodo.24234156" },
        ],
        note: "superconducting-tc-ceiling",
      },
      {
        id: "eliashberg-dynamic-coulomb",
        topic: "Screening",
        claim:
          "In linearised isotropic Migdal–Eliashberg theory, a Coulomb kernel `μ(k)` in the gap equation whose window matrix `μ(|n−m|) + μ(n+m+1)` on the Coulomb indices is positive semidefinite at every temperature above the phonon-only linear-instability temperature `T_{c}` cannot raise it; a non-negative non-increasing box kernel can: `μ(k) = 2` for `|k| ≤ 14` in a window of 20 indices, far above physical strengths.",
        context:
          "The box kernel destabilises the soft phonon kernel `κ(k) = x/k²`, `x = M/(2πT)² = 7/10` with `M = λ⟨ω²⟩`, at `T = 1.041 C_{∞}√M`, where phonons alone are stable. Sign-changing gaps under dynamic repulsion were known before Pimenov and Chubukov, who studied the zero-temperature transition, and we found no earlier bound with a frequency-dependent Coulomb kernel in the sources searched, last on 15 November 2026.",
        evidence: {
          level: "certified",
          text: "Proved. The positive semidefinite statement is an exact inequality, and the counterexample is an exact rational vector re-evaluated with separately written code. Not peer reviewed.",
        },
        refs: [
          { label: "Pimenov and Chubukov (2022), npj Quantum Mater. 7, 45", href: "https://arxiv.org/abs/2112.06273" },
          { label: "Kondratev (2026), Zenodo preprint", href: "https://doi.org/10.5281/zenodo.22848039" },
        ],
        note: "superconducting-tc-ceiling",
      },
      {
        id: "tc-ceiling-screen-alexandria",
        topic: "Published Tc data",
        claim:
          "None of 23,608 isotropic-Eliashberg `T_{c}(μ^{*} = 0)` values reported in the Alexandria zero-pressure deposit exceeds the certified upper bound of `ω_{2} f(λ)` computed from its reported `λ` and `ω_{2}`; the largest ratio to that bound is 0.970.",
        context:
          "The ceiling is older: Allen and Dynes (1975) as cited by Moussa and Cohen (2006), Kondratev (2026) and, for `μ^{*} ≥ 0`, Siraj (2026, not refereed). We found no earlier test of this kind in the sources we searched (arXiv, Zenodo, web search, public GitHub pages; to 15 November 2026).",
        evidence: {
          level: "certified",
          text: "Certified computation. The ceilings use interval enclosures of `f(λ)`; the table and every ceiling were rebuilt with separately written code and agree to within the relative margin of 1.5×10^{-9} built into the certified bounds. Not peer reviewed.",
        },
        refs: [
          { label: "Cerqueira et al. (2024), Adv. Funct. Mater. 34, 2404043", href: "https://doi.org/10.1002/adfm.202404043" },
          { label: "Moussa and Cohen (2006), Phys. Rev. B 74, 094520", href: "https://doi.org/10.1103/PhysRevB.74.094520" },
          { label: "Siraj (2026), Zenodo, not refereed", href: "https://doi.org/10.5281/zenodo.24234156" },
        ],
        figure: { value: "0.970", caption: "largest ratio of a reported `T_{c}` to the upper bound of its ceiling, 23,608 entries" },
        note: "tc-ceilings-published-data",
      },
      {
        id: "tc-ceiling-envelope-alexandria",
        topic: "Largest ceiling",
        claim:
          "Computed from reported moments, no Alexandria entry has a certified ceiling `ω_{2} f(λ)` of 300 K or more: the largest is 292.4 K, and 290.3 K once ten entries whose stored spectra have no positive coupling are excluded.",
        context:
          "At most 55 of 27,175 entries exceed 150 K and at most 1,904 exceed 77 K (1,888 by a best-estimate `f`); the BETE-NET maximum is 69.5 K. Ceilings of the selected stored spectra reach 331.7 K, but the three largest entries give 217 K to 603 K across their ten stored broadenings, so those values are not robust.",
        evidence: {
          level: "certified",
          text: "Certified computation. The ceilings are certified upper bounds; a second implementation reproduced the counts from reported moments with the same interpolation of `f`, and a looser interpolation gives 1,958 above 77 K. Not peer reviewed.",
        },
        refs: [
          { label: "Cavignac et al. (2026), J. Phys. Mater. 9, 025014", href: "https://doi.org/10.1088/2515-7639/ae6620" },
          { label: "Gibson et al. (2025), npj Comput. Mater. 11, 7", href: "https://doi.org/10.1038/s41524-024-01475-4" },
        ],
        note: "tc-ceilings-published-data",
      },
      {
        id: "tc-300k-omega2-thresholds",
        topic: "300 K requirements",
        claim:
          "An isotropic Eliashberg superconductor with `T_{c} ≥ 300 K` at `μ^{*} = 0` necessarily has `ω_{2} ≥ 2617.3 K` at `λ = 1`, `ω_{2} ≥ 1416.8 K` at `λ = 2` and `ω_{2} ≥ 1075.3 K` at `λ = 3`.",
        context:
          "A public repository posted on 1 November 2026 (not refereed) gives the same values on a grid of 31 couplings from 0.8 to 100, Kondratev (2026) states a weaker threshold and Siraj (2026) bounds `f(3)`. We add enclosures of `f(λ)` at 321 couplings from 0.2 to 10^{4}; the condition is necessary, not sufficient.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. Values are rounded down from interval enclosures of `f(λ)`, which a separately written float solver reproduces; the monotonicity of `T_{c}` in the kernel, on which the ceiling rests, was re-derived by a second reader. Not peer reviewed.",
        },
        refs: [
          { label: "PoplerAdmin, rtsc-inverse-design (1 November 2026)", href: "https://github.com/PoplerAdmin/rtsc-inverse-design" },
          { label: "Kondratev (2026), Zenodo preprint", href: "https://doi.org/10.5281/zenodo.22848039" },
          { label: "Siraj (2026), Zenodo, not refereed", href: "https://doi.org/10.5281/zenodo.24234156" },
        ],
        note: "tc-ceilings-published-data",
      },
      {
        id: "tc-claims-audit-201",
        topic: "Claims audit",
        claim:
          "None of 201 reported `T_{c}` values is shown to exceed its ceiling: of the 121 that report `ω_{2}` or `ω_{max}`, the largest reaches 0.78 of `ω_{2} f(λ)` or `ω_{max} f(λ)`.",
        context:
          "Only 75 of the 201 rows test the theorem, 115 are Allen–Dynes, McMillan or mean-field formula values (two of them non-refereed postings) and 11 lie outside the isotropic theory; of the 80 rows without `ω_{2}` or `ω_{max}`, 50 are consistent with every spectrum of their `(λ, ω_{log})` and 30 only if an unreported `ω_{2}` is large enough. Nearest earlier comparisons: Sadovskii (2021) and Semenok et al. (2025).",
        evidence: {
          level: "certified",
          text: "Certified computation. Printed numbers are enclosed as half-unit intervals; every printed number was found again in its source and all 201 classifications were reproduced with separately written code. Not peer reviewed.",
        },
        refs: [
          { label: "Sadovskii (2021), arXiv:2106.09948", href: "https://arxiv.org/abs/2106.09948" },
          { label: "Semenok et al. (2025), Adv. Mater. 37, 2507013", href: "https://doi.org/10.1002/adma.202507013" },
        ],
        note: "tc-ceilings-published-data",
      },
      {
        id: "tc-three-moment-supremum",
        topic: "Eliashberg ceiling",
        claim:
          "Over spectra with no frequency floor and exactly the moments `λ`, `ω_{log}` and `ω_{2}` (`ω_{log} < ω_{2}`), the supremum of the Eliashberg `T_{c}` at `μ^{*} = 0` is `ω_{2} f(λ)` and is not attained, so reporting `ω_{log}` alone does not lower the ceiling.",
        context:
          "The inequality `T_{c} ≤ ω_{2} f(λ)` and its equality case are older: Allen and Dynes (1975) as cited by Moussa and Cohen (2006), Kondratev (2026) and, for `μ^{*} ≥ 0`, Siraj (2026). Sharma (2026) measures the spread of `T_{c}` at fixed `(λ, ω_{log}, ω_{2})`; we found no earlier statement of the supremum in the sources we searched (arXiv, Zenodo, web search, public GitHub pages; to 15 November 2026).",
        evidence: {
          level: "certified",
          text: "Proved. The proof and the monotonicity of `T_{c}` in the kernel that it uses were each re-derived by a second reader, and the construction was tested with a separately written solver (`λ = 2`, `ω_{log}/ω_{2} = 0.8`: 0.99978 of the supremum at `ε = 0.001`). Not peer reviewed.",
        },
        refs: [
          { label: "Moussa and Cohen (2006), Phys. Rev. B 74, 094520", href: "https://doi.org/10.1103/PhysRevB.74.094520" },
          { label: "Kondratev (2026), Zenodo preprint", href: "https://doi.org/10.5281/zenodo.22848039" },
          { label: "Sharma (2026), Zenodo preprint", href: "https://doi.org/10.5281/zenodo.22177654" },
        ],
        note: "tc-ceilings-published-data",
      },
      {
        id: "tc-certified-brackets-stored-spectra",
        topic: "Certified Tc brackets",
        claim:
          "For 257 stored spectra of Alexandria and BETE-NET, interval arithmetic encloses the Eliashberg `T_{c}(μ^{*} = 0)` of the positive part to a relative width of about 4.0×10^{-4}, and `T_{c}` lies between 0.174 and 0.988 of the ceiling.",
        context:
          "The sample is stratified: the Pareto front of `(λ, ω_{2})`, the largest ceilings and random spectra, with one corrupted entry excluded. The largest ratio, 0.988, is K4O2 with `λ = 27.5` and `ω_{2} = 138 K`, close to an Einstein spectrum.",
        evidence: {
          level: "certified",
          text: "Certified computation. All certificates were re-checked from atoms rebuilt from a separate extraction, and a separately written float solver puts `T_{c}` inside the bracket for 204 of 204 materials tested. Not peer reviewed.",
        },
        refs: [
          { label: "Cavignac et al. (2026), J. Phys. Mater. 9, 025014", href: "https://doi.org/10.1088/2515-7639/ae6620" },
          { label: "Gibson et al. (2025), npj Comput. Mater. 11, 7", href: "https://doi.org/10.1038/s41524-024-01475-4" },
        ],
        note: "tc-ceilings-published-data",
      },
      {
        id: "alexandria-ten-broadenings",
        topic: "Alexandria data checks",
        claim:
          "Each Alexandria entry stores ten spectra with different broadening; their coupling differs by a median factor 1.27 (above 2 for 7.5 % of entries), the ceilings of the three largest entries range from 217 K to 603 K across them, and ten entries have no stored spectrum with positive integrated coupling.",
        context:
          "About 12.5 % of selected spectra have negative lobes (3,409 entries, 3,386 by a second extractor) and 2,845 differ from the reported `λ` or `ω_{2}` by more than 2 % (2,660 under a second selection rule). The counts refer to snapshot 2025.08.11, licensed CC BY 4.0.",
        evidence: {
          level: "certified",
          text: "Exhaustive computation. A separately written extractor reproduced the spread of the coupling, the ten entries and the ceilings of the three largest entries; it differs on the rule-dependent counts of the context. Not peer reviewed.",
        },
        refs: [
          { label: "Cavignac et al. (2026), J. Phys. Mater. 9, 025014", href: "https://doi.org/10.1088/2515-7639/ae6620" },
          { label: "Cerqueira et al. (2024), Adv. Funct. Mater. 34, 2404043", href: "https://doi.org/10.1002/adfm.202404043" },
        ],
        note: "tc-ceilings-published-data",
      },
    ],
  },
  {
    id: "electron-gas",
    title: "The electron gas",
    intro:
      "Jellium is point charges in a uniform neutralising background; its classical ground-state energy is the low-density limit of the uniform electron gas. The Lieb–Oxford bound is one of the exact constraints that density functionals are built to obey. These entries give lower bounds on the jellium energy from one family of certificates, the proved limit of that family, and a certificate for the Lieb–Oxford constant that an earlier public one improves on.",
    results: [
      {
        id: "jellium-3d-lower-bound",
        topic: "Jellium lower bound",
        claim:
          "Classical three-dimensional jellium has energy per particle `e_{Jel}` ≥ −1.448178733 (density 1, unit charges, kernel 1/r), that is `e_{Jel}` ≥ −0.8983784 in units of e²/a.",
        context:
          "Lieb and Narnhofer proved −(3/5)(9π/2)^{1/3} ≈ −1.4507927586 in 1975, and we found no published improvement; the bcc crystal has energy −1.4442307515. Caillol (1999), Rosenfeld (1982) and Totsuji (1979) derived finite-coupling bounds, of which we read only Caillol's abstract, so this is not claimed to be the first improvement.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. The 100-shell certificate is checked in exact rational arithmetic with a ball enclosure of π, and a separately written checker reproduced `J` = 1.4481787328783. Not peer reviewed.",
        },
        refs: [
          { label: "Lieb and Narnhofer (1975), J. Stat. Phys. 12, 291", href: "https://doi.org/10.1007/BF01012066" },
          { label: "Lewin (2022), J. Math. Phys. 63, 061101", href: "https://doi.org/10.1063/5.0086835" },
        ],
        figure: { value: "−1.448178733", caption: "lower bound on the 3D jellium energy per particle" },
        note: "jellium-lower-bounds",
      },
      {
        id: "jellium-2d-sharp-two-point",
        topic: "2D jellium",
        claim:
          "The smearing bound for two-dimensional Coulomb jellium is sharp at the triangular lattice to 6.4×10⁻²⁹: `e_{tri}` − 6.4×10⁻²⁹ ≤ `e_{Jel}` ≤ `e_{tri}`, where `e_{tri}` = −0.6605587142140189574949345979… is the energy per particle of the triangular lattice.",
        context:
          "Marzo (2025) improved the earlier bound by about 3.6×10⁻⁶; unrefereed manuscripts of the OpenAI Math release (dated 2026-09-23) and postings by Lei and Kitamura claim the exact value. This is a finite certificate for the Coulomb kernel with background, not a priority result for the value.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. A certificate of 65 rationals is checked in ball arithmetic, and separately written checkers accept all 15 certificates of this kind, of 9 to 65 numbers, with the same gaps. Not peer reviewed.",
        },
        refs: [
          { label: "Marzo (2025), arXiv:2506.01660", href: "https://arxiv.org/abs/2506.01660" },
          { label: "Lauritsen (2021), J. Math. Phys. 62, 083305", href: "https://doi.org/10.1063/5.0053494" },
          { label: "OpenAI Math release, github.com/openai/math", href: "https://github.com/openai/math" },
        ],
        note: "jellium-lower-bounds",
      },
      {
        id: "jellium-3d-two-point-ceiling",
        topic: "Smearing ceiling",
        claim:
          "No smearing bound `e_{Jel}` ≥ −`J(u)`, with `u` a radial signed measure of unit mass and finite second moment, non-negative Fourier transform and non-negative `w` = 1/r − `u`*(1/r), can exceed −1.44800699488 in three dimensions, so the best such bound lies in [−1.448178733, −1.44800699488].",
        context:
          "The family closes at most 42.5 % of the distance from the Lieb–Narnhofer value to bcc. The upper end is probably loose by about 10⁻⁴ (an extrapolation, not a bound), and other two-point constructions are not excluded.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. Dual certificates at eight truncation radii, 6 to 64, are checked in ball arithmetic, and a separately written checker with a different treatment of small wavenumbers reproduced all eight values. Not peer reviewed.",
        },
        refs: [
          { label: "Cohn and Kumar (2007), J. Amer. Math. Soc. 20, 99, Proposition 9.3", href: "https://doi.org/10.1090/S0894-0347-06-00546-7" },
        ],
        note: "jellium-lower-bounds",
      },
      {
        id: "jellium-one-body-constraints",
        topic: "One-body constraints",
        claim:
          "Adding Lieb's hard core and the radial-averaging inequalities for minimisers to the family of the ceiling can improve the best three-dimensional bound by at most 1.72×10⁻⁴: the eight certified points satisfy them, with `G(s)` ≤ −0.4554 for s ≥ 1.1.",
        context:
          "Here `G(s) = ∫_{0}^{s} (n(r) − r^{3}) r^{-2} dr` ≤ 0, with `n(r)` the expected number of neighbours within r in units of 4π/3, is our rewriting of the averaging inequality. This excludes a gain beyond 1.72×10⁻⁴, not a gain.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. The inequalities are checked at each certified point in rational and ball arithmetic, and a separately written checker confirmed the margins. Not peer reviewed.",
        },
        refs: [
          { label: "Lewin (2022), J. Math. Phys. 63, 061101", href: "https://doi.org/10.1063/5.0086835" },
        ],
        note: "jellium-lower-bounds",
      },
      {
        id: "lieb-oxford-signed-certificate",
        topic: "Lieb–Oxford constant",
        claim:
          "A signed pair of radial measures gives the Lieb–Oxford constant `c_{LO}` ≤ 1.5569094067, above the constants that Ye Li reported earlier.",
        context:
          "Li's repository (commits of 2026-10-18 UTC) reports exact-rational certificates from 1.544701310 with one channel to 1.534173360 with five; we recomputed them from his integers and confirmed his inequality in floating point, not with his exact verifier. Lewin, Lieb and Seiringer report 1.5765 from a floating-point evaluation of their bound.",
        evidence: {
          level: "single",
          text: "Computer-assisted proof. A ball-arithmetic branch and bound proves the majorant inequality, and a separately written float64 check without outward rounding agrees, which is evidence and not a proof. Not peer reviewed.",
        },
        refs: [
          { label: "Li (2026), repository improvement-lieb-oxford-bound", href: "https://github.com/pkupkupku123/improvement-lieb-oxford-bound" },
          { label: "Lewin, Lieb and Seiringer (2022), Lett. Math. Phys. 112, 92", href: "https://doi.org/10.1007/s11005-022-01584-5" },
        ],
        note: "jellium-lower-bounds",
      },
      {
        id: "lieb-oxford-family-floor",
        topic: "Lieb–Oxford floor",
        claim:
          "For every probability measure, signed measure of mass 1 and finite set of neutral signed measures, all finite sums of uniform shells, the Lewin–Lieb–Seiringer method with a separable majorant gives a constant of at least (3/5)(9π/2)^{1/3} = 1.4507927586; Li's 1.534173360 is 0.0834 above it.",
        context:
          "The number is the Lieb–Narnhofer constant, quoted by Lewin, Lieb and Seiringer after their inequality (31) for general states. We found no earlier statement of this floor; Li's manuscript was not available and may contain it.",
        evidence: {
          level: "certified",
          text: "Proved. The identity behind the floor was re-derived step by step in a separate check and verified numerically with separately written code. Not peer reviewed.",
        },
        refs: [
          { label: "Lewin, Lieb and Seiringer (2022), Lett. Math. Phys. 112, 92", href: "https://doi.org/10.1007/s11005-022-01584-5" },
        ],
        note: "jellium-lower-bounds",
      },
    ],
  },
  {
    id: "long-range-order",
    title: "Long-range order",
    intro:
      "Dipolar magnets, charges in moiré lattices and atoms in Rydberg arrays interact at every distance, and their ground states are usually found by comparing a few candidates on finite cells. These entries prove ground states, or certified energy windows, against every configuration of the infinite lattice, for stated potentials and coupling ranges.",
    results: [
      {
        id: "dipolar-ising-staircase",
        topic: "Dipolar Ising staircase",
        claim:
          "In the 2D dipolar Ising model, `W(r) = |r|^{-3} − J[|r| = 1]`, the Néel state and the checkerboards `(2×1)` to `(5×1)` are, up to symmetry images, the unique translation-invariant ground states on consecutive open intervals, with transitions at `J` = 0.41520305587518, 0.43941990286595, 0.44027907033311, 0.44031096003405 and 0.44031218581380.",
        context:
          "The Néel state at `J` = 0 follows from reflection positivity; Rastelli, Regina and Tassi found the checkerboard sequence numerically, and Fonseca, Rizzi and Alves give its range 0.4152 to 0.4403 without individual boundaries. We found no earlier proof for `J` > 0 in searches of arXiv, Zenodo, Crossref and the web, and no printed value for the last four transitions, though we could read only the abstract of Rastelli et al.; the ground state between 0.4403121858138 and 0.440315 is open.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. Each transition is one two-phase certificate, checked by a standalone program in exact and ball arithmetic and by a second program written from the proof without the first program's code; the images at the last transition rest on an exhaustive SAT enumeration without proof log. Not peer reviewed.",
        },
        refs: [
          { label: "Rastelli, Regina and Tassi (2007), Phys. Rev. B 76, 054438", href: "https://doi.org/10.1103/PhysRevB.76.054438" },
          { label: "Fonseca, Rizzi and Alves (2012), Phys. Rev. E 86, 011103", href: "https://arxiv.org/abs/1206.4501" },
          { label: "Giuliani, Lebowitz and Lieb (2006), Phys. Rev. B 74, 064420", href: "https://arxiv.org/abs/cond-mat/0604668" },
        ],
        note: "dipolar-magnet-ground-states",
      },
      {
        id: "dipolar-ising-stripes",
        topic: "Dipolar Ising stripes",
        claim:
          "In the same model, stripes of width 1 to 6 are, up to symmetry images, the unique translation-invariant ground states on consecutive open intervals from `J` = 0.440315 to 3.95, with transitions at `J` = 1.25853851826129, 2.17245449537856, 2.81449513817075, 3.30424194534275 and 3.69902470137632.",
        context:
          "Fonseca, Rizzi and Alves give 1.2585 and 2.1724 for the first two transitions, Cannas et al. about 2.8 for the third, and Pighin and Cannas mark all the crossings in a figure without printed values. We found no printed value for the last two, but could not read MacIsaac et al. (1995) and De'Bell et al. (2000); Giuliani and Seiringer (2016) and Fermi and Giuliani (2022) proved stripes only for larger exponents or among states with straight domain walls.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. Each transition is one two-phase certificate, checked by a standalone program in exact and ball arithmetic and by a second program written from the proof without the first program's code; only the images at the fifth transition rest on an exhaustive SAT enumeration without proof log. Not peer reviewed.",
        },
        refs: [
          { label: "Fonseca, Rizzi and Alves (2012), Phys. Rev. E 86, 011103", href: "https://arxiv.org/abs/1206.4501" },
          { label: "Pighin and Cannas (2007), Phys. Rev. B 75, 224433", href: "https://arxiv.org/abs/cond-mat/0611260" },
          { label: "Fermi and Giuliani (2022), EMS Press, pp. 269–293", href: "https://arxiv.org/abs/2203.01249" },
        ],
        note: "dipolar-magnet-ground-states",
      },
      {
        id: "spin-ice-mhg-ground-state",
        topic: "Dipolar spin ice",
        claim:
          "In tin-foil Ewald dipolar spin ice with dipole strength `D`, exchanges `J_{1}`, `J_{2}` (first, second neighbours), `J_{3t}`, `J_{3h}` (third, through a site, across a hexagon), the Melko–den Hertog–Gingras state is the unique translation-invariant ground state up to 12 images for `J_{1}/D ≤ 9/2` with `J_{2} = J_{3} = 0` or with `−1/25 ≤ J_{2}/D ≤ 1/125`, `|J_{3t} − J_{3h}| ≤ 0.002 D`, `0 ≤ J_{3t} + J_{3h} ≤ 0.06 D`.",
        context:
          "Melko, den Hertog and Gingras found the state, with ordering vector (0, 0, 2π/a), by Monte Carlo, Melko et al. found its soft mode and the boundary to all-in-all-out by mean-field theory, and McClarty et al. showed numerically that the Luttinger–Tisza bound is tight, because its minimisers obey the Ising constraint, for `J_{1}` = `J_{3}` = 0 and −0.057(1) < `J_{2}/D` < 0. The proof and the prism of further-neighbour couplings are ours; the range `J_{1}/D ≤ 9/2` (`J_{1} > 0` is antiferromagnetic) lies inside the numerical range of Melko et al. and contains the nearest-neighbour model of Dy₂Ti₂O₇ (`J_{1}/D` = 66/25, rounded).",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. The Luttinger–Tisza bound is proved on the whole Brillouin zone with a ball-arithmetic Ewald sum, and the cover was re-run in full with separately written code. Not peer reviewed.",
        },
        refs: [
          { label: "Melko, den Hertog and Gingras (2001), Phys. Rev. Lett. 87, 067203", href: "https://arxiv.org/abs/cond-mat/0009225" },
          { label: "Melko, Enjalran, den Hertog and Gingras (2003), arXiv:cond-mat/0308282", href: "https://arxiv.org/abs/cond-mat/0308282" },
          { label: "McClarty et al. (2015), Phys. Rev. B 92, 094418", href: "https://arxiv.org/abs/1410.0451" },
        ],
        figure: { value: "9/2", caption: "largest `J_{1}/D` covered by the proof, with `J_{2} = J_{3} = 0`" },
        note: "dipolar-magnet-ground-states",
      },
      {
        id: "spin-ice-energy-crossing",
        topic: "Spin ice energy",
        claim:
          "At `J_{2} = J_{3} = 0` the MHG energy per spin is `e_{0} = (a_{X} + 2J_{1}/3)/2` with `a_{X}` = −3.89513176378013880505 D, which gives −1.0675658818900694025 D at `J_{1}/D` = 66/25, the rounded nearest-neighbour value for Dy₂Ti₂O₇, and the all-in-all-out state is lower than every MHG state for `J_{1}/D` above 4.52708544914207102.",
        context:
          "Melko et al. placed the boundary between the MHG and all-in-all-out states at `J_{nn}/D_{nn}` = −0.905 by mean-field theory and Ewald energies, and den Hertog and Gingras at about −0.91 by Monte Carlo; the crossing here is −0.905417089828. The interval from 4.5 to 4.527 in `J_{1}/D` has no certificate.",
        evidence: {
          level: "certified",
          text: "Certified computation. The Ewald sums are enclosures that agree to 26 digits for two Ewald parameters and with a 45-digit evaluation in separate code, and `a_{X}` agrees to 6×10^{-7} with a direct sum without Ewald splitting. Not peer reviewed.",
        },
        refs: [
          { label: "Melko, Enjalran, den Hertog and Gingras (2003), arXiv:cond-mat/0308282", href: "https://arxiv.org/abs/cond-mat/0308282" },
          { label: "den Hertog and Gingras (2000), Phys. Rev. Lett. 84, 3430", href: "https://arxiv.org/abs/cond-mat/0001369" },
        ],
        note: "dipolar-magnet-ground-states",
      },
      {
        id: "spin-ice-double-chain-boundary",
        topic: "Double-chain boundary",
        claim:
          "In tin-foil Ewald dipolar spin ice with second-neighbour exchange `J_{2}` and third-neighbour exchanges `J_{3t}` (through a site), `J_{3h}` (across a hexagon), a fixed 64-spin ice-rule state `S` exceeds the Melko–den Hertog–Gingras (MHG) state in energy per spin by `c + 2J_{2}/3 + 2J_{3t}` in units of `D`, with `c` = 0.0413995194175 ± 9×10^{-14}, so MHG is not a ground state where `J_{3t} + J_{2}/3 + 0.0207 D < 0`.",
        context:
          "With `D` the dipolar strength and `J_{1}` the nearest-neighbour exchange, McClarty et al. found numerically the boundary `J_{2}/D` = −0.0621 and −0.0622 on 128 and 1024 sites at `J_{3}` = 0, and Henelius et al. the approximate boundary `J_{3a} + J_{2}/3 + 0.02 D = 0`. We add the 13-digit coefficients, the independence of `J_{1}` and `J_{3h}` and the separation of `J_{3t}` from `J_{3h}`; `S`, on a 2×2×1 block of cubic cells with Fourier amplitudes at (1/2, 1/2, 0) and its images in units of 2π/a, is not published and is matched to the double-chain state by propagation vector only, and `J_{3t}` to `J_{3a}` by inference.",
        evidence: {
          level: "certified",
          text: "Certified computation. The class-resolved energies of both states are ball-arithmetic enclosures, and separately written floating-point code reproduced the coefficients to 13 digits. Not peer reviewed.",
        },
        refs: [
          { label: "McClarty et al. (2015), Phys. Rev. B 92, 094418", href: "https://arxiv.org/abs/1410.0451" },
          { label: "Henelius et al. (2016), Phys. Rev. B 93, 024402", href: "https://arxiv.org/abs/1512.05361" },
        ],
        note: "dipolar-magnet-ground-states",
      },
      {
        id: "spin-ice-dy-energy-window",
        topic: "Dy₂Ti₂O₇ energy window",
        claim:
          "In tin-foil Ewald dipolar spin ice at the rounded Yavors'kii et al. values for Dy₂Ti₂O₇, `J_{1}/D` = 2.579, `J_{2}/D` = −0.106 and `J_{3t} = J_{3h}` = 0.0189 D (first-, second- and third-neighbour exchanges) with `D` = 1.3224 K, the ground-state energy per spin lies in a window of 8.9 mK, −1.0617825485567 D to −1.0550325485567 D, whose upper end is the energy of the Melko–den Hertog–Gingras (MHG) state.",
        context:
          "The ground state is not decided: in a floating-point scan the Luttinger–Tisza bound is loose by 8.7 mK per spin there, and McClarty et al. place these parameters in the MHG phase numerically. No ice-rule state in a cell of up to 32 spins lies below MHG by more than `10^{-9}` D, and the double-chain state is 11.3 mK per spin above it.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. The lower end is a margin certificate on the whole Brillouin zone in ball arithmetic, re-run in full with separately written code, and the upper end is the energy of an explicit state. Not peer reviewed.",
        },
        refs: [
          { label: "Yavors'kii, Fennell, Gingras and Bramwell (2008), Phys. Rev. Lett. 101, 037204", href: "https://arxiv.org/abs/0707.3477" },
          { label: "McClarty et al. (2015), Phys. Rev. B 92, 094418", href: "https://arxiv.org/abs/1410.0451" },
        ],
        note: "dipolar-magnet-ground-states",
      },
      {
        id: "triangular-five-crystals",
        topic: "Triangular lattice gas",
        claim:
          "The stripe (1/2), 2×2 (1/4), anti-2×2 (3/4), √3×√3 (1/3) and honeycomb (2/3) crystals have the least energy per site among all configurations of the infinite triangular lattice, and are unique among translation-invariant states up to symmetry images, for `r^{-α}` at α = 2.5, 2.6, …, 8.0 and for the double-gate Coulomb potential at 26 gate separations from 0.5 to 20 lattice constants.",
        context:
          "Earlier work searched unit cells of bounded size (Koziol et al. 2023), enumerated 6×6 tori for a truncated model (Kumar et al. 2025) or ran Monte Carlo (Matty and Kim 2022). The Fourier bound is classical for √3×√3 and the honeycomb (Luttinger and Tisza 1946; Khachaturyan 1978), and Sarnak and Strömbergsson (2006), Bétermin (2023) and Muratov and Novaga (2026) proved lattice optimality, the last two by computer, but not for lattice gases.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. A standalone program checks each of the 410 certificates with exact rational duals and ball arithmetic, and separately written code re-derived the energies of all of them and re-proved the Fourier inequality in double precision for 66 of them. Not peer reviewed.",
        },
        refs: [
          { label: "Koziol, Duft, Morigi and Schmidt (2023), SciPost Phys. 14, 136", href: "https://doi.org/10.21468/SciPostPhys.14.5.136" },
          { label: "Kumar, Lewandowski and Changlani (2025), npj Quantum Mater. 10, 95", href: "https://doi.org/10.1038/s41535-025-00792-1" },
          { label: "Matty and Kim (2022), Nat. Commun. 13, 7098", href: "https://doi.org/10.1038/s41467-022-34683-x" },
        ],
        figure: { value: "82", caption: "potentials with all five crystals certified: 56 exponents and 26 gate separations" },
        note: "lattice-gas-ground-states",
      },
      {
        id: "afising-triangular-stripe",
        topic: "Long-range Ising",
        claim:
          "For the antiferromagnetic Ising model on the triangular lattice with couplings `r^{-α}` and no field, at α = 2.1, 2.25, 2.5 to 8.0 in steps of 0.1, 10 and 12 (60 exponents), the energy per site over translation-invariant states is least only at zero magnetisation, and the states of least energy are the mixtures of the six stripe states.",
        context:
          "Koziol et al. (2023) wrote, before applying their bounded-cell search, that a rigorous numerical proof of the six-fold degenerate plain-stripe ground state on the full triangular lattice was pending. The proof uses the stripe certificate at each exponent together with strict positivity of the Fourier remainder at zero wavevector.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. The certificates are those of the five-crystals entry, one stripe certificate per exponent; separately written code re-derived the lattice sums at every exponent and re-proved the Fourier inequality at 24 of the 60 exponents, and a finite-cell search up to 12 sites at four exponents found no state below the stripe. Not peer reviewed.",
        },
        refs: [
          { label: "Koziol, Duft, Morigi and Schmidt (2023), SciPost Phys. 14, 136", href: "https://doi.org/10.21468/SciPostPhys.14.5.136" },
        ],
        note: "lattice-gas-ground-states",
      },
      {
        id: "sqrt3-charge-gap",
        topic: "Charge gap",
        claim:
          "The √3×√3 crystal at filling 1/3 minimises the grand potential over a range of the chemical potential μ, conjugate to the filling, whose width lies in [1.330, 2.079] for `r^{-3}`, [2.268, 2.689] for `r^{-6}` and [0.371, 1.551] for the gate potential at gate separation 10 lattice constants, in units of `V(1)` and, for the gate, `e^{2}/(4πεε₀a)`.",
        context:
          "This is the classical charge gap of the 1/3 crystal at zero temperature; the bracket is valid but not sharp, because the inner end uses a nearest-neighbour split and the outer end uses periodic competitors with at most 15 sites per cell. The 2/3 honeycomb plateau is its mirror image under particle-hole symmetry.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. Inner ends come from the √3×√3 certificate and outer ends from ball-arithmetic energies of explicit periodic states; separate code reproduced the brackets, and an exhaustive search of cells with at most 12 sites found no competitor inside the inner interval. Not peer reviewed.",
        },
        refs: [
          { label: "Kumar, Lewandowski and Changlani (2025), npj Quantum Mater. 10, 95", href: "https://doi.org/10.1038/s41535-025-00792-1" },
        ],
        note: "lattice-gas-ground-states",
      },
      {
        id: "sqrt7-crystal",
        topic: "√7×√7 crystal",
        claim:
          "The √7×√7 crystal at filling 1/7, and its complement at 6/7, has the least energy per site among all configurations of the infinite triangular lattice for `r^{-α}` at α = 2.5, 3, 4, 6 and for the gate potential at gate separations 2, 5, 10, 20 lattice constants.",
        context:
          "The crystal itself is known from numerical work on this model; uniqueness is not claimed, and we found no earlier proof (arXiv, Zenodo and web search to 15 November 2026). The inequality is tight at the generic wavevector of the crystal, which fixes two coefficients of the local energy, enclosed in interval arithmetic.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. A separate program solved the two coefficients itself and re-proved the Fourier inequality for all eight certificates in double precision. Not peer reviewed.",
        },
        note: "lattice-gas-ground-states",
      },
      {
        id: "triangular-intermediate-fillings",
        topic: "Intermediate fillings",
        claim:
          "On the triangular lattice the columnar dimer crystal at ν = 2/5 (gate separations 2, 5, 10; `r^{-3}`; `r^{-6}`) and a seven-site crystal at ν = 2/7 (gate separations 5, 10) have the least energy per site among all configurations, and so do their complements at 3/5 and 5/7; at gate separation 10 the energies at 3/8, 3/7 and 1/5 are enclosed to gaps of 5.00×10^{-5}, 1.30×10^{-4} and 3.44×10^{-4}.",
        context:
          "At gate separation 10, `e_{0}`(2/5) = 2.4217504914760 and `e_{0}`(2/7) = 1.1834074649039 per site in units of `e^{2}/(4πεε₀a)`, each within 5×10^{-14}, and the windows are [2.1111919614, 2.1112419970], [2.8047640748, 2.8048945644] and [0.5551481296, 0.5554917683]. Matty and Kim (2022) found the 2/5 columnar dimer crystal among their Monte Carlo states and left the zero-temperature classical ground state of their intermediate states to future work, and Kumar, Sherif, Elser and Changlani (2026) show a 5×5 torus configuration at 2/5 without proof; uniqueness is not claimed, and at 2/7 the seven-site state has no certificate for `r^{-3}` and gate separation 2 and is not a ground state for `r^{-6}` (see the windows entry).",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. Separate code with its own Ewald sums and a double-precision cover reproduced the 2/5 and 2/7 energies and the window bounds to within 3.4×10^{-10}, and found no periodic cell below them up to 20 and 21 sites. Not peer reviewed.",
        },
        refs: [
          { label: "Matty and Kim (2022), Nat. Commun. 13, 7098", href: "https://doi.org/10.1038/s41467-022-34683-x" },
          { label: "Kumar, Sherif, Elser and Changlani (2026), arXiv:2604.19870", href: "https://arxiv.org/abs/2604.19870" },
        ],
        note: "lattice-gas-ground-states",
      },
      {
        id: "windows-r6",
        topic: "Rydberg-lattice windows",
        claim:
          "For `r^{-6}` a certified lower bound on the energy per site of every configuration lies within 3.5×10^{-11} of the energy of a periodic state at ν = 1/2, 1/3, 1/4 (star) and 1/5 on the square lattice, 1/2 on the honeycomb and 1/3 on the kagome lattice (nematic), and of a 4/7 : 3/7 mixture of the 1/4 and 1/3 crystals at 2/7 on the triangular lattice.",
        context:
          "Here ν is the occupied fraction of sites, energies are per site in units of `V(1)` with nearest-neighbour distance 1, and the star and nematic names follow from cell and density only. Samajdar et al. (2020, 2021) found these phases numerically, Shah et al. (2025) used the matrix form of the Fourier bound for one `r^{-6}` phase without a certificate, and Paul and Refael (2026) give a semidefinite hierarchy, solved numerically, that contains the Luttinger–Tisza bound on Bravais lattices; the seven-site state at 2/7 lies 1.38×10^{-3} above the mixture, and the square windows at 1/8 and 1/6 do not close, with widths 4.98×10^{-7} and 1.34×10^{-6}.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. A rational cluster dual and an interval proof that a Hermitian matrix function is positive semidefinite on the Brillouin zone; a separately written program, with polylogarithm sums, reproduced all nine windows to at least 14 digits. Not peer reviewed.",
        },
        refs: [
          { label: "Samajdar, Ho, Pichler, Lukin and Sachdev (2020), Phys. Rev. Lett. 124, 103601", href: "https://doi.org/10.1103/PhysRevLett.124.103601" },
          { label: "Samajdar, Ho, Pichler, Lukin and Sachdev (2021), Proc. Natl. Acad. Sci. 118, e2015785118", href: "https://doi.org/10.1073/pnas.2015785118" },
          { label: "Shah, Nambiar, Gorshkov and Galitski (2025), Phys. Rev. X 15, 011025", href: "https://doi.org/10.1103/PhysRevX.15.011025" },
        ],
        note: "lattice-gas-ground-states",
      },
      {
        id: "windows-r3",
        topic: "Dipolar-lattice windows",
        claim:
          "For `r^{-3}` the same kind of window is certified on the square lattice at ν = 1/3 and 1/4 and on the kagome lattice at 1/3, each of width at most 3.3×10^{-11}.",
        context:
          "The independent interval code covers exponent 6 only, so an independent proof of these three windows is still to come.",
        evidence: {
          level: "single",
          text: "Computer-assisted proof. This rests on one checker; independent upper bounds and a floating-point scan of the Fourier remainder agree with the certificates, but an independent proof of positivity for exponent 3 is still to come. Not peer reviewed.",
        },
        note: "lattice-gas-ground-states",
      },
      {
        id: "fcc-v1-v4-certificates",
        topic: "fcc alloy ordering",
        claim:
          "On the fcc lattice gas with pair energies V1 to V4, six exact certificates give periodic ground states at particle concentrations 1/3 and 5/12 (for example `V` = (1, 0, 3/20, 3/10) at 1/3 gives `e_{0}` = 17/24 per site in units of V1), and at `V` = (1, −1/7, −3/10, −2/7) the ground states at 1/3, 3/8 and 5/12 are coexistences of the L1₂ and L1₀ phases with `e_{0}` = −61/105, −169/280, −263/420.",
        context:
          "Energy per site is `e = Σ_{s} V_{s} (z_{s}/2) g_{s}` with coordination numbers z = 12, 6, 24, 12 and `g_{s}` the pair density in shell s, in the sign convention of Kanamori and Kakehashi (1977), who left parts of the V1 to V4 diagram conjectural; Garbulsky, Tepesch and Ceder (1992) partially solved it with polyhedron and enumeration methods. Whether these V lie in the conjectural regions is not verified, and of 13 single-phase vertex structures with the minimal number of nearest-neighbour pairs, found in cells of up to 12 sites with V2 to V4 within ±0.3, seven stay open.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. Integer-exact duals on the 14-site cube cluster, with a Fourier remainder proved non-negative on the ordered cube for the coexistences; separate code re-derived duals and energies, covered the cube with its own floating-point boxes, and found no periodic cell below the single-phase values (up to 18 sites at 1/3, 12 at 5/12) and no periodic mixture below the coexistence values (cells up to 12 sites). Not peer reviewed.",
        },
        refs: [
          { label: "Kanamori and Kakehashi (1977), J. Phys. Colloques 38, C7-274", href: "https://doi.org/10.1051/jphyscol:1977754" },
          { label: "Garbulsky, Tepesch and Ceder (1992), MRS Proc. 291, 259", href: "https://doi.org/10.1557/PROC-291-259" },
        ],
        note: "lattice-gas-ground-states",
      },
      {
        id: "na-vacancy-orderings",
        topic: "Na/vacancy orderings",
        claim:
          "In an in-plane lattice-gas model of Na/vacancy ordering in layers of Na_{x}CoO₂ type, the x = 1/2 stripe and the x = 2/3 six-cell state have the least energy per Co among all periodic configurations, and stay within 1.88×10^{-6} and 2.23×10^{-6} of it for site-energy offsets |Δ| ≤ 0.04 and |Δ| ≤ 0.026.",
        context:
          "The model has Na⁺ on the Na1 (above Co) and Na2 (above a Co triangle) honeycomb of one layer, a hard core on bonds, a Coulomb energy with neutralising background (periodic configurations only) and an energy Δ per Na1 ion, in units of `e^{2}/(4πεε₀a)` per Co; the intra-plane part of the model of Zhang et al. (2005) has Δ = 0.0255 at its fitted value for bare Coulomb energies and a = 2.82 Å. The orderings were found by Roger et al. (2007) and Zhang et al. (2005), and the certificates cover neither the two-plane model of Zhang et al., whose x = 1/9 ground state the in-plane model gets differently, nor the three-dimensional model of Roger et al.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. A ball-arithmetic checker proves each window; separate code with a double-precision cover reproduced them, and an exhaustive search of every torus found nothing lower, up to 22 Co per cell at x = 1/2 and 18 at x = 2/3. Not peer reviewed.",
        },
        refs: [
          { label: "Roger et al. (2007), Nature 445, 631", href: "https://doi.org/10.1038/nature05531" },
          { label: "Zhang, Capaz, Cohen and Louie (2005), Phys. Rev. B 71, 153102", href: "https://doi.org/10.1103/PhysRevB.71.153102" },
        ],
        note: "lattice-gas-ground-states",
      },
      {
        id: "triangular-gas-phase-diagrams",
        topic: "Phase diagrams",
        claim:
          "For the triangular lattice gas with first and second neighbour energies and a chemical potential, 14 exact ray certificates prove that one of ten periodic phases is a ground state at every `(J_{1}, J_{2}, μ)`; with third neighbours, 43 certificates identify 26 phases and cover 100%, 100%, 97.9%, 94.1% and 82.1% of the `(J_{2}, μ)` slice `J_{1}` = 1, |`J_{2}`| ≤ 3/2, −1 ≤ μ ≤ 8 at `J_{3}` = −1/10, 0, 1/20, 1/10, 1/5.",
        context:
          "The set of `(P_{1}, P_{2}, ρ)`, the occupied pairs per site in shells 1 and 2 and the density, of all translation-invariant states is a polytope with 10 vertices, all periodic, and 14 facets, and at `J_{3}` = 1/10 a periodic state of at most 18 sites beats all 26 phases at 85 of 4000 random rational points. Kaburagi and Kanamori (1978) treated the model up to third neighbours, Dublenych (2009) found a devil's step of ground states and Dublenych (2011) determined ground states with a cone construction that goes back to Kanamori (1966), and Duda (2026) states the same normal-cone reading for binary plaquette models; eight of our 14 rays are rays of Table I of Dublenych (2011) at vanishing three-body energy, so this is a machine-checkable form of the two-shell diagram, not a new diagram, and we did not compare the 26 phases or the slice fractions with the earlier regimes.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. Certificates are linear in the couplings, so those at the extreme rays cover each cone; a separately written exact checker re-verified all 14 and all 43 ray certificates, the 14 rays cut out a polytope with exactly the ten phases as vertices, and no periodic state of an independent pool of up to 18 sites violated a ray. Not peer reviewed.",
        },
        refs: [
          { label: "Kaburagi and Kanamori (1978), J. Phys. Soc. Jpn. 44, 718", href: "https://doi.org/10.1143/JPSJ.44.718" },
          { label: "Dublenych (2011), Phys. Rev. E 84, 061102", href: "https://doi.org/10.1103/PhysRevE.84.061102" },
          { label: "Duda (2026), Zenodo, version of 22 October 2026; later versions exist", href: "https://doi.org/10.5281/zenodo.23575323" },
        ],
        note: "lattice-gas-ground-states",
      },
    ],
  },
  {
    id: "materials-design",
    title: "Materials design",
    intro:
      "Structure prediction and alloy modelling search over arrangements of atoms. These entries certify global optima of stated model energies, give the smallest supercells whose pair correlations equal a random alloy's, and bracket diffusion coefficients from both sides.",
    results: [
      {
        id: "p1-optima-41",
        topic: "Ion allocation",
        claim:
          "A certificate proves the global minimum of a classical Ewald plus Buckingham ion-allocation energy, with no space-group restriction, for 41 periodic instances, among them SrTiO3 with 40 ions on 512 sites at −1267.413235 eV.",
        context:
          "Gusev et al. (2023) formulated the allocation problem and proved optimality inside space groups, and in P1 (no symmetry) for SrTiO3 with five ions; their symmetric allocation for the 40-ion case already has this energy, and Gerolymatos et al. (2026) print −1179.67 eV, 87.74 eV above it, for a 24 hour P1 Gurobi run, hardware not stated. The pair relaxation extends Brosch and de Klerk's; 13 of the 41 instances are rock-salt cells, twelve with every site occupied, and Bétermin and Knüpfer proved the alternating charge distribution optimal in an infinite crystal.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. Each certificate is checked by a standalone program in exact rational arithmetic, and all 56 certificates by a second checker written separately; the energy function was re-implemented from the published code and matches the stored tensor to 4.83×10^{-13} eV per entry. The digits are those of the double-precision tensor. Not peer reviewed.",
        },
        refs: [
          { label: "Gusev et al. (2023), Nature 619, 68", href: "https://doi.org/10.1038/s41586-023-06071-y" },
          { label: "Brosch and de Klerk (2022), Discrete Optim. 44, 100612", href: "https://doi.org/10.1016/j.disopt.2020.100612" },
          { label: "Gerolymatos et al. (2026), arXiv:2604.23921", href: "https://arxiv.org/abs/2604.23921" },
        ],
        figure: { value: "41", caption: "instances with a certified global optimum and no symmetry restriction" },
        note: "certified-crystal-structure-prediction",
      },
      {
        id: "bixbyite-y2o3-optimum",
        topic: "Bixbyite Y2O3",
        claim:
          "Bixbyite Y2O3, with 48 O and 32 Y on 512 sites, has global minimum −2111.537901 eV of the classical Ewald plus Buckingham energy over all allocations, with no symmetry restriction.",
        context:
          "The pair certificate leaves a gap of 44.339 eV, and two cluster cuts of 21 and 27 sites close it. Gerolymatos et al. (2026) print −2111.54 eV for a 24 hour P1 Gurobi run, equal to the minimum to the printed digits, with no bound reported; Gusev et al. (2023) proved optimality inside space groups.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. A standalone exact checker accepts the certificate, and a separately written checker gives the same bound and re-proves both cluster minima without symmetry. Not peer reviewed.",
        },
        refs: [
          { label: "Gusev et al. (2023), Nature 619, 68", href: "https://doi.org/10.1038/s41586-023-06071-y" },
          { label: "Gerolymatos et al. (2026), arXiv:2604.23921", href: "https://arxiv.org/abs/2604.23921" },
          { label: "Huang et al. (2016), Phys. Rev. B 94, 134424", href: "https://doi.org/10.1103/PhysRevB.94.134424" },
        ],
        note: "certified-crystal-structure-prediction",
      },
      {
        id: "oxide-lower-bounds",
        topic: "Oxide lower bounds",
        claim:
          "On the 8×8×8 grid every allocation has classical Ewald plus short-range energy at least −1607.0255 eV for MgAl2O4, −3000.8043 eV for Y2Ti2O7, −3992.3273 eV for SrTiO3 with 135 ions and −2130.4356 eV for Ca3Al2Si3O12.",
        context:
          "None is an optimum: the best allocations we hold lie 5.621, 25.570, 90.285 and 36.606 eV above the bounds, an upper bound on the true gaps, and 54.92, 25.94, 156.15 and 107.04 eV below the lowest energies printed by Gerolymatos et al. (2026), which we could not re-evaluate. The pair relaxation extends Brosch and de Klerk's, and the cluster bound is of the kind Huang et al. (2016) use for lattice models.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. A standalone exact checker accepts each certificate and a separately written checker gives the same bound. The cluster minima were re-proved without symmetry for MgAl2O4 and the garnet; for Y2Ti2O7 and SrTiO3 two symmetry-reduced searches agree and the search without symmetry was not completed. No bound exceeds any of 31 stored allocation energies. Not peer reviewed.",
        },
        refs: [
          { label: "Brosch and de Klerk (2022), Discrete Optim. 44, 100612", href: "https://doi.org/10.1016/j.disopt.2020.100612" },
          { label: "Gerolymatos et al. (2026), arXiv:2604.23921", href: "https://arxiv.org/abs/2604.23921" },
          { label: "Huang et al. (2016), Phys. Rev. B 94, 134424", href: "https://doi.org/10.1103/PhysRevB.94.134424" },
        ],
        note: "certified-crystal-structure-prediction",
      },
      {
        id: "spinel-pyrochlore-not-closed",
        topic: "Open gaps",
        claim:
          "A certified split on one oxygen structure factor raises the bound on the classical Ewald plus Buckingham energy of MgAl2O4 by 0.0111 eV (0.20 % of the 5.621 eV gap), and other multipliers raise the Y2Ti2O7 bound by 0.1329 eV (0.52 % of 25.570 eV), so gaps of 5.610 and 25.437 eV to the best allocations we hold remain.",
        context:
          "The spinel split gives the bound −1607.0144 eV and the Y2Ti2O7 certificate with other multipliers −3000.6714 eV. Neither instance is closed.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. Each certificate is accepted by a standalone exact checker and by a separately written one, and a separate tree check reproduced the spinel bound. Not peer reviewed.",
        },
        refs: [
          { label: "Gusev et al. (2023), Nature 619, 68", href: "https://doi.org/10.1038/s41586-023-06071-y" },
        ],
        note: "certified-crystal-structure-prediction",
      },
      {
        id: "no-gain-sublattice-resolution",
        topic: "Sublattice resolution",
        claim:
          "A pair relaxation that counts pairs separately for each coset of a translation subgroup has the same value as the scalar pair relaxation, and with convex constraints closed under coset translation added, such as cluster cuts for every coset, the value of the scalar relaxation carrying the constraints summed over cosets.",
        context:
          "The argument is the invariant-point argument of symmetry reduction of semidefinite programs (Gatermann and Parrilo, 2004); we found no earlier statement of it for ion allocation in the sources searched (last search 3 November 2026). Constraints that break the translation symmetry can tighten a relaxation, but there is no exact certificate from one.",
        evidence: {
          level: "certified",
          text: "Proved. The proof was re-derived separately and read line by line, and its counting lemmas were tested in exact integer arithmetic on 132 random allocations. Not peer reviewed.",
        },
        refs: [
          { label: "Gatermann and Parrilo (2004), J. Pure Appl. Algebra 192, 95", href: "https://doi.org/10.1016/j.jpaa.2003.12.011" },
        ],
        note: "certified-crystal-structure-prediction",
      },
      {
        id: "sqs-quinary-minimal-sizes",
        topic: "Quinary SQS size",
        claim:
          "For the equiatomic quinary alloy, the smallest fcc or bcc supercell whose pair correlations equal the random alloy's through two shells has 25 atoms (1 fcc and 51 bcc structures, complete lists), and through three shells it has 50 atoms on both lattices; one fcc structure at 50 atoms matches four shells.",
        context:
          "Jiang and Uberuaga (2016) reported a 125-atom bcc cell for two shells, found by annealing, and a weighted set of 5-atom cells for the same correlations; Sorkin et al. (2020) matched fcc shells with weighted sets of small cells. We found no earlier minimal size in arXiv, Zenodo and web searches to 2026-11-09; pair correlations through the stated shells only, and the 50-atom lists are incomplete.",
        evidence: {
          level: "certified",
          text: "Exhaustive computation. A separately written enumerator, with a second algorithm at 25 atoms, reproduced the complete counts and the nonexistence at 25 atoms, and recomputed all 75 witnesses at 50 atoms. The grid 25 | N is proved. Not peer reviewed.",
        },
        refs: [
          { label: "Jiang and Uberuaga (2016), Phys. Rev. Lett. 116, 105501", href: "https://doi.org/10.1103/PhysRevLett.116.105501" },
          { label: "Sorkin, Tan, Yu and Zhang (2020), Phys. Rev. B 102, 174209", href: "https://doi.org/10.1103/PhysRevB.102.174209" },
        ],
        figure: { value: "25 atoms", caption: "smallest quinary cell with exact two-shell pair correlations" },
        note: "perfect-sqs-and-diffusion",
      },
      {
        id: "sqs-fcc-five-shells",
        topic: "Quinary SQS, fcc",
        claim:
          "No 50-atom fcc supercell carries an equiatomic quinary colouring whose pair correlations equal the random alloy's through five shells, so five shells need at least 75 atoms.",
        context:
          "The search covers all 280 inequivalent 50-atom supercells. Whether 75 atoms suffice is not decided; pair correlations only, and we found no earlier result in arXiv, Zenodo and web searches to 2026-11-09.",
        evidence: {
          level: "single",
          text: "Exhaustive computation. A separately written enumerator re-ran 77 of the 280 supercell classes and found none in each; the other 203 rest on one code base. Not peer reviewed.",
        },
        note: "perfect-sqs-and-diffusion",
      },
      {
        id: "sqs-quaternary-fcc-32",
        topic: "Quaternary fcc SQS",
        claim:
          "For the equiatomic quaternary alloy on fcc, three shells need 32 atoms, with 553 inequivalent structures (complete list under multiset pair counting; 507 have no site paired with its own periodic image); no 32-atom supercell matches four shells, so four shells need at least 48 atoms.",
        context:
          "Shinohara et al. (2021) found a 16-atom cell matching two shells in an exhaustive search to 20 sites, which our 16-atom result reproduces; the public code of Lian et al. (2025), github.com/lianjichun/findsqs, ships a 32-atom quaternary fcc example input (examples/2-fcc-quaternary: cell = 32, cuts = 3,1, npmc = 4) that, by our reading of its source (not run), requests four exact shells, for which we find none, and we could not read their paper, so the discrepancy is unresolved. Pair correlations only.",
        evidence: {
          level: "certified",
          text: "Exhaustive computation. A separately written enumerator reproduced the complete list of 553 structures by an independent class count and the nonexistence at 32 atoms. Not peer reviewed.",
        },
        refs: [
          { label: "Shinohara, Seko, Horiyama and Tanaka (2021), Phys. Rev. Mater. 5, 113803", href: "https://doi.org/10.1103/PhysRevMaterials.5.113803" },
          { label: "Lian et al. (2025), Phys. Rev. B 111, 224207", href: "https://doi.org/10.1103/vphm-rcgr" },
        ],
        note: "perfect-sqs-and-diffusion",
      },
      {
        id: "sqs-quaternary-bcc-32",
        topic: "Quaternary bcc SQS",
        claim:
          "For the equiatomic quaternary alloy on bcc, two shells need 16 atoms (26 structures), three, four and five shells need 32 atoms (996, 391 and 282 structures, complete lists under multiset pair counting; 745, 330 and 8 have no self-image pair in the matched shells), and six shells need at least 48 atoms.",
        context:
          "Bhatti et al. (2024) use a 128-atom supercell for the equimolar quaternary bcc alloy, and Shinohara et al. (2021) have no bcc table. We found no earlier bcc minimal size in arXiv, Zenodo and web searches to 2026-11-09; Lian et al. (2025) could not be read in full.",
        evidence: {
          level: "certified",
          text: "Exhaustive computation. A separately written enumerator reproduced the complete lists by independent class counts, and the nonexistence at 16 and 32 atoms. Not peer reviewed.",
        },
        refs: [
          { label: "Bhatti, Tingaud, Seydou and Queyreau (2024), arXiv:2405.02691", href: "https://arxiv.org/abs/2405.02691" },
          { label: "Shinohara, Seko, Horiyama and Tanaka (2021), Phys. Rev. Mater. 5, 113803", href: "https://doi.org/10.1103/PhysRevMaterials.5.113803" },
        ],
        note: "perfect-sqs-and-diffusion",
      },
      {
        id: "dirichlet-thomson-diffusion-bounds",
        topic: "Diffusion bounds",
        claim:
          "Exactly divergence-free local currents in the walker frame give proved lower bounds on the variational diffusion coefficient `D^{var}` of an exclusion tracer and of an alloy vacancy, and bounded local functions give the matching upper bounds; without locality the supremum over antisymmetric finite-energy currents equals `D^{var}`.",
        context:
          "The variational formula, the Dirichlet bound and Thomson's principle for networks are classical (Spohn 1990; Doyle and Snell 1984); Trinkle (2018) gave upper bounds from finite families for a random alloy with one vacancy, and Shapira (2026) a Thomson-type principle for the collective coefficient. Admissible currents are bounded, local, antisymmetric under the walker jump, vanish where the rates vanish and are divergence-free for every configuration; density of local currents is not proved.",
        evidence: {
          level: "certified",
          text: "Proved. Both principles were re-derived step by step, and a finite-state computation on a 3×3 torus with separately written code agreed with the infimum and the supremum to 8 digits for exclusion and 1.3×10^{-7} for the alloy. Not peer reviewed.",
        },
        refs: [
          { label: "Spohn (1990), J. Stat. Phys. 59, 1227", href: "https://doi.org/10.1007/BF01334748" },
          { label: "Trinkle (2018), Phys. Rev. Lett. 121, 235901, arXiv:1805.11618", href: "https://arxiv.org/abs/1805.11618" },
          { label: "Shapira (2026), arXiv:2606.04636", href: "https://arxiv.org/abs/2606.04636" },
        ],
        note: "perfect-sqs-and-diffusion",
      },
      {
        id: "exclusion-tracer-brackets",
        topic: "Exclusion tracer",
        claim:
          "The tracer factor `f(ρ)` = `D_{s}`/(1−ρ) of the nearest-neighbour symmetric exclusion process on the square and simple cubic lattices lies in a certified bracket of width below 0.002 at ρ = 0.1, 0.3, 0.5, 0.7 and 0.9; on the square lattice at ρ = 1/2, `f` ∈ [0.709894, 0.711118].",
        context:
          "Spohn (1990) gave the variational formula; trial-function upper bounds exist for collective diffusion (Arita, Krapivsky and Mallick 2017) and for a tagged particle in a constrained gas (Ertul and Shapira 2020), and the first-order approximation of Nakazato and Kitahara (1980), as extended by Pigeon et al. (2017), lies above our upper bound at all ten points; Pigeon et al. saw the overestimate in simulation. We found no earlier certified bracket in arXiv, Zenodo, GitHub, Crossref and web searches to 2026-11-09.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. Each bound is a rational certificate checked in exact arithmetic by a standalone program; a separately written evaluator recomputed the certificates exactly, and a deterministic test covered every lower certificate. Not peer reviewed.",
        },
        refs: [
          { label: "Spohn (1990), J. Stat. Phys. 59, 1227", href: "https://doi.org/10.1007/BF01334748" },
          { label: "Ertul and Shapira (2020), arXiv:2003.02531", href: "https://arxiv.org/abs/2003.02531" },
          { label: "Nakazato and Kitahara (1980), Prog. Theor. Phys. 64, 2261", href: "https://doi.org/10.1143/PTP.64.2261" },
          { label: "Pigeon et al. (2017), J. Stat. Mech. 123209", href: "https://arxiv.org/abs/1712.03996" },
        ],
        note: "perfect-sqs-and-diffusion",
      },
      {
        id: "alloy-vacancy-brackets",
        topic: "Alloy vacancy",
        claim:
          "For a vacancy in a dynamic random binary alloy on fcc, bcc and simple cubic lattices, `D^{var}`/`D^{free}` lies in a certified bracket of width below 0.001 at `w_{B}`/`w_{A}` = 1/2 and `c_{B}` = 1/10, 3/10, 2/5, 1/2, 3/5, 7/10, 9/10 (bcc, `c_{B}` = 1/2: [0.96829, 0.96921]), where `D^{var}` is the variational diffusion coefficient, equal to the vacancy coefficient if the environment is ergodic, which is not proved.",
        context:
          "Trinkle (2018) gave upper bounds from finite families for this model class, Monte Carlo (Franke and Dieckmann 1991; Belova and Murch 2000) and Manning's (1971) approximate theory gave earlier numbers, and we found no earlier certified bracket in arXiv, Zenodo, GitHub, Crossref and web searches to 2026-11-09. Brackets widen with the rate contrast (upper to lower bound 10 to 26 at the six grid points with `w_{B}`/`w_{A}` = 10^{-3}); a separately written Monte Carlo lies inside 10 of 11 brackets and 0.6 standard errors above the eleventh.",
        evidence: {
          level: "certified",
          text: "Certified computation. Rational certificates are checked in exact arithmetic by a standalone program; a separately written evaluator recomputed every certificate exactly, and a deterministic test covered every lower certificate. Not peer reviewed.",
        },
        refs: [
          { label: "Trinkle (2018), Phys. Rev. Lett. 121, 235901, arXiv:1805.11618", href: "https://arxiv.org/abs/1805.11618" },
          { label: "Franke and Dieckmann (1991), J. Appl. Phys. 70, 787", href: "https://doi.org/10.1063/1.349635" },
          { label: "Manning (1971), Phys. Rev. B 4, 1111", href: "https://doi.org/10.1103/PhysRevB.4.1111" },
        ],
        note: "perfect-sqs-and-diffusion",
      },
    ],
  },
  {
    id: "catalysis",
    title: "Catalysis",
    intro:
      "A volcano plot says the best catalyst binds neither too strongly nor too weakly. For stated kinetic models, these entries certify where the top is, price the scaling relations that hold it down, and bound how far driving a catalyst in time can lift it.",
    results: [
      {
        id: "tof-log-concave",
        topic: "Turnover frequency",
        claim:
          "For one cycle of pseudo-first-order Eyring steps, `ln TOF` is concave in all transition-state and intermediate free energies, and in the descriptors, including the electrode potential, when the barriers are convex in the intermediates, so a volcano top is a global maximum.",
        context:
          "The energetic-span closed form is known (Kozuch and Shaik; Cohen and Vlachos), and Kaneko posted the Hessian for steps in series on 2026-10-15. We add the exact span form in the energies, its two-dimensional kernel, and the descriptors and potential, at fixed reactant activities.",
        evidence: {
          level: "certified",
          text: "Proved. The proof was re-derived by hand in a separate review, and the closed form matches exact rational solves of the master equation on 1,400 cycles and separately written code on 266. Not peer reviewed.",
        },
        refs: [
          { label: "Cohen and Vlachos (2022), Ind. Eng. Chem. Res. 61, 5117", href: "https://doi.org/10.1021/acs.iecr.2c00390" },
          { label: "Kaneko (2026), Zenodo, posted 2026-10-15", href: "https://doi.org/10.5281/zenodo.23357831" },
        ],
        note: "catalysis-limits",
      },
      {
        id: "volcano-top-certificates",
        topic: "Volcano certificates",
        claim:
          "The top of a single-cycle volcano over a descriptor polytope has an exactly checkable dual certificate whose multipliers are the prices of the scaling relations in decades of TOF per eV, with gaps of at most 6×10^{-5} decades for the oxygen cycles computed.",
        context:
          "A price is at most `S`/(kT ln 10) with `S` the largest shift of an exponent per eV of the constraint: 16.90 when every barrier slope is in [0, 1] and a constraint moves one intermediate by 1 eV, but 31.7 for the exact OOH*/OH* offset in oxygen evolution at 1.5 V with Marcus barriers of reorganisation energy 0.1 eV. We found no earlier certificate of this kind in Zenodo, arXiv, Crossref and web searches to 2026-11-15.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. A standalone program checks each certificate in exact rationals with interval arithmetic, and a separately written checker accepted all 208 certificates, 64 of them for model families this page does not report. Not peer reviewed.",
        },
        refs: [
          { label: "Man et al. (2011), ChemCatChem 3, 1159", href: "https://doi.org/10.1002/cctc.201000397" },
        ],
        note: "catalysis-limits",
      },
      {
        id: "oer-scaling-limited-overpotential",
        topic: "Scaling relation",
        claim:
          "With `G_{OOH}` = `G_{OH}` + 3.2 eV + `ε` and |`ε`| ≤ `δ`, the least overpotential at which all four steps of oxygen evolution or reduction can be downhill is 0.37 − `δ`/2 V, with dual price exactly 1/2 V per eV: 0.27 V at `δ` = 0.2 eV and 0.17 V at 0.4 eV.",
        context:
          "Man et al. (2011), who credit Koper, give (3.2 − 2.46)/2 V less 0.2 V at two standard deviations, so the factor 1/2 is theirs; we add the linear program with an exact rational dual. The ±0.2 eV is one standard deviation of their scatter (68 % of points), ±0.4 eV is 95 %, and 3.2 eV is a DFT value.",
        evidence: {
          level: "certified",
          text: "Proved. The bound is the sum of two step energies, and exact rational certificates for `δ` = 0, 0.1, 0.2, 0.3 and 0.4 eV were checked by a standalone program and by a separately written one. Not peer reviewed.",
        },
        refs: [
          { label: "Man et al. (2011), ChemCatChem 3, 1159", href: "https://doi.org/10.1002/cctc.201000397" },
          { label: "Govindarajan et al. (2019), ACS Catal. 9, 4218", href: "https://doi.org/10.1021/acscatal.9b00532" },
        ],
        note: "catalysis-limits",
      },
      {
        id: "oer-kinetic-limit-bands",
        topic: "OER kinetic limit",
        claim:
          "For oxygen evolution at 1.5 V, the certified maximum turnover frequency per site falls by 6.2 decades with thermodynamic-floor barriers, 3.2 with linear barriers and 3.9 with Marcus barriers as the OOH*/OH* offset rises from 3.0 to 3.4 eV.",
        context:
          "Single-site cycle with `G_{OH}` in [−1, 3] eV and `G_{O}` in [0, 5] eV; for step free energy s the linear law is max(0, s, 0.3 + s/2) eV and the Marcus law has reorganisation energy 1 eV, generic forms with our parameters, not fitted. The offsets 3.0 to 3.4 eV are the one-standard-deviation band of Man et al. (2011); over the 95 % band, 2.8 to 3.6 eV, the falls are 9.8, 6.2 and 7.4 decades.",
        evidence: {
          level: "certified",
          text: "Certified computation. Vertex certificates are checked in exact rationals, and a separately written program reproduced the 80 oxygen evolution and reduction limits to 5×10^{-5} decades and the end points of the span in a scan of nine offsets. Not peer reviewed.",
        },
        refs: [
          { label: "Man et al. (2011), ChemCatChem 3, 1159", href: "https://doi.org/10.1002/cctc.201000397" },
        ],
        note: "catalysis-limits",
      },
      {
        id: "dynamic-oer-cap",
        topic: "Dynamic ceiling",
        claim:
          "For oxygen evolution at 1.5 V with thermodynamic-floor barriers, open-loop modulation of the binding energies of independent sites lifts the turnover frequency at most 2.6945 decades above the best static catalyst obeying the same 3.2 eV OOH*/OH* relation: the supremum lies between 0.09999 `ν` and 0.10005 `ν`, with `ν` = kT/h.",
        context:
          "Foley and Razdan (2022) showed that quasi-static operation can subvert Sabatier limits; we bound the gain for one model, with the exact OOH*/OH* offset of 3.2 eV, `G_{OH}` in [−1, 3] eV and `G_{O}` in [0, 5] eV. The static optimum of the box is 2.0218×10^{-4} `ν`, and with linear barriers the same box gives a gain of at least 6.06 decades, so 2.6945 belongs to the floor law.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. The upper bound uses a quadratic function of the populations, proved in 128-bit ball arithmetic by a separately written program, and the lower bound is the turnover frequency of an explicit chattering protocol, computed by matrix exponentials. Not peer reviewed.",
        },
        refs: [
          { label: "Foley and Razdan (2022), ChemRxiv", href: "https://doi.org/10.26434/chemrxiv-2022-sgc5w" },
          { label: "Ardagh et al. (2019), Catal. Sci. Technol. 9, 5058", href: "https://doi.org/10.1039/c9cy01543d" },
        ],
        figure: { value: "2.6945", caption: "decades: the largest gain of any open-loop protocol, oxygen evolution at 1.5 V, floor barriers, exact 3.2 eV OOH*/OH* relation" },
        note: "catalysis-limits",
      },
      {
        id: "dynamic-two-state-fast-limit",
        topic: "Two-state cycles",
        claim:
          "For rates in a compact positive set no protocol exceeds (Σ 1/`k_{j,max}`)^{-1}, which is `ν`/n for n Eyring steps with non-negative barriers at every instant, and for a two-state cycle no open-loop protocol beats the fast-chattering limit, the maximum of the static turnover frequency over the convex hull of the rate set.",
        context:
          "The bound is elementary; the two-state statement is the one-dimensional case of storage-function bounds (Angeli et al.; Dong and Angeli) and of relaxed steady states (Horn and Lin). It fails for state feedback, where an example reaches 2.0 times the limit, and for three steps, where a rotating protocol is 9.3 % above it.",
        evidence: {
          level: "certified",
          text: "Proved. The proofs were re-derived in a separate review, and random and optimised protocols never exceeded either bound. Not peer reviewed.",
        },
        refs: [
          { label: "Dong and Angeli (2018), Int. J. Robust Nonlinear Control 28, 4790", href: "https://doi.org/10.1002/rnc.4283" },
          { label: "Horn and Lin (1967), Ind. Eng. Chem. Process Des. Dev. 6, 21", href: "https://doi.org/10.1021/i260021a005" },
        ],
        note: "catalysis-limits",
      },
      {
        id: "log-concavity-extensions",
        topic: "Concavity range",
        claim:
          "Log-concavity of the turnover frequency holds for full mean-field Volmer–Tafel kinetics with one adsorbate and convex barrier laws, for a two-state cycle with repulsive Frumkin interaction and convex laws of slope in [0, 1], and for a driven cycle with equilibrium dead-end blocks.",
        context:
          "Kaneko (2026) gave the Hessian of the Volmer–Tafel log rate in the log maximum step rates; we add reversible steps and the dependence on the binding energy of H. It fails for parallel pathways (proved) and with a second driven cycle: among the 672 driving patterns (classes of net reaction extents) of the 62 connected reaction networks with at most 4 states and 6 steps (states as vertices, steps as edges, no self-loops) it holds in exactly the 38 that are one driven cycle with equilibrium dead-end blocks (computed, not proved for larger graphs).",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. The Volmer–Tafel signs are proved by hand and the Frumkin polynomials have non-negative Bernstein coefficients, checked in exact rationals; the graph rule is a computation on small graphs, not a proof. Not peer reviewed.",
        },
        refs: [
          { label: "Kaneko (2026), Zenodo, posted 2026-10-15", href: "https://doi.org/10.5281/zenodo.23357831" },
        ],
        note: "catalysis-limits",
      },
    ],
  },
  {
    id: "chip-design",
    title: "Chip design",
    intro:
      "Lithography, transistors, placement and interconnect are each measured against a limit. These entries prove where some of those limits lie, for stated models, and how far the proved bounds remain from the best known designs.",
    results: [
      {
        id: "euv-failure-brackets",
        topic: "Pointwise failure bounds",
        claim:
          "In a stated Poisson shot-noise model of EUV contact printing, the probabilities that a contact centre does not clear (MISS) and that the saddle between two contacts does (MERGE) lie between computed bounds whose ratio is 1.07 to 1.24 where their geometric mean is between 10^{-12} and 10^{-9}.",
        context:
          "Failure rates have been estimated by importance sampling, simulation, Gaussian-field and algebraic models and extrapolated measurements (Pan et al. 2023; Latypov et al. 2020; Neureuther et al. 2022; Novelli et al. 2026), none with a certified bound in the abstracts we read, and bracketing a compound sum by rounding is classical (Dufresne and Gerber 1989). The events are pointwise, the model is not calibrated to any process, the bounds are for a 1313-point source, and arXiv, Zenodo, Crossref and web searches from 2026-11-03 to 2026-11-09 found no earlier certified bracket for an EUV failure probability.",
        evidence: {
          level: "certified",
          text: "Certified computation. Floating point with a proved relative rounding bound, not interval arithmetic; separately written code with a tilted FFT reproduced the 24 bracket evaluations behind the doses to 9×10^{-8} relative. Not peer reviewed.",
        },
        refs: [
          { label: "Pan et al. (2023), Proc. SPIE 12494", href: "https://doi.org/10.1117/12.2658651" },
          { label: "Latypov et al. (2020), Proc. SPIE 11323, 113230L", href: "https://doi.org/10.1117/12.2551965" },
          { label: "Dufresne and Gerber (1989), ASTIN Bulletin 19, 71", href: "https://doi.org/10.2143/AST.19.1.2014916" },
        ],
        note: "euv-stochastic-failure-certificates",
      },
      {
        id: "euv-certified-doses",
        topic: "Dose brackets",
        claim:
          "For 0.33 NA, 36 nm pitch, 15 % absorption and 3 nm blur, with the threshold scaled with the dose, the lower bound on MISS, the probability that a contact centre does not clear, exceeds 10^{-9} at 64.61 mJ/cm² and the upper bound is at most 10^{-9} at 65.40; for 0.55 NA, 28 nm pitch, 26 % absorption and 2 nm blur the doses are 34.78 and 35.21.",
        context:
          "Each pair is about 1.2 % wide, and the crossing lies between the two doses if the probability falls with dose there, checked on bracket middles at 36 doses at 0.33 NA and not proved. For a 1201×1201 source grid the MISS doses at the same level move by +0.73 % and −1.22 %, outside the brackets, the bounds being for a 1313-point source; a = 0.15 is about the absorption of 35 nm of an organic resist (Fallica et al. 2018), and the model is not calibrated to any process.",
        evidence: {
          level: "certified",
          text: "Certified computation. Floating point with a proved relative rounding bound, not interval arithmetic; separately written code reproduced the 24 bracket evaluations behind the doses to 9×10^{-8} relative. Not peer reviewed.",
        },
        refs: [
          { label: "Fallica et al. (2018), J. Micro/Nanolith. MEMS MOEMS 17, 023505", href: "https://doi.org/10.1117/1.JMM.17.2.023505" },
        ],
        figure: { value: "65.4", caption: "mJ/cm², dose at which the upper bound on MISS is at most 10^{-9} (0.33 NA, 36 nm pitch, 15 % absorption, 3 nm blur)" },
        note: "euv-stochastic-failure-certificates",
      },
      {
        id: "euv-photon-dose-floor",
        topic: "Photon dose floor",
        claim:
          "For every translation-covariant local resist of range `r`, the probability α that the saddle 18 nm from a contact centre dissolves plus the probability β that the centre does not is at least `B(D)`, the least total error of the two photon processes; at 0.33 NA, 36 nm pitch and 15 % absorption, max(α, β) ≤ 10^{-9} needs at least 201.3, 83.5, 44.3, 29.9 and 11.4 mJ/cm² for `r` = 3, 5, 8, 12 and 20 nm.",
        context:
          "The inequality is the Neyman–Pearson lemma with the Poisson likelihood ratio (Neyman and Pearson 1933; Leskelä 2024), a likelihood-ratio resist attains it, and we add its evaluation on a lattice. It needs an image independent of depth, falls with the range, concerns two points and depends on the image, and is not compared with published doses; Melvin et al. (2022) simulated 22 nm-pitch lines and spaces with an emulated resist and concluded that shot noise sets a minimum defectivity.",
        evidence: {
          level: "certified",
          text: "Proved. The inequality is a theorem; the floor values are floating-point lattice bounds with fixed safety margins, not interval arithmetic, and exact Fourier inversion put all 48 floors of the study, in two cases, inside their intervals. Not peer reviewed.",
        },
        refs: [
          { label: "Neyman and Pearson (1933), Phil. Trans. R. Soc. A 231, 289", href: "https://doi.org/10.1098/rsta.1933.0009" },
          { label: "Leskelä (2024), IEEE Trans. Inf. Theory 70, 9084", href: "https://doi.org/10.1109/TIT.2024.3472448" },
          { label: "Melvin et al. (2022), Jpn. J. Appl. Phys. 61, SD1030", href: "https://doi.org/10.35848/1347-4065/ac5b22" },
        ],
        note: "euv-stochastic-failure-certificates",
      },
      {
        id: "euv-chip-level-floor",
        topic: "Chip-level floor",
        claim:
          "For every translation-covariant local resist of range at most 8 nm, at 0.33 NA and doses up to 44.3 mJ/cm² with 15 % absorption, `N_{c}` contacts of the 36 nm array have on average at least `N_{c}B(D)` misdecided points, contact centres that do not dissolve plus saddles that do, and `B(D)` ≥ 2.1×10^{-9}, so 10^{9} contacts have at least 2.1 misdecided points on average.",
        context:
          "`B(D)` is the least total error of the photon processes at a contact centre and at the saddle 18 nm away. A misdecided point is not a critical dimension or an edge roughness; the model image is not calibrated to any process and assumes no depth dependence, and arXiv, Zenodo, Crossref and web searches from 2026-11-03 to 2026-11-09 found no earlier lower bound on the expected number of misdecided points.",
        evidence: {
          level: "certified",
          text: "Proved. The count follows from the inequality by linearity of expectation, `B(D)` is bounded below by a floating-point lattice value with fixed safety margins, and Fourier inversion put the dose at which `B(D)` = 2×10^{-9} for `r` = 8 nm inside the certified interval. Not peer reviewed.",
        },
        refs: [
          { label: "Neyman and Pearson (1933), Phil. Trans. R. Soc. A 231, 289", href: "https://doi.org/10.1098/rsta.1933.0009" },
        ],
        note: "euv-stochastic-failure-certificates",
      },
      {
        id: "steep-switch-pareto-bound",
        topic: "Steep-switch bound",
        claim:
          "For a ballistic source with step channel transmission whose mode density lies between `g_{fl}` and `g_{max}` (`R` = `g_{max}`/`g_{fl}`) and falls no faster than an Urbach tail of energy `E_{U}`, the on/off ratio at supply `V_{DD}` is at most min(`e^{sw}`, `R e^{w/kT}`), with `s` = 1/`E_{U}` + 1/`kT`, `w` = `qV_{DD}`/`m` and body factor `m`; one clipped Urbach ramp attains the supremum.",
        context:
          "Swing minima were known for exponential channel band tails (Beckers et al., Bohuslavskyi et al.), transmission shapes (Ghosh) and Dirac sources (Baccichetti et al., Liu et al.), and Han et al. (arXiv, 2026-10-07) relate a voltage window to the Urbach energy of a channel band tail. We found no earlier bound over the whole class and no exact extremiser in arXiv, Zenodo and web searches to 2026-11-15, and in DataCite to 2026-11-09. Channel band edges and source-drain tunnelling cap the swing further.",
        evidence: {
          level: "certified",
          text: "Proved. A separately written program computed the supremum in 240 cases, and an outer linear program that does not use the ramp reduction agreed within a relative 5.3×10^{-4}. Not peer reviewed.",
        },
        refs: [
          { label: "Beckers, Jazaeri and Enz (2020), IEEE Electron Device Lett. 41, 276", href: "https://doi.org/10.1109/LED.2019.2963379" },
          { label: "Bohuslavskyi et al. (2019), IEEE Electron Device Lett. 40, 784", href: "https://doi.org/10.1109/LED.2019.2903111" },
          { label: "Baccichetti, Marcon and Esseni (2025), IEEE Electron Device Lett. 46, 2204", href: "https://doi.org/10.1109/LED.2025.3612489" },
        ],
        figure: { value: "59.5 mV", caption: "supply saved per decade of source range `R` at fixed on/off ratio once `w` exceeds `E_{U}` ln `R` by several `kT` (300 K, `m` = 1)" },
        note: "steep-switch-limits",
      },
      {
        id: "energy-per-operation-reduction",
        topic: "Energy per event",
        claim:
          "In a model with the supply energy `CV^{2}` per switching event of a node plus leakage, the minimum energy over all devices of a class equals its minimum over supply at the class's exact on/off frontier, for a given supply floor and on/off level; replacing the frontier by an upper bound gives a lower bound on the energy.",
        context:
          "The thermionic minimum-energy supply is due to Calhoun and Chandrakasan, and Truesdell et al. give its scaling with the swing at fixed battery voltage. We found no earlier minimum-energy analysis of circuits built from devices with a source density-of-states class, beyond that constant-swing theory, in arXiv, Zenodo and web searches to 2026-11-15. The model fixes the capacitance across device classes and omits speed, variability and wire delay.",
        evidence: {
          level: "certified",
          text: "Proved. The reduction is a monotonicity argument that was re-derived, and a separately written library recomputed 120 exact-frontier energies to 1.1×10^{-8} relative. Not peer reviewed.",
        },
        refs: [
          { label: "Calhoun and Chandrakasan (2004), Proc. ISLPED, 90", href: "https://doi.org/10.1145/1013235.1013265" },
          { label: "Truesdell et al. (2020), IEEE J. Explor. Solid-State Comput. Devices Circuits 6, 138", href: "https://doi.org/10.1109/JXCDC.2020.3024798" },
        ],
        note: "steep-switch-limits",
      },
      {
        id: "cold-source-energy-gain",
        topic: "Cold-source gain",
        claim:
          "At 300 K a cold source with Urbach energy `E_{U}` = 25 meV, source range `R` = 10^{3} and body factor `m` = 1 needs at least 0.24 of the energy per switching event of a thermionic circuit with the same capacitance, for logic parameter `b` = 200, 10^{3} and 2500 and any supply floor below its optimum supply (76, 102 and 116 mV); with a slope-independent floor of 8 `kT`/`q` the fractions are 0.94, 0.75 and 0.60.",
        context:
          "`b` = κ`K``L_{d}`/α combines clock slack κ, delay factor `K`, logic depth `L_{d}` and activity α; `b` = 200 to 2500 is depth 20 to 50 and activity 0.1 to 0.02 with `K` = κ = 1. The floor is an input of the model, so the gain rests on that choice: the gain-of-one supply 2 ln(1 + `μ`) `kT`/`q` of an inverter with branch slope `μ`, quoted by Ho et al. (2023) as the Swanson–Meindl bound, is 36 mV at `μ` = 1, and 8 `kT`/`q` is an illustrative value. At `b` = 10^{3}, with single-node `kT`/`C` noise at error probability 10^{-9}, the 0.24 needs a capacitance above about 58 aF, and the fraction is 0.93 at 10 aF.",
        evidence: {
          level: "certified",
          text: "Certified computation. Interval arithmetic encloses the four ratios of the closed-form bounds, and two separately written programs agreed on the energies in double precision; the exact frontier is within 0.3 % of the bound. Not peer reviewed.",
        },
        refs: [
          { label: "Calhoun and Chandrakasan (2004), Proc. ISLPED, 90", href: "https://doi.org/10.1145/1013235.1013265" },
        ],
        note: "steep-switch-limits",
      },
      {
        id: "ispd2005-hpwl-lower-bounds",
        topic: "Placement bounds",
        claim:
          "Every placement of the eight ISPD 2005 netlists with cells in orientation N and no overlaps has half-perimeter wirelength (HPWL) at least 0.338 to 0.604 of the lowest value printed in Ren et al. (2025).",
        context:
          "Flow and LP bounds that ignore overlap are classical (Hur and Lillis, Kennings and Markov), Reda and Chowdhary bound a net's length by the area of its cells, and we found no earlier certified bound on these netlists in the sources we searched (arXiv, Zenodo, Crossref and web search to 2026-11-09, GitHub on 2026-11-03, web and GitHub searches repeated 2026-11-15). If the printed values are HPWL of legal placements they are at most 1.66 to 2.96 times the optimum, or 3.27 if any of the eight orientations is allowed.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. The proof was re-derived step by step, and a second checker, written after reading the first, reproduced all 24 totals (8 designs, 3 orientation conventions) to a relative 10^{-9} from the raw benchmark files. Not peer reviewed.",
        },
        refs: [
          { label: "Ren et al. (2025), arXiv:2511.10073", href: "https://arxiv.org/abs/2511.10073" },
          { label: "Kennings and Markov (2000), Proc. ASP-DAC, 179", href: "https://doi.org/10.1145/368434.368600" },
        ],
        figure: { value: "0.338 to 0.604", caption: "certified HPWL lower bound as a fraction of the lowest HPWL printed in Ren et al. (2025), eight designs, orientation N" },
        note: "placement-lower-bounds",
      },
      {
        id: "legality-aware-hpwl-bound",
        topic: "Spreading bound",
        claim:
          "Every placement of adaptec1 and bigblue1 with pairwise disjoint cell interiors and orientation N has HPWL at least 40,290,483 and 39,949,668; on bigblue1 this is 25.5 % above the HPWL of an explicit placement with overlaps allowed, so it exceeds every bound valid for overlapping placements.",
        context:
          "The bound adds a spreading term, from the spreading-metric LPs of Even, Naor, Rao and Schieber and of Gupta and Sidiropoulos with the bathtub value as size function, to cut windows and local bounds that share each net's weight; Wang, Jariwala and Lillis (2005) tightened LP bounds against overlap, and we read only their abstract. On adaptec1 the bound is below the overlap-allowed value 40,730,834.4, so it is not shown to see legality.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. A checker written from the proofs, importing nothing from the code that produced the certificates, reproduced both totals and each of their five parts; the standalone checker shipped with the certificates agrees to seven digits. Not peer reviewed.",
        },
        refs: [
          { label: "Even, Naor, Rao and Schieber (2000), J. ACM 47, 585", href: "https://doi.org/10.1145/347476.347478" },
          { label: "Wang, Jariwala and Lillis (2005), Proc. GLSVLSI, 498", href: "https://doi.org/10.1145/1057661.1057780" },
        ],
        note: "placement-lower-bounds",
      },
      {
        id: "placement-family-ceiling",
        topic: "Family ceiling",
        claim:
          "On four synthetic netlist-like designs of 64 to 144 unit cells with zero pin offsets, 4 equal windows per axis and known legal placements, no certificate of the cut-window and spreading family exceeds 0.648 to 0.724 of the HPWL of that placement, and certificates reach 0.960 to 0.992 of the certified ceilings.",
        context:
          "The ceiling is a weak-duality theorem for the family of certificates behind the bounds on adaptec1 and bigblue1, whose own ceiling is not known to lie below the HPWL of a legal placement. That the family is nearly exhausted on the real netlists is not shown.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. A separately written exact-arithmetic checker accepted each ceiling and rejected scaled-down ones, and annealing over legal placements of two designs found nothing below the known HPWL. Not peer reviewed.",
        },
        refs: [
          { label: "Even, Naor, Rao and Schieber (2000), J. ACM 47, 585", href: "https://doi.org/10.1145/347476.347478" },
        ],
        note: "placement-lower-bounds",
      },
      {
        id: "no-defect-two-graphs-diameter-2",
        topic: "Moore bound",
        claim:
          "No graph of maximum degree `d`, diameter 2 and `d^{2}` − 1 vertices exists for 6 ≤ `d` ≤ 3000.",
        context:
          "Fajtlowicz excluded cyclic defect for `d` ≠ 3 (1987), Nguyen and Miller `d` = 6 and 8 (2008, as reported by Conde and Gimbert), and Conde and Gimbert 6 ≤ `d` ≤ 50 (2009). Miller, Nguyen and Pineda-Villavicencio excluded all but 362 of the degrees from 51 to 3000, by our count, and conjectured that none exists for `d` ≥ 6; we found no other earlier exclusion in searches of arXiv, Zenodo, Crossref and the web to 2026-11-15.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. A hand proof reduces the claim to irreducibility of explicit polynomials, each certified by one prime, and a separately written checker recomputed all 4,705,916,429 certificates; `d` = 6 is an exact computation, also recomputed by separate code. Not peer reviewed.",
        },
        refs: [
          { label: "Conde and Gimbert (2009), Discrete Math. 309, 3166", href: "https://doi.org/10.1016/j.disc.2008.09.017" },
          { label: "Miller, Nguyen and Pineda-Villavicencio (2009), J. Combin. Math. Combin. Comput. 71, 5", href: "https://www.guillermo.com.au/pdfs/BothDegrees.pdf" },
        ],
        figure: { value: "362", caption: "degrees from 51 to 3000 that no earlier argument we found excluded, now excluded" },
        note: "moore-bound-defect-two",
      },
      {
        id: "no-defect-two-graphs-diameter-3",
        topic: "Defect two",
        claim:
          "No graph of maximum degree `d`, diameter 3 and `d^{3}` − `d^{2}` + `d` − 1 vertices exists for 4 ≤ `d` ≤ 150.",
        context:
          "Feria-Purón, Miller and Pineda-Villavicencio excluded `d` = 4 (2011), and Delorme and Pineda-Villavicencio, then Miller, excluded every `d` when the defect is one cycle. Henriksson posted a proof for `d` ≥ 1025 on 2026-11-13, not independently reviewed; we found no other earlier result in searches to 2026-11-15, but could not read Garbe (2015) in full.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. The same reduction with a cubic, one prime per pair, and a separately written checker recomputed all 127,129,765 certificates; the one reducible pair, (4, 10), is excluded by trace equations. Not peer reviewed.",
        },
        refs: [
          { label: "Feria-Purón, Miller and Pineda-Villavicencio (2011), Discrete Appl. Math. 159, 1331", href: "https://arxiv.org/abs/1010.5658" },
          { label: "Delorme and Pineda-Villavicencio (2010), Electron. J. Combin. 17, R143", href: "https://arxiv.org/abs/1010.5841" },
          { label: "Henriksson (2026), Zenodo, v2 of 2026-11-15", href: "https://doi.org/10.5281/zenodo.24235473" },
        ],
        note: "moore-bound-defect-two",
      },
      {
        id: "median-of-nine-19-comparators",
        topic: "Selection networks",
        claim:
          "The median of nine inputs needs exactly 19 comparators in a comparator network, and the same computation gives the exact minimum size for 45 selection problems with 3 to 9 inputs.",
        context:
          "Smith's 1996 article shows a 19-comparator network and calls it the minimum, without proof; a 2017 Stack Overflow question says that a network of Chakrabarti and Wang (1994), which we have not read, reduces to Smith's. We found no earlier proof of the lower bound in searches of arXiv, Zenodo and the web to 2026-11-15, but Knuth's section 5.3.4 and other original papers were not read; of the 45 values, 24 were classical or expected, and Tomar proved six in a preprint dated 2026-10-29.",
        evidence: {
          level: "certified",
          text: "Computer-assisted proof. Each lower bound is a layer certificate accepted by a short standalone program, each upper bound an explicit network checked on all 0-1 inputs, and separately written code reproduced all 45 values. Not peer reviewed.",
        },
        refs: [
          { label: "Smith (1996), Xcell 23, 16", href: "https://users.utcluj.ro/~baruch/media/resources/Image/xl23_16.pdf" },
          { label: "Tomar (2026), Zenodo, v1 dated 2026-10-29", href: "https://doi.org/10.5281/zenodo.23783464" },
        ],
        note: "moore-bound-defect-two",
      },
    ],
  },
];

/** Entries appended to fields that content/results.ts already has, by field id. */
export const frontierAdditions: Record<string, Result[]> = {
  "quantum-error-correction": [
    {
      id: "bb108-depth8-cycle",
      topic: "Syndrome cycles",
      claim:
        "The `[[108, 8, 10]]` bivariate-bicycle code has period-8 translation-invariant syndrome cycles with circuit distance 10, equal to its code distance, in memory experiments of 4 noisy rounds (13 for 153 of them) of each basis, started at its cut; 196 of the 664 cycles of that class with a cut per basis and extended distance at least 8 reach it.",
      context:
        "IBM's depth-8 cycle has distance 8 (Kornstein, Crocker); Pan posted distance-10 circuits for this code, among them a translation-invariant period-11 one (2026-10-29), and Cheng, Guo and Pan found distance 10 for 1,424 of 8,496 uniform depth-seven schedules (2026-11-05). We have not compared their list with ours, and 1,208 further cycles with a cut per basis were mostly not examined, so 196 does not count the class.",
      evidence: {
        level: "certified",
        text: "Exhaustive computation. Separately written code re-derived all 196 cycles at 4 rounds and refuted 49 of the other 468 with replayed fault sets; the remaining 419 and the distance at other round numbers rest on our solver and an unproved lemma. Not peer reviewed.",
      },
      refs: [
        { label: "Cheng, Guo and Pan (2026), arXiv:2611.08247", href: "https://arxiv.org/abs/2611.08247" },
        { label: "G. Pan (2026), GavinNull/gross-code-distance-12", href: "https://github.com/GavinNull/gross-code-distance-12" },
        { label: "Kornstein (2026), Zenodo 10.5281/zenodo.23394575", href: "https://zenodo.org/doi/10.5281/zenodo.23394575" },
      ],
      note: "syndrome-cycles-bivariate-bicycle-codes",
    },
    {
      id: "bb108-logical-error-rate",
      topic: "Logical error rate",
      claim:
        "Under SD6 noise and BP-OSD decoding, a period-8 cycle of `[[108, 8, 10]]` with circuit distance 10 has 0.76 [0.68, 0.86] times IBM's per-round logical error rate at `p` = 2.5×10^{-3}; direct sampling resolves no benefit from `p` = 3×10^{-3} to 5×10^{-3}, and a benefit at 3×10^{-3} is not excluded.",
      context:
        "Ten rounds, perfect preparation and readout, both bases added; two pipelines pooled at 2.5×10^{-3} (4.4 standard deviations) and 4×10^{-3}, one pipeline at 3×10^{-3} and 5×10^{-3}, where the ratios are 0.90 [0.70, 1.16] and 1.08 [0.89, 1.30], and the fault-count stratified estimate at 3×10^{-3}, with decoder priors at 3×10^{-3}, is 0.77 [0.68, 0.88]. With Relay-BP-1 (at 4×10^{-3} and 5×10^{-3}) or SI1000-style noise (at 2.5×10^{-3}) no gain is detectable. Pan reported none at `p` ≥ 10^{-3} for a non-uniform two-colour circuit and little or none at 5×10^{-4} to 10^{-3} for `[[54]]` morphing circuits, and we found no earlier measurement for this cycle in Zenodo, arXiv and web searches to 2026-11-09.",
      evidence: {
        level: "single",
        text: "Measurement. A second pipeline with separately written circuit code and exact circuit sampling gave 0.72 [0.60, 0.86]; both pipelines use the same decoder library (ldpc 2.4.1). Our IBM baseline is 1.03 [0.92, 1.15] times the published fit at 2.5×10^{-3} and 1.1 to 1.2 times at 4×10^{-3} and 5×10^{-3}. Not peer reviewed.",
      },
      refs: [
        { label: "Bravyi et al. (2024), Nature 627, 778", href: "https://arxiv.org/abs/2308.07915" },
        { label: "G. Pan (2026), GavinNull/gross-code-distance-12", href: "https://github.com/GavinNull/gross-code-distance-12" },
      ],
      figure: { value: "0.76", caption: "per-round logical error rate over IBM's at p = 2.5×10^{-3}" },
      note: "syndrome-cycles-bivariate-bicycle-codes",
    },
    {
      id: "gross-fault-location-floor",
      topic: "Fault locations",
      claim:
        "A single-ancilla CNOT syndrome cycle of a bivariate-bicycle code with every data qubit in three X and three Z checks, separate reset and measurement and period `P` has `n(P + 2) + I` fault locations under SD6 noise, `I` ≥ 0 counting idle ancilla steps, so every period-8 cycle of the gross code in which no qubit is in two operations in a step and each ancilla's operations fit in one period has 1440, IBM's count.",
      context:
        "The depth bound `P` ≥ 8, the footprint bound and the idle counts are due to Strikis, Browne and Beverland; we found no earlier closed count or period-8 tie in Zenodo, arXiv and web searches to 2026-11-09. Each further tick costs at least 10% of IBM's fault locations, and reset-free and fused ancillas are outside the statement.",
      evidence: {
        level: "certified",
        text: "Proved. The count was reproduced with separately written circuit code on random legal schedules of periods 8 to 12. Not peer reviewed.",
      },
      refs: [
        { label: "Strikis, Browne and Beverland (2026), arXiv:2603.05481", href: "https://arxiv.org/abs/2603.05481" },
      ],
      note: "syndrome-cycles-bivariate-bicycle-codes",
    },
    {
      id: "gross-no-distance-12-searched",
      topic: "Gross-code cycles",
      claim:
        "No syndrome cycle of the gross code `[[144, 12, 12]]` with circuit distance 12 was found in the classes searched, at 0.9 to 1.4 times IBM's fault locations: every cycle evaluated has an explicit undetected logical fault set of at most 11 faults in the periodic bulk.",
      context:
        "Classes: all 22,608 uniform period-8 cycles; 416,496 two-coloured period-8 cycles of the seven top hook-order classes with one colouring for X and Z; 8,784 uniform period-7 cycles with fused measurement and reset (0.9 times IBM's locations); compact-window uniform cycles of the top hook-order classes at periods 9 to 12 (1.1 to 1.4 times; at period 12, 8,864 of 10,432, one per class of equal fault sets). Strikis, Browne and Beverland proved the bound 11 for non-interleaved cycles and left interleaved ones open, and Pan posted bounds of 11 at periods 8 and 9 for uniform cycles and a period-10 circuit with distance 12 and two idle steps per ancilla window; the fused model is Pan's (2026-10-27, with a period-7 impossibility result for `[[18, 4, 4]]`), and Pan bounded two-colour left-right circuits of the gross code by 10 (2026-10-05). This is not a proof for the problem.",
      evidence: {
        level: "single",
        text: "Exhaustive computation. Fault sets were replayed in separately written circuits for every cycle of the uniform period-7, period-8 and compact period-9 classes, and for samples of the two-coloured class and of periods 10 to 12; lower bounds rest on our enumerators. Not peer reviewed.",
      },
      refs: [
        { label: "Strikis, Browne and Beverland (2026), arXiv:2603.05481", href: "https://arxiv.org/abs/2603.05481" },
        { label: "Cheng, Guo and Pan (2026), arXiv:2611.08247", href: "https://arxiv.org/abs/2611.08247" },
        { label: "G. Pan (2026), GavinNull/gross-code-distance-12", href: "https://github.com/GavinNull/gross-code-distance-12" },
      ],
      note: "syndrome-cycles-bivariate-bicycle-codes",
    },
    {
      id: "gross-distance-11-no-gain",
      topic: "Distance 11",
      claim:
        "At IBM's fault count, a uniform period-8 gross-code cycle with circuit distance 11 has 1.04 [0.90, 1.20] and 1.05 [0.93, 1.18] times IBM's per-round logical error rate at `p` = 4×10^{-3} and 5×10^{-3}: no detectable gain over distance 10.",
      context:
        "SD6 noise, BP-OSD, 12 rounds, both bases, two pipelines pooled; the cycle is Pan's (item 27), and ours is the same with all times shifted by one step. Pan's audits put the three-coloured depth-8 cycle of Strikis et al. at 1.37 [1.04, 1.78] times IBM's at 5×10^{-3} (X and Z, boundaries not equalised; 1.12 [0.87, 1.45] with equal boundaries, audit verdict inconclusive), and Cheng, Guo and Pan reported a tie within statistical error for an eight-timestep distance-11 schedule on 2026-11-05.",
      evidence: {
        level: "candidate",
        text: "Measurement. Values re-derived by a second pipeline; novelty is not established because of the earlier postings. Not peer reviewed.",
      },
      refs: [
        { label: "Cheng, Guo and Pan (2026), arXiv:2611.08247", href: "https://arxiv.org/abs/2611.08247" },
        { label: "G. Pan (2026), GavinNull/gross-code-distance-12", href: "https://github.com/GavinNull/gross-code-distance-12" },
      ],
      note: "syndrome-cycles-bivariate-bicycle-codes",
    },
    {
      id: "gross-decoder-lever",
      topic: "Decoding",
      claim:
        "On identical fault sets of IBM's gross-code cycle, Relay-BP-1 has 0.24 [0.09, 0.55], 0.26 [0.12, 0.50] and 0.41 [0.25, 0.65] times the failure fraction of BP-OSD at 44, 52 and 60 fired mechanisms, and exact minimum-weight decoding corrects 17 of 18 failing sets of BP-OSD at 20 to 32.",
      context:
        "SD6 noise, Z memory, 12 rounds, decoder priors at 3×10^{-3}; Relay-BP-5 has 0.21 [0.12, 0.33] at 60, pooled over two samples, and 0.37 [0.20, 0.62] in the second alone. Müller et al. report Relay-BP-5 about one order of magnitude below BP+OSD on the gross code at 3×10^{-3} and Beverland et al. define the failure fraction and study Relay failure spectra; the paired ratios and exact-decoder probes are failure fractions at fixed fault count, not per-round rates.",
      evidence: {
        level: "single",
        text: "Measurement. A second implementation with its own sampler and decoder code ran the paired Relay-BP-1 ratios and the exact-decoder tests, and its Relay-BP-5 value replaced a lower first one; both used the same decoder libraries, and Relay-BP-5 at 66 and 72 was not re-sampled. Not peer reviewed.",
      },
      refs: [
        { label: "Müller et al. (2025), arXiv:2506.01779", href: "https://arxiv.org/abs/2506.01779" },
        { label: "Beverland et al. (2025), arXiv:2511.15177", href: "https://arxiv.org/abs/2511.15177" },
      ],
      note: "syndrome-cycles-bivariate-bicycle-codes",
    },
    {
      id: "bb756-distance-34",
      topic: "Code distance",
      claim:
        "The `[[756, 16]]` bivariate-bicycle code has code distance exactly 34: a complete search finds no logical operator of weight 32 or less, and three of weight 34 exist.",
      context:
        "Bravyi et al. printed d ≤ 34 and Falcone posted d ≥ 14 (2026-08-29); Cheng, Guo and Pan reported d = 34 on 2026-11-05, and the DistQLDPC log gave d = 34 on 2026-11-07 from one engine without a proof object. Our record is dated 2026-10-30 and has no proof object either.",
      evidence: {
        level: "single",
        text: "Exhaustive computation. Separately written code re-executed all tasks of the weight-30 search and 22.99% of the nodes of the weight-32 search; the rest rests on the solver's output and a written soundness proof. Not peer reviewed.",
      },
      refs: [
        { label: "Cheng, Guo and Pan (2026), arXiv:2611.08247", href: "https://arxiv.org/abs/2611.08247" },
        { label: "Chen and Lai (2026), DistQLDPC status log", href: "https://github.com/guluchen/DistQLDPC/blob/main/data/matrices/README.md" },
        { label: "Bravyi et al. (2024), Nature 627, 778", href: "https://arxiv.org/abs/2308.07915" },
      ],
      note: "syndrome-cycles-bivariate-bicycle-codes",
    },
    {
      id: "bb-exact-distances",
      topic: "Code distances",
      claim:
        "Exact code distances: `[[784, 24]]` 24 and `[[432, 4]]` 22, which Bravyi et al. print as upper bounds, and 28, 28, 30 for the Symons et al. codes `[[504, 12]]`, `[[576, 12]]`, `[[648, 12]]`, against printed upper bounds 30, 32, 36.",
      context:
        "Part of a census of 177 codes from Bravyi et al., Symons et al., Wang and Mueller, Lu, Yang and Guo, Lin and Pryadko, two papers of Cruz-Benito et al. and the DistQLDPC benchmark list, of which 170 now have exact distances and eight lie below the printed bound; Lee (arXiv:2610.13880, n ≤ 320) and Thalluri (Zenodo 10.5281/zenodo.23719465, n ≤ 400) posted exact distances of smaller codes. For `[[434, 10]]`, `[[372, 10]]`, `[[310, 10]]` Falcone's data file of 2026-08-29 held witnesses of weight 24, 22 and 20, so only the exact values 22, 22, 20 are ours, and for `[[434, 10]]` also the weight-22 witness.",
      evidence: {
        level: "certified",
        text: "Exhaustive computation. Each value is a complete search below `d` plus an explicit logical operator checked by a standalone program; separately written solvers repeated the searches for the five codes above, and every witness was re-checked. Not peer reviewed.",
      },
      refs: [
        { label: "Bravyi et al. (2024), Nature 627, 778", href: "https://arxiv.org/abs/2308.07915" },
        { label: "Symons, Rajput and Browne (2025), arXiv:2511.13560", href: "https://arxiv.org/abs/2511.13560" },
        { label: "Falcone (2026), Zenodo 10.5281/zenodo.22161592", href: "https://zenodo.org/doi/10.5281/zenodo.22161592" },
      ],
      note: "syndrome-cycles-bivariate-bicycle-codes",
    },
  ],
};
