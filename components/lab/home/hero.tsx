import * as React from "react";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MotionBox } from "components/motion/box";
import { FallInPlace } from "components/motion/fall-in-place";
import { LogoMark } from "../logo-mark";
import { Backdrop } from "../graphics/backdrop";
import { LazyWhenVisible } from "./shared";

const HeroSphere = dynamic(
  () => import("../graphics/hero-sphere").then((m) => m.HeroSphere),
  { ssr: false }
);

const READOUTS = ["CONTINUAL LEARNING", "MEMORY", "PLANNING"];

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
      <Box aria-hidden position="absolute" inset="0" pointerEvents="none">
        <Backdrop variant="tokens" intensity={0.45} />
      </Box>
      <Box
        aria-hidden
        position="absolute"
        inset="0"
        pointerEvents="none"
        bgGradient="linear(to-b, rgba(5,6,10,0.5) 0%, rgba(5,6,10,0.2) 40%, rgba(5,6,10,0.6) 80%, #05060a 100%)"
      />
      <Box
        aria-hidden
        position="absolute"
        inset="0"
        pointerEvents="none"
        sx={{
          background:
            "radial-gradient(70% 60% at 75% 45%, rgba(56,189,248,0.14) 0%, transparent 70%)",
        }}
      />

      <Box
        aria-hidden
        position="absolute"
        pointerEvents="none"
        w={{ base: "112vw", md: "min(54vw, 860px)" }}
        h={{ base: "112vw", md: "min(54vw, 860px)" }}
        left={{ base: "50%", md: "auto" }}
        right={{ base: "auto", md: "-4%" }}
        bottom={{ base: "56px", md: "auto" }}
        top={{ base: "auto", md: "50%" }}
        transform={{ base: "translateX(-50%)", md: "translateY(-50%)" }}
        opacity={{ base: 0.4, md: 1 }}
      >
        <LazyWhenVisible>
          <HeroSphere />
        </LazyWhenVisible>
      </Box>

      <Container
        maxW="container.xl"
        px={{ base: 5, md: 8 }}
        position="relative"
        zIndex={2}
        flex="1"
        display="flex"
        alignItems={{ base: "flex-start", md: "center" }}
        pt={{ base: 28, md: 24 }}
        pb={{ base: 28, md: 28 }}
      >
        <MotionBox style={{ y: textY, opacity: textOpacity }} maxW="1040px">
          <FallInPlace delay={0.25}>
            <Heading
              as="h1"
              fontFamily="display"
              textTransform="uppercase"
              fontWeight="700"
              fontSize="clamp(2rem, 8vw, 7rem)"
              lineHeight="0.98"
              letterSpacing="0.05em"
              sx={{ textWrap: "balance" }}
            >
              Intelligence that{" "}
              <Box
                as="span"
                fontStyle="normal"
                bgGradient="linear(to-r, #8ee3ff, #5ef2c4 55%, #ffd27a)"
                bgClip="text"
                pr="0.08em"
              >
                keeps learning.
              </Box>
            </Heading>
          </FallInPlace>
          <FallInPlace delay={0.45}>
            <Text
              mt={{ base: 6, md: 8 }}
              maxW="580px"
              color="kk.muted"
              fontSize={{ base: "md", md: "xl" }}
              lineHeight="1.6"
            >
              KalKram is a frontier AI research lab. We are building systems
              that learn continuously from experience, remember what they
              learn, and plan over long horizons.
            </Text>
          </FallInPlace>
          <FallInPlace delay={0.6}>
            <Flex mt={{ base: 8, md: 10 }} gap="3" wrap="wrap">
              <Button as={NextLink} href="/research" variant="cta" size="lg" h="14" px="8">
                Our research
              </Button>
              <Button as={NextLink} href="/careers" variant="line" size="lg" h="14" px="8">
                Join us
              </Button>
            </Flex>
          </FallInPlace>
        </MotionBox>
      </Container>

      <Box
        position="absolute"
        left="0"
        right="0"
        bottom="0"
        zIndex={2}
        borderTopWidth="1px"
        borderColor="kk.line"
        bg="rgba(5,6,10,0.55)"
        backdropFilter="blur(8px)"
      >
        <Container
          maxW="container.xl"
          px={{ base: 5, md: 8 }}
          py="4"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="4"
        >
          <Text
            fontFamily="mono"
            fontSize={{ base: "10px", md: "xs" }}
            letterSpacing={{ base: "0.1em", md: "0.18em" }}
            color="kk.muted"
          >
            {READOUTS.map((r, i) => (
              <React.Fragment key={r}>
                {i > 0 && (
                  <Box as="span" color="kk.accent" mx="2">
                    /
                  </Box>
                )}
                {r}
              </React.Fragment>
            ))}
          </Text>
          <Flex display={{ base: "none", md: "flex" }} align="center" gap="3">
            <LogoMark size={28} />
            <Text fontFamily="mono" fontSize="xs" letterSpacing="0.18em" color="kk.muted">
              KALKRAM / कालक्रम
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};
