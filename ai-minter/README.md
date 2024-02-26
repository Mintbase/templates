# AI Minter

<img src="https://i.imgur.com/jY6k292.png" alt="cover_image" width="0"/>

Dreams to NFTs: AI Image Generation & Minting built with Replicate Models and MintbaseJS.

[![Demo](https://img.shields.io/badge/Demo-Visit%20Demo-brightgreen)](https://ai-minter.mintbase.xyz/)
[![Deploy](https://img.shields.io/badge/Deploy-on%20Vercel-blue)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMintbase%2Ftemplates%2Ftree%2Fmain%2Fai-minter)

**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-AI-blue)](#)
[![Tools](https://img.shields.io/badge/Tools-@mintbase.js/sdk%2C@mintbase.js/react%2C@mintbase.js/storage%2CArweave%2CMintbase%20Wallet-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-Next.js%2014-blue)](#)

**Author:**

[![Author](https://img.shields.io/twitter/follow/mintbase?style=social&logo=twitter)](https://twitter.com/mintbase) [![Organization](https://img.shields.io/badge/Mintbase-blue)](https://www.mintbase.xyz)

- [@mintbase.js/sdk](https://github.com/Mintbase/mintbase-js/tree/beta/packages/sdk): to use the execute call when minting

- [@mintbase.js/react](https://github.com/Mintbase/mintbase-js/tree/beta/packages/react) to provide the wallet connection

- [@mintbase.js/storage](https://github.com/Mintbase/mintbase-js/tree/beta/packages/sdk): to upload the images to Arweave

## Project Walkthrough

By writing a prompt and selecting a model from the dropdown, users can generate an image through AI when pressing the `prompt` button.
If the user then wishes to mint the resulting image, they may add a title and press `Mint Me` which will then redirect them to the transaction page so they can finish the minting process.

### Setup

you should create an `.env` file with the following properties:

```
REPLICATE_API_TOKEN='...'
NEXT_PUBLIC_MINT_CONTRACT_ADDRESS='...'
NEXT_PUBLIC_PROXY_CONTRACT_ADDRESS='...'
NEXT_PUBLIC_NETWORK='...'
```

`REPLICATE_API_TOKEN` should have the value of your token for the replicate api. You can get a token on the [replicate website](https://replicate.com/).

`NEXT_PUBLIC_MINT_CONTRACT_ADDRESS` is the address of the contract where you want to mint the result into an NFT. If you dont have one, you can [deploy a new contract](https://www.mintbase.xyz/launchpad/contracts/0) on our launchpad.

`NEXT_PUBLIC_PROXY_CONTRACT_ADDRESS` is the address of a proxy contract to allow you to relay the transaction to the minting address. This address should have minting permissions on your minting contract.

`NEXT_PUBLIC_NETWORK` is the network of the contracts being used (usually 'mainnet' or 'testnet').

### Run project

After setting up, you can run:

```
pnpm install
```

After the install succeeds, you con start the project with:

```
pnpm dev
```

And you're done! The project should be running [locally](http://localhost:3000) on your machine.

## Extending

This project is set up using Next.js + @mintbase/js + shadcn ui + react hook form.
You can use this project as a reference to build your own, and use or remove any library as needed.

## Get in touch

- Support: [Join the Telegram](https://tg.me/mintdev)
- Twitter: [@mintbase](https://twitter.com/mintbase)

<img src="https://i.imgur.com/6epdJFw.png" alt="detail_image" width="0" />
