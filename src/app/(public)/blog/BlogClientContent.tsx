"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  main_image: string | null;
  tags: string[] | null;
  created_at: string;
}

export default function BlogClientContent({ initialPosts, allTags }: { initialPosts: Post[], allTags: string[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Hilfsfunktion: Berechnet Lesezeit [cite: 2026-02-20]
  const calculateReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const noOfWords = text ? text.split(/\s/g).length : 0;
    const minutes = Math.ceil(noOfWords / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Kombinierte Filter-Logik: Tag + Suche [cite: 2026-02-20]
  const filteredPosts = initialPosts.filter(post => {
    const matchesTag = activeTag ? post.tags?.includes(activeTag) : true;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  return (
    <div className="space-y-12">
      {/* Search & Filter Header [cite: 2026-02-20] */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-white/5 p-6 rounded-3xl border border-white/5">
        
        {/* Tag-Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mr-2">Sector:</span>
          <button 
            onClick={() => setActiveTag(null)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
              activeTag === null ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            All Units
          </button>
          {allTags.map((tag) => (
            <button 
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTag === tag ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Suchfeld mit SPECTORA-Design [cite: 2026-02-20] */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search Intelligence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-4 text-xs text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 transition-all font-mono"
          />
          <div className="absolute right-3 top-2.5 opacity-20">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </div>
      </div>

      {/* Grid [cite: 2026-02-20] */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={`${activeTag}-${searchQuery}`} 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              layout
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="bg-white/5 border border-white/5 rounded-3xl p-6 h-full flex flex-col hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]">
                  
                  <div className="aspect-video w-full rounded-2xl overflow-hidden mb-6 bg-slate-900 border border-white/5">
                    {post.main_image ? (
                      <img src={post.main_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-slate-700">SPECTORA_ASSET_NULL</div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags?.map(t => (
                      <span key={t} className="text-[9px] font-black text-blue-500 uppercase">#{t}</span>
                    ))}
                  </div>

                  <h2 className="text-2xl font-black tracking-tighter text-white mb-4 leading-none group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-400 text-sm font-light leading-relaxed line-clamp-3 mb-6">
                    {post.content}
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
                    <div className="flex gap-4 items-center">
                      <span>{new Date(post.created_at).toLocaleDateString("de-DE")}</span>
                      <span className="w-1 h-1 bg-blue-500/50 rounded-full"></span>
                      <span>{calculateReadTime(post.content)}</span>
                    </div>
                    <span className="group-hover:text-white transition-colors">Read Intel →</span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No Results [cite: 2026-02-20] */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-32">
          <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.3em]">No data found for "{searchQuery}" in this sector.</p>
        </div>
      )}
    </div>
  );
}