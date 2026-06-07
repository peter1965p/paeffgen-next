import { supabase } from "@/lib/supabaseClient";
import BlogClientContent from "./BlogClientContent";
import type { BlogPost } from "@/types/database";

export const metadata = {
  title: "Päffgen IT | Blog",
  description: "Beiträge und Updates von Päffgen IT.",
};

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error)
    return (
      <div className="p-20 text-white font-mono uppercase">
        Fehler: {error.message}
      </div>
    );

  const allTags = Array.from(
    new Set((posts as BlogPost[])?.flatMap((post) => post.tags || [])),
  );

  return (
    <main className="min-h-screen bg-[#0b0f1a] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-8">
        <header className="mb-16">
          <h1 className="text-6xl font-black tracking-tighter text-white mb-4 italic uppercase">
            Blog
          </h1>
          <div className="h-1 w-24 bg-blue-600 rounded-full"></div>
        </header>
        <BlogClientContent initialPosts={posts || []} allTags={allTags} />
      </div>
    </main>
  );
}
