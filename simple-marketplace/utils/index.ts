import { parseYactoToNear } from '../lib/numbers';

export const updateThingData = ({
    data,
}) => {

    const listings = data?.listings[0]

    if (!listings || listings === null) {
        return {
            amountAvailable: 0,
            tokensTotal: 0,
            price: '0',
            tokenId: null,
        };

    }

    const { price, tokenId } = listings;

    const prices = data?.listings.map((elm: { price: any; token: { id: any; }; }) => {
        return { price: elm.price, tokenId: elm.token.id }
    })

    console.log(prices, 'prices')


    return {
        amountAvailable: data.simpleSaleCount.aggregate.count,
        tokensTotal: data.tokenCount.aggregate.count,
        price: price ? parseYactoToNear(price) : '0',
        tokenId,
        prices: prices.length > 0 ? prices : []
    };
};
