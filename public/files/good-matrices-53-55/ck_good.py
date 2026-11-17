#!/usr/bin/env python3
"""Checker for circulant good matrices of odd order n.
Input: n and four hex words (A first). Convention:
  h = (n-1)/2; x_0 = +1; for i = 1..h, x_i = -1 iff bit (i-1) of the word is set;
  A skew-type: a_{n-i} = -a_i; B, C, D symmetric: x_{n-i} = x_i.
Checks: (1) word < 2^h; (2) sum_X PAF_X(s) = 0, s = 1..n-1; (3) Goethals-Seidel array H (order 4n),
H H^T = 4n I and H + H^T = 2 I, exact integer arithmetic (numpy int64; entries bounded by 4n)."""
import sys
import numpy as np

def decode(n, w, skew):
    h = (n - 1) // 2
    if w >> h:
        raise ValueError("word has bits above h")
    x = [0] * n
    x[0] = 1
    for i in range(1, h + 1):
        v = -1 if (w >> (i - 1)) & 1 else 1
        x[i] = v
        x[n - i] = -v if skew else v
    return x

def paf(x, s):
    n = len(x)
    return sum(x[i] * x[(i + s) % n] for i in range(n))

def circ(x):
    n = len(x)
    # first row x: M[i][j] = x[(j - i) mod n]
    return np.array([[x[(j - i) % n] for j in range(n)] for i in range(n)], dtype=np.int64)

def check(n, words, verbose=False):
    A = decode(n, words[0], True)
    B, C, D = (decode(n, w, False) for w in words[1:])
    # structural
    assert all(A[(n - i) % n] == -A[i] for i in range(1, n)) and A[0] == 1
    for X in (B, C, D):
        assert all(X[(n - i) % n] == X[i] for i in range(n))
    ok_paf = all(sum(paf(X, s) for X in (A, B, C, D)) == 0 for s in range(1, n))
    tot0 = sum(paf(X, 0) for X in (A, B, C, D))
    MA, MB, MC, MD = (circ(X) for X in (A, B, C, D))
    R = np.array([[1 if (i + j) % n == n - 1 else 0 for j in range(n)] for i in range(n)], dtype=np.int64)
    T = lambda M: M.T
    H = np.block([
        [MA,        MB @ R,       MC @ R,       MD @ R],
        [-(MB @ R), MA,           T(MD) @ R,    -(T(MC) @ R)],
        [-(MC @ R), -(T(MD) @ R), MA,           T(MB) @ R],
        [-(MD @ R), T(MC) @ R,    -(T(MB) @ R), MA]])
    N = 4 * n
    I = np.eye(N, dtype=np.int64)
    entries_pm1 = bool(np.all(np.abs(H) == 1))
    hadamard = bool(np.array_equal(H @ H.T, N * I))
    skewH = bool(np.array_equal(H + H.T, 2 * I))
    rs = [sum(X) for X in (A, B, C, D)]
    res = dict(n=n, paf_ok=ok_paf, paf0=tot0, pm1=entries_pm1, hadamard=hadamard, skew=skewH, rowsums=rs)
    res["PASS"] = ok_paf and tot0 == 4 * n and entries_pm1 and hadamard and skewH
    return res, H

if __name__ == "__main__":
    n = int(sys.argv[1]); words = [int(t, 16) for t in sys.argv[2:6]]
    res, H = check(n, words)
    print(res)
    if len(sys.argv) > 6:
        np.savetxt(sys.argv[6], H, fmt="%d")
    sys.exit(0 if res["PASS"] else 1)
