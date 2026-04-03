// src/app/(public)/[slug]/page.tsx
import { createClient } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";

export default async function PublicProfilePage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  
  // Wir suchen in der Generalsanierten Settings-Tabelle nach dem Slug
  const { data: profile } = await supabase
    .from("settings")
    .select("*")
    .eq("profile_slug", params.slug)
    .single();

  if (!profile) {
    notFound(); // Falls der Slug nicht existiert -> 404
  }

  return (
    <main className="min-h-screen bg-black text-white p-10 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Dynamisches Branding basierend auf deinen Settings */}
        <div style={{ color: profile.primary_color }} className="text-[10px] font-black uppercase tracking-[0.5em] mb-4">
          Verified AETHER OS Node // {profile.company_name}
        </div>

        <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.8]">
          {profile.company_name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-12">
          <p className="text-xl font-light text-slate-400 leading-relaxed italic">
            "{profile.bio || "No bio defined yet."}"
          </p>
          
          <div className="flex flex-col justify-end items-start gap-6">
             <button className="bg-white text-black px-10 py-5 rounded-2xl font-black uppercase italic text-xs tracking-widest hover:bg-[#b33927] hover:text-white transition-all w-full">
               Contact Business
             </button>
             <div className="text-[9px] font-mono text-slate-600 uppercase">
               Location: {profile.owner_address || "Global Network"}
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}