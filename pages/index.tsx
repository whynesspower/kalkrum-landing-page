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
import { FiArrowRight } from "react-icons/fi";
import { Features } from "components/features";
import { BackgroundGradient } from "components/gradients/background-gradient";
import { Faq } from "components/faq";
import { Pricing } from "components/pricing/pricing";
import { Section } from "components/section";
import { ButtonLink } from "components/button-link/button-link";
import { Testimonial, Testimonials } from "components/testimonials";

const Home: NextPage = () => {
  return (
    <Box>
      <SEO title="KalKram" description="AI Agentic Time Tracking Tool" />
      <Box>
        <HeroSection />
        <Box display={{ base: "block", md: "none" }}>
          <WaitlistSection />
        </Box>
      </Box>
    </Box>
  );
};

const HeroSection: React.FC = () => {
  return (
    <Box position="relative" overflow="hidden">
      <BackgroundGradient height="100%" zIndex="-1" />
      <Container
        maxW="container.xl"
        pt={{ base: 20, lg: 60 }} // Reduced padding-top on mobile from 40 to 20
        pb={{ base: 8, lg: 40 }} // Reduced padding-bottom on mobile from 40 to 8
      >
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
                of ongoing projects & team
              </FallInPlace>
            }
          >
            <Box display={{ base: "none", md: "block" }} pt={20}>
              <WaitlistSection />
            </Box>
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
              <Box
                overflow="hidden"
                height="100%"
                borderRadius="20px"
                boxShadow="0 4px 8px rgba(0, 0, 0, 0.5)"
              >
                <Image
                  src="/static/screenshots/list.png"
                  layout="fixed"
                  width={1200}
                  height={762}
                  alt="Screenshot of a ListPage in Saas UI Pro"
                  quality="75"
                  priority
                  style={{ borderRadius: "20px" }}
                />
              </Box>
            </FallInPlace>
          </Box>
        </Stack>
      </Container>
    </Box>
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
      setEmail(""); // Reset the input field to empty after submission
    } catch (error) {
      alert("Thank you for signing up!");
      setEmail(""); // Reset the input field to empty after submission
    }
  };

  return (
    <Section
      id="waitlist"
      py={{ base: 4, md: 0 }} // Reduced padding on mobile from 0 to 4 for minimal spacing
      px={0}
      display="flex"
      justifyContent="center"
    >
      <Container maxW="container.md">
        <Flex
          direction="column"
          align="center"
          p={4}
          my={{ base: 0, md: 0 }} // Removed margin on mobile to reduce gap
          borderRadius="lg"
          boxShadow="lg"
        >
          <Text fontSize="2xl" mb={4} textAlign="center">
            ✨ Early access waitlist <strong>KalKram</strong>!
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
