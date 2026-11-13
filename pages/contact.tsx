import * as React from "react";
import type { NextPage } from "next";
import NextLink from "next/link";
import { Box, Button, Flex, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { FaLinkedin } from "react-icons/fa6";
import { SEO } from "components/seo/seo";
import siteConfig from "data/config";
import { Reveal } from "components/motion/reveal";
import { LabSection, Lead } from "components/lab/primitives";
import { PageHero } from "components/lab/page-hero";
import { DnaHelix } from "components/lab/graphics/dna-helix";
import { LogoWatermark } from "components/lab/logo-mark";
import { IpStatement } from "components/lab/ip-statement";
import { founders } from "data/founders";

const CONTACT_ROWS = [
  {
    label: "Join us",
    title: "This will take a small number of people who are extremely good.",
    body: "In search, verification, mathematics and systems. Skip the CV: send something you built, proved or found.",
  },
  {
    label: "Investors and press",
    title: "We are happy to talk about the work.",
    body: "Every claim on this site links to its evidence. We would rather show a result than describe one.",
  },
];

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
        description="Contact KalKram: researchers and engineers who want to join, and investors and press."
      />

      <PageHero
        title="Write to us."
        lede="We are a small team and we read everything. Write to us, or message Yashraj Shukla on LinkedIn."
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
              <Text {...rowText}>Company</Text>
              <Box maxW={{ md: "30rem" }} textAlign={{ base: "left", md: "right" }}>
                <Text fontFamily="mono" fontSize={{ base: "md", md: "lg" }} letterSpacing="0.04em" color="kk.fg">
                  {siteConfig.company.productOf}
                </Text>
                <Text mt="2" fontSize="sm" color="kk.muted" lineHeight="1.6">
                  Our research was first published under the name {siteConfig.company.formerName}.
                </Text>
                <IpStatement mt="2" fontSize="sm" color="kk.muted" lineHeight="1.6" />
              </Box>
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

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }} mt={{ base: 12, md: 16 }} maxW="56rem" position="relative">
          {founders.map((f) => (
            <Link
              key={f.name}
              href={f.linkedin}
              isExternal
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={4}
              p={{ base: 5, md: 6 }}
              borderWidth="1px"
              borderColor="kk.line"
              borderRadius="16px"
              bg="kk.surface"
              _hover={{ borderColor: "rgba(142,227,255,0.45)", textDecoration: "none" }}
            >
              <Box>
                <Text fontFamily="display" fontWeight="700" textTransform="uppercase" letterSpacing="0.04em" fontSize="lg">
                  {f.name}
                </Text>
                <Text mt={1} fontFamily="mono" fontSize="xs" letterSpacing="0.12em" textTransform="uppercase" color="kk.muted">
                  {f.role} · LinkedIn
                </Text>
              </Box>
              <FaLinkedin aria-hidden size="22" />
            </Link>
          ))}
        </SimpleGrid>

        <Box mt={{ base: 16, md: 24 }} maxW="56rem" position="relative">
          {CONTACT_ROWS.map((r) => (
            <Reveal key={r.label}>
              <Box
                borderTopWidth="1px"
                borderColor="kk.line"
                py={{ base: 6, md: 8 }}
                display="grid"
                gridTemplateColumns={{ base: "1fr", md: "14rem 1fr" }}
                gap={{ base: 3, md: 10 }}
              >
                <Text fontFamily="mono" fontSize="xs" letterSpacing="0.14em" textTransform="uppercase" color="kk.accent" pt={{ md: 1 }}>
                  {r.label}
                </Text>
                <Box>
                  <Text {...rowText} fontSize="clamp(1.2rem, 2.4vw, 1.8rem)">
                    {r.title}
                  </Text>
                  <Text mt={3} color="kk.muted" lineHeight="1.65">
                    {r.body}
                  </Text>
                </Box>
              </Box>
            </Reveal>
          ))}
          <Box borderTopWidth="1px" borderColor="kk.line" />
        </Box>
      </LabSection>
    </Box>
  );
};

export default Contact;
