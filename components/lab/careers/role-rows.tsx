import * as React from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";

export type Role = { title: string; line: string };

export const ROLES: Role[] = [
  {
    title: "Research Scientist, Learning from Experience",
    line: "Build agents that improve from long streams of interaction, and measure what they forget.",
  },
  {
    title: "Research Scientist, Memory and Architecture",
    line: "Design and train sequence models whose memory scales with time, and find out where they break.",
  },
  {
    title: "Research Engineer, Training Systems",
    line: "Make the experiments cheap to repeat: the training stack, the environments, the evaluation harness.",
  },
];

const mailto = (email: string, subject: string) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}`;

/** Three role rows: title, one sentence, and an Apply link with a prefilled subject. */
export const RoleRows: React.FC<{ email: string }> = ({ email }) => (
  <Box borderBottomWidth="1px" borderColor="kk.line">
    {ROLES.map((r) => (
      <Reveal key={r.title}>
        <Box
          borderTopWidth="1px"
          borderColor="kk.line"
          py={{ base: 8, md: 10 }}
          display="grid"
          gridTemplateColumns={{ base: "1fr", lg: "1fr auto" }}
          gap={{ base: 6, lg: 12 }}
          alignItems="center"
        >
          <Box minW="0">
            <Heading
              as="h3"
              fontFamily="display"
              textTransform="uppercase"
              fontWeight="700"
              fontSize={{ base: "xl", md: "2xl" }}
              lineHeight="1.15"
              letterSpacing="0.04em"
              sx={{ overflowWrap: "anywhere", textWrap: "balance" }}
            >
              {r.title}
            </Heading>
            <Text mt={3} color="kk.muted" lineHeight="1.6" maxW="42rem">
              {r.line}
            </Text>
          </Box>
          <Button
            as="a"
            href={mailto(email, `Application: ${r.title}`)}
            variant="line"
            justifySelf={{ base: "start", lg: "end" }}
          >
            Apply
          </Button>
        </Box>
      </Reveal>
    ))}
  </Box>
);
