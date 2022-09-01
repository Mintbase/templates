import {
  EState, MbAmountInput, MbButton, MbInfoCard, MbText,
} from 'mintbase-ui';
/*
Buy Modal Info:
The component that handles the NFT Buy Information
*/

import { useCallback, useState } from 'react';

import { MED_GAS } from '../../config/constants';
import { bigToNear, nearToYocto } from '../../lib/numbers';
import { useWallet } from '../../services/providers/WalletProvider';
import { TransactionEnum } from '../../types/types';
import { SignInButton } from '../SignInButton';

export function BuyModalInfo({ data }: BuyModalInfoProps) {
  // props inherited from the Buy Modal component

  const {
    amountAvailable, tokensTotal, nearPrice, prices, isTokenListLoading, price, tokenKey, marketId,
  } = data;

  const { wallet } = useWallet();

  // check if the market Address is equal to the marketId from the NFT Listing Query and if the amountAvailable of the NFT is higher than 0.

  const isAvailable = amountAvailable > 0 && wallet.constants.MARKET_ADDRESS === marketId;

  // state to check the price x amount according to user interaction

  const [currentPrice, setCurrentPrice] = useState(0);
  const [amount, setAmount] = useState(0);

  const singleBuy = useCallback(async () => {
    if (!tokenKey) return;

    await wallet?.makeOffer(tokenKey, nearToYocto(currentPrice.toString()), {
      callbackUrl: `${window.location.origin}/`,
      meta: JSON.stringify({
        type: TransactionEnum.MAKE_OFFER,
        args: {
          tokenId: tokenKey,
          price: nearToYocto(currentPrice.toString()),
        },
      }),

    });
  }, [currentPrice, tokenKey, wallet]);

  // const multiBuy = async () => {
  //   const nftPrice = nearToYocto(price.toString());
  //   const finalPrice = new Array(amount);

  //   finalPrice.fill(nftPrice);

  //   wallet?.batchMakeOffer(tokenKey, finalPrice, {
  //     gas: MED_GAS,
  //     callbackUrl: `${window.location.origin}/`,
  //     meta: JSON.stringify({
  //       type: TransactionEnum.MAKE_OFFER,
  //       args: {
  //         tokenId: tokenKey,
  //         price: nearToYocto(currentPrice.toString()),
  //       },
  //     }),
  //   });
  // };

  const multiBuy = useCallback(async () => {
    const nftPrice = nearToYocto(price.toString());
    const finalPrice = new Array(amount);

    finalPrice.fill(nftPrice);

    wallet?.batchMakeOffer(tokenKey, finalPrice, {
      gas: MED_GAS,
      callbackUrl: `${window.location.origin}/`,
      meta: JSON.stringify({
        type: TransactionEnum.MAKE_OFFER,
        args: {
          tokenId: tokenKey,
          price: nearToYocto(currentPrice.toString()),
        },
      }),
    });
  }, [amount, currentPrice, price, tokenKey, wallet]);

  // handler function to call the wallet methods to proceed the buy.
  const handleBuy = async () => {
    if (!isAvailable) return;
    const isSingleAmount = amount === 1;

    if (isSingleAmount) {
      await singleBuy();
    } else {
      await multiBuy();
    }
  };

  const setNewPrice = (val:string) => {
    setAmount(Number(val));

    const sum = prices
      .slice(0, val)
      .reduce((prev, curr) => (prev.price || prev) + curr.price);

    const totalVal = bigToNear(sum.price) * Number(val);

    setCurrentPrice(totalVal);
  };

  const message = isAvailable ? `${amountAvailable} of ${tokensTotal} Available` : 'NFT Not Available';
  return wallet.isConnected() && !isTokenListLoading ? (
    <div className="mt-2">
      <div className="bg-gray-50 py-4 text-center">
        <MbText className="p-med-90 text-gray-700">
          <span className="p-med-130 text-black">
            {message}
          </span>
        </MbText>
      </div>
      <div className="py-2">
        {isAvailable ? (
          <>
            <div className="mb-8">
              <MbInfoCard
                boxInfo={{
                  description: `${currentPrice.toFixed(2)} N`,
                  title: 'Price',
                  lowerLeftText: `~ ${(
                    Number(nearPrice) * Number(currentPrice)
                  ).toFixed(2)} USD`,
                }}
              />
              <div className="mt-4">
                <MbText className="text-gray-700 mb-2">Quantity</MbText>
                <MbAmountInput
                  maxAmount={Math.min(amountAvailable, 5)}
                  onValueChange={(e) => {
                    setNewPrice(e);
                  }}
                  disabled={amountAvailable === 1}
                />
              </div>
            </div>
            <div className="text-center">
              <MbButton
                label="Buy with NEAR"
                state={EState.ACTIVE}
                onClick={handleBuy}
              />
            </div>
          </>
        ) : null}

      </div>
    </div>
  ) : (
    <SignInButton />
  );
}
