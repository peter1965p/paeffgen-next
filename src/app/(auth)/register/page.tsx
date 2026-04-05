"use client";

import { useActionState } from "react";
import { register } from "@/lib/actions/register.actions"; 
import Link from "next/link";
import { ShieldAlert, UserPlus, Zap } from "lucide-react";

const initialState = { 
  error: "", 
  success: false 
};

export default function RegisterPage() {
  const [state, formAction] = useActionState(register, initialState);

  return (
    <div className="w-full max-w-md p-10 border border-white/5 rounded-[2.5rem] shadow-2xl bg-[#0d111c] dark:bg-zinc-950 backdrop-blur-xl relative overflow-hidden">
      {/* Hintergrund-Glow (Konsistent zum Login) */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full"></div>
      
      <div className="text-center mb-10 relative z-10">
        <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20 text-blue-500">
                <UserPlus size={20} />
            </div>
        </div>
        <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase">
          Initialize <span className="text-blue-500">Operator</span>
        </h1>
        <p className="text-slate-500 text-[9px] font-mono uppercase tracking-[0.3em] mt-3 opacity-60 italic">
          System_Node: Registration_Pending
        </p>
      </div>

      <form action={formAction} className="flex flex-col gap-5 relative z-10">
        {/* E-MAIL */}
        <div className="space-y-2">
          <input 
            type="email" 
            name="email" 
            placeholder="OPERATOR_EMAIL..." 
            className="w-full p-4 rounded-2xl bg-black/40 border border-white/5 text-white font-mono text-xs outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-800" 
            required 
            autoFocus
          />
        </div>

        {/* PASSWORT */}
        <div className="space-y-2">
          <input 
            type="password" 
            name="password" 
            placeholder="SECURE_PASSWORD..." 
            className="w-full p-4 rounded-2xl bg-black/40 border border-white/5 text-white font-mono text-xs outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-800" 
            required 
          />
        </div>

        {/* INVITE CODE (Hervorgehoben) */}
        <div className="space-y-2 group">
          <div className="relative">
            <input 
              type="text" 
              name="inviteCode" 
              placeholder="SECRET_INVITE_CODE..." 
              className="w-full p-4 pr-12 rounded-2xl bg-blue-500/5 border border-blue-500/20 text-blue-400 font-mono text-xs outline-none focus:border-blue-500 transition-all placeholder:text-blue-900/40" 
              required 
            />
            <Zap size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-500/30 group-focus-within:text-blue-500 transition-colors" />
          </div>
        </div>

        {/* ERRROR HANDLING */}
        {state?.error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 animate-in fade-in zoom-in duration-300">
            <p className="text-red-500 text-[9px] font-mono uppercase text-center tracking-widest leading-relaxed">
               {state.error}
            </p>
          </div>
        )}

        {/* SUCCESS STATE */}
        {state?.success && (
          <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
            <p className="text-green-500 text-[9px] font-mono uppercase text-center tracking-widest">
               Access_Granted: Uplink_Ready
            </p>
          </div>
        )}

        <button 
          type="submit" 
          className="w-full py-5 bg-blue-600 text-white font-black italic uppercase text-[10px] tracking-[0.3em] rounded-[1.8rem] hover:bg-blue-500 active:scale-[0.97] transition-all shadow-xl shadow-blue-900/20 border border-blue-400/20"
        >
          Execute_Registration
        </button>
      </form>

      <div className="mt-10 text-center relative z-10 border-t border-white/5 pt-8">
        <Link href="/login" className="group inline-flex items-center gap-2 text-[9px] font-mono text-slate-600 uppercase tracking-[0.2em] hover:text-blue-400 transition-colors">
          <span className="group-hover:-translate-x-1 transition-transform">{"<<"}</span> RETURN_TO_UPLINK
        </Link>
      </div>
      
      <div className="mt-8 text-center text-[8px] font-mono text-slate-800 uppercase tracking-[0.2em] opacity-30 italic">
        AETHER_CORE_SYSTEM // REV_2026.4
      </div>
    </div>
  );
}