"""Usage: python3 lajolla_smallest.py ds13.zip   (the v1.3 release archive of github.com/dmgordo/difference-sets,
Zenodo doi:10.5281/zenodo.19740740). Standard library only.
Check, against La Jolla DS v1.3 (ds.json), which cyclic (v,k,lambda) with v <= 465 are open.
Coverage: every parameter set with 2 < k <= v/2, k(k-1) = lambda(v-1), n = k - lambda > 0 is either listed for the cyclic
group or excluded by Bruck-Ryser-Chowla (checked here with exact Hilbert symbols)."""
import json, re, zipfile, collections, sys
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
from math import isqrt
Z = sys.argv[1]
z = zipfile.ZipFile(Z); name = [n for n in z.namelist() if n.endswith('ds.json')][0]
txt = z.read(name).decode()
try: ds = json.loads(txt)
except json.JSONDecodeError: ds = json.loads(re.sub(r",\s*}\s*$", "\n}", txt))
cyc = {}
for key, v in ds.items():
    m = re.match(r"DS\((\d+),(\d+),(\d+),\[(.*)\]\)", key)
    vv, kk, ll = map(int, m.groups()[:3]); G = [int(x) for x in m.group(4).split(',')]
    if len(G) == 1: cyc[(vv, kk, ll)] = v
def sqfree(a):
    s = 1 if a > 0 else -1
    for p, e in factorint(abs(a)).items():
        if e % 2: s *= p
    return s
def hilbert(a, b, p):
    # (a,b)_p for nonzero integers a, b
    def split(x):
        e = 0
        while x % p == 0: x //= p; e += 1
        return e, x
    al, u = split(a); be, w = split(b)
    if p == 2:
        eps = lambda x: ((x - 1) // 2) % 2
        om = lambda x: ((x * x - 1) // 8) % 2
        u8, w8 = u % 8, w % 8
        s = (eps(u8) * eps(w8) + al * om(w8) + be * om(u8)) % 2
        return -1 if s else 1
    leg = lambda x: pow(x % p, (p - 1) // 2, p)
    ls = lambda x: 1 if leg(x) == 1 else -1
    r = (-1) ** ((al * be * ((p - 1) // 2)) % 2)
    if be % 2: r *= ls(u)
    if al % 2: r *= ls(w)
    return r
def brc_ok(v, k, l):
    n = k - l
    if v % 2 == 0: return isqrt(n) ** 2 == n
    a = n; b = (-1) ** ((v - 1) // 2) * l
    # x^2 = a y^2 + b z^2 solvable nontrivially iff (a,b)_p = 1 for all p (incl. infinity)
    if a < 0 and b < 0: return False
    ps = set(factorint(2 * abs(a) * abs(b)).keys()) | {2}
    return all(hilbert(a, b, p) == 1 for p in ps)
VMAX = 465
adm, missing_brc, missing_ok = [], [], []
for v in range(4, VMAX + 1):
    for k in range(3, v // 2 + 1):
        if (k * (k - 1)) % (v - 1): continue
        l = k * (k - 1) // (v - 1); n = k - l
        if n <= 1: continue
        t = (v, k, l)
        if t in cyc: adm.append(t)
        elif brc_ok(v, k, l): missing_ok.append(t)
        else: missing_brc.append(t)
st = collections.Counter(cyc[t]['status'] for t in adm)
print('ds.json member', name, 'entries', len(ds), 'cyclic', len(cyc))
print(f'parameter sets v<={VMAX}, 2<k<=v/2, n>1: listed (cyclic) {len(adm)}, absent and BRC-excluded {len(missing_brc)}, absent and BRC-admissible {len(missing_ok)} {missing_ok[:10]}')
print('statuses of listed:', dict(st))
print('open with v<=465:', [t for t in adm if cyc[t]['status'] == 'Open'])
print('listed but BRC-excluded (sanity):', sum(1 for t in adm if not brc_ok(*t)))
for t in [(419, 133, 42)]: print(t, cyc.get(t))
# Ryser/Lander cases (gcd(v,n) > 1) open, ordered by v then by k
from math import gcd
op = [t for t in cyc if cyc[t]['status'] == 'Open']
ry = sorted([t for t in op if gcd(t[0], t[1] - t[2]) > 1])
print('open cyclic total', len(op), '; with gcd(v,n)>1:', len(ry), '; first 5 by v:', ry[:5])
print('first 5 open by v (any gcd):', sorted(op)[:5])
print('first 6 open by k:', sorted(op, key=lambda t: (t[1], t[0]))[:6])
print('first 6 open by n:', sorted(op, key=lambda t: (t[1]-t[2], t[0]))[:6])
