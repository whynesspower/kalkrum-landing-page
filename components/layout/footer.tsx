import {
  Box,
  BoxProps,
  Container,
  Flex,
  Heading,
  Link as ChakraLink,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa6";

import siteConfig from "data/config";
import { LogoMark, LogoWatermark } from "components/lab/logo-mark";

export interface FooterProps extends BoxProps {}

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  linkedin?: boolean;
};

const COLUMNS: Array<{ title: string; links: FooterLink[] }> = [
  {
    title: "Lab",
    links: [
      { label: "Research", href: "/research" },
      { label: "Vision", href: "/about#vision" },
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Contact",
    links: [
      {
        label: siteConfig.footer.contactEmail,
        href: `mailto:${siteConfig.footer.contactEmail}`,
        external: true,
      },
      {
        label: "LinkedIn",
        href: siteConfig.footer.linkedin,
        external: true,
        linkedin: true,
      },
    ],
  },
  {
    title: "Legal",
    links: [{ label: "Privacy", href: siteConfig.privacyUrl }],
  },
];

export const Footer: React.FC<FooterProps> = (props) => {
  return (
    <Box
      as="footer"
      position="relative"
      overflow="hidden"
      borderTopWidth="1px"
      borderColor="kk.line"
      bg="kk.canvas"
      {...props}
    >
      <LogoWatermark size={640} top="-120px" right="-160px" opacity={0.07} distance={-50} />
      <Container
        maxW="container.xl"
        px={{ base: 5, md: 8 }}
        position="relative"
        zIndex={1}
        pt={{ base: 14, md: 20 }}
        pb={{ base: 8, md: 10 }}
      >
        <Flex
          direction={{ base: "column", lg: "row" }}
          justify="space-between"
          gap={{ base: 12, lg: 16 }}
        >
          <Box maxW="560px">
            <Heading
              as="p"
              mt="6"
              fontFamily="display"
              textTransform="uppercase"
              fontWeight="700"
              fontSize="clamp(1.6rem, 5vw, 3.75rem)"
              lineHeight="1.02"
              letterSpacing="0.05em"
              color="whiteAlpha.400"
            >
              Intelligence that keeps learning.
            </Heading>
          </Box>

          <SimpleGrid columns={{ base: 2, sm: 3 }} spacing={{ base: 10, md: 10, xl: 14 }}>
            {COLUMNS.map(({ title, links }) => (
              <Box key={title} minW="0">
                <Text
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="0.18em"
                  textTransform="uppercase"
                  color="kk.accent"
                  mb="4"
                >
                  {title}
                </Text>
                <Flex as="ul" direction="column" gap="3" listStyleType="none">
                  {links.map(({ label, href, external, linkedin }) => (
                    <li key={label}>
                      <ChakraLink
                        as={external && href.startsWith("http") ? undefined : Link}
                        href={href}
                        isExternal={external && href.startsWith("http")}
                        color={linkedin ? "kk.fg" : "kk.muted"}
                        fontSize={linkedin ? { base: "xl", md: "2xl" } : "md"}
                        fontWeight={linkedin ? "700" : undefined}
                        display={linkedin ? "inline-flex" : undefined}
                        alignItems={linkedin ? "center" : undefined}
                        gap={linkedin ? "3" : undefined}
                        overflowWrap={linkedin ? "normal" : "anywhere"}
                        whiteSpace={linkedin ? "nowrap" : { base: "normal", xl: "nowrap" }}
                        _hover={{ color: "kk.accent", textDecoration: "none" }}
                      >
                        {linkedin && <FaLinkedin aria-hidden size="1.1em" />}
                        {label}
                      </ChakraLink>
                    </li>
                  ))}
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </Flex>

        {/* Oversized wordmark with the mark */}
        <Flex
          aria-hidden
          mt={{ base: 14, md: 24 }}
          align="center"
          justify="center"
          gap={{ base: 3, md: 8 }}
          userSelect="none"
        >
          <LogoMark
            size={320}
            w={{ base: "38vw", md: "13vw" }}
            h={{ base: "38vw", md: "13vw" }}
            maxW="220px"
            maxH="220px"
            spinSeconds={180}
          />
          <Text
            as="span"
            display={{ base: "none", md: "inline" }}
            fontFamily="display"
            fontWeight="700"
            textTransform="uppercase"
            fontSize="clamp(2.4rem, 13.5vw, 13rem)"
            lineHeight="0.85"
            letterSpacing="0.04em"
            color="transparent"
            sx={{
              WebkitTextStroke: "1px rgba(255,255,255,0.28)",
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            KalKram
          </Text>
        </Flex>

        <Flex
          mt={{ base: 10, md: 16 }}
          pt="6"
          borderTopWidth="1px"
          borderTopStyle="dashed"
          borderColor="kk.line"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          gap="3"
        >
          <Box aria-hidden />
          <Text
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="0.08em"
            color="kk.muted"
            flexShrink="0"
          >
            © {new Date().getFullYear()} KalKram
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};
