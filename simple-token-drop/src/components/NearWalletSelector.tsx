"use client"
import { useMbWallet } from "@mintbase-js/react";

export const NearWalletConnector = () => {
  const { isConnected, selector, connect, activeAccountId } = useMbWallet();

  const handleSignout = async () => {
    const wallet = await selector.wallet();
    return wallet.signOut();
  };

  const handleSignIn = async () => {
    return connect();
  };

  if (!isConnected) {
    return <button className="bg-black text-white rounded p-3 hover:bg-[#e1e1e1] w-44" onClick={handleSignIn}>Connect </button>;
  }

  return (

    <button className="bg-black text-white rounded p-3 hover:bg-[#e1e1e1] w-44" onClick={handleSignout}> Disconnect </button>

  );
};
