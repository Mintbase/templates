/*

useMetadataByMetadataId Hook
Description: This hook calls metadataByMetadataById method from @mintbase-js/data to get the information of the current NFT opened on the BuyModal.

*/

import { metadataByMetadataId, ParsedDataReturn } from "@mintbase-js/data";
import { MetadataByMetadataIdQueryResult } from "@mintbase-js/data/lib/api/metadataByMetadataId/metadataByMetadataId.types";
import { useQuery } from "react-query";
import { SelectedNft, TokenListData } from "../types/types";
import { parseYactoToNear } from "@/utils/numbers";
import { Network } from "@mintbase-js/sdk";

const mapMetadata = (
  metadata: ParsedDataReturn<MetadataByMetadataIdQueryResult>
): Partial<TokenListData> => {
  const firstListing = metadata?.data?.listings[0];

  if (!firstListing || firstListing === null) {
    return {
      amountAvailable: 0,
      tokensTotal: 0,
      price: 0,
      tokenId: undefined,
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
    prices: !!prices?.length ? prices : [],
    nftContractId: firstListing.token.nft_contract_id,
    marketId: firstListing.market_id,
  };
};

const useMetadataByMetadataId = ({
  metadataId,
}: SelectedNft): Partial<TokenListData> => {
  const { isLoading, data: metadata } = useQuery(
    "metadataByMetadataId",
    () =>
      metadataByMetadataId(
        metadataId,
        (process?.env?.NEXT_PUBLIC_NETWORK as Network) || "testnet"
      ),
    {
      retry: false,
      refetchOnWindowFocus: false,
      select: mapMetadata,
    }
  );

  return { ...metadata, isTokenListLoading: isLoading };
};

export { useMetadataByMetadataId };
