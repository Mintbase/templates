"use client";

import { GET_BLOG_POSTS } from "@/app/data/queries/blogs";
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

const useBlogPosts = (contractId: string): USER_POSTS => {
  const queryObj = {
    queryName: "q_GET_BLOG_POSTS",
    query: GET_BLOG_POSTS,
    variables: {
      contractId: contractId,
    },
    queryOpts: { staleTime: Infinity },
    queryParams: [contractId],
  };

  const { data, isLoading } = useGraphQlQuery(queryObj);

  return {
    posts: data?.mb_views_nft_tokens,
    isLoading,
  };
};

export { useBlogPosts };
