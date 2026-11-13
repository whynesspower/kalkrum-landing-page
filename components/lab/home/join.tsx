import * as React from "react";
import NextLink from "next/link";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import { Parallax } from "components/motion/parallax";
import { LabSection, Lead } from "../primitives";
import { LogoWatermark } from "../logo-mark";
import { DnaHelix } from "../graphics/dna-helix";

export const Join: React.FC = () => (
  <LabSection
    id="join"
    pt={{ base: 20, md: 28 }}
    pb={{ base: 24, md: 40 }}
    decor={
      <>
        <LogoWatermark size={620} bottom="-180px" left="-200px" opacity={0.1} distance={-40} />
        <Parallax
          distance={-24}
          aria-hidden
          position="absolute"
          right={{ base: "-30%", md: "2%" }}
          top="50%"
          w={{ base: "320px", md: "min(34vw, 460px)" }}
          mt={{ base: "-160px", md: "min(-17vw, -230px)" }}
          opacity={0.32}
          pointerEvents="none"
        >
          <DnaHelix />
        </Parallax>
      </>
    }
  >
    <Reveal>
      <Box maxW="640px">
        <Lead fontSize={{ base: "xl", md: "2xl" }} color="kk.fg">
          This will take a small number of people who are extremely good.
        </Lead>
        <Lead mt="4">
          In search, verification, mathematics and systems. Skip the CV: send
          something you built, proved or found.
        </Lead>
        <Flex mt="10" gap="3" wrap="wrap">
          <Button as={NextLink} href="/careers" variant="cta" size="lg" h="14" px="8">
            Join us
          </Button>
          <Button as={NextLink} href="/vision" variant="line" size="lg" h="14" px="8">
            Read the vision
          </Button>
        </Flex>
      </Box>
    </Reveal>
  </LabSection>
);
