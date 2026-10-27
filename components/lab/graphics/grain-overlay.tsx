import * as React from "react";
import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const jitter = keyframes`
  0% { transform: translate(0, 0); }
  20% { transform: translate(-3%, 2%); }
  40% { transform: translate(2%, -3%); }
  60% { transform: translate(-2%, -1%); }
  80% { transform: translate(3%, 3%); }
  100% { transform: translate(0, 0); }
`;

const NOISE_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>" +
  "<feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.1 -0.2'/></filter>" +
  "<rect width='100%' height='100%' filter='url(#n)'/></svg>";
const NOISE_URL = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

/** Fixed film grain over the whole page, below the header. */
export const GrainOverlay: React.FC = () => (
  <Box
    aria-hidden="true"
    position="fixed"
    inset="0"
    overflow="hidden"
    pointerEvents="none"
    zIndex={1000}
  >
    <Box
      position="absolute"
      inset="-10%"
      opacity={0.06}
      backgroundImage={NOISE_URL}
      backgroundSize="220px 220px"
      animation={`${jitter} 1.2s steps(5) infinite`}
    />
  </Box>
);
