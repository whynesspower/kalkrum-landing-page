import * as React from "react";
import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const slide = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const Diamond = () => (
  <Box
    as="span"
    aria-hidden="true"
    display="inline-block"
    w="5px"
    h="5px"
    mx={{ base: 6, md: 10 }}
    borderWidth="1px"
    borderColor="kk.accent"
    transform="rotate(45deg)"
    opacity={0.7}
    flexShrink={0}
  />
);

/** Endless mono ticker. `speed` is in pixels per second. Pauses on hover. */
export const Marquee: React.FC<{ items: string[]; speed?: number }> = ({ items, speed = 40 }) => {
  // Repeat the list so one track is always wider than a wide screen.
  const repeat = Math.max(1, Math.ceil(10 / Math.max(1, items.length)));
  const chars = items.reduce((n, s) => n + s.length, 0) * repeat;
  const trackWidth = chars * 12 + items.length * repeat * 90; // rough pixel estimate
  const duration = Math.max(10, trackWidth / speed);

  const group = (hidden: boolean) =>
    Array.from({ length: repeat }, (_, r) =>
      items.map((item, i) => (
        <React.Fragment key={`${r}-${i}`}>
          <Box
            as="span"
            aria-hidden={hidden || r > 0 ? true : undefined}
            fontFamily="mono"
            fontSize="xs"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="kk.muted"
            whiteSpace="nowrap"
          >
            {item}
          </Box>
          <Diamond />
        </React.Fragment>
      )),
    );

  return (
    <Box
      overflow="hidden"
      w="100%"
      sx={{
        maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
      }}
      _hover={{ "& .kk-marquee-track": { animationPlayState: "paused" } }}
    >
      <Box
        className="kk-marquee-track"
        display="flex"
        alignItems="center"
        w="max-content"
        animation={`${slide} ${duration}s linear infinite`}
        willChange="transform"
      >
        <Box display="flex" alignItems="center" flexShrink={0}>
          {group(false)}
        </Box>
        <Box display="flex" alignItems="center" flexShrink={0} aria-hidden="true">
          {group(true)}
        </Box>
      </Box>
    </Box>
  );
};
