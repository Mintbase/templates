import {
	ApiReference,
	type ApiReferenceOptions,
} from "@scalar/nextjs-api-reference";
import { DEPLOYMENT_URL } from "vercel-url";

const config: ApiReferenceOptions = {
	spec: {
		url: "/.well-known/ai-plugin.json",
	},
	theme: "purple",
	metaData: {
		title: "CoinGecko AI Plugin",
		description: "Bitte.ai Plugin for CoinGecko API's",
		ogDescription: "AI Compatible API endpoints for Prices, Charts, and more.",
		ogTitle: "CoinGecko Agent",
		ogImage: {
			url: `${DEPLOYMENT_URL}/opengraph-image.png`,
			type: "image/png",
			alt: "CoinGecko AI Plugin API Reference",
			width: 1200,
			height: 630,
		},
		twitterCard: "summary_large_image",
		twitterSite: "@bitteprotocol",
		twitterImage: {
			url: `${DEPLOYMENT_URL}/twitter-image.png`,
			type: "image/png",
			alt: "CoinGecko AI Plugin API Reference",
			width: 1200,
			height: 600,
		},
	},
	favicon: "/favicon.ico",
};

export const GET = ApiReference(config);
