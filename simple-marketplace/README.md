---
name: Simple Marketplace
slug: simple-marketplace
description: Simple Marketplace on MintBase
framework: Next.js
css: Tailwind
deployUrl: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMintbase%2Fexamples%2Ftree%2Fmain%2Fsimple-marketplace
demoUrl: https://examples-simple-marketplace.vercel.app/
---

# Simple Marketplace

This examples shows a simple marketplace.

## Demo

https://examples-simple-marketplace.vercel.app/


## Requirements

 - [Setup a Near Wallet](https://wallet.testnet.near.org/)
 - [Setup a Mintbase store aka Smart Contract](https://www.youtube.com/watch?v=Ck2EPrtuxa8) and [Mint NFTS](https://www.youtube.com/watch?v=6L_aAnJc3hM):
 - [Get a Developer Key](https://testnet.mintbase.io/developer)

## Try on CodeSandbox

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/Mintbase/examples/tree/main/simple-marketplace)

## One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMintbase%2Fexamples%2Ftree%2Fmain%2Fsimple-marketplace)


## Getting Started

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example https://github.com/Mintbase/examples/tree/main/simple-marketplace
# or
yarn create next-app --example https://github.com/Mintbase/examples/tree/main/simple-marketplace
```


Run Next.js in development mode:

```bash
npm install
npm run dev

# or

yarn
yarn dev
```

## Set ENV variables

Once that's done, copy the `.env.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.example .env.local
```

if you use windows without powershell or cygwin:

```bash
copy .env.example .env.local
```


To get your `api key` visit :

[Mintbase Developers Page for Mainnet](https://www.mintbase.io/developer):
[Mintbase Developers Page for testnet](https://testnet.mintbase.io/developer):

```
NEXT_PUBLIC_DEVELOPER_KEY=your_mintbase_api_key
```

`NEXT_PUBLIC_NETWORK` could be `testnet` or `mainnet`
```
NEXT_PUBLIC_NETWORK=testnet
```

`NEXT_PUBLIC_STORES` its your stores ids
```
NEXT_PUBLIC_STORES=latium.mintspace2.testnet,mufasa.mintspace2.testnet
```

## Extending

This project is setup using Next.js + MintBase UI + Tailwind + Apollo.
You can use this project as a reference to build your own, and use or remove any library you think it would suit your needs.

## 🙋‍♀️  Need extra help?

[Ask on our Telegram Channel](https://t.me/mintdev) <br/>
[Create an Issue](https://github.com/Mintbase/examples/issues)
