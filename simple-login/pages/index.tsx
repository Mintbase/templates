import { MbButton } from "mintbase-ui";
import type { NextPage } from "next";
import { useWallet } from "../services/providers/NearWalletProvider";

const Home: NextPage = () => {
  const { isConnected, details, signIn, signOut } = useWallet();
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {isConnected && (
        <MbButton onClick={signOut} label={`Sign Out ${details.accountId}`} />
      )}
      {!isConnected && (
        <MbButton onClick={signIn} label="Connect NEAR Wallet" />
      )}
    </div>
  );
};

export default Home;
