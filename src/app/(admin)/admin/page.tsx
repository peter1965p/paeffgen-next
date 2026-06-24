import { createClient } from "@/lib/supabaseClient";
import { Package, Users, Ticket, TrendingUp, Layers, ArrowUpRight } from "lucide-react";
import AdminGreeting from "@/components/AdminGreeting";
import AdminModules from "@/components/AdminModules";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = createClient();

  type Order = { total_price: number | null };
  const { data: orders } = await supabase.from("orders").select("total_price");
  const totalRevenue =
    (orders as Order[])?.reduce(
      (acc: number, curr: Order) => acc + Number(curr.total_price || 0),
      0,
    ) || 0;

  const { count: productCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });
  const { count: customerCount } = await supabase
    .from("customers")
    .select("*", { count: "exact", head: true });
  const { count: ticketCount } = await supabase
    .from("tickets")
    .select("*", { count: "exact", head: true })
    .eq("status", "open");

  const stats = [
    { title: "Umsatz (YTD)", value: `${totalRevenue.toLocaleString("de-DE")} €`, trend: "+12%", icon: TrendingUp },
    { title: "Bestand / Produkte", value: productCount || 0, trend: "+3", icon: Package },
    { title: "Kundenstamm", value: customerCount || 0, trend: "+18", icon: Users },
    { title: "Offene Tickets", value: ticketCount || 0, trend: "Status: Aktiv", icon: Ticket },
  ];

  return (
    <div className="p-8 space-y-10 font-sans bg-slate-900 min-h-screen text-white">

      {/* Header row */}
      <div className="flex justify-between items-start gap-6">
        <div className="flex-1">
          <AdminGreeting />
        </div>
        <div className="pt-1 shrink-0">
          <a
            href="/"
            target="_blank"
            className="bg-slate-700 border border-white/10 hover:bg-slate-600 text-white text-[10px] font-bold px-6 py-3 rounded-2xl transition-all uppercase tracking-widest flex items-center gap-2 shadow-xl"
          >
            <Layers size={14} /> Website ansehen
          </a>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-8 bg-slate-800/60 border border-white/5 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500">
                <stat.icon size={24} />
              </div>
              <span className="text-[9px] font-black text-green-500 bg-green-500/10 px-3 py-1 rounded-full uppercase tracking-tighter">
                {stat.trend}
              </span>
            </div>
            <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">{stat.title}</p>
            <h3 className="text-3xl font-black mt-2 tracking-tighter">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Modules + CTA row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-800/40 border border-white/5 rounded-[2.5rem] p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <h2 className="text-[11px] font-black text-white italic uppercase tracking-[0.3em]">
              Aktive Module & Schnittstellen
            </h2>
          </div>
          <AdminModules />
        </div>

        <Link
          href="/admin/modulstore"
          className="bg-[#b33927] rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-between group cursor-pointer shadow-2xl shadow-red-950/20 active:scale-[0.98] transition-transform"
        >
          <ArrowUpRight
            className="absolute top-8 right-8 opacity-20 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500"
            size={48}
          />
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
              Spectora Core
            </p>
            <h2 className="text-2xl font-black mt-4 leading-tight uppercase italic tracking-tighter">
              Konfiguration <br />
              erweitern?
            </h2>
          </div>
          <div className="mt-10 bg-black text-white text-[10px] font-black py-4 rounded-2xl uppercase tracking-[0.2em] hover:bg-slate-700 transition-all shadow-2xl text-center">
            Zum Modulstore
          </div>
        </Link>
      </div>
    </div>
  );
}
