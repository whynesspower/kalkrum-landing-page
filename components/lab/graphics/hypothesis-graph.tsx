import * as React from "react";
import { chakra } from "@chakra-ui/react";
import { toCssSize, useSvgMotion } from "./use-svg-motion";

const DUR = "10s";

interface GNode {
  x: number;
  y: number;
  label: string;
}

const NODES: GNode[] = [
  { x: 44, y: 165, label: "Q" },
  { x: 130, y: 70, label: "H1" },
  { x: 130, y: 165, label: "H2" },
  { x: 130, y: 260, label: "H3" },
  { x: 238, y: 112, label: "E1" },
  { x: 238, y: 205, label: "E2" },
  { x: 238, y: 285, label: "E3" },
  { x: 326, y: 78, label: "O1" },
  { x: 326, y: 170, label: "O2" },
  { x: 326, y: 256, label: "O3" },
  { x: 390, y: 165, label: "U" },
];

const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 4],
  [2, 4],
  [2, 5],
  [3, 5],
  [3, 6],
  [4, 7],
  [4, 8],
  [5, 8],
  [6, 9],
  [5, 9],
  [7, 10],
  [8, 10],
  [9, 10],
];

// The chain that lights up, in order: Q, H2, E1, O2, U. Each hop takes a share of the loop.
const STEP = 0.17;
const START = 0.06;
const edgeIndex = (a: number, b: number) =>
  EDGES.findIndex(([p, q]) => (p === a && q === b) || (p === b && q === a));
const ROUTE = [0, 2, 4, 8, 10];
const LIT_EDGES = ROUTE.slice(1).map((n, i) => edgeIndex(ROUTE[i], n));

const line = (a: number, b: number) => {
  const p = NODES[a];
  const q = NODES[b];
  return { x1: p.x, y1: p.y, x2: q.x, y2: q.y };
};

const kt = (...v: number[]) => v.map((n) => n.toFixed(3)).join(";");

/** A small graph of ideas where one chain of reasoning lights up in order. */
export const HypothesisGraph: React.FC<{ size?: number | string }> = ({ size }) => {
  const ref = useSvgMotion();
  return (
    <chakra.svg
      ref={ref}
      viewBox="0 0 430 330"
      w={toCssSize(size)}
      h="auto"
      maxW="100%"
      display="block"
      aria-hidden="true"
      focusable="false"
    >
      {/* Idle edges. */}
      <g stroke="#f2f4f8" strokeOpacity="0.13" strokeWidth="1">
        {EDGES.map(([a, b], i) => (
          <line key={i} {...line(a, b)} />
        ))}
      </g>

      {/* A rejected branch flickers in mint, then fades. */}
      <line {...line(0, 1)} stroke="#5ef2c4" strokeWidth="1.2" strokeDasharray="3 4" opacity="0">
        <animate
          attributeName="opacity"
          dur={DUR}
          repeatCount="indefinite"
          keyTimes={kt(0, 0.02, 0.1, 0.2, 0.28, 1)}
          values="0;0;0.9;0.2;0;0"
        />
      </line>
      <line {...line(1, 4)} stroke="#5ef2c4" strokeWidth="1.2" strokeDasharray="3 4" opacity="0">
        <animate
          attributeName="opacity"
          dur={DUR}
          repeatCount="indefinite"
          keyTimes={kt(0, 0.1, 0.16, 0.26, 0.34, 1)}
          values="0;0;0.8;0.2;0;0"
        />
      </line>

      {/* The chosen path draws itself hop by hop. */}
      {LIT_EDGES.map((ei, k) => {
        const [a, b] = ROUTE.slice(k, k + 2);
        const s = START + k * STEP;
        const e = s + STEP * 0.85;
        return (
          <line
            key={ei}
            {...line(a, b)}
            pathLength={1}
            stroke="#8ee3ff"
            strokeWidth="1.6"
            strokeDasharray="1"
            strokeLinecap="round"
          >
            <animate
              attributeName="stroke-dashoffset"
              dur={DUR}
              repeatCount="indefinite"
              keyTimes={kt(0, s, e, 1)}
              values="1;1;0;0"
            />
            <animate
              attributeName="opacity"
              dur={DUR}
              repeatCount="indefinite"
              keyTimes={kt(0, 0.8, 0.95, 1)}
              values="1;1;0;0"
            />
          </line>
        );
      })}

      {/* Nodes. */}
      {NODES.map((n, i) => {
        const routeIdx = ROUTE.indexOf(i);
        const on = routeIdx >= 0;
        const t0 = routeIdx === 0 ? 0.02 : START + (routeIdx - 1) * STEP + STEP * 0.85;
        const isEnd = i === 10;
        return (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="9" fill="#0b0d14" stroke="#f2f4f8" strokeOpacity="0.35" />
            {on && (
              <>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="9"
                  fill="#0b0d14"
                  stroke="#8ee3ff"
                  strokeWidth="1.4"
                  opacity="0"
                >
                  <animate
                    attributeName="opacity"
                    dur={DUR}
                    repeatCount="indefinite"
                    keyTimes={kt(
                      0,
                      routeIdx === 0 ? 0 : t0 - 0.001,
                      Math.min(t0 + 0.02, 0.79),
                      0.8,
                      0.95,
                      1,
                    )}
                    values={routeIdx === 0 ? "1;1;1;1;0;0" : "0;0;1;1;0;0"}
                  />
                </circle>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="9"
                  fill="none"
                  stroke={isEnd ? "#5ef2c4" : "#8ee3ff"}
                  opacity="0"
                >
                  <animate
                    attributeName="r"
                    dur={DUR}
                    repeatCount="indefinite"
                    keyTimes={kt(0, t0, t0 + 0.08, 1)}
                    values="9;9;24;24"
                  />
                  <animate
                    attributeName="opacity"
                    dur={DUR}
                    repeatCount="indefinite"
                    keyTimes={kt(0, t0, t0 + 0.08, 1)}
                    values="0;0.7;0;0"
                  />
                </circle>
              </>
            )}
            <text
              x={n.x}
              y={n.y + 2.8}
              textAnchor="middle"
              fontFamily="'D-DIN', 'Noto Sans Devanagari', sans-serif"
              fontSize="7.5"
              fill="#f2f4f8"
              fillOpacity="0.8"
            >
              {n.label}
            </text>
          </g>
        );
      })}

      <g fontFamily="'D-DIN', 'Noto Sans Devanagari', sans-serif" fontSize="8" letterSpacing="1.4" fill="#9aa3b5">
        <text x="44" y="318" textAnchor="middle">
          QUESTION
        </text>
        <text x="130" y="318" textAnchor="middle">
          HYPOTHESES
        </text>
        <text x="238" y="318" textAnchor="middle">
          TESTS
        </text>
        <text x="358" y="318" textAnchor="middle">
          UNDERSTANDING
        </text>
      </g>
      <text
        x="390"
        y="136"
        textAnchor="middle"
        fontFamily="'D-DIN', 'Noto Sans Devanagari', sans-serif"
        fontSize="7"
        letterSpacing="1.2"
        fill="#5ef2c4"
        opacity="0"
      >
        SUPPORTED
        <animate
          attributeName="opacity"
          dur={DUR}
          repeatCount="indefinite"
          keyTimes={kt(0, 0.7, 0.76, 0.8, 0.95, 1)}
          values="0;0;1;1;0;0"
        />
      </text>
    </chakra.svg>
  );
};
