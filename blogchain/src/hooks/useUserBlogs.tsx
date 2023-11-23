"use client";

import { GET_USER_BLOGS } from "@/app/data/queries/user";
import { useGraphQlQuery } from "@/app/data/useGraphQLQuery";

interface USER_BLOGS {
  blogs: { id: string }[];
  isLoading: boolean;
}

const useUserBlogs = (accountId: string): USER_BLOGS => {
  const queryObj = {
    queryName: "q_GET_GET_USER_BLOGS",
    query: GET_USER_BLOGS,
    variables: {
      accountId: accountId,
    },
    queryOpts: { staleTime: Infinity },
    queryParams: [accountId],
  };

  const { data, isLoading } = useGraphQlQuery(queryObj);

  return {
    blogs: data?.nft_contracts,
    isLoading,
  };
};

export { useUserBlogs };
