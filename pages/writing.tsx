import * as React from "react";
import type { NextPage } from "next";
import { Box, Button, Text } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import siteConfig from "data/config";
import { Reveal } from "components/motion/reveal";
import { Parallax } from "components/motion/parallax";
import { DashedRule, LabHeading, LabSection, Lead } from "components/lab/primitives";
import { PageHero, StatementRows } from "components/lab/page-hero";
import { HudFrame } from "components/lab/graphics/hud-frame";
import { HypothesisGraph } from "components/lab/graphics/hypothesis-graph";
import { LogoWatermark } from "components/lab/logo-mark";

const WILL_PUBLISH = [
  "Results we can reproduce.",
  "Negative results that changed our plan.",
  "The tools we use to read a mind while it changes.",
];

const Writing: NextPage = () => {
  const email = siteConfig.footer.contactEmail;
  const mail = `mailto:${email}?subject=${encodeURIComponent("Early access to KalKram results")}`;

  return (
    <Box>
      <SEO
        title="Writing | KalKram"
        description="Notes, papers and results from KalKram, published as we can verify them."
      />

      <PageHero
        title="Writing."
        lede="Notes, papers and results, as we can verify them."
        image="deepField"
        backdrop="tokens"
        position="50% 40%"
      />

      <LabSection position="relative" overflow="hidden">
        <LogoWatermark size={560} top="-80px" right="-140px" opacity={0.06} distance={-40} />
        <Box maxW="52rem" position="relative">
          <Reveal>
            <Text
              fontFamily="display"
              textTransform="uppercase"
              fontWeight="700"
              fontSize="clamp(1.7rem, 4.2vw, 3.6rem)"
              lineHeight="1.08"
              letterSpacing="0.04em"
              sx={{ textWrap: "balance" }}
            >
              Nothing is published yet.
            </Text>
          </Reveal>
          <Reveal>
            <Lead mt={8} maxW="40rem">
              Our first results go here when we can stand behind them. When we are
              wrong, the correction goes here too.
            </Lead>
          </Reveal>
        </Box>
      </LabSection>

      <Box px={{ base: 5, md: 8 }} py={{ base: 6, md: 10 }} borderTopWidth="1px" borderColor="kk.line">
        <Parallax distance={28}>
          <HudFrame credit="A graph of hypotheses: what we believe, what it rests on, and what would break it.">
            <Box position="relative" h={{ base: "52svh", md: "74vh" }} minH="380px" overflow="hidden" display="flex" alignItems="center" justifyContent="center">
              <Box w="100%" maxW="900px" px={{ base: 4, md: 12 }}>
                <HypothesisGraph size="100%" />
              </Box>
            </Box>
          </HudFrame>
        </Parallax>
      </Box>

      <LabSection>
        <Reveal>
          <LabHeading>What will appear here</LabHeading>
        </Reveal>
        <Box mt={{ base: 10, md: 16 }}>
          <Reveal>
            <StatementRows lines={WILL_PUBLISH} />
          </Reveal>
        </Box>
      </LabSection>

      <DashedRule />

      <LabSection>
        <Lead maxW="40rem">
          If you want to read our work before it is public, write to us and say
          what you are working on.
        </Lead>
        <Button as="a" href={mail} variant="cta" mt={10}>
          Write to us
        </Button>
      </LabSection>
    </Box>
  );
};

export default Writing;
