import * as React from "react";
import NextLink from "next/link";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import siteConfig from "data/config";
import { LabSection, Lead } from "../primitives";
import { Glow } from "./shared";
import { LogoWatermark } from "../logo-mark";

export const Join: React.FC = () => (
  <LabSection
    id="join"
    pb={{ base: 24, md: 40 }}
    decor={
      <>
        <LogoWatermark size={620} bottom="-180px" left="-200px" opacity={0.1} distance={-40} />
        <Glow color="#38bdf8" size={760} top="-10%" left="20%" distance={-70} opacity={0.18} />
        <Glow color="#5ef2c4" size={520} bottom="-10%" right="-160px" distance={-40} opacity={0.16} />
      </>
    }
  >
    <Reveal>
      <Heading
        as="h2"
        mt="6"
        fontFamily="display"
        textTransform="uppercase"
        fontWeight="700"
        fontSize="clamp(1.9rem, 7vw, 6rem)"
        lineHeight="1"
        letterSpacing="0.05em"
        maxW="900px"
        sx={{ textWrap: "balance" }}
      >
        Build the next architecture of{" "}
        <Box
          as="span"
          fontStyle="normal"
          bgGradient="linear(to-r, #8ee3ff, #5ef2c4 55%, #ffd27a)"
          bgClip="text"
          pr="0.08em"
        >
          intelligence.
        </Box>
      </Heading>
    </Reveal>
    <Lead mt="8" maxW="560px">
      We hire research scientists, research engineers, and people who build
      infrastructure. Tell us what you want to work on.
    </Lead>
    <Flex mt="10" gap="3" wrap="wrap">
      <Button as={NextLink} href="/careers" variant="cta" size="lg" h="14" px="8">
        See open roles
      </Button>
      <Button
        as="a"
        href={`mailto:${siteConfig.footer.contactEmail}`}
        variant="line"
        size="lg"
        h="14"
        px="8"
      >
        Email us
      </Button>
    </Flex>
    <Text
      mt="6"
      fontFamily="mono"
      fontSize="xs"
      letterSpacing="0.14em"
      color="kk.muted"
      wordBreak="break-all"
    >
      {siteConfig.footer.contactEmail}
    </Text>
  </LabSection>
);
