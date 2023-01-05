import { Inter } from "@next/font/google";
import { useWallet } from "@mintbase-js/react";
import { NearWalletConnector } from "../components/NearWalletSelector";
import Minter from "../components/Minter";

export default function Home() {
  const { isConnected } = useWallet();
  return (
    <>
      <main className="flex flex-col items-center justify-center mt-2">
        <NearWalletConnector />
        {isConnected ? <Minter /> : null}
      </main>
    </>
  );
}

