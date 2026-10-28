import * as React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { useInView } from "framer-motion";

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
