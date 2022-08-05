import { Chain, Network, Wallet } from 'mintbase'
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from 'react'
import { useRouter } from 'next/router'
import { WalletKeys } from './constants'

interface IWalletProvider {
  network?: Network
  chain?: Chain
  apiKey: string
  children?: ReactNode
}

interface IWalletConsumer {
  wallet: Wallet
  details: {
    accountId: string
    balance: string
    allowance: string
    contractName: string
  }
  isConnected: boolean
  loading: boolean
  signIn: () => void
  signOut: () => void
}

export const WalletContext = createContext<{
  wallet: Wallet
  details: {
    accountId: string
    balance: string
    allowance: string
    contractName: string
  }
  isConnected: boolean
  loading: boolean
  signIn: () => void
  signOut: () => void
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
})

export const WalletProvider = (props: IWalletProvider) => {  
  const { network, chain, apiKey, children } = props

  const [wallet, setWallet] = useState<Wallet | undefined>()

  const [details, setDetails] = useState<{
    accountId: string
    balance: string
    allowance: string
    contractName: string
  }>({
    accountId: '',
    balance: '',
    allowance: '',
    contractName: '',
  })

  const router = useRouter()

  const [connected, setConnected] = useState(false)

  const [loading, setLoading] = useState(true)

  const initWallet = async () => {
    const accountId = router.query.account_id
    const nearKeystore = `near-api-js:keystore:${accountId}:${network}`

    if (
      accountId &&
      localStorage.getItem(nearKeystore) &&
      localStorage.getItem(WalletKeys.AUTH_KEY)
    ) {
      localStorage.removeItem(WalletKeys.AUTH_KEY)
      localStorage.removeItem(nearKeystore)
    }

    const { data: walletData, error } = await new Wallet().init({
      networkName: network ?? Network.testnet,
      chain: chain ?? Chain.near,
      apiKey: apiKey,
    })

    if (error) {
      console.error(error)
      return
    }

    const { wallet, isConnected } = walletData

    setWallet(wallet)

    if (isConnected) {
      try {
        const { data: details } = await wallet.details()
        setDetails(details)
        setConnected(true)
      } catch (err) {
        console.error(err)
      }
    }
    setLoading(false)
  }

  const signIn = async () => {
    if (!wallet) {
      return
    }
    await wallet.connect({ requestSignIn: true })
  }

  const signOut = async () => {
    if (!wallet) {
      return
    }
    await wallet.disconnect()

    await router.replace("/", undefined, { shallow: true });

    window.location.reload();
  }

  useEffect(() => {
    initWallet()
  }, [network])

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
  )
}

export const useWallet = () => useContext<IWalletConsumer>(WalletContext)
