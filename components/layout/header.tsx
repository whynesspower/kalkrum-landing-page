import * as React from "react";
import {
  Box,
  BoxProps,
  Container,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Navigation from "./navigation";
import { Logo } from "./logo";
import { useScroll } from "framer-motion";
import Image from "next/image";

export interface HeaderProps extends Omit<BoxProps, "children"> {}

export const Header = (props: HeaderProps) => {
  const ref = React.useRef<HTMLHeadingElement>(null);
  const [y, setY] = React.useState(0);
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {};

  const { scrollY } = useScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  const bg = useColorModeValue("whiteAlpha.700", "rgba(29, 32, 37, 0.7)");

  return (
    <Box
      ref={ref}
      as="header"
      top="0"
      w="full"
      position="fixed"
      backdropFilter="blur(5px)"
      zIndex="sticky"
      borderColor="whiteAlpha.100"
      transitionProperty="common"
      transitionDuration="normal"
      bg={y > height ? bg : ""}
      boxShadow={y > height ? "md" : ""}
      borderBottomWidth={y > height ? "1px" : ""}
      {...props}
    >
      <Container maxW="container.2xl" px="8" py="4">
        <Flex width="full" align="center" justify="space-between">
          <Flex
            width="10%"
            align="center"
            justify="space-between"
            alignItems="center"
          >
            <Logo
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }
              }}
            />
            <Text
              fontWeight="bold"
              fontSize="xl"
              fontFamily="Arial, sans-serif"
              letterSpacing="wider"
              ml="2"
              mt="3"
            >
              KalKram
            </Text>
          </Flex>
          <Navigation />
        </Flex>
      </Container>
    </Box>
  );
};
