import { connect, transactions, keyStores, KeyPair } from "near-api-js";
import { MAINNET_CONFIG, TESTNET_CONFIG } from "./constants";

const NETWORK = process.env.NETWORK || "testnet";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ACCOUNT_ID = process.env.ACCOUNT_ID || "";

const getKeyPair = async (): Promise<keyStores.InMemoryKeyStore> => {
  const keyStore = new keyStores.InMemoryKeyStore();
  const keyPair = KeyPair.fromString(PRIVATE_KEY);
  await keyStore.setKey(NETWORK, ACCOUNT_ID, keyPair);
  return keyStore;
};

const getConfig = async () => {
  const keyStore = await getKeyPair();

  const networkConfig = NETWORK === "testnet" ? TESTNET_CONFIG : MAINNET_CONFIG;

  const config = {
    keyStore,
    ...networkConfig,
  };

  return config;
};

export const getNearClient = async () => {
  const config = await getConfig();
  return await connect(config);
};
