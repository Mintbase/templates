/*

useStoreInfo Hook
Description: This hook calls storeData and storeNfts methods from @mintbase-js/data to get store data to render on Items.

*/

import { storeData, storeNfts } from '@mintbase-js/data';
import { StoreNftsResult } from '@mintbase-js/data/lib/api/storeNfts/storeNfts.types';
import { useEffect, useState } from 'react';
import { DEFAULT_STORES } from '../config/constants';

const useStoreInfo = () => {
  const [data, setData] = useState<StoreNftsResult>(null);
  const [stores, setStores] = useState([]);

  const defaultStores = process.env.NEXT_PUBLIC_STORES || DEFAULT_STORES;

  const formatedStores = defaultStores.split(/[ ,]+/);

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

  return { data, stores };
};

export { useStoreInfo };
