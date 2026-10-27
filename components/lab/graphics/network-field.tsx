import * as React from "react";
import { Box } from "@chakra-ui/react";
import { CanvasFrame, useCanvasLoop } from "./use-canvas-loop";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rgb: string;
  r: number;
}

const LINK = 120;
const MOUSE_R = 170;

const pickColor = () => {
  const n = Math.random();
  return n < 0.12 ? "142,227,255" : n < 0.22 ? "161,139,255" : "220,230,250";
};

/** Drifting particles joined by faint lines, gently pushed and pulled by the pointer. */
export const NetworkField: React.FC<{ density?: number }> = ({ density = 1 }) => {
  const particles = React.useRef<Particle[]>([]);
  const mouse = React.useRef({ x: -9999, y: -9999, active: false });
  const boxRef = React.useRef<HTMLDivElement>(null);

  const make = React.useCallback(
    (w: number, h: number) => {
      const count = Math.max(24, Math.min(170, Math.round(((w * h) / 9500) * density)));
      const list = particles.current;
      while (list.length > count) list.pop();
      while (list.length < count) {
        list.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          rgb: pickColor(),
          r: 0.7 + Math.random() * 1.1,
        });
      }
    },
    [density],
  );

  const canvasRef = useCanvasLoop(({ ctx, w, h }: CanvasFrame) => {
    const list = particles.current;
    const m = mouse.current;
    let mx = -9999;
    let my = -9999;
    if (m.active && boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      mx = m.x - rect.left;
      my = m.y - rect.top;
    }

    for (const p of list) {
      const dx = p.x - mx;
      const dy = p.y - my;
      const d2 = dx * dx + dy * dy;
      if (d2 < MOUSE_R * MOUSE_R && d2 > 1) {
        const d = Math.sqrt(d2);
        // Push away when close, pull in lightly further out.
        const force = d < MOUSE_R * 0.4 ? 0.06 : -0.008;
        p.vx += (dx / d) * force;
        p.vy += (dy / d) * force;
      }
      p.vx *= 0.985;
      p.vy *= 0.985;
      // Keep a small drift alive.
      p.vx += (Math.random() - 0.5) * 0.01;
      p.vy += (Math.random() - 0.5) * 0.01;
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = w + 10;
      else if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      else if (p.y > h + 10) p.y = -10;
    }

    ctx.lineWidth = 1;
    for (let i = 0; i < list.length; i++) {
      const a = list[i];
      for (let j = i + 1; j < list.length; j++) {
        const b = list[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > LINK * LINK) continue;
        const k = 1 - Math.sqrt(d2) / LINK;
        ctx.strokeStyle = `rgba(190,205,235,${k * 0.16})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      const mdx = a.x - mx;
      const mdy = a.y - my;
      const md = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < MOUSE_R) {
        ctx.strokeStyle = `rgba(142,227,255,${(1 - md / MOUSE_R) * 0.4})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mx, my);
        ctx.stroke();
      }
    }

    for (const p of list) {
      ctx.fillStyle = `rgba(${p.rgb},0.75)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }, make);

  React.useEffect(() => {
    const m = mouse.current;
    const onMove = (e: PointerEvent) => {
      m.x = e.clientX;
      m.y = e.clientY;
      m.active = e.pointerType !== "touch";
    };
    const onLeave = () => {
      m.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <Box
      ref={boxRef}
      position="absolute"
      inset="0"
      overflow="hidden"
      pointerEvents="none"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      />
    </Box>
  );
};
