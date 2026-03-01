import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { redirect } from 'next/navigation';

//redrection - 3 possibilities: no token in request error, token not found (presumable already redeemed) error, and Success! 

export async function GET(req: NextRequest) {
  const token = new URL(req.url).searchParams.get("token");

  const failedDestinationUrl = `/verification/tokenproblem`;

  if (!token) {
    redirect(failedDestinationUrl);
  }

  const { data, error } = await supabase
    .from("messages")
    .select("id, verified_at")
    .eq("verification_token", token)
    .single();

  if (!data || error) {
    redirect(failedDestinationUrl);
  }

  await supabase
    .from("messages")
    .update({
      verified_at: new Date().toISOString(),
      verification_token: null,
    })
    .eq("id", data.id);
    //returning id number as "you are the Xth person to..."

    const successUrl = `/verification?id=${data.id}`;

  redirect(successUrl);
}