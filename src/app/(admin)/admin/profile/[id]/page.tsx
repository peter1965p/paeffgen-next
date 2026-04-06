"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import { User, Shield, Key, Activity, Fingerprint, Database } from "lucide-react";

export default function OperatorProfilePage() {
  const params = useParams();
  const operatorId = params.id as string;
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchOperatorData = async () => {
      setLoading(true);
      // Hier holen wir die Daten für die spezifische ID aus deiner Users-Tabelle
      const { data, error } = await supabase
        .from("profiles") // Oder wie deine Tabelle heißt (meist 'profiles' oder 'users')
        .select("*")
        .eq("id", operatorId)
        .single();

      if (data) {
        setProfileData(data);
      } else {
        // Fallback: Falls noch keine Tabellendaten da sind, nutzen wir Auth-Daten
        const { data: authUser } = await supabase.auth.getUser();
        if (authUser?.user?.id === operatorId) {
          setProfileData(authUser.user);
        }
      }
      setLoading(false);
    };

    if (operatorId) fetchOperatorData();
  }, [operatorId, supabase]);

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center font-mono text-blue-500 animate-pulse uppercase text-[10px] tracking-[0.5em]">
      Requesting Operator Data Node {operatorId?.slice(0, 8)}...
    </div>
  );

  return (
    <div className="p-10 max-w-6xl mx-auto animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16 border-b border-white/5 pb-12">
        <div className="relative group">
          <div className="absolute -inset-1 bg-blue-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative w-28 h-28 rounded-[2.2rem] bg-[#0d111c] border border-white/10 flex items-center justify-center text-4xl font-black italic text-blue-500 shadow-2xl">
            {profileData?.email?.charAt(0).toUpperCase() || "?"}
          </div>
          <div className="absolute -bottom-2 -right-2 p-2 bg-green-500 rounded-full border-4 border-[#0d111c] shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
          </div>
        </div>
        
        <div className="text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">
              Operator <span className="text-blue-500">Node</span>
            </h2>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[8px] uppercase tracking-widest">
              Level 01
            </span>
          </div>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em] mt-2 opacity-50">
            System UID: <span className="text-slate-300">{operatorId}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* IDENTITY CARD */}
        <div className="lg:col-span-2 p-8 border border-white/5 rounded-[2.5rem] bg-[#0d111c]/50 backdrop-blur-sm relative overflow-hidden group">
          <Fingerprint className="absolute -right-6 -top-6 w-32 h-32 text-white/5 group-hover:text-blue-500/5 transition-all duration-700" />
          <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-blue-500 mb-8 flex items-center gap-2">
            <Shield size={14} /> Core Identity Parameters
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-1">
              <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Uplink Email</p>
              <p className="text-white font-bold text-lg">{profileData?.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Role Authorization</p>
              <p className="text-white font-mono uppercase tracking-widest text-sm">System Administrator</p>
            </div>
            <div className="space-y-1">
              <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Last Sync</p>
              <p className="text-slate-400 font-mono text-xs">{new Date().toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Database Status</p>
              <p className="text-green-500 font-mono text-[10px] flex items-center gap-2">
                <Database size={10} /> SYNCHRONIZED
              </p>
            </div>
          </div>
        </div>

        {/* SECURITY SETTINGS */}
        <div className="p-8 border border-white/5 rounded-[2.5rem] bg-[#0d111c]/50 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-blue-500 mb-8 flex items-center gap-2">
              <Key size={14} /> Security_Protocol
            </h3>
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 group hover:border-blue-500/30 transition-all cursor-pointer">
                <p className="text-[9px] font-mono text-white uppercase tracking-widest mb-1">MFA_Status</p>
                <p className="text-[8px] font-mono text-slate-500 uppercase italic">Inactive_Request_Uplink</p>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <p className="text-[9px] font-mono text-white uppercase tracking-widest mb-1">Encryption</p>
                <p className="text-[8px] font-mono text-blue-500 uppercase font-bold tracking-widest underline underline-offset-4 decoration-blue-500/20">AES_256_ACTIVE</p>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-10 py-4 bg-white text-black font-black italic uppercase text-[10px] tracking-widest rounded-2xl hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-white/5">
            Modify_Access_Rights
          </button>
        </div>
      </div>
    </div>
  );
}