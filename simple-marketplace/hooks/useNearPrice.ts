/*

useNearPrice Hook
Description:  This hook fetchs the current nearPrice from BINANCE Api.

*/

import { useEffect, useState } from 'react';
import { BINANCE_API } from '../config/constants';

export const useNearPrice = () => {
  const [price, setPrice] = useState<string>('0');

  useEffect(() => {
    const nearPriceData = async () => {
      const req = await fetch(
        BINANCE_API,
      );

      const res = await req.json();
      setPrice(res.price);
    };
    nearPriceData();
  }, []);

  return { nearPrice: price };
};
