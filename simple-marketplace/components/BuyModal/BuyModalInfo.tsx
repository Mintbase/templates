import { Wallet } from 'mintbase';
import {
  EState, MbAmountInput, MbButton, MbInfoCard, MbText,
} from 'mintbase-ui';

/*
Buy Modal Info:
The component that handles the NFT Buy Information
*/

import { useCallback, useState } from 'react';

import { DEFAULT_MARKET_ADDRESS, MED_GAS } from '../../config/constants';
import { useNearPrice } from '../../hooks/useNearPrice';
import { nearToYocto } from '../../lib/numbers';
import { useWallet } from '../../services/providers/WalletProvider';
import {
  BuyModalData, TokenListData, TransactionEnum,
} from '../../types/types';
import { SignInButton } from '../SignInButton';

function AvailableNftComponent({ data, wallet }:{ data: TokenListData, wallet:Wallet }): JSX.Element {
  const {
    amountAvailable, tokensTotal, isTokenListLoading, price, tokenKey,
  } = data;

  const { nearPrice } = useNearPrice();

  const message = `${amountAvailable} of ${tokensTotal} Available`;
  // state to check the price x amount according to user interaction

  const [currentPrice, setCurrentPrice] = useState(price);
  const [amount, setAmount] = useState(1);

  const singleBuy = useCallback(async () => {
    if (!tokenKey) return;

    await wallet?.makeOffer(tokenKey, nearToYocto(currentPrice.toString()), {
      callbackUrl: `${window.location.origin}/wallet-callback`,
      meta: JSON.stringify({
        type: TransactionEnum.MAKE_OFFER,
        args: {
          tokenId: tokenKey,
          price: nearToYocto(currentPrice.toString()),
        },
      }),

    });
  }, [currentPrice, tokenKey, wallet]);

  const multiBuy = useCallback(async () => {
    const nftPrice = nearToYocto(price.toString());
    const finalPrice = new Array(amount);

    finalPrice.fill(nftPrice);

    wallet?.batchMakeOffer([tokenKey], finalPrice, {
      gas: MED_GAS,
      callbackUrl: `${window.location.origin}/wallet-callback`,
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
    const isSingleAmount = amount === 1;

    if (isSingleAmount) {
      await singleBuy();
    } else {
      await multiBuy();
    }
  };

  const setNewPrice = (val:string) => {
    const value = Number(val);

    setAmount(value);
    setCurrentPrice(price * value);
  };

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

      </div>
    </div>
  ) : (
    <SignInButton />
  );
}

export function BuyModalInfo({ data }: BuyModalData): JSX.Element {
  // props inherited from the Buy Modal component

  const {
    amountAvailable, marketId,
  } = data;

  const { wallet } = useWallet();

  // check if the market Address is equal to the marketId from the NFT Listing Query and if the amountAvailable of the NFT is higher than 0.

  const marketAddress = wallet.constants.MARKET_ADDRESS || DEFAULT_MARKET_ADDRESS;
  const isAvailable = amountAvailable > 0 && marketAddress === marketId;

  if (!isAvailable) {
    return (
      <div className="mt-2">
        <div className="bg-gray-50 py-4 text-center">
          <MbText className="p-med-90 text-gray-700">
            <span className="p-med-130 text-black">
              NFT Not Available
            </span>
          </MbText>
        </div>
      </div>
    );
  }

  return <AvailableNftComponent data={data} wallet={wallet} />;
}
