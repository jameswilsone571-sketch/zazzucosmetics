import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { StoreHeader } from "@/components/StoreHeader";
import { StoreFooter } from "@/components/StoreFooter";
import { Check, ArrowRight, Truck, Sparkle } from "@/components/Icons";
import { money } from "@/lib/brand";

export const dynamic = "force-dynamic";

export default async function OrderConfirmationPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await params;
  const [order] = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);

  return (
    <>
      <StoreHeader />
      <main className="mx-auto max-w-3xl px-5 py-16 text-center sm:py-24">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-pale text-gold"><Check className="h-10 w-10" /></div>
        <p className="eyebrow mt-7">Order confirmed</p>
        <h1 className="display-type serif mt-4">Thank you, {order?.name?.split(" ")[0] ?? "beautiful"}.</h1>
        <p className="body-copy mx-auto mt-4 max-w-lg text-sm">Your ZAZZU order is being prepared with care. A confirmation email is on its way{order ? ` to ${order.email}` : ""}.</p>

        <div className="card-soft mt-10 p-7 text-left">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cocoa/10 pb-5">
            <div><p className="eyebrow">Order number</p><p className="serif mt-1 text-2xl">{orderNumber}</p></div>
            <span className="rounded-full bg-rose-pale px-4 py-2 text-[11px] font-semibold">{order?.status ?? "Processing"}</span>
          </div>
          {order && (
            <>
              <div className="mt-5 space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img src={item.image ?? "/images/lipstick-product.jpg"} alt="" className="h-12 w-12 rounded-lg object-cover" />
                    <div className="flex-1"><p className="text-sm font-medium">{item.name}</p><p className="text-[11px] text-[#8A7466]">Qty {item.quantity}{item.shade ? ` · ${item.shade}` : ""}</p></div>
                    <span className="text-sm font-semibold">{money(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between border-t border-cocoa/10 pt-5 text-base font-semibold"><span>Total paid</span><span>{money(order.totalCents / 100)}</span></div>
              <p className="mt-2 flex items-center gap-2 text-xs text-[#7A6459]"><Truck className="h-4 w-4 text-gold" /> Estimated delivery: 2–5 business days from Sydney</p>
            </>
          )}
        </div>

        <div className="mt-8 rounded-2xl border border-gold/25 bg-rose-pale/50 p-6">
          <Sparkle className="mx-auto h-6 w-6 text-gold" />
          <p className="serif mt-3 text-2xl">You&apos;re part of the story now.</p>
          <p className="body-copy mx-auto mt-2 max-w-md text-xs">Tag your look #{`ZAZZUGlam`} for a chance to be featured in our community gallery.</p>
        </div>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/store/shop" className="btn-primary">Continue shopping <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/store/account" className="btn-outline">View my account</Link>
        </div>
      </main>
      <StoreFooter />
    </>
  );
}
