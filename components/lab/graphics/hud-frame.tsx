import * as React from "react";
import { Box, Flex } from "@chakra-ui/react";

const corner = (v: "top" | "bottom", h: "left" | "right") => ({
  position: "absolute" as const,
  [v]: "-1px",
  [h]: "-1px",
  w: "16px",
  h: "16px",
  borderColor: "kk.accent",
  borderTopWidth: v === "top" ? "1px" : 0,
  borderBottomWidth: v === "bottom" ? "1px" : 0,
  borderLeftWidth: h === "left" ? "1px" : 0,
  borderRightWidth: h === "right" ? "1px" : 0,
  pointerEvents: "none" as const,
  zIndex: 2,
});

/** Wraps content in four corner brackets with a mono caption row beneath. */
export const HudFrame: React.FC<{
  label?: string;
  credit?: string;
  children: React.ReactNode;
}> = ({ label, credit, children }) => (
  <Box w="100%">
    <Box position="relative">
      {children}
      <Box aria-hidden="true" {...corner("top", "left")} />
      <Box aria-hidden="true" {...corner("top", "right")} />
      <Box aria-hidden="true" {...corner("bottom", "left")} />
      <Box aria-hidden="true" {...corner("bottom", "right")} />
    </Box>
    {(label || credit) && (
      <Flex
        mt={3}
        justify="space-between"
        gap={4}
        wrap="wrap"
        fontFamily="mono"
        fontSize="10px"
        letterSpacing="0.16em"
        textTransform="uppercase"
        color="kk.muted"
      >
        <Box as="span">{label}</Box>
        <Box as="span" textAlign="right">
          {credit}
        </Box>
      </Flex>
    )}
  </Box>
);
