import * as React from "react";
import { Box } from "@chakra-ui/react";
import { CanvasFrame, useCanvasLoop } from "./use-canvas-loop";
import { toCssSize } from "./use-svg-motion";
import type { SceneOptions } from "./loss-landscape";

const MONO = '"D-DIN", "DIN Alternate", ui-monospace, monospace';

const hash = (a: number, b: number) => {
  const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Causal (lower-triangular) attention heatmap with sparse bright cells and a diagonal sweep. */
export const createAttentionScene = ({ intensity = 1 }: SceneOptions = {}) => {
  let W = 1;
  let H = 1;
  let cell = 16;
  let nc = 10;
  let nr = 10;
  let ox = 0;
  let oy = 0;
  const padL = 30;
  const padT = 20;

  const resize = (w: number, h: number) => {
    W = w;
    H = h;
    cell = Math.max(9, Math.min(20, Math.round(Math.min(w, h * 1.6) / 34)));
    nc = Math.max(6, Math.floor((w - padL - 10) / cell));
    nr = Math.max(6, Math.floor((h - padT - 10) / cell));
    ox = padL + (w - padL - 10 - nc * cell) / 2;
    oy = padT + (h - padT - 10 - nr * cell) / 2;
  };

  const draw = ({ ctx, t }: CanvasFrame) => {
    const sweep = 1.15 - ((t * 0.11) % 1.45);
    const pad = Math.max(1, Math.floor(cell * 0.14));
    for (let i = 0; i < nr; i++) {
      const fi = i / nr;
      for (let j = 0; j < nc; j++) {
        const fj = j / nc;
        if (fj > fi + 0.5 / nc) continue;
        const d = (fi - fj) * nc;
        let v = 0.42 * Math.exp(-d / 2.4);
        if (j === 0) v += 0.2 * (0.4 + 0.6 * fi);
        v += 0.02 + 0.05 * hash(i, j);
        // Sparse retrieval cells that fade in and out.
        const ph = t * 0.45 + hash(j, i) * 9;
        const slot = Math.floor(ph);
        let spark = 0;
        if (hash(i * 1.7 + j, slot) > 0.968) spark = Math.sin(Math.PI * (ph - slot));
        const k = fi - fj;
        const sw = Math.max(0, 1 - Math.abs(k - sweep) / 0.05);
        const x = ox + j * cell;
        const y = oy + i * cell;
        const rgb = hash(j, i + slot) > 0.7 ? "94,242,196" : "142,227,255";
        const a = Math.min(1, v + spark * 0.85 + sw * 0.5) * intensity;
        ctx.fillStyle = `rgba(${sw > 0.4 ? "235,250,255" : rgb},${a})`;
        ctx.fillRect(x + pad / 2, y + pad / 2, cell - pad, cell - pad);
      }
    }

    // Faint axis ticks.
    ctx.font = `9px ${MONO}`;
    ctx.textBaseline = "middle";
    ctx.fillStyle = `rgba(190,205,235,${0.38 * intensity})`;
    const every = Math.max(4, Math.round(40 / cell) * 2);
    ctx.textAlign = "center";
    for (let j = 0; j < nc; j += every) ctx.fillText(`K${j}`, ox + j * cell + cell / 2, oy - 9);
    ctx.textAlign = "right";
    for (let i = 0; i < nr; i += every) ctx.fillText(`Q${i}`, ox - 6, oy + i * cell + cell / 2);
    ctx.strokeStyle = `rgba(190,205,235,${0.2 * intensity})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(ox - 2, oy);
    ctx.lineTo(ox - 2, oy + nr * cell);
    ctx.moveTo(ox, oy - 2);
    ctx.lineTo(ox + nc * cell, oy - 2);
    ctx.stroke();
    ctx.textBaseline = "alphabetic";
    void W;
    void H;
  };

  return { resize, draw };
};

/** Causal attention heatmap for cards and panels. */
export const AttentionMatrix: React.FC<{ size?: number | string }> = ({ size }) => {
  const scene = React.useMemo(() => createAttentionScene(), []);
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
