"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { Close, Filter } from "./Icons";
import { products } from "@/lib/brand";

type Sort = "featured" | "best" | "price-asc" | "new";

const categories = ["Lips", "Eyes", "Face", "Cheeks"];
const finishes = ["Matte", "Satin", "Gloss", "Shimmer"];
const shadeFamilies = ["Nude & Rose", "Neutral", "Rose & Peach", "Champagne", "Universal"];
const skinTypes = ["All", "Dry", "Oily", "Combination"];
const sortLabels: Record<Sort, string> = { featured: "Featured", best: "Best Selling", "price-asc": "Price: Low to High", new: "Newest" };

function FilterContent({
  selectedCategories, setSelectedCategories, selectedFinishes, setSelectedFinishes,
  selectedShades, setSelectedShades, maxPrice, setMaxPrice, skinType, setSkinType, clear,
}: {
  selectedCategories: string[]; setSelectedCategories: (v: string[]) => void;
  selectedFinishes: string[]; setSelectedFinishes: (v: string[]) => void;
  selectedShades: string[]; setSelectedShades: (v: string[]) => void;
  maxPrice: number; setMaxPrice: (v: number) => void;
  skinType: string; setSkinType: (v: string) => void;
  clear: () => void;
}) {
  const toggle = (value: string, list: string[], setter: (v: string[]) => void) =>
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);

  return (
    <div className="space-y-7">
      <div>
        <p className="eyebrow">Category</p>
        <div className="mt-3 space-y-2.5">
          {categories.map((category) => <label key={category} className="flex cursor-pointer items-center gap-3 text-sm text-[#6E5C54]"><input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => toggle(category, selectedCategories, setSelectedCategories)} className="h-4 w-4 accent-[#C9A66B]" /> {category} <span className="ml-auto text-[11px] text-[#A8948A]">{products.filter((p) => p.category === category).length}</span></label>)}
        </div>
      </div>
      <div>
        <p className="eyebrow">Shade family</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {shadeFamilies.map((shade) => <button key={shade} onClick={() => toggle(shade, selectedShades, setSelectedShades)} className={`rounded-full border px-3 py-1.5 text-[11px] ${selectedShades.includes(shade) ? "border-gold bg-rose-pale font-semibold" : "border-cocoa/15 hover:border-gold"}`}>{shade}</button>)}
        </div>
      </div>
      <div>
        <p className="eyebrow">Finish</p>
        <div className="mt-3 space-y-2.5">
          {finishes.map((finish) => <label key={finish} className="flex cursor-pointer items-center gap-3 text-sm text-[#6E5C54]"><input type="checkbox" checked={selectedFinishes.includes(finish)} onChange={() => toggle(finish, selectedFinishes, setSelectedFinishes)} className="h-4 w-4 accent-[#C9A66B]" /> {finish}</label>)}
        </div>
      </div>
      <div>
        <p className="eyebrow">Price range</p>
        <input type="range" min={20} max={100} step={5} value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="mt-4 w-full" />
        <div className="mt-1 flex justify-between text-xs text-[#7A6459]"><span>$20</span><span>Up to ${maxPrice}</span></div>
      </div>
      <div>
        <p className="eyebrow">Skin type</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {skinTypes.map((type) => <button key={type} onClick={() => setSkinType(skinType === type ? "" : type)} className={`rounded-full border px-3 py-1.5 text-[11px] ${skinType === type ? "border-gold bg-rose-pale font-semibold" : "border-cocoa/15 hover:border-gold"}`}>{type}</button>)}
        </div>
      </div>
      <button onClick={clear} className="text-[11px] uppercase tracking-[0.14em] underline underline-offset-4 text-[#8A7466]">Clear all filters</button>
    </div>
  );
}

export function ShopClient({ initialCategory = "", initialSort = "featured" }: { initialCategory?: string; initialSort?: string }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);
  const [selectedShades, setSelectedShades] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(100);
  const [skinType, setSkinType] = useState("");
  const [sort, setSort] = useState<Sort>(initialSort === "best" ? "best" : initialSort === "new" ? "new" : "featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [visible, setVisible] = useState(8);

  const filtered = useMemo(() => {
    let list = products.filter((product) => {
      if (selectedCategories.length && !selectedCategories.includes(product.category)) return false;
      if (selectedFinishes.length && !selectedFinishes.includes(product.finish)) return false;
      if (selectedShades.length && !selectedShades.includes(product.shadeFamily)) return false;
      if (product.price > maxPrice) return false;
      if (skinType && !product.skinType.includes(skinType)) return false;
      return true;
    });
    if (sort === "best") list = [...list].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "new") list = [...list].sort((a, b) => (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0));
    return list;
  }, [selectedCategories, selectedFinishes, selectedShades, maxPrice, skinType, sort]);

  const clear = () => { setSelectedCategories([]); setSelectedFinishes([]); setSelectedShades([]); setMaxPrice(100); setSkinType(""); setVisible(8); };
  const activeCount = selectedCategories.length + selectedFinishes.length + selectedShades.length + (maxPrice < 100 ? 1 : 0) + (skinType ? 1 : 0);

  const filterProps = { selectedCategories, setSelectedCategories, selectedFinishes, setSelectedFinishes, selectedShades, setSelectedShades, maxPrice, setMaxPrice, skinType, setSkinType, clear };

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cocoa/10 pb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setFilterOpen(true)} className="btn-outline py-2.5 text-[10px] lg:hidden"><Filter className="h-4 w-4" /> Filters {activeCount > 0 && `(${activeCount})`}</button>
          <p className="text-xs text-[#7A6459]">Showing <strong className="text-cocoa">{filtered.length}</strong> of {products.length} products</p>
        </div>
        <label className="flex items-center gap-3 text-xs text-[#7A6459]">Sort by
          <select value={sort} onChange={(event) => { setSort(event.target.value as Sort); setVisible(8); }} className="rounded-full border border-cocoa/20 bg-white px-4 py-2.5 text-xs font-medium text-cocoa outline-none focus:border-gold">
            {Object.entries(sortLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[230px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28"><p className="serif mb-6 text-2xl">Refine</p><FilterContent {...filterProps} /></div>
        </aside>
        <div>
          {activeCount > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {[...selectedCategories, ...selectedFinishes, ...selectedShades, ...(skinType ? [skinType] : [])].map((chip) => (
                <span key={chip} className="rounded-full bg-rose-pale px-3 py-1.5 text-[11px]">{chip}</span>
              ))}
            </div>
          )}
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-cocoa/10 bg-white py-20 text-center"><h3 className="serif text-2xl">No products match those filters</h3><p className="body-copy mt-2 text-sm">Try removing a filter or two.</p><button onClick={clear} className="btn-primary mt-6">Clear filters</button></div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.slice(0, visible).map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
              {visible < filtered.length && <div className="mt-10 text-center"><button onClick={() => setVisible((value) => value + 8)} className="btn-outline">Load more products</button></div>}
            </>
          )}
          <p className="mt-10 text-center text-[10px] uppercase tracking-[0.14em] text-[#9A8A80]">Product names, shades and prices are placeholders for this mockup.</p>
        </div>
      </div>

      <div className={`fixed inset-0 z-[120] bg-cocoa/35 transition-opacity ${filterOpen ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setFilterOpen(false)} />
      <div className={`fixed bottom-0 left-0 z-[121] max-h-[88vh] w-full overflow-y-auto rounded-t-3xl bg-offwhite p-6 shadow-2xl transition-transform duration-300 ${filterOpen ? "translate-y-0" : "translate-y-full"} lg:hidden`}>
        <div className="mb-7 flex items-center justify-between"><h3 className="serif text-2xl">Filters</h3><button onClick={() => setFilterOpen(false)} aria-label="Close filters"><Close className="h-5 w-5" /></button></div>
        <FilterContent {...filterProps} />
        <button onClick={() => setFilterOpen(false)} className="btn-primary mt-8 w-full">Show {filtered.length} products</button>
      </div>
    </div>
  );
}
