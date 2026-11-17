#!/usr/bin/env python3
"""Check a linear-programming refutation of a CNF formula over at-most-one rows. Standard library only.

  farkas_check.py FILE.cnf[.xz] CERT.json

The certificate lists clause rows and at-most-one rows, each with a non-negative rational multiplier.
  clause row   sum of its literals >= 1                 (a literal is x, or 1 - x if negated; clause number from 0)
  at-most-one  sum of the literals of S <= 1            (S given as a list of literals)
An at-most-one row is accepted only if the file contains the binary clause (-a or -b) for every two literals a, b
of S, over distinct variables, so that at most one literal of S is true in any satisfying assignment.
The multiplied rows are added in exact rational arithmetic. Every variable lies in [0, 1], so the sum
(c . x + k >= 0) is impossible when k + (sum of the positive coefficients c_v) < 0; the checker prints the d > 0
for which the sum, with multiples of the bounds added, reads 0 >= d.
"""
import sys, json, lzma, hashlib, re, os
from fractions import Fraction


def read_cnf(path):
    clauses, cur, tokens = [], [], []
    with (lzma.open if path.endswith('.xz') else open)(path, 'rt') as f:
        for line in f:
            if line[:1] in ('c', 'p'):
                continue
            if line[:1] == '%':
                break
            tokens.extend(line.split())
    for t in tokens:
        v = int(t)
        if v == 0:
            clauses.append(tuple(cur)); cur = []
        else:
            cur.append(v)
    if cur:
        raise ValueError('last clause is not terminated by 0')
    text = ' '.join(tokens).encode()
    return clauses, hashlib.md5(text).hexdigest(), hashlib.sha256(text).hexdigest()


def check(clauses, cert):
    binary = set(frozenset(c) for c in clauses if len(set(c)) == 2)
    coef, const, nclause, namo = {}, Fraction(0), 0, 0

    def add(lits, weight, sign):
        """sign +1: sum of literals - 1 >= 0 (clause); sign -1: 1 - sum of literals >= 0 (at-most-one)."""
        nonlocal const
        negs = 0
        for l in lits:
            coef[abs(l)] = coef.get(abs(l), 0) + sign * weight * (1 if l > 0 else -1)
            negs += l < 0
        const += sign * weight * (negs - 1)

    for row in cert['clauses']:
        n, w = row['n'], Fraction(row['w'])
        if not (type(n) is int and 0 <= n < len(clauses) and w > 0):
            return False, 'malformed clause row %r' % (row,)
        add(clauses[n], w, +1); nclause += 1
    for row in cert['at_most_one']:
        lits, w = row['lits'], Fraction(row['w'])
        if not (isinstance(lits, list) and lits and all(type(l) is int and l != 0 for l in lits) and w > 0
                and len(set(abs(l) for l in lits)) == len(lits)):
            return False, 'malformed at-most-one row'
        for i, a in enumerate(lits):
            for b in lits[i + 1:]:
                if frozenset((-a, -b)) not in binary:
                    return False, 'no binary clause for (%d, %d) in an at-most-one row' % (-a, -b)
        add(lits, w, -1); namo += 1
    d = -(const + sum(c for c in coef.values() if c > 0))
    if d <= 0:
        return False, 'the sum does not contradict the bounds (0 >= %s is not a contradiction)' % d
    return True, '%d clause rows and %d at-most-one rows sum to 0 >= %s' % (nclause, namo, d)


if __name__ == '__main__':
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    cnf, certpath = sys.argv[1:3]
    clauses, gbd, sha = read_cnf(cnf)
    name = os.path.basename(cnf)[:32]
    print('GBD hash %s%s' % (gbd, '' if not re.fullmatch('[0-9a-f]{32}', name) else
                             ' (matches file name)' if gbd == name else ' (DIFFERS from file name)'))
    try:
        cert = json.load(open(certpath))
        if cert.get('cnf_sha256') != sha or cert.get('clauses_in_file') != len(clauses):
            print('FAIL: certificate is for a different formula'); sys.exit(1)
        ok, msg = check(clauses, cert)
    except (ValueError, KeyError, TypeError, AttributeError, ZeroDivisionError):
        ok, msg = False, 'malformed certificate'
    print(('UNSATISFIABLE, verified: ' if ok else 'FAIL: ') + msg)
    sys.exit(0 if ok else 1)
