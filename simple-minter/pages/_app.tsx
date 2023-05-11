import { WalletContextProvider } from '@mintbase-js/react'
import '@near-wallet-selector/modal-ui/styles.css';
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { mbjs } from '@mintbase-js/sdk';

function App({ Component, pageProps }: AppProps): JSX.Element {
  const network = 'mainnet';
  mbjs.config({ network, contractAddress: 'mintbase1.near' });
  // Create a client

  return (
      <WalletContextProvider contractAddress="mintbase1.near" network="mainnet">
        <Component {...pageProps} />
      </WalletContextProvider>
  );
}

export default App