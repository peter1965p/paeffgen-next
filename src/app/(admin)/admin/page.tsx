import { createClient } from "@/lib/supabaseClient";
import { 
  Package, 
  Users, 
  Ticket, 
  TrendingUp, 
  Layers,
  ArrowUpRight,
  FileText,
  PenTool,
  ShoppingCart,
  ClipboardList,
  Users2,
  HeartHandshake,
  Truck,
  Palette
} from "lucide-react";

// Mapping für die Icons der Module
const moduleIconMap: Record<string, any> = {
  cms: FileText,
  blog: PenTool,
  shop: ShoppingCart,
  forms: ClipboardList,
  users: Users2,
  crm: HeartHandshake,
  suppliers: Truck,
  theming: Palette,
};

export default async function AdminDashboard() {
  const supabase = await createClient();
  const userEmail = "news24regional@gmail.com"; // Dein Admin-Account

  // 1. LIVE-DATEN FÜR KPI-KARTEN
  const { data: orders } = await supabase.from('orders').select('gesamtpreis');
  const totalRevenue = orders?.reduce((acc, curr) => acc + Number(curr.gesamtpreis || 0), 0) || 0;

  const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
  const { count: customerCount } = await supabase.from('customers').select('*', { count: 'exact', head: true });
  const { count: ticketCount } = await supabase.from('tickets').select('*', { count: 'exact', head: true }).eq('status', 'open');

  // 2. AKTIVE MODULE AUS DB LADEN
  const { data: userData } = await supabase
    .from('users')
    .select('settings')
    .eq('email', userEmail)
    .single();

  const activeModuleKeys = userData?.settings?.active_modules || [];

  // Die Metriken
  const stats = [
    { title: "Umsatz (YTD)", value: `${totalRevenue.toLocaleString('de-DE')} €`, trend: "+12%", icon: TrendingUp },
    { title: "Bestand / Produkte", value: productCount || 0, trend: "+3", icon: Package },
    { title: "Kundenstamm", value: customerCount || 0, trend: "+18", icon: Users },
    { title: "Offene Tickets", value: ticketCount || 0, trend: "Status: Aktiv", icon: Ticket },
  ];

  return (
    <div className="p-8 space-y-10 font-sans bg-black min-h-screen">
      {/* Header Bereich */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
            Guten Morgen, Admin 👋
          </h1>
          <p className="text-slate-500 text-xs mt-2 uppercase tracking-[0.2em]">
            System-Status: Optimal // AETHER OS Operativ
          </p>
        </div>
        <div className="flex gap-4">
          <button className="bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-white text-[10px] font-bold px-6 py-3 rounded-2xl transition-all uppercase tracking-widest flex items-center gap-2">
            <Layers size={14} /> Website ansehen
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-8 bg-zinc-950 border border-white/5 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-600/5 blur-3xl group-hover:bg-blue-600/10 transition-all"></div>
            <div className="flex justify-between items-start mb-6 text-blue-500">
              <div className="p-4 bg-blue-500/10 rounded-2xl">
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-3 py-1 rounded-full uppercase">
                {stat.trend}
              </span>
            </div>
            <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">
              {stat.title}
            </p>
            <h3 className="text-3xl font-black text-white mt-2 tracking-tighter">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Unterer Bereich: Dynamische Module */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-zinc-950/40 border border-white/5 rounded-[2.5rem] p-10">
          <h2 className="text-sm font-black text-white mb-8 flex items-center gap-3 italic uppercase tracking-widest">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Aktive Module & Schnittstellen
          </h2>
          
          <div className="flex flex-wrap gap-4">
            {activeModuleKeys.length > 0 ? (
              activeModuleKeys.map((key: string) => {
                const Icon = moduleIconMap[key] || Layers;
                return (
                  <div 
                    key={key} 
                    className="flex items-center gap-3 px-6 py-3 bg-zinc-900 border border-white/5 rounded-full text-[10px] font-bold text-slate-300 uppercase tracking-widest hover:bg-zinc-800 hover:text-white transition-all cursor-default"
                  >
                    <Icon size={14} className="text-blue-500" />
                    {key.replace('_', ' ')}
                  </div>
                );
              })
            ) : (
              <p className="text-slate-600 text-xs italic uppercase tracking-widest">Keine Module aktiviert. Besuche den Modulstore.</p>
            )}
          </div>
        </div>

        {/* Action Card */}
        <div className="bg-[#b33927] rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-between group cursor-pointer shadow-2xl shadow-orange-950/20">
          <ArrowUpRight className="absolute top-8 right-8 opacity-20 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" size={48} />
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70">AETHER OS Core</p>
            <h2 className="text-2xl font-black mt-4 leading-tight uppercase italic">Konfiguration <br />erweitern?</h2>
          </div>
          <button className="mt-10 bg-black text-white text-[10px] font-black py-4 rounded-2xl uppercase tracking-[0.2em] hover:bg-zinc-900 transition-all shadow-xl">
            Zum Modulstore
          </button>
        </div>
      </div>
    </div>
  );
}