"use client";

import { GET_LATEST_UPDATED_BLOGS } from "@/app/data/queries/blogs";
import { useGraphQlQuery } from "@/app/data/useGraphQLQuery";
import {
  LATEST_BLOGS,
  QUERY_RESPONSE_METADATA,
  CONTRACTS,
} from "@/app/typings";

const useLatestBlogs = (): LATEST_BLOGS => {
  const queryObj = {
    queryName: "q_GET_LATEST_UPDATED_BLOGS",
    query: GET_LATEST_UPDATED_BLOGS,
    variables: {},
    queryOpts: { staleTime: Infinity },
  };

  const { data, isLoading } =
    useGraphQlQuery<QUERY_RESPONSE_METADATA<CONTRACTS>>(queryObj);

  return {
    contracts: data?.data?.mb_views_nft_metadata ?? [],
    isLoading,
  };
};

export { useLatestBlogs };
