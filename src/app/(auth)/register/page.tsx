"use client";

import { useActionState } from "react";
import { register } from "@/lib/actions/register.actions"; 
import Link from "next/link";
import { ShieldCheck, UserPlus } from "lucide-react";

// MUSS exakt so aussehen wie der Return deiner Action!
const initialState = { 
  error: "", 
  success: false 
};

export default function RegisterPage() {
  const [state, formAction] = useActionState(register, initialState);

  return (
    <div className="w-full max-w-md p-10 border border-white/5 rounded-[2.5rem] shadow-2xl bg-zinc-950 relative overflow-hidden">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase">
          Initialize <span className="text-blue-500 font-bold italic lowercase tracking-normal">operator</span>
        </h1>
      </div>

      <form action={formAction} className="flex flex-col gap-5">
        <input 
          type="email" 
          name="email" 
          placeholder="Email_Address" 
          className="p-4 rounded-2xl bg-black/40 border-white/5 text-white font-mono text-xs outline-none focus:border-blue-500/50" 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Secure_Password" 
          className="p-4 rounded-2xl bg-black/40 border-white/5 text-white font-mono text-xs outline-none focus:border-blue-500/50" 
          required 
        />
        <input 
          type="text" 
          name="inviteCode" 
          placeholder="Secret_Invite_Code" 
          className="p-4 rounded-2xl bg-blue-500/5 border-blue-500/10 text-blue-400 font-mono text-xs outline-none focus:border-blue-500/50" 
          required 
        />

        {state?.error && (
          <p className="text-red-500 text-[10px] font-mono uppercase text-center">{state.error}</p>
        )}

        <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black italic uppercase text-[10px] rounded-[1.8rem] hover:bg-blue-500 transition-all">
          Execute_Registration
        </button>
      </form>

      <div className="mt-8 text-center">
        <Link href="/login" className="text-[9px] font-mono text-slate-600 uppercase tracking-widest hover:text-white transition-colors">
          {"<< RETURN_TO_UPLINK"}
        </Link>
      </div>
    </div>
  );
}