import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Chain, Network } from 'mintbase';
import { ApolloProvider } from '@apollo/client';
import { getClient } from '../services/providers/apollo';
import { WalletProvider } from '../services/providers/WalletProvider';
import { DEFAULT_NETWORK } from '../config/constants';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const mjsKey = process.env.NEXT_PUBLIC_DEVELOPER_KEY || '';
  const network = process.env.NEXT_PUBLIC_NETWORK as Network || DEFAULT_NETWORK;

  return (
    <WalletProvider
      network={network}
      chain={Chain.near as Chain}
      apiKey={mjsKey}
    >
      <ApolloProvider client={getClient({ network: network as Network })}>
        <Component {...pageProps} />
      </ApolloProvider>
    </WalletProvider>
  );
}

export default MyApp;
