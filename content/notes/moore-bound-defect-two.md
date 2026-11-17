---
title: Graphs two below the Moore bound, and the median of nine inputs
slug: moore-bound-defect-two
kind: white-paper
field: Chip design
date: 2026-11-15
summary: No graph of maximum degree d, diameter 2 and d²−1 vertices exists for 6 ≤ d ≤ 3000, and none of diameter 3 and d³−d²+d−1 vertices for 4 ≤ d ≤ 150, by computer-assisted proof. A comparator network for the median of nine inputs needs exactly 19 comparators.
---

No graph of maximum degree $d$, diameter 2 and $d^2-1$ vertices exists for $6\le d\le3000$. None of maximum degree $d$, diameter 3 and $d^3-d^2+d-1$ vertices exists for $4\le d\le150$. Conde and Gimbert had excluded $6\le d\le50$ [1], and Miller, Nguyen and Pineda-Villavicencio all but 362 of the degrees from 51 to 3000, by our count [2]. At diameter 2, Fajtlowicz excluded cyclic defect for $d\ne3$ [17]; at diameter 3, $d=4$ was excluded [3], and so was cyclic defect for every $d$ [4, 5]. Henriksson posted an unreviewed proof for $d\ge1025$ on 2026-11-13 [6]. We found no other earlier result in searches to 2026-11-15, but could not read Garbe's paper [7].

Separately, the median of nine inputs needs exactly 19 comparators in a comparator network. A 19-comparator network was published by 1996 [8]. In searches of arXiv, Zenodo and the web to 2026-11-15 we found no earlier proof that it is minimal, and we could not read every original source.

## The question

The degree-diameter problem, from the design of interconnection networks [2], asks for the largest finite simple graph of maximum degree $d$ and diameter $k$. The order is at most the Moore bound, $d^2+1$ for $k=2$ and $d^3-d^2+d+1$ for $k=3$. A graph two short of it has defect 2. Five such graphs are known, for $3\le d\le5$ at diameter 2 and $d=3$ at diameter 3 [9].

For $d\ge6$ Miller, Nguyen and Pineda-Villavicencio conjectured that none exists at diameter 2 [2]. Their theorems exclude odd $d$ other than $l^2+l-1$ and $l^2+l+3$ ($l$ an integer), even $d\not\equiv1\pmod 3$, and every $d$ for which the number $N_5$ of 5-cycles forced on the graph is not an integer, with $N_5=(d-2)(d^4+2d^2-2d-25)/10$ for even $d$ and $(d^2-1)(d^3-2d^2+3d-8)/10$ for odd $d$. These theorems draw on a structure theorem of Nguyen and Miller [18], as quoted in [2], which we did not re-verify. This leaves 362 degrees from 51 to 3000, 295 even and 67 odd. At diameter 3 the classification is listed as open [9]. Cyclic defect means that the matrix $B$ of the proof sketch below is a single cycle.

A median filter replaces each pixel by the median of its 3×3 neighbourhood, and hardware finds it with a comparator network [8]: a sequence of comparators $[i:j]$, $i<j$, each putting the smaller of the values on lines $i$ and $j$ on line $i$. The size is the number of comparators, and a comparator with an unused output counts once, so counts of min and max operations measure something else. Smith asserted without proof that 19 is the least size for the median of nine.

## What we found

> **Theorem 1 (Diameter 2).** No graph of maximum degree $d$, diameter 2 and order $d^2-1$ exists for $6\le d\le3000$.

> **Theorem 2 (Diameter 3).** No graph of maximum degree $d$, diameter 3 and order $d^3-d^2+d-1$ exists for $4\le d\le150$.

All three results are computer-assisted proofs. For $7\le d\le3000$, Theorem 1 rests on one certificate for each pair $(d,i)$, $i$ indexing the polynomials $F_{i,d}$ defined below, with $5\le i\le d^2-1$, $i\ne6$, for the 1,497 even $d$ and the 105 odd $d$ of the forms $l^2+l-1$ and $l^2+l+3$: 4,705,916,429 pairs. The case $d=6$ is an exhaustive exact computation over 2,573 cycle structures and 4,910 multiplicity assignments. Theorem 2 rests on 127,129,765 pairs, one of which, $(4,10)$, is reducible and is excluded by a trace argument.

We also computed the least size of a comparator network for 45 selection problems with 3 to 9 inputs, writing $\mathrm{top}(n,t)$ for the least size of a network that puts the $t$ largest of $n$ inputs on $t$ lines. The output lines are forced: the $t$-th smallest ends on line $t$ from the top and the $t$ largest on the bottom $t$ lines. The median of nine needs exactly 19 comparators.

| $n$ | $t$-th smallest on a line, $t=1,2,\dots$ | $t$ largest on $t$ lines, $t=1,2,\dots$ | two middle values |
|---|---|---|---|
| 3 | 2, **3** | 2 | none |
| 4 | 3, 5 | 3, 4 | 4 |
| 5 | 4, 7, **7** | 4, 6 | none |
| 6 | 5, 9, 10 | 5, 8, 8 | 10 |
| 7 | 6, 11, 12, **13** | 6, 10, 11 | none |
| 8 | 7, 13, 14, 16 | 7, 12, 13, 14 | 16 |
| 9 | 8, 15, 16, 19, **19** | 8, 14, 15, 17 | none |
Table: Least number of comparators, 23 + 19 + 3 = 45 values; medians in bold. Larger $t$ follow by symmetry.

## Why it is true

A graph $G$ as in Theorem 1 has $n=d^2-1$ vertices and is $d$-regular [3]. Let $A$ be its adjacency matrix, $I$ the identity and $J$ the all-ones matrix. Then $B=A^2+A-(d-1)I-J$ has non-negative integer entries, zero diagonal and row sums 2, since the $d^2$ non-returning walks of length 1 or 2 from a vertex reach the other $d^2-2$ vertices, each at least once. So $B$ is the adjacency matrix of disjoint cycles, a double edge counting as a cycle of length 2 [2]. Off the all-ones vector an eigenvalue $\lambda$ of $A$ goes with the eigenvalue $\mu=\lambda^2+\lambda+1-d$ of $B$, and a cycle of length $L$ has eigenvalues $2\cos(2\pi k/L)$. So the eigenvalues of $A$ are roots of $F_{i,d}(x)=f_i(x^2+x+1-d)$, with $f_i$ the minimal polynomial of $2\cos(2\pi/i)$, and the roots of an irreducible $F_{i,d}$ have equal multiplicity [1, 2].

Take $d\ge7$ and suppose $F_{i,d}$ is irreducible for $5\le i\le d^2-1$, $i\ne6$. For $i=1,2,3,4,6$ it is a quadratic with rational roots only for $d=l^2+l-1$, $l^2+l+3$, $l^2+l+2$, $l^2+l+1$, $l^2+l$ respectively, and for at most one $i$. The multiplicities are then forced, apart from the two rational roots, if any, whose multiplicities may differ. A graph needs $\mathrm{tr}\,A=0$, $\mathrm{tr}\,A^3=6\tau$ with $\tau$ the number of triangles, $\tau<n/6$ (proved from the cycle structure of $B$), and $\mathrm{tr}\,AB^2\ge0$. For even $d$ without rational roots, $\mathrm{tr}\,A=-(d^2-2d-2)/2\ne0$. For $d=l^2+l+2$ or $l^2+l$, $\mathrm{tr}\,A=0$ fixes that difference and then $\mathrm{tr}\,AB^2<0$. For $d=l^2+l-1$ it forces $\tau=n/6$, and for $d=l^2+l+3$ it forces $\mathrm{tr}\,A^3<0$. Other odd $d$ fail by a parity count of cycles [2].

$F_{i,d}$ is reducible only if $4d-3+8\cos(2\pi/i)$ is a square in $\mathbb Q(\cos(2\pi/i))$, and then the square root is an algebraic integer, so its reduction modulo a prime is a square. Let $p\equiv1\pmod i$, let $w$ have order $i$ in $\mathbb F_p$ and let $j$ be coprime to $i$. If $4d-3+4(w^j+w^{-j})$ is a quadratic non-residue modulo $p$, then $F_{i,d}$ is irreducible. One such $p$ per pair $(d,i)$ is the certificate.

At diameter 3, with $n=d^3-d^2+d-1$ vertices, non-backtracking walks of length at most 3 give $g(A)=J+B$ [4], with $g(x)=x^3+x^2-(2d-2)x+1-d$ and $B$ again the adjacency matrix of disjoint cycles. The eigenvalues of $A$ are roots of $H_{i,d}=f_i(g(x))$. If this is reducible, $g(x)-2\cos(2\pi/i)$ has a root in $\mathbb Z[2\cos(2\pi/i)]$, so a prime $p\equiv1\pmod i$ at which $g(x)-(w^j+w^{-j})$ has no root in $\mathbb F_p$ is a certificate. With every $H_{i,d}$ irreducible, $\mathrm{tr}\,A=-(d^3-d^2-2d-2)/3\ne0$. For $d\in\{5,6,8,10,12,27,31,35,39\}$ some $g(x)-\mu$ has a rational root, with $\mu=2,-2,-1,0,1$ the root of $f_i$ for $i=1,2,3,4,6$, and $\mathrm{tr}\,A=0$ and $\mathrm{tr}\,A^2=nd$ then give different values for the difference of two multiplicities. For $(4,10)$, $f_{10}(g)=(x^2+3x+1)(x^4-x^3-9x^2+9x+11)$, and $\mathrm{tr}\,A=0$ needs that difference to be $-38/7$.

For selection, a network has the required property on all real inputs if and only if it has it on all 0-1 inputs, and the 0-1 inputs of one to three fixed weights decide it. A lower bound of $K$ comparators is a family of finite sets $L_0,\dots,L_{K-1}$ of states, the images of those inputs under networks, with the initial state in $L_0$, no state having the property, and every comparator taking a state of $L_k$, $k\le K-2$, to one equal, up to relabelling of lines and, for symmetric problems, complementation, to a state of some $L_j$, $j\le k+1$. No network of fewer than $K$ comparators then has the property. An upper bound is an explicit network checked on all $2^n$ 0-1 inputs.

## How it was checked

A standalone C program of about 160 lines per diameter tests, for every pair, primality, the order of $w$ and the residue or root condition. A second checker, written separately with different algorithms, recomputed all 4,705,916,429 and all 127,129,765 certificates and reproduced the stored exceptions exactly. Exact factorisation of 20,158 pairs found no reducible polynomial that a certificate accepted. Corrupted certificates are rejected, and the five known defect-2 graphs satisfy the identities. The case $d=6$ was recomputed by separate code. For selection, separately written code reproduced all 45 values, and a separately written checker accepted all 45 certificates and rejected corrupted copies of two of them.

A separate automated review, by an AI model, re-derived the hand proofs line by line; the second checkers and the review were also written by AI models, so they are independent in code and algorithm, not in kind of author. The proofs have not been peer reviewed, and no human has reviewed the diameter checkers line by line.

## What it does not show

Non-existence for all $d\ge6$ at diameter 2 remains a conjecture [2]. At diameter 3 the classification is listed as open [9], and $151\le d\le1024$ remains open so far as we know. The method gives a proof for all $d\ge7$ at diameter 2 and all $d\ge4$ at diameter 3 once every $F_{i,d}$ and $H_{i,d}$ with $i\ge5$, $i\ne6$ is irreducible, and a reducible case may still be excluded by traces, as $(4,10)$ is. Nothing is shown about the structure of a hypothetical graph beyond regularity, $B$ and the triangle bound, or about diameter 4 or more.

The selection sizes say nothing about depth or about adaptive selection, which can need fewer comparisons.

## Earlier and parallel work

Conde and Gimbert gave a non-existence criterion in terms of irreducibility of the polynomials $F_{i,d}$, conjectured that they are irreducible, and verified it with PARI for even $d$ from 8 to 50 [1]. Nguyen and Miller [18] set up $A^2+A-(d-1)I=J+B$ for defect 2 and excluded $d=6$, 8 and infinitely many odd $d$, as reported in [1], and Fajtlowicz [17] had treated the case that $B$ is one cycle. Miller, Nguyen and Pineda-Villavicencio gave the spectrum of $A$ for any cycle structure of $B$ and the theorems above [2]. We add prime certificates, which replace PARI for $7\le d\le50$ and reach $d=3000$ without the structure theorem, and a direct proof of the weaker bound $\tau<n/6$, where the structure theorem of Nguyen and Miller, as quoted in [1, 2], fixes the number of triangles. We re-prove $d=6$ by an exact computation and $d=4$ at diameter 3 by a spectral route.

Delorme and Pineda-Villavicencio used $g(A)=J+B$, the polynomials $H_{i,d}$ and the integer-root argument when $B$ is one cycle, and excluded that case at diameter 3 [4], and Miller at every diameter at least 3 [5]. We treat every cycle structure of $B$ by trace equations and certify irreducibility by primes. Feria-Purón, Miller and Pineda-Villavicencio excluded $d=4$ by counting cycles, and their even-$d$ theorem needs diameter at least 4 [3]. Garbe's abstract states non-existence for odd $d$ at diameter 4 and similar statements for defect 2 [7]. We could not read the paper. A secondary description lists its results for girths 9, 13, 17, 21, 25 and 29 and, for degrees 3, 7 and 9, for girths $2s+1$ in certain classes [16]. Diameter 3 is girth 7, so a statement for diameter 3 cannot be ruled out, for $d=7$ and 9 in particular. Searches of arXiv, Zenodo, Crossref and the web to 2026-11-15 found no other result for diameter 3 with $5\le d\le150$, or beyond $d=50$ at diameter 2 apart from [2].

Henriksson posted on 2026-11-13, and revised on 2026-11-15, a computer-assisted proof that the defect at diameter 3 is at least of order $\sqrt d$ and exceeds $\sqrt{d-1}/8$ for every $d\ge1025$ [6]. As $\sqrt{1024}/8=4$, this excludes defect 2 for $d\ge1025$. It states that AI models took part, that the proof was checked in Lean 4 and that it has not been independently reviewed. We have not examined it. Ours adds every $d$ from 4 to 150, below the cutoff of the preprint, and the diameter-2 range.

Smith's 1996 article shows a 19-comparator network as the minimum exchange network, without a proof [8]. Dobbelaere's list marks it optimal and cites Smith [10]. Paeth derives a 19-link network from the 3×3 design of his 1990 chapter and claims no optimality for it [11]. We found no earlier proof of minimality in searches of arXiv, Zenodo and the web to 2026-11-15. Knuth's section 5.3.4 and Yao's thesis reached us only through Tomar [15], and Paeth's 1990 chapter and a 1994 paper of Chakrabarti and Wang [12], whose network a 2017 Stack Overflow question says reduces to Smith's, not at all, so priority of the proof is not established.

Of the 45 values, 24 were known or expected. Selecting the minimum or the maximum takes $n-1$ comparators (14 values), and the two largest take $2n-4$ (6 values) [13]. The value $\mathrm{top}(6,3)=8$ starts Yao's recursion for the three largest [15]. Knuth's exercise 5.3.4-20 gives the upper bound $3n-10$ for the four largest and adds that equality probably holds [13], which gives $\mathrm{top}(7,3)=11$ by symmetry, $\mathrm{top}(8,4)=14$ and $\mathrm{top}(9,4)=17$. Qu, Tasbihi and Kschischang conjectured $\mathrm{top}(8,4)=14$ with a network of 14 comparators or minselectors [14]. Tomar's preprint of 2026-10-29 (v1) independently proves $\mathrm{top}(n,3)$ for $4\le n\le18$ and $\mathrm{top}(n,4)$ for $6\le n\le12$ [15]. These include six of our values, $\mathrm{top}(n,3)$ for $6\le n\le9$, $\mathrm{top}(8,4)$ and $\mathrm{top}(9,4)$. It says nothing of medians.

## References

1. J. Conde and J. Gimbert, "On the existence of graphs of diameter two and defect two", Discrete Math. 309, 3166 (2009). https://doi.org/10.1016/j.disc.2008.09.017
2. M. Miller, M. H. Nguyen and G. Pineda-Villavicencio, "On the nonexistence of graphs of diameter 2 and defect 2", J. Combin. Math. Combin. Comput. 71, 5 (2009). https://www.guillermo.com.au/pdfs/BothDegrees.pdf
3. R. Feria-Purón, M. Miller and G. Pineda-Villavicencio, "On graphs of defect at most 2", Discrete Appl. Math. 159, 1331 (2011), arXiv:1010.5658. https://arxiv.org/abs/1010.5658
4. C. Delorme and G. Pineda-Villavicencio, "On graphs with cyclic defect or excess", Electron. J. Combin. 17, R143 (2010), arXiv:1010.5841. https://arxiv.org/abs/1010.5841
5. M. Miller, "Nonexistence of graphs with cyclic defect", Electron. J. Combin. 18, P71 (2011). https://doi.org/10.37236/558
6. A. Henriksson, "Lowering the Moore bound for diameter three by order √d", Zenodo, v2, 2026-11-15; v1, "An unbounded Moore deficit at diameter three", 2026-11-13, doi:10.5281/zenodo.24190386. https://doi.org/10.5281/zenodo.24235473
7. F. Garbe, "On graphs with excess or defect 2", Discrete Appl. Math. 180, 81 (2015). https://doi.org/10.1016/j.dam.2014.07.022
8. J. L. Smith, "Implementing Median Filters in XC4000E FPGAs", Xcell 23, 16 (Xilinx, Q4 1996). https://users.utcluj.ro/~baruch/media/resources/Image/xl23_16.pdf
9. M. Miller and J. Širáň, "Moore graphs and beyond: a survey of the degree/diameter problem", Electron. J. Combin. DS14 (2013). https://doi.org/10.37236/35
10. B. Dobbelaere, "List of median selection networks", web page, updated 2026-11-08. https://bertdobbelaere.github.io/median_networks.html
11. A. Paeth, "Non-Interfering Concurrent Exchange (NICE) Networks", arXiv:1808.05212 (2018). https://arxiv.org/abs/1808.05212
12. C. Chakrabarti and L.-Y. Wang, "Novel sorting network-based architectures for rank order filters", IEEE Trans. VLSI Syst. 2, 502 (1994). https://doi.org/10.1109/92.335027
13. D. E. Knuth, The Art of Computer Programming, vol. 3, Sorting and Searching, 2nd ed., section 5.3.4 and exercise 5.3.4-20 as replaced in the 2003 errata (Addison-Wesley, 1998), as quoted in [15]. https://www.informit.com/store/art-of-computer-programming-volume-3-sorting-and-searching-9780201896855
14. Y. Qu, A. Tasbihi and F. R. Kschischang, "Constituent automorphism decoding of Reed–Muller codes", arXiv:2409.03700 (2024). https://arxiv.org/abs/2409.03700
15. T. S. Tomar, "Exact sizes of networks that select the three or four largest of n elements", Zenodo, v1, 2026-10-29. https://doi.org/10.5281/zenodo.23783464
16. T. B. Jajcayová, S. Filipovski and R. Jajcay, "Improved lower bounds for the orders of even girth cages", Electron. J. Combin. 23, P3.55 (2016). https://doi.org/10.37236/6015
17. S. Fajtlowicz, "Graphs of diameter 2 with cyclic defect", Colloq. Math. 51, 103 (1987). https://doi.org/10.4064/cm-51-1-103-106
18. M. H. Nguyen and M. Miller, "Structural properties of graphs of diameter 2 with maximal repeats", Discrete Math. 308, 2337 (2008), not read by us. https://doi.org/10.1016/j.disc.2006.09.057
