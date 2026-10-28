import * as React from "react";
import type { NextPage } from "next";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import siteConfig from "data/config";
import { Reveal } from "components/motion/reveal";
import { DashedRule, LabSection } from "components/lab/primitives";
import { LogoMark } from "components/lab/logo-mark";
import { Backdrop } from "components/lab/graphics/backdrop";
import { AboutHero } from "components/lab/about/about-hero";
import { Vision } from "components/lab/about/vision";
import { Contrast } from "components/lab/about/contrast";
import { PrinciplesWords } from "components/lab/about/principles-words";

const About: NextPage = () => {
  const email = siteConfig.footer.contactEmail;

  return (
    <Box>
      <SEO
        title="About | KalKram"
        description="KalKram builds minds that keep learning: systems that learn from experience, remember it, and plan over long horizons."
      />
      <AboutHero />
      <Vision id="vision" />
      <DashedRule />
      <LabSection>
        <Contrast />
      </LabSection>
      <DashedRule />
      <LabSection>
        <PrinciplesWords />
      </LabSection>
      <DashedRule />
      <LabSection py={{ base: 16, md: 24 }}>
        <Reveal>
          <Flex align="center" gap={{ base: 4, md: 6 }}>
            <LogoMark size={72} />
            <Text
              fontFamily="display"
              textTransform="uppercase"
              letterSpacing="0.05em"
              fontSize={{ base: "md", md: "2xl" }}
              lineHeight="1.3"
            >
              KalKram (कालक्रम): chronology, the order in which things unfold.
            </Text>
          </Flex>
        </Reveal>
      </LabSection>
      <Box
        as="section"
        position="relative"
        overflow="hidden"
        py={{ base: 28, md: 44 }}
        borderTopWidth="1px"
        borderBottomWidth="1px"
        borderColor="kk.line"
      >
        <Box position="absolute" inset="0" aria-hidden="true">
          <Backdrop variant="contours" />
          <Box position="absolute" inset="0" bg="rgba(5,6,10,0.45)" />
        </Box>
        <LabSection py={0}>
          <Reveal>
            <Text
              fontFamily="display"
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="0.03em"
              lineHeight="1.05"
              fontSize="clamp(2rem, 6vw, 5.5rem)"
              maxW="18ch"
            >
              Learning does not end at deployment.
            </Text>
          </Reveal>
        </LabSection>
      </Box>
      <LabSection py={{ base: 16, md: 24 }}>
        <Reveal>
          <Button as="a" href={`mailto:${email}`} variant="line">
            {email}
          </Button>
        </Reveal>
      </LabSection>
    </Box>
  );
};

export default About;
