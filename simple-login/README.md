---
name: Simple Login
slug: simple-login
description: XXX
framework: Next.js
useCase: XXX
css: Tailwind
deployUrl: xxx
demoUrl: XXX
---

# Simple Login

XXX

## Demo

https://edge-functions-ab-testing-google-optimize.vercel.app

### One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMintbase%2Fexamples%2Ftree%2Fmain%2Fsimple-login&integration-ids=oac_2vhHlLAK5ddS6mHpafn5FGic)


## Getting Started

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example https://github.com/vercel/examples/tree/main/edge-functions/ab-testing-google-optimize ab-testing-google-optimize
# or
yarn create next-app --example https://github.com/vercel/examples/tree/main/edge-functions/ab-testing-google-optimize ab-testing-google-optimize
```

[`pages/_middleware.ts`](pages/_middleware.ts) loads the experiments using a pre-defined JSON file ([lib/optimize-experiments.json](lib/optimize-experiments.json)), it currently has to be edited manually in order to add the experiments created in https://optimize.google.com.

Run Next.js in development mode:

```bash
npm install
npm run dev

# or

yarn
yarn dev
```

Once the page loads (http://localhost:3000) the layout will load the `optimize.js` script using your google tracking id, and the pages will register events for the current experiment and variant.

To create your own experiments you'll need an account with [Google Optimize](https://optimize.google.com/optimize/home). Once that's done, copy the `.env.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.example .env.local
```

Then open `.env.local` and set the environment variables to match the ones for your Google Optimize account.