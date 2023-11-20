const appName: string = process.env.NEXT_PUBLIC_APP_TITLE || "MINTBASE";
const callbackUrl: string = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const network = process.env.NEXT_PUBLIC_NETWORK || "mainnet";
const minterAccountId = process.env.MINTER_ACCOUNT_ID || "";
const minterPrivateKey = process.env.MINTER_PRIVATE_KEY || "";

const tokenContractAddress =
    process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || "open-secret.mintspace2.testnet";

const mintbaseBaseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://mintbase.xyz";

const mintbaseWalletUrl =
    process.env.NEXT_PUBLIC_MINTBASE_WALLET_URL ||
    "https://wallet.mintbase.xyz";

const twitterText =
    process.env.NEXT_PUBLIC_TWITTER ||
    "Instantly%20mint%20your%20AI%20%%20creations%20%at%20%%Open%20%Secret%20%40Mintbase%20%40NEARProtocol%20%23BOS%20%23NEAR%0aMint%20yours%20here%3A%20https%3A%2F%2Fminsta.mintbase.xyz";

export const constants = {
    appName,
    callbackUrl,
    tokenContractAddress,
    network,
    mintbaseBaseUrl,
    mintbaseWalletUrl,
    twitterText,
    isClosed: process.env.NEXT_PUBLIC_MINTING_CLOSED === "true" || false,
    showRewards: process.env.NEXT_PUBLIC_SHOW_REWARDS === "true" || false,
    minterPrivateKey,
    minterAccountId
};
