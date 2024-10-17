import { Network } from "near-safe";

interface ValidInput {
  amount: number;
  wethAddress: string;
}

export function validateWethInput(params: URLSearchParams): ValidInput {
  const chainIdStr = params.get("chainId");
  const amountStr = params.get("amount");
  
  // Ensure required fields
  if (!chainIdStr) {
    throw new Error("Missing required parameter: chainId");
  }
  if (!amountStr) {
    throw new Error("Missing required parameter: amount");
  }

  // Validate chainId
  const chainId = parseInt(chainIdStr);
  if (isNaN(chainId)) {
    throw new Error("Invalid chainId, must be a number");
  }

  // Validate amount
  const amount = parseFloat(amountStr);
  if (isNaN(amount) || amount <= 0) {
    throw new Error("Invalid amount, must be a positive float");
  }

  const network = Network.fromChainId(chainId);
  const wethAddress = network.nativeCurrency.wrappedAddress;
  if (!wethAddress) {
    throw new Error(`Couldn't find wrapped address for Network ${network.name} (chainId=${chainId})`);
  }

  return { amount, wethAddress };
}