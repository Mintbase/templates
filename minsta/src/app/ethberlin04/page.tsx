"use client";
import { useMbWallet } from "@mintbase-js/react";
import { callViewMethod } from '../../utils/utils'
import { useEffect, useState } from "react";
import Image from 'next/image';

const EthBerlin04 = () => {
  const { isConnected, selector, connect, activeAccountId } = useMbWallet();
  const [nfts, setNfts] = useState<{ owner_id: string,  metadata: { extra: string, media: string }, token_id: string }[]>([]);

  const createUserNFT = async (address: string) => {
    const response = await fetch(`/api/ethberlin/${activeAccountId}`)
    const restResponse = await response.json();
    console.log('restResponse', restResponse);
  }

  const checkNFT = async (address: string) => {
    try {
      const response = await callViewMethod<{ owner_id: string, metadata: { extra: string, media: string }, token_id: string }[]>({
        contractId: "ethberlin04hackaton.mintspace3.testnet",
        method: "nft_tokens_for_owner",
        args: { account_id: address }
      });
      setNfts(response);
      console.log(response);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (isConnected && activeAccountId) {
      checkNFT(activeAccountId);
    }
  }, [isConnected, activeAccountId]);

  return (
    <>
      <main className="pt-20 flex flex-col gap-6 items-center justify-center text-mainText font-bold"
        style={{ backgroundImage: "url('../images/cityback.jpg')" }} 
      >
        {isConnected ? (
          <>
            {nfts.length > 0 ? (
              <>
              <h1>You Have Already Minted this NFT</h1>
                {
                  nfts.map(
                    (nft) => (
                      <div key={nft.token_id} className="rounded-xl flex-auto items-center m-2 w-[500px] text-center bg-lightBlue">
                        <span>{nft.owner_id}</span>
                        <p>Level {nft.metadata.extra.split(",").length}</p>
                        <Image src={nft.metadata.media} alt="nft" className="w-full rounded-b-xl" />
                      </div>
                    )
                  )
                }
              </>
            ) : (
              <>
                {activeAccountId && (
                  <button onClick={() => createUserNFT(activeAccountId)}>Mint NFT</button>
                )}
              </>
            )}
          </>
        ) : (
          <button onClick={connect}>Please Login to Mint NFT</button>
        )}
      </main>
    </>
  );
};

export default EthBerlin04;