import { NextSeoProps } from "next-seo";
import { FiCheck } from "react-icons/fi";
import { Logo } from "./logo";

// Set NEXT_PUBLIC_SITE_URL (for example https://yourdomain.com) so link
// previews get an absolute image URL.
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

const siteConfig = {
  logo: Logo,
  seo: {
    title: "KalKram: your engineering org in 60 words",
    description:
      "KalKram reads Jira, Slack, Docs and GitHub, then gives engineering leaders a 60-word AI summary of every project, risk and sprint.",
    openGraph: {
      type: "website",
      siteName: "KalKram",
      images: [
        {
          url: `${siteUrl}/api/og`,
          width: 1200,
          height: 630,
          alt: "KalKram: your whole engineering org, in 60 words.",
        },
      ],
    },
    twitter: {
      cardType: "summary_large_image",
    },
  } as NextSeoProps,
  privacyUrl: "/privacy",
  header: {
    links: [
      { label: "How it works", id: "how-it-works", href: "" },
      { label: "Features", id: "features", href: "" },
      { label: "FAQ", id: "faq", href: "" },
      { label: "Request access", id: "waitlist", href: "", cta: true },
    ] as Array<{
      label: string;
      id: string;
      href: string;
      cta?: boolean;
    }>,
  },
  footer: {
    contactEmail: "yashrajshukla48@gmail.com",
    linkedin: "https://www.linkedin.com/company/kalkram",
  },
  signup: {
    title: "KalKram - AI Agent to give you summaries of the tasks your team is working on",
    features: [
      {
        icon: FiCheck,
        title: "Personal Productivity",
        description: "AI Project and Team level summaries",
      },
      {
        icon: FiCheck,
        title: "Artificial Intelligence",
        description: "Find exactly what did the team get done this week?",
      },
      {
        icon: FiCheck,
        title: "AI Agentic",
        description:
          "Helping engineering teams get AI summaries of projects and teams",
      },
      {
        icon: FiCheck,
        title: "Newsletter Summaries",
        description: "Get weekly and monthly summaries of your organisation",
      },
    ],
  },
};

export default siteConfig;
