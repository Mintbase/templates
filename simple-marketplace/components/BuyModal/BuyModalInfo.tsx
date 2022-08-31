import { EState, MbAmountInput, MbButton, MbInfoCard, MbText } from "mintbase-ui";

export const BuyModalInfo = ({ data, handleBuy, setValue }) => {

    const {amountAvailable , tokensTotal ,currentPrice, nearPrice } = data;
    const isAvailable = amountAvailable > 0;

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
                description: `${Number(currentPrice).toFixed(2)} N`,
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
                onValueChange={(amount) => {
                  setValue("amount", Number(amount));
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
        ): null}
    
      </div>
    </div>
  );
};
