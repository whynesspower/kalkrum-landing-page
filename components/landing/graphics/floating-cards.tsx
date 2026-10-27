import * as React from "react";
import {
  Box,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FiActivity, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import { SiGithub, SiGoogledocs, SiJira, SiSlack } from "react-icons/si";
import { Parallax, ParallaxProps } from "components/motion/parallax";

const bob = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-9px); }
`;

interface CardProps extends Omit<ParallaxProps, "children"> {
  bobSeconds?: number;
  children: React.ReactNode;
}

const FloatingCard: React.FC<CardProps> = ({
  children,
  bobSeconds = 6,
  ...rest
}) => {
  const bg = useColorModeValue("rgba(255,255,255,0.88)", "rgba(22,22,32,0.72)");
  return (
    <Parallax
      position="absolute"
      display={{ base: "none", lg: "block" }}
      zIndex={2}
      {...rest}
    >
      <Box
        w="244px"
        p="3.5"
        borderRadius="16px"
        borderWidth="1px"
        borderColor="kk.line"
        bg={bg}
        backdropFilter="blur(16px) saturate(160%)"
        boxShadow="0 24px 60px -24px rgba(0,0,0,0.65)"
        animation={`${bob} ${bobSeconds}s ease-in-out infinite`}
      >
        {children}
      </Box>
    </Parallax>
  );
};

const Tile: React.FC<{ color: string; icon: any }> = ({ color, icon }) => (
  <Flex
    flexShrink={0}
    w="34px"
    h="34px"
    align="center"
    justify="center"
    borderRadius="10px"
    bg={`${color}22`}
    color={color}
  >
    <Icon as={icon} boxSize="4" aria-hidden />
  </Flex>
);

/** UI cards that hang around the dashboard and move at different depths. */
export const FloatingCards: React.FC = () => (
  <Box aria-hidden position="absolute" inset="0" pointerEvents="none">
    <FloatingCard
      distance={90}
      top="5%"
      left={{ lg: "-1%", xl: "-5%" }}
      bobSeconds={6.5}
    >
      <Flex gap="3">
        <Tile color="#34d399" icon={FiActivity} />
        <Box flex="1" minW="0">
          <Text fontSize="xs" color="kk.muted">
            Project status
          </Text>
          <Text fontSize="sm" fontWeight="600" noOfLines={1}>
            Authentication Enhancement
          </Text>
          <Box mt="2" h="5px" borderRadius="full" bg="kk.line">
            <Box h="full" w="55%" borderRadius="full" bg="#34d399" />
          </Box>
          <Text mt="1.5" fontSize="xs" color="kk.muted">
            On track · 55%
          </Text>
        </Box>
      </Flex>
    </FloatingCard>

    <FloatingCard
      distance={55}
      top="17%"
      right={{ lg: "-1%", xl: "-5%" }}
      bobSeconds={7.5}
    >
      <Flex gap="3">
        <Tile color="#f5a524" icon={FiAlertTriangle} />
        <Box>
          <Text fontSize="xs" color="kk.muted">
            Threat alert
          </Text>
          <Text fontSize="sm" fontWeight="600" lineHeight="1.35">
            EU config reached the US cluster
          </Text>
        </Box>
      </Flex>
    </FloatingCard>

    <FloatingCard
      distance={65}
      bottom="26%"
      left={{ lg: "-1%", xl: "-4%" }}
      bobSeconds={7}
    >
      <Flex gap="3" align="center">
        <Tile color="#a18bff" icon={FiCheckCircle} />
        <Box>
          <Text fontSize="sm" fontWeight="600">
            Sprint summary ready
          </Text>
          <Text fontSize="xs" color="kk.muted">
            60 words · just now
          </Text>
        </Box>
      </Flex>
    </FloatingCard>

    <FloatingCard
      distance={110}
      bottom="12%"
      right={{ lg: "-1%", xl: "-4%" }}
      bobSeconds={6}
    >
      <Flex gap="3" align="center" color="kk.muted">
        <Icon as={SiJira} boxSize="4" />
        <Icon as={SiSlack} boxSize="4" />
        <Icon as={SiGithub} boxSize="4" />
        <Icon as={SiGoogledocs} boxSize="4" />
      </Flex>
      <Text mt="2.5" fontSize="sm" fontWeight="600">
        4 tools synced
      </Text>
      <Text fontSize="xs" color="kk.muted">
        Updated 2 min ago
      </Text>
    </FloatingCard>
  </Box>
);
