import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

export async function POST(req: Request) {
  const { email, message } = await req.json();

  if (!email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const token = crypto.randomBytes(32).toString("hex");

  const { error } = await supabase.from("messages").insert({
    email,
    content: message,
    verification_token: token,
  });

  if (error) {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  // sendVerificationEmail(email, token) ... later
  return NextResponse.json({ success: true });
}