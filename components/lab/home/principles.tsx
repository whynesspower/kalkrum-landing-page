import * as React from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import { LabHeading, LabSection } from "../primitives";

const PRINCIPLES = [
  { word: "Thesis", body: "We hold one idea and test it hard." },
  { word: "Safety", body: "It lives inside the architecture, not beside it." },
  { word: "Evidence", body: "We show results before we make claims." },
  { word: "Horizon", body: "We pick work for where it leads in years." },
];

export const Principles: React.FC = () => (
  <LabSection id="principles">
    <LabHeading mt="6" maxW="760px">
      How we{" "}
      <Box as="span" fontStyle="normal" color="kk.accent">
        work
      </Box>
    </LabHeading>
    <Grid
      mt={{ base: 12, md: 20 }}
      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
      borderTopWidth="1px"
      borderColor="kk.line"
    >
      {PRINCIPLES.map((p, i) => (
        <Reveal key={p.word} delay={i * 0.08}>
          <Box
            h="100%"
            py={{ base: 8, md: 12 }}
            pl={{ base: 0, md: i % 2 === 1 ? 10 : 0 }}
            borderBottomWidth="1px"
            borderLeftWidth={{ base: 0, md: i % 2 === 1 ? "1px" : 0 }}
            borderColor="kk.line"
          >
            <Text
              fontFamily="display"
              textTransform="uppercase"
              letterSpacing="0.05em"
              fontWeight="700"
              fontSize="clamp(2.2rem, 6vw, 5rem)"
              lineHeight="1"
              bgGradient="linear(to-r, #8ee3ff, #5ef2c4 70%)"
              bgClip="text"
            >
              {p.word}
            </Text>
            <Text mt="4" color="kk.muted" fontSize="lg" lineHeight="1.6">
              {p.body}
            </Text>
          </Box>
        </Reveal>
      ))}
    </Grid>
  </LabSection>
);
