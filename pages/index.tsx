import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import { useScrollDepth } from "hooks/use-scroll-depth";
import siteConfig from "data/config";
import { DashedRule } from "components/lab/primitives";
import { Hero } from "components/lab/home/hero";
import { Ticker } from "components/lab/home/ticker";
import { Vision } from "components/lab/home/vision";
import { ResearchAreas } from "components/lab/home/research-areas";
import { Method } from "components/lab/home/method";
import { ImageBand } from "components/lab/home/image-band";
import { Principles } from "components/lab/home/principles";
import { Gallery } from "components/lab/home/gallery";
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
      <Ticker />
      <Vision />
      <DashedRule />
      <ResearchAreas />
      <DashedRule />
      <Method />
      <ImageBand />
      <Principles />
      <DashedRule />
      <Gallery />
      <DashedRule />
      <Join />
    </Box>
  );
};

export default Home;
