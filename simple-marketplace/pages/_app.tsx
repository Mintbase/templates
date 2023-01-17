import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { WalletContextProvider } from '@mintbase-js/react';
import { mbjs } from '@mintbase-js/sdk';
import { getClient } from '../services/providers/apollo';
import { DEFAULT_NETWORK } from '../config/constants';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const network = process.env.NEXT_PUBLIC_NETWORK || DEFAULT_NETWORK;
  mbjs.config();

  return (
    <WalletContextProvider>
      <ApolloProvider client={getClient({ network })}>
        <Component {...pageProps} />
      </ApolloProvider>
    </WalletContextProvider>
  );
}

export default MyApp;
