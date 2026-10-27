import * as React from "react";
import type { NextPage } from "next";
import { Box, Container, Heading, Link, Text } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import siteConfig from "data/config";

const SECTIONS = [
  {
    title: "What we collect",
    body: "We collect basic usage data about how visitors use this site, such as the pages viewed and how far down a page people scroll. We also keep any email you choose to send us.",
  },
  {
    title: "Why we collect it",
    body: "We use usage data to see which parts of the site are read and to improve them. We use your email only to reply to you.",
  },
  {
    title: "Where it is stored",
    body: "Usage data goes to our analytics provider, PostHog. Emails you send us stay in our mailbox. This site has no forms, accounts or sign-ups.",
  },
  {
    title: "Your choices",
    body: "You can ask us to delete any email we hold from you at any time by writing to the address below. Tell us which message to remove and we will confirm once it is gone.",
  },
];

const Privacy: NextPage = () => (
  <Box>
    <SEO
      title="Privacy | KalKram"
      description="How KalKram handles site usage data and the emails people send us."
    />
    <Container maxW="720px" px={{ base: 5, md: 8 }} pt={{ base: 32, md: 40 }} pb="20">
      <Text
        fontFamily="mono"
        fontSize="xs"
        letterSpacing="0.18em"
        textTransform="uppercase"
        color="kk.accent"
        mb="4"
      >
        Legal
      </Text>
      <Heading
        as="h1"
        fontFamily="display"
        textTransform="uppercase"
        fontWeight="700"
        fontSize="clamp(1.7rem, 5vw, 3.5rem)"
        lineHeight="1.05"
        letterSpacing="0.05em"
        mb="3"
      >
        Privacy
      </Heading>
      <Text fontFamily="mono" fontSize="xs" letterSpacing="0.08em" color="kk.muted" mb="12">
        Last updated 27 October 2026
      </Text>
      {SECTIONS.map(({ title, body }) => (
        <Box key={title} mb="9" pt="6" borderTopWidth="1px" borderTopStyle="dashed" borderColor="kk.line">
          <Heading
            as="h2"
            fontFamily="display"
            textTransform="uppercase"
            fontWeight="700"
            fontSize="2xl"
            letterSpacing="0.06em"
            mb="2"
          >
            {title}
          </Heading>
          <Text color="kk.muted" lineHeight="1.7">
            {body}
          </Text>
        </Box>
      ))}
      <Text color="kk.muted">
        Questions? Write to{" "}
        <Link
          href={`mailto:${siteConfig.footer.contactEmail}`}
          color="kk.accent"
          textDecoration="underline"
        >
          {siteConfig.footer.contactEmail}
        </Link>
        .
      </Text>
    </Container>
  </Box>
);

export default Privacy;
