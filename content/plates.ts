/**
 * Data behind the plates. Every value here is rebuilt and checked by scripts/verify-plates.py.
 */

/** One complete mapping θ of Z₃₁ with θ(0) = 0: θ is a permutation, and so is x ↦ x + θ(x). */
export const z31 = [
  0, 9, 21, 16, 30, 10, 29, 1, 13, 19, 23, 25, 15, 24, 2, 27, 4, 8, 14, 26, 6, 3, 22, 7, 5, 28, 17, 11, 12, 20, 18,
];

/**
 * IBM's two-gross code [[288, 12, 18]] as a bivariate bicycle code on a 12 × 12 torus:
 * A = x³ + y² + y⁷, B = y³ + x + x² (Bravyi et al., arXiv:2308.07915, Table 3). Shifts are (x, y).
 */
export const twoGross = {
  l: 12,
  m: 12,
  A: [
    [3, 0],
    [0, 2],
    [0, 7],
  ],
  B: [
    [0, 3],
    [1, 0],
    [2, 0],
  ],
} as const;

/** Where the order-2148 Hadamard matrix and its verifier live. */
