# Simple Token Drop

<img src="https://i.imgur.com/U5x0IdF.png" alt="cover_image" width="0" />
This example illustrates the creation of a straightforward minting landing page with pre-defined metadata.

[![Demo](https://img.shields.io/badge/Demo-Visit%20Demo-brightgreen)](https://token-drop-template.mintbase.xyz/)
[![Deploy](https://img.shields.io/badge/Deploy-on%20Vercel-blue)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMintbase%2Ftemplates%2Ftree%2Fmain%2Fsimple-token-drop)

**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-Minter-blue)](#)
[![Tools](https://img.shields.io/badge/Tools-@mintbase.js/sdk%2CArweave%2CBitte%20Wallet-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-Next.js%2014-blue)](#)

**Author:**

[![Author](https://img.shields.io/twitter/follow/Surge_Code?style=social&logo=twitter)](https://twitter.com/Surge_Code) [![Organization](https://img.shields.io/badge/Bitte-blue)](https://www.bitte.ai)

## Project Walkthrough

Users can connect or create a wallet to initiate the minting process. Additionally, an option is available to generate an account that will be automatically imported into the Bitte wallet, complete with the corresponding NFT.

The project is separated into two portions, the first one creates a wallet, server mints into it and then auto imports it. The alternate one deeplinks to a minting transaction on Bitte wallet.

_NOTE: As a standard on Bitte as we use the latest versions of Next.js we recommend using pnpm, but the package manager is up to your personal choice._

## Pre-Setup - Proxy Contract

- You need to have a NEAR Contract where you add a proxy contract as a minter.
- The proxy contract enables non-minter users to mint images on your contract.
- The Near Contract will be where the NFT images will be minted.
- The proxy contract will be the minter.
- The user wallet address will be the owner of the NFT.

### Deploying a Near Contract on Mintbase:

1. Login on Mintbase and access [Contracts Page](https://www.mintbase.xyz/launchpad/contracts/0)
2. Click on New Contract
3. Choose Store Name (this will be the contract address to add on your minsta instance, this need to be added on the `process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` environment variable) and Store Symbol
4. Proceed to transaction.
5. Succeeded
6. Go to Contract Settings

### Add Proxy Minter Contract

1. Under Contract Settings go to Minters
2. add `0.drop.proxy.mintbase.near` (this is the contract address that need to be added on `process.env.NEXT_PUBLIC_PROXY_MINTER_CONTRACT_ADDRESS`), and click Add Minters.
3. Proceed to transaction.
4. Succeeded

## Run the project

    pnpm i

    pnpm run dev

## Autoimport mint

#### Step 1: instantiate a server side wallet and use it to create a wallet for the user

A server wallet gets intantiated using the connect method from a private key and account id present in the environment variables. It then uses this account to create a wallet using an arbitrary keypair previously generated and a random string as a name.

```typescript
export const serverMint = async (): Promise<void> => {

    const accountId = [...Array(7)].map(() => Math.random().toString(36)[2]).join('') + `.${SERVER_WALLET_ID}`;

    const newKeyPair = KeyPair.fromRandom('ed25519')
    const serverWallet: Account = await connect();
    await serverWallet.createAccount(accountId, newKeyPair.getPublicKey().toString(), new BN("0"))


    ...

}
```

#### Step 2: execute the mint action with the instantiated server wallet

Create mint args using mintbase-js/sdk with a link to the reference object containing the media.

```typescript
export const mintArgs = (
  accountId: string
): NearContractCall<MintArgsResponse> => {
  return mint({
    contractAddress: NFT_CONTRACT,
    ownerId: accountId,
    metadata: {
      media: MEDIA_URL,
      reference: REFERENCE_URL,
    },
  });
};
```

We can then execute the mint by passing in the serverWallet as the sender

```typescript
export const serverMint = async (): Promise<void> => {

    ....
    //Execute mint with server wallet
    await execute({ account: serverWallet }, mintArgs(accountId)) as FinalExecutionOutcome


}
```

#### Step 3: autoimport created account into Bitte Wallet

Now that the account is created and the token has been minted into it we can take its keypair and autoimport it into bitte wallet using the following URL

```
https://{NETWORK}.wallet.bitte.ai/import/private-key#{ACCOUNT_ID}/{PRIVATE_KEY}`
```

```typescript
export const serverMint = async (): Promise<void> => {
  //Create a new keypair, instantiate server wallet and create account with generated keypair
  const accountId =
    [...Array(7)].map(() => Math.random().toString(36)[2]).join("") +
    `.${SERVER_WALLET_ID}`;
  const newKeyPair = KeyPair.fromRandom("ed25519");
  const serverWallet: Account = await connect();
  await serverWallet.createAccount(
    accountId,
    newKeyPair.getPublicKey().toString(),
    new BN("0")
  );

  //Execute mint with server wallet
  (await execute(
    { account: serverWallet },
    mintArgs(accountId)
  )) as FinalExecutionOutcome;

  redirect(`${WALLET_AUTO_IMPORT_URL}${accountId}/${newKeyPair.secretKey}`);
};
```

## Client side minting through bitte wallet deeplink

This function triggers the client-side minting process using a Deeplink. It retrieves mint parameters
using the mintArgs function, constructs transaction arguments, and redirects to the Bitte wallet
for transaction signing.

```typescript
const handleClientMint = async () => {
  // Set loading state to true during transaction processing
  setTxLoading(true);

  // Retrieve mint parameters using mintArgs function
  const mintParams = await mintArgs("");

  // Create an action object for the mint, specifying type and parameters
  const action = { type: "FunctionCall", params: mintParams };

  // Create transaction arguments in JSON format with receiverId and actions array
  const txArgs = JSON.stringify({
    receiverId: "1.minsta.mintbus.near",
    actions: [action],
  });

  // Redirect to the Bitte wallet for transaction signing
  router.push(
    `https://testnet.wallet.bitte.ai/sign-transaction?transactions_data=[${txArgs}]`
  );
};
```

## Get in touch

- Support: [Join the Telegram](https://tg.me/mintdev)
- Twitter: [@BitteProtocol](https://twitter.com/BitteProtocol)

<img src="https://i.imgur.com/qTQhBet.png" alt="detail_image" width="0" />
