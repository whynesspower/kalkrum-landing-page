import * as React from "react";
import Image from "next/image";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { Parallax } from "components/motion/parallax";
import { Reveal } from "components/motion/reveal";
import { SCIENCE_IMAGES } from "data/images";

const photo = SCIENCE_IMAGES.cosmicCliffs;

/** Full-bleed photo band with one statement over it. */
export const Band: React.FC = () => (
  <Box
    as="section"
    id="odds"
    position="relative"
    overflow="hidden"
    minH={{ base: "78svh", md: "92svh" }}
    display="flex"
    alignItems="flex-end"
    bg="kk.canvas"
  >
    <Parallax
      distance={-80}
      aria-hidden
      position="absolute"
      left="0"
      right="0"
      top="-14%"
      bottom="-14%"
      pointerEvents="none"
    >
      <Box position="absolute" inset="0">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "50% 45%" }}
        />
      </Box>
    </Parallax>
    <Box
      aria-hidden
      position="absolute"
      inset="0"
      pointerEvents="none"
      bgGradient="linear(to-t, rgba(5,6,10,1) 0%, rgba(5,6,10,0.78) 32%, rgba(5,6,10,0.25) 65%, rgba(5,6,10,0.55) 100%)"
    />
    <Container
      maxW="container.xl"
      px={{ base: 5, md: 8 }}
      position="relative"
      zIndex={1}
      pt={{ base: 28, md: 40 }}
      pb={{ base: 16, md: 20 }}
    >
      <Reveal>
        <Heading
          as="h2"
          fontFamily="display"
          textTransform="uppercase"
          fontWeight="700"
          fontSize="clamp(2.4rem, 8.4vw, 8.6rem)"
          lineHeight="0.94"
          letterSpacing="0.04em"
          maxW="1180px"
          sx={{ textWrap: "balance" }}
        >
          The odds are long. We think the bet is worth it.
        </Heading>
      </Reveal>
      <Text
        mt={{ base: 8, md: 10 }}
        textAlign="right"
        fontFamily="mono"
        fontSize="10px"
        letterSpacing="0.16em"
        textTransform="uppercase"
        color="kk.muted"
      >
        {photo.title} / {photo.credit}
      </Text>
    </Container>
  </Box>
);
