import * as React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";

const WORDS = [
  { word: "One thesis", line: "Every project serves learning in time." },
  { word: "Safety inside", line: "We build it into the architecture." },
  { word: "Evidence", line: "We trust results, not announcements." },
  { word: "Long horizons", line: "We take the questions that need years." },
];

/** Four huge words separated by hairlines. A glow follows the hover. */
export const PrinciplesWords: React.FC = () => (
  <Box as="ul" listStyleType="none" m={0} p={0}>
    {WORDS.map((w, i) => (
      <Box as="li" key={w.word}>
      <Reveal delay={i * 0.05}>
        <Box
          position="relative"
          borderTopWidth="1px"
          borderBottomWidth={i === WORDS.length - 1 ? "1px" : 0}
          borderColor="kk.line"
          py={{ base: 6, md: 10 }}
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "flex-start", md: "baseline" }}
          justifyContent="space-between"
          gap={{ base: 2, md: 8 }}
          overflow="hidden"
          transition="background 0.5s ease"
          sx={{
            "& .p-word": { transition: "color 0.4s ease, text-shadow 0.4s ease, transform 0.5s ease" },
          }}
          _hover={{
            bg: "radial-gradient(60% 140% at 20% 50%, rgba(142,227,255,0.12), transparent 70%)",
            "& .p-word": {
              color: "#8ee3ff",
              textShadow: "0 0 48px rgba(142,227,255,0.55)",
              transform: "translateX(12px)",
            },
          }}
        >
          <Text
            as="h3"
            className="p-word"
            fontFamily="display"
            fontWeight="700"
            textTransform="uppercase"
            letterSpacing="0.04em"
            lineHeight="1"
            fontSize="clamp(2.6rem, 9vw, 8rem)"
          >
            {w.word}
          </Text>
          <Text fontFamily="mono" fontSize="xs" letterSpacing="0.1em" color="kk.muted" maxW="18rem">
            {w.line}
          </Text>
        </Box>
      </Reveal>
      </Box>
    ))}
  </Box>
);
