import * as React from "react";
import type { NextPage } from "next";
import { Box, Heading, ListItem, OrderedList, Text } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import { SpotlightCard } from "components/lab/pages/spotlight-card";
import { Reveal } from "components/motion/reveal";
import { Parallax } from "components/motion/parallax";
import {
  DashedRule,
  LabHeading,
  LabSection,
  Lead,
  SectionLabel,
} from "components/lab/primitives";
import { PageHero } from "components/lab/pages/page-hero";
import { ArrowLink } from "components/lab/pages/arrow-link";
import { HypothesisGraph } from "components/lab/graphics/hypothesis-graph";
import { OrbitalAtom } from "components/lab/graphics/orbital-atom";
import { WaveField } from "components/lab/graphics/wave-field";
import { NeuralLattice } from "components/lab/graphics/neural-lattice";
import { LoopDiagram } from "components/lab/graphics/loop-diagram";

interface Area {
  index: string;
  label: string;
  title: string;
  summary: string;
  body: string;
  questions: string[];
  focus: string;
  graphic: React.ReactNode;
}

const AREAS: Area[] = [
  {
    index: "01",
    label: "Scientific Reasoning",
    title: "Scientific Reasoning",
    summary:
      "Systems that form hypotheses, weigh evidence and know what they do not know.",
    body: "A useful scientist does more than recall facts. They propose an explanation, work out what would count against it, and change their mind when the evidence says so. We study how to build that habit into AI systems: how test-time training and self-distillation might let a model refine its reasoning on a hard problem, how hierarchical planning could break a large question into checkable steps, and how to measure all of it honestly.",
    questions: [
      "How can a system tell a well supported hypothesis from one that only sounds plausible?",
      "Can test-time training and self-distillation help a model improve its reasoning on a single hard problem without losing what it already knows?",
      "Can hierarchical planning split a broad scientific question into steps that a person can check one at a time?",
    ],
    focus: "Reasoning under uncertainty",
    graphic: <HypothesisGraph />,
  },
  {
    index: "02",
    label: "Autonomous Experimentation",
    title: "Autonomous Experimentation",
    summary:
      "Closing the loop between idea and evidence, in simulation and in the lab.",
    body: "Science moves at the speed of its slowest step. We want to learn how much of the cycle from idea to result a system can carry on its own, and where a person must stay in the loop. Hierarchical planning is one open question here: how a long programme of work can be split into goals, experiments and steps that each stay cheap to check. Continual learning is another, because a system should improve with every result it sees.",
    questions: [
      "How much of the path from idea to evidence can be automated before human judgement becomes the limit?",
      "How can hierarchical planning keep an experimental programme reviewable and reproducible from the top-level goal down to each step?",
      "Through continual learning, how should a system absorb the gap when a simulation and a real experiment disagree?",
    ],
    focus: "Closed-loop discovery",
    graphic: <OrbitalAtom />,
  },
  {
    index: "03",
    label: "World Models and Simulation",
    title: "World Models and Simulation",
    summary:
      "Compact models of physical and biological systems that predict, not only describe.",
    body: "To plan an experiment, a system needs some picture of how the world responds. We study world models that capture how a physical or biological system behaves, including JEPA-style objectives that predict in a learned representation space instead of raw detail. We also look at diffusion language models as another way to generate and refine structured hypotheses, and at ways to test whether a model has learned the mechanism or only the pattern.",
    questions: [
      "How can we test that a model learned the underlying mechanism and not only patterns in its training data?",
      "Can a JEPA-style world model carry across scales, from molecules to cells to whole organisms?",
      "Where do diffusion language models help, and where do they fall short of autoregressive ones, when the task is to propose and revise a scientific hypothesis?",
    ],
    focus: "Prediction and mechanism",
    graphic: <WaveField />,
  },
  {
    index: "04",
    label: "Safety and Interpretability",
    title: "Safety and Interpretability",
    summary:
      "Understanding what these systems are doing inside, and keeping them verifiable as they grow more capable.",
    body: "A system that can run its own experiments can also be wrong in ways that matter. Safety work sits inside each research programme at KalKram. We pursue Mechanistic Interpretability, the effort to reverse engineer the circuits and features inside a model, and we try to keep our checks effective as capability grows.",
    questions: [
      "Can Mechanistic Interpretability read a model's internal reasoning well enough to catch a wrong conclusion before anyone acts on it?",
      "Which behaviours must be verified before a system is allowed to run its own experiments?",
      "How do we keep methods of oversight working as the systems under review become more capable?",
    ],
    focus: "Verification at scale",
    graphic: <NeuralLattice />,
  },
];

const AGENDA = [
  {
    title: "Efficient architectures",
    note: "How to build capable models that cost less to run on long inputs.",
    terms: [
      ["State space models", "Sequence models that carry a compact running state instead of looking back at every token."],
      ["Mamba", "A selective state space design that decides what to keep or drop as it reads."],
      ["Linear attention", "Attention rewritten so its cost grows in step with input length."],
      ["Gated DeltaNet", "A linear-attention recurrence that can both write to and erase from its memory."],
      ["Sub-quadratic attention", "Any scheme that avoids the quadratic cost of comparing every token with every other."],
      ["Mixture of experts", "Models that route each input to a small set of specialist sub-networks."],
      ["Hybrid architectures", "Designs that mix attention layers with recurrent or state space layers."],
    ],
  },
  {
    title: "Learning that lasts",
    note: "How a system keeps learning without losing what it already knows.",
    terms: [
      ["Continual learning", "Updating a model over time as new data and results arrive."],
      ["Catastrophic forgetting", "The loss of earlier skills when a model is trained on something new."],
      ["Self-distillation", "A model learning from its own outputs to refine and stabilise its behaviour."],
      ["Test-time training", "Adjusting a model on the problem in front of it while it works."],
      ["Long-term memory modules", "Components that store and recall knowledge beyond a single context window."],
    ],
  },
  {
    title: "Models of the world",
    note: "How a system builds a picture of reality and plans against it.",
    terms: [
      ["World models", "Learned models of how an environment responds to actions."],
      ["JEPA", "Joint-embedding predictive architectures, which predict in representation space."],
      ["Diffusion language models", "Language models that generate text by iterative denoising rather than one token at a time."],
      ["Hierarchical planning", "Planning that works at several levels, from broad goals down to single steps."],
    ],
  },
  {
    title: "Understanding the machine",
    note: "How we look inside a model and check what it is really doing.",
    terms: [
      ["Mechanistic Interpretability", "Reverse engineering the features and circuits inside a trained network."],
    ],
  },
];

const AreaSection: React.FC<{ area: Area; flip: boolean }> = ({
  area,
  flip,
}) => (
  <LabSection>
    <Box
      display="grid"
      gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
      gap={{ base: 10, lg: 20 }}
      alignItems="center"
    >
      <Reveal order={{ base: 1, lg: flip ? 2 : 1 }}>
        <SectionLabel index={area.index}>{area.label}</SectionLabel>
        <LabHeading mt={5}>{area.title}</LabHeading>
        <Lead mt={6} color="kk.fg">
          {area.summary}
        </Lead>
        <Text mt={5} color="kk.muted" lineHeight="1.75" maxW="34rem">
          {area.body}
        </Text>

        <Heading
          as="h3"
          mt={10}
          mb={4}
          fontFamily="mono"
          fontSize="xs"
          fontWeight="400"
          letterSpacing="0.18em"
          textTransform="uppercase"
          color="kk.fg"
        >
          Questions we are asking
        </Heading>
        <OrderedList
          m={0}
          spacing={4}
          maxW="34rem"
          listStyleType="none"
          sx={{ counterReset: "q" }}
        >
          {area.questions.map((q) => (
            <ListItem
              key={q}
              display="grid"
              gridTemplateColumns="2rem 1fr"
              color="kk.muted"
              lineHeight="1.6"
              borderTopWidth="1px"
              borderColor="kk.line"
              pt={4}
              sx={{
                counterIncrement: "q",
                "&::before": {
                  content: 'counter(q, decimal-leading-zero)',
                  fontFamily: "var(--chakra-fonts-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  color: "var(--chakra-colors-kk-accent)",
                  paddingTop: "0.3rem",
                },
              }}
            >
              {q}
            </ListItem>
          ))}
        </OrderedList>

        <Text
          mt={8}
          display="inline-block"
          fontFamily="mono"
          fontSize="xs"
          letterSpacing="0.14em"
          textTransform="uppercase"
          color="kk.violet"
          borderWidth="1px"
          borderColor="kk.line"
          borderRadius="full"
          px={4}
          py={1.5}
        >
          Focus / {area.focus}
        </Text>
      </Reveal>

      <Parallax
        distance={flip ? 24 : -24}
        order={{ base: 2, lg: flip ? 1 : 2 }}
        aria-hidden="true"
      >
        <Box
          maxW="480px"
          mx="auto"
          w="100%"
          p={{ base: 4, md: 8 }}
          borderWidth="1px"
          borderColor="kk.line"
          borderRadius="xl"
          bg="kk.surface"
        >
          {area.graphic}
        </Box>
      </Parallax>
    </Box>
  </LabSection>
);

const Research: NextPage = () => (
  <Box>
    <SEO
      title="Research | KalKram"
      description="The four research areas at KalKram: scientific reasoning, autonomous experimentation, world models and simulation, and safety and interpretability."
    />
    <PageHero
      eyebrow="[ Research ]"
      title="Research"
      image="deepField"
      description="KalKram studies how to build AI systems that can do science. Our work spans how a system reasons about evidence, how it runs experiments, how it models the world, and how we keep it understandable. We treat capability and safety as one programme, and we describe the questions here as open ones."
    />

    {AREAS.map((area, i) => (
      <React.Fragment key={area.index}>
        <AreaSection area={area} flip={i % 2 === 1} />
        <DashedRule />
      </React.Fragment>
    ))}

    <LabSection>
      <Reveal maxW="46rem">
        <SectionLabel index="05">TECHNICAL AGENDA</SectionLabel>
        <LabHeading mt={5}>What we are working through</LabHeading>
        <Lead mt={6}>
          These are the research directions and open questions behind the four
          areas above. We list them to show where our attention goes, not to
          claim results.
        </Lead>
      </Reveal>
      <Box
        mt={{ base: 10, md: 16 }}
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={5}
      >
        {AGENDA.map((g, gi) => (
          <Reveal key={g.title} delay={(gi % 2) * 0.08}>
            <SpotlightCard h="100%">
              <Text
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="0.18em"
                color="kk.accent"
                mb={5}
              >
                {`A.0${gi + 1}`}
              </Text>
              <Heading
                as="h3"
                fontFamily="display"
                textTransform="uppercase"
                letterSpacing="0.06em"
                fontWeight="700"
                fontSize={{ base: "2xl", md: "3xl" }}
                lineHeight="1.15"
              >
                {g.title}
              </Heading>
              <Text mt={3} color="kk.muted" lineHeight="1.7">
                {g.note}
              </Text>
              <Box mt={6}>
                {g.terms.map(([term, desc]) => (
                  <Box
                    key={term}
                    borderTopWidth="1px"
                    borderColor="kk.line"
                    py={3}
                    display="grid"
                    gridTemplateColumns={{ base: "1fr", sm: "11.5rem 1fr" }}
                    columnGap={4}
                    rowGap={1}
                  >
                    <Text
                      fontFamily="mono"
                      fontSize="xs"
                      letterSpacing="0.06em"
                      color="kk.violet"
                      pt="0.2rem"
                    >
                      {term}
                    </Text>
                    <Text color="kk.muted" fontSize="sm" lineHeight="1.6">
                      {desc}
                    </Text>
                  </Box>
                ))}
              </Box>
            </SpotlightCard>
          </Reveal>
        ))}
      </Box>
    </LabSection>

    <DashedRule />

    <LabSection>
      <Box textAlign="center" maxW="46rem" mx="auto">
        <Reveal>
          <SectionLabel index="06">Method</SectionLabel>
          <LabHeading mt={5}>One loop, run with care.</LabHeading>
          <Lead mt={6}>
            Our method is a loop. A question leads to a hypothesis, the
            hypothesis to an experiment, the experiment to evidence, and the
            evidence to understanding that raises the next question. We check
            each stage before the next one begins.
          </Lead>
        </Reveal>
      </Box>
      <Reveal mt={{ base: 12, md: 16 }}>
        <Box maxW="760px" mx="auto" w="100%">
          <LoopDiagram />
        </Box>
      </Reveal>
    </LabSection>

    <DashedRule />

    <LabSection>
      <Reveal maxW="46rem">
        <SectionLabel index="07">Our standard</SectionLabel>
        <LabHeading mt={5}>We publish only what we can verify.</LabHeading>
        <Lead mt={6}>
          Claims about AI and science are easy to make and hard to check. We
          will share results when we can stand behind them, and we will say
          plainly what we do not yet know. If these questions matter to you,
          come and work on them with us.
        </Lead>
        <Box mt={8}>
          <ArrowLink href="/careers">Join us on the careers page</ArrowLink>
        </Box>
      </Reveal>
    </LabSection>
  </Box>
);

export default Research;
