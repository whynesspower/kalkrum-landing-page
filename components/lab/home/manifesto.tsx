import * as React from "react";
import { Box, Text } from "@chakra-ui/react";
import { LabSection } from "../primitives";
import { WordReveal } from "../graphics/word-reveal";
import { Backdrop } from "../graphics/backdrop";

const STATEMENT = [
  "Machines have started to make discoveries. Almost no one can afford to run them.",
  "In September 2026, OpenAI said its agents had resolved Navier-Stokes. The run used about ten thousand agents and 130 billion output tokens over 88 hours. At that price, discovery belongs to a handful of organisations.",
  "Most of that cost is search, spent where no answer can be. Hard problems have structure. Find it first and the search shrinks by orders of magnitude.",
];

export const Manifesto: React.FC = () => (
  <LabSection
    id="vision"
    py={{ base: 28, md: 44 }}
    decor={<Backdrop variant="contours" />}
  >
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
      <Text
        mt={{ base: 12, md: 16 }}
        fontFamily="mono"
        fontSize={{ base: "xs", md: "sm" }}
        letterSpacing="0.08em"
        color="kk.muted"
        maxW="44rem"
      >
        Figures from OpenAI&apos;s announcement, September 2026. Independent review
        is still under way.
      </Text>
    </Box>
  </LabSection>
);
