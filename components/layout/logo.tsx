import * as React from "react";
import { Box, Flex, Heading, VisuallyHidden } from "@chakra-ui/react";
import Link from "next/link";

export interface LogoProps {
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

import siteConfig from "data/config";
import Image from "next/image";

export const Logo = ({ href = "/", onClick }: LogoProps) => {
  return (
    <Flex h="8" flexShrink="0" alignItems="flex-start">
      <Link href={href} onClick={onClick}>
        <Image
          alt="Logo of KalKram"
          src="/static/screenshots/kalkram.png"
          width={45}
          height={40}
        ></Image>
        <VisuallyHidden>{siteConfig.seo?.title}</VisuallyHidden>
      </Link>
    </Flex>
  );
};
