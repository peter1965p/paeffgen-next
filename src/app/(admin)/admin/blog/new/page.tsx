"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Share2, Copy, Sparkles, Loader2 } from "lucide-react";

export default function AetherEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generatingSocial, setGeneratingSocial] = useState(false);
  const [linkedinTeasers, setLinkedinTeasers] = useState<any[]>([]);
  
  const [post, setPost] = useState({
    title: "",
    slug: "",
    content: "",
    main_image: "",
    seo_title: "",
    seo_description: "",
    tags: ""
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-");
  };

  // Die neue Social_Engine Logik [cite: 2026-04-05]
  const generateLinkedInTeasers = async () => {
    if (!post.title || !post.content) {
      alert("System-Check: Titel und Inhalt werden für die Analyse benötigt.");
      return;
    }
    setGeneratingSocial(true);
    try {
      // Simulation der API-Anfrage (später durch echte KI-Route ersetzen)
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      const strategies = [
        { 
          type: "Expertise", 
          text: `🚀 Warum ${post.title} im Jahr 2026 alles verändert...\n\nNach 25 Jahren in der IT-Infrastruktur habe ich vieles gesehen, aber dieser Shift ist fundamental. Wer jetzt nicht auf AETHER OS setzt, verliert den Anschluss. #Cybersecurity #ITInfrastructure` 
        },
        { 
          type: "Hardware-DNA", 
          text: `Vom Lötkolben zur Cloud-Sicherheit: Meine Reise in der IT-Welt hat mich gelehrt, dass man Systeme von Grund auf verstehen muss. Mein neuer Artikel zu "${post.title}" zeigt genau das. 🛠️💻 #Fullstack #AETHEROS` 
        },
        { 
          type: "System-Showcase", 
          text: `AETHER OS Update: Neue Intelligence Unit online! 🛰️\n\nWir haben tiefgreifende Analysen zum Thema "${post.title}" implementiert. Hocheffizient. Sicher. Skalierbar. [Link zum Blog]` 
        }
      ];
      setLinkedinTeasers(strategies);
    } catch (err) {
      console.error("Social Engine Failure", err);
    } finally {
      setGeneratingSocial(false);
    }
  };

  const handlePublish = async () => {
    if (!post.title || !post.content) {
      alert("System-Check: Bitte Titel und Inhalt ausfüllen.");
      return;
    }
    setLoading(true);
    const finalSlug = post.slug || generateSlug(post.title);
    const tagsArray = post.tags ? post.tags.split(",").map(tag => tag.trim()) : [];

    try {
      const { error } = await supabase.from("blog_posts").insert([
        {
          title: post.title,
          slug: finalSlug,
          content: post.content,
          main_image: post.main_image || null,
          seo_title: post.seo_title || post.title,
          seo_description: post.seo_description || "",
          tags: tagsArray 
        },
      ]);
      if (error) throw error;
      router.push("/admin/blog");
      router.refresh();
    } catch (error: any) {
      alert("AETHER Database Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0b0f1a] text-slate-200 overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0b0f1a] z-20">
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-white">Editor: Neuer Post</h2>
          <p className="text-[10px] text-blue-500 font-mono uppercase tracking-tighter">AETHER OS STUDIO // SOCIAL_ENGINE READY</p>
        </div>
        <div className="flex gap-6 items-center">
          <Link href="/admin/blog" className="text-xs font-bold text-slate-500 hover:text-white transition-colors">Abbrechen</Link>
          <button 
            onClick={handlePublish}
            disabled={loading}
            className="px-8 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "System Sync..." : "Veröffentlichen"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Haupt-Schreibbereich */}
        <div className="flex-1 p-12 overflow-y-auto custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-10">
            <input
              type="text"
              placeholder="Dein Titel..."
              className="w-full bg-transparent text-6xl font-black tracking-tighter outline-none placeholder:opacity-10 focus:text-blue-500 transition-all duration-700"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value, slug: generateSlug(e.target.value) })}
            />
            <div className="h-1 w-24 bg-blue-600 rounded-full opacity-50"></div>
            <textarea
              placeholder="Erzähl die Geschichte von AETHER OS..."
              className="w-full h-[50vh] bg-transparent text-xl font-light leading-relaxed outline-none resize-none placeholder:opacity-10"
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
            />
          </div>
        </div>

        {/* Rechte Sidebar */}
        <aside className="w-[400px] border-l border-white/5 bg-black/20 p-8 space-y-8 overflow-y-auto custom-scrollbar">
          
          {/* NEU: Social Engine Section [cite: 2026-04-05] */}
          <div className="p-5 bg-blue-600/5 border border-blue-500/20 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-500">Social_Engine</h3>
              <button 
                onClick={generateLinkedInTeasers}
                disabled={generatingSocial}
                className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors text-blue-400"
              >
                {generatingSocial ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              </button>
            </div>
            
            {linkedinTeasers.length > 0 ? (
              <div className="space-y-3">
                {linkedinTeasers.map((teaser, i) => (
                  <div key={i} className="group relative bg-black/40 p-4 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all">
                    <p className="text-[8px] font-mono text-blue-500 uppercase mb-2">{teaser.type}</p>
                    <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-3 italic">"{teaser.text}"</p>
                    <button 
                      onClick={() => navigator.clipboard.writeText(teaser.text)}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-white text-black rounded-md"
                    >
                      <Copy size={10} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[9px] text-slate-600 italic">Klicke auf den Sparkle-Button, um LinkedIn-Teaser basierend auf deinem Content zu generieren.</p>
            )}
          </div>

          {/* General Section */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-white/5 pb-2">Allgemein</h3>
            <div className="space-y-2">
              <label className="text-[9px] font-bold uppercase text-slate-500">Slug / URL</label>
              <input
                type="text"
                value={post.slug}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-[11px] font-mono text-blue-400 outline-none focus:border-blue-500/50"
                onChange={(e) => setPost({ ...post, slug: e.target.value })}
              />
            </div>
          </div>

          {/* SEO Section */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-white/5 pb-2">SEO Intelligence</h3>
            <div className="space-y-2">
              <label className="text-[9px] font-bold uppercase text-slate-500">SEO Titel</label>
              <input
                type="text"
                placeholder="Google Titel..."
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-[11px] outline-none"
                value={post.seo_title}
                onChange={(e) => setPost({ ...post, seo_title: e.target.value })}
              />
            </div>
          </div>

          {/* Image Preview */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <label className="text-[9px] font-bold uppercase text-slate-500">Cover Image URL</label>
            <div className="aspect-video w-full rounded-2xl border-2 border-dashed border-white/5 flex items-center justify-center bg-black/40 overflow-hidden relative group">
              {post.main_image ? (
                <img src={post.main_image} className="w-full h-full object-cover opacity-60" alt="Preview" />
              ) : (
                <span className="text-[9px] font-black text-slate-700 uppercase">No Image</span>
              )}
            </div>
            <input
              type="text"
              placeholder="https://..."
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-[11px] outline-none"
              value={post.main_image}
              onChange={(e) => setPost({ ...post, main_image: e.target.value })}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}