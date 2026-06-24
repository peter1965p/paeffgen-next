import { getPageById, updatePage } from "@/lib/actions/pages.actions";
import PageForm from "@/components/PageForm";
import { notFound } from "next/navigation";
import { FileEdit } from "lucide-react";

export default async function EditPageAdmin({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await getPageById(parseInt(id));

  if (!page) notFound();

  const action = async (formData: FormData) => {
    "use server";
    return updatePage(page.id, formData);
  };

  return (
    <div className="p-8 font-sans max-w-4xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <FileEdit size={20} className="text-[#b33927]" />
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Seite bearbeiten
          </h1>
        </div>
        <p className="text-slate-500 text-[10px] uppercase tracking-widest ml-8 font-mono">
          /{page.slug}
        </p>
      </div>

      <div className="bg-slate-800/60 border border-white/5 rounded-[2.5rem] p-10">
        <PageForm page={page} action={action} />
      </div>
    </div>
  );
}
