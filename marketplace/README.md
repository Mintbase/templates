# Simple Marketplace

<img src="https://i.imgur.com/kkobnAH.png" alt="cover_image" width="250"/>

This is a simple marketplace example built on top of **Next.js 14** using some of [@mintbase-js](https://github.com/Mintbase/mintbase-js) packages.

[![Demo](https://img.shields.io/badge/Demo-Visit%20Demo-brightgreen)](https://marketplace-template.mintbase.xyz/)
[![Deploy](https://img.shields.io/badge/Deploy-Deploy%20Now-blue)](https://vercel.com/new/clone?repository-url=https://github.com/Mintbase/templates/tree/main/marketplace)


**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-NFT%20Markeplace,%20Affiliate%20Marketing-blue)](#)
[![Tools](https://img.shields.io/badge/Tools-@mintbase--js/sdk,%20@mintbase--js/react,%20@mintbase--js/data-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-NextJS%2014-blue)](#)

**Author:**

[![Organization](https://img.shields.io/badge/Mintbase-blue)](https://www.mintbase.xyz)


## Project Walkthrough


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

[Mintbase Developers Page for Mainnet](https://www.mintbase.xyz/developer):  
[Mintbase Developers Page for testnet](https://testnet.mintbase.xyz/developer):

```
NEXT_PUBLIC_DEVELOPER_KEY=your_mintbase_api_key
```

`NEXT_PUBLIC_NETWORK` could be `testnet` or `mainnet`

```
NEXT_PUBLIC_NETWORK=testnet
```

`NEXT_PUBLIC_STORES` is your store's ids

```
NEXT_PUBLIC_STORES=latium.mintspace2.testnet,mufasa.mintspace2.testnet
```

`NEXT_PUBLIC_AFFILIATE_ACCOUNT` is your near account where your should get your market fee

```
NEXT_PUBLIC_AFFILIATE_ACCOUNT=your_near_account.near
```



