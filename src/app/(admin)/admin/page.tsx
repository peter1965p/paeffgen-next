"use client";

import { motion } from "framer-motion";

const approvals = [
  { id: 1, type: "Intelligence", title: "Cyber-Security Report", user: "Admin_XP", time: "Vor 5 Min" },
  { id: 2, type: "User", title: "New Registration: @cyb_link", user: "System", time: "Vor 12 Min" },
  { id: 3, type: "Comment", title: "Anfrage zu API-Schnittstelle", user: "Guest_04", time: "Vor 1 Std" },
];

export default function ApprovalDashboard() {
  return (
    <div className="p-10 space-y-12 bg-transparent">
      {/* Dynamic Header */}
      <div className="flex justify-between items-end border-b border-white/5 pb-10">
        <div>
          <h1 className="text-6xl font-black tracking-tighter text-white uppercase italic leading-none">Approvals</h1>
          <p className="text-blue-500 font-mono text-[10px] mt-4 uppercase tracking-[0.4em]">Pending Authorization Queue</p>
        </div>
        <div className="bg-blue-600/10 border border-blue-500/30 px-6 py-2 rounded-full">
          <p className="text-blue-400 font-mono text-[10px] font-black uppercase tracking-widest animate-pulse">
            {approvals.length} Units Awaiting Action
          </p>
        </div>
      </div>

      {/* Approval List */}
      <div className="space-y-6">
        {approvals.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 flex items-center justify-between hover:bg-white/[0.05] hover:border-blue-500/50 transition-all duration-500"
          >
            <div className="flex gap-10 items-center">
              {/* Type Badge */}
              <div className="w-24 text-center">
                <p className="text-slate-600 font-mono text-[8px] uppercase tracking-widest mb-1">Entity</p>
                <p className="text-white font-black text-[10px] uppercase tracking-tighter italic border border-white/10 py-1 rounded-lg bg-black/20">
                  {item.type}
                </p>
              </div>

              {/* Info Area */}
              <div>
                <h3 className="text-2xl font-black text-white italic tracking-tighter group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-1">
                  Source: <span className="text-slate-300">{item.user}</span> // {item.time}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(37,99,235,0.15)]">
                Authorize
              </button>
              <button className="bg-white/5 border border-white/5 text-slate-500 px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/30 transition-all">
                Terminate
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Security Footer */}
      <div className="pt-10 border-t border-white/5 flex justify-between items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
        <p className="text-slate-600 font-mono text-[8px] uppercase tracking-[0.5em]">AETHER OS Admin Protocol // Active Session</p>
        <div className="flex gap-8">
          <div className="text-right">
             <p className="text-slate-600 text-[8px] font-black uppercase tracking-widest">Network</p>
             <p className="text-white font-mono text-[10px]">Encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
}