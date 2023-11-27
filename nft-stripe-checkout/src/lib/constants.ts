const network = process.env.NEXT_PUBLIC_NETWORK || "mainnet";
const priceUsd = process.env.NEXT_PUBLIC_PRICE_USD || 1000;
const callbackUrl = process.env.NEXT_PUBLIC_CALLBACK_URL || "http://localhost:3000";

const tokenContractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;

const mintbaseWalletUrl =
  process.env.NEXT_PUBLIC_MINTBASE_WALLET_URL || "https://wallet.mintbase.xyz";

export const constants = {
  tokenContractAddress,
  network,
  mintbaseWalletUrl,
  priceUsd,
  callbackUrl
};
