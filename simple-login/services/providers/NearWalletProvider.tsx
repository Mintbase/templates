import { WalletConnection, connect, keyStores } from "near-api-js";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { MAINNET_CONFIG, TESTNET_CONFIG } from "./constants";

interface IWalletProvider {
  network?: "testnet" | "mainnet" | string;
  chain?: string;
  contractAddress?: string;
  children?: ReactNode;
}

export const WalletContext = createContext<{
  wallet: WalletConnection | undefined;
  details: {
    accountId: string;
    balance: string;
    contractName: string;
  };
  isConnected: boolean;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}>({
  wallet: undefined,
  details: {
    accountId: "",
    balance: "",
    contractName: "",
  },
  isConnected: false,
  loading: true,
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
});

interface IWalletConsumer {
  wallet: WalletConnection | undefined;
  isConnected: boolean;
  details: {
    accountId: string;
    balance: string;
    contractName: string;
  };
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const NearWalletProvider = (props: IWalletProvider) => {
  const { network = "testnet", contractAddress, children } = props;

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [wallet, setWallet] = useState<WalletConnection | undefined>();
  const [connected, setConnected] = useState(false);

  const [details, setDetails] = useState<{
    accountId: string;
    balance: string;
    contractName: string;
  }>({
    accountId: "",
    balance: "",
    contractName: contractAddress || "",
  });

  const init = async () => {
    const near = await connect(
      network === "mainnet"
        ? {
            ...MAINNET_CONFIG,
            keyStore: new keyStores.BrowserLocalStorageKeyStore(),
          }
        : {
            ...TESTNET_CONFIG,
            keyStore: new keyStores.BrowserLocalStorageKeyStore(),
          }
    );

    const wallet = new WalletConnection(near, `${process.env.APP_NAME}-${network}`);

    setWallet(wallet);

    const isConnected = wallet.isSignedIn();

    setConnected(isConnected);

    if (isConnected) {
      const account = wallet.account();

      const accountBalance = await account.getAccountBalance();

      setDetails({
        accountId: account.accountId,
        balance: accountBalance.available,
        contractName: contractAddress || "",
      });
    }

    setLoading(false);
  };

  const signIn = async () => {
    if (!wallet) {
      return;
    }

    wallet.requestSignIn({ contractId: contractAddress });
  };

  const signOut = async () => {
    if (!wallet) {
      return;
    }

    wallet.signOut();

    await router.replace("/", undefined, { shallow: true });

    window.location.reload();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        details,
        isConnected: connected,
        signIn: signIn,
        signOut: signOut,
        loading: loading,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext<IWalletConsumer>(WalletContext);
