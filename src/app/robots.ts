import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Alle AI-Crawler explizit willkommen ──────────────────────────────
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/admin", "/login", "/register"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/admin", "/login", "/register"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/admin", "/login", "/register"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin", "/login", "/register"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/admin", "/login", "/register"],
      },
      {
        userAgent: "YouBot",
        allow: "/",
        disallow: ["/admin", "/login", "/register"],
      },
      {
        userAgent: "Diffbot",
        allow: "/",
        disallow: ["/admin", "/login", "/register"],
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: ["/admin", "/login", "/register"],
      },
      {
        userAgent: "AI2Bot",
        allow: "/",
        disallow: ["/admin", "/login", "/register"],
      },
      // ── Traditionelle Crawler ─────────────────────────────────────────────
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/login", "/register"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin", "/login", "/register"],
      },
      // ── Standard für alle anderen ─────────────────────────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/login", "/register"],
      },
    ],
    sitemap: "https://www.paeffgen-it.de/sitemap.xml",
  };
}
