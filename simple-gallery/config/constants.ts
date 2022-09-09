import { Network } from 'mintbase';

export const NETWORK_CONFIG = {
  testnet: 'https://interop-testnet.hasura.app/v1/graphql',
  mainnet: 'https://interop-mainnet.hasura.app/v1/graphql',
};

export const WalletKeys = {
  AUTH_KEY: process.env.NEXT_PUBLIC_DEVELOPER_KEY,
};

export const DEFAULT_NETWORK = Network.testnet;
