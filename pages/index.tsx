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

        {/* <HighlightsSection /> */}

        {/* <FeaturesSection /> */}

        <TestimonialsSection />
        {/* <PricingSection /> */}

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
              <WaitlistSection />
            </FallInPlace>
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
            title: "Personal Productivity",
            icon: FiSmile,
            description: "Track every minute of when you work",
            iconPosition: "left",
            delay: 0.6,
          },
          {
            title: "Artificial Intelligence",
            icon: FiSliders,
            description:
              "Get personalised AI to analyse if you have been improving",
            iconPosition: "left",
            delay: 0.8,
          },
          {
            title: "AI Agentic",
            icon: FiGrid,
            description:
              "Compose tasks together to get future insights and past trends.",
            delay: 1,
          },
          {
            title: "Newsletter Summaries",
            icon: FiThumbsUp,
            description: "Get weekly and monthly summaries of your grind",
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
      <HighlightsItem colSpan={[1, null, 2]} title="Core components">
        <VStack alignItems="flex-start" spacing="8">
          <Text color="muted" fontSize="xl">
            Get started for free with <Em>30+ open source components</Em>.
            Including authentication screens with Clerk, Supabase and Magic.
            Fully functional forms with React Hook Form. Data tables with React
            Table.
          </Text>

          <Flex
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
          </Flex>
        </VStack>
      </HighlightsItem>
      <HighlightsItem title="Solid foundations">
        <Text color="muted" fontSize="lg">
          We don&apos;t like to re-invent the wheel, neither should you. We
          selected the most productive and established tools in the scene and
          build Saas UI on top of it.
        </Text>
      </HighlightsItem>
      <HighlightsTestimonialItem
        name="Renata Alink"
        description="Founder"
        avatar="/static/images/avatar.jpg"
        gradient={["pink.200", "purple.500"]}
      >
        “Saas UI helped us set up a beautiful modern UI in no time. It saved us
        hundreds of hours in development time and allowed us to focus on
        business logic for our specific use-case from the start.”
      </HighlightsTestimonialItem>
      <HighlightsItem
        colSpan={[1, null, 2]}
        title="Start your next idea two steps ahead"
      >
        <Text color="muted" fontSize="lg">
          We took care of all your basic frontend needs, so you can start
          building functionality that makes your product unique.
        </Text>
        <Wrap mt="8">
          {[
            "authentication",
            "navigation",
            "crud",
            "settings",
            "multi-tenancy",
            "layouts",
            "billing",
            "a11y testing",
            "server-side rendering",
            "documentation",
            "onboarding",
            "storybooks",
            "theming",
            "upselling",
            "unit testing",
            "feature flags",
            "responsiveness",
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
    <Section id="waitlist" py={0} px={0} display="flex" justifyContent="center">
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
              borderColor="pink.300"
              _focus={{ borderColor: "pink.500" }}
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
      <Text p="8" textAlign="center" color="muted">
        VAT may be applicable depending on your location.
      </Text>
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
