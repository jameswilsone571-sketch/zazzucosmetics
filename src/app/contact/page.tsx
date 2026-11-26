import Link from "next/link";
import { ComingHeader } from "@/components/ComingHeader";
import { ComingFooter } from "@/components/ComingFooter";
import { ContactForm } from "@/components/ContactForm";
import { ArrowRight, Instagram, Sparkle } from "@/components/Icons";
import { brand } from "@/lib/brand";

export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    <>
      <ComingHeader />
      <main className="bg-offwhite">
        <section className="bg-rose-pale/60 py-14 text-center sm:py-20">
          <p className="eyebrow">Say hello</p>
          <h1 className="display-type serif mt-4">We&apos;d love to hear from you.</h1>
          <p className="body-copy mx-auto mt-4 max-w-xl text-sm">Questions about the launch, shades or stockists? Send us a note and we&apos;ll get back to you.</p>
        </section>

        <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16 lg:px-12">
          <div className="card-soft p-6 sm:p-9">
            <p className="eyebrow">The form</p>
            <h2 className="serif mt-2 text-3xl">Send a message</h2>
            <div className="mt-7"><ContactForm /></div>
          </div>
          <aside className="space-y-5">
            <div className="card-warm p-7">
              <Sparkle className="h-6 w-6 text-gold" />
              <h3 className="serif mt-4 text-2xl">Email us</h3>
              <a href={`mailto:${brand.email}`} className="mt-2 inline-block text-sm text-[#6E5C54] underline underline-offset-4">{brand.email}</a>
              <p className="mt-3 text-xs leading-relaxed text-[#7A6459]">We reply within 1–2 business days (Australian time).</p>
            </div>
            <div className="card-warm p-7">
              <Instagram className="h-6 w-6 text-gold" />
              <h3 className="serif mt-4 text-2xl">Instagram DM</h3>
              <p className="mt-2 text-sm text-[#6E5C54]">Slide into our DMs for the quickest reply.</p>
              <a href="https://www.instagram.com/zazzucosmetics/" target="_blank" rel="noreferrer" className="btn-outline mt-5">{brand.handle} <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="card-warm p-7">
              <h3 className="serif text-2xl">Studio</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6E5C54]">Sydney, New South Wales<br />Australia</p>
              <p className="mt-3 text-[11px] text-[#9A8A80]">Placeholder studio address — replace before launch.</p>
            </div>
          </aside>
        </section>
      </main>
      <ComingFooter />
    </>
  );
}
