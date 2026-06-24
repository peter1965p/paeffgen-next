import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AI_BOTS = [
  { name: "GPTBot",          pattern: /GPTBot/i },
  { name: "ClaudeBot",       pattern: /ClaudeBot|anthropic-ai/i },
  { name: "PerplexityBot",   pattern: /PerplexityBot/i },
  { name: "Google-Extended", pattern: /Google-Extended/i },
  { name: "Gemini",          pattern: /Bard|gemini-ai/i },
  { name: "CCBot",           pattern: /CCBot/i },
  { name: "YouBot",          pattern: /YouBot/i },
  { name: "Bytespider",      pattern: /Bytespider/i },
  { name: "Diffbot",         pattern: /Diffbot/i },
  { name: "cohere-ai",       pattern: /cohere-ai/i },
  { name: "AI2Bot",          pattern: /AI2Bot/i },
  { name: "FacebookBot",     pattern: /FacebookBot/i },
  { name: "Applebot",        pattern: /Applebot-Extended/i },
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Nur öffentliche Seiten tracken
  if (
    path.startsWith("/admin") ||
    path.startsWith("/api") ||
    path.startsWith("/_next") ||
    path.includes(".")
  ) {
    return NextResponse.next();
  }

  const ua = request.headers.get("user-agent") || "";

  for (const bot of AI_BOTS) {
    if (bot.pattern.test(ua)) {
      // Fire-and-forget — blockiert den Request nicht
      fetch(`${request.nextUrl.origin}/api/log-bot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bot_name: bot.name, user_agent: ua, path }),
      }).catch(() => {});
      break;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
