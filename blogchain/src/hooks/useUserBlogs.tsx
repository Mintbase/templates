"use client";

import { GET_USER_BLOGS } from "@/app/data/queries/user";
import { useGraphQlQuery } from "@/app/data/useGraphQLQuery";
import { BLOGS, BLOGS_RESPONSE } from "@/app/typings";

const useUserBlogs = (accountId: string): BLOGS_RESPONSE => {
  const queryObj = {
    queryName: "q_GET_GET_USER_BLOGS",
    query: GET_USER_BLOGS,
    variables: {
      accountId: accountId,
    },
    queryOpts: { staleTime: Infinity },
    queryParams: [accountId],
  };

  const { data, isLoading } = useGraphQlQuery<BLOGS, unknown>(queryObj);

  return {
    blogs: data?.data?.nft_contracts ?? [],
    isLoading,
  };
};

export { useUserBlogs };
