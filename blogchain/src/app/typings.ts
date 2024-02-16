export interface USER_POSTS {
  metadata_id: string;
  media: string;
  title: string;
  description: string;
  minted_timestamp: string;
}

export interface USER_POST_DATA {
  data: { mb_views_nft_tokens: USER_POSTS[] | never[] };
}

export interface BLOG_POST_UNIQUE extends USER_POSTS {
  nft_contract_id: string;
  minter: string;
}

export interface BLOG_POST_DATA {
  post: BLOG_POST_UNIQUE | undefined;
  isLoading: boolean;
}

export interface QUERY_RESPONSE<T> {
  data: { mb_views_nft_tokens: T[] | never[] };
  isLoading: boolean;
}

export interface QUERY_RESPONSE_METADATA<T> {
  data: { mb_views_nft_metadata: T[] | never[] };
  isLoading: boolean;
}

export interface HOOK_RESPONSE<T> {
  posts: T[] | never[];
  isLoading: boolean;
}

export interface BLOG_POSTS {
  posts: USER_POSTS[];
  isLoading: boolean;
}

export interface BLOG_POST {
  data: {
    post: USER_POSTS[] | never[];
  };
  isLoading: boolean;
}

export interface CONTRACTS {
  nft_contract_id: string;
  nft_contract_owner_id: string;
}
export interface LATEST_BLOGS {
  contracts: CONTRACTS[];
  isLoading: boolean;
}

export interface BLOGS {
  data: {
    nft_contracts: { id: string }[] | never[];
  };
}

export interface BLOGS_RESPONSE {
  blogs: { id: string }[];
  isLoading: boolean;
}
