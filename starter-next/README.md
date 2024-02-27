
# Next Wallet Starter

<img  src="https://i.imgur.com/bHpvyk6.png"  alt="cover_image"  width="0"  />

Effortless Onboarding: Jumpstart Your Web3 Journey with Ultra-Easy NEAR Wallet Integration. An empty canvas with nothing but a NEAR wallet connection. Use this project to bootstrap your dapp ideas and make progress as fast as possible!

## Getting Started

Welcome to the NEAR ecosystem—an exciting space where development meets innovation. If you're new, we've got the essentials to kickstart your journey. For those familiar with the tools, feel free to skip ahead to the project walkthrough


- [Make Your First Contract Call and Deploy Contract](https://docs.mintbase.xyz/dev/getting-started/make-your-first-contract-call-deploycontract)
- [Upload Reference Material to Arweave and Mint](https://docs.mintbase.xyz/dev/getting-started/upload-reference-material-to-arweave-and-mint)
- [Get Blockchain Data (Owned Tokens)](https://docs.mintbase.xyz/dev/getting-started/get-blockchain-data-ownedtokens)

- **Indexer:** Get blockchain data using GraphQL [Mintbase Graph](https://docs.mintbase.xyz/dev/mintbase-graph)
- **@mintbase-js/sdk:** Interact with smart contracts in the simplest way [Getting Started](https://docs.mintbase.xyz/dev/getting-started)
- **@mintbase-js/wallet:** Add wallet connection to your app [Mintbase SDK Reference - Wallet](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/wallet)
- **@mintbase-js/data:** Make it as easy as possible to get blockchain data [Mintbase SDK Reference - Data](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/data)
- **@mintbase-js/storage:** Utilities for permanent storage like Arweave [Mintbase SDK Reference - Storage](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/storage)

- **near-api-js** NEAR JavaScript API is a complete library to interact with the NEAR blockchain [Near API](https://github.com/near/)near-api-js
- **Official Near Docs** Explore the official SDKs provided by near protocol [Official Docs](https://docs.near.org/)


[![Demo](https://img.shields.io/badge/Demo-Visit%20Demo-brightgreen)](https://starter.mintbase.xyz)

[![Deploy](https://img.shields.io/badge/Deploy-on%20Vercel-blue)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMintbase%2Ftemplates%2Ftree%2Fmain%2Fstarter)



**Tooling:**



[![Use Case](https://img.shields.io/badge/Use%20Case-Utilities-blue)](#)

[![Tools](https://img.shields.io/badge/Tools-@mintbase.js/react%2CArweave%2CMintbase%20Wallet-blue)](#)

[![Framework](https://img.shields.io/badge/Framework-Next.js%2014-blue)](#)



**Author:**



[![Author](https://img.shields.io/twitter/follow/rubenmarcus_dev?style=social&logo=twitter)](https://twitter.com/rubenmarcus_dev) [![Organization](https://img.shields.io/badge/Mintbase-blue)](https://www.mintbase.xyz)



## Project Walkthrough

This simple starter project uses [@mintbase-js/react](https://github.com/Mintbase/mintbase-js/tree/beta/packages/react) to easily add wallet connection functionality to your web3 application. It provides a solid foundation for building decentralized applications and allows you to quickly get started with your dapp ideas.

## Step-by-Step Guide: Mintbase Wallet Integration in React App

### 1. Define Mintbase Wallet Setup in `layout.tsx`:

In the `layout.tsx` file, the Mintbase Wallet setup is defined using the `MintbaseWalletContextProvider` from the `@mintbase-js/react` library.

```ts
import { MintbaseWalletContextProvider } from "@mintbase-js/react";
import "@near-wallet-selector/modal-ui/styles.css";

// Mintbase Wallet setup configuration
const MintbaseWalletSetup = {
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  network: process.env.NEXT_PUBLIC_NETWORK,
  callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL,
};
```

### 2. Add Mintbase Wallet Provider:

Ensure to include the `MintbaseWalletContextProvider` with the provided setup in the root layout of your application.

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MintbaseWalletContextProvider {...MintbaseWalletSetup}>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex flex-1 flex-col min-h-screen text-gray-500 gradient w-full  h-full flex justify-center items-center bold text-white">
            {children}
          </div>
        </body>
      </html>
    </MintbaseWalletContextProvider>
  );
}

``````

### 3. Utilize the Mintbase Wallet Features in Code:

In your code, you can use the `useMbWallet` hook to access Mintbase wallet features such as connecting or signing out.

```ts
import { useMbWallet } from "@mintbase-js/react";

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
    return (
      <button className="bg-white text-black rounded p-3 hover:bg-[#e1e1e1]" onClick={handleSignIn}>
        Connect To NEAR
      </button>
    );
  }

  return (
    <div>
      <p>You are connected as {activeAccountId}</p>
      <div className="flex justify-center items-center mt-4">
        <button className="bg-white text-black rounded p-3 hover:bg-[#e1e1e1]" onClick={handleSignout}>
          Disconnect
        </button>
      </div>
    </div>
  );
};
```

*NOTE: As a standard on Mintbase as we use the latest versions of Next.js we recommend using pnpm, but the package manager is up to your personal choice.*



### Setup



First run install

```bash

npm install

yarn

# or

pnpm install

```


### Setup


**ENV Variables**


you can change the values on the `starter-next/.env.example` to the ones that suits you.


`NOTE: the env variables need to have the NEXT_PUBLIC_ on the variable name due to be available for the browser to process`

on the file `.env.example` , you can change / or add the env variables according to the properties of the [MintbaseWalletContextProvider](https://github.com/Mintbase/mintbase-js/tree/beta/packages/react#properties):

  ```
	NEXT_PUBLIC_NETWORK="testnet"

	NEXT_PUBLIC_CONTRACT_ADDRESS="hellovirtualworld.mintspace2.testnet"

	NEXT_PUBLIC_CALLBACK_URL="http://localhost:3000"
  ```

on the file `starter-next/src/app/layout.tsx` , theres this `const`:


```typescript
const MintbaseWalletSetup = {
		contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
		network: process.env.NEXT_PUBLIC_NETWORK,
		callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL,
	};
```

- this object accepts all the properties listed on the package [@mintbase-js/react](https://github.com/Mintbase/mintbase-js/tree/beta/packages/react)


- you can check all the properties here on this link: [Mintbase Wallet Context Provider Properties](https://github.com/Mintbase/mintbase-js/tree/beta/packages/react#properties)



### Running


for development env just run:

```

 pnpm run dev

```



## Get in touch

- Support: [Join the Telegram](https://tg.me/mintdev)

- Twitter: [@mintbase](https://twitter.com/mintbase)



<img  src="https://i.imgur.com/nP4DQai.png"  alt="detail_image"  width="0"  />