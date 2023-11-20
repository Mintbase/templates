import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { execute, mint } from "@mintbase-js/sdk";
import { keyStores, WalletConnection } from "near-api-js";
import { connect } from "@/lib/connect";
import { constants } from "@/lib/constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const {
  WEBHOOK_SECRET_KEY,
  ENGINE_URL,
  ENGINE_ACCESS_TOKEN,
  NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
  BACKEND_WALLET_ADDRESS,
} = process.env;

export async function POST(req: NextRequest) {
  if (!WEBHOOK_SECRET_KEY) {
    throw 'Server misconfigured. Did you forget to add a ".env.local" file?';
  }

  // Validate the Stripe webhook signature.
  const body = await req.text();
  const signature = headers().get("stripe-signature");
  if (!signature) {
    throw "Stripe webhook signature not provided. This request may not be valid.";
  }

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    WEBHOOK_SECRET_KEY
  );
  switch (event.type) {
    case "charge.succeeded":
      // Handle the webhook
      await handleChargeSucceeded(event.data.object);
      break;
    default:
    // Ignore. Unexpected Stripe event.
  }

  return NextResponse.json({ message: "OK" });
}

const handleChargeSucceeded = async (charge: Stripe.Charge) => {
  if (
    !ENGINE_URL ||
    !ENGINE_ACCESS_TOKEN ||
    !NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ||
    !BACKEND_WALLET_ADDRESS
  ) {
    throw 'Server misconfigured. Did you forget to add a ".env.local" file?';
  }

  const { buyerWalletAddress } = charge.metadata;
  if (!buyerWalletAddress) {
    throw 'Webhook metadata is missing "buyerWalletAddress".';
  }

  await execute(
    {
      account: await connect(
        constants.minterAccountId,
        constants.minterPrivateKey,
        constants.network
      ),
    },
    mint({
      metadata: {
        reference: "NiztQFL98n8MgYKSu7FL3vdUnU_eUlM3fsQ0o3JEQCY",
        media: "eUdPgtRlT9Ua8ZHsGuNi1P8TUfVJaGUTH42NB1i1s4E",
      },
      ownerId: buyerWalletAddress,
      contractAddress: constants.tokenContractAddress,
    })
  );
};
