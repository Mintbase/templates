"use client";

import { GET_BLOG_POSTS } from "@/app/data/queries/blogs";
import { GET_LATEST_POSTS } from "@/app/data/queries/posts";
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

const useLatestPosts = (): USER_POSTS => {
  const queryObj = {
    queryName: "q_GET_LATEST_POSTS",
    query: GET_LATEST_POSTS,
    variables: {},
    queryOpts: { staleTime: Infinity },
  };

  const { data, isLoading } = useGraphQlQuery(queryObj);

  return {
    posts: data?.mb_views_nft_tokens,
    isLoading,
  };
};

export { useLatestPosts };
