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
import { Join } from "components/lab/home/join";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KalKram",
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
      <Join />
    </Box>
  );
};

export default Home;
