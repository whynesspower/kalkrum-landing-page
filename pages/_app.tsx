import type { AppProps } from "next/app";

import { SaasProvider } from "@saas-ui/react";
import { useReducedMotion } from "framer-motion";
import { Layout } from "components/layout";
import { MotionBox } from "components/motion/box";
import { PostHogProvider } from "posthog-js/react";
import { posthog, track } from "../lib/posthog";
import { useEffect } from "react";
import { useRouter } from "next/router";

import "../theme/fonts.css";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  const { header, footer } = pageProps;
  const router = useRouter();
  const reduce = useReducedMotion();

  useEffect(() => {
    // The first load is counted by posthog.init; this covers later navigation.
    const handleRouteChange = () => track("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return (
    <SaasProvider theme={theme}>
      <PostHogProvider client={posthog}>
        <Layout headerProps={header} footerProps={footer}>
          <MotionBox
            key={router.asPath}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.4, ease: "easeOut" }}
          >
            <Component {...pageProps} />
          </MotionBox>
        </Layout>
      </PostHogProvider>
    </SaasProvider>
  );
}

export default MyApp;
