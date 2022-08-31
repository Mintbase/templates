import { useEffect, useState } from "react";
import { BINANCE_API } from "../config/constants";

export const useNearPrice = () => {
    const [price, setPrice] = useState<string>("0");

    useEffect(() => {
        let isCancelled = false;
        const nearPriceData = async () => {
            const req = await fetch(
                BINANCE_API
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