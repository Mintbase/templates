"use client";

import { useMbWallet } from "@mintbase-js/react";
import { Button } from "@/components/ui/button";

export const NearWalletConnector = () => {
  const { connect, disconnect, activeAccountId, isConnected } = useMbWallet();

  if (!isConnected) {
    return <Button onClick={connect}> Connect To NEAR </Button>;
  }

  return (
    <div className="fixed flex flex-wrap w-[350] h-[200] justify-center items-center right-5 bottom-5">
      <b className="pt-5 truncate">{activeAccountId}</b>
      <div className="flex justify-center items-center mt-4 ml-4">
        <Button onClick={disconnect}> Disconnect</Button>
      </div>
    </div>
  );
};
