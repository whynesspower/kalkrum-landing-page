import { ogSize, renderOg } from "@/lib/og";

export const alt = "Contact KalKram";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ eyebrow: "Contact", title: "Bring us a problem with a checkable answer." });
}
