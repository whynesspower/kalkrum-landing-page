import { HStack, Text } from "@chakra-ui/react";

export default {
  title: "Pricing for KalKram",
  description:
    "For a limited period of time: Unlimited free AI evaluations and monthly recape reports!",
  plans: [
    {
      id: "oss",
      title: "Free Tier",
      description: "Basic time tracker, with simple reports and graphs",
      price: "Free",
      features: [
        {
          title: "Set unlimited timers",
        },
        {
          title: "Add past entries",
        },
        {
          title: "In depth reports",
        },
        {
          title: "Visual graphs",
        },
        {
          title: "Hotkeys",
        },
        {
          title: "Basic analystics without AI aid or coach",
        },
      ],
      action: {
        href: "#waitlist",
      },
    },
    {
      id: "bootstrap",
      title: "Premium Tier",
      description:
        "Complete AI Agent capabilities to coach you and give indepth analysis.",
      price: "Free",
      isRecommended: true,
      features: [
        {
          title: "Everything in the free tier",
        },
        {
          title: "AI Reports and summaries",
        },
        {
          title: "Email newsletter for retrospection",
        },
        {
          title: "Advanced time tracking to keep you on track towards your goal",
        },
        {
          title: "Multiple themes",
        },
        null,
        {
          title: "Private beta access",
          iconColor: "green.500",
        },
      ],
      action: {
        href: "#waitlist",
      },
    },
  ],
};
