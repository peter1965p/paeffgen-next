import { createClient } from '@supabase/supabase-js';
import StoreClient from '@/components/StoreClient';

/**
 * SPECTORA // COMMERCE SECTOR
 * Management-Interface für Produkte und Bestände
 * Jetzt mit globaler Kategorie-Integration
 */

export const dynamic = 'force-dynamic';

export default async function StorePage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 1. Produkte mit Kategorie-Informationen abrufen
  const { data: products, error: pError } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        id,
        name
      )
    `)
    .order('id', { ascending: false });

  // 2. Alle verfügbaren Kategorien für die Filterbar abrufen
  const { data: categories, error: cError } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (pError || cError) {
    console.error("SUPABASE_CONNECTION_ERROR:", pError?.message || cError?.message);
  }

  return (
    <main className="h-screen flex flex-col overflow-hidden bg-[#05070a]">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Wir übergeben jetzt sowohl Produkte als auch die globalen Kategorien */}
        <StoreClient 
          initialProducts={products || []} 
          categories={categories || []} 
        />
      </div>
      
      {/* Footer Branding */}
      <div className="p-4 border-t border-white/5 bg-black/20 flex justify-between items-center z-50">
        <div className="flex flex-col gap-1">
            <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">
              SPECTORA V3.0 // COMMERCE UNIT // STABLE
            </span>
            <span className="text-[7px] text-slate-800 font-mono uppercase tracking-[0.3em]">
              Global Taxonomy Integration Active
            </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-[8px] font-mono text-blue-500/50 uppercase tracking-widest">Sync Active</span>
        </div>
      </div>
    </main>
  );
}