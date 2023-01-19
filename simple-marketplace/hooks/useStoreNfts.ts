/*

useStoreNfts Hook
Description: This hook calls storeNfts method from @mintbase-js/data to get store nfts to render on Items.

*/

import { ParsedDataReturn, storeNfts } from '@mintbase-js/data';
import { StoreNftsResult } from '@mintbase-js/data/lib/api/storeNfts/storeNfts.types';
import { useQuery } from 'react-query';
import { DEFAULT_STORES } from '../config/constants';

const mapStoreNfts = (data: ParsedDataReturn<StoreNftsResult>) => ({
  nftsData: data?.data?.mb_views_nft_metadata_unburned,
});

const useStoreNfts = () => {
  const defaultStores = process.env.NEXT_PUBLIC_STORES || DEFAULT_STORES;

  const formatedStores = defaultStores.split(/[ ,]+/);

  const {
    isLoading,
    error,
    data,
  } = useQuery('storeNfts', () => storeNfts(formatedStores), {
    retry: false,
    refetchOnWindowFocus: false,
    select: mapStoreNfts,
  });

  return { ...data, error, loading: isLoading };
};

export { useStoreNfts };
