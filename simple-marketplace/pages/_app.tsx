import { WalletContextProvider } from '@mintbase-js/react';
import {
  MINTBASE_CONTRACTS, NEAR_NETWORKS, Network, mbjs,
} from '@mintbase-js/sdk';
import type { AppProps } from 'next/app';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import { MAINNET_CONFIG } from '../config/constants';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const network = process.env.NEXT_PUBLIC_NETWORK as Network || NEAR_NETWORKS.TESTNET;
  mbjs.config({ network, callbackUrl: MAINNET_CONFIG.callbackUrl, contractAddress: MINTBASE_CONTRACTS[network] });
  // Create a client
  const queryClient = new QueryClient();

  // We suggest passing the contract address and network in the provider to address potential inconsistencies between server and browser loads
  return (
    <QueryClientProvider client={queryClient}>
      <WalletContextProvider contractAddress={MINTBASE_CONTRACTS[network]} network={network}>
        <Component {...pageProps} />
      </WalletContextProvider>
    </QueryClientProvider>

  );
}

export default MyApp;
