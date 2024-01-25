import { Account, KeyPair, InMemorySigner } from "near-api-js";
import { InMemoryKeyStore } from "near-api-js/lib/key_stores";
import { JsonRpcProvider } from "near-api-js/lib/providers";

export const connect = async (
  accountId: string,
  privateKey: string,
  network = "mainnet"
): Promise<Account> => {
  const keyStore = new InMemoryKeyStore();
  await keyStore.setKey(network, accountId, KeyPair.fromString(privateKey));

  const provider = new JsonRpcProvider({
    url: `https://rpc.${network}.near.org`,
  });

  const signer = new InMemorySigner(keyStore);

  const account = new Account(
    {
      networkId: network,
      provider,
      signer,
      jsvmAccountId: "",
    },
    accountId
  );

  return account;
};
