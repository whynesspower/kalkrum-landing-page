import * as React from "react";
import type { NextPage } from "next";
import NextLink from "next/link";
import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import { LogoMark } from "components/lab/logo-mark";

const NotFound: NextPage = () => (
  <Box>
    <SEO title="Not found | KalKram" description="This page does not exist." noindex />
    <Container
      maxW="container.lg"
      px={{ base: 5, md: 8 }}
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      pt="28"
      pb="20"
    >
      <LogoMark size={96} spinSeconds={60} mb="8" />
      <Heading
        as="h1"
        fontFamily="display"
        textTransform="uppercase"
        fontWeight="700"
        fontSize="clamp(2rem, 7vw, 5rem)"
        lineHeight="1.02"
        letterSpacing="0.05em"
        maxW="14ch"
      >
        This page is not in the data.
      </Heading>
      <Text color="kk.muted" fontSize="xl" mt="6" maxW="46ch">
        The link may be old or mistyped. Start again from the home page or read about our research.
      </Text>
      <Flex mt="10" gap="3" wrap="wrap">
        <Button as={NextLink} href="/" variant="cta" h="48px" px="7">
          Back home
        </Button>
        <Button as={NextLink} href="/research" variant="line" h="48px" px="7">
          Our research
        </Button>
      </Flex>
    </Container>
  </Box>
);

export default NotFound;
