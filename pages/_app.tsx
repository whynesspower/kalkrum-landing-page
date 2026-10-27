import type { AppProps } from "next/app";

import { AuthProvider } from "@saas-ui/auth";
import { SaasProvider } from "@saas-ui/react";
import { Layout } from "components/layout";
import { PostHogProvider } from 'posthog-js/react';
import { posthog, track } from '../lib/posthog';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  const { announcement, header, footer } = pageProps;
  const router = useRouter();

  useEffect(() => {
    // The first load is counted by posthog.init; this covers later navigation.
    const handleRouteChange = () => track('$pageview');
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <SaasProvider theme={theme}>
      <AuthProvider>
        <PostHogProvider client={posthog}>
          <Layout
            announcementProps={announcement}
            headerProps={header}
            footerProps={footer}
          >
            <Component {...pageProps} />
          </Layout>
        </PostHogProvider>
      </AuthProvider>
    </SaasProvider>
  );
}

export default MyApp;
