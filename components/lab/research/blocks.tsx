import * as React from "react";
import NextLink from "next/link";
import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { keyframes } from "@emotion/react";
import { Reveal } from "components/motion/reveal";
import { SCIENCE_IMAGES, type ScienceImageKey } from "data/images";
import { Backdrop } from "../graphics/backdrop";
import { OrbitalAtom } from "../graphics/orbital-atom";
import { NetworkField } from "../graphics/network-field";
import { HudFrame } from "../graphics/hud-frame";

const MotionDiv = motion(Box);

const slowZoom = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.12); }
`;

const display = {
  fontFamily: "display",
  textTransform: "uppercase" as const,
  fontWeight: "700",
  letterSpacing: "0.04em",
};

const body = {
  color: "kk.muted",
  fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
  lineHeight: "1.65",
  maxW: "40rem",
};

/* ------------------------------------------------------------------ Hero */

export const ResearchHero: React.FC = () => {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], reduce ? [1, 1] : [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.2]);
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 220]);
  const atomY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -120]);
  const photo = SCIENCE_IMAGES.pillars;

  return (
    <Box
      as="header"
      ref={ref}
      position="relative"
      overflow="hidden"
      minH="100svh"
      display="flex"
      alignItems="flex-end"
      borderBottomWidth="1px"
      borderColor="kk.line"
    >
      {/* Photograph: dimmed, slow zoom, scroll parallax. */}
      <MotionDiv
        position="absolute"
        inset="-12% 0"
        aria-hidden="true"
        style={{ y: photoY }}
      >
        <Box
          position="absolute"
          inset="0"
          opacity={0.3}
          animation={reduce ? undefined : `${slowZoom} 28s ease-in-out infinite alternate`}
          willChange="transform"
        >
          <Image
            src={photo.src}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "50% 35%" }}
          />
        </Box>
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-b, rgba(5,6,10,0.75) 0%, rgba(5,6,10,0.25) 45%, #05060a 100%)"
        />
      </MotionDiv>

      <MotionDiv position="absolute" inset="0" aria-hidden="true" style={{ scale: bgScale }}>
        <Backdrop variant="contours" />
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-b, rgba(5,6,10,0.3) 0%, rgba(5,6,10,0) 40%, #05060a 100%)"
        />
      </MotionDiv>

      {/* Large dim atom on the right, desktop only. */}
      <MotionDiv
        aria-hidden="true"
        display={{ base: "none", lg: "block" }}
        position="absolute"
        right="-6vw"
        top="8vh"
        w="min(60vw, 820px)"
        opacity={0.5}
        pointerEvents="none"
        style={{ y: atomY }}
      >
        <OrbitalAtom size="100%" />
      </MotionDiv>

      <Container
        maxW="container.xl"
        px={{ base: 5, md: 8 }}
        position="relative"
        zIndex={1}
        pb={{ base: 16, md: 24 }}
        pt="160px"
      >
        <MotionDiv style={{ y: textY, opacity: textOpacity }}>
          <Heading
            as="h1"
            {...display}
            fontSize="clamp(2.6rem, 11vw, 10rem)"
            lineHeight="0.92"
            sx={{ textWrap: "balance" }}
            maxW="14ch"
          >
            Learning that does not end.
          </Heading>
          <Text mt={{ base: 8, md: 10 }} {...body}>
            Three programmes, one system.
          </Text>
        </MotionDiv>
      </Container>
    </Box>
  );
};

/* ----------------------------------------------------------- Area panels */

export interface PanelArea {
  index: string;
  title: string;
  paragraph: string;
  graphic: React.ReactNode;
}

export const AreaPanel: React.FC<{ area: PanelArea; flip: boolean }> = ({
  area,
  flip,
}) => {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [1, 1, 1] : [0.8, 1.03, 1.1]
  );
  const gy = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const numY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [120, -160]);

  return (
    <Box
      as="section"
      ref={ref}
      aria-labelledby={`area-${area.index}`}
      position="relative"
      overflowX="clip"
      borderTopWidth="1px"
      borderColor="kk.line"
      h={{ lg: "170vh" }}
    >
      <Box
        position={{ lg: "sticky" }}
        top={0}
        minH={{ base: "auto", lg: "100vh" }}
        display="flex"
        alignItems="center"
        py={{ base: 20, lg: 0 }}
      >
        <MotionDiv
          aria-hidden="true"
          position="absolute"
          top={{ base: "4%", lg: "10%" }}
          {...(flip ? { left: { base: "-2%", lg: "2%" } } : { right: { base: "-2%", lg: "2%" } })}
          fontFamily="display"
          fontWeight="700"
          fontSize="clamp(9rem, 34vw, 32rem)"
          lineHeight="0.8"
          color="transparent"
          sx={{ WebkitTextStroke: "1px rgba(255,255,255,0.16)" }}
          pointerEvents="none"
          userSelect="none"
          style={{ y: numY }}
        >
          {area.index}
        </MotionDiv>

        <Container maxW="container.xl" px={{ base: 5, md: 8 }} position="relative" zIndex={1}>
          <Box
            display="grid"
            gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={{ base: 12, lg: 20 }}
            alignItems="center"
          >
            <Box order={{ base: 2, lg: flip ? 2 : 1 }}>
              <Reveal>
                <Heading
                  as="h2"
                  id={`area-${area.index}`}
                  {...display}
                  fontSize="clamp(2.2rem, 5.2vw, 4.6rem)"
                  lineHeight="1"
                  sx={{ textWrap: "balance" }}
                >
                  {area.title}
                </Heading>
                <Box mt={8} w="64px" h="1px" bg="kk.accent" />
                <Text mt={8} {...body}>
                  {area.paragraph}
                </Text>
              </Reveal>
            </Box>
            <Box order={{ base: 1, lg: flip ? 1 : 2 }} aria-hidden="true">
              <MotionDiv
                position="relative"
                maxW={{ base: "520px", lg: "none" }}
                mx="auto"
                w="100%"
                style={{ scale, y: gy }}
                sx={{ "& > div > *": { width: "100%", maxWidth: "100%" } }}
              >
                <Box
                  aria-hidden="true"
                  position="absolute"
                  inset="-18%"
                  pointerEvents="none"
                  bg="radial-gradient(ellipse at 50% 50%, rgba(142,227,255,0.14), transparent 62%)"
                />
                <Box position="relative">{area.graphic}</Box>
              </MotionDiv>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

/* ---------------------------------------------------------- Panel group */

/** Wraps the three programme panels and lays a faint network behind them. */
export const PanelGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box position="relative" overflowX="clip">
    <Box aria-hidden="true" position="absolute" inset="0" opacity={0.45} pointerEvents="none">
      <NetworkField density={0.7} />
      <Box
        position="absolute"
        inset="0"
        bgGradient="linear(to-b, #05060a 0%, transparent 12%, transparent 88%, #05060a 100%)"
      />
    </Box>
    <Box position="relative">{children}</Box>
  </Box>
);

/* ------------------------------------------------------------ Image band */

/** Full-bleed photograph with scroll parallax, corner brackets and the credit. */
export const ImageBand: React.FC<{ image?: ScienceImageKey }> = ({
  image = "stephansQuintet",
}) => {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-14%", "14%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1.08, 1, 1.08]);
  const photo = SCIENCE_IMAGES[image];

  return (
    <Box
      as="section"
      ref={ref}
      aria-label={photo.title}
      position="relative"
      borderTopWidth="1px"
      borderColor="kk.line"
      px={{ base: 5, md: 8 }}
      py={{ base: 8, md: 10 }}
      bg="kk.canvas"
    >
      <HudFrame credit={`${photo.title}. ${photo.credit}`}>
        <Box
          position="relative"
          overflow="hidden"
          mx={{ base: -5, md: 0 }}
          h={{ base: "70svh", md: "92vh" }}
          minH="420px"
        >
          <MotionDiv position="absolute" inset="-16% 0" style={{ y, scale }}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "50% 45%" }}
            />
          </MotionDiv>
          <Box
            aria-hidden="true"
            position="absolute"
            inset="0"
            bgGradient="linear(to-b, rgba(5,6,10,0.55) 0%, rgba(5,6,10,0.05) 35%, rgba(5,6,10,0.05) 65%, rgba(5,6,10,0.7) 100%)"
          />
          <Box
            aria-hidden="true"
            position="absolute"
            inset="0"
            boxShadow="inset 0 0 0 1px rgba(255,255,255,0.08)"
          />
        </Box>
      </HudFrame>
    </Box>
  );
};

/* --------------------------------------------------------- Open problems */

export const OpenProblems: React.FC<{ questions: string[] }> = ({ questions }) => (
  <Box
    as="section"
    aria-labelledby="open-problems"
    borderTopWidth="1px"
    borderColor="kk.line"
    py={{ base: 20, md: 36 }}
    overflowX="clip"
  >
    <Container maxW="container.xl" px={{ base: 5, md: 8 }}>
      <Reveal>
        <Heading
          as="h2"
          id="open-problems"
          {...display}
          fontSize="clamp(2.2rem, 6vw, 5.5rem)"
          lineHeight="1"
        >
          Open problems
        </Heading>
      </Reveal>
      <Box as="ul" m={0} p={0} mt={{ base: 10, md: 16 }}>
        {questions.map((q, i) => (
          <Box as="li" key={q} listStyleType="none">
            <Reveal delay={i * 0.05}>
              <Box
                py={{ base: 6, md: 8 }}
                borderTopWidth="1px"
                borderColor="kk.line"
                borderBottomWidth={i === questions.length - 1 ? "1px" : 0}
              >
                <Text
                  fontFamily="display"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.03em"
                  fontSize="clamp(1.3rem, 2.8vw, 2.4rem)"
                  lineHeight="1.15"
                  sx={{ textWrap: "balance" }}
                >
                  {q}
                </Text>
              </Box>
            </Reveal>
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

/* -------------------------------------------------------------- Closing */

export const Closing: React.FC = () => (
  <Box
    as="section"
    position="relative"
    overflow="hidden"
    borderTopWidth="1px"
    borderColor="kk.line"
    py={{ base: 28, md: 48 }}
    textAlign="center"
  >
    <Box
      aria-hidden="true"
      position="absolute"
      inset="0"
      bg="radial-gradient(ellipse at 50% 100%, rgba(56,189,248,0.18), transparent 60%)"
    />
    <Container maxW="container.xl" px={{ base: 5, md: 8 }} position="relative">
      <Reveal>
        <Heading
          as="h2"
          {...display}
          fontSize="clamp(2rem, 5.2vw, 4.8rem)"
          lineHeight="1.02"
          sx={{ textWrap: "balance" }}
          maxW="24ch"
          mx="auto"
        >
          We publish what we can verify, and we say plainly what we do not yet know.
        </Heading>
        <Button
          as={NextLink}
          href="/careers"
          variant="cta"
          size="lg"
          h="14"
          px="10"
          mt={{ base: 10, md: 14 }}
        >
          Join us
        </Button>
      </Reveal>
    </Container>
  </Box>
);
