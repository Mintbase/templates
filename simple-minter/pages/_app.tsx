import '../styles/globals.css';
import { Chain, Network } from 'mintbase';

import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { WalletProvider } from '../services/providers/WalletProvider';
import { getClient } from '../services/providers/apollo';

function MyApp({ Component, pageProps }: AppProps) {
  const mjsKey = process.env.NEXT_PUBLIC_DEVELOPER_KEY || '';

  const isValidNetworkKey = Object.values(Network).includes(process.env.NEXT_PUBLIC_NETWORK as Network);
  const networkKey = isValidNetworkKey ? process.env.NEXT_PUBLIC_NETWORK as Network : Network.testnet;

  return (
    <WalletProvider
      network={networkKey}
      chain={Chain.near as Chain}
      apiKey={mjsKey}
    >
      <ApolloProvider client={getClient({ network: Network.testnet })}>
        <Component {...pageProps} />
      </ApolloProvider>
    </WalletProvider>
  );
}

export default MyApp;
