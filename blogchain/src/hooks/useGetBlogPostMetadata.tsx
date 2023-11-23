"use client";

import { GET_POST_METADATA } from "@/app/data/queries/posts";
import { useGraphQlQuery } from "@/app/data/useGraphQLQuery";

interface BLOG_POST {
  post: {
    metadata_id: string;
    media: string;
    title: string;
    description: string;
    minted_timestamp: string;
    nft_contract_id: string;
    minter: string;
  };
  isLoading: boolean;
}

const useGetBlogPostMetadata = (id: string): BLOG_POST => {
  const queryObj = {
    queryName: "q_GET_POST_METADATA",
    query: GET_POST_METADATA,
    variables: { metadataId: id },
    queryOpts: { staleTime: Infinity },
    queryParams: [id],
  };

  const { data, isLoading } = useGraphQlQuery(queryObj);

  return {
    post: data?.mb_views_nft_tokens[0],
    isLoading,
  };
};

export { useGetBlogPostMetadata };
