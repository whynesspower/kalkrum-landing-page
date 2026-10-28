import * as React from "react";
import { Box } from "@chakra-ui/react";
import { useCanvasLoop } from "./use-canvas-loop";
import { createLossScene } from "./loss-landscape";
import { createAttentionScene } from "./attention-matrix";
import { createTokenScene } from "./token-stream";
import { createStateScene } from "./state-flow";
import { createMemoryScene } from "./memory-grid";

export type BackdropVariant = "contours" | "attention" | "tokens" | "state" | "memory";

const FACTORIES = {
  contours: createLossScene,
  attention: createAttentionScene,
  tokens: createTokenScene,
  state: createStateScene,
  memory: createMemoryScene,
};

const Scene: React.FC<{ variant: BackdropVariant; intensity: number }> = ({ variant, intensity }) => {
  const scene = React.useMemo(() => FACTORIES[variant]({ intensity }), [variant, intensity]);
  const ref = useCanvasLoop(scene.draw, scene.resize);
  return (
    <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
  );
};

/** Full-bleed generated background with a soft vignette so overlaid text stays readable. */
export const Backdrop: React.FC<{ variant?: BackdropVariant; intensity?: number }> = ({
  variant = "contours",
  intensity = 1,
}) => (
  <Box position="absolute" inset="0" overflow="hidden" pointerEvents="none" aria-hidden="true">
    <Scene key={variant} variant={variant} intensity={intensity} />
    <Box
      position="absolute"
      inset="0"
      bg="radial-gradient(ellipse 75% 70% at 50% 45%, rgba(5,6,10,0) 0%, rgba(5,6,10,0.3) 60%, rgba(5,6,10,0.85) 100%)"
    />
    <Box
      position="absolute"
      inset="0"
      bg="linear-gradient(180deg, rgba(5,6,10,0.7) 0%, rgba(5,6,10,0) 22%, rgba(5,6,10,0) 70%, rgba(5,6,10,0.85) 100%)"
    />
  </Box>
);
