"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";
import { ArrowRight, Check, Minus, Plus, Trash, Bag } from "./Icons";
import { money } from "@/lib/brand";
import { products } from "@/lib/brand";

export function CartPageClient() {
  const { lines, subtotal, setQty, remove } = useCart();
  const [code, setCode] = useState("");
  const [discountRate, setDiscountRate] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("zazzu_discount");
      if (saved) { setDiscountRate(Number(saved)); setCode("BEAUTY15"); }
    } catch { /* ignore */ }
  }, []);

  const discount = subtotal * discountRate;
  const afterDiscount = subtotal - discount;
  const shipping = afterDiscount >= 75 || afterDiscount === 0 ? 0 : 9.5;
  const total = afterDiscount + shipping;
  const remaining = Math.max(0, 75 - afterDiscount);

  function applyCode() {
    if (code.trim().toUpperCase() === "BEAUTY15") {
      setDiscountRate(0.15);
      setMessage("BEAUTY15 applied — 15% off your order.");
      window.localStorage.setItem("zazzu_discount", "0.15");
    } else {
      setMessage("That code isn't valid. Try BEAUTY15.");
    }
  }

  const upsell = products.filter((item) => item.badge === "Bestseller" && !lines.some((line) => line.id === item.id)).slice(0, 2);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-pale text-gold"><Bag className="h-9 w-9" /></div>
        <h1 className="serif mt-6 text-4xl">Your bag is empty</h1>
        <p className="body-copy mt-3 text-sm">Your next favourite shade is waiting. Explore the collection and build your bag.</p>
        <Link href="/store/shop" className="btn-primary mt-7">Shop the collection <ArrowRight className="h-4 w-4" /></Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">
      <h1 className="serif text-4xl sm:text-5xl">Your bag</h1>
      <p className="body-copy mt-2 text-sm">{lines.length} {lines.length === 1 ? "item" : "items"} · almost yours</p>

      <div className="mt-8 rounded-2xl border border-gold/25 bg-rose-pale/60 p-4 text-xs sm:p-5">
        <div className="flex items-center justify-between"><span>{remaining > 0 ? <>You&apos;re <strong>{money(remaining)}</strong> away from free shipping</> : <span className="flex items-center gap-1.5 font-semibold"><Check className="h-4 w-4 text-gold" /> Free shipping unlocked</span>}</span><span className="text-gold">{Math.min(100, Math.round((afterDiscount / 75) * 100))}%</span></div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-gold transition-all" style={{ width: `${Math.min(100, (afterDiscount / 75) * 100)}%` }} /></div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="divide-y divide-cocoa/10 border-y border-cocoa/10">
            {lines.map((line) => (
              <div key={line.key} className="flex gap-4 py-5 sm:gap-6">
                <div className="h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-rose-pale sm:h-36 sm:w-28"><img src={line.image ?? "/images/lipstick-product.jpg"} alt={line.name} className="img-cover" /></div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-3"><div><h2 className="serif text-xl">{line.name}</h2>{line.shade && <p className="mt-1 text-xs text-[#8A7466]">Shade: {line.shade}</p>}<p className="mt-1 text-[11px] text-[#8A7466]">In stock · Ships in 1–2 days</p></div><p className="font-semibold">{money(line.price * line.quantity)}</p></div>
                  <div className="mt-auto flex items-center gap-4 pt-4">
                    <div className="flex items-center rounded-full border border-cocoa/20"><button onClick={() => setQty(line.key, line.quantity - 1)} className="px-3 py-2" aria-label="Decrease quantity"><Minus className="h-3 w-3" /></button><span className="w-6 text-center text-xs font-semibold">{line.quantity}</span><button onClick={() => setQty(line.key, line.quantity + 1)} className="px-3 py-2" aria-label="Increase quantity"><Plus className="h-3 w-3" /></button></div>
                    <button onClick={() => remove(line.key)} className="flex items-center gap-1 text-[11px] text-[#8A7466] underline underline-offset-4 hover:text-cocoa"><Trash className="h-3.5 w-3.5" /> Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <p className="eyebrow">You may also like</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {upsell.map((item) => (
                <CartUpsell key={item.id} name={item.name} price={item.price} image={item.image} />
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-[24px] border border-cocoa/10 bg-white p-6 sm:p-7">
          <h2 className="serif text-2xl">Order summary</h2>
          <div className="mt-6">
            <label className="eyebrow">Discount code</label>
            <div className="mt-2 flex gap-2"><input value={code} onChange={(event) => setCode(event.target.value)} placeholder="Enter code" className="input-field rounded-full py-2.5 text-xs" /><button onClick={applyCode} className="btn-outline whitespace-nowrap px-4 py-2.5 text-[10px]">Apply</button></div>
            {message && <p className="mt-2 text-[11px] text-[#7A6459]">{message}</p>}
            <p className="mt-2 text-[10px] text-[#A8948A]">Demo code: BEAUTY15</p>
          </div>
          <div className="mt-7 space-y-3 border-t border-cocoa/10 pt-6 text-sm">
            <div className="flex justify-between"><span className="text-[#7A6459]">Subtotal</span><span>{money(subtotal)}</span></div>
            {discount > 0 && <div className="flex justify-between text-gold"><span>Discount (15%)</span><span>−{money(discount)}</span></div>}
            <div className="flex justify-between"><span className="text-[#7A6459]">Shipping</span><span>{shipping === 0 ? "Free" : money(shipping)}</span></div>
            <div className="flex justify-between border-t border-cocoa/10 pt-4 text-base font-semibold"><span>Total</span><span>{money(total)}</span></div>
            <p className="text-[10px] text-[#8A7466]">Taxes included. Prices in AUD.</p>
          </div>
          <Link href="/store/checkout" className="btn-primary mt-6 w-full">Checkout <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/store/shop" className="mt-4 block text-center text-[11px] uppercase tracking-[0.14em] underline underline-offset-4">Continue shopping</Link>
          <div className="mt-6 flex justify-center gap-2 text-[9px] font-semibold uppercase tracking-wide text-[#8A7466]"><span className="rounded border border-cocoa/15 px-2 py-1">VISA</span><span className="rounded border border-cocoa/15 px-2 py-1">PayPal</span><span className="rounded border border-cocoa/15 px-2 py-1">Afterpay</span></div>
        </aside>
      </div>
    </div>
  );
}

function CartUpsell({ name, price, image }: { name: string; price: number; image: string }) {
  const { add } = useCart();
  const product = products.find((item) => item.name === name)!;
  return (
    <div className="card-soft flex items-center gap-3 p-3">
      <img src={image} alt={name} className="h-16 w-16 rounded-xl object-cover" />
      <div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">{name}</p><p className="mt-1 text-xs text-gold">{money(price)}</p><button onClick={() => add(product, product.shades[0]?.name)} className="mt-2 text-[10px] uppercase tracking-wider underline underline-offset-4">Add to bag</button></div>
    </div>
  );
}
