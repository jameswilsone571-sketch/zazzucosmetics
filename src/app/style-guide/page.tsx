import Link from "next/link";
import { ComingHeader } from "@/components/ComingHeader";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, Heart, Instagram, Sparkle, Star } from "@/components/Icons";
import { palette, products } from "@/lib/brand";

export const dynamic = "force-dynamic";

export default function StyleGuidePage() {
  return (
    <>
      <ComingHeader />
      <main className="bg-offwhite">
        <section className="bg-cocoa px-5 py-16 text-center text-offwhite">
          <Sparkle className="mx-auto h-7 w-7 text-[#E5C58F]" />
          <p className="eyebrow mt-4 text-[#E5C58F]">One system · Two phases</p>
          <h1 className="display-type serif mt-4">ZAZZU design system</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-[#E3D0C4]">A single visual language for the coming-soon launch and the full store. Everything below is a live component from the site.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/" className="btn-gold">Phase 1 preview <ArrowRight className="h-4 w-4" /></Link><Link href="/store" className="btn-outline border-white/40 text-offwhite hover:bg-white/10">Phase 2 preview <ArrowRight className="h-4 w-4" /></Link></div>
        </section>

        <div className="mx-auto max-w-[1200px] space-y-16 px-5 py-16 sm:px-8">
          <section>
            <p className="eyebrow">01 · Colour palette</p>
            <h2 className="serif mt-3 text-4xl">Warm, soft and considered</h2>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {palette.map((color) => (
                <div key={color.hex} className="overflow-hidden rounded-2xl border border-cocoa/10 bg-white">
                  <div className="h-28" style={{ backgroundColor: color.hex }} />
                  <div className="p-4"><p className="text-xs font-semibold">{color.name}</p><p className="mt-1 font-mono text-[11px] text-[#8A7466]">{color.hex}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow">02 · Typography</p>
              <h2 className="serif mt-3 text-4xl">Editorial meets everyday</h2>
              <div className="card-soft mt-6 p-7">
                <p className="eyebrow">Playfair Display · Headings</p>
                <p className="serif mt-3 text-5xl">Beauty, unveiled.</p>
                <p className="serif mt-2 text-2xl italic">Italic accent for warmth</p>
                <div className="my-7 h-px bg-cocoa/10" />
                <p className="eyebrow">DM Sans · Body &amp; UI</p>
                <p className="body-copy mt-3 text-sm">Clean, long-lasting makeup made for every skin tone. Designed for clarity, warmth and a little bit of everyday luxury.</p>
              </div>
            </div>
            <div>
              <p className="eyebrow">03 · Buttons &amp; badges</p>
              <h2 className="serif mt-3 text-4xl">Clear, consistent actions</h2>
              <div className="card-soft mt-6 p-7">
                <div className="flex flex-wrap gap-3"><button className="btn-primary">Primary action <ArrowRight className="h-4 w-4" /></button><button className="btn-outline">Secondary</button><button className="btn-gold">Gold accent</button></div>
                <div className="my-7 h-px bg-cocoa/10" />
                <div className="flex flex-wrap gap-2"><span className="rounded-full bg-gold px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-cocoa">Bestseller</span><span className="rounded-full bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-gold ring-1 ring-gold">New</span><span className="rounded-full bg-cocoa px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-offwhite">Sold out</span></div>
                <div className="my-7 h-px bg-cocoa/10" />
                <div className="flex gap-4 text-[#8A7466]"><Heart className="h-5 w-5" /><Instagram className="h-5 w-5" /><Star className="h-5 w-5 text-gold" filled /><Sparkle className="h-5 w-5 text-gold" /></div>
              </div>
            </div>
          </section>

          <section className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow">04 · Form fields</p>
              <h2 className="serif mt-3 text-4xl">Soft edges, clear focus</h2>
              <div className="card-soft mt-6 space-y-4 p-7">
                <input className="input-field" placeholder="Email address" aria-label="Example email" />
                <input className="input-field" placeholder="Password" type="password" aria-label="Example password" />
                <textarea className="input-field" placeholder="Your message" aria-label="Example message" />
                <button className="btn-primary">Submit form</button>
              </div>
            </div>
            <div>
              <p className="eyebrow">05 · Product card</p>
              <h2 className="serif mt-3 text-4xl">Shop-ready by default</h2>
              <div className="mx-auto mt-6 max-w-sm"><ProductCard product={products[0]} /></div>
            </div>
          </section>

          <section>
            <p className="eyebrow">06 · Spacing &amp; radii</p>
            <h2 className="serif mt-3 text-4xl">Breathing room everywhere</h2>
            <div className="card-soft mt-6 grid gap-6 p-7 sm:grid-cols-3">
              {[
                { label: "8 / 12 / 16px", text: "Compact spacing for controls and badges." },
                { label: "20 / 24px", text: "Card radius and inner spacing — our default." },
                { label: "48 / 96px", text: "Generous section rhythm on desktop." },
              ].map((item) => <div key={item.label}><p className="serif text-2xl text-gold">{item.label}</p><p className="body-copy mt-2 text-xs">{item.text}</p></div>)}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
