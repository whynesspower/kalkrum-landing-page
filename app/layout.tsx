import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { founders, site } from "@/content/site";
import { organizationLd } from "@/lib/seo";
import "./globals.css";

// D-DIN is the brand face, for display and for the interface.
const display = localFont({
  src: [
    { path: "../assets/fonts/ddin/D-DIN-PRO-500-Medium.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/ddin/D-DIN-PRO-700-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});
const sans = localFont({
  src: [
    { path: "../assets/fonts/ddin/D-DIN-PRO-400-Regular.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/ddin/D-DIN-PRO-500-Medium.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/ddin/D-DIN-PRO-700-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});
// Latin Modern, the typeface mathematics is published in, sets the text of the research papers.
const serif = localFont({
  src: [
    { path: "../assets/fonts/lm/lmroman10-regular.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/lm/lmroman10-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});

const homeTitle = `${site.name} — Superintelligence for discovery`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: homeTitle, template: `%s — ${site.name}` },
  description: site.metaDescription,
  applicationName: site.name,
  authors: founders.map((f) => ({ name: f.name, url: f.url })),
  creator: site.name,
  publisher: site.legalName,
  category: "science",
  keywords: [
    "KalKram",
    "AI for science",
    "automated discovery",
    "AI research lab",
    "verified discovery",
    "combinatorial search",
    "Hadamard matrices",
    "difference sets",
    "quantum error correction",
    "coding theory",
    "SAT solving",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    url: "/",
    title: homeTitle,
    description: site.shortDescription,
  },
  twitter: { card: "summary_large_image", title: homeTitle, description: site.shortDescription },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="alternate" type="text/plain" title="LLM summary" href="/llms.txt" />
        <JsonLd data={organizationLd()} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
