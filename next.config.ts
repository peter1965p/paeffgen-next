import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Wir nutzen einen Index-Signature-Workaround, um TS zu beruhigen [cite: 2026-03-08]
 
};

export default nextConfig;