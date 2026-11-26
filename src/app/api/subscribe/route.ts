import { NextResponse } from "next/server";
import { db } from "@/db";
import { subscribers } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Enter a valid email address" }, { status: 400 });
    }
    const phone = typeof body.phone === "string" && body.phone.trim() ? body.phone.trim() : null;
    const source = typeof body.source === "string" ? body.source.slice(0, 60) : "general";

    const inserted = await db.insert(subscribers)
      .values({ email, phone, source })
      .onConflictDoNothing()
      .returning({ id: subscribers.id });

    return NextResponse.json({ ok: true, alreadySubscribed: inserted.length === 0 });
  } catch (error) {
    console.error("subscribe error", error);
    return NextResponse.json({ ok: false, error: "Unable to save your details" }, { status: 500 });
  }
}
