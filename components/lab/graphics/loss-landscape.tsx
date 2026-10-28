import * as React from "react";
import { Box } from "@chakra-ui/react";
import { CanvasFrame, useCanvasLoop } from "./use-canvas-loop";
import { toCssSize } from "./use-svg-motion";

export interface SceneOptions {
  /** Opacity multiplier. */
  intensity?: number;
}

const MONO = '"D-DIN", "DIN Alternate", ui-monospace, monospace';

// Marching squares edge pairs per case (edges: 0 top, 1 right, 2 bottom, 3 left).
const SEGS: number[][][] = [
  [], [[3, 2]], [[2, 1]], [[3, 1]], [[0, 1]], [[0, 1], [3, 2]], [[0, 2]], [[0, 3]],
  [[0, 3]], [[0, 2]], [[0, 3], [1, 2]], [[0, 1]], [[3, 1]], [[2, 1]], [[3, 2]], [],
];

const WELLS = [
  { x: 0.25, y: 0.38, a: 1.3, s: 0.55, fx: 0.11, fy: 0.07, p: 0 },
  { x: 0.7, y: 0.62, a: 1.6, s: 0.7, fx: 0.08, fy: 0.12, p: 1.7 },
  { x: 0.5, y: 0.15, a: 0.8, s: 0.4, fx: 0.13, fy: 0.09, p: 3.1 },
  { x: 0.86, y: 0.22, a: 0.9, s: 0.45, fx: 0.07, fy: 0.1, p: 4.4 },
  { x: 0.14, y: 0.82, a: 1.0, s: 0.5, fx: 0.1, fy: 0.06, p: 5.2 },
];

const LEVEL_MIN = -2.1;
const LEVEL_STEP = 0.11;
const LEVELS = 22;

/** Isolines of a slowly morphing loss surface, with an optimiser descending it. */
export const createLossScene = ({ intensity = 1 }: SceneOptions = {}) => {
  let W = 1;
  let H = 1;
  let cols = 0;
  let rows = 0;
  let cell = 12;
  let S = 400;
  let grid = new Float32Array(0);
  let trail: { x: number; y: number }[] = [];
  const opt = { x: 0, y: 0, vx: 0, vy: 0, age: 0, still: 0, fade: 0, dying: false };

  const field = (px: number, py: number, t: number) => {
    const u = px / S;
    const v = py / S;
    const ux = W / S;
    const uy = H / S;
    let f = 0;
    for (const w of WELLS) {
      const cx = ux * (w.x + 0.07 * Math.sin(t * w.fx + w.p));
      const cy = uy * (w.y + 0.07 * Math.cos(t * w.fy + w.p));
      const d2 = (u - cx) * (u - cx) + (v - cy) * (v - cy);
      f -= w.a * Math.exp(-d2 / (2 * w.s * w.s * 0.6));
    }
    f += 0.18 * Math.sin(2.1 * u + 0.12 * t) * Math.sin(1.7 * v - 0.09 * t);
    f += 0.07 * Math.sin(5 * u + v + 0.2 * t) * Math.cos(3.4 * v - 0.15 * t);
    return f;
  };

  const seed = (t: number) => {
    let bx = W * 0.5;
    let by = H * 0.5;
    let bf = -9;
    for (let i = 0; i < 6; i++) {
      const x = W * (0.08 + Math.random() * 0.84);
      const y = H * (0.1 + Math.random() * 0.8);
      const f = field(x, y, t);
      if (f > bf) {
        bf = f;
        bx = x;
        by = y;
      }
    }
    opt.x = bx;
    opt.y = by;
    opt.vx = 0;
    opt.vy = 0;
    opt.age = 0;
    opt.still = 0;
    opt.dying = false;
    trail = [];
  };

  const step = (dt: number, t: number) => {
    const e = 1.5;
    const gx = (field(opt.x + e, opt.y, t) - field(opt.x - e, opt.y, t)) / (2 * e);
    const gy = (field(opt.x, opt.y + e, t) - field(opt.x, opt.y - e, t)) / (2 * e);
    const g = Math.hypot(gx, gy) + 1e-6;
    const speed = Math.min(130, Math.max(4, 9000 * g));
    const k = 1 - Math.exp(-dt * 4);
    opt.vx += ((-gx / g) * speed - opt.vx) * k;
    opt.vy += ((-gy / g) * speed - opt.vy) * k;
    opt.x += opt.vx * dt;
    opt.y += opt.vy * dt;
    opt.age += dt;
    opt.still = speed < 14 ? opt.still + dt : 0;
    trail.push({ x: opt.x, y: opt.y });
    if (trail.length > 90) trail.shift();
    if (opt.still > 1.4 || opt.age > 18 || opt.x < -20 || opt.x > W + 20 || opt.y < -20 || opt.y > H + 20) {
      opt.dying = true;
    }
  };

  const resize = (w: number, h: number) => {
    W = w;
    H = h;
    S = Math.max(w, h) / 2.6;
    cell = Math.max(9, Math.round(Math.max(w, h) / 120));
    cols = Math.ceil(w / cell) + 1;
    rows = Math.ceil(h / cell) + 1;
    grid = new Float32Array(cols * rows);
    seed(4);
    opt.fade = 1;
    for (let i = 0; i < 140; i++) step(1 / 30, 4);
  };

  const draw = ({ ctx, t, dt }: CanvasFrame) => {
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) grid[j * cols + i] = field(i * cell, j * cell, t);
    }

    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    for (let li = 0; li < LEVELS; li++) {
      const lv = LEVEL_MIN + li * LEVEL_STEP;
      const major = li % 5 === 0;
      const k = li / (LEVELS - 1);
      // Deep levels run mint, shallow levels fade to a cool white.
      const r = Math.round(94 + (200 - 94) * k);
      const g = Math.round(242 + (225 - 242) * k);
      const b = Math.round(196 + (255 - 196) * k);
      ctx.strokeStyle = `rgba(${r},${g},${b},${(major ? 0.7 : 0.3) * intensity})`;
      ctx.beginPath();
      for (let j = 0; j < rows - 1; j++) {
        for (let i = 0; i < cols - 1; i++) {
          const tl = grid[j * cols + i];
          const tr = grid[j * cols + i + 1];
          const br = grid[(j + 1) * cols + i + 1];
          const bl = grid[(j + 1) * cols + i];
          const c = (tl >= lv ? 8 : 0) | (tr >= lv ? 4 : 0) | (br >= lv ? 2 : 0) | (bl >= lv ? 1 : 0);
          if (c === 0 || c === 15) continue;
          const x0 = i * cell;
          const y0 = j * cell;
          for (const [ea, eb] of SEGS[c]) {
            const p = [ea, eb].map((e) => {
              if (e === 0) return [x0 + ((lv - tl) / (tr - tl)) * cell, y0];
              if (e === 1) return [x0 + cell, y0 + ((lv - tr) / (br - tr)) * cell];
              if (e === 2) return [x0 + ((lv - bl) / (br - bl)) * cell, y0 + cell];
              return [x0, y0 + ((lv - tl) / (bl - tl)) * cell];
            });
            ctx.moveTo(p[0][0], p[0][1]);
            ctx.lineTo(p[1][0], p[1][1]);
          }
        }
      }
      ctx.stroke();
    }

    // Optimiser.
    if (dt > 0) {
      if (opt.dying) {
        opt.fade -= dt * 1.2;
        if (opt.fade <= 0) {
          seed(t);
          opt.fade = 0;
        }
      } else if (opt.fade < 1) {
        opt.fade = Math.min(1, opt.fade + dt * 1.2);
      }
      step(dt, t);
    }
    const a = Math.max(0, opt.fade) * intensity;
    for (let i = 1; i < trail.length; i++) {
      const k = i / trail.length;
      ctx.strokeStyle = `rgba(142,227,255,${k * 0.55 * a})`;
      ctx.lineWidth = 1 + k;
      ctx.beginPath();
      ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
      ctx.lineTo(trail[i].x, trail[i].y);
      ctx.stroke();
    }
    const glow = ctx.createRadialGradient(opt.x, opt.y, 0, opt.x, opt.y, 22);
    glow.addColorStop(0, `rgba(142,227,255,${0.55 * a})`);
    glow.addColorStop(1, "rgba(142,227,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(opt.x - 22, opt.y - 22, 44, 44);
    ctx.fillStyle = `rgba(235,250,255,${0.95 * a})`;
    ctx.beginPath();
    ctx.arc(opt.x, opt.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `rgba(142,227,255,${0.5 * a})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(opt.x, opt.y, 9, 0, Math.PI * 2);
    ctx.stroke();
    ctx.font = `10px ${MONO}`;
    ctx.fillStyle = `rgba(142,227,255,${0.55 * a})`;
    ctx.fillText("θ", opt.x + 14, opt.y - 10);
  };

  return { resize, draw };
};

/** Loss-landscape isolines with an optimiser descending, for cards and panels. */
export const LossLandscape: React.FC<{ size?: number | string }> = ({ size }) => {
  const scene = React.useMemo(() => createLossScene(), []);
  const ref = useCanvasLoop(scene.draw, scene.resize);
  return (
    <Box
      position="relative"
      w={toCssSize(size)}
      maxW="100%"
      overflow="hidden"
      pointerEvents="none"
      aria-hidden="true"
      sx={{ aspectRatio: "16 / 10" }}
    >
      <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
    </Box>
  );
};
