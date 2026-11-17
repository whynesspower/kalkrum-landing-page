"use client";

import { useEffect, useRef } from "react";
import { twoGross } from "@/content/plates";

const { l: L, m: M, A, B } = twoGross;
const N = L * M;
const TAU = Math.PI * 2;
const MAJOR = 1;
const MINOR = 0.44;
const BUCKETS = 6;

type P3 = [number, number, number];

function onTorus(u: number, v: number): P3 {
  const th = (TAU * u) / L;
  const ph = (TAU * v) / M;
  const w = MAJOR + MINOR * Math.cos(ph);
  return [w * Math.cos(th), MINOR * Math.sin(ph), w * Math.sin(th)];
}
const at = (a: number, b: number) => (((a % L) + L) % L) * M + (((b % M) + M) % M);

/**
 * The Tanner graph of the code, laid on its torus. Nodes 0–143 are the left data qubits, 144–287 the right,
 * then the X checks and the Z checks. H_X = [A | B] and H_Z = [Bᵀ | Aᵀ], so every check touches six qubits.
 */
function build() {
  const nodes: P3[] = [];
  for (let a = 0; a < L; a++) for (let b = 0; b < M; b++) nodes.push(onTorus(a + 0.5, b));
  for (let a = 0; a < L; a++) for (let b = 0; b < M; b++) nodes.push(onTorus(a, b + 0.5));
  for (let a = 0; a < L; a++) for (let b = 0; b < M; b++) nodes.push(onTorus(a, b));
  for (let a = 0; a < L; a++) for (let b = 0; b < M; b++) nodes.push(onTorus(a + 0.5, b + 0.5));
  const edges: [number, number][] = [];
  for (let a = 0; a < L; a++)
    for (let b = 0; b < M; b++) {
      const x = 2 * N + at(a, b);
      for (const [da, db] of A) edges.push([x, at(a + da, b + db)]);
      for (const [da, db] of B) edges.push([x, N + at(a + da, b + db)]);
    }
  for (let a = 0; a < L; a++)
    for (let b = 0; b < M; b++) {
      const z = 3 * N + at(a, b);
      for (const [da, db] of B) edges.push([z, at(a - da, b - db)]);
      for (const [da, db] of A) edges.push([z, N + at(a - da, b - db)]);
    }
  return { nodes, edges };
}

/** IBM's two-gross code as a slowly turning torus; one check at a time lights up with its six qubits. */
export function TorusCode() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { nodes, edges } = build();
    const sx = new Float32Array(nodes.length);
    const sy = new Float32Array(nodes.length);
    const sz = new Float32Array(nodes.length);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = false;
    let clock = 0;
    let last = 0;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const unit = Math.min(w, h) * 0.3;
      const spin = clock * 0.085 + 0.6;
      const tilt = 1.02;
      const cs = Math.cos(spin);
      const sn = Math.sin(spin);
      const ct = Math.cos(tilt);
      const st = Math.sin(tilt);
      for (let i = 0; i < nodes.length; i++) {
        const [x, y, z] = nodes[i];
        const x1 = x * cs - z * sn;
        const z1 = x * sn + z * cs;
        const y2 = y * ct - z1 * st;
        const z2 = y * st + z1 * ct;
        const k = 4.6 / (4.6 - z2);
        sx[i] = w / 2 + x1 * k * unit;
        sy[i] = h / 2 - y2 * k * unit;
        sz[i] = z2;
      }

      ctx.clearRect(0, 0, w, h);
      const px = w / canvas.clientWidth || 1;

      const paths = Array.from({ length: BUCKETS }, () => new Path2D());
      for (const [p, q] of edges) {
        const depth = ((sz[p] + sz[q]) / 2 + 1.5) / 3;
        const bucket = Math.max(0, Math.min(BUCKETS - 1, Math.floor(depth * BUCKETS)));
        paths[bucket].moveTo(sx[p], sy[p]);
        paths[bucket].lineTo(sx[q], sy[q]);
      }
      ctx.lineWidth = 0.55 * px;
      for (let b = 0; b < BUCKETS; b++) {
        ctx.strokeStyle = `rgba(242, 244, 248, ${0.05 + 0.2 * (b / (BUCKETS - 1))})`;
        ctx.stroke(paths[b]);
      }

      for (let i = 0; i < 2 * N; i++) {
        const near = (sz[i] + 1.5) / 3;
        const s = (1.2 + 1.3 * near) * px;
        ctx.fillStyle = `rgba(242, 244, 248, ${0.3 + 0.7 * near})`;
        ctx.fillRect(sx[i] - s / 2, sy[i] - s / 2, s, s);
      }

      // One check and the six qubits it measures.
      const check = (Math.floor(clock / 2.8) * 37) % (2 * N);
      const fade = Math.min(1, (clock % 2.8) / 0.5, (2.8 - (clock % 2.8)) / 0.5);
      ctx.strokeStyle = `rgba(153, 230, 255, ${0.95 * fade})`;
      ctx.fillStyle = `rgba(188, 238, 255, ${fade})`;
      ctx.lineWidth = 1.25 * px;
      ctx.beginPath();
      for (let e = check * 6; e < check * 6 + 6; e++) {
        const [p, q] = edges[e];
        ctx.moveTo(sx[p], sy[p]);
        ctx.lineTo(sx[q], sy[q]);
      }
      ctx.stroke();
      for (let e = check * 6; e < check * 6 + 6; e++) {
        const q = edges[e][1];
        const s = 4.4 * px;
        ctx.fillRect(sx[q] - s / 2, sy[q] - s / 2, s, s);
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      draw();
    };
    const frame = (now: number) => {
      clock += Math.min(now - last, 100) / 1000;
      last = now;
      draw();
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running || still) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);
    resize();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label="The two-gross code drawn on a torus: 288 qubits joined to 288 checks by 1,728 connections"
    />
  );
}
