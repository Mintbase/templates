import { MetaTransaction } from "near-safe";
import { NextRequest, NextResponse } from "next/server";
import { parseEther, toHex } from "viem";
import { validateWethInput } from "../validate";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const {amount, wethAddress} = validateWethInput(req.nextUrl.searchParams);
    const tx: MetaTransaction = {
      to: wethAddress,
      value: toHex(parseEther(amount.toString())),
      // methodId for weth.deposit
      data: "0xd0e30db0",
    }
    return NextResponse.json(tx, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : `Unknown error occurred ${String(error)}` ;
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
