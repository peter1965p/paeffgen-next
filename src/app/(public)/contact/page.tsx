import { createClient } from "@/lib/supabaseClient";
import { Send, Terminal, Cpu, MapPin, Calendar, AlertTriangle } from "lucide-react";
import FormRenderer from "@/components/FormRenderer";

export default async function ContactPage() {
  const supabase = await createClient();
  
  // Wir holen das Formular mit dem Slug 'service-request'
  // Stelle sicher, dass du im Admin-Builder den Namen "Service Request" (Slug: service-request) vergeben hast.
  const { data: form } = await supabase
    .from("forms")
    .select("*")
    .eq("slug", "service-request")
    .single();

  return (
    <div className="min-h-screen bg-[#05070a] text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Terminal size={16} className="text-blue-500" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500">
              Request_Interface // V3.0.4
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
            SERVICE <span className="text-blue-600">REQUEST.</span>
          </h1>
          <p className="mt-4 text-slate-500 font-mono text-xs uppercase tracking-tight">
            Initialisieren Sie einen Hardware-Einsatz oder fordern Sie eine Fehleranalyse an.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          
          {/* Dynamisches Formular Side */}
          <div className="md:col-span-3">
            {form ? (
              <FormRenderer 
                formId={form.id} 
                formName={form.name} 
                fields={form.fields} 
              />
            ) : (
              <div className="p-8 border border-red-500/20 bg-red-500/5 rounded-3xl text-center">
                <AlertTriangle className="mx-auto text-red-500 mb-4" size={32} />
                <p className="text-[10px] font-mono uppercase text-red-400">
                  Error: Form_Not_Found
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  Bitte erstellen Sie ein Formular mit dem Slug "service-request" im Admin-Bereich.
                </p>
              </div>
            )}
          </div>

          {/* Info Side (Statisch bleibend für System-Parameter) */}
          <div className="md:col-span-2 space-y-8">
            <div className="p-6 border border-white/5 rounded-3xl bg-zinc-900/20 backdrop-blur-sm">
              <h3 className="text-[10px] font-mono font-bold uppercase text-blue-500 mb-6 flex items-center gap-2">
                <Cpu size={14} /> System_Parameters
              </h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <MapPin size={16} className="text-slate-500 mt-1" />
                  <div>
                    <p className="text-[10px] font-mono uppercase text-white">Einsatzgebiet</p>
                    <p className="text-xs text-slate-500 italic">RLP, Saarland, Hessen, BaWü, NRW</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Calendar size={16} className="text-slate-500 mt-1" />
                  <div>
                    <p className="text-[10px] font-mono uppercase text-white">Verfügbarkeit</p>
                    <p className="text-xs text-slate-500 italic">Ab 01.05.2026 für neue Projekte</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-6 border border-blue-500/20 rounded-3xl bg-blue-500/5">
              <p className="text-[10px] font-mono text-blue-400 uppercase leading-relaxed italic">
                "Anfragen werden innerhalb der Standard-SLA (24h) gesichtet und technisch bewertet."
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}