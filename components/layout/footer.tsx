import {
  Box,
  BoxProps,
  Container,
  Flex,
  HStack,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa6";

import siteConfig from "data/config";

export interface FooterProps extends BoxProps {}

export const Footer: React.FC<FooterProps> = (props) => {
  return (
    <Box
      as="footer"
      borderTopWidth="1px"
      borderColor="kk.line"
      mt={{ base: 8, md: 16 }}
      {...props}
    >
      <Container maxW="container.xl" px={{ base: 5, md: 8 }} py={{ base: 10, md: 12 }}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          gap="8"
        >
          <Box maxW="360px">
            <Flex align="center" gap="3">
              <Image
                src="/static/screenshots/kalkram.png"
                alt=""
                width={36}
                height={32}
                style={{ height: "auto" }}
              />
              <Text fontSize="lg" fontWeight="700">
                KalKram
              </Text>
            </Flex>
            <Text fontSize="md" color="kk.muted" mt="3">
              Your whole engineering org, in 60 words.
            </Text>
          </Box>

          <HStack spacing="6" align="flex-start" fontSize="md">
            <ChakraLink as={Link} href={siteConfig.privacyUrl} color="kk.muted" _hover={{ color: "kk.fg" }}>
              Privacy
            </ChakraLink>
            <ChakraLink
              href={`mailto:${siteConfig.footer.contactEmail}`}
              color="kk.muted"
              _hover={{ color: "kk.fg" }}
            >
              Contact
            </ChakraLink>
            <ChakraLink
              href={siteConfig.footer.linkedin}
              isExternal
              aria-label="KalKram on LinkedIn"
              color="kk.muted"
              _hover={{ color: "kk.fg" }}
              display="inline-flex"
              alignItems="center"
              minH="24px"
            >
              <FaLinkedin size="18" aria-hidden />
            </ChakraLink>
          </HStack>
        </Flex>

        <Text fontSize="sm" color="kk.muted" mt="10">
          © {new Date().getFullYear()} KalKram. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};
