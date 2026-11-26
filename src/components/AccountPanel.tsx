"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";
import { ArrowRight, Check, Heart, MapPin, Package, User } from "./Icons";
import { money, products } from "@/lib/brand";

type Customer = { id: number; email: string; name: string };
type Order = { id: number; orderNumber: string; email: string; name: string; items: { name: string; quantity: number }[]; totalCents: number; status: string; createdAt: string };

export function AccountPanel() {
  const { wishlist, toggleWishlist } = useCart();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [savedAddress, setSavedAddress] = useState("");

  async function load(emailAddress: string) {
    const response = await fetch(`/api/orders?email=${encodeURIComponent(emailAddress)}`);
    const data = await response.json();
    setOrders(data.orders ?? []);
  }

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("zazzu_account_email");
      if (saved) {
        setEmail(saved);
        setCustomer({ id: 0, email: saved, name: saved.split("@")[0] });
        load(saved);
      }
    } catch { /* ignore */ }
  }, []);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: mode === "register" ? name : name || email.split("@")[0] }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setCustomer(data.customer);
      window.localStorage.setItem("zazzu_account_email", email);
      await load(email);
    } finally {
      setLoading(false);
    }
  }

  function signOut() {
    setCustomer(null); setOrders([]); setEmail(""); setName("");
    window.localStorage.removeItem("zazzu_account_email");
  }

  if (!customer) {
    return (
      <div className="mx-auto max-w-md">
        <div className="card-soft p-7 sm:p-9">
          <div className="flex gap-2 rounded-full bg-rose-pale/60 p-1">
            {(["login", "register"] as const).map((option) => (
              <button key={option} onClick={() => setMode(option)} className={`flex-1 rounded-full py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${mode === option ? "bg-cocoa text-offwhite" : "text-[#7A6459]"}`}>{option === "login" ? "Sign in" : "Register"}</button>
            ))}
          </div>
          <h2 className="serif mt-7 text-3xl">{mode === "login" ? "Welcome back" : "Join ZAZZU"}</h2>
          <p className="body-copy mt-2 text-xs">{mode === "login" ? "Enter your email to see your orders and saved items." : "Create your account to track orders and save favourites."}</p>
          <form onSubmit={submit} className="mt-7 space-y-4">
            {mode === "register" && <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="input-field rounded-2xl" />}
            <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="input-field rounded-2xl" />
            {mode === "login" && <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name (optional)" className="input-field rounded-2xl" />}
            <button disabled={loading} className="btn-primary w-full">{loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"} <ArrowRight className="h-4 w-4" /></button>
          </form>
          <p className="mt-5 text-center text-[10px] leading-relaxed text-[#9A8A80]">Mockup sign-in: no password required. We simply look up your ZAZZU orders by email.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "orders", label: "Orders", icon: Package }, { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin }, { id: "details", label: "Details", icon: User },
  ];
  const savedProducts = products.filter((product) => wishlist.includes(product.id));

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
      <aside>
        <p className="eyebrow">Hello, {customer.name.split(" ")[0]}</p>
        <nav className="mt-5 flex gap-2 overflow-x-auto lg:flex-col">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-3 text-left text-xs font-semibold lg:w-full ${tab.id === "orders" ? "" : ""} ${activeTab === tab.id ? "bg-cocoa text-offwhite" : "bg-white text-[#7A6459] hover:bg-rose-pale"}`}><tab.icon className="h-4 w-4" /> {tab.label}</button>
          ))}
          <button onClick={signOut} className="mt-4 hidden text-left text-[11px] uppercase tracking-[0.14em] underline underline-offset-4 lg:block">Sign out</button>
        </nav>
      </aside>

      <div className="card-soft p-6 sm:p-8">
        {activeTab === "orders" && (
          <div>
            <h2 className="serif text-3xl">Order history</h2>
            {orders.length === 0 ? (
              <div className="mt-8 rounded-2xl bg-rose-pale/50 p-8 text-center"><p className="body-copy text-sm">No orders yet. Your first ZAZZU order will appear here.</p><Link href="/store/shop" className="btn-primary mt-5">Start shopping</Link></div>
            ) : (
              <div className="mt-6 space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="rounded-2xl border border-cocoa/10 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div><p className="text-sm font-semibold">{order.orderNumber}</p><p className="text-[11px] text-[#8A7466]">Placed {new Date(order.createdAt).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}</p></div>
                      <span className="rounded-full bg-rose-pale px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide">{order.status}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-cocoa/8 pt-4 text-xs"><span className="text-[#7A6459]">{order.items.reduce((sum, item) => sum + item.quantity, 0)} items · {order.items.map((item) => item.name).slice(0, 2).join(", ")}</span><span className="font-semibold">{money(order.totalCents / 100)}</span></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "wishlist" && (
          <div>
            <h2 className="serif text-3xl">Your wishlist</h2>
            {savedProducts.length === 0 ? <p className="body-copy mt-6 text-sm">Nothing saved yet. Tap the heart on any product to keep it here.</p> : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {savedProducts.map((product) => (
                  <div key={product.id} className="flex gap-4 rounded-2xl border border-cocoa/10 p-3">
                    <img src={product.image} alt="" className="h-20 w-20 rounded-xl object-cover" />
                    <div className="flex-1"><Link href={`/store/product/${product.slug}`} className="serif text-lg hover:text-gold">{product.name}</Link><p className="mt-1 text-xs text-gold">{money(product.price)}</p><button onClick={() => toggleWishlist(product.id)} className="mt-3 text-[10px] uppercase tracking-wider underline">Remove</button></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "addresses" && (
          <div>
            <h2 className="serif text-3xl">Saved addresses</h2>
            {savedAddress ? <div className="mt-6 rounded-2xl border border-gold/25 bg-rose-pale/40 p-5"><p className="flex items-center gap-2 text-sm font-semibold"><MapPin className="h-4 w-4 text-gold" /> Default address</p><p className="mt-2 text-xs text-[#7A6459]">{savedAddress}</p></div> : <p className="body-copy mt-6 text-sm">No saved addresses yet. Add one to make checkout quicker.</p>}
            <form onSubmit={(event) => { event.preventDefault(); setSavedAddress(address); setAddress(""); }} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input required value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Street address, suburb, postcode" className="input-field rounded-2xl" />
              <button className="btn-outline whitespace-nowrap">Save address</button>
            </form>
          </div>
        )}

        {activeTab === "details" && (
          <div>
            <h2 className="serif text-3xl">Account details</h2>
            <div className="mt-6 space-y-4">
              <div><p className="eyebrow">Full name</p><p className="mt-2 text-sm">{customer.name}</p></div>
              <div><p className="eyebrow">Email address</p><p className="mt-2 text-sm">{customer.email}</p></div>
              <div><p className="eyebrow">Currency</p><p className="mt-2 text-sm">AUD ($) · Australia</p></div>
            </div>
            <p className="mt-8 flex items-center gap-2 text-xs text-[#7A6459]"><Check className="h-4 w-4 text-gold" /> Your details are saved for this mockup only.</p>
            <button onClick={signOut} className="btn-outline mt-6 sm:hidden">Sign out</button>
          </div>
        )}
      </div>
    </div>
  );
}
