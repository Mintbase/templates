import {
  MbText,
  MbInfoCard,
  MbAmountInput,
  MbButton,
  EState,
} from 'mintbase-ui';
import { useState, useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { useLazyQuery, useQuery } from '@apollo/client';

import { StoreThing } from '../controllers/useMarketplaceController';
import { useListThingController } from '../controllers/useThingController';
import { bigToNear, nearToYocto } from '../../../lib/numbers';
import { ACTIONTYPES, TransactionEnum } from '../utils/types';
import { useWallet } from '../../../services/providers/WalletProvider';
import {
  GET_THING,
  GET_TOKEN_LIST,
  v2MarketPlaceGetToken,
  v2MarketPlaceGetTokenListings,
} from '../../../queries/marketplace.queries';
import { buyModalReducer, initialState } from '../utils/buyModalReducer';
import {
  getNearPrice,
  mapQueryObj,
  useNearPrice,
} from '../utils/BuyModal.utils';
import { useTokenPrice } from '../hooks/useTokenPrice';

const MED_GAS = '300000000000000';

function LoadingSaleCard() {
  return (
    <div className="mb-4">
      <div className="bg-gray-50 py-4 flex justify-center animate-pulse">
        <div className="h-6 w-36 rounded bg-gray-600" />
      </div>
      <div className="p-4 animate-pulse">
        <div className="mb-8">
          <div className="h-16 w-full rounded bg-gray-600" />
          <div className="h-16 w-full rounded bg-gray-600" />
        </div>
        <div className="flex justify-center">
          <div className="h-9 w-40 rounded bg-gray-600" />
        </div>
      </div>
    </div>
  );
}

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

  // const [thingTokens, setThingTokens] = useState([]);
  const [prices, setPrices] = useState([]);
  // const [tokens, setTokens] = useState([]);
  const [currentPrice, setCurrentPrice] = useState('0');



  // const [state, dispatch] = useReducer(reducer, initialState)

  const { watch, setValue, getValues } = useForm();

  const id = item.thingId;
  const {
    price,
    amountAvailable,
    tokensTotal,
    tokenId,
    isThingFetching,
  } = useListThingController({ id });

  const [getTokenListData, { data: tokenList }] = useLazyQuery(
    v2MarketPlaceGetTokenListings,
  );

  const { error: thingError, data: tokenData } = useQuery(
    v2MarketPlaceGetToken,
    id
      ? {
        variables: {
          id,
        },
        onCompleted: (tokenData) => {
          const { queryOptions } = mapQueryObj(tokenData);
          getTokenListData(queryOptions);
        },
      }
      : { skip: true },
  );

  if (tokenList) {
    //           // setPrices(
    //           //     _data.list.map((elm: { price: any; token: { id: any } }) => ({
    //           //         price: elm.price,
    //           //         tokenId: elm.token.id,
    //           //     })),
    //           // );
    console.log(tokenList, ' tokenList');
  }



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

  // useEffect(() => {
  //   if (!thingId) return;
  //   getThing();
  // }, [thingId]);

  // useEffect(() => {
  //   getTokenPrice();
  // }, [nftTokens]);

  // useEffect(() => {
  //   setTokens();
  // }, [nftTokens]);

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        />
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mt-3 ml-2 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div className="flex flex-row items-center justify-between w-full border-b-2">
                <h3
                  className="text-md leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Simple Sale
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md hover:border-2 hover:border-primary text-gray-400 hover:text-primary focus:outline focus:text-gray-500 transition duration-150 ease-in-out"
                  onClick={() => closeModal()}
                  aria-label="Close"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {!!isThingFetching && <LoadingSaleCard />}

              {!wallet.isConnected() ? (
                <div className="mt-4">
                  <MbButton onClick={signIn} label="Connect NEAR Wallet" />
                </div>
              ) : (
                <div className="mt-2">
                  <div className="bg-gray-50 py-4 text-center">
                    <MbText className="p-med-90 text-gray-700">
                      <span className="p-med-130 text-black">
                        {`${amountAvailable} of ${tokensTotal} `}
                      </span>
                      Available
                    </MbText>
                  </div>
                  <div className="py-2">
                    {amountAvailable > 0 && (
                      <div className="mb-8">
                        <MbInfoCard
                          boxInfo={{
                            description: `${Number(currentPrice).toFixed(2)} N`,
                            title: 'Price',
                            lowerLeftText: `~ ${(
                              Number(nearPrice) * Number(currentPrice)
                            ).toFixed(2)} USD`,
                          }}
                        />
                        <div className="mt-4">
                          <MbText className="text-gray-700 mb-2">
                            Quantity
                          </MbText>
                          <MbAmountInput
                            maxAmount={Math.min(amountAvailable, 5)}
                            onValueChange={(amount) => {
                              setValue('amount', Number(amount));
                            }}
                            disabled={amountAvailable === 1}
                          />
                        </div>
                      </div>
                    )}
                    <div className="text-center">
                      <MbButton
                        label="Buy with NEAR"
                        state={
                          amountAvailable > 0 ? EState.ACTIVE : EState.DISABLED
                        }
                        onClick={handleBuy}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyModal;
