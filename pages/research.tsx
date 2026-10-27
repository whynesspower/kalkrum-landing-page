import * as React from "react";
import type { NextPage } from "next";
import { Box, Container } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import { Reveal } from "components/motion/reveal";
import { HypothesisGraph } from "components/lab/graphics/hypothesis-graph";
import { OrbitalAtom } from "components/lab/graphics/orbital-atom";
import { WaveField } from "components/lab/graphics/wave-field";
import { NeuralLattice } from "components/lab/graphics/neural-lattice";
import { LoopDiagram } from "components/lab/graphics/loop-diagram";
import {
  AreaPanel,
  BandHeading,
  ChipWall,
  Closing,
  ImageBand,
  PanelArea,
  ResearchHero,
} from "components/lab/research/blocks";

const AREAS: PanelArea[] = [
  {
    index: "01",
    title: "Scientific Reasoning",
    line: "Systems that form hypotheses, weigh evidence and know what they do not know.",
    graphic: <HypothesisGraph />,
  },
  {
    index: "02",
    title: "Autonomous Experimentation",
    line: "Closing the loop between idea and evidence, in simulation and in the lab.",
    graphic: <OrbitalAtom />,
  },
  {
    index: "03",
    title: "World Models and Simulation",
    line: "Compact models of physical and biological systems that predict, not only describe.",
    graphic: <WaveField />,
  },
  {
    index: "04",
    title: "Safety and Interpretability",
    line: "Understanding what these systems do inside, and keeping them verifiable as they grow more capable.",
    graphic: <NeuralLattice />,
  },
];

const ROWS: string[][] = [
  [
    "Mechanistic Interpretability",
    "world models",
    "state space models",
    "continual learning",
    "Gated DeltaNet",
  ],
  [
    "JEPA",
    "catastrophic forgetting",
    "Mamba",
    "diffusion language models",
    "self-distillation",
  ],
  [
    "hybrid architectures",
    "test-time training",
    "mixture of experts",
    "long-term memory modules",
  ],
  [
    "linear attention",
    "hierarchical planning",
    "sub-quadratic attention",
  ],
];

const Research: NextPage = () => (
  <Box>
    <SEO
      title="Research | KalKram"
      description="The four research areas at KalKram: scientific reasoning, autonomous experimentation, world models and simulation, and safety and interpretability."
    />
    <ResearchHero />

    <AreaPanel area={AREAS[0]} flip={false} />
    <AreaPanel area={AREAS[1]} flip />
    <ImageBand image="cosmicCliffs" fig="FIG. 01" />
    <AreaPanel area={AREAS[2]} flip={false} />
    <AreaPanel area={AREAS[3]} flip />

    <Box
      as="section"
      borderTopWidth="1px"
      borderColor="kk.line"
      py={{ base: 20, md: 36 }}
      overflowX="clip"
    >
      <Container maxW="container.xl" px={{ base: 5, md: 8 }}>
        <BandHeading
          center
          label="[ Method ]"
          title="One loop"
          line="Each stage is checked before the next one begins."
        />
        <Reveal mt={{ base: 12, md: 16 }}>
          <Box maxW="860px" mx="auto" w="100%">
            <LoopDiagram />
          </Box>
        </Reveal>
      </Container>
    </Box>

    <Box
      as="section"
      borderTopWidth="1px"
      borderColor="kk.line"
      py={{ base: 20, md: 36 }}
      overflowX="clip"
    >
      <Container maxW="container.xl" px={{ base: 5, md: 8 }}>
        <BandHeading
          label="[ Agenda ]"
          title="Technical agenda"
          line="Where our attention goes."
        />
      </Container>
      <Box mt={{ base: 12, md: 20 }}>
        <ChipWall rows={ROWS} />
      </Box>
    </Box>

    <Closing />
  </Box>
);

export default Research;
