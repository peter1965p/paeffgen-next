"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { 
  Plus, Trash2, Layers, 
  Loader2, Hash, LayoutGrid, 
  Activity, Check, Globe
} from "lucide-react";

const MODULES = ["blog", "shop", "inventory", "pos", "workshop"];

export default function GlobalCategoryCenter() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // State für das neue Kategorie-Formular
  const [newName, setNewName] = useState("");
  const [selectedModules, setSelectedModules] = useState<string[]>(["blog"]);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });
    
    if (!error && data) setCategories(data);
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  const toggleModule = (mod: string) => {
    setSelectedModules(prev => 
      prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]
    );
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || selectedModules.length === 0) return;

    setSubmitting(true);
    
    // Wir speichern die gewählten Module als kommagetrennten String,
    // passend zu deinem manuellen SQL-Update.
    const moduleString = selectedModules.join(", ");
    const slug = newName.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

    const { error } = await supabase
      .from("categories")
      .insert([{ 
        name: newName, 
        slug: slug,
        module: moduleString 
      }]);

    if (!error) {
      setNewName("");
      fetchCategories();
    } else {
      alert("Fehler: Eventuell existiert der Slug bereits.");
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("AETHER OS: Kategorie wirklich systemweit löschen?")) return;
    await supabase.from("categories").delete().eq("id", id);
    fetchCategories();
  };

  return (
    <div className="flex flex-col h-screen bg-[#060910] text-slate-200 font-sans italic overflow-hidden">
      
      {/* HEADER */}
      <header className="p-8 border-b border-white/5 bg-[#060910] flex justify-between items-center z-20">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
            <LayoutGrid size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500">AETHER OS // CORE</h1>
            <p className="text-3xl font-black uppercase tracking-tighter text-white">Global_Categories</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 px-6 py-2 bg-white/[0.02] border border-white/5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Cross-Module Sync: ACTIVE</span>
        </div>
      </header>

      <main className="flex-1 p-12 overflow-y-auto custom-scrollbar flex gap-16">
        
        {/* CREATE SECTION */}
        <section className="w-[400px] space-y-8">
          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] space-y-8 shadow-2xl">
            <div className="space-y-2">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-blue-500 flex items-center gap-2">
                <Plus size={14} /> Registrierung
              </h2>
              <p className="text-[11px] text-slate-500 uppercase font-bold">Neue Entität dem System hinzufügen</p>
            </div>
            
            <form onSubmit={handleAddCategory} className="space-y-8">
              {/* Modul Multi-Select */}
              <div className="space-y-4">
                <label className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] ml-2">Gültigkeitsbereich</label>
                <div className="flex flex-wrap gap-2">
                  {MODULES.map((mod) => (
                    <button
                      key={mod}
                      type="button"
                      onClick={() => toggleModule(mod)}
                      className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase transition-all border ${
                        selectedModules.includes(mod) 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]' 
                        : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/10'
                      }`}
                    >
                      {mod}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] ml-2">Name</label>
                <input 
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Z.B. CYBER-SECURITY..."
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm outline-none focus:border-blue-500 transition-all uppercase tracking-widest placeholder:text-white/5"
                />
              </div>

              <button 
                type="submit"
                disabled={submitting}
                className="w-full py-6 bg-blue-600 hover:bg-blue-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-[0_0_40px_rgba(37,99,235,0.2)] disabled:opacity-50"
              >
                {submitting ? <Loader2 className="animate-spin mx-auto" size={16} /> : "In Core registrieren"}
              </button>
            </form>
          </div>
        </section>

        {/* LIST SECTION - Gefiltert nach Sektoren */}
        <section className="flex-1 space-y-12">
          {MODULES.map((modName) => {
            // Filtern: Prüfen ob der Modulname im module-String der Kategorie vorkommt
            const moduleCats = categories.filter(c => c.module?.toLowerCase().includes(modName));
            
            if (moduleCats.length === 0) return null;

            return (
              <div key={modName} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] flex-1 bg-white/5"></div>
                  <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">{modName}_Sector</h3>
                  <div className="h-[1px] flex-1 bg-white/5"></div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {moduleCats.map((cat) => (
                    <div key={`${modName}-${cat.id}`} className="group p-6 bg-white/[0.01] border border-white/5 rounded-[2rem] flex items-center justify-between hover:bg-white/[0.03] hover:border-blue-500/20 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-blue-500 transition-colors">
                          <Hash size={16} />
                        </div>
                        <div>
                          <span className="text-lg font-black uppercase tracking-tight text-white group-hover:text-blue-400 transition-colors">{cat.name}</span>
                          <div className="flex items-center gap-2 mt-1">
                             <Globe size={10} className="text-slate-700" />
                             <p className="text-[8px] text-slate-600 uppercase tracking-widest font-mono">Scope: {cat.module}</p>
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleDelete(cat.id)}
                        className="p-3 text-slate-800 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

      </main>
    </div>
  );
}