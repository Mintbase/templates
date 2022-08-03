import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_STORES = gql`
  query StoresQuery($ids: [stores_bool_exp!]) {
    store(where: {_or: 
      $ids
    }) {
      id
      name
    }
  }
`;

export type Store = {
  id: string;
  name: string;
};

const useStoreController = () => {
  const [stores, setStores] = useState<Store[]>([]);

  const _stores = process.env.NEXT_PUBLIC_STORES || 'mufasa.mintspace2.testnet,nearcon2sponsorships.mintspace2.testnet,calvinttest.mintspace2.testnet'
  let ids: { id: { _eq: string; }; }[] = [];
  let _arr = _stores?.split(',')

  _arr?.forEach((id) => {
    ids.push({
      id: {_eq: id}
    })
  })

  const { loading } = useQuery(GET_STORES, {
    variables: {
      ids
    },
    onCompleted: (data) => {
      const _stores = data?.store;

      setStores(_stores);
    }
  });

  return { stores, loading };
};

export default useStoreController;
