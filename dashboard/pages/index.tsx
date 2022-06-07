import type { NextPage } from "next";
import Head from "next/head";
import { useWallet } from "../services/providers/NearWalletProvider";

const Home: NextPage = () => {
  const { isConnected, details, signIn, signOut } = useWallet();
  return (
    <div className="h-screen w-screen">
      {isConnected && (
        <button className="text-black" onClick={signOut}>
          Sign Out ({details.accountId})
        </button>
      )}
      {!isConnected && (
        <button className="text-black" onClick={signIn}>
          Sign In
        </button>
      )}
    </div>
  );
};

export default Home;
