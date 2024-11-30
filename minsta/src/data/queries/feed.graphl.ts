import { gql } from 'graphql-request';


export const FETCH_FEED = gql`
  query minsta_fetch_feed_minted_tokens(
    $accountIds: [String!]!
    $contractAddress: String
    $limit: Int
    $offset: Int
  ) {
    token: mb_views_nft_tokens(
      where: {
        minter: { _in: $accountIds }
        nft_contract_id: { _eq: $contractAddress }
        burned_timestamp: { _is_null: true }
        metadata_content_flag: { _is_null: true }
        nft_contract_content_flag: { _is_null: true }
      }
      order_by: { minted_timestamp: desc },
       offset: $offset,
       limit: $limit
    ) {
      id: token_id
      createdAt: minted_timestamp
      media
      title
      description
      metadata_id
    }
    mb_views_nft_tokens_aggregate(where: {minter: {_in: $accountIds}, nft_contract_id: {_eq: $contractAddress}, burned_timestamp: {_is_null: true}}) {
      aggregate {
      count
      }
    }
  }
`;

export const FETCH_FIRST_TOKEN = gql`
query minsta_fetch_firstToken($accountId: String!, $contractAddress: String) {
  token: mb_views_nft_tokens(where: {minter: {_eq: $accountId}, nft_contract_id: {_eq: $contractAddress}, 
    burned_timestamp: {_is_null: true}, metadata_content_flag: {_is_null: true}, nft_contract_content_flag: {_is_null: true}}, order_by: {minted_timestamp: desc}, limit: 1, offset: 0) {
    id: token_id
    createdAt: minted_timestamp
    media
    title
    description
    metadata_id
  }
}
`