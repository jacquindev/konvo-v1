/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  experimental: {
    optimizePackageImports: ["@repo/backend", "@repo/ui", "shiki"],
  },
};

export default nextConfig;
