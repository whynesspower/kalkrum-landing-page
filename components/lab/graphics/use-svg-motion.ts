import * as React from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Ref for an animated SVG. SMIL animations are not covered by the global CSS
 * reduced-motion rule, so this pauses them for reduced motion and while the
 * graphic is off screen or the tab is hidden.
 */
export function useSvgMotion() {
  const ref = React.useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const svg = ref.current;
    if (!svg || typeof svg.pauseAnimations !== "function") return;
    if (reduce) {
      svg.pauseAnimations();
      return;
    }
    let visible = true;
    const sync = () => {
      if (visible && !document.hidden) svg.unpauseAnimations();
      else svg.pauseAnimations();
    };
    const io = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      sync();
    });
    io.observe(svg);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [reduce]);

  return ref;
}

/** Turn a numeric or string size prop into a CSS length for Chakra `w`. */
export const toCssSize = (size: number | string | undefined) =>
  typeof size === "number" ? `${size}px` : (size ?? "100%");
