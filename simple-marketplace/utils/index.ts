import { parseYactoToNear } from '../lib/numbers';

export const updateThingData = ({
    data,

}) => {

    if (!data) {
        return {
            amountAvailable: 0,
            tokensTotal: 0,
            price: '0',
            tokenId: null,
        };

    } console.log('data aa', data);

    const { price, tokenId } = data.listings[0];

    // const mTokensListedSaleCounter = data.simpleSaleCount.aggregate.count;
    // const mTokensListedAuctionCounter = data.rollingAuctionCount.aggregate.count;
    // const mTokensTotal = data.tokenCount.aggregate.count;
    // const mPrice = ;

    // const price = listThing?.price;
    // const amountAvailable = listThing?.tokensListedSaleCounter;
    // const tokensTotal = data.tokenCount.aggregate.count;
    // const tokenId = listThing?.tokenId;

    return {
        amountAvailable: data.simpleSaleCount.aggregate.count,
        tokensTotal: data.tokenCount.aggregate.count,
        price: price ? parseYactoToNear(price) : '0',
        tokenId,
    };
};
