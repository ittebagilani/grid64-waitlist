import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
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
