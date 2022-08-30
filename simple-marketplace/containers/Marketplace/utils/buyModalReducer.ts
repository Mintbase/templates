import { ACTIONTYPES, ReducerActions, BuyModalState } from "./types";


export const initialState: BuyModalState = {
    nftTokens: [],
    prices: [],
    tokens: [],
    currentPrice: '0',
    error: ''
}


export const buyModalReducer = (state: BuyModalState = initialState, action: ReducerActions) => {
    const { type } = action;

    switch (type) {
        case ACTIONTYPES.FIELD: {
            console.log(action.payload, 'payload')
            return {
                ...state,
                [action.fieldName]: action.payload,
            };
        }
        case ACTIONTYPES.ERROR: {
            return {
                ...state,
                error: action.payload,
                nftTokens: state.nftTokens,
                tokens: state.tokens,
                prices: state.prices,
                currentPrice: state.currentPrice,
            };
        }
    }

}