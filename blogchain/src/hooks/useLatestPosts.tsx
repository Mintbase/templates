"use client";

import { GET_LATEST_POSTS } from "@/app/data/queries/posts";
import { useGraphQlQuery } from "@/app/data/useGraphQLQuery";
import { BLOG_POSTS, USER_POST_DATA } from "@/app/typings";

const useLatestPosts = (): BLOG_POSTS => {
  const queryObj = {
    queryName: "q_GET_LATEST_POSTS",
    query: GET_LATEST_POSTS,
    variables: {},
    queryOpts: { staleTime: Infinity },
  };

  const { data, isLoading } = useGraphQlQuery<USER_POST_DATA, unknown>(
    queryObj
  );

  return {
    posts: data?.data?.mb_views_nft_tokens ?? [],
    isLoading,
  };
};

export { useLatestPosts };
