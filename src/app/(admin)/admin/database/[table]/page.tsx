import { getTableRows, getTableColumns, ALLOWED_TABLES } from "@/lib/actions/database.actions";
import { notFound } from "next/navigation";
import { Database } from "lucide-react";
import Link from "next/link";
import TableEditor from "@/components/TableEditor";

export default async function TablePage({
  params,
  searchParams,
}: {
  params: Promise<{ table: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { table } = await params;
  const { page: pageParam } = await searchParams;

  if (!ALLOWED_TABLES.includes(table as typeof ALLOWED_TABLES[number])) notFound();

  const page = parseInt(pageParam || "0");
  const pageSize = 25;

  const [{ rows, total }, columns] = await Promise.all([
    getTableRows(table, page, pageSize),
    getTableColumns(table),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="p-8 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link href="/admin/database" className="text-slate-600 hover:text-white transition-colors">
              <Database size={16} />
            </Link>
            <span className="text-slate-600">/</span>
            <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic">
              {table}
            </h1>
          </div>
          <p className="text-slate-500 text-[10px] uppercase tracking-widest font-mono">
            {total} Zeilen · {columns.length} Spalten · Seite {page + 1} von {totalPages || 1}
          </p>
        </div>
      </div>

      {/* Table Editor (Client Component) */}
      <TableEditor
        table={table}
        rows={rows}
        columns={columns}
        page={page}
        totalPages={totalPages}
        total={total}
      />
    </div>
  );
}
