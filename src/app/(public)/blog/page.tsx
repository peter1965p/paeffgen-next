import { supabase } from "@/lib/supabaseClient";
import BlogClientContent from "./BlogClientContent";

export const metadata = {
  title: "AETHER OS | Newsroom",
  description: "Intelligence-Updates der Paeffgen IT.",
};

export default async function BlogPage() {
  // Holt alle Posts inklusive der neuen SEO- und Tag-Spalten [cite: 2026-02-20]
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return <div className="p-20 text-white font-mono uppercase">System Error: {error.message}</div>;

  // Extrahiert alle einzigartigen Tags für die Filter-Bar [cite: 2026-02-20]
  const allTags = Array.from(new Set(posts?.flatMap(post => post.tags || [])));

  return (
    <main className="min-h-screen bg-[#0b0f1a] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-8">
        <header className="mb-16">
          <h1 className="text-6xl font-black tracking-tighter text-white mb-4 italic uppercase">Newsroom</h1>
          <div className="h-1 w-24 bg-blue-600 rounded-full"></div>
        </header>

        {/* Übergabe an die Client-Komponente für Filterung & Lesezeit-Berechnung [cite: 2026-02-20] */}
        <BlogClientContent initialPosts={posts || []} allTags={allTags} />
      </div>
    </main>
  );
}