import { WalletContextProvider } from '@mintbase-js/react'
import '@near-wallet-selector/modal-ui/styles.css';
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { mbjs } from '@mintbase-js/sdk';

function App({ Component, pageProps }: AppProps): JSX.Element {
  const network = process.env.NEXT_PUBLIC_NEAR_NETWORK || 'mainnet';
  const callbackUrl = process.env.NEXT_PUBLIC_CALLBACK_URL;
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || 'mintbase1.near';
  
  mbjs.config({
    network: network,
    callbackUrl: callbackUrl,
    contractAddress: contractAddress,
  });

  return (
      <WalletContextProvider contractAddress={contractAddress} network={network === 'mainnet' ? 'mainnet' : 'testnet'}>
        <Component {...pageProps} />
      </WalletContextProvider>
  );
}

export default App