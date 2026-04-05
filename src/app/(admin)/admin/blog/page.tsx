"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Cpu, Database, Trash2, Edit3, Plus } from "lucide-react";

export default function IntelligenceHub() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Live-Daten aus Supabase ziehen
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data) {
          setPosts(data);
        }
      } catch (err) {
        console.error("Critical System Error during Sync:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const handleDelete = async (id: number | string) => {
    if (!confirm("SYSTEM-CRITICAL: Datensatz wirklich unwiderruflich löschen?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (!error) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  return (
    <div className="p-10 space-y-12 bg-transparent min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-end border-b border-white/5 pb-10">
        <div>
          <h1 className="text-6xl font-black tracking-tighter text-white uppercase italic leading-none text-shadow-glow">Intelligence</h1>
          <p className="text-blue-500 font-mono text-[10px] mt-4 uppercase tracking-[0.4em]">Global Data Stream Management // AETHER OS</p>
        </div>
        <Link href="/admin/blog/new">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(37,99,235,0.2)] flex items-center gap-2">
            <Plus size={14} /> NEW ENTRY
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4 opacity-50">
          <Cpu className="animate-spin text-blue-500" size={32} />
          <p className="text-[10px] font-mono uppercase tracking-[0.3em]">Syncing Database...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {posts.map((unit, i) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-[#0d111c]/50 border border-white/5 rounded-[2.5rem] p-10 hover:border-blue-500/50 hover:bg-white/[0.03] transition-all duration-500 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="max-w-[70%]">
                  <span className="text-blue-500 font-mono text-[9px] uppercase tracking-widest mb-2 block">
                    Data Package // {new Date(unit.created_at).toLocaleDateString('de-DE')}
                  </span>
                  <h3 className="text-3xl font-black text-white italic tracking-tighter leading-tight group-hover:text-blue-400 transition-colors">
                    {unit.title}
                  </h3>
                </div>
                <div className="px-4 py-1.5 rounded-full border border-blue-500/50 text-blue-400 bg-blue-500/5 text-[8px] font-black uppercase tracking-widest">
                  {unit.status || "Published"}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-8 mb-8">
                <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
                  <p className="text-slate-600 text-[8px] font-black uppercase tracking-widest mb-1">Source Slug</p>
                  <p className="text-slate-400 font-mono text-[10px] truncate">/{unit.slug}</p>
                </div>
                <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
                  <p className="text-slate-600 text-[8px] font-black uppercase tracking-widest mb-1">Database ID</p>
                  <p className="text-white font-mono text-[10px] truncate">
                    {/* HIER WAR DER FEHLER: Wir wandeln unit.id explizit in einen String um */}
                    ID: {unit.id ? String(unit.id).padStart(4, '0') : "0000"}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href={`/admin/blog/edit/${unit.id}`} className="flex-1">
                  <button className="w-full bg-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-black hover:bg-blue-600 hover:text-white transition-all shadow-xl flex items-center justify-center gap-2">
                    <Edit3 size={14} /> DECRYPT & EDIT
                  </button>
                </Link>
                <button 
                  onClick={() => handleDelete(unit.id)}
                  className="w-16 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-all text-slate-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}

          {posts.length === 0 && (
            <div className="col-span-full py-20 border-2 border-dashed border-white/5 rounded-[3rem] text-center opacity-20">
               <Database className="mx-auto mb-4" size={48} />
               <p className="text-[10px] font-mono uppercase tracking-[0.5em]">No Data Streams Found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}