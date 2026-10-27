import * as React from "react";
import Image from "next/image";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useMinWidth } from "hooks/use-min-width";
import { Parallax } from "components/motion/parallax";
import { IMAGE_CREDIT_LINE, SCIENCE_IMAGES } from "data/images";
import { LabHeading, LabSection, SectionLabel } from "../primitives";
import { HudFrame } from "../graphics/hud-frame";

const SHOTS = [
  { key: "southernRing", distance: 50, offset: "0px" },
  { key: "hubbleDeepField", distance: -30, offset: "64px" },
  { key: "deepField", distance: 80, offset: "24px" },
] as const;

const Shot: React.FC<{
  shot: (typeof SHOTS)[number];
  index: number;
}> = ({ shot, index }) => {
  const img = SCIENCE_IMAGES[shot.key];
  const wide = useMinWidth(768);
  return (
    <Box
      flex={{ base: "0 0 78vw", md: "1 1 0" }}
      minW="0"
      scrollSnapAlign="start"
      pt={{ md: shot.offset }}
    >
      <Parallax distance={wide ? shot.distance : 0}>
        <HudFrame
          label={`FIG. 0${index + 2} / ${img.title}`}
          credit={img.credit}
        >
          <Box position="relative" aspectRatio="4 / 5" bg="kk.surface">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 48em) 33vw, 78vw"
              quality={70}
              style={{ objectFit: "cover" }}
            />
          </Box>
        </HudFrame>
      </Parallax>
    </Box>
  );
};

export const Gallery: React.FC = () => (
  <LabSection id="gallery">
    <SectionLabel index="05">Gallery</SectionLabel>
    <LabHeading mt="6" maxW="760px">
      The sky as{" "}
      <Box as="span" fontStyle="normal" color="kk.accent">
        data
      </Box>
    </LabHeading>
    <Flex
      role="region"
      aria-label="Space telescope images"
      tabIndex={0}
      mt={{ base: 12, md: 20 }}
      gap={{ base: 4, md: 8 }}
      overflowX={{ base: "auto", md: "visible" }}
      mx={{ base: -5, md: 0 }}
      px={{ base: 5, md: 0 }}
      pb={{ base: 4, md: 24 }}
      sx={{
        scrollSnapType: "x mandatory",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {SHOTS.map((s, i) => (
        <Shot key={s.key} shot={s} index={i} />
      ))}
    </Flex>
    <Text
      mt={{ base: 4, md: 0 }}
      fontFamily="mono"
      fontSize="2xs"
      letterSpacing="0.14em"
      textTransform="uppercase"
      color="kk.muted"
      maxW="720px"
    >
      {IMAGE_CREDIT_LINE}
    </Text>
  </LabSection>
);
