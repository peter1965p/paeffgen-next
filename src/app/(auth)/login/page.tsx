"use client";

import { useActionState } from "react";
import { login } from "../../../lib/actions/login.actions";
import Link from "next/link"; // Wichtig für die Navigation [cite: 2026-03-09]

const initialState = {
  error: "",
};

export default function LoginPage() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <div className="w-full max-w-md p-10 border border-white/5 rounded-[2.5rem] shadow-2xl bg-[#0d111c] dark:bg-zinc-950 backdrop-blur-xl relative overflow-hidden">
      {/* Dekorativer Hintergrund-Glow wie im Intelligence Center */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full"></div>
      
      <div className="text-center mb-10 relative z-10">
        <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase">
          AETHER <span className="text-blue-500">OS</span>
        </h1>
        <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.3em] mt-3 opacity-70">
          Authentifizierung erforderlich
        </p>
      </div>
      
      <form action={formAction} className="flex flex-col gap-6 relative z-10">
        <div className="flex flex-col gap-3">
          <label htmlFor="password" className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">
            Admin Passwort
          </label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder="••••••••"
            className="p-4 border rounded-2xl bg-black/40 border-white/5 text-white font-mono text-sm focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-800" 
            required 
            autoFocus
          />
        </div>
        
        {state?.error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 animate-in fade-in zoom-in duration-300">
            <p className="text-red-500 text-[10px] font-mono uppercase text-center tracking-widest">
              {state.error}
            </p>
          </div>
        )}
        
        <button 
          type="submit" 
          className="w-full py-4 px-4 bg-white text-black font-black italic uppercase tracking-widest text-xs rounded-[1.5rem] hover:bg-blue-500 hover:text-white active:scale-[0.96] transition-all shadow-xl shadow-white/5"
        >
          Anmelden
        </button>
      </form>

      {/* Neuer Register Link [cite: 2026-03-09] */}
      <div className="mt-8 text-center relative z-10">
        <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
          No Access? 
          <Link href="/register" className="ml-2 text-blue-500 hover:text-blue-400 transition-colors underline underline-offset-4 decoration-blue-500/30">
            Initialize_Registration
          </Link>
        </p>
      </div>
      
      <div className="mt-12 text-center text-[9px] font-mono text-slate-700 uppercase tracking-[0.2em] opacity-40">
        &copy; 1995 - {new Date().getFullYear()} Paeffgen <span className="text-blue-500">IT</span> Admin System
      </div>
    </div>
  );
}