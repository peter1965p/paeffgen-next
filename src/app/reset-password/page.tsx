"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      setMessage("Fehler: " + error.message);
    } else {
      setMessage("Passwort erfolgreich aktualisiert! Leite zum Login weiter...");
      setTimeout(() => router.push("/login"), 2000);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <div className="w-full max-w-md bg-card border border-primary/20 p-8 rounded-lg shadow-2xl">
        <h1 className="text-2xl font-black mb-6 uppercase tracking-tighter text-primary">
          AETHER OS // Security Reset
        </h1>
        
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">
              Neues Master-Passwort
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-background border border-primary/20 p-3 text-foreground focus:border-primary outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-bold py-3 hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? "AKTUALISIERE..." : "SYSTEM ZUGANG WIEDERHERSTELLEN"}
          </button>
        </form>
        
        {message && (
          <p className="mt-4 text-xs font-mono text-center text-primary animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}