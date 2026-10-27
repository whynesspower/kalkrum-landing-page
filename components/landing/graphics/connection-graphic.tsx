import * as React from "react";
import { chakra } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useReducedMotion } from "framer-motion";
import { SiGithub, SiGoogledocs, SiJira, SiSlack } from "react-icons/si";

const flow = keyframes`
  to { stroke-dashoffset: -28; }
`;

const TOOLS = [
  { name: "Jira", icon: SiJira, y: 42 },
  { name: "Slack", icon: SiSlack, y: 114 },
  { name: "Google Docs", icon: SiGoogledocs, y: 186 },
  { name: "GitHub", icon: SiGithub, y: 258 },
];

const HUB = { x: 480, y: 150 };
const inPath = (y: number) => `M98 ${y} C 260 ${y}, 320 ${HUB.y}, 428 ${HUB.y}`;
const OUT_PATH = `M532 ${HUB.y} L 768 ${HUB.y}`;

const line = { stroke: "var(--chakra-colors-kk-line)" };
const surface = {
  fill: "var(--chakra-colors-kk-surfaceHi)",
  stroke: "var(--chakra-colors-kk-line)",
};

/** Four tools flowing into KalKram, which hands back a 60-word summary. */
export const ConnectionGraphic: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <chakra.svg
      viewBox="0 0 960 300"
      role="img"
      aria-label="Jira, Slack, Google Docs and GitHub flow into KalKram, which outputs a 60-word summary."
      w="full"
      h="auto"
      display="block"
      sx={{ ".flow": { animation: `${flow} 1.2s linear infinite` } }}
    >
      <defs>
        <linearGradient id="kk-flow" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#6c45e4" stopOpacity="0.25" />
          <stop offset="1" stopColor="#a18bff" />
        </linearGradient>
        <radialGradient id="kk-hub-glow">
          <stop offset="0" stopColor="#6c45e4" stopOpacity="0.55" />
          <stop offset="1" stopColor="#6c45e4" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Lines from each tool into the hub */}
      {TOOLS.map((t) => (
        <g key={t.name}>
          <path d={inPath(t.y)} fill="none" style={line} strokeWidth="1.5" />
          <path
            className="flow"
            d={inPath(t.y)}
            fill="none"
            stroke="url(#kk-flow)"
            strokeWidth="2"
            strokeDasharray="4 10"
            strokeLinecap="round"
          />
        </g>
      ))}
      <path d={OUT_PATH} fill="none" style={line} strokeWidth="1.5" />
      <path
        className="flow"
        d={OUT_PATH}
        fill="none"
        stroke="url(#kk-flow)"
        strokeWidth="2"
        strokeDasharray="4 10"
        strokeLinecap="round"
      />

      {/* Packets travelling along the lines */}
      {!reduce &&
        TOOLS.map((t, i) => (
          <circle key={t.name} r="4" fill="#c4b5ff">
            <animateMotion
              dur="3s"
              begin={`${i * 0.7}s`}
              repeatCount="indefinite"
              path={inPath(t.y)}
            />
          </circle>
        ))}
      {!reduce && (
        <circle r="4" fill="#c4b5ff">
          <animateMotion dur="2.2s" repeatCount="indefinite" path={OUT_PATH} />
        </circle>
      )}

      {/* Tool nodes */}
      {TOOLS.map((t) => (
        <g key={t.name}>
          <rect x="42" y={t.y - 28} width="56" height="56" rx="16" style={surface} />
          <t.icon
            x={42 + 14}
            y={t.y - 14}
            size={28}
            aria-hidden="true"
            style={{ color: "var(--chakra-colors-kk-fg)" }}
          />
        </g>
      ))}

      {/* Hub */}
      <circle cx={HUB.x} cy={HUB.y} r="96" fill="url(#kk-hub-glow)" />
      {!reduce && (
        <circle
          cx={HUB.x}
          cy={HUB.y}
          r="52"
          fill="none"
          stroke="#a18bff"
          strokeWidth="1.5"
        >
          <animate attributeName="r" values="52;96" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.55;0" dur="3s" repeatCount="indefinite" />
        </circle>
      )}
      <circle cx={HUB.x} cy={HUB.y} r="52" style={surface} strokeWidth="1.5" />
      <circle cx={HUB.x} cy={HUB.y} r="52" fill="none" stroke="#a18bff" strokeOpacity="0.6" />
      <image
        href="/static/screenshots/kalkram.png"
        x={HUB.x - 30}
        y={HUB.y - 30}
        width="60"
        height="60"
      />

      {/* Output */}
      <rect x="772" y="112" width="156" height="76" rx="20" style={surface} />
      <rect x="772" y="112" width="156" height="76" rx="20" fill="none" stroke="#a18bff" strokeOpacity="0.5" />
      <text
        x="850"
        y="147"
        textAnchor="middle"
        fontSize="30"
        fontWeight="700"
        style={{ fill: "var(--chakra-colors-kk-fg)" }}
      >
        60 words
      </text>
      <text
        x="850"
        y="173"
        textAnchor="middle"
        fontSize="17"
        style={{ fill: "var(--chakra-colors-kk-muted)" }}
      >
        every project
      </text>
    </chakra.svg>
  );
};
