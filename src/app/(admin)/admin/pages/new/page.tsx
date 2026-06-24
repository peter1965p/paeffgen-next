import { createPage } from "@/lib/actions/pages.actions";
import PageForm from "@/components/PageForm";
import { FilePlus } from "lucide-react";

export default function NewPageAdmin() {
  return (
    <div className="p-8 font-sans max-w-4xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <FilePlus size={20} className="text-[#b33927]" />
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Neue Seite
          </h1>
        </div>
        <p className="text-slate-500 text-[10px] uppercase tracking-widest ml-8">
          Seite erstellen und veröffentlichen
        </p>
      </div>

      <div className="bg-slate-800/60 border border-white/5 rounded-[2.5rem] p-10">
        <PageForm action={createPage} />
      </div>
    </div>
  );
}
