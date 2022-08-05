import { MbButton } from "mintbase-ui"
import { useWallet } from "../../../services/providers/WalletProvider"

const Header = () => {
  const { isConnected, details, signIn, signOut } = useWallet()

  return (
    <nav className="flex justify-between w-full bg-white sticky top-0 z-40 lg:border-b border-solid border-gray-150">
      <div className="flex justify-between items-center">
        <h1 className="font-light text-2xl uppercase p-2 sm:p-4 border-gray-100">
          Marketplace
        </h1>
      </div>
      {/** login/logout with wallet */}
      <div className="flex items-center sm:mr-2">
        {isConnected && (
          <MbButton onClick={signOut} label={`Sign Out ${details.accountId}`} />
        )}
        {!isConnected && (
          <MbButton onClick={signIn} label="Connect NEAR Wallet" />
        )}
      </div>
    </nav>
  )
}

export default Header;
