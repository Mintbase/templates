import { NextResponse } from "next/server";

// This is a proxy route that forwards requests to the CoinGecko API
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ok: true, message: "Ok lets go!"});
}
