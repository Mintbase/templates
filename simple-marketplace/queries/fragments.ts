export const METADATA_FRAGMENT = `
  metadata: nft_metadata(
    where: {
      id: { _eq: $metadataId }
    }
  ) {
    contract: nft_contracts {
      id
      baseUri: base_uri
    }
    title
    description
    media
    document: reference_blob(path: "$.document")
    animationUrl: reference_blob(path: "$.animation_url")
    extra: reference_blob(path: "$.extra")
    # TODO: Get the rest of these and remove the need to download bytes from reference services
  }
`;

export const MINTERS_FRAGMENT = `
  minters: nft_tokens(
    distinct_on: minter
    where: {
      burned_timestamp: { _is_null: true },
      metadata_id: {_eq: $metadataId }
    }
  ) {
    account: minter
  }
`;

export const TOKEN_COUNT_FRAGMENT = `
  tokenCount: nft_tokens_aggregate(
    where: {
      metadata_id: {_eq: $metadataId }
    }
  ) {
    aggregate {
      count
    }
  }
`;

export const ROLLING_AUCTION_COUNT_FRAGMENT = `
    rollingAuctionCount: mb_views_active_listings_aggregate (
        where: {
        metadata_id: {_eq: $metadataId }
        kind: { _eq: "auction" }
        }
    ) {
        aggregate {
        count
        }
    }
`;

export const LISTINGS_FRAGMENT = `
    listings: mb_views_active_listings (
        where: {
        metadata_id: {_eq: $metadataId }
        }
        limit: 1,
        order_by: { price: desc }
    ) {
        kind
        price
        market_id
        token {
        id: token_id
        minter
        nft_contract_id
        ownerId: owner
        splits
        royalties
        }
    }
`;

export const SIMPLE_SALE_COUNT_FRAGMENT = `
    simpleSaleCount: mb_views_active_listings_aggregate (
        where: {
        metadata_id: {_eq: $metadataId }
        kind: { _eq: "simple" }
        }
    ) {
        aggregate {
        count
        }
    }
  `;
