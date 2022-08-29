import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';


export const v2MarketPlaceGetStoreThings = gql`
  query v2_omnisite_getStoreThings(
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

const useStoreThingsController = () => {
  const [things, setThings] = useState<StoreThing[]>([]);

  const store = process.env.NEXT_PUBLIC_STORE_ID;

  const { loading } = useQuery(v2MarketPlaceGetStoreThings, {
    variables: { condition: { nft_contract_id: { _in: [store] } } },
    onCompleted: (data) => {
      const storeData = data?.mb_views_nft_metadata_unburned;
      setThings(storeData);
    },
  });

  return { things, loading };
};

export default useStoreThingsController;
