import Bundlr from "@bundlr-network/client";

const bundlr = new Bundlr(
  "https://devnet.bundlr.network",
  "near",
  "<private-key>",
  { providerUrl: "https://rpc.testnet.near.org" }
);
