import { MetaTransaction } from "near-safe";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseAbi, parseEther, toHex } from "viem";
import { validateWethInput } from "../validate";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const {amount, wethAddress} = validateWethInput(req.nextUrl.searchParams);
    const tx: MetaTransaction = {
      to: wethAddress,
      value: "0x",
      data: encodeFunctionData({
        abi: parseAbi(["function withdraw(uint wad)"]),
        functionName: "withdraw",
        args: [parseEther(amount.toString())],
      }),
    }
    return NextResponse.json(tx, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : `Unknown error occurred ${String(error)}` ;
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
