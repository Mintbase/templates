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


    return {
        amountAvailable: data.simpleSaleCount.aggregate.count,
        tokensTotal: data.tokenCount.aggregate.count,
        price: price ? parseYactoToNear(price) : '0',
        tokenId,
    };
};
