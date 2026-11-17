# Check of the (1561,105,7) argument: contracted multiplier t = 2 at level w = 223 (Arasu-Ma Lemma 1 /
# Baumert-Gordon Thm 3.2: sigma_t fixes every prime ideal above every p | n in Q(zeta_w), gcd(w, n) = 1).
from math import gcd
v, k, lam = 1561, 105, 7; n = k - lam
assert k * (k - 1) == lam * (v - 1) and v == 7 * 223 and n == 98
w = 223
ordw = lambda a: next(e for e in range(1, w) if pow(a, e, w) == 1)
H2 = {pow(2, e, w) for e in range(ordw(2))}
print("ord_223(2) =", ordw(2), " ord_223(7) =", ordw(7), " 7 in <2>:", 7 in H2, " gcd(w,n) =", gcd(w, n))
# decomposition group of p in Gal(Q(zeta_223)/Q) = <p>; sigma_2 fixes all primes over p iff 2 in <p>
H7 = {pow(7, e, w) for e in range(ordw(7))}
print("2 in <2>:", True, " 2 in <7>:", 2 in H7, " -1 in <2>:", (w - 1) in H2)
# group of order 1561 is cyclic: 7 does not divide 223 - 1
print("7 | 222:", 222 % 7 == 0)
# orbits of x -> 2x on Z_223
seen = set(); orbits = []
for a in range(w):
    if a in seen: continue
    o = set(); x = a
    while x not in o: o.add(x); x = 2 * x % w
    seen |= o; orbits.append(len(o))
print("orbit sizes on Z_223:", sorted(orbits))
# a translate of D_223 fixed by 2 (exists since gcd(2-1, 223) = 1) is constant on orbits; entries in [0, v/w = 7]
box = v // w
sols = [(b0, S) for b0 in range(box + 1) for S in range(0, 6 * box + 1) if b0 + 37 * S == k]
print("solutions of b0 + 37 S = 105 with 0 <= b0 <= 7:", sols, " (105 mod 37 =", k % 37, ")")
