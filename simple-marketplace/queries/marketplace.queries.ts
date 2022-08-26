import { gql } from '@apollo/client';

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
      tokens(limit: 1) {
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
