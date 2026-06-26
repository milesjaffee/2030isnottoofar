import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import crypto from "crypto";
import { encrypt } from "@/lib/crypto";
import * as fs from 'node:fs';
import { CreateEmailResponse } from "resend";


function email_html(token: string) {
  let html = fs.readFileSync('emails/verify/email.html', 'utf8');
  // Replace a placeholder
  html = html.replace('{{ACTION_URL}}', `https://2030.milesj.org/api/verify?token=${token}`);
  
  return html;
}

function sendVerificationEmail(email: string, token: string): Promise<CreateEmailResponse> {
  console.log("Email sent to", email);
  return resend.emails.send( {
    from: '2030s@2030.milesj.org',
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

  const country = req.headers.get("x-vercel-ip-country")

  const { error } = await supabase.from("messages").insert({
    email,
    content_encrypted: encrypted.content,
    content_iv: encrypted.iv,
    content_tag: encrypted.tag,
    created_at: new Date(),
    verification_token: token,
    country: country,
  });

  if (error) {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  const emailsent = await sendVerificationEmail(email, token);
  if (!emailsent?.data) {
    return NextResponse.json({ error: "Email sending failed", message: emailsent.error }, { status: 502 });
  }

  return NextResponse.json({
    success: true,
    emailSent: true,
    emailId: emailsent.data.id,
  });
  return NextResponse.json({ success: true, emailsent });
}