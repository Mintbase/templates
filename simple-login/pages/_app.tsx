import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NearWalletProvider } from '../services/providers/NearWalletProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NearWalletProvider network={process.env.NETWORK || 'testnet'}>
      <Component {...pageProps} />
    </NearWalletProvider>
  )
}

export default MyApp
