/*

useTokenListData Hook
Description:  This hook do a series of 3 query calls to get the information of the current NFT opened on the BuyModal.

*/

import { useLazyQuery, useQuery } from '@apollo/client';
import { useState } from 'react';
import {
  v2MarketPlaceGetMetadata,
  v2MarketPlaceGetToken,
  v2MarketPlaceGetTokenListings,
} from '../queries/marketplace.queries';
import { updateTokensData } from '../utils';
import { mapQueryObj, QueryOptions } from '../utils/BuyModal.utils';
import { SelectedNft, TokenDataQuery, TokenListData } from '../types/types';

const useTokenListData = ({ metadataId }: SelectedNft): TokenListData => {
  const [listData, setTokenListData] = useState<any>(null);
  const [getToken, { loading: tokenLoading, data: tokenData }] = useLazyQuery(
    v2MarketPlaceGetToken,
  );

  const [getTokenListData, { data: tokenList, loading: tokenListLoading }] = useLazyQuery(v2MarketPlaceGetTokenListings);

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

  const { loading: isMetaDataLoading } = useQuery(v2MarketPlaceGetMetadata, {
    variables: { metadataId },
    onCompleted: (data) => {
      setTokenListData(data);
      getToken(tokenQueryOptions);
    },
    onError: () => console.log('err'),
  });

  const {
    price,
    prices,
    amountAvailable,
    tokensTotal,
    tokenId,
    nftContractId,
    tokenKey,
    marketId,
  } = updateTokensData({
    data: listData,
  });

  const isDataLoading = [isMetaDataLoading, tokenLoading, tokenListLoading];

  const isTokenListLoading = isDataLoading.includes(true);

  return {
    price,
    prices,
    amountAvailable,
    tokensTotal,
    tokenId,
    tokenKey,
    tokenList,
    nftContractId,
    tokenData,
    marketId,
    isTokenListLoading,
  };
};

export { useTokenListData };
