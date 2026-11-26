"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";
import { ArrowLeft, Check, Lock, Shield } from "./Icons";
import { money } from "@/lib/brand";

export function CheckoutClient() {
  const { lines, subtotal, clear } = useCart();
  const router = useRouter();
  const [discountRate, setDiscountRate] = useState(0);
  const [payment, setPayment] = useState("Card");
  const [shippingMethod, setShippingMethod] = useState("Standard");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", name: "", address: "", city: "", postcode: "", card: "", expiry: "", cvc: "" });

  useEffect(() => {
    try { const saved = window.localStorage.getItem("zazzu_discount"); if (saved) setDiscountRate(Number(saved)); } catch { /* ignore */ }
  }, []);

  const discount = subtotal * discountRate;
  const shipping = shippingMethod === "Express" ? 14.95 : subtotal - discount >= 75 || subtotal === 0 ? 0 : 9.5;
  const total = subtotal - discount + shipping;

  async function placeOrder(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email,
          address: `${form.address}, ${form.city} ${form.postcode}`,
          items: lines.map((line) => ({ id: line.id, name: line.name, price: line.price, quantity: line.quantity, shade: line.shade, image: line.image })),
          subtotal, discount, shipping, total,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Checkout failed");
      clear();
      window.localStorage.removeItem("zazzu_discount");
      router.push(`/store/order/${data.orderNumber}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  const input = (key: keyof typeof form, placeholder: string, type = "text", required = true) => (
    <input required={required} type={type} value={form[key]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} placeholder={placeholder} className="input-field rounded-2xl" />
  );

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-10 sm:px-8 lg:px-12">
      <Link href="/store/cart" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#7A6459] hover:text-cocoa"><ArrowLeft className="h-4 w-4" /> Back to bag</Link>
      <h1 className="serif mt-5 text-4xl sm:text-5xl">Checkout</h1>
      <p className="body-copy mt-2 flex items-center gap-2 text-xs"><Lock className="h-4 w-4 text-gold" /> Secure, distraction-free checkout. This is a mockup — no real payment is taken.</p>

      <form onSubmit={placeOrder} className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <section className="card-soft p-6 sm:p-8">
            <div className="flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-cocoa text-[11px] font-semibold text-offwhite">1</span><h2 className="serif text-2xl">Contact information</h2></div>
            <div className="mt-6 grid gap-4">{input("email", "Email address", "email")}{input("name", "Full name")}</div>
          </section>

          <section className="card-soft p-6 sm:p-8">
            <div className="flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-cocoa text-[11px] font-semibold text-offwhite">2</span><h2 className="serif text-2xl">Shipping address</h2></div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">{input("address", "Street address")}</div>
              {input("city", "Suburb / City")}{input("postcode", "Postcode")}
              <p className="text-[11px] text-[#8A7466] sm:col-span-2">Australia only for this mockup.</p>
            </div>
          </section>

          <section className="card-soft p-6 sm:p-8">
            <div className="flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-cocoa text-[11px] font-semibold text-offwhite">3</span><h2 className="serif text-2xl">Shipping method</h2></div>
            <div className="mt-6 space-y-3">
              {[
                { name: "Standard", title: "Standard shipping", detail: "2–5 business days", price: subtotal - discount >= 75 ? "Free" : "$9.50" },
                { name: "Express", title: "Express shipping", detail: "1–2 business days", price: "$14.95" },
              ].map((option) => (
                <label key={option.name} className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 ${shippingMethod === option.name ? "border-gold bg-rose-pale/40" : "border-cocoa/12"}`}>
                  <input type="radio" name="shipping" checked={shippingMethod === option.name} onChange={() => setShippingMethod(option.name)} className="accent-[#C9A66B]" />
                  <div className="flex-1"><p className="text-sm font-semibold">{option.title}</p><p className="text-xs text-[#8A7466]">{option.detail}</p></div><span className="text-sm font-semibold">{option.price}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="card-soft p-6 sm:p-8">
            <div className="flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-cocoa text-[11px] font-semibold text-offwhite">4</span><h2 className="serif text-2xl">Payment</h2></div>
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {["Card", "PayPal", "Apple Pay", "Afterpay"].map((option) => (
                <button type="button" key={option} onClick={() => setPayment(option)} className={`rounded-xl border px-3 py-3 text-xs font-semibold ${payment === option ? "border-gold bg-rose-pale" : "border-cocoa/12 hover:border-gold"}`}>{option}</button>
              ))}
            </div>
            {payment === "Card" ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">{input("card", "Card number")}</div>
                {input("expiry", "MM / YY")}{input("cvc", "CVC")}
              </div>
            ) : (
              <p className="mt-5 rounded-2xl bg-rose-pale/60 p-5 text-sm text-[#6E5C54]">{payment} selected. In a live store this would open the {payment} payment flow. No payment is taken in this mockup.</p>
            )}
            <p className="mt-5 flex items-center gap-2 text-[11px] text-[#8A7466]"><Shield className="h-4 w-4 text-gold" /> Your payment details are never stored in this demo.</p>
          </section>

          {error && <p className="rounded-xl bg-[#FBE9E7] p-4 text-sm text-[#A34B43]" role="alert">{error}</p>}
          <button type="submit" disabled={loading || lines.length === 0} className="btn-primary w-full py-4 disabled:opacity-50">{loading ? "Placing order..." : `Place order · ${money(total)}`}</button>
        </div>

        <aside className="h-fit rounded-[24px] border border-cocoa/10 bg-white p-6 sm:p-7 lg:sticky lg:top-28">
          <h2 className="serif text-2xl">Order summary</h2>
          <div className="mt-5 space-y-4">
            {lines.map((line) => (
              <div key={line.key} className="flex gap-3 border-b border-cocoa/8 pb-4">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-rose-pale"><img src={line.image} alt="" className="img-cover" /><span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-cocoa text-[9px] text-offwhite">{line.quantity}</span></div>
                <div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">{line.name}</p>{line.shade && <p className="text-[10px] text-[#8A7466]">{line.shade}</p>}</div>
                <span className="text-xs font-semibold">{money(line.price * line.quantity)}</span>
              </div>
            ))}
            {lines.length === 0 && <p className="text-sm text-[#8A7466]">Your bag is empty.</p>}
          </div>
          <div className="mt-5 space-y-2.5 text-sm">
            <div className="flex justify-between"><span className="text-[#7A6459]">Subtotal</span><span>{money(subtotal)}</span></div>
            {discount > 0 && <div className="flex justify-between text-gold"><span>Discount</span><span>−{money(discount)}</span></div>}
            <div className="flex justify-between"><span className="text-[#7A6459]">Shipping</span><span>{shipping === 0 ? "Free" : money(shipping)}</span></div>
            <div className="flex justify-between border-t border-cocoa/10 pt-3 text-base font-semibold"><span>Total</span><span>{money(total)}</span></div>
          </div>
          <div className="mt-6 flex items-start gap-2 rounded-xl bg-rose-pale/60 p-3 text-[11px] text-[#7A6459]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> 30-day easy returns on unopened products.</div>
        </aside>
      </form>
    </div>
  );
}
