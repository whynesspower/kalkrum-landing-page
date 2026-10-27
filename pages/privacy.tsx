import * as React from "react";
import type { NextPage } from "next";
import { Box, Container, Heading, Link, Text } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import siteConfig from "data/config";

const SECTIONS = [
  {
    title: "What we collect",
    body: "When you join the waitlist, we collect the email address you enter. We also collect basic usage data about how visitors use this site, such as pages viewed and how far they scroll.",
  },
  {
    title: "Why we collect it",
    body: "We use your email to tell you when early access opens and to reply if you write to us. We use usage data to improve the site.",
  },
  {
    title: "Where it is stored",
    body: "Waitlist emails are stored in a Google Form. Usage data goes to our analytics provider, PostHog.",
  },
  {
    title: "Your choices",
    body: "You can ask us to delete your email or stop contacting you at any time by writing to the address below.",
  },
];

const Privacy: NextPage = () => (
  <Box>
    <SEO
      title="Privacy | KalKram"
      description="How KalKram handles your email address and site usage data."
    />
    <Container maxW="720px" px={{ base: 5, md: 8 }} pt={{ base: 32, md: 40 }} pb="20">
      <Heading
        as="h1"
        fontSize="clamp(2rem, 5vw, 3rem)"
        letterSpacing="-0.04em"
        mb="3"
      >
        Privacy
      </Heading>
      <Text color="kk.muted" mb="12">
        Last updated 27 October 2026
      </Text>
      {SECTIONS.map(({ title, body }) => (
        <Box key={title} mb="9">
          <Heading as="h2" fontSize="xl" letterSpacing="-0.02em" mb="2">
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
