import { getPageBySlug } from "@/lib/actions/pages.actions";
import BlockRenderer from "@/components/BlockRenderer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Block } from "@/lib/blocks";
import Navbar from "@/components/Navbar";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return {};
  return {
    title: page.meta_title || page.title,
    description: page.meta_description || "",
  };
}

function parseBlocks(raw?: string): Block[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default async function PublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page || !page.is_published) notFound();

  const blocks = parseBlocks(page.content);

  return (
    <>
      <Navbar />
      <BlockRenderer blocks={blocks} />
    </>
  );
}
