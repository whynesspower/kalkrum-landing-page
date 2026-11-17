import type { ReactNode } from "react";
import { site } from "@/content/site";

/** A button that opens a new email to the lab. The address is the one in content/site.ts. */
export function TalkToUsButton({ children, className }: { children: ReactNode; className?: string }) {
  const subject = encodeURIComponent("Early access to KalKram");
  return (
    <a className={className} href={`mailto:${site.contactEmail}?subject=${subject}`}>
      {children}
    </a>
  );
}
