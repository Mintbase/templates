"use client";

import { GET_USER_POSTS } from "@/app/data/queries/user";
import { useGraphQlQuery } from "@/app/data/useGraphQLQuery";

interface USER_POSTS {
  posts: {
    metadata_id: string;
    media: string;
    title: string;
    description: string;
    minted_timestamp: string;
  }[];
  isLoading: boolean;
}

const useUserPosts = (accountId: string): USER_POSTS => {
  const queryObj = {
    queryName: "q_GET_USER_POSTS",
    query: GET_USER_POSTS,
    variables: {
      accountId: accountId,
    },
    queryOpts: { staleTime: Infinity },
    queryParams: [accountId],
  };

  const { data, isLoading } = useGraphQlQuery(queryObj);

  return {
    posts: data?.mb_views_nft_tokens,
    isLoading,
  };
};

export { useUserPosts };
