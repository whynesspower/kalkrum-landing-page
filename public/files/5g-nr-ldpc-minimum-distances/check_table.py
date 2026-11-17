"""Check every word in subcode_distances.jsonl against the base graphs in nr_bg.json. Standard library only.

The code (base graph g, L rows, lifting size q) is the kernel of the first L rows of base graph g of 3GPP TS 38.212,
lifted by circulants of order q, on its first 22 + L (g = 1) or 10 + L (g = 2) block columns. Base-graph entry
(i, j, V) with lifting set s becomes the identity of order q shifted to the right by V[s] mod q: check i*q + r contains
position j*q + (r + V[s]) mod q. In a punctured code the first 2q positions are deleted; a word is accepted if some
values of the 2q deleted positions complete it to a codeword. A record passes if its positions are distinct, in range,
as many as d, and form a word of the code of the stated length. The script also tests d(q) <= d(2q) <= 2 d(q) for
every two consecutive lifting sizes q, 2q of one lifting set within a series (Theorems 2 and 3 of arXiv:2607.04716). It
prints the least position of the word of weight 13 of base graph 1, 6 rows, q = 384; a word of the code with no position
among the first 2q is a word of the punctured code."""
import json
from collections import defaultdict

bg = json.load(open('nr_bg.json'))
SETS = [[2, 4, 8, 16, 32, 64, 128, 256], [3, 6, 12, 24, 48, 96, 192, 384], [5, 10, 20, 40, 80, 160, 320],
        [7, 14, 28, 56, 112, 224], [9, 18, 36, 72, 144, 288], [11, 22, 44, 88, 176, 352], [13, 26, 52, 104, 208],
        [15, 30, 60, 120, 240]]                                # Table 5.3.2-1
SET_OF = {z: s for s, zs in enumerate(SETS) for z in zs}
by_col = {g: defaultdict(list) for g in (1, 2)}
for g in (1, 2):
    for i, j, v in bg['BG%d' % g]:
        by_col[g][j].append((i, v))

def column(g, L, q, s, p):
    # Position p = j*q + t of the lifted code, as a bitmask over its L*q checks.
    j, t = divmod(p, q)
    m = 0
    for i, v in by_col[g][j]:
        if i < L:
            m ^= 1 << (i * q + (t - v[s]) % q)
    return m

def passes(r):
    g, L, q, d, w = r['base_graph'], r['rows'], r['q'], r['d'], r['witness']
    s, ncols = SET_OF[q], (22 if g == 1 else 10) + L
    off = 2 * q if r['punctured'] else 0
    if r['length'] != ncols * q - off or len(set(w)) != len(w) or len(w) != d:
        return False
    if not all(0 <= p < r['length'] for p in w):
        return False
    syn = 0
    for p in w:
        syn ^= column(g, L, q, s, p + off)
    basis = {}                                          # echelon basis of the deleted columns
    for p in range(off):
        v = column(g, L, q, s, p)
        while v:
            h = v.bit_length() - 1
            if h not in basis:
                basis[h] = v
                break
            v ^= basis[h]
    while syn:
        h = syn.bit_length() - 1
        if h not in basis:
            return False
        syn ^= basis[h]
    return True

stats = defaultdict(lambda: [0, 0, 0, 0])               # records, passing, largest length, largest d
dist, words = {}, {}
for line in open('subcode_distances.jsonl'):
    r = json.loads(line)
    dist[(r['base_graph'], r['punctured'], r['rows'], r['q'])] = r['d']
    words[(r['base_graph'], r['punctured'], r['rows'], r['q'])] = r['witness']
    a = stats[(r['base_graph'], r['punctured'])]
    a[0] += 1
    a[1] += passes(r)
    a[2], a[3] = max(a[2], r['length']), max(a[3], r['d'])
for (g, pu), (n, ok, ln, dm) in sorted(stats.items()):
    print('base graph %d%s: %d records, %d pass, largest length %d, largest d %d'
          % (g, ', first 2q deleted' if pu else '', n, ok, ln, dm))
print('%d of %d records pass' % (sum(a[1] for a in stats.values()), sum(a[0] for a in stats.values())))
steps = [(k, dist[k], dist[k[:3] + (2 * k[3],)]) for k in dist if k[:3] + (2 * k[3],) in dist and SET_OF[k[3]] == SET_OF[2 * k[3]]]
print('%d of %d pairs q, 2q satisfy d(q) <= d(2q) <= 2 d(q)' % (sum(a <= b <= 2 * a for k, a, b in steps), len(steps)))
w = words[(1, False, 6, 384)]
print('base graph 1, 6 rows, q = 384: word of weight %d, least position %d (the first 2q = 768 are deleted in the punctured code)'
      % (len(w), min(w)))
