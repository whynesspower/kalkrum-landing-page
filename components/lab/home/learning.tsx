import * as React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import { LabHeading, LabSection } from "../primitives";
import { TimeAxis } from "../graphics/time-axis";
import { Glow } from "./shared";

export const Learning: React.FC = () => (
  <LabSection
    id="learning"
    decor={<Glow color="#5ef2c4" size={640} bottom="-20%" left="-200px" distance={-60} opacity={0.1} />}
  >
    <LabHeading mt="6" maxW="900px">
      Learning{" "}
      <Box as="span" fontStyle="normal" color="kk.accent">
        in time
      </Box>
    </LabHeading>
    <Reveal>
      <Box
        mt={{ base: 10, md: 16 }}
        position="relative"
        w="100%"
        h={{ base: "200px", md: "340px" }}
        borderWidth="1px"
        borderColor="kk.line"
        bg="kk.surface"
        overflow="hidden"
        sx={{ "& > svg": { width: "100%", height: "100%" } }}
      >
        <TimeAxis />
      </Box>
    </Reveal>
    <Text mt="8" color="kk.muted" fontSize={{ base: "lg", md: "xl" }} lineHeight="1.6" maxW="640px">
      A mind is the order in which it learned things, and it never stops adding to it.
    </Text>
  </LabSection>
);
