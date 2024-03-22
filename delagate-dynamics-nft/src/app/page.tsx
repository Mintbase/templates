"use client";

import { useMbWallet } from "@mintbase-js/react";
import { NearWalletConnector } from "@/components/NearWalletSelector";

import Head from "next/head";
import Minter from "@/components/Minter";
export default function Home() {
  const { isConnected } = useMbWallet();

  if (isConnected)
    return (
      <main className="flex flex-col items-center justify-center mt-2 ">
        <Minter/>
        <NearWalletConnector />
      </main>
    );

  return (
    <>
      <main className="flex flex-col items-center justify-center mt-2 ">
        <div className="flex-1 w-full flex flex-col justify-center items-center space-y-8  min-h-screen text-gray-500">
          <Head>
            <title>Mintbase - Delagate NFT on Mintbase</title>
          </Head>
          <div className="mx-6 sm:mx-24 mt-4 mb-4">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="w-full flex flex-col justify-center items-center space-y-8">
                <div className="flex flex-col justify-center items-center space-y-8">
                  <h1 className="h1-90 text-5xl text-black">Mintbase Delagate NFT</h1>
                  <h2 className="p-big-90 text-black">
                    A simple NFT delagate dynamics on Mintbase
                  </h2>
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
  );
}
