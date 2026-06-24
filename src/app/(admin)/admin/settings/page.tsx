"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabaseClient";
import { saveSettings } from "./actions";
import ThemePicker from "@/components/ThemePicker";
import {
  User, CreditCard, Mail, FileText, Save,
  CheckCircle2, AlertTriangle, Loader2,
} from "lucide-react";

type SettingsRow = Record<string, string | null>;

function Field({
  label, name, value, onChange, type = "text", placeholder = "",
}: {
  label: string; name: string; value: string;
  onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">{label}</label>
      <input
        name={name} type={type} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 font-mono focus:outline-none focus:border-orange-500/50 placeholder:text-slate-600 transition-colors"
      />
    </div>
  );
}

function Section({
  icon, title, children, onSave, saving, saved,
}: {
  icon: React.ReactNode; title: string; children: React.ReactNode;
  onSave: () => void; saving: boolean; saved: boolean;
}) {
  return (
    <div className="bg-slate-800/60 border border-white/5 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="text-slate-400">{icon}</div>
          <h2 className="text-sm font-black text-white uppercase tracking-wide italic">{title}</h2>
        </div>
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 disabled:opacity-50 text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all"
          style={{ backgroundColor: "var(--admin-accent, #ea580c)" }}
        >
          {saving ? (
            <Loader2 size={11} className="animate-spin" />
          ) : saved ? (
            <CheckCircle2 size={11} />
          ) : (
            <Save size={11} />
          )}
          {saving ? "Speichern…" : saved ? "Gespeichert" : "Speichern"}
        </button>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {children}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Identity
  const [businessName, setBusinessName] = useState("");
  const [slug, setSlug] = useState("");
  const [bio, setBio] = useState("");

  // Payment
  const [mollieLive, setMollieLive] = useState("");
  const [mollieTest, setMollieTest] = useState("");

  // Mail
  const [mailAddress, setMailAddress] = useState("");
  const [mailHost, setMailHost] = useState("");
  const [mailPassword, setMailPassword] = useState("");

  // Legal
  const [ceoName, setCeoName] = useState("");
  const [taxId, setTaxId] = useState("");
  const [address, setAddress] = useState("");
  const [plz, setPlz] = useState("");
  const [city, setCity] = useState("");

  // Save states per section
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data } = await supabase.from("settings").select("*").limit(1).single();
      if (data) {
        const s = data as SettingsRow;
        setBusinessName(s.business_name ?? "");
        setSlug(s.slug ?? "");
        setBio(s.bio ?? "");
        setMollieLive(s.mollie_live_key ?? "");
        setMollieTest(s.mollie_test_key ?? "");
        setMailAddress(s.mail_address ?? "");
        setMailHost(s.mail_host ?? "");
        setMailPassword(s.mail_password ?? "");
        setCeoName(s.ceo_name ?? "");
        setTaxId(s.tax_id ?? "");
        setAddress(s.address ?? "");
        setPlz(s.plz ?? "");
        setCity(s.city ?? "");
      }
      setLoaded(true);
    })();
  }, []);

  async function saveSection(section: string, updates: Record<string, string>) {
    setSaving((v) => ({ ...v, [section]: true }));
    setError(null);
    try {
      const res = await saveSettings(updates);
      if (res.error) setError(res.error);
      else {
        setSaved((v) => ({ ...v, [section]: true }));
        setTimeout(() => setSaved((v) => ({ ...v, [section]: false })), 3000);
      }
    } finally {
      setSaving((v) => ({ ...v, [section]: false }));
    }
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={20} className="animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Settings</h1>
        <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-1">
          Spectora Control Center — Einstellungen
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-900/30 border border-red-500/30 rounded-xl text-red-400 text-xs font-mono">
          <AlertTriangle size={13} /> {error}
        </div>
      )}

      {/* Theme Picker */}
      <ThemePicker />

      {/* Identität */}
      <Section
        icon={<User size={15} />}
        title="Identität"
        onSave={() => saveSection("identity", {
          business_name: businessName,
          slug,
          bio,
        })}
        saving={!!saving.identity}
        saved={!!saved.identity}
      >
        <Field label="Business Name" name="business_name" value={businessName} onChange={setBusinessName} placeholder="Päffgen IT" />
        <Field label="URL Slug" name="slug" value={slug} onChange={setSlug} placeholder="peter-paeffgen" />
        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Bio / Kurzbeschreibung</label>
          <textarea
            value={bio} onChange={(e) => setBio(e.target.value)}
            rows={3} placeholder="Vibe Coder aus der Vulkaneifel…"
            className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 font-mono focus:outline-none focus:border-orange-500/50 resize-none placeholder:text-slate-600 transition-colors"
          />
        </div>
      </Section>

      {/* Zahlung */}
      <Section
        icon={<CreditCard size={15} />}
        title="Zahlung (Mollie)"
        onSave={() => saveSection("payment", {
          mollie_live_key: mollieLive,
          mollie_test_key: mollieTest,
        })}
        saving={!!saving.payment}
        saved={!!saved.payment}
      >
        <Field label="Live Key" name="mollie_live_key" type="password" value={mollieLive} onChange={setMollieLive} placeholder="live_…" />
        <Field label="Test Key" name="mollie_test_key" type="password" value={mollieTest} onChange={setMollieTest} placeholder="test_…" />
      </Section>

      {/* E-Mail */}
      <Section
        icon={<Mail size={15} />}
        title="E-Mail Konto"
        onSave={() => saveSection("mail", {
          mail_address: mailAddress,
          mail_host: mailHost,
          mail_password: mailPassword,
        })}
        saving={!!saving.mail}
        saved={!!saved.mail}
      >
        <Field label="E-Mail Adresse" name="mail_address" value={mailAddress} onChange={setMailAddress} placeholder="peter@paeffgen-it.de" />
        <Field label="IMAP Host" name="mail_host" value={mailHost} onChange={setMailHost} placeholder="imaps.udag.de" />
        <Field label="Passwort" name="mail_password" type="password" value={mailPassword} onChange={setMailPassword} placeholder="••••••••" />
      </Section>

      {/* Impressum */}
      <Section
        icon={<FileText size={15} />}
        title="Impressum"
        onSave={() => saveSection("legal", {
          ceo_name: ceoName,
          tax_id: taxId,
          address,
          plz,
          city,
        })}
        saving={!!saving.legal}
        saved={!!saved.legal}
      >
        <Field label="Name / Inhaber" name="ceo_name" value={ceoName} onChange={setCeoName} placeholder="Peter Päffgen" />
        <Field label="Steuernummer" name="tax_id" value={taxId} onChange={setTaxId} placeholder="DE123456789" />
        <div className="md:col-span-2">
          <Field label="Straße & Hausnummer" name="address" value={address} onChange={setAddress} placeholder="Musterstraße 1" />
        </div>
        <Field label="PLZ" name="plz" value={plz} onChange={setPlz} placeholder="56745" />
        <Field label="Ort" name="city" value={city} onChange={setCity} placeholder="Mendig" />
      </Section>
    </div>
  );
}
