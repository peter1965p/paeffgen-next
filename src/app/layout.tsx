import "@/app/globals.css";
import Navbar from "@/components/Navbar";

export const dynamic = 'force-dynamic';

// Metadaten für Paeffgen IT / AETHER OS
export const metadata = {
  title: "Paeffgen IT | Field Service & Hardware-Infrastruktur",
  description: "Professioneller Vor-Ort-Service für IT-Systeme, Rollouts und Infrastruktur-Support in RLP, NRW und Hessen.",
  keywords: ["IT-Systemtechniker", "Field Service", "Hardware Rollout", "Infrastruktur Support", "Paeffgen IT"],
  openGraph: {
    title: "Paeffgen IT - AETHER OS",
    description: "Ihr Partner für zuverlässigen IT-Field-Service.",
    url: "https://paeffgen-it.de",
    siteName: "Paeffgen IT",
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
      <body className="bg-[#05070a] text-white antialiased font-mono">
        <Navbar /> 
        {/* pt-20 sorgt dafür, dass der Content unter der Navbar startet */}
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}