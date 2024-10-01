"use client";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { ConnectWallet } from "@/components/connect-wallet";
import { WalletProvider } from "@/components/providers/wallet-provider";
import { constants } from "@/lib/constants";
import { useBitteWallet } from "@mintbase-js/react";
import { mint } from "@mintbase-js/sdk";
import { useState } from "react";
import { setGlobalEnv } from "@mintbase-js/sdk/lib/config/config";

setGlobalEnv({ network: process.env.NEXT_PUBLIC_NETWORK });

export default function Home() {
  return (
    <WalletProvider>
      <PurchasePage />
    </WalletProvider>
  );
}

function PurchasePage() {
  const [clientSecret, setClientSecret] = useState("");

  const { activeAccountId, isConnected } = useBitteWallet();

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

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    console.log('Did you forget to add a ".env.local" file?');
  }

  const stripe = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
      "pk_test_u3xKazkyGGPUI4gME4iKwVgv00D8HG8H4X"
  );

  return (
    <main className="flex flex-col gap-y-8 items-center justify-center h-screen p-4 md:p-12 gradient">
      <div className="flex flex-col gap-8 border border-gray-700 rounded-xl bg-black p-12 items-center ">
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-xl font-extrabold">Token Title</h2>
          <p className="text-gray-500">A description of your NFT.</p>
          <img
            className="w-36"
            src="https://arweave.net/eUdPgtRlT9Ua8ZHsGuNi1P8TUfVJaGUTH42NB1i1s4E"
          />
        </div>

        {!clientSecret ? (
          <button
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-400 disabled:opacity-50"
            onClick={onClick}
            disabled={!activeAccountId}
          >
            Buy with credit card
          </button>
        ) : (
          <Elements
            options={{
              clientSecret,
              appearance: { theme: "night" },
            }}
            stripe={stripe}
          >
            <CreditCardForm />
          </Elements>
        )}

        <div className="flex gap-2">
          <ConnectWallet />

          {isConnected && (
            <a
              className=" font-bold py-2 px-4 rounded-lg disabled:bg-gray-400 disabled:opacity-50 text-center"
              href={`https://${
                constants.network === "testnet" ? "testnet." : ""
              }mintbase.xyz/human/${activeAccountId}/owned`}
            >
              See collection
            </a>
          )}
        </div>
      </div>
    </main>
  );
}

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
        setIsCompleted(true);
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (e) {
      alert(`There was an error with the payment. ${e}`);
    }

    setIsLoading(false);
  };

  if (isCompleted) {
    return (
      <>
        <h1> Success you just bough an NFT!</h1>
      </>
    );
  }

  return (
    <>
      <p> You can test with a 4242 4242 4242 4242 card</p>
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
