import { StoreHeader } from "@/components/StoreHeader";
import { StoreFooter } from "@/components/StoreFooter";
import { ContactForm } from "@/components/ContactForm";
import { FAQ } from "@/components/FAQ";
import { Instagram, Sparkle } from "@/components/Icons";
import { brand } from "@/lib/brand";

export const dynamic = "force-dynamic";

const groups = [
  { title: "Orders", items: [
    { question: "How do I track my order?", answer: "Sign in to your account with the email used at checkout. Your order history shows the current status of every order." },
    { question: "Can I change or cancel my order?", answer: "Orders are packed quickly, so changes are limited. Contact us as soon as possible and we'll do our best to help." },
  ]},
  { title: "Shipping", items: [
    { question: "Where do you ship?", answer: "We ship Australia-wide. Standard shipping is free on orders over $75, otherwise it's $9.50. Express shipping is $14.95." },
    { question: "How long does delivery take?", answer: "Orders dispatch within 1–2 business days. Standard delivery usually takes 2–5 business days, express 1–2 business days." },
  ]},
  { title: "Returns", items: [
    { question: "What is your returns policy?", answer: "Unopened, unused products can be returned within 30 days of delivery for a refund. Contact us to start a return." },
    { question: "What if my product arrives damaged?", answer: "Send us a photo and your order number and we'll arrange a replacement or refund promptly." },
  ]},
  { title: "Products", items: [
    { question: "Are your products cruelty-free?", answer: "Yes. ZAZZU does not test on animals and only works with cruelty-free suppliers." },
    { question: "How do I find my shade?", answer: "Use the shade dots on each product page, read the descriptions, or contact us for a personal recommendation." },
  ]},
];

export default function StoreContactPage() {
  return (
    <>
      <StoreHeader />
      <main>
        <section className="bg-rose-pale/50 py-14 text-center sm:py-20">
          <p className="eyebrow">Help centre</p>
          <h1 className="display-type serif mt-4">We&apos;re here to help.</h1>
          <p className="body-copy mx-auto mt-4 max-w-xl text-sm">Find an answer below, or send us a message and we&apos;ll get back to you within 1–2 business days.</p>
        </section>

        <section className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="serif mt-3 text-3xl">Send us a note</h2>
            <div className="mt-7"><ContactForm source="store_contact" /></div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="card-warm p-5"><Sparkle className="h-5 w-5 text-gold" /><p className="mt-3 text-xs font-semibold">Email</p><a href={`mailto:${brand.email}`} className="mt-1 block text-xs text-[#6E5C54] underline">{brand.email}</a></div>
              <div className="card-warm p-5"><Instagram className="h-5 w-5 text-gold" /><p className="mt-3 text-xs font-semibold">Instagram DM</p><a href="https://www.instagram.com/zazzucosmetics/" target="_blank" rel="noreferrer" className="mt-1 block text-xs text-[#6E5C54] underline">{brand.handle}</a></div>
            </div>
          </div>
          <div>
            <p className="eyebrow">Frequently asked questions</p>
            <h2 className="serif mt-3 text-3xl">The answers you need</h2>
            <div className="mt-6 space-y-8">
              {groups.map((group) => <div key={group.title}><h3 className="eyebrow text-gold">{group.title}</h3><FAQ items={group.items} className="mt-2" /></div>)}
            </div>
          </div>
        </section>
      </main>
      <StoreFooter />
    </>
  );
}
