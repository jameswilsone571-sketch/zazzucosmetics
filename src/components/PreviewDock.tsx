"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Monitor, Phone, ChevronDown, Sparkle } from "./Icons";

const pages = [
  { group: "Phase 01 · Coming soon", links: [
    { href: "/", label: "Coming soon homepage" }, { href: "/contact", label: "Contact" },
  ]},
  { group: "Phase 02 · The store", links: [
    { href: "/store", label: "Store homepage" }, { href: "/store/shop", label: "Shop / collection" },
    { href: "/store/product/the-velvet-matte-lipstick", label: "Product detail" }, { href: "/store/cart", label: "Cart" },
    { href: "/store/checkout", label: "Checkout" }, { href: "/store/account", label: "Customer account" },
    { href: "/store/about", label: "About / our story" }, { href: "/store/contact", label: "Contact & FAQ" },
  ]},
  { group: "Design system", links: [{ href: "/style-guide", label: "Style guide" }] },
];

export function PreviewDock() {
  const pathname = usePathname();
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.dataset.viewport = mobile ? "mobile" : "desktop";
  }, [mobile]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={dockRef} className="preview-dock fixed bottom-4 left-1/2 z-[150] -translate-x-1/2">
      {open && (
        <div className="absolute bottom-[calc(100%+10px)] left-0 max-h-[60vh] w-[300px] overflow-y-auto rounded-2xl border border-cocoa/10 bg-white p-3 shadow-2xl">
          <p className="eyebrow mb-2 px-2">Explore the mockup</p>
          {pages.map((group) => (
            <div key={group.group} className="mb-3">
              <p className="px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-gold">{group.group}</p>
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-2 py-2 text-xs transition hover:bg-rose-pale ${pathname === link.href ? "bg-rose-pale font-semibold text-cocoa" : "text-[#6E5C54]"}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-1 rounded-full border border-cocoa/12 bg-white/95 p-1.5 shadow-[0_12px_40px_rgba(59,42,38,0.16)] backdrop-blur">
        <button onClick={() => setOpen((value) => !value)} className="flex items-center gap-1.5 rounded-full bg-cocoa px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-offwhite">
          <Sparkle className="h-3.5 w-3.5" /> Preview <ChevronDown className={`h-3 w-3 transition ${open ? "rotate-180" : ""}`} />
        </button>
        <span className="mx-0.5 h-5 w-px bg-cocoa/10" />
        <button onClick={() => setMobile(false)} className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] ${!mobile ? "bg-rose-pale text-cocoa" : "text-[#9A8A80]"}`} aria-pressed={!mobile}>
          <Monitor className="h-3.5 w-3.5" /> Desktop
        </button>
        <button onClick={() => setMobile(true)} className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] ${mobile ? "bg-rose-pale text-cocoa" : "text-[#9A8A80]"}`} aria-pressed={mobile}>
          <Phone className="h-3.5 w-3.5" /> 390px
        </button>
      </div>
    </div>
  );
}
