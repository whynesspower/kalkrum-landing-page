import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const SIZE = 640;

/** Soft cyan spotlight that follows the pointer. Hidden on touch devices and with reduced motion. */
export const CursorGlow: React.FC = () => {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = React.useState(false);
  const x = useMotionValue(-SIZE);
  const y = useMotionValue(-SIZE);
  const sx = useSpring(x, { stiffness: 120, damping: 24, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 24, mass: 0.6 });
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    setEnabled(!reduce && window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, [reduce]);

  React.useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX - SIZE / 2);
      y.set(e.clientY - SIZE / 2);
      setShown(true);
    };
    const onLeave = () => setShown(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: SIZE,
        height: SIZE,
        x: sx,
        y: sy,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 3,
        mixBlendMode: "screen",
        background:
          "radial-gradient(circle, rgba(142,227,255,0.10) 0%, rgba(161,139,255,0.05) 35%, rgba(5,6,10,0) 68%)",
        opacity: shown ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    />
  );
};
