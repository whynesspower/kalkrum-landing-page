import { z31 } from "@/content/plates";

const TAU = Math.PI * 2;
const f = (n: number) => n.toFixed(2);

/**
 * The 465 points of Z₄₆₅ on a circle. A cyclic (465, 145, 45) difference set would be a choice of 145 of them;
 * the centre gives the number of choices, C(465, 145), none of which works.
 */
export function RingPlate() {
  let d = "";
  for (let i = 0; i < 465; i++) {
    const a = (TAU * i) / 465 - Math.PI / 2;
    d += `M${f(200 + 150 * Math.cos(a))} ${f(200 + 150 * Math.sin(a))}L${f(200 + 168 * Math.cos(a))} ${f(200 + 168 * Math.sin(a))}`;
  }
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="A ring of 465 points, none of them chosen">
      <path d={d} stroke="currentColor" strokeWidth="0.7" opacity="0.8" fill="none" />
      <text x="200" y="213" textAnchor="middle" fontSize="40" letterSpacing="-1">
        8.3 × 10
        <tspan dy="-17" fontSize="22">
          123
        </tspan>
      </text>
    </svg>
  );
}

/**
 * One complete mapping of Z₃₁ on a 31 × 31 grid: a mark at (x, θ(x)) for every x.
 * Each row, each column and each wrapped diagonal holds exactly one mark.
 */
export function ConstellationPlate() {
  const n = z31.length;
  const step = 320 / (n - 1);
  const px = (x: number) => 40 + x * step;
  const py = (y: number) => 360 - y * step;
  let grid = "";
  for (let x = 0; x < n; x++) for (let y = 0; y < n; y++) grid += `M${f(px(x) - 0.9)} ${f(py(y) - 0.9)}h1.8v1.8h-1.8z`;
  const line = z31.map((t, x) => `${x ? "L" : "M"}${f(px(x))} ${f(py(t))}`).join("");
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="A 31 by 31 grid with one mark in every row, column and diagonal">
      <path d={grid} fill="currentColor" opacity="0.26" />
      <path d={line} fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
      {z31.map((t, x) => (
        <rect key={x} x={px(x) - 3.2} y={py(t) - 3.2} width="6.4" height="6.4" fill="currentColor" />
      ))}
    </svg>
  );
}

/** A window onto the order-2148 Hadamard matrix at two pixels an entry. */
export function MatrixDetail() {
  return (
    <div className="plate-art matrix-detail cine">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/plates/h2148.png" alt="" width={2148} height={2148} loading="lazy" decoding="async" />
    </div>
  );
}

/** A search space as a field of candidates, with the thin region where answers can be picked out. */
export function SearchSpace() {
  const n = 34;
  const step = 360 / n;
  let dim = "";
  let lit = "";
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      const x = (i + 0.5) * step;
      const y = (j + 0.5) * step;
      const curve = 180 - 118 * Math.sin((x - 180) / 78) - (x - 180) * 0.28;
      const cell = `M${f(x - 1.5)} ${f(y - 1.5)}h3v3h-3z`;
      if (Math.abs(y - curve) < step * 0.62) lit += cell;
      else dim += cell;
    }
  return (
    <svg viewBox="0 0 360 360" role="img" aria-label="A field of points with one thin curved band of them highlighted">
      <path d={dim} fill="currentColor" opacity="0.22" />
      <path d={lit} fill="var(--accent)" />
    </svg>
  );
}
