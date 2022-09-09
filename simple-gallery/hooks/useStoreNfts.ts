import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { v2MarketPlaceGetStoreNfts } from '../queries/queries';
import { StoreNfts } from '../types/types';

const useStoreNfts = () => {
  const [nfts, setNfts] = useState<StoreNfts[]>([]);

  const store = process.env.NEXT_PUBLIC_STORE_ID;

  let error = '';

  if (typeof store === 'undefined') {
    error = 'error:  the env variable NEXT_PUBLIC_STORE_ID is not set or has a invalid value';
  }

  const { loading } = useQuery(v2MarketPlaceGetStoreNfts, {
    variables: { store },
    onCompleted: (data) => {
      const storeData = data?.nfts;
      setNfts(storeData);
    },
  });

  return { nfts, loading, error };
};

export default useStoreNfts;
