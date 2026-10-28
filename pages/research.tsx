import * as React from "react";
import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import { TimeAxis } from "components/lab/graphics/time-axis";
import { StateFlow } from "components/lab/graphics/state-flow";
import { NeuralLattice } from "components/lab/graphics/neural-lattice";
import {
  AreaPanel,
  Closing,
  OpenProblems,
  PanelArea,
  ResearchHero,
} from "components/lab/research/blocks";

const AREAS: PanelArea[] = [
  {
    index: "01",
    title: "Learning from experience",
    paragraph:
      "An agent that improves from its own actions and their consequences over months and years, with no training run that ends and no catastrophic forgetting of what it already knows. We work on continual learning and test-time training, on self-distillation as the way a long run compresses itself, and on world models, including JEPA-style latent predictors and diffusion language models, that let the agent predict and plan hierarchically over horizons far longer than any single episode.",
    graphic: <TimeAxis />,
  },
  {
    index: "02",
    title: "Memory and architecture",
    paragraph:
      "A lifetime does not fit in a context window. We build sequence models whose cost grows linearly with time and whose memory does not fade: state space models such as Mamba, linear attention and Gated DeltaNet, sub-quadratic attention, and hybrid architectures that pair them with explicit long-term memory modules and mixture of experts routing.",
    graphic: <StateFlow />,
  },
  {
    index: "03",
    title: "Legibility",
    paragraph:
      "A mind that keeps learning cannot be audited once. We do mechanistic interpretability on a moving target: tracing circuits and features as they form, change and disappear across a lifetime of learning, so that capability never runs ahead of our ability to read it.",
    graphic: <NeuralLattice />,
  },
];

const QUESTIONS = [
  "Can a model keep learning at test time without a separate training run, and without forgetting?",
  "What does a feature look like while it is being learned?",
  "Can linear-time memory keep exact recall across a lifetime?",
  "Where do grounded rewards come from when the goal is years away?",
];

const Research: NextPage = () => (
  <Box>
    <SEO
      title="Research | KalKram"
      description="KalKram's three research programmes: learning from experience, memory and architecture, and legibility."
    />
    <ResearchHero />

    {AREAS.map((a, i) => (
      <AreaPanel key={a.index} area={a} flip={i % 2 === 1} />
    ))}

    <OpenProblems questions={QUESTIONS} />

    <Closing />
  </Box>
);

export default Research;
