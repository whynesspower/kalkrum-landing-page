import { Button } from "@chakra-ui/react";
import { Link } from "@saas-ui/react";
import { NextSeoProps } from "next-seo";
import { FaGithub, FaSquareXTwitter, FaLinkedin } from "react-icons/fa6";
import { FiCheck } from "react-icons/fi";
import { Logo } from "./logo";

const siteConfig = {
  logo: Logo,
  seo: {
    title: "KalKram",
    description: "Helping engineering teams get AI summaries of projects and teams",
  } as NextSeoProps,
  termsUrl: "#",
  privacyUrl: "#",
  header: {
    links: [
      {
        label: "Join Waitlist",
        id: "waitlist",
        href: "",
      },

    ],
  },
  footer: {

    links: [
      {
        href: "mailto:yashrajshukla48@gmail.com",
        label: "Contact",
      },
      {
        href: "https://www.linkedin.com/company/kalkram",
        label: <FaLinkedin size="14" />,
      },
      // {
      //   href: "https://github.com/whynesspower",
      //   label: <FaGithub size="14" />,
      // },
    ],
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
        description:
          "Find exactly what did the team get done this week?",
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
        description: "Get weekly and monthly summaries of your orngaisation"
      },
    ],
  },
};

export default siteConfig;
