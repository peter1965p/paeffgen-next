"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { Terminal, Lock, ArrowRight, AlertTriangle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Bitte E-Mail und Passwort angeben.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError("Zugriff verweigert: Logindaten ungültig.");
      setLoading(false);
      return;
    }

    router.push("/admin");
  };

  return (
    <div className="w-full border border-white/5 rounded-[2rem] bg-slate-800 overflow-hidden shadow-2xl">

      {/* Header Bar */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/5 bg-slate-800/70">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-[#b33927]" />
          <span className="text-[10px] font-black italic uppercase tracking-[0.3em] text-white">
            SPECTORA
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
          </span>
          <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
            System Online
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-10 py-12">

        {/* Icon + Title */}
        <div className="mb-10">
          <div className="w-12 h-12 rounded-2xl bg-[#b33927]/10 border border-[#b33927]/20 flex items-center justify-center mb-6">
            <Lock size={20} className="text-[#b33927]" />
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase leading-none">
            Control Center
          </h1>
          <p className="text-slate-600 text-[10px] font-mono uppercase tracking-[0.3em] mt-2">
            Authentifizierung erforderlich
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-slate-500 ml-1">
              E-Mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="operator@spectora.app"
              className="p-4 border rounded-xl bg-slate-700/50 border-white/5 text-white font-mono text-xs focus:border-[#b33927]/50 focus:ring-1 focus:ring-[#b33927]/20 outline-none transition-all placeholder:text-slate-500"
              required
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-slate-500 ml-1">
              Passwort
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••••••"
              className="p-4 border rounded-xl bg-slate-700/50 border-white/5 text-white font-mono text-xs focus:border-[#b33927]/50 focus:ring-1 focus:ring-[#b33927]/20 outline-none transition-all placeholder:text-slate-500"
              required
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 animate-in fade-in zoom-in duration-300">
              <AlertTriangle size={13} className="text-red-500 shrink-0" />
              <p className="text-red-400 text-[10px] font-mono uppercase tracking-widest">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group w-full mt-2 py-4 px-6 bg-[#b33927] hover:bg-[#d4442f] disabled:opacity-60 text-white font-black italic uppercase tracking-widest text-[11px] rounded-xl active:scale-[0.97] transition-all shadow-lg shadow-[#b33927]/20 flex items-center justify-center gap-3"
          >
            {loading ? (
              <><Loader2 size={14} className="animate-spin" /> Authentifiziere...</>
            ) : (
              <>Anmelden <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <span className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">
            Kein Zugang?
          </span>
          <Link
            href="/register"
            className="text-[9px] font-mono text-slate-500 hover:text-[#b33927] uppercase tracking-widest transition-colors"
          >
            Registrieren →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="px-10 py-4 border-t border-white/5 bg-slate-800/50">
        <p className="text-[8px] font-mono text-slate-700 uppercase tracking-[0.3em] text-center">
          © {new Date().getFullYear()} Päffgen IT // Spectora Control Center
        </p>
      </div>

    </div>
  );
}
