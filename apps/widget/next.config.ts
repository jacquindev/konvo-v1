import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    optimizePackageImports: ["@repo/backend", "@repo/ui", "shiki"],
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
