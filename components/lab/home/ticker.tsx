import * as React from "react";
import { Box } from "@chakra-ui/react";
import { Marquee } from "../graphics/marquee";

const ITEMS = [
  "Scientific reasoning",
  "World models",
  "JEPA",
  "State space models",
  "Mamba",
  "Linear attention",
  "Gated DeltaNet",
  "Sub-quadratic attention",
  "Mixture of experts",
  "Hybrid architectures",
  "Diffusion language models",
  "Continual learning",
  "Catastrophic forgetting",
  "Self-distillation",
  "Test-time training",
  "Long-term memory modules",
  "Hierarchical planning",
  "Mechanistic Interpretability",
  "Autonomous experimentation",
];

export const Ticker: React.FC = () => (
  <Box
    borderTopWidth="1px"
    borderBottomWidth="1px"
    borderColor="kk.line"
    bg="kk.canvas"
    py="4"
    overflow="hidden"
  >
    <Marquee items={ITEMS} speed={40} />
  </Box>
);
