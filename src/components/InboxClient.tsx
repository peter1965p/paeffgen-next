"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Send, Shield, Trash2 } from "lucide-react";
import MailCompose from "./MailCompose";

export default function InboxClient({ initialMessages, users }: any) {
  const [messages, setMessages] = useState(initialMessages || []);
  const [selectedMsg, setSelectedMsg] = useState<any>(null);
  const [view, setView] = useState<"inbox" | "compose">("inbox");
  const [isLoading, setIsLoading] = useState(false);
  const [isReading, setIsReading] = useState(false);

  // Mails vom Server laden [cite: 2026-03-08]
  const refreshMails = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/mail/fetch');
      const data = await res.json();
      if (!data.error) setMessages(data);
    } catch (err) { console.error("FEED_SYNC_ERROR", err); }
    setIsLoading(false);
  };

  useEffect(() => { refreshMails(); }, []);

  // KRITISCH: Verhindert Content-Ghosting [cite: 2026-03-08]
  const handleSelectMsg = async (msg: any) => {
    setView("inbox");
    // 1. Alten Content sofort löschen, damit nichts vermischt wird [cite: 2026-03-08]
    setSelectedMsg({ ...msg, content: "" }); 
    setIsReading(true);
    
    try {
      // 2. Gezielt die neue Mail via UID anfordern [cite: 2026-03-08]
      const res = await fetch(`/api/mail/fetch?uid=${msg.id}`);
      const data = await res.json();
      
      if (data.error) throw new Error(data.error);

      // 3. Erst jetzt den neuen Content setzen [cite: 2026-03-08]
      setSelectedMsg({ ...msg, content: data.content });
    } catch (err) {
      setSelectedMsg({ ...msg, content: "<p class='text-red-500'>UPLINK_FAILURE: STREAM_INTERRUPTED</p>" });
    } finally {
      setIsReading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedMsg || !confirm("CONFIRM DATA PURGE?")) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/mail/fetch?uid=${selectedMsg.id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages(messages.filter((m: any) => m.id !== selectedMsg.id));
        setSelectedMsg(null);
      }
    } catch (err) { alert("PURGE_FAILED"); }
    setIsLoading(false);
  };

  return (
    <div className="flex h-[85vh] gap-6 p-6 overflow-hidden bg-black/20 font-sans">
      {/* Feed Spalte [cite: 2026-03-08] */}
      <div className="w-1/3 flex flex-col bg-[#0d111c]/80 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5 text-blue-500 font-mono text-[10px] tracking-[0.4em]">
          INTELLIGENCE FEED
          <div className="flex gap-2">
            <button onClick={refreshMails} className={`p-2 rounded-xl transition-all ${isLoading ? 'animate-spin text-blue-400' : 'text-slate-500 hover:text-white'}`}>
              <RefreshCw size={14} />
            </button>
            <button onClick={() => setView("compose")} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-xl">
              <Send size={14} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {messages.map((msg: any) => (
            <div key={msg.id} onClick={() => handleSelectMsg(msg)} className={`p-5 rounded-[1.8rem] cursor-pointer transition-all border ${selectedMsg?.id === msg.id ? 'bg-blue-600/15 border-blue-500/40 shadow-lg shadow-blue-500/5' : 'border-transparent hover:bg-white/5'}`}>
              <div className="flex justify-between items-start mb-2 opacity-50 text-[8px] font-mono uppercase tracking-tighter">
                <span>{msg.from?.split('@')[0]}</span>
                <span>{new Date(msg.date).toLocaleDateString()}</span>
              </div>
              <h4 className="text-white font-bold text-[11px] leading-tight uppercase tracking-tight italic truncate">{msg.subject}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Content Spalte [cite: 2026-03-08] */}
      <div className="flex-1 bg-[#0d111c] border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col relative">
        {selectedMsg && view !== "compose" && (
          <button onClick={handleDelete} className="absolute top-8 right-8 z-50 p-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all border border-red-500/20 shadow-xl group">
            <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
          </button>
        )}

        {view === "compose" ? (
          <div className="p-10 h-full overflow-y-auto"><MailCompose users={users} /></div>
        ) : selectedMsg ? (
          <>
            <div className="p-10 border-b border-white/5 bg-black/30 pr-24">
              <div className="flex gap-6 items-center mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-black italic shadow-lg shadow-blue-500/20">
                  {selectedMsg.from?.[0].toUpperCase()}
                </div>
                <h2 className="text-xl font-black text-white italic uppercase tracking-tighter leading-tight">{selectedMsg.subject}</h2>
              </div>
              <p className="text-[9px] text-blue-400 font-mono tracking-widest uppercase opacity-60">Source Node: {selectedMsg.from}</p>
            </div>
            
            <div className="flex-1 p-10 overflow-y-auto custom-scrollbar">
              {isReading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-3 text-blue-500/30 font-mono animate-pulse uppercase tracking-widest text-[10px]">
                  <RefreshCw className="animate-spin" size={24} />
                  <span>Intercepting Stream...</span>
                </div>
              ) : (
                <div className="bg-black/20 p-8 rounded-[2rem] border border-white/5 text-slate-400 prose prose-invert max-w-none prose-sm"
                  dangerouslySetInnerHTML={{ __html: selectedMsg.content }} 
                />
              )}
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-900 italic font-mono uppercase tracking-[1em]">
            <Shield size={100} className="mb-6 opacity-[0.02]" />
            <p className="text-[10px]">Awaiting Signal</p>
          </div>
        )}
      </div>
    </div>
  );
}