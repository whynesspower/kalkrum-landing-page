import { useMinWidth } from "hooks/use-min-width";
import * as React from "react";
import NextLink from "next/link";
import {
  Box,
  Flex,
  Grid,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { Parallax } from "components/motion/parallax";
import { Reveal } from "components/motion/reveal";
import { LabHeading, LabSection, Lead, SectionLabel } from "../primitives";
import { HypothesisGraph } from "../graphics/hypothesis-graph";
import { OrbitalAtom } from "../graphics/orbital-atom";
import { WaveField } from "../graphics/wave-field";
import { NeuralLattice } from "../graphics/neural-lattice";
import { Glow } from "./shared";

const AREAS = [
  {
    n: "01",
    title: "Scientific Reasoning",
    body: "Hypotheses, evidence and hierarchical planning, with test-time training and self-distillation to sharpen reasoning.",
    Graphic: HypothesisGraph,
  },
  {
    n: "02",
    title: "Autonomous Experimentation",
    body: "Closing the loop from idea to evidence with hierarchical planning, and continual learning from every result.",
    Graphic: OrbitalAtom,
  },
  {
    n: "03",
    title: "World Models and Simulation",
    body: "World models that predict, not only describe, studied through JEPA and diffusion language models.",
    Graphic: WaveField,
  },
  {
    n: "04",
    title: "Safety and Interpretability",
    body: "Mechanistic Interpretability to see what these systems do inside, and to keep them verifiable as they grow.",
    Graphic: NeuralLattice,
  },
];

// Left column drifts one way, right column the other.
const COLUMN_DISTANCE = [14, -14];

const AreaCard: React.FC<{
  area: (typeof AREAS)[number];
  index: number;
}> = ({ area, index }) => {
  const isMd = useMinWidth(768);
  const d = isMd ? COLUMN_DISTANCE[index % 2] : 0;
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const { Graphic } = area;

  return (
    <Parallax distance={d ?? 0} h="100%">
      <Reveal delay={(index % 2) * 0.1} h="100%">
        <LinkBox
          role="group"
          onMouseMove={onMove}
          position="relative"
          overflow="hidden"
          display="flex"
          flexDirection="column"
          h="100%"
          p={{ base: 6, md: 9 }}
          borderWidth="1px"
          borderColor="kk.line"
          borderRadius="2xl"
          bg="kk.surface"
          transition="border-color .3s ease, transform .3s ease"
          _hover={{ borderColor: "rgba(142,227,255,0.35)" }}
        >
          <Box
            aria-hidden
            position="absolute"
            inset="0"
            pointerEvents="none"
            opacity={0}
            transition="opacity .3s ease"
            _groupHover={{ opacity: 1 }}
            sx={{
              background:
                "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(142,227,255,0.12), transparent 60%)",
            }}
          />
          <Flex justify="space-between" align="center" position="relative">
            <Text
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.18em"
              color="kk.accent"
            >
              [{area.n}]
            </Text>
            <Text
              aria-hidden
              fontSize="xl"
              color="kk.muted"
              transition="transform .3s ease, color .3s ease"
              _groupHover={{ color: "kk.accent", transform: "translate(4px,-4px)" }}
            >
              ↗
            </Text>
          </Flex>
          <Box
            position="relative"
            mx="auto"
            my={{ base: 6, md: 8 }}
            w="100%"
            maxW="440px"
            h={{ base: "220px", md: "280px" }}
            sx={{ "& > svg": { width: "100%", height: "100%" } }}
          >
            <Graphic />
          </Box>
          <Box position="relative" mt="auto">
            <Text
              as="h3"
              fontFamily="display"
              textTransform="uppercase"
              letterSpacing="0.06em"
              fontWeight="700"
              fontSize={{ base: "2xl", md: "3xl" }}
              lineHeight="1.1"
              minH="2.2em"
            >
              <LinkOverlay as={NextLink} href="/research">
                {area.title}
              </LinkOverlay>
            </Text>
            <Text
              mt="3"
              color="kk.muted"
              lineHeight="1.65"
              minH={{ base: "6.6em", md: "4.95em" }}
            >
              {area.body}
            </Text>
          </Box>
        </LinkBox>
      </Reveal>
    </Parallax>
  );
};

export const ResearchAreas: React.FC = () => (
  <LabSection
    id="research"
    decor={
      <Glow color="#8ee3ff" size={620} top="20%" right="-240px" distance={-70} opacity={0.1} />
    }
  >
    <SectionLabel index="02">Research</SectionLabel>
    <Flex
      mt="6"
      mb={{ base: 12, md: 20 }}
      direction={{ base: "column", lg: "row" }}
      justify="space-between"
      align={{ lg: "flex-end" }}
      gap="6"
    >
      <LabHeading maxW="760px">
        Four lines of{" "}
        <Box as="span" fontStyle="normal" color="kk.accent">
          inquiry
        </Box>
      </LabHeading>
      <Lead maxW="440px">
        Each area feeds the others. A system that reasons well needs a world to
        test against, and a way for us to see inside it.
      </Lead>
    </Flex>
    <Grid
      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
      gap={{ base: 5, md: 6 }}
      pb={{ md: 10 }}
    >
      {AREAS.map((a, i) => (
        <AreaCard key={a.n} area={a} index={i} />
      ))}
    </Grid>
  </LabSection>
);
