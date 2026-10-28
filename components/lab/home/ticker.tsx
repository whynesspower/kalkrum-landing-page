import * as React from "react";
import { Box } from "@chakra-ui/react";
import { Marquee } from "../graphics/marquee";

const ITEMS = [
  "Continual learning",
  "Catastrophic forgetting",
  "Test-time training",
  "Self-distillation",
  "State space models",
  "Mamba",
  "Linear attention",
  "Gated DeltaNet",
  "Sub-quadratic attention",
  "Hybrid architectures",
  "Mixture of experts",
  "Long-term memory modules",
  "World models",
  "JEPA",
  "Hierarchical planning",
  "Diffusion language models",
  "Mechanistic Interpretability",
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
