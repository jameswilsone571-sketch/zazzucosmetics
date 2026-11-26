"use client";

import Link from "next/link";
import { useCart } from "./CartContext";
import { Close, Minus, Plus, ArrowRight, Bag } from "./Icons";
import { money } from "@/lib/brand";
import { suggestedProducts } from "./CartContext";

export function CartDrawer() {
  const { lines, subtotal, count, isOpen, setOpen, setQty, remove, add } = useCart();
  const remaining = Math.max(0, 75 - subtotal);
  const progress = Math.min(100, (subtotal / 75) * 100);
  const upsell = suggestedProducts().find((item) => !lines.some((line) => line.id === item.id));

  return (
    <>
      <div
        className={`fixed inset-0 z-[120] bg-cocoa/35 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-[130] flex h-screen w-full max-w-[430px] flex-col bg-offwhite shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-label="Shopping bag"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-cocoa/10 px-6 py-5">
          <div>
            <p className="eyebrow">Your bag</p>
            <h2 className="serif text-2xl">Shopping bag <span className="text-gold">({count})</span></h2>
          </div>
          <button onClick={() => setOpen(false)} className="rounded-full border border-cocoa/15 p-2 hover:bg-white" aria-label="Close bag"><Close className="h-5 w-5" /></button>
        </div>

        <div className="px-6 pt-5">
          <div className="flex items-center justify-between text-[11px] text-[#7A6459]">
            <span>{remaining > 0 ? <>You&apos;re <strong className="text-cocoa">{money(remaining)}</strong> away from free shipping</> : "You've unlocked free shipping!"}</span>
            <span className="text-gold">{Math.round(progress)}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-nude/70">
            <div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="hide-scrollbar flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full bg-rose-pale p-5 text-gold"><Bag className="h-8 w-8" /></div>
              <h3 className="serif text-2xl">Your bag is waiting</h3>
              <p className="body-copy mt-2 max-w-xs text-sm">Discover the collection and find your new everyday favourite.</p>
              <Link href="/store/shop" onClick={() => setOpen(false)} className="btn-primary mt-6">Shop the collection</Link>
            </div>
          ) : (
            <div className="space-y-5">
              {lines.map((line) => (
                <div key={line.key} className="flex gap-4 border-b border-cocoa/8 pb-5">
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-rose-pale">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={line.image ?? "/images/lipstick-product.jpg"} alt={line.name} className="img-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-2">
                      <p className="text-sm font-semibold leading-snug">{line.name}</p>
                      <p className="whitespace-nowrap text-sm font-semibold">{money(line.price * line.quantity)}</p>
                    </div>
                    {line.shade && <p className="mt-1 text-xs text-[#8A7466]">Shade: {line.shade}</p>}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-cocoa/15 bg-white">
                        <button onClick={() => setQty(line.key, line.quantity - 1)} className="px-2.5 py-1.5" aria-label="Decrease quantity"><Minus className="h-3 w-3" /></button>
                        <span className="min-w-5 text-center text-xs font-semibold">{line.quantity}</span>
                        <button onClick={() => setQty(line.key, line.quantity + 1)} className="px-2.5 py-1.5" aria-label="Increase quantity"><Plus className="h-3 w-3" /></button>
                      </div>
                      <button onClick={() => remove(line.key)} className="text-[11px] uppercase tracking-wider text-[#8A7466] underline underline-offset-4 hover:text-cocoa">Remove</button>
                    </div>
                  </div>
                </div>
              ))}

              {upsell && (
                <div className="rounded-2xl border border-gold/25 bg-white p-4">
                  <p className="eyebrow mb-3">Complete the look</p>
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={upsell.image} alt={upsell.name} className="h-16 w-16 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold leading-tight">{upsell.name}</p>
                      <p className="mt-1 text-xs text-gold">{money(upsell.price)}</p>
                    </div>
                    <button onClick={() => add(upsell, upsell.shades[0]?.name)} className="rounded-full border border-cocoa/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider hover:bg-rose-pale">Add</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-cocoa/10 bg-white px-6 py-5">
            <div className="flex justify-between text-sm"><span className="text-[#7A6459]">Subtotal</span><span className="font-semibold">{money(subtotal)}</span></div>
            <p className="mt-1 text-[11px] text-[#8A7466]">Shipping & taxes calculated at checkout.</p>
            <Link href="/store/checkout" onClick={() => setOpen(false)} className="btn-primary mt-4 w-full">Checkout <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/store/cart" onClick={() => setOpen(false)} className="mt-3 block text-center text-[11px] uppercase tracking-[0.16em] underline underline-offset-4">View full bag</Link>
          </div>
        )}
      </aside>
    </>
  );
}
