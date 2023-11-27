export const GET_LATEST_UPDATED_BLOGS = `query GET_LATEST_UPDATED_BLOGS {
  mb_views_nft_metadata(
    where: {extra: {_eq: "blogpost"}}
    distinct_on: nft_contract_id
    limit: 10
  ) {
    nft_contract_id
    nft_contract_owner_id
  }
  }
  `;

export const GET_BLOG_POSTS = `query GET_BLOG_POSTS($contractId: String!) {
    mb_views_nft_tokens(
      where: {extra: {_eq: "blogpost"}, _and: {nft_contract_id: {_eq: $contractId}}}
    ) {
      metadata_id
      title
      description
      media
      minted_timestamp
    }
  }
  `;
