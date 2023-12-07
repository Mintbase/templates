# nft-stripe-checkout


NFT-Stripe-Checkout is a Next.js project that provides a checkout interface for purchasing NFTs using Stripe. It uses the Mintbase Wallet for user authentication.

[Demo](https://nft-stripe-checkout.mintbase.xyz)

## Getting Started

### Setup

1. First [deploy](https://mintbase.xyz/auth) a Mintbase Contract

2. Add `mintbus.testnet` as a minter to deployed contract contract

### Environment Variables


Checkout `.env.example` and create a local env file (`.env.local`) with:

```
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS="stripeteststore.mintspace2.testnet"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
NEXT_PUBLIC_MINTBASE_WALLET_URL="https://testnet.wallet.mintbase.xyz"
NEXT_PUBLIC_NETWORK="testnet"
```

### Develop

To get started with the project, you need to install the dependencies first. Run the following command in your terminal:

```
pnpm install
```

After installing the dependencies, you can start the development server:

```
pnpm run dev
```

Then, open http://localhost:3000 with your browser to see the result.

## Get in touch

- Support: [Join the Telegram](https://tg.me/mintdev)
- Twitter: [@mintbase](https://twitter.com/mintbase)
