import { WalletConnection, connect, keyStores } from 'near-api-js';
import { useRouter } from 'next/router';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { MAINNET_CONFIG, TESTNET_CONFIG } from './constants';

interface IWalletProvider {
  network: 'testnet' | 'mainnet' | string
  contractAddress: string
  children: ReactNode
}

export const WalletContext = createContext<{
  wallet: WalletConnection | undefined
  details: {
    accountId: string
    balance: string
    contractName: string
  }
  isConnected: boolean
  loading: boolean
  signIn:() => Promise<void>
  signOut: () => Promise<void>
}>({
      wallet: undefined,
      details: {
        accountId: '',
        balance: '',
        contractName: '',
      },
      isConnected: false,
      loading: true,
      signIn: () => Promise.resolve(),
      signOut: () => Promise.resolve(),
    });

interface IWalletConsumer {
  wallet: WalletConnection | undefined
  isConnected: boolean
  details: {
    accountId: string
    balance: string
    contractName: string
  }
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

export function NearWalletProvider({ network = 'testnet', contractAddress, children }: IWalletProvider) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [walletInfo, setWallet] = useState<WalletConnection | undefined>();
  const [connected, setConnected] = useState(false);

  const [details, setDetails] = useState<{
    accountId: string
    balance: string
    contractName: string
  }>({
    accountId: '',
    balance: '',
    contractName: contractAddress || '',
  });

  const init = useCallback(async () => {
    const near = await connect(
      network === 'mainnet'
        ? {
          ...MAINNET_CONFIG,
          keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        }
        : {
          ...TESTNET_CONFIG,
          keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        },
    );

    const wallet = new WalletConnection(
      near,
      `${process.env.NEXT_PUBLIC_USER_ID}-${network}`,
    );

    setWallet(wallet);

    const isConnected = wallet.isSignedIn();

    setConnected(isConnected);

    if (isConnected) {
      const account = wallet.account();

      const accountBalance = await account.getAccountBalance();

      setDetails({
        accountId: account.accountId,
        balance: accountBalance.available,
        contractName: contractAddress || '',
      });
    }

    setLoading(false);
  }, [contractAddress, network]);

  const signIn = useCallback(async () => {
    if (!walletInfo) {
      return;
    }

    walletInfo.requestSignIn({ contractId: contractAddress });
  }, [contractAddress, walletInfo]);

  const signOut = useCallback(async () => {
    if (!walletInfo) {
      return;
    }

    walletInfo.signOut();

    await router.replace('/', undefined, { shallow: true });

    window.location.reload();
  }, [router, walletInfo]);

  useEffect(() => {
    init();
  }, [init]);

  const walletContextData = useMemo(() => {
    const obj = {
      wallet: walletInfo,
      details,
      isConnected: connected,
      signIn,
      signOut,
      loading,
    };

    return obj;
  }, [connected, details, loading, signIn, signOut, walletInfo]);

  return (
    <WalletContext.Provider
      value={walletContextData}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext<IWalletConsumer>(WalletContext);
