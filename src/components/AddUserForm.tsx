"use client";

import { createUser } from "@/lib/actions/user.actions";
import { UserPlus, Loader2, Shield } from "lucide-react";
import { useState } from "react";

export default function AddUserForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await createUser(formData);
    (e.target as HTMLFormElement).reset();
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#0d111c] border border-white/5 p-6 rounded-3xl flex flex-wrap gap-4 items-end mb-8 shadow-2xl transition-all hover:border-blue-500/20">
      <div className="flex-1 min-w-[180px] space-y-2">
        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-1 text-glow-blue">Operator Alias</label>
        <input name="username" required placeholder="z.B. Neo" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-blue-500 outline-none transition-all placeholder:opacity-30" />
      </div>
      
      <div className="flex-1 min-w-[180px] space-y-2">
        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-1 text-glow-blue">Identity Mail</label>
        <input name="email" type="email" required placeholder="operator@aether.os" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-blue-500 outline-none transition-all placeholder:opacity-30" />
      </div>

      {/* Das neue Rollen-System [cite: 2026-03-08] */}
      <div className="flex-1 min-w-[150px] space-y-2">
        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-1 text-glow-blue">Access Level</label>
        <select name="role" defaultValue="admin" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer">
          <option value="admin" className="bg-[#0d111c]">ADMIN (Full Control)</option>
          <option value="editor" className="bg-[#0d111c]">EDITOR (Content Only)</option>
          <option value="viewer" className="bg-[#0d111c]">VIEWER (Read Only)</option>
        </select>
      </div>

      <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-black italic uppercase text-[10px] flex items-center gap-2 transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-blue-500/20 h-[46px]">
        {loading ? <Loader2 className="animate-spin" size={16} /> : <UserPlus size={16} />}
        Inject Operator
      </button>
    </form>
  );
}