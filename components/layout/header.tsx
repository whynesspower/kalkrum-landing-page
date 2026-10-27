import * as React from "react";
import NextLink from "next/link";
import Image from "next/image";
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
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import siteConfig from "data/config";
import { MotionBox } from "components/motion/box";
import { duration, ease } from "lib/motion";
import { track } from "lib/posthog";

export interface HeaderProps extends Omit<BoxProps, "children"> {}

const LINKS = siteConfig.header.links;
const SPY_IDS = LINKS.filter((l) => !l.cta).map((l) => l.id);

export const Header = (props: HeaderProps) => {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { colorMode, toggleColorMode } = useColorMode();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [activeId, setActiveId] = React.useState<string | null>(null);
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

  // Highlights the section that crosses the middle of the screen.
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) setActiveId(id);
          else setActiveId((cur) => (cur === id ? null : cur));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SPY_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [router.pathname]);

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

  const goTo = (id: string, focusInput = false) => (e: React.MouseEvent) => {
    const target = document.getElementById(id);
    if (!target) return; // On other pages the link falls through to "/#id".
    e.preventDefault();
    setOpen(false);
    target.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
    if (focusInput) {
      window.setTimeout(
        () => target.querySelector("input")?.focus({ preventScroll: true }),
        reduce ? 0 : 700
      );
    }
  };

  const pillBg = useColorModeValue(
    scrolled ? "rgba(255,255,255,0.86)" : "rgba(255,255,255,0.6)",
    scrolled ? "rgba(16,16,24,0.78)" : "rgba(16,16,24,0.5)"
  );
  const highlight = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const dropdownBg = useColorModeValue("rgba(255,255,255,0.95)", "rgba(16,16,24,0.95)");
  const current = hovered ?? activeId;
  const links = LINKS.filter((l) => !l.cta);
  const cta = LINKS.find((l) => l.cta);

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
              ? "0 12px 40px -14px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)"
              : "inset 0 1px 0 rgba(255,255,255,0.06)"
          }
          transition="background .3s ease, box-shadow .3s ease"
        >
          {/* Brand */}
          <Flex
            as={NextLink}
            href="/"
            align="center"
            gap="2.5"
            w="fit-content"
            aria-label="KalKram home"
            onClick={(e: React.MouseEvent) => {
              if (router.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
              }
            }}
          >
            <Image
              src="/static/screenshots/kalkram.png"
              alt=""
              width={28}
              height={28}
              priority
              style={{ width: 28, height: 28 }}
            />
            <Text fontWeight="700" fontSize="lg" letterSpacing="-0.02em">
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
            {links.map(({ id, label, href }) => (
              <Link
                key={id}
                as={NextLink}
                href={href || `/#${id}`}
                position="relative"
                px="3.5"
                py="2"
                fontSize="md"
                fontWeight="500"
                color={current === id ? "kk.fg" : "kk.muted"}
                transition="color .2s ease"
                _hover={{ textDecoration: "none", color: "kk.fg" }}
                onMouseEnter={() => setHovered(id)}
                onFocus={() => setHovered(id)}
                onBlur={() => setHovered(null)}
                onClick={goTo(id)}
              >
                {current === id && (
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
            <IconButton
              aria-label={
                colorMode === "dark" ? "Switch to light mode" : "Switch to dark mode"
              }
              icon={colorMode === "dark" ? <FiSun size="16" /> : <FiMoon size="16" />}
              onClick={toggleColorMode}
              variant="ghost"
              borderRadius="full"
              w="40px"
              minW="40px"
              h="40px"
              color="kk.muted"
              _hover={{ bg: highlight, color: "kk.fg" }}
            />
            {cta && (
              <Button
                as="a"
                href={cta.href || `/#${cta.id}`}
                variant="cta"
                size="sm"
                h="40px"
                px="5"
                borderRadius="full"
                display={{ base: "none", sm: "inline-flex" }}
                onClick={(e) => {
                  track("cta_click", { location: "header" });
                  goTo(cta.id, true)(e);
                }}
              >
                {cta.label}
              </Button>
            )}
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
            bgGradient="linear(to-r, #6c45e4, #6cc4ff)"
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
              bg={dropdownBg}
              backdropFilter="blur(18px)"
              boxShadow="0 24px 60px -20px rgba(0,0,0,0.6)"
              display={{ base: "block", md: "none" }}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: duration.base, ease }}
            >
              <Flex as="nav" aria-label="Mobile" direction="column">
                {links.map(({ id, label, href }) => (
                  <Link
                    key={id}
                    as={NextLink}
                    href={href || `/#${id}`}
                    px="4"
                    py="3.5"
                    borderRadius="16px"
                    fontSize="lg"
                    fontWeight="500"
                    color={activeId === id ? "kk.fg" : "kk.muted"}
                    bg={activeId === id ? highlight : "transparent"}
                    _hover={{ textDecoration: "none", bg: highlight, color: "kk.fg" }}
                    onClick={goTo(id)}
                  >
                    {label}
                  </Link>
                ))}
              </Flex>
              {cta && (
                <Button
                  as="a"
                  href={cta.href || `/#${cta.id}`}
                  variant="cta"
                  w="full"
                  h="48px"
                  mt="2"
                  borderRadius="16px"
                  onClick={(e) => {
                    track("cta_click", { location: "mobile_menu" });
                    goTo(cta.id, true)(e);
                  }}
                >
                  {cta.label}
                </Button>
              )}
            </MotionBox>
          )}
        </AnimatePresence>
      </MotionBox>
    </Box>
  );
};
