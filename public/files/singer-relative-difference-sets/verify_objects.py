#!/usr/bin/env python3
"""Standalone verification (standard library + numpy only) of every objects/*.json: R is a subset of Z_{vn} with exactly
mu_RDS representations of every element outside N = <v> and none inside N minus {0}; its projection D to Z_v is a (v, k, lam_DS)
difference set.  Keys: id, group (labels), v (= m), n, k, mu_RDS (= lambda of the RDS), lam_DS (= n * mu_RDS), R.
usage: python3 verify_objects.py   (the folder objects/ next to this file)"""
import os, json, glob
import numpy as np
HERE = os.path.dirname(os.path.abspath(__file__))
for p in sorted(glob.glob(os.path.join(HERE, "objects", "*.json"))):
    o = json.load(open(p)); R = np.array(o["R"], dtype=np.int64); v, n, k = o["v"], o["n"], o["k"]; M = v * n
    assert len(R) == k and len(set(R.tolist())) == k
    cnt = np.bincount(((R[:, None] - R[None, :]) % M).ravel(), minlength=M); cnt[0] -= k
    mu = o["mu_RDS"]
    bad = [s for s in range(1, M) if cnt[s] != (0 if s % v == 0 else mu)]
    D = np.array(sorted(set((R % v).tolist())))
    assert len(D) == k
    cd = np.bincount(((D[:, None] - D[None, :]) % v).ravel(), minlength=v); cd[0] -= k
    lam = o["lam_DS"]
    bad_ds = [s for s in range(1, v) if cd[s] != lam]
    print(f"{o['id']}: ({v},{n},{k},{mu})-RDS in {o['group']}: violations {len(bad)}; projection is a ({v},{k},{lam}) difference set: violations {len(bad_ds)}")
    assert not bad and not bad_ds
