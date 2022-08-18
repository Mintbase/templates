---
name: Simple Login
slug: simple-login
description: Simple NEAR wallet login
framework: Next.js
css: Tailwind
deployUrl: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMintbase%2Fexamples%2Ftree%2Fmain%2Fsimple-login
demoUrl: https://examples-simple-login.vercel.app/
---

# Simple Login

This examples shows a simple login with NEAR example.

## Demo

https://examples-simple-login.vercel.app/



## Try on CodeSandbox

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/Mintbase/examples/tree/main/simple-login)


### One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMintbase%2Fexamples%2Ftree%2Fmain%2Fsimple-login)


## Getting Started

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example https://github.com/Mintbase/examples/tree/main/simple-login
# or
yarn create next-app --example https://github.com/Mintbase/examples/tree/main/simple-login
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

`NEXT_PUBLIC_NETWORK` could be `testnet` or `mainnet`
```
NEXT_PUBLIC_NETWORK=testnet
```

`NEXT_PUBLIC_USER_ID` its your near wallet user id
```
NEXT_PUBLIC_USER_ID=mintbase_user_on_near
```
## Extending

This project is setup using Next.js + MintBase UI + Tailwind.
You can use this project as a reference to build your own, and use or remove any library you think it would suit your needs.

## 🙋‍♀️  Need extra help?

[Ask on our Telegram Channel](https://t.me/mintdev) <br/>
[Create an Issue](https://github.com/Mintbase/examples/issues)
