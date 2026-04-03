"use client";
import { useState } from "react";
import { 
  Plus, Trash2, Save, Type, Hash, AtSign, 
  CheckSquare, Layout, MousePointer2, Eye, X 
} from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import FormRenderer from "@/components/FormRenderer"; // Wichtig für die Vorschau

type FieldType = "text" | "number" | "email" | "textarea" | "checkbox";

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder: string;
  required: boolean;
}

export default function FormBuilder() {
  const supabase = createClient();
  const [formName, setFormName] = useState("SERVICE REQUEST"); // Standardmäßig auf deinen Kontakt-Slug vorbereitet
  const [fields, setFields] = useState<FormField[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // State für das Vorschau-Modal

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      label: `NEUES ${type.toUpperCase()} FELD`,
      placeholder: "PLATZHALTER...",
      required: false,
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const saveForm = async () => {
    setIsSaving(true);
    // Erzeugt den Slug service-request aus SERVICE REQUEST
    const slug = formName.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
    
    const { error } = await supabase.from("forms").upsert({ 
      name: formName, 
      slug, 
      fields 
    }, { onConflict: 'slug' });

    if (!error) {
      alert(`SYSTEM UPDATE: Formular "${formName}" wurde unter dem Slug "${slug}" publiziert.`);
    } else {
      console.error("Save Error:", error);
      alert("FEHLER BEIM SPEICHERN: " + error.message);
    }
    setIsSaving(false);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden selection:bg-blue-500/30">
      
      {/* VORSCHAU MODAL OVERLAY */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#05070a] border border-white/10 rounded-[3rem] overflow-y-auto p-12 shadow-2xl shadow-blue-500/10">
            <button 
              onClick={() => setShowPreview(false)}
              className="absolute top-8 right-8 p-4 bg-zinc-900 hover:bg-zinc-800 rounded-full text-slate-400 hover:text-white transition-all"
            >
              <X size={24} />
            </button>
            <div className="mb-10 text-center">
              <span className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase mb-2 block">Live Simulation</span>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">{formName}</h2>
            </div>
            {/* Hier nutzen wir dein echtes Form-UI */}
            <div className="max-w-2xl mx-auto">
                <FormRenderer 
                    formId="preview-only" 
                    formName={formName} 
                    fields={fields} 
                />
            </div>
          </div>
        </div>
      )}

      {/* Sub-Header */}
      <div className="flex justify-between items-center px-10 py-8 border-b border-white/5 bg-zinc-950/20 backdrop-blur-md">
        <div className="space-y-1">
          <input 
            value={formName}
            onChange={(e) => setFormName(e.target.value.toUpperCase())}
            className="bg-transparent text-3xl font-black uppercase italic tracking-tighter border-none focus:ring-0 w-full outline-none text-white placeholder:opacity-20"
            placeholder="NAME DES FORMULARS"
          />
          <div className="flex items-center gap-4">
             <span className="text-blue-500 text-[9px] font-black tracking-[0.3em] uppercase">Node: Active</span>
             <span className="text-slate-600 text-[9px] font-black tracking-[0.3em] uppercase italic">AETHER OS // FORM GEN ENGINE</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-zinc-900 border border-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 hover:border-blue-500/30 transition-all"
          >
            <Eye size={14} className="text-blue-500" /> Live Vorschau
          </button>
          <button 
            onClick={saveForm}
            disabled={isSaving}
            className="bg-[#b33927] hover:bg-[#d4442f] px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(179,57,39,0.2)] disabled:opacity-50"
          >
            <Save size={14} /> {isSaving ? "Synchronisiere..." : "Formular Publizieren"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: Komponenten */}
        <div className="w-80 border-r border-white/5 p-8 overflow-y-auto bg-zinc-950/10">
          <p className="text-slate-500 text-[9px] font-black uppercase mb-6 tracking-[0.3em] opacity-40">Hardware Library</p>
          <div className="grid gap-3">
            {[
              { type: "text", icon: Type, label: "Textfeld" },
              { type: "email", icon: AtSign, label: "E-Mail" },
              { type: "number", icon: Hash, label: "Zahl" },
              { type: "textarea", icon: Layout, label: "Textbereich" },
              { type: "checkbox", icon: CheckSquare, label: "Checkbox" },
            ].map((item) => (
              <button
                key={item.type}
                onClick={() => addField(item.type as FieldType)}
                className="group flex items-center gap-4 p-5 bg-zinc-900/40 border border-white/5 rounded-[1.5rem] hover:border-blue-500/40 hover:bg-zinc-900 transition-all text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 hover:text-white"
              >
                <div className="p-3 bg-zinc-800 rounded-xl group-hover:text-blue-500 transition-colors">
                  <item.icon size={16} />
                </div>
                {item.label}
                <Plus size={14} className="ml-auto opacity-20 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* Canvas: Bauplatz */}
        <div className="flex-1 p-12 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black">
          <div className="max-w-4xl mx-auto space-y-4">
            {fields.length === 0 ? (
              <div className="h-96 border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center text-slate-700 space-y-4">
                <MousePointer2 size={40} className="animate-bounce" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em]">Warten auf Input Sequence...</p>
              </div>
            ) : (
              fields.map((field, index) => (
                <div key={field.id} className="group relative p-8 bg-zinc-950/80 border border-white/5 rounded-[2.5rem] flex items-center gap-8 hover:border-white/20 transition-all backdrop-blur-sm">
                  <div className="text-blue-500 font-black italic text-xl opacity-20 group-hover:opacity-100 transition-opacity">
                    #{String(index + 1).padStart(2, '0')}
                  </div>
                  
                  <div className="flex-1 grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-600 uppercase ml-2 tracking-widest text-white/40">Label</p>
                      <input 
                        value={field.label}
                        onChange={(e) => updateField(field.id, { label: e.target.value.toUpperCase() })}
                        className="w-full bg-zinc-900/50 border border-white/5 rounded-xl p-4 text-[11px] font-bold uppercase text-white outline-none focus:border-blue-500/30"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-600 uppercase ml-2 tracking-widest text-white/40">Placeholder</p>
                      <input 
                        value={field.placeholder}
                        onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                        className="w-full bg-zinc-900/50 border border-white/5 rounded-xl p-4 text-[11px] font-bold text-white outline-none focus:border-blue-500/30"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <label className="flex flex-col items-center gap-2 cursor-pointer group/check">
                      <span className="text-[8px] font-black uppercase text-slate-600 tracking-tighter">Pflicht</span>
                      <input 
                        type="checkbox" 
                        checked={field.required}
                        onChange={(e) => updateField(field.id, { required: e.target.checked })}
                        className="w-5 h-5 rounded-lg border-white/10 bg-zinc-900 text-[#b33927] focus:ring-0 transition-all cursor-pointer"
                      />
                    </label>
                    <button 
                      onClick={() => removeField(field.id)}
                      className="p-4 bg-red-500/5 hover:bg-red-500/20 text-red-500/40 hover:text-red-500 rounded-2xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}