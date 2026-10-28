import {
  Box,
  BoxProps,
  Container,
  Flex,
  Heading,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa6";

import siteConfig from "data/config";
import { IMAGE_CREDIT_LINE } from "data/images";
import { LogoMark, LogoWatermark } from "components/lab/logo-mark";

export interface FooterProps extends BoxProps {}

const LINKS: Array<{ label: string; href: string }> = [
  ...siteConfig.nav,
  { label: "Privacy", href: siteConfig.privacyUrl },
];

const linkStyle = {
  fontFamily: "mono",
  fontSize: "sm",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "kk.muted",
  _hover: { color: "kk.accent", textDecoration: "none" },
} as const;

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
            <LogoMark size={48} spinSeconds={120} />
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
              Intelligence that learns from experience.
            </Heading>
          </Box>

          <Flex
            as="nav"
            aria-label="Footer"
            direction="column"
            align={{ base: "flex-start", lg: "flex-end" }}
            gap="4"
            flexShrink={0}
            minW="0"
          >
            <Flex
              as="ul"
              listStyleType="none"
              wrap="wrap"
              justify={{ base: "flex-start", lg: "flex-end" }}
              gap={{ base: 5, md: 7 }}
              maxW="36rem"
            >
              {LINKS.map(({ label, href }) => (
                <li key={href}>
                  <ChakraLink as={Link} href={href} {...linkStyle}>
                    {label}
                  </ChakraLink>
                </li>
              ))}
            </Flex>
            <Flex align="center" gap="4" minW="0" maxW="full">
              <ChakraLink
                href={`mailto:${siteConfig.footer.contactEmail}`}
                {...linkStyle}
                textTransform="none"
                letterSpacing="0.04em"
                color="kk.fg"
                sx={{ overflowWrap: "anywhere" }}
              >
                {siteConfig.footer.contactEmail}
              </ChakraLink>
              <ChakraLink
                href={siteConfig.footer.linkedin}
                isExternal
                aria-label="KalKram on LinkedIn"
                display="inline-flex"
                alignItems="center"
                color="kk.fg"
                flexShrink={0}
                _hover={{ color: "kk.accent" }}
              >
                <FaLinkedin aria-hidden size="22" />
              </ChakraLink>
            </Flex>
          </Flex>
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
          <Text
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="0.08em"
            color="kk.muted"
            maxW="52rem"
          >
            {IMAGE_CREDIT_LINE}
          </Text>
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
