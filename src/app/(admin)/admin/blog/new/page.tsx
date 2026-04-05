"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Copy, Sparkles, Loader2, 
  Cloud, HardDrive, X, Upload, ImageIcon, 
  ChevronLeft, Globe, Check 
} from "lucide-react";

export default function AetherEditor() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // States
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
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
    tags: ""
  });

  // --- LOGIK-FUNKTIONEN ---

  const generateSlug = (title: string) => {
    return title.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPost(prev => ({ ...prev, title: val, slug: generateSlug(val) }));
  };

  // Die "Krönung": Intelligente Content-Extraktion für LinkedIn
  const generateLinkedInTeasers = async () => {
    if (!post.title || !post.content) {
      alert("System-Check: Content benötigt für Extraktion.");
      return;
    }
    
    setGeneratingSocial(true);
    try {
      await new Promise(r => setTimeout(r, 1000)); // Simuliert Rechenzeit

      // Content säubern (Markdown-Symbole entfernen)
      const cleanBody = post.content.replace(/[#*`>_-]/g, '').trim();
      const sentences = cleanBody.split(/[.!?]\s/).filter(s => s.length > 30);
      
      const intro = sentences[0] || "Ein neuer Meilenstein in der Entwicklung.";
      const highlight = sentences[1] || "Die Details dazu erfährst du im aktuellen System-Update.";

      setLinkedinTeasers([
        { 
          type: "Professional", 
          text: `🚀 NEU AUF AETHER OS: ${post.title.toUpperCase()}\n\n${intro}.\n\nEin tiefer Einblick in die Architektur und Umsetzung. Jetzt lesen auf dem Dashboard.\n\n#AetherOS #TechInnovation #Development` 
        },
        { 
          type: "Insight/Hook", 
          text: `Wusstest du schon? 🤔\n\n${highlight}.\n\nIch habe die Details zu "${post.title}" zusammengefasst. Was denkst du über diese Entwicklung? 👇\n\n#SoftwareEngineering #FutureTech #Aether` 
        }
      ]);
    } finally {
      setGeneratingSocial(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
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
    } catch (e: any) {
      alert("Upload-Fehler: " + e.message);
    } finally {
      setUploading(false);
    }
  };

  const handlePublish = async () => {
    if (!post.title || !post.content) return alert("System-Check: Unvollständig.");
    setLoading(true);
    try {
      const { error } = await supabase.from("blog_posts").insert([{
        ...post,
        tags: post.tags ? post.tags.split(",").map(t => t.trim()) : []
      }]);
      if (error) throw error;
      router.push("/admin/blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0b0f1a] text-slate-200 overflow-hidden font-sans">
      
      {/* HEADER */}
      <header className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0b0f1a] z-30">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-500">
            <ChevronLeft size={20} />
          </Link>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 italic">Aether OS // Intelligence_Editor</h2>
        </div>
        <button 
          onClick={handlePublish}
          disabled={loading}
          className="px-8 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.2)] disabled:opacity-50"
        >
          {loading ? "Synchronizing..." : "Publish to Core"}
        </button>
      </header>

      <main className="flex flex-1 overflow-hidden">
        
        {/* WRITING CANVAS */}
        <div className="flex-1 p-12 overflow-y-auto custom-scrollbar bg-black/10">
          <div className="max-w-3xl mx-auto space-y-10">
            <input
              type="text"
              placeholder="TITLE..."
              className="w-full bg-transparent text-6xl font-black tracking-tighter outline-none placeholder:opacity-5 focus:text-blue-500 transition-all italic uppercase"
              value={post.title}
              onChange={handleTitleChange}
            />
            <textarea
              placeholder="Start data transmission..."
              className="w-full h-[60vh] bg-transparent text-xl font-light leading-relaxed outline-none resize-none placeholder:opacity-5"
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
            />
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="w-[420px] border-l border-white/5 bg-black/40 p-8 space-y-8 overflow-y-auto custom-scrollbar shadow-2xl">
          
          {/* IMAGE ASSET */}
          <section className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Main_Asset</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-video w-full rounded-[2rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center bg-black/60 cursor-pointer hover:border-blue-500/40 transition-all overflow-hidden relative group"
            >
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
              {uploading ? (
                <Loader2 className="animate-spin text-blue-500" />
              ) : post.main_image ? (
                <img src={post.main_image} className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" />
              ) : (
                <ImageIcon className="opacity-10 group-hover:opacity-100 group-hover:text-blue-500 transition-all" size={32} />
              )}
            </div>
          </section>

          {/* SOCIAL ENGINE (The Crown Jewel) */}
          <section className="p-6 bg-blue-600/[0.03] border border-blue-500/10 rounded-[2rem] space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Social_Engine</h3>
              <button 
                onClick={generateLinkedInTeasers} 
                disabled={generatingSocial}
                className="p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl text-blue-400 transition-all"
              >
                {generatingSocial ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
              </button>
            </div>

            <div className="space-y-6">
              {linkedinTeasers.map((t, i) => (
                <div key={i} className="group relative space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[8px] font-bold text-slate-500 uppercase">{t.type}</span>
                    <button onClick={() => copyToClipboard(t.text, i)} className="text-slate-500 hover:text-white transition-colors">
                      {copiedIndex === i ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                    </button>
                  </div>
                  <textarea
                    value={t.text}
                    onChange={(e) => {
                      const newT = [...linkedinTeasers];
                      newT[i].text = e.target.value;
                      setLinkedinTeasers(newT);
                    }}
                    className="w-full bg-black/60 border border-white/5 p-4 rounded-2xl text-[11px] h-32 outline-none resize-none italic font-light text-slate-400 focus:border-blue-500/30 transition-all custom-scrollbar"
                  />
                </div>
              ))}
              {linkedinTeasers.length === 0 && (
                <p className="text-[9px] text-slate-600 italic text-center py-4 uppercase tracking-widest">Warte auf Content-Analyse...</p>
              )}
            </div>
          </section>

          {/* CONFIG */}
          <section className="space-y-4 border-t border-white/5 pt-6">
            <div className="space-y-2">
              <label className="text-[9px] font-bold uppercase text-slate-500 italic">Slug</label>
              <input
                type="text"
                value={post.slug}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-[11px] font-mono text-blue-400 outline-none"
                onChange={(e) => setPost({ ...post, slug: e.target.value })}
              />
            </div>
          </section>

        </aside>
      </main>
    </div>
  );
}