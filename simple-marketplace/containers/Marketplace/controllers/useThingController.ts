import { useQuery } from '@apollo/client';
import { useState } from 'react';
import {
  GET_COMBINED_THING_DATA,
  GET_METADATA_AND_STATS_FOR_REFERENCE,
  GET_THING,
  v2MarketPlaceGetToken,
} from '../../../queries/marketplace.queries';
import { updateThingData } from '../../../utils';
import { HasuraThing, ListThing, ThingProps } from '../utils/types';

export type Thing = {
  id: string;
  name: string;
};

const useListThingController = ({
  id,
}: ThingProps) => {
  const [listThing, setListThing] = useState<any>(null);

  const { loading: isThingFetching } = useQuery(GET_METADATA_AND_STATS_FOR_REFERENCE, {
    variables: { metadataId: id },
    onCompleted: (data) => {
      console.log('thinData', data);

      setListThing(data);
    },
    onError: () => console.log('err'),
  });

  console.log(listThing, 'listThing');

  const {
    price, amountAvailable, tokensTotal, tokenId,
  } = updateThingData({
    data: listThing,
  });

  return {
    price,
    amountAvailable,
    tokensTotal,
    tokenId,
    isThingFetching,
  };
};

export { useListThingController };
