import { EState, MbAmountInput, MbButton, MbInfoCard, MbText } from "mintbase-ui";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { bigToNear } from "../../lib/numbers";

export const BuyModalInfo = ({ data }) => {

  // const handleBuy = async () => {
  //   if (amountAvailable < 1) return;

  //   if (getValues('amount') === 1) {
  //     if (!tokenId) return;

  //     await wallet?.makeOffer(tokenId, nearToYocto(price.toString()), {
  //       callbackUrl: `${window.location.origin}/`,
  //       meta: JSON.stringify({
  //         type: TransactionEnum.MAKE_OFFER,
  //         args: {
  //           thingId,
  //           price: nearToYocto(price.toString()),
  //         },
  //       }),
  //     });
  //   } else {
  //     const auxTokens = tokenList.slice(0, getValues('amount'));

  //     const auxPrices = prices
  //       .slice(0, getValues('amount'))
  //       .map((elm: any) => nearToYocto(bigToNear(elm.price).toString()));

  //     wallet?.batchMakeOffer(auxTokens, auxPrices, {
  //       gas: MED_GAS,
  //       callbackUrl: `${window.location.origin}/`,
  //       meta: JSON.stringify({
  //         type: TransactionEnum.MAKE_OFFER,
  //         args: {
  //           thingId,
  //           price: nearToYocto(price.toString()),
  //         },
  //       }),
  //     });
  //   }
  // };

  const {amountAvailable , tokensTotal , nearPrice, prices , price} = data;
  const isAvailable = amountAvailable > 0;

  const [currentPrice, setCurrentPrice] = useState(0);



  const setNewPrice = (val) => {
    const sum = prices
    .slice(0, val)
    .reduce((prev, curr) => (prev.price || prev) + curr.price);

    const totalAmount = bigToNear(sum.price) * val
     setCurrentPrice(totalAmount)
  }


    const message = isAvailable? `${amountAvailable} of ${tokensTotal} Available` : `NFT Not Available`
  return (
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
                title: "Price",
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
                  setNewPrice(e)
                }}
                disabled={amountAvailable === 1}
              />
            </div>
          </div>
          <div className="text-center">
          <MbButton
            label="Buy with NEAR"
            state={EState.ACTIVE}
            // onClick={handleBuy}
          />
        </div>
          </>
        ): null}
    
      </div>
    </div>
  );
};
