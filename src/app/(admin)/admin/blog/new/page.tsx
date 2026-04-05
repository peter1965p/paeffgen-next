"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Copy, Sparkles, Loader2, 
  ImageIcon, Check, Globe, 
  Layers, Search, Tag 
} from "lucide-react";

export default function AetherEditor() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // States
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);
  const [generatingSocial, setGeneratingSocial] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [linkedinTeasers, setLinkedinTeasers] = useState<{type: string, text: string}[]>([]);
  
  const [post, setPost] = useState({
    title: "",
    slug: "",
    content: "",
    main_image: "",
    seo_title: "",
    seo_description: "",
    tags: "",
    category_id: "" // Jetzt als ID für die DB-Verknüpfung
  });

  // ECHTE KATEGORIEN LADEN
  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name', { ascending: true });
      
      if (!error && data) {
        setCategories(data);
      }
    }
    fetchCategories();
  }, []);

  const generateSlug = (title: string) => {
    return title.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPost(prev => ({ ...prev, title: val, slug: generateSlug(val) }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from('blog-images').upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(fileName);
      setPost(prev => ({ ...prev, main_image: publicUrl }));
    } finally {
      setUploading(false);
    }
  };

  const handlePublish = async () => {
    if (!post.title || !post.content || !post.category_id) {
      return alert("System-Check: Titel, Inhalt und Kategorie sind Pflichtfelder!");
    }
    setLoading(true);
    try {
      // Tags von String zu Array für die DB (ARRAY DEFAULT '{}'::text[])
      const tagsArray = post.tags ? post.tags.split(",").map(t => t.trim()) : [];

      const { error } = await supabase.from("blog_posts").insert([{
        title: post.title,
        slug: post.slug,
        content: post.content,
        main_image: post.main_image,
        seo_title: post.seo_title,
        seo_description: post.seo_description,
        tags: tagsArray,
        category_id: parseInt(post.category_id) // Als Integer speichern
      }]);

      if (error) throw error;
      router.push("/admin/blog");
    } catch (err: any) {
      alert("Fehler beim Speichern: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#060910] text-slate-200 overflow-hidden font-sans italic">
      
      {/* HEADER */}
      <header className="flex items-center justify-between p-6 border-b border-white/5 bg-[#060910] z-30">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">AETHER OS // CONTROL CENTER</span>
           </div>
        </div>
        <div className="flex items-center gap-8">
           <Link href="/admin/blog" className="text-[10px] uppercase font-bold text-slate-500 hover:text-white transition-all">Discard</Link>
           <button 
             onClick={handlePublish}
             disabled={loading}
             className="px-10 py-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase rounded-lg shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all flex items-center gap-2"
           >
             {loading ? <Loader2 size={14} className="animate-spin" /> : <Globe size={14} />}
             Veröffentlichen
           </button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        
        {/* EDITOR */}
        <div className="flex-1 p-20 overflow-y-auto custom-scrollbar bg-black/20">
          <div className="max-w-4xl mx-auto space-y-16">
            <input
              type="text"
              placeholder="TITLE..."
              className="w-full bg-transparent text-8xl font-black tracking-tighter outline-none placeholder:text-white/5 focus:text-blue-500 transition-all duration-700 uppercase"
              value={post.title}
              onChange={handleTitleChange}
            />
            <textarea
              placeholder="Start data transmission..."
              className="w-full h-[60vh] bg-transparent text-2xl font-light leading-relaxed outline-none resize-none"
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
            />
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="w-[450px] border-l border-white/5 bg-[#060910] p-8 space-y-10 overflow-y-auto custom-scrollbar">
          
          {/* MAIN ASSET */}
          <section className="space-y-4">
             <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <ImageIcon size={12} /> Main_Asset
             </h3>
             <div onClick={() => fileInputRef.current?.click()} className="aspect-video w-full rounded-[2rem] border border-white/10 bg-white/[0.02] flex items-center justify-center cursor-pointer overflow-hidden relative group hover:border-blue-500/30">
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} accept="image/*" />
                {uploading ? <Loader2 className="animate-spin text-blue-500" /> : 
                 post.main_image ? <img src={post.main_image} className="w-full h-full object-cover" /> : 
                 <div className="text-[10px] uppercase opacity-20 group-hover:opacity-100 transition-opacity text-center px-4">Upload Header Image</div>}
             </div>
          </section>

          {/* KATEGORIE AUS DATENBANK */}
          <section className="space-y-4 pt-6 border-t border-white/5">
             <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
                <Layers size={12} /> System_Category
             </h3>
             <select 
                value={post.category_id}
                onChange={(e) => setPost({...post, category_id: e.target.value})}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-[11px] text-slate-300 outline-none appearance-none cursor-pointer focus:border-blue-500/40 transition-all uppercase tracking-widest"
             >
                <option value="" className="bg-[#060910]">Kategorie wählen...</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-[#060910]">{cat.name}</option>
                ))}
             </select>
             {categories.length === 0 && (
                 <p className="text-[9px] text-orange-500 italic px-2">Keine Kategorien in DB gefunden!</p>
             )}
          </section>

          {/* SLUG & SEO */}
          <section className="space-y-6 pt-6 border-t border-white/5">
             <div className="space-y-2">
                <label className="text-[9px] font-bold text-slate-600 uppercase ml-1 tracking-widest">Permalink</label>
                <input type="text" value={post.slug} readOnly className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-[10px] text-blue-400 font-mono outline-none italic" />
             </div>
             
             <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2"><Search size={12} /> SEO_Intelligence</h3>
                <input 
                  type="text" 
                  placeholder="Meta Title..."
                  value={post.seo_title || ""}
                  onChange={(e) => setPost({...post, seo_title: e.target.value})}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-4 text-[11px] outline-none" 
                />
                <textarea 
                  placeholder="Meta Description..."
                  value={post.seo_description || ""}
                  onChange={(e) => setPost({...post, seo_description: e.target.value})}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-4 text-[11px] h-20 outline-none resize-none" 
                />
             </div>
          </section>

          {/* TAGS */}
          <section className="space-y-4 pt-6 border-t border-white/5">
             <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2"><Tag size={12} /> Meta_Tags</h3>
             <input 
                type="text" 
                value={post.tags}
                onChange={(e) => setPost({...post, tags: e.target.value})}
                placeholder="TAG1, TAG2..." 
                className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-4 text-[11px] outline-none" 
             />
          </section>

        </aside>
      </main>
    </div>
  );
}