/*

useStoreInfo Hook
Description: This hook calls storeData and storeNfts methods from @mintbase-js/data to get store data to render on Items.

*/

import { storeData, storeNfts } from '@mintbase-js/data';
import { useQuery } from 'react-query';
import { DEFAULT_STORES } from '../config/constants';

const useStoreInfo = () => {
  const defaultStores = process.env.NEXT_PUBLIC_STORES || DEFAULT_STORES;

  const formatedStores = defaultStores.split(/[ ,]+/);

  const {
    isLoading,
    error,
    data: dataStore,
  } = useQuery('storeData', () => storeData(formatedStores), {
    retry: false,
    staleTime: Infinity,
  });

  const {
    isLoading: nftsLoading,
    error: nftsError,
    data: dataNfts,
  } = useQuery('storeNfts', () => storeNfts(formatedStores), {
    retry: false,
    staleTime: Infinity,
  });

  return {
    data: dataNfts?.data?.mb_views_nft_metadata_unburned,
    stores: dataStore?.data?.nft_contracts,
    loading: isLoading || nftsLoading,
    error: error || nftsError,
  };
};

export { useStoreInfo };
