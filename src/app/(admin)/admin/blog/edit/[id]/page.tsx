"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function AetherEditor() {
  const router = useRouter();
  const params = useParams();
  const postId = params?.id; // Holt die ID aus der URL, falls vorhanden

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!postId);
  const [post, setPost] = useState({
    title: "",
    slug: "",
    content: "",
    main_image: "",
    seo_title: "",
    seo_description: "",
    tags: "" 
  });

  // Falls eine ID vorhanden ist: Bestehende Daten laden
  useEffect(() => {
    if (postId && postId !== "new") {
      const fetchPost = async () => {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("id", postId)
          .single();

        if (data && !error) {
          setPost({
            ...data,
            tags: data.tags ? data.tags.join(", ") : "" // Array zurück in String wandeln
          });
        }
        setFetching(false);
      };
      fetchPost();
    }
  }, [postId]);

  const generateSlug = (title: string) => {
    return title.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-");
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
      // UPSERT erkennt anhand der ID (falls vorhanden), ob es ein Update oder Insert ist
      const { error } = await supabase.from("blog_posts").upsert([
        {
          ...(postId && postId !== "new" ? { id: postId } : {}), // ID nur mitsenden wenn wir editieren
          title: post.title,
          slug: finalSlug,
          content: post.content,
          main_image: post.main_image || null,
          seo_title: post.seo_title || post.title,
          seo_description: post.seo_description || "",
          tags: tagsArray,
          updated_at: new Date().toISOString(),
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

  if (fetching) return <div className="bg-[#0b0f1a] h-screen flex items-center justify-center text-blue-500 font-mono uppercase tracking-widest">Initialisiere Editor...</div>;

  return (
    <div className="flex flex-col h-screen bg-[#0b0f1a] text-slate-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0b0f1a] z-20">
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-white">
            {postId && postId !== "new" ? "Editor: Post bearbeiten" : "Editor: Neuer Post"}
          </h2>
          <p className="text-[10px] text-blue-500 font-mono uppercase tracking-tighter">AETHER OS STUDIO</p>
        </div>
        <div className="flex gap-6 items-center">
          <Link href="/admin/blog" className="text-xs font-bold text-slate-500 hover:text-white transition-colors">Abbrechen</Link>
          <button 
            onClick={handlePublish}
            disabled={loading}
            className="px-8 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "System Sync..." : (postId && postId !== "new" ? "Änderungen Speichern" : "Veröffentlichen")}
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
              onChange={(e) => setPost({ ...post, title: e.target.value, slug: postId && postId !== "new" ? post.slug : generateSlug(e.target.value) })}
            />
            <div className="h-1 w-24 bg-blue-600 rounded-full opacity-50"></div>
            <textarea
              placeholder="Erzähl die Geschichte von AETHER OS..."
              className="w-full h-[60vh] bg-transparent text-xl font-light leading-relaxed outline-none resize-none placeholder:opacity-10"
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
            />
          </div>
        </div>

        {/* Rechte Sidebar */}
        <aside className="w-96 border-l border-white/5 bg-black/20 p-8 space-y-8 overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-500 border-b border-white/5 pb-2">Allgemein</h3>
            <div className="space-y-2">
              <label className="text-[9px] font-bold uppercase text-slate-500">Slug / URL</label>
              <input
                type="text"
                value={post.slug}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-[11px] font-mono text-blue-400 outline-none focus:border-blue-500/50"
                onChange={(e) => setPost({ ...post, slug: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-bold uppercase text-slate-500">Tags (mit Komma trennen)</label>
              <input
                type="text"
                placeholder="Tech, AETHER, Update..."
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-[11px] outline-none focus:border-blue-500/50"
                value={post.tags}
                onChange={(e) => setPost({ ...post, tags: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-500 border-b border-white/5 pb-2">SEO Intelligence</h3>
            <div className="space-y-2">
              <label className="text-[9px] font-bold uppercase text-slate-500">SEO Titel</label>
              <input
                type="text"
                placeholder="Google Titel..."
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-[11px] outline-none focus:border-blue-500/50"
                value={post.seo_title}
                onChange={(e) => setPost({ ...post, seo_title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-bold uppercase text-slate-500">SEO Description</label>
              <textarea
                placeholder="Kurze Meta-Beschreibung..."
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-[11px] h-24 outline-none focus:border-blue-500/50 resize-none"
                value={post.seo_description}
                onChange={(e) => setPost({ ...post, seo_description: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
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
          
          <div className="pt-6 border-t border-white/5">
             <p className="text-[9px] text-slate-600 font-medium leading-relaxed uppercase tracking-tighter">
              Status: <span className="text-blue-500">{postId && postId !== "new" ? "Editing Mode" : "Draft Mode"}</span><br />
              Visibility: <span className="text-white">Public</span><br />
              System: <span className="text-white">AETHER OS 2026</span>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}