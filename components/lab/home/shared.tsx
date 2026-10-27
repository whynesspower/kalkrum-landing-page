import * as React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { useInView } from "framer-motion";
import { Parallax } from "components/motion/parallax";

/**
 * Mounts its children only once the box has come within 300px of the
 * viewport. Fills its parent, so use it to hold heavy canvases.
 */
export const LazyWhenVisible: React.FC<
  BoxProps & { children: React.ReactNode }
> = ({ children, ...rest }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "300px 0px 300px 0px" });
  return (
    <Box ref={ref} position="absolute" inset="0" {...rest}>
      {seen ? children : null}
    </Box>
  );
};

/** A soft radial glow that drifts at its own speed behind a section. */
export const Glow: React.FC<{
  color?: string;
  size?: number;
  distance?: number;
  opacity?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}> = ({
  color = "#38bdf8",
  size = 640,
  distance = -60,
  opacity = 0.2,
  ...pos
}) => (
  <Parallax
    aria-hidden
    distance={distance}
    position="absolute"
    pointerEvents="none"
    w={`${size}px`}
    h={`${size}px`}
    maxW="140vw"
    borderRadius="full"
    opacity={opacity}
    sx={{ background: `radial-gradient(circle, ${color} 0%, transparent 65%)` }}
    {...pos}
  />
);
