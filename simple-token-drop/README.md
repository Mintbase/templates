# Simple Token Drop

**DEMO:** https://token-drop-template.mintbase.xyz/


This example illustrates the creation of a straightforward minting landing page with pre-defined metadata. Users can seamlessly connect their wallets and initiate the minting process. Additionally, an option is available to generate an account that will be automatically imported into the Mintbase wallet, complete with the corresponding NFT.

## Run the project
    pnpm i

    pnpm run dev

## Project Walkthrough

The project is separated into two portions, the first one creates a wallet, server mints into it and then auto imports it. The alternate one handles a wallet conneciton and uses that to mint.

## Autoimport mint

#### Step 1: instantiate a server side wallet and use it to create a wallet for the user

A server wallet gets intantiated using the connect method from a private key and account id present in the environment variables. It then uses this account to create a wallet using an arbitrary keypair previously generated and a random string as a name.

```typescript
export const serverMint = async (): Promise<void> => {

    const accountId = [...Array(7)].map(() => Math.random().toString(36)[2]).join('') + `.${SERVER_WALLET_ID}`;

    const newKeyPair: any = KeyPair.fromRandom('ed25519')
    const serverWallet: Account = await connect();
    await serverWallet.createAccount(accountId, newKeyPair.getPublicKey().toString(), new BN("0"))


    ...

}
```

#### Step 2: execute the mint action with the instantiated server wallet

Create mint args using mintbase-js/sdk with a link to the reference object containing the media.

```typescript
export const mintArgs = (accountId: string): NearContractCall<MintArgsResponse> => {
    return mint({
        contractAddress: NFT_CONTRACT,
        ownerId: accountId,
        metadata: {
            media: MEDIA_URL,
            reference: REFERENCE_URL
        }
    })
}
```

We can then execute the mint by passing in the serverWallet as the sender

```typescript
export const serverMint = async (): Promise<void> => {

    ....
    //Execute mint with server wallet
    await execute({ account: serverWallet }, mintArgs(accountId)) as FinalExecutionOutcome


}
```

#### Step 3: autoimport created account into mintbase wallet

Now that the account is created and the token has been minted into it we can take its keypair and autoimport it into mintbase wallet using the following URL
```
https://{NETWORK}.wallet.mintbase.xyz/import/private-key#{ACCOUNT_ID}/{PRIVATE_KEY}`
```

```typescript
export const serverMint = async (): Promise<void> => {

    //Create a new keypair, instantiate server wallet and create account with generated keypair
    const accountId = [...Array(7)].map(() => Math.random().toString(36)[2]).join('') + `.${SERVER_WALLET_ID}`;
    const newKeyPair: any = KeyPair.fromRandom('ed25519')
    const serverWallet: Account = await connect();
    await serverWallet.createAccount(accountId, newKeyPair.getPublicKey().toString(), new BN("0"))

    //Execute mint with server wallet
    await execute({ account: serverWallet }, mintArgs(accountId)) as FinalExecutionOutcome


    redirect(`${WALLET_AUTO_IMPORT_URL}${accountId}/${newKeyPair.secretKey}`)

}

```


## Client side wallet connection minting


### Step 1: Add wallet connection to your app

[Follow this guide to add wallet connection to your app](https://docs.mintbase.xyz/dev/getting-started/add-wallet-connection-to-your-react-app)

### Step 2: Handle Wallet Connection

This component adds buttons for connecting and disconnecting the wallet based on data returned from the wallet hook

```typescript
export const NearWalletConnector = () => {
  const { isConnected, selector, connect, activeAccountId } = useMbWallet();

  const handleSignout = async () => {
    const wallet = await selector.wallet();
    return wallet.signOut();
  };

  const handleSignIn = async () => {
    return connect();
  };

  if (!isConnected) {
    return <button className="bg-black text-white rounded p-3 hover:bg-[#e1e1e1] w-44" onClick={handleSignIn}>Connect </button>;
  }

  return (

    <button className="bg-black text-white rounded p-3 hover:bg-[#e1e1e1] w-44" onClick={handleSignout}> Disconnect </button>

  );
};
```

### Step 3: Execute mint

Get the current wallet state and use that to execute the mint with the previously described args from the mintbase-js/sdk.

The wallet connection is passed into the execute function as well as a callback url which indicates where the wallet will redirect to once the transaction is successful.

```typescript

const { activeAccountId, selector, isConnected } = useMbWallet();


const handleClientMint = async () => {
        setTxLoading(true);
        if (!selector.wallet || !activeAccountId) {
            console.error("Failed to mint trigger mint")
            return
        }

        const wallet = await selector.wallet();
        await execute({ wallet: wallet, callbackUrl: CALLBACK_URL }, await mintArgs(activeAccountId))

    }

```


## Get in touch

- Support: [Join the Telegram](https://tg.me/mintdev)
- Twitter: [@mintbase](https://twitter.com/mintbase)





