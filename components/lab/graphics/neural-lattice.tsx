import * as React from "react";
import { chakra } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { toCssSize, useSvgMotion } from "./use-svg-motion";

const LAYERS = [3, 5, 6, 5, 3];
const W = 480;
const H = 340;
const PAD_X = 50;

const twinkle = keyframes`
  0%, 100% { opacity: 0.45; }
  50% { opacity: 1; }
`;

interface Node {
  x: number;
  y: number;
}

// Deterministic jitter so server and client render the same markup.
const jitter = (i: number, j: number) => Math.sin(i * 12.9898 + j * 78.233) * 7;

const NODES: Node[][] = LAYERS.map((count, i) => {
  const x = PAD_X + (i * (W - PAD_X * 2)) / (LAYERS.length - 1);
  return Array.from({ length: count }, (_, j) => ({
    x: x + jitter(i, j),
    y: 40 + ((j + 0.5) * (H - 80)) / count + jitter(j, i),
  }));
});

// Routes through one node per layer, with colour and timing.
const ROUTES = [
  { path: [1, 3, 2, 4, 1], color: "#8ee3ff", dur: 3.4, begin: 0 },
  { path: [0, 1, 4, 2, 0], color: "#a18bff", dur: 3.8, begin: -1.1 },
  { path: [2, 0, 3, 1, 2], color: "#8ee3ff", dur: 3.2, begin: -2.0 },
  { path: [1, 4, 5, 3, 1], color: "#5b7cff", dur: 4.1, begin: -0.6 },
  { path: [0, 2, 1, 0, 2], color: "#a18bff", dur: 3.6, begin: -2.7 },
  { path: [2, 3, 0, 2, 0], color: "#8ee3ff", dur: 4.4, begin: -3.3 },
].map((r) => ({
  ...r,
  d: r.path
    .map((n, layer) => {
      const node = NODES[layer][n % LAYERS[layer]];
      return `${layer === 0 ? "M" : "L"}${node.x.toFixed(1)} ${node.y.toFixed(1)}`;
    })
    .join(" "),
}));

/** Five layers of nodes, linked, with pulses travelling forward through them. */
export const NeuralLattice: React.FC<{ size?: number | string }> = ({ size }) => {
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
      sx={{
        "& .nl-node": { animation: `${twinkle} 4.5s ease-in-out infinite` },
        "& .nl-d1": { animationDelay: "-1.4s" },
        "& .nl-d2": { animationDelay: "-2.9s" },
      }}
    >
      {/* Links between adjacent layers. */}
      <g stroke="#f2f4f8" strokeOpacity="0.09" strokeWidth="0.8">
        {NODES.slice(0, -1).map((layer, i) =>
          layer.map((a, ai) =>
            NODES[i + 1].map((b, bi) => (
              <line key={`${i}-${ai}-${bi}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
            )),
          ),
        )}
      </g>

      {/* Pulses. */}
      {ROUTES.map((r, i) => (
        <g key={i}>
          <path d={r.d} fill="none" stroke={r.color} strokeOpacity="0.2" strokeWidth="1" />
          {[0, 1, 2].map((k) => (
            <circle
              key={k}
              r={3 - k * 0.8}
              fill={k === 0 ? "#ffffff" : r.color}
              opacity={0.95 - k * 0.3}
            >
              <animateMotion
                dur={`${r.dur}s`}
                begin={`${r.begin - k * 0.09}s`}
                repeatCount="indefinite"
                path={r.d}
              />
            </circle>
          ))}
        </g>
      ))}

      {/* Nodes. */}
      {NODES.map((layer, i) =>
        layer.map((n, j) => (
          <g key={`${i}-${j}`} className={`nl-node nl-d${(i + j) % 3}`}>
            <circle
              cx={n.x}
              cy={n.y}
              r="7"
              fill="#0b0d14"
              stroke={i === 0 ? "#8ee3ff" : i === LAYERS.length - 1 ? "#a18bff" : "#f2f4f8"}
              strokeOpacity="0.55"
              strokeWidth="1"
            />
            <circle
              cx={n.x}
              cy={n.y}
              r="2.2"
              fill={i === 0 ? "#8ee3ff" : i === LAYERS.length - 1 ? "#a18bff" : "#f2f4f8"}
            />
          </g>
        )),
      )}

      <g fontFamily="'D-DIN', 'Noto Sans Devanagari', sans-serif" fontSize="8" letterSpacing="1.4" fill="#9aa3b5">
        <text x={PAD_X} y={H - 8} textAnchor="middle">
          IN
        </text>
        <text x={W / 2} y={H - 8} textAnchor="middle">
          HIDDEN
        </text>
        <text x={W - PAD_X} y={H - 8} textAnchor="middle">
          OUT
        </text>
      </g>
    </chakra.svg>
  );
};
