import { createClient } from '@supabase/supabase-js';
import StoreClient from '@/components/StoreClient';

/**
 * AETHER OS // COMMERCE SECTOR [cite: 2026-03-08]
 * Management-Interface für Produkte und Bestände [cite: 2026-03-08]
 */

export const dynamic = 'force-dynamic';

export default async function StorePage() {
  // Initialer Server-Side Fetch der Produkte aus deiner Supabase-Tabelle [cite: 2026-03-08]
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error("SUPABASE_CONNECTION_ERROR:", error.message);
  }

  return (
    <main className="h-screen flex flex-col overflow-hidden bg-[#05070a]">
      {/* Header Area [cite: 2026-03-08] */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <StoreClient initialProducts={products || []} />
      </div>
      
      {/* Footer Branding [cite: 2026-03-08] */}
      <div className="p-4 border-t border-white/5 bg-black/20 flex justify-between items-center">
        <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">
          AETHER OS V3.0 // COMMERCE UNIT // STABLE
        </span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-[8px] font-mono text-blue-500/50 uppercase">Sync Active</span>
        </div>
      </div>
    </main>
  );
}