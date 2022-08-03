import "../styles/globals.css";
import { Chain, Network } from 'mintbase'

import type { AppProps } from "next/app";
import { WalletProvider } from "../services/providers/WalletProvider";
import { ApolloProvider } from "@apollo/client";
import { getClient } from "../services/providers/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  const mjsKey = process.env.NEXT_PUBLIC_MBJS_KEY || "";

  return (
    <WalletProvider
      network={Network.testnet as Network}
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
