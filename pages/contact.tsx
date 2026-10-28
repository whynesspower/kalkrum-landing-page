import * as React from "react";
import type { NextPage } from "next";
import NextLink from "next/link";
import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { FaLinkedin } from "react-icons/fa6";
import { SEO } from "components/seo/seo";
import siteConfig from "data/config";
import { Reveal } from "components/motion/reveal";
import { LabSection, Lead } from "components/lab/primitives";
import { PageHero } from "components/lab/page-hero";
import { DnaHelix } from "components/lab/graphics/dna-helix";
import { LogoWatermark } from "components/lab/logo-mark";

const rowText = {
  fontFamily: "display",
  textTransform: "uppercase" as const,
  fontWeight: "700",
  fontSize: "clamp(1.3rem, 3vw, 2.4rem)",
  lineHeight: "1.1",
  letterSpacing: "0.04em",
};

const Contact: NextPage = () => {
  const email = siteConfig.footer.contactEmail;
  const mail = `mailto:${email}?subject=${encodeURIComponent("Hello KalKram")}`;

  return (
    <Box>
      <SEO
        title="Contact | KalKram"
        description="Write to KalKram. One address, and a person reads every message."
      />

      <PageHero
        title="Write to us."
        lede="One address. A person reads every message."
        image="stephansQuintet"
        backdrop="memory"
        position="50% 35%"
      >
        <Button as="a" href={mail} variant="cta" mt={10}>
          {email}
        </Button>
      </PageHero>

      <LabSection position="relative" overflow="hidden">
        <LogoWatermark size={600} top="-100px" right="-160px" opacity={0.06} distance={-40} />
        <Box
          aria-hidden="true"
          display={{ base: "none", xl: "block" }}
          position="absolute"
          right="4%"
          top="50%"
          transform="translateY(-50%)"
          w="min(22vw, 360px)"
          opacity={0.4}
          pointerEvents="none"
        >
          <DnaHelix size="100%" />
        </Box>

        <Box maxW="56rem" position="relative">
          <Reveal>
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "flex-start", md: "center" }}
              gap={{ base: 3, md: 8 }}
              borderTopWidth="1px"
              borderColor="kk.line"
              py={{ base: 6, md: 8 }}
            >
              <Text {...rowText}>Email</Text>
              <Link href={mail} fontFamily="mono" fontSize={{ base: "md", md: "lg" }} letterSpacing="0.04em" color="kk.fg" _hover={{ color: "kk.accent" }} sx={{ overflowWrap: "anywhere" }}>
                {email}
              </Link>
            </Flex>
          </Reveal>
          <Reveal>
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "flex-start", md: "center" }}
              gap={{ base: 3, md: 8 }}
              borderTopWidth="1px"
              borderColor="kk.line"
              py={{ base: 6, md: 8 }}
            >
              <Text {...rowText}>LinkedIn</Text>
              <Link
                href={siteConfig.footer.linkedin}
                isExternal
                display="inline-flex"
                alignItems="center"
                gap="3"
                fontFamily="mono"
                fontSize={{ base: "md", md: "lg" }}
                letterSpacing="0.04em"
                color="kk.fg"
                _hover={{ color: "kk.accent" }}
              >
                <FaLinkedin aria-hidden size="22" />
                KalKram on LinkedIn
              </Link>
            </Flex>
          </Reveal>
          <Reveal>
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "flex-start", md: "center" }}
              gap={{ base: 3, md: 8 }}
              borderTopWidth="1px"
              borderBottomWidth="1px"
              borderColor="kk.line"
              py={{ base: 6, md: 8 }}
            >
              <Text {...rowText}>Joining</Text>
              <Link as={NextLink} href="/careers" fontFamily="mono" fontSize={{ base: "md", md: "lg" }} letterSpacing="0.04em" color="kk.fg" _hover={{ color: "kk.accent" }}>
                See the open roles
              </Link>
            </Flex>
          </Reveal>
        </Box>

        <Lead mt={{ base: 12, md: 16 }} maxW="40rem" position="relative">
          Tell us what you are building, or what you think we have wrong. Both are
          welcome.
        </Lead>
      </LabSection>
    </Box>
  );
};

export default Contact;
