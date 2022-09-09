import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { Chain, Network } from 'mintbase';
import { WalletProvider } from '../services/providers/NearWalletProvider';
import { getClient } from '../services/providers/apollo';
import { DEFAULT_NETWORK } from '../config/constants';

function MyApp({ Component, pageProps }: AppProps) {
  const mjsKey = process.env.NEXT_PUBLIC_DEVELOPER_KEY || '';
  const network = process.env.NEXT_PUBLIC_NETWORK as Network || DEFAULT_NETWORK;

  return (
    <WalletProvider
      network={network}
      chain={Chain.near as Chain}
      apiKey={mjsKey}
    >
      <ApolloProvider client={getClient({ network })}>
        <Component {...pageProps} />
      </ApolloProvider>
    </WalletProvider>
  );
}

export default MyApp;
