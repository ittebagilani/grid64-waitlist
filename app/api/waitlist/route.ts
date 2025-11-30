import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// basic email validation
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const emailTrimmed = email?.trim();

    if (!emailTrimmed || !isValidEmail(emailTrimmed)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Check if email already exists
    const existing = await query(
      `SELECT id FROM waitlist_emails WHERE email = $1`,
      [emailTrimmed]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // Insert new email
    await query(
      `INSERT INTO waitlist_emails (email, created_at) VALUES ($1, NOW())`,
      [emailTrimmed]
    );

    return NextResponse.json({ message: "Success" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
