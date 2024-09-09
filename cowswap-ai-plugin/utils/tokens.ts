import * as fs from 'fs';
import csv from 'csv-parser';

interface TokenInfo {
    address: string;
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

type DuneNetwork = "ethereum" | "gnosis" | "arbitrum";

const cowToDuneMapping: Record<CowNetwork, DuneNetwork> = {
  mainnet: "ethereum",
  xdai: "gnosis",
  arbitrum_one: "arbitrum"
};

export async function tokenFromSymbol(network: CowNetwork, symbol: string): Promise<TokenInfo> {
  // TODO. Load once and cache.
  // Token data comes from https://dune.com/queries/4055949
  //  curl -X GET https://api.dune.com/api/v1/query/4055949/results/csv -H "x-dune-api-key: $DUNE_API_KEY"  > tokens.csv
  const tokenMap = await loadTokenMapping("./tokens.csv")
  return tokenMap[cowToDuneMapping[network]!][symbol]
}