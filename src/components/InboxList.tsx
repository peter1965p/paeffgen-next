"use client";

import { MailOpen, Mail as MailIcon, Clock } from "lucide-react";

export default function InboxList({ messages }: { messages: any[] }) {
  // 1. FILTER: Wir schmeißen alles raus, was nach Spam aussieht
  const cleanMessages = messages.filter((msg) => {
    // Falls die Felder fehlen, setzen wir leere Strings ein, um Abstürze zu vermeiden
    const subject = (msg.subject || "").toLowerCase();
    const content = (msg.content || "").toLowerCase();
    const sender = (msg.sender?.username || msg.sender || "").toLowerCase();

    const isSpam = 
      subject.includes("sex") || 
      subject.includes("frauen suchen") || 
      subject.includes("märchen") ||
      sender.includes("kapdesk") ||
      content.includes("einmaligen sex");

    // WICHTIG: Wir lassen nur durch, was KEIN Spam ist
    return !isSpam;
  });

  return (
    <div className="space-y-4">
      <h3 className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
        <MailIcon size={12} /> Incoming Data Streams
      </h3>
      
      {cleanMessages.length === 0 && (
        <div className="p-10 border border-dashed border-white/5 rounded-2xl text-center text-slate-600 font-mono text-xs uppercase italic">
          No encrypted traffic detected. [AETHER_SECURE_MODE: ON]
        </div>
      )}

      {cleanMessages.map((msg) => {
        // Logik für die Absender-Anzeige
        const displaySender = msg.sender?.username || "system";
        
        return (
          <div 
            key={msg.id} 
            className={`p-5 rounded-2xl border transition-all ${
              msg.is_read ? 'bg-black/20 border-white/5 opacity-60' : 'bg-[#0d111c] border-blue-500/20 shadow-lg shadow-blue-500/5'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-[9px] font-mono text-blue-400 uppercase tracking-widest">
                  Source: {displaySender}@paeffgen-it.de
                </span>
                <h4 className="text-white font-bold text-sm mt-1 uppercase tracking-tight italic">
                  {msg.subject}
                </h4>
              </div>
              <div className="flex items-center gap-2 text-slate-500 font-mono text-[9px]">
                <Clock size={10} />
                {msg.created_at ? new Date(msg.created_at).toLocaleTimeString() : "00:00"}
              </div>
            </div>
            <p className="text-slate-400 text-xs font-mono leading-relaxed line-clamp-2 mt-3">
              {msg.content}
            </p>
          </div>
        );
      })}
    </div>
  );
}