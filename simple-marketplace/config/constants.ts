export const BINANCE_API = 'https://api.binance.com/api/v3/ticker/price?symbol=NEARUSDT';
export const MED_GAS = '300000000000000';
export const DEFAULT_STORES = 'membership.mintspace2.testnet,ticket.mintspace2.testnet,coffeeshop.mintspace2.testnet,metro.mintspace2.testnet';
export const DEFAULT_MARKET_ADDRESS = 'market.mintspace2.testnet';
export const DEFAULT_NETWORK = 'testnet';

export const TESTNET_CONFIG = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
  market: 'market.mintspace2.testnet',
  stores: 'yeets.mintspace2.testnet,creativelicense2.testnet,ailand.mintspace2.testnet',
  // Change this referral address below to your account to test it out on purchase from other stores you add and see market fees go right to you.
  affiliate: 'unlock.testnet',
  headers: {
    'Content-Type': 'application/json',
  },
  // change this to your website domain and post-transaction page
  callbackUrl: typeof window !== 'undefined' ? `http://${window?.location.host}/wallet-callback` : 'https://testnet.mintbase.xyz/success',
};

export const MAINNET_CONFIG = {
  networkId: 'mainnet',
  nodeUrl: 'https://rpc.mainnet.near.org',
  walletUrl: 'https://wallet.mainnet.near.org',
  helperUrl: 'https://helper.mainnet.near.org',
  explorerUrl: 'https://explorer.mainnet.near.org',
  stores: 'affiliatedirect.mintbase1.near,ff.nekotoken.near,mrbrownproject.near,misfits.tenk.near,x.paras.near',
  market: 'simple.market.mintbase1.near',
  // Change this referral address below to your account to test it out on purchase from other stores you add and see market fees go right to you.
  affiliate: 'buildz.near',
  headers: {
    'Content-Type': 'application/json',
  },
  callbackUrl: typeof window !== 'undefined' ? `http://${window?.location.host}/wallet-callback` : 'https://www.mintbase.xyz/success',

};

export const WalletKeys = {
  AUTH_KEY: process.env.NEXT_PUBLIC_DEVELOPER_KEY,
};

export const NETWORK_CONFIG = {
  testnet: 'https://interop-testnet.hasura.app/v1/graphql',
  mainnet: 'https://interop-mainnet.hasura.app/v1/graphql',
};
