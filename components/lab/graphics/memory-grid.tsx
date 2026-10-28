import * as React from "react";
import { Box } from "@chakra-ui/react";
import { CanvasFrame, useCanvasLoop } from "./use-canvas-loop";
import { toCssSize } from "./use-svg-motion";
import type { SceneOptions } from "./loss-landscape";

const MONO = '"D-DIN", "DIN Alternate", ui-monospace, monospace';

/** A grid of memory cells: writes light up mint, reads sweep out from a cyan pointer. */
export const createMemoryScene = ({ intensity = 1 }: SceneOptions = {}) => {
  let cell = 20;
  let cols = 10;
  let rows = 10;
  let ox = 0;
  let oy = 0;
  let stored = new Float32Array(0);
  let heat = new Float32Array(0);
  const ptr = { x: 3, y: 3, tx: 3, ty: 3, wave: 0, next: 0 };
  let writeAcc = 0;

  const randomCell = () => ({ x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) });

  const retarget = () => {
    for (let n = 0; n < 12; n++) {
      const c = randomCell();
      if (stored[c.y * cols + c.x] > 0.3) {
        ptr.tx = c.x;
        ptr.ty = c.y;
        break;
      }
    }
    ptr.wave = 0;
    ptr.next = 2.4;
  };

  const resize = (w: number, h: number) => {
    cell = Math.max(14, Math.min(26, Math.round(w / 44)));
    cols = Math.max(6, Math.floor((w - 20) / cell));
    rows = Math.max(5, Math.floor((h - 36) / cell));
    ox = (w - cols * cell) / 2;
    oy = (h - rows * cell) / 2 - 6;
    stored = new Float32Array(cols * rows);
    heat = new Float32Array(cols * rows);
    for (let i = 0; i < stored.length; i++) {
      if (Math.random() < 0.38) stored[i] = 0.4 + Math.random() * 0.6;
      if (Math.random() < 0.03) heat[i] = Math.random();
    }
    const c = randomCell();
    ptr.x = ptr.tx = c.x;
    ptr.y = ptr.ty = c.y;
    ptr.wave = 3;
    ptr.next = 2;
  };

  const draw = ({ ctx, w, h, dt }: CanvasFrame) => {
    if (dt > 0) {
      writeAcc += dt * cols * rows * 0.014;
      while (writeAcc >= 1) {
        writeAcc -= 1;
        const c = randomCell();
        const i = c.y * cols + c.x;
        heat[i] = 1;
        stored[i] = 0.5 + Math.random() * 0.5;
      }
      for (let i = 0; i < heat.length; i++) heat[i] = Math.max(0, heat[i] - dt * 0.55);
      const k = 1 - Math.exp(-dt * 5);
      ptr.x += (ptr.tx - ptr.x) * k;
      ptr.y += (ptr.ty - ptr.y) * k;
      ptr.wave += dt * 7;
      ptr.next -= dt;
      if (ptr.next <= 0) retarget();
    }

    const g = Math.max(1, Math.floor(cell * 0.14));
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x;
        const d = Math.hypot(x - ptr.tx, y - ptr.ty);
        const ring = Math.max(0, 1 - Math.abs(d - ptr.wave) / 1.3) * (ptr.wave < 14 ? 1 : 0);
        const px = ox + x * cell + g / 2;
        const py = oy + y * cell + g / 2;
        const s = cell - g;
        ctx.fillStyle = `rgba(190,205,235,${0.035 * intensity})`;
        ctx.fillRect(px, py, s, s);
        if (stored[i] > 0) {
          ctx.fillStyle = `rgba(142,227,255,${(0.07 + 0.14 * stored[i]) * intensity})`;
          ctx.fillRect(px, py, s, s);
        }
        if (ring > 0 && stored[i] > 0) {
          ctx.fillStyle = `rgba(142,227,255,${Math.min(1, ring * 0.9) * intensity})`;
          ctx.fillRect(px, py, s, s);
        } else if (ring > 0) {
          ctx.fillStyle = `rgba(142,227,255,${ring * 0.12 * intensity})`;
          ctx.fillRect(px, py, s, s);
        }
        if (heat[i] > 0.02) {
          ctx.fillStyle = `rgba(94,242,196,${Math.min(1, heat[i] * 0.95) * intensity})`;
          ctx.fillRect(px, py, s, s);
        }
      }
    }

    // Pointer: cross hairs and a bracket.
    const cx = ox + (ptr.x + 0.5) * cell;
    const cy = oy + (ptr.y + 0.5) * cell;
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(142,227,255,${0.22 * intensity})`;
    ctx.beginPath();
    ctx.moveTo(ox - 6, cy);
    ctx.lineTo(ox + cols * cell + 6, cy);
    ctx.moveTo(cx, oy - 6);
    ctx.lineTo(cx, oy + rows * cell + 6);
    ctx.stroke();
    ctx.strokeStyle = `rgba(235,250,255,${0.9 * intensity})`;
    ctx.strokeRect(cx - cell / 2 - 1.5, cy - cell / 2 - 1.5, cell + 3, cell + 3);
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, cell * 2);
    glow.addColorStop(0, `rgba(142,227,255,${0.35 * intensity})`);
    glow.addColorStop(1, "rgba(142,227,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(cx - cell * 2, cy - cell * 2, cell * 4, cell * 4);

    // Legend.
    ctx.font = `9px ${MONO}`;
    ctx.textBaseline = "middle";
    const ly = h - 12;
    ctx.fillStyle = `rgba(94,242,196,${0.8 * intensity})`;
    ctx.fillRect(ox, ly - 4, 8, 8);
    ctx.fillStyle = `rgba(190,205,235,${0.5 * intensity})`;
    ctx.fillText("WRITE", ox + 14, ly);
    ctx.fillStyle = `rgba(142,227,255,${0.9 * intensity})`;
    ctx.fillRect(ox + 62, ly - 4, 8, 8);
    ctx.fillStyle = `rgba(190,205,235,${0.5 * intensity})`;
    ctx.fillText("READ", ox + 76, ly);
    ctx.textBaseline = "alphabetic";
    void w;
  };

  return { resize, draw };
};

/** Memory cells being written and read, for cards and panels. */
export const MemoryGrid: React.FC<{ size?: number | string }> = ({ size }) => {
  const scene = React.useMemo(() => createMemoryScene(), []);
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
