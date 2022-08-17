import { MbButton } from 'mintbase-ui'
import type { NextPage } from 'next'
import { useWallet } from '../services/providers/NearWalletProvider'

const Home: NextPage = () => {
  const { isConnected, details, signIn, signOut } = useWallet()

  const buttonLabel = isConnected
    ? `Sign Out ${details.accountId}`
    : ' Connect NEAR Wallet'

  const buttonAction = isConnected ? signOut : signIn

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <MbButton onClick={buttonAction} label={buttonLabel} />
    </div>
  )
}

export default Home
