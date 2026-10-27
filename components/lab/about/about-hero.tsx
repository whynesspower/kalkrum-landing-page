import * as React from "react";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { useReducedMotion } from "framer-motion";
import { MotionBox } from "components/motion/box";
import { duration, ease } from "lib/motion";
import { LogoWatermark } from "../logo-mark";
import { NeuralLattice } from "../graphics/neural-lattice";
import { ZoomImage } from "./zoom-frame";

/** Full-height cinematic hero for the About page. Holds the page h1. */
export const AboutHero: React.FC = () => {
  const reduce = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: duration.slow * 1.6, ease, delay },
  });
  return (
    <Box
      as="header"
      position="relative"
      overflow="hidden"
      minH={{ base: "88vh", md: "92vh" }}
      display="flex"
      alignItems="flex-end"
      pt="160px"
      pb={{ base: 14, md: 24 }}
      borderBottomWidth="1px"
      borderColor="kk.line"
    >
      <ZoomImage
        image="cosmicCliffs"
        position="absolute"
        inset="0"
        distance={-80}
        zoom={[1.02, 1.2]}
        opacity={0.5}
        priority
        aria-hidden="true"
      >
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-b, rgba(5,6,10,0.5) 0%, rgba(5,6,10,0.2) 40%, #05060a 100%)"
        />
      </ZoomImage>
      <LogoWatermark size={620} top="12%" right="-200px" opacity={0.08} distance={-60} />
      <Box
        position="absolute"
        top="18%"
        right={{ base: "-120px", md: "6%" }}
        w={{ base: "300px", md: "460px" }}
        opacity={0.45}
        pointerEvents="none"
        aria-hidden="true"
      >
        <NeuralLattice />
      </Box>
      <Container maxW="container.xl" px={{ base: 5, md: 8 }} position="relative" zIndex={1}>
        <MotionBox {...enter(0)}>
          <Text fontFamily="mono" fontSize="xs" letterSpacing="0.18em" textTransform="uppercase" color="kk.accent">
            [ About ]
          </Text>
        </MotionBox>
        <MotionBox {...enter(0.12)}>
          <Heading
            as="h1"
            mt={6}
            fontFamily="display"
            textTransform="uppercase"
            fontWeight="700"
            fontSize="clamp(4rem, 17vw, 15rem)"
            lineHeight="0.9"
            letterSpacing="0.03em"
          >
            About
          </Heading>
        </MotionBox>
        <MotionBox {...enter(0.3)}>
          <Text mt={8} maxW="32rem" color="kk.muted" fontSize={{ base: "md", md: "xl" }} lineHeight="1.5">
            A research lab building scientific superintelligence in software.
          </Text>
        </MotionBox>
      </Container>
    </Box>
  );
};
