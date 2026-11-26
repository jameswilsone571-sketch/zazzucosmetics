import Link from "next/link";
import { notFound } from "next/navigation";
import { StoreHeader } from "@/components/StoreHeader";
import { StoreFooter } from "@/components/StoreFooter";
import { ProductDetail } from "@/components/ProductDetail";
import { ProductCard } from "@/components/ProductCard";
import { FAQ } from "@/components/FAQ";
import { ArrowRight, Check, Star } from "@/components/Icons";
import { products } from "@/lib/brand";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  const related = products.filter((item) => item.id !== product.id && (item.category === product.category || item.badge)).slice(0, 4);

  return (
    <>
      <StoreHeader />
      <main className="pb-24 lg:pb-0">
        <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          <nav className="mb-7 flex flex-wrap items-center gap-2 text-[11px] text-[#8A7466]">
            <Link href="/store" className="hover:text-cocoa">Home</Link><span>/</span>
            <Link href={`/store/shop?category=${product.category}`} className="hover:text-cocoa">Shop {product.category}</Link><span>/</span>
            <span className="text-cocoa">{product.name}</span>
          </nav>
          <ProductDetail product={product} />

          <section className="mt-20">
            <div className="mb-8 flex items-end justify-between"><div><p className="eyebrow">You may also like</p><h2 className="serif mt-3 text-3xl">Complete the look</h2></div><Link href="/store/shop" className="btn-outline hidden sm:inline-flex">Shop all <ArrowRight className="h-4 w-4" /></Link></div>
            <div className="hide-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
              {related.map((item) => <div key={item.id} className="min-w-[76vw] snap-center sm:min-w-0"><ProductCard product={item} /></div>)}
            </div>
          </section>

          <section className="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Reviews</p>
              <h2 className="serif mt-3 text-4xl">{product.rating} out of 5</h2>
              <p className="mt-2 text-xs text-[#7A6459]">Based on {product.reviewCount} placeholder reviews</p>
              <div className="mt-6 space-y-2">
                {[5, 4, 3, 2, 1].map((stars, index) => (
                  <div key={stars} className="flex items-center gap-3 text-xs"><span className="w-5">{stars}★</span><div className="h-2 flex-1 overflow-hidden rounded-full bg-nude/60"><div className="h-full rounded-full bg-gold" style={{ width: `${[78, 15, 4, 2, 1][index]}%` }} /></div><span className="w-8 text-[#8A7466]">{[78, 15, 4, 2, 1][index]}%</span></div>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              {[
                { name: "Taylor K.", title: "Exactly what I hoped for", body: "Beautiful pigment and genuinely comfortable to wear. I've been reaching for it every single day since it arrived.", image: "/images/swatch-strip.jpg" },
                { name: "Brooke L.", title: "The shade range is impressive", body: "Found my perfect match on the first try. The finish looks expensive and the packaging feels lovely.", image: "/images/hero-campaign.jpg" },
              ].map((review) => (
                <article key={review.name} className="card-soft flex gap-5 p-5">
                  <img src={review.image} alt="Customer photo" className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                  <div><div className="flex text-gold">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-3.5 w-3.5" filled />)}</div><h3 className="serif mt-2 text-lg">{review.title}</h3><p className="body-copy mt-1 text-xs">{review.body}</p><p className="mt-2 flex items-center gap-1 text-[11px] text-[#8A7466]"><Check className="h-3 w-3 text-gold" /> {review.name} · Verified buyer</p></div>
                </article>
              ))}
              <FAQ items={[
                { question: "Is this product vegan?", answer: "This is placeholder copy for the mockup. Final vegan and ingredient statements should be confirmed with the supplier before launch." },
                { question: "How long does shipping take?", answer: "Orders ship within 1–2 business days and usually arrive in 2–5 business days across Australia." },
              ]} />
            </div>
          </section>
        </div>
      </main>
      <StoreFooter />
    </>
  );
}
