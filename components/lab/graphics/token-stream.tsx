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

const WORDS = [
  "▁the", "▁memory", "▁state", "▁learn", "▁time", "▁plan", "▁context",
  "▁gate", "▁write", "▁read", "▁step", "▁model", "▁loss", "▁sequence",
  "▁attend", "▁token", "<bos>", "<eos>", "▁agent", "▁world", "▁recall", "▁update",
];

const cellText = (col: number, idx: number) => {
  const h = hash(col, idx);
  if (h < 0.4) {
    return "0x" + Math.floor(hash(idx, col) * 65535).toString(16).padStart(4, "0");
  }
  if (h < 0.55) {
    return [0, 1, 2].map((n) => Math.floor(hash(idx + n, col) * 255).toString(16).padStart(2, "0")).join(" ");
  }
  return WORDS[Math.floor(hash(col * 3.1, idx) * WORDS.length)];
};

/** Columns of drifting byte values and token-like strings, with a few lit tokens. */
export const createTokenScene = ({ intensity = 1 }: SceneOptions = {}) => {
  let colW = 112;
  let cols = 1;
  const lh = 20;

  const resize = (w: number) => {
    colW = w < 520 ? 92 : 124;
    cols = Math.ceil(w / colW) + 1;
  };

  const draw = ({ ctx, w, h, t }: CanvasFrame) => {
    ctx.font = `11px ${MONO}`;
    ctx.textBaseline = "middle";
    const rowsN = Math.ceil(h / lh) + 2;
    for (let c = 0; c < cols; c++) {
      const speed = 6 + hash(c, 1) * 16;
      const dir = hash(c, 2) > 0.3 ? 1 : -1;
      const scroll = t * speed * dir + hash(c, 3) * 1000 * lh;
      const base = Math.floor(scroll / lh);
      const frac = scroll - base * lh;
      const x = c * colW + 14;
      const colA = 0.5 + 0.5 * hash(c, 4);
      for (let r = -1; r < rowsN; r++) {
        const y = r * lh + frac;
        const idx = dir === 1 ? r - base : r + base;
        const edge = Math.min(1, y / (h * 0.2), (h - y) / (h * 0.2));
        if (edge <= 0) continue;
        const text = cellText(c, idx);
        const lit = hash(c * 1.3, idx) > 0.955;
        if (lit) {
          const kind = hash(idx, c * 2.2);
          const rgb = kind < 0.5 ? "142,227,255" : kind < 0.8 ? "94,242,196" : "255,210,122";
          const a = intensity * edge;
          ctx.fillStyle = `rgba(${rgb},${0.12 * a})`;
          ctx.fillRect(x - 6, y - lh / 2 + 2, ctx.measureText(text).width + 12, lh - 4);
          ctx.strokeStyle = `rgba(${rgb},${0.55 * a})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(x - 6 + 0.5, y - lh / 2 + 2.5, ctx.measureText(text).width + 11, lh - 5);
          ctx.fillStyle = `rgba(${rgb},${0.95 * a})`;
        } else {
          ctx.fillStyle = `rgba(190,205,235,${0.2 * colA * edge * intensity})`;
        }
        ctx.fillText(text, x, y);
      }
      ctx.strokeStyle = `rgba(190,205,235,${0.05 * intensity})`;
      ctx.beginPath();
      ctx.moveTo(c * colW + 0.5, 0);
      ctx.lineTo(c * colW + 0.5, h);
      ctx.stroke();
    }
    ctx.textBaseline = "alphabetic";
    void w;
  };

  return { resize, draw };
};

/** Drifting token and byte columns for cards and panels. */
export const TokenStream: React.FC<{ size?: number | string }> = ({ size }) => {
  const scene = React.useMemo(() => createTokenScene(), []);
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
