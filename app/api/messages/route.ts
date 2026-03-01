import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import crypto from "crypto";
import { encrypt } from "@/lib/crypto";

function email_html(token: string) {
  return "<p>actual email coming soon - access verification at <a href=`https://2030.milesj.org/api/verify?token="+token+"`>this link</a>!</p>"
  
}

function sendVerificationEmail(email: string, token: string) {
  resend.emails.send( {
    from: 'noreply@2030.milesj.org',
    to: email,
    subject: "Confirm email address for 2030",
    html: email_html(token)
  })
}

export async function POST(req: Request) {
  const { email, message } = await req.json();

  if (!email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const token = crypto.randomBytes(32).toString("hex");

  const encrypted = encrypt(message);

  const { error } = await supabase.from("messages").insert({
    email,
    content_encrypted: encrypted.content,
    content_iv: encrypted.iv,
    content_tag: encrypted.tag,
    created_at: new Date(),
    verification_token: token,
  });

  if (error) {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  sendVerificationEmail(email, token);
  return NextResponse.json({ success: true });
}