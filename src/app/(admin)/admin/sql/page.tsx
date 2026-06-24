"use client";

import { useState, useRef, useTransition } from "react";
import { executeSql } from "@/lib/actions/database.actions";
import {
  TerminalSquare, Play, Loader2, AlertTriangle,
  CheckCircle2, ChevronDown, Clock,
} from "lucide-react";

const QUICK_QUERIES = [
  { label: "Alle Tabellen", sql: "SELECT table_name, pg_size_pretty(pg_total_relation_size(table_name::regclass)) AS size FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;" },
  { label: "Bot Besuche heute", sql: "SELECT bot_name, count(*) FROM bot_visits WHERE created_at >= CURRENT_DATE GROUP BY bot_name ORDER BY count DESC;" },
  { label: "Letzte Bestellungen", sql: "SELECT id, customer_id, total, status, created_at FROM orders ORDER BY created_at DESC LIMIT 10;" },
  { label: "Published Pages", sql: "SELECT id, title, slug, updated_at FROM pages WHERE is_published = true ORDER BY updated_at DESC;" },
  { label: "DB Größe", sql: "SELECT pg_size_pretty(pg_database_size(current_database())) AS db_size;" },
];

type QueryResult = {
  rows?: Record<string, unknown>[];
  error?: string;
  affected?: number;
  duration?: number;
};

export default function SqlEditorPage() {
  const [sql, setSql] = useState("");
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showQuickQueries, setShowQuickQueries] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function run() {
    if (!sql.trim() || isPending) return;
    const start = Date.now();
    startTransition(async () => {
      const res = await executeSql(sql);
      setResult({ ...res, duration: Date.now() - start });
    });
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      run();
    }
  }

  const columns = result?.rows?.length ? Object.keys(result.rows[0]) : [];

  return (
    <div className="p-8 font-sans max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <TerminalSquare size={20} className="text-[#b33927]" />
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
              SQL Editor
            </h1>
          </div>
          <p className="text-slate-500 text-[10px] uppercase tracking-widest ml-8">
            Supabase · PostgreSQL · Ctrl+Enter zum Ausführen
          </p>
        </div>

        {/* Quick Queries */}
        <div className="relative">
          <button
            onClick={() => setShowQuickQueries((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all"
          >
            Schnellabfragen <ChevronDown size={12} className={showQuickQueries ? "rotate-180 transition-transform" : "transition-transform"} />
          </button>
          {showQuickQueries && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-slate-800 border border-white/10 rounded-xl overflow-hidden z-20 shadow-xl">
              {QUICK_QUERIES.map((q) => (
                <button
                  key={q.label}
                  onClick={() => { setSql(q.sql); setShowQuickQueries(false); textareaRef.current?.focus(); }}
                  className="w-full text-left px-4 py-3 text-[11px] text-slate-300 hover:text-white hover:bg-white/5 transition-all border-b border-white/5 last:border-0"
                >
                  <p className="font-bold uppercase tracking-wide">{q.label}</p>
                  <p className="text-slate-500 font-mono mt-0.5 text-[10px] truncate">{q.sql.slice(0, 50)}…</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="bg-slate-800/60 border border-white/5 rounded-2xl overflow-hidden mb-4">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-slate-900/40">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            <span className="ml-3 text-[10px] font-mono text-slate-500">query.sql</span>
          </div>
          <button
            onClick={run}
            disabled={isPending || !sql.trim()}
            className="flex items-center gap-2 px-4 py-1.5 disabled:opacity-40 text-white text-[11px] font-black uppercase tracking-widest rounded-lg transition-all"
            style={{ backgroundColor: "var(--admin-accent, #ea580c)" }}
          >
            {isPending ? <Loader2 size={11} className="animate-spin" /> : <Play size={11} />}
            {isPending ? "Ausführen…" : "Run"}
          </button>
        </div>
        <textarea
          ref={textareaRef}
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          onKeyDown={handleKey}
          placeholder={"-- SQL eingeben und Ctrl+Enter drücken\nSELECT * FROM pages LIMIT 10;"}
          rows={12}
          spellCheck={false}
          className="w-full bg-transparent px-6 py-4 text-sm font-mono text-slate-200 placeholder-slate-600 focus:outline-none resize-none leading-relaxed"
        />
      </div>

      {/* Results */}
      {result && (
        <div className="bg-slate-800/60 border border-white/5 rounded-2xl overflow-hidden">
          {/* Result header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-slate-900/40">
            <div className="flex items-center gap-3">
              {result.error ? (
                <>
                  <AlertTriangle size={13} className="text-red-400" />
                  <span className="text-[11px] font-bold text-red-400 uppercase tracking-widest">Fehler</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={13} className="text-green-400" />
                  <span className="text-[11px] font-bold text-green-400 uppercase tracking-widest">
                    {result.rows ? `${result.rows.length} Zeile${result.rows.length !== 1 ? "n" : ""}` : `${result.affected ?? 0} betroffen`}
                  </span>
                </>
              )}
            </div>
            {result.duration !== undefined && (
              <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-mono">
                <Clock size={10} /> {result.duration}ms
              </div>
            )}
          </div>

          {/* Error */}
          {result.error && (
            <div className="p-5">
              <pre className="text-red-400 text-xs font-mono whitespace-pre-wrap leading-relaxed">{result.error}</pre>
            </div>
          )}

          {/* Success — table */}
          {result.rows && result.rows.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10">
                    {columns.map((col) => (
                      <th key={col} className="text-left px-4 py-3 text-slate-400 font-bold uppercase tracking-widest text-[10px] whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      {columns.map((col) => {
                        const val = row[col];
                        const display = val == null
                          ? <span className="text-slate-600 italic">null</span>
                          : typeof val === "object"
                            ? <span className="text-blue-400">{JSON.stringify(val)}</span>
                            : <span className="text-slate-300">{String(val)}</span>;
                        return (
                          <td key={col} className="px-4 py-2.5 max-w-[300px] truncate">
                            {display}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Success — empty result */}
          {!result.error && result.rows?.length === 0 && (
            <div className="px-5 py-8 text-center text-slate-600 text-xs font-mono">
              Query erfolgreich · Keine Zeilen zurückgegeben
            </div>
          )}

          {/* Non-select success */}
          {!result.error && result.rows === undefined && (
            <div className="px-5 py-8 text-center text-green-400/70 text-xs font-mono">
              Query erfolgreich · {result.affected ?? 0} Zeile(n) betroffen
            </div>
          )}
        </div>
      )}
    </div>
  );
}
