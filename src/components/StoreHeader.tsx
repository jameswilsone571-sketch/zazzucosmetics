"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "./BrandMark";
import { Bag, Close, Heart, Instagram, Menu, Search, User, ArrowRight } from "./Icons";
import { useCart } from "./CartContext";
import { products, money } from "@/lib/brand";

const nav = [
  { href: "/store/shop", label: "Shop All" },
  { href: "/store/shop?category=Lips", label: "Lips" },
  { href: "/store/shop?category=Eyes", label: "Eyes" },
  { href: "/store/shop?category=Face", label: "Face" },
  { href: "/store/shop?sort=best", label: "Bestsellers" },
  { href: "/store/shop?sort=new", label: "New" },
  { href: "/store/about", label: "About" },
];

export function StoreHeader() {
  const { count, setOpen, wishlist } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [pathname]);

  const results = query.trim().length > 0
    ? products.filter((product) => `${product.name} ${product.category} ${product.finish}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : products.slice(0, 4);

  return (
    <>
      <div className="bg-cocoa px-4 py-2.5 text-center text-[10px] tracking-[0.16em] text-[#F1E2D4] sm:text-[11px]">
        Free shipping on orders over $75 <span className="mx-2 text-gold">|</span> Afterpay available
      </div>
      <header className="sticky top-0 z-50 border-b border-cocoa/8 bg-offwhite/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <button onClick={() => setMenuOpen(true)} className="p-1 lg:hidden" aria-label="Open menu"><Menu className="h-6 w-6" /></button>
            <button onClick={() => setSearchOpen(true)} className="hidden p-1 sm:block" aria-label="Search"><Search className="h-[21px] w-[21px]" /></button>
          </div>
          <BrandMark href="/store" compact />
          <nav className="hidden items-center gap-6 xl:flex">
            {nav.map((link) => (
              <Link key={link.label} href={link.href} className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6E5C54] transition hover:text-gold">{link.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={() => setSearchOpen(true)} className="sm:hidden" aria-label="Search"><Search className="h-5 w-5" /></button>
            <Link href="/store/account" aria-label="Account" className="hidden sm:block hover:text-gold"><User className="h-5 w-5" /></Link>
            <Link href="/store/account" aria-label={`Wishlist, ${wishlist.length} items`} className="relative hidden hover:text-gold sm:block"><Heart className="h-5 w-5" filled={wishlist.length > 0} />{wishlist.length > 0 && <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-cocoa">{wishlist.length}</span>}</Link>
            <button onClick={() => setOpen(true)} aria-label={`Shopping bag, ${count} items`} className="relative hover:text-gold"><Bag className="h-5 w-5" />{count > 0 && <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-cocoa px-1 text-[9px] font-bold text-offwhite">{count}</span>}</button>
          </div>
        </div>
        <nav className="hide-scrollbar flex gap-6 overflow-x-auto border-t border-cocoa/8 px-5 py-3 xl:hidden sm:px-8">
          {nav.map((link) => <Link key={link.label} href={link.href} className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6E5C54]">{link.label}</Link>)}
        </nav>
      </header>

      <div className={`fixed inset-0 z-[110] bg-cocoa/35 transition-opacity ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setMenuOpen(false)} />
      <div className={`fixed left-0 top-0 z-[111] h-full w-[86%] max-w-sm bg-offwhite p-7 shadow-2xl transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between"><BrandMark href="/store" compact /><button onClick={() => setMenuOpen(false)} aria-label="Close menu"><Close className="h-6 w-6" /></button></div>
        <p className="eyebrow mt-10">Shop</p>
        <nav className="mt-4 flex flex-col">
          {nav.map((link) => <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="border-b border-cocoa/10 py-3.5 font-serif text-2xl">{link.label}</Link>)}
        </nav>
        <Link href="/store/contact" onClick={() => setMenuOpen(false)} className="btn-primary mt-8 w-full">Contact &amp; FAQ</Link>
        <div className="mt-6 flex gap-4 text-[#8A7466]"><Instagram className="h-5 w-5" /><span className="text-xs">@zazzucosmetics</span></div>
      </div>

      <div className={`fixed inset-0 z-[115] bg-cocoa/35 transition-opacity ${searchOpen ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setSearchOpen(false)} />
      <div className={`fixed left-1/2 top-0 z-[116] w-full max-w-2xl -translate-x-1/2 rounded-b-3xl bg-offwhite p-6 shadow-2xl transition-transform duration-300 ${searchOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="flex items-center justify-between"><p className="eyebrow">Search the collection</p><button onClick={() => setSearchOpen(false)} aria-label="Close search"><Close className="h-5 w-5" /></button></div>
        <div className="mt-3 flex items-center gap-3 rounded-full border border-cocoa/20 bg-white px-4 py-3"><Search className="h-5 w-5 text-[#8A7466]" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try ‘lipstick’ or ‘blush’" className="w-full bg-transparent text-sm outline-none" /></div>
        <p className="eyebrow mt-6">{query ? "Results" : "Popular right now"}</p>
        <div className="mt-3 space-y-2">
          {results.map((product) => (
            <Link key={product.id} href={`/store/product/${product.slug}`} onClick={() => setSearchOpen(false)} className="flex items-center gap-3 rounded-xl p-2 hover:bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
              <div className="flex-1"><p className="text-sm font-medium">{product.name}</p><p className="text-xs text-[#8A7466]">{product.category} · {money(product.price)}</p></div>
              <ArrowRight className="h-4 w-4 text-gold" />
            </Link>
          ))}
          {query && results.length === 0 && <p className="text-sm text-[#8A7466]">No matches yet — try a different word.</p>}
        </div>
      </div>
    </>
  );
}
