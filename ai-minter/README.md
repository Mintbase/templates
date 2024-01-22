# AI Minter
<img src="https://i.imgur.com/jY6k292.png" alt="cover_image" width="0" />
This example illustrates an dapp where users can do Mints with AI Image Generator tools

[![Demo](https://img.shields.io/badge/Demo-Visit%20Demo-brightgreen)](https://ai-minter.mintbase.xyz/)
[![Deploy](https://img.shields.io/badge/Deploy-on%20Vercel-blue)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMintbase%2Ftemplates%2Ftree%2Fmain%2Fai-minter)

**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-AI%20Image%20Generation-blue)](#)
[![Tools](https://img.shields.io/badge/Tools-@mintbase.js/sdk%2C@mintbase.js/react%2C%20Arweave%2C%20Mintbase%20Wallet-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-Next.js%2014-blue)](#)

**Author:**

[![Author](https://img.shields.io/twitter/follow/mintbase?style=social&logo=twitter)](https://twitter.com/mintbase)  [![Organization](https://img.shields.io/badge/Mintbase-blue)](https://www.mintbase.xyz)

- [@mintbase.js/sdk](https://github.com/Mintbase/mintbase-js/tree/beta/packages/sdk): to use the execute call when minting

- [@mintbase.js/react](https://github.com/Mintbase/mintbase-js/tree/beta/packages/react) to provide the wallet connection

- [@mintbase.js/storage](https://github.com/Mintbase/mintbase-js/tree/beta/packages/sdk): to upload the images to Arweave


## Project Walkthrough
on the file *config/setup.ts* you have the object

```ts
export const MintbaseWalletSetup  = {
	contractAddress:  "test122212.mintspace2.testnet",
	network:  "testnet",
};
```
where contractAddress is the address of a store that you are a minter.
if you dont have a store you can [deploy a new contract](https://www.mintbase.xyz/launchpad/contracts/0) on our launchpad

after that you can run
```
pnpm install
```
and 

```
pnpm dev
```


## Extending

This project is setup using Next.js + @mintbase/js +  shadcn ui + react hook form
You can use this project as a reference to build your own, and use or remove any library you think it would suit your needs.



## Get in touch

- Support: [Join the Telegram](https://tg.me/mintdev)
- Twitter: [@mintbase](https://twitter.com/mintbase)

<img src="https://i.imgur.com/6epdJFw.png" alt="detail_image" width="0" />

