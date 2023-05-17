import { WalletContextProvider } from '@mintbase-js/react'
import '@near-wallet-selector/modal-ui/styles.css';
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import {  NEAR_NETWORKS, Network, mbjs } from '@mintbase-js/sdk';

function App({ Component, pageProps }: AppProps): JSX.Element {

  // On mbjs.config and WalletContextProvider you could set the value straight as NEAR_NETWORKS.MAINNET or NEAR_NETWORKS.TESTNET
  const network = process.env.NEXT_PUBLIC_NETWORK as Network || NEAR_NETWORKS.MAINNET;

  // the post-transaction page url
  const localCallback = typeof window !== 'undefined' ? `http://${window?.location.host}/success`: 'http://localhost:3000/success'
  const callbackUrl = process.env.NEXT_PUBLIC_CALLBACK_URL || localCallback

  // if testnet should be a store with name.mintspace2.testnet
  // if mainnet should be a store with name.mintbase1.near

  // also the store you should be a minter
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || 'mystore.mintbase1.near';
  
  // this isnt needed if you set straight on the config and the provider
  const nearNetwork = network || NEAR_NETWORKS.TESTNET

  mbjs.config({
    network: nearNetwork,
    callbackUrl: callbackUrl,
    contractAddress: contractAddress,
  });

// We suggest passing the contract address and network in the provider to address potential inconsistencies between server and browser loads  
return (
      <WalletContextProvider contractAddress={contractAddress} network={nearNetwork}>
        <Component {...pageProps} />
      </WalletContextProvider>
  );
}

export default App