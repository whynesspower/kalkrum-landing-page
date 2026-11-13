import * as React from "react";
import type { NextPage } from "next";
import NextLink from "next/link";
import { Box, Button, Link, Text } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import { Reveal } from "components/motion/reveal";
import { Parallax } from "components/motion/parallax";
import { DashedRule, LabHeading, LabSection, Lead } from "components/lab/primitives";
import { PageHero } from "components/lab/page-hero";
import { WordReveal } from "components/lab/graphics/word-reveal";
import { HudFrame } from "components/lab/graphics/hud-frame";
import { LossLandscape } from "components/lab/graphics/loss-landscape";
import { NetworkField } from "components/lab/graphics/network-field";

const SECTIONS: Array<{ title: string; body: string[] }> = [
  {
    title: "Discovery has started",
    body: [
      "This year machines began settling questions left open for decades. The flagship result, OpenAI's Navier-Stokes, took about ten thousand agents and 130 billion output tokens.",
      "Discovery by machine is possible. At that cost, only a few can pay for it.",
    ],
  },
  {
    title: "The cost of discovery is the cost of search",
    body: [
      "A hard problem is a vast space with a thin region where answers live. Brute force pays for all of it. Structure, whether a symmetry, an identity or a way the problem splits, tells you where to look.",
      "Our Hadamard engines run up to 47,000× faster than published times. Our quantum-code distance engine grows its effort about five-fold per step, where the best published tool grows ten-fold. All of it on one machine with an 8 GB GPU.",
      "The question is not how much compute a discovery needs. It is how much structure you found first.",
    ],
  },
  {
    title: "Generalisation is reuse",
    body: [
      "A system generalises when it recognises, in a new problem, a structure it has met before. So every verified result leaves behind a detector, a checker and a solver, and the next problem starts further along.",
      "That is compounding for science: less compute per discovery, not more.",
    ],
  },
  {
    title: "Verification is the product",
    body: [
      "Generating candidates is cheap. Knowing which are true is scarce. Every result we accept is re-derived by multiple separately written verifiers and, where possible, ships with a certificate anyone can check.",
      "When a result rests on one engine, may not be new, or someone got there first, we say so. A discovery engine that overclaims is worse than none.",
    ],
  },
  {
    title: "Where it goes",
    body: [
      "We began in mathematics, where a computer can tell right from wrong. Designs led to codes, codes to quantum memory, and the same engines now work on SAT, metabolic networks and materials. Anywhere an answer can be checked is within reach.",
    ],
  },
  {
    title: "What we mean by superintelligence",
    body: [
      "Not a benchmark score but a record: discoveries no person made, each verified, each making the next cheaper. That is what we are building.",
    ],
  },
];

const Vision: NextPage = () => (
  <Box>
    <SEO
      title="Vision | KalKram"
      description="Why KalKram exists: the cost of discovery is the cost of search. Structure makes search small, and verification makes every result compound."
    />

    <PageHero
      title="Superintelligence will be measured in discoveries."
      lede="The first generation of AI learned from what people had written down. It stops where that knowledge stops."
      image="southernRing"
      backdrop="contours"
      position="50% 50%"
    />

    <LabSection py={{ base: 20, md: 36 }} decor={<NetworkField density={0.5} />}>
      <Box maxW="60rem">
        <WordReveal
          text="The test now is the edge: can a machine find something true that no one has written down, and can anyone trust it?"
          fontFamily="display"
          fontWeight="500"
          fontSize="clamp(1.5rem, 3vw, 2.8rem)"
          lineHeight="1.25"
          letterSpacing="0.01em"
        />
      </Box>
    </LabSection>

    <Box px={{ base: 5, md: 8 }} py={{ base: 6, md: 10 }} borderTopWidth="1px" borderColor="kk.line">
      <Parallax distance={30}>
        <HudFrame credit="A search space, and the narrow paths that structure opens through it.">
          <Box position="relative" h={{ base: "52svh", md: "78vh" }} minH="380px" overflow="hidden">
            <Box position="absolute" inset="0">
              <LossLandscape size="100%" />
            </Box>
          </Box>
        </HudFrame>
      </Parallax>
    </Box>

    {SECTIONS.map(({ title, body }) => (
      <LabSection key={title} py={{ base: 16, md: 24 }} borderTopWidth="1px" borderColor="kk.line">
        <Reveal>
          <LabHeading maxW="48rem">{title}</LabHeading>
        </Reveal>
        <Box mt={{ base: 6, md: 10 }} maxW="44rem">
          {body.map((p) => (
            <Reveal key={p}>
              <Lead mb={5}>{p}</Lead>
            </Reveal>
          ))}
        </Box>
      </LabSection>
    ))}

    <DashedRule />

    <LabSection>
      <Text fontFamily="mono" fontSize="xs" letterSpacing="0.06em" color="kk.muted" maxW="44rem">
        1. OpenAI,{" "}
        <Link href="https://openai.com/index/navier-stokes-solution" isExternal color="kk.accent">
          &ldquo;On the Navier-Stokes Millennium Prize Problem&rdquo;
        </Link>
        , 2026.
      </Text>
      <Button as={NextLink} href="/research" variant="cta" mt={10}>
        See our research
      </Button>
    </LabSection>
  </Box>
);

export default Vision;
