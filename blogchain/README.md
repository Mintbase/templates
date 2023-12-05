
## Blogchain

**DEMO:** https://blogchain.mintbase.xyz/

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mintbase/examples/tree/main/blogchain) [![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/Mintbase/examples/tree/main/blogchain)


Welcome to Blogchain: the decentralized writer's blog. 
Transform your blogs into smart contracts and posts into NFTs. 

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