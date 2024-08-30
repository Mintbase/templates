import { type NextRequest, NextResponse } from "next/server";

const COW_API = "https://api.cow.fi"
type Network = "mainnet" | "xdai" | "arbitrum_one";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const requestBody = await req.json();
  console.log("POST Request for quote:", requestBody)

  const network: Network = requestBody.network;

  if (!["mainnet", "xdai", "arbitrum_one"].includes(network)) {
    return NextResponse.json({ error: `Invalid network '${network}'. Must be one of 'mainnet', 'xdai' OR 'arbitrum_one'` }, { status: 400 });
  }

  const response = await fetch(`${COW_API}/${network}/api/v1/quote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });
  
  const data = await response.json();

  return NextResponse.json(data);
}