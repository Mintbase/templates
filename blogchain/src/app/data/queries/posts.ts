export const GET_POST_METADATA = `query GET_POST_METADATA($metadataId: String!) {
    mb_views_nft_tokens(where: {metadata_id: {_eq: $metadataId}}) {
      metadata_id
      title
      description
      media
      minted_timestamp
      minter
      nft_contract_id
    }
  }`;

export const GET_LATEST_POSTS = `query GET_LATEST_POSTS {
    mb_views_nft_tokens(
      where: {extra: {_eq: "blogpost"}}
      limit: 10
      order_by: {minted_timestamp: desc}
    ) {
    metadata_id
    title
    description
    media
    minted_timestamp
    minter
    nft_contract_id
    }
  }`;
