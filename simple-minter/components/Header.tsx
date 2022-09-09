import { MbButton } from 'mintbase-ui';
import { useWallet } from '../services/providers/WalletProvider';

function Header() {
  const {
    isConnected, details, signIn, signOut,
  } = useWallet();

  const buttonLabel = isConnected
    ? `Sign Out ${details.accountId}`
    : ' Connect NEAR Wallet';

  return (
    <nav className="flex justify-between w-full bg-white sticky top-0 z-40 lg:border-b border-solid border-gray-150">
      <div className="flex justify-between items-center">
        <h1 className="font-light text-2xl uppercase p-2 sm:p-4 border-gray-100">
          Minter
        </h1>
      </div>
      {/** login/logout with wallet */}
      <div className="flex items-center sm:mr-2">
        <MbButton
          onClick={isConnected ? signOut : signIn}
          label={buttonLabel}
        />
      </div>
    </nav>
  );
}

export default Header;
