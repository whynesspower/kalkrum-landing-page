import * as React from "react";
import NextLink from "next/link";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import siteConfig from "data/config";
import { LabSection, Lead } from "../primitives";
import { LogoWatermark } from "../logo-mark";

export const Join: React.FC = () => (
  <LabSection
    id="join"
    pb={{ base: 24, md: 40 }}
    decor={
      <LogoWatermark size={620} bottom="-180px" left="-200px" opacity={0.1} distance={-40} />
    }
  >
    <Reveal>
      <Heading
        as="h2"
        fontFamily="display"
        textTransform="uppercase"
        fontWeight="700"
        fontSize="clamp(1.9rem, 5.2vw, 4.6rem)"
        lineHeight="1.02"
        letterSpacing="0.05em"
        maxW="960px"
        sx={{ textWrap: "balance" }}
      >
        The odds are long. We think the bet is worth it.
      </Heading>
      <Lead mt="8" maxW="600px">
        This will take a small number of people who are extremely good. If you
        are one of them, write to us.
      </Lead>
      <Flex mt="10" gap="3" wrap="wrap">
        <Button
          as="a"
          href={`mailto:${siteConfig.footer.contactEmail}`}
          variant="cta"
          size="lg"
          h="14"
          px="8"
        >
          Write to us
        </Button>
        <Button as={NextLink} href="/research" variant="line" size="lg" h="14" px="8">
          Research
        </Button>
      </Flex>
    </Reveal>
  </LabSection>
);
