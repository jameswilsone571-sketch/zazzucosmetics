"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Star } from "./Icons";
import { useCart } from "./CartContext";
import { money, type Product } from "@/lib/brand";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { add, wishlist, toggleWishlist } = useCart();
  const [shade, setShade] = useState<string | undefined>(product.shades[0]?.name);
  const saved = wishlist.includes(product.id);
  const soldOut = product.badge === "Sold Out";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-cocoa/8 bg-white transition hover:shadow-[0_18px_45px_rgba(59,42,38,0.10)]">
      <Link href={`/store/product/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-rose-pale">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} loading={priority ? "eager" : "lazy"} className="img-cover transition duration-700 group-hover:scale-105" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.secondImage} alt="" loading="lazy" className="img-cover absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100" />
        {product.badge && <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.12em] ${product.badge === "Sold Out" ? "bg-cocoa text-offwhite" : product.badge === "New" ? "bg-white text-gold" : "bg-gold text-cocoa"}`}>{product.badge}</span>}
      </Link>
      <button onClick={() => toggleWishlist(product.id)} aria-label={saved ? "Remove from wishlist" : "Add to wishlist"} className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:scale-105 ${saved ? "text-blush" : "text-cocoa"}`}><Heart className="h-4 w-4" filled={saved} /></button>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="eyebrow text-[9px]">{product.category} · {product.finish}</p>
          <span className="flex items-center gap-1 text-[10px] text-[#8A7466]"><Star className="h-3 w-3 text-gold" filled /> {product.rating}</span>
        </div>
        <Link href={`/store/product/${product.slug}`} className="serif mt-2 text-lg leading-tight hover:text-gold sm:text-xl">{product.name}</Link>
        <div className="mt-3 flex items-center gap-1.5">
          {product.shades.slice(0, 5).map((item) => (
            <button key={item.name} onClick={() => setShade(item.name)} title={item.name} aria-label={`Select shade ${item.name}`} className={`h-4 w-4 rounded-full border transition ${shade === item.name ? "ring-2 ring-gold ring-offset-1" : "border-white"}`} style={{ backgroundColor: item.hex }} />
          ))}
          {product.shades.length > 5 && <span className="text-[9px] text-[#8A7466]">+{product.shades.length - 5}</span>}
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <div><span className="text-sm font-semibold">{money(product.price)}</span>{product.compareAt && <span className="ml-2 text-xs text-[#9A8A80] line-through">{money(product.compareAt)}</span>}</div>
          <button disabled={soldOut} onClick={() => add(product, shade)} className="rounded-full border border-cocoa/20 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.1em] transition hover:border-cocoa hover:bg-cocoa hover:text-offwhite disabled:opacity-40">
            {soldOut ? "Sold out" : "Add to bag"}
          </button>
        </div>
      </div>
    </article>
  );
}
