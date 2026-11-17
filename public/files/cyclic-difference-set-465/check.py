#!/usr/bin/env python3
"""Checker for: there is no cyclic (465,145,45) difference set.

Pure Python 3 (standard library only), exact integer/rational arithmetic throughout.  Mathematics:
https://kalkram.com/research/cyclic-difference-set-465

  python3 check.py        steps 0-7 (about 4 seconds); exit status 0 only if every check passes

Conventions.  Z[zeta] = Z[zeta_31].  An element is stored as an integer vector c of length 31, x = sum_j c_j zeta^j; c and
c + k(1,...,1) give the same x (1 + zeta + ... + zeta^30 = 0).  "Normalised": the unique representative with sum c = +-10
(possible for every x with x conj(x) = 100, since then (sum c)^2 = 100 mod 31).  x conj(x) = 100 in Z[zeta] iff
A_0(c) - A_s(c) = 100 for s = 1..30, A_s(c) = sum_j c_j c_{j+s} (indices mod 31).  zeta^k x  <->  cyclic shift of c by k;
-x <-> -c;  sigma_t (zeta -> zeta^t)  <->  c'_{t j} = c_j.
"""
import sys, os, hashlib, itertools, math, time, random
from fractions import Fraction

P = 31
HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, 'data')
FAIL = []


def say(*a):
    print(*a, flush=True)


def require(cond, msg):
    if not cond:
        FAIL.append(msg)
        say('  FAILED:', msg)
    return cond


# ----------------------------------------------------------------------------------------------------------------- basics
def autocorr(c):
    n = len(c)
    return [sum(c[j] * c[(j + s) % n] for j in range(n)) for s in range(n)]


def is_perfect100(c):
    """x conj(x) = 100 in Z[zeta_n] for x = sum c_j zeta^j, n = len(c) prime."""
    A = autocorr(c)
    return all(A[0] - A[s] == 100 for s in range(1, len(c)))


def normalise(c):
    S = sum(c)
    t = 10 if (S - 10) % P == 0 else -10
    assert (S - t) % P == 0
    k = (t - S) // P
    return tuple(y + k for y in c)


def shift(c, k):
    return tuple(c[(j - k) % P] for j in range(P))


def gal(c, t):
    d = [0] * P
    for j in range(P):
        d[(t * j) % P] = c[j]
    return tuple(d)


def mu_orbit(c):
    """the 62 normalised vectors of {+-zeta^k x}."""
    c = normalise(c)
    out = set()
    for k in range(P):
        s = shift(c, k)
        out.add(s)
        out.add(tuple(-y for y in s))
    return out


def canon(c):
    return min(mu_orbit(c))


def read_vectors(path):
    with open(path) as f:
        return [tuple(map(int, line.split())) for line in f if line.strip()]


def sha256(path):
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for blk in iter(lambda: f.read(1 << 20), b''):
            h.update(blk)
    return h.hexdigest()


def mult_order(a, m):
    k, x = 1, a % m
    while x != 1:
        x = (x * a) % m
        k += 1
    return k


def factorint(n):
    f, p = {}, 2
    while p * p <= n:
        while n % p == 0:
            f[p] = f.get(p, 0) + 1
            n //= p
        p += 1
    if n > 1:
        f[n] = f.get(n, 0) + 1
    return f


def isprime(n):
    return n > 1 and factorint(n) == {n: 1}


# ------------------------------------------------------------------------------------------- polynomials over F_p (low first)
def ptrim(a, p):
    a = [x % p for x in a]
    while a and a[-1] == 0:
        a.pop()
    return a


def prem(a, g, p):
    """remainder of a modulo monic g over F_p."""
    a = ptrim(a, p)
    d = len(g) - 1
    while len(a) > d:
        lc = a[-1]
        s = len(a) - 1 - d
        for i, gi in enumerate(g):
            a[s + i] = (a[s + i] - lc * gi) % p
        a = ptrim(a, p)
    return a


def pmul(a, b, p=None):
    if not a or not b:
        return []
    r = [0] * (len(a) + len(b) - 1)
    for i, x in enumerate(a):
        if x:
            for j, y in enumerate(b):
                r[i + j] += x * y
    return ptrim(r, p) if p else r


def monic_polys(p, d):
    for co in itertools.product(range(p), repeat=d):
        yield list(co) + [1]


def irreducible(g, p):
    d = len(g) - 1
    for e in range(1, d // 2 + 1):
        for h in monic_polys(p, e):
            if not prem(g, h, p):
                return False
    return True


PHI = [1] * P  # Phi_31


def phi_factors(p):
    d = mult_order(p, P)
    fs = [g for g in monic_polys(p, d) if not prem(PHI, g, p) and irreducible(g, p)]
    prod = [1]
    for g in fs:
        prod = pmul(prod, g, p)
    require(prod == ptrim(PHI, p) and len(fs) * d == P - 1, 'factorisation of Phi_31 mod %d' % p)
    return fs


def recip_monic(g, p):
    r = g[::-1]
    inv = pow(r[-1], -1, p)
    return [(x * inv) % p for x in r]


def conj_pairs(p):
    fs = phi_factors(p)
    pairs, used = [], set()
    for i, g in enumerate(fs):
        if i in used:
            continue
        gb = recip_monic(g, p)
        j = fs.index(gb)
        require(j != i, 'prime above %d not self-conjugate' % p)
        used |= {i, j}
        pairs.append((g, gb))
    return pairs


# ----------------------------------------------------------------------------------------------------------- linear algebra
def hnf_rows(vecs):
    """row Hermite normal form (upper triangular, positive pivots, reduced above) of the Z-span of vecs (full rank assumed)."""
    rows = [list(v) for v in vecs if any(v)]
    n = len(rows[0])
    out = []
    col = 0
    while rows and col < n:
        rows = [r for r in rows if any(r)]
        nz = [r for r in rows if r[col] != 0]
        if not nz:
            col += 1
            continue
        while len([r for r in rows if r[col] != 0]) > 1:
            nz = sorted([r for r in rows if r[col] != 0], key=lambda r: abs(r[col]))
            piv = nz[0]
            for r in nz[1:]:
                q = r[col] // piv[col]
                for k in range(n):
                    r[k] -= q * piv[k]
            rows = [r for r in rows if any(r)]
        piv = [r for r in rows if r[col] != 0][0]
        rows.remove(piv)
        if piv[col] < 0:
            piv = [-x for x in piv]
        out.append(piv)
        col += 1
    for i, r in enumerate(out):  # reduce entries above pivots
        c = next(k for k in range(n) if r[k])
        for j in range(i):
            q = out[j][c] // r[c]
            if q:
                out[j] = [a - q * b for a, b in zip(out[j], r)]
    return out


def in_lattice(v, H):
    v = list(v)
    n = len(v)
    for r in H:
        c = next(k for k in range(n) if r[k])
        if v[c] % r[c]:
            return False
        q = v[c] // r[c]
        if q:
            v = [a - q * b for a, b in zip(v, r)]
    return not any(v)


def det_frac(M):
    M = [[Fraction(x) for x in r] for r in M]
    n = len(M)
    d = Fraction(1)
    for i in range(n):
        piv = next((k for k in range(i, n) if M[k][i] != 0), None)
        if piv is None:
            return Fraction(0)
        if piv != i:
            M[i], M[piv] = M[piv], M[i]
            d = -d
        d *= M[i][i]
        for k in range(i + 1, n):
            f = M[k][i] / M[i][i]
            if f:
                M[k] = [a - f * b for a, b in zip(M[k], M[i])]
    return d


def det_int(M):
    """Bareiss fraction-free determinant."""
    M = [list(r) for r in M]
    n, sign, prev = len(M), 1, 1
    for k in range(n - 1):
        if M[k][k] == 0:
            sw = next((i for i in range(k + 1, n) if M[i][k]), None)
            if sw is None:
                return 0
            M[k], M[sw] = M[sw], M[k]
            sign = -sign
        for i in range(k + 1, n):
            for j in range(k + 1, n):
                M[i][j] = (M[i][j] * M[k][k] - M[i][k] * M[k][j]) // prev
        prev = M[k][k]
    return sign * M[n - 1][n - 1]


def solve_left(v, B):
    """n with n B = v (B square, rational solve)."""
    n = len(B)
    # solve B^T n^T = v^T
    A = [[Fraction(B[j][i]) for j in range(n)] + [Fraction(v[i])] for i in range(n)]
    for i in range(n):
        piv = next(k for k in range(i, n) if A[k][i] != 0)
        A[i], A[piv] = A[piv], A[i]
        for k in range(n):
            if k != i and A[k][i] != 0:
                f = A[k][i] / A[i][i]
                A[k] = [a - f * b for a, b in zip(A[k], A[i])]
    return [A[i][n] / A[i][i] for i in range(n)]


def rank_mod(M, p):
    M = [[x % p for x in r] for r in M]
    rk = 0
    cols = len(M[0]) if M else 0
    for col in range(cols):
        piv = next((i for i in range(rk, len(M)) if M[i][col]), None)
        if piv is None:
            continue
        M[rk], M[piv] = M[piv], M[rk]
        inv = pow(M[rk][col], -1, p)
        M[rk] = [(x * inv) % p for x in M[rk]]
        for i in range(len(M)):
            if i != rk and M[i][col]:
                f = M[i][col]
                M[i] = [(a - f * b) % p for a, b in zip(M[i], M[rk])]
        rk += 1
    return rk


# ======================================================================================================================
def step0_hashes():
    say('[0] files against SHA256SUMS')
    path = os.path.join(HERE, 'SHA256SUMS')
    ok = 0
    with open(path) as f:
        for line in f:
            h, name = line.split(None, 1)
            name = name.strip().lstrip('*')
            fp = os.path.join(HERE, name)
            ok += require(os.path.exists(fp) and sha256(fp) == h, 'sha256 of ' + name)
    say('  %d files match' % ok)


def step1_arith():
    say('[1] arithmetic facts (Leung-Schmidt hypotheses, splitting of 2 and 5)')
    o52, o312, o315, o932 = mult_order(2, 5), mult_order(2, 31), mult_order(5, 31), mult_order(2, 93)

    def F(m, n):  # Leung-Schmidt, Definition 2.6
        fm = factorint(m)
        qs = list(factorint(n))
        res = 1
        for pi, ci in fm.items():
            for bi in range(1, ci + 1):
                ok = True
                for q in qs:
                    if q == pi and (pi, bi) != (2, 1):
                        continue
                    if bi == ci:
                        continue
                    if m % 2 == 1 or q == 2:
                        mq = 1
                        for pj, cj in fm.items():
                            if pj != q:
                                mq *= pj ** cj
                    else:
                        mq = 4
                        for pj, cj in fm.items():
                            if pj not in (2, q):
                                mq *= pj ** cj
                    if q != pi and pow(q, mult_order(q, mq) if mq > 1 else 1, pi ** (bi + 1)) != 1:
                        continue
                    ok = False
                if ok:
                    res *= pi ** bi
                    break
        return res
    F155, F465 = F(155, 100), F(465, 100)
    say('  ord_5(2) = %d, ord_31(2) = %d, ord_31(5) = %d, ord_93(2) = %d, F(155,100) = %d, F(465,100) = %d'
        % (o52, o312, o315, o932, F155, F465))
    require(o52 == 4 and F155 % 25 != 0 and math.gcd(o312, 4) == 1, 'Leung-Schmidt Thm B hypotheses for D_155')
    require(math.gcd(o932, 4) == 2, 'Leung-Schmidt Thm 4.1 hypothesis (iii) fails on Z_465 (gcd(ord_93(2),4) = 2)')
    require(math.isqrt(20) ** 2 != 20, '20 is not a square')
    require(-1 % 31 not in {pow(2, i, 31) for i in range(o312)} and -1 % 31 not in {pow(5, i, 31) for i in range(o315)},
            'complex conjugation moves every prime above 2 and 5')
    say('  2: %d primes of degree %d in 3 conjugate pairs; 5: %d primes of degree %d in 5 conjugate pairs; 3^8 = %d ideals '
        'I with I conj(I) = (100)' % (30 // o312, o312, 30 // o315, o315, 3 ** 8))


def step2_L5():
    say('[2] L_5(100) by exhaustive search (second derivation of {+-10 zeta_5^i})')
    # normalise sum c in [-2,2]; 5 A_0 - 400 = (sum c)^2 forces sum c = 0, A_0 = 80, so |c_j| <= 8
    sols = []
    for c4 in itertools.product(range(-8, 9), repeat=4):
        c = list(c4) + [-sum(c4)]
        if abs(c[4]) <= 8 and sum(y * y for y in c) == 80 and is_perfect100(c):
            sols.append(tuple(c))
    expect = {tuple((s * 10 if j == i else 0) - 2 * s for j in range(5)) for i in range(5) for s in (1, -1)}
    require(set(sols) == expect, 'L_5(100) = {+-10 zeta_5^i}')
    say('  %d solutions, equal to {+-10 zeta_5^i}' % len(sols))


def step3_L31():
    say('[3] L_31(100) from the 729 orbit representatives')
    reps = read_vectors(os.path.join(DATA, 'L31_orbit_reps.txt'))
    require(len(reps) == 729 and len(set(reps)) == 729, '729 distinct representatives')
    require(all(len(c) == P and is_perfect100(c) and abs(sum(c)) == 10 for c in reps), 'every rep: x conj(x) = 100 exactly')
    require(all(canon(c) == c for c in reps), 'reps are canonical')
    full = set()
    for c in reps:
        o = mu_orbit(c)
        require(len(o) == 62, 'orbit size 62')
        require(not (o & full), 'orbits disjoint')
        full |= o
    require(len(full) == 45198, '45198 elements')
    repset = set(reps)
    require(all(canon(gal(c, 3)) in repset for c in reps), 'closed under Gal(Q(zeta_31)/Q) (sigma_3 generates)')
    # Galois orbits of the 729 ideals
    seen, sizes = set(), []
    for c in reps:
        if c in seen:
            continue
        orb = {canon(gal(c, t)) for t in range(1, P)}
        seen |= orb
        sizes.append(len(orb))
    sizes.sort()
    say('  45198 distinct elements, 729 mu_62-orbits, closed under mu_62 and Galois; %d Galois orbits, sizes %s'
        % (len(sizes), sorted({s: sizes.count(s) for s in sizes}.items())))
    return reps, full


def cvector(c, pairs):
    """c-vector of the ideal (x): per conjugate pair (P, Pbar) the number v_P(x) - 1 in {-1, 0, 1}."""
    out = []
    for p, prs in pairs:
        for g, gb in prs:
            inP, inPb = not prem(list(c), g, p), not prem(list(c), gb, p)
            require(inP or inPb, 'v_P + v_Pbar = 2')
            vP = 1 if (inP and inPb) else (2 if inP else 0)
            out.append(vP - 1)
    return tuple(out)


def step4_kummer(reps):
    say('[4] completeness of L_31(100), proof 1: Kummer certificate (needs only 3 does not divide h+(Q(zeta_31)))')
    pairs = [(2, conj_pairs(2)), (5, conj_pairs(5))]
    say('  Phi_31 = 6 quintics mod 2 (3 conjugate pairs), 10 cubics mod 5 (5 conjugate pairs)')
    cv = [cvector(c, pairs) for c in reps]
    require(len(set(cv)) == 729, '729 distinct ideals')
    H = hnf_rows(cv)
    require(len(H) == 8, "H' has rank 8")
    index = 1
    for i, r in enumerate(H):
        index *= r[i]
    require(index == 9, "[Z^8 : H'] = 9")
    e = None
    for cand in itertools.product((-1, 0, 1), repeat=8):
        if not in_lattice([3 * x for x in cand], H) and in_lattice([9 * x for x in cand], H):
            e = cand
            break
    require(e is not None, "Z^8/H' cyclic of order 9")
    box = sum(1 for c in itertools.product((-1, 0, 1), repeat=8) if in_lattice(c, H))
    say("  729 distinct c-vectors; [Z^8 : H'] = 9; Z^8/H' = <e>, e = %s; #({-1,0,1}^8 cap H') = %d" % (e, box))
    require(box == 729, "#({-1,0,1}^8 cap H') = 729")
    # basis of H' from 8 list elements
    rnd = random.Random(465)
    while True:
        S = rnd.sample(range(729), 8)
        if abs(det_int([cv[s] for s in S])) == 9:
            break
    nvec = solve_left([9 * x for x in e], [cv[s] for s in S])
    require(all(x.denominator == 1 for x in nvec), '9e integral combination')
    nvec = [int(x) for x in nvec]
    require([sum(n * cv[s][i] for n, s in zip(nvec, S)) for i in range(8)] == [9 * x for x in e], '9e = sum n_k c(x_k)')
    xs = [reps[s] for s in S]
    say('  beta = prod (x_k/10)^(n_k) generates J_{9e}; n = %s' % nvec)

    def ev(c, r, q):
        return sum(cj * pow(r, j, q) for j, cj in enumerate(c)) % q

    def sym_rows(elts):
        """for each auxiliary prime Q = (q, zeta - r): cubic residue symbols (in Z/3) of the units xi_a (a = 2..15) and of each
        element, given as a list of (vector, exponent n, k) meaning the factor (x / 10^k)^n."""
        rowsU, rowsE = [], [[] for _ in elts]
        q, nQ = 1, 0      # q runs through 1 + 93k
        while nQ < 60:
            q += 93
            if not isprime(q):
                continue
            g = next(a for a in range(2, q) if all(pow(a, (q - 1) // l, q) != 1 for l in factorint(q - 1)))
            w = pow(g, (q - 1) // 3, q)
            logw = {1: 0, w: 1, w * w % q: 2}

            def chi(y):
                y %= q
                assert y
                return logw[pow(y, (q - 1) // 3, q)]
            r0 = pow(g, (q - 1) // 31, q)
            for k in (1, 2, 3, 5, 7):
                r = pow(r0, k, q)
                rowsU.append([chi(sum(pow(r, i, q) for i in range(a))) for a in range(2, 16)])
                for t, el in enumerate(elts):
                    rowsE[t].append(sum(n * (chi(ev(x, r, q)) - k10 * chi(10)) for x, n, k10 in el) % 3)
                nQ += 1
        return rowsU, rowsE
    xi = lambda a: tuple([1] * a + [0] * (P - a))   # cyclotomic unit (1 - zeta^a)/(1 - zeta)
    beta = [(x, n, 1) for x, n in zip(xs, nvec)]
    ctrl1 = [(xs[0], 3, 1), (xi(2), 1, 0), (xi(7), 2, 0)]            # (x_1/10)^3 xi_2 xi_7^2: a unit times a cube
    ctrl2 = [(xs[1], -6, 1), (xi(3), 2, 0), (xi(11), 1, 0), (xi(15), 1, 0)]   # likewise
    ctrl3 = [(xi(2), 1, 0)]                                              # a unit (rank must not increase)
    U, (rb, r1, r2, r3) = sym_rows([beta, ctrl1, ctrl2, ctrl3])
    rU = rank_mod(U, 3)
    rB = rank_mod([u + [b] for u, b in zip(U, rb)], 3)
    say('  60 auxiliary degree-1 primes above q = 1 mod 93: F_3-rank of cubic symbols of cyclotomic units = %d (unit rank 14); '
        'with beta: %d' % (rU, rB))
    require(rU == 14 and rB == 15, 'beta is not a unit times a cube, so J_{3e} is not principal')
    rc = [rank_mod([u + [b] for u, b in zip(U, rr)], 3) for rr in (r1, r2, r3)]
    nz = [any(rr) for rr in (r1, r2, r3)]
    say('  negative controls (unit times cube, nonzero symbol vectors %s): ranks %s (must stay 14)' % (nz, rc))
    require(rc == [14, 14, 14] and all(nz), 'negative controls not certified')
    say('  => H = H\', exactly 729 of the 6561 ideals with I conj(I) = (100) are principal; each is generated by a list element,')
    say('     and any x with x conj(x) = 100 differs from that generator by a root of unity (Kronecker): the list is complete.')
    return pairs, cv


def step5_S31(full):
    say('[5] S_31 by Fourier inversion from L_31(100), compared with data/S31.txt')
    # b_j = (145 + Tr(x zeta^-j))/31 = (145 + 31 c_j - sum c)/31: integral iff sum c = 21 mod 31, i.e. normalised sum -10
    lifts = [tuple(5 + y for y in c) for c in full if sum(c) == -10]
    S = sorted(b for b in lifts if min(b) >= 0 and max(b) <= 15)
    say('  %d integral lifts, %d in [0,15]^31' % (len(lifts), len(S)))
    require(len(S) == 21328, '|S_31| = 21328')
    filed = read_vectors(os.path.join(DATA, 'S31.txt'))
    require(sorted(filed) == S, 'data/S31.txt equals the recomputed S_31')
    ok = all(sum(b) == 145 and autocorr(b)[0] == 775 and all(a == 675 for a in autocorr(b)[1:]) for b in S)
    require(ok, 'every b: sum 145, A_0 = 775, A_s = 675')
    # AGL(1,31) orbits
    Sset, seen, orbs = set(S), set(), []
    for b in S:
        if b in seen:
            continue
        o = {shift(gal(b, t), k) for t in range(1, P) for k in range(P)}
        require(o <= Sset, 'S_31 closed under AGL(1,31)')
        seen |= o
        orbs.append(len(o))
    say('  every b has sum 145, A_0 = 775, A_s = 675; %d AGL(1,31)-orbits, sizes %s'
        % (len(orbs), sorted({s: orbs.count(s) for s in orbs}.items())))
    return S


def lift_test(b):
    d = [x // 4 for x in b]
    v = [x - 5 * y for x, y in zip(b, d)]
    A = autocorr(v)
    return all(A[0] - A[s] == 100 for s in range(1, P)), sum(d), max(abs(A[0] - A[s] - 100) for s in range(1, P))


def step6_finite(S, full):
    say('[6] finite check: v = b - 5 floor(b/4) must satisfy A_0(v) - A_s(v) = 100 (s = 1..30)')
    surv, sd, worst = 0, {}, {}
    for b in S:
        ok, s, dev = lift_test(b)
        surv += ok
        sd[s] = sd.get(s, 0) + 1
        worst[s] = min(worst.get(s, 10 ** 9), dev)
    say('  survivors: %d of %d' % (surv, len(S)))
    say('  sum floor(b/4): %s  (only 27 and 31 give sum v = +-10)' % sorted(sd.items()))
    say('  min over b of max_s |A_0 - A_s - 100|: overall %d, on sum floor(b/4) = 27: %s'
        % (min(worst.values()), worst.get(27)))
    require(surv == 0, 'no b in S_31 lifts to a contraction D_155')
    # planted positive controls: perfect v with entries in [-3,3], b = v + 5 delta with delta = max(0, -v)
    planted = [c for c in full if max(c) <= 3 and min(c) >= -3]
    good = 0
    for v in planted:
        b = [x + 5 * max(0, -x) for x in v]
        ok, _, _ = lift_test(b)
        good += ok and [x // 4 for x in b] == [max(0, -x) for x in v]
    say('  planted controls: %d perfect v in [-3,3]^31 (sum +-10); the test accepts %d of them' % (len(planted), good))
    require(good == len(planted) and good > 0, 'planted controls accepted')
    rnd = random.Random(31)
    neg = sum(lift_test([rnd.randint(0, 15) for _ in range(P)])[0] for _ in range(2000))
    require(neg == 0, 'random b rejected')
    say('  planted b lying in S_31: %d' % len(set(tuple(x + 5 * max(0, -x) for x in v) for v in planted) & set(S)))
    # the bound 0 <= D_155 <= 3 is what produces the contradiction: drop it and keep only b = 5 delta + v with v perfect in
    # [-3,3]^31 (sum +-10); then d(e,j) = delta_j (e != 0) and d(0,j) = delta_j + v_j must still lie in [0,3]
    V = {}
    for v in planted:
        V.setdefault(tuple(x % 5 for x in v), []).append(v)
    relax = boxok = 0
    for b in S:
        for v in V.get(tuple(x % 5 for x in b), []):
            relax += 1
            delta = [(x - y) // 5 for x, y in zip(b, v)]
            boxok += all(0 <= t <= 3 for t in delta) and all(0 <= t + y <= 3 for t, y in zip(delta, v))
    say('  without the bound 0 <= D_155 <= 3: %d pairs (b in S_31, perfect v in [-3,3]^31) with b = v mod 5; with the bound: %d'
        % (relax, boxok))
    require(boxok == 0, 'relaxation consistent with the direct test')


def main():
    t0 = time.time()
    say('Checker: no cyclic (465,145,45) difference set.  Python %s' % sys.version.split()[0])
    step0_hashes()
    step1_arith()
    step2_L5()
    reps, full = step3_L31()
    step4_kummer(reps)
    S = step5_S31(full)
    step6_finite(S, full)
    say('[7] conclusion: L_31(100) complete; S_31 complete; no b in S_31 lifts; hence no contraction D_155 and no cyclic '
        '(465,145,45) difference set' if not FAIL else '[7] FAILURES: %s' % FAIL)
    say('total %.1f s, %s' % (time.time() - t0, 'ALL CHECKS PASSED' if not FAIL else '%d FAILURES' % len(FAIL)))
    sys.exit(1 if FAIL else 0)


if __name__ == '__main__':
    main()
