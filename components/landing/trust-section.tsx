import * as React from "react";
import { Box, Flex, Heading, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { FiLock, FiLink, FiSliders } from "react-icons/fi";
import { Reveal } from "components/motion/reveal";
import { Parallax } from "components/motion/parallax";
import { SectionHeading, SectionShell } from "./section-shell";
import { GlowBlob } from "./graphics/glow-blob";

const POINTS = [
  {
    icon: FiSliders,
    title: "You choose the scope",
    body: "Pick the projects, channels and repositories KalKram can see. Nothing outside that scope is read.",
  },
  {
    icon: FiLink,
    title: "Summaries show their sources",
    body: "Each summary points back to the tickets and threads behind it, so you can check the work.",
  },
  {
    icon: FiLock,
    title: "Security reviews welcome",
    body: "We will walk your security team through exactly what is read and what is stored.",
  },
];

const DRIFT = [14, -14, 14];

export const TrustSection: React.FC = () => (
  <SectionShell
    id="trust"
    decor={
      <GlowBlob color="blue" size={500} top="0" left="30%" distance={-60} />
    }
  >
    <SectionHeading
      eyebrow="Trust"
      title="Built to earn access to your tools"
      description="Your Jira, Slack and code are sensitive. We treat access as something to earn."
    />
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 8, md: 10 }}>
      {POINTS.map((p, i) => (
        <Parallax key={p.title} distance={DRIFT[i]}>
          <Reveal delay={i * 0.1}>
            <Box borderTopWidth="1px" borderColor="kk.line" pt="6">
              <Flex
                w="48px"
                h="48px"
                mb="5"
                align="center"
                justify="center"
                borderRadius="14px"
                bgGradient="linear(to-br, rgba(161,139,255,0.22), rgba(108,196,255,0.12))"
                borderWidth="1px"
                borderColor="kk.line"
                color="kk.accent"
              >
                <Icon as={p.icon} boxSize="5" aria-hidden />
              </Flex>
              <Heading as="h3" fontSize="xl" letterSpacing="-0.02em" mb="2">
                {p.title}
              </Heading>
              <Text color="kk.muted" lineHeight="1.65">
                {p.body}
              </Text>
            </Box>
          </Reveal>
        </Parallax>
      ))}
    </SimpleGrid>
  </SectionShell>
);
