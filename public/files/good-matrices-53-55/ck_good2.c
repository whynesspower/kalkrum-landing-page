/* Second code (C): good quadruple check by polynomial identity in Z[x]/(x^n - 1) and an independently
   indexed Goethals-Seidel product computed entry by entry (row dot products), plus skewness of H.
   Usage: ck_good2 n wA wB wC wD (hex). Exit 0 iff all checks pass. */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
static int n, h, X[4][128];
static int H[512][512];
static int circ(int k, int i, int j){ return X[k][((j - i) % n + n) % n]; }          /* circulant */
static int back(int k, int i, int j){ return X[k][((i + j) % n)]; }                  /* back-circulant = circ * R up to index map */
int main(int argc, char **argv){
  if (argc < 6) return 2;
  n = atoi(argv[1]); h = (n - 1) / 2;
  for (int k = 0; k < 4; k++){
    unsigned long long w = strtoull(argv[2 + k], 0, 16);
    if (w >> h) { printf("high bits\n"); return 1; }
    X[k][0] = 1;
    for (int i = 1; i <= h; i++){ int v = ((w >> (i - 1)) & 1ULL) ? -1 : 1; X[k][i] = v; X[k][n - i] = (k == 0) ? -v : v; }
  }
  /* polynomial identity: coefficients of sum_k X_k(x) X_k(x^{-1}) mod x^n - 1 */
  long c[128]; memset(c, 0, sizeof c);
  for (int k = 0; k < 4; k++) for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) c[((i - j) % n + n) % n] += X[k][i] * X[k][j];
  int ok1 = (c[0] == 4 * n); for (int s = 1; s < n; s++) if (c[s]) ok1 = 0;
  /* GS array with back-circulant blocks: for circulant M with first row x, (M R)_{ij} = x_{(i+j+1) mod n}... we instead use
     Seberry-Yamada form with back-circulant B', C', D' defined directly: Y'_{ij} = y_{(i+j) mod n} (a back-circulant matrix;
     for symmetric y the GS identity holds with Y' in place of Y R since Y' = Y R' for the reversal R' that fixes 0). */
  int N = 4 * n;
  for (int I = 0; I < N; I++) for (int J = 0; J < N; J++){
    int bi = I / n, bj = J / n, i = I % n, j = J % n, v = 0;
    /* block pattern: row bi, col bj -> (block index k, sign, kind) kind 0 = circulant A, 1 = back-circulant, 2 = back-circ of transpose */
    static const int K[4][4] = {{0,1,2,3},{1,0,3,2},{2,3,0,1},{3,2,1,0}};
    static const int S[4][4] = {{1,1,1,1},{-1,1,1,-1},{-1,-1,1,1},{-1,1,-1,1}};
    int k = K[bi][bj], s = S[bi][bj];
    if (k == 0) v = circ(0, i, j); else v = back(k, i, j);  /* symmetric blocks: Y^T = Y so transpose kinds coincide */
    H[I][J] = s * v;
  }
  int ok2 = 1, ok3 = 1;
  for (int I = 0; I < N && ok2; I++) for (int J = 0; J < N; J++){
    long d = 0; for (int L = 0; L < N; L++) d += H[I][L] * H[J][L];
    if (d != (I == J ? N : 0)) { ok2 = 0; break; }
  }
  for (int I = 0; I < N; I++) for (int J = 0; J < N; J++) if (H[I][J] + H[J][I] != (I == J ? 2 : 0)) ok3 = 0;
  printf("n=%d poly_identity=%d hadamard=%d skew=%d\n", n, ok1, ok2, ok3);
  return (ok1 && ok2 && ok3) ? 0 : 1;
}
