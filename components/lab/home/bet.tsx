import * as React from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import { Parallax } from "components/motion/parallax";
import { LabSection } from "../primitives";

const ROWS = [
  {
    n: "01",
    title: "Experience",
    body: "Agents that learn continually from one lifelong stream of actions, observations and grounded reward, and do not forget.",
  },
  {
    n: "02",
    title: "Memory",
    body: "Architectures whose cost grows with time instead of with the square of it, so a lifetime fits and recall stays exact.",
  },
  {
    n: "03",
    title: "Legibility",
    body: "Tools that read a mind while it changes, so a system that keeps learning stays understandable.",
  },
];

export const Bet: React.FC = () => (
  <LabSection id="bet" pt={{ base: 8, md: 12 }} pb={{ base: 20, md: 32 }}>
    <Box borderTopWidth="1px" borderColor="kk.line">
      {ROWS.map(({ n, title, body }, i) => (
        <Reveal key={n} delay={i * 0.08}>
          <Grid
            templateColumns={{ base: "1fr", md: "minmax(0, 5fr) minmax(0, 7fr)" }}
            alignItems="center"
            columnGap={{ base: 0, md: 12 }}
            rowGap={{ base: 2, md: 0 }}
            py={{ base: 10, md: 14 }}
            borderBottomWidth="1px"
            borderColor="kk.line"
          >
            <Parallax distance={i % 2 === 0 ? 14 : -14}>
              <Text
                as="span"
                display="block"
                fontFamily="display"
                fontWeight="700"
                lineHeight="0.85"
                fontSize="clamp(5.5rem, 15vw, 14rem)"
                letterSpacing="-0.02em"
                color="transparent"
                sx={{
                  WebkitTextStroke: "1.5px rgba(142,227,255,0.55)",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {n}
              </Text>
            </Parallax>
            <Box>
              <Text
                as="h3"
                fontFamily="display"
                textTransform="uppercase"
                fontWeight="700"
                fontSize={{ base: "2xl", md: "4xl" }}
                letterSpacing="0.06em"
                lineHeight="1.1"
              >
                {title}
              </Text>
              <Text
                mt="4"
                color="kk.muted"
                fontSize={{ base: "md", md: "xl" }}
                lineHeight="1.6"
                maxW="38rem"
              >
                {body}
              </Text>
            </Box>
          </Grid>
        </Reveal>
      ))}
    </Box>
  </LabSection>
);
