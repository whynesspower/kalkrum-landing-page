import * as React from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import { SCIENCE_IMAGES, ScienceImageKey } from "data/images";
import { LogoWatermark } from "../logo-mark";
import { LabSection, SectionLabel } from "../primitives";
import { HudFrame } from "../graphics/hud-frame";
import { WordReveal } from "../graphics/word-reveal";
import { NeuralLattice } from "../graphics/neural-lattice";
import { HypothesisGraph } from "../graphics/hypothesis-graph";
import { LoopDiagram } from "../graphics/loop-diagram";
import { DnaHelix } from "../graphics/dna-helix";
import { Glow, LazyWhenVisible } from "../home/shared";
import { ZoomImage } from "./zoom-frame";

const STATEMENT = "Scientific superintelligence. Built in software. Safe by design.";
const LEAD =
  "Autonomous agents that propose hypotheses, run computational experiments and judge which are worth running.";

const PILLARS: {
  n: string;
  title: string;
  line: string;
  image: ScienceImageKey;
  graphic: React.ReactNode;
}[] = [
  {
    n: "01",
    title: "Hypotheses to experiments",
    line: "Agents propose, then test, their own ideas.",
    image: "pillars",
    graphic: <HypothesisGraph size="min(100%, 380px)" />,
  },
  {
    n: "02",
    title: "Taste in research",
    line: "Knowing which experiments deserve to run.",
    image: "southernRing",
    graphic: <NeuralLattice size="min(100%, 420px)" />,
  },
  {
    n: "03",
    title: "Safety in the programme",
    line: "Built alongside capability, never after it.",
    image: "deepField",
    graphic: <LoopDiagram w="min(100%, 400px)" />,
  },
];

const Pillar: React.FC<{ p: (typeof PILLARS)[number]; flip: boolean }> = ({ p, flip }) => {
  const img = SCIENCE_IMAGES[p.image];
  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "5fr 7fr" }}
      gap={{ base: 6, lg: 16 }}
      alignItems="center"
    >
      <Reveal order={{ base: 1, lg: flip ? 2 : 1 }}>
        <Text
          aria-hidden="true"
          fontFamily="display"
          fontWeight="700"
          lineHeight="0.85"
          fontSize="clamp(6rem, 17vw, 14rem)"
          letterSpacing="0.02em"
          color="transparent"
          sx={{ WebkitTextStroke: "1px rgba(142,227,255,0.55)" }}
        >
          {p.n}
        </Text>
        <Text
          as="h3"
          mt={{ base: 4, md: 6 }}
          fontFamily="display"
          textTransform="uppercase"
          letterSpacing="0.06em"
          fontWeight="700"
          fontSize={{ base: "2xl", md: "3xl" }}
          lineHeight="1.1"
        >
          {p.title}
        </Text>
        <Text mt={2} fontFamily="mono" fontSize="xs" letterSpacing="0.1em" color="kk.muted">
          {p.line}
        </Text>
      </Reveal>
      <Reveal order={{ base: 2, lg: flip ? 1 : 2 }} delay={0.08}>
        <HudFrame label={`FIG. ${p.n} / ${img.title}`} credit={img.credit}>
          <ZoomImage
            image={p.image}
            aspectRatio={{ base: "4 / 3", lg: "16 / 11" }}
            distance={-60}
            sizes="(min-width: 62em) 58vw, 100vw"
            opacity={0.8}
          >
            <Box position="absolute" inset="0" bg="rgba(5,6,10,0.35)" />
            <LazyWhenVisible display="flex" alignItems="center" justifyContent="center" p={4}>
              {p.graphic}
            </LazyWhenVisible>
          </ZoomImage>
        </HudFrame>
      </Reveal>
    </Grid>
  );
};

/** The vision: one statement, three pillars, big imagery and graphics. */
export const VisionBlock: React.FC<{ id?: string }> = ({ id }) => {
  const band = SCIENCE_IMAGES.cosmicCliffs;
  return (
    <>
      <LabSection
        id={id}
        decor={
          <>
            <LogoWatermark size={560} top="14%" right="-180px" opacity={0.07} distance={-70} />
            <Glow color="#a18bff" size={700} top="-120px" left="-260px" distance={-80} opacity={0.14} />
            <Glow color="#5b7cff" size={560} bottom="0" right="-200px" distance={-50} opacity={0.12} />
          </>
        }
      >
        <SectionLabel index="01">Vision</SectionLabel>
        <WordReveal
          as="h2"
          text={STATEMENT}
          mt={{ base: 8, md: 12 }}
          maxW="1100px"
          fontFamily="display"
          fontWeight="700"
          textTransform="uppercase"
          fontSize="clamp(2.4rem, 7.2vw, 6.5rem)"
          lineHeight="1.02"
          letterSpacing="0.03em"
        />
        <Reveal>
          <Text mt={{ base: 8, md: 10 }} maxW="40rem" color="kk.muted" fontSize={{ base: "md", md: "lg" }} lineHeight="1.6">
            {LEAD}
          </Text>
        </Reveal>

        <Box mt={{ base: 20, md: 32 }} display="grid" gap={{ base: 20, md: 32 }}>
          {PILLARS.map((p, i) => (
            <Pillar key={p.n} p={p} flip={i % 2 === 1} />
          ))}
        </Box>
      </LabSection>

      <Box
        as="figure"
        m={0}
        position="relative"
        borderTopWidth="1px"
        borderBottomWidth="1px"
        borderColor="kk.line"
      >
        <ZoomImage
          image="cosmicCliffs"
          h={{ base: "62vh", md: "78vh" }}
          minH="400px"
          distance={-90}
          zoom={[1.05, 1.3]}
          opacity={0.8}
        >
          <Box position="absolute" inset="0" bg="rgba(5,6,10,0.4)" />
          <Box position="absolute" inset="0" display="flex" alignItems="center" px={{ base: 5, md: 8 }}>
            <Box maxW="container.xl" mx="auto" w="100%">
              <Text
                as="p"
                fontFamily="display"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.04em"
                lineHeight="1"
                fontSize="clamp(2.4rem, 8vw, 7.5rem)"
                maxW="14ch"
                textShadow="0 2px 40px rgba(5,6,10,0.8)"
              >
                Judged on long-horizon research
              </Text>
            </Box>
          </Box>
          <Box
            position="absolute"
            right={{ base: 4, md: 10 }}
            bottom={{ base: 4, md: 8 }}
            w={{ base: "70px", md: "110px" }}
            opacity={0.5}
            aria-hidden="true"
          >
            <DnaHelix />
          </Box>
        </ZoomImage>
        <Text
          as="figcaption"
          position="absolute"
          left={{ base: 5, md: 8 }}
          bottom={4}
          fontFamily="mono"
          fontSize="10px"
          letterSpacing="0.16em"
          textTransform="uppercase"
          color="kk.muted"
        >
          FIG. 04 / {band.title} / {band.credit}
        </Text>
      </Box>
    </>
  );
};
