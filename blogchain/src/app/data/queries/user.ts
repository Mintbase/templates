export const GET_USER_POSTS = `query GET_USER_POSTS($accountId: String!) {
    mb_views_nft_tokens(
      where: {extra: {_eq: "blogpost"}, _and: {nft_contract_owner_id: {_eq: $accountId}}}
    ) {
      metadata_id
      title
      description
      media
      minted_timestamp
    }
  }
  `;

export const GET_USER_BLOGS = `query GET_USER_BLOGS($accountId: String!) {
    nft_contracts(where: {owner_id: {_eq: $accountId}}) {
      id
    }
  }
  `;
