import * as React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { Box, Heading, Text } from "@chakra-ui/react";
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
  } from "components/lab/primitives";
import { PageHero } from "components/lab/pages/page-hero";
import { SpotlightCard } from "components/lab/pages/spotlight-card";
import { ArrowLink } from "components/lab/pages/arrow-link";
import { HudFrame } from "components/lab/graphics/hud-frame";

const TRAITS = [
  {
    title: "Curiosity",
    body: "You keep asking why after the first answer, and you follow a question into unfamiliar fields.",
  },
  {
    title: "Rigour",
    body: "You check your own work first, and you want others to be able to check it too.",
  },
  {
    title: "Honesty about uncertainty",
    body: "You can say \"I do not know\" and \"I was wrong\" without fuss, and you say how sure you are.",
  },
  {
    title: "Care about safety",
    body: "You want powerful systems to be understood and verifiable, and you see that as part of the research.",
  },
];

const AREAS = [
  {
    title: "Research scientists",
    body: "People who pose the questions and design the studies: reasoning and learning, scientific modelling, and the safety and interpretability of capable systems.",
    subject: "Research scientist enquiry",
  },
  {
    title: "Research engineers",
    body: "People who turn ideas into working experiments: training and evaluating models, building tools for experimentation, and making results repeatable.",
    subject: "Research engineer enquiry",
  },
  {
    title: "Infrastructure and systems",
    body: "People who build the foundations that research runs on: compute, data pipelines, simulation and lab automation, and the reliability that keeps it all running.",
    subject: "Infrastructure and systems enquiry",
  },
];

const mailto = (email: string, subject: string) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}`;

const heading3 = {
  as: "h3" as const,
  fontFamily: "display",
  fontWeight: "400",
  fontSize: { base: "2xl", md: "3xl" },
  lineHeight: "1.15",
  letterSpacing: "-0.01em",
};

const Careers: NextPage = () => {
  const email = siteConfig.footer.contactEmail;
  const pillars = SCIENCE_IMAGES.pillars;
  const quintet = SCIENCE_IMAGES.stephansQuintet;

  return (
    <Box>
      <SEO
        title="Careers | KalKram"
        description="Join KalKram, a frontier research lab building AI systems that can do science. We hire research scientists, research engineers and infrastructure engineers."
      />
      <PageHero
        title="Work on the hardest problem you can find."
        image="stephansQuintet"
        description="We are a lab with a long horizon. If you want to help build AI that can do science, and to do it with care, we would like to hear from you."
      />

      <LabSection>
        <Reveal maxW="46rem">
          <LabHeading mt={5}>Four things matter most.</LabHeading>
          <Lead mt={6}>
            Degrees and titles matter less to us than how you think. These are
            the qualities we look for in everyone we work with. Depth in areas
            such as state space models, mixture of experts or Mechanistic
            Interpretability helps, but curiosity comes first.
          </Lead>
        </Reveal>
        <Box
          mt={{ base: 10, md: 16 }}
          display="grid"
          gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          columnGap={{ base: 0, md: 16 }}
        >
          {TRAITS.map((t, i) => (
            <Reveal key={t.title} delay={(i % 2) * 0.08}>
              <Box borderTopWidth="1px" borderColor="kk.line" py={8}>
                <Heading {...heading3}>{t.title}</Heading>
                <Text mt={3} color="kk.muted" lineHeight="1.7" maxW="30rem">
                  {t.body}
                </Text>
              </Box>
            </Reveal>
          ))}
        </Box>
      </LabSection>

      <DashedRule />

      <LabSection>
        <Reveal maxW="46rem">
          <LabHeading mt={5}>Three areas we hire in.</LabHeading>
          <Lead mt={6}>
            These are areas of work, not open job postings. If one fits you,
            write to us and tell us what you would like to build.
          </Lead>
        </Reveal>
        <Box
          mt={{ base: 10, md: 16 }}
          display="grid"
          gridTemplateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
          gap={5}
        >
          {AREAS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <SpotlightCard h="100%">
                <Text
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="0.18em"
                  color="kk.accent"
                  mb={6}
                >
                  {`0${i + 1}`}
                </Text>
                <Heading {...heading3}>{a.title}</Heading>
                <Text mt={4} color="kk.muted" lineHeight="1.7" flex="1">
                  {a.body}
                </Text>
                <Box mt={8}>
                  <ArrowLink href={mailto(email, a.subject)} fontSize="xs">
                    Email us about {a.title.toLowerCase()}
                  </ArrowLink>
                </Box>
              </SpotlightCard>
            </Reveal>
          ))}
        </Box>
      </LabSection>

      <DashedRule />

      <LabSection>
        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: 12, lg: 20 }}
          alignItems="start"
        >
          <Reveal>
            <LabHeading mt={5}>Send us an email.</LabHeading>
            <Lead mt={6}>
              There is no form and no portal. Write a short note about what
              you have worked on, what you want to work on next, and why it
              matters to you. Add links to anything you are proud of.
            </Lead>
            <Box mt={8}>
              <ArrowLink
                href={mailto(email, "Introduction to KalKram")}
              >
                Email {email}
              </ArrowLink>
            </Box>
          </Reveal>
          <Reveal delay={0.1}>
            <Text color="kk.muted" lineHeight="1.75">
              We read every message. We cannot promise a quick reply to each,
              but a real person will read what you send. We are happy to hear
              from people whose path has not followed the usual route into
              research.
            </Text>
          </Reveal>
        </Box>
      </LabSection>

      <Box
        position="relative"
        overflowX="clip"
        px={{ base: 5, md: 8 }}
        pb={{ base: 20, md: 32 }}
        maxW="container.xl"
        mx="auto"
      >
        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={{ base: 8, md: 6 }}
        >
          <Parallax distance={20}>
            <HudFrame label="FIG. 01" credit={pillars.credit}>
              <Image
                src={pillars.src}
                alt={pillars.alt}
                width={pillars.width}
                height={pillars.height}
                sizes="(min-width: 768px) 50vw, 100vw"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </HudFrame>
          </Parallax>
          <Parallax distance={-20}>
            <HudFrame label="FIG. 02" credit={quintet.credit}>
              <Image
                src={quintet.src}
                alt={quintet.alt}
                width={quintet.width}
                height={quintet.height}
                sizes="(min-width: 768px) 50vw, 100vw"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </HudFrame>
          </Parallax>
        </Box>
        <Text
          mt={6}
          fontFamily="mono"
          fontSize="xs"
          color="kk.muted"
        >
          {IMAGE_CREDIT_LINE}
        </Text>
      </Box>
    </Box>
  );
};

export default Careers;
