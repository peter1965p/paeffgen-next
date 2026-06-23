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
  Palette,
  Calculator,
} from "lucide-react";

type Order = { total_price: number | null };

const moduleIconMap: Record<string, React.ElementType> = {
  cms: FileText,
  blog: PenTool,
  shop: ShoppingCart,
  forms: ClipboardList,
  users: Users2,
  crm: HeartHandshake,
  suppliers: Truck,
  theming: Palette,
  accounting_pro: Calculator,
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 5) return "Gute Nacht";
  if (hour < 11) return "Guten Morgen";
  if (hour < 14) return "Mahlzeit";
  if (hour < 18) return "Guten Tag";
  return "Guten Abend";
};

export default async function AdminDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const displayName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Operator";
  const userEmail = user?.email;

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

  const { data: userData } = await supabase
    .from("users")
    .select("settings")
    .eq("email", userEmail)
    .single();

  const activeModuleKeys: string[] = userData?.settings?.active_modules || [];
  const greeting = getGreeting();

  const stats = [
    {
      title: "Umsatz (YTD)",
      value: `${totalRevenue.toLocaleString("de-DE")} €`,
      trend: "+12%",
      icon: TrendingUp,
    },
    {
      title: "Bestand / Produkte",
      value: productCount || 0,
      trend: "+3",
      icon: Package,
    },
    {
      title: "Kundenstamm",
      value: customerCount || 0,
      trend: "+18",
      icon: Users,
    },
    {
      title: "Offene Tickets",
      value: ticketCount || 0,
      trend: "Status: Aktiv",
      icon: Ticket,
    },
  ];

  return (
    <div className="p-8 space-y-10 font-sans bg-black min-h-screen text-white">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">
            {greeting}, {displayName} 👋
          </h1>
          <p className="text-slate-500 text-[10px] mt-2 uppercase tracking-[0.2em] font-bold">
            System-Status: Optimal // Operativ // ID: {user?.id.slice(0, 8)}
          </p>
        </div>
        <div className="flex gap-4">
          <a href="/" target="_blank" className="bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-white text-[10px] font-bold px-6 py-3 rounded-2xl transition-all uppercase tracking-widest flex items-center gap-2 shadow-xl">
            <Layers size={14} /> Website ansehen
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-8 bg-zinc-950/50 border border-white/5 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500">
                <stat.icon size={24} />
              </div>
              <span className="text-[9px] font-black text-green-500 bg-green-500/10 px-3 py-1 rounded-full uppercase tracking-tighter">
                {stat.trend}
              </span>
            </div>
            <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">
              {stat.title}
            </p>
            <h3 className="text-3xl font-black mt-2 tracking-tighter">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-zinc-950/40 border border-white/5 rounded-[2.5rem] p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <h2 className="text-[11px] font-black text-white italic uppercase tracking-[0.3em]">
              Aktive Module & Schnittstellen
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {activeModuleKeys.length > 0 ? (
              activeModuleKeys.map((key: string) => {
                const Icon = moduleIconMap[key] || Layers;
                return (
                  <div
                    key={key}
                    className="flex items-center gap-3 px-6 py-3.5 bg-zinc-900/80 border border-white/5 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white hover:border-blue-500/50 transition-all cursor-default"
                  >
                    <Icon size={14} className="text-blue-500 opacity-80" />
                    {key.replace("_", " ")}
                  </div>
                );
              })
            ) : (
              <p className="text-slate-600 text-[10px] italic uppercase tracking-widest py-2">
                Keine Module via DB aktiviert.
              </p>
            )}
          </div>
        </div>

        <div className="bg-[#b33927] rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-between group cursor-pointer shadow-2xl shadow-red-950/20 active:scale-[0.98] transition-transform">
          <ArrowUpRight
            className="absolute top-8 right-8 opacity-20 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500"
            size={48}
          />
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
              Päffgen IT Core
            </p>
            <h2 className="text-2xl font-black mt-4 leading-tight uppercase italic tracking-tighter">
              Konfiguration <br />
              erweitern?
            </h2>
          </div>
          <button className="mt-10 bg-black text-white text-[10px] font-black py-4 rounded-2xl uppercase tracking-[0.2em] hover:bg-zinc-900 transition-all shadow-2xl">
            Zum Modulstore
          </button>
        </div>
      </div>
    </div>
  );
}
