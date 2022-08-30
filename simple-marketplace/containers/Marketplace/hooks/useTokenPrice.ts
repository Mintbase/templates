import { useLazyQuery } from "@apollo/client";
import { GET_TOKEN_LIST } from "../../../queries/marketplace.queries";

export const useTokenPrice = (nftTokens: string[]) => {

    const [getTokenPrice] = useLazyQuery(GET_TOKEN_LIST);



    const queryCall = {
        variables: { ids: nftTokens },
        onCompleted: (_data) => {
            if (_data) {

                console.log('DSDFAFDprice', _data)
                // setPrices(
                //     _data.list.map((elm: { price: any; token: { id: any } }) => ({
                //         price: elm.price,
                //         tokenId: elm.token.id,
                //     })),
                // );
            }
        },
    }

    getTokenPrice(queryCall);
}