import { Button } from "@chakra-ui/react";
import { Link } from "@saas-ui/react";
import { NextSeoProps } from "next-seo";
import { FaGithub, FaSquareXTwitter } from "react-icons/fa6";
import { FiCheck } from "react-icons/fi";
import { Logo } from "./logo";

const siteConfig = {
  logo: Logo,
  seo: {
    title: "KalKram",
    description: "AI Agentic Time Tracking Tool",
  } as NextSeoProps,
  termsUrl: "#",
  privacyUrl: "#",
  header: {
    links: [
      {
        id: "features",
        label: "Features",
      },
      {
        id: "pricing",
        label: "Pricing",
      },
      {
        id: "faq",
        label: "FAQ",
      },
      {
        label: "Login",
        href: "/login",
      },
      {
        label: "Sign Up",
        href: "/signup",
        variant: "primary",
      },
    ],
  },
  footer: {
    copyright: (
      <>
        Built by{" "}
        <Link target="_blank" href="https://twitter.com/whynesspower">
          whynesspower
        </Link>
      </>
    ),
    links: [
      {
        href: "mailto:yashrajshukla48@gmail.com",
        label: "Contact",
      },
      {
        href: "https://x.com/whynesspower",
        label: <FaSquareXTwitter size="14" />,
      },
      {
        href: "https://github.com/whynesspower",
        label: <FaGithub size="14" />,
      },
    ],
  },
  signup: {
    title: "Start Tracking time with KalKram",
    features: [
      {
        icon: FiCheck,
        title: "Personal Productivity",
        description: "Track every minute of when you work",
      },
      {
        icon: FiCheck,
        title: "Artificial Intelligence",
        description:
          "Get personalised AI to analyse if you have been improving",
      },
      {
        icon: FiCheck,
        title: "AI Agentic",
        description:
          "Compose tasks together to get future insights and past trends.",
      },
      {
        icon: FiCheck,
        title: "Newsletter Summaries",
        description: "Get weekly and monthly summaries of your grind",
      },
    ],
  },
};

export default siteConfig;
