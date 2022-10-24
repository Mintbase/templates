import '../styles/globals.css';
import { Chain, Network } from 'mintbase';

import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { WalletProvider } from '../services/providers/WalletProvider';
import { getClient } from '../services/providers/apollo';

function MyApp({ Component, pageProps }: AppProps) {
  const mjsKey = process.env.NEXT_PUBLIC_DEVELOPER_KEY;

  const isValidNetworkKey = Object.values(Network).includes(
    process.env.NEXT_PUBLIC_NETWORK as Network,
  );
  const networkKey = isValidNetworkKey
    ? (process.env.NEXT_PUBLIC_NETWORK as Network)
    : Network.testnet;

  if (!mjsKey) {
    return (
      <>
        There is something wrong with your setup. Follow the next few steps to fix it.
        <ol className="list-decimal">
          <li>
            1. Get your developer key at
            {' '}
            <a href="https://www.mintbase.io/developer">
              Mintbase Developer Portal
            </a>
          </li>
          <li>2. Set NEXT_PUBLIC_DEVELOPER_KEY var on your .env file.</li>
        </ol>
      </>
    );
  }

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
