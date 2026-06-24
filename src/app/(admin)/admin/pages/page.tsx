import { getPages, deletePage } from "@/lib/actions/pages.actions";
import Link from "next/link";
import { FileText, Edit3, Trash2, Plus, ExternalLink } from "lucide-react";

export default async function PagesManagement() {
  const pages = await getPages();

  return (
    <div className="p-8 font-sans max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Seitenverwaltung
          </h1>
          <p className="text-slate-500 text-[10px] mt-1 uppercase tracking-widest">
            {pages.length} Seite{pages.length !== 1 ? "n" : ""} im System
          </p>
        </div>
        <Link
          href="/admin/pages/new"
          className="bg-[#b33927] hover:bg-[#d4442f] text-white font-bold py-3 px-6 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-red-950/20 uppercase text-xs tracking-widest"
        >
          <Plus size={16} /> Neue Seite
        </Link>
      </div>

      <div className="bg-zinc-950/50 border border-white/5 rounded-[2.5rem] overflow-hidden">
        <div className="divide-y divide-white/5">
          {(pages as Array<{ id: number; title: string; slug: string; is_published: boolean; show_in_nav: boolean; nav_order: number }>).map((page) => (
            <div
              key={page.id}
              className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-all group"
            >
              <div className="flex items-center gap-5 min-w-0">
                <div className="p-4 bg-zinc-900 rounded-2xl text-slate-400 group-hover:text-[#b33927] transition-colors shrink-0">
                  <FileText size={20} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-bold truncate">{page.title}</h3>
                  <p className="text-slate-500 text-xs font-mono">/{page.slug}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mx-6 shrink-0">
                {page.show_in_nav && (
                  <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase rounded-lg tracking-widest">
                    Nav
                  </span>
                )}
                <span className={`px-3 py-1 border text-[10px] font-black uppercase rounded-lg tracking-widest ${
                  page.is_published
                    ? "bg-green-500/10 border-green-500/20 text-green-500"
                    : "bg-zinc-800 border-zinc-700 text-zinc-500"
                }`}>
                  {page.is_published ? "Live" : "Entwurf"}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {page.is_published && (
                  <a
                    href={`/${page.slug}`}
                    target="_blank"
                    className="p-3 bg-zinc-900 hover:bg-zinc-800 text-slate-500 hover:text-blue-400 rounded-xl transition-all border border-white/5"
                    title="Vorschau"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
                <Link
                  href={`/admin/pages/edit/${page.id}`}
                  className="p-3 bg-zinc-900 hover:bg-zinc-800 text-slate-300 rounded-xl flex items-center gap-2 text-xs font-bold transition-all border border-white/5"
                >
                  <Edit3 size={14} className="text-[#b33927]" /> Bearbeiten
                </Link>
                <form action={async () => {
                  "use server";
                  await deletePage(page.id);
                }}>
                  <button
                    type="submit"
                    className="p-3 bg-zinc-900 hover:bg-red-950 text-red-500 rounded-xl transition-all border border-white/5"
                    title="Löschen"
                  >
                    <Trash2 size={14} />
                  </button>
                </form>
              </div>
            </div>
          ))}

          {pages.length === 0 && (
            <div className="p-20 text-center space-y-4">
              <p className="text-slate-600 uppercase tracking-widest text-xs">
                Noch keine Seiten erstellt.
              </p>
              <Link
                href="/admin/pages/new"
                className="inline-flex items-center gap-2 text-[#b33927] hover:text-[#d4442f] text-xs font-bold uppercase tracking-widest transition-colors"
              >
                <Plus size={14} /> Erste Seite erstellen
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
