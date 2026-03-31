import { createClient } from "@/lib/supabaseClient";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Ticket, 
  TrendingUp, 
  Layers,
  ArrowUpRight
} from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // LIVE-DATEN AUS DEINEM SCHEMA ABFRAGEN
  const { data: orders } = await supabase.from('orders').select('gesamtpreis');
  const totalRevenue = orders?.reduce((acc, curr) => acc + Number(curr.gesamtpreis || 0), 0) || 0;

  const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
  const { count: customerCount } = await supabase.from('customers').select('*', { count: 'exact', head: true });
  const { count: ticketCount } = await supabase.from('tickets').select('*', { count: 'exact', head: true }).eq('status', 'open');

  // DIE TOP-METRIKEN (Wie im Screenshot)
  const stats = [
    { title: "Umsatz (YTD)", value: `${totalRevenue.toLocaleString('de-DE')} €`, trend: "+12%", icon: TrendingUp },
    { title: "Bestand / Produkte", value: productCount || 0, trend: "+3", icon: Package },
    { title: "Kundenstamm", value: customerCount || 0, trend: "+18", icon: Users },
    { title: "Offene Tickets", value: ticketCount || 0, trend: "Status: Aktiv", icon: Ticket },
  ];

  return (
    <div className="p-8 space-y-10 font-sans">
      {/* Header Bereich */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
            Guten Morgen, Admin 👋
          </h1>
          <p className="text-slate-500 text-xs mt-2 uppercase tracking-[0.2em]">
            System-Status: Optimal // Alle Module operativ
          </p>
        </div>
        <div className="flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold px-6 py-3 rounded-2xl transition-all uppercase tracking-widest flex items-center gap-2">
            <Layers size={14} /> Website ansehen
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 bg-zinc-950 border border-white/5 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-600/5 blur-3xl group-hover:bg-blue-600/10 transition-all"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500">
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-3 py-1 rounded-full uppercase">
                {stat.trend}
              </span>
            </div>
            <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
              {stat.title}
            </p>
            <h3 className="text-3xl font-black text-white mt-2 tracking-tighter">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Unterer Bereich: Module & Aktivitäten */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-zinc-950 border border-white/5 rounded-[2.5rem] p-8">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 italic uppercase">
            Aktive Module & Schnittstellen
          </h2>
          <div className="flex flex-wrap gap-3">
            {["CMS & Seiten", "Blog", "Shop", "Formularbuilder", "Benutzerverwaltung", "Theming"].map((mod) => (
              <span key={mod} className="px-5 py-3 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                {mod}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-between group cursor-pointer">
          <ArrowUpRight className="absolute top-8 right-8 opacity-20 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={40} />
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Support-Terminal</p>
            <h2 className="text-2xl font-black mt-2 leading-tight uppercase italic">Hilfe benötigt bei <br />der Modul-Konfiguration?</h2>
          </div>
          <button className="mt-8 bg-black text-white text-[10px] font-bold py-4 rounded-2xl uppercase tracking-widest hover:bg-zinc-900 transition-all">
            Dokumentation öffnen
          </button>
        </div>
      </div>
    </div>
  );
}