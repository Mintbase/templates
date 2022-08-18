import { useState } from "react";
import { MbTab, MbMenuWrapper, MbDropdownMenu, MbIcon, EIconName } from "mintbase-ui";
import { Item, LoadingItem } from "./Item";
import useStoreThingsController, { StoreThing } from "../controllers/useMarketplaceController";
import useStoreController, { Store } from "../controllers/useStoresController";

const Items = ({ showModal }: { showModal: (item: StoreThing) => void }) => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState('');

  const { things, loading } = useStoreThingsController();
  const { stores, loading: loadingStores } = useStoreController();

  // show store names in the dropdown menu
  const storeTabs = stores.map((store: Store) => {
    return {
      content: <span>{store.name}</span>,
      onClick: () => setSelectedStore(store.id)
    }
  });

  // add 'all stores' to the beginning of the dropdown menu
  storeTabs.unshift({
    content: <span>All Stores</span>,
    onClick: () => setSelectedStore('')
  });

  // filter things by store name selected in the dropdown menu
  const filteredThings = things.filter((thing: StoreThing) => {
    return selectedStore === '' || thing.storeId === selectedStore;
  });

  return (
    <div className='w-full ml-6 items-center mt-4'>
      <div className='flex w-full ml-6 items-center mt-4'>
        <div onClick={() => setSelectedTab('all')}>
          <MbTab
            label={<span>All Items</span>}
            isActive={selectedTab === 'all'} 
            isSmall
          />
        </div>
        <MbMenuWrapper setIsOpen={setMenuOpen}>
          <div onClick={() => setMenuOpen(!menuOpen)}>
            <MbTab
              label={
                <div className="flex space-x-8 items-center">
                  <span>{selectedStore === ''
                    ? 'All Stores'
                    : stores.find((store: Store) => store.id === selectedStore)?.name
                  }</span>
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
              }
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
          filteredThings.map((thing: StoreThing, index: number) => (
            <Item key={index} item={thing} showModal={showModal} />
          ))
        )}
      </div>
    </div>
  );
}

export default Items;
