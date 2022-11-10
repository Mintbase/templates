import { MbButton } from 'mintbase-ui';
import { useWallet } from '@mintbase-js/react';

export function SignInButton(): JSX.Element {
  const { connect } = useWallet();

  return (
    <div className="mt-4">
      <MbButton onClick={connect} label="Connect NEAR Wallet" />
    </div>
  );
}
