import * as React from "react";
import NextLink from "next/link";
import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Reveal } from "components/motion/reveal";
import { Backdrop } from "../graphics/backdrop";

const MotionDiv = motion(Box);

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
      <MotionDiv position="absolute" inset="0" aria-hidden="true" style={{ scale: bgScale }}>
        <Backdrop variant="contours" />
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-b, rgba(5,6,10,0.6) 0%, rgba(5,6,10,0.05) 40%, #05060a 100%)"
        />
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
            gridTemplateColumns={{ base: "1fr", lg: "1.1fr 1fr" }}
            gap={{ base: 12, lg: 16 }}
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
                maxW={{ base: "420px", lg: "600px" }}
                mx="auto"
                w="100%"
                style={{ scale, y: gy }}
              >
                <Box position="relative">{area.graphic}</Box>
              </MotionDiv>
            </Box>
          </Box>
        </Container>
      </Box>
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
