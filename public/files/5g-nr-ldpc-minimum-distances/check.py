import json

# Rows 0 to 3 of base graph 1 (TS 38.212, Table 5.3.2-2): (row i, column j, shifts V for lifting sets 0 to 7).
bg = [(i, j, v) for i, j, v in json.load(open('nr_bg.json'))['BG1'] if i < 4]

def columns(q):
    # Position j*q + t of C(E[4], q) as a bitmask over its 4q checks. Shifts are to the right, as in TS 38.212:
    # check i*q + r contains position j*q + (r + V) mod q. The other direction gives an equivalent code.
    a = q
    while a % 2 == 0:
        a //= 2
    s = [1, 3, 5, 7, 9, 11, 13, 15].index(a)          # lifting set of q (Table 5.3.2-1)
    col = [0] * (26 * q)
    for i, j, v in bg:
        for r in range(q):
            col[j * q + (r + v[s]) % q] |= 1 << (i * q + r)
    return col

def in_code(q, word):
    col, syn = columns(q), 0
    for p in word:
        syn ^= col[p]
    return syn == 0

def least_weight_up_to_4(q):
    # Least weight, if at most 4, of a nonzero word of C'(E[4], q) (first 2q positions deleted); else None.
    # A word of C' is a set of kept positions whose columns sum into the span of the 2q deleted columns.
    # Reduce the kept columns modulo that span. Two different sets of at most 2 kept positions with the
    # same reduced sum differ in a word of weight at most 4, and every such word arises this way.
    col, basis = columns(q), {}
    for x in col[:2 * q]:                              # reduced echelon basis of the deleted columns
        for p, y in basis.items():
            if x >> p & 1:
                x ^= y
        if x:
            p = x.bit_length() - 1
            for u in basis:
                if basis[u] >> p & 1:
                    basis[u] ^= x
            basis[p] = x
    def red(x):
        for p, y in basis.items():
            if x >> p & 1:
                x ^= y
        return x
    r = [red(x) for x in col[2 * q:]]
    seen, best = {}, None
    for t in [()] + [(a,) for a in range(len(r))] + [(a, b) for a in range(len(r)) for b in range(a)]:
        s = 0
        for k in t:
            s ^= r[k]
        for u in seen.get(s, ()):
            w = len(set(t) ^ set(u))
            best = w if best is None else min(best, w)
        seen.setdefault(s, []).append(t)
    return best

# Words of C(E[4], q), positions counted from 0 (position j*q + t is entry t of block j).
words = {48: [17, 96, 140, 208, 455, 1172],
         192: [192, 1425, 3984, 4125, 4422, 4547, 4589, 4614, 4739, 4742],
         384: [384, 1781, 3653, 4597, 4644, 4907, 7908, 8391, 8851, 9431, 9897]}
for q, w in words.items():
    print('q =', q, ' weight', len(w), ' codeword:', in_code(q, w), ' positions among the first 2q:',
          sum(p < 2 * q for p in w))
for q in (3, 6, 12, 24, 48):
    print('q =', q, " least weight <= 4 in C'(E[4], q):", least_weight_up_to_4(q))
