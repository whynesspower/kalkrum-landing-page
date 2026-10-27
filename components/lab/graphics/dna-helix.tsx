import * as React from "react";
import { chakra } from "@chakra-ui/react";
import { toCssSize, useSvgMotion } from "./use-svg-motion";

const STEPS = 24; // phase keyframes per loop
const RUNGS = 22;
const TOP = 34;
const BOTTOM = 366;
const CX = 190;
const AMP = 74;
const TURN = 0.62; // radians of twist per rung
const DUR = "9s";

const f = (n: number) => n.toFixed(1);
const theta = (i: number, phase: number) => i * TURN + phase;
const yOf = (i: number) => TOP + (i * (BOTTOM - TOP)) / (RUNGS - 1);
const phaseAt = (s: number) => (s / STEPS) * Math.PI * 2;
const seq = (fn: (s: number) => string) =>
  Array.from({ length: STEPS + 1 }, (_, s) => fn(s)).join(";");

/** Smooth backbone path for one strand at a given phase. */
const strandPath = (offset: number, phase: number) => {
  let d = "";
  const n = RUNGS * 3;
  for (let k = 0; k <= n; k++) {
    const i = (k / n) * (RUNGS - 1);
    const x = CX + AMP * Math.sin(theta(i, phase) + offset);
    d += `${k === 0 ? "M" : "L"}${f(x)} ${f(yOf(i))} `;
  }
  return d;
};

const Strand: React.FC<{ offset: number; color: string }> = ({ offset, color }) => (
  <g>
    <path fill="none" stroke={color} strokeOpacity="0.28" strokeWidth="1">
      <animate
        attributeName="d"
        dur={DUR}
        repeatCount="indefinite"
        values={seq((s) => strandPath(offset, phaseAt(s)))}
      />
    </path>
    {Array.from({ length: RUNGS }, (_, i) => {
      const y = yOf(i);
      const xs = seq((s) => f(CX + AMP * Math.sin(theta(i, phaseAt(s)) + offset)));
      const depth = (s: number) => (Math.cos(theta(i, phaseAt(s)) + offset) + 1) / 2;
      return (
        <circle key={i} cy={y} fill={color}>
          <animate attributeName="cx" dur={DUR} repeatCount="indefinite" values={xs} />
          <animate
            attributeName="r"
            dur={DUR}
            repeatCount="indefinite"
            values={seq((s) => f(1.8 + 2.6 * depth(s)))}
          />
          <animate
            attributeName="opacity"
            dur={DUR}
            repeatCount="indefinite"
            values={seq((s) => f(0.3 + 0.7 * depth(s)))}
          />
        </circle>
      );
    })}
  </g>
);

/** Two strands of dots joined by rungs; the helix turns slowly. */
export const DnaHelix: React.FC<{ size?: number | string }> = ({ size }) => {
  const ref = useSvgMotion();
  return (
    <chakra.svg
      ref={ref}
      viewBox="0 0 380 400"
      w={toCssSize(size)}
      h="auto"
      maxW="100%"
      display="block"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="dna-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8ee3ff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#8ee3ff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#8ee3ff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g transform="rotate(-12 190 200)">
        {/* Scale ticks on the left edge. */}
        {Array.from({ length: 17 }, (_, i) => (
          <line
            key={i}
            x1="22"
            x2={i % 4 === 0 ? 34 : 28}
            y1={TOP + (i * (BOTTOM - TOP)) / 16}
            y2={TOP + (i * (BOTTOM - TOP)) / 16}
            stroke="#f2f4f8"
            strokeOpacity="0.22"
          />
        ))}

        {/* Rungs: the base pairs between the two strands. */}
        {Array.from({ length: RUNGS }, (_, i) => {
          const y = yOf(i);
          const xa = (s: number) => CX + AMP * Math.sin(theta(i, phaseAt(s)));
          const xb = (s: number) => CX - AMP * Math.sin(theta(i, phaseAt(s)));
          const front = (s: number) => (Math.cos(theta(i, phaseAt(s))) + 1) / 2;
          return (
            <line
              key={i}
              y1={y}
              y2={y}
              stroke={i % 3 === 0 ? "#a18bff" : "#f2f4f8"}
              strokeWidth="1"
            >
              <animate
                attributeName="x1"
                dur={DUR}
                repeatCount="indefinite"
                values={seq((s) => f(xa(s)))}
              />
              <animate
                attributeName="x2"
                dur={DUR}
                repeatCount="indefinite"
                values={seq((s) => f(xb(s)))}
              />
              <animate
                attributeName="stroke-opacity"
                dur={DUR}
                repeatCount="indefinite"
                values={seq((s) =>
                  f(0.06 + 0.2 * Math.abs(Math.sin(theta(i, phaseAt(s))) * front(s))),
                )}
              />
            </line>
          );
        })}

        <Strand offset={0} color="#8ee3ff" />
        <Strand offset={Math.PI} color="#a18bff" />

        {/* Scanning band that travels down the helix. */}
        <rect x="70" width="240" height="46" fill="url(#dna-scan)">
          <animate attributeName="y" values="10;350;10" dur="7s" repeatCount="indefinite" />
        </rect>

        <g fontFamily="'D-DIN', 'Noto Sans Devanagari', sans-serif" fontSize="8" letterSpacing="1.2" fill="#9aa3b5">
          <text x="40" y="30">
            5&#8242;
          </text>
          <text x="40" y="378">
            3&#8242;
          </text>
          <text x="300" y="30" fill="#8ee3ff">
            A
          </text>
          <text x="316" y="30" fill="#a18bff">
            T
          </text>
        </g>
      </g>
    </chakra.svg>
  );
};
