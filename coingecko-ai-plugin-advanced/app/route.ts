import type { ReferenceConfiguration } from "@scalar/api-reference";
import { ApiReference } from "@scalar/nextjs-api-reference";
import { DEPLOYMENT_URL } from "vercel-url";

const config: ReferenceConfiguration = {
  spec: {
    url: "/.well-known/ai-plugin.json",
  },
  theme: "purple",
  metaData: {
    title: "CoinGecko AI Plugin",
    description: "Bitte.ai Plugin for CoinGecko API's",
    ogDescription: "AI Compatible API endpoints for Prices, Charts, and more.",
    ogTitle: "CoinGecko AI",
    ogImage: "https://lvjt7wkmlmpwhrpm.public.blob.vercel-storage.com/Screenshot%202024-07-31%20at%202.11.34%E2%80%AFPM-9TeD4oYi8W1jhTDwEhuy0c6d3vQeM1.png",
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