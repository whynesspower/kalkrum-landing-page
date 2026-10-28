import * as React from "react";
import { Box } from "@chakra-ui/react";
import { CanvasFrame, useCanvasLoop } from "./use-canvas-loop";
import { toCssSize } from "./use-svg-motion";
import type { SceneOptions } from "./loss-landscape";

const MONO = '"D-DIN", "DIN Alternate", ui-monospace, monospace';
const DRAW_SECONDS = 3.2;

const smooth = (x: number) => x * x * (3 - 2 * x);

/** Capability against time: it keeps climbing and never flattens. */
const curve = (x: number) => {
  let y = 0.05 + 0.56 * x + 0.3 * Math.sqrt(x);
  for (const e of [0.18, 0.37, 0.55, 0.74]) y += 0.025 * smooth(Math.min(1, Math.max(0, (x - e) / 0.04)));
  return y;
};

/** A timeline of events with a learning curve that draws itself and keeps rising. */
export const createTimeScene = ({ intensity = 1 }: SceneOptions = {}) => {
  let ticks = 8;

  const resize = (w: number) => {
    ticks = Math.max(5, Math.min(11, Math.round(w / 90)));
  };

  const draw = ({ ctx, w, h, t }: CanvasFrame) => {
    const padL = 36;
    const padR = 22;
    const padT = 26;
    const axisY = h - 34;
    const plotR = padL + (w - padL - padR) * 0.84;
    const plotW = plotR - padL;
    const plotH = axisY - padT - 8;
    const X = (x: number) => padL + x * plotW;
    const Y = (y: number) => axisY - Math.min(1.08, y) * plotH * 0.92;
    const p = smooth(Math.min(1, t / DRAW_SECONDS));
    const I = intensity;

    // Grid.
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(190,205,235,${0.06 * I})`;
    ctx.beginPath();
    for (let i = 1; i <= 4; i++) {
      const y = axisY - (i * plotH) / 4.4;
      ctx.moveTo(padL, y);
      ctx.lineTo(w - padR, y);
    }
    ctx.stroke();

    // Axes and ticks.
    ctx.strokeStyle = `rgba(190,205,235,${0.3 * I})`;
    ctx.beginPath();
    ctx.moveTo(padL, padT - 6);
    ctx.lineTo(padL, axisY);
    ctx.lineTo(w - padR, axisY);
    ctx.stroke();
    ctx.font = `9px ${MONO}`;
    ctx.textAlign = "center";
    ctx.fillStyle = `rgba(190,205,235,${0.4 * I})`;
    for (let i = 0; i < ticks; i++) {
      const x = padL + (i / (ticks - 1)) * (w - padL - padR - 6);
      ctx.beginPath();
      ctx.moveTo(x, axisY);
      ctx.lineTo(x, axisY + 5);
      ctx.stroke();
      ctx.fillText(`T${i}`, x, axisY + 18);
    }
    ctx.textAlign = "left";
    ctx.fillText("TIME", w - padR - 28, axisY - 8);
    ctx.save();
    ctx.translate(14, padT + 40);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("CAPABILITY", 0, 0);
    ctx.restore();

    // Frozen baseline: a model that stops learning stays flat.
    const fx = 0.3;
    const fy = Y(curve(fx));
    const fp = Math.max(0, Math.min(1, (p - fx) / (1 - fx)));
    ctx.setLineDash([4, 5]);
    ctx.strokeStyle = `rgba(190,205,235,${0.3 * I})`;
    ctx.beginPath();
    ctx.moveTo(X(fx), fy);
    ctx.lineTo(X(fx + (1 - fx) * fp), fy);
    ctx.stroke();
    ctx.setLineDash([]);
    if (fp > 0.9) {
      ctx.fillStyle = `rgba(190,205,235,${0.45 * I})`;
      ctx.fillText("FROZEN", X(1) + 8, fy + 3);
    }

    // Area and curve.
    const N = 120;
    const last = Math.floor(N * p);
    if (last > 1) {
      const area = ctx.createLinearGradient(0, padT, 0, axisY);
      area.addColorStop(0, `rgba(142,227,255,${0.16 * I})`);
      area.addColorStop(1, "rgba(142,227,255,0)");
      ctx.fillStyle = area;
      ctx.beginPath();
      ctx.moveTo(X(0), axisY);
      for (let i = 0; i <= last; i++) ctx.lineTo(X(i / N), Y(curve(i / N)));
      ctx.lineTo(X(last / N), axisY);
      ctx.closePath();
      ctx.fill();

      const line = ctx.createLinearGradient(X(0), 0, X(1), 0);
      line.addColorStop(0, `rgba(94,242,196,${0.9 * I})`);
      line.addColorStop(1, `rgba(142,227,255,${I})`);
      ctx.strokeStyle = line;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= last; i++) {
        const x = X(i / N);
        const y = Y(curve(i / N));
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.lineWidth = 1;
    }

    // Events: gold diamonds on the axis with stems up to the curve.
    for (const e of [0.18, 0.37, 0.55, 0.74, 0.92]) {
      if (p < e) continue;
      const ex = X(e);
      const ey = Y(curve(e));
      const born = Math.min(1, (p - e) / 0.06);
      ctx.setLineDash([2, 4]);
      ctx.strokeStyle = `rgba(255,210,122,${0.4 * born * I})`;
      ctx.beginPath();
      ctx.moveTo(ex, axisY);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = `rgba(255,210,122,${0.95 * born * I})`;
      ctx.beginPath();
      ctx.moveTo(ex, axisY - 5);
      ctx.lineTo(ex + 4, axisY);
      ctx.lineTo(ex, axisY + 5);
      ctx.lineTo(ex - 4, axisY);
      ctx.closePath();
      ctx.fill();
    }

    // Leading dot and the continuation beyond the plotted range.
    const hx = X(p);
    const hy = Y(curve(p));
    const pulse = 0.5 + 0.5 * Math.sin(t * 3);
    const glow = ctx.createRadialGradient(hx, hy, 0, hx, hy, 18 + 6 * pulse);
    glow.addColorStop(0, `rgba(142,227,255,${0.6 * I})`);
    glow.addColorStop(1, "rgba(142,227,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(hx - 26, hy - 26, 52, 52);
    ctx.fillStyle = `rgba(235,250,255,${I})`;
    ctx.beginPath();
    ctx.arc(hx, hy, 3.2, 0, Math.PI * 2);
    ctx.fill();

    if (p >= 1) {
      const ex0 = X(1);
      const ex1 = w - padR;
      const g = ctx.createLinearGradient(ex0, 0, ex1, 0);
      g.addColorStop(0, `rgba(142,227,255,${0.7 * I})`);
      g.addColorStop(1, "rgba(142,227,255,0)");
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = g;
      ctx.beginPath();
      ctx.moveTo(ex0, Y(curve(1)));
      ctx.lineTo(ex1, Y(curve(1)) - (ex1 - ex0) * 0.32);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  return { resize, draw };
};

/** Learning-in-time timeline for cards and panels. */
export const TimeAxis: React.FC<{ size?: number | string }> = ({ size }) => {
  const scene = React.useMemo(() => createTimeScene(), []);
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
