# Minter

## Description
This is a simple minter example built on top of **Next.js 14** 

[![Demo](https://img.shields.io/badge/Demo-Visit%20Demo-brightgreen)](https://minter.mintbase.xyz/)
[![Deploy](https://img.shields.io/badge/Deploy-on%20Vercel-blue)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMintbase%2Ftemplates%2Ftree%2Fmain%2Fminter)

**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-Minter-blue)](#)
[![Tools](https://img.shields.io/badge/Tools-@mintbase.js/sdk%2C%20@mintbase.js/react%2C%20@mintbase.js/storage%2C%20Arweave%2C%20Mintbase%20Wallet-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-Next.js%2014-blue)](#)

**Author:**

[![Author](https://img.shields.io/twitter/follow/mintbase?style=social&logo=twitter)](https://twitter.com/mintbase) [![Organization](https://img.shields.io/badge/Mintbase-blue)](https://www.mintbase.xyz)

## Project Walkthrough

This is a simple minter example built on top of **Next.js 14** using some of [@mintbase-js](https://github.com/Mintbase/mintbase-js) packages.

### Setup
on the file *layout.tsx* you have the object

```ts
export const MintbaseWalletSetup  = {
	contractAddress:  "test122212.mintspace2.testnet",
	network:  "testnet",
	callbackUrl:  "http://testnet.localhost:3000/",
};
```
where contractAddress is the address of a store that you are a minter.
if you dont have a store you can [deploy a new contract](https://www.mintbase.xyz/launchpad/contracts/0) on our launchpad

after that you can run
```
pnpm install
```
and 

```
pnpm dev
```


## Extending

This project is setup using Next.js + @mintbase/js +  shadcn ui + react hook form
You can use this project as a reference to build your own, and use or remove any library you think it would suit your needs.


## Get in touch

- Support: [Join the Telegram](https://tg.me/mintdev)
- Twitter: [@mintbase](https://twitter.com/mintbase)

<img src="https://i.imgur.com/6GKIiUQ.jpg" alt="cover_image" width="0" />
<img src="https://i.imgur.com/hz6lPHP.jpg" alt="detail_image" width="0" />