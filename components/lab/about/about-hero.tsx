import * as React from "react";
import { Box, Container, Heading } from "@chakra-ui/react";
import { useReducedMotion } from "framer-motion";
import { MotionBox } from "components/motion/box";
import { duration, ease } from "lib/motion";
import { LogoWatermark } from "../logo-mark";
import { Backdrop } from "../graphics/backdrop";

/** Full-height hero for the About page. Holds the page h1. */
export const AboutHero: React.FC = () => {
  const reduce = useReducedMotion();
  return (
    <Box
      as="header"
      position="relative"
      overflow="hidden"
      minH={{ base: "80vh", md: "88vh" }}
      display="flex"
      alignItems="flex-end"
      pt="160px"
      pb={{ base: 14, md: 24 }}
      borderBottomWidth="1px"
      borderColor="kk.line"
    >
      <Box position="absolute" inset="0" aria-hidden="true">
        <Backdrop variant="state" />
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-b, rgba(5,6,10,0.4) 0%, rgba(5,6,10,0.1) 40%, #05060a 100%)"
        />
      </Box>
      <LogoWatermark size={620} top="12%" right="-200px" opacity={0.08} distance={-60} />
      <Container maxW="container.xl" px={{ base: 5, md: 8 }} position="relative" zIndex={1}>
        <MotionBox
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow * 1.6, ease, delay: 0.12 }}
        >
          <Heading
            as="h1"
            fontFamily="display"
            textTransform="uppercase"
            fontWeight="700"
            fontSize="clamp(3rem, 11vw, 10rem)"
            lineHeight="0.95"
            letterSpacing="0.03em"
            maxW="14ch"
          >
            We build minds that keep learning.
          </Heading>
        </MotionBox>
      </Container>
    </Box>
  );
};
