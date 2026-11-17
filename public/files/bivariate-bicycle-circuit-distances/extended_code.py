#!/usr/bin/env python3
"""Extended code of a non-interleaved single-ancilla syndrome schedule of the bivariate bicycle code [[288, 12, 18]].

usage: python3 extended_code.py DESIGN [OUTPREFIX]

Code: ell = m = 12, A = x^3 + y^2 + y^7 (terms A1, A2, A3), B = y^3 + x + x^2 (terms B1, B2, B3), as in Bravyi et al.,
arXiv:2308.07915. Data qubit (a, b) of the left block has index 12 a + b, of the right block 144 + 12 a + b.
X check (a, b) acts on left (a, b) + A_k and right (a, b) + B_k; Z check (a, b) on left (a, b) - B_k and right (a, b) - A_k.

DESIGN gives for every check its CNOT order, first to last (lines "TYPE index a b ORDER"). A fault on the ancilla after the
k-th CNOT of an X check leaves an X error on the data qubits of the later CNOTs of that check (a residual error); Z checks
leave Z errors. As in Definition 2 of Strikis, Browne and Beverland, arXiv:2603.05481, the extended code for an error type has
one column per data qubit and one per residual error. A column is the syndrome (detector rows) and the logical action
(observable bits) of the error; columns with equal syndrome and action are merged and columns with neither are dropped.
Residuals on 1 or 5 qubits equal a data-qubit column modulo the check, so only those on 2, 3 and 4 qubits are added.
For a non-interleaved circuit the extended-code distance is the circuit distance (Theorem 1 there).

Prints the size of the extended code for both error types. With OUTPREFIX, writes OUTPREFIX_X.txt and OUTPREFIX_Z.txt with one
column per line: index, kind, data qubits, detector rows, observable bits (hex), separated by tabs.
"""
import sys

ELL = M = 12
N2 = ELL * M
TERMS = {"A1": (3, 0), "A2": (0, 2), "A3": (0, 7), "B1": (0, 3), "B2": (1, 0), "B3": (2, 0)}


def qubit(block, a, b):
    return block * N2 + (a % ELL) * M + (b % M)


def support(kind, i, term):
    a, b = divmod(i, M)
    di, dj = TERMS[term]
    if kind == "X":
        return qubit(0 if term[0] == "A" else 1, a + di, b + dj)
    return qubit(0 if term[0] == "B" else 1, a - di, b - dj)


def mask(qs):
    v = 0
    for q in qs:
        v |= 1 << q
    return v


def parity(x):
    return bin(x).count("1") & 1


def kernel(rows, n):
    """Basis of {v : parity(row & v) = 0 for every row}, rows and v as n-bit integers."""
    piv = {}
    for r in rows:
        for c, p in piv.items():
            if r >> c & 1:
                r ^= p
        if r:
            c = r.bit_length() - 1
            for k in piv:
                if piv[k] >> c & 1:
                    piv[k] ^= r
            piv[c] = r
    out = []
    for f in range(n):
        if f in piv:
            continue
        v = 1 << f
        for c, p in piv.items():
            if p >> f & 1:
                v |= 1 << c
        out.append(v)
    return out


def logicals(h_commute, h_modulo):
    """Basis of ker(h_commute) modulo the row space of h_modulo."""
    basis = {}

    def add(r):
        while r:
            h = r.bit_length() - 1
            if h not in basis:
                basis[h] = r
                return True
            r ^= basis[h]
        return False

    for r in h_modulo:
        add(r)
    return [v for v in kernel(h_commute, 2 * N2) if add(v)]


def read_design(path):
    orders = {"X": {}, "Z": {}}
    for line in open(path):
        f = line.split("#")[0].split()
        if f:
            orders[f[0]][int(f[1])] = [f[4][k:k + 2] for k in range(0, 12, 2)]
    for kind in "XZ":
        assert sorted(orders[kind]) == list(range(N2)), "every check needs one order"
        for o in orders[kind].values():
            assert sorted(o) == ["A1", "A2", "A3", "B1", "B2", "B3"], "an order must list each term once"
    return orders


def main():
    design = read_design(sys.argv[1])
    hx = [mask(support("X", i, t) for t in TERMS) for i in range(N2)]
    hz = [mask(support("Z", i, t) for t in TERMS) for i in range(N2)]
    assert all(parity(x & z) == 0 for x in hx for z in hz), "X and Z checks must commute"
    # X errors are detected by Z checks and read out by Z logicals; Z errors the other way round.
    spec = {"X": (hz, logicals(hx, hz)), "Z": (hx, logicals(hz, hx))}
    for et in "XZ":
        det, obs = spec[et]
        check_kind = et  # residual X errors come from X checks, Z errors from Z checks
        cols = [("d", (q,)) for q in range(2 * N2)]
        for i in range(N2):
            sup = [support(check_kind, i, t) for t in design[check_kind][i]]
            for k in (2, 3, 4):
                cols.append(("h", tuple(sup[6 - k:])))
        merged = {}
        for kind, qs in cols:
            v = mask(qs)
            syn = tuple(r for r, h in enumerate(det) if parity(h & v))
            act = sum(parity(o & v) << j for j, o in enumerate(obs))
            if (syn or act) and (syn, act) not in merged:
                merged[(syn, act)] = (kind, qs)
        print(f"{et}-type errors: {len(det)} detector rows, {len(obs)} observables, {len(merged)} columns "
              f"({sum(1 for k, _ in merged.values() if k == 'd')} data, {sum(1 for k, _ in merged.values() if k == 'h')} residual)")
        if len(sys.argv) > 2:
            with open(f"{sys.argv[2]}_{et}.txt", "w") as f:
                for j, ((syn, act), (kind, qs)) in enumerate(merged.items()):
                    f.write(f"{j}\t{kind}\t{','.join(map(str, qs))}\t{','.join(map(str, syn))}\t{act:x}\n")


if __name__ == "__main__":
    main()
