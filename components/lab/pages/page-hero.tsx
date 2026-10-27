import * as React from "react";
import Image from "next/image";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { useReducedMotion } from "framer-motion";
import { MotionBox } from "components/motion/box";
import { Parallax } from "components/motion/parallax";
import { duration, ease } from "lib/motion";
import { SCIENCE_IMAGES } from "data/images";
import { NetworkField } from "../graphics/network-field";
import { Lead } from "../primitives";
import { LogoWatermark } from "../logo-mark";

export interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  /** Key from SCIENCE_IMAGES. When omitted, a particle field is drawn. */
  image?: keyof typeof SCIENCE_IMAGES;
  /** Optional graphic shown on the right on wide screens. */
  graphic?: React.ReactNode;
}

/** Top-of-page hero shared by the inner pages. Clears the floating header. */
export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  description,
  image,
  graphic,
}) => {
  const reduce = useReducedMotion();
  const photo = image ? SCIENCE_IMAGES[image] : undefined;

  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: duration.slow * 1.6, ease, delay },
  });

  return (
    <Box
      as="header"
      position="relative"
      overflow="hidden"
      pt={{ base: "148px", md: "190px" }}
      pb={{ base: 16, md: 28 }}
      borderBottomWidth="1px"
      borderColor="kk.line"
    >
      <Box position="absolute" inset="0" aria-hidden="true" zIndex={0}>
        {photo ? (
          <Parallax
            distance={-60}
            position="absolute"
            top="-60px"
            bottom="-60px"
            left="0"
            right="0"
          >
            <Image
              src={photo.src}
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover", opacity: 0.32 }}
            />
          </Parallax>
        ) : (
          <Box position="absolute" inset="0" opacity={0.7}>
            <NetworkField density={0.8} />
          </Box>
        )}
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-b, rgba(5,6,10,0.55) 0%, rgba(5,6,10,0.35) 45%, #05060a 100%)"
        />
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-r, rgba(5,6,10,0.85) 0%, rgba(5,6,10,0) 70%)"
        />
        <LogoWatermark
          size={520}
          top="60px"
          right={{ base: "-220px", md: "-60px" }}
          opacity={0.12}
          distance={-40}
        />
      </Box>

      <Container
        maxW="container.xl"
        px={{ base: 5, md: 8 }}
        position="relative"
        zIndex={1}
      >
        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", lg: graphic ? "1.4fr 1fr" : "1fr" }}
          gap={{ base: 10, lg: 16 }}
          alignItems="center"
        >
          <Box maxW="52rem">
            <MotionBox {...enter(0.1)}>
              <Heading
                as="h1"
                fontFamily="display"
                textTransform="uppercase"
                fontWeight="700"
                fontSize="clamp(1.9rem, 7.5vw, 5.5rem)"
                lineHeight="1"
                letterSpacing="0.05em"
                sx={{ textWrap: "balance" }}
              >
                {title}
              </Heading>
            </MotionBox>
            <MotionBox {...enter(0.22)}>
              <Lead mt={{ base: 6, md: 8 }} maxW="40rem">
                {description}
              </Lead>
            </MotionBox>
          </Box>
          {graphic ? (
            <MotionBox
              {...enter(0.3)}
              aria-hidden="true"
              maxW="420px"
              w="100%"
              justifySelf={{ base: "start", lg: "end" }}
              display={{ base: "none", md: "block" }}
            >
              {graphic}
            </MotionBox>
          ) : null}
        </Box>
      </Container>
    </Box>
  );
};
