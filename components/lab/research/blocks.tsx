import * as React from "react";
import NextLink from "next/link";
import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
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
            One thesis. Four programmes.
          </Heading>
          <Text
            mt={{ base: 8, md: 10 }}
            color="kk.muted"
            fontSize={{ base: "lg", md: "xl" }}
            maxW="32rem"
            lineHeight="1.6"
          >
            Each programme attacks one reason today's models stop learning.
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
  line: string;
  terms: string[];
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
            gridTemplateColumns={{ base: "1fr", lg: "1fr 1.1fr" }}
            gap={{ base: 12, lg: 16 }}
            alignItems="center"
          >
            <Box order={{ base: 2, lg: flip ? 2 : 1 }}>
              <Reveal>
                <Heading
                  as="h2"
                  id={`area-${area.index}`}
                  {...display}
                  fontSize="clamp(2.2rem, 5.6vw, 5rem)"
                  lineHeight="1"
                  sx={{ textWrap: "balance" }}
                >
                  {area.title}
                </Heading>
                <Box mt={8} w="64px" h="1px" bg="kk.accent" />
                <Text
                  mt={8}
                  color="kk.muted"
                  fontSize={{ base: "lg", md: "xl" }}
                  lineHeight="1.6"
                  maxW="28rem"
                >
                  {area.line}
                </Text>
                <Box as="ul" m={0} p={0} mt={8} display="flex" flexWrap="wrap" gap={2}>
                  {area.terms.map((t) => (
                    <Box
                      as="li"
                      key={t}
                      listStyleType="none"
                      px={4}
                      py={1.5}
                      borderWidth="1px"
                      borderColor="kk.line"
                      borderRadius="full"
                      bg="rgba(11,13,20,0.6)"
                      fontFamily="mono"
                      fontSize="xs"
                      letterSpacing="0.06em"
                      color="kk.fg"
                    >
                      {t}
                    </Box>
                  ))}
                </Box>
              </Reveal>
            </Box>
            <Box order={{ base: 1, lg: flip ? 1 : 2 }} aria-hidden="true">
              <MotionDiv
                position="relative"
                maxW={{ base: "420px", lg: "640px" }}
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
      <Box as="ol" m={0} p={0} mt={{ base: 10, md: 16 }}>
        {questions.map((q, i) => (
          <Box as="li" key={q} listStyleType="none"><Reveal delay={i * 0.05}>
            <Box
              display="grid"
              gridTemplateColumns={{ base: "2.2rem 1fr", md: "4rem 1fr" }}
              gap={4}
              py={{ base: 6, md: 8 }}
              borderTopWidth="1px"
              borderColor="kk.line"
              alignItems="baseline"
            >
              <Text fontFamily="mono" fontSize="sm" color="kk.accent">
                {String(i + 1).padStart(2, "0")}
              </Text>
              <Text
                fontFamily="display"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.03em"
                fontSize="clamp(1.2rem, 2.6vw, 2.2rem)"
                lineHeight="1.15"
              >
                {q}
              </Text>
            </Box>
          </Reveal></Box>
        ))}
      </Box>
    </Container>
  </Box>
);

/* --------------------------------------------------------- Chip marquee */

const slide = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const Chip: React.FC<{ term: string; hot?: boolean }> = ({ term, hot }) => (
  <Box
    as="li"
    listStyleType="none"
    flexShrink={0}
    mr={{ base: 3, md: 4 }}
    px={{ base: 5, md: 8 }}
    py={{ base: 3, md: 4 }}
    borderWidth="1px"
    borderColor={hot ? "rgba(142,227,255,0.45)" : "kk.line"}
    borderRadius="full"
    bg="rgba(11,13,20,0.6)"
    fontFamily="display"
    fontWeight="700"
    textTransform="uppercase"
    letterSpacing="0.06em"
    fontSize={{ base: "md", md: "2xl" }}
    whiteSpace="nowrap"
    color={hot ? "kk.accent" : "kk.fg"}
    transition="all .35s ease"
    cursor="default"
    _hover={{
      color: "kk.canvas",
      bg: "kk.accent",
      borderColor: "kk.accent",
      boxShadow: "0 0 36px rgba(142,227,255,0.55)",
    }}
  >
    {term}
  </Box>
);

const ChipRow: React.FC<{
  terms: string[];
  seconds: number;
  reverse?: boolean;
  label: string;
}> = ({ terms, seconds, reverse, label }) => (
  <Box
    overflow="hidden"
    sx={{
      maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
    }}
    _hover={{ "& .kk-chip-track": { animationPlayState: "paused" } }}
  >
    <Box
      className="kk-chip-track"
      display="flex"
      w="max-content"
      animation={`${slide} ${seconds}s linear infinite ${reverse ? "reverse" : "normal"}`}
      willChange="transform"
    >
      {[0, 1, 2, 3].map((n) => (
        <Box
          as="ul"
          key={n}
          m={0}
          p={0}
          display="flex"
          flexShrink={0}
          aria-label={n === 0 ? label : undefined}
          aria-hidden={n === 0 ? undefined : true}
        >
          {terms.map((t) => (
            <Chip key={t} term={t} hot={t === "Mechanistic Interpretability"} />
          ))}
        </Box>
      ))}
    </Box>
  </Box>
);

export const ChipWall: React.FC<{ rows: string[][] }> = ({ rows }) => (
  <Box display="flex" flexDirection="column" gap={{ base: 3, md: 4 }}>
    {rows.map((terms, i) => (
      <ChipRow
        key={i}
        terms={terms}
        seconds={[90, 120, 100, 135][i % 4]}
        reverse={i % 2 === 1}
        label={`Technical agenda, group ${i + 1}`}
      />
    ))}
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
          fontSize="clamp(2.4rem, 8vw, 7.5rem)"
          lineHeight="0.98"
          sx={{ textWrap: "balance" }}
        >
          We may be wrong. The questions are worth it.
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
