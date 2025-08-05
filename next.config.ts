import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No matcher here
  reactStrictMode: true,
};

export default withSentryConfig(nextConfig, {
  org: "product-hb",
  project: "node-express",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
