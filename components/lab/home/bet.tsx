import * as React from "react";
import dynamic from "next/dynamic";
import { Box, Text } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import { Parallax } from "components/motion/parallax";
import { LabSection } from "../primitives";
import { HudFrame } from "../graphics/hud-frame";

const TimeAxis = dynamic(
  () => import("../graphics/time-axis").then((m) => m.TimeAxis),
  { ssr: false }
);
const MemoryGrid = dynamic(
  () => import("../graphics/memory-grid").then((m) => m.MemoryGrid),
  { ssr: false }
);
const AttentionMatrix = dynamic(
  () => import("../graphics/attention-matrix").then((m) => m.AttentionMatrix),
  { ssr: false }
);

const PANELS = [
  {
    title: "Discovery is search.",
    body: "Shrink the search and you shrink the cost.",
    Graphic: TimeAxis,
    distance: 26,
  },
  {
    title: "Structure makes search small.",
    body: "An engine built for one structure runs up to 47,000× faster than published times.",
    Graphic: MemoryGrid,
    distance: -18,
  },
  {
    title: "Verification makes it compound.",
    body: "Only a re-derivable result can be built on. Each leaves tools the next problem reuses.",
    Graphic: AttentionMatrix,
    distance: 36,
  },
];

export const Bet: React.FC = () => (
  <LabSection id="bet" pt={{ base: 8, md: 12 }} pb={{ base: 20, md: 32 }}>
    <Box display="flex" flexDirection="column" gap={{ base: 10, md: 20 }}>
      {PANELS.map(({ title, body, Graphic, distance }, i) => (
        <Parallax key={title} distance={distance}>
          <Reveal delay={0.05}>
            <Box
              w={{ base: "100%", lg: "86%" }}
              ml={{ base: 0, lg: i % 2 === 0 ? 0 : "auto" }}
            >
              <HudFrame>
                <Box
                  position="relative"
                  h={{ base: "440px", md: "clamp(460px, 58vh, 640px)" }}
                  bg="kk.surface"
                  overflow="hidden"
                  sx={{
                    // The graphic wrappers size themselves by aspect ratio;
                    // inside the frame they fill the whole panel instead.
                    "& > .kk-graphic > div": {
                      position: "absolute",
                      inset: 0,
                      aspectRatio: "auto",
                    },
                  }}
                >
                  <Box className="kk-graphic" position="absolute" inset="0" aria-hidden>
                    <Graphic />
                  </Box>
                  <Box
                    aria-hidden
                    position="absolute"
                    inset="0"
                    pointerEvents="none"
                    bgGradient="linear(to-t, rgba(5,6,10,0.96) 0%, rgba(5,6,10,0.7) 30%, rgba(5,6,10,0.05) 60%, transparent 100%)"
                  />
                  <Box
                    position="absolute"
                    left={{ base: 5, md: 10 }}
                    right={{ base: 5, md: 10 }}
                    bottom={{ base: 5, md: 10 }}
                  >
                    <Text
                      as="h3"
                      fontFamily="display"
                      textTransform="uppercase"
                      fontWeight="700"
                      fontSize="clamp(2rem, 5.2vw, 4.6rem)"
                      letterSpacing="0.05em"
                      lineHeight="0.95"
                    >
                      {title}
                    </Text>
                    <Text
                      mt={{ base: 3, md: 5 }}
                      color="#c3cad8"
                      fontSize={{ base: "md", md: "xl" }}
                      lineHeight="1.55"
                      maxW="40rem"
                    >
                      {body}
                    </Text>
                  </Box>
                </Box>
              </HudFrame>
            </Box>
          </Reveal>
        </Parallax>
      ))}
    </Box>
  </LabSection>
);
