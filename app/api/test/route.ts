import { NextResponse } from "next/server";

export const GET = (res: NextResponse) => {
  return NextResponse.json({ success: true });
}
