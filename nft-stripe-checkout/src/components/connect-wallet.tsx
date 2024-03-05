"use client";

import { useMbWallet } from "@mintbase-js/react";

export function ConnectWallet() {
  const { connect, disconnect, isConnected } = useMbWallet();

  return (
    <div>
      <button
        className=" font-bold py-2 px-4 rounded-lg disabled:bg-gray-400 disabled:opacity-50 text-center"
        onClick={() => {
          if (isConnected) {
            disconnect();
          } else {
            connect();
          }
        }}
      >
        {isConnected ? "Disconnect" : "Connect"}
      </button>
    </div>
  );
}
