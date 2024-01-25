# Minter
<img src="https://i.imgur.com/QDJPsAA.png" alt="cover_image" width="0" />
This is a simple minter example built on top of Next.js 14

[![Demo](https://img.shields.io/badge/Demo-Visit%20Demo-brightgreen)](https://minter.mintbase.xyz/)
[![Deploy](https://img.shields.io/badge/Deploy-on%20Vercel-blue)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMintbase%2Ftemplates%2Ftree%2Fmain%2Fminter)

**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-Minter-blue)](#)
[![Tools](https://img.shields.io/badge/Tools-@mintbase.js/sdk%2C@mintbase.js/react%2C@mintbase.js/storage%2CArweave%2CMintbase%20Wallet-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-Next.js%2014-blue)](#)

**Author:**

[![Author](https://img.shields.io/twitter/follow/mintbase?style=social&logo=twitter)](https://twitter.com/mintbase) [![Organization](https://img.shields.io/badge/Mintbase-blue)](https://www.mintbase.xyz)

## Project Walkthrough

This is a simple minter example built on top of **Next.js 14** using some of [@mintbase-js](https://github.com/Mintbase/mintbase-js) packages.

*NOTE: As a standard on Mintbase as we use the latest versions of Next.js we recommend using pnpm, but the package manager is up to your personal choice.*

if you dont have a store you can [deploy a new contract](https://www.mintbase.xyz/launchpad/contracts/0) on our launchpad


### Setup


In the `minter/src/config/setup.ts` file, we define several key configurations for interacting with the Mintbase platform. This setup is crucial for ensuring that our application communicates correctly with Mintbase smart contracts.

## ENV Variables

- `proxyAddress`: This is the address of the proxy contract on Mintbase. It is either taken from the environment variable `NEXT_PUBLIC_PROXY_CONTRACT_ADDRESS` or defaults to `"0.minsta.proxy.mintbase.testnet"` if the environment variable is not set.

- `contractAddress`: The address of the minting contract. Similar to `proxyAddress`, it is sourced from `NEXT_PUBLIC_MINT_CONTRACT_ADDRESS` or defaults to `"test122212.mintspace2.testnet"`.

- `network`: Indicates the blockchain network we are interacting with. It defaults to `"testnet"` if `NEXT_PUBLIC_NETWORK` is not specified in the environment.

- `callbackUrl`: A URL used for callbacks, constructed dynamically based on the `network` variable. If we are on the testnet, it uses the testnet URL; otherwise, it defaults to the mainnet URL.


To customize these configurations for different environments, you can set the following environment variables in your `.env` file:

`NOTE: the env variables need to have the NEXT_PUBLIC_ on the variable name due to be available for the browser to process`

- `NEXT_PUBLIC_PROXY_CONTRACT_ADDRESS`: Your proxy contract address on Mintbase.
- `NEXT_PUBLIC_MINT_CONTRACT_ADDRESS`: Your mint contract address on Mintbase.
- `NEXT_PUBLIC_NETWORK`: The network you want to interact with (`"testnet"` or `"mainnet"`).





after that you can run
```
pnpm install
```
and

```
pnpm dev
```


## Extending

This project is setup using Next.js + @mintbase/js + shadcn ui + react hook form
You can use this project as a reference to build your own, and use or remove any library you think it would suit your needs.


## Get in touch

- Support: [Join the Telegram](https://tg.me/mintdev)
- Twitter: [@mintbase](https://twitter.com/mintbase)

<img src="https://i.imgur.com/SBiSEAB.png" alt="detail_image" width="0" />