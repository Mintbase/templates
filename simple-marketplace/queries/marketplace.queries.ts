import { gql } from '@apollo/client';
import {
  METADATA_FRAGMENT, MINTERS_FRAGMENT, ROLLING_AUCTION_COUNT_FRAGMENT, TOKEN_COUNT_FRAGMENT, LISTINGS_FRAGMENT, SIMPLE_SALE_COUNT_FRAGMENT,
} from './fragments';

export const v2MarketPlaceGetToken = gql`
query v2MarketPlaceGetToken($id: String) {
 tokenData: mb_views_nft_tokens(where: {metadata_id: {_eq: $id}}) {
    media
    title
    metadata_id
    nft_contract_id
    token_id
    listings {
      price
      token_id
    }
    listings_aggregate {
      aggregate {
        count
      }
    }
  }
} 
`;

export const v2MarketPlaceGetTokenListings = gql`
  query v2MarketPlaceGetTokenListings($ids: [String!]) {
    list: mb_views_active_listings(where: { token_id: { _in: $ids } }) {
      price
      token {
        id: token_id
      }
    }
  }
`;

export const v2MarketPlaceGetMetadata = gql`
  query v2MarketPlaceGetMetadata(
    $metadataId: String!
  ) {
    ${METADATA_FRAGMENT}
    ${TOKEN_COUNT_FRAGMENT}
    ${MINTERS_FRAGMENT}
    ${ROLLING_AUCTION_COUNT_FRAGMENT}
    ${LISTINGS_FRAGMENT}
    ${SIMPLE_SALE_COUNT_FRAGMENT}
    }
`;

export const v2MarketPlaceGetStoreData = gql`
  query v2MarketPlaceGetStoreData($id: [String!]) @cached {
    store: nft_contracts(where: { id: { _in: $id } }) {
      id
      name
    }
  }
`;

export const v2MarketPlaceGetStoreNfts = gql`
  query v2MarketPlaceGetStoreNfts(
    $offset: Int = 0
    $condition: mb_views_nft_metadata_unburned_bool_exp
  ) @cached {
    mb_views_nft_metadata_unburned(
      where: $condition
      offset: $offset
      order_by: { minted_timestamp: desc }
      limit: 10
    ) {
      createdAt: minted_timestamp
      listed: price
      media
      storeId: nft_contract_id
      metadataId: metadata_id
      title
      base_uri
    }
    mb_views_nft_metadata_unburned_aggregate(where: $condition) {
      aggregate {
        count
      }
    }
  }
`;
