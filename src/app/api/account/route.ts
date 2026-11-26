import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { customers } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Enter your name and a valid email." }, { status: 400 });
    }
    const [customer] = await db.insert(customers).values({ email, name })
      .onConflictDoUpdate({ target: customers.email, set: { name } })
      .returning();
    return NextResponse.json({ ok: true, customer });
  } catch (error) {
    console.error("account error", error);
    return NextResponse.json({ ok: false, error: "Unable to save your account" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const email = new URL(request.url).searchParams.get("email")?.trim().toLowerCase() ?? "";
    if (!email) return NextResponse.json({ customer: null });
    const [customer] = await db.select().from(customers).where(eq(customers.email, email)).limit(1);
    return NextResponse.json({ customer: customer ?? null });
  } catch {
    return NextResponse.json({ customer: null }, { status: 500 });
  }
}
