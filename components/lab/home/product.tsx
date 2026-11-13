import * as React from "react";
import NextLink from "next/link";
import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import { LabHeading, LabSection } from "../primitives";

const STEPS = [
  {
    title: "Find the structure",
    body: "Before searching, the system works out what the problem is made of.",
    proof: "On blind tests: right in 5 of 8, never wrong.",
  },
  {
    title: "Compile a solver",
    body: "Then it writes an engine for that structure alone.",
    proof: "Over 30,000× faster than Kissat and CP-SAT.",
  },
  {
    title: "Prove it",
    body: "A result counts only when multiple separately written verifiers re-derive it.",
    proof: "Where only one engine stands behind a claim, we say so.",
  },
  {
    title: "Keep everything",
    body: "Every result leaves tools behind.",
    proof: "On a problem type it had never seen, it built a verified solver in 5 to 6 minutes.",
  },
];

const label = {
  fontFamily: "mono",
  fontSize: "xs",
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "kk.muted",
};

/** How a discovery gets made: the four steps of the method. */
export const Product: React.FC = () => (
  <LabSection id="method" borderTopWidth="1px" borderColor="kk.line">
    <Reveal>
      <Text {...label}>How a discovery gets made</Text>
      <LabHeading mt={4} maxW="56rem">
        Find the structure. Compile the solver. Prove it. Keep everything.
      </LabHeading>
    </Reveal>

    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={{ base: 4, md: 5 }} mt={{ base: 10, md: 16 }}>
      {STEPS.map((s, i) => (
        <Reveal key={s.title} delay={i * 0.05}>
          <Box
            h="100%"
            display="flex"
            flexDirection="column"
            p={{ base: 6, md: 7 }}
            borderWidth="1px"
            borderColor={i === STEPS.length - 1 ? "rgba(142,227,255,0.45)" : "kk.line"}
            borderRadius="16px"
            bg="kk.surface"
          >
            <Text {...label} color={i === STEPS.length - 1 ? "kk.accent" : "kk.muted"}>
              0{i + 1}
            </Text>
            <Text mt={3} fontFamily="display" fontWeight="700" textTransform="uppercase" letterSpacing="0.04em" fontSize="xl">
              {s.title}
            </Text>
            <Text mt={3} color="kk.muted" lineHeight="1.6" flex="1">
              {s.body}
            </Text>
            <Text mt={5} pt={4} borderTopWidth="1px" borderColor="kk.line" color="kk.fg" fontWeight="500" lineHeight="1.5">
              {s.proof}
            </Text>
          </Box>
        </Reveal>
      ))}
    </SimpleGrid>

    <Button as={NextLink} href="/approach" variant="line" mt={{ base: 10, md: 14 }}>
      How the system works
    </Button>
  </LabSection>
);
