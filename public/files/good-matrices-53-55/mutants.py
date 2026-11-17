import sys
sys.path.insert(0, '.')
from ck_good import check
cases = {53: [0x29f4da, 0xb79910, 0x3171087, 0x3576479], 55: [0x48f51d, 0x82e36e, 0x3a9fe69, 0x41b7527]}
for n, w in cases.items():
    h = (n - 1) // 2
    acc = 0; tot = 0
    for b in range(4):
        for i in range(h):
            ww = list(w); ww[b] ^= (1 << i)
            r, _ = check(n, ww)
            tot += 1; acc += r["PASS"]
    # word with junk high bit must be rejected (decode raises)
    try:
        ww = list(w); ww[1] |= 1 << h; check(n, ww); junk = "ACCEPTED"
    except ValueError:
        junk = "rejected"
    # swapped A with B (A not skew-decoded) must be rejected
    r, _ = check(n, [w[1], w[0], w[2], w[3]])
    print(n, "single-bit mutants", tot, "accepted", acc, "| junk high bit", junk, "| A<->B swap accepted", r["PASS"])
