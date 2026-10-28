import * as React from "react";
import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SCIENCE_IMAGES } from "data/images";

const MotionDiv = motion(Box);

const slowZoom = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.1); }
`;

/** The Hubble deep field, dimmed, under the careers hero. Decorative only. */
export const HeroPhoto: React.FC = () => {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], reduce ? [0, 0] : [0, 180]);
  const photo = SCIENCE_IMAGES.hubbleDeepField;

  return (
    <MotionDiv position="absolute" inset="-12% 0" aria-hidden="true" style={{ y }}>
      <Box
        position="absolute"
        inset="0"
        opacity={0.32}
        animation={reduce ? undefined : `${slowZoom} 32s ease-in-out infinite alternate`}
        willChange="transform"
      >
        <Image
          src={photo.src}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "50% 40%" }}
        />
      </Box>
      <Box
        position="absolute"
        inset="0"
        bgGradient="linear(to-b, rgba(5,6,10,0.7) 0%, rgba(5,6,10,0.2) 50%, rgba(5,6,10,0.6) 100%)"
      />
    </MotionDiv>
  );
};
