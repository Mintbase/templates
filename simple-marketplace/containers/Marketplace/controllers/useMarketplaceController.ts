import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_MB_STORE_THINGS } from '../queries/stores';

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

  const stores = process.env.NEXT_PUBLIC_STORES || ''
  let storeIds: { storeId: { _eq: string; }; }[] = [];
  let _arr = stores?.split(',')

  _arr?.forEach((id) => {
    storeIds.push({
      storeId: {_eq: id}
    })
  })

  const { loading } = useQuery(GET_MB_STORE_THINGS, {
    variables: {
      storeIds
    },
    onCompleted: (data) => {
      const _things = data?.mb_views_store_things;

      setThings(_things);
    },
  })

  return { things, loading };
};

export default useStoreThingsController;
