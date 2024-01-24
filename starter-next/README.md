
# Starter Next

<img  src="https://i.imgur.com/bHpvyk6.png"  alt="cover_image"  width="0"  />

This is a simple-login project with support to Next.js 14



[![Demo](https://img.shields.io/badge/Demo-Visit%20Demo-brightgreen)](https://starter.mintbase.xyz)

[![Deploy](https://img.shields.io/badge/Deploy-on%20Vercel-blue)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMintbase%2Ftemplates%2Ftree%2Fmain%2Fstarter)



**Tooling:**



[![Use Case](https://img.shields.io/badge/Use%20Case-Utilities-blue)](#)

[![Tools](https://img.shields.io/badge/Tools-@mintbase.js/react%2CArweave%2CMintbase%20Wallet-blue)](#)

[![Framework](https://img.shields.io/badge/Framework-Next.js%2014-blue)](#)



**Author:**



[![Author](https://img.shields.io/twitter/follow/rubenmarcus_dev?style=social&logo=twitter)](https://twitter.com/rubenmarcus_dev) [![Organization](https://img.shields.io/badge/Mintbase-blue)](https://www.mintbase.xyz)



## Project Walkthrough


This is a simple-login project that uses [@mintbase-js/react](https://github.com/Mintbase/mintbase-js/tree/beta/packages/react) as Provider to showcase Mintbase Wallet usage.

It uses Next.js 14.



## Getting Started



*NOTE: As a standard on Mintbase as we use the latest versions of Next.js we recommend using pnpm, but the package manager is up to your personal choice.*



### Install



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