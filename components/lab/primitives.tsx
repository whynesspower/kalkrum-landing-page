import * as React from "react";
import {
  Box,
  BoxProps,
  Container,
  Heading,
  HeadingProps,
  Text,
  TextProps,
} from "@chakra-ui/react";
import { ScrambleText } from "./graphics/scramble-text";

/** A full-width page section with room for background decoration. */
export const LabSection: React.FC<
  BoxProps & { id?: string; decor?: React.ReactNode }
> = ({ children, decor, ...rest }) => (
  <Box
    as="section"
    position="relative"
    overflowX="clip"
    py={{ base: 20, md: 32 }}
    scrollMarginTop="96px"
    {...rest}
  >
    {decor}
    <Container
      maxW="container.xl"
      px={{ base: 5, md: 8 }}
      position="relative"
      zIndex={1}
    >
      {children}
    </Container>
  </Box>
);

/** Small mono label such as "[01] VISION". */
export const SectionLabel: React.FC<{ index: string; children: string }> = ({
  index,
  children,
}) => (
  <Text
    fontFamily="mono"
    fontSize="xs"
    letterSpacing="0.18em"
    textTransform="uppercase"
    color="kk.accent"
  >
    <ScrambleText text={`[${index}] ${children}`} />
  </Text>
);

/** Large serif display heading. */
export const LabHeading: React.FC<HeadingProps> = (props) => (
  <Heading
    as="h2"
    fontFamily="display"
    textTransform="uppercase"
    fontWeight="700"
    fontSize="clamp(1.9rem, 4.4vw, 3.5rem)"
    lineHeight="1.04"
    letterSpacing="0.05em"
    sx={{ textWrap: "balance" }}
    {...props}
  />
);

/** Large muted paragraph that follows a heading. */
export const Lead: React.FC<TextProps> = (props) => (
  <Text
    color="kk.muted"
    fontSize={{ base: "lg", md: "xl" }}
    lineHeight="1.65"
    {...props}
  />
);

/** Dashed horizontal rule used between sections. */
export const DashedRule: React.FC<BoxProps> = (props) => (
  <Box
    h="0"
    borderTopWidth="1px"
    borderTopStyle="dashed"
    borderColor="kk.line"
    {...props}
  />
);
