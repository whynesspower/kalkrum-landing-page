import { ogSize, renderOg } from "@/lib/og";

export const alt = "KalKram vision";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ eyebrow: "Vision", title: "Superintelligence will be measured in discoveries." });
}
