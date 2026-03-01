import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { redirect } from 'next/navigation';

//redrection - 3 possibilities: no token in request error, token not found (presumable already redeemed) error, and Success! 

export async function GET(req: NextRequest) {
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

  await supabase
    .from("messages")
    .update({
      verified_at: new Date().toISOString(),
      verification_token: null,
    })
    .eq("id", data.id);
    //could be returning id number as "you are the Xth person to..."

  return NextResponse.json({ success: true });
}