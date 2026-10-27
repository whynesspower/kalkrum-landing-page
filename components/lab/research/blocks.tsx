import * as React from "react";
import Image from "next/image";
import NextLink from "next/link";
import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Parallax } from "components/motion/parallax";
import { Reveal } from "components/motion/reveal";
import { SCIENCE_IMAGES } from "data/images";
import { HeroSphere } from "../graphics/hero-sphere";
import { ScrambleText } from "../graphics/scramble-text";
import { HudFrame } from "../graphics/hud-frame";

const MotionDiv = motion(Box);

const display = {
  fontFamily: "display",
  textTransform: "uppercase" as const,
  fontWeight: "700",
  letterSpacing: "0.04em",
};

const Mono: React.FC<React.ComponentProps<typeof Text>> = (props) => (
  <Text
    fontFamily="mono"
    fontSize="xs"
    letterSpacing="0.18em"
    textTransform="uppercase"
    color="kk.accent"
    {...props}
  />
);

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
  const sphereScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.35]);
  const photo = SCIENCE_IMAGES.deepField;

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
      <Box position="absolute" inset="0" aria-hidden="true">
        <Parallax
          distance={-80}
          position="absolute"
          top="-80px"
          bottom="-80px"
          left="0"
          right="0"
        >
          <Image
            src={photo.src}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", opacity: 0.3 }}
          />
        </Parallax>
        <MotionDiv
          position="absolute"
          top={{ base: "4%", lg: "6%" }}
          right={{ base: "-30%", lg: "-6%" }}
          w={{ base: "130%", lg: "62%" }}
          h={{ base: "62%", lg: "88%" }}
          style={{ scale: sphereScale }}
        >
          <HeroSphere />
        </MotionDiv>
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-b, rgba(5,6,10,0.7) 0%, rgba(5,6,10,0.1) 40%, #05060a 100%)"
        />
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-r, rgba(5,6,10,0.8) 0%, rgba(5,6,10,0) 65%)"
        />
      </Box>

      <Container
        maxW="container.xl"
        px={{ base: 5, md: 8 }}
        position="relative"
        zIndex={1}
        pb={{ base: 16, md: 24 }}
        pt="160px"
      >
        <MotionDiv style={{ y: textY, opacity: textOpacity }}>
          <Mono mb={{ base: 6, md: 8 }}>
            <ScrambleText text="[ Research ]" />
          </Mono>
          <Heading
            as="h1"
            {...display}
            fontSize="clamp(2.6rem, 11vw, 10rem)"
            lineHeight="0.92"
            sx={{ textWrap: "balance" }}
            maxW="14ch"
          >
            Intelligence that does science
          </Heading>
          <Text
            mt={{ base: 8, md: 10 }}
            color="kk.muted"
            fontSize={{ base: "lg", md: "xl" }}
            maxW="30rem"
            lineHeight="1.6"
          >
            Four programmes with one aim: systems that discover.
          </Text>
        </MotionDiv>
        <Box
          aria-hidden="true"
          mt={{ base: 10, md: 14 }}
          w="1px"
          h="64px"
          bgGradient="linear(to-b, kk.accent, transparent)"
        />
      </Container>
    </Box>
  );
};

/* ----------------------------------------------------------- Area panels */

export interface PanelArea {
  index: string;
  title: string;
  line: string;
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
    reduce ? [1, 1, 1] : [0.78, 1.04, 1.12]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [flip ? 6 : -6, flip ? -6 : 6]
  );
  const numY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [120, -160]);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.9, 0.2]);

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
        {/* huge outlined numeral */}
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

        <Container
          maxW="container.xl"
          px={{ base: 5, md: 8 }}
          position="relative"
          zIndex={1}
        >
          <Box
            display="grid"
            gridTemplateColumns={{ base: "1fr", lg: "1fr 1.1fr" }}
            gap={{ base: 12, lg: 16 }}
            alignItems="center"
          >
            <Box order={{ base: 2, lg: flip ? 2 : 1 }}>
              <Reveal>
                <Mono mb={6}>
                  <ScrambleText text={`[ ${area.index} / 04 ]`} />
                </Mono>
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
                  maxW="26rem"
                >
                  {area.line}
                </Text>
              </Reveal>
            </Box>
            <Box order={{ base: 1, lg: flip ? 1 : 2 }} aria-hidden="true">
              <MotionDiv
                position="relative"
                maxW={{ base: "420px", lg: "640px" }}
                mx="auto"
                w="100%"
                style={{ scale, rotate }}
              >
                <MotionDiv
                  position="absolute"
                  inset="-12%"
                  borderRadius="full"
                  bg="radial-gradient(circle, rgba(142,227,255,0.16) 0%, rgba(91,124,255,0.06) 45%, transparent 70%)"
                  style={{ opacity: glow }}
                />
                <Box
                  position="absolute"
                  inset="-4%"
                  borderRadius="full"
                  borderWidth="1px"
                  borderColor="kk.line"
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

/* ------------------------------------------------------------ Image band */

export const ImageBand: React.FC<{
  image: keyof typeof SCIENCE_IMAGES;
  fig: string;
}> = ({ image, fig }) => {
  const photo = SCIENCE_IMAGES[image];
  return (
    <Box
      as="section"
      aria-label={photo.title}
      borderTopWidth="1px"
      borderColor="kk.line"
      py={{ base: 16, md: 28 }}
      overflowX="clip"
    >
      <Container maxW="container.xl" px={{ base: 5, md: 8 }}>
        <HudFrame label={`${fig} / ${photo.title}`} credit={photo.credit}>
          <Box
            position="relative"
            overflow="hidden"
            h={{ base: "52vw", md: "62vh" }}
            minH="240px"
            borderWidth="1px"
            borderColor="kk.line"
            role="img"
            aria-label={photo.alt}
          >
            <Parallax
              distance={-70}
              position="absolute"
              top="-70px"
              bottom="-70px"
              left="0"
              right="0"
            >
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="(min-width: 1280px) 1180px, 100vw"
                style={{ objectFit: "cover" }}
              />
            </Parallax>
            <Box
              position="absolute"
              inset="0"
              pointerEvents="none"
              bgGradient="linear(to-t, rgba(5,6,10,0.55), transparent 50%)"
            />
          </Box>
        </HudFrame>
      </Container>
    </Box>
  );
};

/* ------------------------------------------------------------ Loop band */

export const BandHeading: React.FC<{
  label: string;
  title: string;
  line: string;
  center?: boolean;
}> = ({ label, title, line, center }) => (
  <Reveal textAlign={center ? "center" : "left"} mx={center ? "auto" : 0} maxW="46rem">
    <Mono mb={6}>
      <ScrambleText text={label} />
    </Mono>
    <Heading
      as="h2"
      {...display}
      fontSize="clamp(2.2rem, 6vw, 5.5rem)"
      lineHeight="1"
      sx={{ textWrap: "balance" }}
    >
      {title}
    </Heading>
    <Text
      mt={7}
      color="kk.muted"
      fontSize={{ base: "lg", md: "xl" }}
      lineHeight="1.6"
      mx={center ? "auto" : 0}
      maxW="30rem"
    >
      {line}
    </Text>
  </Reveal>
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
      bg="radial-gradient(ellipse at 50% 100%, rgba(91,124,255,0.18), transparent 60%)"
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
          Work on the questions with us
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
