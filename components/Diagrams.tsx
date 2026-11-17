/**
 * Figures for the approach page. Plain SVG, themed through CSS variables.
 */

/** Relative search effort per extra unit of weight: measured growth-rate bands, compounded. */
export function SearchGrowthChart() {
  const W = 560;
  const H = 320;
  const m = { l: 48, r: 16, t: 16, b: 40 };
  const steps = 6;
  const yMax = 6.4; // log10
  const x = (k: number) => m.l + (k / steps) * (W - m.l - m.r);
  const y = (log: number) => H - m.b - (log / yMax) * (H - m.t - m.b);

  const band = (lo: number, hi: number) => {
    const pts = 48;
    const top: string[] = [];
    const bot: string[] = [];
    for (let s = 0; s <= pts; s++) {
      const k = (s / pts) * steps;
      top.push(`${x(k).toFixed(1)},${y(k * Math.log10(hi)).toFixed(1)}`);
      bot.unshift(`${x(k).toFixed(1)},${y(k * Math.log10(lo)).toFixed(1)}`);
    }
    return `M${top.join("L")}L${bot.join("L")}Z`;
  };
  const line = (r: number) => {
    const pts: string[] = [];
    for (let s = 0; s <= 48; s++) {
      const k = (s / 48) * steps;
      pts.push(`${x(k).toFixed(1)},${y(k * Math.log10(r)).toFixed(1)}`);
    }
    return `M${pts.join("L")}`;
  };

  const yTicks = [
    [0, "1×"],
    [2, "100×"],
    [4, "10k×"],
    [6, "1M×"],
  ] as const;

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="growth-title growth-desc">
      <title id="growth-title">Search effort as the target distance grows</title>
      <desc id="growth-desc">
        Compounded per-step growth. KalKram engine: 4.9 to 5.4 times per extra unit of weight. Best published tool: 10 to 11
        times. After six steps the gap is roughly 25 to 130 times.
      </desc>
      {yTicks.map(([v, t]) => (
        <g key={v}>
          <line x1={m.l} x2={W - m.r} y1={y(v)} y2={y(v)} stroke="var(--rule)" />
          <text x={m.l - 10} y={y(v) + 3.5} textAnchor="end">
            {t}
          </text>
        </g>
      ))}
      {Array.from({ length: steps + 1 }, (_, k) => (
        <text key={k} x={x(k)} y={H - m.b + 20} textAnchor="middle">
          {k === 0 ? "w" : `+${k}`}
        </text>
      ))}
      <path d={band(10, 11)} fill="var(--ink)" opacity="0.14" />
      <path d={line(10.5)} fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      <path d={band(4.9, 5.4)} fill="var(--accent)" opacity="0.22" />
      <path d={line(5.15)} fill="none" stroke="var(--accent)" strokeWidth="2" />
      <text className="series-label" x={x(3.05)} y={y(3 * Math.log10(10.5)) - 14} textAnchor="end">
        Best published tool · 10–11× per step
      </text>
      <text className="series-label" x={x(4.1)} y={y(4 * Math.log10(5.15)) + 26} textAnchor="start">
        KalKram engine · 4.9–5.4× per step
      </text>
    </svg>
  );
}

const LOOP = [
  { k: "Optimise", sub: "pick the next bound to push", a: -90 },
  { k: "Simulate", sub: "test the idea cheaply first", a: 0 },
  { k: "Experiment", sub: "run the compiled search", a: 90 },
  { k: "Verify", sub: "re-derive it independently", a: 180 },
];

/** The optimise, simulate, experiment, verify loop around a growing library. */
export function LoopDiagram() {
  const W = 680;
  const S = 500;
  const cx = W / 2;
  const c = S / 2;
  const R = 140;
  const pos = (deg: number, r = R) => [
    cx + r * Math.cos((deg * Math.PI) / 180),
    c + r * Math.sin((deg * Math.PI) / 180),
  ];
  const ring = `M ${cx} ${c - R} A ${R} ${R} 0 1 1 ${cx - 0.01} ${c - R} Z`;
  return (
    <svg className="loop" viewBox={`0 0 ${W} ${S}`} role="img" aria-labelledby="loop-title loop-desc">
      <title id="loop-title">The discovery loop</title>
      <desc id="loop-desc">
        Optimise, simulate, experiment and verify, in a cycle. Every verified result feeds a central library of
        detectors, checkers and solvers that the next problem reuses.
      </desc>
      <path className="ring" d={ring} />
      {[-45, 45, 135, 225].map((deg) => {
        const [px, py] = pos(deg);
        return (
          <path
            key={deg}
            d="M -4 -5 L 3 0 L -4 5"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.2"
            transform={`translate(${px} ${py}) rotate(${deg + 90})`}
          />
        );
      })}
      {LOOP.map((n) => {
        const [px, py] = pos(n.a);
        const [sx, sy] = pos(n.a, 40);
        return <line key={n.k} className="spoke" x1={px} y1={py} x2={sx} y2={sy} />;
      })}
      <rect className="core" x={cx - 40} y={c - 40} width="80" height="80" />
      <text className="core-text" x={cx} y={c + 4} textAnchor="middle">
        Library
      </text>
      {LOOP.map((n) => {
        const [px, py] = pos(n.a);
        const [lx, ly] = pos(n.a, R + 22);
        const anchor = n.a === 0 ? "start" : n.a === 180 ? "end" : "middle";
        const dx = 0;
        const dy = n.a === -90 ? -26 : n.a === 90 ? 26 : -4;
        return (
          <g key={n.k}>
            <rect className="node" x={px - 7} y={py - 7} width="14" height="14" />
            <text x={lx + dx} y={ly + dy} textAnchor={anchor}>
              {n.k}
            </text>
            <text className="sub" x={lx + dx} y={ly + dy + 17} textAnchor={anchor}>
              {n.sub}
            </text>
          </g>
        );
      })}
      <rect className="runner" x="-4" y="-4" width="8" height="8">
        <animateMotion dur="9s" repeatCount="indefinite" path={ring} rotate="auto" />
      </rect>
      <text className="sub" x={cx} y={c + 64} textAnchor="middle">
        detectors, checkers, solvers
      </text>
    </svg>
  );
}
