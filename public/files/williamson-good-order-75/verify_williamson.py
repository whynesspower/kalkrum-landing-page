#!/usr/bin/env python3
"""Check of Williamson matrices of order n given as hexadecimal solution lines (pure Python, standard library only; Python 3.10 or later).

usage: verify_williamson.py N SOLFILE [--published FILE] [--array-all]

SOLFILE holds lines `SOL k0 k1 k2 k3` (other lines are ignored): four hex words, bit i-1 set when x_i = -1 (i = 1..h),
x_0 = +1, the blocks symmetric. For every set the script rebuilds the circulants and checks that the periodic
autocorrelations sum to zero at every nonzero shift, that the row sums satisfy sum R^2 = 4n, and that the stored form
is the canonical form under Z_n^* and reordering. For the first set (all with --array-all) it also builds the
Williamson array and checks H H^T = 4n I. --published FILE: first rows of one or more sets as lines of +/-, four lines
per set; each is checked the same way and looked up among the given classes. Exit status 0 iff every check passes; a
file without sets passes, since only the listed sets can be checked.
"""
import argparse
import re
import sys
from math import gcd

ap = argparse.ArgumentParser()
ap.add_argument("n", type=int)
ap.add_argument("solfile")
ap.add_argument("--published")
ap.add_argument("--array-all", action="store_true")
args = ap.parse_args()
n = args.n
h = (n - 1) // 2
UNITS = [g for g in range(1, n) if gcd(g, n) == 1]


def sequence(bits):
    x = [1] * n
    for i in range(1, h + 1):
        x[i] = x[n - i] = -1 if bits >> (i - 1) & 1 else 1
    return x


def bits_of(x):
    return sum(1 << (i - 1) for i in range(1, h + 1) if x[i] == -1)


def paf(x):
    return [sum(x[t] * x[(t + s) % n] for t in range(n)) for s in range(n)]


def canonical(blocks):
    return min(tuple(sorted(bits_of([x[g * i % n] for i in range(n)]) for x in blocks)) for g in UNITS)


def circulant(x):
    return [[x[(j - i) % n] for j in range(n)] for i in range(n)]


def neg(M):
    return [[-v for v in row] for row in M]


def williamson_array_ok(blocks):
    A, B, C, D = [circulant(x) for x in blocks]
    grid = [[A, B, C, D], [neg(B), A, neg(D), C], [neg(C), D, A, neg(B)], [neg(D), neg(C), B, A]]
    rows = [sum(1 << j for j, v in enumerate(v for bj in range(4) for v in grid[bi][bj][i]) if v == -1)
            for bi in range(4) for i in range(n)]
    N = 4 * n
    return all(N - 2 * (rows[i] ^ rows[j]).bit_count() == (N if i == j else 0) for i in range(N) for j in range(i, N))


def check(blocks):
    """Returns the list of failed checks for four +-1 sequences with x_0 = +1."""
    bad = []
    P = [paf(x) for x in blocks]
    if not all(sum(P[z][s] for z in range(4)) == 0 for s in range(1, n)):
        bad.append("PAF sum")
    if not all(x[i] == x[n - i] for x in blocks for i in range(1, n)):
        bad.append("symmetry")
    if sum(sum(x) ** 2 for x in blocks) != 4 * n:
        bad.append("row sums")
    return bad


sets = []
for line in open(args.solfile):
    if re.fullmatch(r"SOL( [0-9a-f]{16}){4}", line.strip()):
        sets.append([int(t, 16) for t in line.split()[1:5]])
print("n=%d: sets read: %d" % (n, len(sets)))
failed, classes = 0, set()
for idx, ks in enumerate(sets):
    blocks = [sequence(k) for k in ks]
    bad = check(blocks)
    c = canonical(blocks)
    if c != tuple(sorted(ks)):
        bad.append("stored form not canonical")
    if (idx == 0 or args.array_all) and not williamson_array_ok(blocks):
        bad.append("Williamson array")
    if bad:
        failed += 1
        print("set %d fails: %s" % (idx, ", ".join(bad)))
    classes.add(c)
print("sets passing all checks: %d; distinct classes: %d" % (len(sets) - failed, len(classes)))
if len(classes) != len(sets):
    failed += 1
    print("the file lists equivalent sets more than once")
if not sets:
    print("no sets to check")
if args.published:
    lines = [ln.strip() for ln in open(args.published) if ln.strip() and not ln.startswith("#")]
    if len(lines) % 4:
        sys.exit("%s: %d lines, not a multiple of 4" % (args.published, len(lines)))
    for g0 in range(0, len(lines), 4):
        blocks = []
        for ln in lines[g0:g0 + 4]:
            x = [1 if ch == "+" else -1 for ch in ln]
            assert len(x) == n, "published line has length %d, expected %d" % (len(x), n)
            blocks.append([-v for v in x] if x[0] == -1 else x)
        bad = check(blocks)
        if not williamson_array_ok(blocks):
            bad.append("Williamson array")
        print("published set %d: %s; class among ours: %s"
              % (g0 // 4, "valid" if not bad else "fails " + ", ".join(bad), canonical(blocks) in classes))
        failed += bool(bad)
print("RESULT: %s" % ("FAIL" if failed else "PASS"))
sys.exit(1 if failed else 0)
