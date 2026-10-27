import * as React from "react";
import { Box, Button, Flex, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { useInView, useReducedMotion } from "framer-motion";
import { SiGithub, SiGoogledocs, SiJira, SiSlack } from "react-icons/si";
import { FiRotateCcw } from "react-icons/fi";
import { MotionBox } from "components/motion/box";
import { Parallax } from "components/motion/parallax";
import { duration, ease } from "lib/motion";

const SOURCES = [
  { icon: SiJira, tool: "Jira", text: "AUTH-412 Username and password login moved to Done" },
  { icon: SiGithub, tool: "GitHub", text: "PR 1893 Add secure password hashing to auth service merged" },
  { icon: SiSlack, tool: "Slack", text: "#incidents EU config reached the US cluster, rolling back" },
  { icon: SiGoogledocs, tool: "Docs", text: "RCA: customer outage last Friday" },
  { icon: SiJira, tool: "Jira", text: "AUTH-431 Deployment config check moved to In Review" },
  { icon: SiSlack, tool: "Slack", text: "#auth-team Nordic users prefer Google sign-in, raising priority" },
  { icon: SiGithub, tool: "GitHub", text: "14 commits and 3 reviews on the auth service" },
];

const SUMMARY =
  "Authentication Enhancement is on track at 55%. Username and password login shipped this week alongside Google sign-in, and the team chose a hashing library that balances security with speed. One risk remains: last Friday’s outage came from EU configuration reaching the US cluster. A new deployment check is in review. Next up: a Nordic customer rollout, starting with Google sign-in.";
const WORDS = SUMMARY.split(" ");

/** Shows raw team activity turning into one 60-word summary. */
export const SummaryDemo: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const [shown, setShown] = React.useState(0);
  const [run, setRun] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setShown(WORDS.length);
      return;
    }
    setShown(0);
    let timer: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        setShown((n) => {
          if (n >= WORDS.length) {
            if (timer) clearInterval(timer);
            return n;
          }
          return n + 1;
        });
      }, 45);
    }, 1200);
    return () => {
      clearTimeout(start);
      if (timer) clearInterval(timer);
    };
  }, [inView, run, reduce]);

  const done = shown >= WORDS.length;

  return (
    <SimpleGrid ref={ref} columns={{ base: 1, lg: 2 }} gap={{ base: 5, lg: 6 }}>
      <Parallax distance={14} h="full">
      <Box
        h="full"
        borderWidth="1px"
        borderColor="kk.line"
        borderRadius="20px"
        bg="kk.surface"
        p={{ base: 5, md: 7 }}
      >
        <Flex justify="space-between" align="baseline" mb="5">
          <Text fontWeight="600">This week, across your tools</Text>
          <Text fontSize="sm" color="kk.muted">
            {SOURCES.length} of 23 updates
          </Text>
        </Flex>
        <Flex as="ul" listStyleType="none" direction="column" gap="2.5" key={run}>
          {SOURCES.map(({ icon, tool, text }, i) => (
            <MotionBox
              as="li"
              key={text}
              display="flex"
              alignItems="center"
              gap="3"
              px="3.5"
              py="2.5"
              borderWidth="1px"
              borderColor="kk.line"
              borderRadius="12px"
              bg="kk.surfaceHi"
              fontSize="md"
              initial={reduce ? false : { opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: duration.base, ease, delay: 0.1 + i * 0.12 }}
            >
              <Icon as={icon} boxSize="4" color="kk.muted" aria-hidden />
              <Text as="span" srOnly>
                {tool}:
              </Text>
              <Text as="span" noOfLines={{ base: 2, md: 1 }}>
                {text}
              </Text>
            </MotionBox>
          ))}
        </Flex>
      </Box>
      </Parallax>

      <Parallax distance={-14} h="full">
      <Box
        position="relative"
        h="full"
        borderWidth="1px"
        borderColor="kk.accent"
        borderRadius="20px"
        bg="kk.surface"
        p={{ base: 5, md: 7 }}
        boxShadow="0 0 80px -30px rgba(108,69,228,0.6)"
      >
        <Flex justify="space-between" align="center" mb="5">
          <Text fontWeight="600">What you read</Text>
          <Text fontSize="sm" color="kk.muted" aria-hidden>
            {shown} / {WORDS.length} words
          </Text>
        </Flex>
        <Box h="3px" borderRadius="full" bg="kk.line" mb="6" aria-hidden>
          <Box
            h="full"
            borderRadius="full"
            bg="kk.accentSolid"
            width={`${(shown / WORDS.length) * 100}%`}
            transition="width .1s linear"
          />
        </Box>
        <Text fontSize={{ base: "lg", md: "xl" }} lineHeight="1.65">
          {WORDS.map((word, i) => (
            <Box
              as="span"
              key={i}
              opacity={i < shown ? 1 : 0.15}
              transition="opacity .25s ease"
            >
              {word}{" "}
            </Box>
          ))}
        </Text>
        <Flex mt="6" justify="space-between" align="center" minH="32px">
          <Text fontSize="sm" color="kk.muted">
            Example output
          </Text>
          {done && !reduce && (
            <Button
              size="sm"
              variant="ghost"
              leftIcon={<FiRotateCcw />}
              onClick={() => setRun((n) => n + 1)}
            >
              Replay
            </Button>
          )}
        </Flex>
      </Box>
      </Parallax>
    </SimpleGrid>
  );
};
