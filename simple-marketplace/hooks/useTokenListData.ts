import { useLazyQuery, useQuery } from '@apollo/client';
import { useState } from 'react';
import {
  GET_METADATA_AND_STATS_FOR_REFERENCE,
  v2MarketPlaceGetToken,
  v2MarketPlaceGetTokenListings,
} from '../queries/marketplace.queries';
import { updateThingData } from '../utils';
import { mapQueryObj, QueryOptions } from '../utils/BuyModal.utils';
import { HasuraThing, ListThing, ThingProps } from '../types/types';

export type Thing = {
  id: string;
  name: string;
};

const useTokenListData = ({
  id,
}: ThingProps) => {
  const [listThing, setListThing] = useState<any>(null);

  let tokenQueryOptions: QueryOptions = {
    variables: {
      id,
    }, onCompleted: (tokenData) => {
      const { queryOptions } = mapQueryObj(tokenData);
      getTokenListData(queryOptions);
    },
  };

  if (!id) {
    tokenQueryOptions = { skip: true }
  }


  const [getToken, { error: thingError, loading: tokenLoading, data: tokenData }] = useLazyQuery(v2MarketPlaceGetToken);

  const [getTokenListData, { data: tokenList, loading: tokenListLoading }] = useLazyQuery(
    v2MarketPlaceGetTokenListings,
  );

  const { loading: isMetaDataLoading } = useQuery(GET_METADATA_AND_STATS_FOR_REFERENCE, {
    variables: { metadataId: id },
    onCompleted: (data) => {
      setListThing(data);
      getToken(tokenQueryOptions);
    },
    onError: () => console.log('err'),
  });

  const {
    price, prices, amountAvailable, tokensTotal, tokenId,
  } = updateThingData({
    data: listThing,
  });


  const isDataLoading = [isMetaDataLoading, tokenLoading, tokenListLoading];

  const isTokenListLoading = isDataLoading.includes(true);

  return {
    price,
    prices,
    amountAvailable,
    tokensTotal,
    tokenId,
    tokenList,
    tokenData,
    isTokenListLoading,
  };
};

export { useTokenListData };
