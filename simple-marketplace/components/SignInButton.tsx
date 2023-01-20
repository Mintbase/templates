import { useWallet } from '@mintbase-js/react';
import { MbButton } from 'mintbase-ui';

export function SignInButton(): JSX.Element {
  const { connect } = useWallet();

  return (
    <div className="mt-4">
      <MbButton onClick={connect} label="Connect NEAR Wallet" />
    </div>
  );
}
