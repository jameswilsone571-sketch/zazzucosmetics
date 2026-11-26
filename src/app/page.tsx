import Link from "next/link";
import { ComingHeader } from "@/components/ComingHeader";
import { ComingFooter } from "@/components/ComingFooter";
import { Countdown } from "@/components/Countdown";
import { SignupForm } from "@/components/SignupForm";
import { LaunchDate } from "@/components/LaunchDate";
import { FAQ } from "@/components/FAQ";
import { VipPopup } from "@/components/VipPopup";
import { BrandMark } from "@/components/BrandMark";
import { ArrowRight, Check, Instagram, Leaf, PaletteIcon, Shield, Sparkle, Truck } from "@/components/Icons";
import { brand, categoryTiles, products, ugcImages } from "@/lib/brand";

export const dynamic = "force-dynamic";

const faqItems = [
  { question: "When do you launch?", answer: `Our very first collection lands on ${"the launch date shown above"}. VIP list members get access a full 24 hours before everyone else.` },
  { question: "Where do you ship?", answer: "We ship Australia-wide from our Sydney studio, with free standard shipping on orders over $75. International shipping is on the roadmap for our next release." },
  { question: "Are your products cruelty-free?", answer: "Yes. ZAZZU Cosmetics is proudly cruelty-free. We do not test on animals and only work with suppliers who share that commitment." },
  { question: "How do I get early access?", answer: "Join the list with your email address. VIP subscribers receive a private access link 24 hours before the public launch, plus a 15% launch discount." },
  { question: "Will there be launch discounts?", answer: "Yes — everyone on the VIP list receives 15% off their first order during launch week, and one lucky subscriber will win the full collection." },
];

export default function ComingSoonPage() {
  return (
    <>
      <ComingHeader />
      <main>
        {/* HERO ---------------------------------------------------------- */}
        <section className="relative flex min-h-[720px] items-center justify-center overflow-hidden sm:min-h-[760px]">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero-campaign.jpg" alt="Model with luminous skin and soft berry lips" className="img-cover scale-105" />
            <div className="absolute inset-0 bg-gradient-to-b from-cocoa/35 via-cocoa/10 to-cocoa/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#3B2A26]/35 via-transparent to-[#3B2A26]/30" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 py-24 text-center text-offwhite sm:px-8">
            <div className="animate-in mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#F5E3D2]">
              <span className="h-px w-8 bg-[#E5C58F]" /> Launching <LaunchDate className="text-[#F3D6A2]" /> <span className="h-px w-8 bg-[#E5C58F]" />
            </div>
            <h1 className="hero-type animate-in font-serif font-normal" style={{ animationDelay: "80ms" }}>
              Something beautiful<br /><em className="font-normal text-[#F3D6A2]">is on its way.</em>
            </h1>
            <p className="animate-in mt-7 max-w-lg text-sm leading-relaxed text-[#F7EBE1] sm:text-base" style={{ animationDelay: "160ms" }}>
              Clean, long-lasting makeup made for every skin tone. The wait is nearly over — and you&apos;re invited to see it first.
            </p>

            <div className="animate-in mt-10 w-full max-w-3xl" style={{ animationDelay: "240ms" }}>
              <Countdown />
            </div>

            <div className="animate-in mt-10 w-full" style={{ animationDelay: "320ms" }}>
              <p className="mb-3 font-serif text-xl italic text-[#F3D6A2]">Be first in line.</p>
              <SignupForm source="hero" variant="hero" showPhone buttonLabel="Get early access" />
            </div>

            <div className="mt-12 flex flex-col items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-[#EBD9CC]">
              <span>Scroll to explore</span><span className="h-10 w-px bg-gradient-to-b from-[#E5C58F] to-transparent" />
            </div>
          </div>
        </section>

        {/* SNEAK PEEK ---------------------------------------------------- */}
        <section id="sneak-peek" className="bg-offwhite py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="mb-12 flex flex-col items-center text-center">
              <p className="eyebrow">First look · 01</p>
              <h2 className="section-title serif mt-4">A first look at the collection</h2>
              <div className="gold-rule mt-5" />
              <p className="body-copy mt-5 max-w-xl text-sm">A preview of the formulas we&apos;ve been perfecting. Some secrets are still under wraps — join the list to be first to see the full reveal.</p>
            </div>

            <div className="hide-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
              {products.slice(0, 4).map((product, index) => (
                <article key={product.id} className="card-soft group min-w-[78vw] snap-center overflow-hidden sm:min-w-0">
                  <div className="relative aspect-[4/5] overflow-hidden bg-rose-pale">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.image} alt={product.name} className={`img-cover transition duration-700 group-hover:scale-105 ${index > 1 ? "blur-[2px]" : ""}`} />
                    <span className="absolute left-3 top-3 rounded-full bg-offwhite/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-cocoa backdrop-blur">
                      {index > 1 ? "Coming soon" : "First look"}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="eyebrow text-[9px]">{product.category} · {product.finish}</p>
                    <h3 className="serif mt-2 text-xl">{product.name}</h3>
                    <div className="mt-3 flex items-center gap-1.5">
                      {product.shades.slice(0, 5).map((shade) => <span key={shade.name} title={shade.name} className="h-4 w-4 rounded-full border border-white shadow-sm" style={{ backgroundColor: shade.hex }} />)}
                      <span className="ml-1 text-[10px] text-[#8A7466]">{product.shades.length} shades</span>
                    </div>
                    <Link href="/#join-the-list" className="btn-outline mt-5 w-full py-3 text-[10px]">Notify me when available</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* THE COLLECTION ------------------------------------------------ */}
        <section className="bg-rose-pale/60 py-20 sm:py-24">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="mb-11 flex flex-col items-center text-center">
              <p className="eyebrow">The collection · 02</p>
              <h2 className="section-title serif mt-4">Good things, coming together</h2>
              <p className="body-copy mt-4 max-w-xl text-sm">Lips, eyes, face and cheeks — one considered collection designed to work beautifully together.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {categoryTiles.map((category, index) => (
                <div key={category.name} className="group relative aspect-[3/4] overflow-hidden rounded-2xl sm:rounded-[20px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={category.image} alt={category.name} className="img-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cocoa/80 via-cocoa/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-offwhite sm:p-6">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#EFD6BE]">{String(index + 1).padStart(2, "0")} · {category.count}</p>
                    <h3 className="serif mt-1 text-2xl sm:text-3xl">{category.name}</h3>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-[#EFD6BE]">Coming <LaunchDate format="month" fallback={category.coming.replace("Coming ", "")} /></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR STORY ----------------------------------------------------- */}
        <section id="our-story" className="bg-offwhite py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
            <div className="relative">
              <div className="overflow-hidden rounded-[24px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/founder.jpg" alt="ZAZZU founder in the studio" className="h-[420px] w-full object-cover sm:h-[560px]" />
              </div>
              <div className="absolute -bottom-5 -right-2 hidden w-52 rounded-2xl border border-gold/30 bg-white p-5 shadow-xl sm:block">
                <p className="serif text-3xl text-gold">100%</p>
                <p className="mt-1 text-xs leading-relaxed text-[#6E5C54]">independently owned &amp; made with intention</p>
              </div>
            </div>
            <div>
              <p className="eyebrow">Our story · 03</p>
              <h2 className="section-title serif mt-4">Born from a simple idea: beauty should feel like yours.</h2>
              <div className="gold-rule mt-6" />
              <p className="body-copy mt-6 text-sm">
                ZAZZU started with a suitcase of sample formulas, a kitchen table and one stubborn belief — that makeup should enhance the skin you&apos;re in, not ask you to become someone else. We wanted luxurious formulas, honest shade ranges and packaging you&apos;d be proud to leave out on the bench.
              </p>
              <p className="body-copy mt-4 text-sm">
                Every shade was tested across real skin tones, every formula refined until it felt as good as it looked. This is beauty made slowly, thoughtfully and entirely on our own terms.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-xs text-[#6E5C54]">
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> Inclusive by design</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> Quality over quantity</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> Australian owned</span>
              </div>
              <p className="serif mt-9 text-3xl italic text-cocoa">{brand.founder}</p>
              <p className="eyebrow mt-2">Founder &amp; creative director</p>
            </div>
          </div>
        </section>

        {/* VALUES -------------------------------------------------------- */}
        <section className="bg-sand/50 py-16 sm:py-20">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Shield, title: "Cruelty-Free", text: "Never tested on animals. Ever." },
                { icon: Truck, title: "Long-Lasting", text: "Formulas made to keep up with real life." },
                { icon: PaletteIcon, title: "Shades for Every Skin Tone", text: "Thoughtfully developed across diverse skin." },
                { icon: Leaf, title: "Skin-Loving Ingredients", text: "Comfortable wear with ingredients that care." },
              ].map((value) => (
                <div key={value.title} className="rounded-2xl bg-white/70 p-6 text-center shadow-[0_8px_30px_rgba(59,42,38,0.04)]">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-pale text-gold"><value.icon className="h-6 w-6" /></div>
                  <h3 className="serif mt-4 text-xl">{value.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#7A6459]">{value.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-[10px] uppercase tracking-[0.16em] text-[#9A8A80]">Brand values shown as editable placeholders</p>
          </div>
        </section>

        {/* SWATCH TEASER ------------------------------------------------- */}
        <section className="relative overflow-hidden bg-cocoa py-16 sm:py-20">
          <div className="absolute inset-0 opacity-25"><img src="/images/swatch-strip.jpg" alt="" className="img-cover" /></div>
          <div className="relative mx-auto max-w-3xl px-5 text-center text-offwhite">
            <Sparkle className="mx-auto h-7 w-7 text-[#E5C58F]" />
            <p className="eyebrow mt-5 text-[#E5C58F]">The shade story</p>
            <h2 className="serif mt-4 text-4xl leading-tight sm:text-5xl">Shades for everyone.</h2>
            <p className="serif mt-2 text-2xl italic text-[#E5C58F]">Revealed <LaunchDate className="not-italic" />.</p>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-[#E3D0C4]">From the softest nude to the deepest berry, we&apos;ve created a range that celebrates every complexion. The full shade lineup drops with the collection.</p>
            <Link href="/#join-the-list" className="btn-gold mt-8">See the shades first</Link>
          </div>
        </section>

        {/* LAUNCH PERKS -------------------------------------------------- */}
        <section id="launch-perks" className="bg-offwhite py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="mb-12 text-center">
              <p className="eyebrow">Launch perks · 04</p>
              <h2 className="section-title serif mt-4">Good things come to those who sign up.</h2>
              <p className="body-copy mx-auto mt-4 max-w-xl text-sm">Being on the list isn&apos;t just about being first. It&apos;s about being looked after.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { number: "01", title: "Early access", text: "Shop the collection 24 hours before the public launch, with first dibs on the most-loved shades." },
                { number: "02", title: "15% launch discount", text: "A private code lands in your inbox on launch morning. Use it across your first order." },
                { number: "03", title: "Win the full collection", text: "One VIP subscriber will win every product in the launch range. Good luck, beautiful." },
              ].map((perk) => (
                <article key={perk.number} className="card-warm relative overflow-hidden p-8">
                  <span className="serif absolute -right-2 -top-4 text-8xl text-gold/15">{perk.number}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gold"><Sparkle className="h-5 w-5" /></div>
                  <h3 className="serif mt-5 text-2xl">{perk.title}</h3>
                  <p className="body-copy mt-3 text-sm">{perk.text}</p>
                </article>
              ))}
            </div>
            <div className="mx-auto mt-12 max-w-2xl rounded-[24px] border border-gold/25 bg-white p-7 text-center shadow-[0_20px_50px_rgba(59,42,38,0.06)] sm:p-10">
              <p className="eyebrow">The VIP list</p>
              <h3 className="serif mt-3 text-3xl">Ready for your first look?</h3>
              <p className="body-copy mt-2 text-sm">Join now and we&apos;ll send your launch access details and welcome gift.</p>
              <div className="mt-6"><SignupForm source="launch_perks" variant="section" buttonLabel="Get early access" /></div>
            </div>
          </div>
        </section>

        {/* INSTAGRAM ----------------------------------------------------- */}
        <section className="bg-rose-pale/50 py-20 sm:py-24">
          <div className="mx-auto max-w-[1440px] px-5 text-center sm:px-8 lg:px-12">
            <p className="eyebrow">Behind the scenes</p>
            <h2 className="section-title serif mt-4">Follow the journey</h2>
            <p className="body-copy mt-3 text-sm">Packaging days, shade tests and little moments from the studio. Come along with us {brand.handle}.</p>
            <div className="mx-auto mt-9 grid max-w-4xl grid-cols-3 gap-2 sm:gap-3">
              {ugcImages.map((image, index) => (
                <div key={image} className="group relative aspect-square overflow-hidden rounded-lg sm:rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt={`ZAZZU behind the scenes ${index + 1}`} className="img-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-cocoa/0 transition group-hover:bg-cocoa/20" />
                </div>
              ))}
            </div>
            <a href="https://www.instagram.com/zazzucosmetics/" target="_blank" rel="noreferrer" className="btn-outline mt-8"><Instagram className="h-4 w-4" /> Follow {brand.handle}</a>
          </div>
        </section>

        {/* FAQ ----------------------------------------------------------- */}
        <section id="faq" className="bg-offwhite py-20 sm:py-24">
          <div className="mx-auto grid max-w-5xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div>
              <p className="eyebrow">Good to know</p>
              <h2 className="section-title serif mt-4">Questions, answered.</h2>
              <p className="body-copy mt-4 text-sm">Still curious? We&apos;d love to hear from you.</p>
              <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold underline underline-offset-4">Contact us <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <FAQ items={faqItems} />
          </div>
        </section>

        {/* FINAL CTA ----------------------------------------------------- */}
        <section className="bg-gradient-to-r from-[#F6E7E1] via-[#FBF2EA] to-[#F6E7E1] py-16 text-center">
          <div className="mx-auto max-w-2xl px-5">
            <BrandMark href="/" compact />
            <h2 className="serif mt-6 text-4xl">See you on <LaunchDate />.</h2>
            <p className="body-copy mt-3 text-sm">Until then, keep an eye on your inbox and our Instagram.</p>
            <Link href="/#join-the-list" className="btn-primary mt-7">Join the list <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
      <ComingFooter />
      <VipPopup />
    </>
  );
}
