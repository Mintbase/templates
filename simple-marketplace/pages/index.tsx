import { useState } from 'react';

import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Items from '../components/Items';
import BuyModal from '../components/BuyModal/BuyModal';
import { StoreThing } from '../hooks/useStoreNfts';

function Store():JSX.Element {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({} as StoreThing);

  const handleOpenBuyModal = (item: StoreThing) => {
    setSelectedItem(item);
    setShowBuyModal(true);
  };

  const handleCloseBuyModal = () => {
    setSelectedItem({} as StoreThing);
    setShowBuyModal(false);
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen text-gray-500">
      <Header />
      <div className="md:mx-24 mt-4">
        <HeroSection />
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
}

export default Store;
