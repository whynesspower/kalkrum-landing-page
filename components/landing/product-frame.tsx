import * as React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MotionBox } from "components/motion/box";
import { FloatingCards } from "./graphics/floating-cards";

/** The dashboard in a browser frame that tilts flat as it scrolls into view. */
export const ProductFrame: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 14, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.95, 1]);

  return (
    <Box ref={ref} position="relative" sx={{ perspective: "1600px" }}>
      {/* Glow behind the frame */}
      <Box
        aria-hidden
        position="absolute"
        inset="10% 8% -6%"
        borderRadius="full"
        bg="rgba(108,69,228,0.35)"
        filter="blur(90px)"
        pointerEvents="none"
      />
      <MotionBox
        position="relative"
        style={{ rotateX, scale, transformOrigin: "50% 100%" }}
        borderWidth="1px"
        borderColor="kk.line"
        borderRadius={{ base: "12px", md: "18px" }}
        bg="kk.surface"
        overflow="hidden"
        boxShadow="0 40px 120px -30px rgba(108,69,228,0.5)"
      >
        <Flex
          aria-hidden
          h={{ base: "24px", md: "36px" }}
          px="4"
          align="center"
          gap="6px"
          borderBottomWidth="1px"
          borderColor="kk.line"
        >
          {[0, 1, 2].map((i) => (
            <Box key={i} w="9px" h="9px" borderRadius="full" bg="kk.line" />
          ))}
        </Flex>
        <Image
          src="/static/screenshots/list.png"
          alt="The KalKram dashboard: project cards with on-track and lagging status, an analytics chart, and 60-word AI updates such as an RCA summary."
          width={2000}
          height={1250}
          sizes="(min-width: 1280px) 1216px, 100vw"
          quality={80}
          priority
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        {/* Fades the bottom edge into the page */}
        <Box
          aria-hidden
          position="absolute"
          left="0"
          right="0"
          bottom="0"
          h="30%"
          pointerEvents="none"
          bgImage="linear-gradient(to top, var(--chakra-colors-kk-canvas), transparent)"
        />
      </MotionBox>
      <FloatingCards />
    </Box>
  );
};
