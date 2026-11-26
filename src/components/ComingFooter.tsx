import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { SignupForm } from "./SignupForm";
import { Instagram, TikTok, Facebook, Pinterest, ArrowRight } from "./Icons";
import { brand } from "@/lib/brand";
import { LaunchDate } from "./LaunchDate";

export function ComingFooter() {
  return (
    <footer id="join-the-list" className="bg-cocoa pt-16 text-[#F7EDE4] md:pt-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 border-b border-white/12 pb-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <BrandMark href="/" light />
            <p className="serif mt-6 max-w-sm text-2xl leading-snug text-[#F1DFD2]">{brand.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#D8C3B6]">
              Clean, long-lasting makeup made for every skin tone. Launching <LaunchDate className="text-[#E5C58F]" />.
            </p>
            <div className="mt-7 flex gap-2">
              {[Instagram, TikTok, Facebook, Pinterest].map((Icon, index) => (
                <a key={index} href="https://www.instagram.com/zazzucosmetics/" target="_blank" rel="noreferrer" aria-label="Social link" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition hover:border-[#C9A66B] hover:text-[#E5C58F]"><Icon className="h-4 w-4" /></a>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow text-[#E5C58F]">The VIP list</p>
            <h3 className="serif mt-3 text-3xl">Be first to know. Beautiful things are coming.</h3>
            <p className="mt-3 text-sm text-[#D8C3B6]">Join for early access, a launch surprise and behind-the-scenes moments.</p>
            <div className="mt-6"><SignupForm source="footer" variant="footer" buttonLabel="Notify me" /></div>
            <p className="mt-3 text-[11px] text-[#CDB6A7]">By subscribing you agree to our Privacy Policy. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className="grid gap-8 py-10 sm:grid-cols-3">
          <div>
            <p className="eyebrow text-[#E5C58F]">Explore</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#E4D2C6]">
              <Link href="/#our-story" className="hover:text-white">Our story</Link>
              <Link href="/#sneak-peek" className="hover:text-white">Sneak peek</Link>
              <Link href="/#launch-perks" className="hover:text-white">Launch perks</Link>
              <Link href="/store" className="inline-flex items-center gap-1 hover:text-white">See the store phase <ArrowRight className="h-3 w-3" /></Link>
            </div>
          </div>
          <div>
            <p className="eyebrow text-[#E5C58F]">Help</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#E4D2C6]">
              <Link href="/contact" className="hover:text-white">Contact us</Link>
              <Link href="/#faq" className="hover:text-white">FAQ</Link>
              <Link href="/store/shop" className="hover:text-white">Shipping info</Link>
              <a href={`mailto:${brand.email}`} className="hover:text-white">{brand.email}</a>
            </div>
          </div>
          <div>
            <p className="eyebrow text-[#E5C58F]">Legal</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#E4D2C6]">
              <Link href="/style-guide" className="hover:text-white">Style guide</Link>
              <span>Privacy Policy</span>
              <span>Terms &amp; Conditions</span>
              <span>Accessibility</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-white/12 py-7 text-[11px] text-[#CDB6A7] sm:flex-row">
          <span>© {new Date().getFullYear()} {brand.fullName}. All rights reserved.</span>
          <span>Proudly independently owned in Australia · Prices in AUD</span>
        </div>
      </div>
    </footer>
  );
}
