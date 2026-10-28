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
  "One system, not a portfolio.",
  "Small and dense.",
  "Evidence before announcement.",
  "Legibility from the first experiment.",
  "Long horizons.",
];

const DETAIL: Array<{ title: string; body: string }> = [
  {
    title: "One system",
    body: "Every programme feeds the same agent. Nothing we build is a demo on its own; it is a part that has to fit the rest.",
  },
  {
    title: "Small and dense",
    body: "We would rather have ten people who can each change the plan than a hundred who follow it.",
  },
  {
    title: "Evidence first",
    body: "We publish what we can verify, and we say plainly what we do not yet know. A result we cannot reproduce is not a result.",
  },
  {
    title: "Read while it learns",
    body: "Interpretability is not a review at the end. The tools that read the system are built with the system, and they run while it changes.",
  },
];

const Approach: NextPage = () => (
  <Box>
    <SEO
      title="Approach | KalKram"
      description="How KalKram works: one system, a small dense team, evidence before announcement, and legibility built in from the first experiment."
    />

    <PageHero
      title="How we work."
      lede="A small lab, one thesis, and a rule about what we say."
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
        <HudFrame credit="A hidden state carried forward in time, written to and read from without fading.">
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
        <LabHeading>In practice</LabHeading>
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
        We are not building a product this quarter. We are building the thing that comes after products.
      </Text>
      <Button as={NextLink} href="/careers" variant="cta" mt={10}>
        Join us
      </Button>
    </LabSection>
  </Box>
);

export default Approach;
