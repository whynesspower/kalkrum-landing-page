// mdcheck: minimum-distance checker for binary linear codes.
// Input file: first line "n k [claim]" then k lines of hex (bit i of the integer = coordinate i).
// Modes:
//   brute <file> <threads> [tbits]          full weight distribution, Gray-code enumeration of all 2^k codewords
//   bz    <file> <threads> <claim> <sets>    Brouwer-Zimmermann with disjoint information sets (Zimmermann bound
//                                            for rank-deficient sets). sets = blocks:<m> | rand:<seed>
//   claim = 0 means "compute d"; otherwise early REJECT as soon as a word of weight < claim is seen.
// Every result exhibits a codeword (as XOR of original rows) re-checked for membership and weight.
#include <cstdio>
#include <cstdlib>
#include <cstdint>
#include <cstring>
#include <string>
#include <vector>
#include <thread>
#include <atomic>
#include <mutex>
#include <random>
#include <algorithm>
#include <chrono>
using namespace std;
typedef uint64_t u64;

static int N, K, CLAIM_IN_FILE = -1;
static vector<vector<u64>> ROWS;  // original rows, NWmax words
static const int NWMAX = 4;

static int hexval(char c) {
  if (c >= '0' && c <= '9') return c - '0';
  if (c >= 'a' && c <= 'f') return c - 'a' + 10;
  if (c >= 'A' && c <= 'F') return c - 'A' + 10;
  return -1;
}

static void load(const char* fn) {
  FILE* f = fopen(fn, "r");
  if (!f) { fprintf(stderr, "cannot open %s\n", fn); exit(2); }
  char line[4096];
  if (!fgets(line, sizeof line, f)) exit(2);
  int c = -1;
  int got = sscanf(line, "%d %d %d", &N, &K, &c);
  if (got < 2) { fprintf(stderr, "bad header\n"); exit(2); }
  if (got == 3) CLAIM_IN_FILE = c;
  if (N > 64 * NWMAX || K > 64 || K < 1) { fprintf(stderr, "unsupported n/k\n"); exit(2); }
  while (fgets(line, sizeof line, f)) {
    string s(line);
    while (!s.empty() && (s.back() == '\n' || s.back() == '\r' || s.back() == ' ')) s.pop_back();
    if (s.empty()) continue;
    vector<u64> r(NWMAX, 0);
    int bit = 0;
    for (int i = (int)s.size() - 1; i >= 0; --i) {
      int v = hexval(s[i]);
      if (v < 0) { fprintf(stderr, "bad hex char\n"); exit(2); }
      for (int b = 0; b < 4; b++, bit++) if ((v >> b) & 1) {
        if (bit >= N) { fprintf(stderr, "REJECT-SHAPE: bit %d >= n\n", bit); exit(3); }
        r[bit >> 6] |= 1ULL << (bit & 63);
      }
    }
    ROWS.push_back(r);
  }
  fclose(f);
  if ((int)ROWS.size() != K) { fprintf(stderr, "REJECT-SHAPE: %zu rows, k=%d\n", ROWS.size(), K); exit(3); }
}

static inline bool getbit(const vector<u64>& r, int c) { return (r[c >> 6] >> (c & 63)) & 1; }

static int rank_of(vector<vector<u64>> M) {
  int r = 0;
  for (int c = 0; c < N && r < (int)M.size(); c++) {
    int p = -1;
    for (int i = r; i < (int)M.size(); i++) if (getbit(M[i], c)) { p = i; break; }
    if (p < 0) continue;
    swap(M[p], M[r]);
    for (int i = 0; i < (int)M.size(); i++) if (i != r && getbit(M[i], c)) for (int w = 0; w < NWMAX; w++) M[i][w] ^= M[r][w];
    r++;
  }
  return r;
}

static int wt(const vector<u64>& v) { int s = 0; for (u64 x : v) s += __builtin_popcountll(x); return s; }

static vector<u64> combine_rows(u64 mask) {
  vector<u64> v(NWMAX, 0);
  for (int i = 0; i < K; i++) if ((mask >> i) & 1) for (int w = 0; w < NWMAX; w++) v[w] ^= ROWS[i][w];
  return v;
}

static string tohex(const vector<u64>& v) {
  string s;
  bool lead = true;
  for (int i = NWMAX * 16 - 1; i >= 0; i--) {
    int nib = (v[i / 16] >> ((i % 16) * 4)) & 15;
    if (nib == 0 && lead && i > 0) continue;
    lead = false;
    s += "0123456789abcdef"[nib];
  }
  return s;
}

// ---------------- brute force ----------------
template <int NW>
static void brute(int threads, int tbits) {
  if (tbits > K) tbits = K;
  int low = K - tbits;
  u64 ntask = 1ULL << tbits;
  atomic<u64> next(0);
  vector<vector<u64>> hist(threads, vector<u64>(N + 1, 0));
  auto worker = [&](int tid) {
    u64 R[64][NW];
    for (int i = 0; i < K; i++) for (int w = 0; w < NW; w++) R[i][w] = ROWS[i][w];
    vector<u64>& H = hist[tid];
    u64 h[256 + 1];
    memset(h, 0, sizeof h);
    for (;;) {
      u64 t = next.fetch_add(1);
      if (t >= ntask) break;
      u64 v[NW];
      for (int w = 0; w < NW; w++) v[w] = 0;
      for (int b = 0; b < tbits; b++) if ((t >> b) & 1) for (int w = 0; w < NW; w++) v[w] ^= R[low + b][w];
      int s = 0;
      for (int w = 0; w < NW; w++) s += __builtin_popcountll(v[w]);
      h[s]++;
      u64 lim = 1ULL << low;
      for (u64 i = 1; i < lim; i++) {
        int j = __builtin_ctzll(i);
        s = 0;
        for (int w = 0; w < NW; w++) { v[w] ^= R[j][w]; s += __builtin_popcountll(v[w]); }
        h[s]++;
      }
    }
    for (int i = 0; i <= N; i++) H[i] = h[i];
  };
  vector<thread> th;
  for (int i = 0; i < threads; i++) th.emplace_back(worker, i);
  for (auto& x : th) x.join();
  vector<u64> A(N + 1, 0);
  for (int t = 0; t < threads; t++) for (int i = 0; i <= N; i++) A[i] += hist[t][i];
  unsigned __int128 tot = 0;
  for (int i = 0; i <= N; i++) tot += A[i];
  int d = -1;
  for (int i = 1; i <= N; i++) if (A[i]) { d = i; break; }
  printf("BRUTE n=%d k=%d A0=%llu total_ok=%d d=%d A_d=%llu\n", N, K, (unsigned long long)A[0],
         (int)(tot == ((unsigned __int128)1 << K)), d, (unsigned long long)(d > 0 ? A[d] : 0));
  printf("WEIGHTS");
  for (int i = 0; i <= N; i++) if (A[i]) printf(" %d:%llu", i, (unsigned long long)A[i]);
  printf("\n");
  if (A[0] != 1) printf("WARNING rows dependent (A0 != 1)\n");
}

// ---------------- Brouwer-Zimmermann ----------------
struct ISet {
  int rank;
  vector<vector<u64>> M;  // k rows
  vector<u64> T;          // T[i] = mask of original rows giving M[i]
  vector<int> cols;
};

static vector<ISet> build_sets(const string& spec) {
  vector<vector<int>> pools;  // candidate column lists, processed in sequence
  vector<int> order(N);
  for (int i = 0; i < N; i++) order[i] = i;
  bool blocks = false;
  int m = 0;
  if (spec.rfind("blocks:", 0) == 0) {
    blocks = true;
    m = atoi(spec.c_str() + 7);
  } else if (spec.rfind("rand:", 0) == 0) {
    u64 seed = strtoull(spec.c_str() + 5, 0, 10);
    mt19937_64 g(seed);
    for (int i = N - 1; i > 0; i--) { int j = g() % (i + 1); swap(order[i], order[j]); }
  } else { fprintf(stderr, "bad set spec\n"); exit(2); }
  vector<ISet> sets;
  vector<vector<u64>> M = ROWS;
  vector<u64> T(K);
  for (int i = 0; i < K; i++) T[i] = 1ULL << i;
  vector<int> pool = order;
  int bstart = 0;
  while (true) {
    vector<int> cand;
    if (blocks) {
      if (bstart >= N) break;
      for (int c = bstart; c < min(N, bstart + m); c++) cand.push_back(c);
      bstart += m;
    } else {
      if (pool.empty()) break;
      cand = pool;
    }
    vector<int> pivrow_used(K, 0);
    vector<int> setcols, rest;
    for (int c : cand) {
      if ((int)setcols.size() == K) { rest.push_back(c); continue; }
      int p = -1;
      for (int i = 0; i < K; i++) if (!pivrow_used[i] && getbit(M[i], c)) { p = i; break; }
      if (p < 0) { rest.push_back(c); continue; }
      pivrow_used[p] = 1;
      for (int i = 0; i < K; i++) if (i != p && getbit(M[i], c)) {
        for (int w = 0; w < NWMAX; w++) M[i][w] ^= M[p][w];
        T[i] ^= T[p];
      }
      setcols.push_back(c);
    }
    if (!blocks) pool = rest;
    if (setcols.empty()) { if (!blocks) break; else continue; }
    ISet s;
    s.rank = setcols.size();
    s.M = M;
    s.T = T;
    s.cols = setcols;
    sets.push_back(s);
    if (!blocks && (int)setcols.size() < K) {
      // remaining pool has rank < K too; keep going (smaller partial sets still add Zimmermann terms)
    }
  }
  return sets;
}

static u64 binom(int n, int r) {
  if (r < 0 || r > n) return 0;
  long double x = 1;
  for (int i = 1; i <= r; i++) x = x * (n - r + i) / i;
  return (u64)(x + 0.5);
}

template <int NW>
struct BZRun {
  vector<ISet>& S;
  int threads, claim;
  atomic<int> gbest;
  mutex mu;
  int best_w;
  int best_set;
  vector<int> best_idx;
  u64 leaves_total = 0;
  BZRun(vector<ISet>& s, int th, int cl) : S(s), threads(th), claim(cl), gbest(1 << 30), best_w(1 << 30), best_set(-1) {}

  // enumerate all w-subsets of rows of set j
  void stage(int j, int w) {
    const ISet& st = S[j];
    u64 R[64][NW];
    for (int i = 0; i < K; i++) for (int x = 0; x < NW; x++) R[i][x] = st.M[i][x];
    // tasks: first index i1 (w>=1); for w>=3 split on (i1,i2)
    vector<pair<int, int>> tasks;
    if (w <= 2) tasks.push_back({-1, -1});
    else for (int a = 0; a < K; a++) for (int b = a + 1; b < K; b++) tasks.push_back({a, b});
    atomic<size_t> next(0);
    atomic<u64> leaves(0);
    auto worker = [&]() {
      int lbest = 1 << 30;
      vector<int> lidx;
      int idx[64];
      u64 part[66][NW];
      for (;;) {
        size_t t = next.fetch_add(1);
        if (t >= tasks.size()) break;
        if (claim > 0 && gbest.load(memory_order_relaxed) < claim) break;
        if (claim > 0 && lbest < claim) { int g = gbest.load(); while (lbest < g && !gbest.compare_exchange_weak(g, lbest)) {} }
        int depth0;
        for (int x = 0; x < NW; x++) part[0][x] = 0;
        if (tasks[t].first < 0) {
          depth0 = 0;
        } else {
          idx[0] = tasks[t].first;
          idx[1] = tasks[t].second;
          for (int x = 0; x < NW; x++) { part[1][x] = R[idx[0]][x]; part[2][x] = part[1][x] ^ R[idx[1]][x]; }
          depth0 = 2;
        }
        // iterative enumeration of remaining indices idx[depth0..w-1]
        int need = w - depth0;
        if (need == 0) {
          int s = 0;
          for (int x = 0; x < NW; x++) s += __builtin_popcountll(part[w][x]);
          if (s < lbest) { lbest = s; lidx.assign(idx, idx + w); }
          continue;
        }
        int start = depth0 == 0 ? 0 : idx[depth0 - 1] + 1;
        // depth d positions: idx[d] ranges so that remaining fit
        int d = depth0;
        idx[d] = start - 1;
        while (d >= depth0) {
          idx[d]++;
          if (idx[d] > K - (w - d)) { d--; continue; }
          if (d == w - 1) {
            // leaf loop over idx[w-1]
            const u64* P = part[d];
            for (int i = idx[d]; i < K; i++) {
              int s = 0;
              for (int x = 0; x < NW; x++) s += __builtin_popcountll(P[x] ^ R[i][x]);
              if (s < lbest) {
                lbest = s;
                idx[d] = i;
                lidx.assign(idx, idx + w);
              }
            }
            d--;
            continue;
          }
          for (int x = 0; x < NW; x++) part[d + 1][x] = part[d][x] ^ R[idx[d]][x];
          d++;
          idx[d] = idx[d - 1];
        }
      }
      lock_guard<mutex> g(mu);
      if (lbest < best_w) { best_w = lbest; best_set = j; best_idx = lidx; gbest.store(lbest); }
    };
    vector<thread> th;
    for (int i = 0; i < threads; i++) th.emplace_back(worker);
    for (auto& x : th) x.join();
    leaves_total += binom(K, w);
  }
};

template <int NW>
static void bz(int threads, int claim, const string& spec, int maxw) {
  auto t0 = chrono::steady_clock::now();
  vector<ISet> S = build_sets(spec);
  printf("SETS %zu ranks:", S.size());
  for (auto& s : S) printf(" %d", s.rank);
  printf("\n");
  // sanity: each set's M is row-equivalent to G and pivot structure holds
  for (auto& s : S) {
    if (rank_of(s.M) != K) { printf("ERROR set matrix rank\n"); exit(4); }
    for (int i = 0; i < K; i++) {
      vector<u64> v = combine_rows(s.T[i]);
      for (int w = 0; w < NWMAX; w++) if (v[w] != s.M[i][w]) { printf("ERROR transform mismatch\n"); exit(4); }
    }
    // columns of the set: each column has exactly one 1 among rows, and distinct rows
    vector<int> used(K, 0);
    for (int c : s.cols) {
      int cnt = 0, r = -1;
      for (int i = 0; i < K; i++) if (getbit(s.M[i], c)) { cnt++; r = i; }
      if (cnt != 1 || used[r]) { printf("ERROR pivot structure\n"); exit(4); }
      used[r] = 1;
    }
  }
  BZRun<NW> run(S, threads, claim);
  int ns = S.size();
  int lbfinal = 0;
  bool done = false;
  for (int w = 1; w <= min(K, maxw) && !done; w++) {
    for (int j = 0; j < ns; j++) {
      run.stage(j, w);
      int LB = 0;
      for (int i = 0; i < ns; i++) {
        int st = (i <= j) ? w : w - 1;
        LB += max(0, st + 1 - (K - S[i].rank));
      }
      double el = chrono::duration<double>(chrono::steady_clock::now() - t0).count();
      printf("STAGE w=%d set=%d best=%d LB=%d leaves=%.4g t=%.1fs\n", w, j, run.best_w, LB, (double)run.leaves_total, el);
      fflush(stdout);
      lbfinal = LB;
      if (claim > 0 && run.best_w < claim) { done = true; break; }
      if (LB >= run.best_w) { done = true; break; }
    }
  }
  // witness
  const ISet& st = S[run.best_set];
  u64 mask = 0;
  vector<u64> cw(NWMAX, 0);
  for (int i : run.best_idx) { mask ^= st.T[i]; for (int w = 0; w < NWMAX; w++) cw[w] ^= st.M[i][w]; }
  vector<u64> re = combine_rows(mask);
  bool member = (re == cw) && mask != 0;
  int ww = wt(re);
  bool complete = lbfinal >= run.best_w;
  printf("WITNESS weight=%d member=%d rowmask=%llx word=%s\n", ww, (int)member, (unsigned long long)mask, tohex(re).c_str());
  if (ww != run.best_w || !member) { printf("VERDICT ERROR witness\n"); return; }
  if (claim > 0) {
    if (run.best_w < claim) printf("VERDICT REJECT (word of weight %d < claim %d)\n", run.best_w, claim);
    else if (complete && run.best_w == claim) printf("VERDICT ACCEPT d=%d leaves=%.4g\n", claim, (double)run.leaves_total);
    else if (complete) printf("VERDICT REJECT (d=%d != claim %d)\n", run.best_w, claim);
    else printf("VERDICT UNKNOWN (stopped at maxw; best=%d LB=%d)\n", run.best_w, lbfinal);
  } else {
    if (complete) printf("RESULT d=%d leaves=%.4g\n", run.best_w, (double)run.leaves_total);
    else printf("RESULT incomplete best=%d LB=%d\n", run.best_w, lbfinal);
  }
}

int main(int argc, char** argv) {
  if (argc < 4) { fprintf(stderr, "usage: see source\n"); return 2; }
  string mode = argv[1];
  load(argv[2]);
  int threads = atoi(argv[3]);
  int r = rank_of(ROWS);
  printf("LOAD n=%d k=%d rank=%d fileclaim=%d\n", N, K, r, CLAIM_IN_FILE);
  if (r != K) { printf("VERDICT REJECT-SHAPE (rank %d < k)\n", r); return 3; }
  int NW = (N + 63) / 64;
  if (mode == "brute") {
    int tb = argc > 4 ? atoi(argv[4]) : 12;
    if (NW == 1) brute<1>(threads, tb);
    else if (NW == 2) brute<2>(threads, tb);
    else if (NW == 3) brute<3>(threads, tb);
    else brute<4>(threads, tb);
  } else if (mode == "bz") {
    int claim = atoi(argv[4]);
    string spec = argv[5];
    int maxw = argc > 6 ? atoi(argv[6]) : 64;
    if (NW == 1) bz<1>(threads, claim, spec, maxw);
    else if (NW == 2) bz<2>(threads, claim, spec, maxw);
    else if (NW == 3) bz<3>(threads, claim, spec, maxw);
    else bz<4>(threads, claim, spec, maxw);
  }
  return 0;
}
