import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NearWalletProvider } from '../services/providers/NearWalletProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NearWalletProvider
      network={process.env.NEXT_PUBLIC_NETWORK || 'testnet'}
      contractAddress={process.env.NEXT_PUBLIC_USER_ID || ''}
    >
      <Component {...pageProps} />
    </NearWalletProvider>
  );
}

export default MyApp;
