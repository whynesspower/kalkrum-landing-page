import * as React from "react";
import { chakra } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const RINGS = [
  { r: 130, dots: 1, secs: 38 },
  { r: 220, dots: 2, secs: 60 },
  { r: 320, dots: 2, secs: 90 },
  { r: 420, dots: 3, secs: 130 },
];

/** Slowly turning rings with small dots, used behind the closing call to action. */
export const OrbitGraphic: React.FC = () => (
  <chakra.svg
    aria-hidden
    viewBox="0 0 900 900"
    w="900px"
    maxW="none"
    h="900px"
    flexShrink={0}
    opacity={0.7}
  >
    {RINGS.map((ring, i) => (
      <g
        key={ring.r}
        style={{
          transformOrigin: "450px 450px",
          animation: `${spin} ${ring.secs}s linear infinite${i % 2 ? " reverse" : ""}`,
        }}
      >
        <circle
          cx="450"
          cy="450"
          r={ring.r}
          fill="none"
          style={{ stroke: "var(--chakra-colors-kk-line)" }}
          strokeWidth="1.5"
          strokeDasharray={i % 2 ? "2 10" : undefined}
        />
        {Array.from({ length: ring.dots }).map((_, d) => {
          const angle = ((d + 0.35 * (i + 1)) / ring.dots) * Math.PI * 2;
          return (
            <circle
              key={d}
              cx={450 + Math.cos(angle) * ring.r}
              cy={450 + Math.sin(angle) * ring.r}
              r={i === 0 ? 5 : 4}
              fill={d % 2 ? "#6cc4ff" : "#a18bff"}
            />
          );
        })}
      </g>
    ))}
  </chakra.svg>
);
