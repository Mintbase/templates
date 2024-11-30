import type { ReferenceConfiguration } from "@scalar/api-reference";
import { ApiReference } from "@scalar/nextjs-api-reference";
import { DEPLOYMENT_URL } from "vercel-url";


const key = JSON.parse(process.env.BITTE_KEY || "{}");

if (!key?.accountId) {
  console.error("no account");
}

let bitteDevJson: { url?: string; };
try {
    bitteDevJson = require("@/bitte.dev.json");
} catch (error) {
    console.warn("Failed to import bitte.dev.json, using default values");
    bitteDevJson = { url: undefined };
}

const config: ReferenceConfiguration = {
  spec: {
    url: "/.well-known/ai-plugin.json",
  },
  theme: "moon",
  metaData: {
    title: "ETH Wraptor AI Plugin",
    description: "Bitte.ai Plugin for Wrappin' ETH",
    ogDescription: "AI Compatible API endpoints Wrapped ETH",
    ogTitle: "Wraptor",
    ogImage: "https://img.cryptorank.io/coins/weth1701090834118.png",
    twitterCard: "summary_large_image",
  },
  servers: [
    {
      // Override server URLs using Vercel system env variables
      // Defaults to http://localhost:3000 on local development
      url: bitteDevJson.url || DEPLOYMENT_URL,
    },
  ],
};

export const GET = ApiReference(config);
