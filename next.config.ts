import type { NextConfig } from "next";

/**
 * Two build modes:
 *
 * 1. Default (local dev / standalone): unchanged from the scaffold.
 * 2. Static export for GitHub Pages — enabled with BUILD_STATIC=1 (used by
 *    .github/workflows/deploy.yml). GitHub Pages serves project sites from
 *    /<repo>/, so assets are prefixed with NEXT_PUBLIC_BASE_PATH.
 */
const isStaticExport = process.env.BUILD_STATIC === "1";

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      basePath: process.env.NEXT_PUBLIC_BASE_PATH || "/Trisle_Website",
      images: { unoptimized: true },
      typescript: {
        ignoreBuildErrors: true,
      },
      reactStrictMode: false,
    }
  : {
      output: "standalone",
      typescript: {
        ignoreBuildErrors: true,
      },
      reactStrictMode: false,
    };

export default nextConfig;
