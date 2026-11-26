"use client";

import { useState } from "react";
import { Check, ArrowRight } from "./Icons";

export function ContactForm({ source = "contact" }: { source?: string }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });
      if (!response.ok) throw new Error("Failed to send");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold/30 bg-white p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-pale text-gold"><Check className="h-7 w-7" /></div>
        <h3 className="serif mt-5 text-2xl">Message received</h3>
        <p className="body-copy mt-2 text-sm">Thank you for reaching out. We&apos;ll reply within 1–2 business days.</p>
        <button onClick={() => setStatus("idle")} className="btn-outline mt-6">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="eyebrow">Your name</span><input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="input-field mt-2 rounded-2xl" placeholder="Your name" /></label>
        <label className="block"><span className="eyebrow">Email address</span><input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="input-field mt-2 rounded-2xl" placeholder="you@example.com" /></label>
      </div>
      <label className="block"><span className="eyebrow">Your message</span><textarea required minLength={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="input-field mt-2" placeholder="Tell us what's on your mind..." /></label>
      {status === "error" && <p className="text-xs text-[#A34B43]">Please check your details and try again.</p>}
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full sm:w-auto">Send message <ArrowRight className="h-4 w-4" /></button>
    </form>
  );
}
