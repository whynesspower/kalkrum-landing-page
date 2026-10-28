import * as React from "react";
import { Box } from "@chakra-ui/react";
import { CanvasFrame, useCanvasLoop } from "./use-canvas-loop";

const N_MAX = 2400;
const N_MIN = 700;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const CYAN = "142,227,255";
const MINT = "94,242,196";
const GOLD = "255,210,122";
const BASE = "205,222,255";
const WHITE = "230,244,255";

// Depth buckets for batched point fills (one fill per bucket and colour).
const BUCKETS = 14;
// Trail ring buffer (positions on the unit sphere).
const TRAIL = 260;
// Bursts and gold pulses are fixed-size pools.
const BURSTS = 28;
const PULSES = 3;
const CAM = 3.2;

/** Rotate by yaw (around Y) then pitch (around X) into `out`. */
const rotate = (
  out: Float32Array,
  x: number,
  y: number,
  z: number,
  cy: number,
  sy: number,
  cp: number,
  sp: number,
) => {
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;
  out[0] = x1;
  out[1] = y * cp - z1 * sp;
  out[2] = y * sp + z1 * cp;
};

/** Pre-built rgba strings so the frame loop never concatenates. */
const makeAlphaTable = (rgb: string, steps: number, max: number) => {
  const a: string[] = [];
  for (let i = 0; i <= steps; i++) a.push(`rgba(${rgb},${((i / steps) * max).toFixed(3)})`);
  return a;
};
const ALPHA_STEPS = 24;
const alphaIndex = (a: number) =>
  a <= 0 ? 0 : a >= 1 ? ALPHA_STEPS : Math.round(a * ALPHA_STEPS);

interface Ring {
  r: number;
  tiltX: number;
  tiltZ: number;
  speed: number;
  rgb: string;
}

const RINGS: Ring[] = [
  { r: 1.3, tiltX: 1.15, tiltZ: 0.35, speed: 0.42, rgb: CYAN },
  { r: 1.62, tiltX: 0.8, tiltZ: -0.62, speed: -0.3, rgb: GOLD },
];

const createState = () => ({
  n: 0,
  pts: new Float32Array(N_MAX * 3),
  px: new Float32Array(N_MAX),
  py: new Float32Array(N_MAX),
  pz: new Float32Array(N_MAX),
  pf: new Float32Array(N_MAX),
  boost: new Float32Array(N_MAX),
  gold: new Float32Array(N_MAX),
  bucket: new Uint8Array(N_MAX),
  // Thread head position and tangent direction on the unit sphere.
  head: new Float32Array([0, 0, 1]),
  dir: new Float32Array([1, 0, 0]),
  trail: new Float32Array(TRAIL * 3),
  trailLen: 0,
  trailPos: 0,
  trailAcc: 0,
  // Bursts: point index, birth time.
  burstIdx: new Int32Array(BURSTS).fill(-1),
  burstBorn: new Float32Array(BURSTS),
  burstNext: 0,
  // Gold pulses: origin on the sphere and birth time.
  pulseOrigin: new Float32Array(PULSES * 3),
  pulseBorn: new Float32Array(PULSES).fill(-99),
  pulseNext: 2.5,
  pulseCursor: 0,
  mouse: { x: 0, y: 0 },
  tilt: { x: 0, y: 0 },
  shift: { x: 0, y: 0 },
  primed: false,
  v: new Float32Array(3),
  tables: {
    base: makeAlphaTable(BASE, ALPHA_STEPS, 1),
    white: makeAlphaTable(WHITE, ALPHA_STEPS, 1),
    mint: makeAlphaTable(MINT, ALPHA_STEPS, 1),
    gold: makeAlphaTable(GOLD, ALPHA_STEPS, 1),
    cyan: makeAlphaTable(CYAN, ALPHA_STEPS, 1),
  },
});

type SphereState = ReturnType<typeof createState>;

const buildPoints = (s: SphereState, n: number) => {
  s.n = n;
  for (let i = 0; i < n; i++) {
    const y = 1 - (2 * (i + 0.5)) / n;
    const r = Math.sqrt(1 - y * y);
    const th = i * GOLDEN;
    s.pts[i * 3] = Math.cos(th) * r;
    s.pts[i * 3 + 1] = y;
    s.pts[i * 3 + 2] = Math.sin(th) * r;
  }
  s.boost.fill(0);
  s.gold.fill(0);
  s.burstIdx.fill(-1);
};

/** Move the thread head along the sphere surface, wandering as it goes. */
const stepThread = (s: SphereState, dt: number, t: number) => {
  const h = s.head;
  const d = s.dir;
  // Turn the tangent around the normal: slow drift plus a faster wobble.
  // Kept well below the travel speed so the path meanders instead of looping.
  const turn =
    dt *
    (0.42 * Math.sin(t * 0.23) +
      0.28 * Math.sin(t * 0.61 + 2.0) +
      0.14 * Math.sin(t * 1.7 + 0.7));
  const ct = Math.cos(turn);
  const st = Math.sin(turn);
  // Rodrigues rotation of d around h (h and d are orthonormal).
  const cx = h[1] * d[2] - h[2] * d[1];
  const cy = h[2] * d[0] - h[0] * d[2];
  const cz = h[0] * d[1] - h[1] * d[0];
  d[0] = d[0] * ct + cx * st;
  d[1] = d[1] * ct + cy * st;
  d[2] = d[2] * ct + cz * st;

  const speed = 0.55 * dt;
  h[0] += d[0] * speed;
  h[1] += d[1] * speed;
  h[2] += d[2] * speed;
  let len = Math.hypot(h[0], h[1], h[2]) || 1;
  h[0] /= len;
  h[1] /= len;
  h[2] /= len;
  // Re-project the tangent so it stays on the surface.
  const dot = d[0] * h[0] + d[1] * h[1] + d[2] * h[2];
  d[0] -= dot * h[0];
  d[1] -= dot * h[1];
  d[2] -= dot * h[2];
  len = Math.hypot(d[0], d[1], d[2]) || 1;
  d[0] /= len;
  d[1] /= len;
  d[2] /= len;

  // Record into the ring buffer at a fixed spatial cadence.
  s.trailAcc += speed;
  if (s.trailAcc > 0.012) {
    s.trailAcc = 0;
    const p = s.trailPos * 3;
    s.trail[p] = h[0];
    s.trail[p + 1] = h[1];
    s.trail[p + 2] = h[2];
    s.trailPos = (s.trailPos + 1) % TRAIL;
    if (s.trailLen < TRAIL) s.trailLen++;
  }
};

/**
 * Rotating point sphere with a mint thread of experience winding across its
 * surface, depth fog, two orbit rings, gold pulses and mouse parallax.
 */
export const HeroSphere: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
  const state = React.useRef<SphereState | null>(null);
  if (!state.current) state.current = createState();

  React.useEffect(() => {
    const m = state.current!.mouse;
    const onMove = (e: PointerEvent) => {
      m.x = (e.clientX / window.innerWidth) * 2 - 1;
      m.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const onResize = React.useCallback((w: number, h: number) => {
    const s = state.current!;
    const n = Math.round(Math.min(N_MAX, Math.max(N_MIN, (w * h) / 320)));
    if (n !== s.n) buildPoints(s, n);
  }, []);

  const draw = React.useCallback(
    ({ ctx, w, h, t, dt }: CanvasFrame) => {
      const s = state.current!;
      if (s.n === 0) onResize(w, h);
      // Under reduced motion dt is 0, so pre-roll once to give the thread a trail.
      if (!s.primed) {
        s.primed = true;
        for (let i = 0; i < 420; i++) stepThread(s, 1 / 60, i / 60);
      }

      const k = Math.min(1, dt * 2.2);
      s.tilt.x += (s.mouse.y * 0.26 - s.tilt.x) * k;
      s.tilt.y += (s.mouse.x * 0.42 - s.tilt.y) * k;
      s.shift.x += (s.mouse.x * w * 0.018 - s.shift.x) * k;
      s.shift.y += (s.mouse.y * h * 0.018 - s.shift.y) * k;

      const cx = w * 0.5 + s.shift.x;
      const cy = h * 0.5 + s.shift.y;
      const R = Math.min(w, h) * 0.34;
      const yaw = t * 0.09 + s.tilt.y;
      const pitch = 0.36 + s.tilt.x;
      const cyaw = Math.cos(yaw);
      const syaw = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const ryaw = yaw * 0.5;
      const cry = Math.cos(ryaw);
      const sry = Math.sin(ryaw);
      const v = s.v;
      const tb = s.tables;
      const n = s.n;

      // Core glow.
      const g = ctx.createRadialGradient(cx, cy, R * 0.05, cx, cy, R * 1.9);
      g.addColorStop(0, `rgba(${CYAN},${0.12 * opacity})`);
      g.addColorStop(0.4, `rgba(${MINT},${0.05 * opacity})`);
      g.addColorStop(1, "rgba(5,6,10,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Simulation.
      if (dt > 0) {
        stepThread(s, dt, t);
        // Gold pulses: occasional, spreading from a random point on the sphere.
        if (t > s.pulseNext) {
          const i = s.pulseCursor;
          s.pulseCursor = (i + 1) % PULSES;
          const src = Math.floor(Math.random() * n) * 3;
          s.pulseOrigin[i * 3] = s.pts[src];
          s.pulseOrigin[i * 3 + 1] = s.pts[src + 1];
          s.pulseOrigin[i * 3 + 2] = s.pts[src + 2];
          s.pulseBorn[i] = t;
          s.pulseNext = t + 5 + Math.random() * 5;
        }
      }
      const decay = Math.exp(-dt * 1.6);
      const goldDecay = Math.exp(-dt * 7);
      const hx = s.head[0];
      const hy = s.head[1];
      const hz = s.head[2];
      const NEAR = 0.9975; // cos of the thread's reach.

      // Project points, decay boosts, light up points the thread passes.
      for (let i = 0; i < n; i++) {
        const x = s.pts[i * 3];
        const y = s.pts[i * 3 + 1];
        const z = s.pts[i * 3 + 2];
        let b = s.boost[i] * decay;
        if (dt > 0 && x * hx + y * hy + z * hz > NEAR && b < 0.35) {
          b = 1;
          const bi = s.burstNext;
          s.burstNext = (bi + 1) % BURSTS;
          s.burstIdx[bi] = i;
          s.burstBorn[bi] = t;
        }
        s.boost[i] = b;
        let gd = s.gold[i] * goldDecay;
        for (let p = 0; p < PULSES; p++) {
          const age = t - s.pulseBorn[p];
          if (age < 0 || age > 2.4) continue;
          const ox = s.pulseOrigin[p * 3];
          const oy = s.pulseOrigin[p * 3 + 1];
          const oz = s.pulseOrigin[p * 3 + 2];
          // Band of angular distance around the expanding front.
          const front = age * 1.3;
          const ang = Math.acos(Math.max(-1, Math.min(1, x * ox + y * oy + z * oz)));
          const dist = Math.abs(ang - front);
          if (dist < 0.09) {
            const amp = (1 - dist / 0.09) * (1 - age / 2.4) * 0.7;
            if (amp > gd) gd = amp;
          }
        }
        s.gold[i] = gd;

        rotate(v, x, y, z, cyaw, syaw, cp, sp);
        const f = CAM / (CAM - v[2]);
        s.px[i] = cx + v[0] * R * f;
        s.py[i] = cy + v[1] * R * f;
        const d = (v[2] + 1) * 0.5;
        s.pz[i] = d;
        s.pf[i] = f;
        s.bucket[i] = Math.min(BUCKETS - 1, (d * BUCKETS) | 0);
      }

      // Back rings.
      drawRing(ctx, RINGS[0], false, cx, cy, R, cry, sry, cp, sp, v, opacity);
      drawRing(ctx, RINGS[1], false, cx, cy, R, cry, sry, cp, sp, v, opacity);

      // Back half of the thread.
      drawTrail(ctx, s, false, cx, cy, R, cyaw, syaw, cp, sp, opacity);

      // Points, batched by depth bucket. Fog: far points are dim and small.
      for (let bk = 0; bk < BUCKETS; bk++) {
        const d = (bk + 0.5) / BUCKETS;
        const fog = d * d * d;
        const alpha = (0.05 + 0.8 * fog) * opacity;
        ctx.fillStyle = d > 0.78 ? tb.white[alphaIndex(alpha)] : tb.base[alphaIndex(alpha)];
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          if (s.bucket[i] !== bk || s.boost[i] > 0.04 || s.gold[i] > 0.04) continue;
          const r = (0.35 + 1.35 * d) * s.pf[i];
          ctx.moveTo(s.px[i] + r, s.py[i]);
          ctx.arc(s.px[i], s.py[i], r, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // Lit points: mint where the thread passed, gold where a pulse is.
      for (let pass = 0; pass < 2; pass++) {
        const table = pass === 0 ? tb.mint : tb.gold;
        for (let bk = 0; bk < BUCKETS; bk++) {
          const d = (bk + 0.5) / BUCKETS;
          ctx.fillStyle = table[alphaIndex((0.25 + 0.75 * d) * opacity)];
          ctx.beginPath();
          let any = false;
          for (let i = 0; i < n; i++) {
            if (s.bucket[i] !== bk) continue;
            const b = pass === 0 ? s.boost[i] : s.gold[i];
            if (b <= 0.04 || (pass === 0 && s.gold[i] > s.boost[i])) continue;
            if (pass === 1 && s.gold[i] <= s.boost[i]) continue;
            any = true;
            const r = (0.35 + 1.35 * d + b * (pass === 0 ? 2.2 : 1.2)) * s.pf[i];
            ctx.moveTo(s.px[i] + r, s.py[i]);
            ctx.arc(s.px[i], s.py[i], r, 0, Math.PI * 2);
          }
          if (any) ctx.fill();
        }
      }

      // Bursts: a small expanding ring where the thread touched a point.
      ctx.lineWidth = 1;
      for (let i = 0; i < BURSTS; i++) {
        const idx = s.burstIdx[i];
        if (idx < 0 || idx >= n) continue;
        const age = (t - s.burstBorn[i]) / 1.1;
        // Negative ages happen when the loop clock restarts (hot reload); drop them.
        if (age < 0 || age >= 1) continue;
        const depth = s.pz[idx];
        ctx.strokeStyle = tb.mint[alphaIndex((1 - age) * (0.15 + 0.6 * depth) * opacity)];
        ctx.beginPath();
        ctx.arc(s.px[idx], s.py[idx], 2 + age * 14 * s.pf[idx], 0, Math.PI * 2);
        ctx.stroke();
      }

      // Front half of the thread and its head.
      drawTrail(ctx, s, true, cx, cy, R, cyaw, syaw, cp, sp, opacity);
      rotate(v, hx, hy, hz, cyaw, syaw, cp, sp);
      {
        const f = CAM / (CAM - v[2]);
        const sx = cx + v[0] * R * f;
        const sy = cy + v[1] * R * f;
        const depth = (v[2] + 1) * 0.5;
        const a = (0.3 + 0.7 * depth) * opacity;
        const gr = ctx.createRadialGradient(sx, sy, 0, sx, sy, 22);
        gr.addColorStop(0, `rgba(${MINT},${0.8 * a})`);
        gr.addColorStop(1, `rgba(${MINT},0)`);
        ctx.fillStyle = gr;
        ctx.fillRect(sx - 22, sy - 22, 44, 44);
        ctx.fillStyle = tb.white[alphaIndex(a)];
        ctx.beginPath();
        ctx.arc(sx, sy, 2.4 * f, 0, Math.PI * 2);
        ctx.fill();
      }

      // Front rings and their runners.
      drawRing(ctx, RINGS[0], true, cx, cy, R, cry, sry, cp, sp, v, opacity);
      drawRing(ctx, RINGS[1], true, cx, cy, R, cry, sry, cp, sp, v, opacity);
      drawRunner(ctx, RINGS[0], t, cx, cy, R, cry, sry, cp, sp, v, opacity, tb.white);
      drawRunner(ctx, RINGS[1], t, cx, cy, R, cry, sry, cp, sp, v, opacity, tb.white);
    },
    [opacity, onResize],
  );

  const canvasRef = useCanvasLoop(draw, onResize);

  return (
    <Box position="absolute" inset="0" overflow="hidden" pointerEvents="none" aria-hidden="true">
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      />
    </Box>
  );
};

/** Draws the half of the trail on the given side of the sphere in fading chunks. */
function drawTrail(
  ctx: CanvasRenderingContext2D,
  s: SphereState,
  front: boolean,
  cx: number,
  cy: number,
  R: number,
  cyaw: number,
  syaw: number,
  cp: number,
  sp: number,
  opacity: number,
) {
  const len = s.trailLen;
  if (len < 2) return;
  const v = s.v;
  const CHUNK = 10;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  let lx = 0;
  let ly = 0;
  let lz = 0;
  let open = false;
  let count = 0;
  for (let k = 0; k < len; k++) {
    // Oldest first.
    const idx = ((s.trailPos - len + k) % TRAIL + TRAIL) % TRAIL;
    rotate(v, s.trail[idx * 3], s.trail[idx * 3 + 1], s.trail[idx * 3 + 2], cyaw, syaw, cp, sp);
    const f = CAM / (CAM - v[2]);
    const sx = cx + v[0] * R * f;
    const sy = cy + v[1] * R * f;
    if (k > 0 && ((lz + v[2]) > 0) === front) {
      if (count % CHUNK === 0) {
        if (open) ctx.stroke();
        const age = k / len; // 0 oldest, 1 newest
        const depth = (v[2] + 1) * 0.5;
        const a = age * age * (front ? 0.35 + 0.65 * depth : 0.18) * opacity;
        ctx.strokeStyle = s.tables.mint[alphaIndex(a)];
        ctx.lineWidth = (0.6 + 1.9 * age) * f;
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        open = true;
      }
      ctx.lineTo(sx, sy);
      count++;
    } else if (open) {
      ctx.stroke();
      open = false;
      count = 0;
    }
    lx = sx;
    ly = sy;
    lz = v[2];
  }
  if (open) ctx.stroke();
}

function drawRing(
  ctx: CanvasRenderingContext2D,
  ring: Ring,
  front: boolean,
  cx: number,
  cy: number,
  R: number,
  cry: number,
  sry: number,
  cp: number,
  sp: number,
  v: Float32Array,
  opacity: number,
) {
  const SEG = 120;
  const ct = Math.cos(ring.tiltX);
  const st = Math.sin(ring.tiltX);
  const cz = Math.cos(ring.tiltZ);
  const sz = Math.sin(ring.tiltZ);
  let lx = 0;
  let ly = 0;
  let lz = 0;
  let open = false;
  ctx.lineWidth = 1;
  ctx.strokeStyle = `rgba(${ring.rgb},${(front ? 0.34 : 0.1) * opacity})`;
  ctx.beginPath();
  for (let i = 0; i <= SEG; i++) {
    const a = (i / SEG) * Math.PI * 2;
    const x0 = Math.cos(a) * ring.r;
    const z0 = Math.sin(a) * ring.r;
    const y1 = -z0 * st;
    const z1 = z0 * ct;
    rotate(v, x0 * cz - y1 * sz, x0 * sz + y1 * cz, z1, cry, sry, cp, sp);
    const f = CAM / (CAM - v[2]);
    const sx = cx + v[0] * R * f;
    const sy = cy + v[1] * R * f;
    if (i > 0 && (lz + v[2] > 0) === front) {
      if (!open) {
        ctx.moveTo(lx, ly);
        open = true;
      }
      ctx.lineTo(sx, sy);
    } else {
      open = false;
    }
    lx = sx;
    ly = sy;
    lz = v[2];
  }
  ctx.stroke();
}

function drawRunner(
  ctx: CanvasRenderingContext2D,
  ring: Ring,
  t: number,
  cx: number,
  cy: number,
  R: number,
  cry: number,
  sry: number,
  cp: number,
  sp: number,
  v: Float32Array,
  opacity: number,
  white: string[],
) {
  const ct = Math.cos(ring.tiltX);
  const st = Math.sin(ring.tiltX);
  const cz = Math.cos(ring.tiltZ);
  const sz = Math.sin(ring.tiltZ);
  const TAIL = 14;
  for (let tr = 0; tr < TAIL; tr++) {
    const a = t * ring.speed - tr * 0.04 * Math.sign(ring.speed);
    const x0 = Math.cos(a) * ring.r;
    const z0 = Math.sin(a) * ring.r;
    const y1 = -z0 * st;
    const z1 = z0 * ct;
    rotate(v, x0 * cz - y1 * sz, x0 * sz + y1 * cz, z1, cry, sry, cp, sp);
    const f = CAM / (CAM - v[2]);
    const sx = cx + v[0] * R * f;
    const sy = cy + v[1] * R * f;
    const fade = 1 - tr / TAIL;
    if (tr === 0) {
      const gr = ctx.createRadialGradient(sx, sy, 0, sx, sy, 16);
      gr.addColorStop(0, `rgba(${ring.rgb},${0.9 * opacity})`);
      gr.addColorStop(1, `rgba(${ring.rgb},0)`);
      ctx.fillStyle = gr;
      ctx.fillRect(sx - 16, sy - 16, 32, 32);
    }
    ctx.fillStyle = white[alphaIndex(0.9 * fade * opacity)];
    ctx.beginPath();
    ctx.arc(sx, sy, 2.1 * fade * f, 0, Math.PI * 2);
    ctx.fill();
  }
}
