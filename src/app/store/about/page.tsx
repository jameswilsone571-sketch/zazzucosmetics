import Link from "next/link";
import { StoreHeader } from "@/components/StoreHeader";
import { StoreFooter } from "@/components/StoreFooter";
import { ArrowRight, Check, Heart, Leaf, PaletteIcon, Shield, Sparkle } from "@/components/Icons";
import { brand } from "@/lib/brand";

export const dynamic = "force-dynamic";

export default function AboutPage() {
  return (
    <>
      <StoreHeader />
      <main>
        <section className="bg-rose-pale/50">
          <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-20">
            <div>
              <p className="eyebrow">Our story</p>
              <h1 className="display-type serif mt-4">Beauty that feels like <em className="text-gold">coming home to yourself.</em></h1>
              <p className="body-copy mt-6 max-w-lg text-sm">ZAZZU was born at a kitchen table with a handful of samples and a belief that makeup should celebrate the skin you&apos;re in — not cover it up.</p>
              <p className="body-copy mt-4 max-w-lg text-sm">We spent months perfecting formulas, testing shades across real skin tones and refining every detail of the packaging. The result is a collection that feels luxurious, wears beautifully and belongs to everyone.</p>
              <div className="mt-8 flex flex-wrap gap-3"><Link href="/store/shop" className="btn-primary">Shop the collection <ArrowRight className="h-4 w-4" /></Link><Link href="/store/contact" className="btn-outline">Get in touch</Link></div>
            </div>
            <div className="relative">
              <img src="/images/founder.jpg" alt={`${brand.founder}, founder of ZAZZU`} className="h-[480px] w-full rounded-[24px] object-cover sm:h-[620px]" />
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white p-5 shadow-xl sm:block"><p className="serif text-3xl text-gold">01</p><p className="mt-1 text-xs text-[#7A6459]">Independent. Australian. Made with intention.</p></div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <p className="eyebrow">Our mission</p>
            <h2 className="section-title serif mt-4">Inclusive colour, considered quality, everyday confidence.</h2>
            <div className="gold-rule-center mt-6" />
            <p className="body-copy mx-auto mt-6 max-w-2xl text-sm">We believe great makeup should be accessible, beautifully made and genuinely wearable. Every shade is developed with diverse skin tones in mind, and every formula is chosen for how it feels as much as how it looks.</p>
          </div>
        </section>

        <section className="bg-sand/50 py-20">
          <div className="mx-auto grid max-w-[1440px] gap-6 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
            {[
              { icon: PaletteIcon, title: "Shades for everyone", text: "Ranges developed across diverse skin tones, never as an afterthought." },
              { icon: Leaf, title: "Skin-loving formulas", text: "Comfortable ingredients chosen for real, everyday wear." },
              { icon: Shield, title: "Cruelty-free always", text: "No animal testing, no compromises — just good beauty." },
              { icon: Heart, title: "Independently owned", text: "One founder, one vision, and a whole lot of heart." },
            ].map((value) => (
              <div key={value.title} className="rounded-2xl bg-white p-7 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-pale text-gold"><value.icon className="h-6 w-6" /></div><h3 className="serif mt-4 text-xl">{value.title}</h3><p className="body-copy mt-2 text-xs">{value.text}</p></div>
            ))}
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="mb-9 text-center"><p className="eyebrow">Behind the scenes</p><h2 className="section-title serif mt-3">The little moments</h2></div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
              {["/images/collection-flatlay.jpg", "/images/swatch-strip.jpg", "/images/lipstick-product.jpg", "/images/eye-palette.jpg"].map((image, index) => (
                <div key={image} className={`overflow-hidden rounded-2xl ${index % 2 === 1 ? "mt-8" : ""}`}><img src={image} alt="ZAZZU behind the scenes" className="aspect-[4/5] w-full object-cover" /></div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cocoa py-16 text-center text-offwhite">
          <div className="mx-auto max-w-2xl px-5"><Sparkle className="mx-auto h-7 w-7 text-[#E5C58F]" /><h2 className="serif mt-5 text-4xl">Your shade is waiting.</h2><p className="mx-auto mt-3 max-w-md text-sm text-[#E3D0C4]">Explore the collection and find the pieces that feel unmistakably you.</p><Link href="/store/shop" className="btn-gold mt-7">Shop ZAZZU <ArrowRight className="h-4 w-4" /></Link></div>
        </section>
      </main>
      <StoreFooter />
    </>
  );
}
