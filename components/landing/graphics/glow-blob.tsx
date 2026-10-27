import * as React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Parallax, ParallaxProps } from "components/motion/parallax";

const COLORS = {
  violet: "rgba(108,69,228,0.38)",
  blue: "rgba(47,107,255,0.28)",
  pink: "rgba(217,70,239,0.22)",
};

export interface GlowBlobProps extends Omit<ParallaxProps, "children"> {
  color?: keyof typeof COLORS;
  size?: number;
}

/** A soft coloured light that drifts slower than the page. */
export const GlowBlob: React.FC<GlowBlobProps> = ({
  color = "violet",
  size = 520,
  distance = -70,
  ...rest
}) => {
  const strength = useColorModeValue(0.45, 1);
  return (
    <Parallax
      aria-hidden
      distance={distance}
      position="absolute"
      pointerEvents="none"
      w={`${size}px`}
      h={`${size}px`}
      {...rest}
    >
      <Box
        w="full"
        h="full"
        borderRadius="full"
        bg={COLORS[color]}
        filter="blur(110px)"
        opacity={strength}
      />
    </Parallax>
  );
};
