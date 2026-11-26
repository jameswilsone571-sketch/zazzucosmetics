"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Close, Sparkle } from "./Icons";

export function VipPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    try { if (window.sessionStorage.getItem("zazzu_vip_dismissed")) return; } catch { /* ignore */ }
    const timer = window.setTimeout(() => setVisible(true), 8000);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    setDismissed(true);
    try { window.sessionStorage.setItem("zazzu_vip_dismissed", "1"); } catch { /* ignore */ }
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "vip_popup" }),
    }).catch(() => null);
    setDone(true);
  }

  if (!visible || dismissed) return null;

  return (
    <aside className="animate-in fixed bottom-24 right-4 z-[145] w-[320px] max-w-[calc(100vw-2rem)] rounded-3xl border border-gold/35 bg-white/95 p-5 shadow-[0_24px_70px_rgba(59,42,38,0.25)] backdrop-blur" aria-label="VIP list offer">
      <button onClick={dismiss} className="absolute right-3 top-3 rounded-full p-1.5 text-[#8A7466] hover:bg-rose-pale" aria-label="Dismiss offer"><Close className="h-4 w-4" /></button>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-pale text-gold"><Sparkle className="h-5 w-5" /></div>
      <p className="eyebrow mt-3">A little something for you</p>
      <h3 className="serif mt-1 text-2xl leading-tight">Get 15% off at launch</h3>
      <p className="mt-2 text-xs leading-relaxed text-[#7A6459]">Join the VIP list for early access and your launch-day discount code.</p>
      {done ? (
        <div className="mt-4 rounded-xl bg-rose-pale p-3 text-center text-xs font-semibold text-cocoa">You&apos;re on the list. Check your inbox! 💄</div>
      ) : (
        <form onSubmit={submit} className="mt-4 space-y-2">
          <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" className="input-field py-2.5 text-xs" />
          <button className="btn-gold w-full py-2.5 text-[10px]">Join the VIP list</button>
        </form>
      )}
      <Link href="/#join-the-list" onClick={dismiss} className="mt-3 block text-center text-[10px] uppercase tracking-[0.14em] underline underline-offset-4">See all launch perks</Link>
    </aside>
  );
}
