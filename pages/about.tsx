import * as React from "react";
import type { NextPage } from "next";
import { Box, Flex, Text } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import siteConfig from "data/config";
import { IMAGE_CREDIT_LINE } from "data/images";
import { Reveal } from "components/motion/reveal";
import { DashedRule, LabSection, SectionLabel } from "components/lab/primitives";
import { ArrowLink } from "components/lab/pages/arrow-link";
import { LogoMark } from "components/lab/logo-mark";
import { DnaHelix } from "components/lab/graphics/dna-helix";
import { AboutHero } from "components/lab/about/about-hero";
import { VisionBlock } from "components/lab/about/vision-block";
import { PrinciplesWords } from "components/lab/about/principles-words";

const About: NextPage = () => {
  const email = siteConfig.footer.contactEmail;

  return (
    <Box>
      <SEO
        title="About | KalKram"
        description="KalKram is a research lab building scientific superintelligence in software."
      />
      <AboutHero />

      <VisionBlock id="vision" />

      <LabSection>
        <Reveal>
          <SectionLabel index="02">Principles</SectionLabel>
        </Reveal>
        <Box mt={{ base: 10, md: 16 }}>
          <PrinciplesWords />
        </Box>
      </LabSection>

      <DashedRule />

      <LabSection
        py={{ base: 16, md: 24 }}
        decor={
          <Box
            position="absolute"
            top="50%"
            right={{ base: "-80px", md: "4%" }}
            w={{ base: "160px", md: "220px" }}
            transform="translateY(-50%)"
            opacity={0.3}
            pointerEvents="none"
            aria-hidden="true"
          >
            <DnaHelix />
          </Box>
        }
      >
        <Reveal>
          <Flex align="center" gap={{ base: 4, md: 6 }}>
            <LogoMark size={72} />
            <Text
              fontFamily="display"
              textTransform="uppercase"
              letterSpacing="0.05em"
              fontSize={{ base: "lg", md: "2xl" }}
            >
              KalKram (कालक्रम): chronology
            </Text>
          </Flex>
        </Reveal>
      </LabSection>

      <DashedRule />

      <LabSection py={{ base: 16, md: 24 }}>
        <Reveal>
          <SectionLabel index="03">Contact</SectionLabel>
          <Box mt={6}>
            <ArrowLink href={`mailto:${email}`}>{email}</ArrowLink>
          </Box>
          <Text mt={10} fontFamily="mono" fontSize="10px" color="kk.muted">
            {IMAGE_CREDIT_LINE}
          </Text>
        </Reveal>
      </LabSection>
    </Box>
  );
};

export default About;
