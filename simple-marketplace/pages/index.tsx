import type { NextPage } from "next";
import { SetStateAction, useState } from "react";

import Header from "../containers/Marketplace/components/Header";
import HeroSection from "../containers/Marketplace/components/HeroSection";
import Items from "../containers/Marketplace/components/Items";
import BuyModal from "../containers/Marketplace/components/BuyModal";
import { StoreThing } from "../containers/Marketplace/controllers/useMarketplaceController";

const Store: NextPage = () => {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({} as StoreThing);

  const handleOpenBuyModal = (item: StoreThing) => {
    setSelectedItem(item);
    setShowBuyModal(true);
  }

  const handleCloseBuyModal = () => {
    setSelectedItem({} as StoreThing);
    setShowBuyModal(false);
  }

  return (
    <div className="flex flex-1 flex-col min-h-screen text-gray-500">
      <Header />
      <div className="md:mx-24 mt-4">
        <HeroSection />
      </div>
      <div className="flex w-full">
        <Items showModal={handleOpenBuyModal} />
      </div>
      <div className="mx-4 md:mx-24 md:mt-4">
        {showBuyModal && <BuyModal closeModal={handleCloseBuyModal} item={selectedItem} />}
      </div>
    </div>
  );
};

export default Store;
