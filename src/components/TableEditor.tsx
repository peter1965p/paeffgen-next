"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateRow, deleteRow } from "@/lib/actions/database.actions";
import { ChevronLeft, ChevronRight, Pencil, Trash2, X, Check, AlertTriangle } from "lucide-react";

type Column = { column_name: string; data_type: string; is_nullable: string };

interface Props {
  table: string;
  rows: Record<string, unknown>[];
  columns: Column[];
  page: number;
  totalPages: number;
  total: number;
}

export default function TableEditor({ table, rows, columns, page, totalPages }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [editRow, setEditRow]       = useState<Record<string, unknown> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<unknown | null>(null);
  const [error, setError]           = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  function openEdit(row: Record<string, unknown>) {
    setEditRow(row);
    setEditValues(Object.fromEntries(Object.entries(row).map(([k, v]) => [k, v == null ? "" : String(v)])));
    setError(null);
  }

  function closeEdit() { setEditRow(null); setError(null); }

  function handleSave() {
    if (!editRow) return;
    const updates: Record<string, unknown> = {};
    for (const col of columns) {
      if (col.column_name === "id") continue;
      const raw = editValues[col.column_name] ?? "";
      updates[col.column_name] = raw === "" ? null : raw;
    }
    startTransition(async () => {
      const res = await updateRow(table, editRow["id"], updates);
      if (res.error) { setError(res.error); return; }
      closeEdit();
      router.refresh();
    });
  }

  function handleDelete(id: unknown) {
    startTransition(async () => {
      const res = await deleteRow(table, id);
      if (res.error) { setError(res.error); }
      setDeleteTarget(null);
      router.refresh();
    });
  }

  function navigate(p: number) {
    router.push(`/admin/database/${table}?page=${p}`);
  }

  const visibleColumns = columns.slice(0, 8);

  return (
    <div>
      {error && (
        <div className="mb-4 flex items-center gap-2 p-3 bg-red-900/30 border border-red-500/30 rounded-xl text-red-400 text-xs font-mono">
          <AlertTriangle size={14} /> {error}
          <button onClick={() => setError(null)} className="ml-auto"><X size={12} /></button>
        </div>
      )}

      {/* Table */}
      <div className="bg-slate-800/60 border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 bg-slate-900/40">
                {visibleColumns.map((col) => (
                  <th key={col.column_name} className="text-left px-4 py-3 text-slate-400 font-bold uppercase tracking-widest text-[10px] whitespace-nowrap">
                    {col.column_name}
                    <span className="ml-1 text-slate-600 normal-case font-normal">{col.data_type.replace("character varying", "varchar").replace("timestamp without time zone", "timestamp")}</span>
                  </th>
                ))}
                {columns.length > 8 && (
                  <th className="text-left px-4 py-3 text-slate-600 font-bold text-[10px]">+{columns.length - 8} more</th>
                )}
                <th className="px-4 py-3 text-slate-600 text-[10px] w-20">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={visibleColumns.length + 2} className="px-4 py-10 text-center text-slate-600 text-xs">
                    Keine Daten
                  </td>
                </tr>
              ) : (
                rows.map((row, i) => (
                  <tr
                    key={String(row["id"] ?? i)}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors"
                  >
                    {visibleColumns.map((col) => {
                      const val = row[col.column_name];
                      const display = val == null ? <span className="text-slate-600 italic">null</span>
                        : typeof val === "object" ? <span className="text-blue-400">{"{…}"}</span>
                        : String(val).length > 40 ? String(val).slice(0, 40) + "…"
                        : String(val);
                      return (
                        <td key={col.column_name} className="px-4 py-2.5 text-slate-300 max-w-[180px] truncate">
                          {display}
                        </td>
                      );
                    })}
                    {columns.length > 8 && <td className="px-4 py-2.5 text-slate-600">…</td>}
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(row)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all"
                          title="Bearbeiten"
                        >
                          <Pencil size={11} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(row["id"])}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                          title="Löschen"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
            <button
              onClick={() => navigate(page - 1)}
              disabled={page === 0}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={12} /> Zurück
            </button>
            <span className="text-[10px] font-mono text-slate-500">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => navigate(page + 1)}
              disabled={page >= totalPages - 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Weiter <ChevronRight size={12} />
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-800 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wide italic">Zeile bearbeiten</h3>
                <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                  {table} · id: {String(editRow["id"])}
                </p>
              </div>
              <button onClick={closeEdit} className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                <X size={16} />
              </button>
            </div>

            <div className="overflow-y-auto p-5 flex flex-col gap-3">
              {columns.map((col) => (
                <div key={col.column_name}>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                    {col.column_name}
                    <span className="ml-2 font-normal text-slate-600 normal-case">{col.data_type}</span>
                    {col.column_name === "id" && <span className="ml-2 text-amber-500">readonly</span>}
                  </label>
                  <input
                    disabled={col.column_name === "id"}
                    value={editValues[col.column_name] ?? ""}
                    onChange={(e) => setEditValues((v) => ({ ...v, [col.column_name]: e.target.value }))}
                    className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-orange-500/50 disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </div>
              ))}
            </div>

            {error && (
              <div className="mx-5 mb-3 p-2 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-xs font-mono">
                {error}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 p-5 border-t border-white/10">
              <button onClick={closeEdit} className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
                Abbrechen
              </button>
              <button
                onClick={handleSave}
                disabled={isPending}
                className="flex items-center gap-2 px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white text-[11px] font-black uppercase tracking-widest rounded-xl disabled:opacity-50 transition-all"
              >
                <Check size={12} /> Speichern
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTarget !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-800 border border-red-500/20 rounded-2xl w-full max-w-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/10 rounded-xl">
                <AlertTriangle size={18} className="text-red-400" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wide italic">Löschen?</h3>
                <p className="text-[10px] text-slate-500 font-mono">id: {String(deleteTarget)}</p>
              </div>
            </div>
            <p className="text-slate-400 text-xs mb-6">
              Diese Aktion kann nicht rückgängig gemacht werden. Der Datensatz wird permanent gelöscht.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={() => handleDelete(deleteTarget)}
                disabled={isPending}
                className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-[11px] font-black uppercase tracking-widest rounded-xl disabled:opacity-50 transition-all"
              >
                <Trash2 size={12} /> Löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
