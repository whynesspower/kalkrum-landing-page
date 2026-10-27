import * as React from "react";
import { LogoMark } from "../logo-mark";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MotionBox } from "components/motion/box";
import { FallInPlace } from "components/motion/fall-in-place";
import { SCIENCE_IMAGES } from "data/images";
import { LazyWhenVisible } from "./shared";

const HeroSphere = dynamic(
  () => import("../graphics/hero-sphere").then((m) => m.HeroSphere),
  { ssr: false }
);
const NetworkField = dynamic(
  () => import("../graphics/network-field").then((m) => m.NetworkField),
  { ssr: false }
);

const READOUTS = ["AI", "SCIENCE", "SAFETY"];

export const Hero: React.FC = () => {
  const ref = React.useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.55],
    [1, reduce ? 1 : 0]
  );
  const img = SCIENCE_IMAGES.deepField;

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
      {/* Photo layer: parallax down, slow zoom */}
      <MotionBox
        aria-hidden
        position="absolute"
        top="-20%"
        left="0"
        right="0"
        bottom="0"
        style={{ y: bgY }}
      >
        <MotionBox
          position="absolute"
          inset="0"
          initial={{ scale: 1.04 }}
          animate={reduce ? undefined : { scale: 1.16 }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Image
            src={img.src}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={70}
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </MotionBox>
      </MotionBox>
      <Box
        aria-hidden
        position="absolute"
        inset="0"
        pointerEvents="none"
        bgGradient="linear(to-b, rgba(5,6,10,0.78) 0%, rgba(5,6,10,0.45) 40%, rgba(5,6,10,0.7) 78%, #05060a 100%)"
      />
      <Box
        aria-hidden
        position="absolute"
        inset="0"
        pointerEvents="none"
        sx={{
          background:
            "radial-gradient(70% 60% at 75% 45%, rgba(91,124,255,0.16) 0%, transparent 70%)",
        }}
      />

      {/* Faint network behind everything */}
      <Box
        aria-hidden
        position="absolute"
        inset="0"
        opacity={0.35}
        pointerEvents="none"
      >
        <LazyWhenVisible>
          <NetworkField density={0.6} />
        </LazyWhenVisible>
      </Box>

      {/* Sphere: right on desktop, below the text and dimmer on phones */}
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
                bgGradient="linear(to-r, #8ee3ff, #a18bff)"
                bgClip="text"
                pr="0.08em"
              >
                discovers.
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
              KalKram is a frontier research lab building AI systems that can do
              science: ask questions, design experiments, and understand what
              they find. We pursue capability and safety together.
            </Text>
          </FallInPlace>
          <FallInPlace delay={0.6}>
            <Flex mt={{ base: 8, md: 10 }} gap="3" wrap="wrap">
              <Button
                as={NextLink}
                href="/research"
                variant="cta"
                size="lg"
                h="14"
                px="8"
              >
                Our research
              </Button>
              <Button
                as={NextLink}
                href="/#vision"
                variant="line"
                size="lg"
                h="14"
                px="8"
              >
                Our vision
              </Button>
            </Flex>
          </FallInPlace>
        </MotionBox>
      </Container>

      {/* Bottom readout strip */}
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
            fontSize="xs"
            letterSpacing="0.18em"
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
            <Text
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.18em"
              color="kk.muted"
            >
              KALKRAM / कालक्रम
            </Text>
          </Flex>
          <Flex align="center" gap="3" aria-hidden>
            <Text
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.18em"
              color="kk.muted"
            >
              SCROLL
            </Text>
            <Box position="relative" w="1px" h="28px" bg="kk.line" overflow="hidden">
              <MotionBox
                position="absolute"
                left="0"
                top="0"
                w="1px"
                h="12px"
                bg="kk.accent"
                animate={reduce ? undefined : { y: [-12, 28] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};
