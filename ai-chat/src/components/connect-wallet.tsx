"use client";

import { useMbWallet } from "@mintbase-js/react";
import { Button } from "@/components/ui/button";

export function ConnectWallet() {
  const { connect, disconnect, isConnected, activeAccountId } = useMbWallet();

  return (

  <div className="absolute right-0 bottom-[80px] text-sm text-white flex connect">
    {isConnected && <span>You are connected as <b>{activeAccountId}</b></span>}
      <p
        className="w-[100px] pl-2 text-white connect-link"
        onClick={() => {
          if (isConnected) {
            disconnect();
          } else {
            connect();
          }
        }}
      >
        {isConnected ? "Disconnect" : "Connect"}
      </p>
      </div>
  );
}
