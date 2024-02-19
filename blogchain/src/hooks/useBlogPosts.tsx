"use client";

import { GET_BLOG_POSTS } from "@/app/data/queries/blogs";
import { useGraphQlQuery } from "@/app/data/useGraphQLQuery";
import { BLOG_POSTS, USER_POST_DATA } from "@/app/typings";

const useBlogPosts = (contractId: string): BLOG_POSTS => {
  const queryObj = {
    queryName: "q_GET_BLOG_POSTS",
    query: GET_BLOG_POSTS,
    variables: {
      contractId: contractId,
    },
    queryOpts: { staleTime: Infinity },
    queryParams: [contractId],
  };

  const { data, isLoading } = useGraphQlQuery<USER_POST_DATA, unknown>(
    queryObj
  );

  return {
    posts: data?.data?.mb_views_nft_tokens ?? [],
    isLoading,
  };
};

export { useBlogPosts };
