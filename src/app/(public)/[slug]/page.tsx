import { getPageBySlug } from "@/lib/actions/pages.actions";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return {};
  return {
    title: page.meta_title || page.title,
    description: page.meta_description || "",
  };
}

export default async function PublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page || !page.is_published) notFound();

  return (
    <main className="min-h-screen bg-black text-white">
      <article className="max-w-4xl mx-auto px-6 py-20">
        <header className="mb-16">
          <p className="text-[10px] font-mono text-[#b33927] uppercase tracking-[0.5em] mb-4">
            Spectora // {page.slug}
          </p>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none text-white">
            {page.title}
          </h1>
        </header>

        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:italic
            prose-p:text-slate-400 prose-p:leading-relaxed
            prose-a:text-[#b33927] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-code:text-[#b33927] prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
            prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-white/5 prose-pre:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: page.content || "" }}
        />
      </article>
    </main>
  );
}
