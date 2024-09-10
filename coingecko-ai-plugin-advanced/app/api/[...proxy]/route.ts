import { type NextRequest, NextResponse } from "next/server";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";
const COINGECKO_PROXY_PATH = "/api/v3";

const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY || "";

if (!COINGECKO_API_KEY) {
  throw new Error("COINGECKO_API_KEY is required");
}

// This is a proxy route that forwards requests to the CoinGecko API
export async function GET(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const fetchPath = pathname.replace(COINGECKO_PROXY_PATH, "");
  const fetchUrl = `${COINGECKO_API_URL}${fetchPath}${search}`;

  const response = await fetch(fetchUrl, {
    headers: {
      "x-cg-demo-api-key": COINGECKO_API_KEY,
    },
  });

  const data = await response.json();

  return NextResponse.json(data);
}
