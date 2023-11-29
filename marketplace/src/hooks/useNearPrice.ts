/*

useNearPrice Hook
Description: This hook calls nearPrice method from @mintbase-js/data to get the current price of NEAR in USD.

*/

import { nearPrice } from "@mintbase-js/data";
import { useEffect, useState } from "react";

const useNearPrice = (): string => {
  const [nearPriceData, setNearPriceData] = useState<string>("0");

  useEffect(() => {
    const getNearPrice = async () => {
      const { data: priceData, error } = await nearPrice();

      setNearPriceData(error ? "0" : priceData || "0");
    };

    getNearPrice();
  }, []);

  return nearPriceData;
};

export { useNearPrice };
