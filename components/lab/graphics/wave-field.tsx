import * as React from "react";
import { chakra } from "@chakra-ui/react";
import { toCssSize, useSvgMotion } from "./use-svg-motion";

const W = 600;
const H = 360;
const CY = H / 2;

interface Layer {
  period: number; // px; the drift moves exactly one period so the loop is seamless
  amp: number;
  phase: number;
  dur: number;
  dir: 1 | -1;
  color: string;
  opacity: number;
}

const LAYERS: Layer[] = [
  { period: 300, amp: 62, phase: 0.0, dur: 26, dir: 1, color: "#8ee3ff", opacity: 0.7 },
  { period: 200, amp: 48, phase: 1.1, dur: 22, dir: -1, color: "#a18bff", opacity: 0.6 },
  { period: 150, amp: 38, phase: 2.3, dur: 18, dir: 1, color: "#5b7cff", opacity: 0.6 },
  { period: 400, amp: 70, phase: 0.6, dur: 34, dir: -1, color: "#8ee3ff", opacity: 0.4 },
  { period: 240, amp: 30, phase: 3.1, dur: 28, dir: 1, color: "#f2f4f8", opacity: 0.28 },
  { period: 120, amp: 22, phase: 4.2, dur: 20, dir: -1, color: "#a18bff", opacity: 0.4 },
  { period: 600, amp: 84, phase: 1.7, dur: 44, dir: 1, color: "#5b7cff", opacity: 0.3 },
];

/** A sum of three harmonics, so the layer repeats exactly every `period`. */
const wave = (l: Layer, x: number) => {
  const a = (x / l.period) * Math.PI * 2 + l.phase;
  return l.amp * (Math.sin(a) + 0.45 * Math.sin(2 * a + 1.3) + 0.2 * Math.sin(3 * a + 0.4)) * 0.62;
};

const pathFor = (l: Layer) => {
  const from = l.dir === 1 ? 0 : -l.period;
  const to = l.dir === 1 ? W + l.period : W;
  const step = 6;
  let d = "";
  for (let x = from; x <= to; x += step) {
    d += `${x === from ? "M" : "L"}${x} ${wave(l, x).toFixed(1)} `;
  }
  return d;
};

/** Layered waves that drift at different speeds and interfere. */
export const WaveField: React.FC<{ size?: number | string }> = ({ size }) => {
  const ref = useSvgMotion();
  return (
    <chakra.svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      w={toCssSize(size)}
      h="auto"
      maxW="100%"
      display="block"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="wf-fade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.18" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.82" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="wf-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <rect width={W} height={H} fill="url(#wf-fade)" />
        </mask>
      </defs>

      <g stroke="#f2f4f8" strokeOpacity="0.1" strokeDasharray="2 6">
        <line x1="0" x2={W} y1={CY} y2={CY} />
        {[1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={(W * i) / 5}
            x2={(W * i) / 5}
            y1="20"
            y2={H - 20}
            strokeOpacity="0.06"
          />
        ))}
      </g>

      <g mask="url(#wf-mask)">
        <g transform={`translate(0 ${CY})`}>
          <g>
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1 0.78;1 1.12;1 0.78"
              dur="14s"
              repeatCount="indefinite"
            />
            {LAYERS.map((l, i) => (
              <g key={i}>
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  from="0 0"
                  to={`${l.dir === 1 ? -l.period : l.period} 0`}
                  dur={`${l.dur}s`}
                  repeatCount="indefinite"
                />
                <path
                  d={pathFor(l)}
                  fill="none"
                  stroke={l.color}
                  strokeOpacity={l.opacity}
                  strokeWidth="1.1"
                />
              </g>
            ))}
          </g>
        </g>
      </g>

      <g fontFamily="'D-DIN', 'Noto Sans Devanagari', sans-serif" fontSize="8" letterSpacing="1.4" fill="#9aa3b5">
        <text x="24" y="28">
          &#968;(x, t)
        </text>
        <text x={W - 24} y={H - 18} textAnchor="end">
          SUPERPOSITION
        </text>
      </g>
    </chakra.svg>
  );
};
