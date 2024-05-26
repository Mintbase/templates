"use client";

import { constants } from "@/constants";
import ViewYourNfts from "../buttons/ViewYourNft";
import RewardsModal from "../RewardsModal";
import { useLeaderBoardData } from "@/hooks/useLeaderboard";
import Link from "next/link";
import { callViewMethod } from '../../utils/utils'
import { useState, useEffect } from "react";
import Image from 'next/image';

export const LeaderboardPage = () => {
  const { openModal, leaderboard, activeAccountId, texts } = useLeaderBoardData();
  const [nftList, setNftList] = useState<{ owner_id: string, metadata: { extra: string, media: string }, token_id: string }[]>([]);

  const checkNFT = async () => {
    try {
      const response = await callViewMethod({ contractId: "ethberlin04hackaton.mintspace3.testnet", method: "nft_tokens", args: { limit: 10, offset: 0 } })
      if (response && Array.isArray(response)) { 
        setNftList(response); 
      } else {
        console.log('Response is not an array');
      }
      console.log(response);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    checkNFT();
  }, []);

  return (
    <>
      <main className="pt-12 flex flex-col gap-6 items-center justify-center text-mainText ">
        <div className="font-bold text-2xl">Leaderboard</div>
        <div className="flex text-center gap-10">
          <ViewYourNfts />

        </div>
        <div className="flex flex-col gap-4 w-full px-4 pb-24 max-w-3xl text-leaderboardText">
          <div className="flex">
            👤 <b className="pl-1"> {nftList?.length}</b>{" "}
            <span className="pl-1 pr-3">Hackers</span>
          </div>

          <div className="flex flex-wrap font-bold">
            {nftList
              .sort((a, b) => b.metadata.extra.split(",").length - a.metadata.extra.split(",").length)
              .map((nft) => (
                <div key={nft.token_id} className="border-2 rounded-xl flex-auto items-center m-2 w-[240px] text-center bg-lightBlue">
                  <span>{nft.owner_id}</span>
                  <p>Level {nft.metadata.extra.split(",").length}</p>
                  <Image src={nft.metadata.media} alt="nft" className="w-full rounded-b-xl" width="240" height="400" />
                </div>
              ))}
          </div>

        </div>
      </main>
    </>
  );
};
