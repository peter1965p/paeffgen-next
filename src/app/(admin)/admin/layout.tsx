// @ts-ignore
import "../../globals.css";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="flex h-screen w-full" style={{ backgroundColor: "var(--admin-bg, #0f172a)" }}>
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto bg-white/3 scrollbar-hide">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
