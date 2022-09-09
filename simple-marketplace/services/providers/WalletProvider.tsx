/*
  NEAR Wallet Provider
*/

import { Network, Wallet } from 'mintbase';
import {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import { useRouter } from 'next/router';

import { IWalletConsumer, IWalletProvider } from '../../types/wallet.types';
import { WalletKeys } from '../../config/constants';

export const WalletContext = createContext<{
  wallet: Wallet;
  details: {
    accountId: string;
    balance: string;
    allowance: string;
    contractName: string;
  };
  isConnected: boolean;
  loading: boolean;
  signIn:() => void;
  signOut: () => void;
}>({
      wallet: undefined,
      details: {
        accountId: '',
        balance: '',
        allowance: '',
        contractName: '',
      },
      isConnected: false,
      loading: true,
      signIn: () => Promise.resolve(),
      signOut: () => null,
    });

export function WalletProvider({
  network = Network.testnet,
  chain,
  apiKey,
  children,
}: IWalletProvider) {
  const [walletInfo, setWallet] = useState<Wallet | undefined>();

  const [details, setDetails] = useState<{
    accountId: string;
    balance: string;
    allowance: string;
    contractName: string;
  }>({
    accountId: '',
    balance: '',
    allowance: '',
    contractName: '',
  });

  const router = useRouter();

  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  const initWallet = useCallback(async () => {
    const accountId = router.query.account_id;
    const nearKeystore = `near-api-js:keystore:${accountId}:${network}`;

    if (
      accountId
      && localStorage.getItem(nearKeystore)
      && localStorage.getItem(WalletKeys.AUTH_KEY)
    ) {
      localStorage.removeItem(WalletKeys.AUTH_KEY);
      localStorage.removeItem(nearKeystore);
    }

    const { data: walletData, error } = await new Wallet().init({
      networkName: network ?? Network.testnet,
      chain,
      apiKey,
    });

    if (error) {
      console.error(error);
      return;
    }

    const { wallet, isConnected } = walletData;

    setWallet(wallet);

    if (isConnected) {
      try {
        const { data: detailsData } = await wallet.details();
        setDetails(detailsData);
        setConnected(true);
      } catch (err) {
        console.error(err);
      }
    }
    setLoading(false);
  }, [apiKey, chain, network, router.query.account_id]);

  const signIn = useCallback(async () => {
    if (!walletInfo) {
      return;
    }
    await walletInfo.connect({ requestSignIn: true });
  }, [walletInfo]);

  const signOut = useCallback(async () => {
    if (!walletInfo) {
      return;
    }
    walletInfo.disconnect();

    await router.replace('/', undefined, { shallow: true });

    window.location.reload();
  }, [router, walletInfo]);

  useEffect(() => {
    initWallet();
  }, [initWallet, network]);

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
    <WalletContext.Provider value={walletContextData}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext<IWalletConsumer>(WalletContext);
