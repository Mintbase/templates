import { storeData, storeNfts } from '@mintbase-js/data';
import {
  StoreNftsData,
  StoreNftsResult,
} from '@mintbase-js/data/lib/api/storeNfts/storeNfts.types';
import {
  EIconName,
  MbDropdownMenu,
  MbIcon,
  MbMenuWrapper,
  MbTab,
} from 'mintbase-ui';
import { useEffect, useState } from 'react';
import { Item } from './Item';

import { DEFAULT_STORES } from '../config/constants';
import { SelectedNft, Store } from '../types/types';

function Items({
  showModal,
}: {
  showModal: (item: SelectedNft) => void
}): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState('');
  const [data, setData] = useState<StoreNftsResult>(null);
  const [stores, setStores] = useState([]);

  const defaultStores = process.env.NEXT_PUBLIC_STORES || DEFAULT_STORES;

  const formatedStores = defaultStores.split(/[ ,]+/);

  // show store names in the dropdown menu
  const storeTabs = stores.map((store: Store) => ({
    content: <span>{store.name}</span>,
    onClick: () => setSelectedStore(store.id),
  }));

  // add 'all stores' to the beginning of the dropdown menu
  storeTabs.unshift({
    content: <span>All Stores</span>,
    onClick: () => setSelectedStore(''),
  });

  useEffect(() => {
    // gets store nfts from mintbase-js/data package
    const getStoreNfts = async () => {
      const finalNfts = await storeNfts(formatedStores, true);

      setData(finalNfts.data);
    };

    // gets store data from mintbase-js/data package
    const getStoreData = async () => {
      const finalStores = await storeData(formatedStores);

      setStores(finalStores?.data?.nft_contracts);
    };

    getStoreNfts();
    getStoreData();
  }, []);

  // filter things by store name selected in the dropdown menu
  const filteredNfts: StoreNftsData[] = data?.mb_views_nft_metadata_unburned?.filter(
    (nft) => selectedStore === '' || nft.nft_contract_id === selectedStore,
  );

  return (
    <div className="w-full items-center p-12">
      <div className="flex w-full gap-4 items-center justify-end">
        <MbMenuWrapper setIsOpen={setMenuOpen}>
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            onKeyDown={() => setMenuOpen(!menuOpen)}
            role="button"
            tabIndex={-1}
          >
            <MbTab
              label={(
                <div className="flex space-x-8 items-center">
                  <span>
                    {selectedStore === ''
                      ? 'All Stores'
                      : stores.find(
                        (store: Store) => store.id === selectedStore,
                      )?.name}
                  </span>
                  <div className="pointer-events-none">
                    <MbIcon
                      name={
                        menuOpen
                          ? EIconName.ARROW_DROP_UP
                          : EIconName.ARROW_DROP_DOWN
                      }
                      size="16px"
                      color="blue-300"
                      darkColor="blue-100"
                    />
                  </div>
                </div>
              )}
              isSmall
            />
          </div>
          <MbDropdownMenu
            items={storeTabs}
            isOpen={menuOpen}
            className="mt-2"
          />
        </MbMenuWrapper>
      </div>

      {/** grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 my-12">
        {/* {loading ? (
          <LoadingItem />
        ) : (
          filteredThings.map((nft: StoreNfts) => (
            <Item key={nft.metadataId} item={nft} showModal={showModal} />
          ))
        )} */}
        {filteredNfts?.map((nft) => (
          <Item key={nft.metadata_id} item={nft} showModal={showModal} />
        ))}
      </div>
    </div>
  );
}

export default Items;
