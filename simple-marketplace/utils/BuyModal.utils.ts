import { useEffect, useState } from "react";

export interface QueryOptions {
    skip?: boolean;
    variables?: {
        [key: string]: Object;
    };
    onCompleted?: (data: any) => void
}


export const mapQueryObj = (tokenData) => {
    let queryOptions: QueryOptions = { skip: true };

    if (tokenData) {
        const tokens = tokenData.mb_views_nft_tokens.map((token) => token.token_id);

        if (tokenData.mb_views_nft_tokens.length > 1) {
            queryOptions = {
                variables: { ids: tokens },
            };
        }
    }

    return { queryOptions };
};
