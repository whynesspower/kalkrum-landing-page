import * as React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

/** Hairline card with a soft light that follows the cursor. */
export const SpotlightCard: React.FC<BoxProps> = ({ children, ...rest }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <Box
      ref={ref}
      onPointerMove={onMove}
      position="relative"
      overflow="hidden"
      bg="kk.surface"
      borderWidth="1px"
      borderColor="kk.line"
      borderRadius="lg"
      p={{ base: 6, md: 8 }}
      transition="border-color 0.3s ease"
      _hover={{ borderColor: "rgba(142,227,255,0.35)" }}
      sx={{
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.3s ease",
          background:
            "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(142,227,255,0.10), transparent 70%)",
        },
        "&:hover::before": { opacity: 1 },
      }}
      {...rest}
    >
      <Box position="relative" display="flex" flexDirection="column" h="100%">
        {children}
      </Box>
    </Box>
  );
};
