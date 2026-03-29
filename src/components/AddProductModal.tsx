"use client";

import { useState } from "react";
import { X, Save, Package, DollarSign, FileText, Database, RefreshCw, Percent, Truck } from "lucide-react";
import { createFullProduct } from "@/lib/actions/inventory.actions";

export default function AddProductModal({ isOpen, onClose, onRefresh }: any) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    // Wir mappen die Daten exakt so, wie deine Action sie verlangt [cite: 2026-03-09]
    const productData = {
      name: formData.get("name") as string,
      preis: parseFloat(formData.get("preis") as string),
      ek_preis: parseFloat(formData.get("ek_preis") as string) || 0, // Pflichtfeld [cite: 2026-03-09]
      ust_satz: parseInt(formData.get("ust_satz") as string) || 19, // Pflichtfeld [cite: 2026-03-09]
      category_id: parseInt(formData.get("category_id") as string) || 1, // Muss number sein [cite: 2026-03-09]
      supplier_id: parseInt(formData.get("supplier_id") as string) || 1, // Pflichtfeld + number [cite: 2026-03-09]
      beschreibung: formData.get("beschreibung") as string,
      lagerbestand: parseInt(formData.get("lagerbestand") as string) || 0,
    };

    try {
      await createFullProduct(productData); 
      onRefresh();
      onClose();
    } catch (err) {
      console.error("INJECTION_FAILURE", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl font-sans">
      <div className="bg-[#0d111c] border border-white/10 w-full max-w-xl rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-3 text-blue-500">
            <Database size={18} />
            <h2 className="text-xl font-black italic uppercase tracking-tighter">Full_Asset_Injection</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all text-slate-500">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 gap-4">
            {/* Produktname */}
            <div className="relative">
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
              <input name="name" placeholder="PRODUCT_NAME" required className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white font-mono text-[11px] outline-none focus:border-blue-500/50" />
            </div>

            {/* Preise: VK und EK [cite: 2026-03-09] */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-blue-500">VK</span>
                <input name="preis" type="number" step="0.01" placeholder="UNIT_PRICE" required className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white font-mono text-[11px] outline-none" />
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-500">EK</span>
                <input name="ek_preis" type="number" step="0.01" placeholder="COST_PRICE" required className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white font-mono text-[11px] outline-none" />
              </div>
            </div>

            {/* Steuer und Bestand [cite: 2026-03-09] */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-500">%</span>
                <input name="ust_satz" type="number" placeholder="VAT_RATE (e.g. 19)" defaultValue="19" required className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white font-mono text-[11px] outline-none" />
              </div>
              <div className="relative">
                <Database className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input name="lagerbestand" type="number" placeholder="STOCK_QTY" required className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white font-mono text-[11px] outline-none" />
              </div>
            </div>

            {/* Kategorien und Lieferant [cite: 2026-03-09] */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-500">CAT</span>
                <input name="category_id" type="number" placeholder="CAT_ID (Number)" defaultValue="1" required className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white font-mono text-[11px] outline-none" />
              </div>
              <div className="relative">
                <Truck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input name="supplier_id" type="number" placeholder="SUPPLIER_ID" defaultValue="1" required className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white font-mono text-[11px] outline-none" />
              </div>
            </div>

            {/* Beschreibung */}
            <div className="relative">
              <FileText className="absolute left-4 top-4 text-slate-600" size={16} />
              <textarea name="beschreibung" placeholder="ASSET_LOG_DESCRIPTION" rows={2} className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white font-mono text-[11px] outline-none" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-5 rounded-[2rem] font-black italic uppercase tracking-[0.2em] text-[10px] transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3">
            {loading ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
            {loading ? "COMMITTING_DATA..." : "EXECUTE_STORE_INJECTION"}
          </button>
        </form>
      </div>
    </div>
  );
}