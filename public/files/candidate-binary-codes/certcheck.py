# Structural check of a certificate: QC structure, block 0 = 1, multiplier invariance,
# block invertibility; emits 0/1 rows for mdfull and a block file for pigeon.c.
import sys, json
def pmod(a, b):
    db = b.bit_length() - 1
    while a and a.bit_length() - 1 >= db:
        a ^= b << (a.bit_length() - 1 - db)
    return a
def pgcd(a, b):
    while b: a, b = b, pmod(a, b)
    return a
def rot(a, i, m):
    i %= m
    return (((a << i) | (a >> (m - i))) & ((1 << m) - 1)) if i else a
def mult_map(a, u, m):
    v = 0
    for j in range(m):
        if (a >> j) & 1: v ^= 1 << ((j * u) % m)
    return v
d = json.load(open(sys.argv[1])); n, k = d['n'], d['k']
rows = [int(r, 16) for r in d['rows']]
assert len(rows) == k
l = n // k; m = k; assert l * m == n
mask = (1 << m) - 1
blocks = [(rows[0] >> (t * m)) & mask for t in range(l)]
ok_qc = all(((rows[i] >> (t * m)) & mask) == rot(blocks[t], i, m) for i in range(k) for t in range(l))
ok_id = blocks[0] == 1
X = (1 << m) | 1
inv = [pgcd(X, b) == 1 for b in blocks]
u = int(sys.argv[2]) if len(sys.argv) > 2 else None
info = {"file": sys.argv[1].split('/')[-1], "n": n, "k": k, "l": l, "qc_structure": ok_qc, "block0_is_1": ok_id,
        "invertible_blocks": inv, "weights": [bin(b).count('1') for b in blocks]}
if u:
    from math import gcd
    order = next(e for e in range(1, m + 1) if pow(u, e, m) == 1) if gcd(u, m) == 1 else None
    info["u"] = u; info["ord_u"] = order
    info["multiplier_invariant"] = [mult_map(b, u, m) == b for b in blocks]
    info["two_in_H"] = any(pow(u, e, m) == 2 % m for e in range(1, (order or 0) + 1))
print(json.dumps(info))
with open(sys.argv[1].split('/')[-1] + '.rows', 'w') as f:
    f.write(f"{n} {k}\n")
    for r in rows: f.write(''.join('1' if (r >> j) & 1 else '0' for j in range(n)) + "\n")
with open(sys.argv[1].split('/')[-1] + '.blk', 'w') as f:
    f.write(f"{m} {l} {d['claim_d']}\n")
    for b in blocks: f.write(''.join('1' if (b >> j) & 1 else '0' for j in range(m)) + "\n")
