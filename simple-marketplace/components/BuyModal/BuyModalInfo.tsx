import {
  EState,
  MbAmountInput,
  MbButton,
  MbInfoCard,
  MbText,
} from 'mintbase-ui';

/*
Buy Modal Info:
The component that handles the NFT Buy Information
*/

import { useCallback, useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute } from '@mintbase-js/sdk';
import { TESTNET_CONFIG } from '../../config/constants';

import { useNearPrice } from '../../hooks/useNearPrice';
import { nearToYocto } from '../../lib/numbers';
import { BuyModalData, TokenListData } from '../../types/types';
import { SignInButton } from '../SignInButton';

function AvailableNftComponent({ data }: { data: TokenListData }): JSX.Element {
  const {
    wallet, activeAccountId, isConnected, selector,
  } = useWallet();
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

  const { nearPrice } = useNearPrice();

  const message = `${amountAvailable} of ${tokensTotal} Available`;
  // state to check the price x amount according to user interaction

  const [currentPrice, setCurrentPrice] = useState(price);
  const [amount, setAmount] = useState(1);

  const singleBuy = useCallback(async () => {
    await execute(
      {
        signerId: activeAccountId,
        methodName: 'buy',
        contractAddress: marketId,
        gas: '200000000000000',
        args: {
          nft_contract_id: nftContractId,
          token_id: tokenId,
          referrer_id:
            process.env.NEXT_PUBLIC_REFERRAL_ID || TESTNET_CONFIG.referral,
        },
        deposit: nearToYocto(currentPrice.toString()),
      },
      { wallet: await selector.wallet() },
    );
  }, [currentPrice, tokenKey, wallet]);

  const multiBuy = useCallback(async () => {
    const nftPrice = nearToYocto(price.toString());
    const finalPrice = new Array(amount);

    await finalPrice.fill(nftPrice);

    // wallet?.batchMakeOffer([tokenKey], finalPrice, {
    //   gas: MED_GAS,
    //   callbackUrl: `${window.location.origin}/wallet-callback`,
    //   meta: JSON.stringify({
    //     type: TransactionEnum.MAKE_OFFER,
    //     args: {
    //       tokenId: tokenKey,
    //       price: nearToYocto(currentPrice.toString()),
    //     },
    //   }),
    // })
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

  const setNewPrice = (val: string) => {
    const value = Number(val);

    setAmount(value);
    setCurrentPrice(price * value);
  };

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
                Number(nearPrice) * Number(currentPrice)
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
