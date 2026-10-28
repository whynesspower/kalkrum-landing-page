import * as React from "react";
import { Box, Button, Heading, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import { useReducedMotion } from "framer-motion";

export type Role = {
  id: string;
  title: string;
  mission: string;
  youWill: string[];
  youHave: string[];
};

export const ROLES: Role[] = [
  {
    id: "continual-learning",
    title: "Research Scientist, Continual Learning",
    mission:
      "Make a model that keeps learning after training ends and does not forget what it already knew.",
    youWill: [
      "Design and run experiments on test-time training and self-distillation.",
      "Measure catastrophic forgetting on long streams of experience.",
      "Turn the results into methods that work at scale, and write down what failed.",
    ],
    youHave: [
      "A track record of original ML research, shown by papers, code or results.",
      "Fluency with PyTorch or JAX and a clear view of how learning dynamics break.",
      "Taste: you know which experiment is worth running.",
    ],
  },
  {
    id: "architectures-memory",
    title: "Research Scientist, Architectures and Memory",
    mission:
      "Find sequence architectures that read long histories cheaply and remember what matters.",
    youWill: [
      "Build and compare state space models, Mamba, linear attention, Gated DeltaNet and hybrid architectures.",
      "Study mixture of experts and sub-quadratic attention at the scale where they start to matter.",
      "Design long-term memory modules and test what they keep, what they drop and why.",
    ],
    youHave: [
      "A track record of original work on sequence models, shown by papers, code or results.",
      "Fluency with PyTorch or JAX, and with the kernels and numerics behind efficient recurrence.",
      "Taste: you can tell a real gain from a benchmark artifact.",
    ],
  },
  {
    id: "interpretability",
    title: "Research Scientist, Interpretability",
    mission:
      "Understand what our models learn and how they change as they learn, from the inside.",
    youWill: [
      "Apply Mechanistic Interpretability to find circuits and features in our own models.",
      "Track how those features form, move and fade over the course of training.",
      "Build the tools that let the rest of the lab see inside a run while it happens.",
    ],
    youHave: [
      "A track record of original interpretability or ML research, shown by papers, code or results.",
      "Fluency with PyTorch or JAX and the habit of testing your own explanations.",
      "Care about what these systems become.",
    ],
  },
  {
    id: "training-systems",
    title: "Research Engineer, Training Systems",
    mission:
      "Build the training stack that lets a small team run many large experiments.",
    youWill: [
      "Build the training stack that makes these experiments cheap to repeat.",
      "Profile and speed up training for new architectures, including recurrent and hybrid models.",
      "Make every run reproducible, observable and easy to compare with the last one.",
    ],
    youHave: [
      "A track record of systems work, shown by code, tools or results you can point to.",
      "Fluency with PyTorch or JAX and large-scale distributed training.",
      "Taste: you remove the thing that slows the researchers down.",
    ],
  },
];

const mailto = (email: string, subject: string) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}`;

const Bullets: React.FC<{ title: string; items: string[] }> = ({
  title,
  items,
}) => (
  <Box>
    <Text
      fontFamily="mono"
      fontSize="xs"
      letterSpacing="0.14em"
      textTransform="uppercase"
      color="kk.accent"
    >
      {title}
    </Text>
    <UnorderedList mt={3} spacing={2} ml={4} color="kk.muted" lineHeight="1.65">
      {items.map((i) => (
        <ListItem key={i}>{i}</ListItem>
      ))}
    </UnorderedList>
  </Box>
);

const RoleRow: React.FC<{
  id: string;
  index: number;
  title: string;
  mission: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ id, index, title, mission, open, onToggle, children }) => {
  const reduce = useReducedMotion();
  return (
    <Box borderTopWidth="1px" borderColor="kk.line">
      <Heading as="h3" fontSize="inherit" fontWeight="inherit">
        <Box
          as="button"
          type="button"
          aria-expanded={open}
          aria-controls={`role-${id}`}
          id={`role-btn-${id}`}
          onClick={onToggle}
          w="100%"
          textAlign="left"
          py={{ base: 6, md: 8 }}
          display="grid"
          gridTemplateColumns={{ base: "2rem 1fr 1.5rem", md: "3rem 1fr 2rem" }}
          gap={{ base: 3, md: 6 }}
          alignItems="start"
          _hover={{ "& .role-title": { color: "kk.accent" } }}
          _focusVisible={{ outline: "2px solid", outlineColor: "kk.accent", outlineOffset: "4px" }}
        >
          <Text fontFamily="mono" fontSize="xs" letterSpacing="0.18em" color="kk.accent" pt={2}>
            {String(index + 1).padStart(2, "0")}
          </Text>
          <Box>
            <Text
              className="role-title"
              fontFamily="display"
              textTransform="uppercase"
              letterSpacing="0.04em"
              fontSize={{ base: "xl", md: "2xl" }}
              lineHeight="1.15"
              transition="color .2s"
            >
              {title}
            </Text>
            <Text mt={2} color="kk.muted" lineHeight="1.6" maxW="40rem">
              {mission}
            </Text>
          </Box>
          <Text
            aria-hidden
            fontFamily="mono"
            fontSize="2xl"
            lineHeight="1"
            color="kk.accent"
            transform={open ? "rotate(45deg)" : "none"}
            transition={reduce ? "none" : "transform .25s"}
            textAlign="right"
          >
            +
          </Text>
        </Box>
      </Heading>
      <Box
        id={`role-${id}`}
        role="region"
        aria-labelledby={`role-btn-${id}`}
        hidden={!open}
        pb={{ base: 8, md: 10 }}
        pl={{ base: 0, md: "calc(3rem + 1.5rem)" }}
      >
        {open && children}
      </Box>
    </Box>
  );
};

export const RoleList: React.FC<{ email: string }> = ({ email }) => {
  const [openId, setOpenId] = React.useState<string | null>(null);
  const toggle = (id: string) => setOpenId((c) => (c === id ? null : id));

  return (
    <Box borderBottomWidth="1px" borderColor="kk.line">
      {ROLES.map((r, i) => (
        <RoleRow
          key={r.id}
          id={r.id}
          index={i}
          title={r.title}
          mission={r.mission}
          open={openId === r.id}
          onToggle={() => toggle(r.id)}
        >
          <Box
            display="grid"
            gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
            gap={{ base: 8, md: 12 }}
          >
            <Bullets title="You will" items={r.youWill} />
            <Bullets title="You have" items={r.youHave} />
          </Box>
          <Button
            as="a"
            href={mailto(email, `Application: ${r.title}`)}
            variant="line"
            mt={8}
          >
            Apply for this role
          </Button>
        </RoleRow>
      ))}
      <RoleRow
        id="open"
        index={ROLES.length}
        title="Open application"
        mission="None of these fits, but you work on learning that never stops. Tell us what you would build."
        open={openId === "open"}
        onToggle={() => toggle("open")}
      >
        <Text color="kk.muted" lineHeight="1.65" maxW="38rem">
          Say what you have done, what you want to work on, and why it belongs here.
        </Text>
        <Button
          as="a"
          href={mailto(email, "Open application")}
          variant="line"
          mt={8}
        >
          Write to us
        </Button>
      </RoleRow>
    </Box>
  );
};
