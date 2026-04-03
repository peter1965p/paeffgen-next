"use client";
import { useState, useEffect } from "react";
import { 
  Plus, Trash2, Save, Type, Hash, AtSign, 
  CheckSquare, Layout, MousePointer2, Eye, X, ArrowLeft 
} from "lucide-react";
import { createClient } from "@/lib/supabaseClient";
import FormRenderer from "@/components/FormRenderer";
import Link from "next/link";
import { useRouter } from "next/navigation";

type FieldType = "text" | "number" | "email" | "textarea" | "checkbox";

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder: string;
  required: boolean;
}

interface Props {
  initialId?: string; // Wenn vorhanden -> Edit Mode
}

export default function FormEditorShared({ initialId }: Props) {
  const supabase = createClient();
  const router = useRouter();
  const [formName, setFormName] = useState("NEUES FORMULAR");
  const [fields, setFields] = useState<FormField[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Daten laden, wenn eine ID übergeben wurde (Edit-Modus)
  useEffect(() => {
    if (initialId) {
      const loadData = async () => {
        const { data, error } = await supabase
          .from("forms")
          .select("*")
          .eq("id", initialId)
          .single();
        
        if (data) {
          setFormName(data.name);
          setFields(data.fields || []);
        }
      };
      loadData();
    }
  }, [initialId]);

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

  const saveForm = async () => {
    setIsSaving(true);
    const slug = formName.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
    
    const payload = { 
      name: formName, 
      slug, 
      fields,
      updated_at: new Date()
    };

    const { error } = initialId 
      ? await supabase.from("forms").update(payload).eq("id", initialId)
      : await supabase.from("forms").insert([payload]);

    if (!error) {
      alert("SYSTEM_SYNC_COMPLETE: Formular publiziert.");
      router.push("/admin/forms");
      router.refresh();
    }
    setIsSaving(false);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden">
      {/* Header mit Zurück-Button */}
      <div className="flex justify-between items-center px-10 py-6 border-b border-white/5 bg-zinc-950/20 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <Link href="/admin/forms" className="p-3 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors">
             <ArrowLeft size={20} />
          </Link>
          <div className="space-y-1">
            <input 
              value={formName}
              onChange={(e) => setFormName(e.target.value.toUpperCase())}
              className="bg-transparent text-2xl font-black uppercase italic tracking-tighter border-none focus:ring-0 w-full outline-none text-white"
            />
            <p className="text-blue-500 text-[9px] font-black tracking-[0.3em] uppercase">
              {initialId ? `EDIT_MODE // UUID: ${initialId}` : "INITIALIZING_NEW_NODE"}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={() => setShowPreview(true)} className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-zinc-900 border border-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">
            <Eye size={14} className="text-blue-500" /> Live Vorschau
          </button>
          <button onClick={saveForm} disabled={isSaving} className="bg-[#b33927] hover:bg-[#d4442f] px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all">
            <Save size={14} /> {isSaving ? "SYNCING..." : "Speichern"}
          </button>
        </div>
      </div>

      {/* Builder Layout (Sidebar + Canvas) - Hier nimmst du dein gewohntes Builder-UI */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar und Canvas wie in deinem vorherigen Code... */}
        {/* (Der Übersicht halber hier verkürzt, nutze dein UI aus der letzten Nachricht) */}
        <div className="w-80 border-r border-white/5 p-8 overflow-y-auto bg-zinc-950/10 text-xs">
             <p className="text-slate-500 mb-4 tracking-widest uppercase">Hardware Library</p>
             {/* ... Buttons für Felder ... */}
        </div>
        <div className="flex-1 p-12 overflow-y-auto bg-black">
             {/* ... Mapping der Felder ... */}
        </div>
      </div>

      {/* Vorschau Modal (wie zuvor) */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
           <div className="bg-zinc-950 border border-white/10 p-12 rounded-[3rem] w-full max-w-2xl relative">
              <button onClick={() => setShowPreview(false)} className="absolute top-8 right-8"><X /></button>
              <FormRenderer formId="preview" formName={formName} fields={fields} />
           </div>
        </div>
      )}
    </div>
  );
}