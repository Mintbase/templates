import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';


export const v2MarketPlaceGetStoreNfts = gql`
  query v2MarketPlaceGetStoreNfts(
    $offset: Int = 0
    $condition: mb_views_nft_metadata_unburned_bool_exp
  ) @cached {
    mb_views_nft_metadata_unburned(
      where: $condition
      offset: $offset
      order_by: { minted_timestamp: desc }
    ) {
      createdAt: minted_timestamp
      listed: price
      media
      storeId: nft_contract_id
      thingId: metadata_id
      title
    }
    mb_views_nft_metadata_unburned_aggregate(where: $condition) {
      aggregate {
        count
      }
    }
  }
`;

export type StoreThing = {
  createdAt: string;
  listed: boolean;
  media: string;
  storeId: string;
  thingId: string;
  title: string;
};

const useStoreNfts = () => {
  const [things, setThings] = useState<StoreThing[]>([]);

  const stores = process.env.NEXT_PUBLIC_STORES;

  const { loading } = useQuery(v2MarketPlaceGetStoreNfts, {
    variables: { condition: { nft_contract_id: { _in: [stores] } } },
    onCompleted: (data) => {
      const storeData = data?.mb_views_nft_metadata_unburned;
      setThings(storeData);
    },
  });

  return { things, loading };
};

export default useStoreNfts;
