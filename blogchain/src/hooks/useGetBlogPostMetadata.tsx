import { GET_POST_METADATA } from "@/app/data/queries/posts";
import { useGraphQlQuery } from "@/app/data/useGraphQLQuery";
import {
  BLOG_POST_DATA,
  BLOG_POST_UNIQUE,
  QUERY_RESPONSE,
} from "@/app/typings";

const useGetBlogPostMetadata = (id: string): BLOG_POST_DATA => {
  const queryObj = {
    queryName: "q_GET_POST_METADATA",
    query: GET_POST_METADATA,
    variables: { metadataId: id },
    queryOpts: { staleTime: Infinity },
    queryParams: [id],
  };

  const { data, isLoading } = useGraphQlQuery<
    QUERY_RESPONSE<BLOG_POST_UNIQUE>,
    unknown
  >(queryObj);

  return {
    post: data?.data?.mb_views_nft_tokens[0],
    isLoading,
  };
};

export { useGetBlogPostMetadata };
