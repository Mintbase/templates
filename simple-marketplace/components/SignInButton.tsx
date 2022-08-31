import { MbButton } from "mintbase-ui";

export const SignInButton = ({signIn}: {signIn: () => void}) => {

  return (  <div className="mt-4">
    <MbButton onClick={signIn} label="Connect NEAR Wallet" />
  </div>
  );
}