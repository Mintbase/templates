import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';

const GET_STORES = gql`
  query StoresQuery($ids: [stores_bool_exp!]) {
    store(where: { _or: $ids }) {
      id
      name
    }
  }
`;

export type Store = {
  id: string
  name: string
};

const useStoreController = () => {
  const [stores, setStores] = useState<Store[]>([]);

  const selectedStores = process.env.NEXT_PUBLIC_STORE_ID
    || 'mufasa.mintspace2.testnet,nearcon2sponsorships.mintspace2.testnet,calvinttest.mintspace2.testnet';
  const ids: { id: { _eq: string } }[] = [];
  const storesArray = selectedStores?.split(',');

  storesArray?.forEach((id) => {
    ids.push({
      id: { _eq: id },
    });
  });

  const { loading } = useQuery(GET_STORES, {
    variables: {
      ids,
    },
    onCompleted: (data) => {
      const storesData = data?.store;

      setStores(storesData);
    },
  });

  return { stores, loading };
};

export default useStoreController;
