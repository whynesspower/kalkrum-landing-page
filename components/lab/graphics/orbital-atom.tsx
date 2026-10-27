import * as React from "react";
import { chakra } from "@chakra-ui/react";
import { toCssSize, useSvgMotion } from "./use-svg-motion";

const C = 200;
const RX = 150;
const RY = 52;
const ORBIT = `M ${C - RX} ${C} A ${RX} ${RY} 0 1 1 ${C + RX} ${C} A ${RX} ${RY} 0 1 1 ${C - RX} ${C}`;

const ORBITS = [
  { angle: 0, dur: 6.5, color: "#8ee3ff", begin: 0 },
  { angle: 60, dur: 8.5, color: "#a18bff", begin: -2.2 },
  { angle: 120, dur: 7.5, color: "#5b7cff", begin: -4.6 },
];

const Electron: React.FC<{ dur: number; color: string; begin: number }> = ({
  dur,
  color,
  begin,
}) => (
  <g>
    {[5, 4, 3, 2, 1, 0].map((k) => (
      <circle
        key={k}
        r={1.2 + (5 - k) * 0.35}
        fill={k === 0 ? "#f2f4f8" : color}
        opacity={k === 0 ? 1 : 0.55 - k * 0.09}
      >
        <animateMotion
          dur={`${dur}s`}
          begin={`${begin - k * 0.06}s`}
          repeatCount="indefinite"
          path={ORBIT}
        />
      </circle>
    ))}
    <circle r="7" fill={color} opacity="0.18">
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={ORBIT} />
    </circle>
  </g>
);

/** Nucleus with three tilted elliptical orbits and electrons that follow them. */
export const OrbitalAtom: React.FC<{ size?: number | string }> = ({ size }) => {
  const ref = useSvgMotion();
  return (
    <chakra.svg
      ref={ref}
      viewBox="0 0 400 400"
      w={toCssSize(size)}
      h="auto"
      maxW="100%"
      display="block"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="atom-core">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.25" stopColor="#8ee3ff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#5b7cff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer dashed shell turning slowly. */}
      <circle
        cx={C}
        cy={C}
        r="184"
        fill="none"
        stroke="#f2f4f8"
        strokeOpacity="0.14"
        strokeDasharray="2 7"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${C} ${C}`}
          to={`360 ${C} ${C}`}
          dur="90s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx={C} cy={C} r="170" fill="none" stroke="#f2f4f8" strokeOpacity="0.06" />

      {ORBITS.map((o) => (
        <g key={o.angle} transform={`rotate(${o.angle} ${C} ${C})`}>
          <path d={ORBIT} fill="none" stroke={o.color} strokeOpacity="0.38" strokeWidth="1" />
          <Electron dur={o.dur} color={o.color} begin={o.begin} />
        </g>
      ))}

      {/* Nucleus. */}
      <circle cx={C} cy={C} r="34" fill="url(#atom-core)">
        <animate attributeName="r" values="30;38;30" dur="4s" repeatCount="indefinite" />
      </circle>
      {[
        [-5, -4],
        [5, -3],
        [0, 5],
        [-6, 4],
        [6, 4],
        [0, -9],
      ].map(([dx, dy], i) => (
        <circle
          key={i}
          cx={C + dx}
          cy={C + dy}
          r="3.2"
          fill={i % 2 ? "#a18bff" : "#f2f4f8"}
          opacity="0.9"
        />
      ))}

      <g fontFamily="'D-DIN', 'Noto Sans Devanagari', sans-serif" fontSize="8" letterSpacing="1.4" fill="#9aa3b5">
        <text x="24" y="28">
          n = 1, 2, 3
        </text>
        <text x="376" y="382" textAnchor="end">
          e&#8315;
        </text>
      </g>
    </chakra.svg>
  );
};
