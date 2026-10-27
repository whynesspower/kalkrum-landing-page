import posthog from 'posthog-js';

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const enabled = typeof window !== 'undefined' && !!key;

if (enabled) {
  posthog.init(key as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    // Counts the first page load. Later route changes are captured in _app.
    capture_pageview: true,
  });
}

/** Sends an event when analytics is configured and does nothing otherwise. */
export const track = (event: string, properties?: Record<string, unknown>) => {
  if (enabled) posthog.capture(event, properties);
};

export { posthog };
