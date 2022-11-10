import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Network } from 'mintbase';
import { ApolloProvider } from '@apollo/client';
import { WalletContextProvider } from '@mintbase-js/react';
import { getClient } from '../services/providers/apollo';
import { DEFAULT_NETWORK } from '../config/constants';
import '@near-wallet-selector/modal-ui/styles.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const network = (process.env.NEXT_PUBLIC_NETWORK as Network) || DEFAULT_NETWORK;

  return (
    <WalletContextProvider>
      <ApolloProvider client={getClient({ network: network as Network })}>
        <Component {...pageProps} />
      </ApolloProvider>
    </WalletContextProvider>
  );
}

export default MyApp;
