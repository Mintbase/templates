import { useWallet } from "@mintbase-js/react";
import { NearWalletConnector } from "../components/NearWalletSelector";
import Minter from "../components/Minter";
import { mbjs } from "@mintbase-js/sdk";
import { MbText } from "mintbase-ui";
import Head from "next/head";


export default function Home() {
  const { isConnected } = useWallet();

  mbjs.config({
    network: process.env.NEXT_PUBLIC_NEAR_NETWORK,
    callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL,
    contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  })

  if (isConnected) return (
    <main className="flex flex-col items-center justify-center mt-2">
      <NearWalletConnector />
      <Minter />
    </main>
  )

  return (
    <>
      <main className="flex flex-col items-center justify-center mt-2">
        <div className="flex flex-1 flex-col min-h-screen text-gray-500">
          <Head>
            <title>Mintbase - Simple Minter Example</title>
          </Head>
          <div className="mx-6 sm:mx-24 mt-4 mb-4">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="w-full flex flex-col justify-center items-center space-y-8">
                <div className="flex flex-col justify-center items-center space-y-8">
                  <MbText className="text-3xl h1-30">Simple Minter</MbText>
                  <MbText className="text-xl">A simple NFT Minter on Mintbase</MbText>
                </div>
                <div>
                  <NearWalletConnector />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

