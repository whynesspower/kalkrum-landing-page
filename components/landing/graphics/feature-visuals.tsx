import * as React from "react";
import { chakra } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const ping = keyframes`
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(3.2); opacity: 0; }
`;

const draw = keyframes`
  from { stroke-dashoffset: 120; }
  to { stroke-dashoffset: 0; }
`;

const Svg = chakra("svg");
const base = { width: "104px", height: "60px", viewBox: "0 0 104 60", "aria-hidden": true } as const;

export const StatusVisual = () => (
  <Svg {...base}>
    {[
      { y: 8, w: 70, c: "#a18bff" },
      { y: 28, w: 38, c: "#f5a524" },
      { y: 48, w: 90, c: "#34d399" },
    ].map((b) => (
      <g key={b.y}>
        <rect x="6" y={b.y - 3} width="92" height="6" rx="3" fill="currentColor" opacity="0.14" />
        <rect x="6" y={b.y - 3} width={b.w} height="6" rx="3" fill={b.c} />
      </g>
    ))}
  </Svg>
);

export const ThreatVisual = () => (
  <Svg {...base}>
    <g transform="translate(52 30)">
      <chakra.circle
        r="6"
        fill="none"
        stroke="#f5a524"
        strokeWidth="1.5"
        sx={{ animation: `${ping} 2.4s ease-out infinite`, transformOrigin: "center", transformBox: "fill-box" }}
      />
      <chakra.circle
        r="6"
        fill="none"
        stroke="#f5a524"
        strokeWidth="1.5"
        sx={{ animation: `${ping} 2.4s ease-out 1.2s infinite`, transformOrigin: "center", transformBox: "fill-box" }}
      />
      <circle r="6" fill="#f5a524" />
    </g>
  </Svg>
);

export const SprintVisual = () => (
  <Svg {...base}>
    <path d="M6 52 H98" stroke="currentColor" opacity="0.14" strokeWidth="1" />
    <chakra.polyline
      points="6,10 24,16 40,24 58,30 76,40 98,50"
      fill="none"
      stroke="#a18bff"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="120"
      sx={{ animation: `${draw} 2.4s ease-out both` }}
    />
    <circle cx="98" cy="50" r="3.5" fill="#a18bff" />
  </Svg>
);

export const RcaVisual = () => (
  <Svg {...base}>
    <path d="M14 10 V50" stroke="currentColor" opacity="0.2" strokeWidth="1.5" />
    {[
      { y: 10, c: "#a18bff", w: 56 },
      { y: 30, c: "#f5a524", w: 70 },
      { y: 50, c: "#f87171", w: 44 },
    ].map((r) => (
      <g key={r.y}>
        <circle cx="14" cy={r.y} r="4" fill={r.c} />
        <rect x="26" y={r.y - 3} width={r.w} height="6" rx="3" fill="currentColor" opacity="0.2" />
      </g>
    ))}
  </Svg>
);

export const SecurityVisual = () => (
  <Svg {...base}>
    <path
      d="M52 6 L76 15 V30 C76 43 66 51 52 56 C38 51 28 43 28 30 V15 Z"
      fill="#a18bff"
      fillOpacity="0.16"
      stroke="#a18bff"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M42 31 L50 39 L63 24"
      fill="none"
      stroke="#a18bff"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const TeamVisual = () => (
  <Svg {...base}>
    <defs>
      <linearGradient id="kk-av1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#a18bff" />
        <stop offset="1" stopColor="#6c45e4" />
      </linearGradient>
      <linearGradient id="kk-av2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#6cc4ff" />
        <stop offset="1" stopColor="#2f6bff" />
      </linearGradient>
      <linearGradient id="kk-av3" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#34d399" />
        <stop offset="1" stopColor="#0f9d74" />
      </linearGradient>
    </defs>
    {["kk-av1", "kk-av2", "kk-av3"].map((g, i) => (
      <circle
        key={g}
        cx={30 + i * 22}
        cy="30"
        r="15"
        fill={`url(#${g})`}
        stroke="var(--chakra-colors-kk-surface)"
        strokeWidth="3"
      />
    ))}
  </Svg>
);
