import * as React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import {
  Container,
  Box,
  Stack,
  HStack,
  ButtonGroup,
  Button,
  Icon,
  Heading,
  Text,
  Wrap,
  Tag,
  useClipboard,
  IconButton,
  VStack,
  Input,
  Flex,
} from "@chakra-ui/react";
import { SEO } from "components/seo/seo";

import { FallInPlace } from "components/motion/fall-in-place";
import { Hero } from "components/hero";
import { Link, Br } from "@saas-ui/react";
import { Em } from "components/typography";
import { NextjsLogo, ChakraLogo } from "components/logos";
import {
  FiArrowRight,
  FiBox,
  FiCheck,
  FiCode,
  FiCopy,
  FiFlag,
  FiGrid,
  FiLock,
  FiSearch,
  FiSliders,
  FiSmile,
  FiTerminal,
  FiThumbsUp,
  FiToggleLeft,
  FiTrendingUp,
  FiUserPlus,
} from "react-icons/fi";
import { Features } from "components/features";
import { BackgroundGradient } from "components/gradients/background-gradient";
import { Faq } from "components/faq";
import { Pricing } from "components/pricing/pricing";
import { Section } from "components/section";
import { ButtonLink } from "components/button-link/button-link";
import { Testimonial, Testimonials } from "components/testimonials";

import faq from "data/faq";
import testimonials from "data/testimonials";
import pricing from "data/pricing";

import {
  Highlights,
  HighlightsItem,
  HighlightsTestimonialItem,
} from "components/highlights";

const Home: NextPage = () => {
  return (
    <Box>
      <SEO title="KalKram" description="AI Agentic Time Tracking Tool" />
      <Box>
        <HeroSection />

        <HighlightsSection />

        {/* <FeaturesSection /> */}

        <TestimonialsSection />
        <PricingSection />

        {/* <FaqSection /> */}
        <WaitlistSection />
      </Box>
    </Box>
  );
};

const HeroSection: React.FC = () => {
  return (
    <Box position="relative" overflow="hidden">
      <BackgroundGradient height="100%" zIndex="-1" />
      <Container maxW="container.xl" pt={{ base: 40, lg: 60 }} pb="40">
        <Stack direction={{ base: "column", lg: "row" }} alignItems="center">
          <Hero
            id="home"
            justifyContent="flex-start"
            px="0"
            title={
              <FallInPlace>
                <Text fontSize={{ base: "4xl", lg: "5xl" }}>
                  10,000 hours
                  <Br /> is all you need!
                </Text>
              </FallInPlace>
            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium">
                KalKrum (कालक्रम) is an <Em> AI Agent for Time Tracking! </Em>
                <Br /> It gives you observability over your own self.
                {/* Works on
                the paradigm that if you clock <Em> Ten Thousand Hours</Em>{" "}
                doing a particular art form,the universe bends and paves the way
                for you.  */}
                &nbsp; Don't work on estimates, track your grind today.
              </FallInPlace>
            }
          >
            <FallInPlace delay={0.8}>
              <HStack pt="4" pb="12" spacing="8">
                {/* <NextjsLogo height="28px" /> <ChakraLogo height="20px" /> */}
              </HStack>

              <ButtonGroup spacing={4} alignItems="center">
                {/* <ButtonLink colorScheme="primary" size="lg" href="#waitlist">
                  Join Waitlist
                </ButtonLink> */}
                {/* <ButtonLink
                  size="lg"
                  href="https://demo.saas-ui.dev"
                  variant="outline"
                  rightIcon={
                    <Icon
                      as={FiArrowRight}
                      sx={{
                        transitionProperty: "common",
                        transitionDuration: "normal",
                        ".chakra-button:hover &": {
                          transform: "translate(5px)",
                        },
                      }}
                    />
                  }
                >
                  View demo
                </ButtonLink> */}
              </ButtonGroup>
            </FallInPlace>
            <WaitlistSection />
          </Hero>
          <Box
            height="600px"
            position="absolute"
            display={{ base: "none", lg: "block" }}
            left={{ lg: "60%", xl: "55%" }}
            width="80vw"
            maxW="1100px"
            margin="0 auto"
          >
            <FallInPlace delay={1}>
              <Box overflow="hidden" height="100%">
                <Image
                  src="/static/screenshots/list.png"
                  layout="fixed"
                  width={1200}
                  height={762}
                  alt="Screenshot of a ListPage in Saas UI Pro"
                  quality="75"
                  priority
                />
              </Box>
            </FallInPlace>
          </Box>
        </Stack>
      </Container>

      <Features
        id="benefits"
        columns={[1, 2, 4]}
        iconSize={4}
        innerWidth="container.xl"
        pt="20"
        features={[
          {
            title: "Ultimate Productivity Tool",
            icon: FiSmile,
            description:
              "You can't improve what you can't measure, Track every minute of when you effort. Follow the principal of 10,000 hours to mastery",
            iconPosition: "left",
            delay: 0.6,
          },
          {
            title: "AI Agentic Time Tracking",
            icon: FiSliders,
            description:
              "An aggregation on all of your pomodoro timers, get ground reality if your really shipped anything substancial this week or not",
            iconPosition: "left",
            delay: 0.8,
          },
          {
            title: "Personalised AI coach",
            icon: FiGrid,
            description:
              "Tell the coach about your personal goals and then the coach personally train you to achieve that goal via personalised updates every day ",
            delay: 1,
          },
          {
            title: "Newsletter Summaries",
            icon: FiThumbsUp,
            description:
              "Get weekly and monthly summaries of your grind, what are the things which were correct this week, where did you mess up. Restrospect",
            iconPosition: "left",
            delay: 1.1,
          },
        ]}
        reveal={FallInPlace}
      />
    </Box>
  );
};

const HighlightsSection = () => {
  const { value, onCopy, hasCopied } = useClipboard("yarn add @saas-ui/react");

  return (
    <Highlights>
      <HighlightsItem
        colSpan={[1, null, 2]}
        title="The magic number of true expertise"
      >
        <VStack alignItems="flex-start" spacing="8">
          <Text color="muted" fontSize="xl">
            Practice isn't the thing you do once and you're good . It's the
            thing you do that makes you good. Researchers have settled on what
            they believe is the magic number of true expertise: 10,000 hours.
            Surprisingly the vast majority of your problems will be solved if
            you simply put in more amount of hours developing the art. It is as
            simple as that. Put in the work, and then probablity will happen.
            <Em></Em>
          </Text>

          {/* <Flex
            rounded="full"
            borderWidth="1px"
            flexDirection="row"
            alignItems="center"
            py="1"
            ps="8"
            pe="2"
            bg="primary.900"
            _dark={{ bg: "gray.900" }}
          >
            <Box>
              <Text color="yellow.400" display="inline">
                yarn add
              </Text>{" "}
              <Text color="cyan.300" display="inline">
                @saas-ui/react
              </Text>
            </Box>
            <IconButton
              icon={hasCopied ? <FiCheck /> : <FiCopy />}
              aria-label="Copy install command"
              onClick={onCopy}
              variant="ghost"
              ms="4"
              isRound
              color="white"
            />
          </Flex> */}
        </VStack>
      </HighlightsItem>
      <HighlightsItem title="It is as easy as that">
        <Text color="muted" fontSize="lg">
          Most of us don't have observability over our life. We are clueless
          zombies who can't even remember what we had for breakfast yesterday
          morning. The art of improving the game is as easy as gamifying the
          process of grind. Personalised AI to overlook your progress
        </Text>
      </HighlightsItem>
      <HighlightsTestimonialItem
        name="Yashraj Shukla"
        description="Founder"
        avatar="/static/images/avatar.png"
        gradient={["pink.200", "purple.500"]}
      >
        “Much of my success can be attributed to my habit of tracking the number
        of hours I used to study. I really wanted to cross that mark of 10,000
        hours and That's why I started clocking those hours. And now I know the
        exact number of hours I have programmed in my life  ~6,332 hours!"
      </HighlightsTestimonialItem>
      <HighlightsItem
        colSpan={[1, null, 2]}
        title="You can't improve what you can't measure"
      >
        <Text color="muted" fontSize="lg">
          When you first start tracking your time, you get a reality check that
          you don't actually get that much work done as much you think you do.
          Tracked time is the ultimate source of truth. It tells you if you were
          more productive this week or the previous one, things which went
          correct or downright wrong
        </Text>
        <Wrap mt="8">
          {[
            "tracks your grind",
            "final source of truth",
            "personal accountability",
            "10x better than pomodoro timers",
            "proven productivity methodology",
            "AI reports and analysis",
            "Weekly & Monthly summary",
            "Newsletter summaries for introspection",
          ].map((value) => (
            <Tag
              key={value}
              variant="subtle"
              colorScheme="purple"
              rounded="full"
              px="3"
            >
              {value}
            </Tag>
          ))}
        </Wrap>
      </HighlightsItem>
    </Highlights>
  );
};

const FeaturesSection = () => {
  return (
    <Features
      id="features"
      title={
        <Heading
          lineHeight="short"
          fontSize={["2xl", null, "4xl"]}
          textAlign="left"
          as="p"
        >
          Not your standard
          <Br /> dashboard template.
        </Heading>
      }
      description={
        <>
          Saas UI Pro includes everything you need to build modern frontends.
          <Br />
          Use it as a template for your next product or foundation for your
          design system.
        </>
      }
      align="left"
      columns={[1, 2, 3]}
      iconSize={4}
      features={[
        {
          title: "Components.",
          icon: FiBox,
          description:
            "All premium components are available on a private NPM registery, no more copy pasting and always up-to-date.",
          variant: "inline",
        },
        {
          title: "Starterkits.",
          icon: FiLock,
          description:
            "Example apps in Next.JS, Electron. Including authentication, billing, example pages, everything you need to get started FAST.",
          variant: "inline",
        },
        {
          title: "Documentation.",
          icon: FiSearch,
          description:
            "Extensively documented, including storybooks, best practices, use-cases and examples.",
          variant: "inline",
        },
        {
          title: "Onboarding.",
          icon: FiUserPlus,
          description:
            "Add user onboarding flows, like tours, hints and inline documentation without breaking a sweat.",
          variant: "inline",
        },
        {
          title: "Feature flags.",
          icon: FiFlag,
          description:
            "Implement feature toggles for your billing plans with easy to use hooks. Connect Flagsmith, or other remote config services once you're ready.",
          variant: "inline",
        },
        {
          title: "Upselling.",
          icon: FiTrendingUp,
          description:
            "Components and hooks for upgrade flows designed to make upgrading inside your app frictionless.",
          variant: "inline",
        },
        {
          title: "Themes.",
          icon: FiToggleLeft,
          description:
            "Includes multiple themes with darkmode support, always have the perfect starting point for your next project.",
          variant: "inline",
        },
        {
          title: "Generators.",
          icon: FiTerminal,
          description:
            "Extend your design system while maintaininig code quality and consistency with built-in generators.",
          variant: "inline",
        },
        {
          title: "Monorepo.",
          icon: FiCode,
          description: (
            <>
              All code is available as packages in a high-performance{" "}
              <Link href="#">Turborepo</Link>, you have full control to modify
              and adjust it to your workflow.
            </>
          ),
          variant: "inline",
        },
      ]}
    />
  );
};

const TestimonialsSection = () => {
  const columns = React.useMemo(() => {
    return testimonials.items.reduce<Array<typeof testimonials.items>>(
      (columns, t, i) => {
        columns[i % 3].push(t);

        return columns;
      },
      [[], [], []]
    );
  }, []);

  return (
    <Testimonials
      title={testimonials.title}
      columns={[1, 2, 3]}
      innerWidth="container.xl"
    >
      <>
        {columns.map((column, i) => (
          <Stack key={i} spacing="8" height="100%">
            {column.map((t, i) => (
              <Testimonial key={i} {...t} />
            ))}
          </Stack>
        ))}
      </>
    </Testimonials>
  );
};

// Waitlist Section - Integrated directly into the index file
const WaitlistSection: React.FC = () => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("entry.1115472667", email);

    try {
      await fetch(
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeBOfXMilwtbDavfuqd1GmTTbTXuklbx8-i5BSW_aYzPfMRYA/formResponse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );
      alert("Thank you for signing up!");
    } catch (error) {
      alert("Thank you for signing up!");
    }
  };

  return (
    <Section py={0} px={0} display="flex" justifyContent="center">
      <Container maxW="container.md">
        <Flex
          direction="column"
          align="center"
          p={4}
          my={0}
          borderRadius="lg"
          boxShadow="lg"
        >
          <Text fontSize="2xl" mb={4} textAlign="center">
            ✨ Join the waitlist to get early access to <strong>KalKram</strong>
            !
          </Text>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              mb={4}
              size="lg"
              borderColor="primary.300"
              _focus={{ borderColor: "primary" }}
            />
            <Button
              type="submit"
              colorScheme="primary"
              size="lg"
              width="100%"
              rightIcon={<FiArrowRight />}
            >
              Join Waitlist
            </Button>
          </form>
        </Flex>
      </Container>
    </Section>
  );
};

const PricingSection = () => {
  return (
    <Pricing {...pricing}>
      <Text p="8" textAlign="center" color="muted"></Text>
    </Pricing>
  );
};

const FaqSection = () => {
  return <Faq {...faq} />;
};
export default Home;

export async function getStaticProps() {
  return {
    props: {
      announcement: {
        title: "Build with sprit by whynesspower.com 🚀 ",
        description: '<img src="" />',
        href: "https://x.com/whynesspower",
        action: false,
      },
    },
  };
}
