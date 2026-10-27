import * as React from "react";
import { LogoWatermark } from "../logo-mark";
import Image from "next/image";
import { Box, Grid, Text } from "@chakra-ui/react";
import { Parallax } from "components/motion/parallax";
import { Reveal } from "components/motion/reveal";
import { SCIENCE_IMAGES } from "data/images";
import { LabSection, SectionLabel } from "../primitives";
import { HudFrame } from "../graphics/hud-frame";
import { WordReveal } from "../graphics/word-reveal";
import { Glow } from "./shared";

const MANIFESTO =
  "Every great leap in human life began as a question someone could not leave alone. We believe the next leap is an intelligence that can ask those questions with us, and sometimes before us. We are building it carefully, because a mind that can discover can also be wrong in ways that matter.";

const PILLARS = [
  {
    n: "01",
    title: "Discovery as the benchmark",
    body: "The real test of intelligence is finding something new and true.",
  },
  {
    n: "02",
    title: "Capability and safety, together",
    body: "We advance them in the same programme, and we study Mechanistic Interpretability alongside new architectures.",
  },
  {
    n: "03",
    title: "Evidence over announcement",
    body: "We publish what we can verify and say plainly what we do not yet know.",
  },
];

export const Vision: React.FC = () => {
  const img = SCIENCE_IMAGES.pillars;
  return (
    <LabSection
      id="vision"
      decor={
        <>
          <LogoWatermark size={560} top="30%" right="-180px" opacity={0.07} distance={-70} />
          <Glow color="#a18bff" size={700} top="-120px" left="-260px" distance={-80} opacity={0.16} />
          <Glow color="#5b7cff" size={560} bottom="0" right="-200px" distance={-50} opacity={0.14} />
        </>
      }
    >
      <SectionLabel index="01">Vision</SectionLabel>
      <WordReveal
        text={MANIFESTO}
        mt={{ base: 8, md: 12 }}
        maxW="1060px"
        fontFamily="display"
        fontWeight="500"
        fontSize="clamp(1.75rem, 4vw, 3.25rem)"
        lineHeight="1.2"
        letterSpacing="0"
      />

      <Grid
        mt={{ base: 16, md: 28 }}
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        gap={{ base: 12, lg: 20 }}
        alignItems="center"
      >
        <Box>
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <Grid
                templateColumns="56px 1fr"
                py="7"
                borderTopWidth="1px"
                borderColor="kk.line"
                borderBottomWidth={i === PILLARS.length - 1 ? "1px" : 0}
              >
                <Text
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="0.18em"
                  color="kk.accent"
                  pt="2"
                >
                  {p.n}
                </Text>
                <Box>
                  <Text
                    fontFamily="display"
                    textTransform="uppercase"
                    letterSpacing="0.06em"
                    fontWeight="700"
                    fontSize={{ base: "2xl", md: "3xl" }}
                    lineHeight="1.15"
                  >
                    {p.title}
                  </Text>
                  <Text mt="2" color="kk.muted" lineHeight="1.65">
                    {p.body}
                  </Text>
                </Box>
              </Grid>
            </Reveal>
          ))}
        </Box>

        <Reveal>
          <HudFrame label={`FIG. 01 / ${img.title}`} credit={img.credit}>
            <Box
              position="relative"
              overflow="hidden"
              aspectRatio="4 / 5"
              bg="kk.surface"
            >
              <Parallax
                distance={-36}
                position="absolute"
                top="-12%"
                bottom="-12%"
                left="0"
                right="0"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 62em) 45vw, 100vw"
                  quality={75}
                  style={{ objectFit: "cover" }}
                />
              </Parallax>
            </Box>
          </HudFrame>
        </Reveal>
      </Grid>
    </LabSection>
  );
};
