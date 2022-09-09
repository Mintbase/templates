import { MbButton } from 'mintbase-ui';
import { useWallet } from '../services/providers/WalletProvider';

export function SignInButton(): JSX.Element {
  const { signIn } = useWallet();

  return (
    <div className="mt-4">
      <MbButton onClick={signIn} label="Connect NEAR Wallet" />
    </div>
  );
}
