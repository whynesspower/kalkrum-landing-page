import * as React from "react";
import Image from "next/image";
import { Box, BoxProps } from "@chakra-ui/react";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MotionBox } from "components/motion/box";
import { Parallax } from "components/motion/parallax";
import { SCIENCE_IMAGES, ScienceImageKey } from "data/images";

/**
 * An image that drifts with strong parallax and zooms slowly as it crosses
 * the viewport. Children are drawn on top of the picture.
 */
export const ZoomImage: React.FC<
  BoxProps & {
    image: ScienceImageKey;
    distance?: number;
    zoom?: [number, number];
    opacity?: number;
    sizes?: string;
    priority?: boolean;
    shade?: boolean;
  }
> = ({
  image,
  distance = -70,
  zoom = [1.04, 1.22],
  opacity = 0.9,
  sizes = "100vw",
  priority,
  shade = true,
  children,
  ...rest
}) => {
  const img = SCIENCE_IMAGES[image];
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : zoom);
  const pad = Math.abs(distance);

  return (
    <Box ref={ref} position="relative" overflow="hidden" bg="kk.surface" {...rest}>
      <Parallax
        distance={distance}
        position="absolute"
        top={`-${pad}px`}
        bottom={`-${pad}px`}
        left="0"
        right="0"
      >
        <MotionBox position="absolute" inset="0" style={{ scale }}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={sizes}
            priority={priority}
            quality={75}
            style={{ objectFit: "cover", opacity }}
          />
        </MotionBox>
      </Parallax>
      {shade && (
        <Box
          position="absolute"
          inset="0"
          pointerEvents="none"
          bgGradient="linear(to-t, rgba(5,6,10,0.7) 0%, rgba(5,6,10,0) 50%)"
        />
      )}
      {children}
    </Box>
  );
};
