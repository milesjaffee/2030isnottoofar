import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {

  const { data, error } = await supabase
    .from("messages")
    .select("id")
    .order('id', { ascending: false })
      .limit(1)
      .single(); 

  if (!data || error) {
    return NextResponse.json({count: 18262});
  }

  return NextResponse.json({count: data});
}