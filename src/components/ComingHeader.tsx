"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { Instagram, Menu, Close, ArrowRight } from "./Icons";
import { LaunchDate } from "./LaunchDate";
import { brand } from "@/lib/brand";

export function AnnouncementBar() {
  return (
    <div className="bg-cocoa px-4 py-2.5 text-center text-[10px] font-medium tracking-[0.13em] text-[#F4E7DB] sm:text-[11px]">
      Launching <LaunchDate className="font-semibold text-[#E5C58F]" /> — Join the list for early access &amp; 15% off
    </div>
  );
}

export function ComingHeader() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/#our-story", label: "About" },
    { href: "/#sneak-peek", label: "Sneak Peek" },
    { href: "/#join-the-list", label: "Join the List" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 border-b border-cocoa/8 bg-offwhite/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <div className="flex w-28 justify-start sm:w-48">
            <button onClick={() => setOpen(true)} className="p-1 lg:hidden" aria-label="Open menu"><Menu className="h-6 w-6" /></button>
          </div>
          <div className="flex flex-1 justify-center lg:justify-start lg:flex-none"><BrandMark href="/" compact /></div>
          <nav className="hidden items-center gap-9 lg:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#6E5C54] transition hover:text-cocoa">{link.label}</Link>
            ))}
          </nav>
          <div className="flex w-28 items-center justify-end gap-3 sm:w-48">
            <a href="https://www.instagram.com/zazzucosmetics/" target="_blank" rel="noreferrer" className="hidden sm:block hover:text-gold" aria-label="Instagram"><Instagram className="h-[18px] w-[18px]" /></a>
            <Link href="/#join-the-list" className="hidden rounded-full border border-cocoa/25 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition hover:border-gold hover:bg-rose-pale sm:inline-block">Join the list</Link>
            <button onClick={() => setOpen(true)} className="p-1 lg:hidden" aria-label="Open menu"><Menu className="h-6 w-6" /></button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[110] bg-cocoa/35 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setOpen(false)} />
      <div className={`fixed left-0 top-0 z-[111] h-full w-[86%] max-w-sm bg-offwhite p-7 shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between">
          <BrandMark href="/" compact />
          <button onClick={() => setOpen(false)} aria-label="Close menu"><Close className="h-6 w-6" /></button>
        </div>
        <p className="eyebrow mt-12">Explore</p>
        <nav className="mt-5 flex flex-col gap-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="border-b border-cocoa/10 py-4 font-serif text-2xl">{link.label}</Link>
          ))}
        </nav>
        <a href="https://www.instagram.com/zazzucosmetics/" target="_blank" rel="noreferrer" className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.16em]"><Instagram className="h-4 w-4" /> {brand.handle}</a>
        <Link href="/store" onClick={() => setOpen(false)} className="btn-outline mt-8 w-full">Explore the store phase <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </>
  );
}
