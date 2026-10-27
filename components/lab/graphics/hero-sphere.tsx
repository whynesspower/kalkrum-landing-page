import * as React from "react";
import { Box } from "@chakra-ui/react";
import { CanvasFrame, useCanvasLoop } from "./use-canvas-loop";

const N = 900;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const CYAN = "142,227,255";
const VIOLET = "161,139,255";
const BASE = "205,222,255";

interface Pulse {
  idx: number;
  born: number;
  violet: boolean;
}

interface Ring {
  r: number;
  tiltX: number;
  tiltZ: number;
  speed: number;
  rgb: string;
}

const RINGS: Ring[] = [
  { r: 1.32, tiltX: 1.2, tiltZ: 0.35, speed: 0.55, rgb: CYAN },
  { r: 1.62, tiltX: 0.82, tiltZ: -0.6, speed: -0.38, rgb: VIOLET },
];

/** Rotate by yaw (around Y) then pitch (around X). Returns [x, y, z]. */
const rotate = (
  out: number[],
  x: number,
  y: number,
  z: number,
  yaw: number,
  cp: number,
  sp: number,
) => {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;
  out[0] = x1;
  out[1] = y * cp - z1 * sp;
  out[2] = y * sp + z1 * cp;
};

/** Rotating fibonacci point sphere with orbit rings and data pulses. */
export const HeroSphere: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
  const state = React.useRef({
    // Unit-sphere points, flat xyz.
    pts: (() => {
      const a = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        const y = 1 - (2 * (i + 0.5)) / N;
        const r = Math.sqrt(1 - y * y);
        const th = i * GOLDEN;
        a[i * 3] = Math.cos(th) * r;
        a[i * 3 + 1] = y;
        a[i * 3 + 2] = Math.sin(th) * r;
      }
      return a;
    })(),
    px: new Float32Array(N),
    py: new Float32Array(N),
    pd: new Float32Array(N),
    boost: new Float32Array(N),
    violet: new Uint8Array(N),
    pulses: [] as Pulse[],
    nextPulse: 0.4,
    mouse: { x: 0, y: 0 },
    tilt: { x: 0, y: 0 },
  });

  React.useEffect(() => {
    const m = state.current.mouse;
    const onMove = (e: PointerEvent) => {
      m.x = (e.clientX / window.innerWidth) * 2 - 1;
      m.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const canvasRef = useCanvasLoop(({ ctx, w, h, t, dt }: CanvasFrame) => {
    const s = state.current;
    const cx = w * 0.5;
    const cy = h * 0.5;
    const R = Math.min(w, h) * 0.34;
    const k = Math.min(1, dt * 2.5);
    s.tilt.x += (s.mouse.y * 0.3 - s.tilt.x) * k;
    s.tilt.y += (s.mouse.x * 0.5 - s.tilt.y) * k;
    const yaw = t * 0.1 + s.tilt.y;
    const pitch = 0.38 + s.tilt.x;
    const cp = Math.cos(pitch);
    const sp = Math.sin(pitch);
    const v = [0, 0, 0];
    const proj = (z: number) => 3.2 / (3.2 - z);

    // Soft core glow.
    const g = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.9);
    g.addColorStop(0, `rgba(${CYAN},${0.1 * opacity})`);
    g.addColorStop(0.45, `rgba(${VIOLET},${0.05 * opacity})`);
    g.addColorStop(1, "rgba(5,6,10,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // Pulses: spawn, age, and add brightness to a short run of neighbours.
    if (t > s.nextPulse) {
      s.pulses.push({ idx: Math.floor(Math.random() * N), born: t, violet: Math.random() < 0.4 });
      s.nextPulse = t + 0.25 + Math.random() * 0.5;
    }
    s.pulses = s.pulses.filter((p) => t - p.born < 2);
    s.boost.fill(0);
    for (const p of s.pulses) {
      const a = (t - p.born) / 2;
      for (let d = -5; d <= 5; d++) {
        const i = p.idx + d;
        if (i < 0 || i >= N) continue;
        const b = (1 - a) * (1 - Math.abs(d) / 6);
        if (b > s.boost[i]) {
          s.boost[i] = b;
          s.violet[i] = p.violet ? 1 : 0;
        }
      }
    }

    // Back rings first, then points, then front rings.
    const drawRing = (ring: Ring, front: boolean) => {
      const SEG = 96;
      const ct = Math.cos(ring.tiltX);
      const st = Math.sin(ring.tiltX);
      const cz = Math.cos(ring.tiltZ);
      const sz = Math.sin(ring.tiltZ);
      let lx = 0;
      let ly = 0;
      let lz = 0;
      ctx.lineWidth = 1;
      for (let i = 0; i <= SEG; i++) {
        const a = (i / SEG) * Math.PI * 2;
        let x = Math.cos(a) * ring.r;
        let y = 0;
        let z = Math.sin(a) * ring.r;
        const y1 = y * ct - z * st;
        const z1 = y * st + z * ct;
        y = y1;
        z = z1;
        const x2 = x * cz - y * sz;
        const y2 = x * sz + y * cz;
        x = x2;
        y = y2;
        rotate(v, x, y, z, yaw * 0.5, cp, sp);
        const f = proj(v[2]);
        const sx = cx + v[0] * R * f;
        const sy = cy + v[1] * R * f;
        if (i > 0 && lz + v[2] > 0 === front) {
          const d = (lz + v[2]) / 4 + 0.5;
          ctx.strokeStyle = `rgba(${ring.rgb},${(0.08 + 0.32 * d) * opacity})`;
          ctx.beginPath();
          ctx.moveTo(lx, ly);
          ctx.lineTo(sx, sy);
          ctx.stroke();
        }
        lx = sx;
        ly = sy;
        lz = v[2];
      }
    };

    const drawRingDot = (ring: Ring) => {
      const ct = Math.cos(ring.tiltX);
      const st = Math.sin(ring.tiltX);
      const cz = Math.cos(ring.tiltZ);
      const sz = Math.sin(ring.tiltZ);
      for (let tr = 0; tr < 12; tr++) {
        const a = t * ring.speed - tr * 0.045 * Math.sign(ring.speed);
        const x0 = Math.cos(a) * ring.r;
        const z0 = Math.sin(a) * ring.r;
        const y1 = -z0 * st;
        const z1 = z0 * ct;
        rotate(v, x0 * cz - y1 * sz, x0 * sz + y1 * cz, z1, yaw * 0.5, cp, sp);
        const f = proj(v[2]);
        const sx = cx + v[0] * R * f;
        const sy = cy + v[1] * R * f;
        const fade = 1 - tr / 12;
        if (tr === 0) {
          const gr = ctx.createRadialGradient(sx, sy, 0, sx, sy, 14);
          gr.addColorStop(0, `rgba(${ring.rgb},${0.9 * opacity})`);
          gr.addColorStop(1, `rgba(${ring.rgb},0)`);
          ctx.fillStyle = gr;
          ctx.fillRect(sx - 14, sy - 14, 28, 28);
        }
        ctx.fillStyle = `rgba(255,255,255,${0.9 * fade * opacity})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 2.2 * fade * f, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    for (const r of RINGS) drawRing(r, false);

    for (let i = 0; i < N; i++) {
      rotate(v, s.pts[i * 3], s.pts[i * 3 + 1], s.pts[i * 3 + 2], yaw, cp, sp);
      const f = proj(v[2]);
      s.px[i] = cx + v[0] * R * f;
      s.py[i] = cy + v[1] * R * f;
      const d = (v[2] + 1) / 2;
      s.pd[i] = d;
      const b = s.boost[i];
      const size = (0.45 + 1.25 * d) * f + b * 1.8;
      const alpha = (0.1 + 0.7 * d * d + b * 0.9) * opacity;
      ctx.fillStyle =
        b > 0.02
          ? `rgba(${s.violet[i] ? VIOLET : CYAN},${Math.min(1, alpha)})`
          : `rgba(${d > 0.7 ? "220,240,255" : BASE},${alpha})`;
      ctx.beginPath();
      ctx.arc(s.px[i], s.py[i], size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Expanding rings at pulse origins.
    for (const p of s.pulses) {
      const a = (t - p.born) / 2;
      const rgb = p.violet ? VIOLET : CYAN;
      ctx.strokeStyle = `rgba(${rgb},${(1 - a) * 0.6 * opacity * (0.3 + 0.7 * s.pd[p.idx])})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(s.px[p.idx], s.py[p.idx], 3 + a * 22, 0, Math.PI * 2);
      ctx.stroke();
    }

    for (const r of RINGS) drawRing(r, true);
    for (const r of RINGS) drawRingDot(r);
  });

  return (
    <Box position="absolute" inset="0" overflow="hidden" pointerEvents="none" aria-hidden="true">
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      />
    </Box>
  );
};
