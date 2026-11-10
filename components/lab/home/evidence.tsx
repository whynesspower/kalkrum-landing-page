import * as React from "react";
import NextLink from "next/link";
import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import { LabHeading, LabSection } from "../primitives";

const FIGURES = [
  {
    value: "47,000×",
    caption: "faster than published search times for Williamson, good and best matrices.",
  },
  {
    value: "16",
    caption: "exact circuit distance of IBM's two-gross memory circuit. IBM published at most 18.",
  },
  {
    value: "209",
    caption: "La Jolla repository entries marked impossible, overturned with explicit matrices.",
  },
  {
    value: "860",
    caption: "exact minimum distances for 5G NR LDPC codes, at lengths up to 11,904.",
  },
];

/** Four headline results, each listed in full on the research page. */
export const Evidence: React.FC = () => (
  <LabSection id="evidence" borderTopWidth="1px" borderColor="kk.line">
    <Reveal>
      <Text fontFamily="mono" fontSize="xs" letterSpacing="0.14em" textTransform="uppercase" color="kk.muted">
        One cloud machine, one 8 GB GPU
      </Text>
      <LabHeading mt={4}>The evidence so far.</LabHeading>
    </Reveal>
    <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={{ md: 12 }} mt={{ base: 10, md: 16 }}>
      {FIGURES.map((f, i) => (
        <Reveal key={f.value} delay={i * 0.05}>
          <Box borderTopWidth="1px" borderColor="kk.line" py={{ base: 7, md: 9 }}>
            <Text
              fontFamily="display"
              fontWeight="700"
              fontSize="clamp(3rem, 8vw, 6rem)"
              lineHeight="0.95"
              letterSpacing="0.02em"
              color={i === 0 ? "kk.accent" : "kk.fg"}
            >
              {f.value}
            </Text>
            <Text mt={4} color="kk.muted" fontSize={{ base: "md", md: "lg" }} lineHeight="1.6" maxW="32rem">
              {f.caption}
            </Text>
          </Box>
        </Reveal>
      ))}
    </SimpleGrid>
    <Box display="flex" flexWrap="wrap" alignItems="center" gap={{ base: 5, md: 8 }} mt={{ base: 6, md: 10 }}>
      <Button as={NextLink} href="/research" variant="line">
        All results, with evidence
      </Button>
      <Text fontFamily="mono" fontSize="xs" letterSpacing="0.08em" color="kk.muted" maxW="34rem">
        Each result on the research page says what was known before and how it was checked.
      </Text>
    </Box>
  </LabSection>
);
