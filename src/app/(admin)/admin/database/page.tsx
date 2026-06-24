import { getTableList } from "@/lib/actions/database.actions";
import Link from "next/link";
import { Database, Table2, ChevronRight } from "lucide-react";

export default async function DatabasePage() {
  const tables = await getTableList();

  return (
    <div className="p-8 font-sans max-w-5xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Database size={20} className="text-[#b33927]" />
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Datenbank Editor
          </h1>
        </div>
        <p className="text-slate-500 text-[10px] uppercase tracking-widest ml-8">
          Supabase direkt im Admin — {tables.length} Tabellen verfügbar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tables.map(({ table, count }) => (
          <Link
            key={table}
            href={`/admin/database/${table}`}
            className="group bg-slate-800/60 border border-white/5 hover:border-[#b33927]/40 rounded-[2rem] p-6 transition-all hover:bg-slate-800/80"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-slate-700/50 rounded-xl group-hover:bg-[#b33927]/10 transition-all">
                <Table2 size={16} className="text-slate-400 group-hover:text-[#b33927]" />
              </div>
              <ChevronRight size={14} className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all mt-1" />
            </div>
            <p className="text-white font-black text-sm uppercase tracking-wider">{table}</p>
            <p className="text-slate-500 text-[10px] mt-1 font-mono">{count} Zeilen</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
