import { createClient } from "@/lib/supabaseClient";
import { Bot, Globe, Clock, TrendingUp, FileText, Eye } from "lucide-react";

const BOT_META: Record<string, { color: string; company: string }> = {
  "GPTBot":          { color: "text-emerald-400", company: "OpenAI" },
  "ClaudeBot":       { color: "text-orange-400",  company: "Anthropic" },
  "PerplexityBot":   { color: "text-blue-400",    company: "Perplexity" },
  "Google-Extended": { color: "text-yellow-400",  company: "Google" },
  "Gemini":          { color: "text-yellow-300",  company: "Google" },
  "CCBot":           { color: "text-slate-400",   company: "Common Crawl" },
  "YouBot":          { color: "text-violet-400",  company: "You.com" },
  "Bytespider":      { color: "text-pink-400",    company: "ByteDance" },
  "Diffbot":         { color: "text-cyan-400",    company: "Diffbot" },
  "cohere-ai":       { color: "text-teal-400",    company: "Cohere" },
  "AI2Bot":          { color: "text-indigo-400",  company: "Allen AI" },
  "FacebookBot":     { color: "text-blue-500",    company: "Meta" },
  "Applebot":        { color: "text-slate-300",   company: "Apple" },
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins < 1)   return "gerade eben";
  if (mins < 60)  return `vor ${mins} Min`;
  if (hours < 24) return `vor ${hours} Std`;
  return `vor ${days} Tag${days !== 1 ? "en" : ""}`;
}

type BotVisit = {
  id: number;
  bot_name: string;
  path: string;
  visited_at: string;
};

type Page = {
  id: number;
  title: string;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  is_published: boolean;
};

export default async function SeoPage() {
  const supabase = createClient();

  const [{ data: visits }, { data: pages }] = await Promise.all([
    supabase
      .from("bot_visits")
      .select("id, bot_name, path, visited_at")
      .order("visited_at", { ascending: false })
      .limit(50),
    supabase
      .from("pages")
      .select("id, title, slug, meta_title, meta_description, is_published")
      .order("nav_order", { ascending: true }),
  ]);

  const botVisits = (visits as BotVisit[]) || [];
  const cmsPages  = (pages  as Page[])     || [];

  const today = new Date().toDateString();
  const todayVisits  = botVisits.filter(v => new Date(v.visited_at).toDateString() === today);
  const uniqueBots   = [...new Set(botVisits.map(v => v.bot_name))];
  const uniqueToday  = [...new Set(todayVisits.map(v => v.bot_name))];

  // Bot-Frequenz zählen
  const botCounts = botVisits.reduce<Record<string, number>>((acc, v) => {
    acc[v.bot_name] = (acc[v.bot_name] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-8 space-y-10 font-sans min-h-screen text-white">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white">
          SEO & AI Crawler
        </h1>
        <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mt-1">
          Echte Bot-Aktivität auf paeffgen-it.de
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Heute",        value: todayVisits.length,   sub: "AI-Besuche",      icon: TrendingUp, color: "text-green-400" },
          { label: "KI-Bots heute",value: uniqueToday.length,  sub: "verschiedene",     icon: Bot,        color: "text-blue-400"  },
          { label: "Gesamt",       value: botVisits.length,     sub: "Besuche total",   icon: Eye,        color: "text-orange-400"},
          { label: "Bots bekannt", value: uniqueBots.length,    sub: "verschiedene KIs", icon: Globe,      color: "text-violet-400"},
        ].map((s, i) => (
          <div key={i} className="bg-slate-800/60 border border-white/5 rounded-[2rem] p-6">
            <div className={`mb-3 ${s.color}`}><s.icon size={18} /></div>
            <p className="text-[9px] uppercase tracking-widest text-slate-500">{s.label}</p>
            <p className="text-3xl font-black mt-1">{s.value}</p>
            <p className="text-[9px] text-slate-600 mt-0.5 uppercase tracking-wider">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Recent Visits */}
        <div className="lg:col-span-2 bg-slate-800/40 border border-white/5 rounded-[2.5rem] p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">
              Letzte KI-Besuche
            </h2>
          </div>

          {botVisits.length === 0 ? (
            <div className="py-12 text-center">
              <Bot size={32} className="text-slate-700 mx-auto mb-4" />
              <p className="text-slate-600 text-[10px] uppercase tracking-widest">
                Noch keine Bot-Besuche aufgezeichnet.
              </p>
              <p className="text-slate-700 text-[9px] mt-2 font-mono">
                Sobald ein AI-Crawler deine Seite besucht, erscheint er hier.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {botVisits.slice(0, 15).map((v) => {
                const meta = BOT_META[v.bot_name] || { color: "text-slate-400", company: "Unknown" };
                return (
                  <div key={v.id} className="flex items-center justify-between py-3 px-4 bg-slate-900/50 rounded-2xl hover:bg-slate-800/60 transition-all group">
                    <div className="flex items-center gap-4">
                      <Bot size={14} className={meta.color} />
                      <div>
                        <span className={`text-[11px] font-black uppercase ${meta.color}`}>{v.bot_name}</span>
                        <span className="text-slate-600 text-[9px] ml-2 font-mono">({meta.company})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-[10px] font-mono text-slate-500 hidden md:block">{v.path}</span>
                      <div className="flex items-center gap-1.5 text-[9px] text-slate-600">
                        <Clock size={10} />
                        {timeAgo(v.visited_at)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bot Frequency */}
        <div className="bg-slate-800/40 border border-white/5 rounded-[2.5rem] p-8">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-white mb-6">
            Bot-Frequenz
          </h2>
          {Object.keys(botCounts).length === 0 ? (
            <p className="text-slate-600 text-[10px] uppercase tracking-widest py-8 text-center">Noch keine Daten</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(botCounts)
                .sort(([,a], [,b]) => b - a)
                .map(([name, count]) => {
                  const meta = BOT_META[name] || { color: "text-slate-400", company: "" };
                  const maxCount = Math.max(...Object.values(botCounts));
                  const pct = Math.round((count / maxCount) * 100);
                  return (
                    <div key={name}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className={`text-[10px] font-black uppercase ${meta.color}`}>{name}</span>
                        <span className="text-[10px] font-mono text-slate-500">{count}×</span>
                      </div>
                      <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#b33927] to-orange-500 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      {/* Pages SEO Overview */}
      <div className="bg-slate-800/40 border border-white/5 rounded-[2.5rem] p-8">
        <div className="flex items-center gap-3 mb-6">
          <FileText size={16} className="text-[#b33927]" />
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">
            Seiten — SEO Status
          </h2>
        </div>

        {cmsPages.length === 0 ? (
          <p className="text-slate-600 text-[10px] uppercase tracking-widest py-8 text-center">
            Noch keine CMS-Seiten erstellt.
          </p>
        ) : (
          <div className="divide-y divide-white/5">
            {cmsPages.map((page) => (
              <div key={page.id} className="py-4 flex items-start justify-between gap-6">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-white font-bold text-sm">{page.title}</span>
                    <span className="text-[9px] font-mono text-slate-600">/{page.slug}</span>
                    {!page.is_published && (
                      <span className="text-[9px] px-2 py-0.5 bg-slate-700 text-slate-500 rounded-md uppercase tracking-wider">Entwurf</span>
                    )}
                  </div>
                  <p className="text-slate-500 text-[10px] truncate">
                    {page.meta_description || <span className="text-slate-700 italic">Keine Meta-Description gesetzt</span>}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {page.meta_title && page.meta_description ? (
                    <span className="text-[9px] px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg uppercase tracking-wider font-black">OK</span>
                  ) : (
                    <span className="text-[9px] px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-lg uppercase tracking-wider font-black">Unvollständig</span>
                  )}
                  <a
                    href={`/admin/pages/edit/${page.id}`}
                    className="text-[9px] px-3 py-1 bg-slate-700/50 hover:bg-slate-600/50 border border-white/5 text-slate-400 hover:text-white rounded-lg uppercase tracking-wider transition-all"
                  >
                    Bearbeiten
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
