---
name: Simple Minter
slug: simple-minter
description: Simple Minter on Mintbase
framework: Next.js
css: Tailwind
deployUrl: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMintbase%2Fexamples%2Ftree%2Fmain%2Fsimple-minter
demoUrl: https://examples-simple-minter.vercel.app/
---

# Simple Minter

This examples shows a simple minter on Mintbase.

## Demo

https://examples-simple-minter.vercel.app/


## Try on CodeSandbox

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/Mintbase/examples/tree/main/simple-minter)


## 🚀 One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMintbase%2Fexamples%2Ftree%2Fmain%2Fsimple-minter)


## Getting Started

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example https://github.com/Mintbase/examples/tree/main/simple-minter
# or
yarn create next-app --example https://github.com/Mintbase/examples/tree/main/simple-minter
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


Then open `.env.local` and set the environment variables to match the ones for your Google Optimize account.

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

`NEXT_PUBLIC_STORE_ID` its your store id
```
NEXT_PUBLIC_STORE_ID=hellovirtualworld.mintspace2.testnet
```

## Extending

This project is setup using Next.js + MintBase UI + Tailwind + Apollo + React Hook Form.

You can use this project as a reference to build your own, and use or remove any library you think it would suit your needs.

## 🙋‍♀️  Need extra help?

[Ask on our Telegram Channel](https://t.me/mintdev) <br/>
[Create an Issue](https://github.com/Mintbase/examples/issues)
