import { FirstTokenProps, InfiniteScrollHook } from "@/data/types";
import { useBlockedNfts } from "@/hooks/useBlockedNfts";

import { constants } from "@/constants";
import { FETCH_FEED } from "@/data/queries/feed.graphl";
import { useGraphQlQuery } from "@/data/useGraphQlQuery";
import { useFirstToken } from "@/hooks/useFirstToken";
import { useEffect } from "react";

export const useHomePageData = () => {
  const { newToken, tokensFetched, isLoading, tokenError } = useFirstToken();

  const isFirstTokenError = tokenError !== null;

  const { blockedNfts } = useBlockedNfts();

  const queryObj = {
    queryName: "q_FETCH_FEED",
    query: FETCH_FEED,
    variables: {
      accountIds: [
        constants.proxyContractAddress,
        ...constants.legacyProxyAddresses,
      ],
      contractAddress: constants.tokenContractAddress,
      limit: 1,
      offset: 0,
    },
    queryOpts: { staleTime: Infinity },
  };

  const { data, isLoading: totalLoading } =
    useGraphQlQuery<InfiniteScrollHook>(queryObj);

  const firstTokenisBlocked: boolean =
    newToken?.metadata_id && blockedNfts?.includes(newToken?.metadata_id);

  useEffect(() => {
    let reloadTimeout: ReturnType<typeof setTimeout>;

    if (!newToken?.media) {
      reloadTimeout = setTimeout(() => {
        // Reload the page after 4 minutes (120,000 milliseconds)
        window.location.reload();
      }, 360000); //4 minutes in milliseconds
    }

    return () => {
      // Clear the timeout if the component unmounts
      clearTimeout(reloadTimeout);
    };
  }, [newToken]);

  const firstTokenProps: FirstTokenProps = {
    newToken,
    isLoading,
    firstTokenisBlocked,
    isFirstTokenError,
  };

  return {
    totalLoading,
    totalNfts: data?.mb_views_nft_tokens_aggregate?.aggregate?.count,
    firstTokenProps,
    tokensFetched,
    blockedNfts,
  };
};
