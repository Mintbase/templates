"use client";
import { useBitteWallet } from "@mintbase-js/react";

export const NearWalletConnector = () => {
  const { isConnected, selector, connect, activeAccountId } = useBitteWallet();

  const handleSignout = async () => {
    const wallet = await selector.wallet();
    return wallet.signOut();
  };

  const handleSignIn = async () => {
    return connect();
  };

  if (!isConnected) {
    return (
      <button
        className="bg-white text-black rounded p-3 hover:bg-[#e1e1e1]"
        onClick={handleSignIn}
      >
        Connect To NEAR
      </button>
    );
  }

  return (
    <div>
      <p>You are connected as {activeAccountId}</p>
      <div className="flex justify-center items-center mt-4">
        <button
          className="bg-white text-black rounded p-3 hover:bg-[#e1e1e1]"
          onClick={handleSignout}
        >
          {" "}
          Disconnect{" "}
        </button>
      </div>
    </div>
  );
};
