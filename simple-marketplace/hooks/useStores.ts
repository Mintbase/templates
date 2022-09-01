import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { DEFAULT_STORES } from '../config/constants';
import { v2MarketPlaceGetStoreData } from '../queries/marketplace.queries';
import { Store } from '../types/types';

const useStores = () => {
  const [stores, setStores] = useState<Store[]>([]);

  const selectedStores = process.env.NEXT_PUBLIC_STORES
    || DEFAULT_STORES;

  const { loading } = useQuery(v2MarketPlaceGetStoreData, {
    variables: {
      id: [selectedStores],
    },
    onCompleted: (data) => {
      const storesData = data?.store;

      setStores(storesData);
    },
  });

  return { stores, loading };
};

export default useStores;
