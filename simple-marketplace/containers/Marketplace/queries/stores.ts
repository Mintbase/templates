import { gql } from "@apollo/client";

export const GET_STORES = gql`
  query GetStores($ids: [nft_contracts_bool_exp!]) {
    store: nft_contracts(where: {_or: 
      $ids
    }) {
      id
      name
    }
  }
`;

export const GET_MB_STORE_THINGS = gql`
  query GetStoreThings($storeIds: [mb_views_store_things_bool_exp!]) {
    mb_views_store_things(
      where: {_or: 
        $storeIds
      }, 
      order_by: {createdAt: desc}
    ) {
      createdAt
      listed
      media
      storeId
      thingId
      title
    }
  }
`;