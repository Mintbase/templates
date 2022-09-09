import { gql } from '@apollo/client';

export const v2MarketPlaceGetStoreNfts = gql`
  query v2MarketPlaceGetStoreNfts(
    $offset: Int = 0
    $store: String!
  ) @cached {
    nfts: mb_views_nft_metadata_unburned(
      where: {nft_contract_id: {_eq: $store}}
      offset: $offset
      order_by: { minted_timestamp: desc }
    ) {
      createdAt: minted_timestamp
      listed: price
      media
      storeId: nft_contract_id
      metadataId: metadata_id
      title
      base_uri
    }
  }
`;
