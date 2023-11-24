"use client"

import { useMbWallet } from "@mintbase-js/react";
import { Button } from "@/components/ui/button"

export const NearWalletConnector = () => {
  const { connect, disconnect, activeAccountId, isConnected } = useMbWallet();

  if (!isConnected) {
    return <Button onClick={connect}> Connect To NEAR </Button>;
  } else {
    return (
      <div className="fixed  flex w-[350] h-[200] justify-center items-center right-5 bottom-5">
        <p className="pt-5"> You are connected as <b>{activeAccountId}</b></p>
        <div className="flex justify-center items-center mt-4 ml-4">
          <Button onClick={disconnect}> Disconnect</Button>
        </div>
      </div>
    );
  }
};
