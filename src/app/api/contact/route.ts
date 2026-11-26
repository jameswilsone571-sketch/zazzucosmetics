import { NextResponse } from "next/server";
import { db } from "@/db";
import { contacts } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 5) {
      return NextResponse.json({ ok: false, error: "Please complete all fields." }, { status: 400 });
    }
    await db.insert(contacts).values({ name, email, message: message.slice(0, 4000) });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact error", error);
    return NextResponse.json({ ok: false, error: "Unable to send your message" }, { status: 500 });
  }
}
