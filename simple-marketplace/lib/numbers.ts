import Big from 'big.js'
import math from 'mathjs'

import { utils } from 'near-api-js'

export const bigToNear = (value = '0', to = 2) =>
  Big(value)
    .div(10 ** 24)
    .toFixed(to === 0 ? undefined : to)

export const parseYactoToNear = (price: number) => {
  return price / 1e24
}

export const parseSciToString = (price: number) => {
  return price.toLocaleString('en-US').replace(/,/g, '')
}

export const nearToYocto = (balance?: string | undefined) => {
  return utils.format.parseNearAmount(balance)
}

export const yoctoToNear = (balance: string, fracDigits?: number) => {
  const { formatNearAmount } = utils.format
  const converted = formatNearAmount(balance, fracDigits)
  return converted
}
