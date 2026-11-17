# Checks the published circulant weighing matrices from the definition. Python 3, standard library only.
# usage: python3 -I check_objects.py DIR
# DIR holds cw120_36_classes.json, cw180_36_classes.json, lj_weight4.json, lj_weight16.json.
# A matrix is given by its first row: +1 at the positions P, -1 at the positions N, 0 elsewhere.
# Checks: entries in {0, +1, -1} with k nonzero; periodic autocorrelation sum_i a_i a_(i+t) = 0 for t = 1..n-1
# (which is a(x) a(x^-1) = k in Z[x]/(x^n - 1), i.e. W W^T = kI for the circulant W); proper (the differences of the
# support and n have greatest common divisor 1); pairwise inequivalent under shifts, multipliers and negation.
import json, sys, math, os

D = sys.argv[1]
failures = 0


def load(name):
    with open(os.path.join(D, name)) as f:
        return json.load(f)


def is_cw(n, P, N, k):
    a = [0] * n
    for x in P:
        a[x % n] += 1
    for x in N:
        a[x % n] -= 1
    if any(abs(v) > 1 for v in a):
        return False
    sup = [i for i in range(n) if a[i]]
    if len(sup) != k:
        return False
    return all(sum(a[i] * a[(i + t) % n] for i in sup) == 0 for t in range(1, n))


def is_proper(n, P, N):
    S = sorted(set(P) | set(N))
    g = n
    for x in S:
        g = math.gcd(g, x - S[0])
    return g == 1


def canonical(n, P, N):
    best = None
    for u in range(1, n):
        if math.gcd(u, n) != 1:
            continue
        P2 = [(u * x) % n for x in P]
        N2 = [(u * x) % n for x in N]
        for A, B in ((P2, N2), (N2, P2)):
            for s in set(A + B):
                key = (tuple(sorted((x - s) % n for x in A)), tuple(sorted((x - s) % n for x in B)))
                if best is None or key < best:
                    best = key
    return best


def report(ok, text):
    global failures
    if not ok:
        failures += 1
    print(("PASS  " if ok else "FAIL  ") + text)


for name, n in (("cw120_36_classes.json", 120), ("cw180_36_classes.json", 180)):
    c = load(name)
    cl = c["classes"]
    valid = all(is_cw(n, k["P"], k["N"], 36) for k in cl)
    prop = all(is_proper(n, k["P"], k["N"]) for k in cl)
    distinct = len({canonical(n, k["P"], k["N"]) for k in cl}) == len(cl)
    report(valid and prop and distinct,
           "CW(%d,36): %d classes, weight 36 and zero autocorrelation at all %d shifts: %s; proper: %s; "
           "pairwise inequivalent: %s" % (n, len(cl), n - 1, valid, prop, distinct))
    k = cl[0]
    moved = [(k["P"][0] + 1) % n] + list(k["P"][1:])
    report(not is_cw(n, moved, k["N"], 36), "control: moving one support element of the first class destroys it")

c = load("lj_weight4.json")
ns = c["n_values"]
bad = 0
for n in ns:
    m = n // 2
    o = c["objects"][str(n)]
    same = sorted(o["P"]) == [1, m, m + 1] and sorted(o["N"]) == [0]  # a = -1 + x + x^m + x^(m+1), n = 2m
    if not (same and is_cw(n, o["P"], o["N"], 4) and is_proper(n, o["P"], o["N"])):
        bad += 1
report(bad == 0 and len(ns) == 199,
       "weight 4: %d values of n (%d to %d), each -1 + x + x^m + x^(m+1) with n = 2m, valid and proper; failures: %d"
       % (len(ns), min(ns), max(ns), bad))

c = load("lj_weight16.json")
ns = c["n_values"]
bad = 0
for n in ns:
    m = n // 14
    Cx = {0: -1, 1: 1, 2: 1, 4: 1}  # C = -1 + X + X^2 + X^4
    coef = {}
    for e, v in Cx.items():  # A = (1 - X^(7m)) C(X^(2m)) + (1 + X^(7m)) X C(X^m)
        for pos, val in (((2 * m * e) % n, v), ((2 * m * e + 7 * m) % n, -v),
                         ((1 + m * e) % n, v), ((1 + m * e + 7 * m) % n, v)):
            coef[pos] = coef.get(pos, 0) + val
    o = c["objects"][str(n)]
    same = sorted(o["P"]) == sorted(p for p, v in coef.items() if v == 1) and \
        sorted(o["N"]) == sorted(p for p, v in coef.items() if v == -1)
    if not (same and is_cw(n, o["P"], o["N"], 16) and is_proper(n, o["P"], o["N"])):
        bad += 1
report(bad == 0 and len(ns) == 10,
       "weight 16: n = %s, each equal to (1 - X^(7m)) C(X^(2m)) + (1 + X^(7m)) X C(X^m), n = 14m, valid and proper; "
       "failures: %d" % (", ".join(map(str, ns)), bad))

print("ALL CHECKS PASSED" if failures == 0 else "FAILURES: %d" % failures)
sys.exit(1 if failures else 0)
