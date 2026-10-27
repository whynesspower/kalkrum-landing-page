import * as React from "react";
import { Box } from "@chakra-ui/react";

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

/** Fine film grain that stops large gradients from looking flat. */
export const NoiseOverlay: React.FC = () => (
  <Box
    aria-hidden
    position="absolute"
    inset="0"
    pointerEvents="none"
    opacity={0.07}
    mixBlendMode="overlay"
    sx={{ backgroundImage: NOISE }}
  />
);
