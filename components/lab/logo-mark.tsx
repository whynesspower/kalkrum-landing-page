import * as React from "react";
import Image from "next/image";
import { Box, BoxProps } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { Parallax } from "components/motion/parallax";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export interface LogoMarkProps extends Omit<BoxProps, "children"> {
  /** Pixel size of the square mark. */
  size: number;
  /** Turns the mark slowly, one full turn every `spinSeconds`. */
  spinSeconds?: number;
}

/** The KalKram mark, drawn square so it is never stretched. */
export const LogoMark: React.FC<LogoMarkProps> = ({
  size,
  spinSeconds,
  ...rest
}) => (
  <Box
    w={`${size}px`}
    h={`${size}px`}
    flexShrink={0}
    animation={spinSeconds ? `${spin} ${spinSeconds}s linear infinite` : undefined}
    {...rest}
  >
    <Image
      src="/static/brand/kalkram-logo.png"
      alt=""
      aria-hidden
      width={size}
      height={size}
      sizes={`${size}px`}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  </Box>
);

/** A large, faint mark placed behind a section. It drifts slower than the page. */
export const LogoWatermark: React.FC<
  Omit<LogoMarkProps, "opacity"> & { opacity?: number; distance?: number }
> = ({ size, opacity = 0.08, distance = -60, spinSeconds = 240, ...rest }) => (
  <Parallax
    aria-hidden
    distance={distance}
    position="absolute"
    pointerEvents="none"
    zIndex={0}
    {...(rest as any)}
  >
    <LogoMark size={size} spinSeconds={spinSeconds} opacity={opacity} />
  </Parallax>
);
