import * as React from "react";
import NextLink from "next/link";
import { Box, Button, LinkBox, LinkOverlay, SimpleGrid, Text } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import { LabHeading, LabSection } from "../primitives";

const FIGURES = [
  {
    value: "47,000×",
    caption: "faster than published times for Williamson, good and best matrices.",
    id: "flc-method",
  },
  {
    value: "16",
    caption: "exact circuit distance of IBM's two-gross memory circuit. Published: 18.",
    id: "ibm-two-gross-circuit-distance",
  },
  {
    value: "209",
    caption: "La Jolla entries marked impossible, overturned by explicit matrices.",
    id: "cw-la-jolla-no",
  },
  {
    value: "860",
    caption: "exact minimum distances for 5G NR LDPC codes.",
    id: "5g-nr-ldpc-distances",
  },
];

/** Four headline results, each linking to its entry on the research page. */
export const Evidence: React.FC = () => (
  <LabSection id="evidence" borderTopWidth="1px" borderColor="kk.line">
    <Reveal>
      <Text fontFamily="mono" fontSize="xs" letterSpacing="0.14em" textTransform="uppercase" color="kk.muted">
        One cloud machine, one 8 GB GPU
      </Text>
      <LabHeading mt={4}>The evidence so far.</LabHeading>
      <Text mt={5} color="kk.muted" fontSize={{ base: "md", md: "lg" }} maxW="40rem">
        Each figure links to what was known before and how it was checked.
      </Text>
    </Reveal>
    <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={{ md: 12 }} mt={{ base: 10, md: 16 }}>
      {FIGURES.map((f, i) => (
        <Reveal key={f.value} delay={i * 0.05}>
          <LinkBox
            borderTopWidth="1px"
            borderColor="kk.line"
            py={{ base: 7, md: 9 }}
            role="group"
          >
            <Text
              fontFamily="display"
              fontWeight="700"
              fontSize="clamp(3rem, 8vw, 6rem)"
              lineHeight="0.95"
              letterSpacing="0.02em"
              color={i === 0 ? "kk.accent" : "kk.fg"}
              transition="color .2s ease"
              _groupHover={{ color: "kk.accent" }}
            >
              <LinkOverlay as={NextLink} href={`/research#${f.id}`}>
                {f.value}
              </LinkOverlay>
            </Text>
            <Text mt={4} color="kk.muted" fontSize={{ base: "md", md: "lg" }} lineHeight="1.6" maxW="32rem">
              {f.caption}
            </Text>
          </LinkBox>
        </Reveal>
      ))}
    </SimpleGrid>
    <Box mt={{ base: 6, md: 10 }}>
      <Button as={NextLink} href="/research" variant="line">
        All results, with evidence
      </Button>
    </Box>
  </LabSection>
);
