/*

useStoreNfts Hook
Description: This hook calls storeNfts method from @mintbase-js/data to get store nfts to render on Items.

*/

import { ParsedDataReturn, storeNfts } from "@mintbase-js/data";
import { StoreNftsResult } from "@mintbase-js/data/lib/api/storeNfts/storeNfts.types";
import { useQuery } from "react-query";
import { mbjs, NEAR_NETWORKS, Network } from "@mintbase-js/sdk";
import { MAINNET_CONFIG, TESTNET_CONFIG } from "../config/constants";

const mapStoreNfts = (data: ParsedDataReturn<StoreNftsResult>) => ({
  nftsData: data?.data?.mb_views_nft_metadata_unburned,
});

const useStoreNfts = (store?: string) => {
  const stores =
    mbjs.keys?.network === NEAR_NETWORKS.TESTNET
      ? TESTNET_CONFIG.stores
      : MAINNET_CONFIG.stores;

  const defaultStores = process.env.NEXT_PUBLIC_STORES || stores;

  const formatedStores = defaultStores.split(/[ ,]+/);

  const { isLoading, error, data } = useQuery(
    ["storeNfts", store],
    () =>
      storeNfts(
        store || formatedStores,
        true,
        undefined,
        (process?.env?.NEXT_PUBLIC_NETWORK as Network) || "testnet"
      ),
    {
      retry: false,
      refetchOnWindowFocus: false,
      select: mapStoreNfts,
    }
  );

  return { ...data, error, loading: isLoading };
};

export { useStoreNfts };
