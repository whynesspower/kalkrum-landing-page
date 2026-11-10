import * as React from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import { LabHeading, LabSection } from "../primitives";

const STEPS = [
  {
    title: "Find the structure",
    body: "Before searching, the system works out what the problem is made of.",
    proof: "Right on 5 of 8 blind models. Never wrong.",
  },
  {
    title: "Compile a solver",
    body: "It writes an engine for that structure alone, not a general solver.",
    proof: "Over 30,000× faster than Kissat and CP-SAT.",
  },
  {
    title: "Prove it",
    body: "A result counts only when separately written verifiers re-derive it.",
    proof: "Single-engine claims are labelled as such.",
  },
  {
    title: "Keep everything",
    body: "Each result leaves detectors and checkers behind for the next problem.",
    proof: "5 to 6 minutes to a verified solver on an unseen problem type.",
  },
];

const BUSINESS = [
  {
    label: "Who",
    title: "University labs and company R&D teams",
    body: "Teams with a hard search problem in their own field, and no budget for ten thousand agents.",
  },
  {
    label: "How they pay",
    title: "A subscription, plus usage for large runs",
    body: "Teams run the platform on their own problems. The subscription covers everyday use, and large runs are billed by usage.",
  },
  {
    label: "How big",
    title: "$2.5 trillion a year in global R&D",
    body: "Much of it goes into searching and testing ideas that fail. A few thousand teams on the platform is a billion dollar revenue business.",
  },
];

const label = {
  fontFamily: "mono",
  fontSize: "xs",
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "kk.muted",
};

/** What the product is, who uses it and how it makes money. */
export const Product: React.FC = () => (
  <LabSection id="platform" borderTopWidth="1px" borderColor="kk.line">
    <Reveal>
      <Text {...label}>The platform</Text>
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

    <Reveal>
      <LabHeading as="h3" mt={{ base: 20, md: 32 }} maxW="56rem" fontSize="clamp(1.6rem, 3.6vw, 2.8rem)">
        Every research team, not just the handful that can afford a frontier lab.
      </LabHeading>
    </Reveal>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacingX={{ md: 10 }} spacingY={8} mt={{ base: 10, md: 14 }}>
      {BUSINESS.map((b, i) => (
        <Reveal key={b.label} delay={i * 0.05}>
          <Box borderTopWidth="1px" borderColor="kk.line" pt={6}>
            <Text {...label}>{b.label}</Text>
            <Text mt={3} fontFamily="display" fontWeight="700" textTransform="uppercase" letterSpacing="0.04em" fontSize={{ base: "xl", md: "2xl" }} lineHeight="1.2">
              {b.title}
            </Text>
            <Text mt={3} color="kk.muted" lineHeight="1.6">
              {b.body}
            </Text>
          </Box>
        </Reveal>
      ))}
    </SimpleGrid>
    <Text mt={{ base: 10, md: 14 }} fontFamily="mono" fontSize="xs" letterSpacing="0.08em" color="kk.muted" maxW="44rem">
      No users or revenue yet. The first version goes to research teams in the third week of November 2026.
    </Text>
  </LabSection>
);
