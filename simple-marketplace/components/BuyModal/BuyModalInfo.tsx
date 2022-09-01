import {
  EState, MbAmountInput, MbButton, MbInfoCard, MbText,
} from 'mintbase-ui';
import { useState } from 'react';

import { MED_GAS } from '../../config/constants';
import { bigToNear, nearToYocto } from '../../lib/numbers';
import { useWallet } from '../../services/providers/WalletProvider';
import { TransactionEnum } from '../../types/types';
import { SignInButton } from '../SignInButton';

export function BuyModalInfo({ data }: BuyModalInfoProps) {
  const {
    amountAvailable, tokensTotal, tokenList, nearPrice, prices, metadataId, tokenId, isTokenListLoading, price,
  } = data;
  const { wallet } = useWallet();

  const isAvailable = amountAvailable > 0;

  const [currentPrice, setCurrentPrice] = useState(0);
  const [amount, setAmount] = useState(0);

  const handleBuy = async () => {
    if (amountAvailable < 1) return;
    console.log(amount, tokenId, 'amount');

    if (amount === 1) {
      if (!tokenId) return;

      await wallet?.makeOffer(tokenId, nearToYocto(currentPrice.toString()), {
        callbackUrl: `${window.location.origin}/`,
        meta: JSON.stringify({
          type: TransactionEnum.MAKE_OFFER,
          args: {
            metadataId,
            price: nearToYocto(currentPrice.toString()),
          },
        }),
      });
    } else {
      const auxTokens = tokenList.list.slice(0, amount);

      const nftPrice = nearToYocto(price.toString());
      const finalPrice = new Array(amount);

      finalPrice.fill(nftPrice);

      wallet?.batchMakeOffer(auxTokens, finalPrice, {
        gas: MED_GAS,
        callbackUrl: `${window.location.origin}/`,
        meta: JSON.stringify({
          type: TransactionEnum.MAKE_OFFER,
          args: {
            metadataId,
            price: nearToYocto(currentPrice.toString()),
          },
        }),
      });
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
