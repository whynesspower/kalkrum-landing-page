# Good-matrix checker (written from the definition only).
# Goethals-Seidel array, full Hadamard and skew check with exact integers.
import sys, itertools
import numpy as np

def decode(word, n, skew):
    h = (n - 1) // 2
    x = [0] * n
    x[0] = 1
    for i in range(1, h + 1):
        x[i] = -1 if (word >> (i - 1)) & 1 else 1
    for i in range(1, h + 1):
        x[n - i] = -x[i] if skew else x[i]
    if word >> h:
        raise ValueError("bits beyond h set")
    return x

def circ(x):
    n = len(x)
    # first row x: M[i][j] = x[(j - i) mod n]
    return np.array([[x[(j - i) % n] for j in range(n)] for i in range(n)], dtype=np.int64)

def gs_matrix(a, b, c, d):
    n = len(a)
    A, B, C, D = circ(a), circ(b), circ(c), circ(d)
    R = np.zeros((n, n), dtype=np.int64)
    for i in range(n):
        R[i, n - 1 - i] = 1
    BR, CR, DR = B @ R, C @ R, D @ R
    H = np.block([
        [A, BR, CR, DR],
        [-BR, A, D.T @ R, -C.T @ R],
        [-CR, -D.T @ R, A, B.T @ R],
        [-DR, C.T @ R, -B.T @ R, A]])
    return H

def check(a, b, c, d, require_good=True):
    n = len(a)
    msgs = []
    ok = True
    for x in (a, b, c, d):
        if any(v not in (1, -1) for v in x) or len(x) != n:
            return False, ["entries not +-1 or length mismatch"]
    if require_good:
        if a[0] != 1 or any(a[(n - i) % n] != -a[i] for i in range(1, n)):
            ok = False; msgs.append("A not skew-type")
        for nm, x in (("B", b), ("C", c), ("D", d)):
            if any(x[(n - i) % n] != x[i] for i in range(1, n)):
                ok = False; msgs.append(nm + " not symmetric")
    # PAF sum
    paf = [sum(x[i] * x[(i + s) % n] for x in (a, b, c, d) for i in range(n)) for s in range(n)]
    if paf[0] != 4 * n or any(paf[s] != 0 for s in range(1, n)):
        ok = False; msgs.append("PAF sum fails")
    H = gs_matrix(a, b, c, d)
    N = 4 * n
    if not np.all(np.abs(H) == 1):
        ok = False; msgs.append("H entries")
    if not np.array_equal(H @ H.T, N * np.eye(N, dtype=np.int64)):
        ok = False; msgs.append("H H^T != 4n I")
    if require_good and not np.array_equal(H + H.T, 2 * np.eye(N, dtype=np.int64)):
        ok = False; msgs.append("H + H^T != 2I")
    return ok, msgs

def from_words(ws, n):
    return decode(ws[0], n, True), decode(ws[1], n, False), decode(ws[2], n, False), decode(ws[3], n, False)

if __name__ == "__main__":
    wit = {53: [0x29f4da, 0xb79910, 0x3171087, 0x3576479],
           55: [0x48f51d, 0x82e36e, 0x3a9fe69, 0x41b7527]}
    for n, ws in wit.items():
        a, b, c, d = from_words(ws, n)
        ok, m = check(a, b, c, d)
        print("witness n=%d ok=%s %s rowsums=%s" % (n, ok, m, [sum(x) for x in (a, b, c, d)]))
        # H determinant-free sanity: also check with Python ints (no overflow possible but re-done)
        H = gs_matrix(a, b, c, d).tolist()
        N = 4 * n
        bad = 0
        for i in range(N):
            for j in range(i, N):
                s = sum(H[i][k] * H[j][k] for k in range(N))
                if s != (N if i == j else 0):
                    bad += 1
        print("  python-int HH^T mismatches:", bad)
        # planted errors: every single-bit flip of every word (within h bits), and A<->B swap
        h = (n - 1) // 2
        acc = 0; tot = 0
        for wi in range(4):
            for bit in range(h):
                ws2 = list(ws); ws2[wi] ^= (1 << bit)
                a2, b2, c2, d2 = from_words(ws2, n)
                ok2, _ = check(a2, b2, c2, d2)
                tot += 1; acc += ok2
        print("  single-bit mutants: %d tested, %d accepted" % (tot, acc))
        ok3, _ = check(b, a, c, d)
        print("  swap A<->B accepted:", ok3)
        # every ordering of B, C, D must be accepted
        for perm in itertools.permutations([1, 2, 3]):
            xs = [a, b, c, d]
            ok4, _ = check(xs[0], xs[perm[0]], xs[perm[1]], xs[perm[2]])
            if not ok4:
                print("  permutation of B,C,D rejected (unexpected)", perm)
