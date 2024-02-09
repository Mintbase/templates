"use client";
import { useMbWallet } from "@mintbase-js/react";

export const NearWalletConnector = ({
  isHeader,
}: {
  isHeader?: boolean;
}): JSX.Element => {
  const { isConnected, selector, connect, activeAccountId } = useMbWallet();

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
        className="bg-blue-300 text-black rounded p-3 hover:bg-[#e1e1e1]"
        onClick={handleSignIn}
      >
        Connect To NEAR
      </button>
    );
  }

  return (
    <div className="flex gap-3 items-center">
      {isHeader && activeAccountId && (
        <span className="hidden md:block p-3 rounded-lg bg-black text-white">
          {activeAccountId}
        </span>
      )}
      <div className="flex justify-center items-center w-full">
        <button
          className="bg-black text-white rounded-lg p-3 hover:bg-[#e1e1e1] mx-auto"
          onClick={handleSignout}
        >
          {" "}
          Disconnect{" "}
        </button>
      </div>
    </div>
  );
};
