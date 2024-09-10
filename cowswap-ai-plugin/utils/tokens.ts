import * as fs from 'fs';
import csv from 'csv-parser';
import { Address, isAddress, parseUnits } from 'viem';
import { Network, setupAdapter } from 'near-ca';
import { NextRequest } from 'next/server';

interface TokenInfo {
    address: Address;
    decimals: number;
}

type SymbolMapping = Record<string, TokenInfo>;
type BlockchainMapping = Record<string, SymbolMapping>;

export async function loadTokenMapping(filePath: string): Promise<BlockchainMapping> {
    const mapping: BlockchainMapping = {};

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                const { blockchain, address, symbol, decimals } = row;
                
                // Ensure blockchain key exists in the mapping
                if (!mapping[blockchain]) {
                    mapping[blockchain] = {};
                }

                // Map symbol to address and decimals
                mapping[blockchain][symbol] = {
                    address,
                    decimals: parseInt(decimals, 10)
                };
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
                resolve(mapping);
            })
            .on('error', (error: unknown) => {
                console.error('Error reading the CSV file:', error);
                reject(error);
            });
    });
}

export type CowNetwork = "mainnet" | "xdai" | "arbitrum_one";

// type DuneNetwork = "ethereum" | "gnosis" | "arbitrum";
let tokenMap: BlockchainMapping;

const chainIdFromNetwork: Record<CowNetwork, number> = {
  mainnet: 1,
  xdai: 100,
  arbitrum_one: 42161
};

export async function getTokenDetails(network: CowNetwork, symbolOrAddress: string): Promise<TokenInfo> {
  if (isAddress(symbolOrAddress)) {
    return {
      address: symbolOrAddress as Address,
      decimals: await getTokenDecimals(chainIdFromNetwork[network], symbolOrAddress)
    };
  }
  console.log("Seeking TokenMap for Symbol -> Address conversion")
  // TODO. Load once and cache.
  // Token data comes from https://dune.com/queries/4055949
  //  curl -X GET https://api.dune.com/api/v1/query/4055949/results/csv -H "x-dune-api-key: $DUNE_API_KEY"  > tokens.csv
  if (!tokenMap) {
    // half-ass attempt to load to memory.
    tokenMap = await loadTokenMapping("./tokens.csv")
  }
  return tokenMap[network][symbolOrAddress]
}

// Function to request token decimals
async function getTokenDecimals(chainId: number, tokenAddress: string): Promise<number> {
  const client = Network.fromChainId(chainId).client;
  try {
    const decimals = await client.readContract({
      address: tokenAddress as `0x${string}`,
      abi: ['function decimals() view returns (uint8)'],
      functionName: 'decimals',
    });

    return decimals as number;
  } catch (error: unknown) {
    throw new Error(`Error fetching token decimals: ${error}`);
  }
}

export interface QuoteRequestBody {
  sellToken: Address;
  buyToken: Address;
  sellAmountBeforeFee: string;
  kind: "buy" | "sell";
  receiver: Address,
  from: Address,
  // network is not officially part of the COW API expectations
  network: CowNetwork
}

export async function parseQuoteRequest(req: NextRequest): Promise<QuoteRequestBody> {
  // TODO - Add Type Guard on Request (to determine better if it needs processing below.)
  const requestBody = await req.json();

  const {sellToken, buyToken, network, sellAmountBeforeFee, from} = requestBody;

  if (!["mainnet", "xdai", "arbitrum_one"].includes(network)) {
    throw new Error(`Invalid network '${network}'. Must be one of 'mainnet', 'xdai' OR 'arbitrum_one'`);
  }

  const [buyTokenData, sellTokenData] = await Promise.all([
    getTokenDetails(network, buyToken),
    getTokenDetails(network, sellToken),
  ]);

  let sender = from;
  if (!isAddress(from)) {
    console.log(`Transforming near address ${from} to EVM address`)
    const adapter = await setupAdapter({accountId: from, mpcContractId: "v1.signer"});
    sender = adapter.address;
  }

  return {
    sellToken: sellTokenData.address,
    buyToken: buyTokenData.address,
    sellAmountBeforeFee: parseUnits(sellAmountBeforeFee, sellTokenData.decimals).toString(),
    kind: "sell",
    // TODO - change this when we want to enable alternate recipients.
    receiver: sender,
    from: sender,
    network: requestBody.network
  }
}
