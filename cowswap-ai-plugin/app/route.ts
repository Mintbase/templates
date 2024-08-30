import type { ReferenceConfiguration } from "@scalar/api-reference";
import { ApiReference } from "@scalar/nextjs-api-reference";
import { DEPLOYMENT_URL } from "vercel-url";

const config: ReferenceConfiguration = {
  spec: {
    url: "/.well-known/ai-plugin.json",
  },
  theme: "moon",
  metaData: {
    title: "CowSwap AI Plugin",
    description: "Bitte.ai Plugin for CowSwap API's",
    ogDescription: "AI Compatible API endpoints for RFQ (quotes) and order placement",
    ogTitle: "CoW AI",
    ogImage: "https://raw.githubusercontent.com/cowprotocol/token-lists/main/src/public/images/1/0xdef1ca1fb7fbcdc777520aa7f396b4e015f497ab/logo.png",
    twitterCard: "summary_large_image",
  },
  servers: [
    {
      // Override server URLs using Vercel system env variables
      // Defaults to http://localhost:3000 on local development
      url: `${DEPLOYMENT_URL}/api/v3`,
    }
  ]
};

export const GET = ApiReference(config);