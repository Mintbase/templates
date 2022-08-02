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

### One-Click Deploy

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

Once that's done, copy the `.env.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.example .env.local
```

Then open `.env.local` and set the environment variables to match the ones for your Google Optimize account.
Most importantly update the `NEXT_PUBLIC_STORES` to include which stores you want to show in the marketplace.
