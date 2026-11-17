"use client";

import { useEffect, useRef } from "react";

/**
 * The hero picture: discoveries as stepping stones across open ground, towards first light.
 * Each stone is reached from stones already laid, and they arrive faster as they accumulate,
 * which is the whole thesis: every discovery makes the next one cheaper.
 * The nearest six are the fields where the system already has results. The rest are still ahead.
 */
const FIELDS = [
  "Combinatorial designs",
  "Integer sequences",
  "Coding theory",
  "Quantum error correction",
  "SAT and proof",
  "Physics and materials",
];
/** Where the first six stones sit: [position across the view from −1 to 1, distance]. */
const NEAR: [number, number][] = [
  [-0.62, 5.0],
  [0.4, 5.9],
  [-0.2, 7.0],
  [0.64, 8.4],
  [-0.72, 10.2],
  [0.16, 12.5],
];
const COUNT = 110;
const FOCAL = 1.3; // focal length in view heights, for an eye one unit above the ground
const GROW = 11; // seconds until every stone is lit
const RATE = 0.42; // how sharply arrivals accelerate
const CURVE = 0.034; // how far the ground falls away at the edges of the view, in view heights: the curve of a world
const STARS = 150;

type Stone = { u: number; z: number; at: number; parents: number[] };

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function layStones(): Stone[] {
  const rand = mulberry32(2026);
  const stones: Stone[] = [];
  const span = Math.exp(RATE * GROW) - 1;
  for (let i = 0; i < COUNT; i++) {
    let u: number;
    let z: number;
    if (i < NEAR.length) {
      [u, z] = NEAR[i];
    } else {
      const p = (i - NEAR.length) / (COUNT - NEAR.length - 1);
      z = 14 * Math.pow(170 / 14, p);
      u = (rand() * 2 - 1) * (0.92 - 0.74 * Math.pow(p, 0.8)); // paths draw together as they near the light
    }
    // Arrivals follow an exponential: few at first, then many.
    const at = 0.7 + Math.log(1 + (i / (COUNT - 1)) * span) / RATE;
    const parents: number[] = [];
    if (i > 0) {
      const from = Math.max(0, i - 9);
      const ranked = [];
      for (let j = from; j < i; j++) ranked.push({ j, d: Math.abs(stones[j].u - u) + rand() * 0.12 });
      ranked.sort((a, b) => a.d - b.d);
      parents.push(ranked[0].j);
      if (ranked.length > 1 && rand() < 0.4) parents.push(ranked[1].j);
    }
    stones.push({ u, z, at, parents });
  }
  return stones;
}

/** Full-bleed backdrop. Its parent sets --horizon (0–1, measured from the bottom) to place the horizon. */
export function Frontier({ labels = true }: { labels?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const stones = layStones();
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const family = getComputedStyle(document.body).fontFamily;
    const ground = document.createElement("canvas");
    const glow = document.createElement("canvas");
    let w = 0;
    let h = 0;
    let px = 1;
    let hy = 0;
    let raf = 0;
    let running = false;
    let clock = still ? 1e4 : 0;
    let last = 0;

    const sx = (u: number) => (w / 2) * (1 + u);
    const bend = (u: number) => CURVE * u * u * h;
    const sy = (z: number, u: number) => hy + (FOCAL / z) * h + bend(u);

    // The open ground: a lattice of faint points, drawn once per size.
    const paintGround = () => {
      ground.width = w;
      ground.height = h;
      const g = ground.getContext("2d")!;
      // The sky: a few fixed stars, thinning out towards the light.
      const rand = mulberry32(7);
      for (let i = 0; i < STARS; i++) {
        const x = rand() * w;
        const y = rand() * hy;
        const height = (hy + bend((2 * x) / w - 1) - y) / h;
        const a = (0.12 + 0.6 * Math.pow(rand(), 3)) * Math.min(1, Math.max(0, (height - 0.03) / 0.3));
        const size = (rand() < 0.12 ? 1.5 : 1) * px;
        g.fillStyle = `rgba(242, 244, 248, ${a})`;
        g.fillRect(x, y, size, size);
      }
      const step = 0.35;
      for (let z = 4.2; z < 17; z += step) {
        const dx = ((step * FOCAL) / z) * h;
        const size = Math.max(1, (5.2 / z) * 1.6) * px;
        g.fillStyle = `rgba(242, 244, 248, ${0.07 + 0.38 * Math.pow(1 - z / 17, 1.3)})`;
        for (let x = (w / 2) % dx; x < w; x += dx) {
          const y = sy(z, (2 * x) / w - 1);
          if (y < h + 4) g.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
    };

    // One soft disc of light, reused for every stone.
    const paintGlow = () => {
      glow.width = glow.height = 128;
      const g = glow.getContext("2d")!;
      const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(180, 236, 255, 0.95)");
      grad.addColorStop(0.18, "rgba(147, 228, 255, 0.55)");
      grad.addColorStop(0.5, "rgba(142, 227, 255, 0.14)");
      grad.addColorStop(1, "rgba(142, 227, 255, 0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, 128, 128);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(ground, 0, 0);

      let lit = 0;
      for (const s of stones) if (clock >= s.at) lit++;
      const reach = lit / COUNT;

      // First light gathers as the stones approach it.
      ctx.globalCompositeOperation = "lighter";
      ctx.save();
      ctx.translate(w / 2, hy);
      ctx.scale(1, (0.05 * h) / (0.42 * w));
      const bloom = ctx.createRadialGradient(0, 0, 0, 0, 0, 0.42 * w);
      bloom.addColorStop(0, `rgba(186, 237, 255, ${0.1 + 0.55 * reach})`);
      bloom.addColorStop(0.35, `rgba(144, 227, 255, ${0.05 + 0.2 * reach})`);
      bloom.addColorStop(1, "rgba(142, 227, 255, 0)");
      ctx.fillStyle = bloom;
      ctx.beginPath();
      ctx.arc(0, 0, 0.42 * w, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      // The horizon itself: one thin line, brightest where the paths meet.
      const line = ctx.createLinearGradient(0, 0, w, 0);
      line.addColorStop(0.08, "rgba(163, 232, 255, 0)");
      line.addColorStop(0.5, `rgba(197, 240, 255, ${0.25 + 0.6 * reach})`);
      line.addColorStop(0.92, "rgba(163, 232, 255, 0)");
      ctx.strokeStyle = line;
      ctx.lineWidth = px;
      ctx.beginPath();
      ctx.moveTo(0, hy + bend(1));
      ctx.quadraticCurveTo(w / 2, hy - bend(1), w, hy + bend(1));
      ctx.stroke();

      // Paths: each stone is reached from ones already laid.
      for (const s of stones) {
        if (!s.parents.length) continue;
        const x1 = sx(s.u);
        const y1 = sy(s.z, s.u);
        for (const j of s.parents) {
          const p = stones[j];
          const begin = Math.max(p.at, s.at - 0.75);
          const t = Math.min(1, (clock - begin) / Math.max(0.05, s.at - begin));
          if (t <= 0) continue;
          const x0 = sx(p.u);
          const y0 = sy(p.z, p.u);
          const depth = Math.min(1, 5 / s.z);
          ctx.strokeStyle = `rgba(153, 230, 255, ${0.16 + 0.34 * depth})`;
          ctx.lineWidth = (0.5 + 0.8 * depth) * px;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t);
          ctx.stroke();
          if (t >= 1) {
            // What was learned travels forward along the path.
            const k = (clock * 0.22 + (j * 0.37 + s.z * 0.11)) % 1;
            const r = (0.7 + 1.1 * depth) * px;
            ctx.fillStyle = `rgba(190, 238, 255, ${0.85 * Math.sin(Math.PI * k)})`;
            ctx.fillRect(x0 + (x1 - x0) * k - r, y0 + (y1 - y0) * k - r, 2 * r, 2 * r);
          }
        }
      }

      // The stones themselves, flat on the ground, each with its light.
      for (let i = 0; i < COUNT; i++) {
        const s = stones[i];
        const age = clock - s.at;
        if (age < 0) continue;
        const x = sx(s.u);
        const y = sy(s.z, s.u);
        const r = Math.max(1, Math.min(6.5, 30 / s.z)) * px;
        const flare = age < 1 ? 1 + 2.2 * (1 - age) * (1 - age) : 1 + 0.06 * Math.sin(clock * 0.9 + i);
        const g = r * 7 * flare;
        ctx.globalCompositeOperation = "lighter";
        ctx.drawImage(glow, x - g, y - g * 0.55, 2 * g, 1.1 * g);
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "#d6f4ff";
        ctx.beginPath();
        ctx.ellipse(x, y, r, Math.max(0.6 * px, r * 0.4), 0, 0, Math.PI * 2);
        ctx.fill();
        if (labels && i < FIELDS.length && w / px >= 760) {
          const right = s.u > 0.5;
          ctx.font = `${13 * px}px ${family}`;
          ctx.textAlign = right ? "right" : "left";
          ctx.fillStyle = `rgba(242, 244, 248, ${0.66 * Math.min(1, age / 0.9)})`;
          ctx.fillText(FIELDS[i], x + (right ? -1 : 1) * (r + 11 * px), y + 4.5 * px);
        }
      }
    };

    const resize = () => {
      px = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(canvas.clientWidth * px));
      h = Math.max(1, Math.round(canvas.clientHeight * px));
      canvas.width = w;
      canvas.height = h;
      const horizon = parseFloat(getComputedStyle(canvas).getPropertyValue("--horizon")) || 0.31;
      hy = (1 - horizon) * h;
      paintGround();
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

    paintGlow();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);
    resize();
    canvas.dataset.state = "ready";

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, [labels]);

  return <canvas ref={ref} className="plane" aria-hidden="true" />;
}
