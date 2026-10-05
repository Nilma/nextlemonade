import type { NextConfig } from "next";

const repo = "nextlemonade";

const nextConfig: NextConfig = {
  output: "export",

  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;