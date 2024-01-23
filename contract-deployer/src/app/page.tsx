"use client";

import { useMbWallet } from "@mintbase-js/react";
import { NearWalletConnector } from "@/components/NearWalletSelector";

import Head from "next/head";
import ContractDeployer from "@/components/ContractDeployer";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { isConnected, activeAccountId } = useMbWallet();

  if (isConnected)
    return (
      <main className="flex flex-col items-center justify-center mt-2 ">
        <NearWalletConnector />
        <a
          href={`https://testnet.mintbase.xyz/human/${activeAccountId}/contracts`}
          target="_blank"
          className="mb-4"
        >
          <Button variant="secondary">See contracts</Button>
        </a>
        <ContractDeployer />
      </main>
    );

  return (
    <>
      <main className="flex flex-col items-center justify-center mt-2 ">
        <div className="flex flex-1 flex-col w-full flex flex-col justify-center items-center space-y-8  min-h-screen text-gray-500">
          <Head>
            <title>Mintbase - Contract Deployer Example</title>
          </Head>
          <div className="mx-6 sm:mx-24 mt-4 mb-4">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="w-full flex flex-col justify-center items-center space-y-8">
                <div className="flex flex-col justify-center items-center space-y-8">
                  <h1 className="h1-90 text-5xl text-white">
                    Mintbase Contract Deployer
                  </h1>
                  <h2 className="p-big-90 text-white">
                    A simple smart contract deployer on Mintbase
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
