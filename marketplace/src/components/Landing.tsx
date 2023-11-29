"use client";

import { ESize, EState, MbButton } from "mintbase-ui";
import Items from "./Items";
import { useState } from "react";
import { SelectedNft } from "@/types/types";
import BuyModal from "./BuyModal/BuyModal";

const LandingPage = () => {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({} as SelectedNft);

  const handleOpenBuyModal = (item: SelectedNft) => {
    setSelectedItem(item);
    setShowBuyModal(true);
  };

  const handleCloseBuyModal = () => {
    setSelectedItem({} as SelectedNft);
    setShowBuyModal(false);
  };

  return (
    <div className="w-full flex flex-col items-start gap-4">
      <div className="text-[40px]">Mintbase Simple Marketplace Example</div>
      <div>
        <p>
          1. Make sure to change the env NEXT_PUBLIC_AFFILIATE_ACCOUNT to your
          own NEAR account
        </p>
        <p>2. On purchase, see your account pop up on the leaderboard</p>
        <p>3. Check your wallet balance to see funds go up!</p>
        <div className="mt-4 flex">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://mintbase.xyz/leaderboard"
          >
            <MbButton
              label="See Leaderboard"
              size={ESize.MEDIUM}
              state={EState.ACTIVE}
            />
          </a>
        </div>
      </div>
      <div className="flex w-full">
        <Items showModal={handleOpenBuyModal} />
      </div>
      <div className="mx-24 mt-4">
        {!!showBuyModal && (
          <BuyModal closeModal={handleCloseBuyModal} item={selectedItem} />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
