import { FETCH_FIRST_TOKEN } from "@/data/queries/feed.graphl";
import { useGraphQlQuery } from "@/data/useGraphQlQuery";
import { constants } from "@/constants";
import { useEffect, useState } from "react";
import { FirstTokenResult, TokenData, TokenFeedData } from "@/data/types";

export const useFirstToken = (): FirstTokenResult => {
  const [newToken, setNewToken] = useState<TokenData | null>(null);
  const [tokensFetched, setTokensFetched] = useState<TokenData[] | null>(null);

  const queryObj = {
    queryName: "q_FETCH_FIRST_TOKEN",
    query: FETCH_FIRST_TOKEN,
    variables: {
      accountId: constants.proxyContractAddress,
      contractAddress: constants.tokenContractAddress,
    },
    queryOpts: { staleTime: Infinity, refetchInterval: 30000 },
  };

  const { data, isLoading, refetch: refetchToken, error } = useGraphQlQuery<TokenFeedData>(queryObj);

  useEffect(() => {

    if(error){
      console.error("GraphQL Error:", error);
    }

    // media delay

    if (tokensFetched && tokensFetched?.length > 1) {
      // window.location.reload();
    }
    // new media aint null
    if (data?.token[0]?.media !== null) {
      // but the newToken previous stored is somehow an async bug so it re-state the new media
      if (newToken?.media == null && data?.token[0]) {
        setNewToken(data?.token[0]);
      }

      // previous newToken is outdated like new coming media is id 301 and previous token 298
      if (newToken?.id) {
        if (data?.token[0]?.id !== newToken?.id) {

          // if isnt in direct order reload the page to organize the order.
          if (
            Number(data?.token[0]?.id) !== Number(newToken?.id) + 1 &&
            !isLoading
          ) {
            // window.location.reload();
          }
        }
      }
    }

    // first load

    if (
      (data?.token[0] && !newToken) ||
      (data?.token[0] && tokensFetched && tokensFetched?.length < 1)
    ) {
      setNewToken(data?.token[0]);
    }

    // check if the newToken coming is the next id.

    if (
      newToken !== null &&
      Number(data?.token[0]?.id) === Number(newToken?.id) + 1 &&
      data?.token[0]?.media
    ) {
    let newTokensFetched: TokenData[] = [];

      if (!tokensFetched) {
        newTokensFetched = [newToken];
      }

      if (tokensFetched && tokensFetched?.length == 1) {
        newTokensFetched = [newToken, ...tokensFetched];
      }
      if (tokensFetched && tokensFetched?.length > 1) {
        newTokensFetched = [newToken, ...tokensFetched];
      }

      setTokensFetched(newTokensFetched);
      setNewToken(data?.token[0]);
    }
  }, [data?.token, newToken, tokensFetched]);

  return {
    newToken: !isLoading ? newToken : null,
    tokensFetched,
    isLoading,
    tokenError: error
  };
};
