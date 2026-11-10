import * as React from "react";
import type { NextPage } from "next";
import NextLink from "next/link";
import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import { Reveal } from "components/motion/reveal";
import { Parallax } from "components/motion/parallax";
import { DashedRule, LabHeading, LabSection } from "components/lab/primitives";
import { PageHero, StatementRows } from "components/lab/page-hero";
import { HudFrame } from "components/lab/graphics/hud-frame";
import { StateFlow } from "components/lab/graphics/state-flow";
import { WaveField } from "components/lab/graphics/wave-field";

const RULES = [
  "Find the structure.",
  "Compile a solver.",
  "Optimise, simulate, experiment, verify.",
  "Prove it.",
  "Keep everything.",
];

const DETAIL: Array<{ title: string; body: string }> = [
  {
    title: "Find the structure",
    body: "General solvers pay for the whole search space. Structure, whether a symmetry, an identity or a way the problem splits, shows where answers can live. So the system first runs detectors over the problem, and commits to a structure only after a checker confirms it holds.",
  },
  {
    title: "Compile a solver",
    body: "A compiler turns the problem's model into an engine made for that structure alone: its own data layout, pruning and symmetry breaking. We hand-built the FLC method for Williamson, good and best matrices. The compiler now matches it automatically.",
  },
  {
    title: "Prove it",
    body: "Every result we accept is re-derived by multiple separately written verifiers, so a bug in one is unlikely to repeat in the others. Where one engine stands behind a claim, a case was closed internally, novelty is unsettled, or someone got there first, the log says so.",
  },
  {
    title: "Keep everything",
    body: "Every verified result leaves behind a detector, a checker and a solver. The next problem starts from that library. And it runs on hardware a university lab already owns.",
  },
];

const Approach: NextPage = () => (
  <Box>
    <SEO
      title="Approach | KalKram"
      description="How KalKram makes discoveries: find the structure in a problem, compile a solver for it, run an optimise, simulate, experiment, verify loop, and re-derive every result with independent verifiers."
    />

    <PageHero
      title="How a discovery gets made."
      lede="Most search is spent where no answer can be. Our system works out what a problem is made of, builds a solver for exactly that, and keeps every tool it makes."
      image="cosmicCliffs"
      backdrop="state"
      position="50% 60%"
    />

    <LabSection>
      <Reveal>
        <StatementRows lines={RULES} size="clamp(1.7rem, 4.2vw, 3.6rem)" />
      </Reveal>
    </LabSection>

    <Box px={{ base: 5, md: 8 }} py={{ base: 6, md: 10 }} borderTopWidth="1px" borderColor="kk.line">
      <Parallax distance={-24}>
        <HudFrame credit="The loop. Every verified result feeds the library every later run starts from.">
          <Box position="relative" h={{ base: "52svh", md: "74vh" }} minH="380px" overflow="hidden">
            <Box position="absolute" inset="0">
              <StateFlow size="100%" />
            </Box>
          </Box>
        </HudFrame>
      </Parallax>
    </Box>

    <LabSection position="relative" overflow="hidden">
      <Box
        aria-hidden="true"
        position="absolute"
        inset="0"
        opacity={0.35}
        pointerEvents="none"
      >
        <WaveField size="100%" />
      </Box>
      <Reveal>
        <LabHeading>Each discovery makes the next one cheaper.</LabHeading>
      </Reveal>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={{ md: 16 }} spacingY={{ base: 8, md: 12 }} mt={{ base: 10, md: 16 }}>
        {DETAIL.map(({ title, body }) => (
          <Reveal key={title}>
            <Box borderTopWidth="1px" borderColor="kk.line" pt={{ base: 5, md: 6 }}>
              <Text
                fontFamily="display"
                textTransform="uppercase"
                fontWeight="700"
                fontSize={{ base: "xl", md: "2xl" }}
                letterSpacing="0.05em"
              >
                {title}
              </Text>
              <Text mt="3" color="kk.muted" fontSize={{ base: "md", md: "lg" }} lineHeight="1.65" maxW="34rem">
                {body}
              </Text>
            </Box>
          </Reveal>
        ))}
      </SimpleGrid>
    </LabSection>

    <DashedRule />

    <LabSection>
      <Text
        fontFamily="display"
        textTransform="uppercase"
        fontWeight="700"
        fontSize="clamp(1.5rem, 3.6vw, 2.8rem)"
        lineHeight="1.1"
        letterSpacing="0.04em"
        maxW="52rem"
        sx={{ textWrap: "balance" }}
      >
        The loop, not any single model, is what makes the output trustworthy.
      </Text>
      <Button as={NextLink} href="/careers" variant="cta" mt={10}>
        Join us
      </Button>
    </LabSection>
  </Box>
);

export default Approach;
