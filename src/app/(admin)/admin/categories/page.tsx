"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { 
  Plus, Trash2, Layers, 
  Loader2, Hash, LayoutGrid, 
  Activity, Info
} from "lucide-react";

export default function GlobalCategoryCenter() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newName, setNewName] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });
    
    if (!error && data) setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const generateSlug = (name: string) => {
    return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setSubmitting(true);
    const { error } = await supabase
      .from("categories")
      .insert([{ name: newName, slug: generateSlug(newName) }]);

    if (!error) {
      setNewName("");
      fetchCategories();
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("System-Warnung: Diese Kategorie ist global. Das Löschen kann Auswirkungen auf Shop, Blog und Workshop haben.")) return;
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
            <p className="text-3xl font-black uppercase tracking-tighter text-white">Global Categories</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 px-6 py-2 bg-white/[0.02] border border-white/5 rounded-full">
            <Activity size={12} className="text-green-500 animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Cross-Module Sync: ON</span>
        </div>
      </header>

      <main className="flex-1 p-12 overflow-y-auto custom-scrollbar flex gap-16">
        
        {/* ADD SECTION */}
        <section className="w-[400px] space-y-8">
          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
              <Plus size={14} className="text-blue-500" /> Neue Entität
            </h2>
            
            <form onSubmit={handleAddCategory} className="space-y-4">
              <input 
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="NAME..."
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm outline-none focus:border-blue-500 transition-all uppercase tracking-widest"
              />
              <button 
                type="submit"
                disabled={submitting}
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(37,99,235,0.2)]"
              >
                {submitting ? <Loader2 className="animate-spin mx-auto" size={16} /> : "In Core registrieren"}
              </button>
            </form>
          </div>

          <div className="p-6 border border-white/5 rounded-3xl bg-white/[0.01] flex gap-4">
            <Info size={20} className="text-blue-400 shrink-0" />
            <p className="text-[10px] leading-relaxed text-slate-500 uppercase font-bold">
              Kategorien sind System-Knoten. Sie werden automatisch in allen aktiven Modulen (Shop, Blog, Inventory) als Filteroption bereitgestellt.
            </p>
          </div>
        </section>

        {/* LIST SECTION */}
        <section className="flex-1">
          <div className="grid grid-cols-2 gap-4 auto-rows-max">
            {loading ? (
              <div className="col-span-2 flex justify-center p-20"><Loader2 className="animate-spin text-blue-500" /></div>
            ) : categories.map((cat) => (
              <div key={cat.id} className="group p-6 bg-white/[0.01] border border-white/5 rounded-[2rem] flex items-center justify-between hover:bg-white/[0.03] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-blue-500 transition-colors">
                    <Hash size={16} />
                  </div>
                  <div>
                    <span className="text-lg font-black uppercase tracking-tight text-white">{cat.name}</span>
                    <code className="block text-[9px] text-slate-600 mt-1 uppercase tracking-tighter">Slug: {cat.slug}</code>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(cat.id)}
                  className="p-3 text-slate-700 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}