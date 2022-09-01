import { parseYactoToNear } from '../lib/numbers';

export const updateTokensData = ({
  data,
}) => {
  const listings = data?.listings[0];

  if (!listings || listings === null) {
    return {
      amountAvailable: 0,
      tokensTotal: 0,
      price: '0',
      tokenId: null,
    };
  }

  const { price } = listings;

  const prices = data?.listings.map((elm: { price: any; token: { id: any; }; }) => ({ price: elm.price, tokenId: elm.token.id }));

  console.log(listings, 'prices');

  return {
    amountAvailable: data.simpleSaleCount.aggregate.count,
    tokensTotal: data.tokenCount.aggregate.count,
    price: price ? parseYactoToNear(price) : '0',
    tokenId: listings.token.id,
    prices: prices.length > 0 ? prices : [],
    tokenKey: `${listings.token.id}:${listings.token.nft_contract_id}`,
    marketId: listings.market_id,
  };
};
