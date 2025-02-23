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
      <SEO
        title="KalKram"
        description="KalKram helps engineering leaders get AI summaries of ongoing projects & team"
      />
      <Box>
        <HeroSection />
        <WaitlistSection />
      </Box>
    </Box>
  );
};

const HeroSection: React.FC = () => {
  const [scrollPosition, setScrollPosition] = React.useState(0);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box position="relative" overflow="hidden" minHeight="100vh">
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
                  Stay Informed.
                  <Br />
                  Updates about your organisation in 60 words!
                </Text>
              </FallInPlace>
            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium">
                KalKram helps engineering leaders get<Em> AI summaries </Em>
                <Br /> of ongoing projects & team
              </FallInPlace>
            }
          >
            <FallInPlace delay={0.8}>
              <HStack pt="4" pb="12" spacing="8"></HStack>
              <ButtonGroup spacing={4} alignItems="center"></ButtonGroup>
            </FallInPlace>
          </Hero>
          <Box
            position={{ base: "relative", lg: "absolute" }}
            left={{ lg: "60%", xl: "55%" }}
            width={{ base: "100%", lg: "400px" }}
            height={{ base: "480px", lg: "480px" }}
            margin="0 auto"
            borderRadius="2xl"
            overflow="hidden"
          >
            <FallInPlace delay={1}>
              <Box
                position="relative"
                width="100%"
                height="100%"
                overflow="hidden"
                borderRadius="2xl"
              >
                <Box
                  style={{
                    transform: `translateY(${
                      scrollPosition < 200
                        ? "0px"
                        : scrollPosition < 400
                        ? "-480px"
                        : "-960px"
                    })`,
                    transition: "transform 0.5s ease-in-out",
                    height: "1440px",
                  }}
                >
                  {/* Screen 1 */}
                  <Box
                    position="relative"
                    width="100%"
                    height="480px"
                    borderRadius="2xl"
                    overflow="hidden"
                  >
                    <Image
                      src="/static/screenshots/screen1.png"
                      alt="Screen 1"
                      layout="fill"
                      objectFit="contain"
                      quality={75}
                      priority
                    />
                  </Box>

                  {/* Screen 2 */}
                  <Box
                    position="relative"
                    width="100%"
                    height="480px"
                    borderRadius="2xl"
                    overflow="hidden"
                  >
                    <Image
                      src="/static/screenshots/screen2.png"
                      alt="Screen 2"
                      layout="fill"
                      objectFit="contain"
                      quality={75}
                      priority
                    />
                  </Box>

                  {/* Screen 3 */}
                  <Box
                    position="relative"
                    width="100%"
                    height="480px"
                    borderRadius="2xl"
                    overflow="hidden"
                  >
                    <Image
                      src="/static/screenshots/screen3.png"
                      alt="Screen 3"
                      layout="fill"
                      objectFit="contain"
                      quality={75}
                      priority
                    />
                  </Box>
                </Box>
              </Box>
            </FallInPlace>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

// Waitlist Section remains unchanged
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
            ✨ Early access waitlist
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

export default Home;
