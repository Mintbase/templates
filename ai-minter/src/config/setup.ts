export const proxyAddress = process?.env?.PROXY_CONTRACT_ADDRESS || "0.minsta.proxy.mintbase.testnet";
const contractAddress = process?.env?.MINT_CONTRACT_ADDRESS || "aiminter.mintspace2.testnet";
const network = process?.env?.NETWORK || "testnet";
const callbackUrl = network === "testnet" ? `https://testnet.mintbase.xyz/contract/${contractAddress}/nfts/all/0` : `https://mintbase.xyz/contract/${contractAddress}/nfts/all/0`;

export const MintbaseWalletSetup = {
  contractAddress,
  network,
  callbackUrl
};