import { WalletContextProvider } from '@mintbase-js/react';
import { mbjs } from '@mintbase-js/sdk';
import type { AppProps } from 'next/app';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { MAINNET_CONFIG } from '../config/constants';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const network = 'testnet';
  mbjs.config({ network, callbackUrl: MAINNET_CONFIG.callbackUrl, contractAddress: 'mintspace2.testnet' });
  // Create a client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <WalletContextProvider contractAddress="mintspace2.testnet" network="testnet">
        <Component {...pageProps} />
      </WalletContextProvider>
    </QueryClientProvider>

  );
}

export default MyApp;
