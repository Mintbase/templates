import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { parseYactoToNear } from "../../../lib/numbers";
import { HasuraThing, ListThing, ThingProps } from "../utils/types";

export const GET_THING = gql`
  query getToken($id: String!) @cached {
    thing(
      where: { id: { _eq: $id } }
    ) {
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
`

export const GET_TOKEN_LIST = gql`
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
`

export const GET_COMBINED_THING_DATA = gql`
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
`

export type Thing = {
  id: string;
  name: string;
};

const useThingController = (id: string) => {
  const [thing, setThing] = useState<Thing>();

  const { loading } = useQuery(GET_THING, {
    variables: {
      id
    },
    onCompleted: (data) => {
      const _thing = data?.thing;

      setThing(_thing);
    }
  });

  return { thing, loading };
};

const useListThingController = ({ id, price, tokensTotal, tokensCounter }: ThingProps) => {
  const [listThing, setListThing] = useState<ListThing>(null);

  const [fetchCombinedThingData, { loading: isThingFetching }] = useLazyQuery(
    GET_COMBINED_THING_DATA,
    { variables: { thingId: id } }
  )

  // Combined graphql query
  useEffect(() => {
    updateThingData()
  }, [id])

  const updateThingData = async () => {
    const { data }: { data: HasuraThing } =
      await fetchCombinedThingData()

    if (!data) return
    // list data
    const [list] = data.list

    const mTokensListedSaleCounter = data.simpleSaleCount.aggregate.count
    const mTokensListedAuctionCounter = data.rollingAuctionCount.aggregate.count
    const mTokensTotal = data.tokens_aggregate.aggregate.count
    const mPrice = list ? parseYactoToNear(list.price) : '0'

    setListThing({
      tokensListedSaleCounter: tokensCounter ?? mTokensListedSaleCounter,
      tokensListedAuctionCounter: mTokensListedAuctionCounter ?? 0,
      tokensTotal: tokensTotal ?? mTokensTotal,
      price: price ?? mPrice.toString(),
      tokenId: list?.token?.id,
    })
  }

  

  return {
    listThing,
    isThingFetching
  }
}

export { useThingController, useListThingController };
