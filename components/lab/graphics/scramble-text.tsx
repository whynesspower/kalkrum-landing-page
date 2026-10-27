import * as React from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "01<>[]{}/\\+=*#%&$ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** Replace every letter or digit with a stable placeholder, keep spaces and punctuation. */
const mask = (text: string) => text.replace(/[A-Za-z0-9]/g, "0");

/**
 * Inline span that decodes from random glyphs into `text` once, when it
 * scrolls into view. Screen readers always get the final text.
 */
export const ScrambleText: React.FC<{ text: string }> = ({ text }) => {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  // Start with the real text so server render, no-JS and reduced motion all read correctly.
  const [display, setDisplay] = React.useState(text);

  React.useEffect(() => {
    setDisplay(text);
    const el = ref.current;
    if (reduce || !el || typeof IntersectionObserver === "undefined") return;

    setDisplay(mask(text));
    let raf = 0;
    let started = false;

    const run = () => {
      const start = performance.now();
      const total = Math.min(1400, 500 + text.length * 28);
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / total);
        const settled = Math.floor(p * text.length);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (i < settled || !/[A-Za-z0-9]/.test(ch)) out += ch;
          else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setDisplay(out);
        if (p < 1) raf = requestAnimationFrame(tick);
        else setDisplay(text);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (started || !entries.some((e) => e.isIntersecting)) return;
        started = true;
        io.disconnect();
        run();
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, reduce]);

  return (
    <span ref={ref} style={{ whiteSpace: "pre-wrap" }}>
      <span
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
};
