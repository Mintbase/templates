import { Chain, Network, Wallet } from 'mintbase';
import {
  ReactNode,
} from 'react';

export interface IWalletProvider {
  network: Network;
  chain: Chain;
  apiKey: string;
  children: ReactNode;
}

export interface IWalletConsumer {
  wallet: Wallet;
  details: {
    accountId: string;
    balance: string;
    allowance: string;
    contractName: string;
  };
  isConnected: boolean;
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
}
