import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import { HeroSection } from "components/landing/hero-section";
import { IntegrationsStrip } from "components/landing/integrations-strip";
import { HowItWorks } from "components/landing/how-it-works";
import { FeatureGrid } from "components/landing/feature-grid";
import { TrustSection } from "components/landing/trust-section";
import { FaqSection, FAQ_ITEMS } from "components/landing/faq-section";
import { FinalCta } from "components/landing/final-cta";
import { useScrollDepth } from "hooks/use-scroll-depth";
import siteConfig from "data/config";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "KalKram",
    applicationCategory: "BusinessApplication",
    description: siteConfig.seo.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  },
];

const Home: NextPage = () => {
  useScrollDepth();

  return (
    <Box>
      <SEO />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <HeroSection />
      <IntegrationsStrip />
      <HowItWorks />
      <FeatureGrid />
      <TrustSection />
      <FaqSection />
      <FinalCta />
    </Box>
  );
};

export default Home;
