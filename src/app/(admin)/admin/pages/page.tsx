import { createClient } from "@/lib/supabaseClient";
import Link from "next/link";
import { 
  FileText, 
  Edit3, 
  Trash2, 
  Plus, 
  Globe, 
  EyeOff 
} from "lucide-react";

export default async function PagesManagement() {
  const supabase = await createClient();
  
  // Holen aller Seiten aus deiner 'pages' Tabelle
  const { data: pages, error } = await supabase
    .from('pages')
    .select('*')
    .order('nav_order', { ascending: true });

  return (
    <div className="p-8 font-sans max-w-6xl mx-auto">
      {/* Header mit "Neue Seite" Button */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Seitenverwaltung
          </h1>
          <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest">
            Struktur und Inhalte von AETHER OS definieren
          </p>
        </div>
        <button className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-orange-900/20 uppercase text-xs tracking-widest">
          <Plus size={18} /> Neue Seite
        </button>
      </div>

      {/* Die Liste (wie im Screenshot) */}
      <div className="bg-zinc-950/50 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl">
        <div className="divide-y divide-white/5">
          {pages?.map((page) => (
            <div key={page.id} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-all group">
              
              {/* Linke Seite: Info */}
              <div className="flex items-center gap-5">
                <div className="p-4 bg-zinc-900 rounded-2xl text-slate-400 group-hover:text-blue-500 transition-colors">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{page.title}</h3>
                  <p className="text-slate-500 text-xs font-mono">{page.slug}</p>
                </div>
              </div>

              {/* Mitte: Status Badges */}
              <div className="flex items-center gap-4">
                {page.show_in_nav && (
                  <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase rounded-lg tracking-widest">
                    Navigation
                  </span>
                )}
                <span className={`px-3 py-1 border text-[10px] font-black uppercase rounded-lg tracking-widest ${
                  page.is_published 
                  ? "bg-green-500/10 border-green-500/20 text-green-500" 
                  : "bg-zinc-800 border-zinc-700 text-zinc-500"
                }`}>
                  {page.is_published ? "Veröffentlicht" : "Entwurf"}
                </span>
              </div>

              {/* Rechte Seite: Aktionen */}
              <div className="flex items-center gap-2">
                <Link 
                  href={`/admin/pages/edit/${page.id}`}
                  className="p-3 bg-zinc-900 hover:bg-zinc-800 text-slate-300 rounded-xl flex items-center gap-2 text-xs font-bold transition-all border border-white/5"
                >
                  <Edit3 size={14} className="text-orange-500" /> Bearbeiten
                </Link>
                <button className="p-3 bg-zinc-900 hover:bg-red-950 text-red-500 rounded-xl transition-all border border-white/5">
                  <Trash2 size={14} />
                </button>
              </div>

            </div>
          ))}

          {(!pages || pages.length === 0) && (
            <div className="p-20 text-center">
              <p className="text-slate-600 uppercase tracking-widest text-xs">Keine Seiten gefunden. Initialisiere System...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}