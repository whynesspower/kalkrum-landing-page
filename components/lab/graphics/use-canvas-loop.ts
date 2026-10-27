import * as React from "react";
import { useReducedMotion } from "framer-motion";

export interface CanvasFrame {
  ctx: CanvasRenderingContext2D;
  /** CSS pixel width and height of the canvas. */
  w: number;
  h: number;
  dpr: number;
  /** Seconds since the loop started (only counts while running). */
  t: number;
  /** Seconds since the previous frame, capped at 0.05. */
  dt: number;
}

/**
 * Shared 2D canvas loop: DPR aware, resizes with ResizeObserver, pauses when
 * the canvas is off screen or the tab is hidden, and draws a single static
 * frame when reduced motion is on.
 */
export function useCanvasLoop(
  draw: (frame: CanvasFrame) => void,
  onResize?: (w: number, h: number) => void,
) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const drawRef = React.useRef(draw);
  const resizeRef = React.useRef(onResize);
  drawRef.current = draw;
  resizeRef.current = onResize;

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;
    if (!canvas || !ctx) return;

    let w = 1;
    let h = 1;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let visible = true;
    let last = 0;
    let t = reduce ? 4 : 0;

    const frame = (dt: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      drawRef.current({ ctx, w, h, dpr, t, dt });
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      frame(dt);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduce || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      if (resizeRef.current) resizeRef.current(w, h);
      if (!running) frame(0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce]);

  return canvasRef;
}
