import { NextResponse } from "next/server";
import { DEPLOYMENT_URL } from "vercel-url";

const key = JSON.parse(process.env.BITTE_KEY || "{}");
const config = JSON.parse(process.env.BITTE_CONFIG || "{}");

if (!key?.accountId) {
  console.error("no account");
}

export const revalidate = 1;
export async function GET() {
  const pluginData = {
    openapi: "3.0.0",
    info: {
      title: "CoinGecko Price Assistant API",
      description: "API for retrieving the latest price data on cryptocurrency tokens using CoinGecko.",
      version: "1.0.0"
    },
    servers: [
      {
        url: config?.url || DEPLOYMENT_URL,
      }
    ],
    "x-mb": {
      "account-id": key.accountId,
      assistant: {
        name: "CoinGecko Price Assistant",
        description: "CoinGecko Assistant is an AI helper with full access to CoinGecko's Public API. It can provide users with real-time cryptocurrency data, including prices, market information, charts, and trends.",
        instructions: "The CoinGecko Price Assistant can help users access various endpoints of the CoinGecko API. Here are some of the most popular use cases it can assist with:\n\n1. Price Queries: The assistant can fetch current prices, 24h changes, and market caps for any cryptocurrency. It should use the /simple/price endpoint for quick price checks or /coins/markets for more detailed market data.\n\n2. Coin Details: For in-depth information on a specific coin, including description, links, and market data, the assistant should use the /coins/{id} endpoint.\n\n3. Historical Data: To provide price history or create charts, the assistant should utilize endpoints like /coins/{id}/market_chart or /coins/{id}/ohlc.\n\n4. Trending Coins: The assistant can share the most popular coins in the last 24 hours using the /search/trending endpoint.\n\n5. Global Market Overview: For a bird's-eye view of the crypto market, including total market cap and dominance, the assistant should use the /global endpoint.\n\n6. Exchange Data: To provide information on exchanges, including volume and trust score, the assistant should use the /exchanges and related endpoints.\n\n7. Search: If a user is looking for a specific coin or exchange, the assistant can use the /search endpoint to find the correct information.\n\nWhen users ask for cryptocurrency information, the assistant should interpret their request, select the appropriate API endpoint, format the query correctly, and return the relevant data in a clear, easy-to-understand format. It should also offer to provide additional context or explanations if needed.\n\nThe assistant should remember that while it has access to a wealth of data, it doesn't provide financial advice. Its role is to inform and assist users in accessing cryptocurrency data to support their own research and decision-making.",
        tools: [
          {
            type: "submit-query"
          }
        ]
      }
    },
    paths: {
      "/api/v3/ping": {
        get: {
          tags: [
            "Ping"
          ],
          summary: "Check API server status",
          description: "This endpoint allows you to **check the API server status**.",
          operationId: "ping-server",
          responses: {
            "200": {
              description: "Status OK",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Ping"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/simple/price": {
        "get": {
          "tags": [
            "Simple"
          ],
          "summary": "Coin Price by IDs",
          "description": "This endpoint allows you to **query the prices of one or more coins by using their unique Coin API IDs**.",
          "operationId": "simple-price",
          "parameters": [
            {
              "name": "ids",
              "in": "query",
              "description": "coins' ids, comma-separated if querying more than 1 coin.",
              "required": true,
              "schema": {
                "type": "string"
              },
              "examples": {
                "one value": {
                  "value": "bitcoin"
                },
                "multiple values": {
                  "value": "bitcoin,ethereum"
                }
              }
            },
            {
              "name": "vs_currencies",
              "in": "query",
              "description": "target currency of coins, comma-separated if querying more than 1 currency.  \u003Cbr\u003E*refers to [`/simple/supported_vs_currencies`](/reference/simple-supported-currencies).",
              "required": true,
              "schema": {
                "type": "string"
              },
              "examples": {
                "one value": {
                  "value": "usd"
                },
                "multiple values": {
                  "value": "usd,eur"
                }
              }
            },
            {
              "name": "include_market_cap",
              "in": "query",
              "description": "include market cap, default: false ",
              "required": false,
              "schema": {
                "type": "boolean"
              }
            },
            {
              "name": "include_24hr_vol",
              "in": "query",
              "description": "include 24hr volume, default: false",
              "required": false,
              "schema": {
                "type": "boolean"
              }
            },
            {
              "name": "include_24hr_change",
              "in": "query",
              "description": "include 24hr change, default: false",
              "schema": {
                "type": "boolean"
              }
            },
            {
              "name": "include_last_updated_at",
              "in": "query",
              "description": "include last updated price time in UNIX, default: false",
              "required": false,
              "schema": {
                "type": "boolean"
              }
            },
            {
              "name": "precision",
              "in": "query",
              "description": "decimal place for currency price value ",
              "required": false,
              "schema": {
                "type": "string",
                "enum": [
                  "full",
                  0,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "price(s) of cryptocurrency",
              "content": {
                "application/json": {
                  "schema": {
                    "properties": {
                      "bitcoin": {
                        "$ref": "#/components/schemas/SimplePrice"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/simple/token_price/{id}": {
        "get": {
          "tags": [
            "Simple"
          ],
          "summary": "Coin Price by Token Addresses",
          "description": "This endpoint allows you to **query a token price by using token contract address**.",
          "operationId": "simple-token-price",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "asset platform's id  \u003Cbr\u003E*refers to [`/asset_platforms`](/reference/asset-platforms-list).",
              "required": true,
              "schema": {
                "type": "string",
                "example": "ethereum"
              }
            },
            {
              "name": "contract_addresses",
              "in": "query",
              "description": "the contract addresses of tokens, comma-separated if querying more than 1 token's contract address",
              "required": true,
              "schema": {
                "type": "string"
              },
              "examples": {
                "one value": {
                  "value": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"
                },
                "multiple values": {
                  "value": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599,0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
                }
              }
            },
            {
              "name": "vs_currencies",
              "in": "query",
              "description": "target currency of coins, comma-separated if querying more than 1 currency.  \u003Cbr\u003E *refers to [`/simple/supported_vs_currencies`](/reference/simple-supported-currencies).",
              "required": true,
              "schema": {
                "type": "string"
              },
              "examples": {
                "one value": {
                  "value": "usd"
                },
                "multiple values": {
                  "value": "usd,eur"
                }
              }
            },
            {
              "name": "include_market_cap",
              "in": "query",
              "description": "include market capitalization, default: false",
              "required": false,
              "schema": {
                "type": "boolean"
              }
            },
            {
              "name": "include_24hr_vol",
              "in": "query",
              "description": "include 24hr volume, default: false",
              "required": false,
              "schema": {
                "type": "boolean"
              }
            },
            {
              "name": "include_24hr_change",
              "in": "query",
              "description": "include 24hr change  default: false",
              "required": false,
              "schema": {
                "type": "boolean"
              }
            },
            {
              "name": "include_last_updated_at",
              "in": "query",
              "description": "include last updated price time in UNIX , default: false",
              "required": false,
              "schema": {
                "type": "boolean"
              }
            },
            {
              "name": "precision",
              "in": "query",
              "description": "decimal place for currency price value ",
              "required": false,
              "schema": {
                "type": "string",
                "enum": [
                  "full",
                  0,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "price(s) of cryptocurrency",
              "content": {
                "application/json": {
                  "schema": {
                    "properties": {
                      "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599": {
                        "$ref": "#/components/schemas/SimplePrice"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/simple/supported_vs_currencies": {
        "get": {
          "tags": [
            "Simple"
          ],
          "summary": "Supported Currencies List",
          "description": "This endpoint allows you to **query all the supported currencies on CoinGecko**.",
          "operationId": "simple-supported-currencies",
          "responses": {
            "200": {
              "description": "list of supported currencies",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CurrencyList"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/coins/{id}": {
        "get": {
          "tags": [
            "Coins"
          ],
          "summary": "Coin Data by ID",
          "description": "This endpoint allows you to **query all the coin data of a coin (name, price, market .... including exchange tickers) on CoinGecko coin page based on a particular coin id**.",
          "operationId": "coins-id",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "coin id",
              "required": true,
              "schema": {
                "type": "string",
                "example": "bitcoin"
              }
            },
            {
              "name": "localization",
              "in": "query",
              "description": "include all the localized languages in the response, default: true",
              "required": false,
              "schema": {
                "type": "boolean"
              }
            },
            {
              "name": "tickers",
              "in": "query",
              "description": "include tickers data, default: true",
              "required": false,
              "schema": {
                "type": "boolean"
              }
            },
            {
              "name": "market_data",
              "in": "query",
              "description": "include market data, default: true",
              "required": false,
              "schema": {
                "type": "boolean"
              }
            },
            {
              "name": "community_data",
              "in": "query",
              "description": "include community data, default: true",
              "required": false,
              "schema": {
                "type": "boolean"
              }
            },
            {
              "name": "developer_data",
              "in": "query",
              "description": "include developer data, default: true",
              "required": false,
              "schema": {
                "type": "boolean"
              }
            },
            {
              "name": "sparkline",
              "in": "query",
              "description": "include sparkline 7 days data, default: false",
              "required": false,
              "schema": {
                "type": "boolean"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get current data for a coin",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CoinsID"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/coins/{id}/tickers": {
        "get": {
          "tags": [
            "Coins"
          ],
          "summary": "Coin Tickers by ID",
          "description": "This endpoint allows you to **query the coin tickers on both centralized exchange (cex) and decentralized exchange (dex) based on a particular coin id**.",
          "operationId": "coins-id-tickers",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "coin id",
              "required": true,
              "schema": {
                "type": "string",
                "example": "bitcoin"
              }
            },
            {
              "name": "exchange_ids",
              "in": "query",
              "description": "exchange id \u003Cbr\u003E *refers to [`/exchanges/list`](/reference/exchanges-list).",
              "required": false,
              "schema": {
                "type": "string",
                "example": "binance"
              }
            },
            {
              "name": "include_exchange_logo",
              "in": "query",
              "description": "include exchange logo, default: false",
              "required": false,
              "schema": {
                "type": "boolean"
              }
            },
            {
              "name": "page",
              "in": "query",
              "description": "page through results",
              "required": false,
              "schema": {
                "type": "integer"
              }
            },
            {
              "name": "order",
              "in": "query",
              "description": "use this to sort the order of responses, default: trust_score_desc",
              "required": false,
              "schema": {
                "type": "string",
                "enum": [
                  "trust_score_desc",
                  "trust_score_asc",
                  "volume_desc",
                  "volume_asc"
                ]
              }
            },
            {
              "name": "depth",
              "in": "query",
              "description": "include 2% orderbook depth, ie. `cost_to_move_up_usd` and `cost_to_move_down_usd` \u003Cbr\u003E default: false",
              "required": false,
              "schema": {
                "type": "boolean"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get coin tickers",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CoinsTickers"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/coins/{id}/history": {
        "get": {
          "tags": [
            "Coins"
          ],
          "summary": "Coin Historical Data by ID",
          "description": "This endpoint allows you to **query the historical data (price, market cap, 24hrs volume, etc) at a given date for a coin based on a particular coin id**.",
          "operationId": "coins-id-history",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "coin id",
              "required": true,
              "schema": {
                "type": "string",
                "example": "bitcoin"
              }
            },
            {
              "name": "date",
              "in": "query",
              "description": "the date of data snapshot \u003Cbr\u003E Format: `dd-mm-yyyy`",
              "required": true,
              "schema": {
                "type": "string",
                "example": "30-12-2023"
              }
            },
            {
              "name": "localization",
              "in": "query",
              "description": "include all the localized languages in response, default: true",
              "required": false,
              "schema": {
                "type": "boolean"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get historical data (name, price, market, stats) at a given date for a coin",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CoinsHistoricalData"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/coins/{id}/market_chart": {
        "get": {
          "tags": [
            "Coins"
          ],
          "summary": "Coin Historical Chart Data by ID",
          "description": "This endpoint allows you to **get the historical chart data of a coin including time in UNIX, price, market cap and 24hrs volume based on particular coin id**.",
          "operationId": "coins-id-market-chart",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "coin id",
              "required": true,
              "schema": {
                "type": "string",
                "example": "bitcoin"
              }
            },
            {
              "name": "vs_currency",
              "in": "query",
              "description": "target currency of market data \u003Cbr\u003E *refers to [`/simple/supported_vs_currencies`](/reference/simple-supported-currencies).",
              "required": true,
              "schema": {
                "type": "string",
                "example": "usd"
              }
            },
            {
              "name": "days",
              "in": "query",
              "description": "data up to number of days ago \u003Cbr\u003E you may use any integer for number of days",
              "required": true,
              "schema": {
                "type": "string"
              },
              "examples": {
                "value-1": {
                  "value": "1"
                },
                "value-2": {
                  "value": "365"
                }
              }
            },
            {
              "name": "interval",
              "in": "query",
              "description": "data interval, leave empty for auto granularity Possible value: daily",
              "required": false,
              "schema": {
                "type": "string",
                "enum": [
                  "daily"
                ]
              }
            },
            {
              "name": "precision",
              "in": "query",
              "description": "decimal place for currency price value",
              "required": false,
              "schema": {
                "type": "string",
                "enum": [
                  "full",
                  0,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get historical market data include price, market cap, and 24h volume (granularity auto)",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CoinsMarketChart"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/coins/{id}/market_chart/range": {
        "get": {
          "tags": [
            "Coins"
          ],
          "summary": "Coin Historical Chart Data within Time Range by ID",
          "description": "This endpoint allows you to **get the historical chart data of a coin within certain time range in UNIX along with price, market cap and 24hrs volume based on particular coin id**.",
          "operationId": "coins-id-market-chart-range",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "coin id",
              "required": true,
              "schema": {
                "type": "string",
                "example": "bitcoin"
              }
            },
            {
              "name": "vs_currency",
              "in": "query",
              "description": "target currency of market data \u003Cbr\u003E *refers to [`/simple/supported_vs_currencies`](/reference/simple-supported-currencies).",
              "required": true,
              "schema": {
                "type": "string",
                "example": "usd"
              }
            },
            {
              "name": "from",
              "in": "query",
              "description": "starting date in UNIX timestamp ",
              "required": true,
              "schema": {
                "type": "integer",
                "example": "1711929600"
              }
            },
            {
              "name": "to",
              "in": "query",
              "description": "ending date in UNIX timestamp",
              "required": true,
              "schema": {
                "type": "integer",
                "example": "1712275200"
              }
            },
            {
              "name": "precision",
              "in": "query",
              "description": "decimal place for currency price value",
              "required": false,
              "schema": {
                "type": "string",
                "enum": [
                  "full",
                  0,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get historical market data include price, market cap, and 24h volume (granularity auto)",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CoinsMarketChartRange"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/coins/{id}/ohlc": {
        "get": {
          "tags": [
            "Coins"
          ],
          "summary": "Coin OHLC Chart by ID",
          "description": "This endpoint allows you to **get the OHLC chart (Open, High, Low, Close) of a coin based on particular coin id**.",
          "operationId": "coins-id-ohlc",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "coin id",
              "required": true,
              "schema": {
                "type": "string",
                "example": "bitcoin"
              }
            },
            {
              "name": "vs_currency",
              "in": "query",
              "description": "target currency of price data \u003Cbr\u003E *refers to [`/simple/supported_vs_currencies`](/reference/simple-supported-currencies).",
              "required": true,
              "schema": {
                "type": "string",
                "example": "usd"
              }
            },
            {
              "name": "days",
              "in": "query",
              "description": "data up to number of days ago ",
              "required": true,
              "schema": {
                "type": "string",
                "enum": [
                  1,
                  7,
                  14,
                  30,
                  90,
                  180,
                  365
                ]
              }
            },
            {
              "name": "precision",
              "in": "query",
              "description": "decimal place for currency price value",
              "required": false,
              "schema": {
                "type": "string",
                "enum": [
                  "full",
                  0,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get coin's OHLC",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CoinsOHLC"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/coins/{id}/contract/{contract_address}": {
        "get": {
          "tags": [
            "Contract"
          ],
          "summary": "Coin Data by Token Address",
          "description": "This endpoint allows you to **query all the coin data (name, price, market .... including exchange tickers) on CoinGecko coin page based on asset platform and particular token contract address**.",
          "operationId": "coins-contract-address",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "asset platform id \u003Cbr\u003E *refers to [`/asset_platforms`](/reference/asset-platforms-list).",
              "required": true,
              "schema": {
                "type": "string",
                "example": "ethereum"
              }
            },
            {
              "name": "contract_address",
              "in": "path",
              "description": "the contract address of token",
              "required": true,
              "schema": {
                "type": "string",
                "example": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get current data for a coin",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CoinsContractAddress"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/coins/{id}/contract/{contract_address}/market_chart": {
        "get": {
          "tags": [
            "Contract"
          ],
          "summary": "Coin Historical Chart Data by Token Address",
          "description": "This endpoint allows you to **get the historical chart data including time in UNIX, price, market cap and 24hrs volume based on asset platform and particular token contract address**.",
          "operationId": "contract-address-market-chart",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "asset platform id \u003Cbr\u003E *refers to [`/asset_platforms`](/reference/asset-platforms-list).",
              "required": true,
              "schema": {
                "type": "string",
                "example": "ethereum"
              }
            },
            {
              "name": "contract_address",
              "in": "path",
              "description": "the contract address of token",
              "required": true,
              "schema": {
                "type": "string",
                "example": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
              }
            },
            {
              "name": "vs_currency",
              "in": "query",
              "description": "target currency of market data \u003Cbr\u003E *refers to [`/simple/supported_vs_currencies`](/reference/simple-supported-currencies).",
              "required": true,
              "schema": {
                "type": "string",
                "example": "usd"
              }
            },
            {
              "name": "days",
              "in": "query",
              "description": "data up to number of days ago \u003Cbr\u003E you may use any integer for number of days",
              "required": true,
              "schema": {
                "type": "string"
              },
              "examples": {
                "value-1": {
                  "value": "1"
                },
                "value-2": {
                  "value": "365"
                }
              }
            },
            {
              "name": "interval",
              "in": "query",
              "description": "data interval, leave empty for auto granularity Possible value: daily",
              "required": false,
              "schema": {
                "type": "string",
                "enum": [
                  "daily"
                ]
              }
            },
            {
              "name": "precision",
              "in": "query",
              "description": "decimal place for currency price value",
              "required": false,
              "schema": {
                "type": "string",
                "enum": [
                  "full",
                  0,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get historical market data include price, market cap, and 24h volume",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CoinsMarketChart"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/coins/{id}/contract/{contract_address}/market_chart/range": {
        "get": {
          "tags": [
            "Contract"
          ],
          "summary": "Coin Historical Chart Data within Time Range by Token Address",
          "description": "This endpoint allows you to **get the historical chart data within certain time range in UNIX along with price, market cap and 24hrs volume  based on asset platform and particular token contract address**.",
          "operationId": "contract-address-market-chart-range",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "asset platform id \u003Cbr\u003E *refers to [`/asset_platforms`](/reference/asset-platforms-list)",
              "required": true,
              "schema": {
                "type": "string",
                "example": "ethereum"
              }
            },
            {
              "name": "contract_address",
              "in": "path",
              "description": "the contract address of token",
              "required": true,
              "schema": {
                "type": "string",
                "example": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
              }
            },
            {
              "name": "vs_currency",
              "in": "query",
              "description": "target currency of market data \u003Cbr\u003E *refers to [`/simple/supported_vs_currencies`](/reference/simple-supported-currencies).",
              "required": true,
              "schema": {
                "type": "string",
                "example": "usd"
              }
            },
            {
              "name": "from",
              "in": "query",
              "description": "starting date in UNIX timestamp",
              "required": true,
              "schema": {
                "type": "integer",
                "example": "1711929600"
              }
            },
            {
              "name": "to",
              "in": "query",
              "description": "ending date in UNIX timestamp",
              "required": true,
              "schema": {
                "type": "integer",
                "example": "1712275200"
              }
            },
            {
              "name": "precision",
              "in": "query",
              "description": "decimal place for currency price value",
              "required": false,
              "schema": {
                "type": "string",
                "enum": [
                  "full",
                  0,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get historical market data include price, market cap, and 24h volume",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CoinsMarketChartRange"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/asset_platforms": {
        "get": {
          "tags": [
            "Asset Platforms"
          ],
          "summary": "Asset Platforms List (ID Map)",
          "description": "This endpoint allows you to **query all the asset platforms on CoinGecko**.",
          "operationId": "asset-platforms-list",
          "parameters": [
            {
              "name": "filter",
              "in": "query",
              "description": "apply relevant filters to results",
              "required": false,
              "schema": {
                "type": "string",
                "enum": [
                  "nft"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "List all asset platforms",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AssetPlatforms"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/coins/categories/list": {
        "get": {
          "tags": [
            "Categories"
          ],
          "summary": "Coins Categories List (ID Map)",
          "description": "This endpoint allows you to **query all the coins categories on CoinGecko**.",
          "operationId": "coins-categories-list",
          "responses": {
            "200": {
              "description": "List all categories",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CategoriesList"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/coins/categories": {
        "get": {
          "tags": [
            "Categories"
          ],
          "summary": "Coins Categories List with Market Data",
          "description": "This endpoint allows you to **query all the coins categories with market data (market cap, volume, etc.) on CoinGecko**.",
          "operationId": "coins-categories",
          "parameters": [
            {
              "name": "order",
              "in": "query",
              "description": "sort results by field, default: market_cap_desc",
              "required": false,
              "schema": {
                "type": "string",
                "enum": [
                  "market_cap_desc",
                  "market_cap_asc",
                  "name_desc",
                  "name_asc",
                  "market_cap_change_24h_desc",
                  "market_cap_change_24h_asc"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "List all categories with market data",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Categories"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/exchanges": {
        "get": {
          "tags": [
            "Exchanges"
          ],
          "summary": "Exchanges List with data",
          "description": "This endpoint allows you to **query all the supported exchanges with exchanges’ data (id, name, country, .... etc) that have active trading volumes on CoinGecko**.",
          "operationId": "exchanges",
          "parameters": [
            {
              "name": "per_page",
              "in": "query",
              "description": "total results per page, default: 100 \u003Cbr\u003E Valid values: 1...250",
              "required": false,
              "schema": {
                "type": "integer"
              }
            },
            {
              "name": "page",
              "in": "query",
              "description": "page through results, default: 1",
              "required": false,
              "schema": {
                "type": "integer"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "List all exchanges",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Exchanges"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/exchanges/list": {
        "get": {
          "tags": [
            "Exchanges"
          ],
          "summary": "Exchanges List (ID Map)",
          "description": "This endpoint allows you to **query all the exchanges with id and name**.",
          "operationId": "exchanges-list",
          "responses": {
            "200": {
              "description": "List all exchanges with id and name",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExchangesList"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/exchanges/{id}": {
        "get": {
          "tags": [
            "Exchanges"
          ],
          "summary": "Exchange Data by ID",
          "description": "This endpoint allows you to **query exchange’s data (name, year established, country, .... etc), exchange volume in BTC and top 100 tickers based on exchange’s id**.",
          "operationId": "exchanges-id",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "exchange id \u003Cbr\u003E *refers to [`/exchanges/list`](/reference/exchanges-list).",
              "required": true,
              "schema": {
                "type": "string",
                "example": "binance"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get exchange volume in BTC and top 100 tickers only",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExchangeData"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/exchanges/{id}/tickers": {
        "get": {
          "tags": [
            "Exchanges"
          ],
          "summary": "Exchange Tickers by ID",
          "description": "This endpoint allows you to **query exchange's tickers based on exchange’s id**.",
          "operationId": "exchanges-id-tickers",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "exchange id \u003Cbr\u003E *refers to [`/exchanges/list`](/reference/exchanges-list).",
              "required": true,
              "schema": {
                "type": "string",
                "example": "binance"
              }
            },
            {
              "name": "coin_ids",
              "in": "query",
              "description": "filter tickers by coin_ids, comma-separated if querying more than 1 coin",
              "required": false,
              "schema": {
                "type": "string"
              },
              "examples": {
                "one value": {
                  "value": "bitcoin"
                },
                "multiple values": {
                  "value": "bitcoin,ethereum"
                }
              }
            },
            {
              "name": "include_exchange_logo",
              "in": "query",
              "description": "include exchange logo, default: false",
              "required": false,
              "schema": {
                "type": "boolean"
              }
            },
            {
              "name": "page",
              "in": "query",
              "description": "page through results",
              "required": false,
              "schema": {
                "type": "integer"
              }
            },
            {
              "name": "depth",
              "in": "query",
              "description": "include 2% orderbook depth (Example: cost_to_move_up_usd & cost_to_move_down_usd),default: false",
              "required": false,
              "schema": {
                "type": "boolean"
              }
            },
            {
              "name": "order",
              "in": "query",
              "description": "use this to sort the order of responses, default: trust_score_desc",
              "required": false,
              "schema": {
                "type": "string",
                "enum": [
                  "trust_score_desc",
                  "trust_score_asc",
                  "volume_desc",
                  "volume_asc"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get exchange tickers",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExchangeTickers"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/exchanges/{id}/volume_chart": {
        "get": {
          "tags": [
            "Exchanges"
          ],
          "summary": "Exchange Volume Chart by ID",
          "description": "This endpoint allows you to **query the historical volume chart data with time in UNIX and trading volume data in BTC based on exchange’s id**.",
          "operationId": "exchanges-id-volume-chart",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "exchange id or derivatives exchange id \u003Cbr\u003E *refers to [`/exchanges/list`](/reference/exchanges-list) or [`/derivatives/exchanges/list`](/reference/derivatives-exchanges-list).",
              "required": true,
              "schema": {
                "type": "string"
              },
              "examples": {
                "value-1": {
                  "value": "binance"
                },
                "value-2": {
                  "value": "binance_futures"
                }
              }
            },
            {
              "name": "days",
              "in": "query",
              "description": "data up to number of days ago",
              "required": true,
              "schema": {
                "type": "string",
                "enum": [
                  1,
                  7,
                  14,
                  30,
                  90,
                  180,
                  365
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get exchange volume chart data",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExchangeVolumeChart"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/derivatives": {
        "get": {
          "tags": [
            "Derivatives"
          ],
          "summary": "Derivatives Tickers List",
          "description": "This endpoint allows you to **query all the tickers from derivatives exchanges on CoinGecko**.",
          "operationId": "derivatives-tickers",
          "responses": {
            "200": {
              "description": "List all derivative tickers",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DerivativesTickersList"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/derivatives/exchanges": {
        "get": {
          "tags": [
            "Derivatives"
          ],
          "summary": "Derivatives Exchanges List with Data",
          "description": "This endpoint allows you to **query all the derivatives exchanges with related data (id, name, open interest, .... etc) on CoinGecko**.",
          "operationId": "derivatives-exchanges",
          "parameters": [
            {
              "name": "order",
              "in": "query",
              "description": "use this to sort the order of responses, default: open_interest_btc_desc",
              "required": false,
              "schema": {
                "type": "string",
                "enum": [
                  "name_asc",
                  "name_desc",
                  "open_interest_btc_asc",
                  "open_interest_btc_desc",
                  "trade_volume_24h_btc_asc",
                  "trade_volume_24h_btc_desc"
                ]
              }
            },
            {
              "name": "per_page",
              "in": "query",
              "description": "total results per page",
              "required": false,
              "schema": {
                "type": "integer"
              }
            },
            {
              "name": "page",
              "in": "query",
              "description": "page through results, default: 1",
              "required": false,
              "schema": {
                "type": "integer"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "List all derivative exchanges",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DerivativesExchanges"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/derivatives/exchanges/{id}": {
        "get": {
          "tags": [
            "Derivatives"
          ],
          "summary": "Derivatives Exchange Data by ID",
          "description": "This endpoint allows you to **query the derivatives exchange’s related data (id, name, open interest, .... etc) based on the exchanges’ id**.",
          "operationId": "derivatives-exchanges-id",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "derivative exchange id \u003Cbr\u003E *refers to [`/derivatives/exchanges/list`](/reference/derivatives-exchanges-list).",
              "required": true,
              "schema": {
                "type": "string",
                "example": "binance_futures"
              }
            },
            {
              "name": "include_tickers",
              "in": "query",
              "description": "include tickers data",
              "required": false,
              "schema": {
                "type": "string",
                "enum": [
                  "all",
                  "unexpired"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get derivative exchange data",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DerivativesExchangesID"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/derivatives/exchanges/list": {
        "get": {
          "tags": [
            "Derivatives"
          ],
          "summary": "Derivatives Exchanges List (ID Map)",
          "description": "This endpoint allows you to **query all the derivatives exchanges with id and name on CoinGecko**.",
          "operationId": "derivatives-exchanges-list",
          "responses": {
            "200": {
              "description": "List all derivative exchanges name and identifier",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DerivativesExchangesList"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/nfts/list": {
        "get": {
          "tags": [
            "NFTs (Beta)"
          ],
          "summary": "NFTs List (ID Map)",
          "description": "This endpoint allows you to **query all supported NFTs with id, contract address, name, asset platform id and symbol on CoinGecko**.",
          "operationId": "nfts-list",
          "parameters": [
            {
              "name": "order",
              "in": "query",
              "description": "use this to sort the order of responses",
              "required": false,
              "schema": {
                "type": "string",
                "enum": [
                  "h24_volume_usd_asc",
                  "h24_volume_usd_desc",
                  "h24_volume_native_asc",
                  "h24_volume_native_desc",
                  "floor_price_native_asc",
                  "floor_price_native_desc",
                  "market_cap_native_asc",
                  "market_cap_native_desc",
                  "market_cap_usd_asc",
                  "market_cap_usd_desc"
                ]
              }
            },
            {
              "name": "per_page",
              "in": "query",
              "description": "total results per page \u003Cbr\u003E Valid values: 1...250",
              "required": false,
              "schema": {
                "type": "integer"
              }
            },
            {
              "name": "page",
              "in": "query",
              "description": "page through results",
              "required": false,
              "schema": {
                "type": "integer"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "List all NFTs categories",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NFTList"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/nfts/{id}": {
        "get": {
          "tags": [
            "NFTs (Beta)"
          ],
          "summary": "NFTs Collection Data by ID",
          "description": "This endpoint allows you to **query all the NFT data (name, floor price, 24 hr volume....) based on the nft collection id**.",
          "operationId": "nfts-id",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "NFTs id \u003Cbr\u003E *refers to [`/nfts/list`](/reference/nfts-list).",
              "required": true,
              "schema": {
                "type": "string",
                "example": "pudgy-penguins"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get NFTs data",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NFTData"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/nfts/{asset_platform_id}/contract/{contract_address}": {
        "get": {
          "tags": [
            "NFTs (Beta)"
          ],
          "summary": "NFTs Collection Data by Contract Address",
          "description": "This endpoint allows you to **query all the NFT data (name, floor price, 24 hr volume....) based on the nft collection contract address and respective asset platform**.",
          "operationId": "nfts-contract-address",
          "parameters": [
            {
              "name": "asset_platform_id",
              "in": "path",
              "description": "asset platform id \u003Cbr\u003E *refers to [`/asset_platforms`](/reference/asset-platforms-list)",
              "required": true,
              "schema": {
                "type": "string",
                "example": "ethereum"
              }
            },
            {
              "name": "contract_address",
              "in": "path",
              "description": "the contract address of token",
              "required": true,
              "schema": {
                "type": "string",
                "example": "0xBd3531dA5CF5857e7CfAA92426877b022e612cf8"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get NFTs data",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NFTData"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/exchange_rates": {
        "get": {
          "tags": [
            "Exchange Rates"
          ],
          "summary": "BTC-to-Currency Exchange Rates",
          "description": "This endpoint allows you to **query BTC exchange rates with other currencies**.",
          "operationId": "exchange-rates",
          "responses": {
            "200": {
              "description": "List rates",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExchangeRates"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/search": {
        "get": {
          "tags": [
            "Search"
          ],
          "summary": "Search Queries",
          "description": "This endpoint allows you to **search for coins, categories and markets listed on CoinGecko**.",
          "operationId": "search-data",
          "parameters": [
            {
              "name": "query",
              "in": "query",
              "description": "search query",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "List of coins, categories and markets matching search term ordered by market cap",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Search"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/search/trending": {
        "get": {
          "tags": [
            "Trending"
          ],
          "summary": "Trending Search List",
          "description": "This endpoint allows you **query trending search coins, nfts and categories on CoinGecko in the last 24 hours**.",
          "operationId": "trending-search",
          "responses": {
            "200": {
              "description": "List trending coins by most popular first",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TrendingSearch"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/global": {
        "get": {
          "tags": [
            "Global"
          ],
          "summary": "Crypto Global Market Data",
          "description": "This endpoint allows you **query cryptocurrency global data including active cryptocurrencies, markets, total crypto market cap and etc**.",
          "operationId": "crypto-global",
          "responses": {
            "200": {
              "description": "Get cryptocurrency global data",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Global"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/global/decentralized_finance_defi": {
        "get": {
          "tags": [
            "Global"
          ],
          "summary": "Global De-Fi Market Data",
          "description": "This endpoint allows you **query top 100 cryptocurrency global decentralized finance (defi) data including defi market cap, trading volume**.",
          "operationId": "global-DeFi",
          "responses": {
            "200": {
              "description": "Get cryptocurrency global decentralized finance (defi) data",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/GlobalDeFi"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v3/companies/public_treasury/{coin_id}": {
        "get": {
          "tags": [
            "Companies (Beta)"
          ],
          "summary": "Public Companies Holdings",
          "description": "This endpoint allows you **query public companies’ bitcoin or ethereum holdings**.",
          "operationId": "companies-public-treasury",
          "parameters": [
            {
              "name": "coin_id",
              "in": "path",
              "description": "coin id",
              "required": true,
              "schema": {
                "type": "string",
                "enum": [
                  "bitcoin",
                  "ethereum"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Get public companies treasury data",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CompaniesTreasury"
                  }
                }
              }
            }
          }
        }
      }
    },
    "components": {
      "securitySchemes": {
        "apiKeyAuth": {
          "type": "apiKey",
          "in": "header",
          "name": "x-cg-demo-api-key"
        },
        "apiKeyQueryParam": {
          "type": "apiKey",
          "in": "query",
          "name": "x_cg_demo_api_key"
        }
      },
      "schemas": {
        "Ping": {
          "type": "object",
          "properties": {
            "gecko_says": {
              "type": "string",
              "example": "(V3) To the Moon!"
            }
          }
        },
        "SimplePrice": {
          "type": "object",
          "properties": {
            "usd": {
              "type": "number",
              "description": "price in USD"
            },
            "usd_market_cap": {
              "type": "number",
              "description": "market cap in USD"
            },
            "usd_24h_vol": {
              "type": "number",
              "description": "24h volume in USD"
            },
            "usd_24h_change": {
              "type": "number",
              "description": "24h change in USD"
            },
            "last_updated_at": {
              "type": "number",
              "description": "last updated timestamp"
            }
          },
          "example": {
            "usd": 67187.3358936566,
            "usd_market_cap": 1317802988326.25,
            "usd_24h_vol": 31260929299.5248,
            "usd_24h_change": 3.63727894677354,
            "last_updated_at": 1711356300
          }
        },
        "CurrencyList": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "example": [
            "btc",
            "eth",
            "ltc",
            "bch",
            "bnb",
            "eos",
            "xrp",
            "xlm",
            "link",
            "dot",
            "yfi",
            "usd",
            "aed",
            "ars",
            "aud",
            "bdt",
            "bhd",
            "bmd",
            "brl",
            "cad",
            "chf",
            "clp",
            "cny",
            "czk",
            "dkk",
            "eur",
            "gbp",
            "gel",
            "hkd",
            "huf",
            "idr",
            "ils",
            "inr",
            "jpy",
            "krw",
            "kwd",
            "lkr",
            "mmk",
            "mxn",
            "myr",
            "ngn",
            "nok",
            "nzd",
            "php",
            "pkr",
            "pln",
            "rub",
            "sar",
            "sek",
            "sgd",
            "thb",
            "try",
            "twd",
            "uah",
            "vef",
            "vnd",
            "zar",
            "xdr",
            "xag",
            "xau",
            "bits",
            "sats"
          ]
        },
        "CoinsList": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "coin id"
              },
              "symbol": {
                "type": "string",
                "description": "coin symbol"
              },
              "name": {
                "type": "string",
                "description": "coin name"
              },
              "platforms": {
                "type": "object",
                "description": "coin asset platform and contract address",
                "additionalProperties": {
                  "type": "string"
                }
              }
            }
          },
          "example": [
            {
              "id": "0chain",
              "symbol": "zcn",
              "name": "Zus",
              "platforms": {
                "ethereum": "0xb9ef770b6a5e12e45983c5d80545258aa38f3b78",
                "polygon-pos": "0x8bb30e0e67b11b978a5040144c410e1ccddcba30"
              }
            },
            {
              "id": "01coin",
              "symbol": "zoc",
              "name": "01coin",
              "platforms": {}
            }
          ]
        },
        "CoinsMarkets": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "coin id"
            },
            "symbol": {
              "type": "string",
              "description": "coin symbol"
            },
            "name": {
              "type": "string",
              "description": "coin name"
            },
            "image": {
              "type": "string",
              "description": "coin image url"
            },
            "current_price": {
              "type": "number",
              "description": "coin current price in currency"
            },
            "market_cap": {
              "type": "number",
              "description": "coin market cap in currency"
            },
            "market_cap_rank": {
              "type": "number",
              "description": "coin rank by market cap"
            },
            "fully_diluted_valuation": {
              "type": "number",
              "description": "coin fully diluted valuation (fdv) in currency"
            },
            "total_volume": {
              "type": "number",
              "description": "coin total trading volume in currency"
            },
            "high_24h": {
              "type": "number",
              "description": "coin 24h price high in currency"
            },
            "low_24h": {
              "type": "number",
              "description": "coin 24h price low in currency"
            },
            "price_change_24h": {
              "type": "number",
              "description": "coin 24h price change in currency"
            },
            "price_change_percentage_24h": {
              "type": "number",
              "description": "coin 24h price change in percentage"
            },
            "market_cap_change_24h": {
              "type": "number",
              "description": "coin 24h market cap change in currency"
            },
            "market_cap_change_percentage_24h": {
              "type": "number",
              "description": "coin 24h market cap change in percentage"
            },
            "circulating_supply": {
              "type": "number",
              "description": "coin circulating supply"
            },
            "total_supply": {
              "type": "number",
              "description": "coin total supply"
            },
            "max_supply": {
              "type": "number",
              "description": "coin max supply"
            },
            "ath": {
              "type": "number",
              "description": "coin all time high (ath) in currency"
            },
            "ath_change_percentage": {
              "type": "number",
              "description": "coin all time high (ath) change in percentage"
            },
            "ath_date": {
              "type": "string",
              "format": "date-time",
              "description": "coin all time high (ath) date"
            },
            "atl": {
              "type": "number",
              "description": "coin all time low (atl) in currency"
            },
            "atl_change_percentage": {
              "type": "number",
              "description": "coin all time low (atl) change in percentage"
            },
            "atl_date": {
              "type": "string",
              "format": "date-time",
              "description": "coin all time low (atl) date"
            },
            "roi": {
              "type": "string",
              "example": null
            },
            "last_updated": {
              "type": "string",
              "format": "date-time",
              "description": "coin last updated timestamp"
            },
            "price_change_percentage_1h": {
              "type": "number",
              "description": "coin 1h price change in percentage"
            },
            "sparkline_in_7d": {
              "type": "object",
              "description": "coin price sparkline in 7 days",
              "properties": {
                "price": {
                  "type": "array",
                  "items": {
                    "type": "number"
                  }
                }
              }
            }
          },
          "example": [
            {
              "id": "bitcoin",
              "symbol": "btc",
              "name": "Bitcoin",
              "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
              "current_price": 70187,
              "market_cap": 1381651251183,
              "market_cap_rank": 1,
              "fully_diluted_valuation": 1474623675796,
              "total_volume": 20154184933,
              "high_24h": 70215,
              "low_24h": 68060,
              "price_change_24h": 2126.88,
              "price_change_percentage_24h": 3.12502,
              "market_cap_change_24h": 44287678051,
              "market_cap_change_percentage_24h": 3.31157,
              "circulating_supply": 19675987,
              "total_supply": 21000000,
              "max_supply": 21000000,
              "ath": 73738,
              "ath_change_percentage": -4.77063,
              "ath_date": "2024-03-14T07:10:36.635Z",
              "atl": 67.81,
              "atl_change_percentage": 103455.83335,
              "atl_date": "2013-07-06T00:00:00.000Z",
              "roi": null,
              "last_updated": "2024-04-07T16:49:31.736Z"
            }
          ]
        },
        "CoinsDataBase": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "coin id"
            },
            "symbol": {
              "type": "string",
              "description": "coin symbol"
            },
            "name": {
              "type": "string",
              "description": "coin name"
            },
            "web_slug": {
              "type": "string",
              "description": "coin web slug"
            },
            "asset_platform_id": {
              "type": "string",
              "description": "coin asset platform id"
            },
            "platforms": {
              "type": "object",
              "description": "coin asset platform and contract address",
              "additionalProperties": {
                "type": "string"
              }
            },
            "detail_platforms": {
              "type": "object",
              "description": "detailed coin asset platform and contract address",
              "additionalProperties": {
                "type": "string"
              }
            },
            "block_time_in_minutes": {
              "type": "number",
              "description": "blockchain block time in minutes"
            },
            "hashing_algorithm": {
              "type": "string",
              "description": "blockchain hashing algorithm"
            },
            "categories": {
              "type": "array",
              "description": "coin categories",
              "items": {
                "type": "string"
              }
            },
            "preview_listing": {
              "type": "boolean",
              "description": "preview listing coin"
            },
            "public_notice": {
              "type": "string",
              "description": "public notice"
            },
            "additional_notices": {
              "type": "array",
              "description": "additional notices",
              "items": {
                "type": "string"
              }
            },
            "localization": {
              "type": "object",
              "description": "coin name localization",
              "additionalProperties": {
                "type": "string"
              }
            },
            "description": {
              "type": "object",
              "description": "coin description",
              "additionalProperties": {
                "type": "string"
              }
            },
            "links": {
              "type": "object",
              "description": "links",
              "properties": {
                "homepage": {
                  "type": "array",
                  "description": "coin website url",
                  "items": {
                    "type": "string"
                  }
                },
                "whitepaper": {
                  "type": "array",
                  "description": "coin whitepaper url",
                  "items": {
                    "type": "string"
                  }
                },
                "blockchain_site": {
                  "type": "array",
                  "description": "coin block explorer url",
                  "items": {
                    "type": "string"
                  }
                },
                "official_forum_url": {
                  "type": "array",
                  "description": "coin official forum url",
                  "items": {
                    "type": "string"
                  }
                },
                "chat_url": {
                  "type": "array",
                  "description": "coin chat url",
                  "items": {
                    "type": "string"
                  }
                },
                "announcement_url": {
                  "type": "array",
                  "description": "coin announcement url",
                  "items": {
                    "type": "string"
                  }
                },
                "twitter_screen_name": {
                  "type": "string",
                  "description": "coin twitter handle"
                },
                "facebook_username": {
                  "type": "string",
                  "description": "coin facebook username"
                },
                "bitcointalk_thread_identifier": {
                  "type": "string",
                  "description": "coin bitcointalk thread identifier"
                },
                "telegram_channel_identifier": {
                  "type": "string",
                  "description": "coin telegram channel identifier"
                },
                "subreddit_url": {
                  "type": "string",
                  "description": "coin subreddit url"
                },
                "repos_url": {
                  "type": "object",
                  "description": "coin repository url",
                  "properties": {
                    "github": {
                      "type": "array",
                      "description": "coin github repository url",
                      "items": {
                        "type": "string"
                      }
                    },
                    "bitbucket": {
                      "type": "array",
                      "description": "coin bitbucket repository url",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "image": {
              "type": "object",
              "description": "coin image url",
              "properties": {
                "thumb": {
                  "type": "string"
                },
                "small": {
                  "type": "string"
                },
                "large": {
                  "type": "string"
                }
              }
            },
            "country_origin": {
              "type": "string",
              "description": "coin country of origin"
            },
            "genesis_date": {
              "type": "string",
              "description": "coin genesis date",
              "format": "date-time"
            },
            "sentiment_votes_up_percentage": {
              "type": "number",
              "description": "coin sentiment votes up percentage"
            },
            "sentiment_votes_down_percentage": {
              "type": "number",
              "description": "coin sentiment votes down percentage"
            },
            "market_cap_rank": {
              "type": "number",
              "description": "coin rank by market cap"
            },
            "market_data": {
              "type": "object",
              "description": "coin market data",
              "properties": {
                "current_price": {
                  "type": "object",
                  "description": "coin current price in currency",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "total_value_locked": {
                  "type": "number",
                  "description": "total value locked"
                },
                "mcap_to_tvl_ratio": {
                  "type": "number",
                  "description": "market cap to total value locked ratio"
                },
                "fdv_to_tvl_ratio": {
                  "type": "number",
                  "description": "fully diluted valuation to total value locked ratio"
                },
                "roi": {
                  "type": "number",
                  "description": "coin return on investment"
                },
                "ath": {
                  "type": "object",
                  "description": "coin all time high (ath) in currency",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "ath_change_percentage": {
                  "type": "object",
                  "description": "coin all time high (ath) change in percentage",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "ath_date": {
                  "type": "object",
                  "description": "coin all time high (ath) date",
                  "properties": {
                    "btc": {
                      "type": "string"
                    },
                    "eur": {
                      "type": "string"
                    },
                    "usd": {
                      "type": "string"
                    }
                  }
                },
                "atl": {
                  "type": "object",
                  "description": "coin all time low (atl) in currency",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "atl_change_percentage": {
                  "type": "object",
                  "description": "coin all time low (atl) change in percentage",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "atl_date": {
                  "type": "object",
                  "description": "coin all time low (atl) date",
                  "properties": {
                    "btc": {
                      "type": "string"
                    },
                    "eur": {
                      "type": "string"
                    },
                    "usd": {
                      "type": "string"
                    }
                  }
                },
                "market_cap": {
                  "type": "object",
                  "description": "coin market cap in currency",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "market_cap_rank": {
                  "type": "number",
                  "description": "coin rank by market cap"
                },
                "fully_diluted_valuation": {
                  "type": "object",
                  "description": "coin fully diluted valuation (fdv) in currency",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "market_cap_fdv_ratio": {
                  "type": "number",
                  "description": "market cap to fully diluted valuation ratio"
                },
                "total_volume": {
                  "type": "object",
                  "description": "coin total trading volume in currency",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "high_24h": {
                  "type": "object",
                  "description": "coin 24h price high in currency",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "low_24h": {
                  "type": "object",
                  "description": "coin 24h price low in currency",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "price_change_24h": {
                  "type": "number",
                  "description": "coin 24h price change in currency"
                },
                "price_change_percentage_24h": {
                  "type": "number",
                  "description": "coin 24h price change in percentage"
                },
                "price_change_percentage_7d": {
                  "type": "number",
                  "description": "coin 7d price change in percentage"
                },
                "price_change_percentage_14d": {
                  "type": "number",
                  "description": "coin 14d price change in percentage"
                },
                "price_change_percentage_30d": {
                  "type": "number",
                  "description": "coin 30d price change in percentage"
                },
                "price_change_percentage_60d": {
                  "type": "number",
                  "description": "coin 60d price change in percentage"
                },
                "price_change_percentage_200d": {
                  "type": "number",
                  "description": "coin 200d price change in percentage"
                },
                "price_change_percentage_1y": {
                  "type": "number",
                  "description": "coin 1y price change in percentage"
                },
                "market_cap_change_24h": {
                  "type": "number",
                  "description": "coin 24h market cap change in currency"
                },
                "market_cap_change_percentage_24h": {
                  "type": "number",
                  "description": "coin 24h market cap change in percentage"
                },
                "price_change_percentage_1h_in_currency": {
                  "type": "object",
                  "description": "coin 1h price change in currency",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "price_change_percentage_24h_in_currency": {
                  "type": "object",
                  "description": "coin 24h price change in currency",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "price_change_percentage_7d_in_currency": {
                  "type": "object",
                  "description": "coin 7d price change in currency",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "price_change_percentage_14d_in_currency": {
                  "type": "object",
                  "description": "coin 14d price change in currency",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "price_change_percentage_30d_in_currency": {
                  "type": "object",
                  "description": "coin 30d price change in currency",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "price_change_percentage_60d_in_currency": {
                  "type": "object",
                  "description": "coin 60d price change in currency",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "price_change_percentage_200d_in_currency": {
                  "type": "object",
                  "description": "coin 200d price change in currency",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "price_change_percentage_1y_in_currency": {
                  "type": "object",
                  "description": "coin 1y price change in currency",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "market_cap_change_24h_in_currency": {
                  "type": "object",
                  "description": "coin 24h market cap change in currency",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "market_cap_change_percentage_24h_in_currency": {
                  "type": "object",
                  "description": "coin 24h market cap change in percentage",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "total_supply": {
                  "type": "number",
                  "description": "coin total supply"
                },
                "max_supply": {
                  "type": "number",
                  "description": "coin max supply"
                },
                "circulating_supply": {
                  "type": "number",
                  "description": "coin circulating supply"
                },
                "last_updated": {
                  "type": "string",
                  "description": "coin market data last updated timestamp",
                  "format": "date-time"
                }
              }
            },
            "community_data": {
              "type": "object",
              "description": "coin community data",
              "properties": {
                "facebook_likes": {
                  "type": "number",
                  "description": "coin facebook likes"
                },
                "twitter_followers": {
                  "type": "number",
                  "description": "coin twitter followers"
                },
                "reddit_average_posts_48h": {
                  "type": "number",
                  "description": "coin reddit average posts in 48 hours"
                },
                "reddit_average_comments_48h": {
                  "type": "number",
                  "description": "coin reddit average comments in 48 hours"
                },
                "reddit_subscribers": {
                  "type": "number",
                  "description": "coin reddit subscribers"
                },
                "reddit_accounts_active_48h": {
                  "type": "number",
                  "description": "coin reddit active accounts in 48 hours"
                },
                "telegram_channel_user_count": {
                  "type": "number",
                  "description": "coin telegram channel user count"
                }
              }
            },
            "developer_data": {
              "type": "object",
              "description": "coin developer data",
              "properties": {
                "forks": {
                  "type": "number",
                  "description": "coin repository forks"
                },
                "stars": {
                  "type": "number",
                  "description": "coin repository stars"
                },
                "subscribers": {
                  "type": "number",
                  "description": "coin repository subscribers"
                },
                "total_issues": {
                  "type": "number",
                  "description": "coin repository total issues"
                },
                "closed_issues": {
                  "type": "number",
                  "description": "coin repository closed issues"
                },
                "pull_requests_merged": {
                  "type": "number",
                  "description": "coin repository pull requests merged"
                },
                "pull_request_contributors": {
                  "type": "number",
                  "description": "coin repository pull request contributors"
                },
                "code_additions_deletions_4_weeks": {
                  "type": "object",
                  "description": "coin code additions and deletions in 4 weeks",
                  "properties": {
                    "additions": {
                      "type": "number"
                    },
                    "deletions": {
                      "type": "number"
                    }
                  }
                },
                "commit_count_4_weeks": {
                  "type": "number",
                  "description": "coin repository commit count in 4 weeks"
                },
                "last_4_weeks_commit_activity_series": {
                  "type": "array",
                  "description": "coin repository last 4 weeks commit activity series",
                  "items": {
                    "type": "number"
                  },
                  "example": []
                }
              }
            },
            "status_updates": {
              "type": "array",
              "description": "coin status updates",
              "items": {
                "type": "object"
              },
              "example": []
            },
            "last_updated": {
              "type": "string",
              "description": "coin last updated timestamp",
              "format": "date-time"
            },
            "tickers": {
              "type": "array",
              "description": "coin tickers",
              "items": {
                "type": "object",
                "properties": {
                  "base": {
                    "type": "string",
                    "description": "coin ticker base currency"
                  },
                  "target": {
                    "type": "string",
                    "description": "coin ticker target currency"
                  },
                  "market": {
                    "type": "object",
                    "description": "coin ticker exchange",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "coin ticker exchange name"
                      },
                      "identifier": {
                        "type": "string",
                        "description": "coin ticker exchange identifier"
                      },
                      "has_trading_incentive": {
                        "type": "boolean",
                        "description": "coin ticker exchange trading incentive"
                      }
                    }
                  },
                  "last": {
                    "type": "number",
                    "description": "coin ticker last price"
                  },
                  "volume": {
                    "type": "number",
                    "description": "coin ticker volume"
                  },
                  "converted_last": {
                    "type": "object",
                    "description": "coin ticker converted last price",
                    "properties": {
                      "btc": {
                        "type": "number"
                      },
                      "eth": {
                        "type": "number"
                      },
                      "usd": {
                        "type": "number"
                      }
                    }
                  },
                  "converted_volume": {
                    "type": "object",
                    "description": "coin ticker converted volume",
                    "properties": {
                      "btc": {
                        "type": "number"
                      },
                      "eth": {
                        "type": "number"
                      },
                      "usd": {
                        "type": "number"
                      }
                    }
                  },
                  "trust_score": {
                    "type": "string",
                    "description": "coin ticker trust score"
                  },
                  "bid_ask_spread_percentage": {
                    "type": "number",
                    "description": "coin ticker bid ask spread percentage"
                  },
                  "timestamp": {
                    "type": "string",
                    "description": "coin ticker timestamp",
                    "format": "date-time"
                  },
                  "last_traded_at": {
                    "type": "string",
                    "description": "coin ticker last traded timestamp",
                    "format": "date-time"
                  },
                  "last_fetch_at": {
                    "type": "string",
                    "description": "coin ticker last fetch timestamp",
                    "format": "date-time"
                  },
                  "is_anomaly": {
                    "type": "boolean",
                    "description": "coin ticker anomaly"
                  },
                  "is_stale": {
                    "type": "boolean",
                    "description": "coin ticker stale"
                  },
                  "trade_url": {
                    "type": "string",
                    "description": "coin ticker trade url"
                  },
                  "token_info_url": {
                    "type": "string",
                    "description": "coin ticker token info url"
                  },
                  "coin_id": {
                    "type": "string",
                    "description": "coin ticker base currency coin id"
                  },
                  "target_coin_id": {
                    "type": "string",
                    "description": "coin ticker target currency coin id"
                  }
                }
              }
            }
          }
        },
        "CoinsID": {
          "allOf": [
            {
              "$ref": "#/components/schemas/CoinsDataBase"
            },
            {
              "example": {
                "id": "bitcoin",
                "symbol": "btc",
                "name": "Bitcoin",
                "web_slug": "bitcoin",
                "asset_platform_id": null,
                "platforms": {
                  "": ""
                },
                "detail_platforms": {
                  "": {
                    "decimal_place": null,
                    "contract_address": ""
                  }
                },
                "block_time_in_minutes": 10,
                "hashing_algorithm": "SHA-256",
                "categories": [
                  "FTX Holdings",
                  "Cryptocurrency",
                  "Proof of Work (PoW)",
                  "Layer 1 (L1)"
                ],
                "preview_listing": false,
                "public_notice": null,
                "additional_notices": [],
                "localization": {
                  "en": "Bitcoin",
                  "de": "Bitcoin"
                },
                "description": {
                  "en": "Bitcoin is the first successful internet money based on peer-to-peer technology...\u003C/a\u003E.",
                  "de": ""
                },
                "links": {
                  "homepage": [
                    "http://www.bitcoin.org",
                    "",
                    ""
                  ],
                  "whitepaper": "https://bitcoin.org/bitcoin.pdf",
                  "blockchain_site": [
                    "https://mempool.space/",
                    "https://blockchair.com/bitcoin/",
                    "https://btc.com/",
                    "https://btc.tokenview.io/",
                    "https://www.oklink.com/btc",
                    "https://3xpl.com/bitcoin"
                  ],
                  "official_forum_url": [
                    "https://bitcointalk.org/"
                  ],
                  "chat_url": [
                    ""
                  ],
                  "announcement_url": [
                    "",
                    ""
                  ],
                  "twitter_screen_name": "bitcoin",
                  "facebook_username": "bitcoins",
                  "bitcointalk_thread_identifier": null,
                  "telegram_channel_identifier": "",
                  "subreddit_url": "https://www.reddit.com/r/Bitcoin/",
                  "repos_url": {
                    "github": [
                      "https://github.com/bitcoin/bitcoin",
                      "https://github.com/bitcoin/bips"
                    ],
                    "bitbucket": []
                  }
                },
                "image": {
                  "thumb": "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1696501400",
                  "small": "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1696501400",
                  "large": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
                },
                "country_origin": "",
                "genesis_date": "2009-01-03",
                "sentiment_votes_up_percentage": 84.07,
                "sentiment_votes_down_percentage": 15.93,
                "watchlist_portfolio_users": 1541900,
                "market_cap_rank": 1,
                "market_data": {
                  "current_price": {
                    "aed": 256486,
                    "ars": 60101017,
                    "aud": 106125,
                    "bch": 101.037,
                    "bdt": 7654380,
                    "bhd": 26296,
                    "bmd": 69840,
                    "bnb": 118.734,
                    "brl": 353813,
                    "btc": 1,
                    "cad": 94915,
                    "chf": 62987,
                    "clp": 65634817,
                    "cny": 505108,
                    "czk": 1631473,
                    "dkk": 480664,
                    "dot": 8003,
                    "eos": 67198,
                    "eth": 20.442233,
                    "eur": 64375,
                    "gbp": 55262,
                    "gel": 187170,
                    "hkd": 546840,
                    "huf": 25146606,
                    "idr": 1109593229,
                    "ils": 261823,
                    "inr": 5817429,
                    "jpy": 10588024,
                    "krw": 94372079,
                    "kwd": 21461,
                    "lkr": 20854981,
                    "ltc": 674.295,
                    "mmk": 146457199,
                    "mxn": 1149112,
                    "myr": 331563,
                    "ngn": 90416785,
                    "nok": 749336,
                    "nzd": 116128,
                    "php": 3952220,
                    "pkr": 19383322,
                    "pln": 275823,
                    "rub": 6460642,
                    "sar": 261970,
                    "sek": 745676,
                    "sgd": 94242,
                    "thb": 2557468,
                    "try": 2239859,
                    "twd": 2243679,
                    "uah": 2708502,
                    "usd": 69840,
                    "vef": 6993.03,
                    "vnd": 1743591863,
                    "xag": 2540.87,
                    "xau": 29.98,
                    "xdr": 52675,
                    "xlm": 535693,
                    "xrp": 116020,
                    "yfi": 8.26583,
                    "zar": 1305790,
                    "bits": 1000052,
                    "link": 3916,
                    "sats": 100005210
                  },
                  "total_value_locked": null,
                  "mcap_to_tvl_ratio": null,
                  "fdv_to_tvl_ratio": null,
                  "roi": null,
                  "ath": {
                    "aed": 270832,
                    "ars": 62658241,
                    "aud": 111440,
                    "bch": 270.677,
                    "bdt": 8091216,
                    "bhd": 27794,
                    "bmd": 73738,
                    "bnb": 143062,
                    "brl": 380542,
                    "btc": 1.003301,
                    "cad": 99381,
                    "chf": 64880,
                    "clp": 70749614,
                    "cny": 530375,
                    "czk": 1703814,
                    "dkk": 502620,
                    "dot": 8268,
                    "eos": 75439,
                    "eth": 624.203,
                    "eur": 67405,
                    "gbp": 57639,
                    "gel": 195419,
                    "hkd": 576788,
                    "huf": 26873106,
                    "idr": 1149293683,
                    "ils": 270420,
                    "inr": 6110932,
                    "jpy": 10906158,
                    "krw": 97195531,
                    "kwd": 22651,
                    "lkr": 22592284,
                    "ltc": 838.013,
                    "mmk": 154750684,
                    "mxn": 1409247,
                    "myr": 345647,
                    "ngn": 118524884,
                    "nok": 774448,
                    "nzd": 119747,
                    "php": 4084271,
                    "pkr": 20569197,
                    "pln": 288843,
                    "rub": 6746469,
                    "sar": 276540,
                    "sek": 763870,
                    "sgd": 98281,
                    "thb": 2631375,
                    "try": 2368817,
                    "twd": 2323593,
                    "uah": 2856689,
                    "usd": 73738,
                    "vef": 8618768857,
                    "vnd": 1820914622,
                    "xag": 3040.05,
                    "xau": 37.72,
                    "xdr": 55169,
                    "xlm": 537001,
                    "xrp": 159288,
                    "yfi": 11.593182,
                    "zar": 1375794,
                    "bits": 1058236,
                    "link": 74906,
                    "sats": 105823579
                  },
                  "ath_change_percentage": {
                    "aed": -5.3443,
                    "ars": -4.12899,
                    "aud": -4.81671,
                    "bch": -62.70063,
                    "bdt": -5.446,
                    "bhd": -5.43846,
                    "bmd": -5.33399,
                    "bnb": -99.91712,
                    "brl": -7.07012,
                    "btc": -0.32896,
                    "cad": -4.54134,
                    "chf": -2.96515,
                    "clp": -7.27563,
                    "cny": -4.81148,
                    "czk": -4.29355,
                    "dkk": -4.41598,
                    "dot": -3.24639,
                    "eos": -10.92349,
                    "eth": -96.72547,
                    "eur": -4.54383,
                    "gbp": -4.17282,
                    "gel": -4.26868,
                    "hkd": -5.23935,
                    "huf": -6.47124,
                    "idr": -3.50241,
                    "ils": -3.22723,
                    "inr": -4.85033,
                    "jpy": -2.96536,
                    "krw": -2.95327,
                    "kwd": -5.29762,
                    "lkr": -7.73578,
                    "ltc": -19.61923,
                    "mmk": -5.40639,
                    "mxn": -18.49977,
                    "myr": -4.12226,
                    "ngn": -23.75292,
                    "nok": -3.29075,
                    "nzd": -3.07003,
                    "php": -3.28134,
                    "pkr": -5.81223,
                    "pln": -4.555,
                    "rub": -4.28437,
                    "sar": -5.31571,
                    "sek": -2.43041,
                    "sgd": -4.15659,
                    "thb": -2.84813,
                    "try": -5.49105,
                    "twd": -3.48732,
                    "uah": -5.23456,
                    "usd": -5.33399,
                    "vef": -99.99992,
                    "vnd": -4.29405,
                    "xag": -16.46173,
                    "xau": -20.56234,
                    "xdr": -4.56861,
                    "xlm": -0.28826,
                    "xrp": -27.20875,
                    "yfi": -28.63949,
                    "zar": -5.13555,
                    "bits": -5.51121,
                    "link": -94.77369,
                    "sats": -5.51121
                  },
                  "ath_date": {
                    "aed": "2024-03-14T07:10:36.635Z",
                    "ars": "2024-03-14T07:10:36.635Z",
                    "aud": "2024-03-14T07:10:36.635Z",
                    "bch": "2023-06-10T04:30:21.139Z",
                    "bdt": "2024-03-14T07:10:36.635Z",
                    "bhd": "2024-03-14T07:10:36.635Z",
                    "bmd": "2024-03-14T07:10:36.635Z",
                    "bnb": "2017-10-19T00:00:00.000Z",
                    "brl": "2021-11-09T04:09:45.771Z",
                    "btc": "2019-10-15T16:00:56.136Z",
                    "cad": "2024-03-14T07:10:36.635Z",
                    "chf": "2024-03-14T07:10:36.635Z",
                    "clp": "2024-03-13T09:15:27.924Z",
                    "cny": "2024-03-14T07:10:36.635Z",
                    "czk": "2024-03-13T09:15:27.924Z",
                    "dkk": "2024-03-14T07:10:36.635Z",
                    "dot": "2023-10-27T11:45:24.509Z",
                    "eos": "2024-02-28T19:15:25.279Z",
                    "eth": "2015-10-20T00:00:00.000Z",
                    "eur": "2024-03-14T07:10:36.635Z",
                    "gbp": "2024-03-14T07:10:36.635Z",
                    "gel": "2024-03-13T09:15:27.924Z",
                    "hkd": "2024-03-14T07:10:36.635Z",
                    "huf": "2024-03-13T08:35:34.668Z",
                    "idr": "2024-03-14T07:10:36.635Z",
                    "ils": "2024-03-13T09:15:27.924Z",
                    "inr": "2024-03-14T07:10:36.635Z",
                    "jpy": "2024-03-14T07:10:36.635Z",
                    "krw": "2024-03-14T07:10:36.635Z",
                    "kwd": "2024-03-14T07:10:36.635Z",
                    "lkr": "2024-03-13T09:15:27.924Z",
                    "ltc": "2024-02-29T00:00:22.489Z",
                    "mmk": "2024-03-14T07:10:36.635Z",
                    "mxn": "2021-11-10T17:30:22.767Z",
                    "myr": "2024-03-14T07:10:36.635Z",
                    "ngn": "2024-03-14T07:10:36.635Z",
                    "nok": "2024-03-28T15:54:20.286Z",
                    "nzd": "2024-03-14T07:10:36.635Z",
                    "php": "2024-03-14T07:10:36.635Z",
                    "pkr": "2024-03-14T07:10:36.635Z",
                    "pln": "2024-03-13T09:15:27.924Z",
                    "rub": "2024-03-13T09:15:27.924Z",
                    "sar": "2024-03-14T07:10:36.635Z",
                    "sek": "2024-03-28T15:54:20.286Z",
                    "sgd": "2024-03-14T07:10:36.635Z",
                    "thb": "2024-03-14T07:10:36.635Z",
                    "try": "2024-03-14T07:10:36.635Z",
                    "twd": "2024-03-14T07:10:36.635Z",
                    "uah": "2024-03-14T07:10:36.635Z",
                    "usd": "2024-03-14T07:10:36.635Z",
                    "vef": "2021-01-03T12:04:17.372Z",
                    "vnd": "2024-03-14T07:10:36.635Z",
                    "xag": "2024-03-13T09:15:27.924Z",
                    "xau": "2021-10-20T14:54:17.702Z",
                    "xdr": "2024-03-14T07:10:36.635Z",
                    "xlm": "2024-04-05T14:55:25.346Z",
                    "xrp": "2021-01-03T07:54:40.240Z",
                    "yfi": "2020-07-18T00:00:00.000Z",
                    "zar": "2024-03-13T08:35:34.668Z",
                    "bits": "2021-05-19T16:00:11.072Z",
                    "link": "2017-12-12T00:00:00.000Z",
                    "sats": "2021-05-19T16:00:11.072Z"
                  },
                  "atl": {
                    "aed": 632.31,
                    "ars": 1478.98,
                    "aud": 72.61,
                    "bch": 3.513889,
                    "bdt": 9390.25,
                    "bhd": 45.91,
                    "bmd": 121.77,
                    "bnb": 52.17,
                    "brl": 149.66,
                    "btc": 0.99895134,
                    "cad": 69.81,
                    "chf": 63.26,
                    "clp": 107408,
                    "cny": 407.23,
                    "czk": 4101.56,
                    "dkk": 382.47,
                    "dot": 991.882,
                    "eos": 908.141,
                    "eth": 6.779735,
                    "eur": 51.3,
                    "gbp": 43.9,
                    "gel": 102272,
                    "hkd": 514.37,
                    "huf": 46598,
                    "idr": 658780,
                    "ils": 672.18,
                    "inr": 3993.42,
                    "jpy": 6641.83,
                    "krw": 75594,
                    "kwd": 50.61,
                    "lkr": 22646,
                    "ltc": 20.707835,
                    "mmk": 117588,
                    "mxn": 859.32,
                    "myr": 211.18,
                    "ngn": 10932.64,
                    "nok": 1316.03,
                    "nzd": 84.85,
                    "php": 2880.5,
                    "pkr": 17315.84,
                    "pln": 220.11,
                    "rub": 2206.43,
                    "sar": 646.04,
                    "sek": 443.81,
                    "sgd": 84.47,
                    "thb": 5644.35,
                    "try": 392.91,
                    "twd": 1998.66,
                    "uah": 553.37,
                    "usd": 67.81,
                    "vef": 766.19,
                    "vnd": 3672339,
                    "xag": 3.37,
                    "xau": 0.0531,
                    "xdr": 44.39,
                    "xlm": 21608,
                    "xrp": 9908,
                    "yfi": 0.23958075,
                    "zar": 666.26,
                    "bits": 950993,
                    "link": 598.477,
                    "sats": 95099268
                  },
                  "atl_change_percentage": {
                    "aed": 40442.82926,
                    "ars": 4061564.29196,
                    "aud": 145985.53685,
                    "bch": 2773.19359,
                    "bdt": 81373.49215,
                    "bhd": 57143.90568,
                    "bmd": 57225.093,
                    "bnb": 127.27323,
                    "brl": 236196.11798,
                    "btc": 0.10498,
                    "cad": 135801.62362,
                    "chf": 99417.44606,
                    "clp": 60977.3943,
                    "cny": 123874.61253,
                    "czk": 39657.09407,
                    "dkk": 125511.8351,
                    "dot": 706.52927,
                    "eos": 7299.58622,
                    "eth": 201.48197,
                    "eur": 125328.10816,
                    "gbp": 125711.45858,
                    "gel": 82.92154,
                    "hkd": 106158.65018,
                    "huf": 53838.06593,
                    "idr": 168247.6589,
                    "ils": 38831.75624,
                    "inr": 145502.84316,
                    "jpy": 159234.82917,
                    "krw": 124678.86396,
                    "kwd": 42283.41435,
                    "lkr": 91944.16346,
                    "ltc": 3152.88112,
                    "mmk": 124389.16372,
                    "mxn": 133557.04262,
                    "myr": 156829.82413,
                    "ngn": 826523.19382,
                    "nok": 56810.95735,
                    "nzd": 136687.9495,
                    "php": 137037.59668,
                    "pkr": 111784.05742,
                    "pln": 125148.29877,
                    "rub": 292563.53634,
                    "sar": 40430.01145,
                    "sek": 167834.96358,
                    "sgd": 111419.10013,
                    "thb": 45191.86432,
                    "try": 569686.31466,
                    "twd": 112103.5277,
                    "uah": 489114.07977,
                    "usd": 102843.21661,
                    "vef": 812.24836,
                    "vnd": 47355.40698,
                    "xag": 75265.86287,
                    "xau": 56322.23251,
                    "xdr": 118501.14541,
                    "xlm": 2377.99795,
                    "xrp": 1070.24619,
                    "yfi": 3353.09619,
                    "zar": 195789.1259,
                    "bits": 5.14426,
                    "link": 554.13234,
                    "sats": 5.14426
                  },
                  "atl_date": {
                    "aed": "2015-01-14T00:00:00.000Z",
                    "ars": "2015-01-14T00:00:00.000Z",
                    "aud": "2013-07-05T00:00:00.000Z",
                    "bch": "2017-08-02T00:00:00.000Z",
                    "bdt": "2013-09-08T00:00:00.000Z",
                    "bhd": "2013-09-08T00:00:00.000Z",
                    "bmd": "2013-09-08T00:00:00.000Z",
                    "bnb": "2022-11-27T02:35:06.345Z",
                    "brl": "2013-07-05T00:00:00.000Z",
                    "btc": "2019-10-21T00:00:00.000Z",
                    "cad": "2013-07-05T00:00:00.000Z",
                    "chf": "2013-07-05T00:00:00.000Z",
                    "clp": "2015-01-14T00:00:00.000Z",
                    "cny": "2013-07-05T00:00:00.000Z",
                    "czk": "2015-01-14T00:00:00.000Z",
                    "dkk": "2013-07-05T00:00:00.000Z",
                    "dot": "2021-05-19T11:04:48.978Z",
                    "eos": "2019-04-11T00:00:00.000Z",
                    "eth": "2017-06-12T00:00:00.000Z",
                    "eur": "2013-07-05T00:00:00.000Z",
                    "gbp": "2013-07-05T00:00:00.000Z",
                    "gel": "2024-01-23T14:25:15.024Z",
                    "hkd": "2013-07-05T00:00:00.000Z",
                    "huf": "2015-01-14T00:00:00.000Z",
                    "idr": "2013-07-05T00:00:00.000Z",
                    "ils": "2015-01-14T00:00:00.000Z",
                    "inr": "2013-07-05T00:00:00.000Z",
                    "jpy": "2013-07-05T00:00:00.000Z",
                    "krw": "2013-07-05T00:00:00.000Z",
                    "kwd": "2015-01-14T00:00:00.000Z",
                    "lkr": "2015-01-14T00:00:00.000Z",
                    "ltc": "2013-11-28T00:00:00.000Z",
                    "mmk": "2013-09-08T00:00:00.000Z",
                    "mxn": "2013-07-05T00:00:00.000Z",
                    "myr": "2013-07-05T00:00:00.000Z",
                    "ngn": "2013-07-06T00:00:00.000Z",
                    "nok": "2015-01-14T00:00:00.000Z",
                    "nzd": "2013-07-05T00:00:00.000Z",
                    "php": "2013-07-05T00:00:00.000Z",
                    "pkr": "2015-01-14T00:00:00.000Z",
                    "pln": "2013-07-05T00:00:00.000Z",
                    "rub": "2013-07-05T00:00:00.000Z",
                    "sar": "2015-01-14T00:00:00.000Z",
                    "sek": "2013-07-05T00:00:00.000Z",
                    "sgd": "2013-07-05T00:00:00.000Z",
                    "thb": "2015-01-14T00:00:00.000Z",
                    "try": "2015-01-14T00:00:00.000Z",
                    "twd": "2013-07-05T00:00:00.000Z",
                    "uah": "2013-07-06T00:00:00.000Z",
                    "usd": "2013-07-06T00:00:00.000Z",
                    "vef": "2013-09-08T00:00:00.000Z",
                    "vnd": "2015-01-14T00:00:00.000Z",
                    "xag": "2013-07-05T00:00:00.000Z",
                    "xau": "2013-07-05T00:00:00.000Z",
                    "xdr": "2013-07-05T00:00:00.000Z",
                    "xlm": "2018-11-20T00:00:00.000Z",
                    "xrp": "2018-12-25T00:00:00.000Z",
                    "yfi": "2020-09-12T20:09:36.122Z",
                    "zar": "2013-07-05T00:00:00.000Z",
                    "bits": "2021-05-19T13:14:13.071Z",
                    "link": "2020-08-16T08:13:13.338Z",
                    "sats": "2021-05-19T13:14:13.071Z"
                  },
                  "market_cap": {
                    "aed": 5044349996337,
                    "ars": 1182017295722237,
                    "aud": 2087172780649,
                    "bch": 1986604073,
                    "bdt": 150540041661005,
                    "bhd": 517160909155,
                    "bmd": 1373546629363,
                    "bnb": 2333049418,
                    "brl": 6958510843551,
                    "btc": 19675962,
                    "cad": 1866718546636,
                    "chf": 1238778354730,
                    "clp": 1290851512827267,
                    "cny": 9934038642207,
                    "czk": 32086461325915,
                    "dkk": 9453297321930,
                    "dot": 157412240859,
                    "eos": 1322267381223,
                    "eth": 402191019,
                    "eur": 1266067979162,
                    "gbp": 1086838000136,
                    "gel": 3681104966694,
                    "hkd": 10754801430583,
                    "huf": 494562736251106,
                    "idr": 21822565460666156,
                    "ils": 5149327418126,
                    "inr": 114412401493056,
                    "jpy": 208236536744617,
                    "krw": 1856032293423643,
                    "kwd": 422084011470,
                    "lkr": 410158574706701,
                    "ltc": 13254435191,
                    "mmk": 2880399528953928,
                    "mxn": 22599786820891,
                    "myr": 6520912622902,
                    "ngn": 1778242826145352,
                    "nok": 14737331205090,
                    "nzd": 2283915479199,
                    "php": 77729005129214,
                    "pkr": 381215202879850,
                    "pln": 5424667201901,
                    "rub": 127062592882616,
                    "sar": 5152210492501,
                    "sek": 14665336758512,
                    "sgd": 1853480304222,
                    "thb": 50302813076307,
                    "try": 44051702097171,
                    "twd": 44126833724250,
                    "uah": 53268594188081,
                    "usd": 1373546629363,
                    "vef": 137533223998,
                    "vnd": 34291528259212664,
                    "xag": 49971714167,
                    "xau": 589526213,
                    "xdr": 1035967327171,
                    "xlm": 10536093423024,
                    "xrp": 2281501497578,
                    "yfi": 162786702,
                    "zar": 25681201329205,
                    "bits": 19675287134375,
                    "link": 77032061026,
                    "sats": 1967528713437466
                  },
                  "market_cap_rank": 1,
                  "fully_diluted_valuation": {
                    "aed": 5383795207730,
                    "ars": 1261557793726526,
                    "aud": 2227623147149,
                    "bch": 2120286953,
                    "bdt": 160670206360487,
                    "bhd": 551961784245,
                    "bmd": 1465975550097,
                    "bnb": 2490045354,
                    "brl": 7426764074589,
                    "btc": 21000000,
                    "cad": 1992334071359,
                    "chf": 1322138427048,
                    "clp": 1377715700476175,
                    "cny": 10602521568518,
                    "czk": 34245628642920,
                    "dkk": 10089430125984,
                    "dot": 168004850693,
                    "eos": 1411245610542,
                    "eth": 429255322,
                    "eur": 1351264429277,
                    "gbp": 1159973677672,
                    "gel": 3928814474259,
                    "hkd": 11478515258478,
                    "huf": 527842931454799,
                    "idr": 23291053046046200,
                    "ils": 5495836787072,
                    "inr": 122111459218826,
                    "jpy": 222249223272385,
                    "krw": 1980928717076020,
                    "kwd": 450486956667,
                    "lkr": 437759031494405,
                    "ltc": 14146354776,
                    "mmk": 3074227837400402,
                    "mxn": 24120575311068,
                    "myr": 6959718924083,
                    "ngn": 1897904628452341,
                    "nok": 15729038067206,
                    "nzd": 2437605087018,
                    "php": 82959557845939,
                    "pkr": 406867997634721,
                    "pln": 5789704779869,
                    "rub": 135612909322296,
                    "sar": 5498913869752,
                    "sek": 15652198958747,
                    "sgd": 1978204999007,
                    "thb": 53687798065601,
                    "try": 47016036320897,
                    "twd": 47096223717511,
                    "uah": 56853152997027,
                    "usd": 1465975550097,
                    "vef": 146788131831,
                    "vnd": 36599079295003010,
                    "xag": 53334418795,
                    "xau": 629196706,
                    "xdr": 1105679807198,
                    "xlm": 11245089916493,
                    "xrp": 2435028663358,
                    "yfi": 173740971,
                    "zar": 27409344860155,
                    "bits": 20999279721208,
                    "link": 82215714868,
                    "sats": 2099927972120845
                  },
                  "market_cap_fdv_ratio": 0.94,
                  "total_volume": {
                    "aed": 69289828750,
                    "ars": 16236338885995,
                    "aud": 28669668966,
                    "bch": 27295348,
                    "bdt": 2067837028414,
                    "bhd": 7103787576,
                    "bmd": 18867210007,
                    "bnb": 32076161,
                    "brl": 95582983943,
                    "btc": 270165,
                    "cad": 25641481760,
                    "chf": 17016015963,
                    "clp": 17731299440045,
                    "cny": 136455209653,
                    "czk": 440743685922,
                    "dkk": 129851686151,
                    "dot": 2162066884,
                    "eos": 18153530120,
                    "eth": 5522486,
                    "eur": 17390869691,
                    "gbp": 14928944059,
                    "gel": 50564122818,
                    "hkd": 147729310993,
                    "huf": 6793376218113,
                    "idr": 299757515785497,
                    "ils": 70731811876,
                    "inr": 1571583199438,
                    "jpy": 2860363373081,
                    "krw": 25494694035728,
                    "kwd": 5797799299,
                    "lkr": 5633989993239,
                    "ltc": 182161234,
                    "mmk": 39565531780634,
                    "mxn": 310433526568,
                    "myr": 89572079507,
                    "ngn": 24426168086859,
                    "nok": 202433843047,
                    "nzd": 31372151526,
                    "php": 1067695433152,
                    "pkr": 5236420181710,
                    "pln": 74513913927,
                    "rub": 1745347826332,
                    "sar": 70771414150,
                    "sek": 201444918234,
                    "sgd": 25459639590,
                    "thb": 690902117814,
                    "try": 605099744600,
                    "twd": 606131762120,
                    "uah": 731704138635,
                    "usd": 18867210007,
                    "vef": 1889173738,
                    "vnd": 471032763860750,
                    "xag": 686417778,
                    "xau": 8097807,
                    "xdr": 14230178069,
                    "xlm": 144717803495,
                    "xrp": 31342816365,
                    "yfi": 2233021,
                    "zar": 352760225497,
                    "bits": 270164889303,
                    "link": 1057914120,
                    "sats": 27016488930277
                  },
                  "high_24h": {
                    "aed": 256358,
                    "ars": 60071088,
                    "aud": 106072,
                    "bch": 102.537,
                    "bdt": 7650568,
                    "bhd": 26283,
                    "bmd": 69805,
                    "bnb": 118.567,
                    "brl": 353637,
                    "btc": 1,
                    "cad": 94868,
                    "chf": 62956,
                    "clp": 66187195,
                    "cny": 504856,
                    "czk": 1630660,
                    "dkk": 480424,
                    "dot": 8141,
                    "eos": 67970,
                    "eth": 20.57645,
                    "eur": 64343,
                    "gbp": 55234,
                    "gel": 187077,
                    "hkd": 546568,
                    "huf": 25134084,
                    "idr": 1109040667,
                    "ils": 262324,
                    "inr": 5814532,
                    "jpy": 10582752,
                    "krw": 94325083,
                    "kwd": 21451,
                    "lkr": 20844595,
                    "ltc": 686.328,
                    "mmk": 146384265,
                    "mxn": 1148540,
                    "myr": 331398,
                    "ngn": 90371758,
                    "nok": 748963,
                    "nzd": 116070,
                    "php": 3950252,
                    "pkr": 19373669,
                    "pln": 275686,
                    "rub": 6457425,
                    "sar": 261840,
                    "sek": 745304,
                    "sgd": 94195,
                    "thb": 2556430,
                    "try": 2238744,
                    "twd": 2242562,
                    "uah": 2707176,
                    "usd": 69805,
                    "vef": 6989.55,
                    "vnd": 1742723579,
                    "xag": 2539.6,
                    "xau": 29.96,
                    "xdr": 52649,
                    "xlm": 535821,
                    "xrp": 116769,
                    "yfi": 8.288502,
                    "zar": 1305140,
                    "bits": 1000789,
                    "link": 3939,
                    "sats": 100078943
                  },
                  "low_24h": {
                    "aed": 249660,
                    "ars": 58504819,
                    "aud": 103306,
                    "bch": 97.04,
                    "bdt": 7451091,
                    "bhd": 25629,
                    "bmd": 67985,
                    "bnb": 116.219,
                    "brl": 344417,
                    "btc": 1,
                    "cad": 92395,
                    "chf": 61314,
                    "clp": 64548078,
                    "cny": 491693,
                    "czk": 1588143,
                    "dkk": 467898,
                    "dot": 7966,
                    "eos": 67100,
                    "eth": 20.329576,
                    "eur": 62695,
                    "gbp": 53794,
                    "gel": 182199,
                    "hkd": 532317,
                    "huf": 24479763,
                    "idr": 1080124001,
                    "ils": 255828,
                    "inr": 5662926,
                    "jpy": 10306821,
                    "krw": 91865690,
                    "kwd": 20907,
                    "lkr": 20301102,
                    "ltc": 658.587,
                    "mmk": 142567503,
                    "mxn": 1118593,
                    "myr": 322757,
                    "ngn": 88015443,
                    "nok": 729435,
                    "nzd": 113044,
                    "php": 3847255,
                    "pkr": 18868528,
                    "pln": 268498,
                    "rub": 6289057,
                    "sar": 255012,
                    "sek": 725872,
                    "sgd": 91739,
                    "thb": 2489545,
                    "try": 2180372,
                    "twd": 2184090,
                    "uah": 2640133,
                    "usd": 67985,
                    "vef": 6807.31,
                    "vnd": 1697284528,
                    "xag": 2473.7,
                    "xau": 29.18,
                    "xdr": 51276,
                    "xlm": 527507,
                    "xrp": 114692,
                    "yfi": 8.145597,
                    "zar": 1271110,
                    "bits": 998301,
                    "link": 3876,
                    "sats": 99830137
                  },
                  "price_change_24h": 1619,
                  "price_change_percentage_24h": 2.37311,
                  "price_change_percentage_7d": -0.89706,
                  "price_change_percentage_14d": 6.36178,
                  "price_change_percentage_30d": 1.81171,
                  "price_change_percentage_60d": 62.54292,
                  "price_change_percentage_200d": 157.51875,
                  "price_change_percentage_1y": 149.76989,
                  "market_cap_change_24h": 31172487848,
                  "market_cap_change_percentage_24h": 2.32219,
                  "price_change_24h_in_currency": {
                    "aed": 5959.23,
                    "ars": 1393199,
                    "aud": 2460.07,
                    "bch": 3.534891,
                    "bdt": 177436,
                    "bhd": 577.56,
                    "bmd": 1618.95,
                    "bnb": 2.285661,
                    "brl": 8194.23,
                    "btc": 0,
                    "cad": 2200.23,
                    "chf": 1460.1,
                    "clp": 862771,
                    "cny": 11708.88,
                    "czk": 37819,
                    "dkk": 11142.25,
                    "dot": -101.381414573122,
                    "eos": -453.474871022743,
                    "eth": 0.07028827,
                    "eur": 1461.64,
                    "gbp": 1281.02,
                    "gel": 4338.78,
                    "hkd": 12676.28,
                    "huf": 581904,
                    "idr": 25721436,
                    "ils": 5107.95,
                    "inr": 134854,
                    "jpy": 245441,
                    "krw": 2187635,
                    "kwd": 482.08,
                    "lkr": 483438,
                    "ltc": 2.77923,
                    "mmk": 3395019,
                    "mxn": 26638,
                    "myr": 7685.95,
                    "ngn": 2095948,
                    "nok": 17370.34,
                    "nzd": 2691.97,
                    "php": 91616,
                    "pkr": 449324,
                    "pln": 6393.85,
                    "rub": 149764,
                    "sar": 6072.72,
                    "sek": 17285.48,
                    "sgd": 2184.63,
                    "thb": 59054,
                    "try": 51922,
                    "twd": 52011,
                    "uah": 59208,
                    "usd": 1618.95,
                    "vef": 162.11,
                    "vnd": 40418134,
                    "xag": 58.58,
                    "xau": 0.694852,
                    "xdr": 1221.06,
                    "xlm": 7524,
                    "xrp": 1297,
                    "yfi": 0.09822297,
                    "zar": 30269,
                    "bits": -224.590808065841,
                    "link": 17.641171,
                    "sats": -22459.0808065832
                  },
                  "price_change_percentage_1h_in_currency": {
                    "aed": 0.79523,
                    "ars": 0.79523,
                    "aud": 0.79523,
                    "bch": -0.34316,
                    "bdt": 0.79523,
                    "bhd": 0.79523,
                    "bmd": 0.79523,
                    "bnb": 0.73128,
                    "brl": 0.79523,
                    "btc": 0,
                    "cad": 0.79523,
                    "chf": 0.79523,
                    "clp": 0.79523,
                    "cny": 0.79523,
                    "czk": 0.79523,
                    "dkk": 0.79523,
                    "dot": 0.45742,
                    "eos": 0.11659,
                    "eth": 0.29371,
                    "eur": 0.79523,
                    "gbp": 0.79523,
                    "gel": 0.79523,
                    "hkd": 0.79523,
                    "huf": 0.79523,
                    "idr": 0.79523,
                    "ils": 0.79523,
                    "inr": 0.79523,
                    "jpy": 0.79523,
                    "krw": 0.79523,
                    "kwd": 0.79523,
                    "lkr": 0.79523,
                    "ltc": 0.45938,
                    "mmk": 0.79523,
                    "mxn": 0.79523,
                    "myr": 0.79523,
                    "ngn": 0.79523,
                    "nok": 0.79523,
                    "nzd": 0.79523,
                    "php": 0.79523,
                    "pkr": 0.79523,
                    "pln": 0.79523,
                    "rub": 0.79523,
                    "sar": 0.79523,
                    "sek": 0.79523,
                    "sgd": 0.79523,
                    "thb": 0.79523,
                    "try": 0.79523,
                    "twd": 0.79523,
                    "uah": 0.79523,
                    "usd": 0.79523,
                    "vef": 0.79523,
                    "vnd": 0.79523,
                    "xag": 0.79523,
                    "xau": 0.79523,
                    "xdr": 0.79523,
                    "xlm": 0.46737,
                    "xrp": 0.21199,
                    "yfi": 0.40314,
                    "zar": 0.79523,
                    "bits": 0.01957,
                    "link": 0.25425,
                    "sats": 0.01957
                  },
                  "price_change_percentage_24h_in_currency": {
                    "aed": 2.37868,
                    "ars": 2.37311,
                    "aud": 2.37311,
                    "bch": 3.62543,
                    "bdt": 2.37311,
                    "bhd": 2.24575,
                    "bmd": 2.37311,
                    "bnb": 1.96281,
                    "brl": 2.37088,
                    "btc": 0,
                    "cad": 2.37311,
                    "chf": 2.37311,
                    "clp": 1.33201,
                    "cny": 2.37311,
                    "czk": 2.37311,
                    "dkk": 2.37311,
                    "dot": -1.25092,
                    "eos": -0.67031,
                    "eth": 0.34502,
                    "eur": 2.32326,
                    "gbp": 2.37311,
                    "gel": 2.37311,
                    "hkd": 2.37311,
                    "huf": 2.36886,
                    "idr": 2.37311,
                    "ils": 1.98973,
                    "inr": 2.37311,
                    "jpy": 2.37311,
                    "krw": 2.37311,
                    "kwd": 2.29787,
                    "lkr": 2.37311,
                    "ltc": 0.41387,
                    "mmk": 2.37311,
                    "mxn": 2.37311,
                    "myr": 2.37311,
                    "ngn": 2.37311,
                    "nok": 2.37311,
                    "nzd": 2.37311,
                    "php": 2.37311,
                    "pkr": 2.37311,
                    "pln": 2.37311,
                    "rub": 2.37311,
                    "sar": 2.37311,
                    "sek": 2.37311,
                    "sgd": 2.37311,
                    "thb": 2.36367,
                    "try": 2.37311,
                    "twd": 2.37311,
                    "uah": 2.23487,
                    "usd": 2.37311,
                    "vef": 2.37311,
                    "vnd": 2.37311,
                    "xag": 2.36011,
                    "xau": 2.37311,
                    "xdr": 2.37311,
                    "xlm": 1.42449,
                    "xrp": 1.13046,
                    "yfi": 1.20259,
                    "zar": 2.37311,
                    "bits": -0.02245,
                    "link": 0.45253,
                    "sats": -0.02245
                  },
                  "price_change_percentage_7d_in_currency": {
                    "aed": -0.89166,
                    "ars": -0.41663,
                    "aud": -1.82918,
                    "bch": -13.96058,
                    "bdt": -0.90215,
                    "bhd": -0.8989,
                    "bmd": -0.89706,
                    "bnb": 1.66265,
                    "brl": 0.10856,
                    "btc": 0,
                    "cad": -0.30286,
                    "chf": -0.92167,
                    "clp": -4.88316,
                    "cny": -0.73648,
                    "czk": -1.01147,
                    "dkk": -1.31146,
                    "dot": 8.73147,
                    "eos": 3.97603,
                    "eth": 5.02614,
                    "eur": -1.34295,
                    "gbp": -0.99115,
                    "gel": -1.44865,
                    "hkd": -0.85781,
                    "huf": -2.21353,
                    "idr": -0.84932,
                    "ils": 0.95798,
                    "inr": -0.9996,
                    "jpy": -0.72681,
                    "krw": -0.53121,
                    "kwd": -1.0275,
                    "lkr": -1.37268,
                    "ltc": -1.9574,
                    "mmk": -0.90435,
                    "mxn": -1.54035,
                    "myr": -0.41458,
                    "ngn": -9.7099,
                    "nok": -1.70145,
                    "nzd": -1.67154,
                    "php": -0.14626,
                    "pkr": -0.91223,
                    "pln": -1.60677,
                    "rub": -0.98873,
                    "sar": -0.99419,
                    "sek": -0.71587,
                    "sgd": -0.90352,
                    "thb": -0.06592,
                    "try": -1.84067,
                    "twd": -0.32213,
                    "uah": -1.88837,
                    "usd": -0.89706,
                    "vef": -0.89706,
                    "vnd": -0.27848,
                    "xag": -9.98743,
                    "xau": -5.02192,
                    "xdr": -0.91177,
                    "xlm": 6.61686,
                    "xrp": 3.16315,
                    "yfi": 5.71456,
                    "zar": -2.05684,
                    "bits": 0.02215,
                    "link": 5.90056,
                    "sats": 0.02215
                  },
                  "price_change_percentage_14d_in_currency": {
                    "aed": 6.36468,
                    "ars": 7.62764,
                    "aud": 5.31182,
                    "bch": -25.91989,
                    "bdt": 6.68827,
                    "bhd": 6.69162,
                    "bmd": 6.36178,
                    "bnb": 1.46403,
                    "brl": 7.71597,
                    "btc": 0,
                    "cad": 6.08857,
                    "chf": 6.82824,
                    "clp": 2.31636,
                    "cny": 6.4177,
                    "czk": 5.93731,
                    "dkk": 6.07665,
                    "dot": 12.40791,
                    "eos": 5.82118,
                    "eth": 5.80038,
                    "eur": 6.5039,
                    "gbp": 6.05031,
                    "gel": 5.57392,
                    "hkd": 6.43519,
                    "huf": 4.7128,
                    "idr": 6.8568,
                    "ils": 10.27746,
                    "inr": 5.98418,
                    "jpy": 6.49452,
                    "krw": 6.8894,
                    "kwd": 6.70068,
                    "lkr": 5.14896,
                    "ltc": -7.92047,
                    "mmk": 6.6872,
                    "mxn": 4.37933,
                    "myr": 6.58629,
                    "ngn": -6.00376,
                    "nok": 6.09677,
                    "nzd": 6.04342,
                    "php": 6.74187,
                    "pkr": 6.24188,
                    "pln": 5.07157,
                    "rub": 6.79116,
                    "sar": 6.37792,
                    "sek": 7.45968,
                    "sgd": 6.40216,
                    "thb": 7.49095,
                    "try": 6.57512,
                    "twd": 6.93095,
                    "uah": 6.19437,
                    "usd": 6.36178,
                    "vef": 6.36178,
                    "vnd": 7.19828,
                    "xag": -4.48857,
                    "xau": -1.13809,
                    "xdr": 7.20309,
                    "xlm": 9.9438,
                    "xrp": 11.77176,
                    "yfi": 10.21361,
                    "zar": 4.34586,
                    "bits": -0.02852,
                    "link": 9.37223,
                    "sats": -0.02852
                  },
                  "price_change_percentage_30d_in_currency": {
                    "aed": 1.80131,
                    "ars": 3.47061,
                    "aud": 2.82162,
                    "bch": -35.37088,
                    "bdt": 1.63722,
                    "bhd": 1.73227,
                    "bmd": 1.81171,
                    "bnb": -15.53057,
                    "brl": 3.5967,
                    "btc": 0,
                    "cad": 2.87945,
                    "chf": 4.89308,
                    "clp": -0.48666,
                    "cny": 2.42634,
                    "czk": 2.96806,
                    "dkk": 3.00706,
                    "dot": 22.83783,
                    "eos": 18.29569,
                    "eth": 18.92784,
                    "eur": 2.83013,
                    "gbp": 3.74764,
                    "gel": 2.77039,
                    "hkd": 1.94072,
                    "huf": 2.08084,
                    "idr": 4.29426,
                    "ils": 6.85419,
                    "inr": 2.50897,
                    "jpy": 5.0599,
                    "krw": 4.57992,
                    "kwd": 1.87967,
                    "lkr": -1.15101,
                    "ltc": -12.77597,
                    "mmk": 1.63914,
                    "mxn": -0.15299,
                    "myr": 3.16992,
                    "ngn": -17.32686,
                    "nok": 5.4363,
                    "nzd": 5.0099,
                    "php": 3.903,
                    "pkr": 1.17516,
                    "pln": 2.4522,
                    "rub": 3.55407,
                    "sar": 1.82069,
                    "sek": 6.75837,
                    "sgd": 3.33041,
                    "thb": 5.30478,
                    "try": 2.1467,
                    "twd": 4.30686,
                    "uah": 3.27772,
                    "usd": 1.81171,
                    "vef": 1.81171,
                    "vnd": 3.09533,
                    "xag": -9.77751,
                    "xau": -5.14135,
                    "xdr": 1.84317,
                    "xlm": 11.15527,
                    "xrp": 6.50705,
                    "yfi": 23.46259,
                    "zar": 1.89813,
                    "bits": -0.02265,
                    "link": 14.62051,
                    "sats": -0.02265
                  },
                  "price_change_percentage_60d_in_currency": {
                    "aed": 62.52079,
                    "ars": 68.49534,
                    "aud": 61.24883,
                    "bch": -44.8098,
                    "bdt": 62.29903,
                    "bhd": 62.40144,
                    "bmd": 62.54292,
                    "bnb": -16.39202,
                    "brl": 66.0864,
                    "btc": 0,
                    "cad": 63.97521,
                    "chf": 68.29363,
                    "clp": 61.2721,
                    "cny": 65.23422,
                    "czk": 63.80596,
                    "dkk": 61.56947,
                    "dot": 26.0847,
                    "eos": 10.37906,
                    "eth": 12.50622,
                    "eur": 61.38212,
                    "gbp": 62.42981,
                    "gel": 63.76505,
                    "hkd": 62.75244,
                    "huf": 62.4079,
                    "idr": 65.01922,
                    "ils": 66.94187,
                    "inr": 63.16883,
                    "jpy": 66.72771,
                    "krw": 65.59561,
                    "kwd": 62.24883,
                    "lkr": 54.91707,
                    "ltc": 6.3924,
                    "mmk": 62.29068,
                    "mxn": 56.90677,
                    "myr": 62.08202,
                    "ngn": 132.52365,
                    "nok": 65.05927,
                    "nzd": 65.29302,
                    "php": 64.2393,
                    "pkr": 61.57507,
                    "pln": 59.13217,
                    "rub": 64.79837,
                    "sar": 62.57863,
                    "sek": 65.78273,
                    "sgd": 63.33903,
                    "thb": 67.45274,
                    "try": 70.42176,
                    "twd": 66.59551,
                    "uah": 67.64284,
                    "usd": 62.54292,
                    "vef": 62.54292,
                    "vnd": 66.13415,
                    "xag": 32.44006,
                    "xau": 42.47319,
                    "xdr": 63.37863,
                    "xlm": 33.38585,
                    "xrp": 35.4398,
                    "yfi": 36.85809,
                    "zar": 60.80928,
                    "bits": 0.13558,
                    "link": 66.10863,
                    "sats": 0.13558
                  },
                  "price_change_percentage_200d_in_currency": {
                    "aed": 157.48965,
                    "ars": 533.19881,
                    "aud": 154.23364,
                    "bch": -20.16461,
                    "bdt": 157.04146,
                    "bhd": 157.21748,
                    "bmd": 157.51875,
                    "bnb": -5.52744,
                    "brl": 169.16444,
                    "btc": 0,
                    "cad": 160.97855,
                    "chf": 159.61726,
                    "clp": 174.18169,
                    "cny": 155.55765,
                    "czk": 164.35382,
                    "dkk": 154.91918,
                    "dot": 21.03753,
                    "eos": 42.21076,
                    "eth": 22.61904,
                    "eur": 154.4458,
                    "gbp": 152.64976,
                    "gel": 159.94359,
                    "hkd": 157.7274,
                    "huf": 159.07837,
                    "idr": 166.90318,
                    "ils": 153.56218,
                    "inr": 158.52148,
                    "jpy": 164.33473,
                    "krw": 162.47218,
                    "kwd": 156.39154,
                    "lkr": 137.08111,
                    "ltc": 60.35493,
                    "mmk": 157.0352,
                    "mxn": 148.66541,
                    "myr": 160.92631,
                    "ngn": 332.54541,
                    "nok": 158.13744,
                    "nzd": 155.74033,
                    "php": 157.17789,
                    "pkr": 142.12534,
                    "pln": 135.71774,
                    "rub": 146.34596,
                    "sar": 157.51161,
                    "sek": 148.66991,
                    "sgd": 155.31508,
                    "thb": 162.39997,
                    "try": 205.45834,
                    "twd": 158.70005,
                    "uah": 170.28814,
                    "usd": 157.51875,
                    "vef": 157.51875,
                    "vnd": 164.68719,
                    "xag": 120.19781,
                    "xau": 114.86178,
                    "xdr": 155.99343,
                    "xlm": 131.81435,
                    "xrp": 120.4662,
                    "yfi": 63.86988,
                    "zar": 156.75149,
                    "bits": 0.02219,
                    "link": -0.5252,
                    "sats": 0.02219
                  },
                  "price_change_percentage_1y_in_currency": {
                    "aed": 149.76342,
                    "ars": 918.48078,
                    "aud": 153.02623,
                    "bch": -55.00057,
                    "bdt": 158.55689,
                    "bhd": 149.48099,
                    "bmd": 149.76989,
                    "bnb": 32.16065,
                    "brl": 150.21395,
                    "btc": 0,
                    "cad": 151.37854,
                    "chf": 149.08881,
                    "clp": 186.85016,
                    "cny": 162.93404,
                    "czk": 172.73872,
                    "dkk": 151.74569,
                    "dot": 77.81743,
                    "eos": 189.38331,
                    "eth": 36.04481,
                    "eur": 151.24505,
                    "gbp": 145.45339,
                    "gel": 161.98955,
                    "hkd": 149.13908,
                    "huf": 162.43986,
                    "idr": 165.57753,
                    "ils": 160.02964,
                    "inr": 154.26772,
                    "jpy": 186.58707,
                    "krw": 156.50303,
                    "kwd": 150.00989,
                    "lkr": 133.21724,
                    "ltc": 118.6392,
                    "mmk": 149.38012,
                    "mxn": 126.42375,
                    "myr": 169.31241,
                    "ngn": 595.40015,
                    "nok": 155.49727,
                    "nzd": 159.6773,
                    "php": 159.23882,
                    "pkr": 144.08919,
                    "pln": 130.26176,
                    "rub": 183.32862,
                    "sar": 149.71177,
                    "sek": 155.08011,
                    "sgd": 153.18696,
                    "thb": 167.64911,
                    "try": 315.99563,
                    "twd": 163.65767,
                    "uah": 163.439,
                    "usd": 149.76989,
                    "vef": 149.76989,
                    "vnd": 165.95155,
                    "xag": 126.88434,
                    "xau": 115.23759,
                    "xdr": 153.62831,
                    "xlm": 101.61978,
                    "xrp": 111.0342,
                    "yfi": 154.60738,
                    "zar": 155.9813,
                    "bits": -0.01588,
                    "link": 0.86473,
                    "sats": -0.01588
                  },
                  "market_cap_change_24h_in_currency": {
                    "aed": 114749436450,
                    "ars": 26825750942361,
                    "aud": 47368153909,
                    "bch": 69161133,
                    "bdt": 3416489487138,
                    "bhd": 11107335790,
                    "bmd": 31172487848,
                    "bnb": 41317088,
                    "brl": 157774967806,
                    "btc": 1056,
                    "cad": 42364969610,
                    "chf": 28113936858,
                    "clp": 16334384165594,
                    "cny": 225451901112,
                    "czk": 728198667875,
                    "dkk": 214541530365,
                    "dot": -2223308137.69214,
                    "eos": -9335080122.21558,
                    "eth": 1227657,
                    "eur": 28130545857,
                    "gbp": 24665667425,
                    "gel": 83542267433,
                    "hkd": 244079021225,
                    "huf": 11204011309642,
                    "idr": 495260693806920,
                    "ils": 97946676121,
                    "inr": 2596576715314,
                    "jpy": 4725905020195,
                    "krw": 42122446282765,
                    "kwd": 9275773097,
                    "lkr": 9308503193460,
                    "ltc": 44795350,
                    "mmk": 65370346658935,
                    "mxn": 512899646056,
                    "myr": 147991386058,
                    "ngn": 40357022982533,
                    "nok": 334462091116,
                    "nzd": 51833207551,
                    "php": 1764051118490,
                    "pkr": 8651636591873,
                    "pln": 123112218265,
                    "rub": 2883671400660,
                    "sar": 116928843575,
                    "sek": 332828185166,
                    "sgd": 42064529172,
                    "thb": 1146147255705,
                    "try": 999748475189,
                    "twd": 1001453579102,
                    "uah": 1138534742295,
                    "usd": 31172487848,
                    "vef": 3121301208,
                    "vnd": 778242416455044,
                    "xag": 1127900722,
                    "xau": 13379232,
                    "xdr": 23511163165,
                    "xlm": 144914539677,
                    "xrp": 23423602590,
                    "yfi": 2166750,
                    "zar": 582832005294,
                    "bits": -9798136889.14453,
                    "link": 276398708,
                    "sats": -979813688914.25
                  },
                  "market_cap_change_percentage_24h_in_currency": {
                    "aed": 2.32776,
                    "ars": 2.32219,
                    "aud": 2.32219,
                    "bch": 3.60695,
                    "bdt": 2.32219,
                    "bhd": 2.19489,
                    "bmd": 2.32219,
                    "bnb": 1.80288,
                    "brl": 2.31997,
                    "btc": 0.00537,
                    "cad": 2.32219,
                    "chf": 2.32219,
                    "clp": 1.28161,
                    "cny": 2.32219,
                    "czk": 2.32219,
                    "dkk": 2.32219,
                    "dot": -1.39274,
                    "eos": -0.70104,
                    "eth": 0.30618,
                    "eur": 2.27237,
                    "gbp": 2.32219,
                    "gel": 2.32219,
                    "hkd": 2.32219,
                    "huf": 2.31795,
                    "idr": 2.32219,
                    "ils": 1.93901,
                    "inr": 2.32219,
                    "jpy": 2.32219,
                    "krw": 2.32219,
                    "kwd": 2.24699,
                    "lkr": 2.32219,
                    "ltc": 0.33911,
                    "mmk": 2.32219,
                    "mxn": 2.32219,
                    "myr": 2.32219,
                    "ngn": 2.32219,
                    "nok": 2.32219,
                    "nzd": 2.32219,
                    "php": 2.32219,
                    "pkr": 2.32219,
                    "pln": 2.32219,
                    "rub": 2.32219,
                    "sar": 2.32219,
                    "sek": 2.32219,
                    "sgd": 2.32219,
                    "thb": 2.33162,
                    "try": 2.32219,
                    "twd": 2.32219,
                    "uah": 2.18403,
                    "usd": 2.32219,
                    "vef": 2.32219,
                    "vnd": 2.32219,
                    "xag": 2.3092,
                    "xau": 2.32219,
                    "xdr": 2.32219,
                    "xlm": 1.39459,
                    "xrp": 1.03732,
                    "yfi": 1.34899,
                    "zar": 2.32219,
                    "bits": -0.04977,
                    "link": 0.3601,
                    "sats": -0.04977
                  },
                  "total_supply": 21000000,
                  "max_supply": 21000000,
                  "circulating_supply": 19675962,
                  "last_updated": "2024-04-07T15:24:51.021Z"
                },
                "community_data": {
                  "facebook_likes": null,
                  "twitter_followers": 6585597,
                  "reddit_average_posts_48h": 0,
                  "reddit_average_comments_48h": 0,
                  "reddit_subscribers": 0,
                  "reddit_accounts_active_48h": 0,
                  "telegram_channel_user_count": null
                },
                "developer_data": {
                  "forks": 36426,
                  "stars": 73168,
                  "subscribers": 3967,
                  "total_issues": 7743,
                  "closed_issues": 7380,
                  "pull_requests_merged": 11215,
                  "pull_request_contributors": 846,
                  "code_additions_deletions_4_weeks": {
                    "additions": 1570,
                    "deletions": -1948
                  },
                  "commit_count_4_weeks": 108,
                  "last_4_weeks_commit_activity_series": []
                },
                "status_updates": [],
                "last_updated": "2024-04-07T15:24:51.021Z",
                "tickers": [
                  {
                    "base": "BTC",
                    "target": "USDT",
                    "market": {
                      "name": "Binance",
                      "identifier": "binance",
                      "has_trading_incentive": false
                    },
                    "last": 69816,
                    "volume": 19988.82111,
                    "converted_last": {
                      "btc": 0.99999255,
                      "eth": 20.441016,
                      "usd": 69835
                    },
                    "converted_volume": {
                      "btc": 19783,
                      "eth": 404380,
                      "usd": 1381537193
                    },
                    "trust_score": "green",
                    "bid_ask_spread_percentage": 0.010014,
                    "timestamp": "2024-04-07T15:23:02+00:00",
                    "last_traded_at": "2024-04-07T15:23:02+00:00",
                    "last_fetch_at": "2024-04-07T15:24:00+00:00",
                    "is_anomaly": false,
                    "is_stale": false,
                    "trade_url": "https://www.binance.com/en/trade/BTC_USDT?ref=37754157",
                    "token_info_url": null,
                    "coin_id": "bitcoin",
                    "target_coin_id": "tether"
                  }
                ]
              }
            }
          ]
        },
        "CoinsTickers": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "coin name"
            },
            "tickers": {
              "type": "array",
              "description": "list of tickers",
              "items": {
                "type": "object",
                "properties": {
                  "base": {
                    "type": "string",
                    "description": "coin ticker base currency"
                  },
                  "target": {
                    "type": "string",
                    "description": "coin ticker target currency"
                  },
                  "market": {
                    "type": "object",
                    "description": "coin ticker exchange",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "exchange name"
                      },
                      "identifier": {
                        "type": "string",
                        "description": "exchange identifier"
                      },
                      "has_trading_incentive": {
                        "type": "boolean",
                        "description": "exchange trading incentive"
                      },
                      "logo": {
                        "type": "string",
                        "description": "exchange image url"
                      }
                    },
                    "required": [
                      "name",
                      "identifier",
                      "has_trading_incentive"
                    ]
                  },
                  "last": {
                    "type": "number",
                    "description": "coin ticker last price"
                  },
                  "volume": {
                    "type": "number",
                    "description": "coin ticker volume"
                  },
                  "cost_to_move_up_usd": {
                    "type": "number",
                    "description": "coin ticker cost to move up in usd"
                  },
                  "cost_to_move_down_usd": {
                    "type": "number",
                    "description": "coin ticker cost to move down in usd"
                  },
                  "converted_last": {
                    "type": "object",
                    "description": "coin ticker converted last price",
                    "properties": {
                      "btc": {
                        "type": "number"
                      },
                      "eth": {
                        "type": "number"
                      },
                      "usd": {
                        "type": "number"
                      }
                    }
                  },
                  "converted_volume": {
                    "type": "object",
                    "description": "coin ticker converted volume",
                    "properties": {
                      "btc": {
                        "type": "number"
                      },
                      "eth": {
                        "type": "number"
                      },
                      "usd": {
                        "type": "number"
                      }
                    }
                  },
                  "trust_score": {
                    "type": "string",
                    "description": "coin ticker trust score"
                  },
                  "bid_ask_spread_percentage": {
                    "type": "number",
                    "description": "coin ticker bid ask spread percentage"
                  },
                  "timestamp": {
                    "type": "string",
                    "description": "coin ticker timestamp"
                  },
                  "last_traded_at": {
                    "type": "string",
                    "description": "coin ticker last traded timestamp"
                  },
                  "last_fetch_at": {
                    "type": "string",
                    "description": "coin ticker last fetch timestamp"
                  },
                  "is_anomaly": {
                    "type": "boolean",
                    "description": "coin ticker anomaly"
                  },
                  "is_stale": {
                    "type": "boolean",
                    "description": "coin ticker stale"
                  },
                  "trade_url": {
                    "type": "string",
                    "description": "coin ticker trade url"
                  },
                  "token_info_url": {
                    "type": "string",
                    "description": "coin ticker token info url",
                    "nullable": true
                  },
                  "coin_id": {
                    "type": "string",
                    "description": "coin ticker base currency coin id"
                  },
                  "target_coin_id": {
                    "type": "string",
                    "description": "coin ticker target currency coin id"
                  }
                }
              }
            }
          },
          "example": {
            "name": "Bitcoin",
            "tickers": [
              {
                "base": "BTC",
                "target": "USDT",
                "market": {
                  "name": "Binance",
                  "identifier": "binance",
                  "has_trading_incentive": false,
                  "logo": "https://assets.coingecko.com/markets/images/52/small/binance.jpg?1706864274"
                },
                "last": 69476,
                "volume": 20242.03975,
                "cost_to_move_up_usd": 19320706.3958517,
                "cost_to_move_down_usd": 16360235.3694131,
                "converted_last": {
                  "btc": 1.000205,
                  "eth": 20.291404,
                  "usd": 69498
                },
                "converted_volume": {
                  "btc": 20249,
                  "eth": 410802,
                  "usd": 1406996874
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.010014,
                "timestamp": "2024-04-08T04:02:01+00:00",
                "last_traded_at": "2024-04-08T04:02:01+00:00",
                "last_fetch_at": "2024-04-08T04:03:00+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.binance.com/en/trade/BTC_USDT?ref=37754157",
                "token_info_url": null,
                "coin_id": "bitcoin",
                "target_coin_id": "tether"
              }
            ]
          }
        },
        "CoinsHistoricalData": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "coin id"
            },
            "symbol": {
              "type": "string",
              "description": "coin symbol"
            },
            "name": {
              "type": "string",
              "description": "coin name"
            },
            "localization": {
              "type": "object",
              "description": "coin localization",
              "additionalProperties": {
                "type": "string"
              }
            },
            "image": {
              "type": "object",
              "description": "coin image url",
              "properties": {
                "thumb": {
                  "type": "string"
                },
                "small": {
                  "type": "string"
                }
              }
            },
            "market_data": {
              "type": "object",
              "description": "coin market data",
              "properties": {
                "current_price": {
                  "type": "object",
                  "description": "coin current price",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "market_cap": {
                  "type": "object",
                  "description": "coin market cap",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                },
                "total_volume": {
                  "type": "object",
                  "description": "coin total volume",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eur": {
                      "type": "number"
                    },
                    "usd": {
                      "type": "number"
                    }
                  }
                }
              }
            },
            "community_data": {
              "type": "object",
              "description": "coin community data",
              "properties": {
                "facebook_likes": {
                  "type": "number",
                  "description": "coin facebook likes"
                },
                "twitter_followers": {
                  "type": "number",
                  "description": "coin twitter followers"
                },
                "reddit_average_posts_48h": {
                  "type": "number",
                  "description": "coin reddit average posts 48h"
                },
                "reddit_average_comments_48h": {
                  "type": "number",
                  "description": "coin reddit average comments 48h"
                },
                "reddit_subscribers": {
                  "type": "number",
                  "description": "coin reddit subscribers"
                },
                "reddit_accounts_active_48h": {
                  "type": "number",
                  "description": "coin reddit accounts active 48h"
                }
              }
            },
            "developer_data": {
              "type": "object",
              "description": "coin developer data",
              "properties": {
                "forks": {
                  "type": "number",
                  "description": "coin repository forks"
                },
                "stars": {
                  "type": "number",
                  "description": "coin repository stars"
                },
                "subscribers": {
                  "type": "number",
                  "description": "coin repository subscribers"
                },
                "total_issues": {
                  "type": "number",
                  "description": "coin repository total issues"
                },
                "closed_issues": {
                  "type": "number",
                  "description": "coin repository closed issues"
                },
                "pull_requests_merged": {
                  "type": "number",
                  "description": "coin repository pull requests merged"
                },
                "pull_request_contributors": {
                  "type": "number",
                  "description": "coin repository pull request contributors"
                },
                "code_additions_deletions_4_weeks": {
                  "type": "object",
                  "description": "coin code additions deletions 4 weeks",
                  "properties": {
                    "additions": {
                      "type": "number"
                    },
                    "deletions": {
                      "type": "number"
                    }
                  }
                },
                "commit_count_4_weeks": {
                  "type": "number",
                  "description": "coin commit count 4 weeks"
                }
              }
            },
            "public_interest_stats": {
              "type": "object",
              "description": "coin public interest stats",
              "properties": {
                "alexa_rank": {
                  "type": "number",
                  "description": "coin alexa rank"
                },
                "bing_matches": {
                  "type": "number",
                  "description": "coin bing matches"
                }
              }
            }
          },
          "example": {
            "id": "bitcoin",
            "symbol": "btc",
            "name": "Bitcoin",
            "localization": {
              "en": "Bitcoin",
              "de": "Bitcoin",
              "es": "Bitcoin",
              "fr": "Bitcoin",
              "it": "Bitcoin",
              "pl": "Bitcoin",
              "ro": "Bitcoin",
              "hu": "Bitcoin",
              "nl": "Bitcoin",
              "pt": "Bitcoin",
              "sv": "Bitcoin",
              "vi": "Bitcoin",
              "tr": "Bitcoin",
              "ru": "Биткоин",
              "ja": "ビットコイン",
              "zh": "比特币",
              "zh-tw": "比特幣",
              "ko": "비트코인",
              "ar": "بيتكوين",
              "th": "บิตคอยน์",
              "id": "Bitcoin",
              "cs": "Bitcoin",
              "da": "Bitcoin",
              "el": "Bitcoin",
              "hi": "Bitcoin",
              "no": "Bitcoin",
              "sk": "Bitcoin",
              "uk": "Bitcoin",
              "he": "Bitcoin",
              "fi": "Bitcoin",
              "bg": "Bitcoin",
              "hr": "Bitcoin",
              "lt": "Bitcoin",
              "sl": "Bitcoin"
            },
            "image": {
              "thumb": "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1696501400",
              "small": "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1696501400"
            },
            "market_data": {
              "current_price": {
                "aed": 154530.091081427,
                "ars": 33947900.261883,
                "aud": 61738.4056950475,
                "bch": 165.381674946306,
                "bdt": 4617857.43751472,
                "bhd": 15859.4297419179,
                "bmd": 42074.7071561885,
                "bnb": 134.15687497174,
                "brl": 204167.474400698,
                "btc": 1,
                "cad": 55797.3728951794,
                "chf": 35380.4108741032,
                "clp": 37070945.9743491,
                "cny": 297872.096782952,
                "czk": 941726.6142466,
                "dkk": 284202.024427907,
                "dot": 5078.18455042231,
                "eos": 49611.9119761598,
                "eth": 18.2965432154039,
                "eur": 38057.7086398657,
                "gbp": 33025.6578133999,
                "gel": 113180.962250147,
                "hkd": 328622.396508053,
                "huf": 14607917.5775571,
                "idr": 647533950.604456,
                "ils": 151504.709263362,
                "inr": 3501412.9510955,
                "jpy": 5933586.69083973,
                "krw": 54466970.6549007,
                "kwd": 12928.7160149536,
                "lkr": 13628686.3687709,
                "ltc": 573.662179787236,
                "mmk": 88364275.7448308,
                "mxn": 714058.270089106,
                "myr": 193333.279382686,
                "ngn": 37725865.4245248,
                "nok": 429848.167317426,
                "nzd": 66531.8087825235,
                "php": 2330938.69230343,
                "pkr": 11705926.3598065,
                "pln": 165640.548626626,
                "rub": 3755167.36124159,
                "sar": 157780.151835706,
                "sek": 423808.006507498,
                "sgd": 55568.0657411781,
                "thb": 1438863.97715007,
                "try": 1240206.60639855,
                "twd": 1291001.38076227,
                "uah": 1599892.6750506,
                "usd": 42074.7071561885,
                "vef": 4212.94042754915,
                "vnd": 1021106970.8227,
                "xag": 1768.32799402537,
                "xau": 20.3961350410339,
                "xdr": 31351.757663898,
                "xlm": 324963.641046826,
                "xrp": 67529.863610982,
                "yfi": 5.11694276059855,
                "zar": 769994.699891437,
                "bits": 1000195.71393105,
                "link": 2709.66083650503,
                "sats": 100019571.393105
              },
              "market_cap": {
                "aed": 3022434823129.84,
                "ars": 663982757051427,
                "aud": 1207533794818.66,
                "bch": 3239927812.61396,
                "bdt": 90320099015790.6,
                "bhd": 310192612917.673,
                "bmd": 822933961870.542,
                "bnb": 2629923038.04924,
                "brl": 3993286227042.84,
                "btc": 19584275,
                "cad": 1091498460326.99,
                "chf": 692169755329.313,
                "clp": 725066019537891,
                "cny": 5826043276458.69,
                "czk": 18419113668077,
                "dkk": 5558672032246.96,
                "dot": 99489102293.3619,
                "eos": 971966018054.879,
                "eth": 358260658.630535,
                "eur": 744365987728.877,
                "gbp": 645995753662.719,
                "gel": 2213692357431.75,
                "hkd": 6427484562491.77,
                "huf": 285714442221834,
                "idr": 12665035966583838,
                "ils": 2963261756601.54,
                "inr": 68483700226206.6,
                "jpy": 116054283764085,
                "krw": 1.06531270166027e15,
                "kwd": 252871147803.58,
                "lkr": 266561780855891,
                "ltc": 11241964101.6977,
                "mmk": 1728305874039080,
                "mxn": 13966176853697.3,
                "myr": 3781381554795.15,
                "ngn": 737875507571602,
                "nok": 8407346818129.71,
                "nzd": 1301287369358.73,
                "php": 45590539841760.1,
                "pkr": 228954757091481,
                "pln": 3239742879771.2,
                "rub": 73446851159342,
                "sar": 3086002357014.53,
                "sek": 8289208064431.51,
                "sgd": 1086848883442.42,
                "thb": 28142561489813.1,
                "try": 24257046694416.7,
                "twd": 25250535365752.9,
                "uah": 31292101755089.6,
                "usd": 822933961870.542,
                "vef": 82400377602.0975,
                "vnd": 19971704184972804,
                "xag": 34586507200.3442,
                "xau": 398925467.356364,
                "xdr": 613205127018.025,
                "xlm": 6366989968394.3,
                "xrp": 1322171541704.13,
                "yfi": 100197984.577011,
                "zar": 15060230523976,
                "bits": 19587833186725.1,
                "link": 53027090934.8881,
                "sats": 1.95878331867251e15
              },
              "total_volume": {
                "aed": 91203312150.0806,
                "ars": 20035974370796.5,
                "aud": 36437868164.374,
                "bch": 97607892.5371449,
                "bdt": 2725449072027.67,
                "bhd": 9360199758.84335,
                "bmd": 24832397519.0506,
                "bnb": 79179085.8304717,
                "brl": 120499184128.796,
                "btc": 590313.260481799,
                "cad": 32931483969.889,
                "chf": 20881438911.7821,
                "clp": 21879188925189.9,
                "cny": 175803441475.871,
                "czk": 555804929370.771,
                "dkk": 167735395521.931,
                "dot": 2997133098.58748,
                "eos": 29280838849.3072,
                "eth": 10798578.6487541,
                "eur": 22461574030.7143,
                "gbp": 19491668952.2309,
                "gel": 66799149326.2464,
                "hkd": 193952199202.669,
                "huf": 8621560094639.22,
                "idr": 382173081057941,
                "ils": 89417738606.4736,
                "inr": 2066526047518,
                "jpy": 3501989517686,
                "krw": 32146283560336.6,
                "kwd": 7630499109.6539,
                "lkr": 8043620037935.51,
                "ltc": 338574128.091738,
                "mmk": 52152396774457.3,
                "mxn": 421435584775.312,
                "myr": 114104866600.038,
                "ngn": 22265720911481.5,
                "nok": 253695421433.057,
                "nzd": 39266923884.1294,
                "php": 1375714772890.61,
                "pkr": 6908811405778.09,
                "pln": 97760679200.9487,
                "rub": 2216291329580.89,
                "sar": 93121490696.4396,
                "sek": 250130532110.017,
                "sgd": 32796147403.4102,
                "thb": 849214282675.698,
                "try": 731967149325.999,
                "twd": 761946110895.665,
                "uah": 944253057952.188,
                "usd": 24832397519.0506,
                "vef": 2486467963.58254,
                "vnd": 602655037260634,
                "xag": 1043663204.32594,
                "xau": 12037753.021335,
                "xdr": 18503736849.333,
                "xlm": 191792809959.604,
                "xrp": 39855973598.8211,
                "yfi": 3020008.10704923,
                "zar": 454449139819.002,
                "bits": 590313260481.799,
                "link": 1599235730.48563,
                "sats": 59031326048179.9
              }
            },
            "community_data": {
              "facebook_likes": null,
              "twitter_followers": null,
              "reddit_average_posts_48h": 0,
              "reddit_average_comments_48h": 0,
              "reddit_subscribers": null,
              "reddit_accounts_active_48h": null
            },
            "developer_data": {
              "forks": 36262,
              "stars": 72871,
              "subscribers": 3961,
              "total_issues": 7736,
              "closed_issues": 7377,
              "pull_requests_merged": 11204,
              "pull_request_contributors": 846,
              "code_additions_deletions_4_weeks": {
                "additions": 973,
                "deletions": -290
              },
              "commit_count_4_weeks": 163
            },
            "public_interest_stats": {
              "alexa_rank": null,
              "bing_matches": null
            }
          }
        },
        "CoinsMarketChart": {
          "type": "object",
          "properties": {
            "prices": {
              "type": "array",
              "items": {
                "type": "array",
                "items": {
                  "type": "number"
                }
              },
              "example": [
                [
                  1711843200000,
                  69702.3087473573
                ],
                [
                  1711929600000,
                  71246.9514406015
                ],
                [
                  1711983682000,
                  68887.7495158568
                ]
              ]
            },
            "market_caps": {
              "type": "array",
              "items": {
                "type": "array",
                "items": {
                  "type": "number"
                }
              },
              "example": [
                [
                  1711843200000,
                  1370247487960.09
                ],
                [
                  1711929600000,
                  1401370211582.37
                ],
                [
                  1711983682000,
                  1355701979725.16
                ]
              ]
            },
            "total_volumes": {
              "type": "array",
              "items": {
                "type": "array",
                "items": {
                  "type": "number"
                }
              },
              "example": [
                [
                  1711843200000,
                  16408802301.8374
                ],
                [
                  1711929600000,
                  19723005998.215
                ],
                [
                  1711983682000,
                  30137418199.6431
                ]
              ]
            }
          }
        },
        "CoinsMarketChartRange": {
          "type": "object",
          "properties": {
            "prices": {
              "type": "array",
              "items": {
                "type": "array",
                "items": {
                  "type": "number"
                }
              },
              "example": [
                [
                  1704067241331,
                  42261.0406175669
                ],
                [
                  1704070847420,
                  42493.2764087546
                ],
                [
                  1704074443652,
                  42654.0731066594
                ]
              ]
            },
            "market_caps": {
              "type": "array",
              "items": {
                "type": "array",
                "items": {
                  "type": "number"
                }
              },
              "example": [
                [
                  1704067241331,
                  827596236151.196
                ],
                [
                  1704070847420,
                  831531023621.411
                ],
                [
                  1704074443652,
                  835499399014.932
                ]
              ]
            },
            "total_volumes": {
              "type": "array",
              "items": {
                "type": "array",
                "items": {
                  "type": "number"
                }
              },
              "example": [
                [
                  1704067241331,
                  14305769170.9498
                ],
                [
                  1704070847420,
                  14130205376.1709
                ],
                [
                  1704074443652,
                  13697382902.2424
                ]
              ]
            }
          }
        },
        "CoinsOHLC": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "number"
            }
          },
          "example": [
            [
              1709395200000,
              61942,
              62211,
              61721,
              61845
            ],
            [
              1709409600000,
              61828,
              62139,
              61726,
              62139
            ],
            [
              1709424000000,
              62171,
              62210,
              61821,
              62068
            ]
          ]
        },
        "SupplyChartBase": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "number"
            }
          }
        },
        "CoinsContractAddress": {
          "allOf": [
            {
              "$ref": "#/components/schemas/CoinsDataBase"
            },
            {
              "example": {
                "id": "usd-coin",
                "symbol": "usdc",
                "name": "USDC",
                "web_slug": "usdc",
                "asset_platform_id": "ethereum",
                "platforms": {
                  "ethereum": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                  "polkadot": "1337",
                  "flow": "A.b19436aae4d94622.FiatToken",
                  "avalanche": "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e",
                  "optimistic-ethereum": "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
                  "stellar": "USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
                  "near-protocol": "17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
                  "hedera-hashgraph": "0.0.456858",
                  "zksync": "0x1d17cbcf0d6d143135ae902365d2e5e2a16538d4",
                  "tron": "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8",
                  "celo": "0xceba9300f2b948710d2653dd7b07f33a8b32118c",
                  "arbitrum-one": "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
                  "base": "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
                  "polygon-pos": "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
                  "solana": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
                },
                "detail_platforms": {
                  "ethereum": {
                    "decimal_place": 6,
                    "contract_address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
                  },
                  "polkadot": {
                    "decimal_place": 6,
                    "contract_address": "1337"
                  },
                  "flow": {
                    "decimal_place": 8,
                    "contract_address": "A.b19436aae4d94622.FiatToken"
                  },
                  "avalanche": {
                    "decimal_place": 6,
                    "contract_address": "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e"
                  },
                  "optimistic-ethereum": {
                    "decimal_place": 6,
                    "contract_address": "0x0b2c639c533813f4aa9d7837caf62653d097ff85"
                  },
                  "stellar": {
                    "decimal_place": null,
                    "contract_address": "USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN"
                  },
                  "near-protocol": {
                    "decimal_place": 6,
                    "contract_address": "17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1"
                  },
                  "hedera-hashgraph": {
                    "decimal_place": 6,
                    "contract_address": "0.0.456858"
                  },
                  "zksync": {
                    "decimal_place": 6,
                    "contract_address": "0x1d17cbcf0d6d143135ae902365d2e5e2a16538d4"
                  },
                  "tron": {
                    "decimal_place": 6,
                    "contract_address": "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8"
                  },
                  "celo": {
                    "decimal_place": 6,
                    "contract_address": "0xceba9300f2b948710d2653dd7b07f33a8b32118c"
                  },
                  "arbitrum-one": {
                    "decimal_place": 6,
                    "contract_address": "0xaf88d065e77c8cc2239327c5edb3a432268e5831"
                  },
                  "base": {
                    "decimal_place": 6,
                    "contract_address": "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"
                  },
                  "polygon-pos": {
                    "decimal_place": 6,
                    "contract_address": "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359"
                  },
                  "solana": {
                    "decimal_place": 6,
                    "contract_address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
                  }
                },
                "block_time_in_minutes": 0,
                "hashing_algorithm": null,
                "categories": [
                  "Ronin Ecosystem",
                  "Osmosis Ecosystem",
                  "Mantle Ecosystem",
                  "Kava Ecosystem",
                  "Tron Ecosystem",
                  "Base Ecosystem",
                  "Neon Ecosystem",
                  "Hedera Ecosystem",
                  "Stellar Ecosystem",
                  "Rollux Ecosystem",
                  "Stablecoins",
                  "USD Stablecoin",
                  "BNB Chain Ecosystem",
                  "Cosmos Ecosystem",
                  "Polkadot Ecosystem",
                  "Avalanche Ecosystem",
                  "Solana Ecosystem",
                  "Gnosis Chain Ecosystem",
                  "Near Protocol Ecosystem",
                  "Fantom Ecosystem",
                  "Moonriver Ecosystem",
                  "Polygon Ecosystem",
                  "Arbitrum Ecosystem",
                  "Harmony Ecosystem",
                  "Ethereum Ecosystem",
                  "Velas Ecosystem",
                  "Arbitrum Nova Ecosystem",
                  "Moonbeam Ecosystem",
                  "Optimism Ecosystem",
                  "Metis Ecosystem",
                  "Cronos Ecosystem",
                  "Canto Ecosystem",
                  "ZkSync Ecosystem"
                ],
                "preview_listing": false,
                "public_notice": "USD Coin (USDC) has rebranded to USDC (USDC). For more information, please refer to this \u003Ca href=\"https://www.circle.com/blog/usd-coin-and-euro-coin-are-now-exclusively-usdc-and-eurc\"\u003Eannouncement\u003C/a\u003E from the Circle Blog.",
                "additional_notices": [],
                "localization": {
                  "en": "USDC",
                  "de": "USDC",
                  "es": "USDC",
                  "fr": "USDC",
                  "it": "USDC",
                  "pl": "USDC",
                  "ro": "USDC",
                  "hu": "USDC",
                  "nl": "USDC",
                  "pt": "USDC",
                  "sv": "USDC",
                  "vi": "USDC",
                  "tr": "USDC",
                  "ru": "USDC",
                  "ja": "USDコイン",
                  "zh": "USDC",
                  "zh-tw": "USDC",
                  "ko": "USDC",
                  "ar": "USDC",
                  "th": "USDC",
                  "id": "USDC",
                  "cs": "USDC",
                  "da": "USDC",
                  "el": "USDC",
                  "hi": "USDC",
                  "no": "USDC",
                  "sk": "USDC",
                  "uk": "USDC",
                  "he": "USDC",
                  "fi": "USDC",
                  "bg": "USDC",
                  "hr": "USDC",
                  "lt": "USDC",
                  "sl": "USDC"
                },
                "description": {
                  "en": "USDC is a fully collateralized US dollar stablecoin....",
                  "de": "USDC is a fully collateralized US dollar stablecoin..."
                },
                "links": {
                  "homepage": [
                    "https://www.circle.com/en/usdc",
                    "",
                    ""
                  ],
                  "whitepaper": "",
                  "blockchain_site": [
                    "https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                    "https://bscscan.com/token/0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
                    "https://nearblocks.io/token/17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
                    "https://ethplorer.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                    "https://basescan.org/token/0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
                    "https://arbiscan.io/token/0xaf88d065e77c8cc2239327c5edb3a432268e5831",
                    "https://binplorer.com/address/0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
                    "https://explorer.kava.io/token/0xfa9343c3897324496a05fc75abed6bac29f8a40f",
                    "https://ftmscan.com/token/0x04068da6c83afcfa0e13ba15a6696662335d5b75",
                    "https://explorer.energi.network/token/0xffd7510ca0a3279c7a5f50018a26c21d5bc1dbcf"
                  ],
                  "official_forum_url": [
                    "",
                    "",
                    ""
                  ],
                  "chat_url": [
                    "https://discord.com/invite/buildoncircle",
                    "",
                    ""
                  ],
                  "announcement_url": [
                    "https://medium.com/centre-blog",
                    "https://blog.circle.com/2018/09/26/introducing-usd-coin/"
                  ],
                  "twitter_screen_name": "circle",
                  "facebook_username": "",
                  "bitcointalk_thread_identifier": null,
                  "telegram_channel_identifier": "",
                  "subreddit_url": "https://www.reddit.com",
                  "repos_url": {
                    "github": [
                      "https://github.com/centrehq/centre-tokens"
                    ],
                    "bitbucket": []
                  }
                },
                "image": {
                  "thumb": "https://assets.coingecko.com/coins/images/6319/thumb/usdc.png?1696506694",
                  "small": "https://assets.coingecko.com/coins/images/6319/small/usdc.png?1696506694",
                  "large": "https://assets.coingecko.com/coins/images/6319/large/usdc.png?1696506694"
                },
                "country_origin": "US",
                "genesis_date": null,
                "contract_address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                "sentiment_votes_up_percentage": 33.33,
                "sentiment_votes_down_percentage": 66.67,
                "watchlist_portfolio_users": 126374,
                "market_cap_rank": 7,
                "market_data": {
                  "current_price": {
                    "aed": 3.68,
                    "ars": 863.06,
                    "aud": 1.52,
                    "bch": 0.00145232,
                    "bdt": 109.92,
                    "bhd": 0.377611,
                    "bmd": 1.003,
                    "bnb": 0.00170967,
                    "brl": 5.08,
                    "btc": 0.00001429,
                    "cad": 1.36,
                    "chf": 0.904508,
                    "clp": 942.53,
                    "cny": 7.25,
                    "czk": 23.43,
                    "dkk": 6.9,
                    "dot": 0.11492405,
                    "eos": 0.96236821,
                    "eth": 0.00029377,
                    "eur": 0.924434,
                    "gbp": 0.793567,
                    "gel": 2.69,
                    "hkd": 7.85,
                    "huf": 361.11,
                    "idr": 15933.99,
                    "ils": 3.76,
                    "inr": 83.54,
                    "jpy": 152.05,
                    "krw": 1355.2,
                    "kwd": 0.308189,
                    "lkr": 299.48,
                    "ltc": 0.00973467,
                    "mmk": 2103.16,
                    "mxn": 16.5,
                    "myr": 4.76,
                    "ngn": 1298.4,
                    "nok": 10.76,
                    "nzd": 1.67,
                    "php": 56.75,
                    "pkr": 278.35,
                    "pln": 3.96,
                    "rub": 92.78,
                    "sar": 3.76,
                    "sek": 10.71,
                    "sgd": 1.35,
                    "thb": 36.73,
                    "try": 32.16,
                    "twd": 32.22,
                    "uah": 38.89,
                    "usd": 1.003,
                    "vef": 0.100421,
                    "vnd": 25038,
                    "xag": 0.0364874,
                    "xau": 0.00043045,
                    "xdr": 0.756423,
                    "xlm": 7.701256,
                    "xrp": 1.669349,
                    "yfi": 0.0001188,
                    "zar": 18.75,
                    "bits": 14.29,
                    "link": 0.05630197,
                    "sats": 1428.76
                  },
                  "total_value_locked": null,
                  "mcap_to_tvl_ratio": null,
                  "fdv_to_tvl_ratio": null,
                  "roi": null,
                  "ath": {
                    "aed": 4.31,
                    "ars": 868.65,
                    "aud": 1.83,
                    "bch": 0.01345435,
                    "bdt": 113.46,
                    "bhd": 0.442094,
                    "bmd": 1.17,
                    "bnb": 0.25455702,
                    "brl": 5.97,
                    "btc": 0.00033582,
                    "cad": 1.61,
                    "chf": 1.2,
                    "clp": 1057.99,
                    "cny": 8.09,
                    "czk": 27.1,
                    "dkk": 7.88,
                    "dot": 0.34808619,
                    "eos": 1.89444,
                    "eth": 0.01282697,
                    "eur": 1.059,
                    "gbp": 0.96424,
                    "gel": 2.74,
                    "hkd": 9.2,
                    "huf": 455.32,
                    "idr": 17341.09,
                    "ils": 4.26,
                    "inr": 87.19,
                    "jpy": 154.07,
                    "krw": 1466.8,
                    "kwd": 0.356866,
                    "lkr": 380.81,
                    "ltc": 0.04751509,
                    "mmk": 2166.16,
                    "mxn": 25.72,
                    "myr": 4.95,
                    "ngn": 1641.1,
                    "nok": 12.06,
                    "nzd": 1.88,
                    "php": 61.66,
                    "pkr": 309.03,
                    "pln": 5.09,
                    "rub": 155.25,
                    "sar": 4.4,
                    "sek": 11.61,
                    "sgd": 1.47,
                    "thb": 38.98,
                    "try": 32.76,
                    "twd": 36.3,
                    "uah": 39.61,
                    "usd": 1.17,
                    "vef": 291403,
                    "vnd": 27332,
                    "xag": 0.086151,
                    "xau": 0.00093093,
                    "xdr": 0.842866,
                    "xlm": 37.482414,
                    "xrp": 9.1105,
                    "yfi": 0.00126639,
                    "zar": 19.92,
                    "bits": 313.39,
                    "link": 4.9423,
                    "sats": 31339
                  },
                  "ath_change_percentage": {
                    "aed": -14.38389,
                    "ars": -0.51451,
                    "aud": -16.54715,
                    "bch": -89.16472,
                    "bdt": -2.99363,
                    "bhd": -14.475,
                    "bmd": -14.36801,
                    "bnb": -99.3281,
                    "brl": -14.79026,
                    "btc": -95.73352,
                    "cad": -15.1066,
                    "chf": -24.25592,
                    "clp": -10.79724,
                    "cny": -10.23969,
                    "czk": -13.42505,
                    "dkk": -12.26647,
                    "dot": -66.90313,
                    "eos": -49.11664,
                    "eth": -97.70715,
                    "eur": -12.61023,
                    "gbp": -17.59352,
                    "gel": -1.74226,
                    "hkd": -14.57313,
                    "huf": -20.58833,
                    "idr": -7.99505,
                    "ils": -11.60085,
                    "inr": -4.06203,
                    "jpy": -1.18617,
                    "krw": -7.48817,
                    "kwd": -13.52804,
                    "lkr": -21.25532,
                    "ltc": -79.49459,
                    "mmk": -2.78254,
                    "mxn": -35.75175,
                    "myr": -3.75781,
                    "ngn": -20.77937,
                    "nok": -10.67094,
                    "nzd": -11.13856,
                    "php": -7.84159,
                    "pkr": -9.81151,
                    "pln": -22.06943,
                    "rub": -40.1645,
                    "sar": -14.34456,
                    "sek": -7.62797,
                    "sgd": -7.93611,
                    "thb": -5.64291,
                    "try": -1.67562,
                    "twd": -11.13084,
                    "uah": -1.68827,
                    "usd": -14.36801,
                    "vef": -99.99997,
                    "vnd": -8.27313,
                    "xag": -57.59221,
                    "xau": -53.7014,
                    "xdr": -10.13941,
                    "xlm": -79.45084,
                    "xrp": -81.6335,
                    "yfi": -90.62471,
                    "zar": -5.73322,
                    "bits": -95.42817,
                    "link": -98.85859,
                    "sats": -95.42817
                  },
                  "ath_date": {
                    "aed": "2019-05-08T00:40:28.300Z",
                    "ars": "2024-04-04T18:05:51.232Z",
                    "aud": "2020-03-13T02:35:16.858Z",
                    "bch": "2018-12-15T16:04:56.312Z",
                    "bdt": "2023-10-23T22:45:06.087Z",
                    "bhd": "2019-05-08T00:40:28.300Z",
                    "bmd": "2019-05-08T00:40:28.300Z",
                    "bnb": "2018-12-08T12:49:29.078Z",
                    "brl": "2020-05-14T14:07:45.849Z",
                    "btc": "2018-12-08T12:54:40.339Z",
                    "cad": "2020-03-13T02:35:16.858Z",
                    "chf": "2019-05-08T00:40:28.300Z",
                    "clp": "2022-07-19T00:53:26.862Z",
                    "cny": "2020-03-13T02:35:16.858Z",
                    "czk": "2020-03-13T02:35:16.858Z",
                    "dkk": "2022-09-27T16:25:08.674Z",
                    "dot": "2020-08-22T00:00:00.000Z",
                    "eos": "2023-10-19T07:35:20.838Z",
                    "eth": "2018-12-08T12:49:29.078Z",
                    "eur": "2022-09-27T16:25:08.674Z",
                    "gbp": "2022-09-26T01:00:46.182Z",
                    "gel": "2024-03-20T20:40:24.283Z",
                    "hkd": "2019-05-08T00:40:28.300Z",
                    "huf": "2022-10-13T12:54:39.018Z",
                    "idr": "2018-10-15T13:29:31.772Z",
                    "ils": "2020-03-13T02:35:16.858Z",
                    "inr": "2020-03-13T02:35:16.858Z",
                    "jpy": "2023-10-23T22:45:06.087Z",
                    "krw": "2022-09-30T02:11:16.560Z",
                    "kwd": "2019-05-08T00:40:28.300Z",
                    "lkr": "2022-05-12T07:24:27.813Z",
                    "ltc": "2018-12-08T12:49:29.078Z",
                    "mmk": "2022-09-13T12:36:28.482Z",
                    "mxn": "2020-04-06T05:20:12.159Z",
                    "myr": "2020-03-13T02:35:16.858Z",
                    "ngn": "2024-02-28T17:01:26.911Z",
                    "nok": "2020-03-19T09:32:58.419Z",
                    "nzd": "2020-03-13T02:35:16.858Z",
                    "php": "2018-10-15T13:29:31.772Z",
                    "pkr": "2023-09-06T17:10:41.513Z",
                    "pln": "2022-10-13T12:54:39.018Z",
                    "rub": "2022-03-07T17:44:50.584Z",
                    "sar": "2019-05-08T00:40:28.300Z",
                    "sek": "2022-10-13T12:54:39.018Z",
                    "sgd": "2022-05-12T07:24:27.813Z",
                    "thb": "2022-09-30T02:11:16.560Z",
                    "try": "2024-03-13T05:46:55.999Z",
                    "twd": "2019-05-08T00:40:28.300Z",
                    "uah": "2024-03-25T14:01:08.978Z",
                    "usd": "2019-05-08T00:40:28.300Z",
                    "vef": "2019-05-08T00:40:28.300Z",
                    "vnd": "2019-05-08T00:40:28.300Z",
                    "xag": "2020-03-16T12:07:54.295Z",
                    "xau": "2018-10-15T13:29:31.772Z",
                    "xdr": "2019-05-08T00:40:28.300Z",
                    "xlm": "2020-03-13T02:27:51.989Z",
                    "xrp": "2020-03-13T02:27:51.989Z",
                    "yfi": "2020-07-18T00:00:00.000Z",
                    "zar": "2023-06-01T07:50:09.345Z",
                    "bits": "2018-12-16T00:00:00.000Z",
                    "link": "2018-12-16T00:00:00.000Z",
                    "sats": "2018-12-16T00:00:00.000Z"
                  },
                  "atl": {
                    "aed": 3.22,
                    "ars": 35.1,
                    "aud": 1.15,
                    "bch": 0.00061874,
                    "bdt": 75.64,
                    "bhd": 0.330818,
                    "bmd": 0.877647,
                    "bnb": 0.00145528,
                    "brl": 3.66,
                    "btc": 0.00001358,
                    "cad": 1.079,
                    "chf": 0.803831,
                    "clp": 641.06,
                    "cny": 5.74,
                    "czk": 18.6,
                    "dkk": 5.43,
                    "dot": 0.01824728,
                    "eos": 0.06823362,
                    "eth": 0.00020588,
                    "eur": 0.730265,
                    "gbp": 0.629869,
                    "gel": 2.59,
                    "hkd": 6.89,
                    "huf": 255.57,
                    "idr": 12829.05,
                    "ils": 2.91,
                    "inr": 65.31,
                    "jpy": 97.05,
                    "krw": 1008.25,
                    "kwd": 0.268173,
                    "lkr": 169.86,
                    "ltc": 0.0024386,
                    "mmk": 1262.08,
                    "mxn": 16.23,
                    "myr": 3.69,
                    "ngn": 306.14,
                    "nok": 7.39,
                    "nzd": 1.24,
                    "php": 42.68,
                    "pkr": 122.98,
                    "pln": 3.3,
                    "rub": 50.72,
                    "sar": 3.29,
                    "sek": 7.43,
                    "sgd": 1.18,
                    "thb": 28.03,
                    "try": 5.12,
                    "twd": 24.94,
                    "uah": 23.13,
                    "usd": 0.877647,
                    "vef": 0.087879,
                    "vnd": 20544,
                    "xag": 0.03215085,
                    "xau": 0.00042766,
                    "xdr": 0.618198,
                    "xlm": 1.266586,
                    "xrp": 0.51131826,
                    "yfi": 0.00001103,
                    "zar": 12.52,
                    "bits": 13.58,
                    "link": 0.01893714,
                    "sats": 1357.66
                  },
                  "atl_change_percentage": {
                    "aed": 14.41627,
                    "ars": 2361.81893,
                    "aud": 32.49086,
                    "bch": 135.6116,
                    "bdt": 45.50042,
                    "bhd": 14.29254,
                    "bmd": 14.42094,
                    "bnb": 17.52902,
                    "brl": 39.00819,
                    "btc": 5.53325,
                    "cad": 26.5285,
                    "chf": 12.67067,
                    "clp": 47.21742,
                    "cny": 26.53016,
                    "czk": 26.123,
                    "dkk": 27.27694,
                    "dot": 531.35789,
                    "eos": 1312.72686,
                    "eth": 42.84868,
                    "eur": 26.75308,
                    "gbp": 26.15257,
                    "gel": 4.02071,
                    "hkd": 14.12942,
                    "huf": 41.47699,
                    "idr": 24.36351,
                    "ils": 29.16397,
                    "inr": 28.08243,
                    "jpy": 56.86384,
                    "krw": 34.58554,
                    "kwd": 15.0708,
                    "lkr": 76.54458,
                    "ltc": 299.53881,
                    "mmk": 66.85867,
                    "mxn": 1.80183,
                    "myr": 29.35598,
                    "ngn": 324.6662,
                    "nok": 45.70553,
                    "nzd": 34.5126,
                    "php": 33.16285,
                    "pkr": 126.62161,
                    "pln": 20.17185,
                    "rub": 83.14122,
                    "sar": 14.32941,
                    "sek": 44.26778,
                    "sgd": 14.47286,
                    "thb": 31.21405,
                    "try": 528.64115,
                    "twd": 29.34909,
                    "uah": 68.3386,
                    "usd": 14.42094,
                    "vef": 14.42094,
                    "vnd": 22.0335,
                    "xag": 13.63538,
                    "xau": 0.78357,
                    "xdr": 22.51815,
                    "xlm": 508.11643,
                    "xrp": 227.24828,
                    "yfi": 976.86962,
                    "zar": 49.91998,
                    "bits": 5.53325,
                    "link": 197.88895,
                    "sats": 5.53325
                  },
                  "atl_date": {
                    "aed": "2023-03-11T08:02:13.981Z",
                    "ars": "2018-11-05T00:00:00.000Z",
                    "aud": "2021-05-19T13:14:05.611Z",
                    "bch": "2021-05-12T00:48:59.373Z",
                    "bdt": "2021-05-19T13:14:05.611Z",
                    "bhd": "2023-03-11T08:02:13.981Z",
                    "bmd": "2023-03-11T08:02:13.981Z",
                    "bnb": "2021-05-10T06:49:47.379Z",
                    "brl": "2019-01-10T00:00:00.000Z",
                    "btc": "2024-03-14T07:11:23.026Z",
                    "cad": "2021-05-19T13:14:05.611Z",
                    "chf": "2021-05-19T13:14:05.611Z",
                    "clp": "2021-05-19T13:14:05.611Z",
                    "cny": "2021-05-19T13:14:05.611Z",
                    "czk": "2021-05-19T13:14:05.611Z",
                    "dkk": "2021-05-19T13:14:05.611Z",
                    "dot": "2021-11-04T14:03:20.601Z",
                    "eos": "2021-05-12T00:19:38.267Z",
                    "eth": "2021-11-10T16:24:27.522Z",
                    "eur": "2021-05-19T13:14:05.611Z",
                    "gbp": "2021-05-19T13:14:05.611Z",
                    "gel": "2024-02-28T17:35:55.970Z",
                    "hkd": "2023-03-11T08:02:13.981Z",
                    "huf": "2021-05-19T13:14:05.611Z",
                    "idr": "2021-05-19T13:14:05.611Z",
                    "ils": "2021-05-19T13:14:05.611Z",
                    "inr": "2021-05-19T13:14:05.611Z",
                    "jpy": "2021-05-19T13:14:05.611Z",
                    "krw": "2021-05-19T13:14:05.611Z",
                    "kwd": "2021-05-19T13:14:05.611Z",
                    "lkr": "2018-10-07T00:00:00.000Z",
                    "ltc": "2021-05-10T02:59:49.794Z",
                    "mmk": "2020-08-02T04:44:57.506Z",
                    "mxn": "2023-03-11T08:02:13.981Z",
                    "myr": "2021-05-19T13:14:05.611Z",
                    "ngn": "2019-08-27T00:00:00.000Z",
                    "nok": "2021-05-19T13:14:05.611Z",
                    "nzd": "2021-05-19T13:14:05.611Z",
                    "php": "2021-05-19T13:14:05.611Z",
                    "pkr": "2018-10-07T00:00:00.000Z",
                    "pln": "2021-05-19T13:14:05.611Z",
                    "rub": "2022-06-29T08:44:56.399Z",
                    "sar": "2023-03-11T08:02:13.981Z",
                    "sek": "2021-05-19T13:14:05.611Z",
                    "sgd": "2023-03-11T08:02:13.981Z",
                    "thb": "2021-05-19T13:14:05.611Z",
                    "try": "2018-12-30T00:00:00.000Z",
                    "twd": "2021-05-19T13:14:05.611Z",
                    "uah": "2019-12-26T19:59:45.264Z",
                    "usd": "2023-03-11T08:02:13.981Z",
                    "vef": "2023-03-11T08:02:13.981Z",
                    "vnd": "2021-05-19T13:14:05.611Z",
                    "xag": "2021-05-19T13:14:05.611Z",
                    "xau": "2024-04-07T15:40:38.864Z",
                    "xdr": "2021-05-19T13:14:05.611Z",
                    "xlm": "2021-05-16T09:54:34.066Z",
                    "xrp": "2021-04-14T05:34:20.469Z",
                    "yfi": "2021-05-12T00:31:55.487Z",
                    "zar": "2021-05-19T13:14:05.611Z",
                    "bits": "2024-03-14T07:11:23.026Z",
                    "link": "2021-05-10T00:18:26.781Z",
                    "sats": "2024-03-14T07:11:23.026Z"
                  },
                  "market_cap": {
                    "aed": 120999090107,
                    "ars": 28353111377396,
                    "aud": 50065123859,
                    "bch": 47850776,
                    "bdt": 3611011939859,
                    "bhd": 12405166075,
                    "bmd": 32947335631,
                    "bnb": 56263487,
                    "brl": 166914167569,
                    "btc": 470808,
                    "cad": 44777076490,
                    "chf": 29714641901,
                    "clp": 30963723498232,
                    "cny": 238288310221,
                    "czk": 769659644552,
                    "dkk": 226756742750,
                    "dot": 3789619642,
                    "eos": 31696182321,
                    "eth": 9672781,
                    "eur": 30369239566,
                    "gbp": 26070040581,
                    "gel": 88298859492,
                    "hkd": 257975990628,
                    "huf": 11863102506863,
                    "idr": 523459031679163,
                    "ils": 123517189074,
                    "inr": 2744416324725,
                    "jpy": 4994980818412,
                    "krw": 44520744769077,
                    "kwd": 10124551503,
                    "lkr": 9838495420617,
                    "ltc": 320634614,
                    "mmk": 69092295816136,
                    "mxn": 542102281546,
                    "myr": 156417475910,
                    "ngn": 42654804703977,
                    "nok": 353505142924,
                    "nzd": 54784401373,
                    "php": 1864489756333,
                    "pkr": 9144229230085,
                    "pln": 130121779028,
                    "rub": 3047857134527,
                    "sar": 123586345532,
                    "sek": 351778208327,
                    "sgd": 44459530069,
                    "thb": 1206505040009,
                    "try": 1056670507653,
                    "twd": 1058472693964,
                    "uah": 1277756585625,
                    "usd": 32947335631,
                    "vef": 3299016717,
                    "vnd": 822552701684877,
                    "xag": 1198674150,
                    "xau": 14140996,
                    "xdr": 24849803059,
                    "xlm": 253446689394,
                    "xrp": 55015857817,
                    "yfi": 3906707,
                    "zar": 616016334302,
                    "bits": 470807890093,
                    "link": 1854262325,
                    "sats": 47080789009277
                  },
                  "market_cap_rank": 7,
                  "fully_diluted_valuation": {
                    "aed": 121002864723,
                    "ars": 28353995864398,
                    "aud": 50066685661,
                    "bch": 47852269,
                    "bdt": 3611124586865,
                    "bhd": 12405553060,
                    "bmd": 32948363437,
                    "bnb": 56265242,
                    "brl": 166919374526,
                    "btc": 470823,
                    "cad": 44778473329,
                    "chf": 29715568862,
                    "clp": 30964689424356,
                    "cny": 238295743723,
                    "czk": 769683654402,
                    "dkk": 226763816520,
                    "dot": 3789737860,
                    "eos": 31697171097,
                    "eth": 9673083,
                    "eur": 30370186947,
                    "gbp": 26070853847,
                    "gel": 88301614012,
                    "hkd": 257984038295,
                    "huf": 11863472581237,
                    "idr": 523475361199517,
                    "ils": 123521042244,
                    "inr": 2744501937924,
                    "jpy": 4995136638898,
                    "krw": 44522133612069,
                    "kwd": 10124867342,
                    "lkr": 9838802336539,
                    "ltc": 320644616,
                    "mmk": 69094451178796,
                    "mxn": 542119192650,
                    "myr": 156422355418,
                    "ngn": 42656135338199,
                    "nok": 353516170663,
                    "nzd": 54786110395,
                    "php": 1864547919860,
                    "pkr": 9144514488086,
                    "pln": 130125838230,
                    "rub": 3047952213687,
                    "sar": 123590200859,
                    "sek": 351789182194,
                    "sgd": 44460917003,
                    "thb": 1206542677431,
                    "try": 1056703470925,
                    "twd": 1058505713456,
                    "uah": 1277796445769,
                    "usd": 32948363437,
                    "vef": 3299119631,
                    "vnd": 822578361555605,
                    "xag": 1198711543,
                    "xau": 14141438,
                    "xdr": 24850578259,
                    "xlm": 253454595768,
                    "xrp": 55017574059,
                    "yfi": 3906829,
                    "zar": 616035551185,
                    "bits": 470822577139,
                    "link": 1854320170,
                    "sats": 47082257713905
                  },
                  "market_cap_fdv_ratio": 1,
                  "total_volume": {
                    "aed": 15244665166,
                    "ars": 3572206113148,
                    "aud": 6307700736,
                    "bch": 6011151,
                    "bdt": 454951090006,
                    "bhd": 1562925828,
                    "bmd": 4151032040,
                    "bnb": 7076305,
                    "brl": 21029501906,
                    "btc": 59136,
                    "cad": 5641460094,
                    "chf": 3743745229,
                    "clp": 3901116914259,
                    "cny": 30021924124,
                    "czk": 96969353759,
                    "dkk": 28569062911,
                    "dot": 475669038,
                    "eos": 3983228751,
                    "eth": 1215906,
                    "eur": 3826217934,
                    "gbp": 3284562216,
                    "gel": 11124765867,
                    "hkd": 32502373320,
                    "huf": 1494631285147,
                    "idr": 65950559289861,
                    "ils": 15561920243,
                    "inr": 345768781483,
                    "jpy": 629317212389,
                    "krw": 5609164881735,
                    "kwd": 1275591391,
                    "lkr": 1239551208963,
                    "ltc": 40291669,
                    "mmk": 8704932527533,
                    "mxn": 68299420770,
                    "myr": 19707024609,
                    "ngn": 5374075250174,
                    "nok": 44538083168,
                    "nzd": 6902282112,
                    "php": 234906907282,
                    "pkr": 1152080670123,
                    "pln": 16394031974,
                    "rub": 383999263539,
                    "sar": 15570633259,
                    "sek": 44320506823,
                    "sgd": 5601452447,
                    "thb": 152021478053,
                    "try": 133129828215,
                    "twd": 133356885516,
                    "uah": 160984444548,
                    "usd": 4151032040,
                    "vef": 415642838,
                    "vnd": 103633345569541,
                    "xag": 151020855,
                    "xau": 1781623,
                    "xdr": 3130824593,
                    "xlm": 31875392898,
                    "xrp": 6909411431,
                    "yfi": 491696,
                    "zar": 77611846048,
                    "bits": 59136167290,
                    "link": 233033060,
                    "sats": 5913616728998
                  },
                  "high_24h": {
                    "aed": 3.69,
                    "ars": 864.18,
                    "aud": 1.53,
                    "bch": 0.00147921,
                    "bdt": 110.06,
                    "bhd": 0.378563,
                    "bmd": 1.004,
                    "bnb": 0.00171422,
                    "brl": 5.09,
                    "btc": 0.00001471,
                    "cad": 1.36,
                    "chf": 0.905681,
                    "clp": 953.43,
                    "cny": 7.26,
                    "czk": 23.46,
                    "dkk": 6.91,
                    "dot": 0.118923,
                    "eos": 0.99413647,
                    "eth": 0.00029983,
                    "eur": 0.926064,
                    "gbp": 0.794596,
                    "gel": 2.69,
                    "hkd": 7.86,
                    "huf": 361.59,
                    "idr": 15954.66,
                    "ils": 3.78,
                    "inr": 83.65,
                    "jpy": 152.24,
                    "krw": 1356.96,
                    "kwd": 0.308809,
                    "lkr": 299.87,
                    "ltc": 0.01001188,
                    "mmk": 2105.88,
                    "mxn": 16.52,
                    "myr": 4.77,
                    "ngn": 1300.09,
                    "nok": 10.77,
                    "nzd": 1.67,
                    "php": 56.83,
                    "pkr": 278.71,
                    "pln": 3.97,
                    "rub": 92.9,
                    "sar": 3.77,
                    "sek": 10.72,
                    "sgd": 1.36,
                    "thb": 36.78,
                    "try": 32.21,
                    "twd": 32.26,
                    "uah": 39,
                    "usd": 1.004,
                    "vef": 0.100552,
                    "vnd": 25071,
                    "xag": 0.03653859,
                    "xau": 0.00043101,
                    "xdr": 0.757404,
                    "xlm": 7.799251,
                    "xrp": 1.696805,
                    "yfi": 0.00012029,
                    "zar": 18.78,
                    "bits": 14.71,
                    "link": 0.05738543,
                    "sats": 1470.94
                  },
                  "low_24h": {
                    "aed": 3.66,
                    "ars": 857.46,
                    "aud": 1.51,
                    "bch": 0.00141766,
                    "bdt": 109.21,
                    "bhd": 0.375161,
                    "bmd": 0.996404,
                    "bnb": 0.00169154,
                    "brl": 5.05,
                    "btc": 0.00001429,
                    "cad": 1.35,
                    "chf": 0.89864,
                    "clp": 936.41,
                    "cny": 7.21,
                    "czk": 23.28,
                    "dkk": 6.86,
                    "dot": 0.11453837,
                    "eos": 0.9619467,
                    "eth": 0.00029301,
                    "eur": 0.918436,
                    "gbp": 0.788419,
                    "gel": 2.67,
                    "hkd": 7.8,
                    "huf": 358.77,
                    "idr": 15830.62,
                    "ils": 3.74,
                    "inr": 83,
                    "jpy": 151.06,
                    "krw": 1346.41,
                    "kwd": 0.30619,
                    "lkr": 297.54,
                    "ltc": 0.0094962,
                    "mmk": 2089.51,
                    "mxn": 16.39,
                    "myr": 4.73,
                    "ngn": 1289.98,
                    "nok": 10.69,
                    "nzd": 1.66,
                    "php": 56.39,
                    "pkr": 276.54,
                    "pln": 3.94,
                    "rub": 92.17,
                    "sar": 3.74,
                    "sek": 10.64,
                    "sgd": 1.34,
                    "thb": 36.49,
                    "try": 31.96,
                    "twd": 32.01,
                    "uah": 38.64,
                    "usd": 0.996404,
                    "vef": 0.09977,
                    "vnd": 24876,
                    "xag": 0.03625069,
                    "xau": 0.00042766,
                    "xdr": 0.751516,
                    "xlm": 7.67306,
                    "xrp": 1.663026,
                    "yfi": 0.00011822,
                    "zar": 18.63,
                    "bits": 14.29,
                    "link": 0.05612925,
                    "sats": 1429.46
                  },
                  "price_change_24h": 0.00398183,
                  "price_change_percentage_24h": 0.39861,
                  "price_change_percentage_7d": 0.29305,
                  "price_change_percentage_14d": 0.27486,
                  "price_change_percentage_30d": 0.23778,
                  "price_change_percentage_60d": 0.34535,
                  "price_change_percentage_200d": 0.28542,
                  "price_change_percentage_1y": 0.26784,
                  "market_cap_change_24h": 10444980,
                  "market_cap_change_percentage_24h": 0.03171,
                  "price_change_24h_in_currency": {
                    "aed": 0.01482307,
                    "ars": 3.43,
                    "aud": 0.00605059,
                    "bch": 0.00002114,
                    "bdt": 0.436407,
                    "bhd": 0.00103072,
                    "bmd": 0.00398183,
                    "bnb": -8.98695386508e-7,
                    "brl": 0.02006244,
                    "btc": -4.08289757483e-7,
                    "cad": 0.00541151,
                    "chf": 0.00359115,
                    "clp": -5.90309015913681,
                    "cny": 0.0287982,
                    "czk": 0.093017,
                    "dkk": 0.02740456,
                    "dot": -0.00327886017878197,
                    "eos": -0.030520948421398,
                    "eth": -0.000005818976995429,
                    "eur": 0.00322174,
                    "gbp": 0.00315068,
                    "gel": 0.01067131,
                    "hkd": 0.03117755,
                    "huf": 1.42,
                    "idr": 63.26,
                    "ils": 0.0008507,
                    "inr": 0.331675,
                    "jpy": 0.603666,
                    "krw": 5.38,
                    "kwd": 0.00099784,
                    "lkr": 1.19,
                    "ltc": -0.000234127203521317,
                    "mmk": 8.35,
                    "mxn": 0.065515,
                    "myr": 0.01890375,
                    "ngn": 5.16,
                    "nok": 0.04272267,
                    "nzd": 0.00662094,
                    "php": 0.225332,
                    "pkr": 1.11,
                    "pln": 0.0157258,
                    "rub": 0.368347,
                    "sar": 0.01493596,
                    "sek": 0.04251396,
                    "sgd": 0.00537313,
                    "thb": 0.149196,
                    "try": 0.127703,
                    "twd": 0.127921,
                    "uah": 0.102042,
                    "usd": 0.00398183,
                    "vef": 0.0003987,
                    "vnd": 99.41,
                    "xag": 0.00014025,
                    "xau": 0.00000171,
                    "xdr": 0.00300321,
                    "xlm": -0.0547530053062548,
                    "xrp": -0.0181523667358481,
                    "yfi": -0.000001157937833455,
                    "zar": 0.074448,
                    "bits": -0.408289757483253,
                    "link": -0.000669120508494617,
                    "sats": -40.8289757483253
                  },
                  "price_change_percentage_1h_in_currency": {
                    "aed": 0.65299,
                    "ars": 0.65299,
                    "aud": 0.65299,
                    "bch": -0.46748,
                    "bdt": 0.65299,
                    "bhd": 0.65299,
                    "bmd": 0.65299,
                    "bnb": 0.2798,
                    "brl": 0.65299,
                    "btc": -0.40006,
                    "cad": 0.65299,
                    "chf": 0.65299,
                    "clp": 0.65299,
                    "cny": 0.65299,
                    "czk": 0.65299,
                    "dkk": 0.65299,
                    "dot": -0.19074,
                    "eos": -0.14782,
                    "eth": -0.01885,
                    "eur": 0.65299,
                    "gbp": 0.65299,
                    "gel": 0.65299,
                    "hkd": 0.65299,
                    "huf": 0.65299,
                    "idr": 0.65299,
                    "ils": 0.65299,
                    "inr": 0.65299,
                    "jpy": 0.65299,
                    "krw": 0.65299,
                    "kwd": 0.65299,
                    "lkr": 0.65299,
                    "ltc": 0.19916,
                    "mmk": 0.65299,
                    "mxn": 0.65299,
                    "myr": 0.65299,
                    "ngn": 0.65299,
                    "nok": 0.65299,
                    "nzd": 0.65299,
                    "php": 0.65299,
                    "pkr": 0.65299,
                    "pln": 0.65299,
                    "rub": 0.65299,
                    "sar": 0.65299,
                    "sek": 0.65299,
                    "sgd": 0.65299,
                    "thb": 0.65299,
                    "try": 0.65299,
                    "twd": 0.65299,
                    "uah": 0.65299,
                    "usd": 0.65299,
                    "vef": 0.65299,
                    "vnd": 0.65299,
                    "xag": 0.65299,
                    "xau": 0.65299,
                    "xdr": 0.65299,
                    "xlm": 0.0107,
                    "xrp": -0.05561,
                    "yfi": 0.00533,
                    "zar": 0.65299,
                    "bits": -0.40006,
                    "link": 0.08404,
                    "sats": -0.40006
                  },
                  "price_change_percentage_24h_in_currency": {
                    "aed": 0.40408,
                    "ars": 0.39861,
                    "aud": 0.39861,
                    "bch": 1.47718,
                    "bdt": 0.39861,
                    "bhd": 0.27371,
                    "bmd": 0.39861,
                    "bnb": -0.05254,
                    "brl": 0.39643,
                    "btc": -2.77826,
                    "cad": 0.39861,
                    "chf": 0.39861,
                    "clp": -0.6224,
                    "cny": 0.39861,
                    "czk": 0.39861,
                    "dkk": 0.39861,
                    "dot": -2.77393,
                    "eos": -3.07395,
                    "eth": -1.94233,
                    "eur": 0.34973,
                    "gbp": 0.39861,
                    "gel": 0.39861,
                    "hkd": 0.39861,
                    "huf": 0.39445,
                    "idr": 0.39861,
                    "ils": 0.02263,
                    "inr": 0.39861,
                    "jpy": 0.39861,
                    "krw": 0.39861,
                    "kwd": 0.32483,
                    "lkr": 0.39861,
                    "ltc": -2.3486,
                    "mmk": 0.39861,
                    "mxn": 0.39861,
                    "myr": 0.39861,
                    "ngn": 0.39861,
                    "nok": 0.39861,
                    "nzd": 0.39861,
                    "php": 0.39861,
                    "pkr": 0.39861,
                    "pln": 0.39861,
                    "rub": 0.39861,
                    "sar": 0.39861,
                    "sek": 0.39861,
                    "sgd": 0.39861,
                    "thb": 0.40786,
                    "try": 0.39861,
                    "twd": 0.39861,
                    "uah": 0.26304,
                    "usd": 0.39861,
                    "vef": 0.39861,
                    "vnd": 0.39861,
                    "xag": 0.38586,
                    "xau": 0.39861,
                    "xdr": 0.39861,
                    "xlm": -0.70594,
                    "xrp": -1.0757,
                    "yfi": -0.96532,
                    "zar": 0.39861,
                    "bits": -2.77826,
                    "link": -1.17449,
                    "sats": -2.77826
                  },
                  "price_change_percentage_7d_in_currency": {
                    "aed": 0.29851,
                    "ars": 0.77925,
                    "aud": -0.65027,
                    "bch": -13.2081,
                    "bdt": 0.2879,
                    "bhd": 0.29118,
                    "bmd": 0.29305,
                    "bnb": 3.03355,
                    "brl": 1.31074,
                    "btc": 0.58561,
                    "cad": 0.89438,
                    "chf": 0.26815,
                    "clp": -3.74092,
                    "cny": 0.45556,
                    "czk": 0.17726,
                    "dkk": -0.12633,
                    "dot": 9.9608,
                    "eos": 4.95285,
                    "eth": 6.35016,
                    "eur": -0.1582,
                    "gbp": 0.19782,
                    "gel": -0.26517,
                    "hkd": 0.33277,
                    "huf": -1.03923,
                    "idr": 0.34136,
                    "ils": 2.17036,
                    "inr": 0.18928,
                    "jpy": 0.46534,
                    "krw": 0.66329,
                    "kwd": 0.16104,
                    "lkr": -0.18828,
                    "ltc": 0.27534,
                    "mmk": 0.28566,
                    "mxn": -0.35796,
                    "myr": 0.78132,
                    "ngn": -8.62563,
                    "nok": -0.521,
                    "nzd": -0.49074,
                    "php": 1.05286,
                    "pkr": 0.27769,
                    "pln": -0.42519,
                    "rub": 0.20027,
                    "sar": 0.19475,
                    "sek": 0.47641,
                    "sgd": 0.28651,
                    "thb": 1.16221,
                    "try": -0.66189,
                    "twd": 0.87488,
                    "uah": -0.71017,
                    "usd": 0.29305,
                    "vef": 0.29305,
                    "vnd": 0.91906,
                    "xag": -8.90649,
                    "xau": -3.88135,
                    "xdr": 0.27816,
                    "xlm": 7.78452,
                    "xrp": 4.65475,
                    "yfi": 7.33596,
                    "zar": -0.88066,
                    "bits": 0.58561,
                    "link": 7.43694,
                    "sats": 0.58561
                  },
                  "price_change_percentage_14d_in_currency": {
                    "aed": 0.27759,
                    "ars": 1.46827,
                    "aud": -0.71502,
                    "bch": -30.38764,
                    "bdt": 0.58266,
                    "bhd": 0.58582,
                    "bmd": 0.27486,
                    "bnb": -4.20719,
                    "brl": 1.55155,
                    "btc": -6.21481,
                    "cad": 0.01728,
                    "chf": 0.71462,
                    "clp": -3.53906,
                    "cny": 0.32757,
                    "czk": -0.12532,
                    "dkk": 0.00604,
                    "dot": 5.88408,
                    "eos": -0.52882,
                    "eth": -0.20417,
                    "eur": 0.40885,
                    "gbp": -0.01879,
                    "gel": -0.46792,
                    "hkd": 0.34406,
                    "huf": -1.27976,
                    "idr": 0.74154,
                    "ils": 3.96645,
                    "inr": -0.08114,
                    "jpy": 0.4,
                    "krw": 0.77228,
                    "kwd": 0.59436,
                    "lkr": -0.86856,
                    "ltc": -12.90008,
                    "mmk": 0.58165,
                    "mxn": -1.59414,
                    "myr": 0.48652,
                    "ngn": -11.38303,
                    "nok": 0.02502,
                    "nzd": -0.02528,
                    "php": 0.63319,
                    "pkr": 0.16182,
                    "pln": -0.94152,
                    "rub": 0.67966,
                    "sar": 0.29007,
                    "sek": 1.30993,
                    "sgd": 0.31292,
                    "thb": 1.34874,
                    "try": 0.47599,
                    "twd": 0.81145,
                    "uah": 0.11703,
                    "usd": 0.27486,
                    "vef": 0.27486,
                    "vnd": 1.06348,
                    "xag": -9.95455,
                    "xau": -6.7958,
                    "xdr": 1.06802,
                    "xlm": 3.53045,
                    "xrp": 5.5305,
                    "yfi": 4.19967,
                    "zar": -1.6257,
                    "bits": -6.21481,
                    "link": 2.91916,
                    "sats": -6.21481
                  },
                  "price_change_percentage_30d_in_currency": {
                    "aed": 0.22686,
                    "ars": 1.87242,
                    "aud": 1.12588,
                    "bch": -36.38999,
                    "bdt": 0.06598,
                    "bhd": 0.14521,
                    "bmd": 0.23778,
                    "bnb": -18.35901,
                    "brl": 2.07514,
                    "btc": -2.5256,
                    "cad": 1.22263,
                    "chf": 3.22081,
                    "clp": -2.11973,
                    "cny": 0.88922,
                    "czk": 1.25296,
                    "dkk": 1.41007,
                    "dot": 18.78155,
                    "eos": 14.18494,
                    "eth": 15.69643,
                    "eur": 1.22693,
                    "gbp": 2.17246,
                    "gel": 1.18163,
                    "hkd": 0.36294,
                    "huf": 0.42147,
                    "idr": 2.64632,
                    "ils": 5.1174,
                    "inr": 0.91625,
                    "jpy": 3.32703,
                    "krw": 2.9829,
                    "kwd": 0.30371,
                    "lkr": -2.67914,
                    "ltc": -14.7498,
                    "mmk": 0.06787,
                    "mxn": -1.80715,
                    "myr": 1.48834,
                    "ngn": -18.53236,
                    "nok": 3.68985,
                    "nzd": 3.16952,
                    "php": 2.1567,
                    "pkr": -0.46486,
                    "pln": 0.89425,
                    "rub": 1.81413,
                    "sar": 0.25218,
                    "sek": 4.97564,
                    "sgd": 1.70026,
                    "thb": 3.66298,
                    "try": 0.55288,
                    "twd": 2.6662,
                    "uah": 1.68112,
                    "usd": 0.23778,
                    "vef": 0.23778,
                    "vnd": 1.35127,
                    "xag": -11.41734,
                    "xau": -6.42701,
                    "xdr": 0.26875,
                    "xlm": 8.72863,
                    "xrp": 3.49755,
                    "yfi": 18.72705,
                    "zar": 0.17562,
                    "bits": -2.5256,
                    "link": 11.99104,
                    "sats": -2.5256
                  },
                  "price_change_percentage_60d_in_currency": {
                    "aed": 0.33306,
                    "ars": 4.02102,
                    "aud": -0.44126,
                    "bch": -65.76904,
                    "bdt": 0.19479,
                    "bhd": 0.25988,
                    "bmd": 0.34535,
                    "bnb": -48.13844,
                    "brl": 2.43383,
                    "btc": -38.48505,
                    "cad": 1.28551,
                    "chf": 3.84523,
                    "clp": -0.7159,
                    "cny": 2.01542,
                    "czk": 1.07049,
                    "dkk": -0.31682,
                    "dot": -21.80148,
                    "eos": -31.75086,
                    "eth": -30.42882,
                    "eur": -0.44975,
                    "gbp": 0.30124,
                    "gel": 1.09983,
                    "hkd": 0.48096,
                    "huf": 0.10941,
                    "idr": 1.84307,
                    "ils": 2.98528,
                    "inr": 0.72708,
                    "jpy": 2.84244,
                    "krw": 2.18746,
                    "kwd": 0.16315,
                    "lkr": -4.36244,
                    "ltc": -33.74326,
                    "mmk": 0.18964,
                    "mxn": -3.07488,
                    "myr": 0.06082,
                    "ngn": 43.54773,
                    "nok": 1.80879,
                    "nzd": 2.04992,
                    "php": 1.34014,
                    "pkr": -0.25215,
                    "pln": -1.76406,
                    "rub": 1.73775,
                    "sar": 0.36291,
                    "sek": 2.3238,
                    "sgd": 0.83195,
                    "thb": 3.33071,
                    "try": 5.19379,
                    "twd": 2.85279,
                    "uah": 3.49377,
                    "usd": 0.34535,
                    "vef": 0.34535,
                    "vnd": 2.56239,
                    "xag": -18.26411,
                    "xau": -12.15048,
                    "xdr": 0.86128,
                    "xlm": -17.32386,
                    "xrp": -15.95294,
                    "yfi": -15.12336,
                    "zar": -0.79,
                    "bits": -38.48505,
                    "link": 3.48984,
                    "sats": -38.48505
                  },
                  "price_change_percentage_200d_in_currency": {
                    "aed": 0.27409,
                    "ars": 146.59495,
                    "aud": -0.94099,
                    "bch": -68.69683,
                    "bdt": 0.09955,
                    "bhd": 0.15109,
                    "bmd": 0.28542,
                    "bnb": -63.08846,
                    "brl": 4.81005,
                    "btc": -61.15308,
                    "cad": 1.61784,
                    "chf": 1.04086,
                    "clp": 6.79019,
                    "cny": -0.47829,
                    "czk": 2.94359,
                    "dkk": -0.75097,
                    "dot": -52.7331,
                    "eos": -44.54766,
                    "eth": -52.12473,
                    "eur": -0.93634,
                    "gbp": -1.69274,
                    "gel": 1.22973,
                    "hkd": 0.3808,
                    "huf": 0.88833,
                    "idr": 3.96384,
                    "ils": -1.24135,
                    "inr": 0.71132,
                    "jpy": 2.92848,
                    "krw": 2.19275,
                    "kwd": -0.16131,
                    "lkr": -7.6736,
                    "ltc": -36.99859,
                    "mmk": 0.09711,
                    "mxn": -3.12141,
                    "myr": 1.37443,
                    "ngn": 67.82109,
                    "nok": 0.50372,
                    "nzd": -0.34572,
                    "php": 0.11647,
                    "pkr": -5.57784,
                    "pln": -8.1674,
                    "rub": -3.83937,
                    "sar": 0.28237,
                    "sek": -3.17098,
                    "sgd": -0.57356,
                    "thb": 2.17015,
                    "try": 18.96991,
                    "twd": 0.72026,
                    "uah": 5.2582,
                    "usd": 0.28542,
                    "vef": 0.28542,
                    "vnd": 3.07509,
                    "xag": -14.25394,
                    "xau": -16.35411,
                    "xdr": -0.30858,
                    "xlm": -9.47159,
                    "xrp": -13.50921,
                    "yfi": -36.14047,
                    "zar": -0.0392,
                    "bits": -61.15308,
                    "link": -61.01735,
                    "sats": -61.15308
                  },
                  "price_change_percentage_1y_in_currency": {
                    "aed": 0.26525,
                    "ars": 308.7285,
                    "aud": 1.56451,
                    "bch": -81.88425,
                    "bdt": 3.7953,
                    "bhd": 0.15187,
                    "bmd": 0.26784,
                    "bnb": -46.78318,
                    "brl": 0.45006,
                    "btc": -60.06751,
                    "cad": 0.83133,
                    "chf": -0.11602,
                    "clp": 15.1576,
                    "cny": 5.54632,
                    "czk": 9.38824,
                    "dkk": 1.0297,
                    "dot": -28.69493,
                    "eos": 16.06949,
                    "eth": -45.34626,
                    "eur": 0.82449,
                    "gbp": -1.47721,
                    "gel": 5.17331,
                    "hkd": 0.01238,
                    "huf": 5.1392,
                    "idr": 6.6139,
                    "ils": 4.38536,
                    "inr": 2.07095,
                    "jpy": 15.09363,
                    "krw": 2.95664,
                    "kwd": 0.36419,
                    "lkr": -6.37707,
                    "ltc": -11.73068,
                    "mmk": 0.11137,
                    "mxn": -9.08906,
                    "myr": 8.11301,
                    "ngn": 179.16204,
                    "nok": 2.48686,
                    "nzd": 4.08076,
                    "php": 3.96895,
                    "pkr": -2.01262,
                    "pln": -7.63529,
                    "rub": 13.73969,
                    "sar": 0.23249,
                    "sek": 2.28993,
                    "sgd": 1.61669,
                    "thb": 7.3578,
                    "try": 66.98378,
                    "twd": 5.92998,
                    "uah": 5.75518,
                    "usd": 0.26784,
                    "vef": 0.26784,
                    "vnd": 6.76382,
                    "xag": -8.91935,
                    "xau": -13.59483,
                    "xdr": 1.81677,
                    "xlm": -18.6887,
                    "xrp": -15.15288,
                    "yfi": 2.28685,
                    "zar": 2.80774,
                    "bits": -60.06751,
                    "link": -59.29775,
                    "sats": -60.06751
                  },
                  "market_cap_change_24h_in_currency": {
                    "aed": 44946569,
                    "ars": 8988517241,
                    "aud": 15871670,
                    "bch": 509943,
                    "bdt": 1144764772,
                    "bhd": -11514709.8968201,
                    "bmd": 10444980,
                    "bnb": -140471.262599774,
                    "brl": 49292153,
                    "btc": -13412.9923923103,
                    "cad": 14195251,
                    "chf": 9420150,
                    "clp": -308207330384.047,
                    "cny": 75542277,
                    "czk": 243997877,
                    "dkk": 71886534,
                    "dot": -106704547.220642,
                    "eos": -1004280018.51081,
                    "eth": -200865.124155022,
                    "eur": -5160992.71690369,
                    "gbp": 8264737,
                    "gel": 27992548,
                    "hkd": 81783675,
                    "huf": 3269263468,
                    "idr": 165947238327,
                    "ils": -424989183.342224,
                    "inr": 870036206,
                    "jpy": 1583511263,
                    "krw": 14113988289,
                    "kwd": -4234047.01619148,
                    "lkr": 3119004632,
                    "ltc": -7317729.50461823,
                    "mmk": 21903673423,
                    "mxn": 171857531,
                    "myr": 49587545,
                    "ngn": 13522447056,
                    "nok": 112068373,
                    "nzd": 17367778,
                    "php": 591081455,
                    "pkr": 2898908024,
                    "pln": 41251270,
                    "rub": 966233160,
                    "sar": 39179404,
                    "sek": 111520900,
                    "sgd": 14094582,
                    "thb": 382486818,
                    "try": 334986201,
                    "twd": 335557531,
                    "uah": -1322036717.14111,
                    "usd": 10444980,
                    "vef": 1045856,
                    "vnd": 260766059925,
                    "xag": 227836,
                    "xau": 4482.99,
                    "xdr": 7877897,
                    "xlm": -1991231699.57169,
                    "xrp": -570258604.427063,
                    "yfi": -36804.9171342198,
                    "zar": 195289800,
                    "bits": -13412992392.3103,
                    "link": -22696958.0787933,
                    "sats": -1341299239231.03
                  },
                  "market_cap_change_percentage_24h_in_currency": {
                    "aed": 0.03716,
                    "ars": 0.03171,
                    "aud": 0.03171,
                    "bch": 1.07717,
                    "bdt": 0.03171,
                    "bhd": -0.09274,
                    "bmd": 0.03171,
                    "bnb": -0.24905,
                    "brl": 0.02954,
                    "btc": -2.77002,
                    "cad": 0.03171,
                    "chf": 0.03171,
                    "clp": -0.98557,
                    "cny": 0.03171,
                    "czk": 0.03171,
                    "dkk": 0.03171,
                    "dot": -2.7386,
                    "eos": -3.07115,
                    "eth": -2.03436,
                    "eur": -0.01699,
                    "gbp": 0.03171,
                    "gel": 0.03171,
                    "hkd": 0.03171,
                    "huf": 0.02757,
                    "idr": 0.03171,
                    "ils": -0.34289,
                    "inr": 0.03171,
                    "jpy": 0.03171,
                    "krw": 0.03171,
                    "kwd": -0.0418,
                    "lkr": 0.03171,
                    "ltc": -2.23134,
                    "mmk": 0.03171,
                    "mxn": 0.03171,
                    "myr": 0.03171,
                    "ngn": 0.03171,
                    "nok": 0.03171,
                    "nzd": 0.03171,
                    "php": 0.03171,
                    "pkr": 0.03171,
                    "pln": 0.03171,
                    "rub": 0.03171,
                    "sar": 0.03171,
                    "sek": 0.03171,
                    "sgd": 0.03171,
                    "thb": 0.03171,
                    "try": 0.03171,
                    "twd": 0.03171,
                    "uah": -0.10336,
                    "usd": 0.03171,
                    "vef": 0.03171,
                    "vnd": 0.03171,
                    "xag": 0.01901,
                    "xau": 0.03171,
                    "xdr": 0.03171,
                    "xlm": -0.77954,
                    "xrp": -1.0259,
                    "yfi": -0.9333,
                    "zar": 0.03171,
                    "bits": -2.77002,
                    "link": -1.20924,
                    "sats": -2.77002
                  },
                  "total_supply": 32937454819.1184,
                  "max_supply": null,
                  "circulating_supply": 32936427353.685,
                  "last_updated": "2024-04-07T16:35:22.339Z"
                },
                "community_data": {
                  "facebook_likes": null,
                  "twitter_followers": 181202,
                  "reddit_average_posts_48h": 0,
                  "reddit_average_comments_48h": 0,
                  "reddit_subscribers": 0,
                  "reddit_accounts_active_48h": 0,
                  "telegram_channel_user_count": null
                },
                "developer_data": {
                  "forks": 277,
                  "stars": 491,
                  "subscribers": 34,
                  "total_issues": 47,
                  "closed_issues": 36,
                  "pull_requests_merged": 260,
                  "pull_request_contributors": 21,
                  "code_additions_deletions_4_weeks": {
                    "additions": 68,
                    "deletions": -15
                  },
                  "commit_count_4_weeks": 5,
                  "last_4_weeks_commit_activity_series": [
                    0,
                    0,
                    0,
                    0,
                    1,
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    1,
                    0,
                    1,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                  ]
                },
                "status_updates": [],
                "last_updated": "2024-04-07T16:35:22.339Z",
                "tickers": [
                  {
                    "base": "USDC",
                    "target": "USDT",
                    "market": {
                      "name": "Bitunix",
                      "identifier": "bitunix",
                      "has_trading_incentive": false
                    },
                    "last": 0.9998,
                    "volume": 12225554.4877,
                    "converted_last": {
                      "btc": 0.00001435,
                      "eth": 0.00029359,
                      "usd": 0.999143
                    },
                    "converted_volume": {
                      "btc": 175.375,
                      "eth": 3589,
                      "usd": 12213859
                    },
                    "trust_score": "green",
                    "bid_ask_spread_percentage": 0.010001,
                    "timestamp": "2024-04-07T15:34:49+00:00",
                    "last_traded_at": "2024-04-07T15:34:49+00:00",
                    "last_fetch_at": "2024-04-07T15:34:49+00:00",
                    "is_anomaly": false,
                    "is_stale": false,
                    "trade_url": "https://www.bitunix.com/spot-trade?symbol=USDCUSDT",
                    "token_info_url": null,
                    "coin_id": "usd-coin",
                    "target_coin_id": "tether"
                  }
                ]
              }
            }
          ]
        },
        "AssetPlatforms": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "asset platform id"
            },
            "chain_identifier": {
              "type": "number",
              "description": "chainlist's chain id",
              "nullable": true
            },
            "name": {
              "type": "string",
              "description": "chain name"
            },
            "shortname": {
              "type": "string",
              "description": "chain shortname"
            },
            "native_coin_id": {
              "type": "string",
              "description": "chain native coin id"
            }
          },
          "example": [
            {
              "id": "polygon-pos",
              "chain_identifier": 137,
              "name": "Polygon POS",
              "shortname": "MATIC",
              "native_coin_id": "matic-network"
            },
            {
              "id": "ethereum",
              "chain_identifier": 1,
              "name": "Ethereum",
              "shortname": "Ethereum",
              "native_coin_id": "ethereum"
            },
            {
              "id": "stargaze",
              "chain_identifier": null,
              "name": "Stargaze",
              "shortname": "",
              "native_coin_id": "stargaze"
            }
          ]
        },
        "CategoriesList": {
          "type": "object",
          "properties": {
            "category_id": {
              "type": "string",
              "description": "category id"
            },
            "name": {
              "type": "string",
              "description": "category name"
            }
          },
          "example": [
            {
              "category_id": "aave-tokens",
              "name": "Aave Tokens"
            },
            {
              "category_id": "aaccount-abstraction",
              "name": "Account Abstraction"
            }
          ]
        },
        "Categories": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "category id"
            },
            "name": {
              "type": "string",
              "description": "category name"
            },
            "market_cap": {
              "type": "number",
              "description": "category market cap"
            },
            "market_cap_change_24h": {
              "type": "number",
              "description": "category market cap change in 24 hours"
            },
            "content": {
              "type": "string",
              "description": "category description"
            },
            "top_3_coins": {
              "type": "array",
              "description": "top 3 coins in the category",
              "items": {
                "type": "string"
              }
            },
            "volume_24h": {
              "type": "number",
              "description": "category volume in 24 hours"
            },
            "updated_at": {
              "type": "string",
              "description": "category last updated time"
            }
          },
          "example": [
            {
              "id": "layer-1",
              "name": "Layer 1 (L1)",
              "market_cap": 2061406861196.14,
              "market_cap_change_24h": -0.66091235190398,
              "content": "",
              "top_3_coins": [
                "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1696501400",
                "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1696501628",
                "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1696501970"
              ],
              "volume_24h": 61146432400.1739,
              "updated_at": "2024-04-06T08:25:46.402Z"
            },
            {
              "id": "smart-contract-platform",
              "name": "Smart Contract Platform",
              "market_cap": 744929499224.655,
              "market_cap_change_24h": -0.584411329310148,
              "content": "Smart contract platforms are usually blockchains that host smart contracts or decentralized applications...",
              "top_3_coins": [
                "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1696501628",
                "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1696501970",
                "https://assets.coingecko.com/coins/images/4128/small/solana.png?1696504756"
              ],
              "volume_24h": 30987638383.6307,
              "updated_at": "2024-04-06T08:25:33.203Z"
            }
          ]
        },
        "Exchanges": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "exchange id"
            },
            "name": {
              "type": "string",
              "description": "exchange name"
            },
            "year_established": {
              "type": "number",
              "description": "exchange established year"
            },
            "country": {
              "type": "string",
              "description": "exchange country"
            },
            "description": {
              "type": "string",
              "description": "exchange description"
            },
            "url": {
              "type": "string",
              "description": "exchange website url"
            },
            "image": {
              "type": "string",
              "description": "exchange image url"
            },
            "has_trading_incentive": {
              "type": "boolean",
              "description": "exchange trading incentive"
            },
            "trust_score": {
              "type": "number",
              "description": "exchange trust score"
            },
            "trust_score_rank": {
              "type": "number",
              "description": "exchange trust score rank"
            },
            "trade_volume_24h_btc": {
              "type": "number",
              "description": "exchange trade volume in BTC in 24 hours"
            },
            "trade_volume_24h_btc_normalized": {
              "type": "number",
              "description": "normalized trading volume by traffic in BTC in 24 hours \u003Cbr\u003E*refers to [`this blog`](https://blog.coingecko.com/trust-score/)."
            }
          },
          "example": [
            {
              "id": "bybit_spot",
              "name": "Bybit",
              "year_established": 2018,
              "country": "British Virgin Islands",
              "description": "Bybit is a cryptocurrency exchange that offers a professional platform featuring an ultra-fast matching engine, excellent customer service and multilingual community support for crypto traders of all levels...",
              "url": "https://www.bybit.com",
              "image": "https://assets.coingecko.com/markets/images/698/small/bybit_spot.png?1706864649",
              "has_trading_incentive": false,
              "trust_score": 10,
              "trust_score_rank": 1,
              "trade_volume_24h_btc": 51075.6271283852,
              "trade_volume_24h_btc_normalized": 47765.5886637453
            },
            {
              "id": "gdax",
              "name": "Coinbase Exchange",
              "year_established": 2012,
              "country": "United States",
              "description": "",
              "url": "https://www.coinbase.com/",
              "image": "https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png?1706864258",
              "has_trading_incentive": false,
              "trust_score": 10,
              "trust_score_rank": 2,
              "trade_volume_24h_btc": 37443.7299607648,
              "trade_volume_24h_btc_normalized": 37443.7299607648
            }
          ]
        },
        "ExchangesList": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "exchange id"
            },
            "name": {
              "type": "string",
              "description": "exchange name"
            }
          },
          "example": [
            {
              "id": "10kswap-starknet-alpha",
              "name": "10KSwap"
            },
            {
              "id": "1bch",
              "name": "1BCH"
            },
            {
              "id": "3xcalibur",
              "name": "3xcalibur"
            }
          ]
        },
        "ExchangeData": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "exchange name"
            },
            "year_established": {
              "type": "number",
              "description": "exchange established year"
            },
            "country": {
              "type": "string",
              "description": "exchange incorporated country"
            },
            "description": {
              "type": "string",
              "description": "exchange description"
            },
            "url": {
              "type": "string",
              "description": "exchange website url"
            },
            "image": {
              "type": "string",
              "description": "exchange image url"
            },
            "facebook_url": {
              "type": "string",
              "description": "exchange facebook url"
            },
            "reddit_url": {
              "type": "string",
              "description": "exchange reddit url"
            },
            "telegram_url": {
              "type": "string",
              "description": "exchange telegram url"
            },
            "slack_url": {
              "type": "string",
              "description": "exchange slack url"
            },
            "other_url_1": {
              "type": "string"
            },
            "other_url_2": {
              "type": "string"
            },
            "twitter_handle": {
              "type": "string",
              "description": "exchange twitter handle"
            },
            "has_trading_incentive": {
              "type": "boolean",
              "description": "exchange trading incentive"
            },
            "centralized": {
              "type": "boolean",
              "description": "exchange type (true for centralized, false for decentralized)"
            },
            "public_notice": {
              "type": "string",
              "description": "public notice for exchange"
            },
            "alert_notice": {
              "type": "string",
              "description": "alert notice for exchange"
            },
            "trust_score": {
              "type": "number",
              "description": "exchange trust score"
            },
            "trust_score_rank": {
              "type": "number",
              "description": "exchange trust score rank"
            },
            "trade_volume_24h_btc": {
              "type": "number"
            },
            "trade_volume_24h_btc_normalized": {
              "type": "number",
              "description": "normalized trading volume by traffic in BTC in 24 hours \u003Cbr\u003E*refers to [`this blog`](https://blog.coingecko.com/trust-score/)."
            },
            "tickers": {
              "type": "array"
            }
          },
          "example": {
            "name": "Binance",
            "year_established": 2017,
            "country": "Cayman Islands",
            "description": "",
            "url": "https://www.binance.com/",
            "image": "https://assets.coingecko.com/markets/images/52/small/binance.jpg?1706864274",
            "facebook_url": "https://www.facebook.com/binanceexchange",
            "reddit_url": "https://www.reddit.com/r/binance/",
            "telegram_url": "",
            "slack_url": "",
            "other_url_1": "https://medium.com/binanceexchange",
            "other_url_2": "https://steemit.com/@binanceexchange",
            "twitter_handle": "binance",
            "has_trading_incentive": false,
            "centralized": true,
            "public_notice": "",
            "alert_notice": "",
            "trust_score": 9,
            "trust_score_rank": 6,
            "trade_volume_24h_btc": 207319.133772613,
            "trade_volume_24h_btc_normalized": 81673.2971244154,
            "tickers": [
              {
                "base": "BTC",
                "target": "USDT",
                "market": {
                  "name": "Binance",
                  "identifier": "binance",
                  "has_trading_incentive": false,
                  "logo": "https://assets.coingecko.com/markets/images/52/small/binance.jpg?1706864274"
                },
                "last": 69476,
                "volume": 20242.03975,
                "cost_to_move_up_usd": 19320706.3958517,
                "cost_to_move_down_usd": 16360235.3694131,
                "converted_last": {
                  "btc": 1.000205,
                  "eth": 20.291404,
                  "usd": 69498
                },
                "converted_volume": {
                  "btc": 20249,
                  "eth": 410802,
                  "usd": 1406996874
                },
                "trust_score": "green",
                "bid_ask_spread_percentage": 0.010014,
                "timestamp": "2024-04-08T04:02:01+00:00",
                "last_traded_at": "2024-04-08T04:02:01+00:00",
                "last_fetch_at": "2024-04-08T04:03:00+00:00",
                "is_anomaly": false,
                "is_stale": false,
                "trade_url": "https://www.binance.com/en/trade/BTC_USDT?ref=37754157",
                "token_info_url": null,
                "coin_id": "bitcoin",
                "target_coin_id": "tether"
              }
            ]
          }
        },
        "ExchangeTickers": {
          "allOf": [
            {
              "$ref": "#/components/schemas/CoinsTickers"
            },
            {
              "example": {
                "name": "Binance",
                "tickers": [
                  {
                    "base": "BTC",
                    "target": "USDT",
                    "market": {
                      "name": "Binance",
                      "identifier": "binance",
                      "has_trading_incentive": false,
                      "logo": "https://assets.coingecko.com/markets/images/52/small/binance.jpg?1706864274"
                    },
                    "last": 69476,
                    "volume": 20242.03975,
                    "cost_to_move_up_usd": 19320706.3958517,
                    "cost_to_move_down_usd": 16360235.3694131,
                    "converted_last": {
                      "btc": 1.000205,
                      "eth": 20.291404,
                      "usd": 69498
                    },
                    "converted_volume": {
                      "btc": 20249,
                      "eth": 410802,
                      "usd": 1406996874
                    },
                    "trust_score": "green",
                    "bid_ask_spread_percentage": 0.010014,
                    "timestamp": "2024-04-08T04:02:01+00:00",
                    "last_traded_at": "2024-04-08T04:02:01+00:00",
                    "last_fetch_at": "2024-04-08T04:03:00+00:00",
                    "is_anomaly": false,
                    "is_stale": false,
                    "trade_url": "https://www.binance.com/en/trade/BTC_USDT?ref=37754157",
                    "token_info_url": null,
                    "coin_id": "bitcoin",
                    "target_coin_id": "tether"
                  }
                ]
              }
            }
          ]
        },
        "ExchangeVolumeChart": {
          "type": "array",
          "items": {
            "type": "array",
            "items": {
              "type": "number"
            }
          },
          "example": [
            [
              1711792200000,
              "306800.0517941023777005"
            ],
            [
              1711795800000,
              "302561.8185582217570913"
            ],
            [
              1711799400000,
              "298240.5127048246776691"
            ]
          ]
        },
        "DerivativesTickersList": {
          "type": "object",
          "properties": {
            "market": {
              "type": "string",
              "description": "derivative market name"
            },
            "symbol": {
              "type": "string",
              "description": "derivative ticker symbol"
            },
            "index_id": {
              "type": "string",
              "description": "derivative underlying asset"
            },
            "price": {
              "type": "string",
              "description": "derivative ticker price"
            },
            "price_percentage_change_24h": {
              "type": "number",
              "description": "derivative ticker price percentage change in 24 hours"
            },
            "contract_type": {
              "type": "string",
              "description": "derivative contract type"
            },
            "index": {
              "type": "number",
              "description": "derivative underlying asset price"
            },
            "basis": {
              "type": "number",
              "description": "difference of derivative price and index price"
            },
            "spread": {
              "type": "number",
              "description": "derivative bid ask spread"
            },
            "funding_rate": {
              "type": "number",
              "description": "derivative funding rate"
            },
            "open_interest": {
              "type": "number",
              "description": "derivative open interest"
            },
            "volume_24h": {
              "type": "number",
              "description": "derivative volume in 24 hours"
            },
            "last_traded_at": {
              "type": "number",
              "description": "derivative last updated time"
            },
            "expired_at": {
              "type": "string",
              "nullable": true
            }
          },
          "example": [
            {
              "market": "Deepcoin (Derivatives)",
              "symbol": "ETHUSDT",
              "index_id": "ETH",
              "price": "3395.91",
              "price_percentage_change_24h": 1.5274069068216,
              "contract_type": "perpetual",
              "index": 3393.5342,
              "basis": -0.0523015571479482,
              "spread": 0.01,
              "funding_rate": -0.007182,
              "open_interest": 9327998764.66,
              "volume_24h": 392642535.232121,
              "last_traded_at": 1712467658,
              "expired_at": null
            },
            {
              "market": "BYDFi (Futures)",
              "symbol": "BTC-PERPUSDT",
              "index_id": "BTC",
              "price": "69434.1",
              "price_percentage_change_24h": 2.04057930105749,
              "contract_type": "perpetual",
              "index": 69407.5,
              "basis": -0.000576303273834822,
              "spread": 0.01,
              "funding_rate": 0.012,
              "open_interest": 7690212057.6,
              "volume_24h": 132888173.547,
              "last_traded_at": 1712467920,
              "expired_at": null
            }
          ]
        },
        "DerivativesExchanges": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "derivatives exchange name"
            },
            "id": {
              "type": "string",
              "description": "derivatives exchange id"
            },
            "open_interest_btc": {
              "type": "number",
              "description": "derivatives exchange open interest in BTC"
            },
            "trade_volume_24h_btc": {
              "type": "string",
              "description": "derivatives exchange trade volume in BTC in 24 hours"
            },
            "number_of_perpetual_pairs": {
              "type": "number",
              "description": "number of perpetual pairs in the derivatives exchange"
            },
            "number_of_futures_pairs": {
              "type": "number",
              "description": "number of futures pairs in the derivatives exchange"
            },
            "image": {
              "type": "string",
              "description": "derivatives exchange image url"
            },
            "year_established": {
              "type": "number",
              "description": "derivatives exchange established year",
              "nullable": true
            },
            "country": {
              "type": "string",
              "description": "derivatives exchange incorporated country",
              "nullable": true
            },
            "description": {
              "type": "string",
              "description": "derivatives exchange description"
            },
            "url": {
              "type": "string",
              "description": "derivatives exchange website url"
            }
          },
          "example": [
            {
              "name": "Binance (Futures)",
              "id": "binance_futures",
              "open_interest_btc": 279958.61,
              "trade_volume_24h_btc": "574366.94",
              "number_of_perpetual_pairs": 330,
              "number_of_futures_pairs": 44,
              "image": "https://assets.coingecko.com/markets/images/466/small/binance_futures.jpg?1706864452",
              "year_established": 2019,
              "country": null,
              "description": "",
              "url": "https://www.binance.com/"
            },
            {
              "name": "Bitget Futures",
              "id": "bitget_futures",
              "open_interest_btc": 123267.93,
              "trade_volume_24h_btc": "228027.47",
              "number_of_perpetual_pairs": 254,
              "number_of_futures_pairs": 0,
              "image": "https://assets.coingecko.com/markets/images/591/small/2023-07-25_21.47.43.jpg?1706864543",
              "year_established": null,
              "country": null,
              "description": "",
              "url": "https://www.bitget.com/en/"
            }
          ]
        },
        "DerivativesExchangesID": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "derivatives exchange name"
            },
            "open_interest_btc": {
              "type": "number",
              "description": "derivatives exchange open interest in BTC"
            },
            "trade_volume_24h_btc": {
              "type": "string",
              "description": "derivatives exchange trade volume in BTC in 24 hours"
            },
            "number_of_perpetual_pairs": {
              "type": "number",
              "description": "number of perpetual pairs in the derivatives exchange"
            },
            "number_of_futures_pairs": {
              "type": "number",
              "description": "number of futures pairs in the derivatives exchange"
            },
            "image": {
              "type": "string",
              "description": "derivatives exchange image url"
            },
            "year_established": {
              "type": "number",
              "description": "derivatives exchange established year",
              "nullable": true
            },
            "country": {
              "type": "string",
              "description": "derivatives exchange incorporated country",
              "nullable": true
            },
            "description": {
              "type": "string",
              "description": "derivatives exchange description"
            },
            "url": {
              "type": "string",
              "description": "derivatives exchange website url"
            },
            "tickers": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/DerivativesTickersList"
              }
            }
          },
          "example": {
            "name": "Binance (Futures)",
            "open_interest_btc": 280210.26,
            "trade_volume_24h_btc": "568502.31",
            "number_of_perpetual_pairs": 330,
            "number_of_futures_pairs": 44,
            "image": "https://assets.coingecko.com/markets/images/466/small/binance_futures.jpg?1706864452",
            "year_established": 2019,
            "country": null,
            "description": "",
            "url": "https://www.binance.com/",
            "tickers": {
              "tickers": [
                {
                  "symbol": "1000BONKUSDT",
                  "base": "1000BONK",
                  "target": "USDT",
                  "trade_url": "https://www.binance.com/en/futuresng/1000BONKUSDT",
                  "contract_type": "perpetual",
                  "last": 0.023,
                  "h24_percentage_change": -0.811,
                  "index": 0.0229866,
                  "index_basis_percentage": -0.071,
                  "bid_ask_spread": 0.000217533173808922,
                  "funding_rate": 0.005,
                  "open_interest_usd": 28102263.9997715,
                  "h24_volume": 2679284723,
                  "converted_volume": {
                    "btc": "888.799603175094638929930629459045946",
                    "eth": "18029.8066338945133622149580216234476206402026327668",
                    "usd": "61648664.9602525617243462802989936852339753270611794"
                  },
                  "converted_last": {
                    "btc": "0.000000331730179904099217651505502",
                    "eth": "0.0000067293358108303271067525726423602078742716",
                    "usd": "0.0230093742673322299700755918127159362875878"
                  },
                  "last_traded": 1712550723,
                  "expired_at": null
                }
              ]
            }
          }
        },
        "DerivativesExchangesList": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "derivatives exchange id"
            },
            "name": {
              "type": "string",
              "description": "derivatives exchange name"
            }
          },
          "example": [
            {
              "id": "binance_futures",
              "name": "Binance (Futures)"
            },
            {
              "id": "bybit",
              "name": "Bybit (Futures)"
            },
            {
              "id": "deepcoin_derivatives",
              "name": "Deepcoin (Derivatives)"
            }
          ]
        },
        "NFTList": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "nft collection id"
            },
            "contract_address": {
              "type": "string",
              "description": "nft collection contract address"
            },
            "name": {
              "type": "string",
              "description": "nft collection name"
            },
            "asset_platform_id": {
              "type": "string",
              "description": "nft collection asset platform id"
            },
            "symbol": {
              "type": "string",
              "description": "nft collection symbol"
            }
          },
          "example": [
            {
              "id": "bored-ape-yacht-club",
              "contract_address": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
              "name": "Bored Ape Yacht Club",
              "asset_platform_id": "ethereum",
              "symbol": "BAYC"
            },
            {
              "id": "pudgy-penguins",
              "contract_address": "0xBd3531dA5CF5857e7CfAA92426877b022e612cf8",
              "name": "Pudgy Penguins",
              "asset_platform_id": "ethereum",
              "symbol": "PPG"
            }
          ]
        },
        "NFTData": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "nft collection id"
            },
            "contract_address": {
              "type": "string",
              "description": "nft collection contract address"
            },
            "asset_platform_id": {
              "type": "string",
              "description": "nft collection asset platform id"
            },
            "name": {
              "type": "string",
              "description": "nft collection name"
            },
            "symbol": {
              "type": "string",
              "description": "nft collection symbol"
            },
            "image": {
              "type": "object",
              "description": "nft collection image url",
              "properties": {
                "small": {
                  "type": "string"
                }
              }
            },
            "description": {
              "type": "string",
              "description": "nft collection description"
            },
            "native_currency": {
              "type": "string",
              "description": "nft collection native currency"
            },
            "native_currency_symbol": {
              "type": "string",
              "description": "nft collection native currency symbol"
            },
            "floor_price": {
              "type": "object",
              "description": "nft collection floor price",
              "properties": {
                "native_currency": {
                  "type": "number"
                },
                "usd": {
                  "type": "number"
                }
              }
            },
            "market_cap": {
              "type": "object",
              "description": "nft collection market cap",
              "properties": {
                "native_currency": {
                  "type": "number"
                },
                "usd": {
                  "type": "number"
                }
              }
            },
            "volume_24h": {
              "type": "object",
              "description": "nft collection volume in 24 hours",
              "properties": {
                "native_currency": {
                  "type": "number"
                },
                "usd": {
                  "type": "number"
                }
              }
            },
            "floor_price_in_usd_24h_percentage_change": {
              "type": "number",
              "description": "nft collection floor price in usd 24 hours percentage change"
            },
            "floor_price_24h_percentage_change": {
              "type": "object",
              "properties": {
                "usd": {
                  "type": "number"
                },
                "native_currency": {
                  "type": "number"
                }
              }
            },
            "market_cap_24h_percentage_change": {
              "type": "object",
              "description": "nft collection market cap 24 hours percentage change",
              "properties": {
                "usd": {
                  "type": "number"
                },
                "native_currency": {
                  "type": "number"
                }
              }
            },
            "volume_24h_percentage_change": {
              "type": "object",
              "description": "nft collection volume in 24 hours percentage change",
              "properties": {
                "usd": {
                  "type": "number"
                },
                "native_currency": {
                  "type": "number"
                }
              }
            },
            "number_of_unique_addresses": {
              "type": "number",
              "description": "number of unique address owning the nfts"
            },
            "number_of_unique_addresses_24h_percentage_change": {
              "type": "number",
              "description": "number of unique address owning the nfts 24 hours percentage change"
            },
            "volume_in_usd_24h_percentage_change": {
              "type": "number",
              "description": "nft collection volume in usd 24 hours percentage change"
            },
            "total_supply": {
              "type": "number",
              "description": "nft collection total supply"
            },
            "one_day_sales": {
              "type": "number",
              "description": "nft collection one day sales"
            },
            "one_day_sales_24h_percentage_change": {
              "type": "number",
              "description": "nft collection one day sales 24 hours percentage change"
            },
            "one_day_average_sale_price": {
              "type": "number",
              "description": "nft collection one day average sale price"
            },
            "one_day_average_sale_price_24h_percentage_change": {
              "type": "number",
              "description": "nft collection one day average sale price 24 hours percentage change"
            },
            "links": {
              "type": "object",
              "description": "nft collection links",
              "properties": {
                "homepage": {
                  "type": "string"
                },
                "twitter": {
                  "type": "string"
                },
                "discord": {
                  "type": "string"
                }
              }
            },
            "floor_price_7d_percentage_change": {
              "type": "object",
              "description": "nft collection floor price 7 days percentage change",
              "properties": {
                "usd": {
                  "type": "number"
                },
                "native_currency": {
                  "type": "number"
                }
              }
            },
            "floor_price_14d_percentage_change": {
              "type": "object",
              "description": "nft collection floor price 14 days percentage change",
              "properties": {
                "usd": {
                  "type": "number"
                },
                "native_currency": {
                  "type": "number"
                }
              }
            },
            "floor_price_30d_percentage_change": {
              "type": "object",
              "description": "nft collection floor price 30 days percentage change",
              "properties": {
                "usd": {
                  "type": "number"
                },
                "native_currency": {
                  "type": "number"
                }
              }
            },
            "floor_price_60d_percentage_change": {
              "type": "object",
              "description": "nft collection floor price 60 days percentage change",
              "properties": {
                "usd": {
                  "type": "number"
                },
                "native_currency": {
                  "type": "number"
                }
              }
            },
            "floor_price_1y_percentage_change": {
              "type": "object",
              "description": "nft collection floor price 1 year percentage change",
              "properties": {
                "usd": {
                  "type": "number"
                },
                "native_currency": {
                  "type": "number"
                }
              }
            },
            "explorers": {
              "type": "array",
              "description": "nft collection block explorers links",
              "items": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "link": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "example": {
            "id": "pudgy-penguins",
            "contract_address": "0xBd3531dA5CF5857e7CfAA92426877b022e612cf8",
            "asset_platform_id": "ethereum",
            "name": "Pudgy Penguins",
            "symbol": "PPG",
            "image": {
              "small": "https://assets.coingecko.com/nft_contracts/images/38/small/da64989d9762c8a61b3c65917edfdf97.png?1707287183"
            },
            "description": "Pudgy Penguins is a collection of 8,888 unique NFTs featuring cute cartoon penguins, which are generated from a collection of 150 different hand-drawn traits.",
            "native_currency": "ethereum",
            "native_currency_symbol": "ETH",
            "floor_price": {
              "native_currency": 12.5,
              "usd": 42317
            },
            "market_cap": {
              "native_currency": 111100,
              "usd": 376114941
            },
            "volume_24h": {
              "native_currency": 429.88,
              "usd": 1455314
            },
            "floor_price_in_usd_24h_percentage_change": 1.07067,
            "floor_price_24h_percentage_change": {
              "usd": 1.07067060717791,
              "native_currency": 1.21457489878543
            },
            "market_cap_24h_percentage_change": {
              "usd": 1.07067060717767,
              "native_currency": -0.404858299595142
            },
            "volume_24h_percentage_change": {
              "usd": -3.19833776698741,
              "native_currency": -1.80185531390094
            },
            "number_of_unique_addresses": 4752,
            "number_of_unique_addresses_24h_percentage_change": 0.08425,
            "volume_in_usd_24h_percentage_change": -3.19834,
            "total_supply": 8888,
            "one_day_sales": 36,
            "one_day_sales_24h_percentage_change": -2.7027027027027,
            "one_day_average_sale_price": 11.9411943888889,
            "one_day_average_sale_price_24h_percentage_change": 0.925870927379588,
            "links": {
              "homepage": "https://www.pudgypenguins.com/",
              "twitter": "https://twitter.com/pudgypenguins",
              "discord": "https://discord.gg/pudgypenguins"
            },
            "floor_price_7d_percentage_change": {
              "usd": -18.0014948262365,
              "native_currency": -13.7931034482759
            },
            "floor_price_14d_percentage_change": {
              "usd": -8.63235339431041,
              "native_currency": -8.61905110022663
            },
            "floor_price_30d_percentage_change": {
              "usd": -14.3765649314409,
              "native_currency": -0.777901254167328
            },
            "floor_price_60d_percentage_change": {
              "usd": 15.2779758703282,
              "native_currency": -18.0327868852459
            },
            "floor_price_1y_percentage_change": {
              "usd": 429.5685372855,
              "native_currency": 196.208530805687
            },
            "explorers": [
              {
                "name": "Etherscan",
                "link": "https://etherscan.io/token/0xBd3531dA5CF5857e7CfAA92426877b022e612cf8"
              },
              {
                "name": "Ethplorer",
                "link": "https://ethplorer.io/address/0xBd3531dA5CF5857e7CfAA92426877b022e612cf8"
              }
            ]
          }
        },
        "ExchangeRates": {
          "type": "object",
          "properties": {
            "rates": {
              "type": "object",
              "additionalProperties": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "name of the currency"
                  },
                  "unit": {
                    "type": "string",
                    "description": "unit of the currency"
                  },
                  "value": {
                    "type": "number",
                    "description": "value of the currency"
                  },
                  "type": {
                    "type": "string",
                    "description": "type of the currency"
                  }
                }
              }
            }
          },
          "example": {
            "rates": {
              "btc": {
                "name": "Bitcoin",
                "unit": "BTC",
                "value": 1,
                "type": "crypto"
              },
              "eth": {
                "name": "Ether",
                "unit": "ETH",
                "value": 20.656,
                "type": "crypto"
              },
              "ltc": {
                "name": "Litecoin",
                "unit": "LTC",
                "value": 684.945,
                "type": "crypto"
              },
              "bch": {
                "name": "Bitcoin Cash",
                "unit": "BCH",
                "value": 102.254,
                "type": "crypto"
              },
              "bnb": {
                "name": "Binance Coin",
                "unit": "BNB",
                "value": 119.846,
                "type": "crypto"
              }
            }
          }
        },
        "Search": {
          "type": "object",
          "properties": {
            "coins": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "description": "coin id"
                  },
                  "name": {
                    "type": "string",
                    "description": "coin name"
                  },
                  "api_symbol": {
                    "type": "string",
                    "description": "coin api symbol"
                  },
                  "symbol": {
                    "type": "string",
                    "description": "coin symbol"
                  },
                  "market_cap_rank": {
                    "type": "number",
                    "description": "coin market cap rank"
                  },
                  "thumb": {
                    "type": "string",
                    "description": "coin thumb image url"
                  },
                  "large": {
                    "type": "string",
                    "description": "coin large image url"
                  }
                }
              }
            },
            "exchanges": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "description": "exchange id"
                  },
                  "name": {
                    "type": "string",
                    "description": "exchange name"
                  },
                  "market_type": {
                    "type": "string",
                    "description": "exchange market type"
                  },
                  "thumb": {
                    "type": "string",
                    "description": "exchange thumb image url"
                  },
                  "large": {
                    "type": "string",
                    "description": "exchange large image url"
                  }
                }
              }
            },
            "icos": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "categories": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "number",
                    "description": "category id"
                  },
                  "name": {
                    "type": "string",
                    "description": "category name"
                  }
                }
              }
            },
            "nfts": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "description": "nft collection id"
                  },
                  "name": {
                    "type": "string",
                    "description": "nft name"
                  },
                  "symbol": {
                    "type": "string",
                    "description": "nft collection symbol"
                  },
                  "thumb": {
                    "type": "string",
                    "description": "nft collection thumb image url"
                  }
                }
              }
            }
          },
          "example": {
            "coins": [
              {
                "id": "ethereum",
                "name": "Ethereum",
                "api_symbol": "ethereum",
                "symbol": "ETH",
                "market_cap_rank": 2,
                "thumb": "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
                "large": "https://assets.coingecko.com/coins/images/279/large/ethereum.png"
              },
              {
                "id": "ethereum-classic",
                "name": "Ethereum Classic",
                "api_symbol": "ethereum-classic",
                "symbol": "ETC",
                "market_cap_rank": 27,
                "thumb": "https://assets.coingecko.com/coins/images/453/thumb/ethereum-classic-logo.png",
                "large": "https://assets.coingecko.com/coins/images/453/large/ethereum-classic-logo.png"
              },
              {
                "id": "sweth",
                "name": "Swell Ethereum",
                "api_symbol": "sweth",
                "symbol": "SWETH",
                "market_cap_rank": 142,
                "thumb": "https://assets.coingecko.com/coins/images/30326/thumb/_lB7zEtS_400x400.jpg",
                "large": "https://assets.coingecko.com/coins/images/30326/large/_lB7zEtS_400x400.jpg"
              }
            ],
            "exchanges": [
              {
                "id": "uniswap_v3",
                "name": "Uniswap V3 (Ethereum)",
                "market_type": "spot",
                "thumb": "https://assets.coingecko.com/markets/images/665/thumb/uniswap-v3.png",
                "large": "https://assets.coingecko.com/markets/images/665/large/uniswap-v3.png"
              },
              {
                "id": "uniswap_v2",
                "name": "Uniswap V2 (Ethereum)",
                "market_type": "spot",
                "thumb": "https://assets.coingecko.com/markets/images/535/thumb/256x256_Black-1.png",
                "large": "https://assets.coingecko.com/markets/images/535/large/256x256_Black-1.png"
              },
              {
                "id": "curve_ethereum",
                "name": "Curve (Ethereum)",
                "market_type": "spot",
                "thumb": "https://assets.coingecko.com/markets/images/538/thumb/Curve.png",
                "large": "https://assets.coingecko.com/markets/images/538/large/Curve.png"
              }
            ],
            "icos": [],
            "categories": [
              {
                "id": 158,
                "name": "Ethereum PoS IOU"
              },
              {
                "id": 146,
                "name": "Ethereum Ecosystem"
              },
              {
                "id": 167,
                "name": "EthereumPoW Ecosystem"
              }
            ],
            "nfts": [
              {
                "id": "cyberkongz-genkai",
                "name": "CyberKongz Genkai (Ethereum)",
                "symbol": "GENKAI",
                "thumb": "https://assets.coingecko.com/nft_contracts/images/3388/thumb/cyberkongz-genkai.png"
              },
              {
                "id": "ethereum-peppets",
                "name": "Ethereum Peppets",
                "symbol": "PEPPET",
                "thumb": "https://assets.coingecko.com/nft_contracts/images/3880/thumb/ethereum-peppets.png"
              },
              {
                "id": "ens-ethereum-name-service",
                "name": "ENS: Ethereum Name Service",
                "symbol": "ENS",
                "thumb": "https://assets.coingecko.com/nft_contracts/images/373/thumb/ens-ethereum-name-service.png"
              },
              {
                "id": "league-of-kingdoms-ethereum",
                "name": "League of Kingdoms (Ethereum)",
                "symbol": "LOKR",
                "thumb": "https://assets.coingecko.com/nft_contracts/images/1001/thumb/league-of-kingdoms-ethereum.jpg"
              }
            ]
          }
        },
        "TrendingSearch": {
          "type": "object",
          "properties": {
            "coins": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "description": "coin id"
                  },
                  "coin_id": {
                    "type": "number"
                  },
                  "name": {
                    "type": "string",
                    "description": "coin name"
                  },
                  "symbol": {
                    "type": "string",
                    "description": "coin symbol"
                  },
                  "market_cap_rank": {
                    "type": "number",
                    "description": "coin market cap rank"
                  },
                  "thumb": {
                    "type": "string",
                    "description": "coin thumb image url"
                  },
                  "small": {
                    "type": "string",
                    "description": "coin small image url"
                  },
                  "large": {
                    "type": "string",
                    "description": "coin large image url"
                  },
                  "slug": {
                    "type": "string",
                    "description": "coin web slug"
                  },
                  "price_btc": {
                    "type": "number",
                    "description": "coin price in btc"
                  },
                  "score": {
                    "type": "number",
                    "description": "coin sequence in the list"
                  },
                  "data": {
                    "type": "object",
                    "properties": {
                      "price": {
                        "type": "number",
                        "description": "coin price in usd"
                      },
                      "price_btc": {
                        "type": "string",
                        "description": "coin price in btc"
                      },
                      "price_change_percentage_24h": {
                        "type": "object",
                        "description": "coin price change percentage in 24 hours",
                        "properties": {
                          "btc": {
                            "type": "number"
                          },
                          "usd": {
                            "type": "number"
                          }
                        }
                      },
                      "market_cap": {
                        "type": "string",
                        "description": "coin market cap in usd"
                      },
                      "market_cap_btc": {
                        "type": "string",
                        "description": "coin market cap in btc"
                      },
                      "total_volume": {
                        "type": "string",
                        "description": "coin total volume in usd"
                      },
                      "total_volume_btc": {
                        "type": "string",
                        "description": "coin total volume in btc"
                      },
                      "sparkline": {
                        "type": "string",
                        "description": "coin sparkline image url"
                      },
                      "content": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "nfts": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "description": "nft collection id"
                  },
                  "name": {
                    "type": "string",
                    "description": "nft collection name"
                  },
                  "symbol": {
                    "type": "string",
                    "description": "nft collection symbol"
                  },
                  "thumb": {
                    "type": "string",
                    "description": "nft collection thumb image url"
                  },
                  "nft_contract_id": {
                    "type": "number"
                  },
                  "native_currency_symbol": {
                    "type": "string",
                    "description": "nft collection native currency symbol"
                  },
                  "floor_price_in_native_currency": {
                    "type": "number",
                    "description": "nft collection floor price in native currency"
                  },
                  "floor_price_24h_percentage_change": {
                    "type": "number",
                    "description": "nft collection floor price 24 hours percentage change"
                  },
                  "data": {
                    "type": "object",
                    "properties": {
                      "floor_price": {
                        "type": "string",
                        "description": "nft collection floor price"
                      },
                      "floor_price_in_usd_24h_percentage_change": {
                        "type": "string",
                        "description": "nft collection floor price in usd 24 hours percentage change"
                      },
                      "h24_volume": {
                        "type": "string",
                        "description": "nft collection volume in 24 hours"
                      },
                      "h24_average_sale_price": {
                        "type": "string",
                        "description": "nft collection 24 hours average sale price"
                      },
                      "sparkline": {
                        "type": "string",
                        "description": "nft collection sparkline image url"
                      },
                      "content": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "categories": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "number"
                  },
                  "name": {
                    "type": "string",
                    "description": "category name"
                  },
                  "market_cap_1h_change": {
                    "type": "number",
                    "description": "category market cap 1 hour change"
                  },
                  "slug": {
                    "type": "string",
                    "description": "category web slug"
                  },
                  "coins_count": {
                    "type": "number",
                    "description": "category number of coins"
                  },
                  "data": {
                    "type": "object",
                    "properties": {
                      "market_cap": {
                        "type": "number",
                        "description": "category market cap"
                      },
                      "market_cap_btc": {
                        "type": "number",
                        "description": "category market cap in btc"
                      },
                      "total_volume": {
                        "type": "number",
                        "description": "category total volume"
                      },
                      "total_volume_btc": {
                        "type": "number",
                        "description": "category total volume in btc"
                      },
                      "market_cap_change_percentage_24h": {
                        "type": "object",
                        "description": "category market cap change percentage in 24 hours",
                        "properties": {
                          "btc": {
                            "type": "number"
                          },
                          "usd": {
                            "type": "number"
                          }
                        }
                      },
                      "sparkline": {
                        "type": "string",
                        "description": "category sparkline image url"
                      }
                    }
                  }
                }
              }
            }
          },
          "example": {
            "coins": [
              {
                "item": {
                  "id": "moon-tropica",
                  "coin_id": 28470,
                  "name": "Moon Tropica",
                  "symbol": "CAH",
                  "market_cap_rank": 530,
                  "thumb": "https://assets.coingecko.com/coins/images/28470/standard/MTLOGO.png?1696527464",
                  "small": "https://assets.coingecko.com/coins/images/28470/small/MTLOGO.png?1696527464",
                  "large": "https://assets.coingecko.com/coins/images/28470/large/MTLOGO.png?1696527464",
                  "slug": "moon-tropica",
                  "price_btc": 0.000530163474333298,
                  "score": 0,
                  "data": {
                    "price": 36.9717118016975,
                    "price_btc": "0.000530163474333299",
                    "price_change_percentage_24h": {
                      "aed": -4.04467447608756,
                      "ars": -4.04990008945855,
                      "aud": -4.04990008945802,
                      "bch": -2.37567962487489,
                      "bdt": -4.0499000894585,
                      "bhd": -4.16927013396437,
                      "bmd": -4.04990008945853,
                      "bnb": -3.4734695990217,
                      "brl": -4.04990008945847,
                      "btc": -5.98585375059246,
                      "cad": -4.04990008945848,
                      "chf": -4.04990008945855,
                      "clp": -5.02567556756719,
                      "cny": -4.0499000894584,
                      "czk": -4.04990008945864,
                      "dkk": -4.04990008945864,
                      "dot": -5.98238779521245,
                      "eos": -5.74405098071799,
                      "eth": -5.05689445119971,
                      "eur": -4.09661619752604,
                      "gbp": -4.04990008945847,
                      "gel": -4.04990008945897,
                      "hkd": -4.04990008945852,
                      "huf": -4.05387716450818,
                      "idr": -4.04990008945821,
                      "ils": -4.40922021210977,
                      "inr": -4.04990008945856,
                      "jpy": -4.04990008945905,
                      "krw": -4.04990008945847,
                      "kwd": -4.12041469685036,
                      "lkr": -4.0499000894589,
                      "ltc": -5.29341338838337,
                      "mmk": -4.04990008945877,
                      "mxn": -4.0499000894592,
                      "myr": -4.04990008945872,
                      "ngn": -4.04990008945849,
                      "nok": -4.04990008945854,
                      "nzd": -4.0499000894586,
                      "php": -4.04990008945844,
                      "pkr": -4.04990008945845,
                      "pln": -4.04990008945856,
                      "rub": -4.04990008945847,
                      "sar": -4.04990008945841,
                      "sek": -4.04990008945854,
                      "sgd": -4.04990008945858,
                      "thb": -4.04105687070854,
                      "try": -4.04990008945837,
                      "twd": -4.04990008945847,
                      "uah": -4.17945939929411,
                      "usd": -4.04990008945853,
                      "vef": -4.0499000894584,
                      "vnd": -4.04990008945868,
                      "xag": -4.06208301025163,
                      "xau": -4.04990008945842,
                      "xdr": -4.04990008945852,
                      "xlm": -4.12493924900392,
                      "xrp": -4.48127069993476,
                      "yfi": -4.04427366181248,
                      "zar": -4.0499000894588,
                      "bits": -5.98585375059245,
                      "link": -5.12005806599531,
                      "sats": -5.98585375059245
                    },
                    "market_cap": "$99,703,583",
                    "market_cap_btc": "1428.83459310001",
                    "total_volume": "$282,142",
                    "total_volume_btc": "4.04583894742915",
                    "sparkline": "https://www.coingecko.com/coins/28470/sparkline.svg",
                    "content": null
                  }
                }
              },
              {
                "item": {
                  "id": "gala",
                  "coin_id": 12493,
                  "name": "GALA",
                  "symbol": "GALA",
                  "market_cap_rank": 53,
                  "thumb": "https://assets.coingecko.com/coins/images/12493/standard/GALA_token_image_-_200PNG.png?1709725869",
                  "small": "https://assets.coingecko.com/coins/images/12493/small/GALA_token_image_-_200PNG.png?1709725869",
                  "large": "https://assets.coingecko.com/coins/images/12493/large/GALA_token_image_-_200PNG.png?1709725869",
                  "slug": "gala",
                  "price_btc": 8.99538550992028e-7,
                  "score": 1,
                  "data": {
                    "price": 0.0627306136161425,
                    "price_btc": "0.000000899538550992028",
                    "price_change_percentage_24h": {
                      "aed": 9.60780028942887,
                      "ars": 9.60183117845321,
                      "aud": 9.60183117845384,
                      "bch": 11.4674219663065,
                      "bdt": 9.60183117845328,
                      "bhd": 9.4654772249098,
                      "bmd": 9.60183117845317,
                      "bnb": 10.2234284851282,
                      "brl": 9.60183117845336,
                      "btc": 7.38745825724124,
                      "cad": 9.60183117845328,
                      "chf": 9.60183117845322,
                      "clp": 8.48722286309518,
                      "cny": 9.60183117845327,
                      "czk": 9.60183117845312,
                      "dkk": 9.60183117845326,
                      "dot": 7.37688026427037,
                      "eos": 7.62858932956233,
                      "eth": 8.45108220753484,
                      "eur": 9.54846832636144,
                      "gbp": 9.60183117845332,
                      "gel": 9.60183117845289,
                      "hkd": 9.60183117845327,
                      "huf": 9.59728824719456,
                      "idr": 9.60183117845271,
                      "ils": 9.19138717205251,
                      "inr": 9.60183117845323,
                      "jpy": 9.60183117845302,
                      "krw": 9.60183117845328,
                      "kwd": 9.52128378869318,
                      "lkr": 9.60183117845326,
                      "ltc": 8.06524825045215,
                      "mmk": 9.60183117845293,
                      "mxn": 9.60183117845321,
                      "myr": 9.60183117845329,
                      "ngn": 9.60183117845327,
                      "nok": 9.6018311784532,
                      "nzd": 9.60183117845338,
                      "php": 9.60183117845333,
                      "pkr": 9.60183117845299,
                      "pln": 9.6018311784534,
                      "rub": 9.60183117845327,
                      "sar": 9.6018311784533,
                      "sek": 9.60183117845319,
                      "sgd": 9.60183117845319,
                      "thb": 9.61193260585552,
                      "try": 9.60183117845312,
                      "twd": 9.601831178453,
                      "uah": 9.45383823610663,
                      "usd": 9.60183117845317,
                      "vef": 9.60183117845337,
                      "vnd": 9.60183117845306,
                      "xag": 9.58791487790447,
                      "xau": 9.60183117845332,
                      "xdr": 9.60183117845335,
                      "xlm": 9.4911259696921,
                      "xrp": 8.99767343610987,
                      "yfi": 9.54409111376635,
                      "zar": 9.6018311784527,
                      "bits": 7.38745825724125,
                      "link": 8.37662653267695,
                      "sats": 7.38745825724125
                    },
                    "market_cap": "$2,365,621,969",
                    "market_cap_btc": "33901.3141933559",
                    "total_volume": "$212,777,204",
                    "total_volume_btc": "3051.16253202022",
                    "sparkline": "https://www.coingecko.com/coins/12493/sparkline.svg",
                    "content": {
                      "title": "What is GALA?",
                      "description": "Gala is a blockchain gaming ecosystem. Gamers can explore different type of games and have their experiences interact across each other on the Gala platform. The GALA token is the utility token and primary medium of exchange of the ecosystem. Game items are represented as NFTs on the Ethereum blockchain and users can trade them on all marketplaces."
                    }
                  }
                }
              }
            ],
            "nfts": [
              {
                "id": "chameleon-travel-club",
                "name": "ChameleonTravelClub",
                "symbol": "CTC",
                "thumb": "https://assets.coingecko.com/nft_contracts/images/3610/standard/chameleon-travel-club.png?1707290106",
                "nft_contract_id": 3610,
                "native_currency_symbol": "eth",
                "floor_price_in_native_currency": 4.29,
                "floor_price_24h_percentage_change": 57.3120347225931,
                "data": {
                  "floor_price": "4.29 ETH",
                  "floor_price_in_usd_24h_percentage_change": "57.3120347225931",
                  "h24_volume": "11.26 ETH",
                  "h24_average_sale_price": "2.82 ETH",
                  "sparkline": "https://www.coingecko.com/nft/3610/sparkline.svg",
                  "content": null
                }
              },
              {
                "id": "natcats",
                "name": "Natcats",
                "symbol": "DMTNATCATS",
                "thumb": "https://assets.coingecko.com/nft_contracts/images/4171/standard/natcats.png?1709517703",
                "nft_contract_id": 4171,
                "native_currency_symbol": "btc",
                "floor_price_in_native_currency": 0.05139,
                "floor_price_24h_percentage_change": 52.5917829733019,
                "data": {
                  "floor_price": "0.051 BTC",
                  "floor_price_in_usd_24h_percentage_change": "52.5917829733019",
                  "h24_volume": "3.93 BTC",
                  "h24_average_sale_price": "0.049 BTC",
                  "sparkline": "https://www.coingecko.com/nft/4171/sparkline.svg",
                  "content": null
                }
              }
            ],
            "categories": [
              {
                "id": 251,
                "name": "Solana Meme Coins",
                "market_cap_1h_change": 1.44537649465531,
                "slug": "solana-meme-coins",
                "coins_count": 79,
                "data": {
                  "market_cap": 8237562936.01112,
                  "market_cap_btc": 118852.276224895,
                  "total_volume": 1207846273.32444,
                  "total_volume_btc": 17426.911336459,
                  "market_cap_change_percentage_24h": {
                    "aed": 14.2303965235397,
                    "ars": 14.224569755904,
                    "aud": 14.2241756714483,
                    "bch": 10.544446407888,
                    "bdt": 14.2241756714484,
                    "bhd": 14.0820711301687,
                    "bmd": 14.2241756714485,
                    "bnb": 12.6244772393324,
                    "brl": 14.221695576047,
                    "btc": 11.84681099263,
                    "cad": 14.232580997301,
                    "chf": 14.2241756714485,
                    "clp": 13.0625598968815,
                    "cny": 14.2178586614014,
                    "czk": 14.2241756714486,
                    "dkk": 14.2241756714484,
                    "dot": 10.6966484935826,
                    "eos": 10.1217314444624,
                    "eth": 11.8847596390012,
                    "eur": 14.1685622959589,
                    "gbp": 14.2241756714485,
                    "gel": 14.2241756714491,
                    "hkd": 14.2241756714487,
                    "huf": 14.2194411467367,
                    "idr": 14.2241756714489,
                    "ils": 13.7964216112624,
                    "inr": 14.2241756714486,
                    "jpy": 14.2241756714483,
                    "krw": 14.2241756714485,
                    "kwd": 14.1402312783772,
                    "lkr": 14.2241756714485,
                    "ltc": 8.6428668776247,
                    "mmk": 14.224175671449,
                    "mxn": 14.2241756714481,
                    "myr": 14.2241756714485,
                    "ngn": 14.2241756714486,
                    "nok": 14.2241756714485,
                    "nzd": 14.2241756714481,
                    "php": 14.2241756714486,
                    "pkr": 14.2241756714484,
                    "pln": 14.2068251066482,
                    "rub": 14.2241756714486,
                    "sar": 14.2241756714487,
                    "sek": 14.2241756714486,
                    "sgd": 14.2241756714485,
                    "thb": 14.2347031161614,
                    "try": 14.2241756714486,
                    "twd": 14.224175671449,
                    "uah": 14.0699412789845,
                    "usd": 14.2241756714485,
                    "vef": 14.2241756714486,
                    "vnd": 14.2241756714489,
                    "xag": 14.2096724652385,
                    "xau": 14.2241756714488,
                    "xdr": 14.2241756714487,
                    "xlm": 11.8320435642723,
                    "xrp": 12.4172400147244,
                    "yfi": 12.7954918554954,
                    "zar": 14.2241756714481,
                    "bits": 11.84681099263,
                    "link": 11.6566512723034,
                    "sats": 11.84681099263
                  },
                  "sparkline": "https://www.coingecko.com/categories/25211443/sparkline.svg"
                }
              },
              {
                "id": 327,
                "name": "Gaming Platform",
                "market_cap_1h_change": 1.10506929591162,
                "slug": "gaming-platform",
                "coins_count": 20,
                "data": {
                  "market_cap": 3665275001.85375,
                  "market_cap_btc": 52882.9072802773,
                  "total_volume": 218189404.503211,
                  "total_volume_btc": 3148.05575080902,
                  "market_cap_change_percentage_24h": {
                    "aed": 5.95319529244364,
                    "ars": 5.94779073579304,
                    "aud": 5.94742520692706,
                    "bch": 2.53433127439418,
                    "bdt": 5.94742520692721,
                    "bhd": 5.81561764368333,
                    "bmd": 5.94742520692732,
                    "bnb": 4.46364185726444,
                    "brl": 5.94512482068669,
                    "btc": 3.7423257608765,
                    "cad": 5.95522147796062,
                    "chf": 5.94742520692729,
                    "clp": 4.8699807896516,
                    "cny": 5.9415659311167,
                    "czk": 5.94742520692735,
                    "dkk": 5.94742520692723,
                    "dot": 2.67550470808869,
                    "eos": 2.14224648404119,
                    "eth": 3.7775246261735,
                    "eur": 5.89584160909828,
                    "gbp": 5.94742520692727,
                    "gel": 5.94742520692782,
                    "hkd": 5.94742520692747,
                    "huf": 5.94303374864054,
                    "idr": 5.94742520692765,
                    "ils": 5.55066645570739,
                    "inr": 5.94742520692736,
                    "jpy": 5.94742520692707,
                    "krw": 5.9474252069273,
                    "kwd": 5.86956347359295,
                    "lkr": 5.94742520692729,
                    "ltc": 0.770541307223899,
                    "mmk": 5.9474252069277,
                    "mxn": 5.94742520692689,
                    "myr": 5.94742520692724,
                    "ngn": 5.94742520692737,
                    "nok": 5.94742520692729,
                    "nzd": 5.94742520692689,
                    "php": 5.94742520692736,
                    "pkr": 5.94742520692717,
                    "pln": 5.93133187418339,
                    "rub": 5.94742520692736,
                    "sar": 5.94742520692747,
                    "sek": 5.94742520692736,
                    "sgd": 5.94742520692729,
                    "thb": 5.95718982684932,
                    "try": 5.94742520692738,
                    "twd": 5.94742520692774,
                    "uah": 5.80436672859846,
                    "usd": 5.94742520692732,
                    "vef": 5.94742520692733,
                    "vnd": 5.94742520692767,
                    "xag": 5.93397291150769,
                    "xau": 5.94742520692753,
                    "xdr": 5.94742520692749,
                    "xlm": 3.72862838900029,
                    "xrp": 4.27142116295708,
                    "yfi": 4.62226465448499,
                    "zar": 5.94742520692694,
                    "bits": 3.7423257608765,
                    "link": 3.5659451249189,
                    "sats": 3.74232576087651
                  },
                  "sparkline": "https://www.coingecko.com/categories/25211410/sparkline.svg"
                }
              }
            ]
          }
        },
        "Global": {
          "type": "object",
          "properties": {
            "data": {
              "type": "object",
              "properties": {
                "active_cryptocurrencies": {
                  "type": "number",
                  "description": "number of active cryptocurrencies"
                },
                "upcoming_icos": {
                  "type": "number",
                  "description": "number of upcoming icos"
                },
                "ongoing_icos": {
                  "type": "number",
                  "description": "number of ongoing icos"
                },
                "ended_icos": {
                  "type": "number",
                  "description": "number of ended icos"
                },
                "markets": {
                  "type": "number",
                  "description": "number of exchanges"
                },
                "total_market_cap": {
                  "type": "object",
                  "description": "cryptocurrencies total market cap",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eth": {
                      "type": "number"
                    }
                  }
                },
                "total_volume": {
                  "type": "object",
                  "description": "cryptocurrencies total volume",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eth": {
                      "type": "number"
                    }
                  }
                },
                "market_cap_percentage": {
                  "type": "object",
                  "description": "cryptocurrencies market cap percentage",
                  "properties": {
                    "btc": {
                      "type": "number"
                    },
                    "eth": {
                      "type": "number"
                    }
                  }
                }
              }
            },
            "market_cap_change_percentage_24h_usd": {
              "type": "number",
              "description": "cryptocurrencies market cap change percentage in 24 hours in usd"
            },
            "updated_at": {
              "type": "number"
            }
          },
          "example": {
            "date": {
              "active_cryptocurrencies": 13690,
              "upcoming_icos": 0,
              "ongoing_icos": 49,
              "ended_icos": 3376,
              "markets": 1046,
              "total_market_cap": {
                "btc": 39003738.0847159,
                "eth": 803832137.207531,
                "ltc": 26721173267.5358,
                "bch": 3981159931.51342,
                "bnb": 4670513150.58714,
                "eos": 2641998753398.41,
                "xrp": 4567762968374.06,
                "xlm": 21049307801356.5,
                "link": 153517938957.199,
                "dot": 315120726481.166,
                "yfi": 324671967.610845,
                "usd": 2721226850772.63,
                "aed": 9993705609462.48,
                "ars": 2.34177503292196e15,
                "aud": 4135040261091.56,
                "bdt": 298245137607204,
                "bhd": 1024582727718.66,
                "bmd": 2721226850772.63,
                "brl": 13785980136430.7,
                "cad": 3698283351542.55,
                "chf": 2454228235855.38,
                "clp": 2.55739391875937e15,
                "cny": 19681001075528,
                "czk": 63568675602103.7,
                "dkk": 18728571677757.6,
                "eur": 2508293570926.52,
                "gbp": 2153208842849.76,
                "gel": 7292887960070.66,
                "hkd": 21307070180207.2,
                "huf": 979811947048335,
                "idr": 43234171898362830,
                "ils": 10201683535213.3,
                "inr": 226670207147326,
                "jpy": 412551596711386,
                "krw": 3677112086909555,
                "kwd": 836219405108.176,
                "lkr": 812593109477406,
                "mmk": 5706555839881336,
                "mxn": 44773978111872.4,
                "myr": 12919024474043.1,
                "ngn": 3522998071018357,
                "nok": 29197131372679.9,
                "nzd": 4524820631515.69,
                "php": 153994230206450,
                "pkr": 755251422720381,
                "pln": 10747177948492.4,
                "rub": 251732363568359,
                "sar": 10207395390373.1,
                "sek": 29054498267296.6,
                "sgd": 3672056167154.8,
                "thb": 99649147572586.4,
                "try": 87273829665781.3,
                "twd": 87422678053291.6,
                "uah": 105534042826572,
                "vef": 272476444567.864,
                "vnd": 67937284004880150,
                "zar": 50878778428896,
                "xdr": 2052425485204.54,
                "xag": 99002369095.9216,
                "xau": 1167950564.35161,
                "bits": 39003738084715.9,
                "sats": 3.90037380847159e15
              },
              "total_volume": {
                "btc": 993675.225562481,
                "eth": 20478757.1519219,
                "ltc": 680759567.614816,
                "bch": 101425662.954523,
                "bnb": 118987908.244129,
                "eos": 67308643636.0751,
                "xrp": 116370202467.687,
                "xlm": 536260797157.883,
                "link": 3911085965.39774,
                "dot": 8028144848.20593,
                "yfi": 8271476.18386717,
                "usd": 69327091133.5489,
                "aed": 254603742187.958,
                "ars": 59660021021604.7,
                "aud": 105345981331.984,
                "bdt": 7598215425943.58,
                "bhd": 26102689718.1482,
                "bmd": 69327091133.5489,
                "brl": 351217283120.761,
                "cad": 94218983205.0497,
                "chf": 62524924932.7986,
                "clp": 65153216175224.4,
                "cny": 501401253914.28,
                "czk": 1619501647007.04,
                "dkk": 477136772017.537,
                "eur": 63902315579.4398,
                "gbp": 54856031438.6965,
                "gel": 185796604237.911,
                "hkd": 542827657221.132,
                "huf": 24962090950805.3,
                "idr": 1.10145149215704e15,
                "ils": 259902273109.113,
                "inr": 5774743147085.06,
                "jpy": 10510333651301.7,
                "krw": 93679615385638.7,
                "kwd": 21303868469.8839,
                "lkr": 20701955274048.2,
                "mmk": 145382556642719,
                "mxn": 1140680226674.96,
                "myr": 329130365156.523,
                "ngn": 89753343519839.4,
                "nok": 743838091608.3,
                "nzd": 115276185884.681,
                "php": 3923220156574.62,
                "pkr": 19241094948336.3,
                "pln": 273799512470.654,
                "rub": 6413236921211.56,
                "sar": 260047790673.403,
                "sek": 740204312126.535,
                "sgd": 93550808700.7045,
                "thb": 2538702546310.57,
                "try": 2223423872616.7,
                "twd": 2227215995174.62,
                "uah": 2688628550997.98,
                "vef": 6941721635.20225,
                "vnd": 1.730798106095e15,
                "zar": 1296208622923.97,
                "xdr": 52288433291.4744,
                "xag": 2522224952.61704,
                "xau": 29755187.5145192,
                "bits": 993675225562.481,
                "sats": 99367522556248.1
              },
              "market_cap_percentage": {
                "btc": 50.4465263233584,
                "eth": 14.9228066918211,
                "usdt": 3.92900641199819,
                "bnb": 3.29395203563452,
                "sol": 2.95074801328159,
                "usdc": 1.20922049263535,
                "xrp": 1.20523481041161,
                "steth": 1.18309266793764,
                "doge": 1.05778560354543,
                "ada": 0.765987294694099
              },
              "market_cap_change_percentage_24h_usd": 1.72179506060272,
              "updated_at": 1712512855
            }
          }
        },
        "GlobalDeFi": {
          "type": "object",
          "properties": {
            "data": {
              "type": "object",
              "properties": {
                "defi_market_cap": {
                  "type": "string",
                  "description": "defi market cap"
                },
                "eth_market_cap": {
                  "type": "string",
                  "description": "eth market cap"
                },
                "defi_to_eth_ratio": {
                  "type": "string",
                  "description": "defi to eth ratio"
                },
                "trading_volume_24h": {
                  "type": "string",
                  "description": "defi trading volume in 24 hours"
                },
                "defi_dominance": {
                  "type": "string",
                  "description": "defi dominance"
                },
                "top_coin_name": {
                  "type": "string",
                  "description": "defi top coin name"
                },
                "top_coin_defi_dominance": {
                  "type": "number",
                  "description": "defi top coin dominance"
                }
              }
            }
          },
          "example": {
            "data": {
              "defi_market_cap": "105273842288.229620442228701667",
              "eth_market_cap": "406184911478.5772415794509920285",
              "defi_to_eth_ratio": "25.9177136602677348904422532573101031788841174510865443130135278",
              "trading_volume_24h": "5046503746.288261648853195485635",
              "defi_dominance": "3.8676503084614763642371703099489945457095080090859886",
              "top_coin_name": "Lido Staked Ether",
              "top_coin_defi_dominance": 30.589442518868
            }
          }
        },
        "CompaniesTreasury": {
          "type": "object",
          "properties": {
            "total_holdings": {
              "type": "number",
              "description": "total btc/eth holdings of companies"
            },
            "total_value_usd": {
              "type": "number",
              "description": "total btc/eth holdings value in usd"
            },
            "market_cap_dominance": {
              "type": "number",
              "description": "market cap dominance"
            },
            "companies": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "company name"
                  },
                  "symbol": {
                    "type": "string",
                    "description": "company symbol"
                  },
                  "country": {
                    "type": "string",
                    "description": "company incorporated country"
                  },
                  "total_holdings": {
                    "type": "number",
                    "description": "total btc/eth holdings of company"
                  },
                  "total_entry_value_usd": {
                    "type": "number",
                    "description": "total entry value in usd"
                  },
                  "total_current_value_usd": {
                    "type": "number",
                    "description": "total current value of btc/eth holdings in usd"
                  },
                  "percentage_of_total_supply": {
                    "type": "number",
                    "description": "percentage of total btc/eth supply"
                  }
                }
              }
            }
          },
          "example": {
            "total_holdings": 264136,
            "total_value_usd": 18403306939.1513,
            "market_cap_dominance": 1.34,
            "companies": [
              {
                "name": "MicroStrategy Inc.",
                "symbol": "NASDAQ:MSTR",
                "country": "US",
                "total_holdings": 174530,
                "total_entry_value_usd": 4680000000,
                "total_current_value_usd": 12160134022,
                "percentage_of_total_supply": 0.831
              },
              {
                "name": "Galaxy Digital Holdings",
                "symbol": "TSE: GLXY",
                "country": "US",
                "total_holdings": 17518,
                "total_entry_value_usd": 0,
                "total_current_value_usd": 1220542186,
                "percentage_of_total_supply": 0.083
              },
              {
                "name": "Marathon Digital Holdings",
                "symbol": "NASDAQ:MARA",
                "country": "US",
                "total_holdings": 13716,
                "total_entry_value_usd": 189087000,
                "total_current_value_usd": 955643145,
                "percentage_of_total_supply": 0.065
              },
              {
                "name": "Tesla, Inc.",
                "symbol": "NASDAQ:TSLA",
                "country": "US",
                "total_holdings": 10500,
                "total_entry_value_usd": 336000000,
                "total_current_value_usd": 731572836,
                "percentage_of_total_supply": 0.05
              },
              {
                "name": "Hut 8 Mining Corp",
                "symbol": "NASDAQ:HUT",
                "country": "CA",
                "total_holdings": 9366,
                "total_entry_value_usd": 0,
                "total_current_value_usd": 652562970,
                "percentage_of_total_supply": 0.045
              },
              {
                "name": "Coinbase Global, Inc",
                "symbol": "NASDAQ:COIN",
                "country": "US",
                "total_holdings": 9181,
                "total_entry_value_usd": 207783800,
                "total_current_value_usd": 639673353,
                "percentage_of_total_supply": 0.044
              },
              {
                "name": "Block Inc.",
                "symbol": "NYSE:SQ",
                "country": "US",
                "total_holdings": 8027,
                "total_entry_value_usd": 220000000,
                "total_current_value_usd": 559270015,
                "percentage_of_total_supply": 0.038
              },
              {
                "name": "Riot Platforms, Inc",
                "symbol": "NASDAQ:RIOT",
                "country": "US",
                "total_holdings": 7327,
                "total_entry_value_usd": 0,
                "total_current_value_usd": 510498492,
                "percentage_of_total_supply": 0.035
              },
              {
                "name": "Hive Blockchain",
                "symbol": "NASDAQ:HIVE",
                "country": "CA",
                "total_holdings": 2596,
                "total_entry_value_usd": 0,
                "total_current_value_usd": 180872674,
                "percentage_of_total_supply": 0.012
              },
              {
                "name": "CleanSpark Inc.",
                "symbol": "NASDAQ:CLSK",
                "country": "US",
                "total_holdings": 2575,
                "total_entry_value_usd": 0,
                "total_current_value_usd": 179409529,
                "percentage_of_total_supply": 0.012
              },
              {
                "name": "NEXON Co Ltd",
                "symbol": "TYO:3659",
                "country": "JP",
                "total_holdings": 1717,
                "total_entry_value_usd": 99974042,
                "total_current_value_usd": 119629577,
                "percentage_of_total_supply": 0.008
              },
              {
                "name": "Exodus Movement Inc",
                "symbol": "EXOD:OTCMKTS",
                "country": "US",
                "total_holdings": 1651,
                "total_entry_value_usd": 23163000,
                "total_current_value_usd": 115031119,
                "percentage_of_total_supply": 0.008
              },
              {
                "name": "Meitu Inc",
                "symbol": "HKG:1357",
                "country": "HK",
                "total_holdings": 940,
                "total_entry_value_usd": 49500000,
                "total_current_value_usd": 65493187,
                "percentage_of_total_supply": 0.004
              },
              {
                "name": "Bit Digital, Inc",
                "symbol": "NASDAQ:BTBT",
                "country": "US",
                "total_holdings": 821,
                "total_entry_value_usd": 0,
                "total_current_value_usd": 57202028,
                "percentage_of_total_supply": 0.004
              },
              {
                "name": "Bitfarms Limited",
                "symbol": "NASDAQ:BITF",
                "country": "US",
                "total_holdings": 760,
                "total_entry_value_usd": 0,
                "total_current_value_usd": 52951938,
                "percentage_of_total_supply": 0.004
              },
              {
                "name": "NFT Investments PLC",
                "symbol": "AQSE:NFT",
                "country": "GB",
                "total_holdings": 517,
                "total_entry_value_usd": 8505363,
                "total_current_value_usd": 36021253,
                "percentage_of_total_supply": 0.002
              },
              {
                "name": "Cipher Mining",
                "symbol": "NASDAQ:CIFR",
                "country": "US",
                "total_holdings": 507,
                "total_entry_value_usd": 0,
                "total_current_value_usd": 35324516,
                "percentage_of_total_supply": 0.002
              },
              {
                "name": "DMG Blockchain Solutions Inc.",
                "symbol": "OTCMKTS:DMGGF",
                "country": "CA",
                "total_holdings": 462,
                "total_entry_value_usd": 0,
                "total_current_value_usd": 32189204,
                "percentage_of_total_supply": 0.002
              },
              {
                "name": "Neptune Digital Assets Corp.",
                "symbol": "TSXV: DASH",
                "country": "CA",
                "total_holdings": 313,
                "total_entry_value_usd": 0,
                "total_current_value_usd": 21807837,
                "percentage_of_total_supply": 0.001
              },
              {
                "name": "BIGG Digital Assets Inc.",
                "symbol": "CNSX:BIGG",
                "country": "CA",
                "total_holdings": 283,
                "total_entry_value_usd": 2690387,
                "total_current_value_usd": 19717629,
                "percentage_of_total_supply": 0.001
              },
              {
                "name": "Advanced Bitcoin Technologies AG",
                "symbol": "ABT:GR",
                "country": "DE",
                "total_holdings": 228,
                "total_entry_value_usd": 2117978,
                "total_current_value_usd": 15885581,
                "percentage_of_total_supply": 0.001
              },
              {
                "name": "FRMO Corp.",
                "symbol": "OTCMKTS:FRMO",
                "country": "US",
                "total_holdings": 143,
                "total_entry_value_usd": 0,
                "total_current_value_usd": 9963325,
                "percentage_of_total_supply": 0.001
              },
              {
                "name": "The Brooker Group",
                "symbol": "BKK:BROOK",
                "country": "TH",
                "total_holdings": 122,
                "total_entry_value_usd": 6600000,
                "total_current_value_usd": 8500179,
                "percentage_of_total_supply": 0.001
              },
              {
                "name": "DigitalX",
                "symbol": "ASX:DCC",
                "country": "AU",
                "total_holdings": 115,
                "total_entry_value_usd": 610350,
                "total_current_value_usd": 8012464,
                "percentage_of_total_supply": 0.001
              },
              {
                "name": "LQwD Technologies Corp",
                "symbol": "TSXV:LQWD",
                "country": "CA",
                "total_holdings": 113,
                "total_entry_value_usd": 4360275,
                "total_current_value_usd": 7873117,
                "percentage_of_total_supply": 0.001
              },
              {
                "name": "Cypherpunk Holdings Inc",
                "symbol": "CSE:HODL",
                "country": "CA",
                "total_holdings": 69,
                "total_entry_value_usd": 1910000,
                "total_current_value_usd": 4807478,
                "percentage_of_total_supply": 0
              },
              {
                "name": "Core Scientific",
                "symbol": "CORZ:NASDAQ",
                "country": "US",
                "total_holdings": 21,
                "total_entry_value_usd": 0,
                "total_current_value_usd": 1463145,
                "percentage_of_total_supply": 0
              },
              {
                "name": "Mogo Inc.",
                "symbol": "NASDAQ:MOGO",
                "country": "CA",
                "total_holdings": 18,
                "total_entry_value_usd": 595494,
                "total_current_value_usd": 1254124,
                "percentage_of_total_supply": 0
              }
            ]
          }
        }
      }
    },
  }
  return NextResponse.json(pluginData);
}
