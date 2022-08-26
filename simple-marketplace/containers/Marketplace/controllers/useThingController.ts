import { useQuery } from '@apollo/client';
import { useState } from 'react';
import {
  GET_COMBINED_THING_DATA,
  GET_THING,
} from '../../../queries/marketplace.queries';
import { updateThingData } from '../../../utils';
import { HasuraThing, ListThing, ThingProps } from '../utils/types';

export type Thing = {
  id: string;
  name: string;
};

const useThingController = (id: string) => {
  const [thing, setThing] = useState<Thing>();

  const { loading } = useQuery(GET_THING, {
    variables: {
      id,
    },
    onCompleted: (data) => {
      const thingData = data?.thing;

      setThing(thingData);
    },
  });

  return { thing, loading };
};

const useListThingController = ({
  id,
  price,
  tokensTotal,
  tokensCounter,
}: ThingProps) => {
  const [listThing, setListThing] = useState<ListThing>(null);

  const { loading: isThingFetching } = useQuery(GET_COMBINED_THING_DATA, {
    variables: { thingId: id },
    onCompleted: (data: HasuraThing) => {
      const thingData = updateThingData({
        data,
        price,
        tokensTotal,
        tokensCounter,
      });
      setListThing(thingData);
    },
    onError: () => console.log('err'),
  });

  return {
    listThing,
    isThingFetching,
  };
};

export { useThingController, useListThingController };
