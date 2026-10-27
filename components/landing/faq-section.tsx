import * as React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import { SectionHeading, SectionShell } from "./section-shell";
import { GlowBlob } from "./graphics/glow-blob";

export const FAQ_ITEMS = [
  {
    q: "What is KalKram?",
    a: "KalKram is an AI agent that reads your engineering tools and writes a 60-word update for each project and team, so leaders see where things stand without chasing people.",
  },
  {
    q: "Which tools does it connect to?",
    a: "Jira, Slack, Docs and GitHub. Those four are the focus for early access.",
  },
  {
    q: "Why 60 words?",
    a: "A short limit forces the summary to keep only what matters. When you want depth, you can ask follow-up questions.",
  },
  {
    q: "Who is it for?",
    a: "Engineering leaders, such as managers, directors and CTOs, who need a clear view of projects and risks across several teams.",
  },
  {
    q: "How do I get access?",
    a: "Join the waitlist with your work email. We will email you when your spot opens.",
  },
  {
    q: "How much will it cost?",
    a: "Pricing is not set yet. People on the waitlist hear first.",
  },
];

export const FaqSection: React.FC = () => (
  <SectionShell
    id="faq"
    decor={<GlowBlob color="violet" size={420} top="10%" right="-160px" distance={-60} />}
  >
    <SectionHeading eyebrow="FAQ" title="Questions, answered" />
    <Reveal>
      <Box maxW="760px" mx="auto">
        <Accordion allowToggle>
          {FAQ_ITEMS.map(({ q, a }) => (
            <AccordionItem key={q} borderColor="kk.line">
              <h3>
                <AccordionButton
                  py="5"
                  px="1"
                  fontSize="lg"
                  fontWeight="600"
                  textAlign="left"
                  _hover={{ bg: "transparent", color: "kk.accent" }}
                >
                  <Box as="span" flex="1">
                    {q}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h3>
              <AccordionPanel px="1" pb="6" color="kk.muted" lineHeight="1.7">
                {a}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Reveal>
  </SectionShell>
);
