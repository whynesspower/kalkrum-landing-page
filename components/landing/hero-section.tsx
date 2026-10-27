import * as React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FallInPlace } from "components/motion/fall-in-place";
import { MotionBox } from "components/motion/box";
import { WaitlistForm } from "./waitlist-form";
import { ProductFrame } from "./product-frame";
import { GlowBlob } from "./graphics/glow-blob";
import { NoiseOverlay } from "./graphics/noise-overlay";

export const HeroSection: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // The grid and glow lag behind, and the text eases down and fades.
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 180]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, reduce ? 1 : 0.2]);

  const grid = useColorModeValue("rgba(10,10,24,0.05)", "rgba(255,255,255,0.045)");
  const glow = useColorModeValue("rgba(108,69,228,0.18)", "rgba(108,69,228,0.4)");
  const gradient = useColorModeValue(
    "linear(to-r, #5530c4, #2f6bff)",
    "linear(to-r, #c4b5ff, #8b6cff 55%, #6cc4ff)"
  );

  return (
    <Box as="section" ref={ref} position="relative" overflowX="clip">
      {/* Glow and grid, faded out toward the bottom */}
      <MotionBox
        aria-hidden
        position="absolute"
        inset="0"
        pointerEvents="none"
        style={{ y: bgY }}
        sx={{
          backgroundImage: `radial-gradient(60% 55% at 50% 0%, ${glow} 0%, transparent 70%), linear-gradient(to right, ${grid} 1px, transparent 1px), linear-gradient(to bottom, ${grid} 1px, transparent 1px)`,
          backgroundSize: "auto, 64px 64px, 64px 64px",
          maskImage: "linear-gradient(to bottom, black 35%, transparent 95%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 35%, transparent 95%)",
        }}
      />
      <GlowBlob color="violet" size={560} top="-160px" left="-200px" distance={-90} />
      <GlowBlob color="blue" size={480} top="320px" right="-180px" distance={-50} />
      <GlowBlob color="pink" size={420} top="980px" left="-140px" distance={-70} />
      <NoiseOverlay />

      <Container
        maxW="container.xl"
        px={{ base: 5, md: 8 }}
        pt={{ base: 32, md: 44 }}
        pb={{ base: 12, md: 20 }}
        position="relative"
      >
        <MotionBox style={{ y: textY, opacity: textOpacity }}>
          <Flex direction="column" align="center" textAlign="center">
            <FallInPlace>
              <Flex
                display="inline-flex"
                align="center"
                gap="2"
                px="3.5"
                py="1.5"
                mb="8"
                borderWidth="1px"
                borderColor="kk.line"
                borderRadius="full"
                bg="kk.surface"
                fontSize="sm"
                color="kk.muted"
              >
                <Box w="6px" h="6px" borderRadius="full" bg="green.400" aria-hidden />
                Early access is open
              </Flex>
            </FallInPlace>

            <FallInPlace delay={0.1}>
              <Heading
                as="h1"
                maxW="15ch"
                mx="auto"
                fontSize="clamp(2.5rem, 8vw, 5.25rem)"
                lineHeight="1.03"
                letterSpacing="-0.045em"
                fontWeight="700"
                sx={{ textWrap: "balance" }}
              >
                Your whole engineering org,{" "}
                <Box
                  as="span"
                  bgGradient={gradient}
                  bgClip="text"
                  color="transparent"
                >
                  in 60 words.
                </Box>
              </Heading>
            </FallInPlace>

            <FallInPlace delay={0.2}>
              <Text
                mt="7"
                maxW="640px"
                fontSize={{ base: "lg", md: "xl" }}
                lineHeight="1.6"
                color="kk.muted"
              >
                KalKram reads Jira, Slack, Docs and GitHub, then sends engineering
                leaders a short AI summary of every project, risk and sprint.
              </Text>
            </FallInPlace>

            <FallInPlace delay={0.3} width="100%">
              <Box id="waitlist" scrollMarginTop="120px" mt="10">
                <WaitlistForm source="hero" />
              </Box>
            </FallInPlace>
          </Flex>
        </MotionBox>

        <FallInPlace delay={0.45} width="100%">
          <Box mt={{ base: 14, md: 20 }}>
            <ProductFrame />
          </Box>
        </FallInPlace>
      </Container>
    </Box>
  );
};
