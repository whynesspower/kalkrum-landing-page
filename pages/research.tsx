import * as React from "react";
import type { NextPage } from "next";
import { Box, Container } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import { TimeAxis } from "components/lab/graphics/time-axis";
import { StateFlow } from "components/lab/graphics/state-flow";
import { HypothesisGraph } from "components/lab/graphics/hypothesis-graph";
import { NeuralLattice } from "components/lab/graphics/neural-lattice";
import {
  AreaPanel,
  ChipWall,
  Closing,
  OpenProblems,
  PanelArea,
  ResearchHero,
} from "components/lab/research/blocks";
import { Reveal } from "components/motion/reveal";
import { Heading } from "@chakra-ui/react";

const AREAS: PanelArea[] = [
  {
    index: "01",
    title: "Continual Learning",
    line: "Models that update on a stream of experience without overwriting what they already know.",
    terms: ["continual learning", "catastrophic forgetting", "test-time training", "self-distillation"],
    graphic: <TimeAxis />,
  },
  {
    index: "02",
    title: "Memory and Architecture",
    line: "Sequence models whose cost grows linearly with length and that still recall an exact detail from far back.",
    terms: ["state space models", "Mamba", "Gated DeltaNet", "hybrid architectures", "long-term memory modules"],
    graphic: <StateFlow />,
  },
  {
    index: "03",
    title: "World Models and Planning",
    line: "Models that predict what happens next in a learned latent space and plan many steps ahead inside it.",
    terms: ["world models", "JEPA", "hierarchical planning", "diffusion language models"],
    graphic: <HypothesisGraph />,
  },
  {
    index: "04",
    title: "Interpretability and Safety",
    line: "Reading the circuits inside a trained network, and watching how they form, so we can verify what it does.",
    terms: ["Mechanistic Interpretability", "circuits", "feature dynamics"],
    graphic: <NeuralLattice />,
  },
];

const QUESTIONS = [
  "Can test-time training replace a fixed context window?",
  "How do we measure forgetting at scale?",
  "Can hybrid architectures keep exact recall?",
  "What does a feature look like as it changes during training?",
];

const ROWS: string[][] = [
  ["Mechanistic Interpretability", "world models", "state space models", "continual learning", "Gated DeltaNet"],
  ["JEPA", "catastrophic forgetting", "Mamba", "diffusion language models", "self-distillation"],
  ["hybrid architectures", "test-time training", "mixture of experts", "long-term memory modules"],
  ["linear attention", "hierarchical planning", "sub-quadratic attention"],
];

const Research: NextPage = () => (
  <Box>
    <SEO
      title="Research | KalKram"
      description="KalKram's four research programmes: continual learning, memory and architecture, world models and planning, and interpretability and safety."
    />
    <ResearchHero />

    {AREAS.map((a, i) => (
      <AreaPanel key={a.index} area={a} flip={i % 2 === 1} />
    ))}

    <OpenProblems questions={QUESTIONS} />

    <Box
      as="section"
      aria-labelledby="agenda"
      borderTopWidth="1px"
      borderColor="kk.line"
      py={{ base: 20, md: 36 }}
      overflowX="clip"
    >
      <Container maxW="container.xl" px={{ base: 5, md: 8 }}>
        <Reveal>
          <Heading
            as="h2"
            id="agenda"
            fontFamily="display"
            textTransform="uppercase"
            fontWeight="700"
            letterSpacing="0.04em"
            fontSize="clamp(2.2rem, 6vw, 5.5rem)"
            lineHeight="1"
          >
            Technical agenda
          </Heading>
        </Reveal>
      </Container>
      <Box mt={{ base: 12, md: 20 }}>
        <ChipWall rows={ROWS} />
      </Box>
    </Box>

    <Closing />
  </Box>
);

export default Research;
