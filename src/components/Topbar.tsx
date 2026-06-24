"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient"; 

export default function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isWarning, setIsWarning] = useState(false);

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? null);
        setUserId(user.id);
      }
    })();
  }, []);

  // Logout-Logik
  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut(); 
    router.push("/login"); 
  }, [router, supabase.auth]);

  // Timer-Reset bei Aktivität
  const resetTimer = useCallback(() => {
    setTimeLeft(300);
    setIsWarning(false);
  }, []);

  // Session-Countdown
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [handleLogout]);

  // User-Aktivität überwachen
  useEffect(() => {
    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    const handleActivity = () => resetTimer();
    activityEvents.forEach(event => window.addEventListener(event, handleActivity));
    return () => activityEvents.forEach(event => window.removeEventListener(event, handleActivity));
  }, [resetTimer]);

  // Warnzustand für den Timer (letzte 30 Sek)
  useEffect(() => {
    setIsWarning(timeLeft <= 30 && timeLeft > 0);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const userInitial = userEmail ? userEmail.charAt(0).toUpperCase() : "?";

  return (
    <div className="h-20 border-b border-white/5 bg-slate-800/90 backdrop-blur-md flex items-center justify-between px-10 relative z-[100] font-sans">
      <div className="flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">System Node: <span className="text-white">Active</span></span>
      </div>

      <div className="flex items-center gap-8 text-right">
        {/* Session Timer Anzeige */}
        <div className="hidden md:block">
          <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-1">Session TTL</p>
          <div className={`font-mono text-xs font-bold transition-all duration-500 ${isWarning ? 'text-red-500 animate-pulse scale-110' : 'text-green-400'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* User Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-4 bg-slate-700/60 border border-white/10 pl-4 pr-2 py-2 rounded-2xl hover:border-blue-500/50 transition-all group"
          >
            <div className="text-right">
              <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest opacity-50">Operator</p>
              <p className={`text-[10px] font-bold ${userEmail === "Unauthorized" ? "text-red-500" : "text-white"}`}>
                {userEmail}
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-black italic shadow-lg shadow-blue-500/20 text-sm">
              {userInitial}
            </div>
            <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-3 w-60 bg-slate-800 border border-white/10 rounded-[2rem] shadow-2xl p-3 animate-in fade-in slide-in-from-top-2 backdrop-blur-xl">
              <div className="px-4 py-2 mb-2 border-b border-white/5">
                <p className="text-[8px] font-mono text-blue-500 uppercase tracking-widest">Access Level</p>
                <p className="text-[10px] text-white font-bold italic uppercase">Administrator</p>
              </div>

              {/* Profil-Link mit dynamischer ID */}
              <Link 
                href={userId ? `/admin/profile/${userId}` : "#"} 
                className={`flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl text-slate-300 hover:text-white transition-all group ${!userId && 'opacity-50 cursor-not-allowed'}`}
                onClick={() => setIsOpen(false)}
              >
                <User size={16} className="text-slate-600 group-hover:text-blue-500" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Profil</span>
              </Link>
              
              <Link 
                href="/admin/settings" 
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl text-slate-300 hover:text-white transition-all group"
                onClick={() => setIsOpen(false)}
              >
                <Settings size={16} className="text-slate-600 group-hover:text-blue-500" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Settings</span>
              </Link>

              <div className="h-px bg-white/5 my-2 mx-2"></div>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all group"
              >
                <LogOut size={16} />
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Terminate Session</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}