/* Full-enumeration minimum distance of a binary linear code (no information sets).
   Input (stdin): n r, then r lines each a 0/1 string of length n (generator rows, may be dependent).
   Computes RREF basis (rank k), then enumerates all 2^k - 1 nonzero codewords by Gray code,
   split over 2^T prefixes. Prints k, min weight, number of min-weight words, a witness (as message bits), and
   counts A_w for w <= maxw. n <= 256. */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
#include <omp.h>
#define W 4
typedef struct { uint64_t w[W]; } vec;
static int n, k;
static vec B[256];
static inline int wt(const vec *v){ int s=0; for(int i=0;i<W;i++) s+=__builtin_popcountll(v->w[i]); return s; }
static inline void xr(vec *a, const vec *b){ for(int i=0;i<W;i++) a->w[i]^=b->w[i]; }
static inline int getb(const vec *v,int j){ return (v->w[j>>6]>>(j&63))&1; }
int main(int argc,char**argv){
  int r; int maxw = argc>1? atoi(argv[1]) : 0; int T = argc>2? atoi(argv[2]) : 10;
  if(scanf("%d %d",&n,&r)!=2) return 1;
  vec *R = calloc(r,sizeof(vec)); char buf[512];
  for(int i=0;i<r;i++){ if(scanf("%s",buf)!=1) return 1; if((int)strlen(buf)!=n){fprintf(stderr,"bad len row %d\n",i);return 1;}
    for(int j=0;j<n;j++) if(buf[j]=='1') R[i].w[j>>6]|=1ULL<<(j&63); }
  /* Gaussian elimination */
  int row=0;
  for(int c=0;c<n && row<r;c++){
    int p=-1; for(int i=row;i<r;i++) if(getb(&R[i],c)){p=i;break;}
    if(p<0) continue; vec t=R[p]; R[p]=R[row]; R[row]=t;
    for(int i=0;i<r;i++) if(i!=row && getb(&R[i],c)) xr(&R[i],&R[row]);
    row++; }
  k=row; for(int i=0;i<k;i++) B[i]=R[i];
  printf("n=%d k=%d\n",n,k); fflush(stdout);
  if(k>62){ printf("k too large\n"); return 1; }
  if(T>k) T=k; int L=k-T; /* low L bits by Gray code, high T bits as prefix */
  long long P = 1LL<<T;
  int gmin=1<<30; unsigned long long gmsg=0; long long *A = calloc(maxw+1,sizeof(long long));
  #pragma omp parallel
  {
    int lmin=1<<30; unsigned long long lmsg=0; long long *lA=calloc(maxw+1,sizeof(long long));
    #pragma omp for schedule(dynamic,1)
    for(long long pre=0; pre<P; pre++){
      vec c; memset(&c,0,sizeof c);
      for(int t=0;t<T;t++) if((pre>>t)&1) xr(&c,&B[L+t]);
      unsigned long long g=0; /* gray state of low bits */
      unsigned long long cnt = 1ULL<<L;
      for(unsigned long long i=0;i<cnt;i++){
        if(i){ int b=__builtin_ctzll(i); xr(&c,&B[b]); g^=1ULL<<b; }
        if(pre==0 && i==0) continue;
        int w=wt(&c);
        if(w<=maxw) lA[w]++;
        if(w<lmin){ lmin=w; lmsg=((unsigned long long)pre<<L)|g; }
      }
    }
    #pragma omp critical
    { if(lmin<gmin){gmin=lmin;gmsg=lmsg;} for(int w=0;w<=maxw;w++) A[w]+=lA[w]; }
  }
  /* rebuild witness and re-verify */
  vec c; memset(&c,0,sizeof c); for(int i=0;i<k;i++) if((gmsg>>i)&1) xr(&c,&B[i]);
  printf("dmin=%d witness_weight=%d\n",gmin,wt(&c));
  printf("witness="); for(int j=0;j<n;j++) putchar('0'+getb(&c,j)); printf("\n");
  for(int w=1;w<=maxw;w++) if(A[w]) printf("A_%d=%lld\n",w,A[w]);
  return 0;
}
