import * as React from "react";
import { Box, Container, Heading, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import {
  domains,
  evidenceLabels,
  type EvidenceLevel,
  type Result,
} from "data/results";

const display = {
  fontFamily: "display",
  textTransform: "uppercase" as const,
  fontWeight: "700",
  letterSpacing: "0.04em",
};

const LEVEL_COLOR: Record<EvidenceLevel, string> = {
  certified: "kk.mint",
  single: "#ffd27a",
  internal: "kk.muted",
  candidate: "kk.accent",
};

/** Renders _{..} and ^{..} as sub- and superscripts. */
const renderScripts = (s: string, key: string) =>
  s.split(/(_\{[^}]*\}|\^\{[^}]*\})/).map((part, i) => {
    if (part.startsWith("_{")) return <sub key={`${key}-${i}`}>{part.slice(2, -1)}</sub>;
    if (part.startsWith("^{")) return <sup key={`${key}-${i}`}>{part.slice(2, -1)}</sup>;
    return <React.Fragment key={`${key}-${i}`}>{part}</React.Fragment>;
  });

/** Text between backticks is a mathematical object, set in mono. */
export const Inline: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split("`").map((part, i) =>
      i % 2 === 1 ? (
        <Box as="span" key={i} fontFamily="mono" color="kk.accent" whiteSpace="nowrap">
          {renderScripts(part, String(i))}
        </Box>
      ) : (
        <React.Fragment key={i}>{renderScripts(part, String(i))}</React.Fragment>
      )
    )}
  </>
);

const EvidenceTag: React.FC<{ level: EvidenceLevel; text?: string }> = ({ level, text }) => (
  <Box mt={3} display="flex" gap={3} flexWrap="wrap" alignItems="baseline">
    <Text
      as="span"
      fontFamily="mono"
      fontSize="xs"
      letterSpacing="0.12em"
      textTransform="uppercase"
      color={LEVEL_COLOR[level]}
    >
      {evidenceLabels[level].label}
    </Text>
    {text && (
      <Text as="span" fontSize="sm" color="kk.muted">
        <Inline text={text} />
      </Text>
    )}
  </Box>
);

const Row: React.FC<{ r: Result }> = ({ r }) => (
  <Box
    id={r.id}
    borderTopWidth="1px"
    borderColor="kk.line"
    py={{ base: 6, md: 8 }}
    display="grid"
    gridTemplateColumns={{ base: "1fr", md: "12rem 1fr" }}
    gap={{ base: 2, md: 10 }}
    scrollMarginTop="96px"
  >
    <Text fontFamily="mono" fontSize="xs" letterSpacing="0.12em" textTransform="uppercase" color="kk.muted" pt="1">
      {r.topic}
    </Text>
    <Box minW="0">
      <Text fontSize={{ base: "lg", md: "xl" }} lineHeight="1.5" color="kk.fg" sx={{ overflowWrap: "anywhere" }}>
        <Inline text={r.claim} />
      </Text>
      {r.context && (
        <Text mt={2} color="kk.muted" lineHeight="1.6" maxW="48rem">
          <Inline text={r.context} />
        </Text>
      )}
      {r.evidence && <EvidenceTag level={r.evidence.level} text={r.evidence.text} />}
      {r.refs && (
        <Box mt={3} display="flex" flexDirection="column" gap={1}>
          {r.refs.map((ref) =>
            ref.href ? (
              <Link key={ref.label} href={ref.href} isExternal fontSize="sm" color="kk.accent" sx={{ overflowWrap: "anywhere" }}>
                {ref.label}
              </Link>
            ) : (
              <Text key={ref.label} fontSize="sm" color="kk.muted">
                {ref.label}
              </Text>
            )
          )}
        </Box>
      )}
    </Box>
  </Box>
);

/** Every result, grouped by field, with what was known and how it was checked. */
export const ResultsLedger: React.FC = () => (
  <Box as="section" aria-label="Results" borderTopWidth="1px" borderColor="kk.line" py={{ base: 16, md: 28 }}>
    <Container maxW="container.xl" px={{ base: 5, md: 8 }}>
      <Reveal>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={12} spacingY={6} maxW="64rem">
          {(Object.keys(evidenceLabels) as EvidenceLevel[]).map((level) => (
            <Box key={level} borderTopWidth="1px" borderColor="kk.line" pt={4}>
              <Text fontFamily="mono" fontSize="xs" letterSpacing="0.12em" textTransform="uppercase" color={LEVEL_COLOR[level]}>
                {evidenceLabels[level].label}
              </Text>
              <Text mt={2} color="kk.muted" fontSize="sm" lineHeight="1.6">
                {evidenceLabels[level].meaning}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Reveal>

      {domains.map((d) => {
        const figure = d.results.find((r) => r.figure)?.figure;
        return (
          <Box key={d.id} id={d.id} mt={{ base: 20, md: 32 }} scrollMarginTop="96px">
            <Reveal>
              <Box
                display="grid"
                gridTemplateColumns={{ base: "1fr", lg: "1fr auto" }}
                gap={{ base: 6, lg: 16 }}
                alignItems="end"
              >
                <Box>
                  <Heading as="h2" {...display} fontSize="clamp(1.9rem, 4.4vw, 3.5rem)" lineHeight="1.04">
                    {d.title}
                  </Heading>
                  <Text mt={5} color="kk.muted" fontSize={{ base: "md", md: "lg" }} lineHeight="1.65" maxW="44rem">
                    {d.intro}
                  </Text>
                </Box>
                {figure && (
                  <Box textAlign={{ base: "left", lg: "right" }} maxW={{ lg: "22rem" }}>
                    <Text
                      {...display}
                      fontSize={figure.value.length > 10 ? "clamp(1.2rem, 2.4vw, 1.8rem)" : "clamp(2.6rem, 6vw, 5rem)"}
                      lineHeight="1"
                      color="kk.accent"
                      sx={{ overflowWrap: "anywhere" }}
                    >
                      {figure.value}
                    </Text>
                    <Text mt={2} fontFamily="mono" fontSize="xs" letterSpacing="0.1em" textTransform="uppercase" color="kk.muted">
                      <Inline text={figure.caption} />
                    </Text>
                  </Box>
                )}
              </Box>
            </Reveal>
            <Box mt={{ base: 8, md: 12 }} borderBottomWidth="1px" borderColor="kk.line">
              {d.results.map((r) => (
                <Row key={r.id} r={r} />
              ))}
            </Box>
          </Box>
        );
      })}
    </Container>
  </Box>
);
