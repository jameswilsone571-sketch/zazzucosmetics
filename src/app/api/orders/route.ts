import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { orders } from "@/db/schema";
import type { OrderItem } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Contact details are required." }, { status: 400 });
    }
    const items: OrderItem[] = Array.isArray(body.items) ? body.items.slice(0, 40) : [];
    if (!items.length) return NextResponse.json({ ok: false, error: "Your bag is empty." }, { status: 400 });

    const toCents = (value: unknown) => Math.round((typeof value === "number" && Number.isFinite(value) ? value : 0) * 100);
    const orderNumber = `ZZ-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;

    const [order] = await db.insert(orders).values({
      orderNumber,
      email,
      name,
      items,
      subtotalCents: toCents(body.subtotal),
      shippingCents: toCents(body.shipping),
      discountCents: toCents(body.discount),
      totalCents: toCents(body.total),
      address: typeof body.address === "string" ? body.address : "",
    }).returning();

    return NextResponse.json({ ok: true, orderNumber: order.orderNumber });
  } catch (error) {
    console.error("order error", error);
    return NextResponse.json({ ok: false, error: "Unable to place your order" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const email = new URL(request.url).searchParams.get("email")?.trim().toLowerCase() ?? "";
    if (!email) return NextResponse.json({ orders: [] });
    const rows = await db.select().from(orders).where(eq(orders.email, email)).orderBy(desc(orders.createdAt)).limit(20);
    return NextResponse.json({ orders: rows });
  } catch (error) {
    console.error("orders fetch error", error);
    return NextResponse.json({ orders: [] }, { status: 500 });
  }
}
