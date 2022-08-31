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

  // const [prices, setPrices] = useState([]);


  const id = item.thingId;
  const {
    price,
    prices,
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





  console.log(isTokenListLoading, 'isTokenListLoading')

  if (isTokenListLoading) {
    return(
    <BuyModalTemplate closeModal={closeModal}> 
      <LoadingSaleCard />
    </BuyModalTemplate>
    )
  }

  const modalInfo = {
    amountAvailable , tokensTotal ,price, prices, nearPrice
  }

  return (
      <BuyModalTemplate closeModal={closeModal}> 
              {wallet.isConnected() && !isTokenListLoading ? (
                  <BuyModalInfo data={modalInfo}  />
              ) : (
                  <SignInButton signIn={signIn} />
              )}
      </BuyModalTemplate>
       
  );
}

export default BuyModal;
