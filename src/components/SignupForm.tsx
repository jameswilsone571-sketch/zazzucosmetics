"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, Instagram, Facebook, Close, ArrowRight } from "./Icons";

type Variant = "hero" | "section" | "footer" | "compact";

export function SignupForm({
  source = "general",
  variant = "section",
  showPhone = false,
  buttonLabel = "Get early access",
}: {
  source?: string;
  variant?: Variant;
  showPhone?: boolean;
  buttonLabel?: string;
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone: phone || null, source }),
      });
      if (!response.ok) throw new Error("Signup failed");
      setSuccess(true);
      setEmail("");
      setPhone("");
    } catch {
      setStatus("error");
    }
  }

  const hero = variant === "hero";
  const compact = variant === "compact";

  return (
    <>
      <form onSubmit={submit} className={hero ? "mx-auto w-full max-w-xl" : compact ? "w-full" : "mx-auto w-full max-w-lg"}>
        <div className={hero ? "flex flex-col gap-2.5 sm:flex-row" : "flex flex-col gap-2.5"}>
          <input
            type="email" required value={email} onChange={(event) => setEmail(event.target.value)}
            placeholder={hero ? "Enter your email address" : "Your email address"}
            aria-label="Email address"
            className={`input-field ${hero ? "flex-1 border-white/70 bg-white/85 py-3.5" : "border-cocoa/20 bg-white"}`}
          />
          {showPhone && (
            <input
              type="tel" value={phone} onChange={(event) => setPhone(event.target.value)}
              placeholder="Phone (optional)" aria-label="Phone number (optional)"
              className={`input-field ${hero ? "sm:w-40" : ""}`}
            />
          )}
          <button type="submit" disabled={status === "loading"} className={`${hero ? "btn-gold whitespace-nowrap px-6 py-3.5" : "btn-primary"} disabled:opacity-60`}>
            {status === "loading" ? "Joining..." : buttonLabel} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        {status === "error" && <p className="mt-2 text-xs text-[#A34B43]" role="alert">Something went wrong. Please try again.</p>}
        {hero && <p className="mt-3 text-[11px] tracking-wide text-[#6E5C54]">Be the first to shop. No spam, ever.</p>}
      </form>

      {success && (
        <div className="fixed inset-0 z-[180] flex items-center justify-center bg-cocoa/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="signup-success-title">
          <div className="animate-in relative w-full max-w-md rounded-[24px] bg-offwhite p-8 text-center shadow-2xl">
            <button onClick={() => setSuccess(false)} className="absolute right-4 top-4 rounded-full p-1.5 text-[#8A7466] hover:bg-rose-pale" aria-label="Close"><Close className="h-5 w-5" /></button>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-pale text-gold"><Check className="h-8 w-8" /></div>
            <p className="eyebrow mt-5">Welcome to the list</p>
            <h3 id="signup-success-title" className="serif mt-2 text-3xl">You&apos;re on the list! 💄</h3>
            <p className="body-copy mt-3 text-sm">Check your inbox for your welcome gift. We&apos;ll be in touch with early access before anyone else.</p>
            <div className="mt-6 rounded-2xl border border-gold/25 bg-white p-4">
              <p className="text-xs font-semibold">Share the excitement</p>
              <div className="mt-3 flex justify-center gap-2">
                <Link href="https://instagram.com" target="_blank" className="btn-outline px-4 py-2 text-[10px]"><Instagram className="h-4 w-4" /> Instagram</Link>
                <Link href="https://facebook.com" target="_blank" className="btn-outline px-4 py-2 text-[10px]"><Facebook className="h-4 w-4" /> Facebook</Link>
                <button
                  onClick={() => { navigator.clipboard?.writeText(typeof window !== "undefined" ? window.location.href : ""); setCopied(true); }}
                  className="btn-outline px-4 py-2 text-[10px]"
                >{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Copied" : "Copy"}</button>
              </div>
            </div>
            <button onClick={() => setSuccess(false)} className="mt-5 text-[11px] uppercase tracking-[0.16em] underline underline-offset-4">Continue exploring</button>
          </div>
        </div>
      )}
    </>
  );
}
