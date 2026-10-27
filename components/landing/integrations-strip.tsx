import * as React from "react";
import { Box, Container, Flex, Icon, Text } from "@chakra-ui/react";
import { SiGithub, SiGoogledocs, SiJira, SiSlack } from "react-icons/si";
import { Reveal } from "components/motion/reveal";

const TOOLS = [
  { name: "Jira", icon: SiJira },
  { name: "Slack", icon: SiSlack },
  { name: "Google Docs", icon: SiGoogledocs },
  { name: "GitHub", icon: SiGithub },
];

export const IntegrationsStrip: React.FC = () => (
  <Box py={{ base: 8, md: 10 }} borderTopWidth="1px" borderBottomWidth="1px" borderColor="kk.line">
    <Container maxW="container.xl" px={{ base: 5, md: 8 }}>
      <Reveal>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="center"
          gap={{ base: 5, md: 12 }}
        >
          <Text fontSize="md" color="kk.muted">
            Reads the tools your team already uses
          </Text>
          <Flex
            as="ul"
            listStyleType="none"
            wrap="wrap"
            justify="center"
            gap={{ base: 6, md: 10 }}
          >
            {TOOLS.map(({ name, icon }) => (
              <Flex as="li" key={name} align="center" gap="2.5" color="kk.fg">
                <Icon as={icon} boxSize="5" aria-hidden />
                <Text fontWeight="600" fontSize="md">
                  {name}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Reveal>
    </Container>
  </Box>
);
