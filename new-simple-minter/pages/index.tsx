import { Inter } from "@next/font/google";
import { useWallet } from "@mintbase-js/react";
import { NearWalletConnector } from "../components/NearWalletSelector";
import Minter from "../components/Minter";
import { mbjs } from "@mintbase-js/sdk";

export default function Home() {
  const { isConnected } = useWallet();

  mbjs.config({
    network: process.env.NEXT_PUBLIC_NEAR_NETWORK,
    callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL,
    contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  })

  return (
    <>
      <main className="flex flex-col items-center justify-center mt-2">
        <NearWalletConnector />
        {isConnected ? <Minter /> : null}
      </main>
    </>
  );
}

