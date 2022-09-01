import { useLazyQuery, useQuery } from '@apollo/client';
import { useState } from 'react';
import {
  GET_METADATA_AND_STATS_FOR_REFERENCE,
  v2MarketPlaceGetToken,
  v2MarketPlaceGetTokenListings,
} from '../queries/marketplace.queries';
import { updateTokensData } from '../utils';
import { mapQueryObj, QueryOptions } from '../utils/BuyModal.utils';
import { ThingProps, TokenDataQuery } from '../types/types';

export type Thing = {
  metadataId: string;
  name: string;
};

const useTokenListData = ({
  metadataId,
}: ThingProps) => {
  const [listThing, setListThing] = useState<any>(null);
  const [getToken, { loading: tokenLoading, data: tokenData }] = useLazyQuery(v2MarketPlaceGetToken);

  const [getTokenListData, { data: tokenList, loading: tokenListLoading }] = useLazyQuery(
    v2MarketPlaceGetTokenListings,
  );

  let tokenQueryOptions: QueryOptions = {
    variables: {
      id: metadataId,
    },
    onCompleted: (data: TokenDataQuery) => {
      const { queryOptions } = mapQueryObj(data.tokenData);
      getTokenListData(queryOptions);
    },
  };

  if (!metadataId) {
    tokenQueryOptions = { skip: true };
  }

  const { loading: isMetaDataLoading } = useQuery(GET_METADATA_AND_STATS_FOR_REFERENCE, {
    variables: { metadataId },
    onCompleted: (data) => {
      setListThing(data);
      getToken(tokenQueryOptions);
    },
    onError: () => console.log('err'),
  });

  const {
    price, prices, amountAvailable, tokensTotal, tokenId,
  } = updateTokensData({
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
