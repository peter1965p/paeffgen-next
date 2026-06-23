import { getInboxMessages } from "@/lib/actions/message.actions";
import { getUserList } from "@/lib/actions/user.actions";
import InboxClient from "@/components/InboxClient";

/**
 * SPECTORA // INTELLIGENCE CENTER
 * Bereinigte Server-Komponente für das Interview in Bremen
 */

export default async function IntelligencePage() {
  const MY_ID = "ab67ef59-2070-4f90-b0d5-742d2bf92911"; 

  // 1. Rohdaten vom Server abrufen
  const [rawMessages, users] = await Promise.all([
    getInboxMessages(MY_ID),
    getUserList()
  ]);

  // 2. SPECTORA_SECURE_FILTER: Spam-Mails gnadenlos aussortieren
  const messages = rawMessages.filter((msg: any) => {
    const subject = (msg.subject || "").toLowerCase();
    const content = (msg.content || "").toLowerCase();
    
    // Blacklist basierend auf deinem Dashboard-Spam
    const isSpam = 
      subject.includes("sex") || 
      subject.includes("frauen suchen") || 
      subject.includes("märchen") ||
      content.includes("einmaligen sex");

    return !isSpam;
  });

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col p-8 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-end px-2">
        <div>
          <h1 className="text-4xl font-black italic uppercase text-white tracking-tighter">
            Message & Mailing <span className="text-blue-500 text-glow-blue">Center</span>
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="h-[2px] w-8 bg-blue-500"></span>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em]">
              Node: paeffgen-it.de // Secure Uplink Active
            </p>
          </div>
        </div>
        
        <div className="flex gap-8 font-mono text-[10px] text-slate-400 uppercase tracking-widest">
          <div>
            Traffic: <span className="text-blue-500">{messages.length} Units</span>
          </div>
          <div>
            System: <span className="text-white">Encrypted</span>
          </div>
        </div>
      </div>

      {/* Interface mit gefilterten Nachrichten */}
      <div className="flex-1 min-h-0 bg-black/20 rounded-[2.5rem] border border-white/5 p-2 shadow-2xl overflow-hidden">
        <InboxClient 
          initialMessages={messages} 
          users={users} 
          currentUserId={MY_ID} 
        />
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center px-6 text-[9px] font-mono text-slate-700 uppercase tracking-[0.2em]">
        <span>SPECTORA v3.0 // Intelligence Sector</span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          Data Stream Stable [INTERVIEW_MODE: PROTECTED]
        </span>
      </div>
    </div>
  );
}