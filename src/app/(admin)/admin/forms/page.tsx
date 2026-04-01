"use client";
import { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Save, 
  Type, 
  Hash, 
  AtSign, 
  CheckSquare, 
  ChevronDown,
  Layout
} from "lucide-react";
import { createClient } from "@/lib/supabaseClient";

type FieldType = "text" | "number" | "email" | "textarea" | "checkbox" | "select";

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder: string;
  required: boolean;
}

export default function FormBuilder() {
  const supabase = createClient();
  const [formName, setFormName] = useState("Unbenanntes Formular");
  const [fields, setFields] = useState<FormField[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      label: `Neues ${type} Feld`,
      placeholder: "",
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
    const slug = formName.toLowerCase().replace(/ /g, "-");
    
    const { error } = await supabase.from("forms").insert([
      { name: formName, slug, fields }
    ]);

    if (!error) alert("Formular hocheffizient gespeichert!");
    setIsSaving(false);
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white font-sans">
      <div className="flex justify-between items-center mb-10">
        <div>
          <input 
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="bg-transparent text-3xl font-black uppercase italic tracking-tighter border-none focus:ring-0 w-full outline-none"
          />
          <p className="text-slate-500 text-[10px] mt-2 uppercase tracking-[0.2em] font-bold">
            AETHER OS // FORM-GEN ENGINE
          </p>
        </div>
        <button 
          onClick={saveForm}
          disabled={isSaving}
          className="bg-[#b33927] hover:bg-[#d4442f] px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all"
        >
          <Save size={14} /> {isSaving ? "Speichert..." : "Formular Publizieren"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Toolbar */}
        <div className="space-y-3">
          <p className="text-slate-500 text-[9px] font-black uppercase mb-4 tracking-widest">Komponenten</p>
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
              className="w-full flex items-center gap-3 p-4 bg-zinc-900/50 border border-white/5 rounded-2xl hover:border-blue-500/50 hover:bg-zinc-900 transition-all text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white"
            >
              <item.icon size={16} className="text-blue-500" /> {item.label}
              <Plus size={12} className="ml-auto opacity-30" />
            </button>
          ))}
        </div>

        {/* Canvas */}
        <div className="lg:col-span-3 space-y-4">
          {fields.length === 0 && (
            <div className="h-64 border-2 border-dashed border-white/5 rounded-[2.5rem] flex items-center justify-center text-slate-600 text-xs uppercase font-black tracking-widest">
              Ziehe Komponenten hierher oder klicke links
            </div>
          )}
          {fields.map((field, index) => (
            <div key={field.id} className="p-6 bg-zinc-950 border border-white/5 rounded-[2rem] flex items-center gap-6 group hover:border-white/20 transition-all">
              <div className="text-slate-700 font-black italic">#{index + 1}</div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <input 
                  value={field.label}
                  onChange={(e) => updateField(field.id, { label: e.target.value })}
                  placeholder="Label eingeben..."
                  className="bg-zinc-900/50 border border-white/5 rounded-xl p-3 text-[10px] font-bold uppercase text-white outline-none"
                />
                <input 
                  value={field.placeholder}
                  onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                  placeholder="Platzhalter..."
                  className="bg-zinc-900/50 border border-white/5 rounded-xl p-3 text-[10px] font-bold uppercase text-white outline-none"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={field.required}
                    onChange={(e) => updateField(field.id, { required: e.target.checked })}
                    className="rounded border-white/10 bg-zinc-900 text-blue-600"
                  />
                  <span className="text-[9px] font-black uppercase text-slate-500">Pflicht</span>
                </label>
                <button 
                  onClick={() => removeField(field.id)}
                  className="p-3 text-slate-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}