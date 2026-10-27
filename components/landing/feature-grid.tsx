import * as React from "react";
import { Box, Flex, Heading, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import {
  FiActivity,
  FiAlertTriangle,
  FiFileText,
  FiGitPullRequest,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import { Reveal } from "components/motion/reveal";
import { Parallax } from "components/motion/parallax";
import { SectionHeading, SectionShell } from "./section-shell";
import { GlowBlob } from "./graphics/glow-blob";
import {
  RcaVisual,
  SecurityVisual,
  SprintVisual,
  StatusVisual,
  TeamVisual,
  ThreatVisual,
} from "./graphics/feature-visuals";

const FEATURES = [
  {
    icon: FiActivity,
    visual: StatusVisual,
    title: "Project status",
    body: "A 60-word update on every project, with on-track, lagging or ahead called out.",
  },
  {
    icon: FiAlertTriangle,
    visual: ThreatVisual,
    title: "Organisational threats",
    body: "Alerts surface blockers and risks before the weekly meeting does.",
  },
  {
    icon: FiGitPullRequest,
    visual: SprintVisual,
    title: "Sprint summaries",
    body: "See what shipped, what slipped, and why, without reading a single board.",
  },
  {
    icon: FiFileText,
    visual: RcaVisual,
    title: "RCA summaries",
    body: "Get a plain-language account of what went wrong, drawn from tickets, threads and deploys.",
  },
  {
    icon: FiShield,
    visual: SecurityVisual,
    title: "SSDLC tickets",
    body: "Keep secure-development work in view, with owners and status in one place.",
  },
  {
    icon: FiUsers,
    visual: TeamVisual,
    title: "Team progress",
    body: "Ask what your team got done this week and get an answer in seconds.",
  },
];

// Each column drifts a different way, so the grid looks staggered as it scrolls.
const COLUMN_DRIFT = [12, -16, 12];

/** A card with a soft light that follows the cursor. */
const SpotlightCard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Box
      ref={ref}
      onMouseMove={onMove}
      position="relative"
      overflow="hidden"
      h="full"
      p={{ base: 6, md: 8 }}
      borderWidth="1px"
      borderColor="kk.line"
      borderRadius="20px"
      bg="kk.surface"
      transition="border-color .3s ease"
      _hover={{ borderColor: "kk.accent" }}
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        opacity: 0,
        transition: "opacity .3s ease",
        pointerEvents: "none",
        background:
          "radial-gradient(340px circle at var(--mx, 50%) var(--my, 0%), rgba(124,92,255,0.16), transparent 60%)",
      }}
      sx={{ "&:hover::before": { opacity: 1 } }}
    >
      {children}
    </Box>
  );
};

export const FeatureGrid: React.FC = () => (
  <SectionShell
    id="features"
    decor={
      <>
        <GlowBlob color="pink" size={480} top="10%" left="-220px" distance={-70} />
        <GlowBlob color="violet" size={520} bottom="4%" right="-240px" distance={-90} />
      </>
    }
  >
    <SectionHeading
      eyebrow="Features"
      title="One view of the whole organisation"
      description="Everything a leader checks on a Monday, written for a two-minute read."
    />
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: 4, md: 5 }}>
      {FEATURES.map(({ icon, visual: Visual, title, body }, i) => (
        <Parallax key={title} distance={COLUMN_DRIFT[i % 3]} h="full">
          <Reveal delay={(i % 3) * 0.08} h="full">
            <SpotlightCard>
              <Flex justify="space-between" align="flex-start" mb="6">
                <Flex
                  w="44px"
                  h="44px"
                  align="center"
                  justify="center"
                  borderRadius="12px"
                  bg="kk.surfaceHi"
                  borderWidth="1px"
                  borderColor="kk.line"
                  color="kk.accent"
                >
                  <Icon as={icon} boxSize="5" aria-hidden />
                </Flex>
                <Box color="kk.muted" mt="-2" mr="-1">
                  <Visual />
                </Box>
              </Flex>
              <Heading as="h3" fontSize="xl" letterSpacing="-0.02em" mb="2">
                {title}
              </Heading>
              <Text color="kk.muted" lineHeight="1.65">
                {body}
              </Text>
            </SpotlightCard>
          </Reveal>
        </Parallax>
      ))}
    </SimpleGrid>
  </SectionShell>
);
