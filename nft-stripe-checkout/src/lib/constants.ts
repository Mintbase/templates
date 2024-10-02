const network = process.env.NEXT_PUBLIC_NETWORK || "testnet";
const priceUsd = process.env.NEXT_PUBLIC_PRICE_USD || 1000;
const callbackUrl =
  process.env.NEXT_PUBLIC_CALLBACK_URL || "http://localhost:3000";

const tokenContractAddress =
  process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ||
  "topsecretaiminting.mintspace2.testnet";

const bitteWalletUrl =
  process.env.NEXT_PUBLIC_BITTE_WALLET_URL || "https://testnet.wallet.bitte.ai";

export const constants = {
  tokenContractAddress,
  network,
  bitteWalletUrl,
  priceUsd,
  callbackUrl,
};
