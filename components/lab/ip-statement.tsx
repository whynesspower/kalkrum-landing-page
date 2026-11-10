import * as React from "react";
import { Text, TextProps } from "@chakra-ui/react";
import siteConfig from "data/config";

/**
 * Who owns the technology and IP. Renders nothing in production until
 * siteConfig.company.ipStatement is filled, and a visible TODO in development.
 */
export const IpStatement: React.FC<TextProps> = (props) => {
  const statement = siteConfig.company.ipStatement;
  if (statement) return <Text {...props}>{statement}</Text>;
  if (process.env.NODE_ENV === "production") return null;
  return (
    <Text {...props} color="#ff6b6b">
      TODO: state who owns the KalKram technology and IP (siteConfig.company.ipStatement).
    </Text>
  );
};
