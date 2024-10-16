import { NextResponse } from "next/server";
import { DEPLOYMENT_URL } from "vercel-url";

const key = JSON.parse(process.env.BITTE_KEY || "{}");
const config = JSON.parse(process.env.BITTE_CONFIG || "{}");

if (!key?.accountId) {
  console.error("no account");
}

export async function GET() {
  const pluginData = {
    openapi: "3.0.0",
    info: {
      title: "CoinGecko Price Demo",
      description: "API for retrieving the latest price data on cryptocurrency tokens using CoinGecko.",
      version: "1.0.0",
    },
    servers: [
      {
        url: config?.url || DEPLOYMENT_URL,
      },
    ],
    "x-mb": {
      "account-id": key.accountId,
      assistant: {
        name: "CoinGecko Price Assistant",
        description: "CoinGecko Assistant for fetching cryptocurrency token prices",
        instructions: "You are a helpful assistant for fetching cryptocurrency token prices through the CoinGecko API.",
      },
    },
    paths: {
      "/api/price": {
        get: {
          tags: ["Simple"],
          summary: "Coin Price by IDs",
          description:
            "This endpoint allows you to **query the prices of one or more coins by using their unique Coin API IDs**.",
          operationId: "simple-price",
          parameters: [
            {
              name: "ids",
              in: "query",
              description: "coins' ids, comma-separated if querying more than 1 coin.",
              required: true,
              schema: {
                type: "string",
              },
              examples: {
                "one value": {
                  value: "bitcoin",
                },
                "multiple values": {
                  value: "bitcoin,ethereum",
                },
              },
            },
            {
              name: "vs_currencies",
              in: "query",
              description: "target currency of coins, comma-separated if querying more than 1 currency.",
              required: true,
              schema: {
                type: "string",
              },
              examples: {
                "one value": {
                  value: "usd",
                },
                "multiple values": {
                  value: "usd,eur",
                },
              },
            },
          ],
          responses: {
            "200": {
              description: "price(s) of cryptocurrency",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  return NextResponse.json(pluginData);
}
