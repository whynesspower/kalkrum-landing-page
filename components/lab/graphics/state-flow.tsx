import * as React from "react";
import { Box } from "@chakra-ui/react";
import { CanvasFrame, useCanvasLoop } from "./use-canvas-loop";
import { toCssSize } from "./use-svg-motion";
import type { SceneOptions } from "./loss-landscape";

const MONO = '"D-DIN", "DIN Alternate", ui-monospace, monospace';
const D = 8;

/** A hidden state vector carried across time steps, with a gated write path along the axis. */
export const createStateScene = ({ intensity = 1 }: SceneOptions = {}) => {
  let steps = 12;
  let h2 = 1;
  const state: number[][] = [];

  const resize = (w: number, h: number) => {
    steps = Math.max(6, Math.min(24, Math.round(w / 78)));
    h2 = h;
  };

  const draw = ({ ctx, w, h, t }: CanvasFrame) => {
    const padX = 40;
    const axisY = h - 34;
    const top = 40;
    const stackH = axisY - top - 44;
    const colW = (w - padX * 2) / (steps - 1);
    const barH = Math.max(3, Math.min(14, stackH / D - 4));
    const tau = t;
    const head = ((t * 0.55) % (steps + 3)) - 1.5;

    // Recurrence: h_k = g_k * h_{k-1} + (1 - g_k) * u_k
    const gates: number[] = [];
    for (let k = 0; k < steps; k++) {
      const g = 0.35 + 0.5 * (0.5 + 0.5 * Math.sin(k * 0.9 + tau * 0.35));
      gates.push(g);
      const row = state[k] || (state[k] = new Array(D).fill(0));
      for (let d = 0; d < D; d++) {
        const u = Math.sin(k * 1.31 + d * 2.1 + tau * 0.5) * Math.cos(d * 0.7 - k * 0.4 + tau * 0.21);
        const prev = k === 0 ? 0 : state[k - 1][d];
        row[d] = g * prev + (1 - g) * u;
      }
    }

    // Time axis.
    ctx.strokeStyle = `rgba(190,205,235,${0.25 * intensity})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX - 16, axisY);
    ctx.lineTo(w - padX + 16, axisY);
    ctx.stroke();
    ctx.font = `9px ${MONO}`;
    ctx.textAlign = "center";

    for (let k = 0; k < steps; k++) {
      const x = padX + k * colW;
      const near = Math.max(0, 1 - Math.abs(k - head) / 1.6);
      // Tick and label.
      ctx.strokeStyle = `rgba(190,205,235,${0.3 * intensity})`;
      ctx.beginPath();
      ctx.moveTo(x, axisY);
      ctx.lineTo(x, axisY + 5);
      ctx.stroke();
      ctx.fillStyle = `rgba(190,205,235,${(0.34 + near * 0.5) * intensity})`;
      ctx.fillText(`T${k}`, x, axisY + 18);

      // Links from the previous step.
      if (k > 0) {
        const px = x - colW;
        for (let d = 0; d < D; d++) {
          const y = top + 40 + (d + 0.5) * (stackH / D);
          const v = Math.abs(state[k][d]);
          ctx.strokeStyle = `rgba(142,227,255,${(0.04 + 0.1 * v + 0.2 * near) * intensity})`;
          ctx.beginPath();
          ctx.moveTo(px + barH * 0.9 + 6, y);
          ctx.lineTo(x - barH * 0.9 - 6, y);
          ctx.stroke();
        }
      }

      // State stack.
      const bw = Math.min(colW * 0.5, 34);
      for (let d = 0; d < D; d++) {
        const y = top + 40 + (d + 0.5) * (stackH / D);
        const v = state[k][d];
        const len = Math.abs(v) * bw;
        const rgb = near > 0.55 ? "94,242,196" : "142,227,255";
        ctx.fillStyle = `rgba(${rgb},${(0.28 + 0.4 * Math.abs(v) + 0.3 * near) * intensity})`;
        ctx.fillRect(v >= 0 ? x : x - len, y - barH / 2, len, barH);
        ctx.fillStyle = `rgba(190,205,235,${0.12 * intensity})`;
        ctx.fillRect(x - 0.5, y - barH / 2 - 1, 1, barH + 2);
      }

      // Gate: ring above each stack, filled by openness.
      const gy = top + 18;
      ctx.strokeStyle = `rgba(255,210,122,${(0.35 + 0.5 * near) * intensity})`;
      ctx.beginPath();
      ctx.arc(x, gy, 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = `rgba(255,210,122,${(0.2 + 0.7 * gates[k]) * (0.5 + 0.5 * near) * intensity})`;
      ctx.beginPath();
      ctx.arc(x, gy, 5 * (1 - gates[k]) + 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Input arrow from below.
      ctx.strokeStyle = `rgba(190,205,235,${(0.12 + 0.3 * near) * intensity})`;
      ctx.beginPath();
      ctx.moveTo(x, axisY - 6);
      ctx.lineTo(x, axisY - 26);
      ctx.stroke();
    }

    // Write path glowing along the axis.
    const hx = padX + head * colW;
    const grad = ctx.createLinearGradient(hx - 90, 0, hx + 14, 0);
    grad.addColorStop(0, "rgba(94,242,196,0)");
    grad.addColorStop(1, `rgba(94,242,196,${0.9 * intensity})`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(Math.max(padX - 16, hx - 90), axisY);
    ctx.lineTo(Math.min(w - padX + 16, hx + 14), axisY);
    ctx.stroke();
    if (hx > padX - 16 && hx < w - padX + 16) {
      const glow = ctx.createRadialGradient(hx, axisY, 0, hx, axisY, 22);
      glow.addColorStop(0, `rgba(94,242,196,${0.6 * intensity})`);
      glow.addColorStop(1, "rgba(94,242,196,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(hx - 22, axisY - 22, 44, 44);
    }
    ctx.textAlign = "left";
    ctx.fillStyle = `rgba(190,205,235,${0.4 * intensity})`;
    ctx.fillText("h", padX - 34, top + 18 + 3);
    void h2;
  };

  return { resize, draw };
};

/** Hidden-state flow over a time axis, for cards and panels. */
export const StateFlow: React.FC<{ size?: number | string }> = ({ size }) => {
  const scene = React.useMemo(() => createStateScene(), []);
  const ref = useCanvasLoop(scene.draw, scene.resize);
  return (
    <Box
      position="relative"
      w={toCssSize(size)}
      maxW="100%"
      overflow="hidden"
      pointerEvents="none"
      aria-hidden="true"
      sx={{ aspectRatio: "16 / 10" }}
    >
      <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
    </Box>
  );
};
