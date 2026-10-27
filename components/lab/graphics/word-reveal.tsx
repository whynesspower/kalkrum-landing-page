import * as React from "react";
import { Text, TextProps } from "@chakra-ui/react";
import { MotionValue, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const Word: React.FC<{
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
}> = ({ word, progress, range, reduce }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <>
      <motion.span style={{ opacity: reduce ? 1 : opacity, display: "inline-block" }}>
        {word}
      </motion.span>{" "}
    </>
  );
};

/** A paragraph whose words fade up from 18% to full opacity as it scrolls through the viewport. */
export const WordReveal: React.FC<{ text: string } & TextProps> = ({ text, ...rest }) => {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.45"],
  });
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Text ref={ref} {...rest}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 1.5 / words.length);
        return (
          <Word
            key={`${word}-${i}`}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
            reduce={reduce}
          />
        );
      })}
    </Text>
  );
};
