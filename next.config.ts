import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Match the current orvann.com URLs exactly (e.g. /about-us/, /our-projects/akam/),
  // so existing links and search results keep working without redirects.
  trailingSlash: true,
};

export default nextConfig;
