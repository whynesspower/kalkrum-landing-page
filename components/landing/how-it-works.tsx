import * as React from "react";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import { Parallax } from "components/motion/parallax";
import { SectionHeading, SectionShell } from "./section-shell";
import { SummaryDemo } from "./summary-demo";
import { ConnectionGraphic } from "./graphics/connection-graphic";
import { GlowBlob } from "./graphics/glow-blob";

const STEPS = [
  {
    title: "Connect your tools",
    body: "Link Jira, Slack, Docs and GitHub, then pick the projects and teams you want to follow.",
  },
  {
    title: "KalKram reads the noise",
    body: "It reads tickets, threads, pull requests and docs, and ties each one to the right project.",
  },
  {
    title: "You get 60 words",
    body: "Every project and team gets a short update, with alerts when something looks at risk. Ask follow-up questions when you want depth.",
  },
];

const STEP_DRIFT = [10, -10, 10];

export const HowItWorks: React.FC = () => (
  <SectionShell
    id="how-it-works"
    decor={
      <>
        <GlowBlob color="violet" size={520} top="8%" right="-220px" distance={-80} />
        <GlowBlob color="blue" size={460} bottom="6%" left="-200px" distance={-60} />
      </>
    }
  >
    <SectionHeading
      eyebrow="How it works"
      title="From a week of noise to one clear paragraph"
      description="You should not need five tabs and a stand-up to know where a project stands."
    />

    <Parallax distance={18}>
      <Reveal>
        <Box
          mb={{ base: 10, md: 14 }}
          p={{ base: 4, md: 8 }}
          borderWidth="1px"
          borderColor="kk.line"
          borderRadius={{ base: "20px", md: "28px" }}
          bg="kk.surface"
          bgImage="radial-gradient(var(--chakra-colors-kk-line) 1px, transparent 1px)"
          bgSize="22px 22px"
        >
          <ConnectionGraphic />
        </Box>
      </Reveal>
    </Parallax>

    <SimpleGrid
      columns={{ base: 1, md: 3 }}
      gap={{ base: 8, md: 10 }}
      mb={{ base: 14, md: 20 }}
    >
      {STEPS.map((step, i) => (
        <Parallax key={step.title} distance={STEP_DRIFT[i]}>
          <Reveal delay={i * 0.1}>
            <Box>
              <Text
                fontSize="sm"
                fontWeight="600"
                color="kk.accent"
                mb="3"
                aria-hidden
              >
                0{i + 1}
              </Text>
              <Heading as="h3" fontSize="xl" letterSpacing="-0.02em" mb="2">
                {step.title}
              </Heading>
              <Text color="kk.muted" lineHeight="1.65">
                {step.body}
              </Text>
            </Box>
          </Reveal>
        </Parallax>
      ))}
    </SimpleGrid>

    <Reveal>
      <SummaryDemo />
    </Reveal>
  </SectionShell>
);
