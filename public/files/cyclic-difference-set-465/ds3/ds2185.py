# Check of "no (2185,105,5) difference set" at level 23.
# (i) 5 is inert in Q(zeta_23) (ord_23(5) = 22), so x xbar = 100 forces x = 5y with y ybar = 4.
# (ii) Elementary completeness of L_23(4): T2(y) = 23*sum c^2 - (sum c)^2 = 22*4 = 88 for every representative c in Z^23;
#      choosing s = sum c in [-11, 11] forces s = +-2 and sum c^2 = 4: so c = +-2 e_j or four entries +-1 (enumerated).
# (iii) Fourier inversion with chi(b) = +-10 zeta^j and sum b = 105 gives a non-integral or negative contraction b = D_23.
import itertools
N = 23
print("ord_23(5) =", next(e for e in range(1, N) if pow(5, e, N) == 1), " ord_23(2) =", next(e for e in range(1, N) if pow(2, e, N) == 1))
print("s in [-11,11] with s^2 = 23*q - 88 for integer q >= 0:", [(s, (88 + s * s) // 23) for s in range(-11, 12) if (88 + s * s) % 23 == 0])
def paf(c, s): return sum(c[i] * c[(i + s) % N] for i in range(N))
def norm4(c): A0 = paf(c, 0); return all(A0 - paf(c, s) == 4 for s in range(1, N))
sols = []
for j in range(N):
    for sg in (2, -2):
        c = [0] * N; c[j] = sg
        if norm4(c): sols.append(tuple(c))
n46 = len(sols)
cnt = 0
for supp in itertools.combinations(range(N), 4):
    for signs in itertools.product((1, -1), repeat=4):
        if abs(sum(signs)) != 2: continue      # need s = +-2
        c = [0] * N
        for p, sg in zip(supp, signs): c[p] = sg
        cnt += 1
        if norm4(c): sols.append(tuple(c))
print("candidates of type +-2e_j:", 2 * N, "pass:", n46, "| weight-4 +-1 candidates with sum +-2:", cnt, "pass:", len(sols) - n46)
# also the full 16-sign set for reference (CW(23,4) search): any sign pattern with all PAF zero
cw = 0
for supp in itertools.combinations(range(N), 4):
    for signs in itertools.product((1, -1), repeat=4):
        c = [0] * N
        for p, sg in zip(supp, signs): c[p] = sg
        if all(paf(c, s) == 0 for s in range(1, N)): cw += 1
print("CW(23,4) first rows found by exhaustive search:", cw)
# (iii) b = a*G + e*10*g, 23 a + 10 e = 105, e = +-1
for e in (1, -1):
    a = (105 - 10 * e) / 23
    print("e = %+d: a = %s -> %s" % (e, a, "non-integral" if a != int(a) else ("entry a+10e = %d < 0" % (int(a) + 10 * e) if int(a) + 10 * e < 0 else "ok")))
