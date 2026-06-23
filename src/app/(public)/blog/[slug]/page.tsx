import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = 'force-dynamic';

// Next.js 15+ erwartet params als Promise
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Params awaiten
  const { slug } = await params;

  // 2. Daten mit dem slug holen
  const { data: post } = await supabase
    .from("blog_posts")
    .select(`
      *,
      users ( username )
    `)
    .eq("slug", slug)
    .single();

  if (!post) {
    notFound(); 
  }

  return (
    <article className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="relative h-[60vh] w-full overflow-hidden border-b border-border">
        {post.main_image ? (
          <img 
            src={post.main_image} 
            alt={post.title} 
            className="w-full h-full object-cover opacity-40"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-blue-900/40 opacity-40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-12">
          <div className="max-w-4xl mx-auto space-y-6">
            <Link href="/blog" className="text-primary text-xs font-black uppercase tracking-widest hover:underline">
              ← Zurück zum Newsroom
            </Link>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-muted-foreground text-sm font-bold uppercase tracking-widest">
              <span>{post.users?.username || "SPECTORA INTEL"}</span>
              <span>•</span>
              <time>{new Date(post.created_at).toLocaleDateString("de-DE")}</time>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-20">
        <div className="prose prose-invert prose-blue max-w-none">
          <p className="text-xl leading-relaxed font-light opacity-90 whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
      </main>
    </article>
  );
}