import * as React from "react";
import type { NextPage } from "next";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import siteConfig from "data/config";
import { Reveal } from "components/motion/reveal";
import { DashedRule, LabHeading, LabSection, Lead } from "components/lab/primitives";
import { Backdrop } from "components/lab/graphics/backdrop";
import { RoleList } from "components/lab/careers/roles";

const TRAITS = [
  { word: "Depth.", line: "You go past the first answer and stay with a problem until it gives." },
  { word: "Taste.", line: "You know which experiment is worth running and which is noise." },
  { word: "Honesty about uncertainty.", line: "You say how sure you are, and you say when you were wrong." },
  { word: "Care about what these systems become.", line: "You treat understanding and safety as part of the research." },
];

const STEPS = [
  "Write to us at the address below.",
  "Send your best work: a paper, a repo or a result.",
  "Answer two questions: what is the hardest problem you have solved, and what would you do about forgetting?",
];

const Careers: NextPage = () => {
  const email = siteConfig.footer.contactEmail;
  const mail = (subject: string) =>
    `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  return (
    <Box>
      <SEO
        title="Careers | KalKram"
        description="KalKram is a lab with one thesis: intelligence is learning in time. We are hiring researchers and engineers. The bar is high and the odds are long."
      />

      <Box
        as="section"
        position="relative"
        overflow="hidden"
        minH={{ base: "auto", md: "80vh" }}
        display="flex"
        alignItems="center"
        pt={{ base: 32, md: 40 }}
        pb={{ base: 20, md: 28 }}
      >
        <Box position="absolute" inset="0" aria-hidden>
          <Backdrop variant="tokens" />
        </Box>
        <Box position="relative" zIndex={1} maxW="container.xl" mx="auto" px={{ base: 5, md: 8 }}>
          <Heading
            as="h1"
            fontFamily="display"
            textTransform="uppercase"
            fontWeight="700"
            fontSize="clamp(2.2rem, 6.4vw, 5.6rem)"
            lineHeight="1.02"
            letterSpacing="0.04em"
            maxW="62rem"
            sx={{ textWrap: "balance" }}
          >
            Build the next architecture of intelligence.
          </Heading>
          <Lead mt={8} maxW="40rem">
            We are a lab with one thesis and little patience for anything else.
            If you want to work on learning that never stops, write to us.
          </Lead>
          <Button as="a" href={mail("Introduction to KalKram")} variant="cta" mt={10}>
            Write to us
          </Button>
        </Box>
      </Box>

      <LabSection>
        <Reveal>
          <LabHeading>What we look for.</LabHeading>
        </Reveal>
        <Box mt={{ base: 10, md: 16 }}>
          {TRAITS.map((t) => (
            <Reveal key={t.word}>
              <Box
                borderTopWidth="1px"
                borderColor="kk.line"
                py={{ base: 8, md: 10 }}
                display="grid"
                gridTemplateColumns={{ base: "1fr", lg: "3fr 2fr" }}
                gap={{ base: 3, lg: 12 }}
                alignItems="end"
              >
                <Heading
                  as="h3"
                  fontFamily="display"
                  textTransform="uppercase"
                  fontWeight="700"
                  fontSize="clamp(2rem, 5.6vw, 4.6rem)"
                  lineHeight="1.02"
                  letterSpacing="0.03em"
                  sx={{ overflowWrap: "anywhere", textWrap: "balance" }}
                >
                  {t.word}
                </Heading>
                <Text color="kk.muted" fontSize={{ base: "md", md: "lg" }} lineHeight="1.6">
                  {t.line}
                </Text>
              </Box>
            </Reveal>
          ))}
        </Box>
      </LabSection>

      <DashedRule />

      <LabSection id="roles">
        <Reveal>
          <LabHeading>Roles.</LabHeading>
        </Reveal>
        <Box mt={{ base: 10, md: 16 }}>
          <RoleList email={email} />
        </Box>
      </LabSection>

      <DashedRule />

      <LabSection>
        <Reveal>
          <LabHeading>How to apply.</LabHeading>
        </Reveal>
        <Box as="ol" mt={{ base: 10, md: 16 }} listStyleType="none" maxW="52rem">
          {STEPS.map((s, i) => (
            <Reveal key={s}>
              <Box
                as="li"
                display="grid"
                gridTemplateColumns={{ base: "2.5rem 1fr", md: "4rem 1fr" }}
                borderTopWidth="1px"
                borderColor="kk.line"
                py={7}
              >
                <Text fontFamily="mono" fontSize="sm" color="kk.accent" pt={1}>
                  {String(i + 1).padStart(2, "0")}
                </Text>
                <Text fontSize={{ base: "lg", md: "xl" }} lineHeight="1.55">
                  {s}
                </Text>
              </Box>
            </Reveal>
          ))}
        </Box>
        <Text mt={4} color="kk.muted">
          <Box as="a" href={mail("Introduction to KalKram")} textDecoration="underline" sx={{ overflowWrap: "anywhere" }}>
            {email}
          </Box>
        </Text>
      </LabSection>

      <Box
        as="section"
        position="relative"
        overflow="hidden"
        py={{ base: 24, md: 40 }}
        borderTopWidth="1px"
        borderColor="kk.line"
      >
        <Box position="absolute" inset="0" aria-hidden>
          <Backdrop variant="attention" intensity={0.8} />
        </Box>
        <Box position="relative" zIndex={1} maxW="container.xl" mx="auto" px={{ base: 5, md: 8 }}>
          <Heading
            as="h2"
            fontFamily="display"
            textTransform="uppercase"
            fontWeight="700"
            fontSize="clamp(2.2rem, 6.4vw, 5.6rem)"
            lineHeight="1.02"
            letterSpacing="0.04em"
            maxW="60rem"
            sx={{ textWrap: "balance" }}
          >
            The odds are long. Now is the time.
          </Heading>
          <Button as="a" href={mail("Introduction to KalKram")} variant="cta" mt={10}>
            Write to us
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Careers;
