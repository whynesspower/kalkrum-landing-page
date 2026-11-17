"""Evaluates each configuration of ground_states.json in its model of instances.json.
E(s) = sum_{i<j} Jd[d(i,j)] s_i s_j + a * sum_i s_i, in units of 1e-6 eV, with s_i = 1 for Pd and 0 for Ag; the all-Ag cell has E = 0.
Sites are the elements c of the translation group Z_n1 x ... x Z_nk of the cell, last coordinate fastest; d(i,j) is the flat index of c_j - c_i."""
import json
from itertools import combinations, product

inst = {d["name"]: d for d in json.load(open("instances.json"))}
good = 0
for w in json.load(open("ground_states.json")):
    d = inst[w["name"]]
    g, J = d["group"], d["Jd"]
    sites = list(product(*map(range, g)))

    def flat(c):
        f = 0
        for n, x in zip(g, c):
            f = f * n + x % n
        return f

    occ = [c for c, b in zip(sites, w["config"]) if b == "1"]
    E = d["a"] * len(occ) + sum(J[flat([y - x for x, y in zip(p, q)])] for p, q in combinations(occ, 2))
    symmetric = all(J[flat(c)] == J[flat([-x for x in c])] for c in sites)
    ok = E == w["E"] and len(occ) == w["Pd"] and len(w["config"]) == d["N"] == len(sites) and symmetric
    good += ok
    print(f'{w["name"][8:]:14s} N={d["N"]:2d} Pd={len(occ):2d} E={E:9d}  {"ok" if ok else "FAIL"}')
print(f"{good} of {len(inst)} energies reproduced")
