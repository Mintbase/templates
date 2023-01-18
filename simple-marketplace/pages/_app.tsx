import { ApolloProvider } from '@apollo/client';
import { WalletContextProvider } from '@mintbase-js/react';
import { mbjs } from '@mintbase-js/sdk';
import type { AppProps } from 'next/app';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { DEFAULT_NETWORK } from '../config/constants';
import { getClient } from '../services/providers/apollo';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const network = process.env.NEXT_PUBLIC_NETWORK || DEFAULT_NETWORK;
  mbjs.config();

  // Create a client
  const queryClient = new QueryClient();

  return (
    <WalletContextProvider>
      <QueryClientProvider client={queryClient}>

        <ApolloProvider client={getClient({ network })}>
          <Component {...pageProps} />
        </ApolloProvider>
      </QueryClientProvider>
    </WalletContextProvider>
  );
}

export default MyApp;
