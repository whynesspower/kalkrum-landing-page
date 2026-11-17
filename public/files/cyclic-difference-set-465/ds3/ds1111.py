# Check of "no cyclic (1111,111,11) difference set": 5 is a multiplier (Second Multiplier Theorem with
# n1 = n = 100 > lambda = 11, gcd(100,1111) = 1, 5 = 5^1 and 5 = 2^f mod 1111); gcd(v,k) = 1 so a translate is fixed by 5;
# enumerate all unions of <5>-orbits of size 111 and test the difference-set property exactly.
import itertools, numpy as np
from math import gcd, comb
v, k, lam = 1111, 111, 11
assert k * (k - 1) == lam * (v - 1)
f = [e for e in range(1, 1000) if pow(2, e, v) == 5]
print("2^f = 5 mod 1111 for f =", f[:3], " gcd(v,n) =", gcd(v, 100), " gcd(v,k) =", gcd(v, k))
seen = set(); orbits = []
for a in range(v):
    if a in seen: continue
    o = []; x = a
    while x not in o: o.append(x); x = 5 * x % v
    seen |= set(o); orbits.append(o)
from collections import Counter
print("orbit size distribution:", sorted(Counter(len(o) for o in orbits).items()))
sizes = [len(o) for o in orbits]
# all subsets of orbits with total size 111
small = [o for o in orbits if len(o) < 25]; big = [o for o in orbits if len(o) == 25]
cands = []
for r in range(len(small) + 1):
    for sub in itertools.combinations(small, r):
        s = sum(len(o) for o in sub)
        rem = k - s
        if rem >= 0 and rem % 25 == 0:
            cands.append((sub, rem // 25))
print("small-orbit choices:", [(sorted(len(o) for o in sub), m) for sub, m in cands])
total = 0; passes = 0; best = None
for sub, m in cands:
    base = np.zeros(v, dtype=np.int64)
    for o in sub: base[o] = 1
    for combo in itertools.combinations(range(len(big)), m):
        ind = base.copy()
        for i in combo: ind[big[i]] = 1
        # exact autocorrelation via integer circular correlation (FFT then exact check of candidates near lambda)
        F = np.fft.rfft(ind)
        ac = np.fft.irfft(F * np.conj(F), n=v)
        dev = np.max(np.abs(ac[1:] - lam))
        total += 1
        if dev < 0.5:
            D = np.nonzero(ind)[0]
            cnt = np.zeros(v, dtype=np.int64)
            for a in D: cnt[(a - D) % v] += 1
            if np.all(cnt[1:] == lam): passes += 1
        if best is None or dev < best: best = dev
print("candidates", total, "(C(44,4) =", comb(44, 4), ")  exact passes:", passes, " min max-deviation:", round(best, 6))
# positive control of the tester: a known cyclic DS, the Singer (31,6,1) and the Paley (11,5,2)
def isds(D, v, lam):
    cnt = np.zeros(v, dtype=np.int64)
    D = np.array(D)
    for a in D: cnt[(a - D) % v] += 1
    return bool(np.all(cnt[1:] == lam))
print("controls: (11,5,2) QR:", isds(sorted({x * x % 11 for x in range(1, 11)}), 11, 2), " (13,4,1) {0,1,3,9}:", isds([0, 1, 3, 9], 13, 1))
