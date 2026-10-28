import * as React from "react";
import type { NextPage } from "next";
import NextLink from "next/link";
import { Box, Button, Text } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import { Reveal } from "components/motion/reveal";
import { Parallax } from "components/motion/parallax";
import { DashedRule, LabHeading, LabSection } from "components/lab/primitives";
import { PageHero, StatementRows } from "components/lab/page-hero";
import { WordReveal } from "components/lab/graphics/word-reveal";
import { HudFrame } from "components/lab/graphics/hud-frame";
import { LossLandscape } from "components/lab/graphics/loss-landscape";
import { NetworkField } from "components/lab/graphics/network-field";

const STATEMENT = [
  "Every model in use today learned from the recorded past of humans, then stopped. It cannot act, remember what happened, or get better from it. What it knows is a ceiling.",
  "A mind with no such ceiling learns the way living things learn: from a continuous stream of its own actions and their consequences, with goals that reach years ahead and rewards grounded in the world rather than in human approval. It will reason in ways we did not teach it. It will find things no one has written down.",
  "KalKram exists to build that mind, and to build it so that we can still read it.",
];

const BELIEFS = [
  "Human data is a ceiling. Experience is not.",
  "A lifetime of memory should cost a lifetime, not its square.",
  "A mind that keeps changing must stay readable while it changes.",
  "Superintelligence will not be trained. It will be lived.",
];

const Vision: NextPage = () => (
  <Box>
    <SEO
      title="Vision | KalKram"
      description="Why the next intelligence will learn from its own life instead of from the recorded past of humans, and why it must stay legible."
    />

    <PageHero
      title="A mind with no ceiling."
      lede="Why the next intelligence will be lived, not trained."
      image="southernRing"
      backdrop="contours"
      position="50% 50%"
    />

    <LabSection py={{ base: 20, md: 36 }} decor={<NetworkField density={0.5} />}>
      <Box maxW="60rem">
        {STATEMENT.map((text) => (
          <WordReveal
            key={text}
            text={text}
            fontFamily="display"
            fontWeight="500"
            fontSize="clamp(1.4rem, 2.6vw, 2.4rem)"
            lineHeight="1.3"
            letterSpacing="0.01em"
            mb={{ base: 6, md: 8 }}
            _last={{ mb: 0 }}
          />
        ))}
      </Box>
    </LabSection>

    <Box px={{ base: 5, md: 8 }} py={{ base: 6, md: 10 }} borderTopWidth="1px" borderColor="kk.line">
      <Parallax distance={30}>
        <HudFrame credit="A loss surface, and the paths an optimiser takes down it.">
          <Box position="relative" h={{ base: "52svh", md: "78vh" }} minH="380px" overflow="hidden">
            <Box position="absolute" inset="0">
              <LossLandscape size="100%" />
            </Box>
          </Box>
        </HudFrame>
      </Parallax>
    </Box>

    <LabSection>
      <Reveal>
        <LabHeading>What we believe</LabHeading>
      </Reveal>
      <Box mt={{ base: 10, md: 16 }}>
        <Reveal>
          <StatementRows lines={BELIEFS} />
        </Reveal>
      </Box>
    </LabSection>

    <DashedRule />

    <LabSection>
      <Text
        fontFamily="mono"
        fontSize={{ base: "xs", md: "sm" }}
        letterSpacing="0.08em"
        color="kk.muted"
        maxW="44rem"
      >
        कालक्रम means chronology, the order in which things happen. Intelligence is
        made of it.
      </Text>
      <Button as={NextLink} href="/research" variant="cta" mt={10}>
        Research
      </Button>
    </LabSection>
  </Box>
);

export default Vision;
