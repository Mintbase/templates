"use client";

import { NearWalletConnector } from "@/components/NearWalletSelector";
import { useMbWallet } from "@mintbase-js/react";

import ContractDeployer from "@/components/ContractDeployer";
import { SuccessPage } from "@/components/Success";
import { Button } from "@/components/ui/button";
import { mbUrl, nearblocksUrl } from "@/config/setup";
import { getTxnHash } from "@/lib/utils";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { isConnected, activeAccountId } = useMbWallet();

  const [txnUrl, setTxnUrl] = useState("");

  const params = useSearchParams();

  const contractDeployParams = params.get("signMeta")
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

  if (contractDeployParams) {
    const contractName = contractDeployParams.args.contractAddress as string;
    const contractPage = `${mbUrl}/contract/${contractName}`;
    const txnHashUrl = `${nearblocksUrl}/txns/${txnUrl}`;

    const successPageData = {
      contractName: contractName,
      contractPage,
      txnHashUrl,
    };

    return <SuccessPage data={successPageData} />;
  }

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
                <div className="flex flex-col justify-center items-center space-y-8 text-center">
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
