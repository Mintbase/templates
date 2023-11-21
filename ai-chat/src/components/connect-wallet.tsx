"use client";

import { useMbWallet } from "@mintbase-js/react";
import { Button } from "@/components/ui/button";

export function ConnectWallet() {
  const { connect, disconnect, isConnected } = useMbWallet();

  return (
    <>
      <Button
        className="w-[100px] hidden md:flex"
        onClick={() => {
          if (isConnected) {
            disconnect();
          } else {
            connect();
          }
        }}
      >
        {isConnected ? "Disconnect" : "Connect"}
      </Button>
      <Button
        size="sm"
        className="w-[100px] md:hidden"
        onClick={() => {
          if (isConnected) {
            disconnect();
          } else {
            connect();
          }
        }}
      >
        {isConnected ? "Disconnect" : "Connect"}
      </Button>
    </>
  );
}
