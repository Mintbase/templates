import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const coinIds = req.nextUrl.searchParams.get("ids");
  const vsCurrency = req.nextUrl.searchParams.get("vs_currencies");

  if (!coinIds || !vsCurrency) return NextResponse.json({ error: "Missing coin ids or vs currency" }, { status: 400 });

  const url = new URL("https://api.coingecko.com/api/v3/simple/price");
  url.searchParams.set("ids", coinIds);
  url.searchParams.set("vs_currencies", vsCurrency);

  const response = await fetch(url);
  const data = await response.json();

  return NextResponse.json(data);
}
