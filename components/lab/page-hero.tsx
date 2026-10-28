import * as React from "react";
import Image from "next/image";
import { Box, Heading } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SCIENCE_IMAGES, type ScienceImageKey } from "data/images";
import { Backdrop } from "./graphics/backdrop";
import { Lead } from "./primitives";

const MotionDiv = motion(Box);

const slowZoom = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.12); }
`;

type BackdropVariant = React.ComponentProps<typeof Backdrop>["variant"];

/**
 * The hero shared by the secondary pages: a dimmed photo with a slow zoom and
 * parallax, a generated backdrop over it, one h1, a lede and any actions.
 */
export const PageHero: React.FC<{
  title: string;
  lede?: string;
  image: ScienceImageKey;
  backdrop?: BackdropVariant;
  position?: string;
  children?: React.ReactNode;
}> = ({ title, lede, image, backdrop = "contours", position = "50% 45%", children }) => {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 200]);
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], reduce ? [1, 1] : [1, 0]);
  const photo = SCIENCE_IMAGES[image];

  return (
    <Box
      as="section"
      ref={ref}
      position="relative"
      overflow="hidden"
      minH={{ base: "auto", md: "82vh" }}
      display="flex"
      alignItems="center"
      pt={{ base: 32, md: 40 }}
      pb={{ base: 20, md: 28 }}
    >
      <Box position="absolute" inset="0" aria-hidden>
        <MotionDiv position="absolute" inset="-14% 0" style={{ y: photoY }}>
          <Box
            position="absolute"
            inset="0"
            opacity={0.34}
            animation={reduce ? undefined : `${slowZoom} 36s ease-in-out infinite alternate`}
            willChange="transform"
          >
            <Image
              src={photo.src}
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: position }}
            />
          </Box>
        </MotionDiv>
        <Backdrop variant={backdrop} intensity={0.8} />
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-b, rgba(5,6,10,0.55) 0%, rgba(5,6,10,0.1) 45%, #05060a 100%)"
        />
      </Box>

      <MotionDiv
        position="relative"
        zIndex={1}
        w="full"
        maxW="container.xl"
        mx="auto"
        px={{ base: 5, md: 8 }}
        style={{ y: textY, opacity: textOpacity }}
      >
        <Heading
          as="h1"
          fontFamily="display"
          textTransform="uppercase"
          fontWeight="700"
          fontSize="clamp(2.2rem, 6.4vw, 5.6rem)"
          lineHeight="1.02"
          letterSpacing="0.04em"
          maxW="62rem"
          sx={{ textWrap: "balance" }}
        >
          {title}
        </Heading>
        {lede && (
          <Lead mt={8} maxW="42rem">
            {lede}
          </Lead>
        )}
        {children}
      </MotionDiv>
    </Box>
  );
};

/** One large uppercase line between hairlines, used for short lists. */
export const StatementRows: React.FC<{ lines: string[]; size?: string }> = ({
  lines,
  size = "clamp(1.4rem, 3.2vw, 2.6rem)",
}) => (
  <Box maxW="56rem">
    {lines.map((line) => (
      <Box
        key={line}
        borderTopWidth="1px"
        borderColor="kk.line"
        py={{ base: 6, md: 8 }}
        fontFamily="display"
        textTransform="uppercase"
        fontWeight="700"
        fontSize={size}
        lineHeight="1.12"
        letterSpacing="0.04em"
        sx={{ textWrap: "balance" }}
      >
        {line}
      </Box>
    ))}
    <Box borderTopWidth="1px" borderColor="kk.line" />
  </Box>
);
