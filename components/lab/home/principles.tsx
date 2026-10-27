import * as React from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import { LabHeading, LabSection } from "../primitives";

const stroke = {
  fill: "none",
  stroke: "#8ee3ff",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
};

const Glyph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden {...stroke}>
    {children}
  </svg>
);

const PRINCIPLES = [
  {
    title: "Safety and capability, together",
    body: "We treat them as one programme. Progress on one does not wait for the other.",
    icon: (
      <Glyph>
        <circle cx="15" cy="20" r="9" />
        <circle cx="25" cy="20" r="9" />
      </Glyph>
    ),
  },
  {
    title: "Open to scrutiny",
    body: "We state our claims in a form others can test, and we welcome the people who try to break them.",
    icon: (
      <Glyph>
        <circle cx="20" cy="20" r="4" />
        <path d="M3 20 C10 9 30 9 37 20 C30 31 10 31 3 20 Z" />
      </Glyph>
    ),
  },
  {
    title: "Long horizons",
    body: "The questions we care about take years. We pick work for where it leads.",
    icon: (
      <Glyph>
        <path d="M3 27 H37" />
        <path d="M9 27 A11 11 0 0 1 31 27" />
        <path d="M20 8 V13 M8 12 L11 15 M32 12 L29 15" />
      </Glyph>
    ),
  },
  {
    title: "Rigour before announcement",
    body: "We would rather publish late and be right than early and wrong.",
    icon: (
      <Glyph>
        <circle cx="20" cy="20" r="11" />
        <path d="M20 4 V12 M20 28 V36 M4 20 H12 M28 20 H36" />
      </Glyph>
    ),
  },
];

export const Principles: React.FC = () => (
  <LabSection id="principles">
    <LabHeading mt="6" maxW="760px">
      How we{" "}
      <Box as="span" fontStyle="normal" color="kk.accent">
        hold ourselves
      </Box>
    </LabHeading>
    <Grid
      mt={{ base: 12, md: 20 }}
      templateColumns={{ base: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
      borderTopWidth="1px"
      borderColor="kk.line"
    >
      {PRINCIPLES.map((p, i) => (
        <Reveal key={p.title} delay={i * 0.08}>
          <Box
            h="100%"
            py={{ base: 8, md: 10 }}
            pr={{ base: 0, md: 8 }}
            pl={{ base: 0, md: i % 2 === 1 ? 8 : 0, xl: i > 0 ? 8 : 0 }}
            borderBottomWidth={{ base: "1px", xl: 0 }}
            borderLeftWidth={{
              base: 0,
              md: i % 2 === 1 ? "1px" : 0,
              xl: i > 0 ? "1px" : 0,
            }}
            borderColor="kk.line"
          >
            {p.icon}
            <Text
              mt="6"
              fontFamily="display"
              textTransform="uppercase"
              letterSpacing="0.06em"
              fontWeight="700"
              fontSize={{ base: "2xl", md: "3xl" }}
              lineHeight="1.12"
            >
              {p.title}
            </Text>
            <Text mt="3" color="kk.muted" lineHeight="1.65">
              {p.body}
            </Text>
          </Box>
        </Reveal>
      ))}
    </Grid>
  </LabSection>
);
