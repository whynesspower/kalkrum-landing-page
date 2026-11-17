/* Lower-bound check for a one-generator QC code C = {(u*a_0, ..., u*a_{l-1}) : u in F2[x]/(x^m-1)}, a_0 = 1, m <= 64.
   Claim: d(C) >= D. Argument (non-adaptive):
   Let I = set of blocks t with a_t invertible, r = |I|. If c != 0 has wt(c) <= D-1, then sum_{t in I} wt(c_t) <= D-1,
   so some t in I has wt(c_t) <= tau = floor((D-1)/r); c_t != 0 since a_t invertible and u != 0.
   c is determined by c_t: c_s = c_t * a_t^{-1} * a_s. C is invariant under simultaneous cyclic shift,
   so WLOG bit 0 of c_t is set. Enumerate all v with v_0 = 1, wt(v) <= tau, for each t in I; compute wt of
   (v*h_{t,0},...,v*h_{t,l-1}) with h_{t,s} = a_t^{-1} a_s. If none has weight <= D-1, then d(C) >= D.
   Also reports the minimum weight seen and its count over the enumerated set.
   Input (stdin): m l D, then l lines of 0/1 strings of length m (block coefficients, index j = x^j). */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
#include <omp.h>
static int m, l, D, tau;
static uint64_t MASK;
static inline uint64_t rotl(uint64_t a, int i){ i%=m; return i? (((a<<i)|(a>>(m-i)))&MASK) : a; }
static uint64_t pmul(uint64_t a, uint64_t b){ uint64_t r=0; for(int i=0;i<m;i++) if((a>>i)&1) r^=rotl(b,i); return r; }
/* inverse in F2[x]/(x^m-1) by brute linear algebra: solve a*y = 1 via Gaussian elimination on circulant */
static int pinv(uint64_t a, uint64_t *out){
  /* columns: a*x^j for j=0..m-1; solve sum y_j a x^j = 1 */
  uint64_t M[64]; uint64_t T[64]; /* rows of augmented system: M[i] bit j = coeff of x^i in a*x^j */
  for(int i=0;i<m;i++){ M[i]=0; for(int j=0;j<m;j++){ uint64_t col=rotl(a,j); if((col>>i)&1) M[i]|=1ULL<<j; } T[i]=(i==0); }
  int row=0; int piv[64];
  for(int c=0;c<m;c++){ int p=-1; for(int i=row;i<m;i++) if((M[i]>>c)&1){p=i;break;} if(p<0) return 0;
    uint64_t t=M[p];M[p]=M[row];M[row]=t; t=T[p];T[p]=T[row];T[row]=t;
    for(int i=0;i<m;i++) if(i!=row && ((M[i]>>c)&1)){ M[i]^=M[row]; T[i]^=T[row]; }
    piv[row]=c; row++; }
  uint64_t y=0; for(int i=0;i<m;i++) if(T[i]) y|=1ULL<<piv[i];
  if(pmul(a,y)!=1) return 0; *out=y; return 1;
}
static uint64_t H[8][8][64]; /* H[t][s][j] = x^j * h_{t,s} */
int main(int argc, char**argv){
  if(scanf("%d %d %d",&m,&l,&D)!=3) return 1;
  if(argc>1) D=atoi(argv[1]); /* optional override of claimed D */
  MASK = (m==64)? ~0ULL : ((1ULL<<m)-1);
  uint64_t a[8]; char buf[128];
  for(int t=0;t<l;t++){ if(scanf("%s",buf)!=1) return 1; a[t]=0; for(int j=0;j<m;j++) if(buf[j]=='1') a[t]|=1ULL<<j; }
  if(a[0]!=1){ printf("precondition fail: a_0 != 1\n"); return 1; }
  int I[8], r=0; uint64_t ainv[8];
  for(int t=0;t<l;t++) if(pinv(a[t],&ainv[t])) I[r++]=t;
  tau=(D-1)/r;
  printf("m=%d l=%d D=%d invertible=%d tau=%d\n",m,l,D,r,tau); fflush(stdout);
  for(int ii=0;ii<r;ii++){ int t=I[ii]; for(int s=0;s<l;s++){ uint64_t h=pmul(ainv[t],a[s]); for(int j=0;j<m;j++) H[ii][s][j]=rotl(h,j); } }
  long long found=0, nodes=0; int gmin=1<<30; long long gcnt=0; int wt_t=-1; uint64_t wv=0;
  /* parallelise over (block index, second position p1) */
  int tasks = r*m;
  #pragma omp parallel reduction(+:nodes)
  {
    int lmin=1<<30; long long lcnt=0; uint64_t lv=0; int lt=-1;
    #pragma omp for schedule(dynamic,1)
    for(int task=0; task<tasks; task++){
      int ii=task/m, p1=task%m; /* p1 = 0 means v = 1 only (weight 1); else second-lowest position p1 */
      uint64_t c[8]; int pos[64];
      for(int s=0;s<l;s++) c[s]=H[ii][s][0];
      if(p1>0){ if(tau<2) continue; for(int s=0;s<l;s++) c[s]^=H[ii][s][p1]; }
      int depth = (p1>0)? 2 : 1;
      /* evaluate current */
      #define EVAL() { int w=0; for(int s=0;s<l;s++) w+=__builtin_popcountll(c[s]); nodes++; \
        if(w<lmin){lmin=w;lcnt=1;lt=I[ii]; lv=0; lv|=1; if(p1>0) lv|=1ULL<<p1; for(int q=2;q<depth;q++) lv|=1ULL<<pos[q];} else if(w==lmin) lcnt++; }
      EVAL();
      if(p1==0) continue;
      /* DFS over additional positions > previous, up to tau total weight */
      pos[1]=p1; int next[64]; next[depth]=p1+1;
      while(depth>=2){
        if(depth<tau && next[depth]<m){
          int q=next[depth]++; pos[depth]=q;
          for(int s=0;s<l;s++) c[s]^=H[ii][s][q];
          depth++; next[depth]=q+1; EVAL();
        } else {
          depth--; if(depth<2) break;
          int q=pos[depth]; for(int s=0;s<l;s++) c[s]^=H[ii][s][q];
        }
      }
    }
    #pragma omp critical
    { if(lmin<gmin){gmin=lmin;gcnt=lcnt;wv=lv;wt_t=lt;} else if(lmin==gmin) gcnt+=lcnt; }
  }
  printf("nodes=%lld min_weight_seen=%d count_seen=%lld (light block %d, v=0x%llx)\n",nodes,gmin,gcnt,wt_t,(unsigned long long)wv);
  printf("%s: d >= %d %s\n", gmin>=D? "ACCEPT_LOWER":"REJECT", D, gmin>=D? "(no word of weight <= D-1 in the covering set)":"(word of weight < D found)");
  return 0;
}
