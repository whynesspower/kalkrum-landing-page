import * as React from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Text,
  VisuallyHidden,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { track } from "lib/posthog";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const WaitlistForm: React.FC<{ source?: string }> = ({
  source = "hero",
}) => {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState("");
  const honeypot = React.useRef<HTMLInputElement>(null);
  const inputId = React.useId();
  const messageId = `${inputId}-message`;
  const errorColor = useColorModeValue("red.600", "red.300");

  const fail = (message: string, reason: string) => {
    setStatus("error");
    setError(message);
    track("waitlist_submit", { source, ok: false, reason });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      fail("Enter a valid email, like name@company.com.", "invalid_email");
      return;
    }

    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: value,
          company: honeypot.current?.value ?? "",
          source,
        }),
      });
      if (res.status === 429) {
        fail("Too many tries. Wait a minute and try again.", "rate_limited");
        return;
      }
      if (!res.ok) {
        fail("We couldn't save your email. Try again in a moment.", `http_${res.status}`);
        return;
      }
      setStatus("success");
      track("waitlist_submit", { source, ok: true });
    } catch {
      fail("We couldn't reach the server. Check your connection and try again.", "network");
    }
  };

  if (status === "success") {
    return (
      <Flex
        role="status"
        align="center"
        gap="4"
        maxW="520px"
        mx="auto"
        p="4"
        borderWidth="1px"
        borderColor="kk.line"
        borderRadius="16px"
        bg="kk.surface"
        textAlign="left"
      >
        <Flex
          flexShrink={0}
          w="40px"
          h="40px"
          align="center"
          justify="center"
          borderRadius="full"
          bg="kk.accentSolid"
          color="white"
        >
          <Icon as={FiCheck} boxSize="5" aria-hidden />
        </Flex>
        <Box>
          <Text fontWeight="600">You're on the list.</Text>
          <Text fontSize="md" color="kk.muted">
            We'll email {email.trim()} when your spot opens.
          </Text>
        </Box>
      </Flex>
    );
  }

  return (
    <Box as="form" onSubmit={onSubmit} noValidate maxW="520px" mx="auto" w="full">
      <Flex direction={{ base: "column", sm: "row" }} gap="3">
        <VisuallyHidden as="label" htmlFor={inputId}>
          Work email
        </VisuallyHidden>
        <Input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isInvalid={status === "error"}
          aria-describedby={messageId}
          h="52px"
          flex={{ base: "none", sm: "1" }}
          borderRadius="12px"
          bg="kk.surface"
          borderColor="kk.line"
          _placeholder={{ color: "kk.muted" }}
          _hover={{ borderColor: "kk.accent" }}
          _invalid={{ borderColor: errorColor, boxShadow: "none" }}
          _focusVisible={{
            borderColor: "kk.accent",
            boxShadow: "0 0 0 3px rgba(108,69,228,0.35)",
          }}
        />
        {/* Hidden field that only bots fill in. */}
        <input
          ref={honeypot}
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />
        <Button
          type="submit"
          variant="cta"
          h="52px"
          px="7"
          isLoading={status === "loading"}
          loadingText="Joining"
          rightIcon={<FiArrowRight />}
          onClick={() => track("cta_click", { location: source })}
        >
          Request early access
        </Button>
      </Flex>
      <Text
        id={messageId}
        role={status === "error" ? "alert" : undefined}
        aria-live="polite"
        mt="3"
        fontSize="sm"
        color={status === "error" ? errorColor : "kk.muted"}
      >
        {status === "error"
          ? error
          : "One email when your spot opens. No spam."}
      </Text>
    </Box>
  );
};
