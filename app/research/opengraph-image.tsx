import { ogSize, renderOg } from "@/lib/og";

export const alt = "KalKram research results";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ eyebrow: "Research", title: "What the system has found." });
}
