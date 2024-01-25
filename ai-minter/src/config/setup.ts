export const proxyAddress = process?.env?.NEXT_PUBLIC_PROXY_CONTRACT_ADDRESS || "0.minsta.proxy.mintbase.testnet";
const contractAddress = process?.env?.NEXT_PUBLIC_MINT_CONTRACT_ADDRESS || "aiminter.mintspace2.testnet";
const network = process?.env?.NEXT_PUBLIC_NETWORK || "testnet";
const callbackUrl = network === "testnet" ? `https://testnet.mintbase.xyz/contract/${contractAddress}/nfts/all/0` : `https://mintbase.xyz/contract/${contractAddress}/nfts/all/0`;

export const MintbaseWalletSetup = {
  contractAddress,
  network,
  callbackUrl
};