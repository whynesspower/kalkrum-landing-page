import { hadamardFrontier } from "@/content/notes/data/hadamardFrontier";

/**
 * Where the unresolved orders stand: one mark for each of the 195 values of n in the reference table, placed by n,
 * in three rows. Each mark is one order, so the picture is the data and nothing is smoothed or binned.
 */
function HadamardFrontier() {
  const MAX = 3000;
  const rows = [
    { label: "Settled here", ns: hadamardFrontier.here, tone: "here" },
    { label: "Settled by others", ns: hadamardFrontier.others, tone: "others" },
    { label: "Still open", ns: hadamardFrontier.open, tone: "open" },
  ];
  const ticks = [0, 500, 1000, 1500, 2000, 2500, 3000];
  return (
    <div className="frontier" role="img" aria-label="The 195 unresolved values of n, by what has happened to each">
      {rows.map((r) => (
        <div className="frontier-row" key={r.label}>
          <span className="frontier-label">
            {r.label}
            <b>{r.ns.length}</b>
          </span>
          <svg viewBox={`0 0 ${MAX} 10`} preserveAspectRatio="none" className={`frontier-strip is-${r.tone}`}>
            {r.ns.map((n) => (
              <line key={n} x1={n} x2={n} y1="0" y2="10" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
        </div>
      ))}
      <div className="frontier-row frontier-axis" aria-hidden="true">
        <span className="frontier-label">Order</span>
        <div className="frontier-ticks">
          {ticks.map((n) => (
            <span key={n} style={{ left: `${(n / MAX) * 100}%` }}>
              {(4 * n).toLocaleString("en-GB")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Figures a note can place by name. */
export const noteFigures: Record<string, () => React.ReactNode> = {
  "hadamard-frontier": HadamardFrontier,
};
