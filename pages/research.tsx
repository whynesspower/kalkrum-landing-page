import * as React from "react";
import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import { Closing, ImageBand, ResearchHero } from "components/lab/research/blocks";
import { ResultsLedger } from "components/lab/research/results-ledger";

const Research: NextPage = () => (
  <Box>
    <SEO
      title="Research | KalKram"
      description="Verified results from KalKram: no cyclic (465, 145, 45) difference set, exact circuit distance 16 for IBM's two-gross code, CW(120, 36), new OEIS terms, and more."
    />
    <ResearchHero />

    <ResultsLedger />

    <ImageBand image="stephansQuintet" />

    <Closing />
  </Box>
);

export default Research;
