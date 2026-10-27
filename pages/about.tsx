import * as React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import siteConfig from "data/config";
import { IMAGE_CREDIT_LINE, SCIENCE_IMAGES } from "data/images";
import { Reveal } from "components/motion/reveal";
import { Parallax } from "components/motion/parallax";
import {
  DashedRule,
  LabHeading,
  LabSection,
  Lead,
  SectionLabel,
} from "components/lab/primitives";
import { PageHero } from "components/lab/pages/page-hero";
import { SpotlightCard } from "components/lab/pages/spotlight-card";
import { ArrowLink } from "components/lab/pages/arrow-link";
import { WordReveal } from "components/lab/graphics/word-reveal";
import { DnaHelix } from "components/lab/graphics/dna-helix";

const VISION =
  "Every great leap in human life began as a question someone could not leave alone. We believe the next leap is an intelligence that can ask those questions with us, and sometimes before us. We are building it carefully, because a mind that can discover can also be wrong in ways that matter.";

const PILLARS = [
  {
    index: "01",
    title: "Discovery as the benchmark",
    body: "The real test of intelligence is finding something new and true.",
  },
  {
    index: "02",
    title: "Capability and safety, together",
    body: "We advance them in the same programme, never one after the other.",
  },
  {
    index: "03",
    title: "Evidence over announcement",
    body: "We publish what we can verify and say plainly what we do not yet know.",
  },
];

const PRINCIPLES = [
  {
    title: "Safety and capability, together",
    body: "A more capable system needs stronger checks. We build both at once, so neither falls behind the other.",
  },
  {
    title: "Open to scrutiny",
    body: "We want our reasoning examined and our mistakes found. Criticism from outside the lab is how our work improves.",
  },
  {
    title: "Long horizons",
    body: "The questions we care about take years to answer. We choose the work that matters over the work that is quick to show.",
  },
  {
    title: "Rigour before announcement",
    body: "A result is ready to share only when we can explain it and others can check it.",
  },
];

const WAYS_OF_WORKING = [
  {
    title: "Small teams",
    body: "Small groups of people who know the problem well, with room to follow an idea without a long approval chain.",
  },
  {
    title: "Long horizons",
    body: "We plan in years and measure progress by what we understand, not by how often we announce. Questions such as continual learning and sub-quadratic attention need that patience.",
  },
  {
    title: "Safety inside the research programme",
    body: "Safety researchers work next to the people building the systems, from the first design to the last review, and Mechanistic Interpretability is part of that work.",
  },
  {
    title: "Written reasoning",
    body: "We write down what we believe, why, and what would change our mind. Writing makes weak arguments easy to see.",
  },
];

const heading3 = {
  as: "h3" as const,
  fontFamily: "display",
  fontWeight: "400",
  fontSize: { base: "2xl", md: "3xl" },
  lineHeight: "1.15",
  letterSpacing: "-0.01em",
};

const About: NextPage = () => {
  const band = SCIENCE_IMAGES.southernRing;
  const email = siteConfig.footer.contactEmail;

  return (
    <Box>
      <SEO
        title="About | KalKram"
        description="KalKram is a frontier research lab building AI systems that can do science. Read our vision, our principles and how we work."
      />
      <PageHero
        eyebrow="[ About ]"
        title="About"
        image="cosmicCliffs"
        description="KalKram is a frontier research lab building AI systems that can do science. This page sets out what we believe, how we work and why."
      />

      <LabSection id="vision">
        <Reveal>
          <SectionLabel index="01">Vision</SectionLabel>
        </Reveal>
        <Box mt={{ base: 8, md: 12 }} maxW="62rem">
          <WordReveal
            text={VISION}
            fontFamily="display"
            fontWeight="500"
            fontSize="clamp(1.75rem, 4.2vw, 3.25rem)"
            lineHeight="1.2"
            letterSpacing="0"
          />
        </Box>
        <Box
          mt={{ base: 14, md: 20 }}
          display="grid"
          gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={5}
        >
          {PILLARS.map((p, i) => (
            <Reveal key={p.index} delay={i * 0.08}>
              <SpotlightCard h="100%">
                <Text
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="0.18em"
                  color="kk.accent"
                  mb={6}
                >
                  {p.index}
                </Text>
                <Heading {...heading3}>{p.title}</Heading>
                <Text mt={4} color="kk.muted" lineHeight="1.7">
                  {p.body}
                </Text>
              </SpotlightCard>
            </Reveal>
          ))}
        </Box>
      </LabSection>

      <DashedRule />

      <LabSection>
        <Reveal maxW="46rem">
          <SectionLabel index="02">Principles</SectionLabel>
          <LabHeading mt={5}>What we hold to.</LabHeading>
        </Reveal>
        <Box
          mt={{ base: 10, md: 16 }}
          display="grid"
          gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          columnGap={{ base: 0, md: 16 }}
        >
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08}>
              <Box borderTopWidth="1px" borderColor="kk.line" py={8}>
                <Heading {...heading3}>{p.title}</Heading>
                <Text mt={3} color="kk.muted" lineHeight="1.7" maxW="30rem">
                  {p.body}
                </Text>
              </Box>
            </Reveal>
          ))}
        </Box>
      </LabSection>

      <DashedRule />

      <LabSection>
        <Reveal maxW="46rem">
          <SectionLabel index="03">How we work</SectionLabel>
          <LabHeading mt={5}>Quiet, careful and in writing.</LabHeading>
          <Lead mt={6}>
            We would rather understand one thing well than announce ten things
            half-finished.
          </Lead>
        </Reveal>
        <Box
          mt={{ base: 10, md: 16 }}
          display="grid"
          gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={5}
        >
          {WAYS_OF_WORKING.map((w, i) => (
            <Reveal key={w.title} delay={(i % 2) * 0.08}>
              <SpotlightCard h="100%">
                <Heading {...heading3}>{w.title}</Heading>
                <Text mt={3} color="kk.muted" lineHeight="1.7">
                  {w.body}
                </Text>
              </SpotlightCard>
            </Reveal>
          ))}
        </Box>
      </LabSection>

      <DashedRule />

      <LabSection
        decor={
          <Box
            position="absolute"
            top="50%"
            right={{ base: "-80px", md: "4%" }}
            w={{ base: "160px", md: "220px" }}
            transform="translateY(-50%)"
            opacity={0.35}
            pointerEvents="none"
            aria-hidden="true"
          >
            <DnaHelix />
          </Box>
        }
      >
        <Reveal maxW="40rem">
          <SectionLabel index="04">The name</SectionLabel>
          <Box mt={8} display="flex" alignItems="center" gap={6}>
            <Image
              src="/static/brand/kalkram-logo.png"
              alt="The KalKram hourglass mark"
              width={72}
              height={72}
              style={{ width: 72, height: 72, objectFit: "contain", flexShrink: 0 }}
            />
            <LabHeading as="h2" fontSize="clamp(1.5rem, 3.6vw, 2.75rem)">
              KalKram
            </LabHeading>
          </Box>
          <Lead mt={8}>
            KalKram (कालक्रम) is Hindi for chronology, the order in which
            things unfold. Our mark is an hourglass.
          </Lead>
        </Reveal>
      </LabSection>

      <Box
        as="figure"
        m={0}
        position="relative"
        overflow="hidden"
        h={{ base: "56vh", md: "70vh" }}
        minH="360px"
        borderTopWidth="1px"
        borderBottomWidth="1px"
        borderColor="kk.line"
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
            src={band.src}
            alt={band.alt}
            fill
            sizes="100vw"
            style={{ objectFit: "cover", opacity: 0.85 }}
          />
        </Parallax>
        <Box
          position="absolute"
          inset="0"
          pointerEvents="none"
          bgGradient="linear(to-t, rgba(5,6,10,0.85) 0%, rgba(5,6,10,0) 45%)"
        />
        <Text
          as="figcaption"
          position="absolute"
          left={{ base: 5, md: 8 }}
          right={{ base: 5, md: 8 }}
          bottom={5}
          fontFamily="mono"
          fontSize="xs"
          letterSpacing="0.14em"
          textTransform="uppercase"
          color="kk.muted"
        >
          FIG. 01 / {band.title} / {band.credit}
        </Text>
      </Box>
      <Text
        px={{ base: 5, md: 8 }}
        pt={4}
        fontFamily="mono"
        fontSize="xs"
        color="kk.muted"
        maxW="container.xl"
        mx="auto"
      >
        {IMAGE_CREDIT_LINE}
      </Text>

      <LabSection>
        <Reveal maxW="46rem">
          <SectionLabel index="05">Contact</SectionLabel>
          <LabHeading mt={5}>Write to us.</LabHeading>
          <Lead mt={6}>
            We read every message from researchers, engineers and anyone with a
            good question. Email is the best way to reach us.
          </Lead>
          <Box mt={8}>
            <ArrowLink href={`mailto:${email}`}>Email {email}</ArrowLink>
          </Box>
          <Text mt={8} color="kk.muted" fontSize="sm">
            Looking for work? See the{" "}
            <Link as={NextLink} href="/careers" color="kk.accent" textDecoration="underline">
              careers page
            </Link>
            .
          </Text>
        </Reveal>
      </LabSection>
    </Box>
  );
};

export default About;
