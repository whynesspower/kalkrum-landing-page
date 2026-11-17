# Orbit sizes of the stored class representatives under shifts x units x negation (brute force, from the supports only).
# usage: python3 -I check_orbits.py DIR   (DIR holds cw120_36_classes.json and cw180_36_classes.json)
import json, math, sys, os
D = sys.argv[1]
def orbit(n, P, N):
    units = [u for u in range(1, n) if math.gcd(u, n) == 1]
    seen = set()
    for u in units:
        P2 = [(u*x) % n for x in P]; N2 = [(u*x) % n for x in N]
        for s in range(n):
            A = frozenset((x+s) % n for x in P2); B = frozenset((x+s) % n for x in N2)
            seen.add((A, B)); seen.add((B, A))
    return seen
for name, n in (('cw120_36_classes.json', 120), ('cw180_36_classes.json', 180)):
    c = json.load(open(os.path.join(D, name)))
    tot = set(); sizes = []; plus6 = 0
    for k in c['classes']:
        o = orbit(n, k['P'], k['N'])
        sizes.append(len(o)); 
        assert not (o & tot), 'classes overlap'
        tot |= o
    plus6 = sum(1 for (A, B) in tot if len(A)-len(B) == 6)
    print('CW(%d,36): orbit sizes (both signs)' % n, sorted(sizes), 'total first rows', len(tot), 'with row sum +6', plus6)
