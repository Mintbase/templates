# Blogchain

<img src="https://i.imgur.com/kkobnAH.png" alt="cover_image" width="250"/>

Welcome to Blogchain: the decentralized writer's blog. Transform your blogs into smart contracts and posts into NFTs.

[![Demo](https://img.shields.io/badge/Demo-Visit%20Demo-brightgreen)](https://blogchain.mintbase.xyz/)
[![Deploy](https://img.shields.io/badge/Deploy-Deploy%20Now-blue)](https://vercel.com/new/clone?repository-url=https://github.com/Mintbase/examples/tree/main/blogchain)

**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-Token%20Drops-blue)](#)
[![Tools](https://img.shields.io/badge/Tools-Mb--js%3A%20SDK%2C%20Mb--js%3A%20Arweave%2C%20Mintbase%20Wallet-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-NextJS%2014-blue)](#)

**Author:**

[![Organization](https://img.shields.io/badge/Mintbase-blue)](https://www.mintbase.xyz)

## Project Walkthrough

This example was built on top of **Next.js 14** using some of [@mintbase-js](https://github.com/Mintbase/mintbase-js) packages:

- [@mintbase.js/sdk](https://github.com/Mintbase/mintbase-js/tree/beta/packages/sdk): to use the execute contract calls
- [@mintbase.js/react](https://github.com/Mintbase/mintbase-js/tree/beta/packages/react) to provide the wallet connection
- [@mintbase.js/storage](https://github.com/Mintbase/mintbase-js/tree/beta/packages/sdk): to upload the images to Arweave
- [@mintbase.js/data](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data) to fetch indexer data

[Mintbase Docs - Deploy Contract](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/sdk/deploycontract)
[Mintbase Docs - Mint NFT](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/sdk/mint)
[Mintbase Docs - Upload Data to Arweave](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/storage)

### Setup
install dependencies
```
pnpm install
```
and 
run the project
```
pnpm dev
```