import { parseYactoToNear } from '../lib/numbers';
import { TokenListData } from '../types/types';

export const updateTokensData = ({
  data,
}: { data: any }):Partial<TokenListData> => {
  const listings = data?.listings[0];

  if (!listings || listings === null) {
    return {
      amountAvailable: 0,
      tokensTotal: 0,
      price: 0,
      tokenId: null,
    };
  }

  const { price } = listings;

  const prices = data?.listings.map((elm: { price: number; token: { id: string; }; }) => ({ price: elm.price, tokenId: elm.token.id }));

  return {
    amountAvailable: data.simpleSaleCount.aggregate.count,
    tokensTotal: data.tokenCount.aggregate.count,
    price: price ? parseYactoToNear(price) : 0,
    tokenId: listings.token.id,
    prices: prices.length > 0 ? prices : [],
    nftContractId: listings.token.nft_contract_id,
    marketId: listings.market_id,
  };
};

export const parseMedia = (media: string, baseUri: string) => {
  let mediaUrl = media?.indexOf('http') > -1 ? media : `${baseUri}/${media}`;

  if (!media) {
    mediaUrl = null;
  }

  return { mediaUrl };
};
