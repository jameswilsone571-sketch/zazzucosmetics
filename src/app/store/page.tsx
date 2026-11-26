import Link from "next/link";
import { StoreHeader } from "@/components/StoreHeader";
import { StoreFooter } from "@/components/StoreFooter";
import { ProductCard } from "@/components/ProductCard";
import { SignupForm } from "@/components/SignupForm";
import { ArrowRight, Check, Heart, Leaf, PaletteIcon, Return, Shield, Sparkle, Star, Truck } from "@/components/Icons";
import { brand, categoryTiles, money, products, ugcImages } from "@/lib/brand";

export const dynamic = "force-dynamic";

export default function StoreHomePage() {
  const bestsellers = products.filter((item) => item.badge === "Bestseller");
  const spotlight = products[0];

  return (
    <>
      <StoreHeader />
      <main>
        {/* HERO ---------------------------------------------------------- */}
        <section className="relative overflow-hidden bg-rose-pale">
          <div className="mx-auto grid max-w-[1440px] items-center gap-0 lg:grid-cols-2">
            <div className="relative z-10 px-5 py-14 sm:px-8 lg:px-14 lg:py-24">
              <p className="eyebrow">The launch collection · Now live</p>
              <h1 className="display-type serif mt-5">Colour that feels like <em className="text-gold">you.</em></h1>
              <p className="body-copy mt-5 max-w-md text-sm">Clean, long-lasting makeup made for every skin tone. Discover the formulas we&apos;ve been perfecting — and find your new everyday favourite.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/store/shop" className="btn-primary">Shop the collection <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/store/about" className="btn-outline">Our story</Link>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.12em] text-[#7A6459]">
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-gold" /> Free AU shipping over $75</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-gold" /> 24 inclusive shades</span>
              </div>
            </div>
            <div className="relative h-[420px] sm:h-[560px] lg:h-[720px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/hero-campaign.jpg" alt="ZAZZU campaign model" className="img-cover" />
              <div className="absolute bottom-6 left-6 rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur sm:bottom-10 sm:left-10">
                <p className="eyebrow">Signature product</p>
                <p className="serif mt-1 text-xl">The Velvet Matte Lipstick</p>
                <p className="mt-1 text-xs text-[#7A6459]">12 shades · {money(34)}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="border-y border-cocoa/8 bg-white/70">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-4 px-5 py-5 sm:grid-cols-4 sm:px-8 lg:px-12">
            {[
              { icon: Shield, label: "Secure Payment" }, { icon: Truck, label: "Fast AU Shipping" },
              { icon: Return, label: "Easy Returns" }, { icon: Leaf, label: "Cruelty-Free" },
            ].map((item) => <div key={item.label} className="flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#6E5C54] sm:text-xs"><item.icon className="h-5 w-5 text-gold" /> {item.label}</div>)}
          </div>
        </div>

        {/* BESTSELLERS --------------------------------------------------- */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="mb-9 flex items-end justify-between gap-4">
              <div><p className="eyebrow">Most loved</p><h2 className="section-title serif mt-3">Bestsellers</h2><p className="body-copy mt-3 text-sm">The shades and formulas everyone keeps coming back for.</p></div>
              <Link href="/store/shop?sort=best" className="btn-outline hidden sm:inline-flex">Shop all <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="hide-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
              {bestsellers.map((product) => <div key={product.id} className="min-w-[76vw] snap-center sm:min-w-0"><ProductCard product={product} /></div>)}
            </div>
            <Link href="/store/shop?sort=best" className="btn-outline mt-7 sm:hidden">Shop all bestsellers</Link>
          </div>
        </section>

        {/* CATEGORY TILES ------------------------------------------------ */}
        <section className="bg-rose-pale/50 py-20">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="mb-10 text-center"><p className="eyebrow">Explore</p><h2 className="section-title serif mt-3">Shop by category</h2></div>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {categoryTiles.map((category) => (
                <Link key={category.name} href={`/store/shop?category=${category.name}`} className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={category.image} alt={category.name} className="img-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cocoa/75 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-offwhite sm:p-6"><h3 className="serif text-2xl sm:text-3xl">{category.name}</h3><p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#EFD6BE]">Shop now →</p></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SPOTLIGHT ----------------------------------------------------- */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl"><img src={spotlight.image} alt={spotlight.name} className="img-cover" /></div>
              <div className="mt-10 aspect-[4/5] overflow-hidden rounded-2xl"><img src="/images/swatch-strip.jpg" alt="Lipstick swatches on skin" className="img-cover" /></div>
            </div>
            <div>
              <p className="eyebrow">Product spotlight</p>
              <h2 className="display-type serif mt-4">{spotlight.name}</h2>
              <div className="mt-4 flex items-center gap-2 text-xs text-[#7A6459]"><span className="flex text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" filled />)}</span> {spotlight.rating} · {spotlight.reviewCount} reviews · {money(spotlight.price)}</div>
              <p className="body-copy mt-5 text-sm">{spotlight.description}</p>
              <ul className="mt-6 space-y-3">
                {spotlight.benefits.map((benefit) => <li key={benefit} className="flex items-start gap-3 text-sm text-[#6E5C54]"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-pale text-gold"><Check className="h-3 w-3" /></span>{benefit}</li>)}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href={`/store/product/${spotlight.slug}`} className="btn-primary">Shop the shade <ArrowRight className="h-4 w-4" /></Link>
                <span className="text-[11px] text-[#8A7466]">12 shades · Vegan formula</span>
              </div>
            </div>
          </div>
        </section>

        {/* SHADE QUIZ ---------------------------------------------------- */}
        <section className="relative overflow-hidden bg-cocoa py-16 text-offwhite sm:py-20">
          <div className="absolute inset-0 opacity-20"><img src="/images/swatch-strip.jpg" alt="" className="img-cover" /></div>
          <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 text-center">
            <PaletteIcon className="h-8 w-8 text-[#E5C58F]" />
            <p className="eyebrow mt-4 text-[#E5C58F]">Not sure where to start?</p>
            <h2 className="serif mt-4 text-4xl sm:text-5xl">Find your shade in 60 seconds.</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#E3D0C4]">Answer three quick questions and we&apos;ll point you towards your perfect match across lips and complexion.</p>
            <Link href="/store/shop?category=Face" className="btn-gold mt-7">Take the shade quiz <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>

        {/* REVIEWS ------------------------------------------------------- */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="mb-10 text-center"><p className="eyebrow">Real words, real skin</p><h2 className="section-title serif mt-3">Loved by you</h2><p className="body-copy mt-3 text-sm">Placeholder reviews shown for design purposes.</p></div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { name: "Alex M.", title: "My new everyday lipstick", body: "The Velvet Matte in Rosewood is the perfect my-lips-but-better shade. It feels weightless and doesn't dry me out.", image: "/images/lipstick-product.jpg", product: "The Velvet Matte Lipstick" },
                { name: "Jade P.", title: "Finally, a foundation that matches", body: "Medium 07 is spot on for my olive skin. It looks like skin, not makeup, and lasts a full work day.", image: "/images/complexion-product.jpg", product: "Second Skin Foundation" },
                { name: "Mia R.", title: "The glow is unreal", body: "Soft Focus Blush in Rose Petal gives the loveliest natural flush. I've had three compliments already today.", image: "/images/blush-product.jpg", product: "Soft Focus Powder Blush" },
              ].map((review) => (
                <article key={review.name} className="card-soft p-6">
                  <div className="flex text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" filled />)}</div>
                  <h3 className="serif mt-4 text-xl">{review.title}</h3>
                  <p className="body-copy mt-2 text-sm">{review.body}</p>
                  <div className="mt-5 flex items-center gap-3 border-t border-cocoa/8 pt-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={review.image} alt="Customer photo" className="h-11 w-11 rounded-lg object-cover" />
                    <div><p className="text-xs font-semibold">{review.name} <span className="font-normal text-gold">✓ Verified</span></p><p className="text-[10px] text-[#8A7466]">{review.product}</p></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* UGC ----------------------------------------------------------- */}
        <section className="bg-rose-pale/50 py-20">
          <div className="mx-auto max-w-[1440px] px-5 text-center sm:px-8 lg:px-12">
            <p className="eyebrow">As seen on Instagram</p>
            <h2 className="section-title serif mt-3">#{brand.name}Glam</h2>
            <p className="body-copy mx-auto mt-3 max-w-lg text-sm">Tag us in your ZAZZU looks for a chance to be featured here.</p>
            <div className="mx-auto mt-9 grid max-w-5xl grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
              {ugcImages.concat(ugcImages.slice(0, 6)).slice(0, 6).map((image, index) => (
                <div key={`${image}-${index}`} className="group relative aspect-square overflow-hidden rounded-lg sm:rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt={`Community look ${index + 1}`} className="img-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-cocoa/0 transition group-hover:bg-cocoa/20" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER ---------------------------------------------------- */}
        <section className="py-20">
          <div className="mx-auto max-w-2xl px-5 text-center">
            <Sparkle className="mx-auto h-7 w-7 text-gold" />
            <p className="eyebrow mt-4">Newsletter</p>
            <h2 className="serif mt-3 text-4xl">A little beauty in your inbox.</h2>
            <p className="body-copy mt-3 text-sm">Early access to new shades, restocks and the occasional surprise.</p>
            <div className="mt-7"><SignupForm source="store_home" variant="section" buttonLabel="Subscribe" /></div>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#9A8A80]"><Heart className="h-3 w-3" /> No spam, ever. Unsubscribe anytime.</p>
          </div>
        </section>
      </main>
      <StoreFooter />
    </>
  );
}
