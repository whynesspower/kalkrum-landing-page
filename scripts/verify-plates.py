"""Builds and checks the data behind the site's plates. Pure standard library.

usage: python3 -I assets.py <H2148.csv.gz> <out_dir>
"""
import gzip
import json
import math
import random
import struct
import sys
import zlib
from pathlib import Path

src, out = Path(sys.argv[1]), Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)


# ── A. The Hadamard matrix of order 2148 ────────────────────────────────────
rows = []
with gzip.open(src, "rt") as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        vals = [int(v) for v in line.split(",")]
        assert all(v in (1, -1) for v in vals), "entry not ±1"
        rows.append(vals)
n = len(rows)
assert all(len(r) == n for r in rows), "not square"
bits = [sum(1 << j for j, v in enumerate(r) if v == 1) for r in rows]
# H Hᵀ = n I  ⇔  every pair of distinct rows differs in exactly n/2 places.
bad = 0
for i in range(n):
    bi = bits[i]
    for j in range(i + 1, n):
        if (bi ^ bits[j]).bit_count() * 2 != n:
            bad += 1
print(f"H{n}: {n}x{n}, entries ±1, non-orthogonal row pairs: {bad}")
assert bad == 0
ones = sum(b.bit_count() for b in bits)
print(f"  +1 entries: {ones} of {n*n} ({ones/(n*n):.4f})")


def png_1bit(path, rows_pm):
    """1-bit greyscale PNG: +1 → white, −1 → black."""
    h, w = len(rows_pm), len(rows_pm[0])
    raw = bytearray()
    for r in rows_pm:
        raw.append(0)
        byte, k = 0, 0
        for v in r:
            byte = (byte << 1) | (1 if v == 1 else 0)
            k += 1
            if k == 8:
                raw.append(byte)
                byte, k = 0, 0
        if k:
            raw.append(byte << (8 - k))

    def chunk(tag, data):
        c = struct.pack(">I", len(data)) + tag + data
        return c + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    ihdr = struct.pack(">IIBBBBB", w, h, 1, 0, 0, 0, 0)
    data = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", zlib.compress(bytes(raw), 9)) + chunk(b"IEND", b"")
    path.write_bytes(data)
    return len(data)


size = png_1bit(out / f"h{n}.png", rows)
print(f"  wrote h{n}.png, {size/1024:.0f} KB")


# ── B. IBM's two-gross code, from the published polynomials ─────────────────
# Bravyi et al., arXiv:2308.07915, Table 3: l = m = 12, A = x^3 + y^2 + y^7, B = y^3 + x + x^2.
L = M = 12
A = [(3, 0), (0, 2), (0, 7)]
B = [(0, 3), (1, 0), (2, 0)]
N = L * M


def idx(a, b):
    return (a % L) * M + (b % M)


def rank_gf2(vecs):
    vecs = list(vecs)
    r = 0
    piv = {}
    for v in vecs:
        while v:
            hb = v.bit_length() - 1
            if hb in piv:
                v ^= piv[hb]
            else:
                piv[hb] = v
                r += 1
                break
    return r


hx, hz = [], []
for a in range(L):
    for b in range(M):
        x = 0
        for da, db in A:  # left block
            x ^= 1 << idx(a + da, b + db)
        for da, db in B:  # right block
            x ^= 1 << (N + idx(a + da, b + db))
        hx.append(x)
        z = 0
        for da, db in B:  # left block, transposed
            z ^= 1 << idx(a - da, b - db)
        for da, db in A:  # right block, transposed
            z ^= 1 << (N + idx(a - da, b - db))
        hz.append(z)
commute = all(((x & z).bit_count() % 2) == 0 for x in hx for z in hz)
k = 2 * N - rank_gf2(hx) - rank_gf2(hz)
print(f"two-gross: n = {2*N}, checks = {len(hx)} X + {len(hz)} Z, weight {hx[0].bit_count()}, HX·HZᵀ = 0: {commute}, k = {k}")
assert commute and k == 12 and 2 * N == 288


# ── C. The search space behind 'no cyclic (465, 145, 45) difference set' ───
c = math.comb(465, 145)
s = str(c)
print(f"C(465,145) = {s[0]}.{s[1:4]}… × 10^{len(s)-1}")
# necessary counting condition k(k-1) = λ(v-1)
assert 145 * 144 == 45 * 464


# ── D. One complete mapping of Z_31, normalised so θ(0) = 0 ────────────────
P = 31
rng = random.Random(465_145_45)


def search():
    theta = [None] * P
    used_t = [False] * P
    used_s = [False] * P
    theta[0] = 0
    used_t[0] = used_s[0] = True

    def go(x):
        if x == P:
            return True
        cand = [t for t in range(P) if not used_t[t] and not used_s[(x + t) % P]]
        rng.shuffle(cand)
        for t in cand:
            theta[x] = t
            used_t[t] = used_s[(x + t) % P] = True
            if go(x + 1):
                return True
            used_t[t] = used_s[(x + t) % P] = False
        return False

    assert go(1)
    return theta


theta = search()
assert sorted(theta) == list(range(P))
assert sorted((x + t) % P for x, t in enumerate(theta)) == list(range(P))
assert theta[0] == 0
linear = any(all(theta[x] == (m * x) % P for x in range(P)) for m in range(P))
print(f"complete mapping of Z_{P}: {theta} (linear: {linear})")
assert 31 * 2427915096775283929115 == 75265368000033801802565

(out / "plates.json").write_text(json.dumps({"z31": theta, "comb465": s}, indent=1))
