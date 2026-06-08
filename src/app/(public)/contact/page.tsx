import { createClient } from "@/lib/supabaseClient";
import { Terminal, Cpu, MapPin, Calendar, AlertTriangle } from "lucide-react";
import FormRenderer from "@/components/FormRenderer";

export const metadata = {
  title: "Päffgen IT | Kontakt & Impressum",
  description: "Projekt anfragen, Kontakt aufnehmen oder Impressum einsehen.",
};

export default async function ContactPage() {
  const supabase = await createClient();

  const { data: form } = await supabase
    .from("forms")
    .select("*")
    .eq("slug", "service-request")
    .single();

  return (
    <div className="min-h-screen bg-[#05070a] text-white pt-32 pb-20 px-6 font-mono selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-16 border-b border-white/5 pb-12">
          <div className="flex items-center gap-3 mb-4">
            <Terminal size={16} className="text-blue-500" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500">
              Päffgen IT // Kontakt
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
            PROJEKT <span className="text-blue-600">ANFRAGEN.</span>
          </h1>
          <p className="mt-6 text-slate-400 text-xs uppercase tracking-widest max-w-2xl leading-relaxed">
            Hardware-Einsatz, Webprojekt oder AI-Integration — schreib mir und
            wir besprechen dein Vorhaben.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* FORM */}
          <div className="lg:col-span-7">
            {form ? (
              <div className="bg-zinc-900/10 border border-white/5 p-8 md:p-12 rounded-sm backdrop-blur-md shadow-2xl shadow-blue-900/5">
                <FormRenderer
                  formId={form.id}
                  formName={form.name}
                  fields={form.fields}
                />
              </div>
            ) : (
              <div className="p-12 border border-red-500/20 bg-red-500/5 rounded-sm text-center">
                <AlertTriangle
                  className="text-red-500 animate-pulse mx-auto mb-6"
                  size={48}
                />
                <h3 className="text-lg font-bold uppercase italic mb-2">
                  Formular nicht gefunden
                </h3>
                <p className="text-[10px] uppercase text-slate-500 mb-8 tracking-tighter">
                  Status Code: 404 // Target Slug: service-request
                </p>
                <div className="text-left bg-black/40 p-6 border-l-2 border-red-500 text-[11px] text-slate-400 space-y-4">
                  <p className="text-white font-bold tracking-widest uppercase underline decoration-red-500">
                    Lösungsschritte:
                  </p>
                  <p>
                    1. Navigiere zum{" "}
                    <span className="text-blue-400 italic">Admin-Bereich</span>.
                  </p>
                  <p>
                    2. Öffne das{" "}
                    <span className="text-blue-400 italic">Formular-Modul</span>
                    .
                  </p>
                  <p>
                    3. Benenne das Formular exakt{" "}
                    <span className="text-white bg-zinc-800 px-2">
                      Service Request
                    </span>
                    .
                  </p>
                  <p>
                    4. Slug wird automatisch auf{" "}
                    <span className="text-white italic">service-request</span>{" "}
                    gesetzt.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-5 space-y-8">
            {/* System Parameters */}
            <div className="p-10 border border-white/5 rounded-sm bg-zinc-900/20 backdrop-blur-sm relative overflow-hidden group">
              <h3 className="text-xs font-bold uppercase text-blue-500 mb-10 flex items-center gap-3 tracking-[0.3em]">
                <Cpu size={16} /> System Parameters
              </h3>
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-sm">
                    <MapPin size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-slate-500 tracking-widest mb-1">
                      Einsatzgebiet
                    </p>
                    <p className="text-sm text-white font-bold italic uppercase tracking-tighter">
                      RLP // Saarland // Hessen // BaWü // NRW
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-sm">
                    <Calendar size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-slate-500 tracking-widest mb-1">
                      Verfügbarkeit
                    </p>
                    <p className="text-sm text-white font-bold italic uppercase tracking-tighter">
                      Sofort verfügbar
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SLA */}
            <div className="p-8 border border-blue-600/30 rounded-sm bg-blue-600/[0.03]">
              <div className="text-[8px] text-blue-500/50 uppercase tracking-[0.5em] mb-4">
                SLA Guarantee
              </div>
              <p className="text-xs text-blue-400 uppercase leading-relaxed italic">
                &ldquo;Alle Anfragen werden innerhalb von 24 Stunden gesichtet,
                bewertet und priorisiert.&rdquo;
              </p>
            </div>

            {/* IMPRESSUM */}
            <div className="p-8 border border-white/5 rounded-sm bg-zinc-900/20">
              <p className="text-[10px] text-blue-500 tracking-[0.3em] uppercase mb-6">
                Impressum
              </p>
              <div className="space-y-2 text-[11px] text-slate-400 leading-relaxed">
                <p className="text-white font-bold uppercase tracking-widest">
                  Peter Päffgen
                </p>
                <p>Päffgen IT</p>
                <p>Lindenhof</p>
                <p>54531 Manderscheid</p>
                <p className="pt-2">
                  <span className="text-slate-600 uppercase text-[9px] tracking-widest">
                    Tel:{" "}
                  </span>
                  <a
                    href="tel:+4915569448813"
                    className="hover:text-blue-400 transition-colors"
                  >
                    +49 1556 9448813
                  </a>
                </p>
                <p>
                  <span className="text-slate-600 uppercase text-[9px] tracking-widest">
                    Mail:{" "}
                  </span>
                  <a
                    href="mailto:peter@paeffgen-it.de"
                    className="hover:text-blue-400 transition-colors"
                  >
                    peter@paeffgen-it.de
                  </a>
                </p>
                <p>
                  <span className="text-slate-600 uppercase text-[9px] tracking-widest">
                    Web:{" "}
                  </span>
                  <a
                    href="https://paeffgen-it.de"
                    className="hover:text-blue-400 transition-colors"
                  >
                    paeffgen-it.de
                  </a>
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 text-[9px] text-slate-600 uppercase tracking-widest leading-loose">
                <p>Verantwortlich für den Inhalt:</p>
                <p>Peter Päffgen, Lindenhof, 54531 Manderscheid</p>
                <p className="mt-2">
                  Umsatzsteuer-ID gemäß §27a UStG: wird nachgereicht
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
