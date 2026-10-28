import * as React from "react";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MotionBox } from "components/motion/box";
import { FallInPlace } from "components/motion/fall-in-place";
import { LazyWhenVisible } from "./shared";

const HeroSphere = dynamic(
  () => import("../graphics/hero-sphere").then((m) => m.HeroSphere),
  { ssr: false }
);

export const Hero: React.FC = () => {
  const ref = React.useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.55],
    [1, reduce ? 1 : 0]
  );

  return (
    <Box
      as="section"
      ref={ref}
      position="relative"
      minH="100svh"
      overflow="clip"
      bg="kk.canvas"
      display="flex"
      flexDirection="column"
    >
      <Box
        aria-hidden
        position="absolute"
        inset="0"
        pointerEvents="none"
        sx={{
          background:
            "radial-gradient(60% 60% at 72% 50%, rgba(56,189,248,0.16) 0%, transparent 70%)",
        }}
      />

      <Box
        aria-hidden
        position="absolute"
        pointerEvents="none"
        w={{ base: "120vw", md: "min(58vw, 920px)" }}
        h={{ base: "120vw", md: "min(58vw, 920px)" }}
        left={{ base: "50%", md: "auto" }}
        right={{ base: "auto", md: "-6%" }}
        bottom={{ base: "-10vw", md: "auto" }}
        top={{ base: "auto", md: "50%" }}
        transform={{ base: "translateX(-50%)", md: "translateY(-50%)" }}
        opacity={{ base: 0.45, md: 1 }}
      >
        <LazyWhenVisible>
          <HeroSphere />
        </LazyWhenVisible>
      </Box>

      <Box
        aria-hidden
        position="absolute"
        inset="0"
        pointerEvents="none"
        bgGradient="linear(to-b, rgba(5,6,10,0.35) 0%, rgba(5,6,10,0) 35%, rgba(5,6,10,0) 70%, #05060a 100%)"
      />

      <Container
        maxW="container.xl"
        px={{ base: 5, md: 8 }}
        position="relative"
        zIndex={2}
        flex="1"
        display="flex"
        alignItems={{ base: "flex-start", md: "center" }}
        pt={{ base: 28, md: 24 }}
        pb={{ base: 32, md: 28 }}
      >
        <MotionBox style={{ y: textY, opacity: textOpacity }} maxW="1040px">
          <FallInPlace delay={0.25}>
            <Heading
              as="h1"
              fontFamily="display"
              textTransform="uppercase"
              fontWeight="700"
              fontSize="clamp(2.1rem, 7.6vw, 6.6rem)"
              lineHeight="0.98"
              letterSpacing="0.05em"
              sx={{ textWrap: "balance" }}
            >
              Intelligence that learns{" "}
              <Box
                as="span"
                bgGradient="linear(to-r, #8ee3ff, #5ef2c4 55%, #ffd27a)"
                bgClip="text"
                pr="0.08em"
              >
                from experience.
              </Box>
            </Heading>
          </FallInPlace>
          <FallInPlace delay={0.45}>
            <Text
              mt={{ base: 6, md: 8 }}
              maxW="600px"
              color="kk.muted"
              fontSize={{ base: "md", md: "xl" }}
              lineHeight="1.6"
            >
              KalKram is a frontier AI lab. We are building agents that learn
              from their own stream of experience, carry what they learn across
              a lifetime, and stay legible to the people who build them.
            </Text>
          </FallInPlace>
          <FallInPlace delay={0.6}>
            <Flex mt={{ base: 8, md: 10 }} gap="3" wrap="wrap">
              <Button as={NextLink} href="/research" variant="cta" size="lg" h="14" px="8">
                Research
              </Button>
              <Button as={NextLink} href="/careers" variant="line" size="lg" h="14" px="8">
                Join us
              </Button>
            </Flex>
          </FallInPlace>
        </MotionBox>
      </Container>

      <Box position="absolute" left="0" right="0" bottom="0" zIndex={2}>
        <Container
          maxW="container.xl"
          px={{ base: 5, md: 8 }}
          py="5"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="4"
        >
          <Text
            fontFamily="mono"
            fontSize={{ base: "10px", md: "xs" }}
            letterSpacing={{ base: "0.12em", md: "0.18em" }}
            color="kk.muted"
          >
            KALKRAM / कालक्रम
          </Text>
          <Text
            fontFamily="mono"
            fontSize={{ base: "10px", md: "xs" }}
            letterSpacing={{ base: "0.12em", md: "0.18em" }}
            color="kk.muted"
          >
            SCROLL
          </Text>
        </Container>
      </Box>
    </Box>
  );
};
