import { MbButton } from 'mintbase-ui'
import type { NextPage } from 'next'
import { Gallery } from '../containers/Gallery/components/Gallery'

import { useWallet } from '../services/providers/NearWalletProvider'

const Store: NextPage = () => {
  const { isConnected, details, signIn, signOut } = useWallet()

  const buttonLabel = isConnected
    ? `Sign Out ${details.accountId}`
    : ' Connect NEAR Wallet'

  const buttonAction = isConnected ? signOut : signIn

  return (
    <div className="mx-24">
      <div className="flex items-center justify-center mt-12">
        <MbButton onClick={buttonAction} label={buttonLabel} />
      </div>

      {isConnected ? <Gallery /> : null}
    </div>
  )
}

export default Store
