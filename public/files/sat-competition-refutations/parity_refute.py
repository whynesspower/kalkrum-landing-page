#!/usr/bin/env python3
"""Refute a CNF formula by parity reasoning, and check a refutation. Standard library only.

  parity_refute.py find  FILE.cnf[.xz] CERT.json   derive a certificate, then check it
  parity_refute.py check FILE.cnf[.xz] CERT.json   check a certificate against the CNF alone

A parity constraint x1 + ... + xk = b (mod 2) is implied by a CNF if the CNF contains all 2^(k-1) clauses over
x1..xk that forbid the assignments of the wrong parity. A certificate is a list of such constraints, each given by
its variables, its right-hand side and the numbers (from 0) of its clauses in the file. It refutes the formula if
the constraints sum to 0 = 1: every variable occurs in an even number of them and the right-hand sides add up to 1.
The checker re-derives each constraint from the clauses of the file; it trusts nothing in the certificate except
which constraints to add.
"""
import sys, json, lzma, itertools, hashlib, re, os


def opener(path):
    return lzma.open if path.endswith('.xz') else open


def read_cnf(path):
    """DIMACS CNF as a list of clauses (tuples of non-zero integers). Clauses end at 0, whatever the line breaks."""
    clauses, cur, tokens = [], [], []
    with opener(path)(path, 'rt') as f:
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


def parity_constraints(clauses, max_k=6):
    """All parity constraints implied by complete groups of clauses: (variables, right-hand side, clause numbers).
    A clause forbids the one assignment that makes all its literals false; that assignment has as many true
    variables as the clause has negative literals. If a variable set has all 2^(k-1) clauses whose negative-literal
    counts have one parity p, every assignment of parity p is forbidden, so the sum of the variables is 1 + p mod 2."""
    groups = {}
    for i, c in enumerate(clauses):
        vs = tuple(sorted(abs(l) for l in c))
        if len(set(vs)) != len(c) or not 2 <= len(c) <= max_k:
            continue
        negs = sum(1 for l in c if l < 0) % 2
        groups.setdefault((vs, negs), {})[tuple(sorted(c, key=abs))] = i
    return [(vs, (1 + negs) % 2, sorted(m.values())) for (vs, negs), m in groups.items() if len(m) == 2 ** (len(vs) - 1)]


def find(clauses):
    """A set of parity constraints that sums to 0 = 1, or None. First a connected component (constraints linked by
    shared variables) in which every variable occurs an even number of times and the right-hand sides sum to 1;
    otherwise Gaussian elimination over GF(2) inside each component."""
    cons = parity_constraints(clauses)
    parent = {}

    def root(x):
        while parent.get(x, x) != x:
            parent[x] = parent.get(parent[x], parent[x]); x = parent[x]
        return x

    for vs, _, _ in cons:
        r = root(vs[0])
        for v in vs[1:]:
            parent[root(v)] = r
    comps = {}
    for j, (vs, _, _) in enumerate(cons):
        comps.setdefault(root(vs[0]), []).append(j)
    for members in sorted(comps.values(), key=len):
        count, total = {}, 0
        for j in members:
            for v in cons[j][0]:
                count[v] = count.get(v, 0) + 1
            total ^= cons[j][1]
        if total == 1 and all(n % 2 == 0 for n in count.values()):
            return cons, members
    for members in sorted(comps.values(), key=len):
        pivots = {}
        for pos, j in enumerate(members):
            row = 0
            for v in cons[j][0]:
                row |= 1 << v
            rhs, comb = cons[j][1], 1 << pos
            while row:
                p = row.bit_length() - 1
                if p not in pivots:
                    pivots[p] = (row, rhs, comb); break
                r2, b2, c2 = pivots[p]
                row ^= r2; rhs ^= b2; comb ^= c2
            else:
                if rhs == 1:
                    return cons, [members[i] for i in range(len(members)) if comb >> i & 1]
    return cons, None


def check(clauses, cert):
    present = set(tuple(sorted(c, key=abs)) for c in clauses)
    count, total = {}, 0
    for item in cert['constraints']:
        vs, rhs, idx = item['vars'], item['rhs'], item['clauses']
        if not (isinstance(vs, list) and vs and all(type(v) is int and v > 0 for v in vs)
                and all(a < b for a, b in zip(vs, vs[1:])) and rhs in (0, 1) and len(vs) >= 2
                and all(type(i) is int and 0 <= i < len(clauses) for i in idx)):
            return False, 'malformed constraint %r' % (vs,)
        need = set()
        for bits in itertools.product((0, 1), repeat=len(vs)):
            if sum(bits) % 2 != rhs:          # each assignment of the wrong parity must be forbidden by a clause
                need.add(tuple(-v if b else v for v, b in zip(vs, bits)))
        if not need <= present or need != set(tuple(sorted(clauses[i], key=abs)) for i in idx):
            return False, 'constraint on %s is not implied by the listed clauses' % (vs,)
        for v in vs:
            count[v] = count.get(v, 0) + 1
        total ^= rhs
    odd = [v for v, n in count.items() if n % 2]
    if odd:
        return False, 'variables with odd multiplicity: %s' % odd[:5]
    if total != 1:
        return False, 'right-hand sides sum to 0'
    return True, '%d parity constraints over %d variables sum to 0 = 1' % (len(cert['constraints']), len(count))


if __name__ == '__main__':
    if len(sys.argv) != 4 or sys.argv[1] not in ('find', 'check'):
        sys.exit(__doc__)
    mode, cnf, certpath = sys.argv[1:4]
    clauses, gbd, sha = read_cnf(cnf)
    name = os.path.basename(cnf)[:32]
    print('GBD hash %s%s' % (gbd, '' if not re.fullmatch('[0-9a-f]{32}', name) else
                             ' (matches file name)' if gbd == name else ' (DIFFERS from file name)'))
    if mode == 'find':
        cons, chosen = find(clauses)
        if chosen is None:
            print('no parity refutation found (%d parity constraints)' % len(cons)); sys.exit(2)
        cert = {'gbd_hash': gbd, 'cnf_sha256': sha, 'clauses_in_file': len(clauses),
                'constraints': [{'vars': list(cons[i][0]), 'rhs': cons[i][1], 'clauses': cons[i][2]} for i in chosen]}
        json.dump(cert, open(certpath, 'w'), separators=(',', ':'))
        print('certificate: %d of %d parity constraints' % (len(chosen), len(cons)))
    try:
        cert = json.load(open(certpath))
        if cert.get('cnf_sha256') != sha or cert.get('clauses_in_file') != len(clauses):
            print('FAIL: certificate is for a different formula'); sys.exit(1)
        ok, msg = check(clauses, cert)
    except (ValueError, KeyError, TypeError, AttributeError):
        ok, msg = False, 'malformed certificate'
    print(('UNSATISFIABLE, verified: ' if ok else 'FAIL: ') + msg)
    sys.exit(0 if ok else 1)
