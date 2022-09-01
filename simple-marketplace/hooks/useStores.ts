import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { v2MarketPlaceGetStoreData } from '../queries/marketplace.queries';
import { Store } from '../types/types';

const useStores = () => {
  const [stores, setStores] = useState<Store[]>([]);

  const selectedStores = process.env.NEXT_PUBLIC_STORES
    || 'mufasa.mintspace2.testnet,nearcon2sponsorships.mintspace2.testnet,calvinttest.mintspace2.testnet';

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
