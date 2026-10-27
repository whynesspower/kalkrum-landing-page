import * as React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "components/motion/reveal";
import { Parallax } from "components/motion/parallax";
import { MotionBox } from "components/motion/box";
import { SectionShell } from "./section-shell";
import { WaitlistForm } from "./waitlist-form";
import { OrbitGraphic } from "./graphics/orbit-graphic";
import { GlowBlob } from "./graphics/glow-blob";
import { NoiseOverlay } from "./graphics/noise-overlay";

export const FinalCta: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.93, 1]);

  return (
    <SectionShell
      id="join"
      py={{ base: 12, md: 20 }}
      decor={
        <>
          <GlowBlob color="violet" size={560} top="-120px" left="10%" distance={-70} />
          <GlowBlob color="blue" size={460} bottom="-160px" right="8%" distance={-50} />
        </>
      }
    >
      <Reveal>
        <MotionBox
          ref={ref}
          style={{ scale }}
          position="relative"
          overflow="hidden"
          textAlign="center"
          px={{ base: 5, md: 12 }}
          py={{ base: 12, md: 24 }}
          borderWidth="1px"
          borderColor="kk.line"
          borderRadius={{ base: "24px", md: "32px" }}
          bg="kk.surface"
        >
          <Box
            aria-hidden
            position="absolute"
            inset="0"
            pointerEvents="none"
            bgImage="radial-gradient(60% 80% at 50% 0%, rgba(108,69,228,0.35), transparent 70%)"
          />
          <Flex
            aria-hidden
            position="absolute"
            inset="0"
            align="center"
            justify="center"
            pointerEvents="none"
          >
            <Parallax distance={-40}>
              <OrbitGraphic />
            </Parallax>
          </Flex>
          <NoiseOverlay />
          <Box position="relative">
            <Heading
              as="h2"
              fontSize="clamp(1.875rem, 5vw, 3.25rem)"
              lineHeight="1.1"
              letterSpacing="-0.04em"
              fontWeight="700"
              maxW="16ch"
              mx="auto"
              sx={{ textWrap: "balance" }}
            >
              Read your organisation in 60 words.
            </Heading>
            <Text
              mt="5"
              mb="9"
              maxW="520px"
              mx="auto"
              fontSize={{ base: "lg", md: "xl" }}
              color="kk.muted"
            >
              Join the waitlist and get early access when your spot opens.
            </Text>
            <WaitlistForm source="footer" />
          </Box>
        </MotionBox>
      </Reveal>
    </SectionShell>
  );
};
