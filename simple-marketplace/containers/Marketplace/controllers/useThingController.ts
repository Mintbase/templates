import { useQuery, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { parseYactoToNear } from "../../../lib/numbers";
import { HasuraThing, ListThing, ThingProps } from "../utils/types";
import { GET_THING, GET_COMBINED_THING_DATA } from '../queries/thing';

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
