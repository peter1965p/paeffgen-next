import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Päffgen IT | Senior IT Systemdenker & AI-Dev",
  description:
    "40+ Jahre IT-Erfahrung trifft KI-gestützte Entwicklung. Komplexe Webanwendungen, System-Architektur und AI-Integration. Remote aus der Vulkaneifel.",
  keywords: [
    "Päffgen IT",
    "Fullstack Entwicklung",
    "Next.js",
    "AI Development",
    "System Architektur",
    "Vulkaneifel",
    "Remote",
  ],
  openGraph: {
    title: "Päffgen IT | Senior IT Systemdenker & AI-Dev",
    description: "40+ Jahre IT-Erfahrung trifft KI-gestützte Entwicklung.",
    url: "https://paeffgen-it.de",
    siteName: "Päffgen IT",
    images: [{ url: "/og-image.png" }],
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="bg-[#05070a] text-white antialiased font-mono w-full overflow-x-hidden">
        <main className="w-full">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
