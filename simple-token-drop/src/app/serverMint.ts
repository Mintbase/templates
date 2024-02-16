'use server'

import { Account, KeyPair, InMemorySigner } from "near-api-js";
import { InMemoryKeyStore } from "near-api-js/lib/key_stores";
import { FinalExecutionOutcome, JsonRpcProvider } from "near-api-js/lib/providers";
import BN from "bn.js";
import { MintArgsResponse, NearContractCall, execute, mint } from "@mintbase-js/sdk"
import { redirect } from 'next/navigation'
import { NETWORK, SERVER_WALLET_ID, SERVER_WALLET_PK, WALLET_AUTO_IMPORT_URL, NFT_CONTRACT, MEDIA_URL, REFERENCE_URL } from "./constants";


export const serverMint = async (): Promise<void> => {
    
    console.info("Server Action: Server Mint Called")
    //Create a new keypair, instantiate server wallet and create account with generated keypair
    const accountId = [...Array(7)].map(() => Math.random().toString(36)[2]).join('') + `.${SERVER_WALLET_ID}`;
    const newKeyPair = KeyPair.fromRandom('ed25519')
    const serverWallet: Account = await connect();
    
    await serverWallet.createAccount(accountId, newKeyPair.getPublicKey().toString(), new BN("0"))

    console.info("Server Action: Wallet created with account id: ", accountId)
    const mintArgs = await serverMintArgs(accountId)
    //Execute mint with server wallet
    await execute({ account: serverWallet }, mintArgs) as FinalExecutionOutcome

    console.info("Server Action: Executed mint with", mintArgs)

    //@ts-ignore
    redirect(`${WALLET_AUTO_IMPORT_URL}${accountId}/${newKeyPair.secretKey}`)

}


export const connect = async (
): Promise<Account> => {
    if (!SERVER_WALLET_ID || !SERVER_WALLET_PK) {
        throw ("SERVER_WALLET_ID or SERVER_WALLET_PK not defined in envs")

    }
    const keyStore = new InMemoryKeyStore();
    await keyStore.setKey(NETWORK, SERVER_WALLET_ID, KeyPair.fromString(SERVER_WALLET_PK));

    const provider = new JsonRpcProvider({
        url: `https://rpc.${NETWORK}.near.org`,
    });

    const signer = new InMemorySigner(keyStore);

    const account = new Account(
        {
            networkId: NETWORK,
            provider,
            signer,
            jsvmAccountId: "",
        },
        SERVER_WALLET_ID
    );

    return account;
};

export const serverMintArgs = (accountId: string): NearContractCall<MintArgsResponse> => {
    return mint({
        contractAddress: NFT_CONTRACT,
        ownerId: accountId,
        metadata: {
            media: MEDIA_URL,
            reference: REFERENCE_URL
        }
    })
}
