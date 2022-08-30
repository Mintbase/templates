import { useEffect, useState } from "react";

interface QueryOptions {
    skip?: boolean;
    variables?: {
        [key: string]: Object;
    };
}

export const useNearPrice = () => {
    const [price, setPrice] = useState<string>("0");

    useEffect(() => {
        let isCancelled = false;
        const nearPriceData = async () => {
            const req = await fetch(
                "https://api.binance.com/api/v3/ticker/price?symbol=NEARUSDT"
            );

            const res = await req.json();
            setPrice(res.price);
        };
        nearPriceData();

        return () => {
            isCancelled = true;
        };
    }, []);

    return { nearPrice: price };
};



export const mapQueryObj = (tokenData) => {
    let queryOptions: QueryOptions = { skip: true };

    if (tokenData) {
        const tokens = tokenData.mb_views_nft_tokens.map((token) => token.token_id);

        if (tokenData.mb_views_nft_tokens.length > 1) {
            queryOptions = {
                variables: { ids: tokens },
            };
        }
    }

    return { queryOptions };
};
