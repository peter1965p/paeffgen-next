import "../../globals.css"; // Pfad zu deiner CSS
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (   
        <div className="flex h-screen w-full">
          {/* Die Sidebar */}
          <Sidebar />
          
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Topbar jetzt korrekt innerhalb des Content-Flows */}
            <Topbar />
            
            {/* Das Hauptfenster für Dashboard/Approvals */}
            <main className="flex-1 overflow-y-auto bg-black/20 scrollbar-hide">
              {children}
            </main>
          </div>
        </div>     
  );
}