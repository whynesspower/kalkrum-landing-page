import * as React from "react";
import NextLink from "next/link";
import { Box, Button, LinkBox, LinkOverlay, SimpleGrid, Text } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import { featuredIds, getResult } from "data/results";
import { LabHeading, LabSection } from "../primitives";
import { Inline } from "../research/results-ledger";

/** Six selected results from the research log, each linking to its entry. */
export const Featured: React.FC = () => {
  const featured = featuredIds.map(getResult);
  return (
    <LabSection id="selected-results" borderTopWidth="1px" borderColor="kk.line">
      <Reveal>
        <Text fontFamily="mono" fontSize="xs" letterSpacing="0.14em" textTransform="uppercase" color="kk.muted">
          From the research log
        </Text>
        <LabHeading mt={4} maxW="52rem">
          Questions that were open until it answered them.
        </LabHeading>
      </Reveal>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={{ base: 4, md: 5 }} mt={{ base: 10, md: 16 }}>
        {featured.map((r, i) => (
          <Reveal key={r.id} delay={i * 0.04}>
            <LinkBox
              h="100%"
              display="flex"
              flexDirection="column"
              p={{ base: 6, md: 7 }}
              borderWidth="1px"
              borderColor="kk.line"
              borderRadius="16px"
              bg="kk.surface"
              transition="border-color .2s ease, transform .2s ease"
              _hover={{ borderColor: "rgba(142,227,255,0.45)", transform: "translateY(-2px)" }}
            >
              <Text fontFamily="mono" fontSize="xs" letterSpacing="0.12em" textTransform="uppercase" color="kk.accent">
                {r.domain.title}
              </Text>
              <Text mt={4} fontSize={{ base: "lg", md: "xl" }} lineHeight="1.45" color="kk.fg" sx={{ overflowWrap: "anywhere" }}>
                <LinkOverlay as={NextLink} href={`/research#${r.id}`}>
                  <Inline text={r.claim} />
                </LinkOverlay>
              </Text>
              {r.context && (
                <Text mt={3} color="kk.muted" lineHeight="1.6" fontSize="sm">
                  <Inline text={r.context} />
                </Text>
              )}
            </LinkBox>
          </Reveal>
        ))}
      </SimpleGrid>
      <Box mt={{ base: 10, md: 14 }}>
        <Button as={NextLink} href="/research" variant="line">
          All results, with evidence
        </Button>
      </Box>
    </LabSection>
  );
};
