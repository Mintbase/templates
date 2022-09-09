import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NearWalletProvider } from '../services/providers/NearWalletProvider'
import { ApolloProvider } from '@apollo/client'
import { getClient } from '../services/providers/apollo'

function MyApp({ Component, pageProps }: AppProps) {
  const network = process.env.NEXT_PUBLIC_NETWORK || 'testnet'

  return (
    <NearWalletProvider network={network}>
      <ApolloProvider client={getClient({ network: network })}>
        <Component {...pageProps} />
      </ApolloProvider>
    </NearWalletProvider>
  )
}

export default MyApp
