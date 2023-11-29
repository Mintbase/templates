// @ts-ignore
import Big from "big.js";

import { utils } from "near-api-js";

export const bigToNear = (value = "0", to = 2) =>
  Big(value)
    .div(10 ** 24)
    .toFixed(to === 0 ? undefined : to);

export const parseYactoToNear = (price: number) => price / 1e24;

export const parseSciToString = (price: number) =>
  price.toLocaleString("en-US").replace(/,/g, "");

export const nearToYocto = (balance?: string | undefined) =>
  utils.format.parseNearAmount(balance);

export const yoctoToNear = (balance: string, fracDigits?: number) => {
  const { formatNearAmount } = utils.format;
  const converted = formatNearAmount(balance, fracDigits);
  return converted;
};
