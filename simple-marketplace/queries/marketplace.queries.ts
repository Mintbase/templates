import { gql } from '@apollo/client';

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

const GET_THING = gql`
  query getToken($id: String!) @cached {
    thing(where: { id: { _eq: $id } }) {
      id
      metaId
      metadata {
        media
        title
      }
      tokens {
        id
        list {
          price
        }
        lists_aggregate {
          aggregate {
            count
          }
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

const GET_TOKEN_LIST = gql`
  query getTokenList($ids: [String!]) {
    list(
      where: { token: { id: { _in: $ids } }, removedAt: { _is_null: true } }
    ) {
      price
      token {
        id
      }
    }
  }
`;

export const METADATA_FRAGMENT = `
  metadata: nft_metadata(
    where: {
      id: { _eq: $metadataId }
    }
  ) {
    contract: nft_contracts {
      id
      baseUri: base_uri
    }
    title
    description
    media
    document: reference_blob(path: "$.document")
    animationUrl: reference_blob(path: "$.animation_url")
    extra: reference_blob(path: "$.extra")
    # TODO: Get the rest of these and remove the need to download bytes from reference services
  }
`;

export const MINTERS_FRAGMENT = `
  minters: nft_tokens(
    distinct_on: minter
    where: {
      burned_timestamp: { _is_null: true },
      metadata_id: {_eq: $metadataId }
    }
  ) {
    account: minter
  }
`;

export const TOKEN_COUNT_FRAGMENT = `
  tokenCount: nft_tokens_aggregate(
    where: {
      metadata_id: {_eq: $metadataId }
    }
  ) {
    aggregate {
      count
    }
  }
`;

export const GET_METADATA_AND_STATS_FOR_REFERENCE = gql`
  query v2_omnisite_GetMetadataAndStatsForReference(
    $metadataId: String!
  ) {
    ${METADATA_FRAGMENT}
    ${TOKEN_COUNT_FRAGMENT}
    ${MINTERS_FRAGMENT}

    listings: mb_views_active_listings (
      where: {
        metadata_id: {_eq: $metadataId }
      }
      limit: 1,
      order_by: { price: desc }
    ) {
      kind
      price
      token {
        id: token_id
        minter
        ownerId: owner
        splits
        royalties
      }
    }

    simpleSaleCount: mb_views_active_listings_aggregate (
      where: {
        metadata_id: {_eq: $metadataId }
        kind: { _eq: "simple" }
      }
    ) {
      aggregate {
        count
      }
    }

    rollingAuctionCount: mb_views_active_listings_aggregate (
      where: {
        metadata_id: {_eq: $metadataId }
        kind: { _eq: "auction" }
      }
    ) {
      aggregate {
        count
      }
    }

    owners: nft_tokens(
      where: {
        metadata_id: {_eq: $metadataId },
      }
      distinct_on: owner
    ) {
      owner
    }
  }
`;

const GET_COMBINED_THING_DATA = gql`
  query CombinedThingData($thingId: String!) @cached(ttl: 120) {
    # Metadata
    metadata: thing(where: { id: { _eq: $thingId } }) {
      store {
        id
        name
        baseUri
      }
      metadata {
        animation_url
        document
        animation_type
        description
        id
        media
        media_size
        media_type
        title
        type
        youtube_url
        extra
      }
      tokens(limit: 1 ) {
        minter
      }
    }
    # Lowest price listings / token data
    list(
      where: {
        _and: [
          { thingId: { _eq: $thingId } }
          { autotransfer: { _eq: true } }
          { removedAt: { _is_null: true } }
        ]
      }
      limit: 1
      order_by: { price: asc }
    ) {
      id
      autotransfer
      price
      token {
        id
        minter
        ownerId
      }
    }

    tokens_aggregate(
      where: { thingId: { _eq: $thingId }, burnedAt: { _is_null: true } }
    ) {
      aggregate {
        count
      }
    }

    simpleSaleCount: lists_aggregate(
      where: {
        removedAt: { _is_null: true }
        token: { thingId: { _eq: $thingId }, burnedAt: { _is_null: true } }
        autotransfer: { _eq: true }
      }
      distinct_on: tokenKey
    ) {
      aggregate {
        count
      }
    }

    rollingAuctionCount: lists_aggregate(
      where: {
        removedAt: { _is_null: true }
        token: { thingId: { _eq: $thingId }, burnedAt: { _is_null: true } }
        autotransfer: { _eq: false }
      }
      distinct_on: tokenKey
    ) {
      aggregate {
        count
      }
    }
  }
`;

export { GET_THING, GET_TOKEN_LIST, GET_COMBINED_THING_DATA };
