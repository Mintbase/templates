import { Network } from "@mintbase-js/sdk";

export const MintbaseWalletSetup = {
  contractAddress: "test122212.mintspace2.testnet",
  network: "testnet",
};

export const network = MintbaseWalletSetup.network as Network;

const isTestnet = MintbaseWalletSetup.network === "testnet";

export const nearblocksApi = !isTestnet
  ? "https://api.nearblocks.io"
  : "https://api-testnet.nearblocks.io";

export const mbUrl = !isTestnet
  ? "https://www.mintbase.xyz"
  : "https://testnet.mintbase.xyz";
export const nearblocksUrl = !isTestnet
  ? "https://nearblocks.io"
  : "https://testnet.nearblocks.io";
