import { Network } from 'mintbase';

export const BINANCE_API = 'https://api.binance.com/api/v3/ticker/price?symbol=NEARUSDT';
export const MED_GAS = '300000000000000';
export const DEFAULT_STORES = 'latium.mintspace2.testnet,mufasa.mintspace2.testnet,mucho2022.mintspace2.testnet,losmorenitos.mintspace2.testnet,aarond.testnet,nategeier.testnet';
export const DEFAULT_MARKET_ADDRESS = 'market.mintspace2.testnet';
export const DEFAULT_NETWORK = Network.testnet;

export const TESTNET_CONFIG = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const MAINNET_CONFIG = {
  networkId: 'mainnet',
  nodeUrl: 'https://rpc.mainnet.near.org',
  walletUrl: 'https://wallet.mainnet.near.org',
  helperUrl: 'https://helper.mainnet.near.org',
  explorerUrl: 'https://explorer.mainnet.near.org',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const WalletKeys = {
  AUTH_KEY: process.env.NEXT_PUBLIC_DEVELOPER_KEY,
};

export const NETWORK_CONFIG = {
  testnet: 'https://interop-testnet.hasura.app/v1/graphql',
  mainnet: 'https://interop-mainnet.hasura.app/v1/graphql',
};
