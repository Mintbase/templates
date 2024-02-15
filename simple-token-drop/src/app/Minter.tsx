/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { serverMint } from "./serverMint";
import { Loading } from "@/components/Loading";

import { useRouter } from "next/navigation";
import { CLIENT_MINT_ARGS, PROXY_CONTRACT, WALLET_DEEP_LINK } from "./constants";

export default function Minter() {

  const [txLoading, setTxLoading] = useState(false);
  const router = useRouter();
  const handleServerMint = () => {
    setTxLoading(true);
    serverMint();
  };

  const handleClientMint = async () => {
    setTxLoading(true);
    
    const txArgs = JSON.stringify({
      receiverId: PROXY_CONTRACT,
      actions: [CLIENT_MINT_ARGS],
    });
    router.push(`${WALLET_DEEP_LINK}[${txArgs}]`);
  };
  if (txLoading) return <Loading />;

  return (
    <div className="border border-black rounded p-12 shadow-[12px_12px_12px_rgb(0,0,0,0.5)]">
      <div className="text-center">
        <h1 className="text-black text-2xl font-medium">Claim free token!</h1>
        <div className="mt-4">
          <img
            src="https://24njbleuvrkggjnr6s3pk473n4jc3buhmy3gnrtfms7jueolq6gq.arweave.net/1xqQrJSsVGMlsfS29XP7bxIthodmNmbGZWS-mhHLh40"
            alt=""
            className="w-2/3 md:w-full max-w-sm mx-auto"
          />
        </div>
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={handleClientMint}
          className="bg-black text-white rounded p-3 hover:bg-gray-700 w-full max-w-sm mx-auto"
        >
          Mint
        </button>
        <button
          onClick={handleServerMint}
          className="text-blue-600 mt-4 hover:underline"
        >
          Drop to a new wallet
        </button>
      </div>
    </div>
  );
}
