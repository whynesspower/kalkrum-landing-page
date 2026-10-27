import * as React from "react";
import NextLink from "next/link";
import { Link, LinkProps } from "@chakra-ui/react";

/** Mono text link used for calls to action. Works for pages and mailto. */
export const ArrowLink: React.FC<LinkProps & { href: string }> = ({
  href,
  children,
  ...rest
}) => {
  const external = href.startsWith("mailto:");
  return (
    <Link
      as={external ? undefined : NextLink}
      href={href}
      display="inline-flex"
      alignItems="center"
      gap={2}
      fontFamily="mono"
      fontSize="sm"
      letterSpacing="0.12em"
      textTransform="uppercase"
      color="kk.accent"
      borderBottomWidth="1px"
      borderColor="rgba(142,227,255,0.35)"
      pb="2px"
      _hover={{ textDecoration: "none", borderColor: "kk.accent" }}
      {...rest}
    >
      {children}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  );
};
