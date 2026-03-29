"use client";

import { useState } from "react";
import { Plus, Package, DollarSign, RefreshCw, Database } from "lucide-react";
import AddProductModal from "./AddProductModal";

/**
 * AETHER OS // STORE CLIENT [cite: 2026-03-09]
 */
export default function StoreClient({ initialProducts }: { initialProducts: any[] }) {
  const [products, setProducts] = useState<any[]>(initialProducts || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshProducts = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (!data.error) setProducts(data);
    } catch (err) {
      console.error("STORE_SYNC_ERROR", err);
    }
    setIsRefreshing(false);
  };

  return (
    <div className="p-8 h-full flex flex-col gap-8 bg-transparent font-sans overflow-hidden">
      {/* Das Modal Overlay [cite: 2026-03-09] */}
      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={refreshProducts} 
      />

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">
            Inventory <span className="text-blue-500">Sector</span>
          </h1>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">
            Node: paeffgen-it.de // commerce_active
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={refreshProducts} 
            className={`p-4 rounded-2xl border border-white/5 bg-white/5 transition-all ${isRefreshing ? 'animate-spin text-blue-500' : 'text-slate-500 hover:text-white'}`}
          >
            <RefreshCw size={16} />
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black italic uppercase text-[10px] transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus size={16} /> Add Asset
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 pb-12">
        {products.length === 0 ? (
          <div className="h-64 border border-dashed border-white/10 rounded-[3rem] flex flex-col items-center justify-center text-slate-700 italic font-mono uppercase tracking-[0.4em] text-[10px]">
            <Database className="mb-4 opacity-20" size={40} />
            No Assets Detected in Database
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group bg-[#0d111c]/80 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-xl hover:border-blue-500/30 transition-all shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-500 shadow-inner group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <Package size={20} />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">{product.category_id || 'ASSET_UNIT'}</span>
                    <h3 className="text-white font-black italic uppercase tracking-tight text-lg leading-none mt-1">{product.name}</h3>
                  </div>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed mb-8 h-12 line-clamp-2 italic opacity-60">
                  {product.beschreibung || "No asset log description available for this unit."}
                </p>

                <div className="flex justify-between items-center bg-black/40 p-5 rounded-[1.8rem] border border-white/5">
                  <div className="flex items-center gap-2 text-blue-500">
                    <DollarSign size={16} />
                    <span className="text-2xl font-mono font-bold tracking-tighter text-white">{product.preis}</span>
                  </div>
                  <div className="text-[9px] font-mono uppercase tracking-tighter">
                    <span className="text-slate-600 mr-2">Stock:</span>
                    <span className={product.lagerbestand > 0 ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                      {product.lagerbestand} Units
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}