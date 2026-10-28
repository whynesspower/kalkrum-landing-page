import * as React from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import { LabSection } from "../primitives";
import { WordReveal } from "../graphics/word-reveal";
import { HudFrame } from "../graphics/hud-frame";
import { TimeAxis } from "../graphics/time-axis";
import { MemoryGrid } from "../graphics/memory-grid";
import { NeuralLattice } from "../graphics/neural-lattice";

const MANIFESTO =
  "Intelligence is learning in time. Today's models stop learning the day training ends. We are building the ones that never do: systems that learn from experience, remember it, and plan across long horizons. We will make them understandable from the inside, because a mind that keeps learning has to stay legible. The odds are long, and we think it is the most important bet in AI.";

const PILLARS = [
  { n: "01", title: "Learn for a lifetime", line: "Learning that never stops and never forgets.", visual: <TimeAxis /> },
  { n: "02", title: "Remember what matters", line: "Memory that grows with time, not with cost.", visual: <MemoryGrid /> },
  { n: "03", title: "Understand the machine", line: "Safety starts with seeing how it thinks.", visual: <NeuralLattice /> },
];

export const Vision: React.FC<{ id?: string }> = ({ id }) => (
  <LabSection id={id}>
    <WordReveal
      fontFamily="display"
      textTransform="uppercase"
      letterSpacing="0.03em"
      lineHeight="1.15"
      fontSize="clamp(1.6rem, 4vw, 3.4rem)"
      sx={{ maxWidth: "46rem" }}
      text={MANIFESTO}
    />
    <Box mt={{ base: 16, md: 28 }}>
      {PILLARS.map((p, i) => (
        <Reveal key={p.n}>
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            gap={{ base: 6, md: 14 }}
            alignItems="center"
            py={{ base: 10, md: 14 }}
            borderTopWidth="1px"
            borderColor="kk.line"
          >
            <Box order={{ base: 0, md: i % 2 ? 2 : 0 }}>
              <Text
                fontFamily="display"
                fontWeight="700"
                lineHeight="0.9"
                fontSize="clamp(5rem, 16vw, 12rem)"
                color="transparent"
                sx={{ WebkitTextStroke: "1px rgba(142,227,255,0.55)" }}
                aria-hidden="true"
              >
                {p.n}
              </Text>
              <Text
                as="h3"
                mt={4}
                fontFamily="display"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.05em"
                fontSize={{ base: "xl", md: "3xl" }}
              >
                {p.title}
              </Text>
              <Text mt={2} color="kk.muted" fontSize={{ base: "md", md: "lg" }}>
                {p.line}
              </Text>
            </Box>
            <HudFrame>
              <Box position="relative" h={{ base: "220px", md: "300px" }} aria-hidden="true">
                {p.visual}
              </Box>
            </HudFrame>
          </Grid>
        </Reveal>
      ))}
    </Box>
  </LabSection>
);
