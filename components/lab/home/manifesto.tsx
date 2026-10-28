import * as React from "react";
import { Box, Text } from "@chakra-ui/react";
import { LabSection } from "../primitives";
import { WordReveal } from "../graphics/word-reveal";
import { Backdrop } from "../graphics/backdrop";

const STATEMENT = [
  "Every model in use today learned from the recorded past of humans, then stopped. It cannot act, remember what happened, or get better from it. What it knows is a ceiling.",
  "A mind with no such ceiling learns the way living things learn: from a continuous stream of its own actions and their consequences, with goals that reach years ahead and rewards grounded in the world rather than in human approval. It will reason in ways we did not teach it. It will find things no one has written down.",
  "KalKram exists to build that mind, and to build it so that we can still read it.",
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
        कालक्रम means chronology, the order in which things happen. Intelligence
        is made of it.
      </Text>
    </Box>
  </LabSection>
);
