import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import { Reveal } from "components/motion/reveal";
import { Parallax } from "components/motion/parallax";
import { DashedRule, LabHeading, LabSection, Lead } from "components/lab/primitives";
import { PageHero } from "components/lab/page-hero";
import { HudFrame } from "components/lab/graphics/hud-frame";
import { StateFlow } from "components/lab/graphics/state-flow";
import { WaveField } from "components/lab/graphics/wave-field";
import { faq } from "data/faq";

type Chapter = {
  n: string;
  name: string;
  title: string;
  body: string[];
  facts?: Array<[string, string]>;
};

const CHAPTERS: Chapter[] = [
  {
    n: "01",
    name: "Find the structure",
    title: "Look before you search.",
    body: [
      "General solvers pay for the whole search space. Structure, whether a symmetry, an identity or a way the problem splits, shows where answers can live.",
      "So the system first runs detectors over the problem, and commits to a structure only after a checker confirms it holds.",
    ],
    facts: [
      ["5 of 8", "blind models where it found the right structure"],
      ["0", "false detections"],
    ],
  },
  {
    n: "02",
    name: "Compile a solver",
    title: "One engine per structure.",
    body: [
      "A compiler turns the problem's model into an engine made for that structure alone: its own data layout, pruning and symmetry breaking.",
      "We hand-built the FLC method for Williamson, good and best matrices. The compiler now matches it automatically.",
    ],
    facts: [
      ["30,000×+", "faster than Kissat and CP-SAT on Williamson and Legendre problems"],
      ["5,000×", "faster than the authors' own code, same machine (1,100× at worst)"],
      ["47,000×", "faster than published run times"],
    ],
  },
  {
    n: "03",
    name: "Run the loop",
    title: "Optimise, simulate, experiment, verify.",
    body: [
      "Agents choose the next bound to push, test it in simulation, run the compiled search at scale and send the result to verification. Failed checks feed the next round.",
      "The loop, not any single model, is what makes the output trustworthy.",
    ],
  },
  {
    n: "04",
    name: "Prove it",
    title: "Generation is cheap. Verification is the product.",
    body: [
      "Every result we accept is re-derived by multiple separately written verifiers, so a bug in one is unlikely to repeat in the others.",
      "Where possible, a result ships with a certificate anyone can check: an explicit matrix or a SAT certificate. Where one engine stands behind a claim, a case was closed internally, novelty is unsettled, or someone got there first, the log says so.",
    ],
  },
  {
    n: "05",
    name: "Keep everything",
    title: "Each discovery makes the next one cheaper.",
    body: [
      "Every verified result leaves behind a detector, a checker and a solver. The next problem starts from that library.",
      "That is generalisation: not memorising answers, but recognising known structure in new problems. And it runs on hardware a university lab already owns.",
    ],
    facts: [
      ["5 to 6 min", "to a verified solver for an unseen problem type"],
      ["8 GB", "GPU on one cloud machine, behind every result"],
    ],
  },
];

const ChapterSection: React.FC<{ c: Chapter }> = ({ c }) => (
  <LabSection id={c.name.toLowerCase().replace(/\s+/g, "-")} py={{ base: 16, md: 24 }} borderTopWidth="1px" borderColor="kk.line">
    <Box display="grid" gridTemplateColumns={{ base: "1fr", lg: "14rem 1fr" }} gap={{ base: 4, lg: 12 }}>
      <Text fontFamily="mono" fontSize="xs" letterSpacing="0.14em" textTransform="uppercase" color="kk.accent" pt={{ lg: 3 }}>
        {c.n} · {c.name}
      </Text>
      <Box>
        <Reveal>
          <LabHeading maxW="48rem">{c.title}</LabHeading>
        </Reveal>
        <Box mt={{ base: 6, md: 8 }} maxW="44rem">
          {c.body.map((p) => (
            <Reveal key={p}>
              <Lead mb={5}>{p}</Lead>
            </Reveal>
          ))}
        </Box>
        {c.facts && (
          <SimpleGrid columns={{ base: 1, sm: 2, xl: c.facts.length }} spacing={6} mt={{ base: 6, md: 10 }} maxW="56rem">
            {c.facts.map(([v, caption]) => (
              <Reveal key={v}>
                <Box borderTopWidth="1px" borderColor="kk.line" pt={5}>
                  <Text fontFamily="display" fontWeight="700" fontSize="clamp(2.2rem, 4.6vw, 3.6rem)" lineHeight="1" color="kk.fg">
                    {v}
                  </Text>
                  <Text mt={3} color="kk.muted" fontSize="sm" lineHeight="1.6">
                    {caption}
                  </Text>
                </Box>
              </Reveal>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  </LabSection>
);

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const Approach: NextPage = () => (
  <Box>
    <SEO
      title="Approach | KalKram"
      description="How KalKram makes discoveries: find a problem's structure, compile a solver for it, run an optimise, simulate, experiment, verify loop, and re-derive every result with multiple independent verifiers."
    />
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </Head>

    <PageHero
      title="How a discovery gets made."
      lede="Most search is spent where no answer can be. Our system works out what a problem is made of, builds a solver for exactly that, and keeps every tool it makes."
      image="cosmicCliffs"
      backdrop="state"
      position="50% 60%"
    />

    {CHAPTERS.slice(0, 3).map((c) => (
      <ChapterSection key={c.n} c={c} />
    ))}

    <Box px={{ base: 5, md: 8 }} py={{ base: 6, md: 10 }} borderTopWidth="1px" borderColor="kk.line">
      <Parallax distance={-24}>
        <HudFrame credit="The loop. Every verified result feeds the library every later run starts from.">
          <Box position="relative" h={{ base: "52svh", md: "74vh" }} minH="380px" overflow="hidden">
            <Box position="absolute" inset="0">
              <StateFlow size="100%" />
            </Box>
          </Box>
        </HudFrame>
      </Parallax>
    </Box>

    {CHAPTERS.slice(3).map((c) => (
      <ChapterSection key={c.n} c={c} />
    ))}

    <LabSection position="relative" overflow="hidden" borderTopWidth="1px" borderColor="kk.line">
      <Box aria-hidden="true" position="absolute" inset="0" opacity={0.3} pointerEvents="none">
        <WaveField size="100%" />
      </Box>
      <Reveal>
        <LabHeading>Frequently asked questions</LabHeading>
      </Reveal>
      <Box mt={{ base: 10, md: 14 }} maxW="56rem" position="relative">
        {faq.map((f) => (
          <Reveal key={f.q}>
            <Box borderTopWidth="1px" borderColor="kk.line" py={{ base: 6, md: 8 }}>
              <Text as="h3" fontFamily="display" fontWeight="700" textTransform="uppercase" letterSpacing="0.04em" fontSize={{ base: "lg", md: "xl" }}>
                {f.q}
              </Text>
              <Text mt={3} color="kk.muted" lineHeight="1.65">
                {f.a}
              </Text>
            </Box>
          </Reveal>
        ))}
        <Box borderTopWidth="1px" borderColor="kk.line" />
      </Box>
    </LabSection>

    <DashedRule />

    <LabSection>
      <Text
        fontFamily="display"
        textTransform="uppercase"
        fontWeight="700"
        fontSize="clamp(1.5rem, 3.6vw, 2.8rem)"
        lineHeight="1.1"
        letterSpacing="0.04em"
        maxW="52rem"
        sx={{ textWrap: "balance" }}
      >
        Every discovery should make the next one cheaper.
      </Text>
      <Box display="flex" gap={3} flexWrap="wrap" mt={10}>
        <Button as={NextLink} href="/research" variant="cta">
          See our research
        </Button>
        <Button as={NextLink} href="/careers" variant="line">
          Join us
        </Button>
      </Box>
    </LabSection>
  </Box>
);

export default Approach;
