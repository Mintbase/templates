import { ThingData } from '../containers/Marketplace/utils/types';
import { parseYactoToNear } from '../lib/numbers';

export const updateThingData = ({
  data,
  tokensCounter,
  tokensTotal,
  price,
}: ThingData) => {
  const [list] = data.list;

  const mTokensListedSaleCounter = data.simpleSaleCount.aggregate.count;
  const mTokensListedAuctionCounter = data.rollingAuctionCount.aggregate.count;
  const mTokensTotal = data.tokens_aggregate.aggregate.count;
  const mPrice = list ? parseYactoToNear(list.price) : '0';

  return {
    tokensListedSaleCounter: tokensCounter ?? mTokensListedSaleCounter,
    tokensListedAuctionCounter: mTokensListedAuctionCounter ?? 0,
    tokensTotal: tokensTotal ?? mTokensTotal,
    price: price ?? mPrice.toString(),
    tokenId: list?.token?.id,
  };
};
