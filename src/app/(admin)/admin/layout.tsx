import "@/app/globals.css";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import { createClient } from "@/lib/supabaseClient";

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Auth-Daten direkt auf dem Server abrufen
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 2. Daten für die Topbar vorbereiten
  const initialEmail = user?.email || null;
  const initialId = user?.id || null;

  return (   
    <div className="flex h-screen w-full bg-black">
      {/* Die Sidebar */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar erhält jetzt die Daten als Props vom Server */}
        <Topbar initialEmail={initialEmail} initialId={initialId} />
        
        {/* Das Hauptfenster für Dashboard/Approvals */}
        <main className="flex-1 overflow-y-auto bg-black/20 scrollbar-hide">
          {children}
        </main>
      </div>
    </div>     
  );
}