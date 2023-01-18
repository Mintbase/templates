/*

useMetadataByMetadataId Hook
Description: This hook calls metadataByMetadataById method from @mintbase-js/data to get the information of the current NFT opened on the BuyModal.

*/

import { metadataByMetadataId } from '@mintbase-js/data';
import { useQuery } from 'react-query';
import { parseYactoToNear } from '../lib/numbers';
import { SelectedNft, TokenListData } from '../types/types';

const useMetadataByMetadataId = ({
  metadataId,
}: SelectedNft): Partial<TokenListData> => {
  const {
    isLoading,
    data: metadata,
  } = useQuery('metadataByMetadataId', () => metadataByMetadataId(metadataId), {
    retry: false,
    staleTime: Infinity,
  });

  const firstListing = metadata?.data?.listings[0];

  if (!firstListing || firstListing === null) {
    return {
      amountAvailable: 0,
      tokensTotal: 0,
      price: 0,
      tokenId: null,
    };
  }

  const { price } = firstListing;

  const prices = metadata?.data?.listings.map((elm) => ({
    price: elm.price,
    tokenId: elm.token.token_id,
  }));

  return {
    amountAvailable: metadata?.data?.simpleSaleCount.aggregate.count,
    tokensTotal: metadata?.data?.tokenCount.aggregate.count,
    price: price ? parseYactoToNear(price) : 0,
    tokenId: firstListing.token.token_id,
    prices: prices.length > 0 ? prices : [],
    nftContractId: firstListing.token.nft_contract_id,
    marketId: firstListing.market_id,
    isTokenListLoading: isLoading,
  };
};

export { useMetadataByMetadataId };
