// @ts-ignore
import "../../globals.css";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-black">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto bg-black/20 scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
}
