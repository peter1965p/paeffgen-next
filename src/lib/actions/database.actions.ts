"use server";

import { createClient } from "@/lib/supabaseClient";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { revalidatePath } from "next/cache";
import { ALLOWED_TABLES, type AllowedTable } from "@/lib/database.constants";

export async function getTableList() {
  const supabase = createClient();
  const results = await Promise.all(
    ALLOWED_TABLES.map(async (table) => {
      const { count, error } = await supabase
        .from(table)
        .select("*", { count: "exact", head: true });
      return { table, count: error ? null : (count ?? 0) };
    })
  );
  return results.filter((r) => r.count !== null);
}

export async function getTableColumns(table: string) {
  const { data } = await supabaseAdmin
    .from("information_schema.columns" as never)
    .select("column_name, data_type, is_nullable")
    .eq("table_schema", "public")
    .eq("table_name", table)
    .order("ordinal_position");
  return (data as Array<{ column_name: string; data_type: string; is_nullable: string }>) || [];
}

export async function getTableRows(table: string, page = 0, pageSize = 25) {
  if (!ALLOWED_TABLES.includes(table as AllowedTable)) return { rows: [], total: 0 };
  const from = page * pageSize;
  const to   = from + pageSize - 1;
  const { data, count } = await supabaseAdmin
    .from(table as never)
    .select("*", { count: "exact" })
    .range(from, to)
    .order("id", { ascending: false });
  return { rows: (data as Record<string, unknown>[]) || [], total: count || 0 };
}

export async function updateRow(table: string, id: unknown, updates: Record<string, unknown>) {
  if (!ALLOWED_TABLES.includes(table as AllowedTable)) return { error: "Tabelle nicht erlaubt" };
  const { error } = await supabaseAdmin.from(table as never).update(updates as never).eq("id", id as never);
  if (error) return { error: error.message };
  revalidatePath(`/admin/database/${table}`);
  return { success: true };
}

export async function deleteRow(table: string, id: unknown) {
  if (!ALLOWED_TABLES.includes(table as AllowedTable)) return { error: "Tabelle nicht erlaubt" };
  const { error } = await supabaseAdmin.from(table as never).delete().eq("id", id as never);
  if (error) return { error: error.message };
  revalidatePath(`/admin/database/${table}`);
  return { success: true };
}

export async function executeSql(query: string): Promise<{ rows?: Record<string, unknown>[]; error?: string; affected?: number }> {
  const trimmed = query.trim();
  if (!trimmed) return { error: "Leere Query" };

  const isSelect = /^SELECT/i.test(trimmed);

  if (isSelect) {
    const { data, error } = await supabaseAdmin.rpc("exec_sql", { query: trimmed });
    if (error) return { error: error.message };
    const rows = Array.isArray(data) ? data : (data ? [data] : []);
    return { rows: rows as Record<string, unknown>[] };
  }

  // INSERT / UPDATE / DELETE — direkt ausführen via exec_sql
  const wrapped = `WITH result AS (${trimmed} RETURNING *) SELECT * FROM result`;
  const { data, error } = await supabaseAdmin.rpc("exec_sql", { query: wrapped });
  if (error) {
    // Fallback ohne RETURNING
    const { error: e2 } = await supabaseAdmin.rpc("exec_sql", { query: trimmed });
    if (e2) return { error: e2.message };
    return { affected: 0 };
  }
  const rows = Array.isArray(data) ? data : [];
  return { rows: rows as Record<string, unknown>[], affected: rows.length };
}
