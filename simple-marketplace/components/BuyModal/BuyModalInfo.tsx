import { nearPrice } from '@mintbase-js/data';
import { useWallet } from '@mintbase-js/react';
import { buy, execute } from '@mintbase-js/sdk';
import {
  EState,
  MbAmountInput,
  MbButton,
  MbInfoCard,
  MbText,
} from 'mintbase-ui';
import { useRouter } from 'next/router';

/*
Buy Modal Info:
The component that handles the NFT Buy Information
*/

import { useCallback, useEffect, useState } from 'react';
import { TESTNET_CONFIG } from '../../config/constants';
import { nearToYocto } from '../../lib/numbers';
import { BuyModalData, TokenListData, TransactionEnum } from '../../types/types';
import { SignInButton } from '../SignInButton';

function AvailableNftComponent({ data }: { data: TokenListData }): JSX.Element {
  const {
    amountAvailable,
    tokensTotal,
    isTokenListLoading,
    price,
    tokenKey,
    tokenId,
    nftContractId,
    marketId,
  } = data;

  const { selector, isConnected } = useWallet();
  const router = useRouter();

  const message = `${amountAvailable} of ${tokensTotal} Available`;
  // state to check the price x amount according to user interaction

  const [currentPrice, setCurrentPrice] = useState(price);
  const [amount, setAmount] = useState(1);

  const [nearPriceData, setNearPriceData] = useState(null);

  const singleBuy = useCallback(async () => {
    const callback = `${
      window.location.origin
    }/wallet-callback?transactionHashes=${''}&signMeta=${encodeURIComponent(
      JSON.stringify({
        type: TransactionEnum.MAKE_OFFER,
        args: {
          tokenId,
          price: nearToYocto(currentPrice.toString()),
        },
      }),
    )}`;

    const wallet = await selector.wallet();

    await execute(
      { wallet },
      {
        ...buy({
          contractAddress: nftContractId,
          tokenId,
          referrerId:
            process.env.NEXT_PUBLIC_REFERRAL_ID || TESTNET_CONFIG.referral,
          marketId,
          price: nearToYocto(currentPrice.toString()),
        }),
      },
    );

    router.push(callback);
  }, [currentPrice, tokenKey]);

  // handler function to call the wallet methods to proceed the buy.
  const handleBuy = async () => {
    const isSingleAmount = amount === 1;

    if (isSingleAmount) {
      await singleBuy();
    }
  };

  const setNewPrice = (val: string) => {
    const value = Number(val);

    setAmount(value);
    setCurrentPrice(price * value);
  };

  useEffect(() => {
    // gets store nfts from mintbase-js/data package
    const getNearPrice = async () => {
      const { data: priceData, error } = await nearPrice();

      setNearPriceData(error ? '0' : priceData);
    };

    getNearPrice();
  }, []);

  return isConnected && !isTokenListLoading ? (
    <div className="mt-2">
      <div className="bg-gray-50 py-4 text-center">
        <MbText className="p-med-90 text-gray-700">
          <span className="p-med-130 text-black">{message}</span>
        </MbText>
      </div>
      <div className="py-2">
        <div className="mb-8">
          <MbInfoCard
            boxInfo={{
              description: `${currentPrice.toFixed(2)} N`,
              title: 'Price',
              lowerLeftText: `~ ${(
                Number(nearPriceData) * Number(currentPrice)
              ).toFixed(2)} USD`,
            }}
          />
          <div className="mt-4">
            <MbText className="text-gray-700 mb-2">Quantity</MbText>
            <MbAmountInput
              maxAmount={Math.min(amountAvailable, 1)}
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
  const { amountAvailable } = data;
  const isAvailable = amountAvailable > 0;

  if (!isAvailable) {
    return (
      <div className="mt-2">
        <div className="bg-gray-50 py-4 text-center">
          <MbText className="p-med-90 text-gray-700">
            <span className="p-med-130 text-black">NFT Not Available</span>
          </MbText>
        </div>
      </div>
    );
  }

  return <AvailableNftComponent data={data} />;
}
