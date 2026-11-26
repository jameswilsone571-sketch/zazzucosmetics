import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { SignupForm } from "./SignupForm";
import { Facebook, Instagram, Pinterest, TikTok } from "./Icons";
import { brand } from "@/lib/brand";

const columns = [
  { title: "Shop", links: [["Shop All", "/store/shop"], ["Lips", "/store/shop?category=Lips"], ["Eyes", "/store/shop?category=Eyes"], ["Face", "/store/shop?category=Face"], ["Cheeks", "/store/shop?category=Cheeks"], ["Bestsellers", "/store/shop?sort=best"]] },
  { title: "Help", links: [["Shipping", "/store/contact"], ["Returns", "/store/contact"], ["FAQ", "/store/contact"], ["Contact", "/store/contact"], ["Track an order", "/store/account"]] },
  { title: "About", links: [["Our story", "/store/about"], ["Our values", "/store/about"], ["Instagram", "https://instagram.com"], ["Style guide", "/style-guide"], ["Coming soon phase", "/"]] },
];

export function StoreFooter() {
  return (
    <footer className="mt-24 bg-cocoa pt-16 text-[#F7EDE4]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 border-b border-white/12 pb-14 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <BrandMark href="/store" light />
            <p className="serif mt-5 text-2xl text-[#F1DFD2]">Beauty, made for you.</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#D8C3B6]">Considered colour, inclusive ranges and everyday quality — independently made in Australia.</p>
            <div className="mt-6 flex gap-2">
              {[Instagram, TikTok, Facebook, Pinterest].map((Icon, index) => <a key={index} href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Social link" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 hover:border-[#C9A66B] hover:text-[#E5C58F]"><Icon className="h-4 w-4" /></a>)}
            </div>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <p className="eyebrow text-[#E5C58F]">{column.title}</p>
              <div className="mt-5 flex flex-col gap-3 text-sm text-[#E4D2C6]">
                {column.links.map(([label, href]) => (
                  <Link key={label} href={href} className="w-fit hover:text-white">{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-10 py-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow text-[#E5C58F]">Newsletter</p>
            <h3 className="serif mt-3 text-3xl">A little beauty in your inbox.</h3>
            <p className="mt-3 text-sm text-[#D8C3B6]">New shades, restocks and offers. No spam, ever.</p>
          </div>
          <div className="self-center"><SignupForm source="store_newsletter" variant="footer" buttonLabel="Subscribe" /></div>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-white/12 py-7">
          <span className="mr-2 text-[10px] uppercase tracking-[0.16em] text-[#CDB6A7]">We accept</span>
          {["VISA", "Mastercard", "PayPal", "Apple Pay", "Afterpay"].map((name) => <span key={name} className="rounded-md border border-white/20 bg-white/5 px-3 py-1.5 text-[10px] font-semibold tracking-wide">{name}</span>)}
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-white/12 py-7 text-[11px] text-[#CDB6A7] sm:flex-row">
          <span>© {new Date().getFullYear()} {brand.fullName}. All rights reserved.</span>
          <div className="flex gap-5"><Link href="/style-guide" className="hover:text-white">Style guide</Link><span>Privacy Policy</span><span>Terms</span><a href={`mailto:${brand.email}`} className="hover:text-white">Contact</a></div>
        </div>
      </div>
    </footer>
  );
}
