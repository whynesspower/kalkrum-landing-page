import * as React from "react";
import type { NextPage } from "next";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import siteConfig from "data/config";
import { Reveal } from "components/motion/reveal";
import { DashedRule, LabHeading, LabSection, Lead } from "components/lab/primitives";
import { Backdrop } from "components/lab/graphics/backdrop";
import { RoleRows } from "components/lab/careers/role-rows";

const HOW_TO_APPLY = [
  "Email us.",
  "Send the best thing you have made.",
  "Tell us what you would do about forgetting.",
];

const Careers: NextPage = () => {
  const email = siteConfig.footer.contactEmail;
  const mail = `mailto:${email}?subject=${encodeURIComponent("Introduction to KalKram")}`;

  return (
    <Box>
      <SEO
        title="Careers | KalKram"
        description="We are hiring a very small number of researchers and engineers who want to build the first mind that learns from its own life."
      />

      <Box
        as="section"
        position="relative"
        overflow="hidden"
        minH={{ base: "auto", md: "80vh" }}
        display="flex"
        alignItems="center"
        pt={{ base: 32, md: 40 }}
        pb={{ base: 20, md: 28 }}
      >
        <Box position="absolute" inset="0" aria-hidden>
          <Backdrop variant="tokens" />
        </Box>
        <Box position="relative" zIndex={1} w="full" maxW="container.xl" mx="auto" px={{ base: 5, md: 8 }}>
          <Heading
            as="h1"
            fontFamily="display"
            textTransform="uppercase"
            fontWeight="700"
            fontSize="clamp(2.2rem, 6.4vw, 5.6rem)"
            lineHeight="1.02"
            letterSpacing="0.04em"
            maxW="62rem"
            sx={{ textWrap: "balance" }}
          >
            We are hiring a very small number of people.
          </Heading>
          <Lead mt={8} maxW="42rem">
            Researchers and engineers who want to build the first mind that learns
            from its own life. We do not care about credentials. We care about what
            you have built and how you think.
          </Lead>
          <Button as="a" href={mail} variant="cta" mt={10}>
            Write to us
          </Button>
        </Box>
      </Box>

      <LabSection id="roles">
        <Reveal>
          <LabHeading>Roles</LabHeading>
        </Reveal>
        <Box mt={{ base: 10, md: 16 }}>
          <RoleRows email={email} />
        </Box>
      </LabSection>

      <DashedRule />

      <LabSection>
        <Box maxW="52rem">
          {HOW_TO_APPLY.map((line) => (
            <Reveal key={line}>
              <Text
                borderTopWidth="1px"
                borderColor="kk.line"
                py={{ base: 6, md: 7 }}
                fontFamily="display"
                textTransform="uppercase"
                fontWeight="700"
                fontSize="clamp(1.5rem, 3.6vw, 2.8rem)"
                lineHeight="1.1"
                letterSpacing="0.04em"
                sx={{ textWrap: "balance" }}
              >
                {line}
              </Text>
            </Reveal>
          ))}
          <Box borderTopWidth="1px" borderColor="kk.line" />
        </Box>
        <Button as="a" href={mail} variant="cta" mt={10}>
          Write to us
        </Button>
      </LabSection>
    </Box>
  );
};

export default Careers;
