"use client";

import { GET_USER_POSTS } from "@/app/data/queries/user";
import { useGraphQlQuery } from "@/app/data/useGraphQLQuery";
import { HOOK_RESPONSE, QUERY_RESPONSE, USER_POSTS } from "@/app/typings";

const useUserPosts = (accountId: string): HOOK_RESPONSE<USER_POSTS> => {
  const queryObj = {
    queryName: "q_GET_USER_POSTS",
    query: GET_USER_POSTS,
    variables: {
      accountId: accountId,
    },
    queryOpts: { staleTime: Infinity },
    queryParams: [accountId],
  };

  const { data, isLoading } = useGraphQlQuery<
    QUERY_RESPONSE<USER_POSTS>,
    unknown
  >(queryObj);

  return {
    posts: data?.data?.mb_views_nft_tokens ?? [],
    isLoading,
  };
};

export { useUserPosts };
