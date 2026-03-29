import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Falls du Bilder von externen Quellen (wie GitHub oder Vercel-Blobs) nutzt,
  // müssten wir hier später images: { remotePatterns: [...] } hinzufügen.
};

export default nextConfig;