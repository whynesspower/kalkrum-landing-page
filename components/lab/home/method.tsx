import * as React from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import { useReducedMotion, useScroll, motion } from "framer-motion";
import { Reveal } from "components/motion/reveal";
import { LabHeading, LabSection, Lead, SectionLabel } from "../primitives";
import { LoopDiagram } from "../graphics/loop-diagram";
import { Glow } from "./shared";

const STAGES = [
  {
    name: "Question",
    body: "Start with something we do not yet understand, stated so it can be tested.",
  },
  {
    name: "Hypothesis",
    body: "Propose an explanation that could turn out to be wrong.",
  },
  {
    name: "Experiment",
    body: "Design a test that tells the explanation apart from its rivals, in simulation first and then in the lab.",
  },
  {
    name: "Evidence",
    body: "Record what happened, including the results that disagree with us.",
  },
  {
    name: "Understanding",
    body: "Fold the result into a world model we can inspect, and keep learning from it without catastrophic forgetting.",
  },
];

export const Method: React.FC = () => {
  const listRef = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });

  return (
    <LabSection
      id="method"
      decor={
        <Glow color="#a18bff" size={640} top="10%" left="-280px" distance={-60} opacity={0.12} />
      }
    >
      <SectionLabel index="03">Method</SectionLabel>
      <LabHeading mt="6" maxW="820px">
        How discovery works{" "}
        <Box as="span" fontStyle="normal" color="kk.accent">
          here
        </Box>
      </LabHeading>
      <Lead mt="6" maxW="620px">
        Science is a loop, not a line. We build systems that run the whole loop,
        and we check each turn of it.
      </Lead>

      <Grid
        mt={{ base: 14, md: 24 }}
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        gap={{ base: 14, lg: 20 }}
        alignItems="start"
      >
        <Box
          position={{ lg: "sticky" }}
          top={{ lg: "120px" }}
          maxW="520px"
          w="100%"
          mx="auto"
        >
          <LoopDiagram />
        </Box>

        <Box ref={listRef} position="relative" pl={{ base: 9, md: 12 }}>
          {/* Scroll-drawn line */}
          <Box
            aria-hidden
            position="absolute"
            left="6px"
            top="12px"
            bottom="12px"
            w="2px"
          >
            <svg
              width="2"
              height="100%"
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
              style={{ display: "block", overflow: "visible" }}
            >
              <path
                d="M1 0 V100"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d="M1 0 V100"
                stroke="#8ee3ff"
                strokeWidth="2"
                fill="none"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: reduce ? 1 : scrollYProgress }}
              />
            </svg>
          </Box>

          {STAGES.map((s, i) => (
            <Reveal key={s.name}>
              <Box
                position="relative"
                pb={i === STAGES.length - 1 ? 0 : { base: 10, md: 14 }}
              >
                <Box
                  aria-hidden
                  position="absolute"
                  left={{ base: "-36px", md: "-48px" }}
                  top="9px"
                  w="14px"
                  h="14px"
                  borderRadius="full"
                  bg="kk.canvas"
                  borderWidth="2px"
                  borderColor="kk.accent"
                />
                <Text
                  fontFamily="mono"
                  fontSize="xs"
                  letterSpacing="0.18em"
                  color="kk.accent"
                >
                  STEP 0{i + 1}
                </Text>
                <Text
                  mt="2"
                  fontFamily="display"
                  textTransform="uppercase"
                  letterSpacing="0.06em"
                  fontWeight="700"
                  fontSize={{ base: "3xl", md: "4xl" }}
                  lineHeight="1.1"
                >
                  {s.name}
                </Text>
                <Text mt="3" color="kk.muted" lineHeight="1.65" maxW="460px">
                  {s.body}
                </Text>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Grid>
    </LabSection>
  );
};
