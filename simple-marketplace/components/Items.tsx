import { useState } from 'react';
import {
  MbTab,
  MbMenuWrapper,
  MbDropdownMenu,
  MbIcon,
  EIconName,
} from 'mintbase-ui';
import { Item, LoadingItem } from './Item';

import { useStores } from '../hooks/useStores';
import useStoreNfts from '../hooks/useStoreNfts';
import { Store, StoreNfts } from '../types/types';

function Items({ showModal }: { showModal: (item: StoreNfts) => void }): JSX.Element {
  const [selectedTab, setSelectedTab] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState('');

  const { nfts, loading } = useStoreNfts();
  const { stores } = useStores();

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

  // filter things by store name selected in the dropdown menu
  const filteredThings = nfts.filter((nft: StoreNfts) => selectedStore === '' || nft.storeId === selectedStore);

  return (
    <div className="w-full items-center p-12">
      <div className="flex w-full gap-4 items-center justify-end">
        <div
          onClick={() => setSelectedTab('all')}
          onKeyDown={() => setSelectedTab('all')}
          role="button"
          tabIndex={0}
        >
          <MbTab
            label={<span />}
            isActive={selectedTab === 'all'}
            isSmall
          />
        </div>
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
        {loading ? (
          <LoadingItem />
        ) : (
          filteredThings.map((nft: StoreNfts) => (
            <Item key={nft.metadataId} item={nft} showModal={showModal} />
          ))
        )}
      </div>
    </div>
  );
}

export default Items;
