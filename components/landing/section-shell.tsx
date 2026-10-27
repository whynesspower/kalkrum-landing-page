import * as React from "react";
import { Box, BoxProps, Container, Heading, Text } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import { Parallax } from "components/motion/parallax";

export const SectionShell: React.FC<
  BoxProps & { id?: string; decor?: React.ReactNode }
> = ({ children, decor, ...rest }) => (
  <Box
    as="section"
    position="relative"
    overflowX="clip"
    py={{ base: 16, md: 28 }}
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

export const SectionHeading: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}> = ({ eyebrow, title, description }) => (
  <Parallax distance={14}>
    <Reveal>
      <Box textAlign="center" maxW="720px" mx="auto" mb={{ base: 10, md: 16 }}>
        <Text
          fontSize="sm"
          fontWeight="600"
          letterSpacing="0.14em"
          textTransform="uppercase"
          color="kk.accent"
          mb="4"
        >
          {eyebrow}
        </Text>
        <Heading
          as="h2"
          fontSize="clamp(1.875rem, 4.5vw, 3rem)"
          lineHeight="1.1"
          letterSpacing="-0.035em"
          fontWeight="700"
          sx={{ textWrap: "balance" }}
        >
          {title}
        </Heading>
        {description && (
          <Text
            mt="5"
            fontSize={{ base: "lg", md: "xl" }}
            color="kk.muted"
            lineHeight="1.6"
          >
            {description}
          </Text>
        )}
      </Box>
    </Reveal>
  </Parallax>
);
