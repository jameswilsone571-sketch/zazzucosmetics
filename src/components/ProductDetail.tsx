"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { Check, Close, Heart, Minus, Plus, Shield, Star, Truck } from "./Icons";
import { money, type Product } from "@/lib/brand";

export function ProductDetail({ product }: { product: Product }) {
  const { add, wishlist, toggleWishlist } = useCart();
  const [shade, setShade] = useState(product.shades[0]?.name);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [zoom, setZoom] = useState(false);
  const saved = wishlist.includes(product.id);

  const gallery = [product.image, product.secondImage, "/images/swatch-strip.jpg", "/images/collection-flatlay.jpg"].filter((image, index, list) => list.indexOf(image) === index);

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <div className="relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-[24px] bg-rose-pale" onClick={() => setZoom(true)}>
            <img src={gallery[activeImage]} alt={product.name} className="img-cover" />
            {product.badge && <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em]">{product.badge}</span>}
            <span className="absolute bottom-4 right-4 rounded-full bg-white/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em]">Click to zoom</span>
          </div>
          <div className="mt-3 flex gap-3">
            {gallery.map((image, index) => (
              <button key={`${image}-${index}`} onClick={() => setActiveImage(index)} className={`h-20 w-16 overflow-hidden rounded-xl border-2 sm:h-24 sm:w-20 ${activeImage === index ? "border-gold" : "border-transparent"}`} aria-label={`View image ${index + 1}`}>
                <img src={image} alt="" className="img-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:pt-4">
          <p className="eyebrow">{product.category} · {product.finish} finish</p>
          <h1 className="serif mt-3 text-4xl leading-tight sm:text-5xl">{product.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#7A6459]">
            <span className="flex items-center gap-1 text-gold">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4" filled={index < Math.round(product.rating)} />)}</span>
            <span>{product.rating} · {product.reviewCount} reviews</span>
            <span className="text-gold">|</span>
            <span>{product.shades.length} shades</span>
          </div>
          <div className="mt-5 flex items-end gap-3">
            <span className="serif text-3xl">{money(product.price)}</span>
            {product.compareAt && <span className="pb-1 text-sm text-[#9A8A80] line-through">{money(product.compareAt)}</span>}
          </div>
          <p className="body-copy mt-5 text-sm">{product.description}</p>
          <p className="mt-3 text-xs text-[#9A8A80]">Placeholder product, formula and pricing — replace before launch.</p>

          <div className="mt-8">
            <div className="flex items-center justify-between"><p className="eyebrow">Shade: {shade}</p><span className="text-[11px] text-[#8A7466]">{product.shades.length} shades</span></div>
            <div className="mt-4 flex flex-wrap gap-3">
              {product.shades.map((item) => (
                <button key={item.name} onClick={() => setShade(item.name)} title={item.name} aria-label={`Select ${item.name}`} className={`h-10 w-10 rounded-full border-2 transition ${shade === item.name ? "border-gold ring-2 ring-gold/30 ring-offset-2" : "border-white hover:border-gold/50"}`} style={{ backgroundColor: item.hex }} />
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center rounded-full border border-cocoa/20 bg-white">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3" aria-label="Decrease quantity"><Minus className="h-4 w-4" /></button>
              <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3" aria-label="Increase quantity"><Plus className="h-4 w-4" /></button>
            </div>
            <button onClick={() => add(product, shade, quantity)} className="btn-primary flex-1">Add to bag — {money(product.price * quantity)}</button>
            <button onClick={() => toggleWishlist(product.id)} aria-label="Add to wishlist" className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cocoa/20 bg-white ${saved ? "text-blush" : ""}`}><Heart className="h-5 w-5" filled={saved} /></button>
          </div>

          <p className="mt-4 flex items-center gap-2 text-xs text-[#7A6459]"><Truck className="h-4 w-4 text-gold" /> Ships in 1–2 business days from Sydney · Free over $75</p>
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-rose-pale/70 px-4 py-3 text-xs text-[#6E5C54]"><Shield className="h-4 w-4 text-gold" /> or 4 interest-free payments of {money(product.price / 4)} with Afterpay</div>

          <div className="mt-8 divide-y divide-cocoa/10 border-y border-cocoa/10">
            {[
              { title: "Description", content: product.description },
              { title: "How to Use", content: "Start with a clean, moisturised base. Apply from the centre of the lips outward, building colour as desired. Pair with the Silk Defining Lip Liner for longer wear." },
              { title: "Ingredients", content: "Placeholder INCI list for mockup purposes: Caprylic/Capric Triglyceride, Simmondsia Chinensis (Jojoba) Seed Oil, Tocopherol, Shea Butter, Iron Oxides (CI 77491, CI 77492, CI 77499). Always check final packaging before use." },
              { title: "Shipping & Returns", content: "Dispatched within 1–2 business days. Standard AU shipping is free on orders over $75. Unworn, unopened items can be returned within 30 days of delivery." },
            ].map((item) => (
              <details key={item.title} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">{item.title}<Plus className="plus-icon h-4 w-4 text-gold" /></summary>
                <p className="body-copy mt-3 text-xs">{item.content}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {zoom && (
        <div className="fixed inset-0 z-[170] flex items-center justify-center bg-cocoa/85 p-4" onClick={() => setZoom(false)} role="dialog" aria-modal="true" aria-label="Product image zoom">
          <button className="absolute right-5 top-5 text-offwhite" aria-label="Close zoom"><Close className="h-7 w-7" /></button>
          <img src={gallery[activeImage]} alt={product.name} className="max-h-[88vh] max-w-full rounded-2xl object-contain" />
        </div>
      )}

      {/* Mobile sticky add-to-bag */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-cocoa/10 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">{product.name}</p><p className="text-sm text-gold">{money(product.price)}</p></div>
        <button onClick={() => add(product, shade, quantity)} className="btn-primary px-5 py-3 text-[10px]">Add to bag</button>
      </div>
    </>
  );
}
