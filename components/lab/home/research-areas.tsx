import { useMinWidth } from "hooks/use-min-width";
import * as React from "react";
import NextLink from "next/link";
import { Box, Flex, Grid, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { Parallax } from "components/motion/parallax";
import { Reveal } from "components/motion/reveal";
import { LabHeading, LabSection } from "../primitives";
import { TimeAxis } from "../graphics/time-axis";
import { StateFlow } from "../graphics/state-flow";
import { HypothesisGraph } from "../graphics/hypothesis-graph";
import { NeuralLattice } from "../graphics/neural-lattice";
import { Glow } from "./shared";

const AREAS = [
  {
    n: "01",
    title: "Continual Learning",
    body: "Learning that never stops, without catastrophic forgetting, through test-time training and self-distillation.",
    Graphic: TimeAxis,
  },
  {
    n: "02",
    title: "Memory and Architecture",
    body: "State space models, Mamba, Gated DeltaNet and hybrid architectures with long-term memory modules.",
    Graphic: StateFlow,
  },
  {
    n: "03",
    title: "World Models and Planning",
    body: "World models such as JEPA that predict, with hierarchical planning on top.",
    Graphic: HypothesisGraph,
  },
  {
    n: "04",
    title: "Interpretability and Safety",
    body: "Mechanistic Interpretability to read circuits and feature dynamics from the inside.",
    Graphic: NeuralLattice,
  },
];

const COLUMN_DISTANCE = [14, -14];

const AreaCard: React.FC<{ area: (typeof AREAS)[number]; index: number }> = ({
  area,
  index,
}) => {
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
          transition="border-color .3s ease"
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
            <Text fontFamily="mono" fontSize="xs" letterSpacing="0.18em" color="kk.accent">
              {area.n}
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
            h={{ base: "200px", md: "260px" }}
            overflow="hidden"
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
            <Text mt="3" color="kk.muted" lineHeight="1.65" minH={{ base: "6.6em", md: "4.95em" }}>
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
    decor={<Glow color="#8ee3ff" size={620} top="20%" right="-240px" distance={-70} opacity={0.1} />}
  >
    <Box mt="6" mb={{ base: 12, md: 20 }}>
      <LabHeading maxW="760px">
        The{" "}
        <Box as="span" fontStyle="normal" color="kk.accent">
          bet
        </Box>
      </LabHeading>
    </Box>
    <Grid
      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
      gridAutoRows="1fr"
      gap={{ base: 5, md: 6 }}
      pb={{ md: 10 }}
    >
      {AREAS.map((a, i) => (
        <AreaCard key={a.n} area={a} index={i} />
      ))}
    </Grid>
  </LabSection>
);
