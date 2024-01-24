# NFT Stripe Checkout
<img src="https://i.imgur.com/9byWkpK.png" alt="cover_image" width="0" />
NFT-Stripe-Checkout is a Next.js project that provides a checkout interface for purchasing NFTs using Stripe.

[![Demo](https://img.shields.io/badge/Demo-Visit%20Demo-brightgreen)](https://nft-stripe-checkout.mintbase.xyz)
[![Deploy](https://img.shields.io/badge/Deploy-on%20Vercel-blue)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMintbase%2Ftemplates%2Ftree%2Fmain%2Fnft-stripe-checkout)

**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-Utilities-blue)](#)
[![Tools](https://img.shields.io/badge/Tools-@mintbase.js/sdk%2C@mintbase.js/react%2C@mintbase.js/storage%2C@mintbase.js/rpc%2C@mintbase.js/data%2C@Stripe%2CArweave%2CMintbase%20Wallet-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-Next.js%2014-blue)](#)

**Author:**

[![Author](https://img.shields.io/twitter/follow/mintbase?style=social&logo=twitter)](https://twitter.com/mintbase) [![Organization](https://img.shields.io/badge/Mintbase-blue)](https://www.mintbase.xyz)

## Project Walkthrough

NFT-Stripe-Checkout is a Next.js project that provides a checkout interface for purchasing NFTs using Stripe. It uses the Mintbase Wallet for user authentication.

## Testnet only!

Note that this is currently a testnet-only template. It allows you to define a smart contract call, which the user is paying for. Until regulatory questions are answered, this will be a testnet-only thing. Please reach out if you would see value in having this on mainnet!

*NOTE: As a standard on Mintbase as we use the latest versions of Next.js we recommend using pnpm, but the package manager is up to your personal choice.*

## Setup

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

## Code Examples

### Purchase Page

The Purchase Page is located in `/src/app/page.tsx`. It uses the `useMbWallet` hook from the `@mintbase-js/react` package to manage the wallet state. The `onClick` function sends a POST request to create a payment intent:

```ts

function PurchasePage() {
  const [clientSecret, setClientSecret] = useState("");

  const { activeAccountId, isConnected } = useMbWallet();

  const onClick = async () => {
    const resp = await fetch(
      "https://stripe2near-z3w7d7dnea-ew.a.run.app/payment-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceUsd: constants.priceUsd,
          action: mint({
            metadata: {
              reference: "NiztQFL98n8MgYKSu7FL3vdUnU_eUlM3fsQ0o3JEQCY",
              media: "eUdPgtRlT9Ua8ZHsGuNi1P8TUfVJaGUTH42NB1i1s4E",
            },
            ownerId: activeAccountId!,
            contractAddress: constants.tokenContractAddress,
          }),
        }),
      }
    );
    if (resp.ok) {
      const json = await resp.json();
      setClientSecret(json.clientSecret);
    }
  };

  ```

### Credit Card Form

The Credit Card Form is located in nft-stripe-checkout/src/app/page.tsx. It uses the useStripe and useElements hooks from the @stripe/react-stripe-js package to manage the Stripe elements and confirm the payment:

```ts

const CreditCardForm = () => {
  const elements = useElements();
  const stripe = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const onClick = async () => {
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000",
        },
        redirect: "if_required",
      });
      if (error) {
        throw error.message;
      }
      if (paymentIntent.status === "succeeded") {
        alert(
          "Payment success. The NFT will be delivered to your wallet shortly."
        );
        setIsCompleted(true);
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (e) {
      alert(`There was an error with the payment. ${e}`);
    }

    setIsLoading(false);
  };

  return (
    <>
      <PaymentElement />

      <button
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full"
        onClick={onClick}
        disabled={isLoading || isCompleted || !stripe || !elements}
      >
        {isCompleted
          ? "Payment received"
          : isLoading
          ? "Please wait..."
          : "Pay now"}
      </button>
    </>
  );
};

```

## Get in touch

- Support: [Join the Telegram](https://tg.me/mintdev)
- Twitter: [@mintbase](https://twitter.com/mintbase)

<img src="https://i.imgur.com/Q9lXgvg.png" alt="detail_image" width="0" />
