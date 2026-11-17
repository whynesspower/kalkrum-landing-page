import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { markPng } from "./generated/mark";

export const ogSize = { width: 1200, height: 630 };

const INK = "#f2f4f8";
const MUTED = "#8590a5";
const ACCENT = "142, 227, 255";

/** Social card shared by every page: the mark, the page title, and first light along the horizon. */
export function renderOg({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: INK,
        padding: "60px 64px 56px",
        backgroundColor: "#05060a",
        backgroundImage: `radial-gradient(ellipse 34% 9% at 50% 100%, rgba(190, 238, 255, 0.85) 0%, rgba(190, 238, 255, 0) 100%), radial-gradient(ellipse 92% 46% at 50% 100%, rgba(${ACCENT}, 0.55) 0%, rgba(${ACCENT}, 0) 100%)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markPng} width={44} height={44} alt="" />
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase" }}>{site.name}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginBottom: 36 }}>
        <div style={{ fontSize: 30, color: MUTED, marginBottom: 16 }}>{eyebrow}</div>
        <div style={{ fontSize: title.length > 48 ? 72 : 90, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2, maxWidth: 1000 }}>
          {title}
        </div>
      </div>
    </div>,
    { ...ogSize },
  );
}
