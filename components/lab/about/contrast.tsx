import * as React from "react";
import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import { LabHeading } from "../primitives";

const ROWS = [
  ["Frozen snapshot", "Learning in time"],
  ["Forgets when updated", "Keeps what it knows"],
  ["Quadratic cost of the past", "Memory that scales with time"],
];

const cell = {
  fontFamily: "display",
  fontWeight: "700",
  textTransform: "uppercase" as const,
  letterSpacing: "0.04em",
  lineHeight: 1.05,
  fontSize: "clamp(1.4rem, 3.6vw, 3rem)",
};

export const Contrast: React.FC = () => (
  <Box>
    <Reveal>
      <LabHeading>Not a bigger snapshot</LabHeading>
    </Reveal>
    <Box mt={{ base: 10, md: 16 }}>
      {ROWS.map(([a, b], i) => (
        <Reveal key={a} delay={i * 0.05}>
          <Grid
            templateColumns="1fr 1fr"
            gap={{ base: 4, md: 12 }}
            py={{ base: 6, md: 9 }}
            borderTopWidth="1px"
            borderBottomWidth={i === ROWS.length - 1 ? "1px" : 0}
            borderColor="kk.line"
          >
            <Text {...cell} color="kk.muted" textDecoration="line-through" textDecorationColor="rgba(255,255,255,0.25)">
              {a}
            </Text>
            <Text {...cell} color="#8ee3ff">
              {b}
            </Text>
          </Grid>
        </Reveal>
      ))}
    </Box>
  </Box>
);
