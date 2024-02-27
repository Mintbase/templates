"use client";

import { useMbWallet } from "@mintbase-js/react";
import { NearWalletConnector } from "@/components/NearWalletSelector";

import Head from "next/head";
import Minter from "@/components/Minter";
import { useSearchParams } from "next/navigation";
import { SuccessPage } from "@/components/Success";
import { mbUrl, nearblocksUrl } from "@/config/setup";
import { getTxnHash } from "@/hooks/utils";
import { useEffect, useState } from "react";


export default function Home() {
  const { isConnected } = useMbWallet();
  const [txnUrl, setTxnUrl] = useState("");


  const params = useSearchParams();

  const mintedParams = params.get("signMeta")
  ? JSON.parse(params.get("signMeta") as string)
  : "";
const txnHashes = params.get("transactionHashes")
  ? params.get("transactionHashes")
  : "";

  useEffect(() => {
    const fetchTxnHash = async () => {
      const txn = await getTxnHash(txnHashes as string);
      setTxnUrl(txn);
    };

    fetchTxnHash();
  }, [txnHashes]);

  if (mintedParams) {
    const metaPage = `${mbUrl}/ref/${mintedParams.args.ref}?type=meta`;
    const txnHashUrl = `${nearblocksUrl}/txns/${txnUrl}`;


    const successPageData = {
      nftTitle: mintedParams.args.title as string,
      mediaUrl: mintedParams.args.mediaUrl  as string,
      metaPage,
      txnHashUrl,
    };

    return <SuccessPage data={successPageData} />;
  }

  if (isConnected)
    return (
      <main className="flex flex-col items-center justify-center mt-2 ">
        <NearWalletConnector />
        <Minter />
      </main>
    );

  return (
    <>
      <main className="flex flex-col items-center justify-center mt-2 ">
        <div className="flex flex-1 flex-col w-full flex flex-col justify-center items-center space-y-8  min-h-screen text-gray-500">
          <Head>
            <title>Mintbase - Simple AI Minter Example</title>
          </Head>
          <div className="mx-6 sm:mx-24 mt-4 mb-4">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="w-full flex flex-col justify-center items-center space-y-8">
                <div className="flex flex-col justify-center items-center space-y-8">
                  <h1 className="h1-90 text-5xl text-white">Mintbase AI Minter</h1>
                  <h2 className="p-big-90 text-white">
                    A simple NFT AI Minter on Mintbase
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
