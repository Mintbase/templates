import { MbButton } from 'mintbase-ui';
import { useWallet } from '../services/providers/NearWalletProvider';

function Home():JSX.Element {
  const {
    isConnected, details, signIn, signOut,
  } = useWallet();

  const buttonLabel = isConnected
    ? `Sign Out ${details.accountId}`
    : ' Connect NEAR Wallet s';

  const buttonAction = isConnected ? signOut : signIn;

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <MbButton onClick={buttonAction} label={buttonLabel} />
    </div>
  );
}

export default Home;
