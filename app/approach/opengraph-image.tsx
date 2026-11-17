import { ogSize, renderOg } from "@/lib/og";

export const alt = "How KalKram makes discoveries";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ eyebrow: "Approach", title: "Find the structure. Compile the solver. Prove it." });
}
