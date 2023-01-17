/*

useMetadataByMetadataId Hook
Description: This hook calls metadataByMetadataById method from @mintbase-js/data to get the information of the current NFT opened on the BuyModal.

*/

import { metadataByMetadataId } from '@mintbase-js/data';
import { MetadataByMetadataIdQueryResult } from '@mintbase-js/data/lib/api/metadataByMetadataId/metadataByMetadataId.types';
import { useEffect, useState } from 'react';
import { parseYactoToNear } from '../lib/numbers';
import { SelectedNft, TokenListData } from '../types/types';

const useMetadataByMetadataId = ({ metadataId }: SelectedNft): Partial<TokenListData> => {
  const [data, setData] = useState<MetadataByMetadataIdQueryResult>(null);

  useEffect(() => {
    // gets store nfts from mintbase-js/data package
    const getMetadata = async () => {
      const metadata = await metadataByMetadataId(metadataId);

      setData(metadata.data);
    };

    getMetadata();
  }, []);

  const firstListing = data?.listings[0];

  if (!firstListing || firstListing === null) {
    return {
      amountAvailable: 0,
      tokensTotal: 0,
      price: 0,
      tokenId: null,
    };
  }

  const { price } = firstListing;

  const prices = data?.listings.map((elm) => ({
    price: elm.price,
    tokenId: elm.token.token_id,
  }));

  return {
    amountAvailable: data?.simpleSaleCount.aggregate.count,
    tokensTotal: data?.tokenCount.aggregate.count,
    price: price ? parseYactoToNear(price) : 0,
    tokenId: firstListing.token.token_id,
    prices: prices.length > 0 ? prices : [],
    nftContractId: firstListing.token.nft_contract_id,
    marketId: firstListing.market_id,
    isTokenListLoading: false,
  };
};

export { useMetadataByMetadataId };
