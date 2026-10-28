import * as React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  BoxProps,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/react";
import {
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import siteConfig from "data/config";
import { MotionBox } from "components/motion/box";
import { duration, ease } from "lib/motion";
import { track } from "lib/posthog";
import { Logo } from "./logo";

export interface HeaderProps extends Omit<BoxProps, "children"> {}

const LINKS = siteConfig.nav;
const JOIN_HREF = "/careers";

/** Links with a hash (such as /#vision) never count as the active page. */
const isActiveLink = (href: string, pathname: string) =>
  !href.includes("#") && href === pathname;

export const Header = (props: HeaderProps) => {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState<string | null>(null);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  React.useEffect(() => {
    setScrolled(scrollY.get() > 12);
    return scrollY.on("change", (v) => setScrolled(v > 12));
  }, [scrollY]);

  // Close the mobile menu on Escape, outside clicks, and navigation.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);
  React.useEffect(() => {
    const close = () => setOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  const pillBg = scrolled ? "rgba(8,10,16,0.82)" : "rgba(8,10,16,0.5)";
  const highlight = "whiteAlpha.200";
  const activeHref = LINKS.find((l) => isActiveLink(l.href, router.pathname))?.href ?? null;
  const current = hovered ?? activeHref;

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="sticky"
      pt={{ base: 3, md: 4 }}
      px={{ base: 3, md: 6 }}
      pointerEvents="none"
      {...props}
    >
      <MotionBox
        ref={wrapRef}
        position="relative"
        mx="auto"
        w="full"
        pointerEvents="auto"
        initial={false}
        animate={{ maxWidth: scrolled ? 880 : 1000 }}
        transition={{ duration: duration.slow, ease }}
      >
        <Box
          position="relative"
          overflow="hidden"
          display="grid"
          gridTemplateColumns={{ base: "1fr auto", md: "1fr auto 1fr" }}
          alignItems="center"
          h="56px"
          pl={{ base: 4, md: 5 }}
          pr="2"
          borderRadius="full"
          borderWidth="1px"
          borderColor="kk.line"
          bg={pillBg}
          backdropFilter="saturate(180%) blur(18px)"
          boxShadow={
            scrolled
              ? "0 12px 40px -14px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)"
              : "inset 0 1px 0 rgba(255,255,255,0.06)"
          }
          transition="background .3s ease, box-shadow .3s ease"
        >
          {/* Brand */}
          <Flex align="center" gap="2.5" w="fit-content">
            <Logo
              size={30}
              onClick={(e) => {
                if (router.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
                }
              }}
            />
            <Text
              as={NextLink}
              href="/"
              aria-hidden
              tabIndex={-1}
              fontFamily="mono"
              fontWeight="500"
              fontSize="sm"
              letterSpacing="0.18em"
              textTransform="uppercase"
            >
              KalKram
            </Text>
          </Flex>

          {/* Links */}
          <HStack
            as="nav"
            aria-label="Primary"
            display={{ base: "none", md: "flex" }}
            spacing="0"
            onMouseLeave={() => setHovered(null)}
          >
            {LINKS.map(({ label, href }) => (
              <Link
                key={href}
                as={NextLink}
                href={href}
                position="relative"
                px="3.5"
                py="2"
                fontFamily="mono"
                fontSize="xs"
                letterSpacing="0.12em"
                textTransform="uppercase"
                color={current === href ? "kk.fg" : "kk.muted"}
                aria-current={activeHref === href ? "page" : undefined}
                transition="color .2s ease"
                _hover={{ textDecoration: "none", color: "kk.fg" }}
                onMouseEnter={() => setHovered(href)}
                onFocus={() => setHovered(href)}
                onBlur={() => setHovered(null)}
              >
                {current === href && (
                  <MotionBox
                    layoutId="nav-highlight"
                    position="absolute"
                    inset="0"
                    borderRadius="full"
                    bg={highlight}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <Box as="span" position="relative">
                  {label}
                </Box>
              </Link>
            ))}
          </HStack>

          {/* Actions */}
          <HStack spacing="1.5" justifySelf="end">
            <Button
              as={NextLink}
              href={JOIN_HREF}
              variant="cta"
              size="sm"
              h="44px"
              px="5"
              fontFamily="mono"
              fontSize="xs"
              letterSpacing="0.1em"
              textTransform="uppercase"
              display={{ base: "none", sm: "inline-flex" }}
              onClick={() => track("cta_click", { location: "header" })}
            >
              Join us
            </Button>
            <IconButton
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              icon={open ? <FiX size="18" /> : <FiMenu size="18" />}
              onClick={() => setOpen((v) => !v)}
              variant="ghost"
              display={{ base: "inline-flex", md: "none" }}
              borderRadius="full"
              w="40px"
              minW="40px"
              h="40px"
              _hover={{ bg: highlight }}
            />
          </HStack>

          {/* Reading progress */}
          <MotionBox
            aria-hidden
            position="absolute"
            left="24px"
            right="24px"
            bottom="0"
            h="2px"
            borderRadius="full"
            bgGradient="linear(to-r, #38bdf8, #8ee3ff)"
            style={{ scaleX: progress, transformOrigin: "0% 50%" }}
          />
        </Box>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <MotionBox
              id="mobile-menu"
              position="absolute"
              top="calc(100% + 8px)"
              left="0"
              right="0"
              p="3"
              borderRadius="28px"
              borderWidth="1px"
              borderColor="kk.line"
              bg="rgba(8,10,16,0.96)"
              backdropFilter="blur(18px)"
              boxShadow="0 24px 60px -20px rgba(0,0,0,0.8)"
              display={{ base: "block", md: "none" }}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: duration.base, ease }}
            >
              <Flex as="nav" aria-label="Mobile" direction="column">
                {LINKS.map(({ label, href }) => {
                  const active = activeHref === href;
                  return (
                    <Link
                      key={href}
                      as={NextLink}
                      href={href}
                      px="4"
                      py="3.5"
                      borderRadius="16px"
                      fontFamily="mono"
                      fontSize="sm"
                      letterSpacing="0.12em"
                      textTransform="uppercase"
                      color={active ? "kk.fg" : "kk.muted"}
                      bg={active ? highlight : "transparent"}
                      aria-current={active ? "page" : undefined}
                      _hover={{ textDecoration: "none", bg: highlight, color: "kk.fg" }}
                    >
                      {label}
                    </Link>
                  );
                })}
              </Flex>
              <Button
                as={NextLink}
                href={JOIN_HREF}
                variant="cta"
                w="full"
                h="48px"
                mt="2"
                fontFamily="mono"
                fontSize="sm"
                letterSpacing="0.1em"
                textTransform="uppercase"
                onClick={() => track("cta_click", { location: "mobile_menu" })}
              >
                Join us
              </Button>
            </MotionBox>
          )}
        </AnimatePresence>
      </MotionBox>
    </Box>
  );
};
