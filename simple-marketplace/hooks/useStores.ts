/*

useStores Hook
Description: Hook to get the stores set on the NEXT_PUBLIC_STORES env variable

*/

import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { DEFAULT_STORES } from '../config/constants';
import { v2MarketPlaceGetStoreData } from '../queries/marketplace.queries';
import { Store } from '../types/types';

export const useStores = () => {
  const [stores, setStores] = useState<Store[]>([]);

  const selectedStores = process.env.NEXT_PUBLIC_STORES
    || DEFAULT_STORES;

  const formatedselectedStores = selectedStores.split(/[ ,]+/);

  const { loading } = useQuery(v2MarketPlaceGetStoreData, {
    variables: {
      id: formatedselectedStores,
    },
    onCompleted: (data) => {
      const storesData = data?.store;

      setStores(storesData);
    },
  });

  return { stores, loading };
};

export default useStores;
