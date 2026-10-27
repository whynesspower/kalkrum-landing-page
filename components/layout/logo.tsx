import * as React from "react";
import { Flex } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
  href?: string;
  size?: number;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/** The logo file is square, so it must be drawn square or it looks squashed. */
export const Logo = ({ href = "/", size = 32, onClick }: LogoProps) => {
  return (
    <Flex flexShrink="0" alignItems="center">
      <Link href={href} onClick={onClick}>
        <Image
          alt="KalKram"
          src="/static/brand/kalkram-logo.png"
          width={size}
          height={size}
          priority
          style={{ width: size, height: size, objectFit: "contain" }}
        />
      </Link>
    </Flex>
  );
};
