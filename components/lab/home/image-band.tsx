import * as React from "react";
import Image from "next/image";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { Parallax } from "components/motion/parallax";
import { Reveal } from "components/motion/reveal";
import { SCIENCE_IMAGES } from "data/images";

export const ImageBand: React.FC = () => {
  const img = SCIENCE_IMAGES.stephansQuintet;
  return (
    <Box
      as="section"
      position="relative"
      overflow="clip"
      minH={{ base: "78svh", md: "96svh" }}
      display="flex"
      alignItems="center"
      bg="kk.canvas"
    >
      <Parallax
        aria-hidden
        distance={-130}
        position="absolute"
        top="-18%"
        bottom="-18%"
        left="0"
        right="0"
      >
        <Image
          src={img.src}
          alt=""
          fill
          sizes="100vw"
          quality={70}
          style={{ objectFit: "cover" }}
        />
      </Parallax>
      <Box
        aria-hidden
        position="absolute"
        inset="0"
        bgGradient="linear(to-b, #05060a 0%, rgba(5,6,10,0.35) 22%, rgba(5,6,10,0.5) 70%, #05060a 100%)"
      />
      <Container
        maxW="container.xl"
        px={{ base: 5, md: 8 }}
        position="relative"
        zIndex={1}
        py={{ base: 20, md: 32 }}
      >
        <Reveal>
          <Heading
            as="h2"
            fontFamily="display"
            textTransform="uppercase"
            fontWeight="700"
            fontSize="clamp(1.7rem, 5.5vw, 5rem)"
            lineHeight="1.02"
            letterSpacing="0.05em"
            maxW="960px"
            sx={{ textWrap: "balance" }}
          >
            The universe is the oldest laboratory.{" "}
            <Box as="span" fontStyle="normal" color="kk.accent">
              We are learning to read it.
            </Box>
          </Heading>
        </Reveal>
      </Container>
      <Text
        position="absolute"
        left={{ base: 5, md: 8 }}
        right={{ base: 5, md: 8 }}
        bottom="5"
        zIndex={1}
        fontFamily="mono"
        fontSize="2xs"
        letterSpacing="0.16em"
        textTransform="uppercase"
        color="kk.muted"
      >
        {img.title} / {img.credit}
      </Text>
    </Box>
  );
};
