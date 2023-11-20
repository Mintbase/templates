"use client";

import { useMbWallet } from "@mintbase-js/react";

export function ConnectWallet() {
  const { connect, disconnect, isConnected } = useMbWallet();

  return (
    <div>
      <button
        className="hidden md:flex"
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
      <button
        className="mr-2 md:hidden"
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
