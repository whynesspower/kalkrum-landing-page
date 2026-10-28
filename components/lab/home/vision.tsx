import * as React from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import { LabSection } from "../primitives";
import { WordReveal } from "../graphics/word-reveal";
import { HudFrame } from "../graphics/hud-frame";
import { MemoryGrid } from "../graphics/memory-grid";
import { AttentionMatrix } from "../graphics/attention-matrix";
import { StateFlow } from "../graphics/state-flow";
import { LogoWatermark } from "../logo-mark";

const PROBLEMS = [
  { title: "Forgets when it is updated", label: "Catastrophic forgetting", Graphic: MemoryGrid },
  { title: "Remembers only what fits in context", label: "Finite window", Graphic: AttentionMatrix },
  { title: "Pays quadratic cost to read its own past", label: "O(n²) attention", Graphic: StateFlow },
];

export const Vision: React.FC = () => (
  <LabSection
    id="vision"
    decor={<LogoWatermark size={560} top="8%" right="-220px" opacity={0.07} distance={-50} />}
  >
    <WordReveal
      as="h2"
      fontFamily="display"
      textTransform="uppercase"
      fontWeight="700"
      fontSize="clamp(1.7rem, 4.6vw, 3.8rem)"
      lineHeight="1.12"
      letterSpacing="0.04em"
      maxW="1040px"
      text="Every frontier model is a snapshot. It stops learning the day training ends. We are building the one that does not."
    />
    <Grid
      mt={{ base: 14, md: 24 }}
      templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
      gap={{ base: 10, md: 8 }}
    >
      {PROBLEMS.map(({ title, label, Graphic }, i) => (
        <Reveal key={title} delay={i * 0.1} h="100%">
          <HudFrame label={label}>
            <Box
              position="relative"
              h={{ base: "200px", md: "220px" }}
              overflow="hidden"
              borderWidth="1px"
              borderColor="kk.line"
              bg="kk.surface"
              sx={{ "& > svg": { width: "100%", height: "100%" } }}
            >
              <Graphic />
            </Box>
          </HudFrame>
          <Text
            mt="5"
            fontFamily="display"
            textTransform="uppercase"
            letterSpacing="0.06em"
            fontWeight="700"
            fontSize={{ base: "xl", md: "2xl" }}
            lineHeight="1.15"
            minH={{ md: "2.4em" }}
          >
            {title}
          </Text>
        </Reveal>
      ))}
    </Grid>
  </LabSection>
);
