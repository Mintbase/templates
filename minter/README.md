# Minter

<img src="https://i.imgur.com/kkobnAH.png" alt="cover_image" width="250"/>

This is a simple minter example built on top of **Next.js 14** using some of [@mintbase-js](https://github.com/Mintbase/mintbase-js) packages:

[![Demo](https://img.shields.io/badge/Demo-Visit%20Demo-brightgreen)](https://minter.mintbase.xyz/)
[![Deploy](https://img.shields.io/badge/Deploy-Deploy%20Now-blue)](https://vercel.com/new/clone?repository-url=https://github.com/Mintbase/examples/tree/main/minter)

**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-Minting-blue)](#)
[![Tools](https://img.shields.io/badge/Tools-@mintbase--js/sdk,%20@mintbase--js/react,%20@mintbase--js/storage-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-NextJS%2014-blue)](#)

**Author:**

[![Organization](https://img.shields.io/badge/Mintbase-blue)](https://www.mintbase.xyz)

## Project Walkthrough
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

## 🙋‍♀️ Need extra help?
