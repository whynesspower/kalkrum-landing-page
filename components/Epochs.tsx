/**
 * Three million years of invention on four lines, each drawn to scale. Every line magnifies the bright tip of
 * the line above it, so the eye can see how much of it happened at the very end. The right-hand edge is today.
 */
const NOW = 2026;

type Mark = { at: number; label: string; when: string; up?: boolean; minor?: boolean };
type Epoch = { span: string; years: number; marks: Mark[] };

const ago = (years: number, span: number) => 1 - years / span;
const year = (y: number, span: number) => 1 - (NOW - y) / span;

const epochs: Epoch[] = [
  {
    span: "3.3 million years",
    years: 3_300_000,
    marks: [
      { at: 0, label: "Stone tools", when: "3.3 million years ago" },
      { at: ago(1_000_000, 3_300_000), label: "Fire", when: "1 million years ago", up: true },
    ],
  },
  {
    span: "The last 12,000 years",
    years: 12_000,
    marks: [
      { at: ago(11_500, 12_000), label: "Farming", when: "11,500 years ago" },
      { at: ago(5_300, 12_000), label: "Writing", when: "5,300 years ago", up: true },
    ],
  },
  {
    span: "The last 600 years",
    years: 600,
    marks: [
      { at: year(1450, 600), label: "Printing press", when: "1450" },
      { at: year(1608, 600), label: "Telescope", when: "1608", up: true, minor: true },
      { at: year(1712, 600), label: "Steam engine", when: "1712", up: true },
      { at: year(1831, 600), label: "Dynamo", when: "1831" },
      { at: year(1903, 600), label: "Powered flight", when: "1903", up: true, minor: true },
    ],
  },
  {
    span: "The last 80 years",
    years: 80,
    marks: [
      { at: year(1947, 80), label: "Transistor", when: "1947" },
      { at: year(1969, 80), label: "Moon landing", when: "1969", up: true, minor: true },
      { at: year(1989, 80), label: "The web", when: "1989", minor: true },
      { at: year(2012, 80), label: "Deep learning", when: "2012", up: true },
      { at: year(2020, 80), label: "AlphaFold", when: "2020" },
    ],
  },
];

const pct = (x: number) => `${(x * 100).toFixed(3)}%`;

export function Epochs() {
  return (
    <figure className="epochs-figure">
      <ol className="epochs">
        {epochs.map((e, i) => {
          const next = epochs[i + 1];
          const prev = epochs[i - 1];
          // The share of this line that the next line magnifies.
          const tip = next ? next.years / e.years : 0;
          const from = prev ? e.years / prev.years : 0;
          return (
            <li className="epoch" key={e.span}>
              {prev ? (
                <svg className="epoch-fan" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id={`fan-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="var(--accent)" stopOpacity="0.42" />
                      <stop offset="1" stopColor="var(--accent)" stopOpacity="0.03" />
                    </linearGradient>
                  </defs>
                  <polygon points={`${100 - from * 100},0 100,0 100,100 0,100`} fill={`url(#fan-${i})`} />
                </svg>
              ) : null}
              <span className="epoch-span">{e.span}</span>
              <span className="epoch-rule" />
              {next ? <span className="epoch-tip" style={{ width: `max(3px, ${pct(tip)})` }} /> : null}
              {e.marks.map((m) => (
                <span
                  key={m.label}
                  className={`epoch-mark${m.up ? " is-up" : ""}${m.at >= 0.6 ? " is-end" : ""}${m.minor ? " is-minor" : ""}`}
                  style={{ left: pct(m.at) }}
                >
                  <b>{m.label}</b>
                  <small>{m.when}</small>
                </span>
              ))}
            </li>
          );
        })}
      </ol>
      <p className="epochs-end">The last invention</p>
      <figcaption className="sr-only">
        Four timelines, each to scale. The first covers 3.3 million years, from the first stone tools to today, with
        fire one million years ago. The second magnifies its last 12,000 years: farming, then writing. The third
        magnifies the last 600 years: the printing press, the telescope, the steam engine, the dynamo and powered
        flight. The fourth magnifies the last 80 years: the transistor, the Moon landing, the web, deep learning and
        AlphaFold. All four end at today, where the last invention is marked.
      </figcaption>
    </figure>
  );
}
