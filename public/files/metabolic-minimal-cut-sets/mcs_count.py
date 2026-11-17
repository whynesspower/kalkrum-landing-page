"""Minimal cut sets of the BiGG model e_coli_core as a flux cone, by exhaustive level-wise enumeration.
Usage: python3 mcs_count.py e_coli_core.json K     (needs numpy and scipy)"""
import hashlib, json, sys
import numpy as np
from scipy.optimize import linprog

path, K = sys.argv[1], int(sys.argv[2])
model = json.load(open(path))
row = {m["id"]: i for i, m in enumerate(model["metabolites"])}
R = model["reactions"]
S = np.zeros((len(row), len(R)))
for j, r in enumerate(R):
    for met, coef in r["metabolites"].items():
        S[row[met], j] = coef
bio = [j for j, r in enumerate(R) if r["id"].startswith("BIOMASS")][0]
lo = [0 if r["lower_bound"] >= 0 else -1e4 for r in R]   # directions only: the model's own bounds become 0 or +-1e4
hi = [0 if r["upper_bound"] <= 0 else 1e4 for r in R]
lo[bio] = 1                                              # target: biomass flux positive, normalised to >= 1
knock = [j for j in range(len(R)) if j != bio]           # the 94 reactions that may be deleted

def growth_survives(C):                                  # LP: steady-state flux with biomass >= 1 and C deleted
    b = [(lo[j], hi[j]) for j in range(len(R))]
    for i in C:
        b[knock[i]] = (0, 0)
    res = linprog(np.zeros(len(R)), A_eq=S, b_eq=np.zeros(len(S)), bounds=b, method="highs")
    assert res.status in (0, 2)                          # 0 feasible, 2 infeasible
    return res.status == 0

live, mcs = {()}, []            # live: sets of the previous size that contain no cut set
for k in range(1, K + 1):
    nxt, tested = set(), 0
    for N in live:
        for i in range(N[-1] + 1 if N else 0, len(knock)):
            C = N + (i,)
            if all(C[:t] + C[t + 1:] in live for t in range(k)):   # all (k-1)-subsets keep growth
                tested += 1
                if growth_survives(C):
                    nxt.add(C)
                else:
                    mcs.append(C)                        # blocks, and no proper subset does: minimal
    live = nxt
    masks = sorted(sum(1 << i for i in C) for C in mcs)       # fingerprint: bit i is the i-th deletable reaction
    digest = hashlib.sha1(",".join(map(str, masks)).encode()).hexdigest()[:12]
    print(f"size {k}: {sum(len(C) == k for C in mcs)} minimal cut sets, {len(mcs)} up to size {k}, "
          f"{tested} LPs, fingerprint {digest}", flush=True)
