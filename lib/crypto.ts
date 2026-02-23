import { NextResponse } from "next/server";
import { supabase } from "/lib/supabase";

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("messages")
    .select("id, verified_at")
    .eq("verification_token", token)
    .single();

  if (!data || error) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (data.verified_at) {
    return NextResponse.json({ success: true, alreadyVerified: true });
  }

  await supabase
    .from("messages")
    .update({
      verified_at: new Date().toISOString(),
      verification_token: null,
    })
    .eq("id", data.id);

  return NextResponse.json({ success: true });
}