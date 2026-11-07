import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import { useScrollDepth } from "hooks/use-scroll-depth";
import siteConfig from "data/config";
import { Hero } from "components/lab/home/hero";
import { Manifesto } from "components/lab/home/manifesto";
import { Bet } from "components/lab/home/bet";
import { Band } from "components/lab/home/band";
import { Join } from "components/lab/home/join";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

// The legal entity is Alaka Labs LLP; KalKram is its brand.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KalKram",
  legalName: siteConfig.company.legalName,
  alternateName: siteConfig.company.legalName,
  brand: { "@type": "Brand", name: "KalKram" },
  parentOrganization: {
    "@type": "Organization",
    name: siteConfig.company.legalName,
  },
  email: siteConfig.footer.contactEmail,
  sameAs: [siteConfig.footer.linkedin],
  ...(siteUrl ? { url: siteUrl } : {}),
  description: siteConfig.seo.description,
};

const Home: NextPage = () => {
  useScrollDepth();

  return (
    <Box>
      <SEO
        title={siteConfig.seo.title}
        description={siteConfig.seo.description}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Hero />
      <Manifesto />
      <Bet />
      <Band />
      <Join />
    </Box>
  );
};

export default Home;
