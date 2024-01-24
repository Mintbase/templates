
# Contract Deployer
<img src="https://i.imgur.com/CkxzRfq.png" alt="cover_image" width="0" />
A Simple example of a Contract Deployer built on Next.js 14

[![Demo](https://img.shields.io/badge/Demo-Visit%20Demo-brightgreen)](https://contract-deployer-template.mintbase.xyz/)
[![Deploy](https://img.shields.io/badge/Deploy-Deploy%20Now-blue)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMintbase%2Ftemplates%2Ftree%2Fmain%2Fcontract-deployer)

**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-Utilities-blue)](#)
[![Tools](https://img.shields.io/badge/Tools-@mintbase.js/sdk%2C@mintbase.js/react%2C@mintbase.js/data%2CArweave%2CMintbase%20Wallet-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-Next.js%2014-blue)](#)

**Author:**

[![Author](https://img.shields.io/twitter/follow/sainthiago_?style=social&logo=twitter)](https://twitter.com/sainthiago_) [![Organization](https://img.shields.io/badge/Mintbase-blue)](https://www.mintbase.xyz)

## Project Walkthrough

This is a simple contract deployer example built on top of [mintbase nextjs starter](https://github.com/Mintbase/templates/tree/main/starter-next).

To initiate the contract deployment process, the user is required to connect their wallet. Following the wallet connection, the user can proceed to select the desired contract name and its corresponding symbol. It's important to note that the deployment fee for a contract is 3.7 NEAR.

*NOTE: As a standard on Mintbase as we use the latest versions of Next.js we recommend using pnpm, but the package manager is up to your personal choice.*

## Run the project
    pnpm i

    pnpm run dev

## Deploy Contract

#### Step 1: check if the contract name already exists

Using [@mintbase-js/data](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/data/api/checkstorename) checkStoreName method we can check if the store already exists.

```typescript
const { data: checkStore } = await checkStoreName(data.name);

if (checkStore?.nft_contracts.length === 0) {
  (...)
}
```

#### Step 2: if contract name doesn't exist execute the deploy contract action with the instantiated wallet

Create deploy contract args using [mintbase-js/sdk](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/sdk/deploycontract) deployContract method.

```typescript
const deployArgs = deployContract({
  name: data.name,
  ownerId: activeAccountId,
  factoryContractId: MINTBASE_CONTRACTS.testnet,
  metadata: {
    symbol: data.symbol,
  },
});
```

We can then execute the deploy contract

```typescript
  await execute({ wallet }, deployArgs);
```

Presently, this template exclusively functions within the testnet environment. To transition to a different network, it is imperative to modify the configuration settings located in the contract-deployer/src/config/setup.ts file and every 'testnet' instance.

## Get in touch

- Support: [Join the Telegram](https://tg.me/mintdev)
- Twitter: [@mintbase](https://twitter.com/mintbase)

<img src="https://i.imgur.com/6amZQIl.png" alt="detail_image" width="0" />
