import { WalletContextProvider } from '@mintbase-js/react'
import '@near-wallet-selector/modal-ui/styles.css';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <WalletContextProvider>  
    <Component {...pageProps} />
  </WalletContextProvider>)
}