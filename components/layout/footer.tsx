import {
  Box,
  BoxProps,
  SimpleGrid,
  Container,
  Text,
  Stack,
  Flex,
  HStack,
  Divider,
} from "@chakra-ui/react"; // Import Divider
import Link from "next/link";
import Image from "next/image"; // Importing Image from next/image

import siteConfig from "data/config";

export interface FooterProps extends BoxProps {
  columns?: number;
}

export const Footer: React.FC<FooterProps> = (props) => {
  const { columns = 2, ...rest } = props;
  return (
    <Box bg="white" mt="8" _dark={{ bg: "gray.900" }} {...rest}>
      {/* Divider added here */}
      <Divider borderColor="gray.200" my="8" />
      <Container maxW="container.2xl" px="8" py="8">
        <SimpleGrid columns={columns}>
          <Stack spacing="8">
            <Stack alignItems="flex-start">
              <Flex align="center">
                {" "}
                {/* Aligning "KalKram" vertically */}
                <Image
                  src="/static/screenshots/kalkram.png"
                  alt="Footer Logo"
                  width={48} // Specify a width
                  height={48} // Specify a height
                />
                <Text ml="2" fontSize="xl" fontWeight="bold">
                  {" "}
                  {/* Adding margin to the left */}
                  KalKram
                </Text>
              </Flex>
              <Text fontSize="md" color="muted">
                {siteConfig.seo.description}
              </Text>
            </Stack>
            {/* <Copyright>{siteConfig.footer.copyright}</Copyright> */}
          </Stack>
          <HStack justify="flex-end" spacing="4" alignSelf="flex-end">
            {siteConfig.footer?.links?.map(({ href, label }) => (
              <FooterLink key={href} href={href}>
                {label}
              </FooterLink>
            ))}
          </HStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export interface CopyrightProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

export const Copyright: React.FC<CopyrightProps> = ({
  title,
  children,
}: CopyrightProps) => {
  let content;
  if (title && !children) {
    content = `© ${new Date().getFullYear()} - ${title}`;
  }
  return (
    <Text color="muted" fontSize="sm">
      {content || children}
    </Text>
  );
};

export const FooterLink: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
> = (props) => {
  const { children, href, ...rest } = props;
  return (
    <Link legacyBehavior href={href || "#"} target="_blank" passHref>
      <a
        style={{
          color: "inherit",
          textDecoration: "none",
          fontSize: "small",
          transition: "color 0.2s ease-in",
        }}
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
};
