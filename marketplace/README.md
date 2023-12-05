## Simple Marketplace

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mintbase/templates/tree/main/marketplace) [![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/Mintbase/templates/tree/main/marketplace)

**DEMO:** https://marketplace-template.mintbase.xyz/

This is a simple marketplace example built on top of **Next.js 14** using some of [@mintbase-js](https://github.com/Mintbase/mintbase-js) packages:

- [@mintbase.js/sdk](https://github.com/Mintbase/mintbase-js/tree/beta/packages/sdk): to use the execute contract calls
- [@mintbase.js/react](https://github.com/Mintbase/mintbase-js/tree/beta/packages/react) to provide the wallet connection
- [@mintbase.js/data](https://github.com/Mintbase/mintbase-js/tree/beta/packages/data) to fetch indexer data

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

`NEXT_PUBLIC_AFFILIATE_ACCOUNT` is your near account where your should get your market fee

```
NEXT_PUBLIC_AFFILIATE_ACCOUNT=your_near_account.near
```