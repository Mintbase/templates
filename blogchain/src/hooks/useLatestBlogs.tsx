"use client";

import { GET_LATEST_UPDATED_BLOGS } from "@/app/data/queries/blogs";
import { useGraphQlQuery } from "@/app/data/useGraphQLQuery";

interface LATEST_BLOGS {
  contracts: { nft_contract_id: string; nft_contract_owner_id: string }[];
  isLoading: boolean;
}

const useLatestBlogs = (): LATEST_BLOGS => {
  const queryObj = {
    queryName: "q_GET_LATEST_UPDATED_BLOGS",
    query: GET_LATEST_UPDATED_BLOGS,
    variables: {},
    queryOpts: { staleTime: Infinity },
  };

  const { data, isLoading } = useGraphQlQuery(queryObj);

  return {
    contracts: data?.mb_views_nft_metadata,
    isLoading,
  };
};

export { useLatestBlogs };
