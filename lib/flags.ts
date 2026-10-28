/**
 * Feature flags read from the environment at build time.
 * Set NEXT_PUBLIC_FEATURE_WRITING=true to show the Writing page and its links.
 */
export const flags = {
  writing: process.env.NEXT_PUBLIC_FEATURE_WRITING === "true",
};
