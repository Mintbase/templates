require("dotenv").config();

const appName: string = process.env.NEXT_PUBLIC_APP_TITLE || "MINTBASE";
const network = process.env.NEXT_PUBLIC_NETWORK || "mainnet";
const proxyContractAddress =
  process.env.NEXT_PUBLIC_PROXY_MINTER_CONTRACT_ADDRESS ||
  "0.drop.proxy.mintbase.near";
const legacyProxyAddresses =
  process.env.NEXT_PUBLIC_LEGACY_PROXY_ADDRESSES?.split(",") || [];
const tokenContractAddress =
  process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || "moments.mintbase1.near";

const mintbaseBaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://mintbase.xyz";

const mintbaseWalletUrl =
  process.env.NEXT_PUBLIC_MINTBASE_WALLET_URL || "https://wallet.mintbase.xyz";

const twitterText =
  process.env.NEXT_PUBLIC_TWITTER ||
  "Exploring%20unforgettable%20moments%20at%20%23Mintbase%20%40Mintbase%20%40NEARProtocol%20%23BOS%20%23NEAR%0aMint%20yours%20here%3A%20https%3A%2F%2Fminsta.mintbase.xyz";

export const constants = {
  appName,
  proxyContractAddress,
  legacyProxyAddresses,
  tokenContractAddress,
  network,
  mintbaseBaseUrl,
  mintbaseWalletUrl,
  twitterText,
  isClosed: process.env.NEXT_PUBLIC_MINTING_CLOSED === "true" || false,
  showRewards: process.env.NEXT_PUBLIC_SHOW_REWARDS === "true" || false,
};
