import { ogSize, renderOg } from "@/lib/og";

export const alt = "KalKram: every discovery should make the next one cheaper.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ eyebrow: "A research lab", title: "We are building superintelligence for discovery." });
}
