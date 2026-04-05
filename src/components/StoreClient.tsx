"use client";

import { useState } from "react";
import { 
  Package, Search, Filter, 
  Plus, MoreVertical, Hash,
  ArrowUpDown
} from "lucide-react";

// 1. Definition der Props, damit TypeScript nicht mehr meckert
interface StoreClientProps {
  initialProducts: any[];
  categories: any[]; // Hier ist die fehlende Eigenschaft!
}

export default function StoreClient({ initialProducts, categories }: StoreClientProps) {
  const [products, setProducts] = useState(initialProducts);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter-Logik
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category_id?.toString() === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-8 space-y-8">
      
      {/* ACTION BAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Stock Level</h2>
           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-1">Total Assets: {filteredProducts.length}</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
            <input 
              type="text"
              placeholder="SEARCH ASSET..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-blue-500/50 transition-all"
            />
          </div>
          <button className="p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex items-center gap-2">
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* GLOBAL CATEGORY FILTER */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar border-b border-white/5">
        <button 
          onClick={() => setActiveCategory("all")}
          className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${activeCategory === "all" ? "bg-blue-600 border-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]" : "bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/10"}`}
        >
          All_Assets
        </button>
        {categories.map((cat) => (
          <button 
            key={cat.id}
            onClick={() => setActiveCategory(cat.id.toString())}
            className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border flex items-center gap-2 ${activeCategory === cat.id.toString() ? "bg-blue-600 border-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]" : "bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/10"}`}
          >
            <Hash size={10} /> {cat.name}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
          <div key={p.id} className="group bg-white/[0.01] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-blue-500/30 transition-all flex flex-col">
            <div className="aspect-video bg-black/40 relative">
              {p.bild_url ? (
                <img src={p.bild_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={p.name} />
              ) : (
                <div className="w-full h-full flex items-center justify-center opacity-10">
                  <Package size={40} />
                </div>
              )}
              {/* Kategorie Label aus der Relation */}
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg text-[8px] font-black text-blue-400 uppercase tracking-widest">
                {p.categories?.name || "No_Sector"}
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tighter text-white truncate">{p.name}</h3>
                  <p className="text-[10px] text-slate-600 font-mono">ID: {p.id.toString().padStart(4, '0')}</p>
                </div>
                <button className="p-2 text-slate-700 hover:text-white transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[8px] text-slate-600 uppercase font-black">Valuation</span>
                  <span className="text-sm font-black text-white">{Number(p.price).toLocaleString('de-DE')} €</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[8px] text-slate-600 uppercase font-black tracking-tighter">Status</span>
                  <span className={`text-[10px] font-black ${p.lagerbestand > 0 ? "text-green-500" : "text-red-500"}`}>
                    {p.lagerbestand > 0 ? `${p.lagerbestand} IN_STOCK` : "DEPLETED"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}