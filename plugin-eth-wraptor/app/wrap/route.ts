import { NextRequest, NextResponse } from "next/server";
import { parseEther, toHex } from "viem";
import { signRequestFor, validateWethInput } from "../utils";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { chainId, amount, wethAddress } = validateWethInput(
      req.nextUrl.searchParams,
    );
    const signRequest = signRequestFor({
      chainId,
      to: wethAddress,
      value: toHex(parseEther(amount.toString())),
      // methodId for weth.deposit
      data: "0xd0e30db0",
    });
    return NextResponse.json(signRequest, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : `Unknown error occurred ${String(error)}`;
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
