export const proxyAddress = process?.env?.NEXT_PUBLIC_PROXY_CONTRACT_ADDRESS || "0.minsta.proxy.mintbase.testnet";
const contractAddress = process?.env?.NEXT_PUBLIC_MINT_CONTRACT_ADDRESS || "aiminter.mintspace2.testnet";
const network = process?.env?.NEXT_PUBLIC_NETWORK || "testnet";

const isTestnet = network === "testnet";
const callbackUrl = !isTestnet
  ? `https://mintbase.xyz/contract/${contractAddress}/nfts/all/0`
  : `https://testnet.mintbase.xyz/contract/${contractAddress}/nfts/all/0`;
export const mbUrl = !isTestnet
  ? "https://www.mintbase.xyz"
  : "https://testnet.mintbase.xyz";
export const nearblocksUrl = !isTestnet
  ? "https://nearblocks.io"
  : "https://testnet.nearblocks.io";


  export const nearblocksApi = !isTestnet
  ? "https://api.nearblocks.io"
  : "https://api-testnet.nearblocks.io";

export const MintbaseWalletSetup = {
  contractAddress,
  network,
  callbackUrl
};