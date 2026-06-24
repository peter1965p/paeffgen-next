import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabaseClient";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();

  const { data: pages } = await supabase
    .from("pages")
    .select("slug, updated_at")
    .eq("is_published", true);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: "https://www.paeffgen-it.de",        lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: "https://www.paeffgen-it.de/about",  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.paeffgen-it.de/blog",   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: "https://www.paeffgen-it.de/contact",lastModified: new Date(), changeFrequency: "yearly",  priority: 0.5 },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = (pages || []).map((page: { slug: string; updated_at: string | null }) => ({
    url: `https://www.paeffgen-it.de/${page.slug}`,
    lastModified: page.updated_at ? new Date(page.updated_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
