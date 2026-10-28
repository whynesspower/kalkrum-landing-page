import * as React from "react";
import { Box, Container, Heading } from "@chakra-ui/react";
import { Reveal } from "components/motion/reveal";
import { Backdrop } from "../graphics/backdrop";

export const Candour: React.FC = () => (
  <Box
    as="section"
    position="relative"
    overflow="clip"
    bg="kk.canvas"
    py={{ base: 28, md: 48 }}
    borderTopWidth="1px"
    borderBottomWidth="1px"
    borderColor="kk.line"
  >
    <Box aria-hidden position="absolute" inset="0" pointerEvents="none">
      <Backdrop variant="contours" intensity={0.8} />
    </Box>
    <Box
      aria-hidden
      position="absolute"
      inset="0"
      pointerEvents="none"
      sx={{ background: "radial-gradient(60% 70% at 40% 50%, rgba(5,6,10,0.7), transparent 80%)" }}
    />
    <Container maxW="container.xl" px={{ base: 5, md: 8 }} position="relative" zIndex={1}>
      <Reveal>
        <Heading
          as="h2"
          fontFamily="display"
          textTransform="uppercase"
          fontWeight="700"
          fontSize="clamp(2rem, 6.4vw, 5.6rem)"
          lineHeight="1.02"
          letterSpacing="0.05em"
          maxW="1000px"
          sx={{ textWrap: "balance" }}
        >
          The odds are long.{" "}
          <Box as="span" fontStyle="normal" color="kk.accent">
            We think the bet is worth it.
          </Box>
        </Heading>
      </Reveal>
    </Container>
  </Box>
);
