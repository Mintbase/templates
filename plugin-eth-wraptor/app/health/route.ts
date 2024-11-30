import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
   console.log("health check")
  return NextResponse.json({ ok: true, message: "Ok lets go!" });
}
