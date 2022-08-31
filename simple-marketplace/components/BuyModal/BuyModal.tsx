import {
  MbText,
  MbInfoCard,
  MbAmountInput,
  MbButton,
  EState,
} from 'mintbase-ui';
import { useState, useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';

import { StoreThing } from '../../hooks/useStoreNfts';
import { useTokenListData } from '../../hooks/useTokenListData';
import { bigToNear, nearToYocto } from '../../lib/numbers';
import { ACTIONTYPES, TransactionEnum } from '../../types/types';
import { useWallet } from '../../services/providers/WalletProvider';

import { LoadingSaleCard } from './LoadingSaleCard';
import { BuyModalInfo } from './BuyModalInfo';
import { BuyModalTemplate } from './BuyModalTemplate';
import { SignInButton } from '../SignInButton';
import { useNearPrice } from '../../hooks/useNearPrice';
import { MED_GAS } from '../../config/constants';




function BuyModal({
  closeModal,
  item,
}: {
  closeModal: () => void;
  item: StoreThing;
}) {
  const { wallet, signIn } = useWallet();
  const { thingId } = item;
  const { nearPrice } = useNearPrice();

  const [prices, setPrices] = useState([]);
  const [currentPrice, setCurrentPrice] = useState('0');
  const { watch, setValue, getValues } = useForm();

  const id = item.thingId;
  const {
    price,
    amountAvailable,
    tokensTotal,
    tokenId,
    tokenList,
    tokenData,
    isTokenListLoading,
  } = useTokenListData({ id });

  console.log(tokenList, 'tokenList')
  console.log( tokenData, 'tokenData')

  const t = new Date();
  t.setSeconds(t.getSeconds() - 60);

  const handleBuy = async () => {
    if (amountAvailable < 1) return;

    if (getValues('amount') === 1) {
      if (!tokenId) return;

      await wallet?.makeOffer(tokenId, nearToYocto(price.toString()), {
        callbackUrl: `${window.location.origin}/`,
        meta: JSON.stringify({
          type: TransactionEnum.MAKE_OFFER,
          args: {
            thingId,
            price: nearToYocto(price.toString()),
          },
        }),
      });
    } else {
      const auxTokens = nftTokens.slice(0, getValues('amount'));

      const auxPrices = prices
        .slice(0, getValues('amount'))
        .map((elm: any) => nearToYocto(bigToNear(elm.price).toString()));

      wallet?.batchMakeOffer(auxTokens, auxPrices, {
        gas: MED_GAS,
        callbackUrl: `${window.location.origin}/`,
        meta: JSON.stringify({
          type: TransactionEnum.MAKE_OFFER,
          args: {
            thingId,
            price: nearToYocto(price.toString()),
          },
        }),
      });
    }
  };

  useEffect(() => {
    if (watch().amount > 1) {
      const sum = prices
        .slice(0, watch().amount)
        .reduce((prev, curr) => (prev.price || prev) + curr.price);

      setCurrentPrice(bigToNear(sum));
    } else {
      setCurrentPrice(price ?? '0');
    }
  }, [watch().amount, price]);


  console.log(isTokenListLoading, 'isTokenListLoading')

  if (isTokenListLoading) {
    return(
    <BuyModalTemplate closeModal={closeModal}> 
      <LoadingSaleCard />
    </BuyModalTemplate>
    )
  }

  const modalInfo = {
    amountAvailable , tokensTotal ,currentPrice, nearPrice
  }

  return (
      <BuyModalTemplate closeModal={closeModal}> 
              {wallet.isConnected() && !isTokenListLoading ? (
                  <BuyModalInfo data={modalInfo} handleBuy={handleBuy} setValue={setValue} />
              ) : (
                  <SignInButton signIn={signIn} />
              )}

      </BuyModalTemplate>
       
  );
}

export default BuyModal;
