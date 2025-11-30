import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

function isValidEmail(email: string) {
  // simple regex for basic validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await query(
      `INSERT INTO waitlist_emails (email, created_at) VALUES ($1, NOW()) ON CONFLICT (email) DO NOTHING`,
      [email]
    );

    return NextResponse.json({ message: "Success" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
