/* Check of a stored Hadamard matrix, written separately from verify.py and check_matrix.c of the repository.
   Input: CSV of +1/-1 on stdin. Confirms: square, entries +1 or -1, every two distinct rows agree in exactly n/2 places.
   Optional argument: "skew" also checks H + H^T = 2I; "sym" checks H = H^T.
   Build and run:  cc -O2 check_h.c -o check_h;  gzip -dc skew/1004/H1004.csv.gz | ./check_h skew   */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
int main(int argc, char **argv) {
  size_t cap = 1 << 20, len = 0; char *buf = malloc(cap); int c;
  while ((c = getchar()) != EOF) { if (len + 1 >= cap) { cap *= 2; buf = realloc(buf, cap); } buf[len++] = (char)c; }
  buf[len] = 0;
  long n = 0; for (size_t i = 0; i < len && buf[i] != '\n'; i++) if (buf[i] == ',') n++; n++;
  long words = (n + 63) / 64; uint64_t *m = calloc((size_t)n * words, 8);
  long r = 0, col = 0; size_t i = 0;
  while (i < len) {
    if (buf[i] == '\n' || buf[i] == '\r') { if (col) { if (col != n) { printf("FAIL row %ld has %ld entries\n", r, col); return 1; } r++; col = 0; } i++; continue; }
    if (buf[i] == ',') { i++; continue; }
    int v;
    if (buf[i] == '-' && buf[i+1] == '1') { v = 0; i += 2; } else if (buf[i] == '+' && buf[i+1] == '1') { v = 1; i += 2; } else if (buf[i] == '1') { v = 1; i += 1; }
    else { printf("FAIL bad entry at byte %zu\n", i); return 1; }
    if (r >= n || col >= n) { printf("FAIL not square\n"); return 1; }
    if (v) m[r * words + col / 64] |= (uint64_t)1 << (col % 64);
    col++;
  }
  if (col) r++;
  if (r != n) { printf("FAIL %ld rows, %ld columns\n", r, n); return 1; }
  for (long a = 0; a < n; a++) for (long b = a + 1; b < n; b++) {
    long d = 0; for (long w = 0; w < words; w++) d += __builtin_popcountll(m[a * words + w] ^ m[b * words + w]);
    if (2 * d != n) { printf("FAIL rows %ld,%ld differ in %ld of %ld places\n", a, b, d, n); return 1; }
  }
  const char *extra = "";
  if (argc > 1) {
    int skew = !strcmp(argv[1], "skew"), sym = !strcmp(argv[1], "sym");
    for (long a = 0; a < n; a++) for (long b = a; b < n; b++) {
      int x = (m[a * words + b / 64] >> (b % 64)) & 1, y = (m[b * words + a / 64] >> (a % 64)) & 1;
      if (skew && ((a == b && !x) || (a != b && x == y))) { printf("FAIL not skew at %ld,%ld\n", a, b); return 1; }
      if (sym && x != y) { printf("FAIL not symmetric at %ld,%ld\n", a, b); return 1; }
    }
    extra = skew ? " skew" : sym ? " symmetric" : "";
  }
  printf("OK n=%ld%s\n", n, extra); return 0;
}
