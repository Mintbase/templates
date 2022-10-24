import { useState } from 'react';

import Head from 'next/head';
import Header from '../components/Header';
import Items from '../components/Items';
import BuyModal from '../components/BuyModal/BuyModal';
import { SelectedNft } from '../types/types';

function Store():JSX.Element {
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
    <div className="flex flex-1 flex-col min-h-screen text-gray-500">
      <Head>
        <title>Mintbase - Simple Marketplace Example</title>
      </Head>
      <Header />
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
